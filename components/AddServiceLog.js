import React, {Component} from "react";
import {Button, Form, Input, Message} from "semantic-ui-react";
import Campaign from "../ethereum/vheicle";
import web3 from "../ethereum/web3";
import {Router} from "../routes";

class AddServiceLogFrom extends Component {
    state = {
        szervizId: '',
        kilommeterOraAllas: '',
        datum: '',
        alkatreszek: '',
        vegosszeg: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);

        this.setState({loading: true, errorMessage: ''});

        try {
            const accoutns = await web3.eth.getAccounts();
            await campaign.methods.addSzervizesemeny(
                this.state.szervizId,
                this.state.kilommeterOraAllas,
                Math.floor(new Date(this.state.datum) / 1000),
                this.state.alkatreszek,
                this.state.vegosszeg
            ).send({
                from: accoutns[0]
            });

            Router.replaceRoute(`/vheicles/${this.props.address}`);
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false, value: ''});
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Service center identifier</label>
                    <Input
                        value={this.state.szervizId}
                        onChange={event => this.setState({szervizId: event.target.value})}
                    />
                    <label>Mileage</label>
                    <Input
                        value={this.state.kilommeterOraAllas}
                        onChange={event => this.setState({kilommeterOraAllas: event.target.value})}
                    />
                    <label>Date</label>
                    <Input
                        type="date"
                        value={this.state.datum}
                        onChange={event => this.setState({datum: event.target.value})}
                    />
                    <label>Used parts</label>
                    <Input
                        value={this.state.alkatreszek}
                        onChange={event => this.setState({alkatreszek: event.target.value})}
                    />
                    <label>Price</label>
                    <Input
                        value={this.state.vegosszeg}
                        onChange={event => this.setState({vegosszeg: event.target.value})}
                    />

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading} style={{marginTop: 10}}>
                        Add
                    </Button>
                </Form.Field>
            </Form>
        );
    }
}

export default AddServiceLogFrom;