export interface Message {
    sender: 'user' | 'bot';
    text: string;
  }
  
  export interface UserInfo {
    name: string;
    phone: string;
  }
  