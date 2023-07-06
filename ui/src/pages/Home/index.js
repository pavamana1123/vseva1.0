import React, { useEffect, useState } from 'react';
import "./index.css"
import Header from '../../components/header';
import API from '../../api';
import _ from "../../_"

function Home(props){

    _.auth()

    return (
        <div>
            Hare Krishna
        </div>
    )
}


export default Home
