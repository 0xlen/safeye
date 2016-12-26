chrome.runtime.onConnect.addListener(function(port) {
});

chrome.browserAction.onClicked.addListener(function(tab) {
});

chrome.downloads.onCreated.addListener(function(callback){
    chrome.downloads.pause(callback.id);
    var api = 'http://safeye.azurewebsites.net/api/url_scan.php';
    var params = {
        'url': callback.url
    };
    $.post(api, params, function(data) {
    	console.log(data);
    	chrome.downloads.resume(callback.id);
        alert(data.positives + '/' + data.total);
    }, 'json');
});
