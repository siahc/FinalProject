import { Provider } from './provider';
import { Patient } from './patient';

export class Message {
  id: number;
  content: string;
  patient: Patient;
  provider: Provider;

  constructor(
    id?: number,
    content?: string,
    patient?: Patient,
    provider?: Provider
  ){
    this.id = id;
    this.content = content;
    this.patient = patient;
    this.provider = provider;
  }
}
