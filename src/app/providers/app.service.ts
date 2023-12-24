import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configSerive: ConfigService) {}
  getHello(): string {
    return this.configSerive.get('app.author');
  }
}
