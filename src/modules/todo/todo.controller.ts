import {
   Body,
   Controller,
   Delete,
   Get,
   Headers,
   HttpStatus,
   Param,
   Post,
   Put,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import {
   CompleteTodoUpdateResponse,
   CreateTodoResponse,
   DeleteUserTodoResponse,
   GetUserTodosResponse,
   ITodo,
   UpdateUserTodoResponse,
} from './todo.types'
import { JwtService } from '@nestjs/jwt'

@Controller('todo')
export class TodoController {
   constructor(
      private todoService: TodoService,
      private jwtService: JwtService,
   ) {}

   @Post()
   public async create(
      @Headers() headers,
      @Body() body: ITodo,
   ): Promise<CreateTodoResponse> {
      const token = headers.token

      if (!token) {
         return {
            error: 'Unauthorized',
            status: HttpStatus.UNAUTHORIZED,
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
      return {
         data: {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            status: todo.status,
            completedDate: todo.completedDate,
            date: todo.date,
         },
         status: HttpStatus.OK,
      }
   }

   @Get()
   public async getUserTodos(
      @Headers() headers,
   ): Promise<GetUserTodosResponse> {
      const token = headers.token

      if (!token) {
         return {
            error: 'Unauthorized',
            status: HttpStatus.UNAUTHORIZED,
         }
      }
      const decode = this.jwtService.verify(token)
      const userId = decode.sub
      const todos = await this.todoService.getUserTodos(userId)

      if (!todos) {
         return {
            data: [],
            status: HttpStatus.NO_CONTENT,
            error: 'Todos not found',
         }
      }

      return {
         data: todos,
         status: HttpStatus.OK,
      }
   }

   @Delete('/:id')
   public async deleteTodoById(
      @Param() params,
      @Headers() headers,
   ): Promise<DeleteUserTodoResponse> {
      const token = headers.token

      if (!token) {
         return {
            error: 'Unauthorized',
            status: HttpStatus.UNAUTHORIZED,
         }
      }
      const decode = this.jwtService.verify(token)
      const userId = decode.sub

      const todo = await this.todoService.getTodoById(params.id)
      if (todo && todo[0]?.userId == userId) {
         await this.todoService.deleteTodo(params.id)
         return {
            message: 'Todo deleted',
            status: HttpStatus.OK,
         }
      } else {
         return {
            error: 'Todo not found',
            status: HttpStatus.NOT_FOUND,
         }
      }
   }

   @Put('/:id')
   public async updateTodo(
      @Body() body,
      @Param() params,
   ): Promise<UpdateUserTodoResponse> {
      const todo = await this.todoService.updateTodo(params.id, body)

      return {
         status: HttpStatus.OK,
         message: 'Updated',
      }
   }

   @Get('/get-all')
   public async getAllTodos() {
      const todos = await this.todoService.getAllTodos()

      return todos
   }

   @Put('/complete/:id')
   public async completeTodo(@Param() params): Promise<UpdateUserTodoResponse> {
      const body: CompleteTodoUpdateResponse = {
         status: true,
         completedDate: new Date().toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
         }),
      }
      await this.todoService.completeTodo(params.id, body)
      return {
         status: HttpStatus.OK,
         message: 'Todo completed',
      }
   }

   @Put('/uncomplete/:id')
   public async uncompleteTodo(
      @Param() params,
   ): Promise<UpdateUserTodoResponse> {
      const body = {
         status: false,
         completedDate: ' ',
      }
      await this.todoService.completeTodo(params.id, body)
      return {
         status: HttpStatus.OK,
         message: 'Todo completed',
      }
   }
}
