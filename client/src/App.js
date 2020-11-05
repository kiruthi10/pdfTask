import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import './App.css';

class App extends Component {
  state = {
    name: '',
    address:'',
    receiptId: 0,
    price1: 0,
    price2: 0,
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'Invoice.pdf');
      })
  }

  render() {
    return (
      <div className="App">
        <table className="center">
          <tr>
            <td>Customer Name</td>
            <td><input type="text" placeholder="Name" name="name" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>Customer Address</td>
            <td><input type="text" placeholder="Address" name="address" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td>Receipt Number</td>
            <td><input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} /></td>
          </tr>
          <tr>
          <td>1 Item Price</td>
          <td><input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} /></td>
          </tr>
          <tr>
          <td>2 Item Price</td>
          <td><input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} /></td>
          </tr>
        
        </table>
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;