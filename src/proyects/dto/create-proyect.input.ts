import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProyectInput {

  @IsNotEmpty({ message: 'Name of the project is required' })
  @Field(() => String)
  name: string;

  @IsNotEmpty({ message: 'Description of the project is required' })
  @Field(() => String)
  description: string;

  @IsInt({ message: 'EmployeeId must be an integer' })
  @Field(() => Int)
  employeeId?: number;
}
