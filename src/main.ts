import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global prefix
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  //app.useGlobalFilters(new HttpExceptionFilter(new Logger()));
  //app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Medforce-Eval-Tool')
    .setDescription('Medforce Eval Tool API')
    .setVersion(process.env.npm_package_version)
    .addTag('Evaluation Template')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // generate api collection
  SwaggerModule.setup('', app, document);
  await app.listen(3000);
}
bootstrap();
