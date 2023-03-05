import { Post } from "src/modules/post/entities/post.entity"
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
        length: 40
    })
    password: string

    @Column({
        default: true
    })
    isActive: boolean

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}