import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(AdattaroloFactory.interface),
    '0xA9F0D9ebc6b1C85194d613e5F62A67fC189b0974'
);

export default instance;