import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DraftsComponent } from './drafts/drafts.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inbox',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'inbox', component: InboxComponent },
      { path: 'sent', component: SentComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'drafts', component: DraftsComponent },
      { path: 'new', component: NewComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailRoutingModule {}
