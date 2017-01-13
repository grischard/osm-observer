import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { CustomFormsModule } from 'ng2-validation'

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CoverageListComponent } from './coverage-list/coverage-list.component';
import { CoveragesComponent } from './coverages/coverages.component';
import { CoverageService } from './services/coverage.service';

import { ChangesetListComponent } from './changeset-list/changeset-list.component';
import { ChangesetService } from './services/changeset.service';
import { ChangesetDetailsComponent } from './changeset-details/changeset-details.component';

import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewService } from './services/review.service';
import { ReviewFormComponent } from './review-form/review-form.component';


import { ReviewBotConfigListComponent } from './review-bot-config-list/review-bot-config-list.component';
import { ReviewBotConfigService } from './services/review-bot-config.service';
import { ReviewBotConfigFormComponent } from './review-bot-config-form/review-bot-config-form.component';

import { KeyValueListPipe } from './pipes/key-value-list.pipe';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, '/static/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CoverageListComponent,
    CoveragesComponent,
    DashboardComponent,
    ChangesetListComponent,
    ChangesetDetailsComponent,
    ReviewListComponent,
    ReviewFormComponent,
    ReviewBotConfigListComponent,
    ReviewBotConfigFormComponent,
    KeyValueListPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    RouterModule.forRoot([
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'coverages',
        component: CoveragesComponent
      },
      {
        path: 'changesets',
        children: [
          {
            path: '',
            component: ChangesetListComponent
          },
          {
            path: ':id/details',
            component: ChangesetDetailsComponent
          }
        ]
      },
      {
        path: 'reviewBotConfigs',
        children: [
          {
            path: '',
            component: ReviewBotConfigListComponent
          },
          {
            path: 'add',
            component: ReviewBotConfigFormComponent
          },
          {
            path: 'edit/:id',
            component: ReviewBotConfigFormComponent
          }
        ]
      }
    ])
  ],
  providers: [
    CoverageService,
    ChangesetService,
    ReviewService,
    ReviewBotConfigService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
