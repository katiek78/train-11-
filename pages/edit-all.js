import EditAllForm from '../components/EditAllForm'

const EditAll = () => {
  const editAllForm = {
    wordRows: [{word: '', meaning: ''}],
  }

  return <EditAllForm formId="edit-all-form" editAllForm={editAllForm} />
}

export default EditAll
