import React, {Component} from 'react';
import Auxillary from '../../HOC/Auxillary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    
    state={
        showSidedrawer: false
    }

    closeSidedrawerHandler= () =>{
        this.setState({
            showSidedrawer: false
        });
    }

    SidedrawerToggleHandler= () =>{
        this.setState((prevProps)=>{
            return {showSidedrawer: !prevProps.showSidedrawer}
        });
    }

    render(){
        return(
            <Auxillary>
                <Toolbar sidedrawerToggler={this.SidedrawerToggleHandler}/>
                <Sidedrawer show={this.state.showSidedrawer}
                closeSidedrawer={this.closeSidedrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>      
            </Auxillary>
        )
    }
}

export default Layout;