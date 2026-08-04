import { IsNumber, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class AccessToken{
    @Expose()
    @IsString()
    @ApiProperty()
    public token: string

    @Expose()
    @ApiProperty()
    @IsNumber()
    public expiresIn: number
}