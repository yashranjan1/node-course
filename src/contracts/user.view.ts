import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString, IsUUID } from "class-validator";

@Exclude()
export class UserView {
    @Expose()
	@IsUUID()
	public id: number;

	@Expose()
	@IsString()
	public name: string;

	@Expose()
	@IsEmail()
	public email: string;
}
