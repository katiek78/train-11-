import Link from 'next/link'


const Index = () => {
 

  return(
  <>
   

    <div className="wrapper grid">
    {/* Create a card for each option */}
   
           
      <div className="subjectLinks">      
     
      <Link href="/wordsIndex" legacyBehavior><div className="subjectCard">Words</div></Link>
      <Link href="/maths" legacyBehavior><div className="subjectCard">Maths</div></Link>
          </div>
         
         </div>
          
            
 </>
  
)

  }

export default Index
