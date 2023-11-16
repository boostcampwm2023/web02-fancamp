import { Module } from '@nestjs/common';
import { CampService } from './camp.service';
import { CampController } from './camp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampRepository } from './camp.repository';
import { Camp } from './entities/camp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Camp])],
  controllers: [CampController],
  providers: [CampService, TypeOrmModule, CampRepository],
})
export class CampModule {}
