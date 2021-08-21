import { HttpStatus } from '@nestjs/common'

export interface IUser {
   name: string
   surname: string
   email: string
   password: string
   registerDate: string
   role: string
   isBlocked: boolean
}

export interface IUserClient {
   name: string
   surname: string
   email: string
   registerDate: string
   role: string
   isBlocked: boolean
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

export interface UpdateUserDataResponse {
   status: HttpStatus
   error?: string
   message?: string
}

export interface GetUserByIdResponse {
   data?: IUserClient
   status: HttpStatus
   error?: string
}

export interface BlockUserResponse {
   status: HttpStatus
   error?: string
   message?: string
}

export interface UnblockUserResponse {
   status: HttpStatus
   error?: string
   message?: string
}
