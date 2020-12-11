import { Provider } from './provider';
import { Patient } from './patient';

export class Message {
  id: number;
  content: string;
  patient: Patient;
  provider: Provider;
  providerRead: boolean;
  patientRead: boolean;
  creationDate: Date;
  title: string;

  constructor(
    id?: number,
    content?: string,
    patient?: Patient,
    provider?: Provider,
    providerRead?: boolean,
    patientRead?: boolean,
    creationDate?: Date,
    title?: string
  ){
    this.id = id;
    this.content = content;
    this.patient = patient;
    this.provider = provider;
    this.providerRead = providerRead;
    this.patientRead = patientRead;
    this.creationDate = creationDate;
    this.title = title;
  }
}
