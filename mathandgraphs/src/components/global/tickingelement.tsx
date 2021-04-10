import React from 'react'

abstract class TickingComponent<IProps, IState> extends React.Component<IProps, IState> {

    abstract tickSpeed: number;

    private updateComponent: number = 0;

    abstract init(): void;
    abstract update(): void;
    // Override
    protected onLoad(): void {};
    // Override
    protected onUnload(): void {};

    constructor(props: IProps) {
        super(props);
        this.init();
    }

    componentDidMount() {
        this.onLoad();
        this.updateComponent = window.setInterval(() => {
            this.update();
        }, this.tickSpeed);
    }

    componentWillUnmount() {
        window.clearInterval(this.updateComponent);
        this.updateComponent = 0;
        this.onUnload();
    }
}

export default TickingComponent;