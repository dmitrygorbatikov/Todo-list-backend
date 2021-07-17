import { HttpStatus } from '@nestjs/common'

export interface LoginResponse {
   data?: {}
   token?: string
   status: HttpStatus
   error?: string
   message?: string
}

export interface RegisterResponse {
   data?: {}
   token?: string
   status: HttpStatus
   error?: string
   message?: string
}
