import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

class ChatMessage {
  constructor(public username: string, public message: string) {}
}

@WebSocketGateway()
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected!');
    });

    this.server.on('disconnect', (socket) => {
      console.log(socket.id);
      console.log('disconnected!');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: ChatMessage) {
    this.server.emit('onMessage', body);
  }
}
