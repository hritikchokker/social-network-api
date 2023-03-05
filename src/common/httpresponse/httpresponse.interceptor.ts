import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const responseObj:Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map(({data}) => ({ ...data }))
    );
  }
}
