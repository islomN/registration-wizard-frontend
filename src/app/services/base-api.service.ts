import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {throwError} from "rxjs";
import {environment} from "../../environments/environment";

export class BaseApiService {
    constructor(
        protected http: HttpClient,
        private errorService: ErrorService
    ) {
    }

    protected apiUrl = environment.apiUrl;

    protected errorHandler(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            console.error(error.error.message);
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Message: ${error.error.message}`;
        }

        this.errorService.handle(errorMessage)
        return throwError(() => errorMessage)
    }
}
