import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('date')
  dateStart!: Date;

  @Column('date')
  dateEnd!: Date;

  @Column()
  taskId!: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.dateStart = new Date();
    this.dateEnd = new Date();
    this.taskId = 0;
  }
}
