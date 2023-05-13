import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    AdattaroloFactory.abi,
    '0xc034f5822E196B41FA862ed8F56120efD3aB39dF'
);
//0x72241975F46c12DFB8f65D246a59Ee76299fa21D
export default instance;