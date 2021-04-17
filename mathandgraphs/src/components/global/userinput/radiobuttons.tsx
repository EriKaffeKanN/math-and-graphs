import React from 'react'
import OptionsForm from './optionsform'

export default class RadioButtons extends OptionsForm {

    buttonType = "radio";

    // TODO: Make this actually change value, add to state
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value);
    }
}