import { ParamEditor, Param, Model, ParamValue } from '../index'
import {render, screen, fireEvent, getByTestId} from '@testing-library/react'
import "@testing-library/jest-dom";

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

const onSave = jest.fn();

beforeEach(()=>{
  render(<ParamEditor  model={modelInit} params={paramsInit} onSave={onSave}/>)
})

afterEach(()=>{
    onSave.mockClear();
})

describe('UI', ()=>{
  test('Form is visible', ()=>{
    expect(screen.getByTestId('form')).toBeVisible();
  });

  describe('All params are visible', ()=>{
    paramsInit.forEach(param=>{
      test(`Param id=${param.id} value=${param.name} is visible and correct`, ()=>{
        const labelId = screen.getByTestId(`label-${param.id}`) as HTMLLabelElement;
        expect(labelId).toBeVisible();
        expect(labelId).toHaveTextContent(param.name);
      })
    })
  })
  describe('All model values are visible', ()=>{
    modelInit.paramValues.forEach(modelValue=>{
      test(`Model id=${modelValue.paramId} value=${modelValue.value} is visible and correct`, ()=>{
        const fieldValue = screen.getByTestId(`field-${modelValue.paramId}`) as HTMLInputElement;
        expect(fieldValue).toBeVisible();
        expect(fieldValue).toHaveValue(modelValue.value);
      })
    })
  })
  describe('Model', ()=>{

    const newParamValues: ParamValue[] = [
      {
        "paramId": 1,
        "value": "праздничное"
      },
      {
        "paramId": 2,
        "value": ""
      }
    ]

    test ('New model has been saved correctly', async()=>{
      for(const {paramId, value} of newParamValues) {
        const input = await screen.findByTestId(`field-${paramId}`) as HTMLInputElement;
        fireEvent.change(input, {target: {value}})  
      }

      fireEvent.submit(screen.getByTestId(`form`));
      const expectedValues = modelInit.paramValues.map(param=>
        newParamValues.find(newParam=> newParam.paramId===param.paramId) ?? param
      )
        
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({"paramValues": expectedValues
      }));  
    })    
  })
})