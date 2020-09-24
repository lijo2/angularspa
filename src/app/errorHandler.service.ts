import { ErrorHandler, Injectable } from '@angular/core';
import { ApplicationInsightsService } from './applicationInsights.service';

@Injectable()

export class ErrorHandlerService extends ErrorHandler {
  constructor( private applicationInsightsService: ApplicationInsightsService) {
    super();
  }

  handleError(error: Error) {
    this.applicationInsightsService.logException(error);
  }
}
