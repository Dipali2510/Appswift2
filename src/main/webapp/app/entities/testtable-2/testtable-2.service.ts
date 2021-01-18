import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITesttable2 } from 'app/shared/model/testtable-2.model';

type EntityResponseType = HttpResponse<ITesttable2>;
type EntityArrayResponseType = HttpResponse<ITesttable2[]>;

@Injectable({ providedIn: 'root' })
export class Testtable2Service {
  public resourceUrl = SERVER_API_URL + 'api/testtable-2-s';

  constructor(protected http: HttpClient) {}

  create(testtable2: ITesttable2): Observable<EntityResponseType> {
    return this.http.post<ITesttable2>(this.resourceUrl, testtable2, { observe: 'response' });
  }

  update(testtable2: ITesttable2): Observable<EntityResponseType> {
    return this.http.put<ITesttable2>(this.resourceUrl, testtable2, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITesttable2>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITesttable2[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
