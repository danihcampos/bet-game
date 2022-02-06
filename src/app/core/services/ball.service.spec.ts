import { TestBed } from '@angular/core/testing';

import { BallService } from './ball.service';

const ballMock = {
  id: 5,
  color: '#000',
  isSelected: false,
};

const winningMock = [
  { id: 1, color: '#000', isSelected: true },
  { id: 2, color: '#000', isSelected: true },
  { id: 3, color: '#000', isSelected: true },
  { id: 4, color: '#000', isSelected: true },
  { id: 5, color: '#000', isSelected: true },
  { id: 6, color: '#000', isSelected: true },
  { id: 7, color: '#000', isSelected: true },
  { id: 8, color: '#000', isSelected: true },
  { id: 9, color: '#000', isSelected: true },
  { id: 10, color: '#000', isSelected: true },
];

const loosingMock = [
  { id: 11, color: '#000', isSelected: true },
];

describe('BallserviceService', () => {
  let service: BallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a number from 1 to 10', () => {
    expect(service.getRandomNumber()).toBeGreaterThan(0);
    expect(service.getRandomNumber()).not.toBeGreaterThan(10);
  });

  it('should add a ball in the array of selected balls and update observable value', (done) => {
    const expectedValue = [ballMock];
    const found = service.selectedBalls.includes(ballMock);
    service.selectedBalls$.subscribe((value) => {
      expect(value).toEqual(expectedValue);
      done();
    });
    service.addBall(ballMock);
    expect(service.selectedBalls.length).toBeGreaterThan(0);
    expect(found).toBeTrue;
  });

  it('should clear the selected balls and update observable value', (done) => {
    service.selectedBalls$.subscribe((value) => {
      expect(value).toEqual([]);
      done();
    });
    service.clearBet();
    expect(service.selectedBalls).toEqual([]);
  });

  it('should send a winner result if the sorted number is among the choosen', (done) => {
    service.selectedBalls = winningMock;
    service.gameResult$.subscribe((value) => {
      expect(value.win).toBeTrue();
      expect(value.profit).toEqual(value.placedBet * 1.5);
      done();
    });
    service.playTheGame(200);
    service.playTheGame(5);
  });

  it('should send a looser result if the sorted number is not among the choosen', (done) => {
    service.selectedBalls = loosingMock;
    service.gameResult$.subscribe((value) => {
      expect(value.win).not.toBeTrue();
      expect(value.profit).toBeNull;
      done();
    });
    service.playTheGame(200);
    service.playTheGame(5);
  });
});
