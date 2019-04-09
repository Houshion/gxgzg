// document.getElementsByTagName("head")[0].appendChild('<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>')

var newScript = document.createElement("script");
newScript.type = "text/javascript";
newScript.src = "http://res.wx.qq.com/open/js/jweixin-1.2.0.js";

var head = document.getElementsByTagName("head")[0];
head.appendChild(newScript);

var baseUrl = "http://gzxzgzg.app.xiaozhuschool.com/";

/**************************** 动作类 ****************************/
// 返回上一层
function back() {
    history.back(-1);
}

//跳转页面
function goTo(url, param, type) {
    if (!param) {
        url = url;
    } else {
        url = url + "?" + param;
    }
    if (type && type == "replace") {
        location.replace(url)
    } else {
        window.location.href = url;
    }
}

// iphone返回刷新
function addEventback(url) {
    pushHistory();
    var bool = false;
    setTimeout(function () {
        bool = true;
    }, 500);
    window.addEventListener(
        "popstate",
        function (e) {
            console.log(bool);
            if (bool) {
                // alert("我监听到了浏览器的返回按钮事件啦")//根据自己的需求实现自己的功能
                location.href = url;
                // WeixinJSBridge.call('closeWindow')
            }
            // pushHistory()
        },
        false
    );
}
// iphone返回刷新
function pushHistory() {
    var state = {
        title: "",
        url: "#"
    };
    window.history.replaceState(state, "", "#");
}

// 飞入购物车
function shoppingCartAnimate(obj, car) {
    var fly_elm = $(obj)
        .closest(".list")
        .find(".pic")
        .clone();
    var good_item = $(obj)
        .closest(".list")
        .find(".pic");
    $("body").append(fly_elm);
    fly_elm.css({
        "z-index": 9000,
        display: "block",
        position: "absolute",
        top: good_item.offset().top + "px",
        left: good_item.offset().left + "px",
        width: good_item.width() + "px",
        height: good_item.height() + "px"
    });
    fly_elm.animate({
            top: $(car).offset().top,
            left: $(car).offset().left,
            width: 10,
            height: 10
        },
        "slow",
        function () {
            fly_elm.remove();
        }
    );
}

/******************************* 判断类 **************************/
// 验证手机
function isPhone(phone) {
    if (/^1[3|4|5|8][0-9]\d{8}$/.test(phone)) {
        return true;
    } else {
        return false;
    }
}
// 验证身份证
function isIdNum(ID) {
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(ID)) {
        return false;
    } else {
        return true;
    }
}
// 验证车牌号
function isCarNum(num) {
    if (vehicleNumber.length == 7) {
        var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        if (express.test(vehicleNumber)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
// 判断是否为空
function isNull(value) {
    if ($.trim(value).length) {
        return false;
    } else {
        return true;
    }
}
// 判断是否为数字
function isNum(num) {
    if (isNaN(num)) {
        return true;
    } else {
        return false;
    }
}
// 判断邮箱是否正确
function isEmail(email) {
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var isok = reg.test(email);
    if (isok) {
        return true;
    } else {
        return false;
    }
}

/***************************** 转换类 *******************************/
/**
 * @param now 时间
 * @param ff 格式 Y-m-d H:i:s / Y-m-d / Y-m-d H:i
 */
// 日期格式化
function formatDate(now, ff) {
    var year = now.getFullYear();
    var month =
        now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    var minute =
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    var second =
        now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    if (ff == "Y-m-d") {
        return year + "-" + month + "-" + date;
    } else if (ff == "Y-m-d H:i:s") {
        return (
            year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
        );
    } else if (ff == "Y-m-d H:i") {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
}
// 转换时间
function format(time, ff) {
    var d = new Date(time);
    return formatDate(d, ff);
}
// 转时间戳
function turnTimestamp(timestamp, ff) {
    var time = new Date();
    time.setTime(timestamp);
    return format(time, ff);
}

/****************************** 缓存类 ******************************/
// 设置本地缓存
function setItem(key, val) {
    return window.localStorage.setItem(key, val);
}
// 获取本地缓存
function getItem(key) {
    return window.localStorage.getItem(key);
}
// 删除本地缓存
function moveItem(key) {
    localStorage.removeItem(key);
}
/**
 * @param name cookie名称
 * @param value cookie值
 * @param iDay cookie的时间
 */
// 设置cookie
function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + "=" + value + ";expires=" + oDate;
}
// 获取cookie
function getCookie(name) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return "";
}
// 删除cookie
function removeCookie(name) {
    setCookie(name, 1, -1);
}

/****************************** 获取url参数 *********************/
function getParam() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/******************************* Ajax ***************************/
/**
 * @param Param 参数
 * @param callback 成功回调
 * @param error 失败回调
 */
// 请求ajax
function ajaxPost(Param, url, callback, async) {
    $.ajax({
        type: "POST",
        url: baseUrl + url, // ajax请求路径
        dataType: "JSON",
        data: Param,
        async: async ==false ? false : true,
            success: function (data) {
                callback(data);
            },
            error: function (errorThrown) {
                console.log("错误::", errorThrown);
            }
    });
}

/***************************** 随机验证码 *************************/
function createCode() {
    var code = "";
    var codeLength = 4;
    //设置随机字符
    var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
    );
    //循环codeLength 我设置的4就是循环4次
    for (var i = 0; i < codeLength; i++) {
        //设置随机数范围,这设置为0 ~ 36
        var index = Math.floor(Math.random() * 36);
        //字符串拼接 将每次随机的字符 进行拼接
        code += random[index];
    }
    return code;
}

/******************************* 判断支付环境 ***********************/
function isWX_Allipay() {
    if (
        window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
        "micromessenger"
    ) {
        return "WX";
    } else if (
        window.navigator.userAgent.toLowerCase().match(/AlipayClient/i) ==
        "alipayclient"
    ) {
        return "Allipay";
    } else {
        return "Others";
    }
}

/******************************* 微信JS-sdk ***********************/
// getTicket
function getTicket(param, url) {
    ajaxPost(
        param,
        url,
        function (res) {
            if (res.code == 1) {
                var ticket = res.data.ticket;
                var timestamp = (new Date().getTime() / 1000).toFixed(0);
                var nonceStr = Math.random()
                    .toString(36)
                    .substr(2);
                var tickets = wx_js(res.data.ticket, timestamp, nonceStr);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端//alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: "wx0a7383715dca7cd5", // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: tickets, // 必填，签名，见附录1
                    jsApiList: [
                        "checkJsApi",
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                        "onMenuShareQQ",
                        "onMenuShareWeibo",
                        "hideMenuItems",
                        "showMenuItems",
                        "hideAllNonBaseMenuItem",
                        "showAllNonBaseMenuItem",
                        "translateVoice",
                        "startRecord",
                        "stopRecord",
                        "onRecordEnd",
                        "playVoice",
                        "pauseVoice",
                        "stopVoice",
                        "uploadVoice",
                        "downloadVoice",
                        "chooseImage",
                        "previewImage",
                        "uploadImage",
                        "downloadImage",
                        "getNetworkType",
                        "openLocation",
                        "getLocation",
                        "hideOptionMenu",
                        "showOptionMenu",
                        "closeWindow",
                        "scanQRCode",
                        "chooseWXPay",
                        "openProductSpecificView",
                        "addCard",
                        "chooseCard",
                        "openCard"
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }
        },
        false
    );
}

function wx_js(signature, timestamp, nonceStr) {
    var e = decodeURIComponent(
            "jsapi_ticket=" +
            signature +
            "&noncestr=" +
            nonceStr +
            "&timestamp=" +
            timestamp +
            "&url=" +
            location.href.split("#")[0]
        ),
        s = new jsSHA(e, "TEXT"),
        signature = s.getHash("SHA-1", "HEX");
    return signature;
}

// 调用微信JS api 支付
var jsApiParameters = {};

function jsApiCall(url, paylog) {
    WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        jsApiParameters, // 提交的支付信息
        function (res) {
            layer.close(l)
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                layer_msg("支付成功");
                if (paylog) {
                    setTimeout(() => {
                        ajaxPost({
                            HTTP_API: "vv/order/api/index/getcodebypaylog",
                            paylog: paylog,
                            token: getItem("token")
                        }, "", function (data) {
                            if (data.code == 1) {
                                setItem("code", data.data)

                            } else {
                                layer_msg(data.msg);
                            }
                        }, false);
                    }, 500);
                }
                setTimeout(() => {
                    window.location.replace(url);
                }, 1500);
            } else {
                layer_msg("取消支付");
            }
        }
    );
}

// 调用微信支付
function callpay(url, log) {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", jsApiCall, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", jsApiCall);
            document.attachEvent("onWeixinJSBridgeReady", jsApiCall);
        }
    } else {
        jsApiCall(url, log);
    }
}

//SHA1算法加密
(function (D) {
    function p(b, e, c) {
        var a = 0,
            d = [0],
            f = "",
            g = null,
            f = c || "UTF8";
        if ("UTF8" !== f && "UTF16" !== f) throw "encoding must be UTF8 or UTF16";
        if ("HEX" === e) {
            if (0 !== b.length % 2) throw "srcString of HEX type must be in byte increments";
            g = v(b);
            a = g.binLen;
            d = g.value
        } else if ("TEXT" === e) g = w(b, f), a = g.binLen, d = g.value;
        else if ("B64" === e) g = x(b), a = g.binLen, d = g.value;
        else if ("BYTES" === e) g = y(b), a = g.binLen, d = g.value;
        else throw "inputFormat must be HEX, TEXT, B64, or BYTES";
        this.getHash = function (b, f, c, e) {
            var g = null,
                h = d.slice(),
                l = a,
                n;
            3 === arguments.length ? "number" !== typeof c && (e = c, c = 1) : 2 === arguments.length && (c = 1);
            if (c !== parseInt(c, 10) || 1 > c) throw "numRounds must a integer >= 1";
            switch (f) {
                case "HEX":
                    g = z;
                    break;
                case "B64":
                    g = A;
                    break;
                case "BYTES":
                    g = B;
                    break;
                default:
                    throw "format must be HEX, B64, or BYTES";
            }
            if ("SHA-1" === b)
                for (n = 0; n < c; n += 1) h = s(h, l), l = 160;
            else throw "Chosen SHA variant is not supported";
            return g(h, C(e))
        };
        this.getHMAC = function (c, b, e, g, q) {
            var h, l, n, r, p = [],
                t = [];
            h = null;
            switch (g) {
                case "HEX":
                    g = z;
                    break;
                case "B64":
                    g =
                        A;
                    break;
                case "BYTES":
                    g = B;
                    break;
                default:
                    throw "outputFormat must be HEX, B64, or BYTES";
            }
            if ("SHA-1" === e) l = 64, r = 160;
            else throw "Chosen SHA variant is not supported";
            if ("HEX" === b) h = v(c), n = h.binLen, h = h.value;
            else if ("TEXT" === b) h = w(c, f), n = h.binLen, h = h.value;
            else if ("B64" === b) h = x(c), n = h.binLen, h = h.value;
            else if ("BYTES" === b) h = y(c), n = h.binLen, h = h.value;
            else throw "inputFormat must be HEX, TEXT, B64, or BYTES";
            c = 8 * l;
            b = l / 4 - 1;
            if (l < n / 8) {
                if ("SHA-1" === e) h = s(h, n);
                else throw "Unexpected error in HMAC implementation";
                h[b] &= 4294967040
            } else l > n / 8 && (h[b] &= 4294967040);
            for (l = 0; l <= b; l += 1) p[l] = h[l] ^ 909522486, t[l] = h[l] ^ 1549556828;
            if ("SHA-1" === e) e = s(t.concat(s(p.concat(d), c + a)), c + r);
            else throw "Unexpected error in HMAC implementation";
            return g(e, C(q))
        }
    }

    function w(b, e) {
        var c = [],
            a, d = [],
            f = 0,
            g;
        if ("UTF8" === e)
            for (g = 0; g < b.length; g += 1)
                for (a = b.charCodeAt(g), d = [], 128 > a ? d.push(a) : 2048 > a ? (d.push(192 | a >>> 6), d.push(128 | a & 63)) : 55296 > a || 57344 <= a ? d.push(224 | a >>> 12, 128 | a >>> 6 & 63, 128 | a & 63) : (g += 1, a = 65536 + ((a & 1023) << 10 | b.charCodeAt(g) & 1023),
                        d.push(240 | a >>> 18, 128 | a >>> 12 & 63, 128 | a >>> 6 & 63, 128 | a & 63)), a = 0; a < d.length; a += 1)(f >>> 2) + 1 > c.length && c.push(0), c[f >>> 2] |= d[a] << 24 - f % 4 * 8, f += 1;
        else if ("UTF16" === e)
            for (g = 0; g < b.length; g += 1)(f >>> 2) + 1 > c.length && c.push(0), c[f >>> 2] |= b.charCodeAt(g) << 16 - f % 4 * 8, f += 2;
        return {
            value: c,
            binLen: 8 * f
        }
    }

    function v(b) {
        var e = [],
            c = b.length,
            a, d;
        if (0 !== c % 2) throw "String of HEX type must be in byte increments";
        for (a = 0; a < c; a += 2) {
            d = parseInt(b.substr(a, 2), 16);
            if (isNaN(d)) throw "String of HEX type contains invalid characters";
            e[a >>> 3] |=
                d << 24 - a % 8 * 4
        }
        return {
            value: e,
            binLen: 4 * c
        }
    }

    function y(b) {
        var e = [],
            c, a;
        for (a = 0; a < b.length; a += 1) c = b.charCodeAt(a), (a >>> 2) + 1 > e.length && e.push(0), e[a >>> 2] |= c << 24 - a % 4 * 8;
        return {
            value: e,
            binLen: 8 * b.length
        }
    }

    function x(b) {
        var e = [],
            c = 0,
            a, d, f, g, m;
        if (-1 === b.search(/^[a-zA-Z0-9=+\/]+$/)) throw "Invalid character in base-64 string";
        a = b.indexOf("=");
        b = b.replace(/\=/g, "");
        if (-1 !== a && a < b.length) throw "Invalid '=' found in base-64 string";
        for (d = 0; d < b.length; d += 4) {
            m = b.substr(d, 4);
            for (f = g = 0; f < m.length; f += 1) a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(m[f]),
                g |= a << 18 - 6 * f;
            for (f = 0; f < m.length - 1; f += 1) e[c >> 2] |= (g >>> 16 - 8 * f & 255) << 24 - c % 4 * 8, c += 1
        }
        return {
            value: e,
            binLen: 8 * c
        }
    }

    function z(b, e) {
        var c = "",
            a = 4 * b.length,
            d, f;
        for (d = 0; d < a; d += 1) f = b[d >>> 2] >>> 8 * (3 - d % 4), c += "0123456789abcdef".charAt(f >>> 4 & 15) + "0123456789abcdef".charAt(f & 15);
        return e.outputUpper ? c.toUpperCase() : c
    }

    function A(b, e) {
        var c = "",
            a = 4 * b.length,
            d, f, g;
        for (d = 0; d < a; d += 3)
            for (g = (b[d >>> 2] >>> 8 * (3 - d % 4) & 255) << 16 | (b[d + 1 >>> 2] >>> 8 * (3 - (d + 1) % 4) & 255) << 8 | b[d + 2 >>> 2] >>> 8 * (3 - (d + 2) % 4) & 255, f = 0; 4 > f; f += 1) c = 8 * d + 6 * f <= 32 * b.length ? c +
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >>> 6 * (3 - f) & 63) : c + e.b64Pad;
        return c
    }

    function B(b) {
        var e = "",
            c = 4 * b.length,
            a, d;
        for (a = 0; a < c; a += 1) d = b[a >>> 2] >>> 8 * (3 - a % 4) & 255, e += String.fromCharCode(d);
        return e
    }

    function C(b) {
        var e = {
            outputUpper: !1,
            b64Pad: "="
        };
        try {
            b.hasOwnProperty("outputUpper") && (e.outputUpper = b.outputUpper), b.hasOwnProperty("b64Pad") && (e.b64Pad = b.b64Pad)
        } catch (c) {}
        if ("boolean" !== typeof e.outputUpper) throw "Invalid outputUpper formatting option";
        if ("string" !== typeof e.b64Pad) throw "Invalid b64Pad formatting option";
        return e
    }

    function q(b, e) {
        return b << e | b >>> 32 - e
    }

    function r(b, e) {
        var c = (b & 65535) + (e & 65535);
        return ((b >>> 16) + (e >>> 16) + (c >>> 16) & 65535) << 16 | c & 65535
    }

    function t(b, e, c, a, d) {
        var f = (b & 65535) + (e & 65535) + (c & 65535) + (a & 65535) + (d & 65535);
        return ((b >>> 16) + (e >>> 16) + (c >>> 16) + (a >>> 16) + (d >>> 16) + (f >>> 16) & 65535) << 16 | f & 65535
    }

    function s(b, e) {
        var c = [],
            a, d, f, g, m, p, u, k, s, h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        b[e >>> 5] |= 128 << 24 - e % 32;
        b[(e + 65 >>> 9 << 4) + 15] = e;
        s = b.length;
        for (u = 0; u < s; u += 16) {
            a = h[0];
            d = h[1];
            f = h[2];
            g = h[3];
            m = h[4];
            for (k = 0; 80 > k; k += 1) c[k] = 16 > k ? b[k + u] : q(c[k - 3] ^ c[k - 8] ^ c[k - 14] ^ c[k - 16], 1), p = 20 > k ? t(q(a, 5), d & f ^ ~d & g, m, 1518500249, c[k]) : 40 > k ? t(q(a, 5), d ^ f ^ g, m, 1859775393, c[k]) : 60 > k ? t(q(a, 5), d & f ^ d & g ^ f & g, m, 2400959708, c[k]) : t(q(a, 5), d ^ f ^ g, m, 3395469782, c[k]), m = g, g = f, f = q(d, 30), d = a, a = p;
            h[0] = r(a, h[0]);
            h[1] = r(d, h[1]);
            h[2] = r(f, h[2]);
            h[3] = r(g, h[3]);
            h[4] = r(m, h[4])
        }
        return h
    }
    "function" === typeof define && define.amd ? define(function () {
            return p
        }) : "undefined" !== typeof exports ? "undefined" !== typeof module && module.exports ? module.exports =
        exports = p : exports = p : D.jsSHA = p
})(this);
/******************************* 微信JS-sdk ***********************/

//公共方法
$(function () {
    // 关闭遮罩层
    $(".mask").on("click", function () {
        $(".mask").fadeOut(300);
        $(".maskBox").fadeOut(300);
    });

    // 获取URL数据并显示相应内容
    var type = getParam("type");
    $("." + type.type).show();
});

/************************ 清除特定数据 ************************/

// 去掉alert上面的服务器地址
window.alert = function (name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", "data:text/plain,");
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};

// 去掉confirm上面的服务器地址
window.confirm = function (message) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", "data:text/plain,");
    document.documentElement.appendChild(iframe);
    var alertFrame = window.frames[0];
    var result = alertFrame.window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return result;
};

/********************** 上拉加载/下拉刷新 **********************/
function touchLoad(index) {
    var loadFlag = true;
    var mySwiper = new Swiper(".touchLoad", {
        direction: "vertical",
        scrollbar: ".swiper-scrollbar",
        slidesPerView: "auto",
        mousewheel: true,
        freeModeSticky: true,
        on: {
            touchMove: function (swiper) {
                //手动滑动中触发
                if (mySwiper.translate < 50 && mySwiper.translate > 0) {
                    $(".init-loading")
                        .html("下拉刷新...")
                        .show();
                } else if (mySwiper.translate > 50) {
                    $(".init-loading")
                        .html("释放刷新...")
                        .show();
                }
            },
            touchEnd: function (swiper) {
                var _viewHeight = document.getElementsByClassName("swiper-wrapper")[index]
                    .offsetHeight;
                var _contentHeight = document.getElementsByClassName("swiper-slide")[index]
                    .offsetHeight;
                // 上拉加载
                if (
                    mySwiper.translate <= _viewHeight - _contentHeight - 50 &&
                    mySwiper.translate < 0
                ) {
                    // console.log("已经到达底部！");

                    if (loadFlag) {
                        $(".loadtip").html("正在加载...").show();
                    } else {
                        $(".loadtip").html("没有更多啦！").show();
                    }

                    setTimeout(function () {
                        for (var i = 0; i < 5; i++) {
                            $(".list-group").append(
                                '<li class="list-group-item">我是加载出来的...</li>'
                            );
                        }
                        $(".loadtip").html("上拉加载更多...").hide();
                        mySwiper.update(); // 重新计算高度;
                    }, 800);
                }

                // 下拉刷新
                if (mySwiper.translate >= 50) {
                    $(".init-loading")
                        .html("正在刷新...")
                        .show();
                    $(".loadtip").html("上拉加载更多").hide();
                    loadFlag = true;

                    setTimeout(function () {
                        $(".refreshtip").show(0);
                        $(".init-loading").html("刷新成功！");
                        setTimeout(function () {
                            $(".init-loading")
                                .html("")
                                .hide();
                        }, 800);
                        $(".loadtip").show(0);

                        //刷新操作
                        mySwiper.update(); // 重新计算高度;
                    }, 1000);
                } else if (mySwiper.translate >= 0 && mySwiper.translate < 50) {
                    $(".init-loading")
                        .html("")
                        .hide();
                }
                return false;
            }
        }
    });
}

function dropLoad(el, callback) {
    /** 获取商品信息 **/
    $(el).dropload({
        scrollArea: window,
        loadDownFn: function (me) {
            callback(me);
        }
    });
}

function getRowName(row) {
    var rRow;
    if (row == 1) {
        rRow = 'A'
    } else if (row == 2) {
        rRow = 'B'
    } else if (row == 3) {
        rRow = 'C'
    } else if (row == 4) {
        rRow = 'D'
    } else if (row == 5) {
        rRow = 'E'
    } else if (row == 6) {
        rRow = 'F'
    } else if (row == 7) {
        rRow = 'G'
    } else if (row == 8) {
        rRow = 'H'
    } else if (row == 9) {
        rRow = 'I'
    } else if (row == 10) {
        rRow = 'J'
    } else if (row == 11) {
        rRow = 'K'
    } else if (row == 12) {
        rRow = 'L'
    } else if (row == 13) {
        rRow = 'M'
    } else if (row == 14) {
        rRow = 'N'
    } else if (row == 15) {
        rRow = 'O'
    } else if (row == 16) {
        rRow = 'P'
    } else if (row == 17) {
        rRow = 'Q'
    } else if (row == 18) {
        rRow = 'R'
    } else if (row == 19) {
        rRow = 'S'
    } else if (row == 20) {
        rRow = 'T'
    } else if (row == 21) {
        rRow = 'U'
    } else if (row == 22) {
        rRow = 'V'
    } else if (row == 23) {
        rRow = 'W'
    } else if (row == 24) {
        rRow = 'X'
    } else if (row == 25) {
        rRow = 'Y'
    } else if (row == 26) {
        rRow = 'Z'
    }
    return rRow;
}

function isHadBox() {
    var status;
    ajaxPost({
        HTTP_API: "vv/cupboard/api/index/qualification",
        token: getItem("token"),
    }, "", function (res) {
        console.log(res);
        if (res.code == 1 && res.data.status == 1) {
            status = 1;
        } else if (res.code == 0) {
            setItem("lingquBox", JSON.stringify(res.data.lingquInfo))
            layer_msg(res.msg);
            status = 0;
        } else if (res.code == 2) {
            layer_msg(res.msg);
            status = 2;
        }
    }, false)
    return status
}