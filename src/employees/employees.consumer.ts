import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";


@Processor('upload')
export class EmployeeConsumer {
    private logger = new Logger(EmployeeConsumer.name)

    @Process()
    async uploadEmployees(job:Job<any>){
    // let progress = 0;
    // progress +=1;
    this.logger.log(`Upload employee: ${job.id}, data: ${JSON.stringify(job.data)}`)
    await job.progress(job.id);
    return
    }
}