import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITesttable2, Testtable2 } from 'app/shared/model/testtable-2.model';
import { Testtable2Service } from './testtable-2.service';

@Component({
  selector: 'cg-testtable-2-update',
  templateUrl: './testtable-2-update.component.html',
})
export class Testtable2UpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    Column2: [],
  });

  constructor(protected testtable2Service: Testtable2Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testtable2 }) => {
      this.updateForm(testtable2);
    });
  }

  updateForm(testtable2: ITesttable2): void {
    this.editForm.patchValue({
      id: testtable2.id,
      Column2: testtable2.Column2,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const testtable2 = this.createFromForm();
    if (testtable2.id !== undefined) {
      this.subscribeToSaveResponse(this.testtable2Service.update(testtable2));
    } else {
      this.subscribeToSaveResponse(this.testtable2Service.create(testtable2));
    }
  }

  private createFromForm(): ITesttable2 {
    return {
      ...new Testtable2(),
      id: this.editForm.get(['id'])!.value,
      Column2: this.editForm.get(['Column2'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITesttable2>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
