export default class Format {
    static removePx(s: string) {
        return s.slice(0, s.length - 2);
    }
}