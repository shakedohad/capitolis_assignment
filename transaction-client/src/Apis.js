import axios from 'axios';

const server = "http://localhost:3001";
const transactionController = "transactions";
export const getTransactions = async () => {
    try {
        const response = await axios.get(`${server}/${transactionController}`);
        const { data } = response;
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const addTransaction = async (transaction) => {
    try {
        await axios.post(`${server}/${transactionController}/add`, { transaction });
    } catch (error) {
        console.log(error);
    }
}