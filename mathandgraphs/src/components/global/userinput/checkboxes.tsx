import React from 'react'
import OptionsForm from './optionsform'

interface IProps {
    topic: string;
    options: Array<string>;
}

export default class CheckBoxes extends OptionsForm {

    buttonType = "checkbox";

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const prevMap = this.state.input;
        let valueMap: Map<string, boolean>;
        const key = event.target.getAttribute("name")!;
        if(prevMap != undefined){
            valueMap = prevMap;
            const value = prevMap.get(key);
            valueMap.set(key, !value)
        }
        else {
            valueMap = new Map<string, boolean>();
            valueMap.set(key, true);
        }
        this.setState({input: valueMap});
    }
}