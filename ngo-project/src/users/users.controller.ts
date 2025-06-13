import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { responseInterface } from 'src/interfaces/interfaces.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }  

  @Post('/gmail/:gmail')
  async addNewGmail(@Param('gmail') gmail: string): Promise<responseInterface> {
    return this.usersService.addGmail(gmail)
  }

  @Get('/log/all')
  async getAllLogs(@Req() req: any, @Res() res: any) {
    return this.usersService.getAllLogs(req, res)
  }

}
