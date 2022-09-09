import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {Button, Modal, Form, Stack, FloatingLabel } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Utils";

const ModalShow = ({showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit, totalHarga, handleDelete}) => {
    if(keranjangDetail){
        return (
            <div>
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {keranjangDetail.product.nama}
                                <strong>
                                    (Rp. {numberWithCommas(keranjangDetail.product.harga)})
                                </strong>
                            </Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                            <Form onSubmit={handleSubmit} >   
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Total Harga</Form.Label>
                                        <p>
                                            (Rp. {numberWithCommas(totalHarga)})
                                        </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>jumlah</Form.Label>
                                        <br />
                                        <Stack direction="horizontal" gap={2} >
                                            <Button variant="primary" size="sm" className="ml-3" onClick={kurang}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </Button>
                                            <strong>{jumlah}</strong>
                                            <Button variant="primary" size="sm" className="mr-3" onClick={tambah}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </Stack>
                                    </Form.Group>
                                    <FloatingLabel controlId="floatingTextarea2" label="Contoh: Pedas, Nasi Setengah" value={keterangan}>
                                        <Form.Control
                                        as="textarea"
                                        placeholder="Keterangan"
                                        style={{ height: '100px' }}
                                        onChange={(event)=>{changeHandler(event )}} 
                                        />
                                    </FloatingLabel>
                                    <br/>
                                    <Button variant="primary" type="submit">
                                        Send
                                    </Button>
                                </Form>
                            </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => {handleDelete(keranjangDetail.id)}}>
                                    <FontAwesomeIcon icon={faTrash} /> Hapus perubahan
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div>
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Kosong</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>Woohoooooo</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                        Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                        Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )
            
            }   
}

export default ModalShow;