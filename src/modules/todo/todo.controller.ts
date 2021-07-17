import {
   Body,
   Controller,
   Delete,
   Get,
   Headers,
   Param,
   HttpException,
   HttpStatus,
   Post,
   Put,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { ITodo } from './todo.types'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'

@Controller('todo')
export class TodoController {
   constructor(
      private todoService: TodoService,
      private jwtService: JwtService,
      private userService: UserService,
   ) {}

   @Post()
   public async create(@Headers() headers, @Body() body: ITodo) {
      const token = headers.token

      if (!token) {
         return {
            message: 'Нет авторизации',
            status: 401,
         }
      }
      const decode = this.jwtService.verify(token)
      const userId = decode.sub
      const todo = await this.todoService.create({
         title: body.title,
         description: body.description,
         status: false,
         completedDate: ' ',
         date: new Date().toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
         }),
         userId,
      })
      return todo
   }

   @Get()
   public async getUserTodos(@Headers() headers) {
      const token = headers.token

      if (!token) {
         return {
            message: 'Нет авторизации',
            status: 401,
         }
      }
      const decode = this.jwtService.verify(token)
      const userId = decode.sub
      const todos = await this.todoService.getUserTodos(userId)

      if (!todos) {
         throw new HttpException('user do not have todo', HttpStatus.NO_CONTENT)
      }

      return todos
   }

   @Delete('/:id')
   public async deleteTodoById(@Param() params, @Headers() headers) {
      const token = headers.token

      if (!token) {
         return {
            message: 'Нет авторизации',
            status: HttpStatus.UNAUTHORIZED,
         }
      }
      const decode = this.jwtService.verify(token)
      const userId = decode.sub

      const todo = await this.todoService.getTodoById(params.id)
      if (todo && todo[0]?.userId == userId) {
         await this.todoService.deleteTodo(params.id)
         return {
            message: 'deleted',
            status: HttpStatus.OK,
         }
      } else {
         return {
            message: 'todo not found',
            status: HttpStatus.NOT_FOUND,
         }
      }
   }

   @Put('/:id')
   public async updateTodo(@Body() body, @Param() params) {
      const todo = await this.todoService.updateTodo(params.id, body)

      return {
         status: 200,
         message: 'update',
      }
   }

   @Get('/get-all')
   public async getAllTodos() {
      const todos = await this.todoService.getAllTodos()

      return todos
   }

   @Put('/complete/:id')
   public async completeTodo(@Param() params) {
      const body = {
         status: true,
         completedDate: new Date().toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
         }),
      }
      const todo = await this.todoService.completeTodo(params.id, body)
      return todo
   }

   @Put('/uncomplete/:id')
   public async uncompleteTodo(@Param() params) {
      const body = {
         status: false,
         completedDate: ' ',
      }
      const todo = await this.todoService.completeTodo(params.id, body)
      return todo
   }
}
