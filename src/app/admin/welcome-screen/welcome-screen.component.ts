import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {

  @ViewChild('inputFile', { static: true }) docFile: any;
  welcomeForm: FormGroup = new FormGroup({});
  updateWelcomeForm: FormGroup = new FormGroup({});

  id: number = 0;
  displayStyle: any = "none";
  unSelectedFile: any;
  descLength: number = 0;
  docUrl: any;
  isDoc: boolean = true;
  WelcomeData: any;
  displayStyles: any = "none";

  dynamicSlides = [
    { id: 1, src: "assets/images/Mask-Group.png", alt: 'Side 1' },
    { id: 2, src: "assets/images/Frame8655.png", alt: 'Side 2' },
    { id: 3, src: "assets/images/Mockup@1x.png", alt: 'Side 3' },
    { id: 4, src: "assets/images/Mask-Group.png", alt: 'Side 4' },
    { id: 4, src: "assets/images/Mockup@1x.png", alt: 'Side 5' },
  ];
  imgUrl: any;


  constructor(public dialog: MatDialog, private toastr: ToastrService, private router: Router, private threeDService: ThreeDServiceService, public authService: AuthService, private fb: FormBuilder,) {

    this.welcomeForm = this.fb.group({
      title: ['', Validators.required],
      descriptions: ['', Validators.required],
      docfile: ['', Validators.required],
      
    })
    // this.updateWelcomeForm = this.fb.group({
    //   title: ['', Validators.required],
    //   descriptions: ['', Validators.required],
    //   docfile: ['', Validators.required],
    //   caroselId: ['']
    // })
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplaySpeed: 800,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    // navSpeed: 600,
    // navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.getWelcomeData()
    console.log(sessionStorage.getItem("Token"),"=========");
    
  }

  get f() { return this.welcomeForm.controls; }


  getWelcomeData() {
    this.threeDService.show();
    this.authService.getWelcomeScreen().subscribe(res => {
      if (res.responseCode == 200) {
        this.threeDService.hide();
        this.WelcomeData = res.data;
        this.id = res.data.caroselId;
        this.docfile = res.data.imgUrl;

        console.log(this.WelcomeData, "=======================+++++++++====================")
        this.threeDService.hide();
        console.log(res.data.caroselId, "res.data")
      } else {
        this.threeDService.hide();
        this.toastr.error(res.message);
      }
      console.log(res, ':sdsdsdsd');
    })
  }

  addWelcomeData() {
    // this.threeDService.show();
    console.log(this.welcomeForm.value, "durgesh")
    this.authService.addWelcomeScreen(this.welcomeForm.value).subscribe(res => {
      if (res.responseCode == 200) {
        this.threeDService.hide();
        this.toastr.success(res.message);
        this.closePopup();
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

  updateWelcomeData() {
    console.log(this.caroselID,"==============this.id================");
    this.authService.updateWelcomeScreen(this.welcomeForm.value,this.caroselID).subscribe(res => {
      
      if (res.responseCode == 200) {
        this.threeDService.hide();
        this.toastr.success(res.message);
        this.updateclosePopup();
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


  deleteWelcomeData(caroselId:any) {
    this.threeDService.show();
    this.authService.deleteWelcomeScreen(caroselId).subscribe(res => {
      if (res.responseCode == 200) {
        this.threeDService.hide();
        this.toastr.success(res.message);
      }
    })
  }


  onSelectDoc(e: any) {
    var file = e.target.files[0]
    if (file.size > 5242880) {
      this.docFile.nativeElement.files = this.unSelectedFile;
    } else {
      this.docUrl = ''
      this.welcomeForm.patchValue({
        docfile: file
      });
      this.isDoc = true;

    }
    console.log(this.welcomeForm.value, 'sdasdada');

  }

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

caroselID:any;
title:any;
descriptions:any;
docfile:any;
  updateopenPopup(id:any,title:any,descriptions:any,imgUrl:any) {
    this.welcomeForm.patchValue({
      title :title,
      descriptions:descriptions,
      imgUrl:imgUrl
      // docfile:imgUrl 
      
    })
    this.imgUrl = imgUrl
  console.log(id,imgUrl,"checking for project");
  
    this.caroselID = id;
    this.displayStyles = "block";
  }

  updateclosePopup() {
    this.displayStyles = "none";
  }


}
