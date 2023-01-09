import React, {Component} from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import Layout from "../../components/Layout";

class AddServiceCenter extends Component {
    state = {
        szervizAzon: '',
        jarmuAzon: '',
        vegosszeg: '',
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
                .createSzervizEsemeny(this.state.jarmuAzon, this.state.szervizAzon, this.state.vegosszeg)
                .send({
                    from: accounts[0]
                });
        } catch (err) {
            this.setState({ errorMessage: err.message });
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
                            value={this.state.szervizAzon}
                            onChange={event =>
                                this.setState({szervizAzon: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Jármű azonosító</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.jarmuAzon}
                            onChange={event =>
                                this.setState({jarmuAzon: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Végösszeg</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.vegosszeg}
                            onChange={event =>
                                this.setState({vegosszeg: event.target.value })}
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