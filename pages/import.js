import ImportForm from '../components/ImportForm'

const NewSet = () => {
  const importForm = {
    text: '',
  }

  return <ImportForm formId="import-words-form" importForm={importForm} />
}

export default NewSet
