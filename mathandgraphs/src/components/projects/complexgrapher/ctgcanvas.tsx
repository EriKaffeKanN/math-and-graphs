import { createRef } from 'react';
import ComplexNumber from '../../../util/math/complexnumber';
import ProjectCanvas from '../../global/projectCanvas'
import Slider from '../../global//userinput/slider'
import CheckBoxes from '../../global/userinput/checkboxes';

interface IState {}

export default class CtgCanvas extends ProjectCanvas<IState> {

    tickSpeed = 10;
    
    complexNumberDistance = 1;
    complexNumbers: ComplexNumber[][] = [];

    primaryColor: string = "white";

    // Options
        // Sliders
    zoomSlider: React.RefObject<Slider> = createRef<Slider>();
        // Checkboxes
    displayOptions: React.RefObject<CheckBoxes> = createRef<CheckBoxes>();

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

    getDisplayOption(option: string) {
        const displayOptions = this.displayOptions.current?.state.input;
        return displayOptions?.get(option) === undefined ? false : displayOptions.get(option);
    }

    update(): void {
        const zoomValue = this.zoomSlider.current?.state.value;
        this.zoom = zoomValue === undefined ? 30: zoomValue;

        // Drawing
        this.stroke(this.primaryColor);
        this.fill(this.primaryColor);
        this.clear();

        this.drawBackground();
        if(this.getDisplayOption("Dots")){
            this.drawComplexNumbers("red");
        }     

        this.resetOrigin();
    }

    dot(posX: number, posY: number) {
        this.rect(posX - (5 / this.zoom), posY - (5 / this.zoom), 10 / this.zoom, 10 / this.zoom, true);
    }

    drawComplexNumbers(color: string) {
        this.stroke(color);
        this.fill(color);
        this.complexNumbers.forEach(arr => arr.forEach(z => {
            this.dot(z.a, z.b);
        }));
        this.stroke(this.primaryColor);
        this.fill(this.primaryColor);
    }

    drawBackground() {
        // X and Y axes
        this.translate(this.width/2, this.height/2);
        if(this.getDisplayOption("Coordinate Lines"))
            this.drawGrid();
        if(this.getDisplayOption("Transformed Lines"))
            this.drawTransformedGrid();
        this.line(-this.width/2, 0, this.width/2, 0);
        this.line(0, this.height, 0, -this.height/2);
        this.drawIntegers();
        
        this.dot(Math.round(this.getWorldMouse().x), Math.round(this.getWorldMouse().y));
    }

    renderAdditionalComponents() {
        return(
            <div className="sliderCollection">
                <Slider ref={this.zoomSlider} min={10} max={180} step={0.1} value={50} name="Zoom"/>
                <CheckBoxes ref={this.displayOptions} topic="Transformation type" options={[
                    "Dots",
                    "Transformed Lines",
                    "Coordinate Lines"
                ]}/>
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

    drawTransformedGrid() {
        for(let x = 0; x < this.complexNumbers.length; x++) {
            for(let y = 0; y < this.complexNumbers[x].length - 1; y++) {
                const c1 = this.complexNumbers[x][y];
                const c2 = this.complexNumbers[x][y + 1];
                this.line(c1.a, c1.b, c2.a, c2.b);
            }
        }
        for(let x = 0; x < this.complexNumbers.length - 1; x++) {
            for(let y = 0; y < this.complexNumbers[x].length; y++) {
                const c1 = this.complexNumbers[x][y];
                const c2 = this.complexNumbers[x + 1][y];
                this.line(c1.a, c1.b, c2.a, c2.b);
            }
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