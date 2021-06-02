import React, { useRef } from "react";
import { useForm } from 'react-hook-form';

const TransactionModal = ({ handleClick }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            tradingParty: "",
            counterParty: "",
            amount: null
        },
    });

    const onSubmit = (data) => {
        handleClick(data);
        closeModal.current.click();
    }
    const closeModal = useRef();

    const clearForm = () => {
        reset();
    }

    return (
        <div className="modal fade" id="addTrans" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Transaction</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-body">
                            <div className="form-group text-start">
                                <label className="" htmlFor="tradingParty">Trading Party</label>
                                <input {...register('tradingParty')} required type="text" className="form-control m-2" id="tradingParty" name="tradingParty" placeholder="Enter Trading Party" />
                            </div>
                            <div className="form-group text-start">
                                <label htmlFor="counterParty">Counter Party</label>
                                <input {...register('counterParty')} required type="text" className="form-control m-2" id="counterParty" name="counterParty" placeholder="Enter Counter Party" />
                            </div>
                            <div className="form-group text-start">
                                <label htmlFor="amount">Amount</label>
                                <input min="0" {...register('amount')} required type="number" className="form-control m-2" id="amount" name="amount" placeholder="Enter Amount" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={clearForm}>Clear</button>
                            <button type="button" className="btn btn-secondary" onClick={clearForm} ref={closeModal} data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TransactionModal