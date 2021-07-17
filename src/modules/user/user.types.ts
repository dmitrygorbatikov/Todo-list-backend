import { HttpStatus } from '@nestjs/common'

export interface IUser {
   name: string
   surname: string
   email: string
   password: string
   registerDate: string
}

export interface IUserClient {
   name: string
   surname: string
   email: string
   registerDate: string
}

export interface GetAllUsersResponse {
   data?: IUser[]
   status: HttpStatus
   message?: string
}

export interface GetUserByIdResponse {
   data?: IUserClient
   status: HttpStatus
   error?: string
}
