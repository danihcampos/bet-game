import { Component, OnInit } from '@angular/core';
import { BallService } from '../../core/services';
import { Ball } from '../../core/interfaces';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss'],
})
export class BetSlipComponent implements OnInit {
  public selectedBalls: Ball[] = [];
  public betForm: FormGroup = this.builForm();
  public showValidationMessage: boolean = false;

  constructor(
    private ballService: BallService,
    private formBuilder: FormBuilder
  ) {
    // not to do
  }

  ngOnInit() {
    this.ballService.selectedBalls$.subscribe((data) => {
      this.selectedBalls = data;
    });

    this.ballService.gameResult$.subscribe((result) => {
      if(result.result > 0) {
        this.betForm.disable();
      } else {
        this.betForm.reset();
        this.betForm.enable();
      }
    });
  }

  private builForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({
      betValue: [0, [Validators.required, Validators.min(5)]],
    });
    return form;
  }

  public placeBet() {
    if (this.betForm.valid && this.selectedBalls.length > 0) {
      const betValue = this.betForm.controls['betValue'].value * this.selectedBalls.length;
      this.ballService.playTheGame(betValue);
      this.showValidationMessage = false;
    } else {
      this.showValidationMessage = true;
    }
  }

  ngOnDestroy() {
    this.ballService.selectedBalls$.unsubscribe();
    this.ballService.gameResult$.unsubscribe();
  }
}
