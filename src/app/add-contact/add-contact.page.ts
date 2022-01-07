import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  constructor(
    private _dataService: DataService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
  }

  contactForm = this._formBuilder.group({
    firstName: [''],
    lastName: [''],
    mobile: [''],
    email: [''],
  });

  public async createContact(){
    let key = await this._dataService.generateKey();
    let contact = {
      key: key,
      firstName: this.contactForm.get('firstName')?.value,
      lastName: this.contactForm.get('lastName')?.value,
      mobile: this.contactForm.get('mobile')?.value,
      email: this.contactForm.get('email')?.value
    }

    await this._dataService.create(key, contact);
    window.location.href="/";
  }

  public onSubmit() {
    this.createContact();
  }
}
