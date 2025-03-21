import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { projectsInterface } from './ngo/entities/project.entity';
import { ngoInterface } from './ngo/entities/ngo.entity';

@Injectable()
export class AppService {

  constructor(@InjectModel('project') private projectRepository: Model<projectsInterface> ,@InjectModel('ngo') private ngoRepository: Model<ngoInterface> ) { }

  async homeData(req: any, res: any) {
    let projects = await this.projectRepository.find().sort({'createdAt' : -1}).limit(4)
    let ngo = await this.ngoRepository.find().sort({'createdAt' : -1}).limit(3)
    return {
      message: 'project created successfully',
      statusCode: 200,
      data: {heroSectionPictures : ['https://thecsruniverse.com/adminxsafe/uploads/20231027105644','https://give.do/blog/wp-content/uploads/2023/08/The-role-of-the-education-NGO-in-India-enthusiastic-children-beneficiaries-education-classroom-preview.jpg'] ,
        midllepartPics : ['https://thecsruniverse.com/adminxsafe/uploads/20231027105644','https://thecsruniverse.com/adminxsafe/uploads/20231027105644','https://thecsruniverse.com/adminxsafe/uploads/20231027105644'],
        projects : projects,
        aboutUsPicture : ['https://thecsruniverse.com/adminxsafe/uploads/20231027105644' ,'https://thecsruniverse.com/adminxsafe/uploads/20231027105644' ],
        aboutUsText : {
          boldPart : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          normalPart : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        },
        ngo,
      }
    }
  }



  async aboutUs(req: any, res: any) {
    let projects = await this.projectRepository.find().sort({'createdAt' : -1}).limit(4)
    let ngo = await this.ngoRepository.find().sort({'createdAt' : -1}).limit(3)
    return {
      message: 'get about us successfully',
      statusCode: 200,
      data : {
        title : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
        middlePartText : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
        middlePartPic : 'https://thecsruniverse.com/adminxsafe/uploads/20231027105644',
        missionAndGoal : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
      }
    }
    }


    async uploadPicture(req : any , res : any ,filename){
      console.log('here is for pictures' , filename)
      let pathes = []
      // if (fin)
      filename.forEach((element) => {
        let url = `https://ngoupload.oceanjourney.ir/${element.filename}`
        pathes.push(url)
      });

      return {
        message: 'uploading pictures',
        statusCode: 200,
        data : pathes
      }


    }


  async projectPage(req: any, res: any) {
    let ongoing = await this.projectRepository.countDocuments({ status: 'Ongoing' })
    let completed = await this.projectRepository.countDocuments({ status: 'Completed' })
    let goodPractice = await this.projectRepository.countDocuments({ status: 'Good Practice' })
    let collaborationOpportunities = await this.projectRepository.countDocuments({ status: 'Collaboration Opportunities' })
    let lastProjects = await this.projectRepository.find().sort({ 'createdAt': -1 }).limit(5)
    let mostParticipation = await this.projectRepository.find().sort({ 'createdAt': -1 }).limit(5)
    return {
      message: 'get all projects page data',
      statusCode: 200,
      data: {
        ongoing: ongoing,
        completed: completed,
        goodPractice: goodPractice,
        collaborationOpportunities: collaborationOpportunities,
        lastProjects: lastProjects,
        mostParticipation: mostParticipation
      }
    }
  }


  async specificProjectsByStatus(req: any, res: any, status: string) {
    let projects = await this.projectRepository.find({ status: status })
    return {
      message: 'get all projects page data by status',
      statusCode: 200,
      data: projects
    }
  }



  async specificProjectsById(req: any, res: any) {
    let projects = await this.projectRepository.find({ status: req.user.id })
    return {
      message: 'get all projects page data by id',
      statusCode: 200,
      data: projects
    }
  }


}
