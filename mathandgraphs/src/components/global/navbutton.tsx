import '../../style.scss';

import {
    Link,
} from "react-router-dom";

type NavButtonProptypes = {
    className?: string;
    text: string;
    link: string;
}


function NavButton(props: NavButtonProptypes) {
    return(
        <Link className="navButton" to={'/'+props.link}>{props.text}</Link>
    );
}

export default NavButton;
