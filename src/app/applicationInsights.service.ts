import { Injectable } from '@angular/core';
import { ApplicationInsights, SeverityLevel } from '@microsoft/applicationinsights-web';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

// This service is used to implement Azure Application Insights service
export class ApplicationInsightsService {

  appInsights: ApplicationInsights;

  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.instrumentationKey,
        enableAutoRouteTracking: true
      }
    });

    this.appInsights.loadAppInsights();
  }

  // pageview can be viewed from app insight's log and Event
  // call s logPageView(
  // logPageView(pageName, pageUrl);
  logPageView(name?: string, url?: string) { // option to call manually
    this.appInsights.trackPageView({
      name,
      uri: url
    });
  }

  // event log can be viewed from app insight's Log or Search for CustomEvent
  // each logEvent call will show as a separate item
  // call sample:
  // logEvent(eventTitle, {myValue: data, myDate: Date.now()});
  logEvent(name: string, properties?: { [key: string]: any }) {
    this.appInsights.trackEvent({name}, properties);
  }

  // metric log can be viewed from app insight's Metric blade
  // it calculages and shows totol call count, max, min, average, and sum
  // call sample:
  // logMetric('docsize', file.length, {filename: file.name, uploadDate: Date.now()}
  logMetric(name: string, average: number, properties?: { [key: string]: any }) {
    this.appInsights.trackMetric({ name, average }, properties);
  }

  // exception log can be viewed from app insight's Search or Failure page
  // Call this method to log error or exception. For uncaught exception,
  // ErrorHandler service will catch exception and call this method to log it
  // call sample:
  // logException(ex);
  logException(exception: Error, severityLevel?: number) {
    this.appInsights.trackException({ exception, severityLevel });
  }

  // log trace can be viewed from Log or Search page
  // call sample:
  // logTrace('write log of warn level', {myValue: data, myDate: Date.now()}, SeverityLevel.Warning);
  logTrace(message: string, properties?: { [key: string]: any }, severityLevel?: SeverityLevel) {
    this.appInsights.trackTrace({message, severityLevel}, properties);
  }
}
