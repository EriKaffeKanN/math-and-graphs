export default class EXMath {
    static clamp(value: number, min: number, max: number) {
        if(value < min) {
            return min;
        }
        if(value > max) {
            return max;
        }
        return value;
    }
}