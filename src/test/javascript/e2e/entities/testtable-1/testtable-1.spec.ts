import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { Testtable1ComponentsPage, Testtable1DeleteDialog, Testtable1UpdatePage } from './testtable-1.page-object';

const expect = chai.expect;

describe('Testtable1 e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let testtable1ComponentsPage: Testtable1ComponentsPage;
  let testtable1UpdatePage: Testtable1UpdatePage;
  let testtable1DeleteDialog: Testtable1DeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Testtable1s', async () => {
    await navBarPage.goToEntity('testtable-1');
    testtable1ComponentsPage = new Testtable1ComponentsPage();
    await browser.wait(ec.visibilityOf(testtable1ComponentsPage.title), 5000);
    expect(await testtable1ComponentsPage.getTitle()).to.eq('Testtable 1 S');
    await browser.wait(ec.or(ec.visibilityOf(testtable1ComponentsPage.entities), ec.visibilityOf(testtable1ComponentsPage.noResult)), 1000);
  });

  it('should load create Testtable1 page', async () => {
    await testtable1ComponentsPage.clickOnCreateButton();
    testtable1UpdatePage = new Testtable1UpdatePage();
    expect(await testtable1UpdatePage.getPageTitle()).to.eq('Create or edit a Testtable 1');
    await testtable1UpdatePage.cancel();
  });

  it('should create and save Testtable1s', async () => {
    const nbButtonsBeforeCreate = await testtable1ComponentsPage.countDeleteButtons();

    await testtable1ComponentsPage.clickOnCreateButton();

    await promise.all([testtable1UpdatePage.setColumn1Input('Column1')]);

    expect(await testtable1UpdatePage.getColumn1Input()).to.eq('Column1', 'Expected Column1 value to be equals to Column1');

    await testtable1UpdatePage.save();
    expect(await testtable1UpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await testtable1ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Testtable1', async () => {
    const nbButtonsBeforeDelete = await testtable1ComponentsPage.countDeleteButtons();
    await testtable1ComponentsPage.clickOnLastDeleteButton();

    testtable1DeleteDialog = new Testtable1DeleteDialog();
    expect(await testtable1DeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Testtable 1?');
    await testtable1DeleteDialog.clickOnConfirmButton();

    expect(await testtable1ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
