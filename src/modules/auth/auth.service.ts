import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from '../../core/constants/constants'

@Injectable()
export class AuthService {
   constructor(private jwtService: JwtService) {}

   public passwordHash(password): Promise<string> {
      return bcrypt.hash(password, 12)
   }

   public getToken(headers: any) {
      const token = headers.authorization.split(' ')[1]

      if (!token) {
         return {
            message: 'Нет авторизации',
            status: 401,
         }
      }
      const decode = this.jwtService.verify(token)

      const userId = decode.sub

      return userId
   }
}
