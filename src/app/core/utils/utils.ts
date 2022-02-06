import { Ball } from '../interfaces';
import { Colors } from './color-palette';

export class Utils {

    // select ball color from pallete
    public static getColorFromPallete(index: number): string {
        return Colors[index];
    }

    // return 10 balls objects
    public static genarateBalls(): Ball[] {
        let balls: Ball[] = [];

        for (let i = 0; i < 10 ; i++) {
            balls.push({
                id: balls.length + 1,
                isSelected: false,
                color: this.getColorFromPallete(balls.length)
            })
          }

        return balls;
    }
}
