import '../index.css';
import Required from './Requried';

function InputBlock({props}) {

  return (
      <div className="input-block" id={props.id}>

          <div className="input-block-title">
              <label className="input-title">{props.title}{props.isReq ? <Required/> : ""}</label>
          </div>
                
          <div className="list">
                <div className="input-line">
                  {props.list}
                </div>
          </div>
      </div>
  );
}

export default InputBlock;