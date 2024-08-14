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
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
require("dotenv").config();
let EncryptionService = class EncryptionService {
    constructor() {
        this.hashPassword = async (password) => {
            const saltOrRounds = 10;
            return await bcrypt.hash(password, saltOrRounds);
        };
        this.comparePasswords = async (password, hashedPassword) => {
            return await bcrypt.compare(password, hashedPassword);
        };
    }
    async encrypt(data) {
        if (!data) {
            return {
                message: "can't find data to be encrypted",
            };
        }
        const encrypt = await CryptoJS.AES.encrypt(data, process.env.AES_CRYPTION_KEY).toString();
        if (!encrypt) {
            return { message: "unabele to encrypt data" };
        }
        else {
            return encrypt;
        }
    }
    decrypt(data) {
        if (!data) {
            return {
                message: "can't find data to be decrypted",
            };
        }
        const decrypt = CryptoJS.AES.decrypt(data, process.env.AES_CRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        if (!decrypt) {
            return { message: "unabele to decrypt data" };
        }
        else {
            return decrypt;
        }
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EncryptionService);
//# sourceMappingURL=encryption.service.js.map