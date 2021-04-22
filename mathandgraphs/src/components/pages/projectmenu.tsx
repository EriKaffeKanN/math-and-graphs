import '../../style.scss'
import CTGImage from '../../img/complextransformation.png'
import FTImage from '../../img/fractaltree.png'

import ProjectDisplay from '../global/projectdisplay'

function ProjectMenu() {
    return(
        <div id="projectWrapper">
            <h2>All projects:</h2>
            <section>
                <ProjectDisplay title="Complex graph viewer" link="complexgrapher" img={CTGImage}/>
                <ProjectDisplay title="Test Project" link="testproject" />
                <ProjectDisplay title="Fractal Tree" link="fractaltree" img={FTImage}/>
            </section>
        </div>
    );
}

export default ProjectMenu;