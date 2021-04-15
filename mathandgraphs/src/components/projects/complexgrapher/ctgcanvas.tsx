import { createRef } from 'react';
import ComplexNumber from '../../../util/math/complexnumber';
import ProjectCanvas from '../../global/projectCanvas'
import Slider from '../../global/slider'

interface IState {

}

export default class CtgCanvas extends ProjectCanvas<IState> {

    tickSpeed = 10;
    
    complexNumberDistance = 1;
    complexNumbers: ComplexNumber[][] = [];

    primaryColor: string = "white";

    // Sliders
    zoomSlider: React.RefObject<Slider> = createRef<Slider>();

    init() {
        this.zoom = 30;
    }

    onLoad() {
        super.onLoad();

        // init complex numbers
        const w = 20;
        const h = 20;

        const ReOffset = Math.floor(w / -2) * this.complexNumberDistance;
        const ImOfsset = Math.floor(h / -2) * this.complexNumberDistance;
        for(let x = 0; x <= w; x += 1) {
            this.complexNumbers.push([]);
            const Re = x * this.complexNumberDistance;
            for(let y = 0; y <= h; y += 1) {
                const Im = y * this.complexNumberDistance;
                this.complexNumbers[x].push(new ComplexNumber(Re + ReOffset, Im + ImOfsset));
            }
        }

        this.transform();
    }

    transform() {
        // !!! --- IMPORTANT ---  !!! //
        // Hard coded transformation goes here: (for now)
        // !!! --- IMPORTANT --- !!! //
        this.complexNumbers.forEach(ary => ary.forEach(z => {
            z.square();
            z.divideN(7);
        }));
    }

    update(): void {
        const zoomValue = this.zoomSlider.current?.state.value;
        this.zoom = zoomValue === undefined ? 30: zoomValue;

        // Drawing
        this.stroke(this.primaryColor);
        this.fill(this.primaryColor);
        this.clear();

        this.drawBackground();   
        this.drawComplexNumbers("red");         

        this.resetOrigin();
    }

    drawComplexNumbers(color: string) {
        this.stroke(color);
        this.fill(color);
        this.complexNumbers.forEach(arr => arr.forEach(z => {
            this.rect(z.a - (5 / this.zoom), z.b - (5 / this.zoom), 10 / this.zoom, 10 / this.zoom, true);
        }));
        this.stroke(this.primaryColor);
        this.fill(this.primaryColor);
    }

    drawBackground() {
        // X and Y axes
        this.translate(this.width/2, this.height/2);
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
    }

    renderAdditionalComponents() {
        return(
            <div className="sliderCollection">
                <Slider ref={this.zoomSlider} min={10} max={180} step={0.1} value={50} name="Zoom"/>
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