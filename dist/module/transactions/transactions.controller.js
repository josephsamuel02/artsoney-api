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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../validation/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const transactionRecord_dto_1 = require("../../dtos/transactionRecord.dto");
const transactions_service_1 = require("./transactions.service");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    createTransactions(transactionsRecordDto) {
        return this.transactionsService.createTransactions(transactionsRecordDto);
    }
    getAllTransactions(transactionsRecordDto) {
        return this.transactionsService.getAllTransactionsHistory(transactionsRecordDto);
    }
    getTransactionById(transactionsRecordDto) {
        return this.transactionsService.getTransactionById(transactionsRecordDto);
    }
    updateTransactionsHistory(transactionsRecordDto) {
        return this.transactionsService.updateTransactionsHistory(transactionsRecordDto);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactionRecord_dto_1.TransactionsRecordDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "createTransactions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)("history"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactionRecord_dto_1.TransactionsRecordDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "getAllTransactions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactionRecord_dto_1.TransactionsRecordDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "getTransactionById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactionRecord_dto_1.TransactionsRecordDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "updateTransactionsHistory", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, swagger_1.ApiTags)("transactions"),
    (0, common_1.Controller)("transactions"),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map