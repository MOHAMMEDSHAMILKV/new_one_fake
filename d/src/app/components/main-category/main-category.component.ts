import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit {
  mainCategory = [
    {
      title: "Life Style",
      detail: `As a Prime member, 
        you get access to exclusive`,
      icon: "../../../../assets/assets/lifestyle.svg"
    },
    {
      title: "Essentials",
      detail: `As a Prime member, 
        you get access to exclusive`,
      icon: "../../../../assets/assets/essential.svg"
    },
    {
      title: "Bulk",
      detail: `As a Prime member, 
        you get access to exclusive`,
      icon: "../../../../assets/assets/bulk.svg"
    },
    {
      title: "Around the world",
      detail: `As a Prime member, 
        you get access to exclusive`,
      icon: "../../../../assets/assets/aroundworld.svg"
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
