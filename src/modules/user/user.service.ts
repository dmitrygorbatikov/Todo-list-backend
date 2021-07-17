import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { IUser } from './user.types'

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
   ) {}

   public async create(user: IUser) {
      const newUser = await this.userRepository.save(user)
      return newUser
   }

   public async getOneByEmail(email: string) {
      return this.userRepository.findOne({ email })
   }

   public async getOneById(id: number) {
      return this.userRepository.findOne({ id })
   }

   public async getAllUsers() {
      return this.userRepository.find()
   }

   public async deleteUserById(id) {
      return this.userRepository.delete(id)
   }
}
