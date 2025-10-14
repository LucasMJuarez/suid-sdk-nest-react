import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SduiModule } from './sdui/sdui.module';

@Module({
  imports: [SduiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
