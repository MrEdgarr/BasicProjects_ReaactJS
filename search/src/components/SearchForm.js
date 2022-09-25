import React from 'react'
import { useGlobalContext } from '../context/context'

const SearchForm = () => {
    const { setsearchFterm } = useGlobalContext()
    
    return (
        <section className='section search'>
            <form className='search-form'>
                <div className='form-control'>
                    <label htmlFor='name'>search your favorrit cocktail</label>
                    <input
                        type="text"
                        id='name'
                        onChange={(e)=>setsearchFterm(e.target.value)}
                    />
                </div>
            </form>
        </section>
    )
}

export default SearchForm