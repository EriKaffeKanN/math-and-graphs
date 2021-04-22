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
    private rotation: number = 0;
    private pushedOrigins: Array<Vector2> = [];
    private pushedRotations: Array<number> = [];


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
        const rotatedTranslation = this.rotateVector({x: x, y: y}, this.rotation);
        this.origin.x += rotatedTranslation.x;
        this.origin.y += rotatedTranslation.y;
    }

    rotate(theta: number) {
        // Subtraction to make things spin clockwise instead of counter clockwise
        this.rotation -= theta;
    }

    rotateVector(v: Vector2, theta: number): Vector2 {
        // TODO: Use Vector addition/subtraction instead of calculating the vector angle
        const vTheta = Math.atan2(v.x, v.y);
        theta += vTheta
        const mag =  Math.sqrt(v.x * v.x + v.y * v.y);
        const tmpI = Math.sin(theta) * mag;
        const tmpJ = Math.cos(theta) * mag;
        return {
            x: tmpI,
            y: tmpJ
        };
    }

    stroke(c: string) {
        try {
            if(this.ctx === undefined) {
                throw new Error("ctx type CanvasRenderingContext2D | undefined is undefined");
            }
            this.ctx.strokeStyle = c;
        }
        catch(e) {
            console.log(e);
            return;
        }
    }

    fill(c: string) {
        try{
            if(this.ctx === undefined) {
                throw new Error("ctx type CanvasRenderingContext2D | undefined is undefined");
            }
            this.ctx.fillStyle = c;
        }
        catch(e) {
            console.log(e);
            return;
        }
    }

    clear() {
        try{
            if(this.ctx === undefined) {
                throw new Error("ctx type CanvasRenderingContext2D | undefined is undefined");
            }
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
        catch(e) {
            console.log(e);
            return;
        }
    }

    line(startX: number, startY: number, endX: number, endY: number) {
        try {
            if(this.ctx === undefined) {
                throw new Error("ctx type CanvasRenderingContext2D | undefined is undefined");
            }
            
            let v1: Vector2 = {x: startX, y: startY};
            let v2: Vector2 = {x: endX, y: endY};
            v1 = this.rotateVector(v1, this.rotation);
            v2 = this.rotateVector(v2, this.rotation);
            const startPos: Vector2 = this.getLocalPos(v1.x, v1.y);
            const endPos: Vector2 = this.getLocalPos(v2.x, v2.y);
            this.ctx.beginPath();
            this.ctx.moveTo(startPos.x, startPos.y);
            this.ctx.lineTo(endPos.x, endPos.y);
            this.ctx.stroke();
        }
        catch(e) {
            console.log(e);
            return;
        }
    }

    rect(startX: number, startY: number, width: number, height: number, fill: boolean) {
        try {
            if(this.ctx === undefined) {
                throw new Error("ctx type CanvasRenderingContext2D | undefined is undefined");
            }

            const localRect: Rect = {
                x: startX,
                y: startY,
                width: width,
                height: height
            };
            this.ctx.beginPath();
            this.line(
                localRect.x,
                localRect.y,
                localRect.x + localRect.width,
                localRect.y
            );
            this.line(
                localRect.x + localRect.width,
                localRect.y,
                localRect.x + localRect.width,
                localRect.y + localRect.height
            );
            this.line(
                localRect.x + localRect.width,
                localRect.y + localRect.height,
                localRect.x,
                localRect.y + localRect.height
            );
            this.line(
                localRect.x,
                localRect.y + localRect.height,
                localRect.x,
                localRect.y
            );
            //this.ctx.lineTo(Math.sin(this.rotation) * localRect.width, Math.cos(this.rotation) * this.rotation);
            //this.ctx.rect(localRect.x, localRect.y, localRect.width, localRect.height);
            // Look at this abbhorent line of code! Ternary operators are executed before commands!
            fill ? this.ctx.fill() : this.ctx.stroke();
        }
        catch (e) {
            console.log(e);
            return;
        }
    }

    text(text: string, x: number, y: number, width: number) {
        try{
            if(this.ctx === undefined) {
                throw new Error("ctx type CanvasRenderingContext2D | undefined is undefined");
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
        catch (e) {
            console.log(e);
            return;
        }
    }

    resetOrigin() {
        this.origin = {x: 0, y: 0};
    }
    resetMatrix() {
        this.origin = {x: 0, y: 0};
        this.rotation = 0;
    }
    push() {
        this.pushedOrigins.push({...this.origin});
        this.pushedRotations.push(this.rotation);
    }
    pop() {
        try {
            const newOrigin: Vector2 | undefined = this.pushedOrigins.pop();
            const newRotation: number | undefined = this.pushedRotations.pop();
            if(newOrigin === undefined || newRotation === undefined) {
                throw new Error("ProjectCanvas.pop() was called without matching ProjectCanvas.push()")
            }
            this.origin = newOrigin;
            this.rotation = newRotation;
        }
        catch(e) {
            console.log(e);
            return;
        }
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