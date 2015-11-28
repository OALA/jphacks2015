ons.bootstrap(); //ここで全てのonsenUIのjsを呼び出す

$(document).on("pageinit", "#page1", function () {
    dataset();
});



/*-----------------
  報告modalの呼び出し
-----------------*/
function open_modal_report() {
    modal_report.show();
}

function close_modal_report() {
    modal_report.hide();
}

function do_report() {
    modal_report.hide();
    $("#sample_report1").hide("slow", function () {
        $("#sample_report2").show("slow");
    });
}

/*-----------------
  認証modalの呼び出し
-----------------*/
function open_modal_authorize() {
    modal_authorize.show();
}

function close_modal_authorize() {
    modal_authorize.hide();
}

function do_authorize() {
    modal_authorize.hide();
    $("#sample_report2").hide("slow", function () {
        $("#sample_report3").show("slow");
    });
}

/*-----------------
  応援modalの呼び出し
-----------------*/
function open_modal_collaborate() {
    modal_collaborate.show();
}

function close_modal_collaborate() {
    modal_collaborate.hide();
}

function do_collaborate() {
    modal_collaborate.hide();
    $("#help_sample1").hide("fast", function () {
        $("#help_sample2").show("slow");
    });
}

/*-----------------
  プロファイルでのmodalの呼び出し
-----------------*/
function open_modal(target) {
    switch (target) { //targetによって、開く対象をスイッチする
    case "user":
        modal.show();
        $("#modal_user").show();
        break;
    case "team":
        modal.show();
        $("#modal_team").show();
        break;
    case "title":
        modal.show();
        $("#modal_title").show();
        break;
    case "badge":
        modal.show();
        $("#modal_badge").show();
        break;
    }
}

function close_modal(target) {
    switch (target) { //targetによって、閉じる対象をスイッチする
    case "user":
        modal.hide();
        $("#modal_user").hide();
        break;
    case "team":
        modal.hide();
        $("#modal_team").hide();
        break;
    case "title":
        modal.hide();
        $("#modal_title").hide();
        break;
    case "badge":
        modal.hide();
        $("#modal_badge").hide();
        break;
    }
}



/*-----------------
  スポンサーmodalの呼び出し
-----------------*/
//function open_modal_sponsor() {
//    modal_sponsor.show();
//}
//
//function close_modal_sponsor() {
//    modal_sponsor.hide();
//}

/*-----------------
  攻撃modalの呼び出し
-----------------*/
//function open_modal_attack() {
//    modal_attack.show();
//}
//
//function close_modal_attack() {
//    modal_attack.hide();
//}


/*-----------------
  応援modalの呼び出し
-----------------*/
//function open_modal_help() {
//    modal_help.show();
//}
//
//function close_modal_help() {
//    modal_help.hide();
//}


//====Google Map API=====//
var mapMaster;
var currentInfoWindow;
//var marker;

function dataset() {

    //マップ初期化
    mapinitialize();

    //拠点ポイント打つ
    plotpoint();

    plotself();
}

/*-----------------
  mapinitialize関数
  dataset関数から呼び出し
  会津若松市の地図を表示する
-----------------*/
function mapinitialize() {

    var mapOption = {
        center: new google.maps.LatLng(37.49473, 139.92981), // 地図の場所
        mapTypeId: google.maps.MapTypeId.ROADMAP, // 地図の種類
        zoom: 15 // 地図の縮尺
    };

    //Mapクラスの作成と地図の描画
    var canvas = document.getElementById('map_canvas');
    mapMaster = new google.maps.Map(canvas, mapOption);
}

/*-----------------
  plotpoint関数(ここでmodalも操作している)
-----------------*/
function plotpoint() {

    //緯度、経度、拠点名、高評価数、低評価数、累計攻略数、経験値、ステータス（0:通常、1:除雪対象、2:除雪中）
    var arrayTable = [
            [37.49373, 139.91981, "スーパー川崎の休憩所", 27, 2, 2, 0],
            [37.50173, 139.92481, "松島公園", 59, 4, 3,1],
            [37.48273, 139.93181, "金次郎像前休憩スペース", 9, 4, 2,1],
            [37.49973, 139.93981, "会津大学食堂", 12, 1, 1, 1],
            [37.49723, 139.93081, "土管が３つある空き地",  30, 1, 3, 2]
        ];


    var i = 0;
    var limit = 5;
    var content = "";

    while (i < limit) {

        var myLatlng = new google.maps.LatLng(arrayTable[i][0], arrayTable[i][1]);

        switch (arrayTable[i][6]) {
        case 0:
            content = '<h4>' + arrayTable[i][2] + '</h4><p>憩い度：' + '<img width="32" height="32" src="./images/star.png"><img width="32" height="32" src="./images/star.png"><img width="32" height="32" src="./images/star.png">" <br/>' + '訪問者数：' + arrayTable[i][3] + '人<br/>' + '設備：' + '<img width="32" height="32" src="./images/drink.png"><br/>' + '特徴：[広] [洒]<br/>' + 'Comment + <br/></p>';
            break;
        case 1:
            content = '<h4>' + arrayTable[i][2] + '</h4><p>憩い度：' + '<img width="32" height="32" src="./images/star.png"><br/>' + '訪問者数：' + arrayTable[i][3] + '人<br/>' + '設備：' + '<img width="32" height="32" src="./images/hamburger.png"><br/>' + '特徴：[静] [広]<br/>' + 'Comment：<br/> ~~~~~~ <br/></p>';
            break;
        case 2:
            content = '<h4>' + arrayTable[i][2] + '</h4><p>憩い度：' + '<img width="32" height="32" src="./images/star.png"><br/>' + '訪問者数：' + arrayTable[i][3] + '人<br/>' + '設備：' + '<img width="32" height="32" src="./images/hamburger.png"><br/>' + '特徴：[静] [広]<br/>' + 'Comment：<br/> ~~~~~~ <br/></p>';
            break;
        }

        createMarker(myLatlng, content, mapMaster, arrayTable[i][6]);

        i = i + 1;
    }
}

function createMarker(latlng, content, map, status) {

    var icon_img = "";
    var icon_animation = "";
    var marker = ""

    switch (status) {
    case 0:
        icon_img = "./images/m_64.png";
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: icon_img
        });
        break;
    case 1:
        icon_img = "./images/m_64.png";
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: icon_img,
            animation: google.maps.Animation.BOUNCE //バウンド
        });
        break;
    case 2:
        icon_img = "./images/m_64.png";
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: icon_img,
            animation: google.maps.Animation.BOUNCE //バウンド
        });
        break;
    }

    var infoWindow = new google.maps.InfoWindow();


    google.maps.event.addListener(marker, 'click', function () {

        //先に開いた情報ウィンドウがあれば、closeする
        if (currentInfoWindow) {
            currentInfoWindow.close();
        }

        //情報ウィンドウを開く
        infoWindow.setContent(content);
        infoWindow.open(map, marker);

        //開いた情報ウィンドウを記録しておく
        currentInfoWindow = infoWindow;

    });

}

function plotself() {
    navigator.geolocation.watchPosition(
        function (position) {

            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: mapMaster,
                icon: "./images/user.png"
            });
            var infoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, 'click', function () {

                //先に開いた情報ウィンドウがあれば、closeする
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }

                //情報ウィンドウを開く
                infoWindow.setContent('<h4>さくらい♡</h4>');
                infoWindow.open(mapMaster, marker);

                //開いた情報ウィンドウを記録しておく
                currentInfoWindow = infoWindow;

            });

        }
    );
}