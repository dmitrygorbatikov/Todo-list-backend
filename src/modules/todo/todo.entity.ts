import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Todos' })
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
}
