import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items = [
    {
      title: 'Can I upgrade my plan later?',
      content:
        'Yes, you can upgrade your plan later. Please contact our support team for more details',
    },
    {
      title: 'Can I use my own domain with your email service?',
      content:
        'Yes, you can use your own domain with your email service. Please contact our support team for more details',
    },
    {
      title:
        'Are there any discounts for non-profits or educational institutions?',
      content:
        'Yes, we offer special pricing for non-profits and educational institutions. Please contact our support team for more details',
    },
    {
      title: 'How do you protect my email data?',
      content:
        'We protect your email data via encription. Please contact our support team for more details',
    },
    {
      title: 'What happens if I decide to cancel my subscription?',
      content:
        "You'll get all your money back for the rest of your subscription days. Please contact our support team for more details",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
