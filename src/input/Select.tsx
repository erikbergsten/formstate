import { FormEvent, useState, useRef, KeyboardEvent } from 'react';
import styles from './select.module.css';

export type SelectProps = {
  options: string[]
  selected: string[],
  setSelected: (value: string[]) => void
}

export function Select({
  selected,
  setSelected,
  options
}: SelectProps) {

  const inputRef = useRef<HTMLInputElement>(null)
  const [partial, setPartial] = useState<string>("")
  const [index, setIndex] = useState<number>(-1)
  console.log("index:", index)
  const [focused, setFocused] = useState<boolean>(false)
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setPartial(e.target.innerText)
  }
  const suggestions = options.filter( (opt: string) =>
    partial.length > 0
      && opt.toLowerCase().indexOf(partial.toLowerCase()) >= 0
      && selected.indexOf(opt) < 0
  )
  console.log("suggestions:", suggestions);
  if(suggestions.length === 0 && index !== -1) {
    setIndex(-1)
  }

  const select = (option: string) => {
    setSelected([...selected, option])
    setPartial("")
    if(inputRef.current) { inputRef.current.innerText='' }
  }

  const deselect = (option: string) => {
    setSelected(selected.filter(s => s !== option))
  }

  const pop = () => {
    setSelected(selected.slice(0, selected.length-1))
  }

  const focusInput = (e: any) => {
    console.log("focusing input:", inputRef.current)
    inputRef.current?.focus()
    e.preventDefault()
  }

  const onKeyDown = (e: KeyboardEvent<unknown>) => {
    console.log("keydown:", e.keyCode)
    if(e.keyCode === 8 && partial.length === 0) {
      //backspace
      pop()
    } else if(e.keyCode === 38) {
      //arro wup
      setIndex(i => (i-1) % suggestions.length)
      e.preventDefault() // prevent moving caret to start of input
    } else if(e.keyCode === 40) {
      //arrom down
      setIndex(i => (i+1) % suggestions.length)
    } else if(e.keyCode === 13) {
      //enter
      if(-1 < index && index < suggestions.length) {
        select(suggestions[index])
        setIndex(-1)
        setPartial("")
      }
    }
  }

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onMouseDown={focusInput}
      className={focused ? `${styles.focused} ${styles.select}` : styles.select}
    >
      {
        selected.map((opt: string, i: number) => (
          <div
            key={i}
            className={styles.bubble}
            onClick={() => deselect(opt)}
          >
            <span>
            {opt}
            </span>
            <span
            >
              &nbsp;-
            </span>
          </div>
        ))
      }
      <span
        ref={inputRef}
        contentEditable={true}
        onInput={onChange}
        className={
          focused ? `${styles.focused} ${styles.input}` : styles.input
        }
        onKeyDown={onKeyDown}
      />
      {
        focused && partial.length > 0  && (
          <div className={styles.suggestions}>
            {
              suggestions.map((suggestion: string, i: number) => (
              <span
                key={i}
                className={(index === i) ? styles.highlight : ''}
                onMouseDown={() => select(suggestion)}
              >
                { suggestion }
              </span>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
