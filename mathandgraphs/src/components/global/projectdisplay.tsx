import '../../style.scss'

import NavButton from './navbutton';

interface ProjectDisplayProptypes {
    title: string;
    link: string;
    img?: string;
}

function ProjectDisplay(props: ProjectDisplayProptypes) {
    return(
        <div className="projectDisplay">
            <h3>{props.title}</h3>
            <figure><img src={props.img} alt={props.title}/></figure>
            <NavButton text="Open" link={"projects/" + props.link} />
        </div>
    );
}

export default ProjectDisplay;