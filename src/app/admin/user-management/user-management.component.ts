import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInAnimation } from './../../service/route.animation';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})

export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  displayedColumns: string[] = ['sNo', 'firstname', 'lastname', 'email', 'gender', 'age', 'language', 'creationDate', 'updationDate','Block/Unblock User','status', 'action'];
  userData:any= [];
  
  dataSource = new MatTableDataSource(this.userData);

  noOfRecors = 0;
  selection: any = 0;
  age: any;
  constructor(private toastr: ToastrService, private router: Router, private threeDService: ThreeDServiceService,
     public authService: AuthService,public encrptDecryptService:EncryptDecryptService

     
     ) {
  }

  ngOnInit(): void {
    // debugger

    // this.calculateAge("2020-03-09")  
    //convert date again to type Date
    console.log("dataSource",this.dataSource);
    
    this.selection = { "pageIndex": 0, "pageSize": 10, search: '' };
    let selection: any = sessionStorage.getItem("selection");
    selection = JSON.parse(selection);
    if (selection) {
      this.selection.page = selection.page;
      this.selection.size = selection.size;
      this.selection.search = selection.search;
      this.paginator.pageIndex = selection.page;
      this.paginator.pageSize = selection.size;
      sessionStorage.removeItem("selection");
    }
    this.getAllUsers();
  }

  calculateAge(date:any){
    const bdate = new Date(date);
    const timeDiff = Math.abs(Date.now() - bdate.getTime() );
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    return this.age;
    console.log("age",this.age);
  }


  getAllUsers() {
    // this.userData=[];
    this.threeDService.show();
    this.authService.getAllUsers(this.selection).subscribe(res => {
      console.log("get all users res", res)
      if (res.responseCode == 200) {
        this.threeDService.hide();
         const result = JSON.parse(this.encrptDecryptService.decrptData(this.encrptDecryptService.secretKey[res.authId],res.data))
         console.log("result",result)
         this.userData=[result]        
         console.log("result type",typeof(this.userData))
         console.log("result",this.userData )
         this.noOfRecors = res.totalUser
      } else {
        this.threeDService.hide();
        this.toastr.error(res.message);
      }
    }, error => {
      this.threeDService.hide();
      this.toastr.error('Technical Issue.')
      console.log(error);
    })
  }

  getPaginatorData($event: any) {
    this.selection.size = $event.pageSize;
    this.selection.page = $event.pageIndex;
    console.log("selection size",this.selection.size);
    console.log("selection page",this.selection.page);
    
    sessionStorage.setItem("selection", JSON.stringify(this.selection));
    this.getAllUsers();
  }

  updateFilter() {
    this.selection.page = 0;
    this.paginator.firstPage();
    this.getAllUsers();
  }

  changeStatus(id: any, event: any) {
    this.authService.updateUserStatus(id, event.checked).subscribe(res => {
      if (res.response == 200) {
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    }, error => {
      this.threeDService.hide();
      this.toastr.error('Technical Issue.')
      console.log(error);
    })
  }

  viewProfile(userId: any) {
    this.router.navigate(['/admin/user-detail'], { queryParams: { id: userId } })
  }

  blockUnblockUser(id:any, event:any){

    let data = { "authId" : 0 ,
                 "data" : this.encrptDecryptService.encryptData(this.encrptDecryptService.secretKey[0],id)
              }
              console.log("data",data);
              
    this.authService.blockUnblockUser(data).subscribe(res => {
      console.log("block res",res);
      if (res.response == 200) {
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    }, error => {
      this.threeDService.hide();
      this.toastr.error('Technical Issue.')
      console.log(error);
    })
  }

deleteUser(id:any){
  console.log("IDDDDD...",id);
  
  let uuId={
      "uuId" : id
  }  

  let data = {
        "authId" : 0,
        "data" : this.encrptDecryptService.encryptData(this.encrptDecryptService.secretKey[0],uuId) 
      }

    console.log("data",data);

    this.authService.deleteUserByAdmin(data).subscribe(res=>{
      console.log("res",res);
      this.getAllUsers();

    },err => {
        this.threeDService.hide();
        this.toastr.error('Technical Issue.')
    } )

  }

}
