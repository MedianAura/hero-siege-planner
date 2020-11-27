import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { RelicsModule } from './relics/relics.module';

@Module({
  imports: [RelicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
