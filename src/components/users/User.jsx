import react from 'react'
import './user.css'

function Users({ user }) {

  return (
    <div className='singleUserDiv'>
        <div className="userDetails">
        <h3>{user.firstName + ' ' + user.lastName}</h3>
          <ul>
            <li>{user.email}</li>
            <li>{user.city}</li>
            <li>{user.streetName}</li>
            <li>{user.postalCode}</li>
            <li>{user.mobile || null}</li>
            <li>{user.profilePic || null}</li>
            <li>{user.company || null}</li>
          </ul>
        </div>
        <div className="buttons">
          <button className="btn">Edit</button>
          <button className="btn">Del</button>
        </div>
    </div>
  )
}

export default Users