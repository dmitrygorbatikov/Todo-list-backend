import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { MessageService } from './message.service'

@Controller('messages')
export class MessageController {
   constructor(private readonly messageService: MessageService) {}

   @Get()
   public async findAll() {
      return await this.messageService.findAll()
   }

   @Post()
   public async createMessage(@Body() body) {
      return await this.messageService.create(body)
   }
   @Get('/chats')
   findChats() {
      return this.messageService.findChats()
   }

   @Get('/:from')
   findFrom(@Param('from') from: string) {
      return this.messageService.findFrom(from)
   }
}
