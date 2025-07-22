import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const accessKeyFromClient =
      request.headers['accesskey'] || request.headers['rra-access-key'];
    const accessKeyFromEnv = this.configService.get<string>('ACCESS_KEY');

    if (!accessKeyFromClient || accessKeyFromClient !== accessKeyFromEnv) {
      throw new ForbiddenException('Invalid or missing access key.');
    }

    return true;
  }
}
