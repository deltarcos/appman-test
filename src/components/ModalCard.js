import React from "react";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import cuteimg from '../cute.png'
import { v4 as uuidv4 } from 'uuid';

const ModalCard = (props) => {
    const handleAdd = (item) => {
      props.onAdd(item)
    }
    return(
        <>
        {props.cards.map((card, index) =>
            <Card card={card} onAdd={handleAdd} key={uuidv4()} />
        )}
        </>
    )
}

class Card extends React.Component {
    render() {
      const BorderLinearProgress = styled(LinearProgress)(() => ({
        height: 18,
        borderRadius: 10,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: '#e4e4e4',
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 10,
          backgroundColor: '#f3701a',
        },
      }));
  
      let card = this.props.card;
      let statistic = {};
  
      const calculateHp = (hp) => {
        if (!isNaN(hp)) {
          if (hp > 100) return 100;
          else return parseFloat(hp);
        }
        return 0;
      }
  
      const calculateStr = (attacks) => {
        let total = 0;
        for (let index in attacks) {
          if (attacks[index] !== undefined) total += 1;
        }
        total = total * 50;

        if (total > 100) total = 100;
        return total;
      }
  
      const calculateWeak = (weaknesses) => {
        let total = 0;
        let sum = 0;
        for (let index in weaknesses) {
          if (weaknesses[index] !== undefined) {
            total += 1;
            let val = weaknesses[index].value.replace(/[+,×,-]/g, "");
            sum = sum + parseInt(val);
          }
          
        }
        statistic.weaknessessum = sum;
  
        total = total * 50;
        if (total > 100) total = 100;
        return total;
      }
  
      const calculateDamages = (attacks) => {
        let total = 0;
        for (let index in attacks) {
          let damage = attacks[index].damage;
          if (damage === "" || damage === undefined) {
            damage = "0";
          }
          damage = damage.replace(/[+,×,-]/g, "");
          total = total + parseInt(damage);
        }
        return total;
      }
  
      const calculateHappiness = () => {
        let val = (((statistic.hp / 10) + (statistic.damages / 10) + 10) - statistic.weaknessessum) / 5
        return Math.round(val);
      }
  
      statistic.hp = calculateHp(card.hp);
      statistic.strength = calculateStr(card.attacks);
      statistic.weaknesses = calculateWeak(card.weaknesses);
      statistic.damages = calculateDamages(card.attacks);
      statistic.happiness = calculateHappiness();
  
      function showDeleteBtn(id) {
        document.querySelector("#addbtn-" + id).style.display = "block";
      }
  
      function hideDeleteBtn(id) {
        document.querySelector("#addbtn-" + id).style.display = "none";
      }
  
      return(
        <div className="modal-card-item" onMouseEnter={e => showDeleteBtn(card.id)} onMouseLeave={e => hideDeleteBtn(card.id)}>
          <div className="card-add" id={`addbtn-` + card.id} onClick={e => this.props.onAdd(card)}>Add</div>
          <div className="item-left">
            <img className="card-img" src={card.imageUrl} alt={card.name} />
          </div>
          <div className="item-right">
              <div className="card-name">{card.name}</div>
              <div className="details">
                <div className="text">HP</div>
                <div className="bar"><BorderLinearProgress variant="determinate" value={statistic.hp} /></div>
                <div className="text">STR</div>
                <div className="bar"><BorderLinearProgress variant="determinate" value={statistic.strength} /></div>
                <div className="text">WERK</div>
                <div className="bar"><BorderLinearProgress variant="determinate" value={statistic.weaknesses} /></div>
                <div className="emoji-container">
                  <EmojiCute value={statistic.happiness}/>
                </div>
              </div>
          </div>
        </div>
      )
    }
}

const EmojiCute = (props) => {
    let content = [];
    for (let i = 0; i < props.value; i++) {
      content.push(<div className="emoji-item" key={uuidv4()}><img src={cuteimg} alt="cuteimg" /></div>);
    }
    return content;
}

export default ModalCard;