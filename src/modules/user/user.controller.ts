import {
   Body,
   Controller,
   Get,
   Post,
   Headers,
   Delete,
   HttpException,
   HttpStatus,
} from '@nestjs/common'
import { UserService } from './user.service'
import { IUser } from './user.types'
import { JwtService } from '@nestjs/jwt'

@Controller('user')
export class UserController {
   constructor(
      private userService: UserService,
      private jwtService: JwtService,
   ) {}

   @Post()
   public async create(@Body() body: IUser) {
      const user = await this.userService.create(body)
      return 'ok'
   }

   @Get('/get-all')
   public async getAllUsers() {
      const users = await this.userService.getAllUsers()
      return users
   }

   @Get()
   public async getUser(@Headers() headers) {
      const token = headers.token

      if (!token) {
         throw new HttpException('Нет авторизации', HttpStatus.UNAUTHORIZED)
      }
      const decode = this.jwtService.verify(token)
      const userId = decode.sub

      const user = await this.userService.getOneById(userId)

      return {
         name: user.name,
         surname: user.surname,
         email: user.email,
      }
   }

   @Delete()
   public async deleteUserById() {
      return await this.userService.deleteUserById(1)
   }
}
