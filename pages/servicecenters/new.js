import React, {Component} from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class AddServiceCenter extends Component {
    state = {
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        console.log(await factory.methods.getSzervizek().call());

        this.setState({
            loading: true,
            errorMessage: ''
        });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createSzerviz()
                .send({
                    from: accounts[0]
                });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});
        console.log(await factory.methods.getSzervizek().call());
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Button
                    loading={this.state.loading}
                    primary
                >Add</Button>
            </Form>
        )
    }
}

export default AddServiceCenter;