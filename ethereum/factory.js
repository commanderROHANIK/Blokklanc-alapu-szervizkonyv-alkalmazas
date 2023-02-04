import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(AdattaroloFactory.interface),
    '0x3c02ccf06927FA19E1EF4fC3d388C8AFCBcEdC49'
);

export default instance;