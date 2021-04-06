import HamburgerSVG from './svg/hamburger'
import '../../style.scss'

function Header() {
    return(
        <header className="globalHeader">
            <h3>Erik Andersson</h3>
            <nav>
            </nav>
            <HamburgerSVG navElements={
                <div className="navMenu">
                    <span className="navElement">Om</span>
                    <span className="navElement">Kontakt</span>
                </div>
            } />
        </header>
    );
}

export default Header;