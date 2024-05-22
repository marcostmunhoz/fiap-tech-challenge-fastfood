import { SharedModule } from '@/shared/shared.module';
import { Module } from '@nestjs/common';
import { PaymentFactory } from './domain/factory/payment.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './infrastructure/entity/payment.entity';
import { PaymentRepositoryToken } from './tokens';
import { TypeOrmPaymentRepository } from './infrastructure/repository/type-orm-payment.repository';
import { CreatePaymentController } from './interface/controller/create-payment.controller';
import { CreatePaymentUseCase } from './application/use-case/create-payment.use-case';

const factories = [PaymentFactory];
const useCases = [CreatePaymentUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity]), SharedModule],
  providers: [
    {
      provide: PaymentRepositoryToken,
      useClass: TypeOrmPaymentRepository,
    },
    ...factories,
    ...useCases,
  ],
  controllers: [CreatePaymentController],
})
export class PaymentModule {}
