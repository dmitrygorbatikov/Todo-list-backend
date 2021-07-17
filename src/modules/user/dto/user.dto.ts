import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator'

export class UserDto {
   @IsNumber()
   id: number

   @IsString()
   name: string

   @IsString()
   surname: string

   @IsEmail()
   email: string

   @MinLength(6)
   password: string

   @IsString()
   registerDate: string
}
