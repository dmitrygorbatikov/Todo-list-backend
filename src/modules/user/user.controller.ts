import { Controller, Delete, Get, Headers, HttpStatus } from '@nestjs/common'
import { UserService } from './user.service'
import { GetAllUsersResponse, GetUserByIdResponse } from './user.types'
import { JwtService } from '@nestjs/jwt'

@Controller('user')
export class UserController {
   constructor(
      private userService: UserService,
      private jwtService: JwtService,
   ) {}

   @Get('/get-all')
   public async getAllUsers(): Promise<GetAllUsersResponse> {
      const users = await this.userService.getAllUsers()
      if (users.length == 0) {
         return {
            data: users,
            status: HttpStatus.NO_CONTENT,
            message: 'No one user found',
         }
      }
      return {
         data: users,
         status: HttpStatus.OK,
      }
   }

   @Get()
   public async getUser(@Headers() headers): Promise<GetUserByIdResponse> {
      const token = headers.token

      if (!token) {
         return {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Unauthorized',
         }
      }
      const decode = this.jwtService.verify(token)
      const userId = decode.sub

      const user = await this.userService.getOneById(userId)

      return {
         data: {
            name: user.name,
            surname: user.surname,
            email: user.email,
            registerDate: user.registerDate,
         },
         status: HttpStatus.OK,
      }
   }

   // @Delete()
   // public async deleteUserById() {
   //    return await this.userService.deleteUserById(1)
   // }
}
