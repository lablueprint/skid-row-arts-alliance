function router (app, db) {
    app.get('/test', (req, res) => {
        console.log('found');
        db.collection('test').insertOne({ omega: 'lol'})
        res.send('found');
    });
    
    app.get('/test1', (req, res) => {
        console.log('here');
        res.send('here');
    })
    return app;
}


module.exports = router;