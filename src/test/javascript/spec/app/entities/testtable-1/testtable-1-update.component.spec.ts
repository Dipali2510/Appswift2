import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TestProject4TestModule } from '../../../test.module';
import { Testtable1UpdateComponent } from 'app/entities/testtable-1/testtable-1-update.component';
import { Testtable1Service } from 'app/entities/testtable-1/testtable-1.service';
import { Testtable1 } from 'app/shared/model/testtable-1.model';

describe('Component Tests', () => {
  describe('Testtable1 Management Update Component', () => {
    let comp: Testtable1UpdateComponent;
    let fixture: ComponentFixture<Testtable1UpdateComponent>;
    let service: Testtable1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject4TestModule],
        declarations: [Testtable1UpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(Testtable1UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Testtable1UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Testtable1Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Testtable1(123);
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
        const entity = new Testtable1();
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
