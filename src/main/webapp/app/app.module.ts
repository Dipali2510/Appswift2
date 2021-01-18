import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { TestProject4SharedModule } from 'app/shared/shared.module';
import { TestProject4CoreModule } from 'app/core/core.module';
import { TestProject4AppRoutingModule } from './app-routing.module';
import { TestProject4HomeModule } from './home/home.module';
import { TestProject4EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    TestProject4SharedModule,
    TestProject4CoreModule,
    TestProject4HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    TestProject4EntityModule,
    TestProject4AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class TestProject4AppModule {}
