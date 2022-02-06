import { Ball } from '../interfaces';
import { Colors } from './color-palette';

export class Utils {

    // select ball color from pallete
    public static getColorFromPallete(index: number): string {
        return Colors[index];
    }

    // return a amount of balls objects
    public static genarateBalls(amount: number): Ball[] {
        let balls: Ball[] = [];

        for (let i = 0; i < amount ; i++) {
            balls.push({
                id: balls.length + 1,
                isSelected: false,
                color: this.getColorFromPallete(balls.length)
            })
          }

        return balls;
    }
}
