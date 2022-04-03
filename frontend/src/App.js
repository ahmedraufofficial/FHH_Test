import React, {useState} from "react";
import { TextField, Container, makeStyles, Button, IconButton, InputLabel } from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root':{
      marginRight: "1em",
      marginBottom: "1em"
    }
  }
}))

function App() {
  const classes = useStyles()
  const [inputField, setInputField] = useState([
    { height: 0, width: 0, length: 0}
  ])
  const [response,setResponse]=useState({
    "box_size": { height: 0, width: 0, length: 0 },
    "total_products": 0
  })
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get('http://localhost:8080/get-size', { params: inputField }).then(res => setResponse(res.data));
  }

  const handleChangeInput = (index, event) => {
    const values = [...inputField];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  }

  const handleAddFields = () => {
    setInputField([...inputField, { height: 0, width: 0, length: 0}]);
  }

  const handleRemoveFields = (index) => {
    const values = [...inputField];
    values.splice(index, 1);
    setInputField(values);
  }

  return (
    <div className="App">
      <Container>
        <h1>Add product sizes</h1>
        <form className={classes.root} onSubmit={handleSubmit}>
          { inputField.map((inputField, index) => (
            <div key={index}>
              <TextField 
                name="height"
                label="Height"
                type="number"
                variant="filled"
                value={parseInt(inputField.height)}
                onChange={event => handleChangeInput(index, event)}
              />
              <TextField 
                name="width"
                label="Width"
                type="number"
                variant="filled"
                value={inputField.width}
                onChange={event => handleChangeInput(index, event)}
              />
              <TextField 
                name="length"
                label="Length"
                type="number"
                variant="filled"
                value={inputField.length}
                onChange={event => handleChangeInput(index, event)}
              />
              <IconButton
              onClick={()=>handleRemoveFields(index)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                onClick={()=>handleAddFields()}
              >
                <AddIcon />
              </IconButton>
            </div>
          ))}
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Send</Button>
        </form>
        <h1>Box Size</h1>
        <InputLabel>Height: {response.box_size.height}</InputLabel>
        <br></br>
        <InputLabel>Width: {response.box_size.width}</InputLabel>
        <br></br>
        <InputLabel>Length: {response.box_size.length}</InputLabel>
        <h1>Total Product</h1>
        <InputLabel>{response.total_products}</InputLabel>
      </Container>
    </div>
  );
}

export default App;
