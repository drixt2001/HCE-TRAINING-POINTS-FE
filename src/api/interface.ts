export interface IAPI<key> {
  status: string;
  message: string;
  data: key[];
}

export interface IOneAPI<key> {
  status: string;
  message: string;
  data: key;
}
export interface ResAPI {
  status: string;
  message: string;
}
