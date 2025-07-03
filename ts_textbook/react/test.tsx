import React, {ChangeEvent, FormEvent} from 'react';
import {useState,useCallback, useRef,useEffect} from "react";

const WordRelay = () => {
  const [word, setWord]= useState('sodami');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl= useRef<HTMLInputElement>(null);

  useEffect(()=>{
    console.log('useEffect');
  },[])

  const onSubmitForm = useCallback((e:FormEvent<HTMLFormElement>)=> {
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

  const onChange = useCallback((e:ChangeEvent<HTMLInputElement>)=>{
    setValue(e.currentTarget.value)
  },[]);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange}/>
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  )
}

export default WordRelay;