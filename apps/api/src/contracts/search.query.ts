import { IsString, IsOptional, isString } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

export class SearchQuery {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: "Filter users by name or email" })
    public search?: string

}