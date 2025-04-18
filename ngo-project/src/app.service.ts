import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { projectsInterface } from './ngo/entities/project.entity';
import { ngoInterface } from './ngo/entities/ngo.entity';
import * as fs from 'fs';
import { documentsInterface } from './ngo/entities/document.entity';
import { pagesInterface } from './entity/pages.entity';
import { completeProjectCreation, homePage, pageDescriptionDto } from './dto/homePage.dto';

@Injectable()
export class AppService {

  constructor(@InjectModel('project') private projectRepository: Model<projectsInterface> ,
  @InjectModel('document') private documentRepository: Model<documentsInterface> ,
  @InjectModel('ngo') private ngoRepository: Model<ngoInterface>,
  @InjectModel('pages') private pageRepository: Model<pagesInterface> )
{ }



  /**
   * here is for setting home page data
   */
  async setHomeData(req  : any , res : any , body : homePage) {
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

    let pages = await this.pageRepository.find()
    let page = pages[0]
    let admin = `${req.user.firstName} ${req.user.lastName}`
    page.homPage = {...body , admin : admin};
    await page.save()
    let updated  = await this.pageRepository.find()

    return {
      message : 'updating home page data.',
      statusCode : 200,
      data : updated[0].homPage
    }

  }



  async setCompletedProjectPage(req  : any , res : any , body : completeProjectCreation){
    let pages = await this.pageRepository.find()
    let page = pages[0]
    let admin = `${req.user.firstName} ${req.user.lastName}`
    page.completProjects = {...body , admin : admin}  
    await page.save()
    let updated = await this.pageRepository.find()
    return {
      message : 'updating project page data.',
      statusCode : 200,
      data : updated[0].completProjects
    }
  }





  async getCompleteProjectPage(req  : any , res : any ){
    let pages = await this.pageRepository.find()
    let page = pages[0]
    return {
      message : 'getting project page data.',
      statusCode : 200,
      data : page.completProjects
    }
  }



  async setOngongProjectPage(req  : any , res : any , body : completeProjectCreation){
    let pages = await this.pageRepository.find()
    let page = pages[0]
    let admin = `${req.user.firstName} ${req.user.lastName}`
    page.ongoingProject = {...body , admin : admin}  
    await page.save()
    let updated = await this.pageRepository.find()
    return {
      message : 'updating project page data.',
      statusCode : 200,
      data : updated[0].ongoingProject
    }
  }


  async getOngoingProjectPage(req  : any , res : any ){
    let pages = await this.pageRepository.find()
    let page = pages[0]
    return {
      message : 'getting project page data.',
      statusCode : 200,
      data : page.ongoingProject
    }
  }




  async setgoodPracticeProjectPage(req  : any , res : any , body : completeProjectCreation){
    let pages = await this.pageRepository.find()
    let page = pages[0]
    let admin = `${req.user.firstName} ${req.user.lastName}`
    page.goodPractice = {...body , admin : admin}  
    await page.save()
    let updated = await this.pageRepository.find()
    return {
      message : 'updating project page data.',
      statusCode : 200,
      data : updated[0].goodPractice
    }
  }


  async getgoodPracticeProjectPage(req  : any , res : any ){
    let pages = await this.pageRepository.find()
    let page = pages[0]
    return {
      message : 'getting project page data.',
      statusCode : 200,
      data : page.goodPractice
    }
  }



  async setcollaborationProjectPage(req  : any , res : any , body : completeProjectCreation){
    let pages = await this.pageRepository.find()
    let page = pages[0]
    let admin = `${req.user.firstName} ${req.user.lastName}`
    page.collaborationOpportunities = {...body , admin : admin}  
    await page.save()
    let updated = await this.pageRepository.find()
    return {
      message : 'updating project page data.',
      statusCode : 200,
      data : updated[0].collaborationOpportunities
    }
  }




  async setPagesDescription(req  : any , res : any , body : pageDescriptionDto){
    let pages = await this.pageRepository.find()
    let page = pages[0]
    let admin = `${req.user.firstName} ${req.user.lastName}`

    if (body.type == "educations"){
      page.educationAndTrainingDescription = {...body.description , admin : admin}  
      await page.save()
      let updated = await this.pageRepository.find()
      return {
        message : 'updating education page data.',
        statusCode : 200,
        data : updated[0].collaborationOpportunities
      }
    }else if (body.type == 'events'){
      page.eventsDescription = {...body.description , admin : admin}  
      await page.save()
      let updated = await this.pageRepository.find()
      return {
        message : 'updating events page data.',
        statusCode : 200,
        data : updated[0].collaborationOpportunities
      }
    }else if (body.type == 'archives'){
      page.archivesDescription = {...body.description , admin : admin}  
      await page.save()
      let updated = await this.pageRepository.find()
      return {
        message : 'updating events page data.',
        statusCode : 200,
        data : updated[0].collaborationOpportunities
      }
    }else{
      return {
        message : 'updating events page data.',
        statusCode : 400,
        error : 'wrong inputed type'
      }
    }
  }



  async setFooterData(req: any, res: any, body: any) {
    let pages = await this.pageRepository.find()
    let page = pages[0]
    let admin = `${req.user.firstName} ${req.user.lastName}`
    page.footer = { ...body , admin: admin }
    await page.save()
    let updated = await this.pageRepository.find()
    return {
      message: 'updating footer data.',
      statusCode: 200,
      data: updated[0].footer
    }
  }




  async getFooter(req: any, res: any) {
    let pages = await this.pageRepository.find()
    let page = pages[0]
    return {
      message: 'updating footer data.',
      statusCode: 200,
      data: page.footer
    }
  }




  async getDescriptions(req  : any , res : any , pageName : string){
    let pages = await this.pageRepository.find()
    let page = pages[0]
    let admin = `${req.user.firstName} ${req.user.lastName}`

    if (pageName == "educations"){
      return {
        message : 'updating education page data.',
        statusCode : 200,
        data : page.collaborationOpportunities
      }
    }else if (pageName == 'events'){
      return {
        message : 'updating events page data.',
        statusCode : 200,
        data : page.collaborationOpportunities
      }
    }else if (pageName == 'archives'){
      return {
        message : 'updating events page data.',
        statusCode : 200,
        data : page.collaborationOpportunities
      }
    }else{
      return {
        message : 'updating events page data.',
        statusCode : 400,
        error : 'wrong inputed type'
      }
    }
  }


  


  async getcollaborationProjectPage(req  : any , res : any ){
    let pages = await this.pageRepository.find()
    let page = pages[0]
    return {
      message : 'getting project page data.',
      statusCode : 200,
      data : page.collaborationOpportunities
    }
  }




  async homeData(req: any, res: any) {
    let homePage = await this.pageRepository.find()
    let home = homePage[0].homPage
    let projects = await this.projectRepository.find().sort({'createdAt' : -1}).limit(4)
    let ngo = await this.ngoRepository.find().sort({'createdAt' : -1}).limit(3)
    return {
      message: 'project created successfully',
      statusCode: 200,
      data: {
        home,
        projects : projects,
        ngo,
      }
    }
  }



  async deleteFile(req , res , body : {fileName : string}){
    try {
      let name = body.fileName.split('/')
      let mainName = name[name.length-1]
      console.log('main nameeeeee' , mainName)
      let file = fs.readFileSync(`/home/ngo/uploadFile/${mainName}`)
      console.log(file)
      return {
        message : "delete file",
        statusCode : 200,
      }

    } catch (error) {
      return {
        message : 'delete file',
        statusCode : 200,
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
    let ongoing = await this.projectRepository.countDocuments({ status:  { $in :'ongoing'} })
    let completed = await this.projectRepository.countDocuments({status:  {$in :'completed'}})
    let goodPractice = await this.projectRepository.countDocuments({status: {$in : 'goodPractice'}})
    let collaborationOpportunities = await this.projectRepository.countDocuments({status: {$in : 'collaborationOpportunities'}})
    let lastProjects = await this.projectRepository.find().populate({path : 'ngo' , select : {'_id' : 1 , 'name' : 1 , 'username' : 1 , 'city': 1 , 'countrye' : 1 , 'nationalId' : 1}}).sort({ 'createdAt': -1 }).limit(5)
    let mostParticipation = await this.projectRepository.find().populate({path : 'ngo' , select : {'_id' : 1 , 'name' : 1 , 'username' : 1 , 'city': 1 , 'countrye' : 1 , 'nationalId' : 1}}).sort({ 'createdAt': -1 }).limit(5)
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

  async specificProjectsByStatus(req: any, res: any, status: string , page : number) {
    // let projects = await this.projectRepository.find({ status: {$in : status} })
    // await this.projectRepository.findOneAndUpdate({name : 'bbbb'} , {status : ['goodPractice']})
    let projects = await this.projectRepository.find().populate({path : 'ngo' , select : {'_id' : 1 , 'name' : 1 , 'username' : 1 , 'city': 1 , 'countrye' : 1 , 'nationalId' : 1}}) 
    return {
      message: 'get all projects page data by status',
      statusCode: 200,
      data: projects
    }
  }


  async getDocuments(req: any, res: any, page : number , search : string) {
    // let projects = await this.projectRepository.find({ status: {$in : status} })
    // let search : string ;
    // let word = search
    console.log(search)
    let documents ;
    if (search){
      if (search == 'video'){
        documents = await this.documentRepository.find({file: { $ne: []}}).populate({path : 'ngo' , select : {'_id' : 1 , 'name' : 1 , 'username' : 1 , 'city': 1 , 'countrye' : 1 , 'nationalId' : 1}})
      }
      else if (search == 'image' || search == 'images' || search == 'picture' || search == 'pictures' || search == 'pic'){
        documents = await this.documentRepository.find({file: { $ne: []}}).populate({path : 'ngo' , select : {'_id' : 1 , 'name' : 1 , 'username' : 1 , 'city': 1 , 'countrye' : 1 , 'nationalId' : 1}})
      }
      else{
        let re = new RegExp(search)
        documents = await this.documentRepository.find({$or : [{email : {$regex: re}} , {interfaceName : {$regex: re}} , {description : {$regex: re}} , {phone : {$regex: re}},{name : {$regex: re}},{title : {$regex: re}}]}).populate({path : 'ngo' , select : {'_id' : 1 , 'name' : 1 , 'username' : 1 , 'city': 1 , 'countrye' : 1 , 'nationalId' : 1}})
      }
    }else {
      console.log('dddd')
      documents = await this.documentRepository.find().populate({path : 'ngo' , select : {'_id' : 1 , 'name' : 1 , 'username' : 1 , 'city': 1 , 'countrye' : 1 , 'nationalId' : 1}}) 
    }
    console.log('dddd' , documents)
    
    return {
      message: 'get all documents page data by status',
      statusCode: 200,
      data: documents
    }
  }


  async searchDocument(req: any, res: any, id : string) {
    // let projects = await this.projectRepository.find({ status: {$in : status} })
    let documents = await this.documentRepository.findById(id).populate({path : 'ngo' , select : {'_id' : 1 , 'name' : 1 , 'username' : 1 , 'city': 1 , 'countrye' : 1 , 'nationalId' : 1}})
    return {
      message: 'get all documents page data by status',
      statusCode: 200,
      data: documents
    }
  }




  async getSpecificProjectByID(req: any, res: any, id : string) {
    // let projects = await this.projectRepository.find({ status: {$in : status} })
    let projects = await this.projectRepository.findById(id).populate({path : 'ngo' , select : {'_id' : 1 , 'name' : 1 , 'username' : 1 , 'city': 1 , 'countrye' : 1 , 'nationalId' : 1}})
    if (!projects){
      return {
        message: 'get all projects page data by status',
        statusCode: 400,
        error : 'project not founded.'
      }   
    }
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
