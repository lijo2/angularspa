import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ApplicationInsightsService } from './applicationInsights.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angularspa';
  titleField = new FormControl('title');
  textField = new FormControl('data');
  resultField = new FormControl('');

  serviceUrl: string;

  constructor(private http: HttpClient, public applicationInsightsService: ApplicationInsightsService) {
    if (this.isOnLocalHost()) {
      this.serviceUrl = 'http://localhost:8080';
    } else {
      this.serviceUrl = 'https://springapitestli.azurewebsites.net';
    }
  }

  ngOnInit(){
    this.applicationInsightsService.logTrace('HomeComponent ngOnInit');
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

  onTempTest() {
    let m = this.hello;
    if (this.textField.value) {
      m = null;
    }
    m.call(this);
  }

  onTempTest2() {
    try {
      let m = this.hello;
      if (this.textField.value) {
        m = null;
      }
      m.call(this);
    }
    catch(a) {
      console.log('exception happened: ' + a);
    }
  }

  onClick() {
    console.log('call backend api to get data');
    const str = this.titleField.value;
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
