
import { Comment } from "src/modules/comment/entities/comment.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"

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

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
}