import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITesttable2 } from 'app/shared/model/testtable-2.model';
import { Testtable2Service } from './testtable-2.service';

@Component({
  templateUrl: './testtable-2-delete-dialog.component.html',
})
export class Testtable2DeleteDialogComponent {
  testtable2?: ITesttable2;

  constructor(
    protected testtable2Service: Testtable2Service,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.testtable2Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('testtable2ListModification');
      this.activeModal.close();
    });
  }
}
