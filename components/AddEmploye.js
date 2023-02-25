import React, {Component} from "react";
import {Button, Form, Input, Message} from "semantic-ui-react";
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
        let summary = await szerviz.methods.getSummary().call();
        let alkalmazottCount = summary[5];

        this.setState({loading: true, errorMessage: ''});

        try {
            for (let i = 0; i < alkalmazottCount; i++) {
                let alkalmazott = await szerviz.methods.Alkalmazottak(i).call();
                if (alkalmazott.Azonosito == this.state.address) {
                    throw new Error("Employee has been recorded earlier");
                }
            }

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

        this.setState({loading: false});
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
                    <Message error header="Oops!" content={this.state.errorMessage} />
                </Form.Field>
            </Form>
        );
    }
}

export default AddEmploye;