import React from 'react';
import classes from './Button.css';

const Button= (props) =>{
    return(
        <button onClick={props.clicked} 
        disabled={props.disabled ? props.disabled : false}
        className={ [classes.Button, classes[props.btnType]].join(' ')}>
        {props.children}</button>
    )
}

export default Button;