export declare class EncryptionService {
    constructor();
    hashPassword: (password: string) => Promise<any>;
    comparePasswords: (password: string | Buffer, hashedPassword: string) => Promise<any>;
    encrypt(data: string): Promise<any>;
    decrypt(data: any): any;
}
