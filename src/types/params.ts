export type ParamType = 'string' | 'number' | 'boolean';

export type ParamValueMap = {
  string: string,
  number: number,
  boolean: boolean
}

export interface Param {
  id: number,
  name: string,
  type: ParamType
}