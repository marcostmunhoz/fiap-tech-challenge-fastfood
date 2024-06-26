import { EntityIdGeneratorHelper } from '@/shared/domain/helper/entity-id-generator.helper.interface';
import {
  getDomainPartialPaymentEntityProps,
  getValidPaymentEntityId,
} from '@/testing/payment/helpers';
import { getEntityIdGeneratorHelperMock } from '@/testing/shared/mock/entity-id-generator.helper.mock';
import { PaymentEntity } from '../entity/payment.entity';
import { PaymentStatusEnum } from '../enum/payment-status.enum';
import { PaymentFactory } from './payment.factory';

describe('PaymentFactory', () => {
  let entityIdGeneratorMock: jest.Mocked<EntityIdGeneratorHelper>;
  let sut: PaymentFactory;

  beforeEach(() => {
    entityIdGeneratorMock = getEntityIdGeneratorHelperMock();
    sut = new PaymentFactory(entityIdGeneratorMock);
  });

  describe('createPayment', () => {
    it('should create an instance of the payment entity', () => {
      // Arrange
      const props = getDomainPartialPaymentEntityProps();
      const id = getValidPaymentEntityId();
      entityIdGeneratorMock.generate.mockReturnValue(id);
      const expectedDate = new Date();
      const dateSpy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => expectedDate);

      // Act
      const payment = sut.createPayment(props);

      // Assert
      expect(entityIdGeneratorMock.generate).toHaveBeenCalledTimes(1);
      expect(dateSpy).toHaveBeenCalledTimes(2);
      expect(payment).toBeInstanceOf(PaymentEntity);
      expect(payment.id).toEqual(id);
      expect(payment.orderId).toEqual(props.orderId);
      expect(payment.total).toEqual(props.total);
      expect(payment.paymentMethod).toEqual(props.paymentMethod);
      expect(payment.status).toEqual(PaymentStatusEnum.PENDING);
      expect(payment.externalPaymentId).toBeFalsy();
      expect(payment.createdAt).toEqual(expectedDate);
      expect(payment.updatedAt).toEqual(expectedDate);
    });
  });
});
