import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillConfigModule } from 'ngx-quill/config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryLayoutModule } from './layouts/primary-layout/primary-layout.module';
import { LandingModule } from './landing/landing.module';
import { LandingLayoutModule } from './layouts/landing-layout/landing-layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillConfigModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['clean'],
          ['link'],
          [{ align: [] }],
          [{ direction: 'rtl' }],
        ],
      },
    }),
    PrimaryLayoutModule,
    LandingLayoutModule,
    LandingModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
