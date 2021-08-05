import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserSharedModule } from './user-shared.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../core/constants/constants'
import { TodoSharedModule } from '../todo/todo-shared.module'
import { AuthSharedModule } from '../auth/auth-shared.module'

@Module({
   controllers: [UserController],
   imports: [
      AuthSharedModule,
      TodoSharedModule,
      UserSharedModule,
      JwtModule.register({
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '2d' },
      }),
   ],
})
export class UserModule {}
