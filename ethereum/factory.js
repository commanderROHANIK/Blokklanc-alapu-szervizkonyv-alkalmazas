import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    AdattaroloFactory.abi,
    '0xD6E42129CB49Ece5D84F234f6850C9a67E786c6C'
);

export default instance;