module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // helper function to populate movies dropdown
    function getMovies(res, mysql, context, complete){
        mysql.pool.query("SELECT movieID, movieTitle, genreID, movieDuration, movieRestriction, movieDescription FROM Movies", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.movies = results;
            complete();
        });
    }    

    function getShowings(res, mysql, context, complete){
        mysql.pool.query("SELECT showingID, movieID, roomID, startTime, endTime, startDate, endDate, capacity FROM Showings", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.showings = results;
            complete();
        });
    }   

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT customerID, customerName, customerType, customerEmail FROM Customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

    // helper function to pull the entire TaskList db as 'results' which is stored into context.tasklist for access by Handlebars as 'tasklist'
    function getTaskList(res, mysql, context, complete){
        mysql.pool.query("SELECT taskID as id, taskDetails FROM TaskList", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.tasklist = results;
            complete();
        });
    }
    // helper function to get single task for updating
    function getTask(res, mysql, context, id, complete){
        // var sql = "SELECT ticketID, customerID, showingID, ticketPrice FROM Ticket_Purchases WHERE ticketID=?";
        var sql = "SELECT taskDetails FROM TaskList WHERE taskID=?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.task = results[0];
            complete(); // this func make sure all callbacks finish before we go populate the page
        });
    }

    /*Display all tasks. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletemovie.js", "deletecustomer.js", "deleteticketpurchase.js", "deletetask.js"];  
        var mysql = req.app.get('mysql');
        getMovies(res, mysql, context, complete);
        getCustomers(res, mysql, context, complete);
        getShowings(res, mysql, context, complete);
        getTaskList(res, mysql, context, complete);
        function complete(){  // this func make sure all callbacks finish before we go populate the page
            callbackCount++;
            if(callbackCount >= 4){ 
                res.render('tasklist', context);
            }

        }
    });

    /* Display one task for the specific purpose of updating TaskList database */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatetask.js"];
        var mysql = req.app.get('mysql');
        getTask(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-task', context); // once completed (1 callback), display the update-task page
            }

        }
    });
    
    // add task
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO TaskList (taskDetails) VALUES (?)";
        var inserts = [req.body.taskDetails];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/tasklist');
            }
        });
    });

    /* The URI that update data is sent to in order to update a task */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        var sql = "UPDATE TaskList SET taskDetails=? WHERE taskID=?";
        var inserts = [req.body.taskDetails, req.body.id]; /* might need to double check this */
        // req.params.id is reading "undefined", tried req.body.id
        console.log("req.body.id")
        console.log(JSON.stringify(req.body.id))
        // console.log("inserts")
        // console.log(JSON.stringify(inserts))
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a task, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM TaskList WHERE taskID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
