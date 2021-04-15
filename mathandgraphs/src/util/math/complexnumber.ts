export default class ComplexNumber {
    a: number;
    b: number;

    constructor(a: number = 0, b: number = 0) {
        this.a = a;
        this.b = b;
    }

    // because no overloading in JS...
    addC(c: ComplexNumber): void {
        this.a += c.a;
        this.b += c.b;
    }
    addN(n: number): void {
        this.a += n;
    }

    muliplyC(c: ComplexNumber): void {
        const tmpA = this.a * c.a - this.b * c.b;
        const tmpB = this.a * c.b + this.b * c.a;
        this.a = tmpA;
        this.b = tmpB;
    }
    muliplyN(n: number): void {
        this.a *= n;
        this.b *= n;
    }

    divideC(c: ComplexNumber) {
        // TODO: Make this
        // Use complex conjugate or eulers identity
    }
    divideN(n: number) {
        this.a /= n;
        this.b /= n;
    }

    square(): void {
        const tmpA = this.a * this.a - this.b * this.b;
        const tmpB = 2 * this.a * this.b;
        this.a = tmpA;
        this.b = tmpB;
    }
}