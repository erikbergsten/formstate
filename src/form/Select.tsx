import { InputProps } from './form';
import { FormEvent, useState } from 'react';
import styles from './select.module.css';

export type SelectProps<K, T> = InputProps<K, T, string[]> & {
  options: string[]
}

export function Select<K extends string, T extends Record<K, string[]>>({
  property,
  state,
  dispatch,
  valid,
  options
}: SelectProps<K, T>) {

  const [partial, setPartial] = useState<string>("")
  const [focused, setFocused] = useState<boolean>(false)
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setPartial(e.currentTarget.value)
  }
  const suggestions = options.filter( (opt: string) =>
    opt.toLowerCase().indexOf(partial.toLowerCase()) >= 0
      && state[property].indexOf(opt) < 0
  )

  const select = (option: string) => {
    dispatch((s) => ({...s, [property]: [...s[property], option]}))
  }

  return (
  <>
    <div className={styles.select}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <span className={styles.bubble}> helo </span ><input
        type='text'
        value={partial}
        onChange={onChange}
        className={focused ? styles.focused : ""}
      />
      {
        focused && (
          <div className={styles.suggestions}>
            {
              suggestions.map((suggestion: string, i: number) => (
              <span
                key={i}
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
      <pre>
      {
        JSON.stringify(suggestions, null, 2)
      }
      </pre>
    </>
  )
}
