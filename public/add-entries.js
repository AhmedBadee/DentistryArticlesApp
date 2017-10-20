$(document).ready(function() {

    $('#add').click(function(e) {
        e.preventDefault();

        $('#files').append('<div>' + 
                                '<input class="image-box text-all urls" type="text" name="images[]" placeholder="Image URL" />' +
                                '<div id="action-buttons">' +
                                    '<input type="button" id="sub" value="-" />' +
                                '</div>' +
                            '</div>');
    });

    $('body').on('click', '#sub', function(e) {
        $(this).parent('div').parent('div').remove();
    });
});
