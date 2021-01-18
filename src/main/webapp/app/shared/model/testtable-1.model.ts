import { ITesttable2 } from 'app/shared/model/testtable-2.model';

export interface ITesttable1 {
  id?: number;
  Column1?: string;
  testtable1_Column1?: ITesttable2;
}

export class Testtable1 implements ITesttable1 {
  constructor(public id?: number, public Column1?: string, public testtable1_Column1?: ITesttable2) {}
}
