import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(AdattaroloFactory.interface),
    '0x5cAA161cD510aE68d542886926AB05a6ec66BE73'
);

export default instance;