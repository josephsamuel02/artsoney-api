import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TransactionsRecordDto } from "src/dtos/transactionRecord.dto";
import { MongoDBService } from "src/mongodb/mongodb.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mongoDBService: MongoDBService,
  ) {}

  // create a transaction
  public async createTransactions(
    transactionsRecordDto: TransactionsRecordDto,
  ): Promise<any> {
    try {
      const Transaction = await this.prisma.transactionsRecord.create({
        data: transactionsRecordDto,
      });

      if (!Transaction) {
        throw new NotFoundException({
          message: "Unable to create transaction",
        });
      }

      return {
        status: 200,
        message: "Transactions   created successfully",
        data: Transaction,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
  // update a transaction
  public async updateTransactionsHistory(
    transactionsRecordDto: TransactionsRecordDto,
  ): Promise<any> {
    try {
      const Transaction = await this.prisma.transactionsRecord.findUnique({
        where: {
          transaction_id: transactionsRecordDto.transaction_id,
        },
      });

      if (!Transaction) {
        throw new NotFoundException({
          message: "Unable find user's cart",
        });
      }
      // remove the transactions_id because its a uniq field that cannot be updated
      const { transaction_id, ...updateData } = transactionsRecordDto;
      const UpdateTransaction = await this.prisma.transactionsRecord.update({
        where: {
          transaction_id: transaction_id,
        },
        data: updateData,
      });

      if (!UpdateTransaction) {
        throw new NotFoundException({
          message: "Unable find user's cart",
        });
      }

      return {
        status: 200,
        message: "Transactions updated successfully",
        data: UpdateTransaction,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getAllTransactionsHistory(
    transactionsRecordDto: TransactionsRecordDto,
  ): Promise<any> {
    try {
      const db = this.mongoDBService.getDatabase();
      const transactions = await db
        .collection("TransactionsRecord")
        .find({
          $or: [
            { "buyer_information.userId": transactionsRecordDto.userId },
            { "seller_information.userId": transactionsRecordDto.userId },
          ],
        })
        .toArray();

      if (transactions.length === 0) {
        return {
          status: 404,
          message: "No transactions found",
        };
      }
      const transformedTransactions = transactions.map((transaction) => {
        const { _id, ...rest } = transaction;
        return {
          ...rest,
          transaction_id: _id.toHexString(),
        };
      });

      return {
        status: 200,
        message: "success",
        data: transformedTransactions,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  //   get all Transactions
  //   public async getAllTransactionsHistory(
  //     transactionsRecordDto: TransactionsRecordDto,
  //   ): Promise<any> {
  //     try {
  //       const transactions = await this.prisma.transactionsRecord.findMany({
  //         where: {
  //           OR: [
  //             {
  //               buyer_information: {
  //                 userId: transactionsRecordDto.userId,
  //               },
  //             },
  //             {
  //               seller_information: {
  //                 userId: transactionsRecordDto.userId,
  //               },
  //             },
  //           ],
  //         },
  //       });

  //       if (!transactions) {
  //         return new BadRequestException({
  //           message: "Unable to fetch transactions",
  //         });
  //       }

  //       return {
  //         status: 200,
  //         message: "success",
  //         data: transactions,
  //       };
  //     } catch (error) {
  //       throw new BadRequestException({
  //         error: error.message,
  //       });
  //     }
  //   }

  //get transaction by id
  public async getTransactionById(
    transactionsRecordDto: TransactionsRecordDto,
  ): Promise<any> {
    try {
      const Transaction = await this.prisma.transactionsRecord.findUnique({
        where: {
          transaction_id: transactionsRecordDto.transaction_id,
        },
      });

      if (!Transaction) {
        throw new NotFoundException({
          message: "Unable find user's cart",
        });
      }

      return {
        status: 200,
        message: "success",
        data: Transaction,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
}
