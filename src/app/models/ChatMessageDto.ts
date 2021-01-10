export class ChatMessageDto{
  message: string;
  user: string
  constructor(user: string, message: string) {
    this.user = user;
    this.message = message;
  }
}
