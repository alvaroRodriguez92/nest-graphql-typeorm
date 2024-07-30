import { Processor,Process } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor('transcode')
export class TranscodeConsumer{
    private readonly logger = new Logger(TranscodeConsumer.name);

    @Process()
    async transcode(job: Job<any>){
        this.logger.log(`Transcoding message: ${job.id}`)
        this.logger.log(JSON.stringify(job.data))
        await new Promise<void>((resolve) =>setTimeout(() => resolve(), 6000))
        this.logger.log('Transcoding done')
    }
}