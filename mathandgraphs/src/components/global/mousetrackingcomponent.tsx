import React from 'react'
import TickingElement from './tickingelement'
import Vector2 from './interfaces/vector2'

abstract class MouseTrackingComponent<IProps, IState> extends TickingElement<IProps, IState> {
    
    protected mouse: Vector2 = {x: 0, y: 0};
    abstract trackingElementRef: React.RefObject<any>;

    private track(e: MouseEvent) {
        console.log("Actually tracking");
        const bodyRect = document.body.getBoundingClientRect();
        const componentRect = this.trackingElementRef.current!.getBoundingClientRect();

        const componentPos: Vector2 = {
            x: componentRect.left - bodyRect.left,
            y: componentRect.top - bodyRect.top
        }

        this.mouse = {
            x: e.clientX - componentPos.x,
            y: e.clientY - componentPos.y
        }
    }

    protected startTracking() {
        // Soo... this doesnt work unless I use the question mark.
        // It also stops working if i doesn't specify a type for the parameter "e"
        // Also the type React.RefObject<any> does not have to have addEventListener as a method
        // I thought typescript would make things like these easier...
        this.trackingElementRef.current?.addEventListener("mousemove", (e: MouseEvent) => {
            this.track(e);
        });
    }

    protected stopTracking() {
        this.trackingElementRef.current?.removeEventListener("mousemove", (e: MouseEvent) => {
            this.track(e);
        });
    }
}

export default MouseTrackingComponent;