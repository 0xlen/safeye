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

    // $(window).load(function(){
    //     var totalPositive=0;
    //     for(let i=0;i<myMailScan.length;i++){
    //         if(myMailScan[i].positives > 0){
    //             if(totalPositive==0){
    //                 totalPositive++;
    //                 $("#allPositiveTable").html(
    //                 "<tr>"+
    //                 "<td>問題連結</td>"+
    //                 "<td>整體惡意網站偵測</td>"+
    //                 "<td>報告連結</td>"+
    //                 "</tr>");
    //             }
    //             $("#allPositiveTable").html(
    //                 $("#allPositiveTable").html()+
    //                 "<tr>"+
    //                 "<td>"+myMailScan[i].resource+"</td>"+
    //                 "<td>"+myMailScan[i].positives+"/"+myMailScan[i].total+"</td>"+
    //                 "<td>"+myMailScan[i].permalink+"</td>"+
    //                 "</tr>"+
    //                 "</tr>");
    //         }
    //     }
    // });

});


var CLIENT_ID = 'YOUR_API_KEY.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

function checkAuth() {
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult);
}


function handleAuthResult(authResult) {
    if (authResult) {
        loadGmailApi();
    }
}


function handleAuthClick(event) {
    gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
    return false;
}

function loadGmailApi() {
    gapi.client.load('gmail', 'v1', listMessages);
}

var urlRegex = 'http[s]?:\\/\\/[\\w|\.|-]+';
var url = new RegExp(urlRegex, 'g');

function MailURLList (mailId,mailURL){
    this.MailId=mailId;
    this.MailURL=mailURL;
}

var mailURLList = new Array();

var allURL = new Array();

var allValidMailCount = 0;
var nowValidMailCount = 0;

var pageToken ="";

function listMessages() {
    var userId = 'arashi30801@gmail.com';
    var request = gapi.client.gmail.users.messages.list({
        'userId': userId,
        'pageToken': pageToken,
        'maxResults' : 500
    });
    request.execute(function(resp) {
        if(resp.nextPageToken){
            pageToken = resp.nextPageToken;
            listMessages();
        }
        var messages = resp.messages;
        allValidMailCount += messages.length;
        for(var i = 0; i < messages.length; i++) {
            getMessage(userId,messages[i].id);
        }
    });
}

function searchFormMailId(mailURLList,mailId){
    var index;
    var length = mailURLList.length;
    for (index = 0; index < length; ++index) {
        if(mailURLList[index].MailId == mailId)
            return true;
    }
    return false
}


var myVar ="";
var nowValidURLCount=0;
var allValidMailCount=0;
function getMessage(userId, messageId){
    var request = gapi.client.gmail.users.messages.get({
        'userId': userId,
        'id': messageId
    });
    request.execute(
        function(resp) {
            nowValidMailCount++;

            if(nowValidMailCount == allValidMailCount){
                nowValidURLCount = 0;
                allValidURLCount = allURL.length;
                myVar = setInterval(virusTotalTest, 10);
            }
            if(resp.payload.body.size > 0 ){
                var decodeMailURL = (Base64.decode(resp.payload.body.data)).match(url);
                if(decodeMailURL != null)
                {

                    var length = decodeMailURL.length;
                    for (index = 0; index < length; ++index) 
                    {
                        if(allURL.indexOf(decodeMailURL[index]) == -1)
                            allURL.push(decodeMailURL[index]);
                    }

                    if(!searchFormMailId(mailURLList,resp.id)){
                        mailURLList.push({
                            MailId : resp.id,
                            MailURL : (Base64.decode(resp.payload.body.data)).match(url).filter(function(item, pos, self){return self.indexOf(item) == pos;})
                        })

                        var index;
                        var length = mailURLList.length-1;
                        if(mailURLList[length].MailURL != null){
                            mailURLList[length].MailURL.forEach(function (element){
                            }); 
                        }
                    }
                }
            }
    });
}

var allURLReport = new Array();

var scanValidURLCount = 0;
function virusTotalTest(){
    if(nowValidURLCount==allValidURLCount){
        clearInterval(myVar);
        console.log(allValidURLCount);
        return;
    }
    allURL[nowValidURLCount];
    nowValidURLCount++;

    var api = 'http://10.104.4.171/safeye/api/url_scan.php';
    var params = {
        'url': allURL[nowValidURLCount] ,
        'options': {
            'scan' : 1
        }
    };
    $.post(api, params, function(data) {
        scanValidURLCount++;
        if(data.positives>0){
            console.log(data);
            changeTable(data);
        }
        
    }, 'json');

}

var totalPositive=0;
function changeTable(data){
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
        "<td>"+data.resource+"</td>"+
        "<td>"+data.positives+"/"+data.total+"</td>"+
        "<td>"+data.permalink+"</td>"+
        "</tr>"+
        "</tr>");
}