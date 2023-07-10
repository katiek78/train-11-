import { useState } from 'react'
import { useRouter } from 'next/router'

const EditAllForm = ({ formId, editAllForm }) => {
    const router = useRouter()
    const contentType = 'application/json'
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        wordRows: editAllForm.wordRows
      })
  
      return (
        <>
          <form id={formId}>
    
           
    
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