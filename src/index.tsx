import React from "react";
import ReactDOM from 'react-dom/client';
import "./styles/style.css"

interface Props {
  params: Param[],
  model: Model,
  onSave?: (model:Model)=>void
}

interface Color {
  color: string
}

export interface ParamValue {
  paramId: number,
  value: string
}

export interface Model {
  paramValues: ParamValue[],
  colors?: Color[]
}

type ParamType = 'string';

type ParamValueMap = {
  string: string
}

export interface Param {
  id: number,
  name: string,
  type: ParamType
}

const modelInit: Model = {
  "paramValues": [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
    },
    {
      "paramId": 3,
      "value": "XS"
    }
  ]
}

const paramsInit: Param[] = [
  {
    'id': 1,
    'name': 'Назначение',
    'type': 'string'
  },
  {
    'id': 2,
    'name': 'Длина',
    'type': 'string'
  },
  {
    'id': 3,
    'name': 'Размер',
    'type': 'string'
  }
]

const rootElement = document.getElementById('root') as HTMLElement
if(rootElement){
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <App />
  );
}

function App(){
  const [model] = React.useState(modelInit);
  const [params] = React.useState(paramsInit); 

  return (
    <div className="app-wrap">
      <ParamEditor model={model} params={params}/>
    </div>
  );
}

export function ParamEditor({model, params, onSave}: Props){ 
  const [modelDictionary, setModelDictionary] 
    = React.useState<Record<number,string>>(()=>createModelDictionary(model));
  
  function createModelDictionary(model: Model){
    const modelDictionaryDraft: Record<number,string> = {};

    model.paramValues.forEach(param=>{
      modelDictionaryDraft[param.paramId] = param.value ?? '';
    })

    return modelDictionaryDraft;
  }

  React.useEffect(()=>{
    setModelDictionary(createModelDictionary(model));
  },[model.paramValues]);

  const renderList = params.map(param=>{
    return(
      <div key={param.id} className="param-wrap">
        <label
          htmlFor={`name-${param.id}`}
          className="param__name"
          data-testid={`label-${param.id}`}
        >
        {param.name}
        </label>
        <input 
          name={`${param.id}`}
          id={`name-${param.id}`}
          value={modelDictionary[param.id] ?? ''}
          className="param__field"
          onChange={changeField}
          data-testid={`field-${param.id}`}
        />
      </div>
  )})

  function getModel(): Model {
    function conversationTypeValue(type: ParamType, value: string): ParamValueMap[ParamType] {    
      switch (type) {
        case 'string':
          return value;
      }
    }

    const paramValues: ParamValue[] = params.map(param=>({
      paramId: param.id,
      value: conversationTypeValue(param.type, modelDictionary[param.id] ?? ''),
    }))

    return {
      ...model,
      paramValues: paramValues
    };
  }

  function saveModel(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const newModel = getModel();
    onSave?.(newModel);
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
      <form 
       className="form" 
       onSubmit={saveModel}
       data-testid="form"
       >
        <div className="params-wrap">
          {renderList}
        </div>
        <button 
          data-testid="save-btn"
          type="submit" 
          className="save-btn"
        >Save</button>
      </form>
    </main>
  )
}