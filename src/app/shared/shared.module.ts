import { NgModule } from "@angular/core";
import { JalaliPipe } from "./pipes/jalali.pipe";
import { GetTrainingsService } from "./services/getTrainings.service";
import { FirebaseErrorHandlingService } from "./services/firebaseErrorHandling.service";
import { ProgressLoadingComponent } from './components/loading/progress-loading.component';
import { HttpLoadingComponent } from "./components/loading/http-loading.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
  declarations:[JalaliPipe, ProgressLoadingComponent, HttpLoadingComponent],
  providers:[GetTrainingsService, FirebaseErrorHandlingService],
  imports: [BrowserAnimationsModule],
  exports:[JalaliPipe, ProgressLoadingComponent, HttpLoadingComponent]
})

export class SharedModule {}
