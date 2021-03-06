import React, { Component } from "react";
import "./modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { quant: "", preco: "" };
  }
  componentWillUpdate() {
    this.refs.quantidade.value = "";
    this.refs.preco.value = "";
  }
  render() {
    const showModal = {
      display: "block"
    };
    return (
      <div
        className="modal"
        role="dialog"
        style={this.props.show ? showModal : {}}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.itemName}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.props.closeModal()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="row">
                  <div className="form-group col-sm-6">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Quantidade/Peso"
                      ref="quantidade"
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Valor Un."
                      ref="preco"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => this.props.closeModal()}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  this.props.updateItem(
                    this.props.itemIndex,
                    this.refs.quantidade.value,
                    this.refs.preco.value
                  )
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
