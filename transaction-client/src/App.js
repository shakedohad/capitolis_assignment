import { useEffect, useRef, useState } from 'react';
import { CSVLink } from "react-csv";
import Transactions from './components/Transactions';
import TransactionModal from './components/TransactionModal';
import { getTransactions, addTransaction } from './Apis';
import './App.css';

function App() {

  const [receivers, setReceivers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState([]);
  let compressedData = [];
  let ignore = {};

  const inverseTrans = () => {
    if (transactions.length) {
      const inversedTrans = transactions.map(trans => {
        const temp = trans.tradingParty;
        return {
          tradingParty: trans.counterParty,
          counterParty: temp,
          amount: trans.amount
        }
      });
      setReceivers(inversedTrans);
    }
  }

  const addTrans = async (data) => {
    data.amount = parseInt(data.amount);
    await addTransaction(data);
    const newData = [...transactions, data];
    setTransactions(newData);
  }

  const getTrans = async () => {
    const data = await getTransactions();
    const { transactions } = data;
    setTransactions(transactions);
  }

  useEffect(() => {
    getTrans();
  }, [])

  useEffect(() => {
    inverseTrans(transactions);
    compressData();
  }, [transactions])

  const compressData = async () => {
    compressedData = [];
    ignore = {};
    transactions.forEach(trans => {
      if (!ignore[trans.tradingParty] || (ignore[trans.tradingParty] && !ignore[trans.tradingParty].includes(trans.counterParty))) {
        if (!compress(trans)) {
          compressedData.push({ tradingParty: trans.tradingParty, counterParty: trans.counterParty, amount: trans.amount });
        }
      }
    });
    setData(compressedData);
  }

  const compress = ({ tradingParty, counterParty, amount }) => {
    let foundMatch = false;
    foundMatch = transactions.find(trans => {
      if (trans.tradingParty === counterParty && trans.counterParty === tradingParty) {
        if (amount > trans.amount) {
          compressedData.push({ tradingParty, counterParty, amount: amount - trans.amount });
          ignore[counterParty] = ignore[counterParty] && ignore[counterParty].length ? [...ignore[counterParty], tradingParty] : [tradingParty];
          return true;
        }
        else if (amount < trans.amount) {
          compressedData.push({ tradingParty: trans.tradingParty, counterParty: trans.counterParty, amount: trans.amount - amount });
          ignore[counterParty] = ignore[counterParty] && ignore[counterParty].length ? [...ignore[counterParty], tradingParty] : [tradingParty];
          return true;
        }
        else if (amount === trans.amount) {
          return true;
        }
      }
    })
    return foundMatch;
  }

  return (
    <div className="App container-fluid">
      <div className="row mt-5">
        <div className="offset-sm-1 col-sm-5 border-end border-dark">
          {transactions.length ? <Transactions title={"Paying"} data={transactions} /> : <h4>List is Empty</h4>}
        </div>
        <div className="col-sm-5">
          {receivers.length ? <Transactions title={"Receiving"} data={receivers} /> : <h4>List is Empty</h4>}
        </div>
      </div>
      <div className="row mt-5">
        <div className="offset-sm-4 col-sm-2">
          <button className="btn btn-light btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#addTrans">Add New Transaction</button>
        </div>
        <div className="col-sm-2">
          {/* <button className="btn btn-light btn-outline-secondary" onClick={compressData}>Compress Transactions</button> */}
          <CSVLink
            className="btn btn-light btn-outline-secondary"
            filename="transactions.csv"
            data={data}>Compress Transactions</CSVLink>
        </div>
      </div>
      <TransactionModal handleClick={addTrans} />
    </div>
  );
}

export default App;