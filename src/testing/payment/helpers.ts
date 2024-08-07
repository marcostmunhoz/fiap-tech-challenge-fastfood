import {
  CompletePaymentEntityProps,
  PaymentEntity as DomainPaymentEntity,
  PartialPaymentEntityProps,
} from '@/payment/domain/entity/payment.entity';
import { PaymentMethodEnum } from '@/payment/domain/enum/payment-method.enum';
import { PaymentStatusEnum } from '@/payment/domain/enum/payment-status.enum';
import { PaymentEntity as InfrastructurePaymentEntity } from '@/payment/infrastructure/entity/payment.entity';
import { EntityIdValueObject } from '@/shared/domain/value-object/entity-id.value-object';
import { MoneyValueObject } from '@/shared/domain/value-object/money.value-object';

export const getValidPaymentEntityId = (): EntityIdValueObject =>
  EntityIdValueObject.create('payment-id');

export const getValidOrderEntityId = (): string => 'order-id';

export const getValidExternalPaymentId = (): string => 'external-payment-id';

export const getValidOrderTotal = (): MoneyValueObject =>
  MoneyValueObject.create(1000);

export const getDomainPartialPaymentEntityProps =
  (): PartialPaymentEntityProps => ({
    orderId: getValidOrderEntityId(),
    total: getValidOrderTotal(),
    paymentMethod: PaymentMethodEnum.CREDIT_CARD,
  });

export const getDomainCompletePaymentEntityProps =
  (): CompletePaymentEntityProps => ({
    id: getValidPaymentEntityId(),
    status: PaymentStatusEnum.PENDING,
    externalPaymentId: getValidExternalPaymentId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...getDomainPartialPaymentEntityProps(),
  });

export const getDomainPaymentEntity = (
  props: Partial<CompletePaymentEntityProps> = {},
): DomainPaymentEntity => {
  const defaultProps = getDomainCompletePaymentEntityProps();

  return new DomainPaymentEntity({
    id: props.id || defaultProps.id,
    orderId: props.orderId || defaultProps.orderId,
    total: props.total || defaultProps.total,
    paymentMethod: props.paymentMethod || defaultProps.paymentMethod,
    status: props.status || defaultProps.status,
    externalPaymentId:
      props.externalPaymentId || defaultProps.externalPaymentId,
    createdAt: props.createdAt || defaultProps.createdAt,
    updatedAt: props.updatedAt || defaultProps.updatedAt,
  });
};

export const getInfrastructurePaymentEntity = (
  entity?: DomainPaymentEntity,
): InfrastructurePaymentEntity => {
  if (!entity) {
    entity = getDomainPaymentEntity();
  }

  return {
    id: entity.id.value,
    orderId: entity.orderId,
    total: entity.total.value,
    paymentMethod: entity.paymentMethod,
    status: entity.status,
    externalPaymentId: entity.externalPaymentId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
};
