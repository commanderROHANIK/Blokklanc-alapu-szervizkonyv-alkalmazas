import React, {Component} from "react";
import Layout from '../../components/Layout';
import Vheicle from "../../ethereum/vheicle";
import {Card, Grid} from "semantic-ui-react";
import web3 from "../../ethereum/web3";

class VheicleShow extends Component {
    static async getInitialProps(props) {
        const vheicle = Vheicle(props.query.address);

        const summary = await vheicle.methods.getSummary().call();

        return {
            address: props.query.address,
            id: summary[0],
            gyarto: summary[1],
            evjarat: summary[2],
            uzemanyag: summary[3],
            tulajdonos: summary[4],
            szervizesemenyek: summary[5]
        };
    }

    renderCards() {
        const {
            id,
            gyarto,
            evjarat,
            uzemanyag,
            tulajdonos,
            szervizesemenyek
        } = this.props;

        const items = [
            {
                header: id,
                meta: 'Identifier',
                description: "The unique identifier of the vheicle",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: gyarto,
                meta: 'Manufacturer',
                description: 'The companyi or group who manufatured the vheicle'
            },
            {
                header: evjarat,
                meta: 'Year of manufacture',
                description: 'The year the vheicle was assembled'
            },
            {
                header: uzemanyag,
                meta: 'Minimum contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
            },
            {
                header: tulajdonos,
                meta: 'Minimum contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
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

export default VheicleShow;