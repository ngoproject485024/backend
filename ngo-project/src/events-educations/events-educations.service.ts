import { Inject, Injectable } from '@nestjs/common';
// import { UpdateEventsEducationDto } from './dto/update-events-education.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { Model } from 'mongoose';
import { EducationInterface } from './entities/education.entity';
import { CreateEvetsDto } from './dto/events.dto';

@Injectable()
export class EventsEducationsService {

  constructor(@Inject('educations') private educationRepository: Model<EducationInterface>,
    @Inject('events') private eventRepository: Model<EducationInterface>
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

    await newEducation.updateOne({
      admin: {
        userName: req.user.userName,
        firstName: req.user.firstName,
        lastName: req.user.lastName
      }
    })

    return {
      message: 'create new Education by admin',
      statusCode: 200,
      data: newEducation
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
      message: 'create new Events by admin',
      statusCode: 200,
      data: newEvents
    }
  }

  /**
   * for getting all events by user
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async getAllEvents(req: any, res: any) {
    let events = await this.eventRepository.find()
    return {
      message: 'get events by admin',
      statusCode: 200,
      data: events
    }
  }

  /**
   * get all educations by user
   * @param req 
   * @param res 
   * @param body 
   * @returns 
   */
  async getAllEducations(req: any, res: any) {
    let educations = await this.eventRepository.find()
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
    return {
      message: 'get specific education',
      statusCode: 200,
      data: education
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
    let event = await this.educationRepository.findById(eventId)
    return {
      message: 'get specific event',
      statusCode: 200,
      data: event
    }
  }




}
