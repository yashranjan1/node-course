import { IsNumber, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class AccessToken{
    @Expose()
    @IsString()
    public token: string

    @Expose()
    @IsNumber()
    public expiresIn: number
}