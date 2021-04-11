import '../../../style.scss'
import ComplexGrapherCanvas from './ctgcanvas'

type ComplexTransformationGrapherProptypes = {
    width?: number;
    height?: number;
};

function ComplexTransformationGrapher(props: ComplexTransformationGrapherProptypes) {
    return(
        <div className="project">
            <h2>Complex Transformations</h2>
            <ComplexGrapherCanvas width={props.width} height={props.height} />
        </div>
    );
}

export default ComplexTransformationGrapher;