import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TestProject4TestModule } from '../../../test.module';
import { Testtable2UpdateComponent } from 'app/entities/testtable-2/testtable-2-update.component';
import { Testtable2Service } from 'app/entities/testtable-2/testtable-2.service';
import { Testtable2 } from 'app/shared/model/testtable-2.model';

describe('Component Tests', () => {
  describe('Testtable2 Management Update Component', () => {
    let comp: Testtable2UpdateComponent;
    let fixture: ComponentFixture<Testtable2UpdateComponent>;
    let service: Testtable2Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject4TestModule],
        declarations: [Testtable2UpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(Testtable2UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Testtable2UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Testtable2Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Testtable2(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Testtable2();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
