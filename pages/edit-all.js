import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'
import EditAllForm from '../components/EditAllForm'

const EditAll = ({ words }) => {
  const editAllForm = {
    wordRows: [{word: '', meaning: ''}],
  }

  return <EditAllForm formId="edit-all-form" editAllForm={editAllForm} words={words} />
}


/* Retrieves word(s) data from mongodb database */
export async function getServerSideProps() {
    await dbConnect()
  
    /* find all the data in our database */
    const result = await Word.find({})
    const words = result.map((doc) => {
      const word = doc.toObject()
      word._id = word._id.toString()
      return word
    })
  
    return { props: { words: words } }
  }
  

export default EditAll
