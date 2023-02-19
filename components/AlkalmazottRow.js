import React, {Component} from "react";
import {Table} from "semantic-ui-react";

class AlkalmazottRow extends Component {
    render() {
        const {Row, Cell} = Table;
        const {alkalmazott} = this.props;

        return (
            <Row>
                <Cell>{alkalmazott.Azonosito}</Cell>
                <Cell>{alkalmazott.Nev}</Cell>
            </Row>
        );
    }
}

export default AlkalmazottRow;