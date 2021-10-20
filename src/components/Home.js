import React, { useState }from 'react'
import Cards from './Cards'
import Footer from './Modal'

const Home = () => {
    const [cards, setCards] = useState([])

    const handleDelete = (id) => {
        let temp = [...cards]
        temp.splice(temp.findIndex(function(i){ return i.id === id; }), 1);
        setCards(temp);
    }

    const handleAdd = (item) => {
        let temp = [...cards]
        temp.push(item);
        setCards(temp);
    }

    return(
        <>
            <h1 className="app-name">My Pokemon</h1>
            <div className="card-container">
             <Cards cards={cards} onDelete={handleDelete} />
            </div>
            <Footer onAdd={handleAdd} cards={cards}/>
        </>
    )
}

export default Home;