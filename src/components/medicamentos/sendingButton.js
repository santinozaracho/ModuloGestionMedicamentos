import React from 'react';
import {Button,InputGroup,FormControl} from 'react-bootstrap';

function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
  
function updateMedicament(url,method,sendObj) {
  return new Promise(resolve => {
    
    fetch(url, { method:method, 
                redirect: 'follow',
                headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                 body: JSON.stringify(sendObj)
                })
        .then(response => {
          return resolve
          console.log(response);
          
            // HTTP 301 response
            // HOW CAN I FOLLOW THE HTTP REDIRECT RESPONSE?
        })
        .catch(function(err) {
            console.info(err + " url: " + url);
        });
  })
}


  class SendingButton extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleClick = this.handleClick.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.state = {
        isLoading: false,
        url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos',
        method:"",
        button:"",
        color:"",
        key:"",
        cantidad:""
      };
    }
    componentDidMount() {
      switch (this.props.accessMethod) {
        case "loadMed":
        this.setState({  method:"PUT",putInfo:"Load",button: "Actualizar",color:"outline-success" });
            break;
        case "controlMed":
        this.setState({  method:"PUT",putInfo:"Control",button: "Corregir",color:"outline-warning" });
            break;
        case "adminMed":
        this.setState({  method:"DELETE",button: "Borrar",color:"outline-danger" });
            break;
        default:
        //OlyView
        this.setState({ isLoading: false });
            break;
      }
    }

    handleInputChange(e) {
      const { value } = e.target;
      console.log(value);
      this.setState({
          key:value,
          cantidad:value
      });
  }

    handleClick() {
      
      this.setState({ isLoading: true }, () => {
        this.setState({key:this.props.key})
        updateMedicament(this.state.url,this.state.method,this.state).then(() => {
          this.setState({ isLoading: false });
        });
      });
    }
  
    render() {
      
      const { isLoading } = this.state;

      return (
        <InputGroup className="mb-3">
            {isLoading ? '' : 
            <FormControl width="25" value={this.state.cantidad}
              onChange = {this.handleInputChange}
                name="cantidad"
                placeholder="Cantidad"
                aria-label="Recipient's new Stock"
                aria-describedby="basic-addon"/> 
            }
            <InputGroup.Append>
                <Button variant={isLoading ? "secondary" : this.state.color}
                block
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick : null}>
                {isLoading ? 'Enviando...' : this.state.button}
                </Button>
            </InputGroup.Append>
        </InputGroup>

      );
    }
  }
 export default SendingButton;