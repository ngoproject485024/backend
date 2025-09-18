import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { projectsInterface } from './ngo/entities/project.entity';
import { ngoInterface } from './ngo/entities/ngo.entity';
import * as fs from 'fs';
import { documentsInterface } from './ngo/entities/document.entity';
import { pagesInterface } from './entity/pages.entity';
import {
  completeProjectCreation,
  homePage,
  pageDescriptionDto,
} from './dto/homePage.dto';
import { NgoService } from './ngo/ngo.service';
import { createCustomPageDto, updatePageContentDto } from './dto/createCustomPage.dto';
import { customPagesInterface } from './entity/customPage.entity';
import { adminInterface } from './admin/entities/admin.entity';
import { pageContentsInterface } from './entity/pagesContent.entity';
import { createPagesContentDto } from './dto/createPagesContent.dto';
import { EventsInterface } from './events-educations/entities/events.entity';
import { responseInterface } from './interfaces/interfaces.interface';
import langDetection from './services/langDetection';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('project') private projectRepository: Model<projectsInterface>,
    @InjectModel('document')
    private documentRepository: Model<documentsInterface>,
    @InjectModel('customPage')
    private customPAgeRepository: Model<customPagesInterface>,
    @InjectModel('pagesContent')
    private pagesContentRepository: Model<pageContentsInterface>,
    @InjectModel('ngo') private ngoRepository: Model<ngoInterface>,
    @InjectModel('events') private eventRepository: Model<EventsInterface>,
    @InjectModel('admin') private adminModel: Model<adminInterface>,
    @InjectModel('pages') private pageRepository: Model<pagesInterface>,
  ) { }  

  /**
   * here is for setting home page data
   */
  async setHomeData(
    req: any,
    res: any,
    body: homePage,
  ): Promise<responseInterface> {
    // let ff = await this.pageRepository.create({
    //   homPage : {
    //     mainImages: [],
    //     middleImages: [],
    //     peDescription: 'string',
    //     peMiddleImageDescription: 'string',
    //     peProjectDescription: 'string',
    //     peAboutUsDescription: 'string',
    //     peNgoDescription: 'string',
    //     enDescription: 'string',
    //     enMiddleImageDescription: 'string',
    //     enProjectDescription: 'string',
    //     enAboutUsDescription: 'string',
    //     enNgoDescription: 'string',
    //     ruDescription: 'string',
    //     ruMiddleImageDescription: 'string',
    //     ruProjectDescription: 'string',
    //     ruAboutUsDescription: 'string',
    //     ruNgoDescription: 'string',
    //     admin : 'string'
    // }
    // })
    console.log('body is>>', body);
    let pages = await this.pageRepository.find();
    let page = pages[0];
    let admin = `${req.user.firstName} ${req.user.lastName}`;
    page.homPage = { ...body, admin: admin };
    await page.save();
    let updated = await this.pageRepository.find();
    return {
      message: 'updating home page data.',
      statusCode: 200,
      data: updated[0].homPage,
    };
  }

  async setCompletedProjectPage(
    req: any,
    res: any,
    body: completeProjectCreation,
  ): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    let admin = `${req.user.firstName} ${req.user.lastName}`;
    page.completProjects = { ...body, admin: admin };
    await page.save();
    let updated = await this.pageRepository.find();
    return {
      message: 'updating project page data.',
      statusCode: 200,
      data: updated[0].completProjects,
    };
  }

  async getCompleteProjectPage(req: any, res: any): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    return {
      message: 'getting project page data.',
      statusCode: 200,
      data: page.completProjects,
    };
  }

  async setOngongProjectPage(
    req: any,
    res: any,
    body: completeProjectCreation,
  ): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    let admin = `${req.user.firstName} ${req.user.lastName}`;
    page.ongoingProject = { ...body, admin: admin };
    await page.save();
    let updated = await this.pageRepository.find();
    return {
      message: 'updating project page data.',
      statusCode: 200,
      data: updated[0].ongoingProject,
    };
  }

  async getOngoingProjectPage(req: any, res: any): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    return {
      message: 'getting project page data.',
      statusCode: 200,
      data: page.ongoingProject,
    };
  }

  async setgoodPracticeProjectPage(
    req: any,
    res: any,
    body: completeProjectCreation,
  ): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    let admin = `${req.user.firstName} ${req.user.lastName}`;
    page.goodPractice = { ...body, admin: admin };
    await page.save();
    let updated = await this.pageRepository.find();
    return {
      message: 'updating project page data.',
      statusCode: 200,
      data: updated[0].goodPractice,
    };
  }

  async getgoodPracticeProjectPage(
    req: any,
    res: any,
  ): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    return {
      message: 'getting project page data.',
      statusCode: 200,
      data: page.goodPractice,
    };
  }

  async setcollaborationProjectPage(
    req: any,
    res: any,
    body: completeProjectCreation,
  ): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    let admin = `${req.user.firstName} ${req.user.lastName}`;
    page.collaborationOpportunities = { ...body, admin: admin };
    await page.save();
    let updated = await this.pageRepository.find();
    return {
      message: 'updating project page data.',
      statusCode: 200,
      data: updated[0].collaborationOpportunities,
    };
  }

  async setPagesDescription(
    req: any,
    res: any,
    body: Partial<pageDescriptionDto>,
  ): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    let admin = `${req.user.firstName} ${req.user.lastName}`;
    console.log(body);
    if (body.type == 'educations') {
      page.educationAndTrainingDescription = {
        ...body.description,
        admin: admin,
      };
      console.log(page.educationAndTrainingDescription);
      await page.save();
      let updated = await this.pageRepository.find();
      console.log('updated>>>', updated[0].educationAndTrainingDescription);
      return {
        message: 'updating education page data.',
        statusCode: 200,
        data: updated[0].collaborationOpportunities,
      };
    } else if (body.type == 'events') {
      page.eventsDescription = { ...body.description, admin: admin };
      await page.save();
      let updated = await this.pageRepository.find();
      return {
        message: 'updating events page data.',
        statusCode: 200,
        data: updated[0].collaborationOpportunities,
      };
    } else if (body.type == 'archives') {
      page.archivesDescription = { ...body.description, admin: admin };
      await page.save();
      let updated = await this.pageRepository.find();
      return {
        message: 'updating events page data.',
        statusCode: 200,
        data: updated[0].collaborationOpportunities,
      };
    } else if (body.type == 'participation') {
      page.Participation = { ...body.description, admin: admin };
      await page.save();
      let updated = await this.pageRepository.find();
      console.log(updated[0].Participation);
      return {
        message: 'updating events page data.',
        statusCode: 200,
        data: updated[0].Participation,
      };
    } else if (body.type == 'countries') {
      page.countriesDescription = { ...body.description, admin: admin };
      await page.save();
      let updated = await this.pageRepository.find();
      console.log(updated[0].countriesDescription);
      return {
        message: 'updating events page data.',
        statusCode: 200,
        data: updated[0].countriesDescription,
      };
    } else if (body.type == 'ngo') {
      page.ngoDescription = { ...body.description, admin: admin };
      await page.save();
      let updated = await this.pageRepository.find();
      console.log(updated[0].ngoDescription);
      return {
        message: 'updating events page data.',
        statusCode: 200,
        data: updated[0].ngoDescription,
      };
    } else if (body.type == 'ngoRegister') {
      page.ngoRegisterDescription = { ...body.description, admin: admin };
      await page.save();
      let updated = await this.pageRepository.find();
      console.log('its hereeee >>>> ', updated);
      console.log(updated[0].ngoRegisterDescription);
      return {
        message: 'updating events page data.',
        statusCode: 200,
        data: updated[0].ngoRegisterDescription,
      };
    } else if (body.type == 'createProject') {
      page.createProject = { ...body.description, admin: admin };
      await page.save();
      let updated = await this.pageRepository.find();
      console.log('its hereeee >>>> ', updated);
      console.log(updated[0].createProject);
      return {
        message: 'updating events page data.',
        statusCode: 200,
        data: updated[0].createProject,
      };
    } else if (body.type == 'createDocument') {
      page.createDocument = { ...body.description, admin: admin };
      await page.save();
      let updated = await this.pageRepository.find();
      console.log('its hereeee >>>> ', updated);
      console.log(updated[0].createDocument);
      return {
        message: 'updating events page data.',
        statusCode: 200,
        data: updated[0].createDocument,
      };
    } else {
      return {
        message: 'updating events page data.',
        statusCode: 400,
        error: 'wrong inputed type',
      };
    }
  }

  async setFooterData(
    req: any,
    res: any,
    body: any,
  ): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    let admin = `${req.user.firstName} ${req.user.lastName}`;
    page.footer = { ...body, admin: admin };
    await page.save();
    let updated = await this.pageRepository.find();
    return {
      message: 'updating footer data.',
      statusCode: 200,
      data: updated[0].footer,
    };
  }

  async setAboutUs(req: any, res: any, body: any): Promise<responseInterface> {
    console.log('statrrrrtt')
    let pages = await this.pageRepository.find();
    let page = pages[0];
    console.log(body);
    let admin = `${req.user.firstName} ${req.user.lastName}`;
    page.aboutUs = { ...body, admin };
    console.log('222', page.aboutUs);
    await page.save();
    let updated = await this.pageRepository.find();
    return {
      message: 'updating aboutUs data.',
      statusCode: 200,
      data: updated[0].aboutUs,
    };
  }

  async getAboutUs(req: any, res: any): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    return {
      message: 'updating footer data.',
      statusCode: 200,
      data: page.aboutUs,
    };
  }

  async getFooter(req: any, res: any): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    return {
      message: 'updating footer data.',
      statusCode: 200,
      data: page.footer,
    };
  }

  async getDescriptions(
    req: any,
    res: any,
    pageName: string,
  ): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    console.log('get', pageName);
    if (pageName == 'educations') {
      return {
        message: 'updating education page data.',
        statusCode: 200,
        data: page.educationAndTrainingDescription,
      };
    } else if (pageName == 'events') {
      return {
        message: 'updating events page data.',
        statusCode: 200,
        data: page.eventsDescription,
      };
    } else if (pageName == 'archives') {
      return {
        message: 'updating archives page data.',
        statusCode: 200,
        data: page.archivesDescription,
      };
    } else if (pageName == 'statistic') {
      console.log('page>>', pageName);
      console.log('pages>>', page.Participation, page.countriesDescription);
      return {
        message: 'getting statistic page data.',
        statusCode: 200,
        data: {
          participation: page.Participation,
          countriesDescription: page.countriesDescription,
        },
      };
    } else if (pageName == 'ngo') {
      console.log('page>>', pageName);
      console.log('pages>>', page.Participation, page.countriesDescription);
      return {
        message: 'getting ngo description page data.',
        statusCode: 200,
        data: page.ngoDescription,
      };
    } else if (pageName == 'ngoRegister') {
      console.log('page>>', pageName);
      return {
        message: 'getting ngo register page data.',
        statusCode: 200,
        data: page.ngoRegisterDescription,
      };
    } else if (pageName == 'createDocument') {
      console.log('page>>', pageName);
      return {
        message: 'getting ngo create document page data.',
        statusCode: 200,
        data: page.ngoRegisterDescription,
      };
    } else if (pageName == 'createProject') {
      console.log('page>>', pageName);
      return {
        message: 'getting ngo create Project page data.',
        statusCode: 200,
        data: page.ngoRegisterDescription,
      };
    } else {
      return {
        message: 'updating events page data.',
        statusCode: 400,
        error: 'wrong inputed type',
      };
    }
  }

  async getcollaborationProjectPage(
    req: any,
    res: any,
  ): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    let page = pages[0];
    return {
      message: 'getting project page data.',
      statusCode: 200,
      data: page.collaborationOpportunities,
    };
  }

  async homeData(req: any, res: any): Promise<responseInterface> {
    let homePage = await this.pageRepository.find();
    let home = homePage[0].toObject().homPage;
    let projects = await this.projectRepository
      .find({ state: 1 })
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
      .sort({ createdAt: -1 })
      .limit(10);

    let refactorProjects = []

    for (let i of projects) {
      let language = await langDetection(i.description)
      console.log(language)
      let newData = { ...i.toObject(), language: language }
      refactorProjects.push(newData)
    }

    let events = await this.eventRepository
      .find({$and : [
        { $or : [
          {ruPictures: { $ne: [] } },
          {pePictures: { $ne: [] } },
          {enPictures: { $ne: [] } },
        ]},
        {homeEvenets : true}
      ]})
      .sort({ createdAt: -1 })
      .limit(3)
      .select(['_id', 'ruPictures' , 'enPictures' , 'pePictures']);
    // console.log('event is >>>>> ' , events)
    // home.middleImages = events
    delete home.middleImages;
    let newData = { ...home, middleImages: events };
    console.log('new data', newData);
    let ngo = await this.ngoRepository.find({ approved: 1, disable: false }).sort({ createdAt: -1 }).limit(10);
    return {
      message: 'project created successfully',
      statusCode: 200,
      data: {
        home: newData,
        projects: refactorProjects,
        ngo,
      },
    };
  }

  async deleteFile(
    req,
    res,
    body: { fileName: string },
  ): Promise<responseInterface> {
    try {
      let name = body.fileName.split('/');
      let mainName = name[name.length - 1];
      console.log('main nameeeeee', mainName);
      let file = fs.readFileSync(`/home/ngo/uploadFile/${mainName}`);
      console.log(file);
      return {
        message: 'delete file',
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: 'delete file',
        statusCode: 200,
      };
    }
  }

  async aboutUs(req: any, res: any): Promise<responseInterface> {
    let pages = await this.pageRepository.find();
    return {
      message: 'get about us successfully',
      statusCode: 200,
      data: pages[0].aboutUs,
    };
  }

  async uploadPicture(
    req: any,
    res: any,
    filename,
  ): Promise<responseInterface> {
    console.log('here is for pictures', filename);
    let pathes = [];
    // if (fin)
    filename.forEach((element) => {
      let url = `https://cdn.unesco-tichct.ir/${element.filename}`;
      pathes.push(url);
    });
    
    return {
      message: 'uploading pictures',
      statusCode: 200,
      data: pathes,
    };
  }

  async projectPage(req: any, res: any): Promise<responseInterface> {
    let ongoing = await this.projectRepository.countDocuments({
      $and: [{ status: { $in: 'ongoing' } }, { status: { $nin: 'completed' } }],
    });
    let completed = await this.projectRepository.countDocuments({
      status: { $in: 'completed' },
    });
    let goodPractice = await this.projectRepository.countDocuments({
      status: { $in: 'goodPractice' },
    });
    let collaborationOpportunities =
      await this.projectRepository.countDocuments({
        status: { $in: 'collaborationOpportunities' },
      });
    let lastProjects = await this.projectRepository
      .find({ state: 1 })
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
      .sort({ createdAt: -1 })
      .limit(5);
    let mostParticipation = await this.projectRepository
      .find({ state: 1 })
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
      .sort({ createdAt: -1 })
      .limit(5);

    let refactorFirstProjects = []

    for (let i of lastProjects) {
      let language = await langDetection(i.description)
      console.log(language)
      let newData = { ...i.toObject(), language: language }
      refactorFirstProjects.push(newData)
    }

    let refactorSecondProjects = []

    for (let i of mostParticipation) {
      let language = await langDetection(i.description)
      console.log(language)
      let newData = { ...i.toObject(), language: language }
      refactorSecondProjects.push(newData)
    }


    return {
      message: 'get all projects page data',
      statusCode: 200,
      data: {
        ongoing: ongoing,
        completed: completed,
        goodPractice: goodPractice,
        collaborationOpportunities: collaborationOpportunities,
        lastProjects: refactorFirstProjects,
        mostParticipation: refactorSecondProjects,
      },
    };
  }

  async specificProjectsByStatus(
    req: any,
    res: any,
    status: string,
    page: number,
    search: string,
  ): Promise<responseInterface> {
    let projects;
    console.log('search is ', search)
    if (search != '' && search && search != 'undefined') {
      let reg = new RegExp(search)
      console.log('reg is ', reg)
      if (isNaN(+page)) {
        console.log('its here after page >>> ' , page)
        if (status && status == 'ongoing') {
          projects = await this.projectRepository
            .find({
              $and: [{ $and: [{ status: { $in: 'ongoing' } }, { status: { $nin: 'completed' } }] }, { state: 1 }, {
                $or: [
                  { name: { $regex: reg } },
                  { description: { $regex: reg } },
                  { organizationName: { $regex: reg } },
                  { projectManagerName: { $regex: reg } },
                  { projectManagerEmail: { $regex: reg } },
                  { projectManagerPhone: { $regex: reg } },
                  { completedAchievements: { $regex: reg } },
                  { completedReports: { $regex: reg } },
                  { completedEffects: { $regex: reg } },
                  { colleaguesAndStakeholders: { $regex: reg } },
                ]
              }]
            })
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
            });
        } else {
          projects = await this.projectRepository
            .find({
              $and: [{ status: { $in: status } }, { state: 1 }, {
                $or: [
                  { name: { $regex: reg } },
                  { description: { $regex: reg } },
                  { organizationName: { $regex: reg } },
                  { projectManagerName: { $regex: reg } },
                  { projectManagerEmail: { $regex: reg } },
                  { projectManagerPhone: { $regex: reg } },
                  { completedAchievements: { $regex: reg } },
                  { completedReports: { $regex: reg } },
                  { completedEffects: { $regex: reg } },
                  { colleaguesAndStakeholders: { $regex: reg } },
                ]
              }]
            })
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
            });
        }
      } else {
        if (status && status == 'ongoing') {
          projects = await this.projectRepository
            .find({
              $and: [{ $and: [{ status: { $in: 'ongoing' } }, { status: { $nin: 'completed' } }] }, { state: 1 }, {
                $or: [
                  { name: { $regex: reg } },
                  { description: { $regex: reg } },
                  { organizationName: { $regex: reg } },
                  { projectManagerName: { $regex: reg } },
                  { projectManagerEmail: { $regex: reg } },
                  { projectManagerPhone: { $regex: reg } },
                  { completedAchievements: { $regex: reg } },
                  { completedReports: { $regex: reg } },
                  { completedEffects: { $regex: reg } },
                  { colleaguesAndStakeholders: { $regex: reg } },
                ]
              }]
            })
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
            .limit(12)
            .skip((+page - 1) * 10);
        } else {
          projects = await this.projectRepository
            .find({
              $and: [{ status: { $in: status } }, { state: 1 }, {
                $or: [
                  { name: { $regex: reg } },
                  { description: { $regex: reg } },
                  { organizationName: { $regex: reg } },
                  { projectManagerName: { $regex: reg } },
                  { projectManagerEmail: { $regex: reg } },
                  { projectManagerPhone: { $regex: reg } },
                  { completedAchievements: { $regex: reg } },
                  { completedReports: { $regex: reg } },
                  { completedEffects: { $regex: reg } },
                  { colleaguesAndStakeholders: { $regex: reg } },
                ]
              }]
            })
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
            .limit(12)
            .skip((+page - 1) * 10);
        }
      }
    } else {
      if (isNaN(+page)) {
        if (status && status == 'ongoing') {
          projects = await this.projectRepository
            .find({ $and: [{ $and: [{ status: { $in: 'ongoing' } }, { status: { $nin: 'completed' } }] }, { state: 1 }] })
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
            });
        } else {
          projects = await this.projectRepository
            .find({ $and: [{ status: { $in: status } }, { state: 1 }] })
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
            });
        }
      } else {
        if (status && status == 'ongoing') {
          projects = await this.projectRepository
            .find({ $and: [{ $and: [{ status: { $in: 'ongoing' } }, { status: { $nin: 'completed' } }] }, { state: 1 }] })
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
            .limit(12)
            .skip((+page - 1) * 10);
        } else {
          projects = await this.projectRepository
            .find({ $and: [{ status: { $in: status } }, { state: 1 }] })
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
            .limit(12)
            .skip((+page - 1) * 10);
        }
      }
    }



    let all = await this.projectRepository.countDocuments({
      $and: [{ status: { $in: status } }, { state: 1 }],
    });

    let refactorProjects = []

    for (let i of projects) {
      let language = await langDetection(i.description)
      console.log(language)
      let newData = { ...i.toObject(), language: language }
      refactorProjects.push(newData)
    }

    // await this.projectRepository.findOneAndUpdate({name : 'bbbb'} , {status : ['goodPractice']})
    // let projects = await this.projectRepository.find().populate({ path: 'ngo', select: { '_id': 1, 'name': 1, 'username': 1, 'city': 1, 'countrye': 1, 'nationalId': 1, 'logo': 1 } })
    return {
      message: 'get all projects page data by status',
      statusCode: 200,
      data: { all, projects: refactorProjects },
    };
  }

  async getDocuments(
    req: any,
    res: any,
    page: number,
    search: string,
  ): Promise<responseInterface> {
    // let projects = await this.projectRepository.find({ status: {$in : status} })
    // let search : string ;
    // let word = search
    // let pageNumber : number = 0
    // if(!isNaN(+page)){
    //   pageNumber = +page;
    // }
    console.log('search is >>>>> ', search);
    let documents;
    let count;
    if (search) {
      if (search == 'video') {
        documents = await this.documentRepository
          .find({ $and: [{ state: 1 }, { file: { $ne: [] } }] })
          .skip((+page - 1) * 12)
          .limit(12)
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
          });
        count = await this.documentRepository.countDocuments({
          $and: [{ state: 1 }, { file: { $ne: [] } }],
        });
      } else if (
        search == 'image' ||
        search == 'images' ||
        search == 'picture' ||
        search == 'pictures' ||
        search == 'pic'
      ) {
        documents = await this.documentRepository
          .find({ $and: [{ state: 1 }, { file: { $ne: [] } }] })
          .skip((+page - 1) * 12)
          .limit(12)
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
          });
        count = await this.documentRepository.countDocuments({
          $and: [{ state: 1 }, { file: { $ne: [] } }],
        });
      } else {
        let re = new RegExp(search);
        documents = await this.documentRepository
          .find({
            $or: [
              { email: { $regex: re } },
              { interfaceName: { $regex: re } },
              { description: { $regex: re } },
              { phone: { $regex: re } },
              { name: { $regex: re } },
              { title: { $regex: re } },
            ],
          })
          .skip((+page - 1) * 12)
          .limit(12)
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
          });
        count = await this.documentRepository.countDocuments({
          $or: [
            { email: { $regex: re } },
            { interfaceName: { $regex: re } },
            { description: { $regex: re } },
            { phone: { $regex: re } },
            { name: { $regex: re } },
            { title: { $regex: re } },
          ],
        });
      }
    } else {
      console.log('dddd in without search', page);
      documents = await this.documentRepository
        .find({ state: 1 })
        .skip((+page - 1) * 12)
        .limit(12)
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
        });
      count = await this.documentRepository.countDocuments({ state: 1 });
    }

    let refactorDocuments = []

    for (let i of documents) {
      let language = await langDetection(i.description)
      console.log(language)
      let newData = { ...i.toObject(), language: language }
      refactorDocuments.push(newData)
    }


    return {
      message: 'get all documents page data by status',
      statusCode: 200,
      data: { documents: refactorDocuments, all: count },
    };
  }

  async searchDocument(
    req: any,
    res: any,
    id: string,
  ): Promise<responseInterface> {
    // let projects = await this.projectRepository.find({ status: {$in : status} })
    let documents = await this.documentRepository
      .findById(id)
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
      });

    let language = await langDetection(documents.description)
    console.log(language)
    let newData = { ...documents.toObject(), language: language }


    return {
      message: 'get all documents page data by status',
      statusCode: 200,
      data: newData,
    };
  }

  async getSpecificProjectByID(
    req: any,
    res: any,
    id: string,
  ): Promise<responseInterface> {
    // let projects = await this.projectRepository.find({ status: {$in : status} })
    console.log('asdfsdf', id);
    let projects = await this.projectRepository
      .findById(id)
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
      });
    if (!projects) {
      return {
        message: 'get all projects page data by status',
        statusCode: 400,
        error: 'project not founded.',
      };
    }

    let language = await langDetection(projects.description)
    console.log(language)
    let newData = { ...projects.toObject(), language: language }

    for (let i of newData.visualDocuments) {
      console.log(i)

      let keys = Object.keys(i)
      if (keys.length == 0) {
        newData.visualDocuments.splice(newData.visualDocuments.indexOf(i))
      }
    }

    return {
      message: 'get all projects page data by status',
      statusCode: 200,
      data: newData,
    };
  }

  /**
   * this endpoint is for specific project page data
   * @param req
   * @param res
   * @returns
   */
  async specificProjectsById(req: any, res: any): Promise<responseInterface> {
    let projects = await this.projectRepository.find({ status: req.user.id });
    return {
      message: 'get all projects page data by id',
      statusCode: 200,
      data: projects,
    };
  }

  // /**
  //  * this private function is for creating the barcharts
  //  * @returns
  //  */
  // private async barCharts():Promise<> {
  //   let ngos = await this.ngoRepository.find()

  //   let labels = []
  //   let series = []

  //   for (let i = 0; i < ngos.length; i++) {
  //     let elem = ngos[i]
  //     if (!labels.includes(elem.country)) {
  //       labels.push(elem.country)
  //       series.push(1)
  //     } else {
  //       let index = labels.indexOf(elem)
  //       series[index]++;
  //     }
  //   }
  //   return {
  //     labels, series
  //   }
  // }

  // /**
  //  * this end point is for get statistic page data
  //  * @param req
  //  * @param res
  //  */
  // async statisticPage(req: any, res: any):Promise<> {

  //   let donate = await this.barCharts()

  //   let ngos = await this.ngoRepository.find()

  //   let barChart = {
  //     series: [
  //       {
  //         name: "2023",
  //         data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  //       },
  //       {
  //         name: "2024",
  //         data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
  //       },
  //       {
  //         name: "2025",
  //         data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
  //       },
  //     ],
  //     categories: [
  //       "NGO Name",
  //       "NGO Name",
  //       "NGO Name",
  //       "NGO Name",
  //       "NGO Name",
  //       "NGO Name",
  //       "NGO Name",
  //       "NGO Name",
  //       "NGO Name",
  //     ],
  //   }
  // }

  // /**
  //  * this endpoint is for creating the new page
  //  * @param req
  //  * @param res
  //  * @param body
  //  * @returns
  //  */
  // async createNewPage(
  //   req: any,
  //   res: any,
  //   body: createCustomPageDto,
  // ): Promise<responseInterface> {
  //   try {
  //     // let all = await this.customPAgeRepository.find()
  //     // await this.customPAgeRepository.deleteMany(all)
  //     body.path = body.path.trim().replaceAll(' ', '-');
  //     // let existance = await this.customPAgeRepository.find({ path: body.path })
  //     // if (existance.length > 0) {
  //     //   return {
  //     //     message: 'این مسیر قبلا ثبت شده است.',
  //     //     statusCode: 400,
  //     //     error: 'این مسیر قبلا ثبت شده است'
  //     //   }
  //     // }
  //     console.log('page body isssssss >>>> ', body);
  //     let admin = await this.adminModel.findOne({
  //       userName: req.user.userName,
  //     });
  //     let hasSubPage = body.hasSubPage;
  //     let newPage = new this.customPAgeRepository({
  //       Children: [],
  //       peTitle: body.peTitle,
  //       enTitle: body.enTitle,
  //       ruTitle: body.ruTitle,
  //       path: body.path,
  //       hasSubPage: body.hasSubPage,
  //       template: body.template,
  //       admin: admin._id,
  //     });
  //     let savedPage = await newPage.save();
  //     if (hasSubPage) {
  //       let Children = await this.customPAgeRepository.create({
  //         parent: savedPage._id,
  //         peTitle: body.peTitle,
  //         enTitle: body.subPage.enTitle,
  //         ruTitle: body.subPage.ruTitle,
  //         path: body.subPage.path,
  //         hasSubPage: false,
  //         template: body.subPage.template,
  //         admin: admin._id,
  //       });
  //       savedPage.Children.push(Children._id);
  //     }

  //     if (body.hasSecondSubPage) {
  //       let secondChildren = await this.customPAgeRepository.create({
  //         parent: savedPage._id,
  //         peTitle: body.secondSubPage.peTitle,
  //         enTitle: body.secondSubPage.enTitle,
  //         ruTitle: body.secondSubPage.ruTitle,
  //         path: body.secondSubPage.path,
  //         hasSubPage: false,
  //         template: body.secondSubPage.template,
  //         admin: admin._id,
  //       });
  //       savedPage.Children.push(secondChildren._id);
  //     }
  //     await savedPage.updateOne({ Children: savedPage.Children });
  //     let updated = await this.customPAgeRepository
  //       .findById(savedPage._id)
  //       .populate('Children');
  //     console.log('updated saved page isssss', updated);
  //     return {
  //       message: 'ایجاد صفحه جدید با موفقیت انجام شد',
  //       statusCode: 200,
  //       data: updated,
  //     };
  //   } catch (error) {
  //     console.log('error in creating the page and sub page >>', error);
  //     return {
  //       message: 'ایجاد صفحه جدید موفقیت آمیز نبود',
  //       statusCode: 500,
  //       error: 'خطای داخلی سرور',
  //     };
  //   }
  // }



  /**
   * this endpoint is for creating the new page
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async createNewPageV2(
    req: any,
    res: any,
    body: createCustomPageDto,
    pageId: string
  ): Promise<responseInterface> {
    try {
      body.path = body.path.trim().replaceAll(' ', '-');
      let admin = await this.adminModel.findOne({
        userName: req.user.userName,
      });
      if (pageId && pageId != 'undefined') {
        console.log('page id is completed >>>>>>>> ', pageId)
        let parentPage = await this.customPAgeRepository.findById(pageId)
        console.log('page body isssssss >>>> ', body);
        // let hasSubPage = body.hasSubPage;
        let newPage = new this.customPAgeRepository({
          Children: [],
          peTitle: body.peTitle,
          enTitle: body.enTitle,
          ruTitle: body.ruTitle,
          path: body.path,
          hasSubPage: body.hasSubPage,
          admin: admin._id,
        });
        let savedPage = await newPage.save();
        
        let updated = await this.customPAgeRepository
        .findById(savedPage._id)
        .populate('Children');
        console.log('updated saved page isssss', parentPage)
        console.log('updated saved page isssss', updated)
        await parentPage.updateOne({$push:{Children : savedPage._id}})
        await updated.updateOne({parent : parentPage._id})
        let fianlContentRespons = await this.addContent(updated._id.toString(), { peContent: body.peContent, enContent: body.enContent, ruContent: body.ruContent })
        console.log('after creation content for page', fianlContentRespons)
        return {
          message: 'ایجاد صفحه جدید با موفقیت انجام شد',
          statusCode: 200,
          data: updated,
        };
      } 
      console.log('page body isssssss >>>> ', body);
      // let hasSubPage = body.hasSubPage;
      let newPage = new this.customPAgeRepository({
        Children: [],
        peTitle: body.peTitle,
        enTitle: body.enTitle,
        ruTitle: body.ruTitle,
        path: body.path,
        hasSubPage: body.hasSubPage,
        admin: admin._id,
      });
      let savedPage = await newPage.save();

      let updated = await this.customPAgeRepository
        .findById(savedPage._id)
        .populate('Children');
      console.log('updated saved page isssss', updated);

      let fianlContentRespons = await this.addContent(updated._id.toString(), { peContent: body.peContent, enContent: body.enContent, ruContent: body.ruContent })


      console.log('after creation content for page', fianlContentRespons)
      return {
        message: 'ایجاد صفحه جدید با موفقیت انجام شد',
        statusCode: 200,
        data: updated,
      };
    } catch (error) {
      console.log('error in creating the page and sub page >>', error);
      return {
        message: 'ایجاد صفحه جدید موفقیت آمیز نبود',
        statusCode: 500,
        error: 'خطای داخلی سرور',
      };
    }
  }


  private async addContent(id: string, content: {}) {
    try {
      let page = await this.customPAgeRepository.findById(id)
      console.log('id and page issss>>>' , id , page)
      content['page'] = page._id;
      let newContentForPage = await this.pagesContentRepository.create(content)
      console.log('content is >>> ' , newContentForPage)
      await page.updateOne({content : newContentForPage._id})
      return true;
    } catch (error) {
      console.log('error in fucking content page creation', error)
      return false
    }
  }


  async updatePagecontent(pageId : string , body:updatePageContentDto){
    try {
      let page = await this.customPAgeRepository.findById(pageId)
      if (!page){
        return {
          message : 'ٌصفحه مورد نظر یافت نشد',
          statusCode : 400,
          error : 'صفحه مورد نظر یافت نشد'
        }
      }      
      let pageContent= await this.pagesContentRepository.findById(page.content)
      if (!pageContent){
        return {
          message : 'محتوای صفحه مورد نظر یافت نشد',
          statusCode : 400,
          error : 'محتوای صفحه مورد نظر یافت نشد'
        }
      }
      
      await page.updateOne({show : body.show})
      delete body.show;
      
      await this.pagesContentRepository.findByIdAndUpdate(page.content , body)
      let updated = await this.pagesContentRepository.findById(page.content)
      return {
        message : 'محتوای صفحه با موفقیت اپدیت شد',
        statusCode : 200,
        data : updated
      }
    } catch (error) {
        console.log('error in updating page content' , error)
        return {
          message : 'خطای داخلی سیستم',
          statusCode : 500,
          error : 'خطای داخلی سیستم'
        }
    }
  }

  /**
   * this end point is for add content to page
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async addPageContent(
    body: createPagesContentDto,
  ): Promise<responseInterface> {
    try {
      let pageId = body.id;
      if (!pageId) {
        return {
          message: 'لطفا ای را وارد کنید',
          statusCode: 400,
          error: 'wrong inputed id',
        };
      }
      let page = await this.customPAgeRepository.findById(pageId);
      if (!page) {
        return {
          message: 'صفحه مورد نظر یافت نشد',
          statusCode: 400,
          error: 'page not found',
        };
      }
      console.log('body issss >>>', body);
      let createdContent = await this.pagesContentRepository.create(body);
      await page.updateOne({ content: createdContent._id });
      await createdContent.updateOne({ page: page._id });
      return {
        message: 'ایجاد محتوای صفحه موفقیت آمیز بود',
        statusCode: 200,
        data: createdContent,
      };
    } catch (error) {
      console.log('error in adding content to pages >>> ', error);
      return {
        message: 'ایجاد محتوای صفحه موفقیت آمیز نبود',
        statusCode: 500,
        error: 'خطای داخلی سیستم',
      };
    }
  }


  async getPathes(req: any, res: any): Promise<responseInterface> {
    let pages = await this.customPAgeRepository
      .find({ parent: null })
      .populate('Children');
    console.log('pages issss >>> ', pages);
    let all = [];
    for (let i = 0; i < pages.length; i++) {
      let elem = pages[i];
      let label = [elem.peTitle, elem.enTitle, elem.ruTitle];
      let href = elem.path;
      let chilren = [];
      let show = elem.show
      if (elem.Children.length > 0) {
        elem.Children.forEach((rr: any) => {
          let data = {
            label: [rr.peTitle, rr.enTitle, rr.ruTitle],
            href: rr.path,
            show : elem.show
          };
          chilren.push(data);
        });
      }
      let finalData;
      if (chilren.length > 0) {
        finalData = {
          label: label,
          href: href,
          show,
          children: chilren,
        };
      } else {
        finalData = {
          label: label,
          href: href,
          show
        };
      }
      all.push(finalData);
    }
    return {
      message: 'get all pages',
      statusCode: 200,
      data: all,
    };
  }

  async getCustomPageContent(
    req: any,
    res: any,
    path: string,
  ): Promise<responseInterface> {
    let content = await this.customPAgeRepository
      .findOne({ path: path })
      .populate('content');
    if (!content) {
      return {
        message: 'this content not exist',
        statusCode: 400,
        error: 'محتوای این صفحه یافت نشد',
      };
    }
    return {
      message: 'get page content done',
      statusCode: 200,
      data: content,
    };
  }


  /**
   * this endpoint is for getting all customs pages by admin
   * @param req
   * @param res
   * @returns
   */
  async getAllCustomsPages(req: any, res: any): Promise<responseInterface> {
    try {
      let pages = await this.customPAgeRepository
        .find()
        .populate('content');
      return {
        message: 'گرفتن دیتاهای صفحه ها موفق بود',
        statusCode: 200,
        data: pages,
      };
    } catch (error) {
      return {
        message: 'گرفتن دیتاهای صفحه ها ناموفق',
        statusCode: 500,
        error: 'خطای داخلی سرور',
      };
    }
  }



  // /**
  //  * this endpoint is for updating the custom pages
  //  * @param req
  //  * @param res
  //  * @param body
  //  * @param pageId
  //  * @returns
  //  */
  // async updateCustomPages(
  //   req: any,
  //   res: any,
  //   body: createCustomPageDto,
  //   pageId: string,
  // ): Promise<responseInterface> {
  //   try {
  //     body.path = body.path.trim().replaceAll(' ', '-');
  //     let existedPage = await this.customPAgeRepository.findById(pageId);
  //     if (!existedPage) {
  //       return {
  //         message: 'صفحه مورد نظر یافت نشد',
  //         statusCode: 400,
  //         error: 'صفحه مورد نظر یافت نشد',
  //       };
  //     }
  //     if (existedPage.path != body.path) {
  //       let existance = await this.customPAgeRepository.find({
  //         path: body.path,
  //       });
  //       if (existance.length > 0) {
  //         return {
  //           message: 'این مسیر قبلا ثبت شده است.',
  //           statusCode: 400,
  //           error: 'این مسیر قبلا ثبت شده است',
  //         };
  //       }
  //     }
  //     let admin = await this.adminModel.findOne({
  //       userName: req.user.userName,
  //     });
  //     let hasSubPage = body.hasSubPage;

  //     let newData = { ...existedPage.toObject(), ...body };

  //     let savedPage = await existedPage.updateOne(newData);
  //     if (hasSubPage) {
  //       let Children = await this.customPAgeRepository.create({
  //         parent: savedPage._id,
  //         enTitle: body.subPage.enTitle,
  //         ruTitle: body.subPage.ruTitle,
  //         path: body.subPage.path,
  //         hasSubPage: false,
  //         template: body.subPage.template,
  //         admin: admin._id,
  //       });
  //       await savedPage.updateOne({ Children: Children._id });
  //     }
  //     let updated = await this.customPAgeRepository
  //       .findById(savedPage._id)
  //       .populate('Children');
  //     return {
  //       message: 'ایجاد صفحه جدید با موفقیت انجام شد',
  //       statusCode: 200,
  //       data: updated,
  //     };
  //   } catch (error) {
  //     console.log('error in creating the page and sub page >>', error);
  //     return {
  //       message: 'ایجاد صفحه جدید موفقیت آمیز نبود',
  //       statusCode: 500,
  //       error: 'خطای داخلی سرور',
  //     };
  //   }
  // }



  /**
   * this end point is for delete the custom page
   * @param req
   * @param res
   * @param pageId
   * @returns
   */
  async deleteCustomPage(
    req: any,
    res: any,
    pageId: string,
  ): Promise<responseInterface> {
    try {
      let existancePage = await this.customPAgeRepository
        .findById(pageId)
        .populate('content');
      if (!existancePage) {
        return {
          message: 'صفحه مورد نظر یافت نشد',
          statusCode: 400,
          error: 'صفحه مورد نظر یافت نشد',
        };
      }
      if (existancePage.content) {
        await this.pagesContentRepository.findByIdAndDelete(
          existancePage.content._id,
        );
      }
      await this.customPAgeRepository.findByIdAndDelete(pageId);
      return {
        message: 'صفحه مورد نظر یا موفقیت حذف شد',
        statusCode: 200,
        data: '',
      };
    } catch (error) {
      console.log('error occured in deleting custom pages', error);
      return {
        message: 'صفحه مورد نظر حذف نشد',
        statusCode: 500,
        error: 'خطای داخلی سرور',
      };
    }
  }



  /**
   * this is for making chart data's
   * @param req
   * @param res
   * @param name
   * @returns
   */
  async charts(req: any, res: any, name: string): Promise<responseInterface> {
    let data;

    return {
      message: 'done',
      statusCode: 200,
      data: data,
    };
  }






  /**
   * its a api for deleting all pages
   * @returns 
   */
  async refreshAllDynamicPages(){
      await this.ngoRepository.deleteMany({})
      await this.projectRepository.deleteMany({})
      await this.documentRepository.deleteMany({})
      
      return {
        message : 'done',
        statusCode : 200,
      }
  }




  /////////////// final line //////////////////////
}
