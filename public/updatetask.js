function updateTask(id){
    $.ajax({
        url: '/tasklist/' + id,
        type: 'PUT',
        data: $('#update-tasklist').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
