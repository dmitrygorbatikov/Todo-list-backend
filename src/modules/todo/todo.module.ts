import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './todo.entity'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'
import { AuthService } from '../auth/auth.service'
import { AuthModule } from '../auth/auth.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../core/constants/constants'
import { UserSharedModule } from '../user/user-shared.module'

@Module({
   imports: [
      AuthModule,
      UserSharedModule,
      TypeOrmModule.forFeature([Todo]),
      JwtModule.register({
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '2d' },
      }),
   ],
   controllers: [TodoController],
   providers: [TodoService],
})
export class TodoModule {}
