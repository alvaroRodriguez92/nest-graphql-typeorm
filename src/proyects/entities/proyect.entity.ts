import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from '../../employees/employee.entity';
import { Entity, PrimaryGeneratedColumn,Column, ManyToOne, Relation } from 'typeorm';

@Entity()
@ObjectType()
export class Proyect {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(()=>String)
  name: string;

  @Column()
  @Field(()=>String)
  description: string;

  @Column()
  @Field(()=>Number,{nullable:true})
  employeeId?: number;

  @ManyToOne(() => Employee, (employee) => employee.proyects)
  @Field(() => Employee, { nullable: true })
  employee?: Relation<Employee>; //Employee;
}
