import { ErrorHandler, isDevMode } from "@angular/core";
import * as Sentry from "@sentry/angular-ivy";

export class AppErrorHandler implements ErrorHandler{
    handleError(error: any): void {
        if(!isDevMode())
            Sentry.captureException(error.originalError|| error);
        else
            throw error;
        console.log("ERROR");
    }

    
}