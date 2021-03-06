import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../HOC/Auxillary';

const Sidedrawer= (props) => {
    
    let attachedClasses=[classes.Sidedrawer, classes.close];
    if(props.show)
    {
        attachedClasses=[classes.Sidedrawer, classes.open];
    }

    return(
        <Auxillary>
            <Backdrop show={props.show} clicked={props.closeSidedrawer}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%"/>
                <nav style={{marginTop: "20px"}}>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxillary>
    )
}

export default Sidedrawer;