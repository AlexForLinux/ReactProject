import '../index.css';
import Button from './Button';

function Filters({props}) {

    return (
      <form className="film-filter" onSubmit={props.invoke}>
          <h2 className="filter-title">Фильтры</h2>
          {
            /* Визуализируем составляющие филбтра из массива arr  типа appendChild*/
            props.arr.map(e => e)
          }
          <div className="filter-res">
                <Button props={{type:"reset", classOut: "reset-filter", classIn: "inner-reset-filter", innerHtml: "Очистить", onClick: null}}/>
                <Button props={{type:"submit", classOut: "submit-filter", classIn: "inner-reset-filter", innerHtml: "Применить", onClick: null}}/>
          </div>
      </form>
    );
}

export default Filters;