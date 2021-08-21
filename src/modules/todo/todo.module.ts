import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './todo.entity'
import { TodoController } from './todo.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../core/constants/constants'
import { UserSharedModule } from '../user/user-shared.module'
import { TodoSharedModule } from './todo-shared.module'
import { AuthSharedModule } from '../auth/auth-shared.module'

@Module({
   imports: [
      AuthSharedModule,
      UserSharedModule,
      TodoSharedModule,
      TypeOrmModule.forFeature([Todo]),
      JwtModule.register({
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '2d' },
      }),
   ],
   controllers: [TodoController],
})
export class TodoModule {}
