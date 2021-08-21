import {
   SubscribeMessage,
   WebSocketGateway,
   WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import {
   SocketEvents,
   SocketEventsType,
} from '../../core/constants/socket.constants'
import { MessageService } from '../message/message.service'

@WebSocketGateway()
export class SocketService {
   @WebSocketServer()
   private server: Server

   constructor(private messageService: MessageService) {}

   @SubscribeMessage(SocketEvents.sendMessage)
   async handleMessage(client: any, payload: any): Promise<void> {
      await this.messageService.create(payload)
      this.server.emit(SocketEvents.newMessage, payload)
   }

   public emit(event: SocketEventsType, data: any) {
      this.server.emit(event, data)
   }
}
