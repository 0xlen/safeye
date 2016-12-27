$(function() {
	setTimeout(function(){  location.reload(true); }, 61000);
    var urls = {};
    $(document).ready(function() {
        $('a', document).each(function(index, item) {
            var url = String($(item).attr('href'));
            if (url.length > 4 && url.slice(0,4) == 'http') {
                // console.log(url);
                urls[url] = url;

                $.ajax({
                    url: 'https://192.168.1.104/safeye/api/url_scan.php',
                    async: true,
                    cache: false,
                    method: 'POST',
                    data: {
                        'url': url,
                        'options': {
                            'scan': 1
                        }
                    },
                    dataType: 'json'
                }).done(function(data) {
                    if (data.response_code == 1) {
                    	// console.log(data);
                        var text = $(item).text();

                        if (data.positives == undefined && data.total == undefined && data.verbose_msg) {
                            $(item).text(text + ' (' + data.verbose_msg + ')')
                        } else {
                            $(item).text(text + ' (' + data.positives + '/' + data.total + ')')
                        }
                    }
                }).fail(function(error) {
                    console.log(error);
                });

            }
        });

        console.log(urls);

        function scanByItem(urls) {
            $.each(urls, function(index, item) {
                $.ajax({
                    url: '',
                    async: true,
                    cache: false,
                    data: {
                        'url': item
                    },
                    dataType: 'json'
                }).done(function(data) {
                    console.log(data);
                }).fail(function(error) {
                    console.log(error);
                });
            });
        }
    });
});
