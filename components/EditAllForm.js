import { useState } from 'react'
import { useRouter } from 'next/router'
import { sortAlpha } from '../utilities/sort'

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
        const isWord = name.includes("inpWord");
        const isWordType = name.includes("selWordType");
        const updatedForm = { ...form };
        const thisId = isWord ? name.slice(7) : (isWordType ? name.slice(11) : name.slice(10));
        const wordIndex = updatedForm.words.findIndex((word) => word._id === thisId);
        if (wordIndex !== -1) {
            if (isWord) {          
              updatedForm.words[wordIndex].word = value;
            } else if (isWordType) {                      
              updatedForm.words[wordIndex].wordType = value;
            } else  updatedForm.words[wordIndex].meaning = value;
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
            <th>Word Type</th>
          </tr>          
        </thead>
        <tbody>
            {form.words.sort(sortAlpha).map(word => <tr key={word._id}><td><input onChange={handleChange} value={word.word} id={'inpWord' + word._id} name={'inpWord' + word._id}></input></td><td><input onChange={handleChange} value={word.meaning} id={'inpMeaning' + word._id} name={'inpMeaning' + word._id}></input></td>
            <td><select onChange={handleChange} value={word.wordType} id={'selWordType' + word._id} name={'selWordType' + word._id}>
            <option value="adjective" selected>adjective</option>
            <option value="adverb">adverb</option>        
            <option value="noun">noun</option>
            <option value="verb">verb</option>
            <option value="multiple">multiple</option>
            <option value="other">other</option>
              </select></td>
            </tr>)}
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