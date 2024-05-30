import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsResolver } from './movements.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './models/movement.model';
import { WalletsModule } from 'src/wallets/wallets.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movement.name, schema: MovementSchema },
      // { name: Wallet.name, schema: WalletSchema },
    ]),
    WalletsModule,
  ],
  providers: [MovementsResolver, MovementsService],
})
export class MovementsModule {}
