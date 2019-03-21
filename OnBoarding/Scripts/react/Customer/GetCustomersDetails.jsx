import React, { Component } from 'react';

import CreateCustomer from './CreateCustomer.jsx';
import DeleteCustomer from './DeleteCustomer.jsx';
import UpdateCustomer from './UpdateCustomer.jsx';

export default class GetCustomersDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerLists: [],
            Success: { Data: '' },

            showCreateModal: false,

            showDeleteModal: false,
            deleteId: 0,

            CustomerId: '',
            CustomerName: '',
            CustomerAddress: '',

            updateId: 0,
            showUpdateModal: false,

            Sucess: [],
            errors: {}
        };
        this.loadData = this.loadData.bind(this);

        this.showCreateModal = this.showCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.onChange = this.onChange.bind(this);

        this.showUpdateModal = this.showUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        $.ajax({
            url: "/Customers/GetCustomersData",
            type: "GET",
            success: function (data) {
                this.setState({ CustomerLists: data })
            }.bind(this)
        });
    }

    //create customer
    showCreateModal() {
        this.setState({ showCreateModal: true });
    }

    closeCreateModal() {
        this.setState({ showCreateModal: false });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.CustomerName) {
            formIsValid = false;
            errors['CustomerName'] = "Please enter customer name.";
        }

        if (typeof this.state.CustomerName != "undefined") {
            if (!this.state.ProductName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["CustomerName"] = "Please enter alphabet character only."
            }
        }

        if (!this.state.CustomerAddress) {
            formIsValid = false;
            errors["CustomerAddress"] = "Please enter customer address."
        }
        return formIsValid
    }

    //Update Customer
    showUpdateModal(id) {
        this.setState({ showUpdateModal: true });
        this.setState({ updateId: id });

        $.ajax({
            url: "Customers/GetEdit",
            type: "GET",
            data: { "id": id },
            success: function (data) {
                var obj = JSON.parse(data);
                this.setState({ CustomerId: obj.CustomerId, CustomerName: obj.Name, CustomerAddress: obj.Address })
                //this.setState({ CustomerId: data.CustomerId, CustomerName: data.Name, CustomerAddress: data.Address })
            }.bind(this)
        });
    }

    closeUpdateModal() {
        this.setState({ showUpdateModal: false });
        window.location.reload()
    }

    onUpdateSubmit() {

        let data = { 'CustomerId': this.state.CustomerId, 'Name': this.state.CustomerName, 'Address': this.state.CustomerAddress };

        $.ajax({
            url: "Customers/Edit",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()
            }.bind(this)
        });

    }
    //Delete Customer
    handleDelete(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        window.location.reload();
    }

    render() {

        let CustomerLists = this.state.CustomerLists;
        let tableData = null;
        if (CustomerLists != "") {
            tableData = CustomerLists.map(customer =>
                < tr key={customer.CustomerId}>
                    <td className="four wide">{customer.Name}</td>
                    <td className="four wide">{customer.Address}</td>
                    <td className="four wide">
                        <button className="ui yellow button" onClick={this.showUpdateModal.bind(this, customer.CustomerId)} >
                            <i className="edit icon"></i>Edit</button>
                    </td>
                    <td className="four wide">
                        <button className="ui red button" onClick={this.handleDelete.bind(this, customer.CustomerId)} >
                            <i className="delete icon"></i>Delete</button>
                    </td>
                </tr>
            )
        }

        return (
            <React.Fragment>
                <div>
                    <br /><br /><br />
                    <div><button className="ui primary button" onClick={this.showCreateModal}> New Customer</button></div>
                    <CreateCustomer onChange={this.onChange} onClose={this.closeCreateModal} onCreateSubmit={this.onCreateSubmit} showCreateModal={this.state.showCreateModal} />

                    <DeleteCustomer delete={this.state.deleteId} onClose={this.closeDeleteModal} showDeleteModal={this.state.showDeleteModal} />

                    <UpdateCustomer onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModal}
                        onUpdateSubmit={this.onUpdateSubmit}
                        showUpdateModal={this.state.showUpdateModal} Id={this.state.CustomerId}
                        Name={this.state.CustomerName}
                        Address={this.state.CustomerAddress} />

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

            </React.Fragment >
        )

    }
}