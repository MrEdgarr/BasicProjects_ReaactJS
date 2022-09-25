import React from 'react'
import { useGlobalContext } from '../context/context'
import Users from './Users';
import Loading from './Loading'

const UserList = () => {
    const { user, loading } = useGlobalContext();

    if (loading) {
        return <Loading />
    }

    if (user.length < 1) {
        return <h2 className='section-title'>
            no cocktails matched your search criteria
        </h2>
    }

    return (
        <section className='section'>
            <h2 className='section-title'>
                users
            </h2>
            <div className='users-center'>
                {
                    user.map((item) => {
                        return <Users key={item.id} {...item} />
                    })
                }
            </div>
        </section>
    )
}

export default UserList