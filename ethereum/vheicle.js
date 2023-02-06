import web3 from "./web3";
import Jarmu from './build/Jarmu.json';

export default (address) => {
    return new web3.eth.Contract(
        Jarmu.abi,
        address
    );
};