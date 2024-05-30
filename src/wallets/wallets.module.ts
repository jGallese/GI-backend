import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsResolver } from './wallets.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './models/wallet.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
  ],
  providers: [WalletsResolver, WalletsService],
  exports: [WalletsService],
})
export class WalletsModule {}
