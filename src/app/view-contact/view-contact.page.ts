import { Component, OnInit } from '@angular/core';
import { Contact, DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.page.html',
  styleUrls: ['./view-contact.page.scss'],
})
export class ViewContactPage implements OnInit {
  public contact: Contact;

  constructor(
    private _dataService: DataService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    const key = this._activatedRoute.snapshot.paramMap.get('key');
    this.contact = await this._dataService.view(key);
  }

  async deleteContact() {
    this._dataService.delete(this.contact.key);
    window.location.href="/";
  }
}
