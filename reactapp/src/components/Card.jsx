import '../index.css';
import def from '../images/default.jpeg';
import { useContext } from 'react';
import CardsContext from './CardsContext';
import Button from './Button';
import RemoveContext from './RemoveContext';

function Card({ans}) {
    
    let back = ans.poster ? `url(${ans.poster})` : `url(${def})`;
    let eq = ["Не просмотрен", "В планах", "Просмотрен"];

    let setCurrList = useContext(CardsContext);

    const switchStatus = () => {
        let newStatus = (ans.status + 1)%eq.length;

        let films = JSON.parse(localStorage.getItem("FILMS"));
        
        for (let i = 0; i < films.length; i++) 
            if(films[i].id === ans.id){
                films[i].status = newStatus;
                break;
            }
            
        setCurrList(films);
        localStorage.setItem("FILMS", JSON.stringify(films));
    }

    return (
        <article className="card" style={{backgroundImage: back}}>
           
            <Button props={{type: "button", classOut: "card-remove", classIn: "inner-card-remove", innerHtml: "X", onClick: useContext(RemoveContext)}}/>
            <Button props={{type: "button", classOut: "card-status c status-"+ans.status, classIn: "inner-card-status", onClick: switchStatus, innerHtml: eq[ans.status]}}/>
            
            <div className="inner-card">

                <div className="card-main-row">
                    <p className="card-title">{ans.title}</p>
                    {ans.age != null ? <p className="card-age c">{ans.age + "+"}</p> : ""}
                </div>

                <div className="card-rows">

                    {ans.date ?
                    <div className="card-row">
                        <p className="card-year p-card">Год выпуска: {ans.date}</p>
                    </div>
                    : ""}

                    {ans.duration ?
                    <div className="card-row">
                        <p className="card-duration m-in-row p-card">Длительность: {ans.duration} мин</p>
                    </div>
                    : ""}

                    {ans.country ?
                    <div className="card-row">
                       <p className="card-type p-card">Страна: {ans.country}</p>
                    </div>
                     : ""}

                    {ans.type ? 
                    <div className="card-row">
                        <p className="card-type p-card">Жанр: {ans.type}</p>
                    </div>
                    : ""}

                    {ans.author ?   
                    <div className="card-row">
                        <p className="card-author p-card">Режиссер: {ans.author}</p>
                    </div>
                    : ""}

                    {ans.producer ?   
                    <div className="card-row">
                        <p className="card-producer p-card">Продюсер: {ans.producer}</p>
                    </div>
                    : ""}

                    {ans.artist ?   
                    <div className="card-row">
                        <p className="card-artist p-card">Художник: {ans.artist}</p>
                    </div>
                    : ""}

                    {ans.composer ?   
                    <div className="card-row">
                        <p className="card-composer p-card">Композитор: {ans.composer}</p>
                    </div>
                    : ""}
                </div>

            </div>
        </article>
    );
}

export default Card;

