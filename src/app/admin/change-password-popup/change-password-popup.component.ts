import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss']
})
export class ChangePasswordPopupComponent implements OnInit {
  adminId:any;
  changePasswordForm: any;

  constructor(public fb: FormBuilder,
    public router: Router,
    private threeDService: ThreeDServiceService,
    private authService: AuthService,
    private toastr: ToastrService,
    public encryptDecryptService:EncryptDecryptService,
    public dialogRef: MatDialogRef<ChangePasswordPopupComponent>) {
    this.changePasswordForm = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
    })

  }

  ngOnInit() { }

  closePopup(): void {
    this.dialogRef.close();
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.threeDService.show();
      let adminDetail: any = sessionStorage.getItem("adminDetail");
      adminDetail = JSON.parse(adminDetail)
      this.adminId = adminDetail.adminId;
      let password: any = sessionStorage.getItem("password");
      console.log(this.adminId,'adminId find---');
      
let encyptedData={
  adminId:this.adminId,
  password:this.changePasswordForm.value.new_password
}
console.log(encyptedData,'encyptedData Data ----');

      let reqData = {
        authId: 0,
        data: this.encryptDecryptService.encryptData(this.encryptDecryptService.secretKey[0],encyptedData)
        ,
        // oldPassword: password,
      }
      console.log(reqData,'req Data ----');
      
      this.authService.changePassword(reqData).subscribe(res => {
        this.threeDService.hide();
        if (res.responseCode == 200) {
          this.toastr.success(res.message);
          this.dialogRef.close();
        } else {
          this.toastr.error(res.message)
        }
      }, error => {
        this.threeDService.hide();
        this.toastr.error('Technical Issue.')
        console.log(error);
      });
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  addValidation() {
    var pattern = /^.*(?=.{6,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!-_]).*$/;
    if (this.changePasswordForm.value.new_password) {
      if (pattern.test(this.changePasswordForm.value.new_password)) {
        if (this.changePasswordForm.value.new_password != this.changePasswordForm.value.confirm_password) {
          this.changePasswordForm.controls['confirm_password'].setErrors({ notMatching: true });
        }
        else {
          this.changePasswordForm.controls['confirm_password'].setErrors(null);
        }
      } else {
        this.changePasswordForm.controls['new_password'].setErrors({ notMatching: true });
      }
    }
  }


}
