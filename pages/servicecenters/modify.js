import React, {Component} from "react";
import ServiceCenter from "../../ethereum/serviceCenter";
import {Button, Form, Input, Message} from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import {Router} from "../../routes";

class ServiceCenterModify extends Component {
    state = {
        cim: this.props.regitcim,
        gps: this.props.regigps,
        email: this.props.regiemail,
        nyitvatartas: this.props.reginyitvatartas,
        errorMessage: '',
        loading: false
    };

    static async getInitialProps(props) {
        const serviceCenter = ServiceCenter(props.query.address);
        const summery = await serviceCenter.methods.getSummary().call();

        const regitcim = summery[1];
        const regigps = summery[2];
        const regiemail = summery[3];
        const reginyitvatartas = summery[4];

        return {serviceCenter, regitcim, regigps, regiemail, reginyitvatartas, address: props.query.address};
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

            if(this.state.cim !== this.props.regitcim) {
                tmp_array.push(this.props.serviceCenter.methods.setCim(this.state.cim));
            }

            if(this.state.gps !== this.props.regigps) {
                tmp_array.push(this.props.serviceCenter.methods.setGPS(this.state.gps));
            }

            if(this.state.email !== this.props.regiemail) {
                tmp_array.push(this.props.serviceCenter.methods.setEmail(this.state.email));
            }

            if(this.state.nyitvatartas !== this.props.reginyitvatartas) {
                tmp_array.push(this.props.serviceCenter.methods.setNyitvatartas(this.state.nyitvatartas));
            }

            await Promise.all(tmp_array.map(x => x.send(
                {from: accounts[0]}
            )));

            Router.replaceRoute(`/services/${this.props.address}`);
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
                        <label>Location</label>
                        <Input
                            value={this.state.cim}
                            onChange={event =>
                                this.setState({cim: event.target.value})}
                        />
                        <label>GPS</label>
                        <Input
                            value={this.state.gps}
                            onChange={event =>
                                this.setState({gps: event.target.value})}
                        />
                        <label>E-mail</label>
                        <Input
                            value={this.state.email}
                            onChange={event =>
                                this.setState({email: event.target.value})}
                        />
                        <label>Open hours</label>
                        <Input
                            value={this.state.nyitvatartas}
                            onChange={event =>
                                this.setState({nyitvatartas: event.target.value})}
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

export default ServiceCenterModify;