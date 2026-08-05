import { IsString, IsOptional } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

export class SearchQueryPosts {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: "Filter posts by title, description or content" })
    public search?: string

}