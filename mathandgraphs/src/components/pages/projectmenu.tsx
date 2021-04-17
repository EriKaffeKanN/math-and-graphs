import '../../style.scss'
import CTGImage from '../../img/complextransformation.png'

import ProjectDisplay from '../global/projectdisplay'

function ProjectMenu() {
    return(
        <div id="projectWrapper">
            <h2>All projects:</h2>
            <ProjectDisplay title="Complex graph viewer" link="complexgrapher" img={CTGImage}/>
        </div>
    );
}

export default ProjectMenu;