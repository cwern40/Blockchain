import React from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/chain', { crossdomain: true })
      .then((response) => {
        console.log(response.data.chain)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
