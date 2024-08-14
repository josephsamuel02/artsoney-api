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
exports.ArtworkController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../validation/jwt-auth.guard");
const artwork_service_1 = require("./artwork.service");
const postArtwork_dto_1 = require("../../dtos/postArtwork.dto");
const updateArtwork_dto_1 = require("../../dtos/updateArtwork.dto");
const swagger_1 = require("@nestjs/swagger");
let ArtworkController = class ArtworkController {
    constructor(artworkService) {
        this.artworkService = artworkService;
    }
    async uploadArtwork(postArtworkDto) {
        return await this.artworkService.uploadArtwork(postArtworkDto);
    }
    async updateArtwork(updateArtwork) {
        return await this.artworkService.updateArtwork(updateArtwork);
    }
    async updateComments(updateArtwork) {
        return await this.artworkService.updateComments(updateArtwork);
    }
    async updateViews(updateArtwork) {
        return await this.artworkService.updateViews(updateArtwork);
    }
    async updateLikes(updateArtwork) {
        return await this.artworkService.updateLikes(updateArtwork);
    }
    async deleteArtwork(updateArtwork) {
        return await this.artworkService.deleteArtwork(updateArtwork);
    }
};
exports.ArtworkController = ArtworkController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [postArtwork_dto_1.PostArtworkDto]),
    __metadata("design:returntype", Promise)
], ArtworkController.prototype, "uploadArtwork", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Put)("update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateArtwork_dto_1.UpdateArtwork]),
    __metadata("design:returntype", Promise)
], ArtworkController.prototype, "updateArtwork", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Put)("comment"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateArtwork_dto_1.UpdateArtwork]),
    __metadata("design:returntype", Promise)
], ArtworkController.prototype, "updateComments", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)("view"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateArtwork_dto_1.UpdateArtwork]),
    __metadata("design:returntype", Promise)
], ArtworkController.prototype, "updateViews", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)("like"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateArtwork_dto_1.UpdateArtwork]),
    __metadata("design:returntype", Promise)
], ArtworkController.prototype, "updateLikes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateArtwork_dto_1.UpdateArtwork]),
    __metadata("design:returntype", Promise)
], ArtworkController.prototype, "deleteArtwork", null);
exports.ArtworkController = ArtworkController = __decorate([
    (0, swagger_1.ApiTags)("artwork"),
    (0, common_1.Controller)("artwork"),
    __metadata("design:paramtypes", [artwork_service_1.ArtworkService])
], ArtworkController);
//# sourceMappingURL=artwork.controller.js.map