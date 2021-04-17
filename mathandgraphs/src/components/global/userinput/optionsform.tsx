import React, { ChangeEvent } from 'react'
import '../../../style.scss'

interface IProps {
    topic: string;
    options: Array<string>;
}

interface IState extends IProps {
    input?: Map<string, boolean>;
}

export default abstract class OptionsForm extends React.Component<IProps, IState> {

    abstract buttonType: string;

    constructor(props: IProps) {
        super(props);
        this.state = {...props};
        this.handleChange = this.handleChange.bind(this);
    }

    abstract handleChange(event: ChangeEvent): void;

    getInputNodes(buttonType: string) {
        return(
            this.state.options.map(option => {
                return(
                    <label key={option}>
                        <span>{option}</span>
                        <input type={buttonType} name={option}  onChange={this.handleChange}/>
                    </label>
                );
            })
        );
    }

    render() {
        return(
            <form className="radioButtons">
                {this.getInputNodes(this.buttonType)}
            </form>
        );
    }
}