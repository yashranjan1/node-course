import { Expose } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginBody {
    @Expose()
    @IsEmail()
    public email: string

    @IsString()
    @Expose()
    @Length(8)
    public password: string
}