import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Transaction): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const invalidTransaction =
      transaction.type === 'outcome' && balance.total < transaction.value;

    if (invalidTransaction) {
      throw Error('you do not have the money man');
    }
    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
