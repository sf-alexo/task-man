import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
