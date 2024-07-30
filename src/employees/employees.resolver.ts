import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';

class Respond{status:string}

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Query(() => [Employee])
  findAllEmployees() {
    return this.employeesService.findAllEmployees();
  }

  @Query(() => Employee)
  findOneEmployee(@Args('id') id: number): Promise<Employee> {
    return this.employeesService.findOneEmployee(id);
  }

  @Mutation(() => Employee)
  createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ): Promise<Employee> {
    return this.employeesService.createEmployee(createEmployeeInput);
  }

  @ResolveField('proyects', () => [Employee])
  proyects(@Parent() employee: Employee) {
  const proyects = this.employeesService.getProyects(employee.id)    
  return proyects;
  }


@Query(() => String)
upload(){
  return this.employeesService.uploadEmployee();
}

  

}
