import { CreateProyectInput } from './create-proyect.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProyectInput extends PartialType(CreateProyectInput) {
  @Field(() => Int)
  id: number;
}
