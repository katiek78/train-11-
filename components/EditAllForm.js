import { useState } from 'react'
import { useRouter } from 'next/router'

const EditAllForm = ({ formId, editAllForm }) => {
    const router = useRouter()
    const contentType = 'application/json'
    // const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        words: editAllForm.words        
      })
  
    const handleChange = (e) => {
        const target = e.target     

        const value = target.value
        const name = target.name
        const isWord = name.includes("Word");
        const updatedForm = { ...form };
        const thisId = isWord ? name.slice(7) : name.slice(10);
        const wordIndex = updatedForm.words.findIndex((word) => word._id === thisId);
        if (wordIndex !== -1) {
            if (isWord) {
              // Update the word property with the new value
              updatedForm.words[wordIndex].word = value;
            } else {
              // Update the meaning property with the new value
              updatedForm.words[wordIndex].meaning = value;
            }
          }
          console.log(updatedForm);
        setForm(updatedForm);
    }

    const putData = async (form) => {
      try {
        const res = await fetch('/api/wordsMultiple', {
          method: 'PUT',
          headers: {
            Accept: contentType,
            'Content-Type': contentType,
          },
          body: JSON.stringify(form),
        })
  
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status)
        }
  
        router.push('/')
      } catch (error) {
        setMessage('Failed to add words')
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      putData(form)
    }
   
    return (
        <>
          <form id={formId} onSubmit={handleSubmit} >
    
          <div>
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Meaning</th>
          </tr>          
        </thead>
        <tbody>
            {form.words.map(word => <tr key={word._id}><td><input onChange={handleChange} value={word.word} id={'inpWord' + word._id} name={'inpWord' + word._id}></input></td><td><input onChange={handleChange} value={word.meaning} id={'inpMeaning' + word._id} name={'inpMeaning' + word._id}></input></td></tr>)}
        </tbody>
      </table>
    </div>
    
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
          <p>{message}</p>
          <div>
            {/* {Object.keys(errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))} */}
          </div>
        </>
      )
 }

export default EditAllForm;