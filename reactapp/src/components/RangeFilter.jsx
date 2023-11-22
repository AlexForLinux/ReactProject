import '../index.css';

function RangeFilter({props}) {

  return (
      <div className="choice-filter range-filter" id={props.id}>
            <p className="label-choice m">{props.title}</p>

            <p className="label-choice m">{props.startTitle}</p>
            <input type="number" min={props.minStart} max={props.maxStart} placeholder={props.minStart}/>
            
            <p className="label-choice m ml">{props.endTitle}</p>
            <input type="number" min={props.minEnd} max={props.maxStart} placeholder={props.maxStart}/>

            <p className="label-choice ml">{props.measure}</p>
      </div>
  );
}

export default RangeFilter;