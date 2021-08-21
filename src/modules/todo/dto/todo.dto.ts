import { IsBoolean, IsNumber, IsString, MaxLength } from 'class-validator'

export class TodoDto {
   @MaxLength(100)
   title: string

   @MaxLength(250)
   description: string

   @IsBoolean()
   status: boolean

   @IsString()
   completedDate: string

   @IsString()
   date: string

   @IsNumber()
   userId: number
}
