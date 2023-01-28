import React, {Component} from "react";
import Layout from '../../components/Layout';
import Vheicle from "../../ethereum/vheicle";
import {Card, Grid, Table} from "semantic-ui-react";
import AddServiceLog from "../../components/AddServiceLog";
import SzervizLogRow from "../../components/SzervizLogRow"

class VheicleShow extends Component {
    static async getInitialProps(props) {
        const vheicle = Vheicle(props.query.address);
        const summary = await vheicle.methods.getSummary().call();
        const count = await vheicle.methods.SzervizesemenyCount().call();
        let szervizLogs = [];

        if (count > 0) {
            szervizLogs = await Promise.all(
                Array(count).fill().map((element, index) => {
                    return vheicle.methods.Szervizesemenyek(index).call();
                })
            );
        }


        console.log(summary);

        return {
            address: props.query.address,
            id: summary[0],
            gyarto: summary[1],
            evjarat: summary[2],
            uzemanyag: summary[3],
            tulajdonos: summary[4],
            SzervizesemenyCount: count,
            SzervizEsemenyek: szervizLogs
        };
    }

    renderCards() {
        const {
            id,
            gyarto,
            evjarat,
            uzemanyag,
            tulajdonos,
            SzervizesemenyCount
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
                meta: 'Fuel',
                description: 'The correct type of fuel needed to power the vheicle'
            },
            {
                header: tulajdonos,
                meta: 'Owner',
                description: 'The current owner of the vheicle',
                style: {overflowWrap: 'break-word'}
            }
        ];

        return <Card.Group items={items}/>
    }

    renderRows() {
        return this.props.SzervizEsemenyek.map((szervizEsemeny, index) => {
            return <SzervizLogRow
                key={index}
                szervizEsemeny={szervizEsemeny}
            />;
        });
    }

    render() {
        const {Header, Row, HeaderCell, Body} = Table;

        return (
            <Layout>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <AddServiceLog address={this.props.address}/>
                    </Grid.Column>
                </Grid>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Szervíz azonosító</HeaderCell>
                            <HeaderCell>Kilóméteróra állás</HeaderCell>
                            <HeaderCell>Dátum</HeaderCell>
                            <HeaderCell>Végösszeg</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
            </Layout>
        );
    }
}

export default VheicleShow;