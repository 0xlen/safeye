/**
 * SafEye
 */
$(function() {

    function url_scan(url) {
        var api = 'http://safeye.azurewebsites.net/api/url_scan.php';
        var params = {
            'url': url
        };

        $.post(api, params, function(data) {
            console.log(data);
            alert(data.positives + '/' + data.total);
        }, 'json');
    }

    $('#scan').click(function(e) {
        var url = $('input[name="url"]').val();
        if (url != '') {
            url_scan(url);
        }
    });
});
