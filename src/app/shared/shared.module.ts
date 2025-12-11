import { NgModule } from "@angular/core";
import { JalaliPipe } from "./pipes/jalali.pipe";


@NgModule({
  declarations:[JalaliPipe],
  providers:[],
  imports:[],
  exports:[JalaliPipe]
})

export class SharedModule {}
