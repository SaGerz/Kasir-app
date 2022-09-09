import React, { Component } from "react";
import {Link} from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { API_URL } from "../Utils/constants";
import axios from "axios";

export default class Succes extends Component {
    componentDidMount(){
        axios
        .get(`${API_URL}/keranjangs`)
        .then(res => {
          const keranjangs = res.data
          keranjangs.map(function (item){
              return axios 
                    .delete(`${API_URL}/keranjangs/${item.id}`)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
          })
        })
  
    }

    render (){
        return (
            <div className="mt-4 text-center">
                <Image src="assets/images/succes.png" width="500" />
                <h2>Sukes Memesan</h2>
                <p>Terimakasih sudah memesan</p>
                <Button variant="primary" as={Link} to="/">Kembali</Button>
            </div>
        )
    }
}
