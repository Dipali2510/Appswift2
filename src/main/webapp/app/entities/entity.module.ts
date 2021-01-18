import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'testtable-1',
        loadChildren: () => import('./testtable-1/testtable-1.module').then(m => m.TestProject4Testtable1Module),
      },
      {
        path: 'testtable-2',
        loadChildren: () => import('./testtable-2/testtable-2.module').then(m => m.TestProject4Testtable2Module),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class TestProject4EntityModule {}
