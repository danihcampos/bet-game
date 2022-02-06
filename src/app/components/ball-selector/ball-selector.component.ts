import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ball, GameResult } from '../../core/interfaces';
import { BallService } from '../../core/services';
import { Utils } from '../../core/utils';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss'],
})
export class BallSelectorComponent implements OnInit, OnDestroy {
  public balls: Ball[] = [];
  public showGameResult: boolean = false;
  public gameResult: GameResult = {
    result: 0,
    placedBet: 0
  };
  public winnerBall: Ball = {id: 0, color: '', isSelected: false };

  constructor(private ballService: BallService) {
    // not to do
  }

  ngOnInit(): void {
    this.balls = this.generateBalls();

    this.ballService.gameResult$.subscribe((result) => {
      console.log('result recebido no component', result)
      this.gameResult = result;
      this.showGameResult = true;
      const found = this.balls.find((item) => item.id === result.result)
      this.winnerBall = found ? found : this.winnerBall;
    });
  }

  // calling for generanting the balls
  private generateBalls(): Ball[] {
    return Utils.genarateBalls();
  }

  // Ball selection
  public onSelect(ball: Ball): void {

    if (ball.isSelected) {
      // modifies the current balls array
      const newValue = this.balls.map((item) => {
        if (item.id === ball.id) {
          item.isSelected = false;
        }
        return item;
      });

      this.balls = newValue;
      this.ballService.removeBall(ball);
      return;
    }

    // limits to 8 balls selected
    if (!ball.isSelected && this.ballService.getSelectedBalls().length < 8) {
      // modifies the current balls array
      const newValue = this.balls.map((item) => {
        if (item.id === ball.id) {
          item.isSelected = true;
        }
        return item;
      });

      this.balls = newValue;
      this.ballService.addBall(ball);
      return;
    }
  }

  // clear the selected balls
  public clearBet(): void {
    const newValue = this.balls.map((item) => {
       item.isSelected = false;
       return item;
    })
    this.balls = newValue;
    this.ballService.clearBet();
  }

  // reset the game
  public resetGame(): void {
    this.clearBet();
    this.ballService.resetGame();
    this.showGameResult = false;
  }

  ngOnDestroy(): void {
    this.ballService.gameResult$.unsubscribe();
  }
}
