import { Module } from '@nestjs/common'
import { SocketService } from './socket.service'
import { MessageSharedModule } from '../message/message-shared.module'

@Module({
   imports: [MessageSharedModule],
   providers: [SocketService],
   exports: [SocketService],
})
export class SocketModule {}
