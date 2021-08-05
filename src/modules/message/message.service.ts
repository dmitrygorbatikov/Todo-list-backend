import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/message.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Message } from './message.entity'

@Injectable()
export class MessageService {
   public constructor(
      @InjectRepository(Message)
      private messageRepository: Repository<Message>,
   ) {}

   public async create(createActionDto: CreateMessageDto) {
      const { date, ...rest } = createActionDto
      return await this.messageRepository.save({
         ...rest,
         date: new Date().toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
         }),
      })
   }

   public async findAll() {
      return await this.messageRepository.find()
   }

   public async findChats(): Promise<string[]> {
      const messages = await this.messageRepository.find()

      return Array.from(new Set(messages.map(({ from }) => from)))
   }

   public findFrom(from: string): Promise<Message[]> {
      return this.messageRepository.find({
         where: [{ from }, { to: from }],
         take: 20,
      })
   }
}
