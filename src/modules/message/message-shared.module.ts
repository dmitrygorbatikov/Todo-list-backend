import { Module } from '@nestjs/common'
import { MessageService } from './message.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from './message.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
   imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Message])],
   providers: [MessageService],
   exports: [MessageService],
})
export class MessageSharedModule {}
