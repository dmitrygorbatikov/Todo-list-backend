import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { IUser } from './user.types'
import { from, Observable } from 'rxjs'

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
   ) {}

   public async create(user: IUser) {
      return await this.userRepository.save(user)
   }

   public async getOneByEmail(email: string) {
      return this.userRepository.findOne({ email })
   }

   public async getOneById(id: number) {
      return await this.userRepository.findOne({ id })
   }

   public getAllUsers(take: number = 10, skip: number = 0): Observable<User[]> {
      return from(
         this.userRepository.findAndCount({ take, skip }).then(([users]) => {
            return <User[]>users
         }),
      )
   }

   public async updateUser(id: number, body) {
      await this.userRepository.update({ id }, body).then((result) => {
         return result
      })
   }

   public async deleteUser(id: number) {
      return await this.userRepository.delete({ id })
   }

   public async blockUser(id: number, body) {
      return await this.userRepository.update({ id }, body)
   }

   public async unblockUser(id: number, body) {
      return await this.userRepository.update({ id }, body)
   }
}
