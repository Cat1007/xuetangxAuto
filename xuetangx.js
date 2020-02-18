// ==UserScript==
// @name         学堂云
// @namespace    http://tampermonkey.net/
// @version      beta-0.1
// @description  学堂云自动挂机脚本
// @author       Cat1007
// @match        *://*.xuetangx.com/lms*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    window.onload=function () {

        function start(){
            // alert("刷课开始");
            //获取课程结构树
            var courseStruTree = document.querySelector(".course-structure-tree__wrapper");

            //获取当前章节小节全部节点
            var sectionItem = courseStruTree.querySelectorAll(".tree-section-item");

            //获取当前播放视频小节
            var videoCurrentTag = courseStruTree.querySelector(".tree-video-item__wrap");
            var currentSection = videoCurrentTag.parentElement.parentElement;
            currentSection.id = "currentMark";

            var currentSectionMark;
            var totalSection = sectionItem.length;

            for (var i = 0; i < sectionItem.length; i++) {
                if (sectionItem[i].getAttribute("id") == "currentMark") {
                    currentSectionMark = i + 1;
                    break;
                }
            }

            console.log("本章节共 " + totalSection + " 小节，当前在第 " + currentSectionMark + " 小节");

            //生成下一章节链接
            var currentURL = window.location.href;
            console.log(currentURL);
            var temp = currentURL.split('/');
            var num = parseInt(temp[8]);
            num += 1;
            temp[8] = String(num);
            var nextURL = temp.join('/');
            console.log(nextURL);

            //获取播放时间
            var timeBlock = document.querySelector(".xt_video_player_current_time_display");
            var curTime = timeBlock.getElementsByTagName("span")[0].innerHTML;
            var totalTime = timeBlock.getElementsByTagName("span")[1].innerHTML;
            var curT = curTime.split(":");
            var toT = totalTime.split(":");
            var curSec = parseInt(curT[0])*3600 + parseInt(curT[1])*60 + parseInt(curT[2]);
            var toSec = parseInt(toT[0])*3600 + parseInt(toT[1])*60 + parseInt(toT[2]);
            console.log(curSec);
            console.log(toSec);

            setTimeout(function () {
                if((totalSection-currentSectionMark)>=2){
                    window.location.replace(nextURL);
                }
                else{
                    alert("该章节结束！")
                }
            }
            ,(toSec-curSec)*1000+3000)


            //设置播放
            var video = document.querySelector("#video");
            video.volume = 0;
            video.play();

            //解决失焦暂停
            document.addEventListener("visibilitychange", function () {
                if (video.paused == true) {
                    video.play();
                }
            })
            window.onblur = function () {
                if (video.paused == true) {
                    video.play();
                }
            }
            window.onfocus = function () {
                if (video.paused == true) {
                    video.play();
                }
            }

        }
        setTimeout(start,5000);

    }

})();


