chrome.downloads.onCreated.addListener(function(callback){
    var api = 'http://127.0.0.1/safeye/api/url_scan.php';
    var params = {
        'url': callback.url ,
        'options': {
            'scan' : 1
        }
    };
    
    $.post(api, params, function(data) {
        console.log(data);
        if(data.positives == 0){
            alert("掃描完畢 " + callback.url + "此下載檔案 \n在 " +
                data.total + " 處掃描結果皆為無異狀");
        }
        else if(data.positives > 0){
            alert("警告 " + callback.url + "此下載檔案 \n在 " +
                data.total + " 處中有 " + data.positives + " 處偵測為惡意");
        }
    }, 'json');
});
