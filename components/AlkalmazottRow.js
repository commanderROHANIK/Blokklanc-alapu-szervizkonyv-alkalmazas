import React, {Component} from "react";
import {Table, Button, Icon} from "semantic-ui-react";
import ServiceCenter from "../ethereum/serviceCenter";
import web3 from "../ethereum/web3";

class AlkalmazottRow extends Component {
    onApprove = async () => {
        const szerviz = ServiceCenter(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await szerviz.methods.removeEmploye(this.props.id).send({
            from: accounts[0],
        });
    };

    render() {
        const {Row, Cell} = Table;
        const {alkalmazott} = this.props;

        return (
            <Row>
                <Cell>{alkalmazott.Azonosito}</Cell>
                <Cell>{alkalmazott.Nev}</Cell>
                <Cell>
                    <Button color="red" basic onClick={this.onApprove}>
                        <Icon name='trash'/>
                    </Button>
                </Cell>
            </Row>
        );
    }
}

export default AlkalmazottRow;