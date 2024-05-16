import { CustomerEntity, CustomerEntityProps } from '../entity/customer.entity';
import { CpfValueObject } from '../value-object/cpf.value-object';

export interface CustomerRepository {
  findByCpf(cpf: CpfValueObject): Promise<CustomerEntity | null>;
  create(props: CustomerEntityProps): Promise<CustomerEntity>;
}
