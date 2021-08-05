import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../user/user.entity'

@Entity({ name: 'todos' })
export class Todo {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   title: string

   @Column()
   description: string

   @Column()
   status: boolean

   @Column()
   completedDate: string

   @Column()
   date: string

   @Column()
   userId: number

   @ManyToOne((type) => User, (user) => user.todos, { onDelete: 'CASCADE' })
   user: User
}
