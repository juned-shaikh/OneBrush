import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Links } from '../links.module';
import { map } from 'rxjs/operators';

const apiToken = sessionStorage.getItem("Token");
console.log(apiToken,'check--------------');

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ` + apiToken
  })
};
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem(Constants.localStorage.oAuth_token)}`
//   })
// };

// const httpUploadOptions = {
//   reportProgress: true,
//   headers: new HttpHeaders({
//     'Accept': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem(Constants.localStorage.oAuth_token)}`
//   })
// };
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private toastr: ToastrService,
    private http: HttpClient) { }

  token = sessionStorage.getItem('Token')

  login(data: any) {
    return this.http.post(Links.LOGIN, data)
      .pipe(map((response: any) => response));
  }

  dashboardCount() {
    return this.http.get(Links.DASHBOARD_COUNT, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllUsers(data: any) {
    return this.http.post(Links.USER_LIST, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  updateUserStatus(id: any, status: any) {
    return this.http.post(Links.UPDATE_USER_STATUS + '?uuid=' + id + '&status=' + status, {}, httpOptions)
      .pipe(map((response: any) => response));
  }

  changePassword(data: any) {
    return this.http.post(Links.CHANGE_PASSWORD, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  forgotPassword(email: any) {
    return this.http.post(Links.FORGOT_PASSWORD + '?email=' + email, {}, httpOptions)
      .pipe(map((response: any) => response));
  }

  resetPassword(data: any, reqType: any) {
    if (reqType) {
      return this.http.post(Links.USER_RESET_PASSWORD, data, httpOptions)
        .pipe(map((response: any) => response));
    } else {
      return this.http.post(Links.RESET_PASSWORD, data, httpOptions)
        .pipe(map((response: any) => response));
    }
  }

  verifyRequest(type: any, token: any, reqType: any) {
    if (reqType) {
      return this.http.post(Links.USER_VERIFY_REQUEST + '?type=' + type + '&token=' + token, {}, httpOptions)
        .pipe(map((response: any) => response));
    } else {
      return this.http.post(Links.VERIFY_RESET_PASSWORD_REQUEST + '?type=' + type + '&token=' + token, {}, httpOptions)
        .pipe(map((response: any) => response));
    }
  }

  getUser(uuid:any) {
    return this.http.post(Links.GET_USER_DETAIL+'?uuid='+uuid,{},httpOptions)
       .pipe(map((response: any) => response));
  }



    // const httpUploadOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': 'application/json',
    //     'authKey': 'a22f96db8bddb95ad0dc60dad56aaed6',
    //     // 'auth-token': String(authToken)
    //   }),

    addWelcomeScreen(form:any) {
    const formData = new FormData();
    formData.append('title', form.title)
    formData.append('descriptions', form.descriptions);
    formData.append('docfile', form.docfile)
    return this.http.post(Links.ADD_WELCOME_SCREEN, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  updateWelcomeScreen(form:any,id:any) {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('title', form.title)
  formData.append('descriptions', form.descriptions);
  formData.append('docfile', form.docfile)
  return this.http.put(Links.UPDATE_WELCOME_SCREEN, formData, httpOptions)
    .pipe(map((response: any) => response));
}

deleteWelcomeScreen(id: any) {
  return this.http.delete(Links.DELETE_WELCOME_SCREEN + '?caroselId=' + id , httpOptions)
    .pipe(map((response: any) => response));
}

  getWelcomeScreen(){
    return this.http.get(Links.GET_WELCOME_SCREEN).pipe(map((response: any) => response)); 
  }
// const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${this.token}`)
    // };
}
