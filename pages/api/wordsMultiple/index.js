import dbConnect from '../../../lib/dbConnect'
import Word from '../../../models/Word'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    // case 'POST':
    //   try {
    //     const word = await Word.create(
    //       req.body
    //     ) /* create a new model in the database */
    //     res.status(201).json({ success: true, data: word })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    case 'POST':
      try {
        const words = req.body.text.split("\n");
        let wordData = []
        words.forEach(async function(element, index, array) {
            wordData = {
                word: element
            }
            console.log(wordData);
            const word = await Word.create(
          wordData
            );
        });
        // ) /* create a new model in the database */
        // const wordData = words.map(element => { word: element});
        // insert all the wordData
        
        res.status(201).json({ success: true, data: wordData })
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
