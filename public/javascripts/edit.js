$(function() {
    $('#savebtn').on('click', function() {
        $('#edit-item-form').submit();
    });
    
    $('#cancelbtn').on('click', function() {
        window.location = '/';
    });
});