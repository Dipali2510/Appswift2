import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITesttable1, Testtable1 } from 'app/shared/model/testtable-1.model';
import { Testtable1Service } from './testtable-1.service';
import { Testtable1Component } from './testtable-1.component';
import { Testtable1DetailComponent } from './testtable-1-detail.component';
import { Testtable1UpdateComponent } from './testtable-1-update.component';

@Injectable({ providedIn: 'root' })
export class Testtable1Resolve implements Resolve<ITesttable1> {
  constructor(private service: Testtable1Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITesttable1> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((testtable1: HttpResponse<Testtable1>) => {
          if (testtable1.body) {
            return of(testtable1.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Testtable1());
  }
}

export const testtable1Route: Routes = [
  {
    path: '',
    component: Testtable1Component,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Testtable1s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Testtable1DetailComponent,
    resolve: {
      testtable1: Testtable1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Testtable1s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Testtable1UpdateComponent,
    resolve: {
      testtable1: Testtable1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Testtable1s',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Testtable1UpdateComponent,
    resolve: {
      testtable1: Testtable1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Testtable1s',
    },
    canActivate: [UserRouteAccessService],
  },
];
