// ==UserScript==
// @name         学堂云_old
// @namespace    http://tampermonkey.net/
// @version      beta-0.1
// @description  学堂云自动挂机脚本 适用于学堂云proApp对应的平台
// @author       Cat1007
// @match        *.xuetangx.com/courses*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    window.onload = function () {

        function start() {

            var classStru = document.querySelector("#accordion");
            var allTest = classStru.querySelectorAll(".graded");

            for (var i = 0; i < allTest.length; i++) {
                allTest[i].remove();
            }

            var allVideo = classStru.querySelectorAll("li");
            var curVideo = classStru.querySelector(".ui-accordion-content-active .active");
            curVideo.id = "mark";
            var curVideoNum;
            var allVideoNum = allVideo.length;

            for (var k = 0; k < allVideo.length; k++) {
                if (allVideo[k].id == "mark") {
                    curVideoNum = k + 1;
                    break;
                }
            }

            console.log("本课程共 " + allVideoNum + " 视频小节，当前在第 " + curVideoNum + " 小节");

            var allLink = classStru.querySelectorAll("ul a");

            var timeBlock = document.querySelector(".xt_video_player_current_time_display");
            var curTime = timeBlock.getElementsByTagName("span")[0].innerHTML;
            var totalTime = timeBlock.getElementsByTagName("span")[1].innerHTML;
            var curT = curTime.split(":");
            var toT = totalTime.split(":");
            var curSec = parseInt(curT[0]) * 60 + parseInt(curT[1]);
            var toSec = parseInt(toT[0]) * 60 + parseInt(toT[1]);
            console.log("本视频共 " + toSec + " 秒  当前播放至第 " + curSec + " 秒");

            var nextLink
            if (curVideoNum != allVideoNum) {
                nextLink = allLink[curVideoNum].href;
            }

            setTimeout(function () {
                if (curVideoNum != allVideoNum){
                    window.location.replace(nextLink);
                }
                else{
                    alert("全部视频已经观看完毕！");
                }
            },(toSec - curSec)*1000+4000)

            //设置播放
            var video = document.querySelector(".xt_video_player");
            video.volume = 0;
            video.play();
            console.log("开始播放 " + "当前小节所需时间 " + (toSec - curSec) + " 秒");

        }

        setTimeout(start, 4000);

    }

})();


