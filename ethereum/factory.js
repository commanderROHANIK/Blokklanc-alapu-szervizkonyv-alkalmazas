import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(AdattaroloFactory.interface),
    '0xfAB8B4fdDdaf0Ce37C3CB3340D9aAD6e45DEfD31'
);

export default instance;