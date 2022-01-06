import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Contact {
  key: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(public storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  public async generateKey(): Promise<string>{
    let today = Date;
    let key = today.now().toString();
    let ret = await this.storage.get(key);

    while(ret){
      key = today.now().toString();
      ret = await this.storage.get(key);
    }

    return key;
  }

  public async read(): Promise<Contact[]>{
    let contacts: Contact[] = [];
    await this.storage.forEach((value)=>{
      contacts.push(value);
    });

    return contacts;
  }

  public async view(key: string): Promise<Contact>{
    let contact: Contact;
    contact = await this.storage.get(key);
    return contact;
  }

  public async create(key: string, contact: Contact){
    console.log("Contact created: ", contact);
    return await this.storage.set(key, contact);
  }

  public async update(contact: Contact){
    console.log("Contact updated: ", contact);
    return await this.storage.set(contact.key, contact);
  }

  public async delete(key: string){
    console.log("Contact deleted: ", key);
    return await this.storage.remove(key);
  }
}
