import React, { createRef } from 'react'

interface ICanvasProps {
    readonly width?: number;
    readonly height?: number;
}

interface Vector2 {
    x: number;
    y: number;
}

export default abstract class ProjectCanvas<IState> extends React.Component<ICanvasProps, IState> {

    protected width: number;
    protected height: number;

    protected origin: Vector2 = {
        x: 0,
        y: 0
    };

    abstract init(): void;

    constructor(props: ICanvasProps) {
        super(props);
        this.width = props.width === undefined ? 300 : props.width;
        this.height = props.height === undefined ? 150 : props.height;
        this.init();
    }


    protected reference = createRef<HTMLCanvasElement>();
    protected zoom: number = 1;
    protected mouse: Vector2 = {x: 0, y: 0};

    // Conversions
    protected getWorldPos(x: number, y: number): Vector2 {
        return {
            x: (x - this.origin.x) / this.zoom, 
            y: (y - this.origin.y) / this.zoom
        }
    }
    protected getLocalPos(x: number, y: number): Vector2 {
        return {
            x: this.origin.x + x * this.zoom,
            y: this.origin.y + y * this.zoom
        };
    }
    protected getWorldMouse(): Vector2 {return this.getWorldPos(this.mouse.x, this.mouse.y)};

    private updateCanvas: number = 0;

    abstract updateSpeed: number;

    componentDidMount() {
        this.updateCanvas = window.setInterval(() => {this.update();this.resetOrigin()}, this.updateSpeed);

        this.reference.current?.addEventListener("mousemove", (e) => {
            const bodyRect = document.body.getBoundingClientRect();
            const canvasRect = this.reference.current!.getBoundingClientRect();
            const canvasX = canvasRect.left - bodyRect.left;
            const canvasY = canvasRect.top - bodyRect.top;

            this.mouse.x = e.clientX - canvasX;
            this.mouse.y = e.clientY - canvasY;
        })
    }

    componentWillUnmount() {
        clearInterval(this.updateCanvas);
        this.updateCanvas = 0;
    }

    abstract update(): void;

    abstract renderAdditionalComponents(): JSX.Element

    translate(x: number, y: number) {
        this.origin.x += x;
        this.origin.y += y;
    }

    line(startX: number, startY: number, endX: number, endY: number, ctx: CanvasRenderingContext2D) {
        const startPos: Vector2 = this.getLocalPos(startX, startY);
        const endPos: Vector2 = this.getLocalPos(endX, endY);

        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endPos.x, endPos.y);
        ctx.stroke();
    }

    text(text: string, x: number, y: number, width: number, ctx: CanvasRenderingContext2D) {
        const textPos: Vector2 = this.getLocalPos(x, y);

        ctx.fillText(
            text,
            textPos.x,
            textPos.y,
            width*this.zoom
        );
    }

    resetOrigin() {
        this.origin = {x: 0, y: 0};
    }

    render() {
        return(
            <>
                <canvas ref={this.reference} width={this.width} height={this.height}>
                    <p>Error! Please change your browser to one that supports HTML canvas.</p>
                </canvas>
                {this.renderAdditionalComponents()}
            </>
        );
    }
}