import { Inject, Injectable } from '@nestjs/common';
// import { UpdateEventsEducationDto } from './dto/update-events-education.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { Model } from 'mongoose';
import { EducationInterface } from './entities/education.entity';
import { CreateEvetsDto } from './dto/events.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EventsInterface } from './entities/events.entity';

@Injectable()
export class EventsEducationsService {

  constructor(@InjectModel('educations') private educationRepository: Model<EducationInterface>,
    @InjectModel('events') private eventRepository: Model<EventsInterface>
  ) { }


  /**
   * for creating new education
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async createNewEducation(req: any, res: any, body: CreateEducationDto) {
    let newEducation = await this.educationRepository.create(body)
    let type = 0;            // 0 : blog      1 : photo        2 : video
    console.log(body)
    await newEducation.updateOne({
      admin: {
        userName: req.user.userName,
        firstName: req.user.firstName,
        lastName: req.user.lastName
      }
    })
    console.log(newEducation)
    return {
      message: 'ساخت آموزش با موفقیت انجام شد',
      statusCode: 200,
      data: newEducation
    }
  }

  /**
   * for creating new education
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async updateEducation(req: any, res: any, body: any, id: string) {
    console.log(body)
    let education = await this.educationRepository.findById(id)
    // console.log()
    // delete body.id;
    let data = { ...education.toObject(), ...body }
    let updated = await education.updateOne(data)
    console.log(await this.educationRepository.findById(id))
    return {
      message: 'اپدیت آموزش با موفقیت انجام شد',
      statusCode: 200,
      data: updated
    }
  }




  /**
   * for creating new education
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async updateEvent(req: any, res: any, body: any, id: string) {
    console.log(body)
    let event = await this.eventRepository.findById(id)
    // delete body.id;
    let newData = { ...event.toObject(), ...body }
    let updated = await event.updateOne(newData)
    return {
      message: 'اپدیت رویداد با موفقیت انجام شد',
      statusCode: 200,
      data: updated
    }
  }



  /**
   * for creating new events by admin
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async createNewEvents(req: any, res: any, body: CreateEvetsDto) {
    let newEvents = await this.eventRepository.create(body)

    await newEvents.updateOne({
      admin: {
        userName: req.user.userName,
        firstName: req.user.firstName,
        lastName: req.user.lastName
      }
    })

    return {
      message: 'رویداد با موفقیت ایجاد شد',
      statusCode: 200,
      data: newEvents
    }
  }



  async deleteEvent(req, res, id: string) {
    let event = await this.eventRepository.findById(id)
    if (!event) {
      return {
        message: 'event not found',
        statusCode: 400,
        error: 'event not found'
      }
    }
    await this.eventRepository.findByIdAndDelete(id)
    return {
      message: 'event deleted',
      statusCode: 200,
      data: event
    }
  }


  async deleteEducation(req, res, id: string) {
    let education = await this.educationRepository.findById(id)
    if (!education) {
      return {
        message: 'education not found',
        statusCode: 400,
        error: 'education not found'
      }
    }
    await this.educationRepository.findByIdAndDelete(id)
    return {
      message: 'education deleted',
      statusCode: 200,
      data: education
    }
  }

  /**
   * for getting all events by user
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async getAllEvents(req: any, res: any, type: string, sort: string, start: string, end: string , page : string) {
    console.log(sort)
    console.log(type)
    console.log(start)
    console.log(end)

    // type=2&start=2025-5-8&end=2025-5-22&page=2
    let event;
    if (!isNaN(+page)){
      console.log('first condition')
      if (!isNaN(+type)) {
        console.log('first condition22')
        // let mainType = +type == 1 ? 'Education' : (+type == 2) ? "Youth" :  (+type == 3) ? "Women" : "Climate Change"
        event = await this.eventRepository.find({ type: +type }).sort({ 'createdAt': -1 }).limit(10).skip(+page * 10)
      }
      console.log('first condition3')
      event = await this.eventRepository.find().sort({ 'createdAt': -1 }).limit(10).skip(+page * 10)
    } else {
      console.log('first condition44')
      page = "1"
      if (type) {
        console.log('its hereeee >> ' , type)
        // let type = +type == 1 ? 'Education' : (+type == 2) ? "Youth" : (+type == 3) ? "Women" : "Climate Change"
        event = await this.eventRepository.find({ type: +type }).sort({ 'createdAt': -1 }).limit(10).skip(+page * 10)
      }
      console.log('first condition555')
      event = await this.eventRepository.find().sort({ 'createdAt': -1 }).limit(10).skip(+page * 10)      
    }

    return {
      message: 'get events by admin',
      statusCode: 200,
      data: event
    }
  }



  /**
   * get all educations by user
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async getAllEducations(req: any, res: any, type: any, sort: string) {
    console.log('sort', sort)
    console.log('type', type)
    // if (type){
    //   if (type == 'image'){
    //     type = 0
    //   }
    //   if (type == 'video'){
    //     type = 1
    //   }
    //   if (type == 'pdf'){
    //     type = 2
    //   }
    //   if (type == 'word'){
    //     type =3
    //   }
    // }
    let educations;
    // if (type && sort){
    //   if (sort == 'latest'){  
    //     educations = await this.educationRepository.find()
    //     .where('type').equals(type)
    //     .sort({'createdAt' : -1})
    //     .limit(8)        
    //   }else if (sort == 'recent'){
    //     educations = await this.educationRepository.find()
    //     .where('type').equals(type)
    //     .sort({'createdAt' : 1})
    //     .limit(8)        
    //   }
    // }else if(type && !sort){
    //   educations = await this.educationRepository.find()
    //   .where('type').equals(type)
    //   .limit(8)
    // }else if(sort && !type){
    //   if (sort == 'latest'){  
    //     educations = await this.educationRepository.find()
    //     .sort({'createdAt' : -1})
    //     .limit(8)        
    //   }else if (sort == 'recent'){
    //     educations = await this.educationRepository.find()
    //     .sort({'createdAt' : 1})
    //     .limit(8)        
    //   }
    // }else{
    educations = await this.educationRepository.find()
    // }

    return {
      message: 'get educations by admin',
      statusCode: 200,
      data: educations
    }
  }


  /**
   * for getting specific education by user in website
   * @param req 
   * @param res 
   * @param educationId 
   * @returns 
   */
  async getSpecificEducation(req: any, res: any, educationId: string) {
    let education = await this.educationRepository.findById(educationId)
    let similar = await this.educationRepository.find().limit(5)
    return {
      message: 'get specific education',
      statusCode: 200,
      data: {
        educations: education,
        similar: similar
      }
    }
  }


  /**
   * for getting specific evets by user in website
   * @param req 
   * @param res 
   * @param eventId 
   * @returns 
   */
  async getSpecificEvents(req: any, res: any, eventId: string) {
    console.log(eventId)
    let event = await this.eventRepository.findById(eventId)
    let similar = await this.eventRepository.find().limit(5)
    return {
      message: 'get specific event',
      statusCode: 200,
      data: {
        events: event,
        similar: similar
      }
    }
  }




}
