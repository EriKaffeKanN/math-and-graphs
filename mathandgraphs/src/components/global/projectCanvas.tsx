import React, { createRef } from 'react'
import MouseTrackingComponent from './mousetrackingcomponent';
import Vector2 from './interfaces/vector2'

interface ICanvasProps {
    readonly width?: number;
    readonly height?: number;
}

export default abstract class ProjectCanvas<IState> extends MouseTrackingComponent<ICanvasProps, IState> {

    protected width: number;
    protected height: number;

    protected origin: Vector2 = {
        x: 0,
        y: 0
    };

    constructor(props: ICanvasProps) {
        super(props);
        this.width = props.width === undefined ? 300 : props.width;
        this.height = props.height === undefined ? 150 : props.height;
        this.init();
    }

    abstract init(): void;

    onLoad() {
        this.startTracking(this.reference);
    }

    onUnload() {
        this.stopTracking();
    }

    protected reference = createRef<HTMLCanvasElement>();
    protected zoom: number = 1;

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

    abstract renderAdditionalComponents(): JSX.Element

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