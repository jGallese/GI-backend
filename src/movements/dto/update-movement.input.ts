import { CreateMovementInput } from './create-movement.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMovementInput extends PartialType(CreateMovementInput) {
  @Field(() => Int)
  id: number;
}
