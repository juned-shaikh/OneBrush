import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInAnimation } from './../../service/route.animation';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { Router } from '@angular/router';

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
  displayedColumns: string[] = ['sNo', 'firstname', 'lastname', 'email', 'gender', 'age', 'language', 'creationDate', 'updationDate', 'status', 'action'];
  userData: any = [];
  dataSource = new MatTableDataSource(this.userData);

  noOfRecors = 0;
  selection: any = 0;
  constructor(private toastr: ToastrService, private router: Router, private threeDService: ThreeDServiceService, public authService: AuthService) {
  }

  ngOnInit(): void {
    // debugger
    this.selection = { "page": 0, "size": 10, search: '' };
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
  getAllUsers() {
    this.userData = [];
    this.threeDService.show();
    this.authService.getAllUsers(this.selection).subscribe(res => {
      this.threeDService.hide();
      if (res.response == 200) {
        this.userData = res.data;
        this.noOfRecors = res.totalUser;
      } else {
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
    localStorage.setItem("userId", userId)
    sessionStorage.setItem("selection", JSON.stringify(this.selection));
    this.router.navigate(['admin/user-profile']);
  }
}
