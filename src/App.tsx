import React from "react";
import "./styles/style.css"
import ParamEditor from './components/ParamEditor'
import { model } from './data/model'
import { params } from './data/params'

export default function App(){
  return (
    <div className="app-wrap">
      <ParamEditor model={model} params={params}/>
    </div>
  );
}