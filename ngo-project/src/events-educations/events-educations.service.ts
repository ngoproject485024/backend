import { Inject, Injectable } from '@nestjs/common';
// import { UpdateEventsEducationDto } from './dto/update-events-education.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { Model } from 'mongoose';
import { EducationInterface } from './entities/education.entity';
import { CreateEvetsDto } from './dto/events.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EventsInterface } from './entities/events.entity';
import { responseInterface } from 'src/interfaces/interfaces.interface';
import langDetection from 'src/services/langDetection';


@Injectable()
export class EventsEducationsService {
  constructor(
    @InjectModel('educations')
    private educationRepository: Model<EducationInterface>,
    @InjectModel('events') private eventRepository: Model<EventsInterface>,
  ) { }

  /**
   * for creating new education
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async createNewEducation(
    req: any,
    res: any,
    body: CreateEducationDto,
  ): Promise<responseInterface> {
    let newEducation = await this.educationRepository.create(body);
    let type = 0; // 0 : blog      1 : photo        2 : video
    console.log(body);
    await newEducation.updateOne({
      admin: {
        userName: req.user.userName,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
    });
    console.log(newEducation);
    return {
      message: 'ساخت آموزش با موفقیت انجام شد',
      statusCode: 200,
      data: newEducation,
    };
  }

  /**
   * for creating new education
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async updateEducation(
    req: any,
    res: any,
    body: any,
    id: string,
  ): Promise<responseInterface> {
    console.log(body);
    let education = await this.educationRepository.findById(id);
    // console.log()
    // delete body.id;
    let data = { ...education.toObject(), ...body };
    let updated = await education.updateOne(data);
    console.log(await this.educationRepository.findById(id));
    return {
      message: 'اپدیت آموزش با موفقیت انجام شد',
      statusCode: 200,
      data: updated,
    };
  }

  /**
   * for creating new education
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async updateEvent(
    req: any,
    res: any,
    body: any,
    id: string,
  ): Promise<responseInterface> {
    console.log(body);
    let event = await this.eventRepository.findById(id);
    // delete body.id;
    let newData = { ...event.toObject(), ...body };
    let updated = await event.updateOne(newData);
    return {
      message: 'اپدیت رویداد با موفقیت انجام شد',
      statusCode: 200,
      data: updated,
    };
  }

  /**
   * for creating new events by admin
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async createNewEvents(
    req: any,
    res: any,
    body: CreateEvetsDto,
  ): Promise<responseInterface> {
    let newEvents = await this.eventRepository.create(body);

    await newEvents.updateOne({
      admin: {
        userName: req.user.userName,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
    });

    return {
      message: 'رویداد با موفقیت ایجاد شد',
      statusCode: 200,
      data: newEvents,
    };
  }

  async deleteEvent(req, res, id: string): Promise<responseInterface> {
    let event = await this.eventRepository.findById(id);
    if (!event) {
      return {
        message: 'event not found',
        statusCode: 400,
        error: 'event not found',
      };
    }
    await this.eventRepository.findByIdAndDelete(id);
    return {
      message: 'event deleted',
      statusCode: 200,
      data: event,
    };
  }

  async deleteEducation(req, res, id: string): Promise<responseInterface> {
    let education = await this.educationRepository.findById(id);
    if (!education) {
      return {
        message: 'education not found',
        statusCode: 400,
        error: 'education not found',
      };
    }
    await this.educationRepository.findByIdAndDelete(id);
    return {
      message: 'education deleted',
      statusCode: 200,
      data: education,
    };
  }

  /**
   * for getting all events by user
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async getAllEvents(
    req: any,
    res: any,
    type: string,
    sort: string,
    start: string,
    end: string,
    page: string,
    search: string
  ): Promise<responseInterface> {
    console.log('search', search)
    let types = await this.eventRepository.find();
    // console.log('the all types is >>>> ', types[0]);
    // type=2&start=2025-5-8&end=2025-5-22&page=2
    let event;
    let all: number;
    let sortNumber : number = (sort && sort == 'oldest') ? 1 : (sort && sort == 'mostViews') ? 0 : (sort && sort == 'all') ? 2 : -1;
    console.log('sorting number >>> ' , sortNumber)
    console.log('type' , type)
    if (sort && sort != '' && sort != 'undefined') {

      if (search != '' && search && search != 'undefined') {
        let reg = new RegExp(search)
        if (!isNaN(+page)) {
          console.log('first condition');
          if (!isNaN(+type)) {
            console.log('first condition22');
            // let mainType = +type == 1 ? 'Education' : (+type == 2) ? "Youth" :  (+type == 3) ? "Women" : "Climate Change"
            event = await this.eventRepository
              .find({
                $and: [
                  { type: +type },
                  {
                    $or: [
                      { peTitle: { $regex: reg } },
                      { enTitle: { $regex: reg } },
                      { ruTitle: { $regex: reg } },
                      { peDescription: { $regex: reg } },
                      { enDescription: { $regex: reg } },
                      { ruDescription: { $regex: reg } },
                      { peEventsBody: { $regex: reg } },
                      { enEventsBody: { $regex: reg } },
                      { ruEventsBody: { $regex: reg } },
                    ]
                  }
                ]
              })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip((+page - 1) * 10);
          } else {
            console.log('first condition3');
            event = await this.eventRepository
              .find({
                $or: [
                  { peTitle: { $regex: reg } },
                  { enTitle: { $regex: reg } },
                  { ruTitle: { $regex: reg } },
                  { peDescription: { $regex: reg } },
                  { enDescription: { $regex: reg } },
                  { ruDescription: { $regex: reg } },
                  { peEventsBody: { $regex: reg } },
                  { enEventsBody: { $regex: reg } },
                  { ruEventsBody: { $regex: reg } },
                ]
              })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip((+page - 1) * 10);
          }
        } else {
          console.log('first condition44');
          page = '0';
          if (!isNaN(+type)) {
            console.log('its hereeee >> ', !isNaN(+type));
            // let type = +type == 1 ? 'Education' : (+type == 2) ? "Youth" : (+type == 3) ? "Women" : "Climate Change"
            event = await this.eventRepository
              .find({
                $and: [
                  { type: +type },
                  {
                    $or: [
                      { type: { $Regex: reg } },
                      { peTitle: { $Regex: reg } },
                      { enTitle: { $Regex: reg } },
                      { ruTitle: { $Regex: reg } },
                      { peDescription: { $Regex: reg } },
                      { enDescription: { $Regex: reg } },
                      { ruDescription: { $Regex: reg } },
                      { peEventsBody: { $Regex: reg } },
                      { enEventsBody: { $Regex: reg } },
                      { ruEventsBody: { $Regex: reg } },
                    ]
                  }
                ]
              })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip(+page * 10);
          } else {
            console.log('first condition555');
            event = await this.eventRepository
              .find({
                $or: [
                  { type: { $Regex: reg } },
                  { peTitle: { $Regex: reg } },
                  { enTitle: { $Regex: reg } },
                  { ruTitle: { $Regex: reg } },
                  { peDescription: { $Regex: reg } },
                  { enDescription: { $Regex: reg } },
                  { ruDescription: { $Regex: reg } },
                  { peEventsBody: { $Regex: reg } },
                  { enEventsBody: { $Regex: reg } },
                  { ruEventsBody: { $Regex: reg } },
                ]
              })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip(+page * 10);
          }
        }
      } else {
        if (!isNaN(+page)) {
          console.log('first condition');
          if (!isNaN(+type)) {
            console.log('first condition22');
            // let mainType = +type == 1 ? 'Education' : (+type == 2) ? "Youth" :  (+type == 3) ? "Women" : "Climate Change"
            event = await this.eventRepository
              .find({ type: +type })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip((+page - 1) * 10);
          } else {
            console.log('first condition3');
            event = await this.eventRepository
              .find()
              .sort({ createdAt: -1 })
              .limit(10)
              .skip((+page - 1) * 10);
          }
        } else {
          console.log('first condition44');
          page = '0';
          if (!isNaN(+type)) {
            console.log('its hereeee >> ', !isNaN(+type));
            // let type = +type == 1 ? 'Education' : (+type == 2) ? "Youth" : (+type == 3) ? "Women" : "Climate Change"
            event = await this.eventRepository
              .find({ type: +type })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip(+page * 10);
          } else {
            console.log('first condition555');
            event = await this.eventRepository
              .find()
              .sort({ createdAt: -1 })
              .limit(10)
              .skip(+page * 10);
          }
        }
      }
      all = await this.eventRepository.countDocuments();
    } else {

      if (search != '' && search && search != 'undefined') {
        let reg = new RegExp(search)
        if (!isNaN(+page)) {
          console.log('first condition');
          if (!isNaN(+type)) {
            console.log('first condition22');
            // let mainType = +type == 1 ? 'Education' : (+type == 2) ? "Youth" :  (+type == 3) ? "Women" : "Climate Change"
            event = await this.eventRepository
              .find({
                $and: [
                  { type: +type },
                  {
                    $or: [
                      { peTitle: { $regex: reg } },
                      { enTitle: { $regex: reg } },
                      { ruTitle: { $regex: reg } },
                      { peDescription: { $regex: reg } },
                      { enDescription: { $regex: reg } },
                      { ruDescription: { $regex: reg } },
                      { peEventsBody: { $regex: reg } },
                      { enEventsBody: { $regex: reg } },
                      { ruEventsBody: { $regex: reg } },
                    ]
                  }
                ]
              })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip((+page - 1) * 10);
          } else {
            console.log('first condition3');
            event = await this.eventRepository
              .find({
                $or: [
                  { peTitle: { $regex: reg } },
                  { enTitle: { $regex: reg } },
                  { ruTitle: { $regex: reg } },
                  { peDescription: { $regex: reg } },
                  { enDescription: { $regex: reg } },
                  { ruDescription: { $regex: reg } },
                  { peEventsBody: { $regex: reg } },
                  { enEventsBody: { $regex: reg } },
                  { ruEventsBody: { $regex: reg } },
                ]
              })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip((+page - 1) * 10);
          }
        } else {
          console.log('first condition44');
          page = '0';
          if (!isNaN(+type)) {
            console.log('its hereeee >> ', !isNaN(+type));
            // let type = +type == 1 ? 'Education' : (+type == 2) ? "Youth" : (+type == 3) ? "Women" : "Climate Change"
            event = await this.eventRepository
              .find({
                $and: [
                  { type: +type },
                  {
                    $or: [
                      { type: { $Regex: reg } },
                      { peTitle: { $Regex: reg } },
                      { enTitle: { $Regex: reg } },
                      { ruTitle: { $Regex: reg } },
                      { peDescription: { $Regex: reg } },
                      { enDescription: { $Regex: reg } },
                      { ruDescription: { $Regex: reg } },
                      { peEventsBody: { $Regex: reg } },
                      { enEventsBody: { $Regex: reg } },
                      { ruEventsBody: { $Regex: reg } },
                    ]
                  }
                ]
              })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip(+page * 10);
          } else {
            console.log('first condition555');
            event = await this.eventRepository
              .find({
                $or: [
                  { type: { $Regex: reg } },
                  { peTitle: { $Regex: reg } },
                  { enTitle: { $Regex: reg } },
                  { ruTitle: { $Regex: reg } },
                  { peDescription: { $Regex: reg } },
                  { enDescription: { $Regex: reg } },
                  { ruDescription: { $Regex: reg } },
                  { peEventsBody: { $Regex: reg } },
                  { enEventsBody: { $Regex: reg } },
                  { ruEventsBody: { $Regex: reg } },
                ]
              })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip(+page * 10);
          }
        }
      } else {
        if (!isNaN(+page)) {
          console.log('first condition');
          if (!isNaN(+type)) {
            console.log('first condition22');
            // let mainType = +type == 1 ? 'Education' : (+type == 2) ? "Youth" :  (+type == 3) ? "Women" : "Climate Change"
            event = await this.eventRepository
              .find({ type: +type })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip((+page - 1) * 10);
          } else {
            console.log('first condition3');
            event = await this.eventRepository
              .find()
              .sort({ createdAt: -1 })
              .limit(10)
              .skip((+page - 1) * 10);
          }
        } else {
          console.log('first condition44');
          page = '0';
          if (!isNaN(+type)) {
            console.log('its hereeee >> ', !isNaN(+type));
            // let type = +type == 1 ? 'Education' : (+type == 2) ? "Youth" : (+type == 3) ? "Women" : "Climate Change"
            event = await this.eventRepository
              .find({ type: +type })
              .sort({ createdAt: -1 })
              .limit(10)
              .skip(+page * 10);
          } else {
            console.log('first condition555');
            event = await this.eventRepository
              .find()
              .sort({ createdAt: -1 })
              .limit(10)
              .skip(+page * 10);
          }
        }
      }
      all = await this.eventRepository.countDocuments();
    }

    let sortedData = (sortNumber == 1) ? event.reverse() : (sortNumber == -1) ? event : (sortNumber == 2) ? event : event

    return {
      message: 'get events by admin',
      statusCode: 200,
      data: { all, event : sortedData },
    };
  }


  /**
   * this rout is for seting event to show in home page
   * @param id 
   */
  async setEventToHomePage(id : string){  
   try {
     let event = await this.eventRepository.findById(id)
    if (!event){
      return {
        message : 'رویداد مورد نظر یافت نشد',
        statusCode : 400,
        error : 'رویداد مورد نظر یافت نشد'
      }
    }

    

    if (event.homeEvenets) {
      await event.updateOne({ homeEvenets: false })
      return {
        message: 'رویداد مورد نظر از لیست رویداد های صفحه اصلی سایت حذف شد',
        statusCode: 200,
        data: null
      }
    }

    let homeShowEvents = await this.eventRepository.find({
      homeEvenets : true
    })

    if (homeShowEvents.length == 3){
      await homeShowEvents[2].updateOne({homeEvenets : false})  
    }

    await event.updateOne({ homeEvenets: true })

    return {
      message: 'رویداد مورد نظر برای نمایش در صفحه اصلی سایت تنظیم شد',
      statusCode: 200,
      data : null
    }
   } catch (error) {
      console.log('error in setting event to home show' , error)
     return {
      message: 'خطای داخلی سیستم',
      error: 'خطای داخلی سیستم',
      statusCode: 400,
    } 
   }
  }


  /**
   * get all educations by user
   * @param req
   * @param res
   * @param body
   * @returns
   */
  async getAllEducations(
    req: any,
    res: any,
    type: any,
    sort: string,
    page: string,
    search: string
  ): Promise<responseInterface> {
    console.log('search', search)
    let educations;
    let sortNumber : number = (sort && sort == 'oldest') ? 1 : (sort && sort == 'mostViews') ? 0 : (sort && sort == 'all') ? 2 : -1;
    console.log('sorting number >>> ' , sort)
    console.log('type' , type)
    if (search != '' && search && search != 'undefined') {
      let reg = new RegExp(search)
      if (!isNaN(+page)) {
        educations = await this.educationRepository
          .find({
            $or: [
              { peTitle: { $regex: reg } },
              { enTitle: { $regex: reg } },
              { ruTitle: { $regex: reg } },
              { peDescription: { $regex: reg } },
              { enDescription: { $regex: reg } },
              { ruDescription: { $regex: reg } },
              { peEducationBody: { $regex: reg } },
              { enEducationBody: { $regex: reg } },
              { ruEducationBody: { $regex: reg } },
            ]
          })
          .sort({ createdAt: -1 })
          .limit(10)
          .skip((+page - 1) * 10);
      } else {
        page = '0';
        educations = await this.educationRepository
          .find({
            $or: [
              { peTitle: { $regex: reg } },
              { enTitle: { $regex: reg } },
              { ruTitle: { $regex: reg } },
              { peDescription: { $regex: reg } },
              { enDescription: { $regex: reg } },
              { ruDescription: { $regex: reg } },
              { peEducationBody: { $regex: reg } },
              { enEducationBody: { $regex: reg } },
              { ruEducationBody: { $regex: reg } },
            ]
          })
          .sort({ createdAt: -1 })
          .limit(10)
          .skip(+page * 10);
      }
    } else {
      if (!isNaN(+page)) {
        educations = await this.educationRepository
          .find()
          .sort({ createdAt: -1 })
          .limit(10)
          .skip((+page - 1) * 10);
      } else {
        page = '0';
        educations = await this.educationRepository
          .find()
          .sort({ createdAt: -1 })
          .limit(10)
          .skip(+page * 10);
      }
    }

    let all = await this.educationRepository.countDocuments();
    let sortedData = (sortNumber == 1) ? educations.reverse() : (sortNumber == -1) ? educations : (sortNumber == 2) ? educations : educations.reverse()

    return {
      message: 'get educations by admin',
      statusCode: 200,
      data: { all, educations : sortedData },
    };
  }

  
  /**
   * for getting specific education by user in website
   * @param req
   * @param res
   * @param educationId
   * @returns
   */
  async getSpecificEducation(
    req: any,
    res: any,
    educationId: string,
  ): Promise<responseInterface> {
    let education = await this.educationRepository.findById(educationId);
    let similar = await this.educationRepository.find().limit(5);
    
    process.nextTick(()=>{
      console.log('next tick done >>> ')
    })
    
    return {
      message: 'get specific education',
      statusCode: 200,
      data: {
        educations: education,
        similar: similar,
      },
    };
  }

  /**
   * for getting specific evets by user in website
   * @param req
   * @param res
   * @param eventId
   * @returns
   */
  async getSpecificEvents(
    req: any,
    res: any,
    eventId: string,
  ): Promise<responseInterface> {
    console.log(eventId);
    let event = await this.eventRepository.findById(eventId);
    let similar = await this.eventRepository.find().limit(5);
    return {
      message: 'get specific event',
      statusCode: 200,
      data: {
        events: event,
        similar: similar,
      },
    };
  }
}
