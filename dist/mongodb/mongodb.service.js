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
exports.MongoDBService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let MongoDBService = class MongoDBService {
    constructor() {
        const uri = process.env.DATABASE_URL;
        this.client = new mongodb_1.MongoClient(uri);
        this.connect();
    }
    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db("artsony");
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("MongoDB connection error:", error);
        }
    }
    getDatabase() {
        if (!this.db) {
            throw new Error("Database not initialized");
        }
        return this.db;
    }
    async closeConnection() {
        await this.client.close();
    }
};
exports.MongoDBService = MongoDBService;
exports.MongoDBService = MongoDBService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MongoDBService);
//# sourceMappingURL=mongodb.service.js.map