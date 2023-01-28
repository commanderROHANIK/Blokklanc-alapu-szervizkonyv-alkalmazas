import React, {Component} from "react";
import {Table} from "semantic-ui-react";

class SzervizLogRow extends Component {
    render() {
        const {Row, Cell} = Table;
        const {szervizEsemeny} = this.props;

        return (
            <Row>
                <Cell>{szervizEsemeny.SzervizId}</Cell>
                <Cell>{szervizEsemeny.KilommeterOraAllas}</Cell>
                <Cell>{szervizEsemeny.Datum}</Cell>
                <Cell>{szervizEsemeny.Vegosszeg}</Cell>
            </Row>
        );
    }
}

export default SzervizLogRow;