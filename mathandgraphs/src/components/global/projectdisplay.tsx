import { JsxElement } from 'typescript';
import '../../style.scss'

import NavButton from './navbutton';

type ProjectDisplayProptypes = {
    title: string;
    img?: JsxElement;
};

function ProjectDisplay(props: ProjectDisplayProptypes) {
    return(
        <div className="projectDisplay">
            <h3>{props.title}</h3>
            <figure>{props.img}</figure>
            <NavButton text="Open" link="ProjectLink" />
        </div>
    );
}

export default ProjectDisplay;