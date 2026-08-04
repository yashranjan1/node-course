import { Expose } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginBody {
    @Expose()
    @IsEmail()
    @ApiProperty()
    public email: string

    @IsString()
    @Expose()
    @Length(8)
    @ApiProperty()
    public password: string
}