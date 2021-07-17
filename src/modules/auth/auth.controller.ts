import { Body, Controller, Post, HttpStatus, Headers } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { RegisterDto } from './dto/register.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

@Controller('auth')
export class AuthController {
   constructor(
      private authService: AuthService,
      private userService: UserService,
      private jwtService: JwtService,
   ) {}

   @Post('/register')
   public async register(@Body() body: RegisterDto) {
      const user = await this.userService.getOneByEmail(body.email)
      if (user) {
         return {
            message: 'user is exist',
            status: 400,
         }
      }
      const hashedPassword = await this.authService.passwordHash(body.password)

      const createdUser = await this.userService.create({
         name: body.name,
         surname: body.surname,
         email: body.email,
         password: hashedPassword,
         registerDate: new Date().toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
         }),
      })

      return {
         token: this.jwtService.sign({
            username: body.name,
            sub: createdUser.id,
         }),
      }
   }

   @Post('/login')
   public async login(@Headers() headers, @Body() body) {
      const user = await this.userService.getOneByEmail(body.email)

      if (!user) {
         return {
            message: 'user not found',
            status: HttpStatus.BAD_GATEWAY,
         }
      }

      const isMatch = await bcrypt.compare(body.password, user.password)

      if (!isMatch) {
         return {
            message: 'incorrect email or password',
            status: HttpStatus.BAD_GATEWAY,
         }
      }

      return {
         token: this.jwtService.sign({ username: body.name, sub: user.id }),
      }
   }
}
