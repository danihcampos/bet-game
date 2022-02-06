import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BallSelectorComponent } from './ball-selector.component';
import { Colors } from 'src/app/core/utils';

const ballMock = {
  id: 5,
  color: '#000',
  isSelected: false
}

const selectedBallMock = {
  id: 5,
  color: '#000',
  isSelected: true
}

const winnerGameResultMock = {
  result: 5,
  placedBet: 200,
  win: true,
  profit: 300,
}

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent;
  let fixture: ComponentFixture<BallSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a array of 10 balls objects not selected', () => {
    const value = component['generateBalls']();
    expect(value.length).toEqual(10);
    value.forEach((item) => {
      expect(item.id).toBeGreaterThan(0);
      expect(item.id).toBeLessThan(11);
      expect(item.isSelected).toBeFalse();
      expect(Colors.includes(item.color)).toBeTrue();
    });
  });

  it('should add a ball in the selected array if it is not selected yet', () => {
    component.onSelect(ballMock);
    const testBall = component.balls.find((item) => item.id === ballMock.id);
    const addedInService = component['ballService'].selectedBalls.includes(ballMock);
    expect(testBall?.isSelected).toBeTrue();
    expect(addedInService).toBeTrue();
  });

  it('should remove the ball in the selected array if it is selected', () => {
    component.balls.map((item) => {
      if(item.id === selectedBallMock.id) { item.isSelected = true };
      return item;
    });
    component.onSelect(selectedBallMock);
    const testBall = component.balls.find((item) => item.id === selectedBallMock.id);
    const addedInService = component['ballService'].selectedBalls.includes(selectedBallMock);
    expect(testBall?.isSelected).toBeFalse();
    expect(addedInService).toBeFalse();
  });

  it('should remove all the selected balls', () => {
    component.clearBet();
    component.balls.forEach((item) => {
      expect(item.isSelected).toBeFalse();
    });
    expect(component['ballService'].selectedBalls).toEqual([]);
  });

  it('should reset the game', () => {
    component.resetGame();
    component.balls.forEach((item) => {
      expect(item.isSelected).toBeFalse();
    });
    expect(component['ballService'].selectedBalls).toEqual([]);
    expect(component.gameResult.result).toBe(0);
    expect(component.gameResult.placedBet).toBe(0);
    expect(component.showGameResult).toBeFalse();
  });

  it('should receive game result variables', () => {
    component['ballService'].gameResult$.next(winnerGameResultMock);
    expect(component.showGameResult).toBeTrue();
    expect(component.gameResult).toEqual(winnerGameResultMock);
  })
});
