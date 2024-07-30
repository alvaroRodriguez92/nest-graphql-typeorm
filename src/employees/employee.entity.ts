import { Field, ObjectType } from "@nestjs/graphql";
import { Proyect } from "../proyects/entities/proyect.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
@ObjectType()
export class Employee{
    
    @PrimaryGeneratedColumn()
    @Field(() => Number)
    id:number

    @Column()
    @Field(() => String)
    name:string

    @Column()
    @Field(() => String)
    dateStarted:string

    @OneToMany(() => Proyect, (proyect) => proyect.employee)
    @Field(() => [Proyect],{nullable:true})
    proyects?:Relation <Proyect[]>

}