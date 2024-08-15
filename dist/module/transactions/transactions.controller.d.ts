import { TransactionsRecordDto } from "src/dtos/transactionRecord.dto";
import { TransactionsService } from "./transactions.service";
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    createTransactions(transactionsRecordDto: TransactionsRecordDto): Promise<any>;
    getAllTransactions(transactionsRecordDto: TransactionsRecordDto): Promise<any>;
    getTransactionById(transactionsRecordDto: TransactionsRecordDto): Promise<any>;
    updateTransactionsHistory(transactionsRecordDto: TransactionsRecordDto): Promise<any>;
}
