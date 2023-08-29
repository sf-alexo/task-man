import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  dateStart?: Date;

  @Field({ nullable: true })
  dateEnd?: Date;

  @Field(() => Int, { nullable: true })
  taskId?: number;
}
