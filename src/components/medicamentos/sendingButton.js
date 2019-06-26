import React from 'react';
import {Button,InputGroup,Input,Row,Col,Spinner} from 'reactstrap';

  class SendingButton extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        isLoading: false,
        loadingError:'',
        isCommon:true,
        url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app',
        method:'GET',
        buttonText:'EMPTY',
        color:'info',
        cantidad:''
      };
    }
    componentDidMount() {
      switch (this.props.accessMethod) {
        case "loadMed":
        this.setState({ isCommon:true,method:"PUT",buttonText: "Actualizar",color:"success",url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos/load'});
            break;
        case "controlMed":
        this.setState({ isCommon:true,method:"PUT",buttonText: "Corregir",color:"warning",url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos/control' });
            break;
        case "adminMed":
        this.setState({ isCommon:false,method:"DELETE",buttonText: "Borrar",color:"danger",url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos' });
            break;
        case "adminAss":
        this.setState({ isCommon:false,method:"DELETE",buttonText: "Borrar",color:"danger",url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/asignaciones' })
            break;
        default:
        this.setState({ isCommon:false })
        //OlyView
            break;
      }
      this.setState({ isLoading: false });
    }

    updateMedicament = async () => {
      let {method,cantidad,url} = this.state;
      let {id} = this.props
      return await fetch(url+'/'+id, { method, redirect: 'follow',
                  headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                    body: JSON.stringify({cantidad})});
    }

    handleInputChange = e => Number(e.target.value)>=0 && this.setState({cantidad:e.target.value});

    handleClick = async e => {
      this.setState({ isLoading: true }); 
      let response = await this.updateMedicament();
      if (response.ok) {
        this.setState({cantidad:'',isLoading:false});
        this.props.onListenEv(e);
      }else{
        this.setState({loadingError:"ERROR:"+response.status})
        console.log(response);
      }
    }
  
    render() {
      let { isLoading, isCommon, buttonText, color, cantidad,loadingError } = this.state;
     
      let inputCant = <Input required className="w-25" value={cantidad} onChange = {this.handleInputChange} name="cantidad" placeholder="Cantidad"/>
      
      let loadingSpinner = loadingError? loadingError:<Spinner type='grow' size={'sm'} />

      let buttonInput = <InputGroup>{!isLoading && inputCant}
          <Button outline className={!isLoading && "w-75"} block color={isLoading ? "secondary" : color} disabled={isLoading} 
          onClick={!isLoading ? this.handleClick : null}>{isLoading ? loadingSpinner : buttonText}</Button>
        </InputGroup>

      let buttonSingle = <Button outline color={isLoading ? "secondary" : color} disabled={isLoading}
                          block onClick={!isLoading ? this.handleClick : null}> {isLoading ? loadingSpinner : buttonText} </Button>
    
      return (<Row className='mx-auto'><Col>{isCommon? buttonInput: buttonSingle}</Col></Row>);
    }
  }
 export default SendingButton;