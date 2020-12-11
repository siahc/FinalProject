export class Medication {
  id: number;
  active: boolean;
  name: string;
  description: string;
  dose: string;
  frequency: string;
  provider: string;
  comment: string;

  constructor(
    id?: number,
    active?: boolean,
    name?: string,
    description?: string,
    dose?: string,
    frequency?: string,
    provider?: string,
    comment?: string
  ){
    this.id = id;
    this.active = active;
    this.name = name;
    this.description = description;
    this.dose = dose;
    this.frequency = frequency;
    this.provider = provider;
    this.comment = comment;
  }
}
