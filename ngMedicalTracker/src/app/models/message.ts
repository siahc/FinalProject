import { Provider } from './provider';
import { Patient } from './patient';

export class Message {
  id: number;
  title: string;
  creationDate: Date;
  content: string;
  providerRead: boolean;
  patientRead: boolean;
  patient: Patient;
  provider: Provider;
  sentByPt: boolean;

  constructor(
    id?: number,
    title?: string,
    content?: string,
    creationDate?: Date,
    providerRead?: boolean,
    patientRead?: boolean,
    patient?: Patient,
    provider?: Provider,
    sentByPt?: boolean
  ){
    this.id = id;
    this.title = title;
    this.content = content;
    this.creationDate = creationDate;
    this.providerRead = providerRead;
    this.patientRead = patientRead;
    this.patient = patient;
    this.provider = provider;
    this.sentByPt = sentByPt;
  }
}
