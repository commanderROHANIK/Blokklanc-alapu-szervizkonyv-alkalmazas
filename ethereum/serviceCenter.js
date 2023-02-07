import web3 from "./web3";
import Szerviz from './build/Szerviz.json';

export default (address) => {
    return new web3.eth.Contract(
        Szerviz.abi,
        address
    );
};