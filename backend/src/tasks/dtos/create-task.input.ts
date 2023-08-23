import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  name: string;

  @Field()
  dateStart: Date;

  @Field()
  dateEnd: Date;

  @Field(() => Int)
  taskId: number;
}