import React from "react";
import { Model, Param } from "src/types";

export interface Props {
  params: Param[],
  model: Model
}

export default function ParamEditor({model, params}: Props){
  const modelDictionary: Record<number,string> = {};
  model.paramValues.forEach(param=>{
    modelDictionary[param.paramId] = param.value ?? ''
  })
  
  const list = params.map(param=>{
    return(
      <div key={param.id} className="param-wrap">
        <label
          htmlFor="name" 
          className="param__name"
        >
        {param.name}
        </label>
        <input 
          name="name"
          id="name"
          value={modelDictionary[param.id] ?? ''}
          className="param__field"/>
      </div>
  )})

  function getModel(): Model{
    return ;
  }
  function saveModel(){
    console.log('The model has been saved');
  }

  return(
    <main className='paramEditor'>
      <h1 className="header">Parameter Editor</h1>
      <form onSubmit={saveModel} className="form">
        {list}
      </form>
    </main>
  )
}