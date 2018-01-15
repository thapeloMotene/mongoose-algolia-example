const Books = require('../models/Book');
var router = require('express').Router();

router.get('/books',(req,res,next)=>{
        
        Books.find({},(err,result)=>{
            if (err) return next(err);
            res.json(result);
        });
});

router.post('/book', (req,res,next)=>{
    var newBook = new Books(req.body);
    newBook.save(function(err, savedBook){
        if (err) return next(err);
        res.json({message:"Book Entry Created Successfully ", data: savedBook});
    });
});


router.delete('/book/:id', (req,res,next)=>{
    Books.findByIdAndRemove(req.params.id,(err,result)=>{
        if (err) return next(err);
        res.json({message:`${result.title} has been deleted`});
        Books.SyncToAlgolia();
    });
})

module.exports = router;