import {  Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveredClassWithMeta, DiscoveryService } from '@golevelup/nestjs-discovery';
import {
  CLASS_METADATA_KEY,
  METHOD_METADATA_KEY,
} from './decorator';

@Injectable()
export class TestService implements OnModuleInit {

  constructor(
    private readonly discoveryService: DiscoveryService,
  ) {}

  async onModuleInit() {
    const providers = await this.discoveryService.providersWithMetaAtKey<any>(
      CLASS_METADATA_KEY,
    );
    const values = await this.populateCommandMapInstances(providers);
    // NOTE: The swc-loader output is defferent from babel-loader with typescript and metadeta config.
    console.log(JSON.stringify(values, null, 2))
  }

  run() {
    // console.log('run')
  }

  private async populateCommandMapInstances(
    providers: DiscoveredClassWithMeta<any>[],
  ): Promise<any[]> {
    const values: any[] = [];
    for (const provider of providers) {
      const optionProviders =
        await this.discoveryService.providerMethodsWithMetaAtKey<any>(
          METHOD_METADATA_KEY,
          (found) => found.name === provider.discoveredClass.name,
        );
      values.push({
        meta: provider.meta,
        instance: provider.discoveredClass.instance as any,
        params: optionProviders,
      });
    }
    return values;
  }
}
