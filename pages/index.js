import Link from 'next/link'


const Index = () => {
 

  return(
  <>
   

    <div className="wrapper grid">
    {/* Create a card for each option */}
   
           
      <div className="subjectLinks">      
     
      <div className="subjectCard"><Link href="/wordsIndex" legacyBehavior>Words</Link></div>
      <div className="subjectCard"><Link href="/wordsIndex" legacyBehavior>Maths</Link></div>
          </div>
         
         </div>
          
            
 </>
  
)

  }

export default Index
