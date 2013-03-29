$(function() {
    var titleNode = $('#title'),
        filenameNode = $('#filename');
    
    $('#savebtn').on('click', function() {
        if ($.trim(titleNode.val()) === '') {
            titleNode.parents('.control-group').addClass('error');
        } else if ($.trim(filenameNode.val()) === '') {
            //TODO: beef up the check for spaces and special chars?
            filenameNode.parents('.control-group').addClass('error');
        } else if (CKEDITOR.instances.postcontent && $.trim(CKEDITOR.instances.postcontent.getData()) === '') {
            alert('Content is required!');
        }  else {
            $('#add-item-form').submit();
        }
    });
    
    $('#cancelbtn').on('click', function() {
        window.location = '/';
    });
});