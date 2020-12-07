export class MedicalHistory {
  id: number;
  diagnosis: string;
  active: boolean;
  onset: string;
  treatment: string;

  constructor(
    id?: number,
    diagnosis?: string,
    active?: boolean,
    onset?: string,
    treatment?: string,
  ){
    this.id = id;
    this.diagnosis = diagnosis;
    this.active = active;
    this.onset = onset;
    this.treatment = treatment;
  }
}
