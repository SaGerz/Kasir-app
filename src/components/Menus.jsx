import React from "react";
import { numberWithCommas } from "../Utils/Utils"
import Card from 'react-bootstrap/Card';
import { Col } from "react-bootstrap";

const Menus = (props) => {
    return (
        <Col md={4} xs={6} className="mb-4">
            <Card className="shadow" onClick={() => props.masukKeranjang(props.menu)} >
                <Card.Img variant="top" src={"assets/images/"+props.menu.category.nama.toLowerCase()+"/"+props.menu.gambar} />
                    <Card.Body>
                        <Card.Title>{props.menu.nama}</Card.Title>
                        <Card.Text>
                            Rp. {numberWithCommas(props.menu.harga)}
                        </Card.Text>
                    </Card.Body>
            </Card>
        </Col>
    )
}

export default Menus;