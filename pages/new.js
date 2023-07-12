import Form from '../components/Form'

const NewWord = () => {
  const wordForm = {
    word: '',
    meaning: '',
    wordType: ''
  }

  return <Form formId="add-word-form" wordForm={wordForm} />
}

export default NewWord
