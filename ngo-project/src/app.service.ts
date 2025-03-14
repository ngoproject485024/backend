import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { projectsInterface } from './ngo/entities/project.entity';

@Injectable()
export class AppService {

  constructor(@InjectModel('project') private projectRepository: Model<projectsInterface>) { }

  async homeData(req: any, res: any) {
    return {
      message: 'project created successfully',
      statusCode: 200,
      data: 'test pass'
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
