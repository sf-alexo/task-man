import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';

@Entity()
@ObjectType() 
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  @Field(() => Int) 
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  @Field() 
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  @Field() 
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Field() 
  accessToken: string; 


  comparePassword(password: string): boolean {
    return this.password === password;
  }
}
