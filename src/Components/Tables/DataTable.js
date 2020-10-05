import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal';
import Moment from 'moment';

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(`https://localhost:44331/api/Funcionarios/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  uppercase(string) {
    return string.charAt(0).toUppercase() + string.slice(1);
  }

  render() {
    
    const items = this.props.items.map(item => {
      item.dataNascimento = Moment(item.dataNascimento).format("DD-MM-YYYY")
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.nome}</td>
          <td>{item.endereco}</td>
          <td>{item.dataNascimento}</td>
          <td>{'R$' + item.salario.toLocaleString('pt-BR')}</td>
          <td>{item.genero}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Data de Nascimento</th>
            <th>Salário</th>
            <th>Gênero</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable