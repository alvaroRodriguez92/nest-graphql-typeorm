import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class CreateEmployeeInput {

    @MinLength(2)
    @IsNotEmpty()
    @Field(()=> String)
    name: string;

    @IsNotEmpty()
    @Field(() => String)
    dateStarted: string;

}