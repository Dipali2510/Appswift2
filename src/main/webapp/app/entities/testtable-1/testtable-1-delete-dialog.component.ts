import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITesttable1 } from 'app/shared/model/testtable-1.model';
import { Testtable1Service } from './testtable-1.service';

@Component({
  templateUrl: './testtable-1-delete-dialog.component.html',
})
export class Testtable1DeleteDialogComponent {
  testtable1?: ITesttable1;

  constructor(
    protected testtable1Service: Testtable1Service,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.testtable1Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('testtable1ListModification');
      this.activeModal.close();
    });
  }
}
