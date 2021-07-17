import { Body, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'
import { CompleteTodoUpdateResponse, ITodo } from './todo.types'

@Injectable()
export class TodoService {
   constructor(
      @InjectRepository(Todo)
      private todoRepository: Repository<Todo>,
   ) {}

   public async create(todo: ITodo) {
      const newTodo = await this.todoRepository.save(todo)
      return newTodo
   }

   public async getUserTodos(userId: number) {
      const todos = await this.todoRepository.find({ userId })
      return todos
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
      return await this.todoRepository.find({ id })
   }

   public async getAllTodos() {
      return await this.todoRepository.find()
   }
}
