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

    window.onload = function () {

        function start() {
            // alert("刷课开始");
            //获取课程结构树
            var courseStruTree = document.querySelector(".course-structure-tree__wrapper");

            //获取当前播放视频小节
            var videoCurrentTag = courseStruTree.querySelector(".tree-video-item__wrap");
            var currentSection = videoCurrentTag.parentElement.parentElement;
            currentSection.id = "currentMark";
            currentSection.classList.add("videoSection");

            //获取非当前播放视频章节数
            var videoSection = courseStruTree.querySelectorAll(".el-icon-arrow-down");
            for (var t = 0; t < videoSection.length; t++) {
                videoSection[t].parentElement.parentElement.classList.add("videoSection");
            }

            //获取当前章节小节全部节点
            var sectionItem = courseStruTree.querySelectorAll(".videoSection");

            var currentSectionMark;
            var totalSection = videoSection.length + 1;

            for (var i = 0; i < sectionItem.length; i++) {
                if (sectionItem[i].getAttribute("id") == "currentMark") {
                    currentSectionMark = i + 1;
                    break;
                }
            }

            console.log("本章节共 " + totalSection + " 视频小节，当前在第 " + currentSectionMark + " 小节");

            //生成下一章节链接
            var currentURL = window.location.href;
            var temp = currentURL.split('/');
            var num = parseInt(temp[8]);
            num += 1;
            temp[8] = String(num);
            var nextURL = temp.join('/');

            //获取播放时间
            var timeBlock = document.querySelector(".xt_video_player_current_time_display");
            var curTime = timeBlock.getElementsByTagName("span")[0].innerHTML;
            var totalTime = timeBlock.getElementsByTagName("span")[1].innerHTML;
            var curT = curTime.split(":");
            var toT = totalTime.split(":");
            var curSec = parseInt(curT[0]) * 3600 + parseInt(curT[1]) * 60 + parseInt(curT[2]);
            var toSec = parseInt(toT[0]) * 3600 + parseInt(toT[1]) * 60 + parseInt(toT[2]);
            console.log("本视频共 " + toSec + " 秒  当前播放至第 " + curSec + " 秒");

            setTimeout(function () {
                    if (totalSection != currentSectionMark) {
                        window.location.replace(nextURL);
                    } else {
                        alert("该章节结束！")
                    }
                }
                , (toSec - curSec) * 1000 + 3000)


            //设置播放
            var video = document.querySelector("#video");
            video.volume = 0;
            video.play();
            console.log("开始播放 " + "当前小节所需时间 " + (toSec - curSec) + " 秒");

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

        setTimeout(start, 5000);

    }

})();


