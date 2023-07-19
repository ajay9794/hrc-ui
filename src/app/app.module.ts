import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XlsFilterComponentComponent } from './component/xls-filter-component/xls-filter-component.component';
import { PrimengImportModule } from './primeng-import/primeng-import.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerComponent } from './component/progress-spiner/progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    XlsFilterComponentComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengImportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
