import React, {Component} from "react";
import {Form, Button, Input, Message} from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import Layout from "../../components/Layout";

class AddServiceCenter extends Component {
    state = {
        azonosito: '',
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
                .createJarmu(this.state.azonosito)
                .send({
                    from: accounts[0]
                });
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
                        <label>Szervíz azonosító</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.azonosito}
                            onChange={event =>
                                this.setState({azonosito: event.target.value})}
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