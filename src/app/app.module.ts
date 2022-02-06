import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BallSelectorComponent } from './components/ball-selector/ball-selector.component';
import { BetSlipComponent } from './components/bet-slip/bet-slip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BallService } from './core/services/ball.service';

@NgModule({
  declarations: [
    AppComponent,
    BallSelectorComponent,
    BetSlipComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [BallService],
  bootstrap: [AppComponent],
})
export class AppModule {}
