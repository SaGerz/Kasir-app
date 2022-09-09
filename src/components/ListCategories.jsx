import React, {Component} from "react";
import {Col, ListGroup} from "react-bootstrap"
import axios from "axios";
import { API_URL } from "../Utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faCake  } from "@fortawesome/free-solid-svg-icons"
import "../App.css"

  const Icon = ({nama}) => {
   if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensils}  />
   if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />
   if(nama === "Cemilan") return <FontAwesomeIcon icon={faCake} />
   
}

export default class ListCatergories extends Component {
  constructor (props){
    super(props)

    this.state = {
      categories: []
    }
  }  

  componentDidMount(){
    axios
      .get(`${API_URL}/categories`)
      .then(res => {
        const categories = res.data;
        this.setState({ categories })
      })
      .catch(err => {
        console.log(err)
      })
    }

  render(){
        const categories = this.state.categories
        const {changeCategory, chooseCate} = this.props
        return (
          <Col md={2} className="mt-3">
            <h4>Daftar Kategori</h4>
            <hr />
                <ListGroup >
                  {categories && categories.map(categories => {
                    return (
                      <ListGroup.Item key={categories.id} onClick={() => changeCategory(categories.nama)} className={chooseCate === categories.nama && "category-aktif"} style={{cursor: 'pointer'}} >
                        <h5>
                           <Icon nama={categories.nama} /> {categories.nama}  
                        </h5>
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>
          </Col>
        )
    }
}