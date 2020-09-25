import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ApplicationInsightsService } from './applicationInsights.service';
import { ThrowStmt } from '@angular/compiler';
import { SeverityLevel } from '@microsoft/applicationinsights-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angularspa';
  titleField = new FormControl('title');
  dataField = new FormControl('data');
  resultField = new FormControl('');

  serviceUrl: string;
  private count = 0;

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
  /*  let m = this.hello;
    if (this.textField.value) {
      m = null;
    }
    m.call(this);*/
    const data = this.dataField.value;
    const title = this.titleField.value;
    switch (title) {
      case 'event': {
        this.applicationInsightsService.logEvent(
          title, {myValue: data, myDate: Date.now()}
        );
        break;
      }
      case 'metric': {
        this.applicationInsightsService.logMetric(
          'supportingdocnum', this.count++, {myValue: data, myDate: Date.now()}
        );
        break;
      }
      case 'pageview': {
        this.applicationInsightsService.logPageView(
          'pageview' + (this.count++).toString(), window.location.href
        );
        break;
      }
      case 'xhr': {
        try {
          this.http.get(data, {responseType: 'text'}).subscribe( (dat: any) => {
            console.log(dat);
            this.applicationInsightsService.logTrace('next http callback' + dat, {myValue: data, myDate: Date.now()});
          }, (err) => {
            this.applicationInsightsService.logTrace('err http callback', {myName: err.name, myDate: err.message});
            this.applicationInsightsService.logException(err);
          },
          () => {
            console.log('http complete handler');
            this.applicationInsightsService.logTrace('complete http callback', {myValue: data, myDate: Date.now()});
          });
        } catch (ex) {
          this.applicationInsightsService.logTrace('try catch http callback', {myValue: data, myDate: Date.now()});
          this.applicationInsightsService.logException(ex);
        }
        break;
      }
      case 'exception': {
        if (data === 'caught') {
          try {
            let m = this.hello;
            if (this.titleField.value) {
              m = null;
            }
            m.call(this);
          } catch (ex) {
            this.applicationInsightsService.logException(ex);
          }
        } else {
            let m = this.hello;
            if (this.titleField.value) {
              m = null;
            }
            m.call(this);
        }
        break;
      }
      case 'log': {
        if (data === 'info') {
          this.applicationInsightsService.logTrace('write log of info level', {myValue: data, myDate: Date.now()},
            SeverityLevel.Information);
        } else if (data === 'warning') {
          this.applicationInsightsService.logTrace('write log of warn level', {myValue: data, myDate: Date.now()},
          SeverityLevel.Warning);
        } else if (data === 'error') {
          this.applicationInsightsService.logTrace('write log of error level', {myValue: data, myDate: Date.now()},
          SeverityLevel.Error);
        } else if (data === 'critical') {
          this.applicationInsightsService.logTrace('write log of critical level', {myValue: data, myDate: Date.now()},
          SeverityLevel.Critical);
        } else {
          this.applicationInsightsService.logTrace('write log of verbose level', {myValue: data, myDate: Date.now()},
          SeverityLevel.Verbose);
        }
        break;
      }
      default: {
        this.applicationInsightsService.logTrace('switch log for unmatched action: ' + title, {myValue: data, myDate: Date.now()});
      }
    }
  }

  onTempTest2() {
    try {
      let m = this.hello;
      if (this.dataField.value) {
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
        data: this.dataField.value,
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
