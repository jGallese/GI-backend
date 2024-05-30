import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MovementsService } from './movements.service';
import { Movement } from './models/movement.model';
import { CreateMovementInput } from './dto/create-movement.input';
import { UpdateMovementInput } from './dto/update-movement.input';
import { WalletsService } from 'src/wallets/wallets.service';
import { UpdateWalletInput } from 'src/wallets/dto/update-wallet.input';

@Resolver(() => Movement)
export class MovementsResolver {
  constructor(
    private readonly movementsService: MovementsService,
    private readonly walletsService: WalletsService,
  ) {}

  @Mutation(() => Movement)
  async createMovement(
    @Args('createMovementInput') createMovementInput: CreateMovementInput,
  ) {
    const { walletId } = createMovementInput;
    if (!this.walletsService.findOne(walletId)) return 'inexistent wallet';
    const createdMovement =
      await this.movementsService.create(createMovementInput);
    const { _id } = createdMovement;

    await this.walletsService.addNewMovement(walletId, _id);
    return createdMovement;
  }

  @Query(() => [Movement], { name: 'movements' })
  findAll() {
    return this.movementsService.findAll();
  }

  @Query(() => Movement, { name: 'movement' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.movementsService.findOne(id);
  }

  @Mutation(() => Movement)
  updateMovement(
    @Args('updateMovementInput') updateMovementInput: UpdateMovementInput,
  ) {
    return this.movementsService.update(
      updateMovementInput.id,
      updateMovementInput,
    );
  }

  @Mutation(() => Movement)
  removeMovement(@Args('id', { type: () => Int }) id: number) {
    return this.movementsService.remove(id);
  }
}
