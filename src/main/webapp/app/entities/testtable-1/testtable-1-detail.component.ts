import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITesttable1 } from 'app/shared/model/testtable-1.model';

@Component({
  selector: 'cg-testtable-1-detail',
  templateUrl: './testtable-1-detail.component.html',
})
export class Testtable1DetailComponent implements OnInit {
  testtable1: ITesttable1 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testtable1 }) => (this.testtable1 = testtable1));
  }

  previousState(): void {
    window.history.back();
  }
}
