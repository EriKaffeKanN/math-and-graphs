import HamburgerSVG from './svg/hamburger'
import '../../style.scss'

function Header() {
    return(
        <header className="globalHeader">
            <h3>Erik Andersson</h3>
            <nav>
                <span>Om</span>
                <span>Kontakt</span>
            </nav>
            <HamburgerSVG />
        </header>
    );
}

export default Header;