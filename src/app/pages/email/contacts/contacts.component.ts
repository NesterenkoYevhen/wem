import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  users: User[];

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.emailService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
}
