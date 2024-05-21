import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Observable } from 'rxjs';

interface NotificationCommand {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {

  messages: Observable<NotificationCommand[]>;

  constructor(private notificationsService: NotificationsService) {
    this.messages = this.notificationsService.messagesOutput;
  }

  ngOnInit(): void {}

  clearMessage(id: number) {
    this.notificationsService.clearMessage(id);
  }

}
