import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-branch-slider',
  templateUrl: './branch-slider.component.html',
  styleUrls: ['./branch-slider.component.scss']
})
export class BranchSliderComponent implements OnInit {
  @Input()productImg="../../../assets/assets/fruit-1.png"
  @Input()productName="Fruits"
  @Input()feature="Farm fresh"
  @Input()typeCount=33
  constructor() { }

  ngOnInit(): void {
  }

}
