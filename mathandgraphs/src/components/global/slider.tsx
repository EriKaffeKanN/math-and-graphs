import React, { createRef } from 'react'
import '../../style.scss'

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

interface Vector2 {
    x: number;
    y: number;
}

export default class Slider extends MouseTrackingComponent<IProps, IState> {

    interval: number = 0;
    mousePos: Vector2 = {x: 0, y: 0};
    mouseDown: boolean = false;

    trackingElementRef = createRef<HTMLDivElement>();
    lineRef = createRef<HTMLDivElement>();
    ballRef = createRef<HTMLDivElement>();

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

    updateValue() {

    }

    updateAlignment() {
        this.align();
    }

    componentDidMount() {
        this.interval = window.setInterval(() => {
            this.updateAlignment();
        }, 10);

        this.startTracking();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = 0;

        this.stopTracking();
    }

    align() {
        const line = this.lineRef.current!;
        const lineRect = line.getBoundingClientRect();
        const lineX = lineRect.left;
        const lineY = lineRect.top;
        const lineStyle = getComputedStyle(line);

        const removePx = (s: string) => {
            return(s.slice(0, s.length - 2));
        }

        const lineHeight = Number(removePx(lineStyle.height));
        const lineWidth = Number(removePx(lineStyle.width));
        
        const button = this.ballRef.current!;
        const buttonStyle = getComputedStyle(button);
        const buttonWidth = Number(removePx(buttonStyle.width));
        const buttonHeight = Number(removePx(buttonStyle.height));

        const percentage = (this.state.value - this.state.min) / (this.state.max - this.state.min);
        const offset = lineWidth * percentage;

        button.setAttribute("style", `left: ${lineX - buttonWidth/2 + offset}px; top: ${lineY - buttonHeight/2 + lineHeight/2}px`);
    }

    render() {
        return(
            <div className="slider">
                <h4>{this.props.name}</h4>
                <div ref={this.trackingElementRef} className="sliderBorder">
                    <div ref={this.lineRef} className="sliderLine">
                        <div ref={this.ballRef} className="sliderButton"></div>
                    </div>
                </div>
            </div>
        );
    }
}