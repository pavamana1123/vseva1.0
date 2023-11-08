import { useRef, useState } from 'react';
import './index.css';
import _ from "../../_"
import menu from "../../menu"


function Header(props) {
  var {children} = props

  var [menuOpen, setMenuOpen] = useState(false);
  var [contextMenuOpen, setContextMenuOpen] = useState(false);
  var [userProfileOpen, setUserProfileOpen] = useState(false);

  const toggleMenu = ()=>{
    setMenuOpen(!menuOpen)
  }

  const toggleContextMenu = ()=>{
    setContextMenuOpen(!contextMenuOpen)
  }

  const showUserProfile = ()=>{
    setUserProfileOpen(true)
  }

  const hideUserProfile = ()=>{
    setUserProfileOpen(false)
  }

  const closeMenu = ()=>{
    setMenuOpen(false)
  }

  const closeContextMenu = ()=>{
    setContextMenuOpen(false)
  }

  const save =  useRef(_.getSave())

  return (
    <div className="header-holder">
      <div className='header'>
          <img src={userProfileOpen?`img/header/close.png`:`img/header/menu.png`} id="header-menu" onClick={userProfileOpen?hideUserProfile:toggleMenu}/>
          <div className='header-text'>ISKCON Mysore Volunteering</div>
          <div className={`header-dp-init ${userProfileOpen?'hide':''}`} style={{background: save.current.name.color()}} onClick={showUserProfile}>{_.getInitials(save.current.name)}</div>
      </div>

      <div className={`header-menu ${menuOpen?'open':''}`}>
        <div className='header-menu-cont'>
          <div className='header-menu-items-cont'>
            <div className='header-menu-items'>
                <hr className='menu-items-sep'/>

            </div>
            <div className='header-settings-cont'>
                <hr className='menu-items-sep'/>
                <a className='header-menu-item' href='/settings' target='_self'>
                  {`Settings`}
                </a>
                <div className='header-menu-item signout'>
                  {`Sign Out`}
                </div>
            </div>
          </div>

        </div>
      </div>

      <div className={`header-contextmenu ${contextMenuOpen?'open':''}`}>
        {children}
      </div>

      <div></div>

      <div className={`header-menuglass ${!menuOpen?'hide':''}`} onClick={closeMenu}>
      </div>
      {contextMenuOpen?<div className={`header-contextmenuglass`} onClick={closeContextMenu}>
      </div>:null}
    </div>


  );
}

export default Header;
