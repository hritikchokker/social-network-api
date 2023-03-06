
import { Module } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Post } from 'src/modules/post/entities/post.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '1234',
            entities: [User, Post, Session, Comment],
            database: 'social_network',
            synchronize: true,
        }),
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule {
    constructor(
        private readonly dataService: DataSource
    ) {
        if (this.dataService.isInitialized) {
            console.log('connected to database');
        }
    }
}