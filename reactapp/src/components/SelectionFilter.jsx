import '../index.css';
import Select from './Select';

function SelectionFilter({props}) {
  return (
    <div className="choice-filter select-filter" id={props.id}>
        <label className="label-choice m">{props.title}</label>
        <Select props={props.select}/>
    </div>
  );
}

export default SelectionFilter;