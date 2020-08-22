import Transaction from '../models/Transaction';

interface CreateTransactoinDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): BalanceDTO {
    const balance: BalanceDTO = { income: 0, outcome: 0, total: 0 };
    let valorInicial = 0;

    balance.income = this.transactions.reduce(
      (acumulador, valorAtual) =>
        valorAtual.type === 'income'
          ? acumulador + valorAtual.value
          : acumulador,
      valorInicial,
    );

    valorInicial = 0;
    balance.outcome = this.transactions.reduce(
      (acumulador, valorAtual) =>
        valorAtual.type === 'outcome'
          ? acumulador + valorAtual.value
          : acumulador,
      valorInicial,
    );
    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, value, type }: CreateTransactoinDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
