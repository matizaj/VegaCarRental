import { ErrorHandler, Inject } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import * as Raven from 'raven-js';

export class AppErrorHandler implements ErrorHandler {

    constructor(@Inject(ToastyService) private toasty: ToastyService) {
    }
    handleError(error: any): void {
        Raven.captureException(error.originalError || error);
        console.log('ERROR');
         this.toasty.error({title: 'ERROR', msg: 'UNexpected error happend', theme: 'bootstrap', showClose: true, timeout: 5000});
    }

}
