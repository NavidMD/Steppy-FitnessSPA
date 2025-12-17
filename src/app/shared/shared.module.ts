import { NgModule } from "@angular/core";
import { JalaliPipe } from "./pipes/jalali.pipe";
import { GetTrainingsService } from "./services/getTrainings.service";


@NgModule({
  declarations:[JalaliPipe],
  providers:[GetTrainingsService],
  imports:[],
  exports:[JalaliPipe]
})

export class SharedModule {}
