import { CustomerRepository } from '@/customer/domain/repository/customer.repository.interface';
import {
  getDomainCustomerEntity,
  getValidCpf,
} from '@/testing/customer/helpers';
import { getCustomerRepositoryMock } from '@/testing/customer/mock/customer.repository.mock';
import { FindCustomerByCpfUseCase } from './find-customer-by-cpf.use-case';

describe('FindCustomerByCpfUseCase', () => {
  let sut: FindCustomerByCpfUseCase;
  let repository: jest.Mocked<CustomerRepository>;

  beforeEach(() => {
    repository = getCustomerRepositoryMock();
    sut = new FindCustomerByCpfUseCase(repository);
  });

  describe('execute', () => {
    it('should return the customer when found', async () => {
      // Arrange
      const customer = getDomainCustomerEntity();
      const output = {
        id: customer.id,
        name: customer.name,
      };
      const { cpf } = customer;
      repository.findByCpf.mockResolvedValue(customer);

      // Act
      const result = await sut.execute({ cpf });

      // Assert
      expect(result).toEqual(output);
      expect(repository.findByCpf).toHaveBeenCalledWith(customer.cpf);
    });

    it('should return null when customer is not found', async () => {
      // Arrange
      const cpf = getValidCpf();
      repository.findByCpf.mockResolvedValue(null);

      // Act
      const result = await sut.execute({ cpf });

      // Assert
      expect(result).toBeNull();
      expect(repository.findByCpf).toHaveBeenCalledWith(cpf);
    });
  });
});
