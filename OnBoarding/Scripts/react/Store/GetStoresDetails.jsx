import React, { Component } from 'react';

import CreateStore from './CreateStore.jsx';
import DeleteStore from './DeleteStore.jsx';
import UpdateStore from './UpdateStore.jsx';

export default class GetStoresDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            StoreList: [],
            Success: { Data: '' },

            showCreateModal: false,

            StoreId: '',
            StoreName: '',
            StoreAddress: '',

            showDeleteModal: false,
            deleteId: 0,

            showUpdateModal: false,
            updateId: 0,

            Success: [],
            errors: {}
        };

        this.loadData = this.loadData.bind(this);

        this.showCreateModal = this.showCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.onChange = this.onChange.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);

        this.showUpdateModal = this.showUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        $.ajax({
            url: "/Stores/GetStoresDetails",
            type: "GET",
            success: function (data) { this.setState({ StoreList: data }) }.bind(this)
        });
    }

    showCreateModal() {
        this.setState({ showCreateModal: true });
    }

    closeCreateModal() {
        this.setState({ showCreateModal: false });
        window.location.reload()
    }

    handleDelete(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    showUpdateModal(id) {
        this.setState({ showUpdateModal: true });
        this.setState({ updateId: id });

        $.ajax({
            url: "Stores/GetEdit",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                //this.setState({ StoreId: data.id, StoreName: data.StoreName, StoreAddress: data.StoreAddress })
                var obj = JSON.parse(data);
                this.setState({ StoreId: obj.StoreId, StoreName: obj.Name, StoreAddress: obj.Address })
            }.bind(this)
        });
    }

    closeUpdateModal() {
        this.setState({ showUpdateModal: false });
        window.location.reload()
    }

    validateForm() {
        let errors = {}

        let formIsValid = true
        if (!this.state.StoreName) {
            formIsValid = false;
            errors['StoreName'] = "*Please enter store name.";
        }
        if (typeof this.state.StoreName !== "undefined") {
            if (!this.state.StoreName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["StoreName"] = "*Please enter alphabet characters only."
            }
        }
        if (!this.state.StoreAddress) {
            formIsValid = false;
            errors['StoreAddress'] = "*Please enter store address."
        }
        this.setState({ errors: erros });
        return formIsValid
    }

    onUpdateSubmit() {

        let data = { 'StoreId': this.state.StoreId, 'Name': this.state.StoreName, "Address": this.state.StoreAddress };

        $.ajax({
            url: "/Stores/Edit",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()
            }.bind(this)
        });

    }

    render() {
        let StoreList = this.state.StoreList;
        let tableData = null;
        if (StoreList != "") {
            tableData = StoreList.map(store =>
                <tr key={store.StoreId}>
                    <td className="four wide">{store.Name}</td>
                    <td className="four wide">{store.Address}</td>
                    <td className="four wide">
                        <button className="ui yellow button" onClick={this.showUpdateModal.bind(this, store.StoreId)} >
                            <i className="edit icon"></i>Edit</button>
                    </td>
                    <td className="four wide">
                        <button className="ui red button" onClick={this.handleDelete.bind(this, store.StoreId)}>
                            <i className="delete icon"></i>Delete</button>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    <br /><br /><br />
                    <button className="ui primary button" onClick={this.showCreateModal} > New Store</button>

                    <CreateStore onChange={this.onChange} onClose={this.closeCreateModal}
                        onSubmit={this.onSubmit} showCreateModal={this.state.showCreateModal} />

                    <DeleteStore delete={this.state.deleteId} onClose={this.closeDeleteModal}
                        onSubmit={this.onSubmit} showDeleteModal={this.state.showDeleteModal} />

                    <UpdateStore onChange={this.onChange}
                        update={this.state.updateId} onClose={this.closeUpdateModal}
                        onUpdateSubmit={this.onUpdateSubmit} showUpdateModal={this.state.showUpdateModal}
                        Id={this.state.StoreId} Name={this.state.StoreName} Address={this.state.StoreAddress} />
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}