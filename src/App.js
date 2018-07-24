import React, { Component } from "react";
import "./App.css";

//Components
import Modal from "./components/Modal";

const dados = localStorage.getItem("lista")
  ? JSON.parse(localStorage.getItem("lista"))
  : [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      modalShow: false,
      itemIndex: "",
      itemName: "",
      itemQuant: "",
      itemPrice: ""
    };

    this.renderItems = this.renderItems.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  componentDidMount() {
    this.setState({
      items: JSON.parse(localStorage.getItem("lista"))
    });
  }

  renderItems(argItem, argIndex) {
    return (
      <tr key={argIndex}>
        <td>{argItem.item}</td>
        <td>{argItem.quantidade}</td>
        <td>R$ {argItem.valorUnitario}</td>
        <td>R$ {argItem.valorTotal}</td>
        <td onClick={() => this.removeItem(argIndex)}>
          <i className="fas fa-trash-alt" />
        </td>
        <td
          onClick={() =>
            this.openModal(
              argIndex,
              argItem.item,
              argItem.quantidade,
              argItem.valorUnitario
            )
          }
        >
          <i className="fas fa-pencil-alt" />
        </td>
      </tr>
    );
  }

  openModal(index, item, quant, price) {
    this.setState({
      modalShow: true,
      itemIndex: index,
      itemName: item,
      itemQuant: quant,
      itemPrice: price
    });
  }

  closeModal() {
    this.setState({ modalShow: false });
  }

  addNewItem() {
    const newItem = {
      item: this.refs.item.value,
      quantidade: this.refs.quantidade.value,
      valorUnitario: this.refs.valorUnitario.value,
      valorTotal: (
        this.refs.valorUnitario.value * this.refs.quantidade.value
      ).toFixed(2)
    };

    dados.push(newItem);
    localStorage.setItem("lista", JSON.stringify(dados));
    this.setState({
      items: JSON.parse(localStorage.getItem("lista"))
    });

    this.refs.item.value = "";
    this.refs.quantidade.value = "";
    this.refs.valorUnitario.value = "";
  }

  removeItem(argIndex) {
    dados.splice(argIndex, 1);
    localStorage.setItem("lista", JSON.stringify(dados));
    this.setState({
      items: JSON.parse(localStorage.getItem("lista"))
    });
  }
  updateItem(index, quant, price) {
    console.log(dados);
    dados[index].quantidade = quant;
    dados[index].valorUnitario = price;
    dados[index].valorTotal = (quant * price).toFixed(2);
    localStorage.setItem("lista", JSON.stringify(dados));
    this.setState({
      items: JSON.parse(localStorage.getItem("lista"))
    });
    this.closeModal();
  }
  render() {
    let totalCompra = 0;
    if (this.state.items) {
      this.state.items.map(item => {
        return (totalCompra += parseFloat(item.valorTotal));
      });
    }

    return (
      <div className="container">
        <h1 className="app__title">Lista de Compras</h1>
        <table className="table table-striped table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Item</th>
              <th>Un./Peso</th>
              <th>Valor Un.</th>
              <th>Valor Total</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.items ? this.state.items.map(this.renderItems) : ""}
          </tbody>
        </table>
        <div className="total__compra text-light bg-dark d-flex justify-content-center">
          Total Compra R$ {totalCompra.toFixed(2)}
        </div>
        <Modal
          show={this.state.modalShow}
          itemIndex={this.state.itemIndex}
          itemName={this.state.itemName}
          itemQuant={this.state.itemQuant}
          itemPrice={this.state.itemPrice}
          closeModal={this.closeModal}
          updateItem={this.updateItem}
        />
        <div className="add-item">
          <h5 className="text-center">Adcionar novo item</h5>
          <form action="">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                ref="item"
                placeholder="Item"
              />
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
                <input
                  className="form-control"
                  type="number"
                  ref="quantidade"
                  placeholder="Quantidade/Peso"
                />
              </div>
              <div className="form-group col-sm-6">
                <input
                  className="form-control"
                  type="number"
                  ref="valorUnitario"
                  placeholder="Valor Un."
                />
              </div>
            </div>
            <button
              type="button"
              value="submit"
              onClick={this.addNewItem}
              className="btn btn-primary"
            >
              {" "}
              Adcionar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
