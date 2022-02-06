import { TestBed } from '@angular/core/testing';

import { BallService } from './ball.service';

const ballMock = {
  id: 5,
  color: '#000',
  isSelected: false,
}

describe('BallserviceService', () => {
  let service: BallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a number between 1 to 10', () => {
    expect(service.getRandomNumber()).toBeGreaterThan(0);
    expect(service.getRandomNumber()).not.toBeGreaterThan(10);
  });

  it('should add a ball in the array of selected balls', () => {
    service.addBall(ballMock);
    const found = service.selectedBalls.includes(ballMock)
    expect(service.selectedBalls.length).toBeGreaterThan(0);
    expect(found).toBeTrue;
  });
});
