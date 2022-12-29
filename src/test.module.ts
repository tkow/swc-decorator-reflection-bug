import { DynamicModule, Module, Type } from '@nestjs/common';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { TestService } from './test.service';
import { TEST_METADATA_KEY } from './decorator';

@Module({})
export class TestModule {
  static forModule(
    module?: Type<any> | DynamicModule,
    options?: any,
  ): DynamicModule {
    return {
      global: true,
      module: TestModule,
      imports: module ? [module, DiscoveryModule] : [DiscoveryModule],
      providers: [
        TestService,
        {
            provide: TEST_METADATA_KEY,
            useValue: 'test',
        }
      ],
    };
  }
}
