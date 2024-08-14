import { ArtworkService } from "./artwork.service";
import { PostArtworkDto } from "src/dtos/postArtwork.dto";
import { UpdateArtwork } from "src/dtos/updateArtwork.dto";
export declare class ArtworkController {
    private readonly artworkService;
    constructor(artworkService: ArtworkService);
    uploadArtwork(postArtworkDto: PostArtworkDto): Promise<any>;
    updateArtwork(updateArtwork: UpdateArtwork): Promise<any>;
    updateComments(updateArtwork: UpdateArtwork): Promise<any>;
    updateViews(updateArtwork: UpdateArtwork): Promise<any>;
    updateLikes(updateArtwork: UpdateArtwork): Promise<any>;
    deleteArtwork(updateArtwork: UpdateArtwork): Promise<any>;
}
