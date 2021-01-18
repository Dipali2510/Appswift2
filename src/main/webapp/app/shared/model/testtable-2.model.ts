export interface ITesttable2 {
  id?: number;
  Column2?: string;
  testtable1_Column1?: ITesttable2;
}

export class Testtable2 implements ITesttable2 {
  constructor(public id?: number, public Column2?: string, public testtable1_Column1?: ITesttable2) {}
}
