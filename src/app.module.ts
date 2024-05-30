import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs.config';
import { WalletsModule } from './wallets/wallets.module';
import { MovementsModule } from './movements/movements.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot(envs.MONGO_URL, {
      dbName: envs.MONGO_DB_NAME,
    }),
    WalletsModule,
    MovementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
