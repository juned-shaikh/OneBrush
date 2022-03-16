import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
  addscreenForm: FormGroup = new FormGroup({});
  screenData: any;
  name: any;
  screenId: any;
  constructor(public dialog: MatDialog, private toastr: ToastrService, private router: Router, private threeDService: ThreeDServiceService, public authService: AuthService, private fb: FormBuilder,) {
  
   }

  ngOnInit(): void {
  this.getScreenContentData();
  }

  getScreenContentData() {
    this.threeDService.show();
    this.authService.getScreenContentDetail().subscribe(res => {
      if (res.responseCode == 200) {
        this.threeDService.hide();
        this.screenData = res.data;
        console.log(this.screenData,'array print')
        this.screenId = res.data.id;
        this.name= res.data.name;
        this.threeDService.hide();

      } else {
        this.threeDService.hide();
        this.toastr.error(res.message);
      }
    })
  }


  addScreenData() {
    console.log(this.addscreenForm.value, "durgesh")
    this.authService.addScreeDetail(this.addscreenForm.value).subscribe(res => {
      if (res.responseCode == 200) {
        this.threeDService.hide();
        this.toastr.success(res.message);
        this.closePopup();
        this.getScreenContentData();
      }
      else {
        this.threeDService.hide();
        this.toastr.error(res.message)
      }
    }, error => {
      this.threeDService.hide();
      this.toastr.error('Technical Issue.')
      console.log(error);
    })
  }




  screenNameChange(e:any){
      this.name=e;
  }

  openPopup() {
    this.displayStyle= "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
}
