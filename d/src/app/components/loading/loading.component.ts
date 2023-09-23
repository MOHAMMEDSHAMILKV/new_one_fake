import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() isLoading: any=false;
  constructor() { }

  ngOnInit(): void {
  }

  loadData() {
    this.isLoading = true;
    // Simulate an asynchronous operation
    setTimeout(() => {
      // After the data is loaded or the operation is complete
      this.isLoading = false;
    }, 3000); 
  }

}
