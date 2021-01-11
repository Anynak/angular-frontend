import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/ChatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  chatWebSocket: WebSocket;
  wakeWebSocket: WebSocket;
  chatmessages: ChatMessageDto[] = [];

  constructor() {
    this.chatWebSocket = new WebSocket('wss://springtestserver.herokuapp.com/chat');
    this.wakeWebSocket = new WebSocket('wss://springtestserver.herokuapp.com/wake');
    // this.chatWebSocket = new WebSocket('ws://localhost:8080/chat');
    // this.wakeWebSocket = new WebSocket('ws://localhost:8080/wake');
  }

  // tslint:disable-next-line:typedef
  public openWebsocket() {
    this.chatWebSocket.onopen = (event) => {
      console.log('open: ', event);
    };
    this.wakeWebSocket.onopen = (event) => {
      console.log('wakeWebSocket open: ', event);
      setInterval(() => this.wakeUpWebSocket(), 30000);
    };
    this.chatWebSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatmessages.push(chatMessageDto);
    };
    this.chatWebSocket.onclose = (event) => {
      console.log('close: ', event);
    };
  }

  // tslint:disable-next-line:typedef
  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.chatWebSocket.send(JSON.stringify(chatMessageDto));
    console.log('ChatMessageDto: ', ChatMessageDto);
  }

  // tslint:disable-next-line:typedef
  public closeWebSocket() {
    this.chatWebSocket.close();
  }

  // tslint:disable-next-line:typedef
  public wakeUpWebSocket() {
    this.wakeWebSocket.send('');
  }


}

