import { Component, OnInit } from '@angular/core';
import { Message } from './models/Message.model';
import { DialogflowServiceService } from './services/dialogflow-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ejemplo-dialogflow';
  array_messages: Message[]=[];
  formChat:FormGroup;
  currentUser="1";

  constructor(
    private formbuilder : FormBuilder,
    private chabtot: DialogflowServiceService,
  ){
    this.formChat = this.formbuilder.group({
      message : [''],
    })
  }


  //Funcion para enviar mensajes al chatbot
  sendMessage(){
    let value = this.formChat.get("message").value
    /*se genera el objeto el mensaje con su valor */
    let mensajeUsuario:Message = new Message (value, "1", "Alex") ;
    /*se envia el mensaje usando el servicio de dialogflow */

    this.chabtot.converse(mensajeUsuario.content).then(responseBot=>{
      /*se añaden los mensajes en orden para visualizarlos en la ventana principal */ 
      this.array_messages.push(mensajeUsuario)    
      this.array_messages.push(responseBot)    
    })

    /* por ultumo reiniciamos e formulario */
    this.formChat.reset();
  }
  ngOnInit(){

  }
}
