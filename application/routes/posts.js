var express = require('express');
var router = express.Router();
var multer = require('multer');
const { makeThumbnail, getPostById } = require('../middleware/posts');
const db = require('../conf/database');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/videos')
    },
    filename: function (req, file, cb) {
        const fileExt = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`)
    }
})

const upload = multer({ storage: storage })

router.post('/create', upload.single('uploadVideo'), makeThumbnail, async function (req, res, next) {
    // console.log(req.file);
    // console.log(req.body);
    // console.log(req.session.user);
    // res.end();

    var { title, description } = req.body;
    var { path, thumbnail } = req.file;
    var { userId } = req.session.user;

    try {
        console.log([title, description, path, thumbnail, userId]);
        var [insertResult, _] = await db.execute(`INSERT INTO posts (title, description, video, thumbnail, fk_userId)
        VALUE
        (?,?,?,?,?);`, [title, description, path, thumbnail, userId])

        if (insertResult && insertResult.affectedRows) {
            req.flash("success", "Your post was successfully created!");
            return req.session.save(function (err) {
                return res.redirect('/');
            })
        } else {
            req.flash("error", "Your post could not be made, try again later or email support");
            return req.session.save(function (err) {
                if (err) next(err);
                return res.redirect('/postvideo');
            })
        }
    } catch (err) {
        next(err);
    }
});


router.get("/search", async function (req, res, next) {
    var { key } = req.query;
    const searchValue = `%${key}%`;

    try {
        var [results, _] = await db.execute(`select id, title, description, thumbnail, concat_ws(" ", title, description) as haystack
        FROM posts
        HAVING haystack like ?;`, [searchValue]);
        // return res.status(200).json({results});

        if (results && results.length > 0) {
            res.locals.count = results.length;
            res.locals.results = results;
            res.locals.searchValue = key;
            return res.render('index');
        } else {
            req.flash("error", "No posts were found with your requested search term! Displaying all videos on this site");
            var [results, _] = await db.execute(`select * FROM posts;`);

            res.locals.count = results.length;
            res.locals.results = results;
            return res.render('index');
            return res.status(200).json({
                // message: "No results were found! Here are some other videos you might like:", //TODO 
                // count: 0,
                // results:[]


            });
        }
    } catch (err) {
        next(err);
    }
})



module.exports = router;