import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {ErrorService} from './error.service'
import {IRegistration} from "../models/registration";
import {BaseApiService} from "./base-api.service";
import {catchError, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class RegistrationService extends BaseApiService {
    constructor(
        http: HttpClient,
        errorService: ErrorService
    ) {
        super(http, errorService)
    }

    submit(model: IRegistration) {
        return this.http.post(this.apiUrl + '/registration', model)
            .pipe(
                tap(),
                catchError(this.errorHandler.bind(this))
            );
    }
}
