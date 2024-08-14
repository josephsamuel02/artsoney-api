import { PrismaService } from "src/prisma/prisma.service";
import { PostArtworkDto } from "src/dtos/postArtwork.dto";
import { UpdateArtwork } from "src/dtos/updateArtwork.dto";
export declare class ArtworkService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private logger;
    test(data: any): Promise<any>;
    uploadArtwork(postArtworkDto: PostArtworkDto): Promise<any>;
    updateArtwork(updateArtwork: UpdateArtwork): Promise<any>;
    updateViews(updateArtwork: UpdateArtwork): Promise<any>;
    updateLikes(updateArtwork: UpdateArtwork): Promise<any>;
    updateComments(updateArtwork: UpdateArtwork): Promise<any>;
    deleteArtwork(updateArtwork: UpdateArtwork): Promise<any>;
}
