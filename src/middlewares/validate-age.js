 const getAge = async (req,res,next) => {

    const bDate = req.params.birthDate
    const today = new Date();
    const bDate = await new Date(bDate);
    const age = today.getFullYear() - bDate.getFullYear();
    const m = today.getMonth() - bDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bDate.getDate())) 
    {
        age--;
    }
    return age;
    
}