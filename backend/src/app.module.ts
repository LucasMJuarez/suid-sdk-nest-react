import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SDUIModule } from './infrastructure/sdui.module';

@Module({
  imports: [SDUIModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
