import React, {ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, ReactNode} from 'react';
import {useState,useCallback, useRef,useEffect} from "react";

interface Props {
  children: ReactNode;
  onSubmit: (e:FormEvent<HTMLFormElement>) => void;
}

const Form = ({children, onSubmit}:Props) => {
  return (
    <form onSubmit={onSubmit}>{children}</form>
  )
}

const WordRelay = () => {
  const [word, setWord]= useState('sodami');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl= useRef<HTMLInputElement>(null);

  useEffect(()=>{
    console.log('useEffect');
  },[])


  const onSubmitForm:FormEventHandler<HTMLFormElement>= useCallback((e:FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    const input = inputEl.current;
    if(word[word.length -1] == value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      if(input) {
        input.focus();
      }
    } else {
      setResult('땡');
      setValue('');
      if (input) {
        input.focus();
      }
    }
  },[word, value])

  const onChange:ChangeEventHandler<HTMLInputElement> = useCallback((e:ChangeEvent<HTMLInputElement>)=>{
    setValue(e.currentTarget.value);
  },[]);

  return (
    <>
      <div>{word}</div>
      <Form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange}/>
        <button>입력!</button>
      </Form>
      <div>{result}</div>
    </>
  )
}

export default WordRelay;