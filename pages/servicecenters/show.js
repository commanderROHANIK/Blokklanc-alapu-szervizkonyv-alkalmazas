import React, {Component} from "react";
import Layout from '../../components/Layout';
import ServiceCenter from "../../ethereum/serviceCenter";
import {Card, Grid} from "semantic-ui-react";
import web3 from "../../ethereum/web3";

class ServiceCenterShow extends Component {
    static async getInitialProps(props) {
        const serviceCenter = ServiceCenter(props.query.address);

        const summary = await serviceCenter.methods.getSummary().call();

        return {
            address: props.query.address,
            manager: summary[0],
            cim: summary[1]
        };
    }

    renderCards() {
        const {
            manager,
            cim
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: "The owner of the service center",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: cim,
                meta: 'Location',
                description: 'The location of the service center'
            }
        ];

        return <Card.Group items={items}/>
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default ServiceCenterShow;