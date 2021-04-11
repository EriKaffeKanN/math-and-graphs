import { createRef } from 'react';
import ProjectCanvas from '../../global/projectCanvas'
import Slider from '../../global/slider'

interface IState {

}

export default class CtgCanvas extends ProjectCanvas<IState> {

    tickSpeed = 10;

    // Sliders
    zoomSlider: React.RefObject<Slider> = createRef<Slider>();

    init() {
        this.zoom = 30;
    }

    update(): void {
        const zoomValue = this.zoomSlider.current?.state.value;
        this.zoom = zoomValue === undefined ? 30: zoomValue;
        const canvas = this.reference.current!;
        const width = canvas.width;
        const height = canvas.height;

        // Drawing
        this.stroke("white");
        this.fill("white");
        this.clear();

        // X and Y axes
        this.translate(width/2, height/2);
        this.drawGrid();
        this.line(-this.width/2, 0, this.width/2, 0);
        this.line(0, this.height, 0, -this.height/2);
        this.drawIntegers();
        
        this.rect(
            Math.floor(this.getWorldMouse().x),
            Math.floor(this.getWorldMouse().y),
            1,
            1,
            true
        );

        this.resetOrigin();
    }

    renderAdditionalComponents() {
        return(
            <div className="sliderCollection">
                <Slider ref={this.zoomSlider} min={40} max={180} step={0.1} value={50} name="Zoom"/>
            </div>
        );
    }

    drawGrid() {
        const originWorld = this.getWorldPos(0, 0);
        const rightWorld = this.getWorldPos(this.width, 0).x;
        const downWorld = this.getWorldPos(0, this.height).y;
        for(let x = originWorld.x; x < rightWorld; x++) {
            const floorX = Math.floor(x);
            this.line(floorX, originWorld.y, floorX, downWorld);
        }
        for(let y = originWorld.y; y < downWorld; y++) {
            const ceilY = Math.ceil(y);
            this.line(originWorld.x, ceilY, rightWorld, ceilY);
        }
    }

    drawIntegers() {
        for(let x = this.getWorldPos(0, 0).x; x < this.getWorldPos(this.width, 0).x; x++) {
            const floorX = Math.floor(x);
            this.text(String(floorX), floorX, 0, 50);
            this.line(floorX, 10 / this.zoom, floorX, -10 / this.zoom);
        }
        for(let y = this.getWorldPos(0, 0).y; y <= this.getWorldPos(0, this.height).y; y++) {
            const ceilY = Math.ceil(y);
            this.text(String(ceilY) + "i", 0, ceilY, 50);
            this.line(10 / this.zoom, ceilY, -10 / this.zoom, ceilY);
        }
    }
}