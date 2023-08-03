import Link from "next/link";

const Maths = () => {



return(
<>
    {/* Create a card for each option */}
    
    <h1>Maths Training</h1>       
   
      <div className="grid subjectLinks mathsLinks">      
    
      <Link href="/mixed" legacyBehavior><div className="subjectCard">Mixed Practice</div></Link>
      <Link href="/algebra" legacyBehavior><div className="subjectCard">Algebra</div></Link>
      <Link href="/fractions" legacyBehavior><div className="subjectCard">Fractions</div></Link>
      <Link href="/percentages" legacyBehavior><div className="subjectCard">Percentages</div></Link>
      <Link href="/mmmr" legacyBehavior><div className="subjectCard">Mode, Median, Mean, Range</div></Link>
      <Link href="/measure" legacyBehavior><div className="subjectCard">Measure (not available yet)</div></Link>
      <Link href="/value" legacyBehavior><div className="subjectCard">Value (not available ye - smallest value, to x dp)</div></Link>
      <Link href="/savings" legacyBehavior><div className="subjectCard">Savings (not available yet)</div></Link>
      
          </div>
         
    
         </>

)
}

export default Maths