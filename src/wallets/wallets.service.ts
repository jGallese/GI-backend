import { Injectable } from '@nestjs/common';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './models/wallet.model';
import { Model, Schema as MongooseSchema, Types } from 'mongoose';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async create(createWalletInput: CreateWalletInput) {
    const { name, balance, type } = createWalletInput;
    const creationDate = new Date();
    const createdWallet = new this.walletModel({
      name,
      balance,
      type,
      creationDate,
    });
    return await createdWallet.save();
  }

  findAll() {
    return this.walletModel.find().populate('movements');
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    const walletFound = this.walletModel.findById(id);
    return walletFound;
  }

  update(id: number, updateWalletInput: UpdateWalletInput) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }

  async addNewMovement(
    id: MongooseSchema.Types.ObjectId,
    movementId: MongooseSchema.Types.ObjectId,
  ) {
    const wallet = await this.findOne(id);
    wallet.movements.push(movementId);
    wallet.save();
  }
}
