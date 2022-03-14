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
  selector: 'app-screen-content',
  templateUrl: './screen-content.component.html',
  styleUrls: ['./screen-content.component.scss']
})
export class ScreenContentComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  displayedColumns: string[] = ['sNo', 'screen', 'content', 'action','delete'];

  displayStyles: any = "none";
  displayStyle: any = "none";
  constructor() { }

  ngOnInit(): void {
  }



  openPopup() {
    this.displayStyle= "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
}
