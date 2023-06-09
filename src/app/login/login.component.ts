import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthService } from '../service/auth.service';
import { EncryptDecryptService } from '../service/encrypt-decrypt.service';
import { ThreeDServiceService } from '../service/three-dservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  res: any;
  declare loginForm: FormGroup;
  constructor(private router: Router, public fb: FormBuilder, private toastr: ToastrService, public authService: AuthService,
    private route: ActivatedRoute, private ThreeDService: ThreeDServiceService, public dialog: MatDialog,
    public encryptDecryptService:EncryptDecryptService) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }
  login() {
    if (this.loginForm.valid && this.loginForm.value.password !== '') {
      this.ThreeDService.show();
      console.log("login form val",this.loginForm.value);
      let loginData={
        authId:1,
        data:this.encryptDecryptService.encryptData(this.encryptDecryptService.secretKey[1],this.loginForm.value)
      }
      
      console.log("secret key",this.encryptDecryptService.secretKey[1])
      console.log("login data",loginData)
      
      this.authService.login(loginData).subscribe(res => {
        console.log("res",res);

        this.ThreeDService.hide();
        if (res.responseCode == 200) {
         const result = this.encryptDecryptService.decrptData(this.encryptDecryptService.secretKey[res.authId],res.data)
         console.log(result,'----decrypt data');
          
         sessionStorage.setItem("adminDetail",result);
          sessionStorage.setItem("password", this.loginForm.value.password);
          sessionStorage.setItem("Token", res.Token);
          this.toastr.success(res.message);
          this.router.navigate(['admin']);
        } else {
          this.toastr.error(res.message);
        }
      }, error => {
        this.ThreeDService.hide();
        if (error.status == 400) {
          this.toastr.error('Invalid username or password');
        } else {
          this.toastr.error("Please Check Your Internet Connection")
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
