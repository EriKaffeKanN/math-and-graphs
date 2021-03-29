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
        <div className="navButton">
            <Link to={'/'+props.link}>{props.text}</Link>
        </div>
    );
}

export default NavButton;
