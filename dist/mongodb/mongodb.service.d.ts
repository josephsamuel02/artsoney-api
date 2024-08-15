import { Db } from "mongodb";
export declare class MongoDBService {
    private client;
    private db;
    constructor();
    connect(): Promise<void>;
    getDatabase(): Db;
    closeConnection(): Promise<void>;
}
