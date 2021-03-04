import React, { Component } from 'react';
import Auxillary from '../../HOC/Auxillary';

class BurgerBuilder extends Component {

    render(){
        return(
            <Auxillary>
                <div>Burger</div>
                <div>Burger Control</div>
            </Auxillary>
        )
    }
}

export default BurgerBuilder;