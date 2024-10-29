/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Kate de Leon Student ID: 146287230 Date: Oct 11, 2024
*
********************************************************************************/

const express = require('express');
const legoData = require('./modules/legoSets');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// set views for directory
app.set('views', __dirname + '/views');

// static files from the public directory
app.use(express.static(__dirname + '/public')); 

legoData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server is running at http://localhost:${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to initialize Lego data:", err);
    });

// route to home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html'); 
});

// Route to about page
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html'); 
});

// route for Lego sets with optional theme query parameter
app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme) 
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(404).send("No sets found for the specified theme."); // Return 404 if no sets found
            });
    } else {
        legoData.getAllSets()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
});

// route to specific Lego set by set_num
app.get('/lego/sets/:set_num', (req, res) => {
    const setNum = req.params.set_num; 
    legoData.getSetByNum(setNum) 
        .then(data => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).send("Set not found."); 
            }
        })
        .catch(err => {
            res.status(404).send(err); 
        });
});

// 404 error handling
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/views/404.html'); 
});
