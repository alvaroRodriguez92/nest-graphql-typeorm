import { forwardRef, Module } from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { ProyectsResolver } from './proyects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyect } from './entities/proyect.entity';
import { EmployeesModule } from '../employees/employees.module';
import { BullModule } from '@nestjs/bull';
import { TranscodeConsumer } from './consumers/transcode.consumer';

@Module({
  exports: [ProyectsService],
  imports: [
    TypeOrmModule.forFeature([Proyect]),
    forwardRef(() => EmployeesModule),
    
    BullModule.registerQueue({
      name:'transcode',
    })
  ],
  providers: [ProyectsResolver, ProyectsService,TranscodeConsumer],
})
export class ProyectsModule {}
