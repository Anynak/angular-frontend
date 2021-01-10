import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebSocketService} from '../services/web-socket.service';
import {ChatMessageDto} from '../models/ChatMessageDto';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit, OnDestroy{

  constructor(public webSocketService: WebSocketService) {
  }
  ngOnInit(): void {
    this.webSocketService.openWebsocket();
  }
  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
  sendMessage(sendForm: NgForm){
    const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDto);
    console.log(sendForm.value);
    sendForm.controls.message.reset();
  }

}
