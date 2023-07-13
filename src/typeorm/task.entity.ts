import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('date')
  dateStart: Date;

  @Column('date')
  dateEnd: Date;

  @Column()
  taskId: number;
}
