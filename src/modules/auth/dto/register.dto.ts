import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterDto {
   @IsString()
   name: string

   @IsString()
   surname: string

   @IsEmail()
   email: string

   @MinLength(6)
   password: string
}
