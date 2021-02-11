import React from 'react';
import axios from 'axios'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      Amount: 0
    };
  }

  componentDidMount() {
    this.refreshWallet()
  }

  refreshWallet() {
    axios.get('http://localhost:5000/chain', { crossdomain: true })
      .then((response) => {
        const newData = response.data.chain.map(item => (item = item.transactions))
        console.log(newData)
        this.setState(() => ({ transactions: newData}))
        this.separateTransactions()
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  separateTransactions = () => {
    const transactions = this.state.transactions;
    this.setState(() => ({ Amount: 0 }))
    let new_amount = 0
    if (transactions) {
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].length > 0) {
          for (let j = 0; j < transactions[i].length; j++){
            console.log(`${transactions[i][j].recipient}, chris-wernli`);
            if (transactions[i][j].recipient === "chris-wernli") {
              console.log("More Money!");
              new_amount += transactions[i][j].amount
            } else if (transactions[i][j].sender === "chris-wernli") {
              new_amount -= transactions[i][j].amount
            }
          }
        }
      }
    }
    this.setState(() => ({ Amount: new_amount }));
  }

  render() {
    return (
      <div className="App">
        <h1>Wallet</h1>
    <h4>Amount: {this.state.Amount}</h4>
        <button onClick={this.separateTransactions} >refresh</button>
      </div>
    );
  }
}

export default App;
