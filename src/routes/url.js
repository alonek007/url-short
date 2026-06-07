const express = require("express")
const router = express.Router();

const urlmap = {};

router.post('/shorten', function(req, res) {
    const { originalUrl}  = req.body;

if (!originalUrl) {
    return res.status(400).json({
        error: 'originalurl is required'});
}


const shortCode  = Math.random().toString(36).substring(2,8);
urlmap[shortCode] = originalUrl;
res.status(201).json({
    shortCode,
    shortUrl: `http://localhost:${process.env.PORT}/api/${shortCode}`,
    originalUrl
})

})

router.get('/:code', function(req,res) {
    const {code} = req.params;
    const originalUrl = urlmap[code];

    if(!originalUrl){
        return res.status(404).json({
            error: "short url not found"
        })

    }
    res.redirect(originalUrl)
})

module.exports = router;