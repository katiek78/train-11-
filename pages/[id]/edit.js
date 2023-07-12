import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditWord = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: word,
    error,
    isLoading,
  } = useSWR(id ? `/api/words/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!word) return null

  const wordForm = {
    word: word.word,
    meaning: word.meaning,
    wordType: word.wordType
  }

  return <Form formId="edit-word-form" wordForm={wordForm} forNewWord={false} />
}

export default EditWord
