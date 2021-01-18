import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITesttable1 } from 'app/shared/model/testtable-1.model';

type EntityResponseType = HttpResponse<ITesttable1>;
type EntityArrayResponseType = HttpResponse<ITesttable1[]>;

@Injectable({ providedIn: 'root' })
export class Testtable1Service {
  public resourceUrl = SERVER_API_URL + 'api/testtable-1-s';

  constructor(protected http: HttpClient) {}

  create(testtable1: ITesttable1): Observable<EntityResponseType> {
    return this.http.post<ITesttable1>(this.resourceUrl, testtable1, { observe: 'response' });
  }

  update(testtable1: ITesttable1): Observable<EntityResponseType> {
    return this.http.put<ITesttable1>(this.resourceUrl, testtable1, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITesttable1>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITesttable1[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
