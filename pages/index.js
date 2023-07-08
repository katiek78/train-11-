import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'

const Index = ({ words }) => (
  <>
    {/* Create a card for each word */}
    {words.sort((a, b) => {
      if (a.word > b.word) {
        return 1
      } else if (b.word > a.word) {
        return -1 
      } else return 0;
    }).map((word) => (
      <div className="card-wrapper" key={word._id}>
        <div className="card">
       
          <h5 className="word">{word.word}</h5>
          <div className="main-content">
           
        

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${word._id}/edit`} legacyBehavior>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${word._id}`} legacyBehavior>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

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

export default Index
