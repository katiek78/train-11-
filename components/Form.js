import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Form = ({ formId, wordForm, forNewWord = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    word: wordForm.word,
    meaning: wordForm.meaning,
    wordType: wordForm.wordType
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/words/${id}`, {
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

      const { data } = await res.json()

      mutate(`/api/words/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update word')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/words', {
        method: 'POST',
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
      setMessage('Failed to add word')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure word info is filled */
  const formValidate = () => {
    let err = {}
    if (!form.word) err.word = 'Word is required'
   
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewWord ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="word">Word</label>
        <input
          type="text"
          maxLength="60"
          name="word"
          value={form.word}
          onChange={handleChange}
          required
        />

        <label htmlFor="meaning">Meaning</label>
        <input
          type="text"
          maxLength="100"
          name="meaning"
          value={form.meaning}
          onChange={handleChange}
          required
        />

        <label htmlFor="wordType">Word type</label>
        <select         
          name="wordType"
          value={form.wordType}
          onChange={handleChange}
          required
                >
        <option value="adjective">adjective</option>
        <option value="adverb">adverb</option>        
        <option value="noun">noun</option>
        <option value="verb">verb</option>
        <option value="multiple">multiple</option>
        <option value="other">other</option>
        </select>

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

export default Form
