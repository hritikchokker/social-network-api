import { User } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    sessionId: string;

    @Column()
    expiresAt: Date;

    @ManyToOne(() => User, user => user.sessions)
    user: User;
}
