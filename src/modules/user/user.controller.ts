import {
   Body,
   Controller,
   Delete,
   Get,
   Headers,
   HttpStatus,
   Param,
   Put,
   Query,
   UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import {
   BlockUserResponse,
   GetUserByIdResponse,
   IUser,
   UnblockUserResponse,
   UpdateUserDataResponse,
} from './user.types'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { TodoService } from '../todo/todo.service'

@Controller('user')
export class UserController {
   constructor(
      private userService: UserService,
      private todoService: TodoService,
      private jwtService: JwtService,
   ) {}

   @Get('/get-all')
   public getAllUsers(
      @Query('take') take: number = 1,
      @Query('skip') skip: number = 1,
   ): Observable<IUser[]> {
      take = take > 20 ? 20 : take
      return this.userService.getAllUsers(take, skip)
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
            role: user.role,
            isBlocked: user.isBlocked,
         },
         status: HttpStatus.OK,
      }
   }

   @Put('/:id')
   // @UseGuards(AdminGuard)
   public async updateUser(
      @Body() body,
      @Param() params,
   ): Promise<UpdateUserDataResponse> {
      const user = await this.userService.getOneById(params.id)
      if (!user) {
         return {
            error: 'User not found',
            status: HttpStatus.NOT_FOUND,
         }
      }
      let data = {
         name: body.name,
         surname: body.surname,
      }
      await this.userService.updateUser(params.id, data)
      return {
         status: HttpStatus.OK,
         message: 'updated',
      }
   }

   @Get('/:id')
   public async getUserById(@Param() params): Promise<GetUserByIdResponse> {
      const user = await this.userService.getOneById(params.id)
      if (!user) {
         return {
            status: HttpStatus.NOT_FOUND,
            error: 'User not found',
         }
      }
      return {
         data: user,
         status: HttpStatus.OK,
      }
   }

   @Delete()
   // @UseGuards(AdminGuard)
   public async deleteUserAndTodos(@Query() query) {
      await this.userService.deleteUser(query.id)
      return {
         status: HttpStatus.OK,
         message: 'Deleted',
      }
   }

   @Put('/block/:id')
   // @UseGuards(AdminGuard)
   public async blockUser(@Param() params): Promise<BlockUserResponse> {
      const body = {
         isBlocked: true,
      }

      await this.userService.blockUser(params.id, body)

      return {
         status: HttpStatus.OK,
         message: 'User blocked',
      }
   }

   @Put('/unblock/:id')
   // @UseGuards(AdminGuard)
   public async unblockUser(@Param() params): Promise<UnblockUserResponse> {
      const body = {
         isBlocked: false,
      }

      await this.userService.unblockUser(params.id, body)
      return {
         status: HttpStatus.OK,
         message: 'User unblocked',
      }
   }
}
