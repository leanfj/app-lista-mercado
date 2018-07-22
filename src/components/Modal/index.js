import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  constructor(props){
    super(props)
    this.state = {
      display: 'block'
    }
  }
  render () {
    const showModal = {
      display: 'block'
    }
    return (
      <div className="modal" role="dialog" style={ this.props.show ? showModal : {}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.props.closeModal()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.props.closeModal()}>Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;