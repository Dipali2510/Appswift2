import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestProject4TestModule } from '../../../test.module';
import { Testtable1DetailComponent } from 'app/entities/testtable-1/testtable-1-detail.component';
import { Testtable1 } from 'app/shared/model/testtable-1.model';

describe('Component Tests', () => {
  describe('Testtable1 Management Detail Component', () => {
    let comp: Testtable1DetailComponent;
    let fixture: ComponentFixture<Testtable1DetailComponent>;
    const route = ({ data: of({ testtable1: new Testtable1(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject4TestModule],
        declarations: [Testtable1DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(Testtable1DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Testtable1DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load testtable1 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.testtable1).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
