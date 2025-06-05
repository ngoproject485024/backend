import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { gmailInterface } from './entities/gmail.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel('gmail') private gmailMode : Model<gmailInterface>){}


  async addGmail(gmail : string) {
    let newGmail = await this.gmailMode.create({gmail : gmail})
    console.log('new email created >>>> ' , newGmail)
    return {
      message : 'your gmail add to auto report',
      statusCode : 200,
      data : newGmail
    }
  }

}
