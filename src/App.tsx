import { useState, Dispatch, SetStateAction, FormEvent } from 'react'
import styles from './form.module.css';

type Registration = {
  name: string,
  address: string,
  tags: string[],
  age: number
}

type FormState<T> = T & {
  errors: Record<keyof T, string>
}
type FormDispatch<T> = Dispatch<SetStateAction<FormState<T>>>

const useFormState = <T,>(init: T): [FormState<T>, FormDispatch<T>] => useState({
  ...init,
  errors: {} as Record<keyof T, string>
})
type Validator<T> = (key: string, value: T) => string | undefined

type TextInputProps<K, T> = {
  property: K,
  state: FormState<T>,
  dispatch: FormDispatch<T>,
  valid?: Validator<string>
}

function TextInput<K extends string, T extends Record<K, string>>({
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

function App() {

  const [registration, setRegistration] = useFormState<Registration>({
    name: "",
    address: "",
    tags: [],
    age: 0
  });

  return (
    <>
    <p> my ocoool form </p>
    <form>
      <TextInput
        state={registration}
        dispatch={setRegistration}
        property='name'
        valid={(_k, v) => v.length > 10 ? "max length: 10" : undefined}
      />
    </form>
    <pre>{JSON.stringify(registration, null, 2)}</pre>
    </>
  )
}

export default App
