import { Module, forwardRef } from '@nestjs/common';
import { CampService } from './camp.service';
import { CampController } from './camp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampRepository } from './camp.repository';
import { Camp } from './entities/camp.entity';
import { SubscriptionRepository } from './subscription.repository';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionService } from './subscription.service';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Camp, Subscription]),
    ImageModule,
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
