import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITesttable2, Testtable2 } from 'app/shared/model/testtable-2.model';
import { Testtable2Service } from './testtable-2.service';
import { Testtable2Component } from './testtable-2.component';
import { Testtable2DetailComponent } from './testtable-2-detail.component';
import { Testtable2UpdateComponent } from './testtable-2-update.component';

@Injectable({ providedIn: 'root' })
export class Testtable2Resolve implements Resolve<ITesttable2> {
  constructor(private service: Testtable2Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITesttable2> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((testtable2: HttpResponse<Testtable2>) => {
          if (testtable2.body) {
            return of(testtable2.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Testtable2());
  }
}

export const testtable2Route: Routes = [
  {
    path: '',
    component: Testtable2Component,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Testtable2s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Testtable2DetailComponent,
    resolve: {
      testtable2: Testtable2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Testtable2s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Testtable2UpdateComponent,
    resolve: {
      testtable2: Testtable2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Testtable2s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Testtable2UpdateComponent,
    resolve: {
      testtable2: Testtable2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Testtable2s',
    },
    canActivate: [UserRouteAccessService],
  },
];
