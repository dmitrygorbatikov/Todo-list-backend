import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './todo.entity'
import { TodoService } from './todo.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../core/constants/constants'

@Module({
   imports: [
      TypeOrmModule.forFeature([Todo]),
      JwtModule.register({
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '2d' },
      }),
   ],
   providers: [TodoService],
   exports: [TodoService],
})
export class TodoSharedModule {}
