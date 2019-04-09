/**
 * Created by Administrator on 2017/5/24.
 */
// 通用变量

var dlcUrl = 'http://gzxzgzg.app.xiaozhuschool.com'
var onoff_form = 0 //提交表单按钮开关

$('#container').show()

// 展示弹出层
function showModal(obj) {
    $('body').addClass('p-fixed')
    $(obj).show()
    $('.mask').fadeIn(300)
}

// 隐藏弹出层
function hideModal() {
    $('body').removeClass('p-fixed')
    $('.modal').hide()
    $('.mask').fadeOut(300)
}

// 提示信息框
function layer_msg(content, style, time) {
    style = style ? style : 'bottom:0' // 框架中是在底部，这里设置成默认显示在中间
    time = time ? time : 2
    content = content ? content : '未知错误'
    return layer.open({
        content: content,
        skin: 'msg',
        time: time,
        style: style
    })
}

// loading框
function layer_load(content) {
    content = content || ''
    return layer.open({
        type: 2,
        content: content
    })
}

// 询问框
function layer_confirm(content, shadeClose, yes, no) {
    shadeClose = (shadeClose == false) ? false : true;
    layer.open({
        content: content || '提示信息...',
        shadeClose: shadeClose,
        btn: ['是', '否'],
        yes: yes,
        no: no
    })
}

// 询问框
function layer_message(content, callback) {
    layer.open({
        content: content,
        btn: '确定',
        yes: function(index) {
            if (callback) callback()
            layer.close(index)
        }
    });
}

// 判断手机或者电话号码格式
function checkMobileAndTel(value) {
    return /^1(3|4|5|7|8|9)\d{9}$/.test(value)
}

// 判断身份证格式是否正确
function checkIdCode(value) {
    var value = $.trim(value)
    var userCardreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    var taiwanreg = /^[A-Z][0-9]{9}$/ // 台湾
    var xianggangreg = /^[A-Z][0-9]{6}\([0-9A]\)$/ // 香港
    var aomenreg = /^[157][0-9]{6}\([0-9]\)$/ // 澳门
    // return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
    return (userCardreg.test(value) || taiwanreg.test(value) || xianggangreg.test(value) || aomenreg.test(value))
}

// 判断是否为空
function isNull(value) {
    if ($.trim(value).length) {
        return false
    } else {
        return true
    }
}

// 存储数据
function setStorage(name, content) {
    localStorage.setItem(name, content)
}

// 获取存储数据
function getStorage(name) {
    return localStorage.getItem(name)
}

// 清除存储数据
function removeStorage(name) {
    return localStorage.removeItem(name)
}

// 日期格式化
function format(time, ff) {
    time = new Date(time)
    var year = time.getFullYear()
    var month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
    var date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    var hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    var minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    var second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
    if (ff == 'Y-m-d') {
        return year + '-' + month + '-' + date
    } else if (ff == 'Y-m-d H:i:s') {
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    } else if (ff == 'Y-m-d H:i') {
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
    } else if (ff == 'Y.m.d') {
        return year + '.' + month + '.' + date
    } else if (ff == 'Y.m.d H:i:s') {
        return year + '.' + month + '.' + date + ' ' + hour + ':' + minute + ':' + second
    } else if (ff == 'Y.m.d H:i') {
        return year + '.' + month + '.' + date + ' ' + hour + ':' + minute
    }
}

// 转时间戳
function turnTimestamp(timestamp, ff) {
    var time = new Date()
    time.setTime(timestamp)
    return format(time, ff)
}

function getObjectURL(file) {
    var url = null
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}

// 获取url参数
function getUrlParam(name, explode, url) {
    var param = window.location.search.substr(1)
    if (url) {
        if (explode) {
            param = url.substr(url.indexOf(explode) + 1)
        } else {
            param = url.substr(url.indexOf('?') + 1)
        }
    } else {
        if (explode) {
            param = window.location.href.substr(window.location.href.indexOf(explode) + 1)
        }
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    var r = param.match(reg)
    if (r != null) return unescape(r[2])
    return ''
}

// ajax请求
function request(url, data, callback, async, type) {
    data.token = getStorage('token') || getStorage('token_seller')
    $.ajax({
        type: type ? type : 'post',
        url: dlcUrl + url,
        data: data,
        dataType: 'json',
        async: (async == false) ? false : true,
        success: function(res) {
            callback(res)
        },
        error: function(err) {
            console.log(JSON.stringify(err))
        }
    })
}

// 获取token
function getToken() {
    if (!getStorage('token')) {
        if (getUrlParam('code')) {
            request(
                '', {
                    HTTP_API: 'vv/usercenter/api/user/third',
                    code: getUrlParam('code'),
                    platform: 'wechat'
                },
                function(res) {
                    console.log('获取token', res)
                    if (res.code == 1) {
                        removeStorage('token_seller')
                        setStorage('openid', res.data.thirdinfo.openid)
                        setStorage('token', res.data.userinfo.token)
                        setStorage('isworker', res.data.userinfo.isWorker)
                    } else {
                        console.log(res.msg)
                    }
                    isBindMobile()
                    if (!getStorage('is_bind') && !(new RegExp('bind_mobile').test(window.location.href))) {
                        window.location.href = 'h_bind_mobile.html'
                    } else {
                        $('body').show()
                    }
                }, false)
        } else {
            window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0a7383715dca7cd5&redirect_uri=' + window.location.href + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect')
        }
    } else {
        isBindMobile()
        if (!getStorage('is_bind') && !(new RegExp('bind_mobile').test(window.location.href))) {
            window.location.href = 'h_bind_mobile.html'
        } else {
            $('body').show()
        }
    }
}

// 获取商家端token
function getTokenSeller() {
    if (!getStorage('token_seller') && !(new RegExp('login').test(window.location.href))) {
        window.location.href = 'h_login.html'
    } else {
        $('#container').show()
    }
}

//判断是否绑定手机
function isBindMobile() {
    if (!getStorage('is_bind')) {
        request(
            '', {
                HTTP_API: 'vv/usercenter/api/user/checkIsbangMobile'
            },
            function(res) {
                console.log('是否绑定手机', res)
                if (res.code == 1) {
                    if (res.data) {
                        setStorage('is_bind', true)
                    } else {
                        setStorage('is_bind', false)
                    }
                } else {
                    console.log(res.msg)
                }
            }, false)
    }
}

// 判断浏览器userAgent
function isIos() {
    var ua = navigator.userAgent.toLowerCase()
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1)
    return isIos
}

// 表单验证
function checkForm(fromid, filter) {
    var options = {
        formId: fromid
    }
    var form = new JForm(options)
    if (!form.checkFormData()) {
        return false
    }
    return true
}

// 表单提交
function formSubmit(formid, url, gourl, step) {
    if (onoff_form) return false
    onoff_form = 1

    var l
    if ($('#' + formid + ' .token').length > 0) {
        $('#' + formid + ' .token').val(getStorage('token') || getStorage('token_seller'))
    }
    $('#' + formid).ajaxSubmit({
        type: 'post',
        url: dlcUrl + (url ? url : ''),
        dataType: 'json',
        beforeSubmit: function() {
            if (!checkForm(formid)) {
                onoff_form = 0
                return false
            }
            l = layer_load('提交中...')
        },
        success: function(res) {
            layer.close(l)
            onoff_form = 0
            if (res.code == 1) {
                layer_msg('操作成功')
                if (formid == 'login') {
                    removeStorage('token')
                    setStorage('token_seller', res.data.token)
                }
                setTimeout(function() {
                    if (step) {
                        history.go(step);
                    } else {
                        if (gourl) {
                            window.location.replace(gourl)
                        } else {
                            window.location.reload()
                        }
                    }
                }, 1500)
            } else {
                layer_msg(res.msg)
            }
        },
        error: function(err) {
            console.log(JSON.stringify(err))
        }
    })
}

// 获取手机验证码
function getCode() {
    var l
    var mobile = $('#mobile').val()
    $.ajax({
        type: 'post',
        url: dlcUrl,
        data: {
            HTTP_API: 'vv/sms/api/index/send',
            mobile: mobile,
            event: 'changemobile',
            token: getStorage('token') || getStorage('token_seller')
        },
        dataType: 'json',
        beforeSend: function() {
            if (isNull(mobile)) {
                layer_msg('请输入您的手机号码')
                return false
            } else if (!checkMobileAndTel(mobile)) {
                layer_msg('您的手机号码格式有误')
                return false
            }
            l = layer_load('发送中...')
        },
        success: function(res) {
            layer.close(l)
            if (res.code == 1) {
                layer_msg('发送成功')
                var num = 60
                $('#code_btn').html(num + 's').prop('disabled', true)
                var timer = setInterval(function() {
                    num--
                    $('#code_btn').html(num + 's')
                    if (num == 0) {
                        clearInterval(timer)
                        $('#code_btn').html("重新发送").prop('disabled', false)
                    }
                }, 1000)
            } else {
                layer_msg(res.msg)
            }
        },
        error: function(err) {
            layer_msg(JSON.stringify(err))
        }
    })
}

// getTicket
function getTicket() {
    request(
        '', {
            HTTP_API: 'vv/usercenter/api/user/thirdticket',
            platform: 'wechat'
        },
        function(res) {
            if (res.code == 1) {
                var ticket = res.data.ticket
                var timestamp = (new Date().getTime() / 1000).toFixed(0)
                var nonceStr = Math.random().toString(36).substr(2)
                var tickets = wx_js(res.data.ticket, timestamp, nonceStr)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端//alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx0a7383715dca7cd5', // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: tickets, // 必填，签名，见附录1
                    jsApiList: ['checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })
            }
        },
        false
    )
}

function wx_js(signature, timestamp, nonceStr) {
    var e = decodeURIComponent('jsapi_ticket=' + signature + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + location.href.split('#')[0]),
        s = new jsSHA(e, 'TEXT'),
        signature = s.getHash('SHA-1', 'HEX')
    return signature
}

// 调用微信JS api 支付
var jsApiParameters = {}

function jsApiCall(url) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        jsApiParameters, // 提交的支付信息
        function(res) {
            // alert(JSON.stringify(res))
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
                layer_msg('支付成功')
                if (url) {
                    window.location.replace(url)
                }
            } else {
                layer_msg('取消支付')
            }
        }
    )
}

// 调用微信支付
function callpay(url) {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false)
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', jsApiCall)
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall)
        }
    } else {
        jsApiCall(url)
    }
}

// 去掉alert上面的服务器地址
window.alert = function(name) {
    var iframe = document.createElement("IFRAME")
    iframe.style.display = "none"
    iframe.setAttribute("src", 'data:text/plain,')
    document.documentElement.appendChild(iframe)
    window.frames[0].window.alert(name)
    iframe.parentNode.removeChild(iframe)
}

// 去掉confirm上面的服务器地址
window.confirm = function(message) {
    var iframe = document.createElement("IFRAME")
    iframe.style.display = "none"
    iframe.setAttribute("src", 'data:text/plain,')
    document.documentElement.appendChild(iframe)
    var alertFrame = window.frames[0]
    var result = alertFrame.window.confirm(message)
    iframe.parentNode.removeChild(iframe)
    return result
}

// 长按事件
$.fn.longPress = function(fn) {
    var timeout = undefined
    var $this = this
    for (var i = 0; i < $this.length; i++) {
        $this[i].addEventListener('touchstart', function(event) {
            timeout = setTimeout(fn, 800) //长按时间超过800ms，则执行传入的方法
        }, false)
        $this[i].addEventListener('touchend', function(event) {
            clearTimeout(timeout) //长按时间少于800ms，不会执行传入的方法
        }, false)
    }
}

// iphone返回刷新
function addEventback(url) {
    pushHistory()
    var bool = false
    setTimeout(function() {
        bool = true
    }, 500)
    window.addEventListener("popstate", function(e) {
        console.log(bool)
        if (bool) {
            // alert("我监听到了浏览器的返回按钮事件啦")//根据自己的需求实现自己的功能     
            window.location.href = url
            // WeixinJSBridge.call('closeWindow')
        }
        // pushHistory()
    }, false)
}

function pushHistory() {
    var state = {
        title: "",
        url: "#"
    }
    window.history.replaceState(state, "", "#")
}

// 飞入购物车
function shoppingCartAnimate(obj, car) {
    var fly_elm = $(obj).closest('li').clone()
    var good_item = $(obj).closest('li').find('.good-pic')
    $('body').append(fly_elm)
    fly_elm.css({
        'z-index': 9000,
        'display': 'block',
        'position': 'absolute',
        'top': good_item.offset().top + 'px',
        'left': good_item.offset().left + 'px',
        'width': good_item.width() + 'px',
        'height': good_item.height() + 'px'
    })
    fly_elm.animate({
        top: $(car).offset().top,
        left: $(car).offset().left,
        width: 10,
        height: 10
    }, 'slow', function() {
        fly_elm.remove()
    })
}