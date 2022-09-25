import React from 'react'

const Users = ({ image, name, info, glass }) => {
    return (
        <article className='user'>
            <div className='img-container'>
                <img src={image} alt={name} />
            </div>
            <div className='user-footer'>
                <h3>{name}</h3>
                <h4>{glass}</h4>
                <p>{info}</p>
            </div>
        </article>
    )
}

export default Users