import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsString, IsUUID } from "class-validator";

@Exclude()
export class PostBody {
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
    @IsUUID()
    @ApiProperty()
    public authorId: string
}
