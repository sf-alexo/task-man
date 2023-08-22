import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @CreateDateColumn()
  dateCreated!: Date;

  @Column({ default: 0 })
  userId!: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.dateCreated = new Date();
    this.userId = 0;
  }
}
