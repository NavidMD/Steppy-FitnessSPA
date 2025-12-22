import { NgModule } from "@angular/core";
import { JalaliPipe } from "./pipes/jalali.pipe";
import { GetTrainingsService } from "./services/getTrainings.service";
import { FirebaseErrorHandlingService } from "./services/firebaseErrorHandling.service";


@NgModule({
  declarations:[JalaliPipe],
  providers:[GetTrainingsService, FirebaseErrorHandlingService],
  imports:[],
  exports:[JalaliPipe]
})

export class SharedModule {}
