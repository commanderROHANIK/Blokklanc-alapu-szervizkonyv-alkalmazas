import React, {Component} from "react";
import {Button, Form, Input} from "semantic-ui-react";
import web3 from "../ethereum/web3";
import {Router} from "../routes";
import ServiceCenter from "../ethereum/serviceCenter";

class AddEmploye extends Component {
    state = {
        nev: '',
        address: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        const szerviz = ServiceCenter(this.props.address);

        this.setState({loading: true, errorMessage: ''});

        try {
            const accoutns = await web3.eth.getAccounts();
            await szerviz.methods.addEmploye(
                this.state.address,
                this.state.nev
            ).send({
                from: accoutns[0]
            });

            Router.replaceRoute(`/services/${this.props.address}`);
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false, value: ''});
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Employee address</label>
                    <Input
                        value={this.state.address}
                        onChange={event => this.setState({address: event.target.value})}
                    />
                    <label>Employee name</label>
                    <Input
                        value={this.state.nev}
                        onChange={event => this.setState({nev: event.target.value})}
                    />
                    <Button primary loading={this.state.loading} style={{marginTop: 10}}>
                        Add
                    </Button>
                </Form.Field>
            </Form>
        );
    }
}

export default AddEmploye;