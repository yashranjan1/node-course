import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsInstance, IsString, IsUUID } from "class-validator";
import { UserView } from "./user.view";

@Exclude()
export class PostView {
    @Expose()
    @IsUUID()
    @ApiProperty({ format: "uuid" })
    public id: string;

    @Expose()
    @IsString()
    @ApiProperty()
    public title: string;

    @Expose()
    @IsString()
    @ApiProperty()
    public description: string;

    @Expose()
    @IsString()
    @ApiProperty()
    public content: string;

    @Expose()
    @IsInstance(UserView)
    @ApiProperty()
    public user: UserView
}
