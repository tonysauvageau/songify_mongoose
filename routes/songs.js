var express = require('express');
var router = express.Router();
var Song = require('../models/song');

router.get('/', function( req, res ) {
    Song.find( function(err, songs) {
        res.render('songs', { title: 'Songify Songs!', songs: songs } );
    }).sort({updatedAt: -1});
});

router.post('/', function( req, res ) {
    new Song({
        title: req.body.title,
        artist: req.body.artist,
        description: req.body.description,
        updatedAt: Date.now()
    }).save( function( err, song ) {
        res.redirect('/songs');
    });
});

router.get('/:id', function ( req, res ) {
    Song.findById(req.params.id, function( err, song ) { 
      res.render('song', { title: song.title, song: song});
    });
});

router.delete('/:id', function( req, res ) {
    Song.findById(req.params.id, function (err, song) {
        song.remove( function ( err, song ) { 
            res.redirect('/songs');
        });
    });
});

router.put('/:id', function( req, res ) {
    var body = {
        title: req.body.title, 
        artist: req.body.artist, 
        description: req.body.description, 
        updatedAt: Date.now()
    }

    Song.findByIdAndUpdate(req.params.id, 
    { 
        $set: body  
    }, 
    function ( err, song ) {
        res.redirect('/songs/'+req.params.id);
    });
});






module.exports = router;