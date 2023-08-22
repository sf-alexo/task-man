import { InputType, Field, Int, Float }from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field(() => Float)
  id: number;

  @Field({ nullable: true }) // You can mark fields as nullable if they're optional
  name?: string;

  @Field(() => Int, { nullable: true }) // Example of a nullable field
  userId?: number;
}