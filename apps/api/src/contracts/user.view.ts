import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString, IsUUID } from "class-validator";

@Exclude()
export class UserView {
    @Expose()
	@IsUUID()
	@ApiProperty({ format: "uuid" })
	public id: number;

	@Expose()
	@IsString()
	@ApiProperty()
	public name: string;

	@Expose()
	@IsEmail()
	@ApiProperty()
	public email: string;
}
