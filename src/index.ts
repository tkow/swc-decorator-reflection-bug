import 'reflect-metadata'
import { A } from './ClassA'
import { B } from './ClassB'
import { TestModule } from './test.module'
import { TestService } from './test.service'
import { NestFactory } from '@nestjs/core'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    A, B
  ],
})
class AppModule  {
}

export async function run() {
  const app = await NestFactory.createApplicationContext(
    TestModule.forModule({module: class RootModule {}, imports: [AppModule]})
  );
  const runner = app.get(TestService);
  await runner.run();
  await app.close();
}

