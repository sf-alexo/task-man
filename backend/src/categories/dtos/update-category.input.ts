import { InputType, Field, Int }from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {

  @Field({ nullable: true }) 
  name?: string;

  @Field(() => Int, { nullable: true })
  userId?: number;
}