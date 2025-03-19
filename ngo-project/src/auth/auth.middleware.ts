import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// const jwt = require('j')

@Injectable()
export class auth implements NestMiddleware {
  constructor(private readonly jwt:JwtService){}
  use(req: any, res: any, next: () => void) {
    // console.log(req.headers)
    console.log('test is here')
    let token : string;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }

  // console.log(token)
  // console.log(token)

  if (!token) {
    return{
      message :'token expired!',
      statusCode : 401,
      error : 'token is not exist'
    }
  }
  
  try {
    // Verify token
    const decoded = this.jwt.verify(token)    
    if (!decoded) {
      return{
        message :'token expired!',
        statusCode : 401,
        error : 'token expired'
      }
  
    }
    req.user = decoded;
    next();
  } catch (err) {
    return{
      message :'token expired!',
      statusCode : 401,
      error : 'token expired!'
    }  
  }
  }
}
