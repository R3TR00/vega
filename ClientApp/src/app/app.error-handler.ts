import { ErrorHandler } from "@angular/core";
import * as Sentry from "@sentry/angular-ivy";

export class AppErrorHandler implements ErrorHandler{
    handleError(error: any): void {
        Sentry.captureException(error.originalError|| error);
        console.log("ERROR");
    }

    
}