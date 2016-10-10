import React from 'react';
import ReactDOM from 'react-dom';

import { Header, Navbar, Nav, Row, Col } from 'rsuite';
import Markdown from './Markdown';

import '../src/less/index.less';
import './less/index.less';

import SimpleExample from './SimpleExample';
import OptionGroupExample from './OptionGroupExample';
import CustomLabelExample from './CustomLabelExample';
import MultipleExample from './MultipleExample';

const App = React.createClass({
    render() {

        return (
            <div className="doc-page">
                <Header  inverse>
                    <div className="container">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#"><span className="prefix">R</span>Suite  Picker</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                <Nav.Item  href="https://github.com/rsuite/rsuite-table">GitHub</Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Header>

                <div className="container">
                    <p className="sub-title">A react component for replacing default select and dropdown.</p>
                    <h2>Single pickers</h2>
                    <Row>
                        <Col md={6}>
                            <Markdown>
                                {require('./SimpleExample.md') }
                            </Markdown>
                        </Col>
                        <Col  md={6}>
                            <SimpleExample />
                        </Col>
                    </Row>

                    <h2>Option group support</h2>
                    <Row>
                        <Col md={6}>
                            <Markdown>
                                {require('./OptionGroupExample.md') }
                            </Markdown>
                        </Col>
                        <Col  md={6}>
                            <OptionGroupExample />
                        </Col>
                    </Row>

                    <h2>Custom label</h2>
                    <Row>
                        <Col md={6}>
                            <Markdown>
                                {require('./CustomLabelExample.md') }
                            </Markdown>
                        </Col>
                        <Col  md={6}>
                            <CustomLabelExample />
                        </Col>
                    </Row>

                    <h2>Multiple pickers</h2>
                    <Row>
                        <Col md={6}>
                            <Markdown>
                                {require('./MultipleExample.md') }
                            </Markdown>
                        </Col>
                        <Col  md={6}>
                            <MultipleExample />
                        </Col>
                    </Row>

                    <Markdown>
                        {require('./props.md') }
                    </Markdown>

                </div>
            </div>
        );
    }
});

ReactDOM.render(<App/>,
    document.getElementById('app')
);
