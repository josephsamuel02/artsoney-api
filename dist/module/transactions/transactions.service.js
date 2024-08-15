"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_service_1 = require("../../mongodb/mongodb.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let TransactionsService = class TransactionsService {
    constructor(prisma, mongoDBService) {
        this.prisma = prisma;
        this.mongoDBService = mongoDBService;
    }
    async createTransactions(transactionsRecordDto) {
        try {
            const Transaction = await this.prisma.transactionsRecord.create({
                data: transactionsRecordDto,
            });
            if (!Transaction) {
                throw new common_1.NotFoundException({
                    message: "Unable to create transaction",
                });
            }
            return {
                status: 200,
                message: "Transactions   created successfully",
                data: Transaction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async updateTransactionsHistory(transactionsRecordDto) {
        try {
            const Transaction = await this.prisma.transactionsRecord.findUnique({
                where: {
                    transaction_id: transactionsRecordDto.transaction_id,
                },
            });
            if (!Transaction) {
                throw new common_1.NotFoundException({
                    message: "Unable find user's cart",
                });
            }
            const { transaction_id, ...updateData } = transactionsRecordDto;
            const UpdateTransaction = await this.prisma.transactionsRecord.update({
                where: {
                    transaction_id: transaction_id,
                },
                data: updateData,
            });
            if (!UpdateTransaction) {
                throw new common_1.NotFoundException({
                    message: "Unable find user's cart",
                });
            }
            return {
                status: 200,
                message: "Transactions updated successfully",
                data: UpdateTransaction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async getAllTransactionsHistory(transactionsRecordDto) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async getTransactionById(transactionsRecordDto) {
        try {
            const Transaction = await this.prisma.transactionsRecord.findUnique({
                where: {
                    transaction_id: transactionsRecordDto.transaction_id,
                },
            });
            if (!Transaction) {
                throw new common_1.NotFoundException({
                    message: "Unable find user's cart",
                });
            }
            return {
                status: 200,
                message: "success",
                data: Transaction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mongodb_service_1.MongoDBService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map