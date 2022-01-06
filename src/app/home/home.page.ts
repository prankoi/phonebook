import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DataService, Contact } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public contacts: Contact[] = [];

  constructor(private _dataService: DataService) {}

  async ngOnInit() {
    this.contacts = await this._dataService.read();
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  public async createContact(firstName: string, lastName: string, mobile: string, email: string){
    let key = await this._dataService.generateKey();
    let contact = {
      key: key,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email
    }

    await this._dataService.create(key, contact);
    this.contacts = await this._dataService.read();
  }
}