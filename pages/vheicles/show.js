import React, {Component} from "react";
import Layout from '../../components/Layout';
import Vheicle from "../../ethereum/vheicle";
import {Button, Card, Grid, Table} from "semantic-ui-react";
import AddServiceLog from "../../components/AddServiceLog";
import SzervizLogRow from "../../components/SzervizLogRow"
import {Link} from "../../routes";

class VheicleShow extends Component {
    static async getInitialProps(props) {
        const vheicle = Vheicle(props.query.address);
        const summary = await vheicle.methods.getSummary().call();
        const count = await vheicle.methods.SzervizesemenyCount().call();
        let szervizLogs = [];

        if (count > 0) {
            for (let i = 0; i < count; i++) {
                szervizLogs.push(await vheicle.methods.Szervizesemenyek(i).call());
            }
        }

        let ev;
        if (summary[7] == 0) {
            ev = 'Out of warranty';
        } else {
            ev = new Date(summary[7]*1000).toDateString();
        }

        return {
            address: props.query.address,
            id: summary[0],
            gyarto: summary[1],
            evjarat: summary[2],
            uzemanyag: summary[3],
            tulajdonos: summary[4],
            SzervizesemenyCount: count,
            SzervizEsemenyek: szervizLogs,
            GaranciaKm: summary[6],
            GaranciaEvek: ev
        };
    }

    renderCards() {
        const {
            id,
            gyarto,
            evjarat,
            uzemanyag,
            tulajdonos,
            GaranciaKm,
            GaranciaEvek
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
                description: 'The company or group who manufatured the vheicle'
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
            },
            {
                header: GaranciaKm,
                meta: 'Kilometers under warranty',
                description: 'The number of kilometers when the vheicle is under warranty'
            },
            {
                header: GaranciaEvek,
                meta: 'Warranty expiration date',
                description: 'The date when the warranty expires'
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
                <Link route={`/vheicles/${this.props.address}/modify`}>
                    <a>
                        <Button
                            primary
                            style={{marginTop: 10}}>
                            Módosítás
                        </Button>
                    </a>
                </Link>
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