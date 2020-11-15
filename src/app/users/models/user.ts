export class User {
  email: string;
  name?: string;
  street?: string;
  houseNumber?: string;
  postal?: string;
  city?: string;
  country?: string;

  constructor(data) {
    this.email = data.email;
    this.name = data.name || null;
    this.street = data.street || null;
    this.houseNumber = data.houseNumber || null;
    this.postal = data.postal || null;
    this.city = data.city || null;
    this.country = data.country || null;
  }
}
