import { ObjectType, Field, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Types, Schema as MongooseSchema } from 'mongoose';
import { Wallet } from 'src/wallets/models/wallet.model';

@ObjectType()
@Schema()
export class Movement {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: Date })
  @Field(() => GraphQLISODateTime)
  movementDate: Date;

  @Prop()
  @Field(() => String)
  description: string;

  @Prop()
  @Field(() => Float)
  amount: number;

  @Prop()
  @Field(() => String)
  type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Wallet' })
  @Field(() => String)
  walletId: MongooseSchema.Types.ObjectId;
}

export type MovementDocument = Movement & Document;

export const MovementSchema = SchemaFactory.createForClass(Movement);
