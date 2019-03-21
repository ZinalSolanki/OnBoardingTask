import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';
import { win32 } from 'path';

export default class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
                    <Modal.Header>Edit Product</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="ProductName" placeholder='Name' defaultValue={this.props.Name} onChange={this.props.onChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type="text" name="ProductPrice" placeholder="Price" defaultValue={this.props.Price} onChange={this.props.onChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary>Cancel</Button>
                        <Button onClick={this.props.onUpdateSubmit} className="ui blue button">Edit
                            <i className="check icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
            )
    }
}