import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestProject4TestModule } from '../../../test.module';
import { Testtable2Component } from 'app/entities/testtable-2/testtable-2.component';
import { Testtable2Service } from 'app/entities/testtable-2/testtable-2.service';
import { Testtable2 } from 'app/shared/model/testtable-2.model';

describe('Component Tests', () => {
  describe('Testtable2 Management Component', () => {
    let comp: Testtable2Component;
    let fixture: ComponentFixture<Testtable2Component>;
    let service: Testtable2Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject4TestModule],
        declarations: [Testtable2Component],
      })
        .overrideTemplate(Testtable2Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(Testtable2Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Testtable2Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Testtable2(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.testtable2s && comp.testtable2s[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
