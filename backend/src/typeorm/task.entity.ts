import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity()
@ObjectType() // This decorator marks the class as a GraphQL object type
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column('date')
  @Field()
  dateStart!: Date;

  @Column('date')
  @Field()
  dateEnd!: Date;

  @Column()
  @Field(() => Int)
  taskId!: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.dateStart = new Date();
    this.dateEnd = new Date();
    this.taskId = 0;
  }
}
