import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.scss']
})
export class AddScreenComponent implements OnInit {
  displayStyles: any = "none";
  displayStyle: any = "none";
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  displayedColumns: string[] = ['sNo', 'screenname'];
  screenForm: FormGroup = new FormGroup({});

    constructor(public dialog: MatDialog, private toastr: ToastrService, private router: Router, private threeDService: ThreeDServiceService, public authService: AuthService, private fb: FormBuilder,) {

      this.screenForm = this.fb.group({
        screenName: ['', Validators.required],
       
      })
    }

  
    ngOnInit(): void {
      // getScreenData();
    }

    openPopup() {
      this.displayStyle= "block";
    }
  
    closePopup() {
      this.displayStyle = "none";
    }

    // getScreenData() {
    //   this.threeDService.show();
    //   this.authService.getWelcomeScreen().subscribe(res => {
    //     if (res.responseCode == 200) {
    //       this.threeDService.hide();
    //       this.WelcomeData = res.data;
    //       this.id = res.data.caroselId;
    //       console.log(res.data.caroselId, "res.data")
    //       this.threeDService.hide();
  
    //     } else {
    //       this.threeDService.hide();
    //       this.toastr.error(res.message);
    //     }
    //     console.log(res, ':sdsdsdsd');
  
    //   })
    // }
  
    // addScreenData() {
    //   // this.threeDService.show();
    //   console.log(this.screenForm.value, "durgesh")
    //   this.authService.addWelcomeScreen(this.screenForm.value).subscribe(res => {
    //     if (res.responseCode == 200) {
    //       this.threeDService.hide();
    //       this.toastr.success(res.message);
    //       this.closePopup();
    //     }
    //     else {
    //       this.threeDService.hide();
    //       this.toastr.error(res.message)
    //     }
    //   }, error => {
    //     this.threeDService.hide();
    //     this.toastr.error('Technical Issue.')
    //     console.log(error);
    //   })
    // }
  

  }
    
  
   
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    
   
  
