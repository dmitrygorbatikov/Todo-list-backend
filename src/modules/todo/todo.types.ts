import { HttpStatus } from '@nestjs/common'

export interface ITodo {
   title: string
   description: string
   status: boolean
   completedDate: string
   date: string
   userId: number
}

export interface ITodoClient {
   id: number
   title: string
   description: string
   status: boolean
   completedDate: string
   date: string
}

export interface CreateTodoResponse {
   data?: ITodoClient
   status: HttpStatus
   error?: string
   message?: string
}

export interface GetUserTodosResponse {
   data?: ITodoClient[]
   status: HttpStatus
   error?: string
   message?: string
}

export interface DeleteUserTodoResponse {
   status: HttpStatus
   error?: string
   message?: string
}

export interface UpdateUserTodoResponse {
   status: HttpStatus
   error?: string
   message?: string
}

export interface CompleteTodoUpdateResponse {
   status: boolean
   completedDate: string
}
