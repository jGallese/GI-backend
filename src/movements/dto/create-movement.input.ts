import { InputType, Field, Float } from '@nestjs/graphql';
import { Schema, SchemaTypeOptions, Types } from 'mongoose';

@InputType()
export class CreateMovementInput {
  // @Field(() => GraphQLISODateTime)
  // movementDate: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  type: string;

  @Field(() => String)
  walletId: Schema.Types.ObjectId;
}
