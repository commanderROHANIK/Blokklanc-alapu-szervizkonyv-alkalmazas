import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    AdattaroloFactory.abi,
    '0xdCaed175B284Ca0e747cbef92def126CF66CB4EC'
);

export default instance;