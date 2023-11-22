import '../index.css';

function Select({props}) {
  return (
    <select required={props.isReq}>
        {props.options.map(
            (e) => <option value={e.value} key={e.value}>{e.innerHtml}</option>
        )}
    </select>
  );
}

export default Select;