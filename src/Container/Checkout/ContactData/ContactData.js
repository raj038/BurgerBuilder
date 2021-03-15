import React , {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../Components/UI/Button/Button';
import axios from '../../../axiosOrder';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component{
    state={
        orderForm:{
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: '',
                valid: false,
                validation:{
                    required: true
                },
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email"
                },
                value: '',
                valid: false,
                validation:{
                    required: true
                },
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: '',
                valid: false,
                validation:{
                    required: true
                },
                touched: false
            },
            street : {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: '',
                valid: false,
                validation:{
                    required: true
                },
                touched: false
            },
            ZipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Zip-Code"
                },
                value: '',
                valid: false,
                validation:{
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [{
                        value: "fastest", displayValue: "Fastest"
                    },{
                        value: "cheapest", displayValue: "Cheapest"
                    }]
                },
                value: 'fastest',
                valid: true,
                validation: {}
            }
        },
        formIsValid: false,
        showLoader: false
    }

    orderHandler = (event)=>{
        event.preventDefault();
            
        let formData={};
        for(let key in this.state.orderForm)
        {
            formData[key]=this.state.orderForm[key].value;
        }

        this.setState({
            showLoader: true
        });
        const data={
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', data)
            .then( response =>{
                this.setState({
                    showLoader: false
                });
                this.props.history.push('/');
            })
            .catch( error=>{
                this.setState({
                    showLoader: false
                });
            });
    }

    checkValidity= (rules, value)=>{
        let isValid=true;

        if(rules.required)
        {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength)
        {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength)
        {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler= (event, inputIdentifier)=>{
        let updatedOrderForm= {...this.state.orderForm};
        let updatedInputForm= {...updatedOrderForm[inputIdentifier]};

        updatedInputForm.value=event.target.value;
        updatedInputForm.valid=this.checkValidity(updatedInputForm.validation, updatedInputForm.value);
        updatedInputForm.touched=true;

        updatedOrderForm[inputIdentifier]=updatedInputForm;
        let formValid=true;
        for(let key in updatedOrderForm)
        {
            formValid= updatedOrderForm[key].valid && formValid;
        }
        console.log(updatedOrderForm);
        this.setState({
            orderForm: updatedOrderForm , formIsValid: formValid
        });

    }

    render()
    {
        let formElments=[];
        for(let key in this.state.orderForm)
        {
            formElments.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form=(
            <form onSubmit={this.orderHandler} >
                {formElments.map( item=>{
                    return <Input key={item.id}
                    elementType={item.config.elementType} 
                    value={item.config.value}
                    elementConfig={item.config.elementConfig}
                    inValid={!item.config.valid}
                    shouldValidate={item.config.validation}
                    touched= {item.config.touched}
                    changed={(event) => this.inputChangeHandler(event,item.id)}/>
                } )}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );

        if(this.state.showLoader)
        {
            form=<Spinner/>
        }

        return(
            <div className={classes.ContactData}>
                <h3>Enter Your Contact Data</h3>
                {form}               
            </div>
        )
    }
}

export default ContactData;