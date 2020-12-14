import { Pipe, PipeTransform } from '@angular/core';
import { Medication } from '../models/medication';

@Pipe({
  name: 'activeMeds'
})
export class ActiveMedsPipe implements PipeTransform {

  transform(medications: Medication[], showAll: boolean): Medication[] {
    let inactiveMedications: Medication[] = [];
    if(showAll){
      return medications;
    }
    medications.forEach(function(medication){
      if(medication.active){
        inactiveMedications.push(medication);
      }
    })
    return inactiveMedications;
  }

}
