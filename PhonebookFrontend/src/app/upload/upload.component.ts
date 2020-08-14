import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup
} from '@angular/forms';
import { Entry } from './../_models/Entry';
import { ApiService } from '../api.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  entryFirstName: string = "";
  entryLastName: string = ""; 
  entryNumber: string = "";
  uploadForm: FormGroup;
  submit: HTMLInputElement;
  errorInputdiv: HTMLDivElement;
  errorNumberdiv: HTMLDivElement;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.submit = <HTMLInputElement>document.getElementById("submit");
    this.errorNumberdiv = <HTMLDivElement>document.getElementById("errNumber");
    this.errorInputdiv = <HTMLDivElement>document.getElementById("errInputs");
    this.uploadForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      number: ''
  });
  }

  async uploadEntry() {
    if(!this.checkInputs()){ return; }
    var entry = new Entry();
    entry.firstName = this.entryFirstName;
    entry.lastName = this.entryLastName;
    entry.number = this.entryNumber;
    const formData = new FormData();
  
    this.uploadForm.get('firstName').setValue(entry.firstName);
    formData.append('firstName', this.uploadForm.get('firstName').value);
    
    this.uploadForm.get('lastName').setValue(entry.lastName);
    formData.append('lastName', this.uploadForm.get('lastName').value);

    this.uploadForm.get('number').setValue(entry.number);
    formData.append('number', this.uploadForm.get('number').value);
     
    this.api.postEntryFormData(formData);
  }

  setSubmit(){
    var numbercheck = this.checkValidity();
    var namecheck = this.checkInputs();
    if(numbercheck && namecheck){
      this.submit.disabled = false;
    }
    else {
      this.submit.disabled = true;
    }
  }

  checkInputs(): boolean{
      if(this.entryFirstName.trim() === "" || this.entryLastName.trim() === ""){
        this.errorInputdiv.hidden = false;
        return false;
      }
      else {
        this.errorInputdiv.hidden = true;
        return true;}
  }

  checkValidity(): boolean{
    var re = new RegExp("^\\+[0-9]{2} [0-9]{2} [0-9]{7}$")
    if(this.entryNumber.match(re)){
      this.errorNumberdiv.hidden = true;
      return true;
    } else {
      this.errorNumberdiv.hidden = false;
      return false;
    }
  }
}
