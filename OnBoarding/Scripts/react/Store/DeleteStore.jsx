﻿import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default class DeleteStore extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSubmit(id) {
        $.ajax({
            url: "/Stores/DeleteStore",
            type: "POST",
            data: { 'id': id }
        });
        window.location.reload()
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showDeleteModal} onClose={this.props.onClose} size='small'>
                    <Modal.Header>Delete Store</Modal.Header>
                    <Modal.Content>
                        <h4>
                            Are you sure?
                        </h4>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >Cancel
                            </Button>
                        <Button onClick={() => this.onSubmit(this.props.delete)} className="ui red button">Delete
                            <i className="x icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}