import { IsOptional, IsString } from 'class-validator'

export class CreateMessageDto {
   @IsString()
   from: string

   @IsOptional()
   to?: string

   @IsString()
   date: string

   @IsString()
   text: string
}
