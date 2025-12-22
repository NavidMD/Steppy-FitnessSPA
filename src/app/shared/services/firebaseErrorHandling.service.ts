import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class FirebaseErrorHandlingService {
  constructor(){}

  getErrorMessage(errorCode: string) {
     switch (JSON.stringify(errorCode)) {
      case 'auth/email-already-in-use':
        return 'این ایمیل قبلاً ثبت شده است.';
      case 'auth/invalid-email':
        return 'ایمیل وارد شده معتبر نیست.';
      case 'auth/weak-password':
        return 'رمز عبور خیلی ضعیف است (حداقل ۶ کاراکتر).';
      case 'auth/user-not-found':
        return 'کاربری با این ایمیل یافت نشد.';
      case 'auth/wrong-password':
        return 'رمز عبور اشتباه است.';
      case 'auth/too-many-requests':
        return 'تلاش‌های زیادی انجام شده، لطفاً بعداً دوباره امتحان کنید.';
      case 'auth/network-request-failed':
        return 'مشکل در اتصال اینترنت .';
      default:
        return 'خطای ناشناخته‌ای رخ داده است.';
    }
  }
}
