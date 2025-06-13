import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { gmailInterface } from './entities/gmail.entity';
import { responseInterface } from 'src/interfaces/interfaces.interface';

@Injectable()
export class UsersService {

  constructor(@InjectModel('gmail') private gmailMode : Model<gmailInterface>){}

  /**
   * its for adding emails for updates
   * @param gmail 
   * @returns 
   */
  async addGmail(gmail : string): Promise<responseInterface> {
    let newGmail = await this.gmailMode.create({gmail : gmail})
    console.log('new email created >>>> ' , newGmail)
    return {
      message : 'your gmail add to auto report',
      statusCode : 200,
      data : newGmail
    }
  }


   async getAllLogs(req : any , res : any){
        let all = [
            {
                user : {
                    userName : "hossein",
                    ngoName : "khodakhah"
                },
                action : {
                    title : 'create the project',
                    description : {
                        name : "نام",
                        status : "ongoing",
                        accepted : false
                    },
                    date : '1404/05/01',
                    time : '13:22:05'
                }
            },{
                user : {
                    userName : "ali",
                    ngoName : "mohammadi"
                },
                action : {
                    title : 'create the project',
                    description : {
                        name : "نام",
                        status : "ongoing",
                        accepted : false
                    },
                    date : '1404/05/01',
                    time : '13:22:05'
                }
            },{
                user : {
                    userName : "elham",
                    ngoName : "chatrabnoose"
                },
                action : {
                    title : 'create the project',
                    description : {
                        name : "نام",
                        status : "ongoing",
                        accepted : false
                    },
                    date : '1404/05/01',
                    time : '13:22:05'
                }
            },{
                user : {
                    userName : "hossein",
                    ngoName : "khodakhah"
                },
                action : {
                    title : 'create the project',
                    description : {
                        name : "نام",
                        status : "ongoing",
                        accepted : false
                    },
                    date : '1404/05/01',
                    time : '13:22:05'
                }
            }
        ]

        return {
            message : 'get all logs',
            statusCode : 200,
            data : all
        }
    }

}
