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
exports.ArtworkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ArtworkService = class ArtworkService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger("createUser");
    }
    async test(data) {
        this.logger.log("test");
        return data;
    }
    async uploadArtwork(postArtworkDto) {
        try {
            const artworkData = {
                artwork_id: `${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}`,
                ...postArtworkDto,
            };
            const newArtwork = await this.prisma.artwork.create({
                data: artworkData,
            });
            if (!newArtwork) {
                throw new common_1.BadRequestException({
                    message: "Unable to upload artwork",
                });
            }
            return {
                status: 200,
                message: "Artwork updated successfully",
                artwork_name: newArtwork.artwork_name,
                artwork_id: newArtwork.artwork_id,
                user: newArtwork.userId,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async updateArtwork(updateArtwork) {
        try {
            const newArtwork = await this.prisma.artwork.update({
                where: { artwork_id: updateArtwork.artwork_id },
                data: updateArtwork,
            });
            if (!newArtwork) {
                throw new common_1.BadRequestException({
                    message: "Unable to upload artwork",
                });
            }
            return {
                status: 200,
                message: "Artwork updated successfully",
                artwork_name: newArtwork.artwork_name,
                artwork_id: newArtwork.artwork_id,
                user: newArtwork.userId,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async updateViews(updateArtwork) {
        try {
            const artwork = await this.prisma.artwork.findUnique({
                where: { artwork_id: updateArtwork.artwork_id },
            });
            const updateViews = await this.prisma.artwork.update({
                where: {
                    artwork_id: updateArtwork.artwork_id,
                },
                data: {
                    views: artwork.views + 1,
                },
            });
            if (!updateViews) {
                throw new common_1.BadRequestException({
                    message: "Unable to like artwork",
                });
            }
            return {
                status: 200,
                message: "Artwork viewed",
                artwork_id: artwork.artwork_id,
                user: updateArtwork.userId,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async updateLikes(updateArtwork) {
        try {
            const artwork = await this.prisma.artwork.findUnique({
                where: { artwork_id: updateArtwork.artwork_id },
            });
            const updateLikes = await this.prisma.artwork.update({
                where: {
                    artwork_id: updateArtwork.artwork_id,
                },
                data: {
                    likes: artwork.likes + updateArtwork.likes,
                },
            });
            if (!updateLikes) {
                throw new common_1.BadRequestException({
                    message: "Unable to like artwork",
                });
            }
            return {
                status: 200,
                message: "Artwork liked",
                artwork_id: artwork.artwork_id,
                user: updateArtwork.userId,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async updateComments(updateArtwork) {
        try {
            const artwork = await this.prisma.artwork.findUnique({
                where: { artwork_id: updateArtwork.artwork_id },
            });
            const updateComments = await this.prisma.artwork.update({
                where: { artwork_id: updateArtwork.artwork_id },
                data: {
                    comments: {
                        push: {
                            userId: updateArtwork.userId,
                            user_name: updateArtwork.user_name,
                            comment: updateArtwork.comment,
                            likes: updateArtwork.likes,
                            profile_img: updateArtwork.profile_img,
                        },
                    },
                },
            });
            if (!updateComments) {
                throw new common_1.BadRequestException({
                    message: "Unable to comment on artwork",
                });
            }
            return {
                status: 200,
                message: "Commented on Artwork successfully",
                artwork_id: artwork.artwork_id,
                user: updateArtwork.userId,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async deleteArtwork(updateArtwork) {
        try {
            const artwork = await this.prisma.artwork.findUnique({
                where: { artwork_id: updateArtwork.artwork_id },
            });
            if (!artwork || artwork.userId !== updateArtwork.userId) {
                throw new common_1.UnauthorizedException({
                    message: "You are not authorized to delete this artwork",
                });
            }
            await this.prisma.artwork.delete({
                where: { artwork_id: updateArtwork.artwork_id },
            });
            return {
                status: 200,
                message: "Artwork deleted successfully",
                artwork_id: updateArtwork.artwork_id,
                user: updateArtwork.userId,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
};
exports.ArtworkService = ArtworkService;
exports.ArtworkService = ArtworkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArtworkService);
//# sourceMappingURL=artwork.service.js.map