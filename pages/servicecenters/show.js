import React, {Component} from "react";
import Layout from '../../components/Layout';
import ServiceCenter from "../../ethereum/serviceCenter";
import {Button, Card, Grid} from "semantic-ui-react";
import {Link} from "../../routes";

class ServiceCenterShow extends Component {
    static async getInitialProps(props) {
        const serviceCenter = ServiceCenter(props.query.address);

        const summary = await serviceCenter.methods.getSummary().call();

        return {
            address: props.query.address,
            manager: summary[0],
            cim: summary[1],
            gps: summary[2],
            email: summary[3],
            nyitvatartas: summary[4]
        };
    }

    renderCards() {
        const {
            manager,
            cim,
            gps,
            email,
            nyitvatartas
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
            },
            {
                header: gps,
                meta: 'GPS',
                description: 'The GPS coordinates of the service center'
            },
            {
                header: email,
                meta: 'E-mail',
                description: 'The e-mail address of the service center'
            },
            {
                header: nyitvatartas,
                meta: 'Open hours',
                description: 'The time when the service center is open'
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
                <Link route={`/services/${this.props.address}/modify`}>
                    <a>
                        <Button
                            primary
                            style={{marginTop: 10}}>
                            Módosítás
                        </Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default ServiceCenterShow;