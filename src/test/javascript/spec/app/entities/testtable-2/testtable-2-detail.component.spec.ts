import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestProject4TestModule } from '../../../test.module';
import { Testtable2DetailComponent } from 'app/entities/testtable-2/testtable-2-detail.component';
import { Testtable2 } from 'app/shared/model/testtable-2.model';

describe('Component Tests', () => {
  describe('Testtable2 Management Detail Component', () => {
    let comp: Testtable2DetailComponent;
    let fixture: ComponentFixture<Testtable2DetailComponent>;
    const route = ({ data: of({ testtable2: new Testtable2(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestProject4TestModule],
        declarations: [Testtable2DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(Testtable2DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Testtable2DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load testtable2 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.testtable2).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
