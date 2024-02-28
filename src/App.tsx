import { Select, TextInput, useFormState } from './form';

type Registration = {
  name: string,
  address: string,
  tags: string[],
  age: number
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
      <Select
        state={registration}
        dispatch={setRegistration}
        property='tags'
        options={['foo', 'bar', 'baz']}
      />
    </form>
    <pre>{JSON.stringify(registration, null, 2)}</pre>
    </>
  )
}

export default App
