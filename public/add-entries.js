$(document).ready(function() {

    $('#add').click(function(e) {
        e.preventDefault();

        $('#files').append('<div><input id="fileField" type="file" name="images[]" />' +
                           '<input type="button" id="sub" value="-" /></div>');
    });

    $('body').on('click', '#sub', function(e) {
        $(this).parent('div').remove();
    });
});
