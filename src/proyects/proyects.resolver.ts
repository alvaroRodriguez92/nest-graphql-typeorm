import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProyectsService } from './proyects.service';
import { Proyect } from './entities/proyect.entity';
import { CreateProyectInput } from './dto/create-proyect.input';
import { UpdateProyectInput } from './dto/update-proyect.input';

@Resolver(() => Proyect)
export class ProyectsResolver {
  constructor(private readonly proyectsService: ProyectsService) {}

  @Mutation(() => Proyect)
  createProyect(@Args('createProyectInput') createProyectInput: CreateProyectInput) {
    const proyect = this.proyectsService.create(createProyectInput);
    return proyect;
  }

  @Query(() => [Proyect])
  findAllProyects() {
    return this.proyectsService.findAllProyects();
  }

  @Query(() => Proyect)
  findOneProyect
  (@Args('id', { type: () => Int }) id: number) {
    return this.proyectsService.findOneProyect(id);
  }

  @Mutation(() => Proyect)
  updateProyect(@Args('updateProyectInput') updateProyectInput: UpdateProyectInput) {
    return this.proyectsService.update(updateProyectInput.id, updateProyectInput);
  }

  @Mutation(() => Proyect)
  removeProyect(@Args('id', { type: () => Int }) id: number) {
    return this.proyectsService.remove(id);
  }

  @ResolveField('employee',()=> Proyect)
  async employee(@Parent() proyect: Proyect){
    return await this.proyectsService.getEmployee(proyect.employeeId);
  }

  @Query(() => String)
  async transcode(){
    return await this.proyectsService.transcode();
  }
}
