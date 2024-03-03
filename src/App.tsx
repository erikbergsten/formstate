import { TextInput, useFormState } from './form';
import { Select, } from './input';
import './App.css';

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
    <form className='my-form'>
      <TextInput
        state={registration}
        dispatch={setRegistration}
        property='name'
        valid={(_k, v) => v.length > 10 ? "max length: 10" : undefined}
      />
      <Select
        selected={registration.tags}
        setSelected={(tags) => setRegistration(r => ({...r, tags}))}
        options={['foo', 'bar', 'baz', 'hello world', 'ding dong']}
      />
    </form>
    <pre>{JSON.stringify(registration, null, 2)}</pre>
    </>
  )
}

export default App
