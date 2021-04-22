import ProjectCanvas from '../../global/projectCanvas'

interface IState {}

export default class FractalTreeCanvas extends ProjectCanvas<IState> {

    tickSpeed: number = 500;
    lineLength: number = 90;
    theta: number = Math.PI / 8;

    init(): void {

    }

    update(): void {
        this.clear();
        this.stroke("white");
        
        this.translate(this.width / 2, this.height);
        this.line(0, 0, 0, -this.lineLength);
        this.translate(0, -this.lineLength);
        this.drawCrown();

        this.push();
        this.rotate(-this.theta);
        this.line(0, 0, 0, -this.lineLength);
        this.pop();

        this.resetMatrix();
    }

    drawCrown(delta: number = 0) {
        if(delta <= this.lineLength - 10){
            this.push();
            this.rotate(this.theta);
            this.line(0, 0, 0, -(this.lineLength - delta));
            this.translate(0, -(this.lineLength - delta));
            this.drawCrown(delta + 10);
            this.pop();

            this.push();
            this.rotate(-this.theta);
            this.line(0, 0, 0, -(this.lineLength - delta));
            this.translate(0, -(this.lineLength - delta));
            this.drawCrown(delta + 10);
            this.pop();
        }
    }

    renderAdditionalComponents(): JSX.Element {
        return (
            <></>
        );
    }
}