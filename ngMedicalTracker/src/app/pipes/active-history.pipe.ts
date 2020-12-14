import { MedicalHistory } from './../models/medical-history';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeHistory'
})
export class ActiveHistoryPipe implements PipeTransform {

    transform(history: MedicalHistory[], showAll: boolean): MedicalHistory[] {
    let inactiveHistory: MedicalHistory[] = [];
    if(showAll){
      return history;
    }
    history.forEach(function(hist){
      if(hist.active){
        inactiveHistory.push(hist);
      }
    })
    return inactiveHistory;
  }

}
