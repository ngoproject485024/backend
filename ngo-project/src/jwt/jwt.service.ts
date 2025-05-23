import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { adminJwtInterface, refeshTokenInterface, tokenizeInterface } from 'src/interfaces/interfaces.interface';



@Injectable()
export class jwtService  {
    constructor(private readonly jwt: JwtService) { }


    async tokenize(user: Partial<tokenizeInterface> , time : string): Promise<string> {
        return this.jwt.sign(user, {
            secret: process.env.JWT_SECRET,
            expiresIn: time
        })
    }

    async refrshTokenize(user: Partial<refeshTokenInterface> , time : string): Promise<string> {
        return this.jwt.sign(user, {
            secret: process.env.REFRESHTOKEN,
            expiresIn: time
        })
    }


    async adminToken(user : adminJwtInterface , time : string) : Promise<string>{
        return this.jwt.sign(user, {
            secret: process.env.JWT_ADMIN_SECRET,
            expiresIn: time
        })
    }


    async checkRefreshToken(refreshToken : string){
        try {
            let check = this.jwt.verify(refreshToken , {secret : process.env.REFRESHTOKEN})
            console.log(check)
            return check
        } catch (error) {
            console.log(error)
            return false
        }
    }

    
}

