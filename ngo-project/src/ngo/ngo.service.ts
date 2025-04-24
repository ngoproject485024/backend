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
import { tokenizeInterface } from 'src/interfaces/interfaces.interface';
import { completeProject } from './dto/completeProject.dto';
import { error } from 'console';




@Injectable()
export class NgoService {
  saltRounds = 10;
  constructor(@InjectModel('ngo') private ngoRepository: Model<ngoInterface>,
    @InjectModel('document') private ngoDocument: Model<documentsInterface>,
    @InjectModel('project') private ngoProject: Model<projectsInterface>,
    private readonly jwtService: jwtService
  ) { }



  async ngoMaps() {
    let ngos = await this.ngoRepository.find()
    let countries = {}
    for (let i of ngos) {
      if (countries[i.country]) {
        countries[i.country] += 1;
      } else {
        countries[i.country] = 1
      }
    }
    console.log('after  making countries', countries)
    let finalData = [['Country', 'NGO']]
    for (let j of Object.keys(countries)) {
      let miniData = [j, countries[j]]
      finalData.push(miniData)
    }
    console.log('finalFucking data', finalData)
    return finalData
  }

  /**
   * 
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async createNewNgo(req: any, res: any, body: CreateNgoDto) {
    console.log(body)
    body.password = await bcrypt.hash(body.password, this.saltRounds)
    let newNgo = await this.ngoRepository.create(body)
    return {
      message: 'ngo created successfully',
      statusCode: 200,
      data: newNgo
    }
  }

  /**
   * this rout is for login the ngos
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async login(req: any, res: any, body: loginDTO) {
    let ngo = await this.ngoRepository.findOne({ username: body.username })
    if (!ngo) {
      return {
        message: 'login failed!',
        statusCode: 400,
        error: 'account not found!'
      }
    }
    console.log(ngo.password)
    console.log(body.password)
    let compare = await bcrypt.compare(body.password, ngo.password)
    if (!compare) {
      return {
        message: 'login failed!',
        statusCode: 403,
        error: 'wrong password'
      }
    }

    let jwtData: tokenizeInterface = {
      id: ngo._id.toString(),
      email: ngo.email,
      userName: ngo.username,
      name: ngo.name,
    }
    let token = await this.jwtService.tokenize(jwtData, '12H')
    let finalNgo = await this.ngoRepository.findOne({ username: body.username }).select('-password')
    console.log(finalNgo)
    let finalNgo2 = finalNgo.toObject()
    return {
      message: 'login successfull!',
      statusCode: 200,
      data: {
        ...(ngo.toObject()), token: token
      }
    }
  }


  async createNewDocument(req: any, res: any, body: createDocumentsDto) {
    let ngo = await this.ngoRepository.findById(req.user.id)
    // console.log(body)
    let newDocument: any = await this.ngoDocument.create({ ...body, ngo: ngo._id })
    ngo.ownDocuments.push(newDocument._id)
    await ngo.save()
    return {
      message: 'document created successfully',
      statusCode: 200,
      data: newDocument
    }
  }


  async createNewProject(req: any, res: any, body: createProject) {
    try {
      console.log('its >>>', req.user)
      let ngo = await this.ngoRepository.findById(req.user.id)
      console.log('ngo>>', ngo)
      let newProject: any = await this.ngoProject.create({ ...body, ngo: ngo._id })
      ngo.projects.push(newProject._id)
      await ngo.save()
      console.log(newProject)
      return {
        message: 'project created successfully',
        statusCode: 200,
        data: newProject
      }
    } catch (error) {
      console.log('error', error)
      return {
        message: 'project created successfully',
        statusCode: 200,
        data: null
      }
    }
  }



  async updateProject(req: any, res: any, body: createProject, id: string) {
    let ngo = await this.ngoRepository.findById(req.user.id)
    console.log(body)
    console.log(id)
    let project = await this.ngoProject.findById(id).populate('ngo')

    // if (project.ngo._id.toString() != id){

    // }

    if (!project) {
      return {
        message: 'project update failed!',
        statusCode: 400,
        error: 'project not found'
      }
    }

    let newData = { ...project.toObject(), ...body }
    await project.updateOne(newData)
    let updated = await this.ngoProject.findById(id)
    return {
      message: 'project created successfully',
      statusCode: 200,
      data: updated
    }
  }



  async updateDocument(req: any, res: any, body: createDocumentsDto, id: string) {
    let ngo = await this.ngoRepository.findById(req.user.id)

    let Document = await this.ngoDocument.findById(id).populate('ngo')

    // if (Document.ngo._id.toString() != id){

    // }

    if (!Document) {
      return {
        message: 'Document update failed!',
        statusCode: 400,
        error: 'Document not found'
      }
    }

    let newData = { ...Document.toObject(), ...body }
    await Document.updateOne(newData)
    let updated = await this.ngoDocument.findById(id)
    return {
      message: 'Document created successfully',
      statusCode: 200,
      data: updated
    }
  }



  async deleteDocuments(req: any, res: any, id: string) {
    let ngo = await this.ngoDocument.findById(req.user.id)

    let Document = await this.ngoDocument.findById(id).populate('ngo')

    // if (Document.ngo._id.toString() != id){

    // }

    console.log('its here>>>',)

    if (!Document) {
      return {
        message: 'Document update failed!',
        statusCode: 400,
        error: 'Document not found'
      }
    }

    // let newData = {...Document.toObject(),...body }

    let updated = await this.ngoDocument.findByIdAndDelete(id)
    return {
      message: 'project created successfully',
      statusCode: 200,
      data: updated
    }
  }


  async deleteProject(req: any, res: any, id: string) {
    let ngo = await this.ngoRepository.findById(req.user.id)

    let project = await this.ngoProject.findById(id).populate('ngo')

    // if (project.ngo._id.toString() != id){

    // }

    if (!project) {
      return {
        message: 'project update failed!',
        statusCode: 400,
        error: 'project not found'
      }
    }

    let updated = await this.ngoProject.findByIdAndDelete(id)
    return {
      message: 'project created successfully',
      statusCode: 200,
      data: updated
    }
  }




  async ongoing(req: any, res: any, id: string) {
    let ngo = await this.ngoRepository.findById(req.user.id)

    let project = await this.ngoProject.findById(id).populate('ngo')

    // if (project.ngo._id.toString() != id){

    // }

    if (!project) {
      return {
        message: 'project update failed!',
        statusCode: 400,
        error: 'project not found'
      }
    }


    if (project.status.length == 4) {
      return {
        message: 'project update failed!',
        statusCode: 400,
        error: 'project status is full.'
      }
    }


    if (project.status.includes('ongoing')) {
      console.log('its ok', project.status)
      return {
        message: 'project update successfully',
        statusCode: 200,
        data: project
      }
    }
    project.status.push('ongoing')
    await project.save()

    return {
      message: 'project update successfully',
      statusCode: 200,
      data: project
    }
  }


  async getAllNgo(req: any, res: any) {
    let ngoTabel = await this.ngoRepository.find()
    console.log(ngoTabel[0])
    let mapNgo = await this.ngoMaps()
    return {
      message: 'get all ngo successfully',
      statusCode: 200,
      data: {
        ngoTabel, mapNgo
      }
    }
  }


  async getNgo(req: any, res: any, ngoId: string) {
    console.log('ff', ngoId)
    let ngo = await this.ngoRepository.findById(ngoId)
    console.log(ngo)
    let project = await this.ngoProject.find().limit(2)
    let Document = await this.ngoDocument.find().limit(2)
    // ngo.ownDocuments = Document;
    let newData = { ...ngo.toObject(), ownDocuments: Document, projects: project }
    let similarNgo = await this.ngoRepository.find().sort({ 'createdAt': -1 }).limit(5)
    return {
      message: 'get ngo successfully',
      statusCode: 200,
      data: { ngo: newData, similarNgo }
    }
  }


  async getNgoInfo(req: any, res: any) {
    let ngoId: string = req.user.id;
    let ngo = await this.ngoRepository.findById(ngoId)
    // let ongoing = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'Ongoing'}})
    // let completed = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'Completed'}})
    // let goodPractice = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'GoodPractice'}})
    // let collaborationOpportunities = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'CollaborationOpportunities'}})
    return {
      message: 'get ngo successfully',
      statusCode: 200,
      data: ngo
    }
  }



  async getNgoProjects(req: any, res: any) {
    console.log('innnnnnnnn')
    let ngoId: string = req.user.id;
    let ngo = await this.ngoRepository.findById(ngoId)
    let ongoing = await this.ngoRepository.findById(ngoId).populate({ path: 'projects', match: { status: { $in: 'ongoing' } } })
    let completed = await this.ngoRepository.findById(ngoId).populate({ path: 'projects', match: { status: { $in: 'completed' } } })
    let goodPractice = await this.ngoRepository.findById(ngoId).populate({ path: 'projects', match: { status: { $in: 'goodPractice' } } })
    let collaborationOpportunities = await this.ngoRepository.findById(ngoId).populate({ path: 'projects', match: { status: { $in: 'collaborationOpportunities' } } })
    return {
      message: 'get ngo projects successfully',
      statusCode: 200,
      data: { ongoing: ongoing.projects, completed: completed.projects, goodPractice: goodPractice.projects, collaborationOpportunities: collaborationOpportunities.projects }
    }
  }



  async completeProject(req: any, res: any, body: completeProject) {
    try {
      let ngo = await this.ngoRepository.findById(req.user.id)
      if (!ngo) {
        return {
          message: 'get ngo projects successfully',
          statusCode: 400,
          error: 'ngo not found!'
        }
      }
      let project = await this.ngoProject.findById(body.id).populate('ngo')
      if (!project) {
        return {
          message: 'complete project failed',
          statusCode: 400,
          error: 'project not found!'
        }
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
          error: 'project status is full.'
        }
      }


      if (project.status.includes('completed')) {
        console.log('its ok', project.status)
        return {
          message: 'complete project done',
          statusCode: 200,
          data: project
        }
        // project.status.push('completed')
        // project.achivements = body.achivements;
        // await project.save()
      }
      project.status.push('completed')
      let newProject = project.status.filter((item) => {
        return item != 'ongoing'
      })
      console.log(newProject)
      project.status = newProject;
      project.achivements = body.achivements;
      await project.save()

      let updated = await this.ngoProject.findById(body.id).populate('ngo')
      return {
        message: 'complete project done',
        statusCode: 200,
        data: updated
      }

    } catch (error) {
      console.log('error in complete project', error)
      return {
        message: 'complete project failed',
        statusCode: 500,
        error: 'internal error'
      }
    }
  }



  async getNgosDocument(req: any, res: any) {
    let ngoId: string = req.user.id;
    let ngo = await this.ngoRepository.findById(ngoId).populate('ownDocuments')
    console.log(ngoId)
    console.log(ngo)
    return {
      message: 'get ngo documents successfully',
      statusCode: 200,
      data: ngo.ownDocuments
    }
  }



  async getNgosDocumentByAdmin(req: any, res: any) {
    let ngo = await this.ngoDocument.find()
    // console.log(ngoId)
    console.log(ngo)
    return {
      message: 'get ngo documents successfully',
      statusCode: 200,
      data: ngo
    }
  }



  async getNgoProjectsByAdmin(req: any, res: any) {
    // let ngo = await this.ngoRepository.find()
    let ongoing = await this.ngoProject.find({status : {$in : 'ongoing'}}).populate('ngo')
    let completed = await this.ngoProject.find({status : {$in : 'completed'}}).populate('ngo')
    let goodPractice = await this.ngoProject.find({status : {$in : 'goodPractice'}}).populate('ngo')
    let collaborationOpportunities = await this.ngoProject.find({status : {$in : 'collaborationOpportunities'}}).populate('ngo')
    return {
      message: 'get ngo projects successfully',
      statusCode: 200,
      data: { ongoing: ongoing, completed: completed, goodPractice: goodPractice, collaborationOpportunities: collaborationOpportunities }
    }
  }



  async approveDocumentByAdmin(req: any, res: any, id: string, reject: boolean) {
    try {
      let ngo = await this.ngoDocument.findById(id)
      if (reject == true) {
        ngo.state == 2;
        await ngo.save()
        return {
          message: 'reject document successfully',
          statusCode: 200,
          data: ngo
        }
      }
      // console.log(ngoId)
      console.log(ngo)
      if (ngo.state == 1) {
        ngo.state = 0;
        await ngo.save()
        return {
          message: 'disable document successfully',
          statusCode: 200,
          data: ngo
        }
      } else {
        ngo.state = 1;
        await ngo.save()
        return {
          message: 'enable documents successfully',
          statusCode: 200,
          data: ngo
        }
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'enable documents failed',
        statusCode: 250,
        error: "خطای داخلی سیستم"
      }
    }
  }



  


  async getNgoData(req: any, res: any , id : string) {

    let ngo = await this.ngoRepository.findById(id).populate('projects')
    
    let ngoDocument = await this.ngoRepository.findById(id).populate('ownDocuments')
    console.log(id)
    
    return {
      message: 'get ngo projects successfully',
      statusCode: 200,
      data : {ngo , ngoDocument}
    }
  }


  async getNgosData(req: any, res: any) {

    let ngo = await this.ngoRepository.find().select(['-password'])
    
    return {
      message: 'get ngo projects successfully',
      statusCode: 200,
      data : ngo
    }
  }

}
