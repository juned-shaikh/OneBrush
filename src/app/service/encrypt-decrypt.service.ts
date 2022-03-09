import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  secretKey: any = [
    "1=)viRTZC`EV5g9(", "6h7ZnC_Em5^&(ScK","(-~)da?ltBr|u>VF","xsYJlomb~of!GW^)","jJI<)GVEx7Yz2m!Q","Ic<Kd0Ckek||D&hl","NW^!<XtZ<~0cZgJ&",
    "sUxorEW*3Q(VjDc>","l04=f6J~zOb9sB9£","!-@b)oYO1Nh5(V_r","j~=@=0Ue6o6Rov@Q",
    "xPXZIzeU>H`xyA_g",
    "O__5UsT*uAaBZ=2g",
    "vR_NrNat7tCoKDo4",
    "Z(fduSaI!4KcT)V0",
    "gU^W<kw3pp*4?cO*",
    "~2CUs$ltU3HE(@Et",
    "V+u8xfL7AZz3j1js",
    "Bvh2I<fHFGdM$QAw",
    "mfysUr$Nv_>Hi7o?",
    "1yXCu`4eGJn_6<mr",
    "JnTxptc3YFqv65Dn",
    "2~lRc!TIvxRv15=+",
    "u=_oFZqQOK%~N8~e",
    "UlcQgk?P$X>(p&R$",
    "MICoSA^36!eMNRSN",
    "Tlq%q0^=VH£mCw4`",
    "V2W1hPoNoZlQDhzp",
    "t0K!?LmDPG99k3~P",
    "YiZ&<P>q^?VsSe*J",
    "~S?n1un-D++FEq?W",
    "!WUL?X<J@x508XGo",
    "B3v<Dv(gHN$Icrx7",

    "qr9F*`_k?^&oJcxb",

    "$q4qXgmUHZTJ2u%L",

    "6r>@y7bOU(£c)EH5",

    "wTMgvQ<?sllUI=X-",

    "JGbN@mXeLz)ci%yv",

    "GUOi9%4<%@>~f!zP",

    "5XygBwxb21R%H!<5",

    "L68M`~*DG4-jaU3!",

    "qABQpR3d$V^VT`DS",

    "V`C5gR9epy)6CIr4",

    "6v>*cH08sHMa!Ib(",

    "assK7BKRp>uHWhfS",

    "=!O5zgyZ_FRJrX!U",

    "tfqY%05u08&O@cp>",

    "6Y+n*^Ez$asocBpJ",

    "(gtVj%+Vi2Ug@`F6",

    "<(><IJYkxXdp_wlO",

    "0Ha1£*)>0K2@m$KF",

    "8MereDuF4(uPFs^T",

    "GYr^Ye$z~wd>Wjue",

    "s&-rC@$dkuAbe(dk",

    "tq&rZFU)BvMx6gSU",

    "dhKC`g@^DsQxlzD~",

    "*`qxT+?L9Run`6Xe",

    "pM0$-6i-mo+zttQs",

    "j%Fr>aK@Bc(kshn)",

    "hRQ7-JrNOC<w)Oa*",

    "gOtllRcB|ba!<qwb",

    "!TEKnI`M2`HyoSd*",

    "ZcedYz$)bOJOAF-S",

    "QTqV*O&VR$*n9xWF",

    "K5cKu0S=(@K8YLJ?",

    "kq4mHQ$qRCg8aLJ(",

    "?QUNMj+MNzeC)^aA",

    ")uYz*gGzPe0IrN3£",

    "ydP_H~+-qZ8@NfmB",

    "<AtsI4ilkd~2q`kx",

    "Lf>S_+t|0+RLOi(X",

    "hia£anFS=N3J£?aE",

    "OF8SMXj&G-Af9NlI",

    "kq*sC|U6`neN4)f|",

    "Dia)1R=y-&~RFH%K",

    "*?Y(5@5~*&B£2?$R",

    "Pq6_biPjdqoln_6i",

    "lq|fyF172FVh560z",

    "J`!wbo)56oL`D*^v",

    ">xk47c`ZSj(b8g3J",

    "=@(8!£salx%fP+Gz",

    "n-02zKK*9PJ`Nzc_",

    "7PkN4ZiH~34h7sh&",

    "akpb-Aj3V(MJ-^l=",

    "!)Q&Nb_z-E=qOldk",

    "M!L=^)DPXAde*HKk",

    "5dBIl@UJPKT5HYhe",

    "Q<cW|£y&9gTK$kz&",

    "Zd%6L6CNXiiH4wCA",

    "k&Ach)?8Bl>Qmf~M",

    "6<b|D8~vKKK1Zsad",

    "0yE&!v^lq)0Ouz4B",
    "fIFa+~MW~Q|~q<5D",
    "-1p-$+Xuk>*CVe1Z",
    "S@Ik2h_zO*CpSV>m",
    "oV`p£|*HVX$FVj3A",
    "q@-B1ShXz2Vmyul<",
    "F`P|fOlA*SR(%ibe",
    "<6dixH`$S4ogoE9T",
    "A&@+Yg&pp(DT*Ty_"]


 
  constructor() { }

  // encryptData(data:any): any {
  //   const configuration = {
  //     keySize: 128/8,
  //     iv: CryptoJS.enc.Base64.parse('ADVANTALBPCLSCRA'),
  //     mode: CryptoJS.mode.CBC
  //   };

  //   try {
  //     //console.log("authId-->",authId);
  //    let temp = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey[2],configuration).toString()
  //     console.log("key-->",this.secretKey[2]);
  //     console.log("encrypt",CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey[2],configuration).toString());
  //     console.log('decrpt',this.decryptData(temp,this.secretKey[2]));
      
  //     return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey[2],configuration).toString();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  
  encryptData(keys:any, value:any){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse("ADVANTALBPCLSCRA");
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }


  decryptData(data:any,authId:any): any  {
    console.log("secretKey",this.secretKey[authId]);
    console.log("data",data);
  
    const configuration = {
      keySize: 128/8,
      iv: CryptoJS.enc.Utf8.parse('ADVANTALBPCLSCRA'),
      mode: CryptoJS.mode.CBC
    };
    
    try {


      
      const bytes = CryptoJS.AES.decrypt(data, this.secretKey[authId],configuration);
      console.log("decrypt 1",bytes);

      if (bytes.toString()) {
        console.log("decrypt 1",JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }

}

}