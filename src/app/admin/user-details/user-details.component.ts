import { Component, OnInit } from '@angular/core';
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

  constructor(private toastr: ToastrService,
    private router: Router,
    private threeDService: ThreeDServiceService,
    public authService: AuthService,
    public activatedRoute:ActivatedRoute,
    public encrptDecryptService:EncryptDecryptService
    ) { }

  ngOnInit(): void {
    let userId = localStorage.getItem("userId")

    this.activatedRoute.paramMap.subscribe(params => { 
      let id = params.get('id'); 
       console.log("Id:",id);

       if(id){
        this.getUserDetails(id)
       }
       

  });

    // this.activatedRoute.queryParamMap
    // .subscribe(params => {
    //   let paramId = params.get('id');      
    //   console.log('paramId',paramId)
    // });




  }

  getUserDetails(userId: any) {
    this.threeDService.show();
    this.userDetail = [];
    this.authService.getUserDetail(userId).subscribe(res => {
      this.threeDService.hide();
      console.log("ress",res);
      if (res.responseCode == 200) {
        //this.userDetail = res.data;
        const result = JSON.parse(this.encrptDecryptService.decrptData(this.encrptDecryptService.secretKey[res.authId],res.data));
        this.userDetail=[result][0]
        console.log("userDetail",this.userDetail);
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


  calculateAge(date:any){
    const bdate = new Date(date);
    const timeDiff = Math.abs(Date.now() - bdate.getTime() );
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    return this.age;
    console.log("age",this.age);
  }

}
