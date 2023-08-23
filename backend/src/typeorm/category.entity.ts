import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql'; 

@Entity()
@ObjectType() 
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  name!: string;

  @CreateDateColumn()
  @Field()
  dateCreated!: Date;

  @Column({ default: 0 })
  @Field(() => Int)
  userId!: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.dateCreated = new Date();
    this.userId = 0;
  }
}
