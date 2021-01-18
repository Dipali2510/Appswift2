import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestProject4TestModule } from '../../../test.module';
import { Testtable1Component } from 'app/entities/testtable-1/testtable-1.component';
import { Testtable1Service } from 'app/entities/testtable-1/testtable-1.service';
import { Testtable1 } from 'app/shared/model/testtable-1.model';

describe('Component Tests', () => {
  describe('Testtable1 Management Component', () => {
    let comp: Testtable1Component;
    let fixture: ComponentFixture<Testtable1Component>;
    let service: Testtable1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject4TestModule],
        declarations: [Testtable1Component],
      })
        .overrideTemplate(Testtable1Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(Testtable1Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Testtable1Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Testtable1(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.testtable1s && comp.testtable1s[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
