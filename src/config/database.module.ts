
import { Module } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/modules/post/entities/post.entity';
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
            entities: [User, Post],
            database: 'social_network',
            synchronize: true,
        }),
    ],
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