export interface Color {
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