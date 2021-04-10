import React, { createRef } from 'react'
import '../../style.scss'
import Vector2 from './interfaces/vector2';
import EXMath from '../../util/math'
import Rect from './interfaces/rect'

import MouseTrackingComponent from './mousetrackingcomponent'

interface IProps {
    min: number;
    max: number;
    step: number;
    value: number;
    name: string;
}

interface IState extends IProps {

}

export default class Slider extends MouseTrackingComponent<IProps, IState> {

    tickSpeed = 10;

    borderRef = createRef<HTMLDivElement>();
    lineRef = createRef<HTMLDivElement>();
    ballRef = createRef<HTMLDivElement>();

    // Needs to be in constructor instead of init in order to access props
    constructor(props: IProps) {
        super(props);
        this.state = {
            min: props.min,
            max: props.max,
            step: props.step,
            value: props.value,
            name: props.name
        };
    }

    init() {

    }

    onLoad() {
        this.startTracking(this.borderRef);
    }

    onUnload() {
        this.stopTracking();
    }

    update() {
        this.align();
    }

    updateValue(lineRect: Rect, borderRect: Rect) {
        if(this.mouseDown) {
            const percentage = (this.mouse.x - (lineRect.x - borderRect.x)) / lineRect.width;
            const value = percentage*(this.state.max - this.state.min) + this.state.min;
            this.setState(prevState => ({
                value: EXMath.clamp(value, this.state.min, this.state.max)
            }));
        }
    }

    align() {
        const line = this.lineRef.current!;
        const lineRect = this.getRect(line);

        const border = this.borderRef.current!;
        const borderRect = this.getRect(border);

        this.updateValue(lineRect, borderRect);
        
        const button = this.ballRef.current!;
        const buttonRect = this.getRect(button);

        const percentage = (this.state.value - this.state.min) / (this.state.max - this.state.min);
        const offset = lineRect.width * percentage;

        button.setAttribute("style", `left: ${lineRect.x - buttonRect.width/2 + offset}px; top: ${lineRect.y - buttonRect.height/2 + lineRect.height/2}px`);
    }

    getRect(element: Element): Rect {
        const rect = element.getBoundingClientRect();
        const emtStyle = getComputedStyle(element);

        const removePx = (s: string) => {
            return(s.slice(0, s.length - 2));
        }

        return{
            x: rect.left,
            y: rect.top,
            width: Number(removePx(emtStyle.width)),
            height: Number(removePx(emtStyle.height))
        };
    }

    render() {
        return(
            <div className="slider">
                <h4>{this.props.name}</h4>
                <div ref={this.borderRef} className="sliderBorder">
                    <div ref={this.lineRef} className="sliderLine">
                        <div ref={this.ballRef} className="sliderButton"></div>
                    </div>
                </div>
            </div>
        );
    }
}