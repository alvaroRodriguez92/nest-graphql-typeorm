import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Proyect } from '../proyects/entities/proyect.entity';
import { ProyectsService } from '../proyects/proyects.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmployeesService {
    constructor(
    @Inject(forwardRef(() => ProyectsService)) 
    private proyectsService: ProyectsService,
    @InjectRepository(Employee) 
    private employeesRepository: Repository<Employee>,
    @InjectQueue('upload') private readonly uploadQueue:Queue
) {}

    async findAllEmployees(): Promise<Employee[]>{
        const employees = await this.employeesRepository.find()
        return employees;
    }
    async findOneEmployee(id: number): Promise<Employee>{
        const employee = await this.employeesRepository.findOne({where: {id}});
        return employee;
    }

    async createEmployee(createEmployeeInput: CreateEmployeeInput): Promise<Employee>{
        const newEmployee = this.employeesRepository.create(createEmployeeInput);
        return await this.employeesRepository.save(newEmployee);
    }

    async getProyects(employeeId: number):Promise<Proyect[]>{
        const proyects = await this.proyectsService.findAllProyectsByEmployeeId(employeeId)
        return proyects;
    }

    async uploadEmployee(){
        for(let i = 0; i<100;i++){
            const elementQueue = this.employeesRepository.create({name:`paco${i}`, dateStarted:`23/12/${i}`})
            await this.employeesRepository.save(elementQueue);
            const job = await this.uploadQueue.add({...elementQueue, i: i})

        }
        return "ok"
    }
}