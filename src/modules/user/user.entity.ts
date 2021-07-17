import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
