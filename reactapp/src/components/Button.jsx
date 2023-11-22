import '../index.css';

/* Типичная кнопка */
/* Принимает объект с параметрами  classIn - внутр класс, props.classOut - внешний, innerHtml - содержимое, функция при клике onClick */
function Button({props}) {
  return (
    <button type={props.type} className={"button " + props.classOut} onClick={props.onClick}>
        <p className={"inner-button " + props.classIn}>{props.innerHtml}</p>
    </button>
  );
}

export default Button;