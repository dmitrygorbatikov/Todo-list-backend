import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Message {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   text: string

   @Column()
   from?: string

   @Column({ nullable: true })
   to?: string

   @Column()
   date: string
}
