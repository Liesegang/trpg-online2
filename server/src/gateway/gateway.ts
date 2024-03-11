import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { DynamicLoader } from 'bcdice';
import GameSystemClass from 'bcdice/lib/game_system';

class ChatMessage {
  constructor(public username: string, public message: string) {}
}

@WebSocketGateway()
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  loader: DynamicLoader;
  gameSystem: GameSystemClass;

  async onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected!');
    });

    this.server.on('disconnect', (socket) => {
      console.log(socket.id);
      console.log('disconnected!');
    });

    this.loader = new DynamicLoader();
    this.gameSystem = await this.loader.dynamicLoad('Cthulhu7th');
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: ChatMessage) {
    const result = this.gameSystem.eval(body.message);
    const retMessage = body.message + result?.text ? '\n' + result.text : '';
    this.server.emit('onMessage', {
      username: body.username,
      message: retMessage,
    });
  }
}
