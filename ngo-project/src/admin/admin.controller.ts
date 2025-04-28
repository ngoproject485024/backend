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


  @Get('/token/check')
  async checkAdminToken(@Req() req : any , @Res() res : any){
    return this.adminService.checkToken(req , res )
  }



  @Get('/all')
  async getAllAdmins(@Req() req : any , @Res() res : any){
    return this.adminService.getAll(req , res )
  }


  @Get('/:adminId')
  async getAdmin(@Req() req : any , @Res() res : any , @Param('adminId') adminId : string){
    return this.adminService.getAdmin(req , res , adminId)
  }


  @Post('/update/:adminId')
  async updateAdmin(@Req() req : any , @Res() res : any , @Param('adminId') adminId : string ,@Body(new ValidationPipe()) body : createAdminDto){
    return this.adminService.updateAdmin(req , res , adminId , body)
  }



  @Post('/delete/:adminId')
  async deleteAdmin(@Req() req : any , @Res() res : any , @Param('adminId') adminId : string ){
    return this.adminService.deleteAdmin(req , res , adminId)
  }

  


}
