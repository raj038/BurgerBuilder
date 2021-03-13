import React, {Component} from 'react';
import  {Route} from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import Checkout from './Container/Checkout/Checkout';
import Orders from './Container/Orders/Orders';

class App extends Component{
    render(){
        return(
            <div>
                <Layout>
                    <Route path='/' exact component={BurgerBuilder} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders}/>
                </Layout>
            </div>
        )
    }
}

export default App;
