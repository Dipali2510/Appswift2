import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITesttable1 } from 'app/shared/model/testtable-1.model';
import { Testtable1Service } from './testtable-1.service';
import { Testtable1DeleteDialogComponent } from './testtable-1-delete-dialog.component';

@Component({
  selector: 'cg-testtable-1',
  templateUrl: './testtable-1.component.html',
})
export class Testtable1Component implements OnInit, OnDestroy {
  testtable1s?: ITesttable1[];
  eventSubscriber?: Subscription;

  constructor(protected testtable1Service: Testtable1Service, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.testtable1Service.query().subscribe((res: HttpResponse<ITesttable1[]>) => (this.testtable1s = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTesttable1s();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITesttable1): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTesttable1s(): void {
    this.eventSubscriber = this.eventManager.subscribe('testtable1ListModification', () => this.loadAll());
  }

  delete(testtable1: ITesttable1): void {
    const modalRef = this.modalService.open(Testtable1DeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.testtable1 = testtable1;
  }
}
