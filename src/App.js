import React, { Component } from 'react';
import './App.css';

const dados = (localStorage.getItem('lista') ? JSON.parse(localStorage.getItem('lista')) : []);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.renderItems = this.renderItems.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      items: JSON.parse(localStorage.getItem('lista'))
    }
    );
  }

  renderItems(argItem, argIndex) {
    return (
      <tr key={argIndex}>
        <td>{argItem.item}</td>
        <td>{argItem.quantidade}</td>
        <td>R$ {argItem.valorUnitario}</td>
        <td>R$ {argItem.valorTotal}</td>
        <td onClick={this.removeItem}><i className="fas fa-trash-alt red"></i></td>
      </tr>
    )
  }

  addNewItem() {
    const newItem = {
      item: this.refs.item.value,
      quantidade: this.refs.quantidade.value,
      valorUnitario: this.refs.valorUnitario.value,
      valorTotal: (this.refs.valorUnitario.value * this.refs.quantidade.value).toFixed(2),
    }

    dados.push(newItem);
    localStorage.setItem('lista', JSON.stringify(dados));
    this.setState({
      items: JSON.parse(localStorage.getItem('lista'))
    });

    this.refs.item.value = '';
    this.refs.quantidade.value = '';
    this.refs.valorUnitario.value = '';
  }

  removeItem (argIndex) {
    dados.splice(argIndex, 1);
    localStorage.setItem('lista', JSON.stringify(dados));
    this.setState({
      items: JSON.parse(localStorage.getItem('lista'))
    });
  }
  

  render() {
    let totalCompra = 0;
    if (this.state.items) {
      this.state.items.map((item) => {
        return totalCompra += parseFloat(item.valorTotal);
      });
    }

    return (
      <div className="container">
        <h1>Lista de Compras</h1>
        <table className="table table-striped table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Item</th>
              <th>Un./Peso</th>
              <th>Valor Un.</th>
              <th>Valor Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.items ? this.state.items.map(this.renderItems) : ''}
          </tbody>
        </table>
        <div className="total__compra text-light bg-dark d-flex justify-content-center">
          Total Compra R$ {totalCompra.toFixed(2)}
        </div>
        <div className="add-item">
          <h5 className="text-center">Adcionar novo item</h5>
          <form action="">
            <div className="form-group">
              <input className="form-control" type="text" ref="item" placeholder="Item" />
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
                <input className="form-control" type="text" ref="quantidade" placeholder="quantidade" />
              </div>
              <div className="form-group col-sm-6">
                <input className="form-control" type="text" ref="valorUnitario" placeholder="Valor Un" />
              </div>
            </div>
            <button type="button" value="submit" onClick={this.addNewItem}className="btn btn-primary"> Adcionar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
