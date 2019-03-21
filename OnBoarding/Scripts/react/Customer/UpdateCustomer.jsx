import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class UpdateCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {

            //CustomerId: '',
            //CustomerName: '',
            //CustomerAddress: '',
        };

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.setState({ showUpdateModal: false });
        window.location.reload()
    }

    render() {
        return (
            <React.Fragment>


                <Modal open={this.props.showUpdateModal} onClose={this.props.onClose} size='small'>

                    <Modal.Header> Edit Customer </Modal.Header>
                    <Modal.Content>
                        <form className="ui form segment">
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="CustomerName" placeholder={this.props.CustomerName} defaultValue={this.props.Name} onChange={this.props.onChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type="text" name="CustomerAddress" placeholder={this.props.CustomerAddress} defaultValue={this.props.Address} onChange={this.props.onChange} />
                            </Form.Field>

                        </form>
                    </Modal.Content>
                    <Modal.Actions>

                        <button className="ui secondary button" onClick={this.props.onClose}>Cancel</button>
                        <button className="ui blue button" onClick={this.props.onUpdateSubmit}>Update <i className="check icon"></i></button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>

        )
    }
}