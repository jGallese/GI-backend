import { Injectable } from '@nestjs/common';
import { CreateMovementInput } from './dto/create-movement.input';
import { UpdateMovementInput } from './dto/update-movement.input';
import { Movement, MovementDocument } from './models/movement.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
  ) {}

  async create(createMovementInput: CreateMovementInput) {
    const { amount, description, type, walletId } = createMovementInput;

    const createdMovement = new this.movementModel({
      amount,
      description,
      type,
      walletId,
      movementDate: new Date(),
    });

    try {
      return await createdMovement.save();
    } catch (error) {
      throw new Error();
    }
  }

  findAll() {
    return this.movementModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} movement`;
  }

  update(id: number, updateMovementInput: UpdateMovementInput) {
    return `This action updates a #${id} movement`;
  }

  remove(id: number) {
    return `This action removes a #${id} movement`;
  }
}
