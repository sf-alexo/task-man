import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql'; // Import necessary decorators

@Entity()
@ObjectType() // Decorate with ObjectType to define GraphQL type
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int) // Decorate with Field to define GraphQL field
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
