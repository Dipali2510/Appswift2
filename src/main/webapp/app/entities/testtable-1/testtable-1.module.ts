import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestProject4SharedModule } from 'app/shared/shared.module';
import { Testtable1Component } from './testtable-1.component';
import { Testtable1DetailComponent } from './testtable-1-detail.component';
import { Testtable1UpdateComponent } from './testtable-1-update.component';
import { Testtable1DeleteDialogComponent } from './testtable-1-delete-dialog.component';
import { testtable1Route } from './testtable-1.route';

@NgModule({
  imports: [TestProject4SharedModule, RouterModule.forChild(testtable1Route)],
  declarations: [Testtable1Component, Testtable1DetailComponent, Testtable1UpdateComponent, Testtable1DeleteDialogComponent],
  entryComponents: [Testtable1DeleteDialogComponent],
})
export class TestProject4Testtable1Module {}
