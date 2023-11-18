import { useEffect, useRef, useState } from 'react';
import './index.css';
import _ from "../../_"
import menu from "../../menu"


function Header(props) {
  var {children} = props

  var [menuOpen, setMenuOpen] = useState(false);
  var [user, setUser] = useState();
  var [contextMenuOpen, setContextMenuOpen] = useState(false);
  var [userProfileOpen, setUserProfileOpen] = useState(false);

  let save = useRef(_.getSave())
  useEffect(()=>{
    setUser(save.current.users[save.current.index])
  }, [])

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

  return (
    user?<div className="header-holder">
      <div className='header'>
          <img src={userProfileOpen?`img/header/close.png`:`img/header/menu.png`} id="header-menu" onClick={userProfileOpen?hideUserProfile:toggleMenu}/>
          <div className='header-text'>ISKCON Mysore Volunteering</div>
          <div className={`header-dp ${userProfileOpen?'hide':''}`} style={{background: user.name.color()}} onClick={showUserProfile}>{_.getInitials(user.name)}</div>
      </div>

      {userProfileOpen && <div className={`header-user-menu`}> 
        <div className='header-user-profile-header'>
            <div className={`header-dp header-user-profle-dp`} style={{background: user.name.color()}}>{_.getInitials(user.name)}</div>
            <div className='header-user-details'>
              <div className='header-username'>{user.name}</div>
              <div className='header-userrole'>{user.role.name}</div>
            </div>
        </div>
        <hr className='header-user-hr'/>

        <div className='header-actions'>
          <div className='header-action-label'>ACTIONS</div>
          <div className='header-action-list'>
            
            <div className='header-action'>
              <img src="img/header/edit-profile.svg" className='header-user-menu-icons header-action-icon'/>
              <div className='header-action-item'>Edit Profile</div>
            </div>

            <div className='header-action'>
              <img src="img/header/add-account.svg" className='header-user-menu-icons header-action-icon'/>
              <div className='header-action-item'>Add User</div>
            </div>

            <div className='header-action'>
              <img src="img/header/notifications.svg" className='header-user-menu-icons header-action-icon'/>
              <div className='header-action-item'>Notifications</div>
            </div>
            
          </div>

        </div>

        {user && save.current.users.length>1?        
          <>
            <hr className='header-user-hr'/>

            <div className='header-accounts'>
              <div className='header-action-label'>SWITCH ACCOUNTS</div>
              <div className='header-action-list'>
                {
                  save.current.users.filter(u=>{
                    return u.name!=user.name
                  }).map(u=>{
                    return <div className='header-action'>
                      <div className={`header-dp header-user-switch-dp`} style={{background: u.name.color()}}>{_.getInitials(u.name)}</div>
                      <div className='header-action-item'>{u.name}</div>
                    </div>
                  })
                }
              </div>

            </div>
          </>:null
        }

      </div>}

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
    </div>:null
  );
}

export default Header;
