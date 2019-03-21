import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import CreateSale from './CreateSale.jsx';
import DeleteSale from './DeleteSale.jsx';
import UpdateSale from './UpdateSale.jsx';


export default class GetSalesDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SalesList: [{ Id: '', CustomerName: '', ProductName: '', StoreName: '', DateSold: '' }],
            Success: { Data: '' },

            SalesId: '',
            ProductId: '',
            StoreId: '',
            CustomerId: '',
            DateSold: '',

            showCreateModal: false,

            showDeleteModal: false,
            deleteId: 0,

            showUpdateModal: false,
            updateId: 0,

            Success: [],
            errors: {}
        };

        this.loadData = this.loadData.bind(this);
        this.convertDate = this.convertDate.bind(this);

        this.showCreateModal = this.showCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.onChange = this.onChange.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);

        this.showUpdateModal = this.showUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    convertDate(date) {
        var convert_date = parseInt((date.replace("/Date(", "").replace(")/", "")))

        var temp = new Date(convert_date)
        var date = (temp.getFullYear() + "-" + ((temp.getMonth()) + 1) + "-" + temp.getDate())
        return date
    }

    loadData() {
        $.ajax({
            url: "/Sales/GetSalesDetails",
            type: "GET",
            success: function (data) { this.setState({ SalesList: data }) }.bind(this)
        });
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

    handleDelete(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    showUpdateModal(id) {
        this.setState({ showUpdateModal: true });
        this.setState({ updateId: id });

        $.ajax({
            url: "/Sale/GetEdit",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                var obj = JSON.parse(data);
                this.setState({
                    SalesId: obj.SalesId,
                    CustomerId: obj.CustomerId,
                    ProductId: obj.ProductId,
                    StoreId: obj.StoreId,
                    DateSold: this.convertDate(obj.DateSold)
                })
            }.bind(this)
        });
    }

    closeUpdateModal() {
        this.setState({ showUpdateModal: false });
        window.location.reload()
    }

    onUpdateSubmit() {
        let data = {
            'SalesId': this.state.updateId,
            'CustomerId': this.state.CustomerId,
            'ProductId': this.state.ProductId,
            'StoreId': this.state.StoreId,
            'DateSold': this.state.DateSold
        };

        $.ajax({
            url: "/Sales/Edit",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()
            }.bind(this)
        });
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.CustomerId) {
            formIsValid = false;
            errors['CustomerId'] = '*Please select Customer.';
        }

        if (!this.state.ProductId) {
            formIsValid = false;
            errors['ProductId'] = '*Please select Product.'
        }

        if (!this.state.StoreId) {
            formIsValid = false;
            errors['StoreId'] = '*Please select Store.'
        }

        if (!this.state.DateSold) {
            formIsValid = false;
            errors['DateSold'] = '*Please provide sale date.'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }
    render() {
        let list = this.state.SalesList;
        console.log("salesList: ", list)
        let tableData = null;
        if (list != "") {
            tableData = list.map(sale =>
                <tr key={sale.Id}>
                    <td className="four wide">{sale.CustomerName}</td>
                    <td className="four wide">{sale.ProductName}</td>
                    <td className="four wide">{sale.StoreName}</td>
                    <td className="four wide">{this.convertDate(sale.DateSold)}</td>
                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.showUpdateModal.bind(this, sale.Id)} > Edit
                            <i className="edit icon" /></Button>
                    </td>
                    <td className="four wide">
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, sale.Id)} > Delete
                            <i className="delete icon" /></Button>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    <br /><br /><br />
                    <div>
                        <Button primary onClick={this.showCreateModal} > New Sale</Button>
                        <CreateSale onChange={this.onChange}
                            onClose={this.closeCreateModal}
                            onCreateSubmit={this.onCreateSubmit} showCreateModal={this.state.showCreateModal} />

                        <DeleteSale delete={this.state.deleteId} onClose={this.closeDeleteModal} onSubmit={this.onSubmit}
                            showDeleteModal={this.state.showDeleteModal} />

                        <UpdateSale onChange={this.onChange} update={this.state.updateId}
                            onClose={this.closeUpdateModal} onUpdateSubmit={this.onUpdateSubmit}
                            showUpdateModal={this.state.showUpdateModal} Id={this.state.SalesId}
                            CustomerId={this.state.CustomerId} ProductId={this.state.ProductId}
                            StoreId={this.state.StoreId} DateSold={this.state.DateSold} />
                    </div>

                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Store</th>
                                <th>DaleSold</th>
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