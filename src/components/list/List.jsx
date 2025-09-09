import React from 'react'
import "./list.css"
import Userinfo from './UserInfo/Userinfo'
import Chatlist from './chatList/Chatlist'

const List = () => {
  return (
    <div className='list'>
        <Userinfo />
        <Chatlist />
    </div>
  )
}

export default List