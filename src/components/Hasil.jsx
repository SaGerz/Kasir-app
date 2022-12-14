import axios from "axios";
import React, {Component} from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { API_URL } from "../Utils/constants";
import { numberWithCommas } from "../Utils/Utils";
import ModalShow from "./ModalShow";
import Total from "./Total";
import swal from "sweetalert";

export default class Hasil extends Component{
    constructor(props){
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            totalHarga: 0,
        }
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false,
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    kurang = () => {
        if(this.state.jumlah > 0) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })

    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        this.handleClose();

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        }

        axios.put(`${API_URL}/keranjangs/${this.state.keranjangDetail.id}`, data)
            .then(res => {
              this.props.getListKerangjangs();
                swal({
                    title: "Update Pesanan!",
                    text: "succes Update Pesanan! " + data.product.nama,
                    icon: "success",
                    button: "Close",
                  });
                }) 
                .catch((err) => {
                  console.log(err)
            })
    }

    handleDelete = (id) => {
        this.handleClose();

        axios.delete(`${API_URL}/keranjangs/${id}`)
            .then(res => {
              this.props.getListKerangjangs();
                swal({
                    title: "Mengapus Pesanan!",
                    text: "succes menghapus Pesanan! " + this.state.keranjangDetail.product.nama,
                    icon: "error",
                    button: "Close",
                  });
                })
                .catch((err) => {
                  console.log(err)
            })
    }
        
    render(){
        const {keranjangs} = this.props
        return (
            <Col md={3} className="mt-3">
                <h4>Hasil</h4>
                <hr />
                {keranjangs !== 0 && (
                <Card className="overflow-auto hasil">
                    <ListGroup variant="flush">
                        {keranjangs.map(menuKeranjang => {
                            return (
                                <ListGroup.Item key={menuKeranjang.id} onClick={() => {this.handleShow(menuKeranjang)}} >
                                    <Row>
                                        <Col xs={2} >
                                            <h4>
                                                <Badge pill bg="success">{menuKeranjang.jumlah}</Badge>
                                            </h4>
                                        </Col>
                                        <Col>
                                            <h5>{menuKeranjang.product.nama}</h5>
                                            <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                                        </Col>
                                        <Col>
                                            <strong align="end">
                                                <p>Rp. {numberWithCommas(menuKeranjang.total_harga)}</p>
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}

                        <ModalShow handleClose={this.handleClose} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} {...this.state} />
                    </ListGroup>
                </Card>
                )}

                <Total keranjangs={keranjangs} {...this.props} />
            </Col>
        )
    }
}