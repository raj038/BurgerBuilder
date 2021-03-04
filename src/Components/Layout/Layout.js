import React from 'react';
import Auxillary from '../../HOC/Auxillary';
import classes from './Layout.css';

const Layout= (props) =>{
    return(
        <Auxillary>
            <div>Toolbar, Sidebar, Backarrow</div>
            <main className={classes.Content}>
                {props.children}
            </main>      
        </Auxillary>
    )
}

export default Layout;