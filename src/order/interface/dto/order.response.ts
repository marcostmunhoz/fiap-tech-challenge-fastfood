import { OrderStatusEnum } from '@/shared/domain/enum/order-status.enum';
import { MoneyValueObject } from '@/shared/domain/value-object/money.value-object';
import {
  TransformObjectKeyOptional,
  TransformValueObjectToPrimitive,
} from '@/shared/infrastructure/decorator/class-transformer-helpers.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class OrderItem {
  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  @TransformObjectKeyOptional((obj: MoneyValueObject) => obj.valueAsFloat)
  price: number;

  @Expose()
  @TransformValueObjectToPrimitive()
  quantity: number;
}

export class OrderResponse {
  @Expose()
  @Type(() => OrderItem)
  @ApiProperty({
    example: [
      {
        code: 'PRD-001',
        name: 'Product Name',
        price: 10.99,
        quantity: 2,
      },
    ],
  })
  items: OrderItem[];

  @Expose()
  @TransformObjectKeyOptional((obj: MoneyValueObject) => obj.valueAsFloat)
  @ApiProperty({
    example: 21.98,
    type: Number,
  })
  total: number;

  @Expose()
  @ApiProperty({
    example: OrderStatusEnum.PAID,
    enum: OrderStatusEnum,
  })
  status: string;
}
