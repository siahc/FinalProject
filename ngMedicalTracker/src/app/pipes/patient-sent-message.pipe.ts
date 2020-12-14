import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../models/message';

@Pipe({
  name: 'patientSentMessage'
})
export class PatientSentMessagePipe implements PipeTransform {

  transform(messages: Message[], showPtMsgs: boolean): Message[] {
    let ptMsgs: Message[] = [];
    let provMsgs: Message[] = [];
    if(showPtMsgs){
      messages.forEach(function(msg){
        if(msg.sentByPt){
          ptMsgs.push(msg);
        }
      })
      return ptMsgs;
    } else {
      messages.forEach(function(msg){
        if(!msg.sentByPt){
          provMsgs.push(msg);
        }
      })
      return provMsgs;
    }
  }

}
