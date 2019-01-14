export interface DbUser {
    id:number;
    email:string;
    passwordDigest:string,
    role: string,
    wallet: string
}