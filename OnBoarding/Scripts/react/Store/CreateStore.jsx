﻿import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';
import { win32 } from 'path';

export default class CreateStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
            StoreName: '',
            StoreAddress: '',

            Success: [],
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    validateForm() {
        let errors = {}

        let formIsValid = true
        if (!this.state.StoreName) {
            formIsValid = false;
            errors['StoreName'] = "Please enter Store name.";
        }
        if (typeof this.state.StoreName !== "undefined") {
            if (!this.state.StoreName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["StoreName"] = "*Please enter alphabet characters only.";
            }
        }
        if (!this.state.StoreAddress) {
            formIsValid = false;
            errors['StoreAddress'] = "Please enter Store address";
        }

        this.setState({
            errors: errors
        });

        return formIsValid
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let data = { 'Name': this.state.StoreName, 'Address': this.state.StoreAddress };
            $.ajax({
                url: "/Stores/CreateStore",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })
                    window.location.reload()
                }.bind(this)
            });
        }
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return(
            <React.Fragment>
                <Modal open={this.props.showCreateModal} onClose={this.props.onClose} size="small">
                    <Modal.Header>Create Store</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="StoreName" placeholder="Name" onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.StoreName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type="text" name="StoreAddress" placeholder="Address" onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.StoreAddress}
                                </div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary>Cancel</Button>
                        <Button onClick={this.onSubmit} className="ui blue button">Create
                            <i className="check icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}