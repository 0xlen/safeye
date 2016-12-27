chrome.browserAction.onClicked.addListener(function(tab) {
});

chrome.runtime.onConnect.addListener(function(port) {

});


chrome.downloads.onCreated.addListener(function(callback){
    var api = 'http://10.104.4.171/safeye/api/url_scan.php';
    var params = {
        'url': callback.url ,
        'options': {
            'scan' : 1
        }
    };
    $.post(api, params, function(data) {
        console.log(data);
        if(data.positives > 0){
            alert("警告 " + callback.url + "此下載連結 \n在 " +
                data.total + " 處中有 " + data.positives + " 處偵測為惡意");
        }
    }, 'json');
});
