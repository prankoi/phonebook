import { Component, OnInit } from '@angular/core';
import { DataService, Contact } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  public contact: Contact;

  constructor(
    private _dataService: DataService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.init();
  }

  contactForm = this._formBuilder.group({
    firstName: [''],
    lastName: [''],
    mobile: [''],
    email: [''],
  });

  async init() {
    const key = this._activatedRoute.snapshot.paramMap.get('key');
    this.contact = await this._dataService.view(key);
  }

  public async editContact(){
    let contact = {
      key: this.contact.key,
      firstName: this.contactForm.get('firstName')?.value,
      lastName: this.contactForm.get('lastName')?.value,
      mobile: this.contactForm.get('mobile')?.value,
      email: this.contactForm.get('email')?.value
    }

    await this._dataService.update(contact);
    window.location.href="/";
  }

  onSubmit() {
    this.editContact();
  }
}
