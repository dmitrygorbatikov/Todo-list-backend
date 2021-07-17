import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserSharedModule } from '../user/user-shared.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../core/constants/constants'

@Module({
   imports: [
      UserSharedModule,
      JwtModule.register({
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '2d' },
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService],
})
export class AuthModule {}
