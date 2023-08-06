import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class Registration {

   // @PrimaryGeneratedColumn()
   // id: number

    @PrimaryColumn()
    userid: string

    @Column()
    emailid: string

    @Column()
    password: string

}
