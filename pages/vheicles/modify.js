import React, {Component} from "react";
import {Button, Form, Input, Message} from "semantic-ui-react";
import Layout from "../../components/commonComponents/Layout";
import web3 from "../../ethereum/web3";
import Vheicle from "../../ethereum/vheicle";
import {Router} from "../../routes";

class VheicleModify extends Component {
    state = {
        gyarto: this.props.regigyarto,
        evjarat: this.props.regievjarat,
        uzemanyag: this.props.regiuzemanyag,
        tulajdonos: this.props.regitulajdonos,
        errorMessage: '',
        loading: false
    };

    static async getInitialProps(props) {
        const vheicle = Vheicle(props.query.address);
        const summery = await vheicle.methods.getSummary().call();

        const regigyarto = summery[1];
        const regievjarat = summery[2];
        const regiuzemanyag = summery[3];
        const regitulajdonos = summery[4];

        return {vheicle, regigyarto, regievjarat, regiuzemanyag, regitulajdonos, address: props.query.address};
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({
            loading: true,
            errorMessage: ''
        });

        try {
            const accounts = await web3.eth.getAccounts();
            let tmp_array = [];

            if(this.state.gyarto !== this.props.regigyarto) {
                tmp_array.push(this.props.vheicle.methods.setGyarto(this.state.gyarto));
            }

            if(this.state.evjarat !== this.props.regievjarat) {
                tmp_array.push(this.props.vheicle.methods.setEvjarat(this.state.evjarat));
            }

            if(this.state.uzemanyag !== this.props.regiuzemanyag) {
                tmp_array.push(this.props.vheicle.methods.setUzemanyag(this.state.uzemanyag));
            }

            if(this.state.tulajdonos !== this.props.regitulajdonos) {
                tmp_array.push(this.props.vheicle.methods.setTulajdonos(this.state.tulajdonos));
            }

            await Promise.all(tmp_array.map(x => x.send(
                {from: accounts[0]}
            )));

            Router.replaceRoute(`/vheicles/${this.props.address}`);
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    };

    render() {
        return (
            <Layout>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Manufacturer</label>
                        <Input
                            type="text"
                            value={this.state.gyarto}
                            onChange={event =>
                                this.setState({gyarto: event.target.value})}
                        />
                        <label>Year of manufacturing</label>
                        <Input
                            type="number"
                            value={this.state.evjarat}
                            onChange={event =>
                                this.setState({evjarat: event.target.value})}
                        />
                        <label>Fuel</label>
                        <Input
                            type="text"
                            value={this.state.uzemanyag}
                            onChange={event =>
                                this.setState({uzemanyag: event.target.value})}
                        />
                        <label>Owner</label>
                        <Input
                            type="text"
                            value={this.state.tulajdonos}
                            onChange={event =>
                                this.setState({tulajdonos: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button
                        loading={this.state.loading}
                        primary
                    >Save</Button>
                </Form>
            </Layout>
        );
    }
}

export default VheicleModify;