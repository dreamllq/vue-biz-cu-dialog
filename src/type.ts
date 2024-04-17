export type DefaultData = any;
export type InitFunc = (id?:any, options?:any)=>Promise<DefaultData>
export type SubmitResult = void;
export type SubmitFunc = (id?:any, options?:any)=>Promise<SubmitResult>