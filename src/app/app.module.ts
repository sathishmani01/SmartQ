import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FlimDetailsComponent } from './flim-details/flim-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlimServiceService } from './service/flim-service.service';
import { FlimTitlesPipe } from './flim-titles.pipe';
import { FlimTitlePipe } from './flim-title.pipe'

@NgModule({
  declarations: [
    AppComponent,
    FlimDetailsComponent,
    NavBarComponent,
    FlimTitlesPipe,
    FlimTitlePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [FlimServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
