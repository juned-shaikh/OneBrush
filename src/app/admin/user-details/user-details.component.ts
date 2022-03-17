import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})


export class UserDetailsComponent implements OnInit {
  userDetail: any;
  age: any;
  userDetailForm!: FormGroup;
  submitted = false;
  viewForm = true;
  maxDate!: Date;
  today: any;

  constructor(private toastr: ToastrService,
    private router: Router,
    private threeDService: ThreeDServiceService,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public encrptDecryptService: EncryptDecryptService,
    private formBuilder: FormBuilder
  ) {

    this.maxDate = new Date();

  }

  ngOnInit(): void {
    let userId = localStorage.getItem("userId")
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      console.log("Id:", id);
      if (id) {
        this.getUserDetails(id)
      }

    });

    // this.userDetailForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    // });

    this.setMaxDateToday();
  }

  get f() { return this.userDetailForm && this.userDetailForm.controls; }




  getUserDetails(userId: any) {
    this.threeDService.show();
    this.userDetail = [];
    this.authService.getUserDetail(userId).subscribe(res => {
      this.threeDService.hide();
      console.log("ress", res);
      if (res.responseCode == 200) {
        //this.userDetail = res.data;
        const result = JSON.parse(this.encrptDecryptService.decrptData(this.encrptDecryptService.secretKey[res.authId], res.data));
        this.userDetail = [result][0]
        console.log("userDetail", this.userDetail);

        if (this.userDetail) {
          this.userDetailForm = this.formBuilder.group({
            name: [this.userDetail.name, Validators.required],
            surname: [this.userDetail.surname, Validators.required],
            emailAddress: [this.userDetail.emailAddress, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            age: [this.calculateAge(this.userDetail.dateOfBirth), Validators.required],
            dateOfBirth: [this.userDetail.dateOfBirth, Validators.required],
            gender: [this.userDetail.gender, Validators.required],
            preferredLanguage: [this.userDetail.preferredLanguage, Validators.required],
            allowFirmWareUpdate: [this.userDetail.allowFirmWareUpdate],
            streetAndHousenumber: [this.userDetail.streetAndHousenumber, Validators.required],
            zipcode: [this.userDetail.zipcode, Validators.required],
            city: [this.userDetail.city, Validators.required],
            country: [this.userDetail.country, Validators.required],
            telefon: [this.userDetail.telefon, Validators.required]
          });

        }




      } else {
        this.toastr.error(res.message);
        // this.router.navigate(['admin/user-management']);
      }
    }, error => {
      this.threeDService.hide();
      this.toastr.error('Technical Issue.')
      console.log(error);
      this.router.navigate(['admin/user-management']);
    })
  }


  calculateAge(date: any) {
    const bdate = new Date(date);
    const timeDiff = Math.abs(Date.now() - bdate.getTime());
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    return this.age;
    console.log("age", this.age);
  }

  onSubmit() {
    this.submitted = true;

    let userUpdateObj = {
      "uuId": this.userDetail.uuId,
      "userType": "T/D",
      "brushName": "string",
      "lastSync": this.userDetail.lastSync,
      "salutation": "string",
      "name": this.userDetailForm.value.name,
      "surname": this.userDetailForm.value.surname,
      "emailAddress": this.userDetailForm.value.emailAddress,
      "preferredLanguage": this.userDetailForm.value.preferredLanguage,
      "gender": this.userDetailForm.value.gender,
      "dateOfBirth": this.userDetailForm.value.dateOfBirth,
      "streetAndHousenumber": this.userDetailForm.value.streetAndHousenumber,
      "zipcode": this.userDetailForm.value.zipcode,
      "city": this.userDetailForm.value.city,
      "country": this.userDetailForm.value.country,
      "telefon": this.userDetailForm.value.telefon,
      "allowPushCom": this.userDetailForm.value.dateOfBirth
    }


    let encryptData = this.encrptDecryptService.encryptData(this.encrptDecryptService.secretKey[0], userUpdateObj)
    console.log("encrypted user info", encryptData);

    let data = {
      "authId": 0,
      "data": encryptData
    }

    if (this.userDetailForm.invalid) {
      return false;
    }

    this.authService.updateUserInfo(data).subscribe(res => {
      console.log("update user res", res);


      if (res.responseCode == 200) {
        this.toastr.success(res.message);
        this.threeDService.hide();
        this.viewForm = true;

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


  editForm() {
    this.viewForm = false;
  }

  changeLanguage(e: any) {

  }

  setMaxDateToday() {
    this.today = new Date();
    var dd: any = this.today.getDate();
    var mm: any = this.today.getMonth() + 1; //January is 0!
    var yyyy: any = this.today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    this.today = yyyy + '-' + mm + '-' + dd;
    // var x= document.getElementById("datefield").setAttribute("max", today);
  }

}
