import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    AdattaroloFactory.abi,
    '0xc70E88fc4d824af93b378B3c7b8f5Fb6c9db822b'
);

export default instance;