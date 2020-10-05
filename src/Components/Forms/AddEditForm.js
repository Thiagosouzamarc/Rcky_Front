import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import InputMask from 'react-input-mask';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    nome: '',
    endereço: '',
    dataNascimento: '',
    salario: '',
    genero: '',
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    let array = [];
    e.preventDefault()
    fetch('https://localhost:44331/api/Funcionarios/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: this.state.nome,
        endereco: this.state.endereco,
        dataNascimento: this.state.dataNascimento,
        salario: this.state.salario,
        genero: this.state.genero,
      })
    })
      .then(response => response.json())
      .then(item => {
        if(item) {
          this.props.addItemToState(item)
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(`https://localhost:44331/api/Funcionarios/${this.state.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        nome: this.state.nome,
        endereco: this.state.endereco,
        dataNascimento: this.state.dataNascimento,
        salario: this.state.salario,
        genero: this.state.genero
      })
    })
    .then(response => response.json())

    .then(item => {
        if(item) {
          // console.log(item[0])
          this.props.updateState(item)
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, nome, endereco, dataNascimento, salario, genero } = this.props.item
      this.setState({ id, nome, endereco, dataNascimento, salario, genero })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input type="text" name="nome" id="nome" onChange={this.onChange} value={this.state.nome || ''} />
        </FormGroup>
        <FormGroup>
          <Label for="endereco">Endereço</Label>
          <Input type="text" name="endereco" id="endereco" onChange={this.onChange} value={this.state.endereco || ''}  />
        </FormGroup>
        <FormGroup>
        <Label for="dataNascimento">Data de Nascimento</Label>
          <Input type="text" name="dataNascimento" id="dataNascimento" onChange={this.onChange} value={this.state.dataNascimento || ''}  />
        </FormGroup>
        <FormGroup>
          <Label for="salario">Salario</Label>
          <Input type="text" name="salario" id="salario" onChange={this.onChange} value={this.state.salario || ''} />
        </FormGroup>
        <FormGroup>
          <Label for="genero">Gênero</Label>
          <Input type="text" name="genero" id="location" onChange={this.onChange} value={this.state.genero || ''} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm