module.exports = (req,res,next) => {
    const token = req.header("access-token")
    console.log('ENTROU', token)
    if(token){
        req.userId = token
        next()
    }else{
        res.status(401).redirect('/')
    }
}