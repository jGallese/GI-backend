import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateWalletInput {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  balance: number;

  @Field(() => String)
  type: string;
}
