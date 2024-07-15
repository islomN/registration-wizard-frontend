import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {catchError,tap} from 'rxjs'
import {ErrorService} from './error.service'
import {IProvince} from "../models/province";
import {BaseApiService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})

export class ProvinceService extends BaseApiService {
    constructor(
        http: HttpClient,
        errorService: ErrorService
    ) {
        super(http, errorService)
    }

    provinces: IProvince[] = []

    get(countryId: number) {
        console.log(countryId)
        return this.http.get<IProvince[]>(
            this.apiUrl + '/province',
            {
                params: new HttpParams({
                    fromObject: {countryId: countryId}
                })
            })
            .pipe(
                tap(provinces => this.provinces = provinces),
                catchError(this.errorHandler.bind(this))
            );
    }
}
