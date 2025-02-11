import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemsModule } from './items/items.module';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUsername,
      password: envs.dbPassword,
      database: envs.dbName,
      synchronize: true,
      autoLoadEntities: true
    }),
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
