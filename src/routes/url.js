const express = require("express")
const router = express.Router();
const z = require("zod");
const urlmap = {};
const { PrismaClient } = require('@prisma/client');
const redis = require("../redis")

const prisma = new PrismaClient();


// base62 
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function encode62(num){
    let result = "";
    while( num > 0) {
        result = chars[num%62] + result;
        num = Math.floor(num/62)
    }

    return result;
}


//validate url

const urlcheck = z.object({
    originalUrl: z.string().url("invalid url")
})



router.post('/shorten', async function(req, res) {
    const { originalUrl}  = req.body;



    const validate = urlcheck.safeParse(req.body)

if(!validate.success) {
    return res.json({
        message: "not valid url "
    })
}


if (!originalUrl) {
    return res.status(400).json({
        error: 'originalurl is required'});
}




const createdurl = await prisma.url.create({
    data: { originalUrl,
    shortCode : `temp-${Date.now()}`
    }
})
console.log(createdurl)

const shortCode = encode62(createdurl.id);
console.log(shortCode)
const url = await prisma.url.update({ where: { id: createdurl.id }, data: { shortCode } });





res.status(201).json({
    "shortCHode" : shortCode,
    "shortUrl": `https://urlsh.up.railway.app/${shortCode}`,
    "originalUrl": originalUrl
})
})







router.get('/:shortCode', async function(req,res) {
    const {shortCode} = req.params;

    const cachedUrl = await redis.get(shortCode);

if (cachedUrl) {
    console.log('CACHE HIT');
    return res.redirect(cachedUrl);
}

console.log('CACHE MISS');

console.log("shortCode:", shortCode);
const url = await prisma.url.findUnique({ where: { shortCode: shortCode } } );
console.log("url:", url);




    await redis.set(
    shortCode,
    url.originalUrl
);


    res.redirect(url.originalUrl)
});

module.exports = router;
