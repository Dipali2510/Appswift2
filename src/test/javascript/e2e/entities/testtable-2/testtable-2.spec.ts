import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { Testtable2ComponentsPage, Testtable2DeleteDialog, Testtable2UpdatePage } from './testtable-2.page-object';

const expect = chai.expect;

describe('Testtable2 e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let testtable2ComponentsPage: Testtable2ComponentsPage;
  let testtable2UpdatePage: Testtable2UpdatePage;
  let testtable2DeleteDialog: Testtable2DeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Testtable2s', async () => {
    await navBarPage.goToEntity('testtable-2');
    testtable2ComponentsPage = new Testtable2ComponentsPage();
    await browser.wait(ec.visibilityOf(testtable2ComponentsPage.title), 5000);
    expect(await testtable2ComponentsPage.getTitle()).to.eq('Testtable 2 S');
    await browser.wait(ec.or(ec.visibilityOf(testtable2ComponentsPage.entities), ec.visibilityOf(testtable2ComponentsPage.noResult)), 1000);
  });

  it('should load create Testtable2 page', async () => {
    await testtable2ComponentsPage.clickOnCreateButton();
    testtable2UpdatePage = new Testtable2UpdatePage();
    expect(await testtable2UpdatePage.getPageTitle()).to.eq('Create or edit a Testtable 2');
    await testtable2UpdatePage.cancel();
  });

  it('should create and save Testtable2s', async () => {
    const nbButtonsBeforeCreate = await testtable2ComponentsPage.countDeleteButtons();

    await testtable2ComponentsPage.clickOnCreateButton();

    await promise.all([testtable2UpdatePage.setColumn2Input('Column2')]);

    expect(await testtable2UpdatePage.getColumn2Input()).to.eq('Column2', 'Expected Column2 value to be equals to Column2');

    await testtable2UpdatePage.save();
    expect(await testtable2UpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await testtable2ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Testtable2', async () => {
    const nbButtonsBeforeDelete = await testtable2ComponentsPage.countDeleteButtons();
    await testtable2ComponentsPage.clickOnLastDeleteButton();

    testtable2DeleteDialog = new Testtable2DeleteDialog();
    expect(await testtable2DeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Testtable 2?');
    await testtable2DeleteDialog.clickOnConfirmButton();

    expect(await testtable2ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
