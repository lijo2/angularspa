import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angularspa';
  textField = new FormControl('');
  titleField = new FormControl('');
  resultField = new FormControl('');

  serviceUrl: string;

  constructor(private http: HttpClient) {
    if (this.isOnLocalHost()) {
      this.serviceUrl = 'http://localhost:8080';
    } else {
      this.serviceUrl = 'https://springapitestli.azurewebsites.net';
    }
  }

  isOnLocalHost() {
    return window.location.host.startsWith('localhost');
  }

  async hello() {
    return 'hello';
  }

  async onSync() {
    const val = this.hello();
    val.then(v1 => {
      console.log(v1);
    });

    const v = await this.hello();
    console.log(v);
  }

  onClick() {
    console.log('call backend api to get data');
    const str = this.textField.value;
    this.http.get(this.serviceUrl + '/jsonapi/' + str).subscribe((resp) => {
      this.resultField.setValue(JSON.stringify(resp));
    });
  }

  onClickStorage(id) {
    if (id === 0) {
      const data = {
        name: this.titleField.value,
        data: this.textField.value,
      };

      this.http.post(this.serviceUrl + '/storages/', data).subscribe((resp) => {
        this.resultField.setValue(resp);
      });
    } else if (id === 1) {
      this.http.get(this.serviceUrl + '/storages/').subscribe((resp) => {
        this.resultField.setValue(resp);
      });
    } else if (id === 2) {
      this.http
        .delete(this.serviceUrl + '/storages/' + this.titleField.value)
        .subscribe((resp) => {
          this.resultField.setValue(resp);
        });
    } else if (id === 3) {
      this.http
        .get(this.serviceUrl + '/storages/' + this.titleField.value, {responseType: 'text'})
        .subscribe((resp) => {
          this.resultField.setValue(resp);
        });
    }
  }

  onLogin() {
    console.log('start user login');
  }
}
