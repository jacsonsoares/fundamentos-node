import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    let error = '';
    const balance = this.transactionsRepository.getBalance();
    if (value < 1) {
      error = 'value must be positive';
    }
    if (type === 'outcome' && value > balance.total) {
      error = `value ${value} is greater than the existing balance ${balance.total}`;
    }
    if (error !== '') {
      throw Error(error);
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
