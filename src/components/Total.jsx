import React from "react";
import { Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Utils";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../Utils/constants";
import { useNavigate } from "react-router-dom";

// export default class Total extends Component {
    
//     sumbitPesanan = (totalHarga) => {
//         const pesanan = {
//             totalHarga: totalHarga,
//             menus: this.props.keranjangs
//         }
        
//         axios.post(`${API_URL}/pesanans`, pesanan)
//             .then(res => {
//                 this.props.history.push('/succes')
//             })
//     }

//     render(){
//         const totalHarga = this.props.keranjangs.reduce(function(result, item) {
//             return result + item.total_harga;
//         },0)
     
//         return (
//             <div className="fixed-bottom">
//                 <Row >
//                     <Col md={{span:3, offset: 9}} className="px-4" >
//                         <h5>
//                             Total Harga : {" "} 
//                             <strong className="float-right mr-2" >
//                                Rp. {numberWithCommas(totalHarga)}
//                             </strong>
//                         </h5>
//                         <div className="d-grip gap-4">
//                         <Button variant="primary" size="lg" className='mt-4 mb-2 me-2' onClick={() => this.sumbitPesanan(totalHarga)}>
//                         <FontAwesomeIcon icon={faShoppingCart}/><strong>BAYAR</strong> 
//                         </Button>
//                         </div>
//                     </Col>
//                 </Row>
//             </div>
//         )
//     }
// }

// // export default withRouter(Total)


const Total = (props) => {

    const navigate = useNavigate();
    
    const sumbitPesanan = (totalHarga) => {
        const pesanans = {
            totalHarga: totalHarga,
            menus: props.keranjangs
        }
    
        axios.post(`${API_URL}/pesanans`, pesanans)
            .then(res => {
                navigate('/succes')
            }) 
    }

    const totalHarga = props.keranjangs.reduce(function(res, item){
        return res + item.total_harga;
    }, 0)

    return(
        <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
            <Row >
                    <Col md={{span:3, offset: 9}} className="mt-2" >
                        <h5>
                            Total Harga : {" "} 
                            <strong className="float-right mr-2" >
                               Rp. {numberWithCommas(totalHarga)}
                            </strong>
                        </h5>
                        <div className="d-grip gap-4">
                        <Button variant="primary" size="lg" className='mt-4 mb-2 me-2' onClick={() => sumbitPesanan(totalHarga)}>
                        <FontAwesomeIcon icon={faShoppingCart}/><strong>BAYAR</strong> 
                        </Button>
                        </div>
                    </Col>
                </Row>
            </div>

        {/* Mobile */}
        <div className="d-sm-block d-md-none">
            <Row >
                    <Col md={{span:3, offset: 9}} className="px-4" >
                        <h5>
                            Total Harga : {" "} 
                            <strong className="float-right mr-2" >
                               Rp. {numberWithCommas(totalHarga)}
                            </strong>
                        </h5>
                        <div className="d-grip gap-4">
                        <Button variant="primary" size="lg" className='mt-4 mb-2 me-2' onClick={() => sumbitPesanan(totalHarga)}>
                        <FontAwesomeIcon icon={faShoppingCart}/><strong>BAYAR</strong> 
                        </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Total;