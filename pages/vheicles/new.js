import React, {Component} from "react";
import {Form, Button, Input, Message} from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import Layout from "../../components/Layout";
import {Router} from "../../routes";

class AddServiceCenter extends Component {
    state = {
        azonosito: '',
        gyarto: '',
        evjarat: '',
        uzemanyag: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({
            loading: true,
            errorMessage: ''
        });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createJarmu(this.state.azonosito, this.state.gyarto, this.state.evjarat, this.state.uzemanyag)
                .send({
                    from: accounts[0]
                });
            Router.replaceRoute(`/`);
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    }

    render() {
        return (
            <Layout>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Vehicle identifier</label>
                        <Input
                            type="text"
                            value={this.state.azonosito}
                            onChange={event =>
                                this.setState({azonosito: event.target.value})}
                        />
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
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button
                        loading={this.state.loading}
                        primary
                    >Add</Button>
                </Form>
            </Layout>
        )
    }
}

export default AddServiceCenter;