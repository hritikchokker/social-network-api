
import { User } from "src/modules/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number


    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @Column({
        default: true
    })
    isActive: boolean
}