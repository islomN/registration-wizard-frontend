import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {catchError, Observable, tap} from 'rxjs'
import {ErrorService} from './error.service'
import {ICountry} from "../models/country";
import {BaseApiService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})

export class CountryService extends BaseApiService {
    constructor(
        http: HttpClient,
        errorService: ErrorService
    ) {
        super(http, errorService)
    }

    countries: ICountry[] = []

    get(): Observable<ICountry[]> {
        return this.http.get<ICountry[]>(this.apiUrl + '/country')
            .pipe(
                tap(countries => this.countries = countries),
                catchError(this.errorHandler.bind(this))
            );
    }
}
