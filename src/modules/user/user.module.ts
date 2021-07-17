import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserSharedModule } from './user-shared.module'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../core/constants/constants'

@Module({
   controllers: [UserController],
   imports: [
      UserSharedModule,
      JwtModule.register({
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '2d' },
      }),
   ],
})
export class UserModule {}
