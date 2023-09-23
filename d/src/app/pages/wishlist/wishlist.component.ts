import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import UIkit from 'uikit';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  is_My_wishlist=true
  wishListDetail_active:any
  wishlistArray:any=[]
  wishlistGroupName:any
  groupListArray:any=[]
  defult:any
  moveToanother:any
  ismove_active=false
  groupName:any='default'
  groupId:any
  is_create_group_list=false
  is_selectIndex:any
  sortActive=false
  detailOfpermission:any
  isLoading=false
  btn_loading=false
  constructor(private wish:WishlistService,
              private msg:MessengerService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((d:any)=>{
    })
      this.isLoading=true
      this.wish.getWishListData().subscribe((d:any)=>{
        this.wishlistArray=d.data.results
        this.defult='default'
        this.isLoading=false
      })
      this.wish.getWishListGroup().subscribe((d:any)=>{
        this.groupListArray=d.data.results
        this.groupId=d.data.results[0]?.id
        this.isLoading=false
      }) 
      this.msg.getRefreshData().subscribe((d:any)=>{
        this.wish.getWishListGroup().subscribe((d:any)=>{
          this.groupListArray=d.data.results
        })
      })
  }

  deatil(i:any,id:any,item:any){
    this.groupId=item.id
    this.wishListDetail_active=i
    this.groupName=id
    this.groupId=item.id
    this.defult=""
    this.wish.getWishlistGroupData(id).subscribe((d:any)=>{
      this.wishlistArray=d.data.results
    })
    this.detailOfpermission={
      group_id:item.id,
      access_level:"access-edit"
    }

  }

  createGroup(){
    let groupname={
      group_name:this.wishlistGroupName
    }
    this.wish.createWishlistGroup(groupname)
    this.is_create_group_list=false
    this.msg.getStatus().subscribe((d:any)=>{
      if(d=='success'){
          UIkit.modal('#cardadding').hide();
          this.btn_loading=true  
      }else{
          this.btn_loading=false  
      } 
    })
  }

  movetoAnother(item:any,id:any,i:any){
    this.ismove_active=true
    let wish={
      variant_id:item.variant_id,
      group_id:id,
      varient_code:item.variant_code,
      inventory_code:item.inventory_code
    }
    this.is_selectIndex=i
    this.wish.createWishlist(wish)
    this.msg.getRefreshData().subscribe((d:any)=>{
      this.wish.getWishlistGroupData(this.groupName).subscribe((d:any)=>{
        this.wishlistArray=d.data.results
      })
    })
  }

  deleteWishlist(id:any,groupId: any){    
    this.wish.deleteWishlist(id,groupId)
    this.msg.getRefreshData().subscribe((d:any)=>{
      this.wish.getWishlistGroupData(this.groupName).subscribe((d:any)=>{
        this.wishlistArray=d.data.results
      })
    })
  }

  deleteGroup(id:any){
    this.wish.deleteWishlistGroup(id)
  }

  openModal(){
    this.is_create_group_list=true
  }

  sortClick(){
      this.sortActive=true
  }

  permissionClick(){
    this.wish.sharedWishListProPermission(this.detailOfpermission)
  }

  

}
