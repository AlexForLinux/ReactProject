import '../index.css';
import Button from './Button';
import OptionContext from "./OptionContext";
import { useContext } from 'react';

function Warning() {
  let options = useContext(OptionContext);
  return (
    <article className="sure c">
      <div className="inner-sure c">
          <p className="sure-title">Вы точно хотите удалить фильм?</p>
          <div className="sure-choices">
              <Button props={{type: "button", classOut: "yes-sure add-button", classIn: "inner-yes", innerHtml: "Да", onClick: options.yes}}/>
              <Button props={{type: "button", classOut: "no-sure add-button", classIn: "inner-no", innerHtml: "Нет", onClick: options.no}}/>
          </div>
      </div>
    </article>
  );
}

export default Warning;