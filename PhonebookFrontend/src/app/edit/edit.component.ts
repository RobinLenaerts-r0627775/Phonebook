import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { Entry } from '../_models/Entry';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  entry: Entry = new Entry();
  uploadForm: FormGroup;
  submit: HTMLInputElement;
  errorInputdiv: HTMLDivElement;
  errorNumberdiv: HTMLDivElement;

  constructor(private formBuilder: FormBuilder, public api: ApiService, @Inject(MAT_DIALOG_DATA) data) { 
    this.entry = data;
  }

  ngOnInit(): void {
    this.submit = <HTMLInputElement>document.getElementById("submit");
    this.errorNumberdiv = <HTMLDivElement>document.getElementById("errNumber");
    this.errorInputdiv = <HTMLDivElement>document.getElementById("errInputs");
    this.uploadForm = this.formBuilder.group({
      id: '', 
      firstName: '',
      lastName: '',
      number: ''
  });
  }

  async editEntry() {
    if(!this.checkInputs()){ return; }
    const formData = new FormData();
  
    this.uploadForm.get('id').setValue(this.entry.id);
    formData.append('id', this.uploadForm.get('id').value);
    
    this.uploadForm.get('firstName').setValue(this.entry.firstName);
    formData.append('firstName', this.uploadForm.get('firstName').value);
    
    this.uploadForm.get('lastName').setValue(this.entry.lastName);
    formData.append('lastName', this.uploadForm.get('lastName').value);
    
    this.uploadForm.get('number').setValue(this.entry.number);
    formData.append('number', this.uploadForm.get('number').value);
     
    this.api.editEntryFormData(formData);
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
      if(this.entry.firstName.trim() === "" || this.entry.lastName.trim() === ""){
        this.errorInputdiv.hidden = false;
        return false;
      }
      else {
        this.errorInputdiv.hidden = true;
        return true;}
  }

  checkValidity(): boolean{
    var re = new RegExp("^\\+[0-9]{2} [0-9]{2} [0-9]{7}$")
    if(this.entry.number.match(re)){
      this.errorNumberdiv.hidden = true;
      return true;
    } else {
      this.errorNumberdiv.hidden = false;
      return false;
    }
  }
}
