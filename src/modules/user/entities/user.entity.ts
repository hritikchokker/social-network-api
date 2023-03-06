import { Comment } from "src/modules/comment/entities/comment.entity"
import { Post } from "src/modules/post/entities/post.entity"
import { Session } from "src/modules/session/entities/session.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 30,
        nullable: false,
    })
    firstName: string

    @Column({
        length: 30,
        nullable: false,
    })
    lastName: string

    @Column({
        nullable: false,
    })
    dateOfBirth: string

    @Column({
        enum: ['MALE', 'FEMALE', 'OTHER']
    })
    gender: 'MALE' | 'FEMALE' | 'OTHER'

    @Column({
        length: 90,
        unique: true
    })
    email: string

    @Column({
        length: 150
    })
    password: string

    @Column({
        default: true
    })
    isActive: boolean

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => Session, session => session.user)
    sessions: Session[];
}