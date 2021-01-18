import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITesttable1, Testtable1 } from 'app/shared/model/testtable-1.model';
import { Testtable1Service } from './testtable-1.service';

@Component({
  selector: 'cg-testtable-1-update',
  templateUrl: './testtable-1-update.component.html',
})
export class Testtable1UpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    Column1: [],
  });

  constructor(protected testtable1Service: Testtable1Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testtable1 }) => {
      this.updateForm(testtable1);
    });
  }

  updateForm(testtable1: ITesttable1): void {
    this.editForm.patchValue({
      id: testtable1.id,
      Column1: testtable1.Column1,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const testtable1 = this.createFromForm();
    if (testtable1.id !== undefined) {
      this.subscribeToSaveResponse(this.testtable1Service.update(testtable1));
    } else {
      this.subscribeToSaveResponse(this.testtable1Service.create(testtable1));
    }
  }

  private createFromForm(): ITesttable1 {
    return {
      ...new Testtable1(),
      id: this.editForm.get(['id'])!.value,
      Column1: this.editForm.get(['Column1'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITesttable1>>): void {
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
