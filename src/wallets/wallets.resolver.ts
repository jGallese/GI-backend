import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WalletsService } from './wallets.service';
import { Wallet } from './models/wallet.model';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Wallet)
export class WalletsResolver {
  constructor(private readonly walletsService: WalletsService) {}

  @Mutation(() => Wallet)
  createWallet(
    @Args('createWalletInput') createWalletInput: CreateWalletInput,
  ) {
    return this.walletsService.create(createWalletInput);
  }

  @Query(() => [Wallet], { name: 'wallets' })
  findAll() {
    return this.walletsService.findAll();
  }

  @Query(() => Wallet, { name: 'wallet' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.walletsService.findOne(id);
  }

  @Mutation(() => Wallet)
  updateWallet(
    @Args('updateWalletInput') updateWalletInput: UpdateWalletInput,
  ) {
    return this.walletsService.update(updateWalletInput.id, updateWalletInput);
  }

  @Mutation(() => Wallet)
  removeWallet(@Args('id', { type: () => Int }) id: number) {
    return this.walletsService.remove(id);
  }
}
