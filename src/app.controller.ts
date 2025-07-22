import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome(): { status: string; message: string } {
    return {
      status: 'Ok',
      message: 'Welcome To RRA Tin Generator Microservice',
    };
  }
}
