import React, {Component} from "react";
import {Form, Button, Input, Message} from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import Layout from "../../components/commonComponents/Layout";
import {Router} from "../../routes";

class AddServiceCenter extends Component {
    state = {
        cim: '',
        gps: '',
        email: '',
        nyitvatartas: '',
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
                .createSzerviz(
                    this.state.cim,
                    this.state.gps,
                    this.state.email,
                    this.state.nyitvatartas
                )
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
                        <label>Location</label>
                        <Input
                            type="text"
                            value={this.state.cim}
                            onChange={event =>
                                this.setState({cim: event.target.value})}
                        />
                        <label>GPS</label>
                        <Input
                            type="text"
                            value={this.state.gps}
                            onChange={event =>
                                this.setState({gps: event.target.value})}
                        />
                        <label>E-mail</label>
                        <Input
                            type="text"
                            value={this.state.email}
                            onChange={event =>
                                this.setState({email: event.target.value})}
                        />
                        <label>Open hours</label>
                        <Input
                            type="text"
                            value={this.state.nyitvatartas}
                            onChange={event =>
                                this.setState({nyitvatartas: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
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