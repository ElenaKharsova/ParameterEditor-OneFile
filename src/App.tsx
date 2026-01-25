import React, { useState } from "react";
import "./styles/style.css"
import ParamEditor from './components/ParamEditor'
import { model as modelInit } from './data/model'
import { params as paramsInit } from './data/params'

export default function App(){
  const [model, setModel] = useState(modelInit);
  const [params, setParams] = useState(paramsInit); 

  return (
    <div className="app-wrap">
      <ParamEditor model={model} params={params}/>
    </div>
  );
}