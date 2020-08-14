import {
  Injectable
} from '@angular/core';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://localhost:44362';
  response: string;

  constructor(private http: HttpClient) {}

  getPhonebookWithPromise() {
    return this.http.get(`${this.url}/api/Phonebook`)
      .toPromise()
  }

  postEntryFormData(formData: FormData) {
    let httpclient = this.http;
    let url = this.url;
    let promise = new Promise(async function (resolve, reject) {
      httpclient.post(`${url}/api/Phonebook`, formData).subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        });
    });
    return promise;
  }

  editEntryFormData(formData: FormData) {
    let httpclient = this.http;
    let url = this.url;
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        }
      }
    let promise = new Promise(async function (resolve, reject) {
      httpclient.put(`${url}/api/Phonebook`, formData).subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        });
    });
    return promise;
  }
}

