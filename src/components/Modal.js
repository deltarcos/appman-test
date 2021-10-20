import React, { useState, useEffect }from 'react'
import Modal from '@mui/material/Modal';
import search from '../search.png'
import ModalCard from './ModalCard';
import './Modal.css'

const Footer = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [inputName, setInputName] = useState('');
    const handleInputName = (e) => {
        setInputName(e.target.value);
    }

    const [inputType, setInputType] = useState('');
    const handleInputType = (e) => {
        setInputType(e.target.value)
    }

    const handleValueChange = () => {
        getData(inputName, inputType);
    }

    useEffect(() => {
        handleValueChange();
    }, [inputName]);
    useEffect(() => {
        handleValueChange();
    }, [inputType]);

    const [ data, setData] = useState([]);
    
    const getData = async (inputName, inputType) => {
        const url = `http://localhost:3030/api/cards?limit=20&name=${inputName}&type=${inputType}`;    
        const resp = await fetch(url);
        const respJson = await resp.json();
        setData(respJson.cards);
        checkDuplicate(respJson.cards);
    }

    const checkDuplicate = (data) => {
        const valueArr1 = data.map(function(item){ return item });
        const set = new Set(props.cards.map(function(item){ return item.id }));

        let temp = [];
        valueArr1.filter(item => {
            if (!set.has(item.id)) {
                temp.push(item)
            }
        });
        setData(temp);
    }

    const handleAdd = (item) => {
        props.onAdd(item)
        removeCard(item.id)
    }

    const removeCard = (id) => {
        let temp = [...data]
        temp.splice(temp.findIndex(function(i){ return i.id === id; }), 1);
        setData(temp);
    }

    return (
        <>
        <Modal open={open} onClose={handleClose}>
            <div className="modal">
                <input type="text" placeholder="Find Pokemon Name" onChange={handleInputName} value={inputName} />
                <input type="text" placeholder="Find Pokemon Type" onChange={handleInputType} value={inputType} />
                <div className="search-img"><img src={search} alt="searchImg"/></div>
                <div className="container-modal-card">
                <ModalCard cards={data} onAdd={handleAdd} />
                </div>
            </div>
        </Modal>


        <div className="footer-container">
            <div className="addBtn" onClick={handleOpen}>+</div>
        </div>
        </>
    )
}

export default Footer;