import '../index.css';
import InputBlock from './InputBlock';
import Select from './Select';
import Button from './Button';

function Form() {

    let title = {
        id: "title-block",
        title: "Название",
        isReq: true,
        list: <input type="text" placeholder="Название" pattern="[^<>]{3,30}" required/>
    }

    let date = {
        id: "date-block",
        title: "Год выпуска",
        isReq: true,
        list: <input type="number" placeholder="2022" min="1900" max="2100" required/>,
    }

    let duration = {
        id: "duration-block",
        title: "Длительность",
        isReq: true,
        list: <input type="number" placeholder="120" min="0" max="240" required/>,
    }

    let optionAge = [
        {value: "0", innerHtml: "0+"},
        {value: "6", innerHtml: "6+"},
        {value: "12", innerHtml: "12+"},
        {value: "16", innerHtml: "16+"},
        {value: "18", innerHtml: "18+"},
    ];

    let age = {
        id: "age-block",
        title: "Возрастное ограничение",
        isReq: true,
        list: <Select props={{options: [].concat(optionAge), isReq: true}}/>,
    }

    let type = {
        id: "type-block",
        title: "Жанр",
        isReq: true,
        list: <input type="text" placeholder="Жанр" pattern="[^0-9]{3,20}" required/>
    };

    let country = {
        id: "country-block",
        title: "Cтрана",
        isReq: true,
        list: <input type="text" placeholder="Страна" pattern="[^0-9]{3,20}" required/>
    };

    let author = {
        id: "author-block",
        title: "Режиссер",
        isReq: true,
        list: <input type="text" placeholder="Режиссер" pattern="[^0-9]{3,40}" required/>
    };

    let artist = {
        id: "artist-block",
        title: "Художник",
        isReq: true,
        list: <input type="text" placeholder="Художник" pattern="[^0-9]{3,40}" required/>
    };

    let producer = {
        id: "producer-block",
        title: "Продюсер",
        isReq: true,
        list: <input type="text" placeholder="Продюсер" pattern="[^0-9]{3,40}" required/>
    };

    let composer = {
        id: "composer-block",
        title: "Композитор",
        isReq: true,
        list: <input type="text" placeholder="Композитор" pattern="[^0-9]{3,40}" required/>
    };
    
    const submitHandle = () => {
        
        let key1 = [
            "#title-block input", 
            "#date-block input", 
            "#duration-block input",
            "#age-block select", 
            "#type-block input",
            "#country-block input",
            "#author-block input",
            "#composer-block input",
            "#artist-block input",
            "#producer-block input",
        ];
        let res1 = key1.map((elem) => document.querySelector(elem).value);

        let films = JSON.parse(localStorage.getItem("FILMS"));
        let id = JSON.parse(localStorage.getItem("FILMSID"));

        if (films == null) films = [];
        if (id == null) id = 0;

        id++;

        let ans = {
            id: id,
            title: res1[0],
            date: res1[1],
            duration: res1[2],
            age: res1[3],
            type: res1[4],
            country: res1[5],
            author: res1[6],
            composer: res1[7],
            artist: res1[8],
            producer: res1[9],
            poster: null,
            status: 0,
        }

        films.push(ans);
        
        localStorage.setItem("FILMS", JSON.stringify(films));
        localStorage.setItem("FILMSID", JSON.stringify(id));      
    }



    return (
        <main className="form-holder">

            <div className="h2-holder">
                <h2 className="form-title c">Добавление фильма</h2>
            </div>
            
            <form className="add-film-form" onSubmit={submitHandle}>
                <div className="group">
                    <InputBlock props={title}/>
                    <InputBlock props={date} key={"age"}/>
                </div>

                <div className="group">
                    <InputBlock props={duration} key={"date"}/>
                    <InputBlock props={age} key={"duration"}/>
                </div>

                <div className="group">
                    <InputBlock props={type} key={"type"}/>
                    <InputBlock props={country} key={"country"}/>
                </div>

                <div className="group">
                    <InputBlock props={author} key={"author"}/>
                    <InputBlock props={composer} key={"composer"}/>
                </div>  

                <div className="group">
                    <InputBlock props={artist} key={"artist"}/>
                    <InputBlock props={producer} key={"producer"}/>
                </div>
                
                <Button props={{type: "submit", classOut: "submit", classIn: "inner-submit", innerHtml: "Добавить", onClick: null}}/>
            </form>

        </main>
    );
}

export default Form;