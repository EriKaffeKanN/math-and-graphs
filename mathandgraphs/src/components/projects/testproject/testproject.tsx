import TestCanvas from './testcanvas'

interface IProps {
    width?: number;
    height?: number;
}

export default function TestProject(props: IProps) {
    return(
        <div className="project">
            <h2>Test Project</h2>
            <TestCanvas width={props.width} height={props.height}/>
        </div>
    );
}