import { FiledValidatoeType } from '../../utils/validators';
import React from "react";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import styles from "./FormControl.module.css"
import { Form}   from "antd"

const FormItem = Form .Item;

type FormControlPropsType={
    meta:WrappedFieldMetaProps
}
const FormControl:React.FC<FormControlPropsType> =({meta:{touched,error},children})=>{
    const hasError = error && touched
    return(
        <div className={styles.formControl +" "+(hasError? styles.error: " ") }> 
            <div>
                {children}
            </div>
               {hasError && <span>{error}</span>}
        </div>
    )
}
export const Texteria:React.FC<WrappedFieldProps>=(props)=>{
    const  {input,meta,...restProps} = props
    return<FormControl {...props}><textarea {...restProps} {...input}/></FormControl>
} 
export const InputControl:React.FC<WrappedFieldProps>=(props)=>{
    const  {input,meta,...restProps} = props
    return<FormControl {...props}><input {...restProps} {...input}/></FormControl>
} 

export function createField<FormKeysType extends string>(placeholder:string| undefined ,
    name:FormKeysType,
    validate:Array<FiledValidatoeType>,
    component:React.FC<WrappedFieldProps>,
    props={},
    text=""){
    return<div>
    <Field 
        placeholder={placeholder}
        component={component} 
        name={name} 
        validate={validate}
        {...props}/>{text}
</div>}

//@ts-ignore
export const makeField = (Component:any) => ({input, meta,children,hasFeedback,label,...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};

export type  GetStringType<T> = Extract< keyof T,string>