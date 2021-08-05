import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Todo } from '../todo/todo.entity'

@Entity({ name: 'users' })
export class User {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   name: string

   @Column()
   surname: string

   @Column()
   email: string

   @Column()
   password: string

   @Column()
   registerDate: string

   @Column()
   role: string

   @Column()
   isBlocked: boolean

   @OneToMany((type) => Todo, (todo) => todo.user, { onDelete: 'CASCADE' })
   todos: Todo[]
}
