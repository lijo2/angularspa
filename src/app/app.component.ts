import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularspa';
  textField = new FormControl('');

  constructor(private http: HttpClient) {}

  onClick() {
    console.log('call backend api to get data');
    const str = this.textField.value;
    this.http.get('https://springapitestli.azurewebsites.net/jsonapi/' + str).subscribe((resp) => {
      this.textField.setValue(JSON.stringify(resp));
    });
  }

  onLogin() {
    console.log('start user login');
  }
}
