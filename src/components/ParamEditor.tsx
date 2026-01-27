import React from "react";
import { Model, Param, ParamValue } from "src/types";

export interface Props {
  params: Param[],
  model: Model
}

export default function ParamEditor({model, params}: Props){ 
  const [modelDictionary, setModelDictionary] 
    = React.useState<Record<number,string>>(initModelDictionary);
  
  function initModelDictionary(){
    const modelDictionaryDraft: Record<number,string> = {};

    model.paramValues.forEach(param=>{
      modelDictionaryDraft[param.paramId] = param.value ?? '';
    })

    return modelDictionaryDraft;
  }

  const renderList = params.map(param=>{
    return(
      <div key={param.id} className="param-wrap">
        <label
          htmlFor={`name-${param.id}`}
          className="param__name"
        >
        {param.name}
        </label>
        <input 
          name={`${param.id}`}
          id={`name-${param.id}`}
          value={modelDictionary[param.id] ?? ''}
          className="param__field"
          onChange={changeField}
        />
      </div>
  )})

  function getModel(): Model {
    const paramValues: ParamValue[] = params.map(param=>({
      paramId: param.id,
      value: modelDictionary[param.id] ?? ''
    }))

    return {
      paramValues: paramValues
    };
  }

  function saveModel(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log('The model has been saved', getModel());
  }

  function changeField(e:React.ChangeEvent<HTMLInputElement>){
    const key:number = Number(e.currentTarget.name);
    const value: string = e.currentTarget.value;

    setModelDictionary(prevModel=>({
      ...prevModel,
      [key]: value
    }));
  }

  return(
    <main className='paramEditor'>
      <h1 className="header">Parameter Editor</h1>
      <form className="form" onSubmit={saveModel}>
        <div className="params-wrap">
          {renderList}
        </div>
        <button 
          type="submit" 
          className="save-btn"
        >Save</button>
      </form>
    </main>
  )
}