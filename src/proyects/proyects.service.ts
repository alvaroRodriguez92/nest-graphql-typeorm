import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateProyectInput } from './dto/create-proyect.input';
import { UpdateProyectInput } from './dto/update-proyect.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyect } from './entities/proyect.entity';
import { Repository } from 'typeorm';
import { EmployeesService } from '../employees/employees.service';
import { Employee } from '../employees/employee.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ProyectsService {
  constructor(
    @Inject(forwardRef(() => EmployeesService))
    private employeesService: EmployeesService,
    @InjectQueue('transcode') private readonly transcodeQueue:Queue,
    @InjectRepository(Proyect)
    private proyectsRepository: Repository<Proyect>,
  ) {}
  async create(createProyectInput: CreateProyectInput): Promise<Proyect> {
    const proyect = this.proyectsRepository.create(createProyectInput);
    return await this.proyectsRepository.save(proyect);
  }

  async findAllProyects(): Promise<Proyect[]> {
    const proyects = await this.proyectsRepository.find();
    return proyects;
  }

  async findOneProyect(id: number): Promise<Proyect> {
    const proyect = await this.proyectsRepository.findOne({ where: { id } });
    return proyect;
  }

  async findAllProyectsByEmployeeId(employeeId: number): Promise<Proyect[]> {
    const proyects = await this.proyectsRepository.find({
      where: { employeeId },
    });
    return proyects;
  }

  async update(
    id: number,
    updateProyectInput: UpdateProyectInput,
  ): Promise<Proyect> {
    const update = await this.proyectsRepository.update(id, updateProyectInput);
    const proyectUpdated = await this.findOneProyect(id);
    return proyectUpdated;
  }

  remove(id: number) {
    const proyectToRemove = this.proyectsRepository.delete(id);
  }

  async getEmployee(employeeId: number): Promise<Employee> {
    const employee = await this.employeesService.findOneEmployee(employeeId);
    return employee;
  }

  async transcode(){
    await this.transcodeQueue.add({
      fileName:'./files.mp4',

    });
  }
}
