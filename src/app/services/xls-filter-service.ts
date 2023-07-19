import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class xlsFilterService {

    public uploadedFiles:any[] = [];
    constructor(public http: HttpClient) { }

    public filterXls(data: any, gstFilter: boolean): Observable<any> {
        return this.http.post<any>(environment.apiUrl + `xlsGenerator/filterXls?gstFilter=${gstFilter}`, data);
    }

    public getItemList(data: FormData): Observable<any> {
        return this.http.post<any>(environment.apiUrl + `xlsGenerator/getItemList`, data);
    }
}