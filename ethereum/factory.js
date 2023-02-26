import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    AdattaroloFactory.abi,
    '0x911dDbfe3ca31Df03147891216BEBDC62a448C9b'
);

export default instance;