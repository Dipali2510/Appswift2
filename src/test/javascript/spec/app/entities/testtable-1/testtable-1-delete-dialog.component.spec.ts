import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestProject4TestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { Testtable1DeleteDialogComponent } from 'app/entities/testtable-1/testtable-1-delete-dialog.component';
import { Testtable1Service } from 'app/entities/testtable-1/testtable-1.service';

describe('Component Tests', () => {
  describe('Testtable1 Management Delete Component', () => {
    let comp: Testtable1DeleteDialogComponent;
    let fixture: ComponentFixture<Testtable1DeleteDialogComponent>;
    let service: Testtable1Service;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject4TestModule],
        declarations: [Testtable1DeleteDialogComponent],
      })
        .overrideTemplate(Testtable1DeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Testtable1DeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Testtable1Service);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
