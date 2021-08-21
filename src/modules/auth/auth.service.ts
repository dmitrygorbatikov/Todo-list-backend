import { HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { UserDto } from '../user/dto/user.dto'

@Injectable()
export class AuthService {
   constructor(private jwtService: JwtService) {}

   public passwordHash(password): Promise<string> {
      return bcrypt.hash(password, 12)
   }

   public createToken(user: UserDto) {
      return this.jwtService.sign({
         username: user.name,
         sub: user.id,
      })
   }

   public decodeToken(token: string) {
      if (!token) {
         return {
            error: 'Unauthorized',
            status: HttpStatus.UNAUTHORIZED,
         }
      }
      const decode = this.jwtService.verify(token)
      return decode.sub
   }
}
