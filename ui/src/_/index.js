import Cookies from 'js-cookie'

const getSave = ()=>{
  try {
    return JSON.parse(Cookies.get("save"))
  }catch{
    return {}
  }
}

const setSave = (save)=>{
  try {
    return Cookies.set("save", JSON.stringify(save, null, 0))
  }catch{
    return {}
  }
}

const auth = ()=>{
  if(window.location.pathname.startsWith('/login')){
    if(Cookies.get('save')){
      window.location.href = (()=>{
        return new URLSearchParams(window.location.search).get('redirect') || '/home'
      })()
    } 
  }else{
    if(!Cookies.get('save')){
      window.location.href = `/login?redirect=${window.location.pathname}`
    }
  }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^\d{10}$/

const preacherList = [  
  'Alarnath Dasa',
  'Hiranyavarna Dasa',
  'Krishna Keshav Dasa',
  'Karunya Sagar Dasa',
  'Mahapurana Dasa',
  'Pankajanghri Dasa',
  'Pavan Prana Dasa',
  'Sanaka Kumar Dasa',
  'Saumya Rupa Krishna Dasa',
  'Vishnu Charan Dasa']

const _ = {
    getSave,
    setSave,
    auth,
    emailRegex,
    phoneRegex,
    preacherList
}

export default _