import FractalTreeCanvas from './fractaltreecanvas';

interface IProps {
    width?: number;
    height?: number;
}

export default function FractalTree(props: IProps) {
    return(
        <div className="project">
            <h2>Fractal Tree</h2>
            <FractalTreeCanvas width={props.width} height={props.height} />
        </div>
    );
}