import { Module } from '@nestjs/common';
import { CampService } from './camp.service';
import { CampController } from './camp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampRepository } from './camp.repository';
import { Camp } from './entities/camp.entity';
import { SubscriptionRepository } from './subscription.repository';
import { Subscription } from './entities/subscription.entity';
import { UserModule } from 'src/user/user.module';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Camp]),
    TypeOrmModule.forFeature([Subscription]),
    UserModule,
  ],
  controllers: [CampController],
  providers: [
    CampService,
    TypeOrmModule,
    CampRepository,
    SubscriptionRepository,
    SubscriptionService,
  ],
  exports: [SubscriptionService, CampService],
})
export class CampModule {}
