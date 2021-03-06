import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './component/app.component';
import { SudokuCard } from './component/sudoku-card.component';
import {CameraDialog} from './component/camera-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SudokuCard,
    CameraDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  entryComponents: [CameraDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
