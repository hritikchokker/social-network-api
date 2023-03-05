import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/httpresponse/http_exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api/v1');
    app.enableCors({
      origin: '*'
    });
    app.useLogger(false);
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
    console.log('server is listening at ', 3000);
  } catch (error) {
    console.error('server crashed !!!');
    process.exit(0);
  }
}
bootstrap();
