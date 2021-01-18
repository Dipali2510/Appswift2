import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITesttable2 } from 'app/shared/model/testtable-2.model';

@Component({
  selector: 'cg-testtable-2-detail',
  templateUrl: './testtable-2-detail.component.html',
})
export class Testtable2DetailComponent implements OnInit {
  testtable2: ITesttable2 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testtable2 }) => (this.testtable2 = testtable2));
  }

  previousState(): void {
    window.history.back();
  }
}
