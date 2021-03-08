import React, { Component } from 'react';
import Auxillary from '../Auxillary';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler= ( Wrapped, axios) =>{
    return class extends Component {   
        state={ error: null}

        errorHandler= () =>{
            this.setState({
                error: null
            })
        }        

        componentDidMount(){
            this.reqInterceptor=axios.interceptors.request.use( reqConfig=>{
                this.setState({
                    error: null
                })
                return reqConfig;
            });
            this.resInterceptor=axios.interceptors.response.use( response => response,error=>{
                this.setState({
                    error: error
                })
            });
        }
        
        componentWillUnmount (){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render(){
            
            return(
                <Auxillary>
                    <Modal show={this.state.error} purchaseCancel={this.errorHandler}>
                        <p>{this.state.error? this.state.error.message : null}</p>
                    </Modal>
                    <Wrapped {...this.props}/>
                </Auxillary>
            )
        }
    } 
}

export default withErrorHandler;
