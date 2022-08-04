function deleteTask(id){
    $.ajax({
        url: '/tasklist/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
