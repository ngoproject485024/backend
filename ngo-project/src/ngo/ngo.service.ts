import { Inject, Injectable } from '@nestjs/common';
import { CreateNgoDto } from './dto/create-ngo.dto';
import { UpdateNgoDto } from './dto/update-ngo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ngoInterface } from './entities/ngo.entity';
import { createDocumentsDto } from './dto/createdocument.dto';
import { documentsInterface } from './entities/document.entity';
import { createProject } from './dto/createProject.dto';
import { projectsInterface } from './entities/project.entity';
import * as bcrypt from 'bcrypt';
import { loginDTO } from './dto/login.dto';
import { jwtService } from 'src/jwt/jwt.service';
import { tokenizeInterface } from 'src/interfaces/interfaces.interface';




@Injectable()
export class NgoService {
  saltRounds = 10;
  constructor(@InjectModel('ngo') private ngoRepository : Model<ngoInterface> , 
  @InjectModel('document') private ngoDocument : Model<documentsInterface>,
  @InjectModel('project') private ngoProject : Model<projectsInterface>,
  private readonly jwtService : jwtService
){}

  async createNewNgo(req : any , res : any , body: CreateNgoDto) {
    console.log(body)
    body.password = await bcrypt.hash(body.password , this.saltRounds)
    let newNgo = await this.ngoRepository.create(body)
    return {
      message: 'ngo created successfully',
      statusCode: 200,
      data : newNgo
    }
  }

  /**
   * this rout is for login the ngos
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async login(req : any , res : any , body: loginDTO){
    let ngo = await this.ngoRepository.findOne({username : body.username})
    if (!ngo){
      return {
        message : 'login failed!',
        statusCode : 400,
        error : 'account not found!'
      }
    }
    let compare = await bcrypt.compare(ngo.passwod , body.password)
    if (!compare){
      return {
        message : 'login failed!',
        statusCode : 403,
        error : 'wrong password'
      }
    }

    let jwtData: tokenizeInterface = {
      id: ngo._id.toString(),
      email: ngo.email,
      userName: ngo.username,
      name: ngo.name,
    }
    let token = await this.jwtService.tokenize(jwtData , '12H')
    return {
      message : 'login successfull!',
      statusCode : 200,
      data : {
        ...ngo , token : token
      }
    }

  }


  async createNewDocument(req : any , res : any , body: createDocumentsDto){
    let ngo = await this.ngoRepository.findById(req.user.id)
    let newDocument :any = await this.ngoDocument.create({...body , ngo : ngo._id})
    ngo.ownDocuments.push(newDocument._id)
    return {
      message: 'document created successfully',
      statusCode: 200,
      data : newDocument
    }
  }


  async createNewProject(req : any , res : any , body: createProject){
    let ngo = await this.ngoRepository.findById(req.user._id)
    let newProject : any = await this.ngoProject.create({...body , ngo : ngo._id})
    ngo.projects.push(newProject._id)
    return {
      message: 'project created successfully',
      statusCode: 200,
      data : newProject
    }
  }



  async getAllNgo(req : any , res : any){
    let ngoTabel = await this.ngoRepository.find()
    let mapNgo = await this.ngoRepository.find()
    return {
      message: 'get all ngo successfully',
      statusCode: 200,
      data : {
        ngoTabel,mapNgo
      }
    }
  } 


  async getNgo(req : any , res : any , ngoId : string){
    let ngo = await this.ngoRepository.findOne({id : ngoId})
    let similarNgo = await this.ngoRepository.find().sort({'createdAt' : -1}).limit(5)
    return {
      message: 'get ngo successfully',
      statusCode: 200,
      data : {ngo,similarNgo}
    }
  }


  async getNgoInfo(req :any , res:any ){
    let ngoId : string = req.user.id;
    let ngo = await this.ngoRepository.findById({ngoId})
    // let ongoing = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'Ongoing'}})
    // let completed = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'Completed'}})
    // let goodPractice = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'GoodPractice'}})
    // let collaborationOpportunities = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'CollaborationOpportunities'}})
    return {
      message: 'get ngo successfully',
      statusCode: 200,
      data : ngo
    }
  }



  async getNgoProjects(req :any , res:any ){
    let ngoId : string = req.user.id;
    let ngo = await this.ngoRepository.findById({ngoId})
    let ongoing = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'Ongoing'}})
    let completed = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'Completed'}})
    let goodPractice = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'GoodPractice'}})
    let collaborationOpportunities = await this.ngoRepository.findOne({id : ngoId}).populate({path : 'projects' , match:{status : 'CollaborationOpportunities'}})
    return {
      message: 'get ngo projects successfully',
      statusCode: 200,
      data : {ongoing : ongoing.projects , completed : completed.projects , goodPractice : goodPractice.projects , collaborationOpportunities : collaborationOpportunities.projects }
    }
  }



  async getNgosDocument(req :any , res:any ){
    let ngoId : string = req.user.id;
    let ngo = (await this.ngoRepository.findById({ngoId})).populated('documents')
    return {
      message: 'get ngo documents successfully',
      statusCode: 200,
      data : ngo.document
    }
  }


}
