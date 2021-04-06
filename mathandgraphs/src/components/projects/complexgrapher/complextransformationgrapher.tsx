import '../../../style.scss'
import ComplexGrapherCanvas from './ctgcanvas'

type ComplexTransformationGrapherProptypes = {
    width: number;
    height: number;
};

function ComplexTransformationGrapher(props: ComplexTransformationGrapherProptypes) {
    return(
        <div className="project">
            <h2>Complex Transformations</h2>
            <ComplexGrapherCanvas width={900} height={400} />
        </div>
    );
}

export default ComplexTransformationGrapher;