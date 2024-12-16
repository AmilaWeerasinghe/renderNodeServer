
const googleAuthController = async ( req, res ) => {
    try {
        console.log('GET /auth/google');
       res.json({message: 'Google Auth'});
    } catch ( err ) {
        res.status(500).json({error: err.message});
    }
    
}

module.exports = googleAuthController;