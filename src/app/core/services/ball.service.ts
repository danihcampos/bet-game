import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ball, GameResult } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BallService {
  public selectedBalls$ = new Subject<Ball[]>();
  public gameResult$ = new Subject<GameResult>();
  public selectedBalls: Ball[] = [];

  // generates a random Number
  public getRandomNumber(): number {
    return Math.floor((Math.random() * 10) + 1);
  }

  // add a ball
  public addBall(ball: Ball): void {
    this.selectedBalls.push(ball);
    this.selectedBalls$.next(this.selectedBalls);
  }

  // remove a ball
  public removeBall(ball: Ball): void {
    this.selectedBalls = this.selectedBalls.filter((item) => {
      return item.id !== ball.id;
    });
    this.selectedBalls$.next(this.selectedBalls);
  }

  // get selected balls
  public getSelectedBalls(): Ball[] {
    return this.selectedBalls;
  }

  // clear the selection
  public clearBet() {
    this.selectedBalls = [];
    this.selectedBalls$.next(this.selectedBalls);
  }

  // build the game result
  public playTheGame(betValue: number) {
    const sortedBall = this.getRandomNumber();
    console.log('sorteado no service', sortedBall)
    
    const result: GameResult = {
      result: sortedBall,
      placedBet: betValue,
    };

    const verifyWin = this.selectedBalls.filter((item) => {
      return item.id === sortedBall;
    });

    if (verifyWin.length > 0) {
      result.profit = betValue * 1.5;
      result.win = true;
    } else {
      result.win = false;
    }

    this.gameResult$.next(result);
  }

  public resetGame() {
    const clearResult: GameResult = {
      result: 0,
      placedBet: 0
    }
    this.gameResult$.next(clearResult);
  }
}
