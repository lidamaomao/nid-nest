import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './providers/app.service';
import appConfig from './configs/app.config';
import dbConfig from './configs/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, dbConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.DB_HOST'),
        port: configService.get('db.DB_PORT'),
        username: configService.get('db.DB_USER'),
        password: configService.get('db.DB_PASSWORD'),
        database: configService.get('db.DB_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
