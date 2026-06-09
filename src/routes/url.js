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


const shortCode  = Math.random().toString(36).substring(2,8);
urlmap[shortCode] = originalUrl;
res.status(201).json({
    shortCode,
    shortUrl: `http://localhost:${process.env.PORT}/api/${shortCode}`,
    originalUrl
})

const url = await prisma.url.create({
    data: { originalUrl,
    shortCode
    }
})
console.log(url)

})

router.get('/:shortCode', async function(req,res) {
    const {shortCode} = req.params;


    const cachedUrl = await redis.get(shortCode);

if (cachedUrl) {
    console.log('CACHE HIT');
    return res.redirect(cachedUrl);
}

console.log('CACHE MISS');


    const url = await prisma.url.findUnique({ where: { shortCode } });

    if(!url){
        return res.status(404).json({
            error: "not a unique url try again"
        })

    }



    await redis.set(
    shortCode,
    url.originalUrl
);

    res.redirect(url.originalUrl)
})

module.exports = router;