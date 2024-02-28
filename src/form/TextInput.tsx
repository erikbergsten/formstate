import { InputProps } from './form';
import { FormEvent } from 'react';
import styles from './styles.module.css';
export type TextInputProps<K, T> = InputProps<K, T, string>

export function TextInput<K extends string, T extends Record<K, string>>({
  property,
  state,
  dispatch,
  valid
}: TextInputProps<K, T>) {
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value
    dispatch((s) => ({...s, [property]: value}))
    const error = valid && valid(property, value)
    if(error) {
      dispatch((s) => ({...s, errors: {...s.errors, [property]: error}}))
    } else {
      dispatch((s) => ({...s, errors: {...s.errors, [property]: undefined}}))
    }
  }
  return (
    <span className={styles.inputRow}>
      <label> { property }: </label>
      <input type='text'
        value={state[property]}
        onChange={onChange}
      />
      {
        state.errors[property] && (
          <label className={styles.error}>
            { state.errors[property] }
          </label>
        )
      }
    </span>
  )
}

