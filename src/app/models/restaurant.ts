export class Restaurant {
  id: number;
  name: string;
  type: string;
  address: string;
  hours: string;
  phoneNumber: string;

  constructor(id: number, name: string, address: string, type: string, hours: string, phoneNumber: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.type = type;
    this.hours = hours;
    this.phoneNumber = phoneNumber;
  }
}
