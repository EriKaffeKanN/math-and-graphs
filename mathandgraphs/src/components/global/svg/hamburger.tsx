import '../../../style.scss'
import React from 'react'

interface IProps {

}

interface IState {
    isClicked: boolean;
}

class HamburgerSVG extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isClicked: false
        };
    }

    render() {
        const classlist = "hamburger " + (this.state.isClicked ? "hamburgerClicked" : "");

        return(
            <svg className={classlist} onClick={() => {
                this.setState(prevState => ({
                    isClicked: !prevState.isClicked
                }));
            }} width={50} height={40} viewBox="0 0 50 40" xmlns="http://www.w3.org/2000/svg">
                <g color="currentColor">
                    <rect width={50} height={10} fill="currentColor" />
                    <rect y={15} width={50} height={10} fill="currentColor" />
                    <rect y={30} width={50} height={10} fill="currentColor" />
                </g>
            </svg>
        );
    }
}

export default HamburgerSVG;