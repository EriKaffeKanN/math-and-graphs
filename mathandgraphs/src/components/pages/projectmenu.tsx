import '../../style.scss'

import ProjectDisplay from '../global/projectdisplay'

function ProjectMenu() {
    return(
        <div id="projectWrapper">
            <h2>All projects:</h2>
            <ProjectDisplay title="Complex graph viewer" link="complexgrapher"/>
        </div>
    );
}

export default ProjectMenu;