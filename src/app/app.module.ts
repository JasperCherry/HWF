import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { TableOptionsComponent } from './table/table-options/table-options.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableOptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
