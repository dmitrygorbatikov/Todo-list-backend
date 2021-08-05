import { Body, Controller, Headers, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { RegisterDto } from './dto/register.dto'
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login.dto'
import { LoginResponse, RegisterResponse } from './types'

@Controller('auth')
export class AuthController {
   constructor(
      private authService: AuthService,
      private userService: UserService,
   ) {}

   @Post('/register')
   public async register(@Body() body: RegisterDto): Promise<RegisterResponse> {
      const user = await this.userService.getOneByEmail(body.email)
      if (user) {
         return {
            error: 'User is exist',
            status: HttpStatus.CONFLICT,
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
         role: 'user',
         isBlocked: false,
      })
      const token = this.authService.createToken(createdUser)

      return {
         token,
         status: HttpStatus.OK,
         message: 'Registration completed successfully',
      }
   }

   @Post('/login')
   public async login(
      @Headers() headers,
      @Body() body: LoginDto,
   ): Promise<LoginResponse> {
      const user = await this.userService.getOneByEmail(body.email)

      if (!user) {
         return {
            error: 'User not found',
            status: HttpStatus.BAD_GATEWAY,
         }
      }

      const isMatch = await bcrypt.compare(body.password, user.password)

      if (!isMatch) {
         return {
            error: 'Incorrect email or password',
            status: HttpStatus.BAD_GATEWAY,
         }
      }

      if (user.role === 'admin') {
         return {
            error: 'Incorrect email or password',
            status: HttpStatus.BAD_GATEWAY,
         }
      }

      if (user.isBlocked) {
         return {
            error: 'Your account was blocked',
            status: HttpStatus.BAD_GATEWAY,
         }
      }

      return {
         token: this.authService.createToken(user),
         status: HttpStatus.OK,
         message: 'Login completed successfully',
      }
   }

   @Post('/admin-register')
   public async registerAdmin(@Body() body: RegisterDto) {
      const admin = await this.userService.getOneByEmail(body.email)
      if (admin) {
         return {
            error: 'User is exist',
            status: HttpStatus.CONFLICT,
         }
      }
      const hashedPassword = await this.authService.passwordHash(body.password)

      const createdAdmin = await this.userService.create({
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
         role: 'admin',
         isBlocked: false,
      })
      const token = this.authService.createToken(createdAdmin)

      return {
         token,
         status: HttpStatus.OK,
         message: 'Registration completed successfully',
      }
   }

   @Post('/admin-login')
   public async loginAdmin(
      @Headers() headers,
      @Body() body: LoginDto,
   ): Promise<LoginResponse> {
      const admin = await this.userService.getOneByEmail(body.email)

      if (!admin || admin.role == 'user') {
         return {
            error: 'User not found or not enough rights',
            status: HttpStatus.BAD_GATEWAY,
         }
      }

      const isMatch = await bcrypt.compare(body.password, admin.password)

      if (!isMatch) {
         return {
            error: 'Incorrect email or password',
            status: HttpStatus.BAD_GATEWAY,
         }
      }

      return {
         token: this.authService.createToken(admin),
         status: HttpStatus.OK,
         message: 'Login completed successfully',
      }
   }
}
