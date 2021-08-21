import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../modules/user/user.entity'
import { UserModule } from '../modules/user/user.module'
import { TodoModule } from '../modules/todo/todo.module'
import { Todo } from '../modules/todo/todo.entity'
import { AuthModule } from '../modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { MessageModule } from '../modules/message/message.module'
import { Message } from '../modules/message/message.entity'
import { SocketModule } from '../modules/socket/socket.module'

@Module({
   imports: [
      TypeOrmModule.forRoot({
         type: 'mysql',
         host: 'localhost',
         port: 3306,
         username: 'root',
         password: '12345',
         database: 'todo',
         entities: [User, Todo, Message],
         synchronize: true,
      }),
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      UserModule,
      TodoModule,
      AuthModule,
      SocketModule,
      MessageModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
