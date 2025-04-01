import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { adminLoginDto } from './dto/loginAdmin.dto';
import { createAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @Post('/login')
  async login(@Req() req : any , @Res() res : any , @Body(new ValidationPipe()) body : adminLoginDto){
    return this.adminService.loginAdmin(req , res , body)
  }


  @Post('/create')
  async createNewAdmin(@Req() req : any , @Res() res : any , @Body(new ValidationPipe()) body : createAdminDto){
    return this.adminService.createNewAdmin(req , res , body)
  }



}
