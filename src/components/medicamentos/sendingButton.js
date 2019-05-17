import React from 'react';
import {Button,InputGroup,FormControl} from 'react-bootstrap';

// function simulateNetworkRequest() {
//     return new Promise(resolve => setTimeout(resolve, 2000));
//   }
  
function updateMedicament(url,method,sendObj) {
  return new Promise(resolve => {
    
    console.log(sendObj);
    fetch(url, { method:method, 
                redirect: 'follow',
                headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                 body: JSON.stringify(sendObj)
                })
        .then(response => {
          console.log(response);  
            // HTTP 301 response
            // HOW CAN I FOLLOW THE HTTP REDIRECT RESPONSE?
        })
        .catch(function(err) {
            console.info(err + " url: " + url);
        });
    setTimeout(resolve, 100)})
}


  class SendingButton extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleClick = this.handleClick.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.state = {
        isLoading: false,
        isCommon:true,
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
        this.setState({ isCommon:true,method:"PUT",putInfo:"Load",button: "Actualizar",color:"outline-success" });
            break;
        case "controlMed":
        this.setState({ isCommon:true,method:"PUT",putInfo:"Control",button: "Corregir",color:"outline-warning" });
            break;
        case "adminMed":
        this.setState({ isCommon:false,method:"DELETE",button: "Borrar",color:"outline-danger" });
            break;
        case "adminAss":
        this.setState({ isCommon:false,method:"DELETE",button: "Borrar",color:"outline-danger",url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/asignaciones' })
            break;
        default:
        this.setState({ isCommon:false,method:"GET",button: "No hace nada Jeje",color:"outline-primary",url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app' })
        //OlyView
            break;
      }
      this.setState({ isLoading: false });
    }

    handleInputChange(e) {
      const { value } = e.target;
      console.log(value);
      this.setState({
          cantidad:value
      });
  }

    handleClick(e) {
      this.setState({ isLoading: true }, async () => {
        let sendObj = this.state;
        sendObj.docRef = this.props.docRef;
        await updateMedicament(this.state.url,this.state.method,sendObj).then( (resp) => {
          this.setState({cantidad:'',isLoading:false});
          setTimeout(this.props.onListenEv(e),50); 
        })
      });
    }
  
    render() {
      
      const { isLoading } = this.state;
      const { isCommon } = this.state;

      return (
        <div>
        {isCommon ? 
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
        : 
        <InputGroup className="mb-3">
          <Button variant={isLoading ? "secondary" : this.state.color}
          block
          disabled={isLoading}
          onClick={!isLoading ? this.handleClick : null}>
          {isLoading ? 'Enviando...' : this.state.button}
          </Button>
        </InputGroup>}
        </div>
      );
    }
  }
 export default SendingButton;