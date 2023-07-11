import { useState } from 'react'
import { useRouter } from 'next/router'

const EditAllForm = ({ formId, editAllForm, words }) => {
    const router = useRouter()
    const contentType = 'application/json'
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        wordRows: editAllForm.wordRows
      })
  
      return (
        <>
          <form id={formId} >
    
          <div>
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Meaning</th>
          </tr>          
        </thead>
        <tbody>
            {words.map(word => <tr><td><input value={word.word} id={'inpWord' + word._id}></input></td><td><input value={word.meaning} id={'inpMeaning' + word._id}></input></td></tr>)}
        </tbody>
      </table>
    </div>
    
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
          <p>{message}</p>
          <div>
            {Object.keys(errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </div>
        </>
      )
 }

export default EditAllForm;