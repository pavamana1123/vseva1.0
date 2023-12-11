import { useEffect, useRef, useState } from 'react'
import './index.css'
import _ from "../../_"
import axios from 'axios'

const cdnBase = 'https://cdn.iskconmysore.org/content?path=vseva/dp'

function DP(props) {
  var {user, className, onClick} = props

  console.log(user.name.initial())

  var [background, setBackground] = useState({
    background: user.name.color()
  })
  var [text, setText] = useState(user.name.initial())

  useEffect(()=>{
    axios.head(`${cdnBase}/${user.id}.jpg`)
    .then(()=>{
      setBackground({
          backgroundImage: `url(${cdnBase}/${user.id}.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
      })
      setText("")
    })
    .catch(error => {
        console.log("Unable to load DP for user id: ", user.id, error)
    })
  }, [])

  return (
    <div className={`header-dp ${className}`} style={background} onClick={onClick}>{text}</div>
  );
}

export default DP;
