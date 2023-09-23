import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  @Input()group =""
  @Input() parent:any =[]
  @Input() directions="ltr"
  constructor() { }

  ngOnInit(): void {
  }

}
