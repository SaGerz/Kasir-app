import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, Container } from 'react-bootstrap';
import {ListCategories, Hasil, Menus} from "../components"
import {API_URL} from '../Utils/constants'
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      menus: [],
      chooseCate: "" ,
      keranjangs: []
    }
  }

  componentDidMount(){
    axios
      .get(`${API_URL}/products`)
      .then(res => {
        const menus = res.data;
        this.setState({menus})
      })
      .catch(error => {
        console.log(error)
      })
  
      this.getListKerangjangs();
  
  }

  // componentDidUpdate(prevState) {
  //   if(this.state.keranjangs !== prevState.keranjangs){
  //       axios
  //       .get(`${API_URL}/keranjangs`)
  //       .then(res => {
  //         const keranjangs = res.data
  //         this.setState({keranjangs})
  //       })
  //   }
  // }


  getListKerangjangs = () => {
    axios
    .get(`${API_URL}/keranjangs`)
    .then(res => {
      const keranjangs = res.data
      this.setState({keranjangs})
    })
  }

  changeCategory = (value) => {
    this.setState({
       menus: [],
       chooseCate: value
    })
  
    axios
      .get(`${API_URL}/products?category.nama=${value}`)
      .then(res => {
        const menus = res.data
        this.setState({menus})
      })
      .catch(error => {
        console.log(error)
      })
  }

  masukKeranjang = (value) => {
    axios
      .get(`${API_URL}/keranjangs?product.id=${value.id}`)
      .then(res => {
         if (res.data.length === 0) {
           const kerangjang = {
             jumlah: 1,
             total_harga: value.harga,
             product: value
          }
       
           axios
             .post(`${API_URL}/keranjangs`, kerangjang)
             .then(res => {
              this.getListKerangjangs();
               swal({
                 title: "Good job!",
                 text: "succes memilih " + kerangjang.product.nama,
                 icon: "success",
                 button: "Close",
               });
             }) 
             .catch((err) => {
               console.log(err)
             })  
         } else {
          const kerangjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value
           }

           axios
              .put(`${API_URL}/keranjangs/${res.data[0].id}`, kerangjang)
              .then((res) => {
              this.getListKerangjangs();
                swal({
                  title: "Good job!",
                  text: "succes memilih " + kerangjang.product.nama,
                  icon: "success",
                  button: "Close",
                });
              })
              .catch(err => console.log(err))
         }
      })
      .catch(error => {
        console.log(error)
      }) 
  }


  render(){
    const menus = this.state.menus;
    const keranjangs = this.state.keranjangs;
    return (
        <div className="mt-3" >
          <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} chooseCate={this.state.chooseCate} />
            <Col className='mt-3'>
                <h4>Product</h4>
                <hr />
                <Row>
                  {menus && menus.map((menus) => {
                    return (
                      <Menus key={menus.id} menu={menus} masukKeranjang={this.masukKeranjang} />
                    )
                  })}
                </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} getListKerangjangs={this.getListKerangjangs} />
          </Row>
          </Container>
        </div>
    )
  }
}
