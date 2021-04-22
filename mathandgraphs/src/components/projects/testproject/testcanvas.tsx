import ProjectCanvas from '../../global/projectCanvas'

interface IState {}

export default class TestCanvas extends ProjectCanvas<IState> {
    tickSpeed: number = 10;

    theta: number = 0;

    init(): void {
    }

    update(): void {
        this.theta += 0.01
        this.translate(this.width / 2, this.height / 2);
        this.rotate(this.theta);
        this.translate(0, -100);
        this.rotate(Math.PI/4);
        this.text("Testing rotations / translations!", 0, 0, 100);

        this.stroke("white");
        this.fill("white");
        this.clear();

        this.rect(-50, -50, 100, 100, false);
        this.line(0, 0, 50, -50);

        this.resetMatrix();
    }
    renderAdditionalComponents(): JSX.Element {
        return(
            <>
            </>
        );
    }
}