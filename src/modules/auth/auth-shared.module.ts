import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { jwtConstants } from '../../core/constants/constants'
import { ConfigModule } from '@nestjs/config'

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      JwtModule.register({
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '2d' },
      }),
   ],
   providers: [AuthService],
   exports: [AuthService],
})
export class AuthSharedModule {}
