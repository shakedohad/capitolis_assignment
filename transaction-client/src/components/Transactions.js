import React from "react";
import './Transactions.css';

const Transactions = ({ title, data }) => {
    return (
        <div className="p-2">
            <h3 className="pb-3">{title}</h3>
            {data.length ? <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>CounterParty Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((trans, i) => {
                            return <tr key={i}>
                                <td>{++i}</td>
                                <td>{trans.counterParty}</td>
                                <td>{trans.amount}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div> :
                <h2>No Data Available!</h2>}
        </div>
    )
}

export default React.memo(Transactions)
