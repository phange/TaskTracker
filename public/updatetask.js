function updateTask(id){
    $.ajax({
        url: '/tasklist/' + id,
        type: 'PUT',
        data: $('#update-task').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
