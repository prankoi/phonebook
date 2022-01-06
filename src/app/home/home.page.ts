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
}