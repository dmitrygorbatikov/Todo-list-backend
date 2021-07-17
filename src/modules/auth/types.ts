import { HttpStatus } from '@nestjs/common'

export interface LoginResp {
   data: {}
   status: HttpStatus
   errors?: []
}
