import { useEffect, useRef, useState } from 'react'
import './index.css'
import _ from "../../_"
import axios from 'axios'

const cdnBase = 'https://cdn.iskconmysore.org/content?path=vseva/dp'

function DP(props) {
  var {user, className, onClick} = props

  var [background, setBackground] = useState({
    backgroundImage: `url(${cdnBase}/${user.id}.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
})
  var [text, setText] = useState("")

  useEffect(()=>{
    axios.head(`${cdnBase}/${user.id}.jpg`)
    .then(()=>{

    })
    .catch(error => {
        setBackground({
            background: user.name.color()
        })
        setText(user.name.initial())
        console.log("Unable to load DP for user id: ", user.id, error)
    })
  }, [])

  return (
    <div className={`header-dp ${className}`} style={background} onClick={onClick}>{text}</div>
  );
}

export default DP;
