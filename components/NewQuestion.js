const NewQuestion = ({refreshQuestion}) => {
    const handleClickNextQuestion = () => {        
        refreshQuestion();
    }
    return(
    <button className='btn' onClick={handleClickNextQuestion}>Next question</button>
    )
}

export default NewQuestion