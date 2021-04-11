import React, { createRef } from 'react'
import MouseTrackingComponent from './mousetrackingcomponent';
import Vector2 from '../../util/structures/vector2'
import Format from '../../util/formatting/format';
import Rect from '../../util/structures/rect';

interface ICanvasProps {
    readonly width?: number;
    readonly height?: number;
}

export default abstract class ProjectCanvas<IState> extends MouseTrackingComponent<ICanvasProps, IState> {

    protected width: number;
    protected height: number;
    protected ctx?: CanvasRenderingContext2D = undefined;

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
        const ctx = this.reference.current!.getContext('2d');
        if(ctx !== null && ctx !== undefined) {
            this.ctx = ctx;
        }
    }

    onUnload() {
        this.stopTracking();
    }

    track(e: MouseEvent) {
        super.track(e);
        const displayWidth = Number(Format.removePx(getComputedStyle(this.reference.current!).width));
        const scalingFactor = this.width / displayWidth;
        this.mouse.x *= scalingFactor;
        this.mouse.y *= scalingFactor;
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

    stroke(c: string) {
        if(this.ctx === undefined) {
            console.log("Error: canvasrenderingcontext undefined.");
            return;
        }
        this.ctx.strokeStyle = c;
    }

    fill(c: string) {
        if(this.ctx === undefined) {
            console.log("Error: canvasrenderingcontext undefined.");
            return;
        }
        this.ctx.fillStyle = c;
    }

    clear() {
        if(this.ctx === undefined) {
            console.log("Error: canvasrenderingcontext undefined.");
            return;
        }
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    line(startX: number, startY: number, endX: number, endY: number) {
        const startPos: Vector2 = this.getLocalPos(startX, startY);
        const endPos: Vector2 = this.getLocalPos(endX, endY);

        if(this.ctx === undefined) {
            console.log("Error: canvasrenderingcontext undefined.");
            return;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(startPos.x, startPos.y);
        this.ctx.lineTo(endPos.x, endPos.y);
        this.ctx.stroke();
    }

    rect(startX: number, startY: number, width: number, height: number, fill: boolean) {
        const localPos = this.getLocalPos(startX, startY);
        const localRect: Rect = {
            x: localPos.x,
            y: localPos.y,
            width: width * this.zoom,
            height: height * this.zoom
        };

        if(this.ctx === undefined) {
            console.log("Error: canvasrenderingcontext undefined.");
            return;
        }
        this.ctx.beginPath();
        this.ctx.rect(localRect.x, localRect.y, localRect.width, localRect.height);
        // Look at this abbhorent line of code! Ternary operators are executed before commands!
        fill ? this.ctx.fill() : this.ctx.stroke();
    }

    text(text: string, x: number, y: number, width: number) {
        if(this.ctx === undefined) {
            console.log("Error: canvasrenderingcontext undefined.");
            return;
        }
        this.ctx.font = "20px Arial";
        const textPos: Vector2 = this.getLocalPos(x, y);

        this.ctx.fillText(
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