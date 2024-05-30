import { ObjectType, Field, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Schema as MongooseSchema, Types } from 'mongoose';
import { Movement } from 'src/movements/models/movement.model';

@ObjectType()
@Schema()
export class Wallet {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => Float)
  balance: number;

  @Prop()
  @Field(() => String)
  type: string;

  @Prop({ type: Date })
  @Field(() => GraphQLISODateTime)
  creationDate: Date;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Movement.name,
  })
  @Field(() => [Movement], { nullable: 'items' })
  movements: MongooseSchema.Types.ObjectId[];
}

export type WalletDocument = Wallet & Document;

export const WalletSchema = SchemaFactory.createForClass(Wallet);
