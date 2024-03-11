import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { YjsGateway } from './yjs.gateway';

@Module({
  providers: [Gateway, YjsGateway],
})
export class GatewayModule {}
