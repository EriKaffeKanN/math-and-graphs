import React from 'react'

abstract class TickingComponent<IProps, IState> extends React.Component<IProps, IState> {

    abstract tickSpeed: number;

    private updateComponent: number = 0;

    abstract init(): void;
    abstract update(): void;
    abstract onLoad(): void;
    abstract on

    constructor(props: IProps) {
        super(props);
        this.init();
    }

    componentDidMount() {
        this.updateComponent = window.setInterval(() => {
            this.update();
        }, this.tickSpeed);
    }

    componentWillUnmount() {
        window.clearInterval(this.updateComponent);
        this.updateComponent = 0;
    }
}

export default TickingComponent;