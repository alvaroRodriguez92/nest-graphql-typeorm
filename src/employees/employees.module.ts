import { forwardRef, Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { ProyectsModule } from '../proyects/proyects.module';
import { BullModule } from '@nestjs/bull';
import { EmployeeConsumer } from './employees.consumer';

@Module({
  exports:[EmployeesService],
  imports:[TypeOrmModule.forFeature([Employee]),forwardRef(()=>ProyectsModule), BullModule.registerQueue({name:'upload'})],
  providers: [EmployeesResolver, EmployeesService,EmployeeConsumer],
})
export class EmployeesModule {}
