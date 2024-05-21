import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DraftsComponent } from './drafts/drafts.component';
import { NewComponent } from './new/new.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    InboxComponent,
    SentComponent,
    ContactsComponent,
    DraftsComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmailModule { }
