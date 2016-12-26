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

    function peter_url_scan(url) {
        var api = 'http://safeye.azurewebsites.net/api/url_scan.php';
        var urlRegex = new RegExp('http[s]?:\\/\\/[\\w|\.|-]+', 'g');
        url.match(urlRegex);
        var params = {
            'url': url,
            'scan': 1,
        };

        $.post(api, params, function(data) {
            console.log(data);
            alert(data.positives + '/' + data.total);
        }, 'json');
    }

    $('#scan').click(function(e) {
        // var url = $('input[name="url"]').val();
        // if (url != '') {
        //     console.log(url)
        //     url_scan(url);
        // }

        
    });

    $(window).load(function(){
        var temp ="";
        var totalPositive=0;
        for(let i=0;i<myMailScan.length;i++){
            if(myMailScan[i].positives > 0){
                if(totalPositive==0){
                    totalPositive++;
                    $("#allPositiveTable").html(
                    "<tr>"+
                    "<td>問題連結</td>"+
                    "<td>整體惡意網站偵測</td>"+
                    "<td>報告連結</td>"+
                    "</tr>");
                }
                $("#allPositiveTable").html(
                    $("#allPositiveTable").html()+
                    "<tr>"+
                    "<td>"+myMailScan[i].resource+"</td>"+
                    "<td>"+myMailScan[i].positives+"/"+myMailScan[i].total+"</td>"+
                    "<td>"+myMailScan[i].permalink+"</td>"+
                    "</tr>"+
                    "</tr>");
            }
        }
    });

});
