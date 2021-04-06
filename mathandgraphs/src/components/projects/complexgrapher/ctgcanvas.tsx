import { createRef } from 'react';
import ProjectCanvas from '../../global/projectCanvas'
import Slider from '../../global/slider'

interface IState {

}

export default class CtgCanvas extends ProjectCanvas<IState> {
    
    updateSpeed: number = 5;

    // Sliders
    zoomSlider: React.RefObject<Slider> = createRef<Slider>();

    init() {
        this.zoom = 30;
    }

    update(): void {
        const canvas = this.reference.current!;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const width = canvas.width;
        const height = canvas.height;

        // Drawing
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.clearRect(0, 0, width, height);

        // X and Y axes
        this.translate(width/2, height/2);
        this.line(-this.width/2, 0, this.width/2, 0, ctx);
        this.line(0, this.height, 0, -this.height/2, ctx);
        this.drawIntegers(ctx);
        
        this.line(0, 0, this.getWorldMouse().x, this.getWorldMouse().y, ctx);
    }

    renderAdditionalComponents() {
        return(
            <div className="sliderCollection">
                <Slider ref={this.zoomSlider} min={5} max={50} step={0.1} value={5} name="Zoom"/>
            </div>
        );
    }

    drawIntegers(ctx: CanvasRenderingContext2D) {
        for(let x = this.getWorldPos(0, 0).x; x < this.getWorldPos(this.width, 0).x; x += 1) {
            const floorX = Math.floor(x);
            this.text(String(floorX), floorX, 0, 50, ctx);
            this.line(floorX, 10 / this.zoom, floorX, -10 / this.zoom, ctx);
        }
    }
}