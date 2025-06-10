import { Inject, Injectable } from '@nestjs/common';
import { CreateNgoDto } from './dto/create-ngo.dto';
import { UpdateNgoDto } from './dto/update-ngo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ngoInterface } from './entities/ngo.entity';
import { createDocumentsDto } from './dto/createdocument.dto';
import { documentsInterface } from './entities/document.entity';
import { createProject } from './dto/createProject.dto';
import { projects, projectsInterface } from './entities/project.entity';
import * as bcrypt from 'bcrypt';
import { loginDTO } from './dto/login.dto';
import { jwtService } from 'src/jwt/jwt.service';
import {
  responseInterface,
  tokenizeInterface,
} from 'src/interfaces/interfaces.interface';
import { completeProject } from './dto/completeProject.dto';
import { error } from 'console';
import { pagesInterface } from 'src/entity/pages.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class NgoService {
  saltRounds = 10;
  constructor(
    @InjectModel('ngo') private ngoRepository: Model<ngoInterface>,
    @InjectModel('document') private ngoDocument: Model<documentsInterface>,
    @InjectModel('project') private ngoProject: Model<projectsInterface>,
    private EmailService: EmailService,
    @InjectModel('pages') private pageRepository: Model<pagesInterface>,
    private readonly jwtService: jwtService,
  ) {}

  async ngoMaps(): Promise<any[]> {
    let ngos = await this.ngoRepository.find();
    let countries = {};
    for (let i of ngos) {
      if (countries[i.country]) {
        countries[i.country] += 1;
      } else {
        countries[i.country] = 1;
      }
    }
    console.log('after  making countries', countries);
    let finalData = [];
    for (let j of Object.keys(countries)) {
      let miniData = { name: j, value: countries[j] };
      finalData.push(miniData);
    }
    console.log('finalFucking data', finalData);
    return finalData;
  }

  /**
   *
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async createNewNgo(
    req: any,
    res: any,
    body: CreateNgoDto,
  ): Promise<responseInterface> {
    console.log(body);
    body.country =
      body.country.includes('Iran') || body.country.includes('iran')
        ? 'Iran'
        : body.country;
    body.password = await bcrypt.hash(body.password, this.saltRounds);
    let token = await this.jwtService.refrshTokenize(
      { userName: body.username },
      '12H',
    );
    let approvedLink = `https://ngo.oceanjourney.ir/ngo/gmail/approve?token=${token}`;
    await this.EmailService.sendResetPasswordEmail(approvedLink, body.email);
    let newNgo = await this.ngoRepository.create(body);
    return {
      message: 'ngo created successfully',
      statusCode: 200,
      data: newNgo,
    };
  }

  /**
   * this rout is for login the ngos
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async login(req: any, res: any, body: loginDTO): Promise<responseInterface> {
    let ngo = await this.ngoRepository.findOne({ username: body.username });
    if (!ngo) {
      return {
        message: 'login failed!',
        statusCode: 400,
        error: 'account not found!',
      };
    }
    if (!ngo.approved) {
      return {
        message: 'login failed',
        statusCode: 403,
        error: 'your registration are not approved by admin yet.',
      };
    }
    console.log(ngo.password);
    console.log(body.password);
    let compare = await bcrypt.compare(body.password, ngo.password);
    if (!compare) {
      return {
        message: 'login failed!',
        statusCode: 403,
        error: 'wrong password',
      };
    }

    let jwtData: tokenizeInterface = {
      id: ngo._id.toString(),
      email: ngo.email,
      userName: ngo.username,
      name: ngo.name,
    };
    let token = await this.jwtService.tokenize(jwtData, '128D');
    let finalNgo = await this.ngoRepository
      .findOne({ username: body.username })
      .select('-password');
    console.log(finalNgo);
    let finalNgo2 = finalNgo.toObject();
    let allDate = {
      allProjects: await this.ngoProject.countDocuments(),
      allDocuments: await this.ngoDocument.countDocuments(),
      ongoing: await this.ngoProject.countDocuments({
        status: { $in: 'ongoing' },
      }),
      complete: await this.ngoProject.countDocuments({
        status: { $in: 'completed' },
      }),
    };
    return {
      message: 'login successfull!',
      statusCode: 200,
      data: {
        ...ngo.toObject(),
        token: token,
        allData: allDate,
      },
    };
  }

  /**
   * its for creating new documents by ngo in his pannel
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async createNewDocument(
    req: any,
    res: any,
    body: createDocumentsDto,
  ): Promise<responseInterface> {
    console.log('body issssss', body);
    let ngo = await this.ngoRepository.findById(req.user.id);
    let newDocument: any = await this.ngoDocument.create({
      ...body,
      ngo: ngo._id,
    });
    ngo.ownDocuments.push(newDocument._id);
    await ngo.save();
    return {
      message: 'document created successfully',
      statusCode: 200,
      // error : 'its for test in error'
      data: newDocument,
    };
  }

  /**
   * its for create new project by ngo in his pannel
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async createNewProject(
    req: any,
    res: any,
    body: createProject,
  ): Promise<responseInterface> {
    try {
      console.log('its >>>', req.user);
      let ngo = await this.ngoRepository.findById(req.user.id);
      console.log('ngo>>', ngo);
      let newProject: any = await this.ngoProject.create({
        ...body,
        ngo: ngo._id,
      });
      ngo.projects.push(newProject._id);
      await ngo.save();
      console.log(newProject);
      return {
      message: 'project created successfully',
      statusCode: 200,
      // error : 'its for test in error'
      data: newProject ,
    };
    } catch (error) {
      console.log('error', error);
      return {
        message: 'project created successfully',
        statusCode: 200,
        data: null,
      };
    }
  }

  /**
   * its for updating project by ngo in his dashboard
   * @param req
   * @param res
   * @param body
   * @param id
   * @returns
   */
  async updateProject(
    req: any,
    res: any,
    body: createProject,
    id: string,
  ): Promise<responseInterface> {
    let ngo = await this.ngoRepository.findById(req.user.id);
    console.log(body);
    console.log(id);
    let project = await this.ngoProject.findById(id).populate('ngo');

    // if (project.ngo._id.toString() != id){

    // }

    if (!project) {
      return {
        message: 'project update failed!',
        statusCode: 400,
        error: 'project not found',
      };
    }

    let newData = { ...project.toObject(), ...body };
    await project.updateOne(newData);
    let updated = await this.ngoProject.findById(id);
    return {
      message: 'project created successfully',
      statusCode: 200,
      data: updated,
    };
  }

  /**
   * its for update documents by ngo in his dashboard
   * @param req
   * @param res
   * @param body
   * @param id
   * @returns
   */
  async updateDocument(
    req: any,
    res: any,
    body: createDocumentsDto,
    id: string,
  ): Promise<responseInterface> {
    let ngo = await this.ngoRepository.findById(req.user.id);

    let Document = await this.ngoDocument.findById(id).populate('ngo');

    // if (Document.ngo._id.toString() != id){

    // }

    if (!Document) {
      return {
        message: 'Document update failed!',
        statusCode: 400,
        error: 'Document not found',
      };
    }

    let newData = { ...Document.toObject(), ...body };
    await Document.updateOne(newData);
    let updated = await this.ngoDocument.findById(id);
    return {
      message: 'Document created successfully',
      statusCode: 200,
      data: updated,
    };
  }

  /**
   * its for delete document by ngo in his dashboard
   * @param req
   * @param res
   * @param id
   * @returns
   */
  async deleteDocuments(
    req: any,
    res: any,
    id: string,
  ): Promise<responseInterface> {
    let ngo = await this.ngoDocument.findById(req.user.id);

    let Document = await this.ngoDocument.findById(id).populate('ngo');

    // if (Document.ngo._id.toString() != id){

    // }

    console.log('its here>>>');

    if (!Document) {
      return {
        message: 'Document update failed!',
        statusCode: 400,
        error: 'Document not found',
      };
    }

    // let newData = {...Document.toObject(),...body }

    let updated = await this.ngoDocument.findByIdAndDelete(id);
    return {
      message: 'project created successfully',
      statusCode: 200,
      data: updated,
    };
  }

  /**
   * its for delete project by ngo in his dashbord
   * @param req
   * @param res
   * @param id
   * @returns
   */
  async deleteProject(
    req: any,
    res: any,
    id: string,
  ): Promise<responseInterface> {
    let ngo = await this.ngoRepository.findById(req.user.id);

    let project = await this.ngoProject.findById(id).populate('ngo');

    // if (project.ngo._id.toString() != id){

    // }

    if (!project) {
      return {
        message: 'project update failed!',
        statusCode: 400,
        error: 'project not found',
      };
    }

    let updated = await this.ngoProject.findByIdAndDelete(id);
    return {
      message: 'project created successfully',
      statusCode: 200,
      data: updated,
    };
  }

  /**
   * its for making project to ongoing status by ngo in his dashboard
   * @param req
   * @param res
   * @param id
   * @returns
   */
  async ongoing(req: any, res: any, id: string): Promise<responseInterface> {
    let ngo = await this.ngoRepository.findById(req.user.id);

    let project = await this.ngoProject.findById(id).populate('ngo');

    // if (project.ngo._id.toString() != id){

    // }

    if (!project) {
      return {
        message: 'project update failed!',
        statusCode: 400,
        error: 'project not found',
      };
    }

    if (project.status.length == 4) {
      return {
        message: 'project update failed!',
        statusCode: 400,
        error: 'project status is full.',
      };
    }

    if (project.status.includes('ongoing')) {
      console.log('its ok', project.status);
      return {
        message: 'project update successfully',
        statusCode: 200,
        data: project,
      };
    }
    project.status.push('ongoing');
    console.log('it fucking data >>>> ', project);
    await project.save();

    return {
      message: 'project update successfully',
      statusCode: 200,
      data: project,
    };
  }

  /**
   * its for geting all ngo's
   * @param req
   * @param res
   * @returns
   */
  async getAllNgo(req: any, res: any): Promise<responseInterface> {
    let page = await this.pageRepository.find();
    let ngoTabel = await this.ngoRepository.find({
      $and: [{ approved: 1 }, { disable: false }],
    });
    console.log(ngoTabel[0]);
    let mapNgo = await this.ngoMaps();
    let newData = { ngoTabel, mapNgo, description: page[0].ngoDescription };
    return {
      message: 'get all ngo successfully',
      statusCode: 200,
      data: newData,
    };
  }

  /**
   * its for get single ngo by ngo id
   * @param req
   * @param res
   * @param ngoId
   * @returns
   */
  async getNgo(req: any, res: any, ngoId: string): Promise<responseInterface> {
    console.log('ff', ngoId);
    let ngo = await this.ngoRepository.findById(ngoId);
    if (!ngo) {
      return {
        message: 'ngo not fount',
        statusCode: 400,
        error: 'سمن مورد نظر یافت نشد',
      };
    }
    console.log(ngo);
    let project = await this.ngoProject
      .find()
      .populate({
        path: 'ngo',
        select: {
          _id: 1,
          name: 1,
          username: 1,
          city: 1,
          countrye: 1,
          nationalId: 1,
          logo: 1,
        },
      })
      .limit(5);
    let Document = await this.ngoDocument.find().limit(5);
    // ngo.ownDocuments = Document;
    let newData = {
      ...ngo.toObject(),
      ownDocuments: Document,
      projects: project,
    };
    let similarNgo = await this.ngoRepository
      .find({approved : 1 , disable : false})
      .sort({ createdAt: -1 })
      .limit(5);
    return {
      message: 'get ngo successfully',
      statusCode: 200,
      data: { ngo: newData, similarNgo },
    };
  }

  /**
   * its for get ngo info in his dashbord by ngo token
   * @param req
   * @param res
   * @returns
   */
  async getNgoInfo(req: any, res: any): Promise<responseInterface> {
    let ngoId: string = req.user.id;
    let ngo = await this.ngoRepository.findById(ngoId);
    // let ongoing = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'Ongoing'}})
    // let completed = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'Completed'}})
    // let goodPractice = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'GoodPractice'}})
    // let collaborationOpportunities = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'CollaborationOpportunities'}})
    return {
      message: 'get ngo successfully',
      statusCode: 200,
      data: ngo,
    };
  }

  /**
   * its for geting ngo project in his own dashboard by token
   * @param req
   * @param res
   * @returns
   */
  async getNgoProjects(req: any, res: any): Promise<responseInterface> {
    console.log('innnnnnnnn');
    let ngoId: string = req.user.id;
    let ngo = await this.ngoRepository.findById(ngoId);
    let ongoing = await this.ngoRepository
      .findById(ngoId)
      .populate({ path: 'projects', match: { status: { $in: 'ongoing' } } })
      .sort({ createdAt: -1 });
    let completed = await this.ngoRepository
      .findById(ngoId)
      .populate({ path: 'projects', match: { status: { $in: 'completed' } } })
      .sort({ createdAt: -1 });
    let goodPractice = await this.ngoRepository
      .findById(ngoId)
      .populate({
        path: 'projects',
        match: { status: { $in: 'goodPractice' } },
      })
      .sort({ createdAt: -1 });
    let collaborationOpportunities = await this.ngoRepository
      .findById(ngoId)
      .populate({
        path: 'projects',
        match: { status: { $in: 'collaborationOpportunities' } },
      })
      .sort({ createdAt: -1 });
    return {
      message: 'get ngo projects successfully',
      statusCode: 200,
      data: {
        ongoing: ongoing.projects,
        completed: completed.projects,
        goodPractice: goodPractice.projects,
        collaborationOpportunities: collaborationOpportunities.projects,
      },
    };
  }

  /**
   * its for making project status to complete by ngo in his own dashboard
   * @param req
   * @param res
   * @param projectId
   * @param body
   * @returns
   */
  async completeProject(
    req: any,
    res: any,
    projectId: string,
    body: completeProject,
  ): Promise<responseInterface> {
    try {
      console.log('its comming here >>>> ', req.user);
      let ngo = await this.ngoRepository.findById(req.user.id);
      if (!ngo) {
        return {
          message: 'get ngo projects successfully',
          statusCode: 400,
          error: 'ngo not found!',
        };
      }
      let project = await this.ngoProject.findById(projectId).populate('ngo');
      if (!project) {
        return {
          message: 'complete project failed',
          statusCode: 400,
          error: 'project not found!',
        };
      }

      // if (project.ngo._id.toString() != req.user.id){
      //   return {
      //     message: 'complete project failed',
      //     statusCode: 403,
      //     error : 'permision denied!'
      //   }
      // }

      if (project.status.length == 4) {
        return {
          message: 'project update failed!',
          statusCode: 400,
          error: 'project status is full.',
        };
      }

      if (project.status.includes('completed')) {
        console.log('its ok', project.status);
        return {
          message: 'complete project done',
          statusCode: 200,
          data: project,
        };
        // project.status.push('completed')
        // project.achivements = body.achivements;
        // await project.save()
      }
      project.status.push('completed');
      let newProject = project.status.filter((item) => {
        return item != 'ongoing';
      });
      console.log(newProject);
      project.status = newProject;
      project.completedAchievements = body.achivements;
      project.completedReports = body.completedReports;
      project.completedEffects = body.completedEffects;
      project.visualDocuments = body.visualDocuments;
      project.documentsAndReport = body.documentsAndReport;
      await project.save();

      let updated = await this.ngoProject.findById(projectId).populate('ngo');
      return {
        message: 'complete project done',
        statusCode: 200,
        data: updated,
      };
    } catch (error) {
      console.log('error in complete project', error);
      return {
        message: 'complete project failed',
        statusCode: 500,
        error: 'internal error',
      };
    }
  }

  /**
   * its for geting ngos documents by ngo in his own dashboard by token
   * @param req
   * @param res
   * @returns
   */
  async getNgosDocument(req: any, res: any): Promise<responseInterface> {
    let ngoId: string = req.user.id;
    let ngo = await this.ngoRepository.findById(ngoId).populate('ownDocuments');
    console.log(ngoId);
    console.log(ngo);
    return {
      message: 'get ngo documents successfully',
      statusCode: 200,
      data: ngo.ownDocuments.reverse(),
    };
  }

  /**
   * its for get ngos document by admin in admin pannel
   * @param req
   * @param res
   * @returns
   */
  async getNgosDocumentByAdmin(req: any, res: any): Promise<responseInterface> {
    let ngo = await this.ngoDocument
      .find()
      .populate({ path: 'ngo', select: ['name', 'username', '_id', 'city'] });
    // console.log(ngoId)
    console.log(ngo);
    return {
      message: 'get ngo documents successfully',
      statusCode: 200,
      data: ngo.reverse(),
    };
  }

  /**
   * its for get ngo project by admin in his admin pannel
   * @param req
   * @param res
   * @returns
   */
  async getNgoProjectsByAdmin(req: any, res: any): Promise<responseInterface> {
    // let ngo = await this.ngoRepository.find()
    let projects = await this.ngoProject
      .find()
      .populate({ path: 'ngo', select: ['name', 'username', 'city', '_id'] })
      .sort({ createdAt: -1 });
    // let ongoing = await this.ngoProject.find({status : {$in : 'ongoing'}}).populate('ngo')
    // let completed = await this.ngoProject.find({status : {$in : 'completed'}}).populate('ngo')
    // let goodPractice = await this.ngoProject.find({status : {$in : 'goodPractice'}}).populate('ngo')
    // let collaborationOpportunities = await this.ngoProject.find({status : {$in : 'collaborationOpportunities'}}).populate('ngo')
    return {
      message: 'get ngo projects successfully',
      statusCode: 200,
      data: projects,
    };
  }

  /**
   * its for get single ngo projects by admin
   * @param req
   * @param res
   * @param id
   * @returns
   */
  async getNgoProjectByAdmin(
    req: any,
    res: any,
    id: string,
  ): Promise<responseInterface> {
    // let ngo = await this.ngoRepository.find()
    let projects = await this.ngoProject
      .findById(id)
      .populate({ path: 'ngo', select: ['name', 'username', 'city', '_id'] })
      .sort({ createdAt: -1 });
    // let ongoing = await this.ngoProject.find({status : {$in : 'ongoing'}}).populate('ngo')
    // let completed = await this.ngoProject.find({status : {$in : 'completed'}}).populate('ngo')
    // let goodPractice = await this.ngoProject.find({status : {$in : 'goodPractice'}}).populate('ngo')
    // let collaborationOpportunities = await this.ngoProject.find({status : {$in : 'collaborationOpportunities'}}).populate('ngo')
    return {
      message: 'get ngo project successfully',
      statusCode: 200,
      data: projects,
    };
  }

  /**
   * its for approve ngos documents by admin in admin pannel
   * @param req
   * @param res
   * @param id
   * @param state
   * @returns
   */
  async approveDocumentByAdmin(
    req: any,
    res: any,
    id: string,
    state: number,
  ): Promise<responseInterface> {
    try {
      let ngo = await this.ngoDocument.findById(id);
      if (state == 2) {
        await ngo.updateOne({ state: 2 });
        let updated = await this.ngoDocument.findById(id);

        return {
          message: 'reject document successfully',
          statusCode: 200,
          data: updated,
        };
      } else if (state == 1) {
        await ngo.updateOne({ state: 1 });
        let updated = await this.ngoDocument.findById(id);

        return {
          message: 'approve document successfully',
          statusCode: 200,
          data: updated,
        };
      } else if (state == 0) {
        await ngo.updateOne({ state: 0 });
        let updated = await this.ngoDocument.findById(id);
        return {
          message: 'pending document successfully',
          statusCode: 200,
          data: updated,
        };
      } else {
        return {
          message: 'pending document successfully',
          statusCode: 400,
          error: 'wrong state inputed',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'enable documents failed',
        statusCode: 250,
        error: 'خطای داخلی سیستم',
      };
    }
  }

  /**
   * its for change project status by admin in admin pannel and bu project id
   * @param req
   * @param res
   * @param id
   * @param state
   * @returns
   */
  async approveProjectByAdmin(
    req: any,
    res: any,
    id: string,
    state: number,
  ): Promise<responseInterface> {
    try {
      let ngo = await this.ngoProject.findById(id);
      if (state == 2) {
        await ngo.updateOne({ state: 2 });
        let updated = await this.ngoProject.findById(id);

        return {
          message: 'reject document successfully',
          statusCode: 200,
          data: updated,
        };
      } else if (state == 1) {
        await ngo.updateOne({ state: 1 });
        let updated = await this.ngoProject.findById(id);

        return {
          message: 'approve document successfully',
          statusCode: 200,
          data: updated,
        };
      } else if (state == 0) {
        await ngo.updateOne({ state: 0 });
        let updated = await this.ngoProject.findById(id);
        return {
          message: 'pending document successfully',
          statusCode: 200,
          data: updated,
        };
      } else {
        return {
          message: 'pending document successfully',
          statusCode: 400,
          error: 'wrong state inputed',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'enable documents failed',
        statusCode: 250,
        error: 'خطای داخلی سیستم',
      };
    }
  }

  /**
   * its for geting ngo data by id for admin pannel
   * @param req
   * @param res
   * @param id
   * @returns
   */
  async getNgoData(req: any, res: any, id: string): Promise<responseInterface> {
    let ngo = await this.ngoRepository.findById(id).populate('projects');

    let ngoDocument = await this.ngoRepository
      .findById(id)
      .populate('ownDocuments');
    console.log(id);

    return {
      message: 'get ngo projects successfully',
      statusCode: 200,
      data: { ngo, ngoDocument },
    };
  }

  /**
   * its fro get all ngo data in admin pannel
   * @param req
   * @param res
   * @returns
   */
  async getNgosData(req: any, res: any): Promise<responseInterface> {
    // let all2 = await this.ngoRepository.find()

    // for (let i of all2){
    //   await i.updateOne({approved : 2})
    // }

    let Approvedngo = await this.ngoRepository
      .find({ approved: 1 })
      .select(['-password']);
    let notApprovedNgo = await this.ngoRepository.find({ approved: 2 });
    let rejectApprovedNgo = await this.ngoRepository.find({ approved: 0 });
    let all = [...notApprovedNgo, ...Approvedngo, ...rejectApprovedNgo];

    return {
      message: 'get ngo projects successfully',
      statusCode: 200,
      data: all,
    };
  }

  /**
   * its for approve ngo by admin in admin pannel
   * @param req
   * @param res
   * @param ngoId
   * @returns
   */
  async approvedNgo(
    req: any,
    res: any,
    ngoId: string,
  ): Promise<responseInterface> {
    let ngo = await this.ngoRepository.findById(ngoId);
    console.log(ngoId);
    if (!ngo) {
      return {
        message: 'سمن مورد نظر یافت نشد',
        statusCode: 400,
        error: 'سمن مورد نظر یافت نشد',
      };
    }

    if (ngo.approved == 1) {
      return {
        message: 'این سمن قبلا تایید شده است',
        statusCode: 409,
        error: 'سمن مورد نظر قبلا تایید شده است',
      };
    }

    await ngo.updateOne({ approved: 1 });

    return {
      message: 'approved ngo',
      statusCode: 200,
      data: ngo,
    };
  }

  /**
   * its for reject ngo by ngo id by admin in admin pannel
   * @param req
   * @param res
   * @param ngoId
   * @returns
   */
  async rejectNgo(
    req: any,
    res: any,
    ngoId: string,
  ): Promise<responseInterface> {
    let ngo = await this.ngoRepository.findById(ngoId);
    if (!ngo) {
      return {
        message: 'سمن مورد نظر یافت نشد',
        statusCode: 400,
        error: 'سمن مورد نظر یافت نشد',
      };
    }

    if (ngo.approved == 0) {
      return {
        message: 'این سمن قبلا رد شده است',
        statusCode: 409,
        error: 'سمن مورد نظر قبلا رد شده است',
      };
    }

    await ngo.updateOne({ approved: 0 });

    return {
      message: 'reject ngo',
      statusCode: 200,
      data: ngo,
    };
  }

  /**
   * its for disable ngo in admin pannel by ngo id
   * @param req
   * @param res
   * @param id
   * @returns
   */
  async disableNgoData(
    req: any,
    res: any,
    id: string,
  ): Promise<responseInterface> {
    let ngo = await this.ngoRepository.findById(id);
    console.log('id isssss>>>>', id);
    if (ngo.disable) {
      // ngo.disable = false;
      await ngo.updateOne({ disable: false });
    } else {
      await ngo.updateOne({ disable: true });
      // ngo.disable = true;
    }
    console.log('after updating >>>> ', ngo);

    let updated = await this.ngoRepository.findById(id);
    console.log(updated);
    return {
      message: 'فعال و غیر فعال کردن سمن ها',
      statusCode: 200,
      data: updated.disable,
    };
  }

  /**
   * its for approve ngo gmail
   * @param req
   * @param res
   * @param token
   * @returns
   */
  async approveGmail(
    req: any,
    res: any,
    token: string,
  ): Promise<responseInterface> {
    let decoded = await this.jwtService.checkRefreshToken(token);
    if (decoded) {
      let user = await this.ngoRepository.findOne({
        username: decoded.userName,
      });
      if (user) {
        user.approved = 1;
        await user.updateOne({ approved: 1 });
        let page = await this.EmailService.getSucceedPage();
        return res.status(200).send(page);
      }
    } else {
      let failedPage = await this.EmailService.getFailedPage();
      return res.status(400).send(failedPage);
    }
  }

  /**
   * its for check token
   * @param req
   * @param res
   * @returns
   */
  async checkToken(req: any, res: any): Promise<responseInterface> {
    console.log('its in check token >>>> ');
    return {
      message: 'true',
      statusCode: 200,
    };
  }
}
