import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name : string;

    @Column({
        unique: true
    })
    email: string;

    @Column(
        {select: false}
    )
    password: string;

}