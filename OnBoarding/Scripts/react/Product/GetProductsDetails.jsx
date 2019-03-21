import React, { Component } from 'react';

import CreateProduct from './CreateProduct.jsx';
import DeletePoduct from './DeleteProduct.jsx';
import UpdateProduct from './UpdateProduct.jsx';

export default class GetProductsDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductList: [],
            Success: { Data: '' },

            showDeleteModal: false,
            deleteId: 0,

            showCreateModal: false,

            ProductId: '',
            ProductName: '',
            ProductPrice: '',

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
            url: "/Products/GetProductsDetails",
            type: "GET",
            success: function (data) { this.setState({ ProductList: data }) }.bind(this)
        });
    }

    handleDelete(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    showCreateModal() {
        this.setState({ showCreateModal: true });
    }

    closeCreateModal() {
        this.setState({ showCreateModal: false });
        window.location.reload()
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    showUpdateModal(id) {
        this.setState({ showUpdateModal: true });
        this.setState({ updateId: id });

        $.ajax({
            url: "/Products/GetEdit",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                //this.setState({ ProductId: data.id, ProductName: data.Name, ProductPrice: data.Price })
                var obj = JSON.parse(data);
                this.setState({ ProductId: obj.ProductId, ProductName: obj.Name, ProductPrice: obj.Price })
            }.bind(this)
        });
    }

    onUpdateSubmit() {
        let data = { 'ProductId': this.state.ProductId, 'Name': this.state.ProductName, 'Price': this.state.ProductPrice };

        $.ajax({
            url: "/Products/Edit",
            type: "POST",
            data: data,
            data: data,
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()
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
        if (!this.state.ProductName) {
            formIsValid = false;
            errors['ProductName'] = "Please enter product name.";
        }

        if (typeof this.state.ProductName != "undefined") {
            if (!this.state.ProductName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["ProductName"] = "Please enter alphabet character only."
            }
        }
        return formIsValid;
    }
    render() {
        let ProductList = this.state.ProductList;
        let tableData = null;
        if (ProductList != "") {
            tableData = ProductList.map(product =>
                <tr key={product.ProductId}>
                    <td className="four wide">{product.Name}</td>
                    <td className="four wide">{product.Price}</td>
                    <td className="four wide">
                        <button className="ui yellow button" onClick={this.showUpdateModal.bind(this, product.ProductId)} >
                            <i className="edit icon"></i>Edit</button>
                    </td>
                    <td className="four wide">
                        <button className="ui red button" onClick={this.handleDelete.bind(this, product.ProductId)} >
                            <i className="delete icon"></i>Delete</button>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    <br /><br /> <br />
                    <button className="ui primary button" onClick={this.showCreateModal}> New Product</button>
                    <CreateProduct onChange={this.onChange}
                        onClose={this.closeCreateModal}
                        onSubmit={this.onSubmit}
                        showCreateModal={this.state.showCreateModal} />

                    <UpdateProduct onChange={this.onChange} update={this.state.updateId}
                        onClose={this.closeUpdateModal}
                        onUpdateSubmit={this.onUpdateSubmit}
                        showUpdateModal={this.state.showUpdateModal}
                        Id={this.state.ProductId}
                        Name={this.state.ProductName}
                        Price={this.state.ProductPrice} />

                    <DeletePoduct delete={this.state.deleteId}
                        onClose={this.closeDeleteModal}
                        onSubmit={this.onSubmit}
                        showDeleteModal={this.state.showDeleteModal} />

                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
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