import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-to-us',
  templateUrl: './message-to-us.component.html',
  styleUrls: ['./message-to-us.component.scss']
})
export class MessageToUsComponent implements OnInit {
  customerServiceActive=false
  constructor() { }

  ngOnInit(): void {
  }

}
