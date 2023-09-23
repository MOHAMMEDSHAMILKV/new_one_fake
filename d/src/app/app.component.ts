import { Component, ElementRef, ViewChild } from '@angular/core';
import { Meta,Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("mainContent")
  private mainContentDiv!: ElementRef<HTMLElement>;
  productName ="";
  // title = environment.title;
  // metaDescription = environment.discriptiion
  // metaAutor = environment.author
  // metaKeyword = environment.keyword
  isChat = false
  constructor(private meat: Meta,private titleService: Title,private router:Router,
    private primengConfig: PrimeNGConfig){
    // this.setDocTitle(this.title)
    // this.setMeta(this.metaDescription,this.metaAutor,this.metaKeyword)
  }
  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }
  setMeta(discription:any,author:any,keywords:any){
    this.meat.addTags([
      {name:'description', content: discription},
      {name:'author', content:author},
      {name:'keywords', content:keywords}
    ])
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
  }  

  onActivate(_event: any): void {
    if (this.mainContentDiv) {
      (this.mainContentDiv.nativeElement as HTMLElement).scrollTop = 0;
    }
  }
}
