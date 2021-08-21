import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { UserSharedModule } from '../user/user-shared.module'
import { AuthSharedModule } from './auth-shared.module'

@Module({
   imports: [UserSharedModule, AuthSharedModule],
   controllers: [AuthController],
})
export class AuthModule {}
