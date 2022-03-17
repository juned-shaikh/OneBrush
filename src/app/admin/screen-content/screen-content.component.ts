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
  displayedColumns: string[] = ['sno', 'screen','title', 'description', 'action','delete'];

  displayStyles: any = "none";
  displayStyle: any = "none";
  screenContentForm: FormGroup = new FormGroup({});
  screenData: any;
  screenContentData: any;
  name: any;
  screenId: any;
  discription: any;
  title: any;
  screenContentId: any;
  screenTypeId: any;
  screenName: any;
  constructor(public dialog: MatDialog, private toastr: ToastrService, private router: Router, private threeDService: ThreeDServiceService, public authService: AuthService, private fb: FormBuilder,) {
  
    this.screenContentForm = this.fb.group({
      discription: ['', Validators.required],
      id: ['0'],
      isDeleted:['false'],
      languageId:['1'],
      screenTypeEntity:['', Validators.required],
      title:['', Validators.required]
    })
   }

  ngOnInit(): void {
  this.getScreenContentData();
  this.getAddScreenData()
  }
/*--------for dropdown-----*/
  getAddScreenData() {
    this.threeDService.show();
    this.authService.getScreenDetail().subscribe(res => {
      if (res.responseCode == 200) {
        this.threeDService.hide();
        this.screenData = res.data;
        this.screenId = res.data.id;
        this.name= res.data.name;
        console.log( this.screenData, "res.data")
        this.threeDService.hide();

      } else {
        this.threeDService.hide();
        this.toastr.error(res.message);
      }
      console.log(res, ':sdsdsdsd');

    })
  }

/*---------GET------------*/
  getScreenContentData() {
    this.threeDService.show();
    this.authService.getScreenContentDetail().subscribe(res => {
      if (res.responseCode == 200) {
        this.threeDService.hide();
        this.screenContentData = res.data;
        console.log(this.screenContentData,'details========')
        this.screenContentId = res.data.id;
        this.discription= res.data.discription;
        this.title=res.data.title;
        this.screenName=res.data.screenTypeEntity.name;
        this.threeDService.hide();

      } else {
        this.threeDService.hide();
        this.toastr.error(res.message);
      }
    })
  }

/*-----------ADD---------*/
  addScreenContentData() {
    console.log(this.screenContentForm.value, "durgesh")
    this.authService.addScreenContentDetail(this.screenContentForm.value).subscribe(res => {
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
