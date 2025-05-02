import { Inject, Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { adminInterface } from './entities/admin.entity';
import { adminLoginDto } from './dto/loginAdmin.dto';
import * as bcrypt from 'bcrypt';
import { adminJwtInterface } from 'src/interfaces/interfaces.interface';
import { jwtService } from 'src/jwt/jwt.service';
import { createAdminDto } from './dto/create-admin.dto';


@Injectable()
export class AdminService {
    saltRounds = 10;

    constructor(@InjectModel('admin') private adminModel: Model<adminInterface>,
        private readonly jwtService: jwtService
    ) { }

    async loginAdmin(req, res, body: adminLoginDto) {
        //admin existance
        console.log(body)
        try {
            let admin = await this.adminModel.findOne({ userName: body.userName })
            if (!admin) {
                return {
                    message: 'حساب کاربری یافت نشد',
                    statusCode: 400,
                    error: 'حساب کاربری یافت نشد.'
                }
            }
            //password comparing
            let compare = await bcrypt.compare(body.password, admin.password)
            if (!compare) {
                return {
                    message: 'ورود نا موفق',
                    statusCode: 403,
                    error: 'رمز عبور نادرست است'
                }
            }
            let adminTokenData: adminJwtInterface = {
                userName: admin.userName,
                firstName: admin.firstName,
                lastName: admin.lastName
            }

            let token = await this.jwtService.adminToken(adminTokenData, '24H')


            let allData = { ...admin.toObject(), token: token }
            delete allData.password
            return {
                message: 'ورود موفق',
                statusCode: 200,
                data: allData
            }
        } catch (error) {
            console.log(error)
            return {
                message: 'ورود ناموفق',
                statusCode: 500,
                error: 'خطای داخلی'
            }
        }
    }




    async createNewAdmin(req, res, body: createAdminDto) {
        try {
            body.password = await bcrypt.hash(body.password, this.saltRounds)
            console.log(body)
            let newAdmin = await this.adminModel.create(body)
            return {
                message: 'ساخت ادمین موفقیت آمیز بود',
                statusCode: 200,
                data: newAdmin
            }
        } catch (error) {
            return {
                message: 'ساخت ادمین نا موفق',
                statusCode: 500,
                error: 'خطای داخلی'
            }
        }
    }



    async checkToken(req, res) {
        return {
            message: 'ok',
            statusCode: 200
        }
    }


    async updateAdmin(req: any, res: any, adminId: string, body: createAdminDto) {
        let admin = await this.adminModel.findById(adminId)
        if (!admin) {
            return {
                message: 'آپدیت ادمین نا موفق بود',
                statusCode: 400,
                error: 'ادمین مورد نظر یافت نشد'
            }
        }
        body.password = await bcrypt.hash(body.password, this.saltRounds)
        let newData = { ...body, ...admin.toObject }
        await admin.updateOne(newData)
        let updated = await this.adminModel.findById(adminId)
        return {
            message: 'اپدیت ادمین موفقیت آمیز بود0',
            statusCode: 200,
            data: updated
        }

    }


    async getAll(req: any, res: any) {
        let admins = await this.adminModel.find()
        return {
            message: 'گرفتن همه ی ادمین ها',
            statusCode: 200,
            data: admins
        }
    }



    async getAdmin(req: any, res: any, adminId: string) {
        let admin = await this.adminModel.findById(adminId)
        if (!admin) {
            return {
                message: 'دیتای ادمین یافت نشد',
                statusCode: 400,
                error: 'ادمین یافت نشد'
            }
        }
        return {
            message: 'موفق',
            statusCode: 200,
            data: admin
        }
    }


    async deleteAdmin(req: any, res: any, adminId: string) {
        let admin = await this.adminModel.findById(adminId)
        if (!admin) {
            return {
                message: 'ادمین یافت نشد',
                statusCode: 400,
                error: 'ادمین یافت نشد'
            }
        }

        let data = await this.adminModel.findByIdAndDelete(adminId)
        return {
            message: 'ادمین با موفقیت حذف شد',
            statusCode: 200,
        }
    }



}
