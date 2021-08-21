import { Body, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'
import { CompleteTodoUpdateResponse, ITodo } from './todo.types'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TodoService {
   constructor(
      @InjectRepository(Todo)
      private todoRepository: Repository<Todo>,
      private jwtService: JwtService,
   ) {}

   public async create(todo: ITodo) {
      return await this.todoRepository.save(todo)
   }

   public async getUserTodos(userId: number) {
      return await this.todoRepository.find({ userId })
   }

   public async deleteTodo(id: number) {
      await this.todoRepository.delete({ id }).then((result) => {
         return result
      })
   }

   public async updateTodo(id: number, @Body() body) {
      await this.todoRepository.update({ id }, body).then((result) => {
         return result
      })
   }

   public async completeTodo(id: number, body: CompleteTodoUpdateResponse) {
      await this.todoRepository.update({ id }, body).then((result) => {
         return result
      })
   }

   public async getTodoById(id: number) {
      return await this.todoRepository.findOne({ id })
   }

   public async getAllTodos() {
      return await this.todoRepository.find()
   }

   public async createLinkToken(todoId: number) {
      return {
         token: this.jwtService.sign({
            todoId: todoId,
         }),
      }
   }
}
