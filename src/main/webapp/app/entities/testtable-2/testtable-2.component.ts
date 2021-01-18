import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITesttable2 } from 'app/shared/model/testtable-2.model';
import { Testtable2Service } from './testtable-2.service';
import { Testtable2DeleteDialogComponent } from './testtable-2-delete-dialog.component';

@Component({
  selector: 'cg-testtable-2',
  templateUrl: './testtable-2.component.html',
})
export class Testtable2Component implements OnInit, OnDestroy {
  testtable2s?: ITesttable2[];
  eventSubscriber?: Subscription;

  constructor(protected testtable2Service: Testtable2Service, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.testtable2Service.query().subscribe((res: HttpResponse<ITesttable2[]>) => (this.testtable2s = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTesttable2s();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITesttable2): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTesttable2s(): void {
    this.eventSubscriber = this.eventManager.subscribe('testtable2ListModification', () => this.loadAll());
  }

  delete(testtable2: ITesttable2): void {
    const modalRef = this.modalService.open(Testtable2DeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.testtable2 = testtable2;
  }
}
