$(function() {
    var urls = {};
    $(document).ready(function() {


        Materialize.toast('Start scanning ...', 2000);

        $('a', document).each(function(index, item) {
            var url = String($(item).attr('href'));
            if (url.length > 4 && url.slice(0,4) == 'http') {
                urls[url] = url;

                $.ajax({
                    url: 'http://127.0.0.1/safeye/api/url_scan.php',
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
                        var text = $(item).text();

                        if (data.positives == undefined && data.total == undefined && data.verbose_msg) {
                            Materialize.toast(url + ' : ' + data.verbose_msg, 4000);
                        } else {
                            if (data.positives > 0) {
                                Materialize.toast('[alert!] ' + url + ' may damage your pc.', 4000);

                                $(item).tooltip({
                                    position: 'bottom',
                                    delay: 50,
                                    tooltip: 'This link might be danger! (' + data.positives + '/' + data.total + ')'
                                }).css('background-color', '#d50000');

                            } else {
                                Materialize.toast('[safe] ' + url, 4000);

                                $(item).text(text + ' (' + data.positives + '/' + data.total + ')');
                            }
                        }
                    }
                }).fail(function(error) {
                    console.log(error);
                });

            }
        });

        Materialize.toast(Object.keys(urls).length + ' sites has been scanned.', 4000);

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
