import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularspa';
  textField = new FormControl('');

  onClick() {
    console.log('call backend api to get data');
    console.log(this.textField.value);
    this.textField.setValue( 'new value');
  }

  onLogin() {
    console.log('start user login');
  }
}
