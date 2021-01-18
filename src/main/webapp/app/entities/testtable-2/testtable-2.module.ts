import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestProject4SharedModule } from 'app/shared/shared.module';
import { Testtable2Component } from './testtable-2.component';
import { Testtable2DetailComponent } from './testtable-2-detail.component';
import { Testtable2UpdateComponent } from './testtable-2-update.component';
import { Testtable2DeleteDialogComponent } from './testtable-2-delete-dialog.component';
import { testtable2Route } from './testtable-2.route';

@NgModule({
  imports: [TestProject4SharedModule, RouterModule.forChild(testtable2Route)],
  declarations: [Testtable2Component, Testtable2DetailComponent, Testtable2UpdateComponent, Testtable2DeleteDialogComponent],
  entryComponents: [Testtable2DeleteDialogComponent],
})
export class TestProject4Testtable2Module {}
