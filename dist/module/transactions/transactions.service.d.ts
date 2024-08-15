import { TransactionsRecordDto } from "src/dtos/transactionRecord.dto";
import { MongoDBService } from "src/mongodb/mongodb.service";
import { PrismaService } from "src/prisma/prisma.service";
export declare class TransactionsService {
    private readonly prisma;
    private readonly mongoDBService;
    constructor(prisma: PrismaService, mongoDBService: MongoDBService);
    createTransactions(transactionsRecordDto: TransactionsRecordDto): Promise<any>;
    updateTransactionsHistory(transactionsRecordDto: TransactionsRecordDto): Promise<any>;
    getAllTransactionsHistory(transactionsRecordDto: TransactionsRecordDto): Promise<any>;
    getTransactionById(transactionsRecordDto: TransactionsRecordDto): Promise<any>;
}
