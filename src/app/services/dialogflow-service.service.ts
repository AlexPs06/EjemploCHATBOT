import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Message } from 'src/app/Models/Message.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DialogflowServiceService {

  readonly token = environment.dialogflow.token;
  readonly client  = new ApiAiClient({ accessToken: this.token });;
  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {

  }
  //metodo para enviar un mensaje al bot y esperar su respuesta
   converse(msg: String) {
    return this.client.textRequest(msg)
               .then(res => {
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot','bot' );
                  return botMessage
               });
  }

  //metodo para probar el bot 
  talk(){
    this.client.textRequest("hola").then(response=>{
      console.log(response.result.fulfillment.speech);
    })

  }
}
