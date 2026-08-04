import { IsString, IsOptional, isString } from "class-validator"

export class SearchQuery {
    @IsString()
    @IsOptional()
    public search?: string

}