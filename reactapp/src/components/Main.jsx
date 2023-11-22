import '../index.css';
import Filters from './Filters';
import { Link } from "react-router-dom"; 
import Card from './Card';
import RangeFilter from './RangeFilter';
import SelectionFilter from './SelectionFilter';
import CompareFilter from './CompareFilter';
import { useState } from 'react';
import Warning from './Warning';
import CardsContext from './CardsContext';
import Button from './Button';
import RemoveContext from './RemoveContext';
import OptionContext from './OptionContext';

function Main() {

  let films = JSON.parse(localStorage.getItem("FILMS"));
  if (!films) films = [];

  const [currList, setCurrList] = useState([...films]);
  const [isWarn, setIsWarn] = useState(false);
  const [removeable, setRemoveable] = useState(-1);
  
  let range1 = {
    id: "date-filter",
    title: "Год выпуска:",
    startTitle: "с",
    endTitle: "по",
    minStart: 1900,
    minEnd: 1900,
    maxStart: 2100,
    maxEnd: 2100,
    measure: "год",
  };

  let selection1 = {
      id: "age-filter",
      title: "Возрастной рейтинг",
      select: {
          isReq: false,
          options: [
              {value: "-1", innerHtml: "Любой"},
              {value: "0", innerHtml: "0+"},
              {value: "6", innerHtml: "6+"},
              {value: "12", innerHtml: "12+"},
              {value: "16", innerHtml: "16+"},
              {value: "18", innerHtml: "18+"},
          ]
      },
  };

  let compare1 = {
      title: "Жанр",
      id: "type-filter",
      input: {
          placeholder: "Жанр",
          pattern: "[a-zA-Zа-яА-ЯёЁ]{1,20}",
          isReq: false,
      },
  };

  let compare2 = {
    title: "Режиссер",
    id: "author-filter",
    input: {
        placeholder:"Режиссер",
        pattern: "[a-zA-Zа-яА-ЯёЁ]{1,20}",
        isReq: false,
    },
};

  let filter = {
    invoke: (event) => {

      event.preventDefault();

      let dateS = Number(document.querySelectorAll("#date-filter input")[0].value);
      let dateE = Number(document.querySelectorAll("#date-filter input")[1].value);

      let age = Number(document.querySelector("#age-filter select").value);

      let type = (document.querySelector("#type-filter input").value);
      let author = (document.querySelector("#author-filter input").value);

      if (dateE === 0) dateE = range1.maxEnd;

      let currListTmp = [].concat(films);
      
      if (dateS)
        for (let i = 0; i < currListTmp.length; i++){
          if (currListTmp[i].date < dateS || currListTmp[i].date > dateE)
            currListTmp[i] = null;
        }
      
      if (age !== -1)
        for (let i = 0; i < currListTmp.length; i++){
          if (currListTmp[i] && currListTmp[i].age !== age)
            currListTmp[i] = null;
        }
      
      if (type)
        for (let i = 0; i < currListTmp.length; i++){
          if (currListTmp[i] && !currListTmp[i].type.includes(type))
            currListTmp[i] = null;
        }
      
      if (author)
        for (let i = 0; i < currListTmp.length; i++){
          if (currListTmp[i] && !currListTmp[i].author.includes(author))
            currListTmp[i] = null;
        }

      setCurrList(currListTmp.filter((elem) => elem != null));
    },
    arr: [
      <RangeFilter props={range1} key="date-filter"/>,
      <SelectionFilter props={selection1} key="age-filter"/>,
      <CompareFilter props={compare1} key="type-filter"/>,
      <CompareFilter props={compare2} key="author-filter"/>,
    ]
  };

  /* Обработка удаления фильма */

  /*Поставить фильм на удаление */
  const remove = (id) => {
    setIsWarn(true);
    setRemoveable(id);
  }

  /* Удалить */
  const yesF = () => {
    let films = JSON.parse(localStorage.getItem("FILMS"));

    let newFilms = films;
    for(let i = 0; i < films.length; i++){
      if (films[i].id === removeable){
        newFilms = films.slice(0,i).concat(films.slice(i+1, films.length));
        break;
      }
    }

    localStorage.setItem("FILMS", JSON.stringify(newFilms));
    setCurrList(newFilms);
    noF();
  }

  /* Отменить Удаление */
  const noF = () => {
    setIsWarn(false);
    setRemoveable(-1);
  }

  /* FETCH фильмы */
  const randomFilms = () => {

    console.log("Waiting for data");
    const url = "https://api.kinopoisk.dev/v1.3/movie/random";

    fetch(url, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": "YW6TWW9-X4AM2MH-HR4R7JA-JQJ9XX5",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        let films = JSON.parse(localStorage.getItem("FILMS"));
        let id = JSON.parse(localStorage.getItem("FILMSID"));

        if (films == null) films = [];
        if (id == null) id = 0;

        id++;
        
        let ans = {
          id: id,
          title: result.name,
          date: result.year,
          duration: result.movieLength,
          age: result.ageRating,
          type: null,
          country: null,
          author: null,
          composer: null,
          artist: null,
          producer: null,
          poster: result.poster.url,
          status: 0,
        }
        
        for (let  i = 0; i < result.persons.length; i++) {
          if (!ans.author && result.persons[i].profession === "режиссеры"){
            if (result.persons[i].name != null) ans.author = result.persons[i].name;
            else ans.author = result.persons[i].enName;
          }

          if (!ans.producer && result.persons[i].profession === "продюсеры"){
            if (result.persons[i].name != null) ans.producer = result.persons[i].name;
            else ans.producer = result.persons[i].enName;
          }

          if (!ans.composer && result.persons[i].profession === "композиторы"){
            if (result.persons[i].name != null) ans.composer = result.persons[i].name;
            else ans.composer = result.persons[i].enName;
          }

          if (!ans.artist && result.persons[i].profession === "художники"){
            if (result.persons[i].name != null) ans.artist = result.persons[i].name;
            else ans.artist = result.persons[i].enName;
          }
        }
        
        if (result.genres.length > 0) ans.type = result.genres[0].name;
        if (result.countries.length > 0) ans.type = result.countries[0].name;

        films.push(ans);
        
        setCurrList(films);
        localStorage.setItem("FILMS", JSON.stringify(films));
        localStorage.setItem("FILMSID", JSON.stringify(id));
      });
  }

  return (
    <main className="films">

        {isWarn ? 
        <OptionContext.Provider value={{yes: yesF, no: noF}}>
          <Warning/>
        </OptionContext.Provider>
         : ""
        }

        <div className="tools">  
            <Filters props={filter}/>
        </div>

        <article className="films-header">
            <h1 className="c m">Фильмотека</h1>
            <Link to="/form" className="add-film c m"><p className="add-film-inner">Добавить Фильм</p></Link>
            <Button props={{type: "button", classOut: "add-rand-film c", classIn: "add-rand-film-inner", innerHtml: "Random Film", onClick: () => {randomFilms()}}}/>
        </article>

        <div className="cards">
          <CardsContext.Provider value={setCurrList}>
          {
            currList == null ? "" :
            currList.map((e,i) => 
              <RemoveContext.Provider key={i} value={() => remove(e.id)}>
                <Card ans={e}/>
              </RemoveContext.Provider>
            )
          }
          </CardsContext.Provider>
        </div>

    </main>
  );
}

export default Main;