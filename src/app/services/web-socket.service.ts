import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/ChatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket ;
  chatmessages: ChatMessageDto[] = [];
  constructor() {
    // this.webSocket = new WebSocket('wss://springtestserver.herokuapp.com/chat');
    // this.webSocket = new WebSocket('wss://localhost:8080/wakeUp');
    this.webSocket = new WebSocket('wss://localhost:8080/chat');
  }

  // tslint:disable-next-line:typedef
  public openWebsocket(){
    this.webSocket.onopen = (event) => {
      console.log('open: ', event);
    };
    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatmessages.push(chatMessageDto);
    };
    this.webSocket.onclose = (event) => {
      console.log('close: ', event);
    };
  }
  // tslint:disable-next-line:typedef
  public sendMessage(chatMessageDto: ChatMessageDto){
    this.webSocket.send(JSON.stringify(chatMessageDto));
    console.log('ChatMessageDto: ', ChatMessageDto);
  }
  // tslint:disable-next-line:typedef
  public closeWebSocket(){
    this.webSocket.close();
  }
}
