import React, { useCallback, useContext, useEffect, useState } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [loading, setloading] = useState(true)
    const [user, setUser] = useState([])
    const [searchFterm, setsearchFterm] = useState('a')
    console.log(searchFterm);

    /**
     * It fetches data from an API, then sets the state of the component to the data it fetched.
     */
    const fetchData = useCallback(() => {
        setloading(true)
        fetch(`${url}${searchFterm}`)
            .then(response => response.json())
            .then(data => {
                setloading(false);
                const { drinks } = data;//gán

                if (drinks) {
                    const newCocktails = drinks.map((item) => {
                        const {
                            idDrink,
                            strDrink,
                            strDrinkThumb,
                            strAlcoholic,
                            strGlass
                        } = item;
                        return {
                            id: idDrink,
                            name: strDrink,
                            image: strDrinkThumb,
                            info: strAlcoholic,
                            glass: strGlass
                        }
                    })
                    setUser(newCocktails); //nạp dữ liệu
                } else {
                    setUser([])
                }
            })
            .catch(error => {
                console.log(error);
                setloading(false)
            })
    },[searchFterm])

    useEffect(() => {
        fetchData();
    }, [searchFterm, fetchData])

    return <AppContext.Provider value={{
        loading,
        user,
        setsearchFterm,
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }