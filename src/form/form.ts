import { useState, Dispatch, SetStateAction } from 'react'

export type FormState<T> = T & {
  errors: Record<keyof T, string>
}
export type FormDispatch<T> = Dispatch<SetStateAction<FormState<T>>>
export type Validator<T> = (key: string, value: T) => string | undefined

export type InputProps<K, T, S> = {
  property: K,
  state: FormState<T>,
  dispatch: FormDispatch<T>,
  valid?: Validator<S>
}

export const useFormState = <T,>(init: T): [FormState<T>, FormDispatch<T>] => useState({
  ...init,
  errors: {} as Record<keyof T, string>
})
