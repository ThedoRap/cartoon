

function topbarUserBind() {
    var e = $(".user-container"), t = $(".logined", e), n = $(".info", t), o = $(".concern", e),
        i = $(".collect-popup-container");
    $collect_popup = $(".collect-popup", i), $logined_user = $(".user-info", $collect_popup), $logined_author = $(".author-info", $collect_popup), $logined_concern = $(".concern", $collect_popup), $unlogined = $(".unlogined", $collect_popup), is_author = t.hasClass("author") ? 1 : 0, o.mouseenter(function () {
        $(this).addClass("mouse-hover"), $(this).hasClass("have-login") ? $logined_concern.hasClass("hide") && $logined_concern.removeClass("hide") : $unlogined.hasClass("hide") && $unlogined.removeClass("hide"), $collect_popup.removeClass("hide")
    }), o.mouseleave(function (e) {
        if ($(e.currentTarget).hasClass("have-login")) {
            if ($(e.relatedTarget).closest(".txt").length > 0 || $(e.relatedTarget).closest(".collect-popup").length > 0) return;
            $(this).removeClass("mouse-hover"), $logined_concern.hasClass("hide") || $logined_concern.addClass("hide"), $collect_popup.addClass("hide")
        } else {
            if ($(e.relatedTarget).hasClass("unlogined")) return;
            $(this).removeClass("mouse-hover"), $unlogined.hasClass("hide") || $unlogined.addClass("hide"), $collect_popup.addClass("hide")
        }
    }), n.mouseenter(function () {
        $(this).addClass("mouse-hover"), is_author ? $logined_author.hasClass("hide") && $logined_author.removeClass("hide") : $logined_user.hasClass("hide") && $logined_user.removeClass("hide"), $collect_popup.removeClass("hide")
    }), n.mouseleave(function (e) {
        $(e.relatedTarget).hasClass("user-info") || $(e.relatedTarget).hasClass("author-info") || ($(this).removeClass("mouse-hover"), is_author ? $logined_author.hasClass("hide") || $logined_author.addClass("hide") : $logined_user.hasClass("hide") || $logined_user.addClass("hide"), $collect_popup.addClass("hide"))
    }), $collect_popup.mouseleave(function (e) {
        if ($(e.target).closest(".user-info").length > 0 || $(e.target).closest(".author-info").length > 0) {
            if ($(e.relatedTarget).hasClass("info")) return;
            n.removeClass("mouse-hover"), is_author ? $logined_author.hasClass("hide") || $logined_author.addClass("hide") : $logined_user.hasClass("hide") || $logined_user.addClass("hide"), $collect_popup.addClass("hide")
        } else if ($(e.target).closest(".concern").length > 0) {
            if ($(e.relatedTarget).hasClass("concern")) return;
            o.removeClass("mouse-hover"), o.hasClass("have-login") ? $logined_concern.hasClass("hide") || $logined_concern.addClass("hide") : $unlogined.hasClass("hide") || $unlogined.addClass("hide"), $collect_popup.addClass("hide")
        } else if ($(e.target).closest(".unlogined").length > 0) {
            if ($(e.relatedTarget).hasClass("concern")) return;
            o.removeClass("mouse-hover"), $unlogined.hasClass("hide") || $unlogined.addClass("hide"), $collect_popup.addClass("hide")
        }
    }), t.length > 0 && initCollect(), $("#head-logout").on("click", function () {
        $.ajax({url: "/v1/passport/login/pc/user_log_out", type: "post", data: {}}).done(function (e) {
            200 == e.code && window.location.reload()
        }).fail(function () {
        })
    })
}

function wrapScrollHandler() {
    var e = $(".collect-popup .logined .concern").data("page"), t = $(".collect-popup .logined .concern").data("size"),
        n = $(".collect-popup .logined .concern"), o = n.height(), i = $(".collect-popup .logined .concern ul"),
        r = i.height(), a = n.scrollTop();
    20 > r - o - a && (e++, $(".collect-popup .logined .concern").data("page", e), _ajaxCollect(e, t))
}

function _ajaxCollect(e, t) {
    var n, o, i = "/web/fav/topics", r = {page: e, size: t}, a = this, s = $(".collect-popup .logined .concern");
    s.off("scroll", $.proxy(a.wrapScrollHandler, a));
    var l = ["<li>", '<a href="${topic.link}" target="_blank">', '<div class="pic"><img src="${topic.cover_image_url}"></div>', '<div class="txt">', "<div>", "<h2>${topic.title}</h2>", '<p class="author">${topic.user.nickname}</p>', '<p class="updateto">更新至：${topic.latest_comic_title}</p>', "</div>", "</div>", "</a>", "</li>"].join("");
    n = function () {
        $(".collect-popup .logined .concern").isLoading({text: "Loading", position: "overlay"})
    }, fnSuccess = function (e) {
        var e = e.data.topics, t = $(".collect-popup .logined .concern"), n = t.children("ul");
        if (e && e.length > 0) {
            for (var o, i = [], r = 0; r < e.length; r++) {
                var s = l;
                s = s.replace(/\$\{topic.cover_image_url\}/, e[r].cover_image_url || ""), s = s.replace(/\$\{topic.title\}/, e[r].title || ""), s = s.replace(/\$\{topic.user.nickname\}/, e[r].user.nickname || ""), s = s.replace(/\$\{topic.latest_comic_title\}/, e[r].latest_comic_title || ""), o = "/web/topic/" + e[r].id, s = s.replace(/\$\{topic.link\}/g, o || ""), i.push(s)
            }
            i = i.join(""), n.append(i), contentH = n.height(), t.on("scroll", $.proxy(a.wrapScrollHandler, a))
        } else {
            var c = $('<div class="message">到底了，没有新内容～</div>');
            c.css({color: "#fff", textAlign: "center", padding: "12px"});
            var u = $(".collect-popup .concern");
            0 == u.find(".message").length && u.append(c), setTimeout(function () {
                c.remove()
            }, 2e3)
        }
    }, fnComplete = function () {
        $(".collect-popup .logined .concern").isLoading("hide")
    }, fnError = function () {
    }, o = {
        url: i,
        type: "GET",
        dataType: "json",
        data: r,
        beforeSend: n,
        success: fnSuccess,
        complete: fnComplete,
        error: fnError
    }, $.ajax(o)
}

function lazyloadBind() {
    $("img.kklazy").lazyload({
        threshold: "1000",
        data_attribute: "kksrc",
        vertical_only: !0,
        minimum_interval: "300",
        effect: "fadeIn",
        effect_params: "200",
        placeholder_data_img: "",
        placeholder_real_img: ""
    })
}

function tipShow(e, t) {
    var n = $(".tipshow");
    t ? n.children(".error").hide().siblings("i").show() : n.children(".right").hide().siblings("i").show(), n.children("p").text(e), n.show(), setTimeout(function () {
        n.fadeOut()
    }, 1e3)
}

function fixbtnsBind() {
    var e = $("body"), t = $("#footer"), n = t.length > 0 ? !0 : !1, o = $("#sidebar"), i = $(".full", o),
        r = $(".backtop", o), a = $(".switch-light", o), s = $(".recommend-box"), l = $(".download-app", o),
        c = l.find(".ewm"), u = $(window).height(), d = $(document).scrollTop(), f = t.find(".intro .weixin"),
        p = t.find(".intro .wei-code");
    f.on("mouseenter", function () {
        p.show().stop(!0, !0).animate({opacity: 1}, 500)
    }), f.on("mouseleave", function () {
        p.stop(!0, !0).fadeOut().animate({opacity: 0})
    }), sessionStorage.getItem("turnoff") && $(".switch-light").length > 0 && (e.addClass("turn_off"), $(".switch-light").addClass("on"), s.find(".r-item-title").addClass("title-dark"), s.find("li").addClass("li-dark"), s.find(".hdtitle").addClass("title-dark").css({"border-bottom": "1px solid #666"})), n && (t.offset().top - d < u ? o.addClass("onbottom") : d > u ? o.show() : o.hide()), $(window).on({
        scroll: function () {
            d = $(document).scrollTop(), d > u ? o.show() : o.hide(), n && (t.offset().top - d < u ? o.addClass("onbottom") : o.removeClass("onbottom"))
        }
    }), i.on("click", function () {
        var e = document.documentElement;
        e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen ? e.webkitRequestFullScreen() : elem.msRequestFullscreen && elem.msRequestFullscreen()
    }), r.on("click", function () {
        $("html,body").animate({scrollTop: 0}, 300)
    }), a.on("click", function () {
        e.toggleClass("turn_off"), e.hasClass("turn_off") ? (sessionStorage.setItem("turnoff", "1"), a.addClass("on"), s.find(".r-item-title").addClass("title-dark"), s.find(".hdtitle").addClass("title-dark").css({"border-bottom": "1px solid #666"}), s.find("li").addClass("li-dark")) : (sessionStorage.removeItem("turnoff"), a.removeClass("on"), s.find(".r-item-title").removeClass("title-dark"), s.find(".hdtitle").removeClass("title-dark").css({"border-bottom": "0"}), s.find("li").removeClass("li-dark"))
    }), l.on("mouseenter", function () {
        c.show().stop(!0, !0).animate({left: "-146px", opacity: 1})
    }), l.on("mouseleave", function () {
        l.hasClass("on") || c.stop(!0, !0).fadeOut().animate({left: "0", opacity: 0})
    }), l.on("click", function () {
        l.toggleClass("on"), l.hasClass("on") ? c.show().css({left: "-146px", opacity: 1}) : c.hide().css({
            left: "0",
            opacity: 0
        })
    })
}

function payComicBind() {
    $(".btn_lock").on("click", function (e) {
        e.preventDefault(), $(".cover-popuppay").css("opacity", 1), $(".cover-popuppay").show()
    }), $(".cover-popuppay .btn-close").on("click", function () {
        $(".cover-popuppay").hide()
    })
}

function recommendCoverBind() {
    $(".l-item").hover(function () {
        $(this).find(".l-item-cover").removeClass("hidden").addClass("show")
    }, function () {
        $(this).find(".l-item-cover").removeClass("show").addClass("hidden")
    })
}

function recommendLikesBind() {
    $(".show-tip").hover(function () {
        $(this).find(".tip").removeClass("hidden").addClass("show")
    }, function () {
        $(this).find(".tip").removeClass("show").addClass("hidden")
    })
}

function introLikesBind() {
    $(".hot-num, .praise-num, .comment-num").hover(function () {
        $(this).closest("li").find(".tip").removeClass("hidden").addClass("show")
    }, function () {
        $(this).closest("li").find(".tip").removeClass("show").addClass("hidden")
    })
}

function shieldBind() {
    $(".shield-close").on("click", function () {
        $(".shield-cover").hide(), window.location.href = "/"
    })
}

function Chapterbox() {
    var e = ($("body"), $(".list")), t = $("#chapter-box"), n = $(".chapter-switch", t),
        o = $(".chapter-list", t).find("ul");
    o.children().length < 3 && t.remove();
    var i = t.length > 0 ? !0 : !1;
    if (i) {
        t.show();
        var r = $(document).scrollTop(), a = e.offset().top, s = $(window).height();
        t.height(s);
        var l = e.parent(".wrapper"), c = l.offset().top, u = l.height();
        a > r ? t.addClass("ontop").removeClass("onbottom") : s > c + u - r && (t.addClass("onbottom").removeClass("ontop"), t.css("top", c + l.height() + 24 - t.height())), $(window).on({
            scroll: function () {
                r = $(document).scrollTop(), u = l.height(), a > r ? t.addClass("ontop").removeClass("onbottom") : s > c + u - r ? (t.addClass("onbottom").removeClass("ontop"), t.css("top", l.offset().top + u + 24 - t.height())) : (t.removeClass("ontop"), t.removeClass("onbottom"), t.css("top", 0))
            }, click: function (e) {
                var o = $(e.target);
                0 == o.closest(n).length && 0 == o.closest(n.siblings()).length && t.addClass("off")
            }
        });
        var d = o.children().length;
        n.on("click", function () {
            t.toggleClass("off"), 40 * d + 16 > o.parent().height() && o.addClass("scroll")
        })
    }
}

function changeTime(e) {
    var e = 10 == e.toString().length ? e + "000" : e, t = new Date, e = new Date(parseInt(e)),
        n = t.getTime() - e.getTime();
    n = Math.floor(n / 1e3);
    var o = "", i = parseInt(e.getMonth()) + 1;
    i = 10 > i ? "0" + i : i;
    var r = e.getDate();
    return r = 10 > r ? "0" + r : r, o = n >= 0 && 60 > n ? "刚刚" : n >= 60 && 3600 > n ? parseInt(n / 60) + "分钟前" : n >= 3600 && 86400 > n ? parseInt(n / 60 / 60) + "小时前" : n >= 86400 && 2592e3 > n ? parseInt(n / 60 / 60 / 24) + "天前" : e.getFullYear() + "." + i + "." + r
}

!function (e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    "use strict";

    function n(e, t) {
        t = t || tt;
        var n = t.createElement("script");
        n.text = e, t.head.appendChild(n).parentNode.removeChild(n)
    }

    function o(e) {
        var t = !!e && "length" in e && e.length, n = ht.type(e);
        return "function" !== n && !ht.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function i(e, t, n) {
        return ht.isFunction(t) ? ht.grep(e, function (e, o) {
            return !!t.call(e, o, e) !== n
        }) : t.nodeType ? ht.grep(e, function (e) {
            return e === t !== n
        }) : "string" != typeof t ? ht.grep(e, function (e) {
            return at.call(t, e) > -1 !== n
        }) : $t.test(t) ? ht.filter(t, e, n) : (t = ht.filter(t, e), ht.grep(e, function (e) {
            return at.call(t, e) > -1 !== n && 1 === e.nodeType
        }))
    }

    function r(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType;) ;
        return e
    }

    function a(e) {
        var t = {};
        return ht.each(e.match(_t) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function s(e) {
        return e
    }

    function l(e) {
        throw e
    }

    function c(e, t, n) {
        var o;
        try {
            e && ht.isFunction(o = e.promise) ? o.call(e).done(t).fail(n) : e && ht.isFunction(o = e.then) ? o.call(e, t, n) : t.call(void 0, e)
        } catch (e) {
            n.call(void 0, e)
        }
    }

    function u() {
        tt.removeEventListener("DOMContentLoaded", u), e.removeEventListener("load", u), ht.ready()
    }

    function d() {
        this.expando = ht.expando + d.uid++
    }

    function f(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Ot.test(e) ? JSON.parse(e) : e)
    }

    function p(e, t, n) {
        var o;
        if (void 0 === n && 1 === e.nodeType) if (o = "data-" + t.replace(Rt, "-$&").toLowerCase(), n = e.getAttribute(o), "string" == typeof n) {
            try {
                n = f(n)
            } catch (i) {
            }
            Ft.set(e, t, n)
        } else n = void 0;
        return n
    }

    function h(e, t, n, o) {
        var i, r = 1, a = 20, s = o ? function () {
                return o.cur()
            } : function () {
                return ht.css(e, t, "")
            }, l = s(), c = n && n[3] || (ht.cssNumber[t] ? "" : "px"),
            u = (ht.cssNumber[t] || "px" !== c && +l) && Pt.exec(ht.css(e, t));
        if (u && u[3] !== c) {
            c = c || u[3], n = n || [], u = +l || 1;
            do r = r || ".5", u /= r, ht.style(e, t, u + c); while (r !== (r = s() / l) && 1 !== r && --a)
        }
        return n && (u = +u || +l || 0, i = n[1] ? u + (n[1] + 1) * n[2] : +n[2], o && (o.unit = c, o.start = u, o.end = i)), i
    }

    function g(e) {
        var t, n = e.ownerDocument, o = e.nodeName, i = zt[o];
        return i ? i : (t = n.body.appendChild(n.createElement(o)), i = ht.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), zt[o] = i, i)
    }

    function m(e, t) {
        for (var n, o, i = [], r = 0, a = e.length; a > r; r++) o = e[r], o.style && (n = o.style.display, t ? ("none" === n && (i[r] = Ht.get(o, "display") || null, i[r] || (o.style.display = "")), "" === o.style.display && Mt(o) && (i[r] = g(o))) : "none" !== n && (i[r] = "none", Ht.set(o, "display", n)));
        for (r = 0; a > r; r++) null != i[r] && (e[r].style.display = i[r]);
        return e
    }

    function v(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && ht.nodeName(e, t) ? ht.merge([e], n) : n
    }

    function y(e, t) {
        for (var n = 0, o = e.length; o > n; n++) Ht.set(e[n], "globalEval", !t || Ht.get(t[n], "globalEval"))
    }

    function b(e, t, n, o, i) {
        for (var r, a, s, l, c, u, d = t.createDocumentFragment(), f = [], p = 0, h = e.length; h > p; p++) if (r = e[p], r || 0 === r) if ("object" === ht.type(r)) ht.merge(f, r.nodeType ? [r] : r); else if (Qt.test(r)) {
            for (a = a || d.appendChild(t.createElement("div")), s = (Xt.exec(r) || ["", ""])[1].toLowerCase(), l = Gt[s] || Gt._default, a.innerHTML = l[1] + ht.htmlPrefilter(r) + l[2], u = l[0]; u--;) a = a.lastChild;
            ht.merge(f, a.childNodes), a = d.firstChild, a.textContent = ""
        } else f.push(t.createTextNode(r));
        for (d.textContent = "", p = 0; r = f[p++];) if (o && ht.inArray(r, o) > -1) i && i.push(r); else if (c = ht.contains(r.ownerDocument, r), a = v(d.appendChild(r), "script"), c && y(a), n) for (u = 0; r = a[u++];) Vt.test(r.type || "") && n.push(r);
        return d
    }

    function x() {
        return !0
    }

    function w() {
        return !1
    }

    function C() {
        try {
            return tt.activeElement
        } catch (e) {
        }
    }

    function T(e, t, n, o, i, r) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (o = o || n, n = void 0);
            for (s in t) T(e, s, n, o, t[s], r);
            return e
        }
        if (null == o && null == i ? (i = n, o = n = void 0) : null == i && ("string" == typeof n ? (i = o, o = void 0) : (i = o, o = n, n = void 0)), i === !1) i = w; else if (!i) return e;
        return 1 === r && (a = i, i = function (e) {
            return ht().off(e), a.apply(this, arguments)
        }, i.guid = a.guid || (a.guid = ht.guid++)), e.each(function () {
            ht.event.add(this, t, i, o, n)
        })
    }

    function $(e, t) {
        return ht.nodeName(e, "table") && ht.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e : e
    }

    function k(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function S(e) {
        var t = on.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function E(e, t) {
        var n, o, i, r, a, s, l, c;
        if (1 === t.nodeType) {
            if (Ht.hasData(e) && (r = Ht.access(e), a = Ht.set(t, r), c = r.events)) {
                delete a.handle, a.events = {};
                for (i in c) for (n = 0, o = c[i].length; o > n; n++) ht.event.add(t, i, c[i][n])
            }
            Ft.hasData(e) && (s = Ft.access(e), l = ht.extend({}, s), Ft.set(t, l))
        }
    }

    function j(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Ut.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function N(e, t, o, i) {
        t = it.apply([], t);
        var r, a, s, l, c, u, d = 0, f = e.length, p = f - 1, h = t[0], g = ht.isFunction(h);
        if (g || f > 1 && "string" == typeof h && !ft.checkClone && nn.test(h)) return e.each(function (n) {
            var r = e.eq(n);
            g && (t[0] = h.call(this, n, r.html())), N(r, t, o, i)
        });
        if (f && (r = b(t, e[0].ownerDocument, !1, e, i), a = r.firstChild, 1 === r.childNodes.length && (r = a), a || i)) {
            for (s = ht.map(v(r, "script"), k), l = s.length; f > d; d++) c = r, d !== p && (c = ht.clone(c, !0, !0), l && ht.merge(s, v(c, "script"))), o.call(e[d], c, d);
            if (l) for (u = s[s.length - 1].ownerDocument, ht.map(s, S), d = 0; l > d; d++) c = s[d], Vt.test(c.type || "") && !Ht.access(c, "globalEval") && ht.contains(u, c) && (c.src ? ht._evalUrl && ht._evalUrl(c.src) : n(c.textContent.replace(rn, ""), u))
        }
        return e
    }

    function _(e, t, n) {
        for (var o, i = t ? ht.filter(t, e) : e, r = 0; null != (o = i[r]); r++) n || 1 !== o.nodeType || ht.cleanData(v(o)), o.parentNode && (n && ht.contains(o.ownerDocument, o) && y(v(o, "script")), o.parentNode.removeChild(o));
        return e
    }

    function D(e, t, n) {
        var o, i, r, a, s = e.style;
        return n = n || ln(e), n && (a = n.getPropertyValue(t) || n[t], "" !== a || ht.contains(e.ownerDocument, e) || (a = ht.style(e, t)), !ft.pixelMarginRight() && sn.test(a) && an.test(t) && (o = s.width, i = s.minWidth, r = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = o, s.minWidth = i, s.maxWidth = r)), void 0 !== a ? a + "" : a
    }

    function q(e, t) {
        return {
            get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function A(e) {
        if (e in pn) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = fn.length; n--;) if (e = fn[n] + t, e in pn) return e
    }

    function L(e, t, n) {
        var o = Pt.exec(t);
        return o ? Math.max(0, o[2] - (n || 0)) + (o[3] || "px") : t
    }

    function H(e, t, n, o, i) {
        var r, a = 0;
        for (r = n === (o ? "border" : "content") ? 4 : "width" === t ? 1 : 0; 4 > r; r += 2) "margin" === n && (a += ht.css(e, n + Bt[r], !0, i)), o ? ("content" === n && (a -= ht.css(e, "padding" + Bt[r], !0, i)), "margin" !== n && (a -= ht.css(e, "border" + Bt[r] + "Width", !0, i))) : (a += ht.css(e, "padding" + Bt[r], !0, i), "padding" !== n && (a += ht.css(e, "border" + Bt[r] + "Width", !0, i)));
        return a
    }

    function F(e, t, n) {
        var o, i = !0, r = ln(e), a = "border-box" === ht.css(e, "boxSizing", !1, r);
        if (e.getClientRects().length && (o = e.getBoundingClientRect()[t]), 0 >= o || null == o) {
            if (o = D(e, t, r), (0 > o || null == o) && (o = e.style[t]), sn.test(o)) return o;
            i = a && (ft.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
        }
        return o + H(e, t, n || (a ? "border" : "content"), i, r) + "px"
    }

    function O(e, t, n, o, i) {
        return new O.prototype.init(e, t, n, o, i)
    }

    function R() {
        gn && (e.requestAnimationFrame(R), ht.fx.tick())
    }

    function I() {
        return e.setTimeout(function () {
            hn = void 0
        }), hn = ht.now()
    }

    function P(e, t) {
        var n, o = 0, i = {height: e};
        for (t = t ? 1 : 0; 4 > o; o += 2 - t) n = Bt[o], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function B(e, t, n) {
        for (var o, i = (z.tweeners[t] || []).concat(z.tweeners["*"]), r = 0, a = i.length; a > r; r++) if (o = i[r].call(n, t, e)) return o
    }

    function M(e, t, n) {
        var o, i, r, a, s, l, c, u, d = "width" in t || "height" in t, f = this, p = {}, h = e.style,
            g = e.nodeType && Mt(e), v = Ht.get(e, "fxshow");
        n.queue || (a = ht._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
            a.unqueued || s()
        }), a.unqueued++, f.always(function () {
            f.always(function () {
                a.unqueued--, ht.queue(e, "fx").length || a.empty.fire()
            })
        }));
        for (o in t) if (i = t[o], mn.test(i)) {
            if (delete t[o], r = r || "toggle" === i, i === (g ? "hide" : "show")) {
                if ("show" !== i || !v || void 0 === v[o]) continue;
                g = !0
            }
            p[o] = v && v[o] || ht.style(e, o)
        }
        if (l = !ht.isEmptyObject(t), l || !ht.isEmptyObject(p)) {
            d && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], c = v && v.display, null == c && (c = Ht.get(e, "display")), u = ht.css(e, "display"), "none" === u && (c ? u = c : (m([e], !0), c = e.style.display || c, u = ht.css(e, "display"), m([e]))), ("inline" === u || "inline-block" === u && null != c) && "none" === ht.css(e, "float") && (l || (f.done(function () {
                h.display = c
            }), null == c && (u = h.display, c = "none" === u ? "" : u)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", f.always(function () {
                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
            })), l = !1;
            for (o in p) l || (v ? "hidden" in v && (g = v.hidden) : v = Ht.access(e, "fxshow", {display: c}), r && (v.hidden = !g), g && m([e], !0), f.done(function () {
                g || m([e]), Ht.remove(e, "fxshow");
                for (o in p) ht.style(e, o, p[o])
            })), l = B(g ? v[o] : 0, o, f), o in v || (v[o] = l.start, g && (l.end = l.start, l.start = 0))
        }
    }

    function W(e, t) {
        var n, o, i, r, a;
        for (n in e) if (o = ht.camelCase(n), i = t[o], r = e[n], ht.isArray(r) && (i = r[1], r = e[n] = r[0]), n !== o && (e[o] = r, delete e[n]), a = ht.cssHooks[o], a && "expand" in a) {
            r = a.expand(r), delete e[o];
            for (n in r) n in e || (e[n] = r[n], t[n] = i)
        } else t[o] = i
    }

    function z(e, t, n) {
        var o, i, r = 0, a = z.prefilters.length, s = ht.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (i) return !1;
            for (var t = hn || I(), n = Math.max(0, c.startTime + c.duration - t), o = n / c.duration || 0, r = 1 - o, a = 0, l = c.tweens.length; l > a; a++) c.tweens[a].run(r);
            return s.notifyWith(e, [c, r, n]), 1 > r && l ? n : (s.resolveWith(e, [c]), !1)
        }, c = s.promise({
            elem: e,
            props: ht.extend({}, t),
            opts: ht.extend(!0, {specialEasing: {}, easing: ht.easing._default}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: hn || I(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var o = ht.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                return c.tweens.push(o), o
            },
            stop: function (t) {
                var n = 0, o = t ? c.tweens.length : 0;
                if (i) return this;
                for (i = !0; o > n; n++) c.tweens[n].run(1);
                return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this
            }
        }), u = c.props;
        for (W(u, c.opts.specialEasing); a > r; r++) if (o = z.prefilters[r].call(c, e, u, c.opts)) return ht.isFunction(o.stop) && (ht._queueHooks(c.elem, c.opts.queue).stop = ht.proxy(o.stop, o)), o;
        return ht.map(u, B, c), ht.isFunction(c.opts.start) && c.opts.start.call(e, c), ht.fx.timer(ht.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function U(e) {
        var t = e.match(_t) || [];
        return t.join(" ")
    }

    function X(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function V(e, t, n, o) {
        var i;
        if (ht.isArray(t)) ht.each(t, function (t, i) {
            n || En.test(e) ? o(e, i) : V(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, o)
        }); else if (n || "object" !== ht.type(t)) o(e, t); else for (i in t) V(e + "[" + i + "]", t[i], n, o)
    }

    function G(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var o, i = 0, r = t.toLowerCase().match(_t) || [];
            if (ht.isFunction(n)) for (; o = r[i++];) "+" === o[0] ? (o = o.slice(1) || "*", (e[o] = e[o] || []).unshift(n)) : (e[o] = e[o] || []).push(n)
        }
    }

    function Q(e, t, n, o) {
        function i(s) {
            var l;
            return r[s] = !0, ht.each(e[s] || [], function (e, s) {
                var c = s(t, n, o);
                return "string" != typeof c || a || r[c] ? a ? !(l = c) : void 0 : (t.dataTypes.unshift(c), i(c), !1)
            }), l
        }

        var r = {}, a = e === In;
        return i(t.dataTypes[0]) || !r["*"] && i("*")
    }

    function Y(e, t) {
        var n, o, i = ht.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : o || (o = {}))[n] = t[n]);
        return o && ht.extend(!0, e, o), e
    }

    function J(e, t, n) {
        for (var o, i, r, a, s = e.contents, l = e.dataTypes; "*" === l[0];) l.shift(), void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
        if (o) for (i in s) if (s[i] && s[i].test(o)) {
            l.unshift(i);
            break
        }
        if (l[0] in n) r = l[0]; else {
            for (i in n) {
                if (!l[0] || e.converters[i + " " + l[0]]) {
                    r = i;
                    break
                }
                a || (a = i)
            }
            r = r || a
        }
        return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
    }

    function K(e, t, n, o) {
        var i, r, a, s, l, c = {}, u = e.dataTypes.slice();
        if (u[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
        for (r = u.shift(); r;) if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && o && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift()) if ("*" === r) r = l; else if ("*" !== l && l !== r) {
            if (a = c[l + " " + r] || c["* " + r], !a) for (i in c) if (s = i.split(" "), s[1] === r && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                a === !0 ? a = c[i] : c[i] !== !0 && (r = s[0], u.unshift(s[1]));
                break
            }
            if (a !== !0) if (a && e["throws"]) t = a(t); else try {
                t = a(t)
            } catch (d) {
                return {state: "parsererror", error: a ? d : "No conversion from " + l + " to " + r}
            }
        }
        return {state: "success", data: t}
    }

    function Z(e) {
        return ht.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    var et = [], tt = e.document, nt = Object.getPrototypeOf, ot = et.slice, it = et.concat, rt = et.push,
        at = et.indexOf, st = {}, lt = st.toString, ct = st.hasOwnProperty, ut = ct.toString, dt = ut.call(Object),
        ft = {}, pt = "3.1.1", ht = function (e, t) {
            return new ht.fn.init(e, t)
        }, gt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, mt = /^-ms-/, vt = /-([a-z])/g, yt = function (e, t) {
            return t.toUpperCase()
        };
    ht.fn = ht.prototype = {
        jquery: pt, constructor: ht, length: 0, toArray: function () {
            return ot.call(this)
        }, get: function (e) {
            return null == e ? ot.call(this) : 0 > e ? this[e + this.length] : this[e]
        }, pushStack: function (e) {
            var t = ht.merge(this.constructor(), e);
            return t.prevObject = this, t
        }, each: function (e) {
            return ht.each(this, e)
        }, map: function (e) {
            return this.pushStack(ht.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(ot.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor()
        }, push: rt, sort: et.sort, splice: et.splice
    }, ht.extend = ht.fn.extend = function () {
        var e, t, n, o, i, r, a = arguments[0] || {}, s = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || ht.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++) if (null != (e = arguments[s])) for (t in e) n = a[t], o = e[t], a !== o && (c && o && (ht.isPlainObject(o) || (i = ht.isArray(o))) ? (i ? (i = !1, r = n && ht.isArray(n) ? n : []) : r = n && ht.isPlainObject(n) ? n : {}, a[t] = ht.extend(c, r, o)) : void 0 !== o && (a[t] = o));
        return a
    }, ht.extend({
        expando: "jQuery" + (pt + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === ht.type(e)
        }, isArray: Array.isArray, isWindow: function (e) {
            return null != e && e === e.window
        }, isNumeric: function (e) {
            var t = ht.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        }, isPlainObject: function (e) {
            var t, n;
            return !(!e || "[object Object]" !== lt.call(e) || (t = nt(e)) && (n = ct.call(t, "constructor") && t.constructor, "function" != typeof n || ut.call(n) !== dt))
        }, isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? st[lt.call(e)] || "object" : typeof e
        }, globalEval: function (e) {
            n(e)
        }, camelCase: function (e) {
            return e.replace(mt, "ms-").replace(vt, yt)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t) {
            var n, i = 0;
            if (o(e)) for (n = e.length; n > i && t.call(e[i], i, e[i]) !== !1; i++) ; else for (i in e) if (t.call(e[i], i, e[i]) === !1) break;
            return e
        }, trim: function (e) {
            return null == e ? "" : (e + "").replace(gt, "")
        }, makeArray: function (e, t) {
            var n = t || [];
            return null != e && (o(Object(e)) ? ht.merge(n, "string" == typeof e ? [e] : e) : rt.call(n, e)), n
        }, inArray: function (e, t, n) {
            return null == t ? -1 : at.call(t, e, n)
        }, merge: function (e, t) {
            for (var n = +t.length, o = 0, i = e.length; n > o; o++) e[i++] = t[o];
            return e.length = i, e
        }, grep: function (e, t, n) {
            for (var o, i = [], r = 0, a = e.length, s = !n; a > r; r++) o = !t(e[r], r), o !== s && i.push(e[r]);
            return i
        }, map: function (e, t, n) {
            var i, r, a = 0, s = [];
            if (o(e)) for (i = e.length; i > a; a++) r = t(e[a], a, n), null != r && s.push(r); else for (a in e) r = t(e[a], a, n), null != r && s.push(r);
            return it.apply([], s)
        }, guid: 1, proxy: function (e, t) {
            var n, o, i;
            return "string" == typeof t && (n = e[t], t = e, e = n), ht.isFunction(e) ? (o = ot.call(arguments, 2), i = function () {
                return e.apply(t || this, o.concat(ot.call(arguments)))
            }, i.guid = e.guid = e.guid || ht.guid++, i) : void 0
        }, now: Date.now, support: ft
    }), "function" == typeof Symbol && (ht.fn[Symbol.iterator] = et[Symbol.iterator]), ht.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        st["[object " + t + "]"] = t.toLowerCase()
    });
    var bt = function (e) {
        function t(e, t, n, o) {
            var i, r, a, s, l, c, u, f = t && t.ownerDocument, h = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
            if (!o && ((t ? t.ownerDocument || t : B) !== A && q(t), t = t || A, H)) {
                if (11 !== h && (l = vt.exec(e))) if (i = l[1]) {
                    if (9 === h) {
                        if (!(a = t.getElementById(i))) return n;
                        if (a.id === i) return n.push(a), n
                    } else if (f && (a = f.getElementById(i)) && I(t, a) && a.id === i) return n.push(a), n
                } else {
                    if (l[2]) return K.apply(n, t.getElementsByTagName(e)), n;
                    if ((i = l[3]) && C.getElementsByClassName && t.getElementsByClassName) return K.apply(n, t.getElementsByClassName(i)), n
                }
                if (!(!C.qsa || X[e + " "] || F && F.test(e))) {
                    if (1 !== h) f = t, u = e; else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(wt, Ct) : t.setAttribute("id", s = P), c = S(e), r = c.length; r--;) c[r] = "#" + s + " " + p(c[r]);
                        u = c.join(","), f = yt.test(e) && d(t.parentNode) || t
                    }
                    if (u) try {
                        return K.apply(n, f.querySelectorAll(u)), n
                    } catch (g) {
                    } finally {
                        s === P && t.removeAttribute("id")
                    }
                }
            }
            return j(e.replace(st, "$1"), t, n, o)
        }

        function n() {
            function e(n, o) {
                return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = o
            }

            var t = [];
            return e
        }

        function o(e) {
            return e[P] = !0, e
        }

        function i(e) {
            var t = A.createElement("fieldset");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function r(e, t) {
            for (var n = e.split("|"), o = n.length; o--;) T.attrHandle[n[o]] = t
        }

        function a(e, t) {
            var n = t && e, o = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (o) return o;
            if (n) for (; n = n.nextSibling;) if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function c(e) {
            return function (t) {
                return "form" in t ? t.parentNode && t.disabled === !1 ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && $t(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function u(e) {
            return o(function (t) {
                return t = +t, o(function (n, o) {
                    for (var i, r = e([], n.length, t), a = r.length; a--;) n[i = r[a]] && (n[i] = !(o[i] = n[i]))
                })
            })
        }

        function d(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function f() {
        }

        function p(e) {
            for (var t = 0, n = e.length, o = ""; n > t; t++) o += e[t].value;
            return o
        }

        function h(e, t, n) {
            var o = t.dir, i = t.next, r = i || o, a = n && "parentNode" === r, s = W++;
            return t.first ? function (t, n, i) {
                for (; t = t[o];) if (1 === t.nodeType || a) return e(t, n, i);
                return !1
            } : function (t, n, l) {
                var c, u, d, f = [M, s];
                if (l) {
                    for (; t = t[o];) if ((1 === t.nodeType || a) && e(t, n, l)) return !0
                } else for (; t = t[o];) if (1 === t.nodeType || a) if (d = t[P] || (t[P] = {}), u = d[t.uniqueID] || (d[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[o] || t; else {
                    if ((c = u[r]) && c[0] === M && c[1] === s) return f[2] = c[2];
                    if (u[r] = f, f[2] = e(t, n, l)) return !0
                }
                return !1
            }
        }

        function g(e) {
            return e.length > 1 ? function (t, n, o) {
                for (var i = e.length; i--;) if (!e[i](t, n, o)) return !1;
                return !0
            } : e[0]
        }

        function m(e, n, o) {
            for (var i = 0, r = n.length; r > i; i++) t(e, n[i], o);
            return o
        }

        function v(e, t, n, o, i) {
            for (var r, a = [], s = 0, l = e.length, c = null != t; l > s; s++) (r = e[s]) && (n && !n(r, o, i) || (a.push(r), c && t.push(s)));
            return a
        }

        function y(e, t, n, i, r, a) {
            return i && !i[P] && (i = y(i)), r && !r[P] && (r = y(r, a)), o(function (o, a, s, l) {
                var c, u, d, f = [], p = [], h = a.length, g = o || m(t || "*", s.nodeType ? [s] : s, []),
                    y = !e || !o && t ? g : v(g, f, e, s, l), b = n ? r || (o ? e : h || i) ? [] : a : y;
                if (n && n(y, b, s, l), i) for (c = v(b, p), i(c, [], s, l), u = c.length; u--;) (d = c[u]) && (b[p[u]] = !(y[p[u]] = d));
                if (o) {
                    if (r || e) {
                        if (r) {
                            for (c = [], u = b.length; u--;) (d = b[u]) && c.push(y[u] = d);
                            r(null, b = [], c, l)
                        }
                        for (u = b.length; u--;) (d = b[u]) && (c = r ? et(o, d) : f[u]) > -1 && (o[c] = !(a[c] = d))
                    }
                } else b = v(b === a ? b.splice(h, b.length) : b), r ? r(null, a, b, l) : K.apply(a, b)
            })
        }

        function b(e) {
            for (var t, n, o, i = e.length, r = T.relative[e[0].type], a = r || T.relative[" "], s = r ? 1 : 0, l = h(function (e) {
                return e === t
            }, a, !0), c = h(function (e) {
                return et(t, e) > -1
            }, a, !0), u = [function (e, n, o) {
                var i = !r && (o || n !== N) || ((t = n).nodeType ? l(e, n, o) : c(e, n, o));
                return t = null, i
            }]; i > s; s++) if (n = T.relative[e[s].type]) u = [h(g(u), n)]; else {
                if (n = T.filter[e[s].type].apply(null, e[s].matches), n[P]) {
                    for (o = ++s; i > o && !T.relative[e[o].type]; o++) ;
                    return y(s > 1 && g(u), s > 1 && p(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(st, "$1"), n, o > s && b(e.slice(s, o)), i > o && b(e = e.slice(o)), i > o && p(e))
                }
                u.push(n)
            }
            return g(u)
        }

        function x(e, n) {
            var i = n.length > 0, r = e.length > 0, a = function (o, a, s, l, c) {
                var u, d, f, p = 0, h = "0", g = o && [], m = [], y = N, b = o || r && T.find.TAG("*", c),
                    x = M += null == y ? 1 : Math.random() || .1, w = b.length;
                for (c && (N = a === A || a || c); h !== w && null != (u = b[h]); h++) {
                    if (r && u) {
                        for (d = 0, a || u.ownerDocument === A || (q(u), s = !H); f = e[d++];) if (f(u, a || A, s)) {
                            l.push(u);
                            break
                        }
                        c && (M = x)
                    }
                    i && ((u = !f && u) && p--, o && g.push(u))
                }
                if (p += h, i && h !== p) {
                    for (d = 0; f = n[d++];) f(g, m, a, s);
                    if (o) {
                        if (p > 0) for (; h--;) g[h] || m[h] || (m[h] = Y.call(l));
                        m = v(m)
                    }
                    K.apply(l, m), c && !o && m.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                }
                return c && (M = x, N = y), g
            };
            return i ? o(a) : a
        }

        var w, C, T, $, k, S, E, j, N, _, D, q, A, L, H, F, O, R, I, P = "sizzle" + 1 * new Date, B = e.document, M = 0,
            W = 0, z = n(), U = n(), X = n(), V = function (e, t) {
                return e === t && (D = !0), 0
            }, G = {}.hasOwnProperty, Q = [], Y = Q.pop, J = Q.push, K = Q.push, Z = Q.slice, et = function (e, t) {
                for (var n = 0, o = e.length; o > n; n++) if (e[n] === t) return n;
                return -1
            },
            tt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            nt = "[\\x20\\t\\r\\n\\f]", ot = "(?:\\\\.|[\\w-]|[^\x00-\\xa0])+",
            it = "\\[" + nt + "*(" + ot + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ot + "))|)" + nt + "*\\]",
            rt = ":(" + ot + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + it + ")*)|.*)\\)|)",
            at = new RegExp(nt + "+", "g"), st = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
            lt = new RegExp("^" + nt + "*," + nt + "*"), ct = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
            ut = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"), dt = new RegExp(rt),
            ft = new RegExp("^" + ot + "$"), pt = {
                ID: new RegExp("^#(" + ot + ")"),
                CLASS: new RegExp("^\\.(" + ot + ")"),
                TAG: new RegExp("^(" + ot + "|[*])"),
                ATTR: new RegExp("^" + it),
                PSEUDO: new RegExp("^" + rt),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + tt + ")$", "i"),
                needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
            }, ht = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, mt = /^[^{]+\{\s*\[native \w/,
            vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, yt = /[+~]/,
            bt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"), xt = function (e, t, n) {
                var o = "0x" + t - 65536;
                return o !== o || n ? t : 0 > o ? String.fromCharCode(o + 65536) : String.fromCharCode(o >> 10 | 55296, 1023 & o | 56320)
            }, wt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, Ct = function (e, t) {
                return t ? "\x00" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            }, Tt = function () {
                q()
            }, $t = h(function (e) {
                return e.disabled === !0 && ("form" in e || "label" in e)
            }, {dir: "parentNode", next: "legend"});
        try {
            K.apply(Q = Z.call(B.childNodes), B.childNodes), Q[B.childNodes.length].nodeType
        } catch (kt) {
            K = {
                apply: Q.length ? function (e, t) {
                    J.apply(e, Z.call(t))
                } : function (e, t) {
                    for (var n = e.length, o = 0; e[n++] = t[o++];) ;
                    e.length = n - 1
                }
            }
        }
        C = t.support = {}, k = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, q = t.setDocument = function (e) {
            var t, n, o = e ? e.ownerDocument || e : B;
            return o !== A && 9 === o.nodeType && o.documentElement ? (A = o, L = A.documentElement, H = !k(A), B !== A && (n = A.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Tt, !1) : n.attachEvent && n.attachEvent("onunload", Tt)), C.attributes = i(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), C.getElementsByTagName = i(function (e) {
                return e.appendChild(A.createComment("")), !e.getElementsByTagName("*").length
            }), C.getElementsByClassName = mt.test(A.getElementsByClassName), C.getById = i(function (e) {
                return L.appendChild(e).id = P, !A.getElementsByName || !A.getElementsByName(P).length
            }), C.getById ? (T.filter.ID = function (e) {
                var t = e.replace(bt, xt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }, T.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && H) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }) : (T.filter.ID = function (e) {
                var t = e.replace(bt, xt);
                return function (e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }, T.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && H) {
                    var n, o, i, r = t.getElementById(e);
                    if (r) {
                        if (n = r.getAttributeNode("id"), n && n.value === e) return [r];
                        for (i = t.getElementsByName(e), o = 0; r = i[o++];) if (n = r.getAttributeNode("id"), n && n.value === e) return [r]
                    }
                    return []
                }
            }), T.find.TAG = C.getElementsByTagName ? function (e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : C.qsa ? t.querySelectorAll(e) : void 0
            } : function (e, t) {
                var n, o = [], i = 0, r = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = r[i++];) 1 === n.nodeType && o.push(n);
                    return o
                }
                return r
            }, T.find.CLASS = C.getElementsByClassName && function (e, t) {
                return "undefined" != typeof t.getElementsByClassName && H ? t.getElementsByClassName(e) : void 0
            }, O = [], F = [], (C.qsa = mt.test(A.querySelectorAll)) && (i(function (e) {
                L.appendChild(e).innerHTML = "<a id='" + P + "'></a><select id='" + P + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && F.push("[*^$]=" + nt + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || F.push("\\[" + nt + "*(?:value|" + tt + ")"), e.querySelectorAll("[id~=" + P + "-]").length || F.push("~="), e.querySelectorAll(":checked").length || F.push(":checked"), e.querySelectorAll("a#" + P + "+*").length || F.push(".#.+[+~]")
            }), i(function (e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = A.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && F.push("name" + nt + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && F.push(":enabled", ":disabled"), L.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && F.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), F.push(",.*:")
            })), (C.matchesSelector = mt.test(R = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && i(function (e) {
                C.disconnectedMatch = R.call(e, "*"), R.call(e, "[s!='']:x"), O.push("!=", rt)
            }), F = F.length && new RegExp(F.join("|")), O = O.length && new RegExp(O.join("|")), t = mt.test(L.compareDocumentPosition), I = t || mt.test(L.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, o = t && t.parentNode;
                return e === o || !(!o || 1 !== o.nodeType || !(n.contains ? n.contains(o) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(o)))
            } : function (e, t) {
                if (t) for (; t = t.parentNode;) if (t === e) return !0;
                return !1
            }, V = t ? function (e, t) {
                if (e === t) return D = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !C.sortDetached && t.compareDocumentPosition(e) === n ? e === A || e.ownerDocument === B && I(B, e) ? -1 : t === A || t.ownerDocument === B && I(B, t) ? 1 : _ ? et(_, e) - et(_, t) : 0 : 4 & n ? -1 : 1)
            } : function (e, t) {
                if (e === t) return D = !0, 0;
                var n, o = 0, i = e.parentNode, r = t.parentNode, s = [e], l = [t];
                if (!i || !r) return e === A ? -1 : t === A ? 1 : i ? -1 : r ? 1 : _ ? et(_, e) - et(_, t) : 0;
                if (i === r) return a(e, t);
                for (n = e; n = n.parentNode;) s.unshift(n);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (; s[o] === l[o];) o++;
                return o ? a(s[o], l[o]) : s[o] === B ? -1 : l[o] === B ? 1 : 0
            }, A) : A
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== A && q(e), n = n.replace(ut, "='$1']"), !(!C.matchesSelector || !H || X[n + " "] || O && O.test(n) || F && F.test(n))) try {
                var o = R.call(e, n);
                if (o || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return o
            } catch (i) {
            }
            return t(n, A, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== A && q(e), I(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== A && q(e);
            var n = T.attrHandle[t.toLowerCase()],
                o = n && G.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !H) : void 0;
            return void 0 !== o ? o : C.attributes || !H ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
        }, t.escape = function (e) {
            return (e + "").replace(wt, Ct)
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], o = 0, i = 0;
            if (D = !C.detectDuplicates, _ = !C.sortStable && e.slice(0), e.sort(V), D) {
                for (; t = e[i++];) t === e[i] && (o = n.push(i));
                for (; o--;) e.splice(n[o], 1)
            }
            return _ = null, e
        }, $ = t.getText = function (e) {
            var t, n = "", o = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += $(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else for (; t = e[o++];) n += $(t);
            return n
        }, T = t.selectors = {
            cacheLength: 50,
            createPseudo: o,
            match: pt,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(bt, xt), e[3] = (e[3] || e[4] || e[5] || "").replace(bt, xt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return pt.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && dt.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(bt, xt).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = z[e + " "];
                    return t || (t = new RegExp("(^|" + nt + ")" + e + "(" + nt + "|$)")) && z(e, function (e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                }, ATTR: function (e, n, o) {
                    return function (i) {
                        var r = t.attr(i, e);
                        return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === o : "!=" === n ? r !== o : "^=" === n ? o && 0 === r.indexOf(o) : "*=" === n ? o && r.indexOf(o) > -1 : "$=" === n ? o && r.slice(-o.length) === o : "~=" === n ? (" " + r.replace(at, " ") + " ").indexOf(o) > -1 : "|=" === n && (r === o || r.slice(0, o.length + 1) === o + "-"))
                    }
                }, CHILD: function (e, t, n, o, i) {
                    var r = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                    return 1 === o && 0 === i ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, l) {
                        var c, u, d, f, p, h, g = r !== a ? "nextSibling" : "previousSibling", m = t.parentNode,
                            v = s && t.nodeName.toLowerCase(), y = !l && !s, b = !1;
                        if (m) {
                            if (r) {
                                for (; g;) {
                                    for (f = t; f = f[g];) if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? m.firstChild : m.lastChild], a && y) {
                                for (f = m, d = f[P] || (f[P] = {}), u = d[f.uniqueID] || (d[f.uniqueID] = {}), c = u[e] || [], p = c[0] === M && c[1], b = p && c[2], f = p && m.childNodes[p]; f = ++p && f && f[g] || (b = p = 0) || h.pop();) if (1 === f.nodeType && ++b && f === t) {
                                    u[e] = [M, p, b];
                                    break
                                }
                            } else if (y && (f = t, d = f[P] || (f[P] = {}), u = d[f.uniqueID] || (d[f.uniqueID] = {}), c = u[e] || [], p = c[0] === M && c[1], b = p), b === !1) for (; (f = ++p && f && f[g] || (b = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++b || (y && (d = f[P] || (f[P] = {}), u = d[f.uniqueID] || (d[f.uniqueID] = {}), u[e] = [M, b]), f !== t));) ;
                            return b -= i, b === o || b % o === 0 && b / o >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var i, r = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return r[P] ? r(n) : r.length > 1 ? (i = [e, e, "", n], T.setFilters.hasOwnProperty(e.toLowerCase()) ? o(function (e, t) {
                        for (var o, i = r(e, n), a = i.length; a--;) o = et(e, i[a]), e[o] = !(t[o] = i[a])
                    }) : function (e) {
                        return r(e, 0, i)
                    }) : r
                }
            },
            pseudos: {
                not: o(function (e) {
                    var t = [], n = [], i = E(e.replace(st, "$1"));
                    return i[P] ? o(function (e, t, n, o) {
                        for (var r, a = i(e, null, o, []), s = e.length; s--;) (r = a[s]) && (e[s] = !(t[s] = r))
                    }) : function (e, o, r) {
                        return t[0] = e, i(t, null, r, n), t[0] = null, !n.pop()
                    }
                }), has: o(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: o(function (e) {
                    return e = e.replace(bt, xt), function (t) {
                        return (t.textContent || t.innerText || $(t)).indexOf(e) > -1
                    }
                }), lang: o(function (e) {
                    return ft.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(bt, xt).toLowerCase(), function (t) {
                        var n;
                        do if (n = H ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === L
                }, focus: function (e) {
                    return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: c(!1), disabled: c(!0), checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                    return !0
                }, parent: function (e) {
                    return !T.pseudos.empty(e)
                }, header: function (e) {
                    return gt.test(e.nodeName)
                }, input: function (e) {
                    return ht.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: u(function () {
                    return [0]
                }), last: u(function (e, t) {
                    return [t - 1]
                }), eq: u(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }), even: u(function (e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }), odd: u(function (e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }), lt: u(function (e, t, n) {
                    for (var o = 0 > n ? n + t : n; --o >= 0;) e.push(o);
                    return e
                }), gt: u(function (e, t, n) {
                    for (var o = 0 > n ? n + t : n; ++o < t;) e.push(o);
                    return e
                })
            }
        }, T.pseudos.nth = T.pseudos.eq;
        for (w in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) T.pseudos[w] = s(w);
        for (w in{submit: !0, reset: !0}) T.pseudos[w] = l(w);
        return f.prototype = T.filters = T.pseudos, T.setFilters = new f, S = t.tokenize = function (e, n) {
            var o, i, r, a, s, l, c, u = U[e + " "];
            if (u) return n ? 0 : u.slice(0);
            for (s = e, l = [], c = T.preFilter; s;) {
                o && !(i = lt.exec(s)) || (i && (s = s.slice(i[0].length) || s), l.push(r = [])), o = !1, (i = ct.exec(s)) && (o = i.shift(), r.push({
                    value: o,
                    type: i[0].replace(st, " ")
                }), s = s.slice(o.length));
                for (a in T.filter) !(i = pt[a].exec(s)) || c[a] && !(i = c[a](i)) || (o = i.shift(), r.push({
                    value: o,
                    type: a,
                    matches: i
                }), s = s.slice(o.length));
                if (!o) break
            }
            return n ? s.length : s ? t.error(e) : U(e, l).slice(0)
        }, E = t.compile = function (e, t) {
            var n, o = [], i = [], r = X[e + " "];
            if (!r) {
                for (t || (t = S(e)), n = t.length; n--;) r = b(t[n]), r[P] ? o.push(r) : i.push(r);
                r = X(e, x(i, o)), r.selector = e
            }
            return r
        }, j = t.select = function (e, t, n, o) {
            var i, r, a, s, l, c = "function" == typeof e && e, u = !o && S(e = c.selector || e);
            if (n = n || [], 1 === u.length) {
                if (r = u[0] = u[0].slice(0), r.length > 2 && "ID" === (a = r[0]).type && 9 === t.nodeType && H && T.relative[r[1].type]) {
                    if (t = (T.find.ID(a.matches[0].replace(bt, xt), t) || [])[0], !t) return n;
                    c && (t = t.parentNode), e = e.slice(r.shift().value.length)
                }
                for (i = pt.needsContext.test(e) ? 0 : r.length; i-- && (a = r[i], !T.relative[s = a.type]);) if ((l = T.find[s]) && (o = l(a.matches[0].replace(bt, xt), yt.test(r[0].type) && d(t.parentNode) || t))) {
                    if (r.splice(i, 1), e = o.length && p(r), !e) return K.apply(n, o), n;
                    break
                }
            }
            return (c || E(e, u))(o, t, !H, n, !t || yt.test(e) && d(t.parentNode) || t), n
        }, C.sortStable = P.split("").sort(V).join("") === P, C.detectDuplicates = !!D, q(), C.sortDetached = i(function (e) {
            return 1 & e.compareDocumentPosition(A.createElement("fieldset"))
        }), i(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || r("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), C.attributes && i(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || r("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), i(function (e) {
            return null == e.getAttribute("disabled")
        }) || r(tt, function (e, t, n) {
            var o;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
        }), t
    }(e);
    ht.find = bt, ht.expr = bt.selectors, ht.expr[":"] = ht.expr.pseudos, ht.uniqueSort = ht.unique = bt.uniqueSort, ht.text = bt.getText, ht.isXMLDoc = bt.isXML, ht.contains = bt.contains, ht.escapeSelector = bt.escape;
    var xt = function (e, t, n) {
            for (var o = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;) if (1 === e.nodeType) {
                if (i && ht(e).is(n)) break;
                o.push(e)
            }
            return o
        }, wt = function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }, Ct = ht.expr.match.needsContext, Tt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        $t = /^.[^:#\[\.,]*$/;
    ht.filter = function (e, t, n) {
        var o = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === o.nodeType ? ht.find.matchesSelector(o, e) ? [o] : [] : ht.find.matches(e, ht.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, ht.fn.extend({
        find: function (e) {
            var t, n, o = this.length, i = this;
            if ("string" != typeof e) return this.pushStack(ht(e).filter(function () {
                for (t = 0; o > t; t++) if (ht.contains(i[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; o > t; t++) ht.find(e, i[t], n);
            return o > 1 ? ht.uniqueSort(n) : n
        }, filter: function (e) {
            return this.pushStack(i(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(i(this, e || [], !0))
        }, is: function (e) {
            return !!i(this, "string" == typeof e && Ct.test(e) ? ht(e) : e || [], !1).length
        }
    });
    var kt, St = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, Et = ht.fn.init = function (e, t, n) {
        var o, i;
        if (!e) return this;
        if (n = n || kt, "string" == typeof e) {
            if (o = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : St.exec(e), !o || !o[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (o[1]) {
                if (t = t instanceof ht ? t[0] : t, ht.merge(this, ht.parseHTML(o[1], t && t.nodeType ? t.ownerDocument || t : tt, !0)), Tt.test(o[1]) && ht.isPlainObject(t)) for (o in t) ht.isFunction(this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
                return this
            }
            return i = tt.getElementById(o[2]), i && (this[0] = i, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : ht.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(ht) : ht.makeArray(e, this)
    };
    Et.prototype = ht.fn, kt = ht(tt);
    var jt = /^(?:parents|prev(?:Until|All))/, Nt = {children: !0, contents: !0, next: !0, prev: !0};
    ht.fn.extend({
        has: function (e) {
            var t = ht(e, this), n = t.length;
            return this.filter(function () {
                for (var e = 0; n > e; e++) if (ht.contains(this, t[e])) return !0
            })
        }, closest: function (e, t) {
            var n, o = 0, i = this.length, r = [], a = "string" != typeof e && ht(e);
            if (!Ct.test(e)) for (; i > o; o++) for (n = this[o]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ht.find.matchesSelector(n, e))) {
                r.push(n);
                break
            }
            return this.pushStack(r.length > 1 ? ht.uniqueSort(r) : r)
        }, index: function (e) {
            return e ? "string" == typeof e ? at.call(ht(e), this[0]) : at.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(ht.uniqueSort(ht.merge(this.get(), ht(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), ht.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return xt(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return xt(e, "parentNode", n)
        }, next: function (e) {
            return r(e, "nextSibling")
        }, prev: function (e) {
            return r(e, "previousSibling")
        }, nextAll: function (e) {
            return xt(e, "nextSibling")
        }, prevAll: function (e) {
            return xt(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return xt(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return xt(e, "previousSibling", n)
        }, siblings: function (e) {
            return wt((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return wt(e.firstChild)
        }, contents: function (e) {
            return e.contentDocument || ht.merge([], e.childNodes)
        }
    }, function (e, t) {
        ht.fn[e] = function (n, o) {
            var i = ht.map(this, t, n);
            return "Until" !== e.slice(-5) && (o = n), o && "string" == typeof o && (i = ht.filter(o, i)), this.length > 1 && (Nt[e] || ht.uniqueSort(i), jt.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var _t = /[^\x20\t\r\n\f]+/g;
    ht.Callbacks = function (e) {
        e = "string" == typeof e ? a(e) : ht.extend({}, e);
        var t, n, o, i, r = [], s = [], l = -1, c = function () {
            for (i = e.once, o = t = !0; s.length; l = -1) for (n = s.shift(); ++l < r.length;) r[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = r.length, n = !1);
            e.memory || (n = !1), t = !1, i && (r = n ? [] : "")
        }, u = {
            add: function () {
                return r && (n && !t && (l = r.length - 1, s.push(n)), function o(t) {
                    ht.each(t, function (t, n) {
                        ht.isFunction(n) ? e.unique && u.has(n) || r.push(n) : n && n.length && "string" !== ht.type(n) && o(n)
                    })
                }(arguments), n && !t && c()), this
            }, remove: function () {
                return ht.each(arguments, function (e, t) {
                    for (var n; (n = ht.inArray(t, r, n)) > -1;) r.splice(n, 1), l >= n && l--
                }), this
            }, has: function (e) {
                return e ? ht.inArray(e, r) > -1 : r.length > 0
            }, empty: function () {
                return r && (r = []), this
            }, disable: function () {
                return i = s = [], r = n = "", this
            }, disabled: function () {
                return !r
            }, lock: function () {
                return i = s = [], n || t || (r = n = ""), this
            }, locked: function () {
                return !!i
            }, fireWith: function (e, n) {
                return i || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || c()), this
            }, fire: function () {
                return u.fireWith(this, arguments), this
            }, fired: function () {
                return !!o
            }
        };
        return u
    }, ht.extend({
        Deferred: function (t) {
            var n = [["notify", "progress", ht.Callbacks("memory"), ht.Callbacks("memory"), 2], ["resolve", "done", ht.Callbacks("once memory"), ht.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", ht.Callbacks("once memory"), ht.Callbacks("once memory"), 1, "rejected"]],
                o = "pending", i = {
                    state: function () {
                        return o
                    }, always: function () {
                        return r.done(arguments).fail(arguments), this
                    }, "catch": function (e) {
                        return i.then(null, e)
                    }, pipe: function () {
                        var e = arguments;
                        return ht.Deferred(function (t) {
                            ht.each(n, function (n, o) {
                                var i = ht.isFunction(e[o[4]]) && e[o[4]];
                                r[o[1]](function () {
                                    var e = i && i.apply(this, arguments);
                                    e && ht.isFunction(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[o[0] + "With"](this, i ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    }, then: function (t, o, i) {
                        function r(t, n, o, i) {
                            return function () {
                                var c = this, u = arguments, d = function () {
                                    var e, d;
                                    if (!(a > t)) {
                                        if (e = o.apply(c, u), e === n.promise()) throw new TypeError("Thenable self-resolution");
                                        d = e && ("object" == typeof e || "function" == typeof e) && e.then, ht.isFunction(d) ? i ? d.call(e, r(a, n, s, i), r(a, n, l, i)) : (a++, d.call(e, r(a, n, s, i), r(a, n, l, i), r(a, n, s, n.notifyWith))) : (o !== s && (c = void 0, u = [e]), (i || n.resolveWith)(c, u))
                                    }
                                }, f = i ? d : function () {
                                    try {
                                        d()
                                    } catch (e) {
                                        ht.Deferred.exceptionHook && ht.Deferred.exceptionHook(e, f.stackTrace), t + 1 >= a && (o !== l && (c = void 0, u = [e]), n.rejectWith(c, u))
                                    }
                                };
                                t ? f() : (ht.Deferred.getStackHook && (f.stackTrace = ht.Deferred.getStackHook()), e.setTimeout(f))
                            }
                        }

                        var a = 0;
                        return ht.Deferred(function (e) {
                            n[0][3].add(r(0, e, ht.isFunction(i) ? i : s, e.notifyWith)), n[1][3].add(r(0, e, ht.isFunction(t) ? t : s)), n[2][3].add(r(0, e, ht.isFunction(o) ? o : l))
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? ht.extend(e, i) : i
                    }
                }, r = {};
            return ht.each(n, function (e, t) {
                var a = t[2], s = t[5];
                i[t[1]] = a.add, s && a.add(function () {
                    o = s
                }, n[3 - e][2].disable, n[0][2].lock), a.add(t[3].fire), r[t[0]] = function () {
                    return r[t[0] + "With"](this === r ? void 0 : this, arguments), this
                }, r[t[0] + "With"] = a.fireWith
            }), i.promise(r), t && t.call(r, r), r
        }, when: function (e) {
            var t = arguments.length, n = t, o = Array(n), i = ot.call(arguments), r = ht.Deferred(), a = function (e) {
                return function (n) {
                    o[e] = this, i[e] = arguments.length > 1 ? ot.call(arguments) : n, --t || r.resolveWith(o, i)
                }
            };
            if (1 >= t && (c(e, r.done(a(n)).resolve, r.reject), "pending" === r.state() || ht.isFunction(i[n] && i[n].then))) return r.then();
            for (; n--;) c(i[n], a(n), r.reject);
            return r.promise()
        }
    });
    var Dt = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    ht.Deferred.exceptionHook = function (t, n) {
        e.console && e.console.warn && t && Dt.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }, ht.readyException = function (t) {
        e.setTimeout(function () {
            throw t
        })
    };
    var qt = ht.Deferred();
    ht.fn.ready = function (e) {
        return qt.then(e)["catch"](function (e) {
            ht.readyException(e)
        }), this
    }, ht.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? ht.readyWait++ : ht.ready(!0)
        }, ready: function (e) {
            (e === !0 ? --ht.readyWait : ht.isReady) || (ht.isReady = !0, e !== !0 && --ht.readyWait > 0 || qt.resolveWith(tt, [ht]))
        }
    }), ht.ready.then = qt.then, "complete" === tt.readyState || "loading" !== tt.readyState && !tt.documentElement.doScroll ? e.setTimeout(ht.ready) : (tt.addEventListener("DOMContentLoaded", u), e.addEventListener("load", u));
    var At = function (e, t, n, o, i, r, a) {
        var s = 0, l = e.length, c = null == n;
        if ("object" === ht.type(n)) {
            i = !0;
            for (s in n) At(e, t, s, n[s], !0, r, a)
        } else if (void 0 !== o && (i = !0, ht.isFunction(o) || (a = !0), c && (a ? (t.call(e, o), t = null) : (c = t, t = function (e, t, n) {
            return c.call(ht(e), n)
        })), t)) for (; l > s; s++) t(e[s], n, a ? o : o.call(e[s], s, t(e[s], n)));
        return i ? e : c ? t.call(e) : l ? t(e[0], n) : r
    }, Lt = function (e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    d.uid = 1, d.prototype = {
        cache: function (e) {
            var t = e[this.expando];
            return t || (t = {}, Lt(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        }, set: function (e, t, n) {
            var o, i = this.cache(e);
            if ("string" == typeof t) i[ht.camelCase(t)] = n; else for (o in t) i[ht.camelCase(o)] = t[o];
            return i
        }, get: function (e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][ht.camelCase(t)]
        }, access: function (e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        }, remove: function (e, t) {
            var n, o = e[this.expando];
            if (void 0 !== o) {
                if (void 0 !== t) {
                    ht.isArray(t) ? t = t.map(ht.camelCase) : (t = ht.camelCase(t), t = t in o ? [t] : t.match(_t) || []), n = t.length;
                    for (; n--;) delete o[t[n]]
                }
                (void 0 === t || ht.isEmptyObject(o)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        }, hasData: function (e) {
            var t = e[this.expando];
            return void 0 !== t && !ht.isEmptyObject(t)
        }
    };
    var Ht = new d, Ft = new d, Ot = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Rt = /[A-Z]/g;
    ht.extend({
        hasData: function (e) {
            return Ft.hasData(e) || Ht.hasData(e)
        }, data: function (e, t, n) {
            return Ft.access(e, t, n)
        }, removeData: function (e, t) {
            Ft.remove(e, t)
        }, _data: function (e, t, n) {
            return Ht.access(e, t, n)
        }, _removeData: function (e, t) {
            Ht.remove(e, t)
        }
    }), ht.fn.extend({
        data: function (e, t) {
            var n, o, i, r = this[0], a = r && r.attributes;
            if (void 0 === e) {
                if (this.length && (i = Ft.get(r), 1 === r.nodeType && !Ht.get(r, "hasDataAttrs"))) {
                    for (n = a.length; n--;) a[n] && (o = a[n].name, 0 === o.indexOf("data-") && (o = ht.camelCase(o.slice(5)), p(r, o, i[o])));
                    Ht.set(r, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function () {
                Ft.set(this, e)
            }) : At(this, function (t) {
                var n;
                if (r && void 0 === t) {
                    if (n = Ft.get(r, e), void 0 !== n) return n;
                    if (n = p(r, e), void 0 !== n) return n
                } else this.each(function () {
                    Ft.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        }, removeData: function (e) {
            return this.each(function () {
                Ft.remove(this, e)
            })
        }
    }), ht.extend({
        queue: function (e, t, n) {
            var o;
            return e ? (t = (t || "fx") + "queue", o = Ht.get(e, t), n && (!o || ht.isArray(n) ? o = Ht.access(e, t, ht.makeArray(n)) : o.push(n)), o || []) : void 0
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = ht.queue(e, t), o = n.length, i = n.shift(), r = ht._queueHooks(e, t), a = function () {
                ht.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(), o--), i && ("fx" === t && n.unshift("inprogress"), delete r.stop, i.call(e, a, r)), !o && r && r.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return Ht.get(e, n) || Ht.access(e, n, {
                empty: ht.Callbacks("once memory").add(function () {
                    Ht.remove(e, [t + "queue", n])
                })
            })
        }
    }), ht.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? ht.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = ht.queue(this, e, t);
                ht._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ht.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                ht.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, o = 1, i = ht.Deferred(), r = this, a = this.length, s = function () {
                --o || i.resolveWith(r, [r])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = Ht.get(r[a], e + "queueHooks"), n && n.empty && (o++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var It = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Pt = new RegExp("^(?:([+-])=|)(" + It + ")([a-z%]*)$", "i"),
        Bt = ["Top", "Right", "Bottom", "Left"], Mt = function (e, t) {
            return e = t || e, "none" === e.style.display || "" === e.style.display && ht.contains(e.ownerDocument, e) && "none" === ht.css(e, "display")
        }, Wt = function (e, t, n, o) {
            var i, r, a = {};
            for (r in t) a[r] = e.style[r], e.style[r] = t[r];
            i = n.apply(e, o || []);
            for (r in t) e.style[r] = a[r];
            return i
        }, zt = {};
    ht.fn.extend({
        show: function () {
            return m(this, !0)
        }, hide: function () {
            return m(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                Mt(this) ? ht(this).show() : ht(this).hide()
            })
        }
    });
    var Ut = /^(?:checkbox|radio)$/i, Xt = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, Vt = /^$|\/(?:java|ecma)script/i, Gt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    Gt.optgroup = Gt.option, Gt.tbody = Gt.tfoot = Gt.colgroup = Gt.caption = Gt.thead, Gt.th = Gt.td;
    var Qt = /<|&#?\w+;/;
    !function () {
        var e = tt.createDocumentFragment(), t = e.appendChild(tt.createElement("div")), n = tt.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), ft.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", ft.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var Yt = tt.documentElement, Jt = /^key/, Kt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Zt = /^([^.]*)(?:\.(.+)|)/;
    ht.event = {
        global: {}, add: function (e, t, n, o, i) {
            var r, a, s, l, c, u, d, f, p, h, g, m = Ht.get(e);
            if (m) for (n.handler && (r = n, n = r.handler, i = r.selector), i && ht.find.matchesSelector(Yt, i), n.guid || (n.guid = ht.guid++), (l = m.events) || (l = m.events = {}), (a = m.handle) || (a = m.handle = function (t) {
                return "undefined" != typeof ht && ht.event.triggered !== t.type ? ht.event.dispatch.apply(e, arguments) : void 0
            }), t = (t || "").match(_t) || [""], c = t.length; c--;) s = Zt.exec(t[c]) || [], p = g = s[1], h = (s[2] || "").split(".").sort(), p && (d = ht.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, d = ht.event.special[p] || {}, u = ht.extend({
                type: p,
                origType: g,
                data: o,
                handler: n,
                guid: n.guid,
                selector: i,
                needsContext: i && ht.expr.match.needsContext.test(i),
                namespace: h.join(".")
            }, r), (f = l[p]) || (f = l[p] = [], f.delegateCount = 0, d.setup && d.setup.call(e, o, h, a) !== !1 || e.addEventListener && e.addEventListener(p, a)), d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, u) : f.push(u), ht.event.global[p] = !0)
        }, remove: function (e, t, n, o, i) {
            var r, a, s, l, c, u, d, f, p, h, g, m = Ht.hasData(e) && Ht.get(e);
            if (m && (l = m.events)) {
                for (t = (t || "").match(_t) || [""], c = t.length; c--;) if (s = Zt.exec(t[c]) || [], p = g = s[1], h = (s[2] || "").split(".").sort(), p) {
                    for (d = ht.event.special[p] || {}, p = (o ? d.delegateType : d.bindType) || p, f = l[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = r = f.length; r--;) u = f[r], !i && g !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || o && o !== u.selector && ("**" !== o || !u.selector) || (f.splice(r, 1), u.selector && f.delegateCount--, d.remove && d.remove.call(e, u));
                    a && !f.length && (d.teardown && d.teardown.call(e, h, m.handle) !== !1 || ht.removeEvent(e, p, m.handle), delete l[p])
                } else for (p in l) ht.event.remove(e, p + t[c], n, o, !0);
                ht.isEmptyObject(l) && Ht.remove(e, "handle events")
            }
        }, dispatch: function (e) {
            var t, n, o, i, r, a, s = ht.event.fix(e), l = new Array(arguments.length),
                c = (Ht.get(this, "events") || {})[s.type] || [], u = ht.event.special[s.type] || {};
            for (l[0] = s, t = 1; t < arguments.length; t++) l[t] = arguments[t];
            if (s.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, s) !== !1) {
                for (a = ht.event.handlers.call(this, s, c), t = 0; (i = a[t++]) && !s.isPropagationStopped();) for (s.currentTarget = i.elem, n = 0; (r = i.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(r.namespace) || (s.handleObj = r, s.data = r.data, o = ((ht.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, l), void 0 !== o && (s.result = o) === !1 && (s.preventDefault(), s.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, s), s.result
            }
        }, handlers: function (e, t) {
            var n, o, i, r, a, s = [], l = t.delegateCount, c = e.target;
            if (l && c.nodeType && !("click" === e.type && e.button >= 1)) for (; c !== this; c = c.parentNode || this) if (1 === c.nodeType && ("click" !== e.type || c.disabled !== !0)) {
                for (r = [], a = {}, n = 0; l > n; n++) o = t[n], i = o.selector + " ", void 0 === a[i] && (a[i] = o.needsContext ? ht(i, this).index(c) > -1 : ht.find(i, this, null, [c]).length), a[i] && r.push(o);
                r.length && s.push({elem: c, handlers: r})
            }
            return c = this, l < t.length && s.push({elem: c, handlers: t.slice(l)}), s
        }, addProp: function (e, t) {
            Object.defineProperty(ht.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: ht.isFunction(t) ? function () {
                    return this.originalEvent ? t(this.originalEvent) : void 0
                } : function () {
                    return this.originalEvent ? this.originalEvent[e] : void 0
                },
                set: function (t) {
                    Object.defineProperty(this, e, {enumerable: !0, configurable: !0, writable: !0, value: t})
                }
            })
        }, fix: function (e) {
            return e[ht.expando] ? e : new ht.Event(e)
        }, special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    return this !== C() && this.focus ? (this.focus(), !1) : void 0
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === C() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && ht.nodeName(this, "input") ? (this.click(), !1) : void 0
                }, _default: function (e) {
                    return ht.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, ht.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, ht.Event = function (e, t) {
        return this instanceof ht.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? x : w, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && ht.extend(this, t), this.timeStamp = e && e.timeStamp || ht.now(), void (this[ht.expando] = !0)) : new ht.Event(e, t)
    }, ht.Event.prototype = {
        constructor: ht.Event,
        isDefaultPrevented: w,
        isPropagationStopped: w,
        isImmediatePropagationStopped: w,
        isSimulated: !1,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = x, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = x, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = x, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ht.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (e) {
            var t = e.button;
            return null == e.which && Jt.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Kt.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, ht.event.addProp), ht.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, t) {
        ht.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, o = this, i = e.relatedTarget, r = e.handleObj;
                return i && (i === o || ht.contains(o, i)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), ht.fn.extend({
        on: function (e, t, n, o) {
            return T(this, e, t, n, o)
        }, one: function (e, t, n, o) {
            return T(this, e, t, n, o, 1)
        }, off: function (e, t, n) {
            var o, i;
            if (e && e.preventDefault && e.handleObj) return o = e.handleObj, ht(e.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = w), this.each(function () {
                ht.event.remove(this, e, n, t)
            })
        }
    });
    var en = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        tn = /<script|<style|<link/i, nn = /checked\s*(?:[^=]|=\s*.checked.)/i, on = /^true\/(.*)/,
        rn = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    ht.extend({
        htmlPrefilter: function (e) {
            return e.replace(en, "<$1></$2>")
        }, clone: function (e, t, n) {
            var o, i, r, a, s = e.cloneNode(!0), l = ht.contains(e.ownerDocument, e);
            if (!(ft.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ht.isXMLDoc(e))) for (a = v(s), r = v(e), o = 0, i = r.length; i > o; o++) j(r[o], a[o]);
            if (t) if (n) for (r = r || v(e), a = a || v(s), o = 0, i = r.length; i > o; o++) E(r[o], a[o]); else E(e, s);
            return a = v(s, "script"), a.length > 0 && y(a, !l && v(e, "script")), s
        }, cleanData: function (e) {
            for (var t, n, o, i = ht.event.special, r = 0; void 0 !== (n = e[r]); r++) if (Lt(n)) {
                if (t = n[Ht.expando]) {
                    if (t.events) for (o in t.events) i[o] ? ht.event.remove(n, o) : ht.removeEvent(n, o, t.handle);
                    n[Ht.expando] = void 0
                }
                n[Ft.expando] && (n[Ft.expando] = void 0)
            }
        }
    }), ht.fn.extend({
        detach: function (e) {
            return _(this, e, !0)
        }, remove: function (e) {
            return _(this, e)
        }, text: function (e) {
            return At(this, function (e) {
                return void 0 === e ? ht.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        }, append: function () {
            return N(this, arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = $(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return N(this, arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = $(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return N(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return N(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (ht.cleanData(v(e, !1)), e.textContent = "");
            return this
        }, clone: function (e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return ht.clone(this, e, t)
            })
        }, html: function (e) {
            return At(this, function (e) {
                var t = this[0] || {}, n = 0, o = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !tn.test(e) && !Gt[(Xt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = ht.htmlPrefilter(e);
                    try {
                        for (; o > n; n++) t = this[n] || {}, 1 === t.nodeType && (ht.cleanData(v(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = [];
            return N(this, arguments, function (t) {
                var n = this.parentNode;
                ht.inArray(this, e) < 0 && (ht.cleanData(v(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), ht.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        ht.fn[e] = function (e) {
            for (var n, o = [], i = ht(e), r = i.length - 1, a = 0; r >= a; a++) n = a === r ? this : this.clone(!0), ht(i[a])[t](n), rt.apply(o, n.get());
            return this.pushStack(o)
        }
    });
    var an = /^margin/, sn = new RegExp("^(" + It + ")(?!px)[a-z%]+$", "i"), ln = function (t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e), n.getComputedStyle(t)
    };
    !function () {
        function t() {
            if (s) {
                s.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Yt.appendChild(a);
                var t = e.getComputedStyle(s);
                n = "1%" !== t.top, r = "2px" === t.marginLeft, o = "4px" === t.width, s.style.marginRight = "50%", i = "4px" === t.marginRight, Yt.removeChild(a), s = null
            }
        }

        var n, o, i, r, a = tt.createElement("div"), s = tt.createElement("div");
        s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", ft.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s), ht.extend(ft, {
            pixelPosition: function () {
                return t(), n
            }, boxSizingReliable: function () {
                return t(), o
            }, pixelMarginRight: function () {
                return t(), i
            }, reliableMarginLeft: function () {
                return t(), r
            }
        }))
    }();
    var cn = /^(none|table(?!-c[ea]).+)/, un = {position: "absolute", visibility: "hidden", display: "block"},
        dn = {letterSpacing: "0", fontWeight: "400"}, fn = ["Webkit", "Moz", "ms"], pn = tt.createElement("div").style;
    ht.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = D(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": "cssFloat"},
        style: function (e, t, n, o) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, r, a, s = ht.camelCase(t), l = e.style;
                return t = ht.cssProps[s] || (ht.cssProps[s] = A(s) || s), a = ht.cssHooks[t] || ht.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, o)) ? i : l[t] : (r = typeof n, "string" === r && (i = Pt.exec(n)) && i[1] && (n = h(e, t, i), r = "number"), void (null != n && n === n && ("number" === r && (n += i && i[3] || (ht.cssNumber[s] ? "" : "px")), ft.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, o)) || (l[t] = n))))
            }
        },
        css: function (e, t, n, o) {
            var i, r, a, s = ht.camelCase(t);
            return t = ht.cssProps[s] || (ht.cssProps[s] = A(s) || s), a = ht.cssHooks[t] || ht.cssHooks[s], a && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = D(e, t, o)), "normal" === i && t in dn && (i = dn[t]), "" === n || n ? (r = parseFloat(i), n === !0 || isFinite(r) ? r || 0 : i) : i
        }
    }), ht.each(["height", "width"], function (e, t) {
        ht.cssHooks[t] = {
            get: function (e, n, o) {
                return n ? !cn.test(ht.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? F(e, t, o) : Wt(e, un, function () {
                    return F(e, t, o)
                }) : void 0
            }, set: function (e, n, o) {
                var i, r = o && ln(e), a = o && H(e, t, o, "border-box" === ht.css(e, "boxSizing", !1, r), r);
                return a && (i = Pt.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = ht.css(e, t)), L(e, n, a)
            }
        }
    }), ht.cssHooks.marginLeft = q(ft.reliableMarginLeft, function (e, t) {
        return t ? (parseFloat(D(e, "marginLeft")) || e.getBoundingClientRect().left - Wt(e, {marginLeft: 0}, function () {
            return e.getBoundingClientRect().left
        })) + "px" : void 0
    }), ht.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        ht.cssHooks[e + t] = {
            expand: function (n) {
                for (var o = 0, i = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > o; o++) i[e + Bt[o] + t] = r[o] || r[o - 2] || r[0];
                return i
            }
        }, an.test(e) || (ht.cssHooks[e + t].set = L)
    }), ht.fn.extend({
        css: function (e, t) {
            return At(this, function (e, t, n) {
                var o, i, r = {}, a = 0;
                if (ht.isArray(t)) {
                    for (o = ln(e), i = t.length; i > a; a++) r[t[a]] = ht.css(e, t[a], !1, o);
                    return r
                }
                return void 0 !== n ? ht.style(e, t, n) : ht.css(e, t)
            }, e, t, arguments.length > 1)
        }
    }), ht.Tween = O, O.prototype = {
        constructor: O, init: function (e, t, n, o, i, r) {
            this.elem = e, this.prop = n, this.easing = i || ht.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = o, this.unit = r || (ht.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = O.propHooks[this.prop];
            return e && e.get ? e.get(this) : O.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = O.propHooks[this.prop];
            return this.pos = t = this.options.duration ? ht.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : O.propHooks._default.set(this), this
        }
    }, O.prototype.init.prototype = O.prototype, O.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = ht.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            }, set: function (e) {
                ht.fx.step[e.prop] ? ht.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[ht.cssProps[e.prop]] && !ht.cssHooks[e.prop] ? e.elem[e.prop] = e.now : ht.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, O.propHooks.scrollTop = O.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, ht.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }, _default: "swing"
    }, ht.fx = O.prototype.init, ht.fx.step = {};
    var hn, gn, mn = /^(?:toggle|show|hide)$/, vn = /queueHooks$/;
    ht.Animation = ht.extend(z, {
        tweeners: {
            "*": [function (e, t) {
                var n = this.createTween(e, t);
                return h(n.elem, e, Pt.exec(t), n), n
            }]
        }, tweener: function (e, t) {
            ht.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(_t);
            for (var n, o = 0, i = e.length; i > o; o++) n = e[o], z.tweeners[n] = z.tweeners[n] || [], z.tweeners[n].unshift(t)
        }, prefilters: [M], prefilter: function (e, t) {
            t ? z.prefilters.unshift(e) : z.prefilters.push(e)
        }
    }), ht.speed = function (e, t, n) {
        var o = e && "object" == typeof e ? ht.extend({}, e) : {
            complete: n || !n && t || ht.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !ht.isFunction(t) && t
        };
        return ht.fx.off || tt.hidden ? o.duration = 0 : "number" != typeof o.duration && (o.duration = o.duration in ht.fx.speeds ? ht.fx.speeds[o.duration] : ht.fx.speeds._default), null != o.queue && o.queue !== !0 || (o.queue = "fx"), o.old = o.complete, o.complete = function () {
            ht.isFunction(o.old) && o.old.call(this), o.queue && ht.dequeue(this, o.queue)
        }, o
    }, ht.fn.extend({
        fadeTo: function (e, t, n, o) {
            return this.filter(Mt).css("opacity", 0).show().end().animate({opacity: t}, e, n, o)
        }, animate: function (e, t, n, o) {
            var i = ht.isEmptyObject(e), r = ht.speed(t, n, o), a = function () {
                var t = z(this, ht.extend({}, e), r);
                (i || Ht.get(this, "finish")) && t.stop(!0)
            };
            return a.finish = a, i || r.queue === !1 ? this.each(a) : this.queue(r.queue, a)
        }, stop: function (e, t, n) {
            var o = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, i = null != e && e + "queueHooks", r = ht.timers, a = Ht.get(this);
                if (i) a[i] && a[i].stop && o(a[i]); else for (i in a) a[i] && a[i].stop && vn.test(i) && o(a[i]);
                for (i = r.length; i--;) r[i].elem !== this || null != e && r[i].queue !== e || (r[i].anim.stop(n), t = !1, r.splice(i, 1));
                !t && n || ht.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = Ht.get(this), o = n[e + "queue"], i = n[e + "queueHooks"], r = ht.timers,
                    a = o ? o.length : 0;
                for (n.finish = !0, ht.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                for (t = 0; a > t; t++) o[t] && o[t].finish && o[t].finish.call(this);
                delete n.finish
            })
        }
    }), ht.each(["toggle", "show", "hide"], function (e, t) {
        var n = ht.fn[t];
        ht.fn[t] = function (e, o, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(P(t, !0), e, o, i)
        }
    }), ht.each({
        slideDown: P("show"),
        slideUp: P("hide"),
        slideToggle: P("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        ht.fn[e] = function (e, n, o) {
            return this.animate(t, e, n, o)
        }
    }), ht.timers = [], ht.fx.tick = function () {
        var e, t = 0, n = ht.timers;
        for (hn = ht.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
        n.length || ht.fx.stop(), hn = void 0
    }, ht.fx.timer = function (e) {
        ht.timers.push(e), e() ? ht.fx.start() : ht.timers.pop()
    }, ht.fx.interval = 13, ht.fx.start = function () {
        gn || (gn = e.requestAnimationFrame ? e.requestAnimationFrame(R) : e.setInterval(ht.fx.tick, ht.fx.interval))
    }, ht.fx.stop = function () {
        e.cancelAnimationFrame ? e.cancelAnimationFrame(gn) : e.clearInterval(gn), gn = null
    }, ht.fx.speeds = {slow: 600, fast: 200, _default: 400}, ht.fn.delay = function (t, n) {
        return t = ht.fx ? ht.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, o) {
            var i = e.setTimeout(n, t);
            o.stop = function () {
                e.clearTimeout(i)
            }
        })
    }, function () {
        var e = tt.createElement("input"), t = tt.createElement("select"),
            n = t.appendChild(tt.createElement("option"));
        e.type = "checkbox", ft.checkOn = "" !== e.value, ft.optSelected = n.selected, e = tt.createElement("input"), e.value = "t", e.type = "radio", ft.radioValue = "t" === e.value
    }();
    var yn, bn = ht.expr.attrHandle;
    ht.fn.extend({
        attr: function (e, t) {
            return At(this, ht.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                ht.removeAttr(this, e)
            })
        }
    }), ht.extend({
        attr: function (e, t, n) {
            var o, i, r = e.nodeType;
            return 3 !== r && 8 !== r && 2 !== r ? "undefined" == typeof e.getAttribute ? ht.prop(e, t, n) : (1 === r && ht.isXMLDoc(e) || (i = ht.attrHooks[t.toLowerCase()] || (ht.expr.match.bool.test(t) ? yn : void 0)), void 0 !== n ? null === n ? void ht.removeAttr(e, t) : i && "set" in i && void 0 !== (o = i.set(e, n, t)) ? o : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = ht.find.attr(e, t), null == o ? void 0 : o)) : void 0
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!ft.radioValue && "radio" === t && ht.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }, removeAttr: function (e, t) {
            var n, o = 0, i = t && t.match(_t);
            if (i && 1 === e.nodeType) for (; n = i[o++];) e.removeAttribute(n)
        }
    }), yn = {
        set: function (e, t, n) {
            return t === !1 ? ht.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, ht.each(ht.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = bn[t] || ht.find.attr;
        bn[t] = function (e, t, o) {
            var i, r, a = t.toLowerCase();
            return o || (r = bn[a], bn[a] = i, i = null != n(e, t, o) ? a : null, bn[a] = r), i
        }
    });
    var xn = /^(?:input|select|textarea|button)$/i, wn = /^(?:a|area)$/i;
    ht.fn.extend({
        prop: function (e, t) {
            return At(this, ht.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return this.each(function () {
                delete this[ht.propFix[e] || e]
            })
        }
    }), ht.extend({
        prop: function (e, t, n) {
            var o, i, r = e.nodeType;
            return 3 !== r && 8 !== r && 2 !== r ? (1 === r && ht.isXMLDoc(e) || (t = ht.propFix[t] || t, i = ht.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (o = i.set(e, n, t)) ? o : e[t] = n : i && "get" in i && null !== (o = i.get(e, t)) ? o : e[t]) : void 0
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = ht.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : xn.test(e.nodeName) || wn.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }, propFix: {"for": "htmlFor", "class": "className"}
    }), ft.optSelected || (ht.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }, set: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), ht.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        ht.propFix[this.toLowerCase()] = this
    }), ht.fn.extend({
        addClass: function (e) {
            var t, n, o, i, r, a, s, l = 0;
            if (ht.isFunction(e)) return this.each(function (t) {
                ht(this).addClass(e.call(this, t, X(this)))
            });
            if ("string" == typeof e && e) for (t = e.match(_t) || []; n = this[l++];) if (i = X(n), o = 1 === n.nodeType && " " + U(i) + " ") {
                for (a = 0; r = t[a++];) o.indexOf(" " + r + " ") < 0 && (o += r + " ");
                s = U(o), i !== s && n.setAttribute("class", s)
            }
            return this
        }, removeClass: function (e) {
            var t, n, o, i, r, a, s, l = 0;
            if (ht.isFunction(e)) return this.each(function (t) {
                ht(this).removeClass(e.call(this, t, X(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e) for (t = e.match(_t) || []; n = this[l++];) if (i = X(n), o = 1 === n.nodeType && " " + U(i) + " ") {
                for (a = 0; r = t[a++];) for (; o.indexOf(" " + r + " ") > -1;) o = o.replace(" " + r + " ", " ");
                s = U(o), i !== s && n.setAttribute("class", s)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ht.isFunction(e) ? function (n) {
                ht(this).toggleClass(e.call(this, n, X(this), t), t)
            } : function () {
                var t, o, i, r;
                if ("string" === n) for (o = 0, i = ht(this), r = e.match(_t) || []; t = r[o++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else void 0 !== e && "boolean" !== n || (t = X(this), t && Ht.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Ht.get(this, "__className__") || ""))
            })
        }, hasClass: function (e) {
            var t, n, o = 0;
            for (t = " " + e + " "; n = this[o++];) if (1 === n.nodeType && (" " + U(X(n)) + " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var Cn = /\r/g;
    ht.fn.extend({
        val: function (e) {
            var t, n, o, i = this[0];
            return arguments.length ? (o = ht.isFunction(e), this.each(function (n) {
                var i;
                1 === this.nodeType && (i = o ? e.call(this, n, ht(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : ht.isArray(i) && (i = ht.map(i, function (e) {
                    return null == e ? "" : e + ""
                })), t = ht.valHooks[this.type] || ht.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            })) : i ? (t = ht.valHooks[i.type] || ht.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(Cn, "") : null == n ? "" : n)) : void 0
        }
    }), ht.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = ht.find.attr(e, "value");
                    return null != t ? t : U(ht.text(e))
                }
            }, select: {
                get: function (e) {
                    var t, n, o, i = e.options, r = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [],
                        l = a ? r + 1 : i.length;
                    for (o = 0 > r ? l : a ? r : 0; l > o; o++) if (n = i[o], !(!n.selected && o !== r || n.disabled || n.parentNode.disabled && ht.nodeName(n.parentNode, "optgroup"))) {
                        if (t = ht(n).val(), a) return t;
                        s.push(t)
                    }
                    return s
                }, set: function (e, t) {
                    for (var n, o, i = e.options, r = ht.makeArray(t), a = i.length; a--;) o = i[a], (o.selected = ht.inArray(ht.valHooks.option.get(o), r) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), r
                }
            }
        }
    }), ht.each(["radio", "checkbox"], function () {
        ht.valHooks[this] = {
            set: function (e, t) {
                return ht.isArray(t) ? e.checked = ht.inArray(ht(e).val(), t) > -1 : void 0
            }
        }, ft.checkOn || (ht.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Tn = /^(?:focusinfocus|focusoutblur)$/;
    ht.extend(ht.event, {
        trigger: function (t, n, o, i) {
            var r, a, s, l, c, u, d, f = [o || tt], p = ct.call(t, "type") ? t.type : t,
                h = ct.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = s = o = o || tt, 3 !== o.nodeType && 8 !== o.nodeType && !Tn.test(p + ht.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."), p = h.shift(), h.sort()), c = p.indexOf(":") < 0 && "on" + p, t = t[ht.expando] ? t : new ht.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = o), n = null == n ? [t] : ht.makeArray(n, [t]), d = ht.event.special[p] || {}, i || !d.trigger || d.trigger.apply(o, n) !== !1)) {
                if (!i && !d.noBubble && !ht.isWindow(o)) {
                    for (l = d.delegateType || p, Tn.test(l + p) || (a = a.parentNode); a; a = a.parentNode) f.push(a), s = a;
                    s === (o.ownerDocument || tt) && f.push(s.defaultView || s.parentWindow || e)
                }
                for (r = 0; (a = f[r++]) && !t.isPropagationStopped();) t.type = r > 1 ? l : d.bindType || p, u = (Ht.get(a, "events") || {})[t.type] && Ht.get(a, "handle"), u && u.apply(a, n), u = c && a[c], u && u.apply && Lt(a) && (t.result = u.apply(a, n), t.result === !1 && t.preventDefault());
                return t.type = p, i || t.isDefaultPrevented() || d._default && d._default.apply(f.pop(), n) !== !1 || !Lt(o) || c && ht.isFunction(o[p]) && !ht.isWindow(o) && (s = o[c], s && (o[c] = null), ht.event.triggered = p, o[p](), ht.event.triggered = void 0, s && (o[c] = s)), t.result
            }
        }, simulate: function (e, t, n) {
            var o = ht.extend(new ht.Event, n, {type: e, isSimulated: !0});
            ht.event.trigger(o, null, t)
        }
    }), ht.fn.extend({
        trigger: function (e, t) {
            return this.each(function () {
                ht.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            return n ? ht.event.trigger(e, t, n, !0) : void 0
        }
    }), ht.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) {
        ht.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), ht.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), ft.focusin = "onfocusin" in e, ft.focusin || ht.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            ht.event.simulate(t, e.target, ht.event.fix(e))
        };
        ht.event.special[t] = {
            setup: function () {
                var o = this.ownerDocument || this, i = Ht.access(o, t);
                i || o.addEventListener(e, n, !0), Ht.access(o, t, (i || 0) + 1)
            }, teardown: function () {
                var o = this.ownerDocument || this, i = Ht.access(o, t) - 1;
                i ? Ht.access(o, t, i) : (o.removeEventListener(e, n, !0), Ht.remove(o, t))
            }
        }
    });
    var $n = e.location, kn = ht.now(), Sn = /\?/;
    ht.parseXML = function (t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (o) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || ht.error("Invalid XML: " + t), n
    };
    var En = /\[\]$/, jn = /\r?\n/g, Nn = /^(?:submit|button|image|reset|file)$/i,
        _n = /^(?:input|select|textarea|keygen)/i;
    ht.param = function (e, t) {
        var n, o = [], i = function (e, t) {
            var n = ht.isFunction(t) ? t() : t;
            o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
        };
        if (ht.isArray(e) || e.jquery && !ht.isPlainObject(e)) ht.each(e, function () {
            i(this.name, this.value)
        }); else for (n in e) V(n, e[n], t, i);
        return o.join("&")
    }, ht.fn.extend({
        serialize: function () {
            return ht.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = ht.prop(this, "elements");
                return e ? ht.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !ht(this).is(":disabled") && _n.test(this.nodeName) && !Nn.test(e) && (this.checked || !Ut.test(e))
            }).map(function (e, t) {
                var n = ht(this).val();
                return null == n ? null : ht.isArray(n) ? ht.map(n, function (e) {
                    return {name: t.name, value: e.replace(jn, "\r\n")}
                }) : {name: t.name, value: n.replace(jn, "\r\n")}
            }).get()
        }
    });
    var Dn = /%20/g, qn = /#.*$/, An = /([?&])_=[^&]*/, Ln = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Hn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Fn = /^(?:GET|HEAD)$/, On = /^\/\//, Rn = {},
        In = {}, Pn = "*/".concat("*"), Bn = tt.createElement("a");
    Bn.href = $n.href, ht.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: $n.href,
            type: "GET",
            isLocal: Hn.test($n.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Pn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": JSON.parse, "text xml": ht.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? Y(Y(e, ht.ajaxSettings), t) : Y(ht.ajaxSettings, e)
        },
        ajaxPrefilter: G(Rn),
        ajaxTransport: G(In),
        ajax: function (t, n) {
            function o(t, n, o, s) {
                var c, f, p, x, w, C = n;
                u || (u = !0, l && e.clearTimeout(l), i = void 0, a = s || "", T.readyState = t > 0 ? 4 : 0, c = t >= 200 && 300 > t || 304 === t, o && (x = J(h, T, o)), x = K(h, x, T, c), c ? (h.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (ht.lastModified[r] = w), w = T.getResponseHeader("etag"), w && (ht.etag[r] = w)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = x.state, f = x.data, p = x.error, c = !p)) : (p = C, !t && C || (C = "error", 0 > t && (t = 0))), T.status = t, T.statusText = (n || C) + "", c ? v.resolveWith(g, [f, C, T]) : v.rejectWith(g, [T, C, p]), T.statusCode(b), b = void 0, d && m.trigger(c ? "ajaxSuccess" : "ajaxError", [T, h, c ? f : p]), y.fireWith(g, [T, C]), d && (m.trigger("ajaxComplete", [T, h]), --ht.active || ht.event.trigger("ajaxStop")))
            }

            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var i, r, a, s, l, c, u, d, f, p, h = ht.ajaxSetup({}, n), g = h.context || h,
                m = h.context && (g.nodeType || g.jquery) ? ht(g) : ht.event, v = ht.Deferred(),
                y = ht.Callbacks("once memory"), b = h.statusCode || {}, x = {}, w = {}, C = "canceled", T = {
                    readyState: 0, getResponseHeader: function (e) {
                        var t;
                        if (u) {
                            if (!s) for (s = {}; t = Ln.exec(a);) s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    }, getAllResponseHeaders: function () {
                        return u ? a : null
                    }, setRequestHeader: function (e, t) {
                        return null == u && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, x[e] = t), this
                    }, overrideMimeType: function (e) {
                        return null == u && (h.mimeType = e), this
                    }, statusCode: function (e) {
                        var t;
                        if (e) if (u) T.always(e[T.status]); else for (t in e) b[t] = [b[t], e[t]];
                        return this
                    }, abort: function (e) {
                        var t = e || C;
                        return i && i.abort(t), o(0, t), this
                    }
                };
            if (v.promise(T), h.url = ((t || h.url || $n.href) + "").replace(On, $n.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(_t) || [""], null == h.crossDomain) {
                c = tt.createElement("a");
                try {
                    c.href = h.url, c.href = c.href, h.crossDomain = Bn.protocol + "//" + Bn.host != c.protocol + "//" + c.host
                } catch ($) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = ht.param(h.data, h.traditional)), Q(Rn, h, n, T), u) return T;
            d = ht.event && h.global, d && 0 === ht.active++ && ht.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Fn.test(h.type), r = h.url.replace(qn, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(Dn, "+")) : (p = h.url.slice(r.length), h.data && (r += (Sn.test(r) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (r = r.replace(An, "$1"), p = (Sn.test(r) ? "&" : "?") + "_=" + kn++ + p), h.url = r + p), h.ifModified && (ht.lastModified[r] && T.setRequestHeader("If-Modified-Since", ht.lastModified[r]), ht.etag[r] && T.setRequestHeader("If-None-Match", ht.etag[r])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", h.contentType), T.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Pn + "; q=0.01" : "") : h.accepts["*"]);
            for (f in h.headers) T.setRequestHeader(f, h.headers[f]);
            if (h.beforeSend && (h.beforeSend.call(g, T, h) === !1 || u)) return T.abort();
            if (C = "abort", y.add(h.complete), T.done(h.success), T.fail(h.error), i = Q(In, h, n, T)) {
                if (T.readyState = 1, d && m.trigger("ajaxSend", [T, h]), u) return T;
                h.async && h.timeout > 0 && (l = e.setTimeout(function () {
                    T.abort("timeout")
                }, h.timeout));
                try {
                    u = !1, i.send(x, o)
                } catch ($) {
                    if (u) throw $;
                    o(-1, $)
                }
            } else o(-1, "No Transport");
            return T
        },
        getJSON: function (e, t, n) {
            return ht.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return ht.get(e, void 0, t, "script")
        }
    }), ht.each(["get", "post"], function (e, t) {
        ht[t] = function (e, n, o, i) {
            return ht.isFunction(n) && (i = i || o, o = n, n = void 0), ht.ajax(ht.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: o
            }, ht.isPlainObject(e) && e))
        }
    }), ht._evalUrl = function (e) {
        return ht.ajax({url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0})
    }, ht.fn.extend({
        wrapAll: function (e) {
            var t;
            return this[0] && (ht.isFunction(e) && (e = e.call(this[0])), t = ht(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        }, wrapInner: function (e) {
            return this.each(ht.isFunction(e) ? function (t) {
                ht(this).wrapInner(e.call(this, t))
            } : function () {
                var t = ht(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = ht.isFunction(e);
            return this.each(function (n) {
                ht(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function (e) {
            return this.parent(e).not("body").each(function () {
                ht(this).replaceWith(this.childNodes)
            }), this
        }
    }), ht.expr.pseudos.hidden = function (e) {
        return !ht.expr.pseudos.visible(e)
    }, ht.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, ht.ajaxSettings.xhr = function () {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    };
    var Mn = {0: 200, 1223: 204}, Wn = ht.ajaxSettings.xhr();
    ft.cors = !!Wn && "withCredentials" in Wn, ft.ajax = Wn = !!Wn, ht.ajaxTransport(function (t) {
        var n, o;
        return ft.cors || Wn && !t.crossDomain ? {
            send: function (i, r) {
                var a, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (a in t.xhrFields) s[a] = t.xhrFields[a];
                t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (a in i) s.setRequestHeader(a, i[a]);
                n = function (e) {
                    return function () {
                        n && (n = o = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? r(0, "error") : r(s.status, s.statusText) : r(Mn[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {binary: s.response} : {text: s.responseText}, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), o = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = o : s.onreadystatechange = function () {
                    4 === s.readyState && e.setTimeout(function () {
                        n && o()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (l) {
                    if (n) throw l
                }
            }, abort: function () {
                n && n()
            }
        } : void 0
    }), ht.ajaxPrefilter(function (e) {
        e.crossDomain && (e.contents.script = !1)
    }), ht.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /\b(?:java|ecma)script\b/},
        converters: {
            "text script": function (e) {
                return ht.globalEval(e), e
            }
        }
    }), ht.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), ht.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function (o, i) {
                    t = ht("<script>").prop({charset: e.scriptCharset, src: e.url}).on("load error", n = function (e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                    }), tt.head.appendChild(t[0])
                }, abort: function () {
                    n && n()
                }
            }
        }
    });
    var zn = [], Un = /(=)\?(?=&|$)|\?\?/;
    ht.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = zn.pop() || ht.expando + "_" + kn++;
            return this[e] = !0, e
        }
    }), ht.ajaxPrefilter("json jsonp", function (t, n, o) {
        var i, r, a,
            s = t.jsonp !== !1 && (Un.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Un.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = ht.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Un, "$1" + i) : t.jsonp !== !1 && (t.url += (Sn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
            return a || ht.error(i + " was not called"), a[0]
        }, t.dataTypes[0] = "json", r = e[i], e[i] = function () {
            a = arguments
        }, o.always(function () {
            void 0 === r ? ht(e).removeProp(i) : e[i] = r, t[i] && (t.jsonpCallback = n.jsonpCallback, zn.push(i)), a && ht.isFunction(r) && r(a[0]), a = r = void 0
        }), "script") : void 0
    }), ft.createHTMLDocument = function () {
        var e = tt.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
    }(), ht.parseHTML = function (e, t, n) {
        if ("string" != typeof e) return [];
        "boolean" == typeof t && (n = t, t = !1);
        var o, i, r;
        return t || (ft.createHTMLDocument ? (t = tt.implementation.createHTMLDocument(""), o = t.createElement("base"), o.href = tt.location.href, t.head.appendChild(o)) : t = tt), i = Tt.exec(e), r = !n && [], i ? [t.createElement(i[1])] : (i = b([e], t, r), r && r.length && ht(r).remove(), ht.merge([], i.childNodes))
    }, ht.fn.load = function (e, t, n) {
        var o, i, r, a = this, s = e.indexOf(" ");
        return s > -1 && (o = U(e.slice(s)), e = e.slice(0, s)), ht.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && ht.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function (e) {
            r = arguments, a.html(o ? ht("<div>").append(ht.parseHTML(e)).find(o) : e)
        }).always(n && function (e, t) {
            a.each(function () {
                n.apply(this, r || [e.responseText, t, e])
            })
        }), this
    }, ht.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        ht.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), ht.expr.pseudos.animated = function (e) {
        return ht.grep(ht.timers, function (t) {
            return e === t.elem
        }).length
    }, ht.offset = {
        setOffset: function (e, t, n) {
            var o, i, r, a, s, l, c, u = ht.css(e, "position"), d = ht(e), f = {};
            "static" === u && (e.style.position = "relative"), s = d.offset(), r = ht.css(e, "top"), l = ht.css(e, "left"), c = ("absolute" === u || "fixed" === u) && (r + l).indexOf("auto") > -1, c ? (o = d.position(), a = o.top, i = o.left) : (a = parseFloat(r) || 0, i = parseFloat(l) || 0), ht.isFunction(t) && (t = t.call(e, n, ht.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : d.css(f)
        }
    }, ht.fn.extend({
        offset: function (e) {
            if (arguments.length) return void 0 === e ? this : this.each(function (t) {
                ht.offset.setOffset(this, e, t)
            });
            var t, n, o, i, r = this[0];
            return r ? r.getClientRects().length ? (o = r.getBoundingClientRect(), o.width || o.height ? (i = r.ownerDocument, n = Z(i), t = i.documentElement, {
                top: o.top + n.pageYOffset - t.clientTop,
                left: o.left + n.pageXOffset - t.clientLeft
            }) : o) : {top: 0, left: 0} : void 0
        }, position: function () {
            if (this[0]) {
                var e, t, n = this[0], o = {top: 0, left: 0};
                return "fixed" === ht.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ht.nodeName(e[0], "html") || (o = e.offset()), o = {
                    top: o.top + ht.css(e[0], "borderTopWidth", !0),
                    left: o.left + ht.css(e[0], "borderLeftWidth", !0)
                }), {
                    top: t.top - o.top - ht.css(n, "marginTop", !0),
                    left: t.left - o.left - ht.css(n, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent; e && "static" === ht.css(e, "position");) e = e.offsetParent;
                return e || Yt
            })
        }
    }), ht.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = "pageYOffset" === t;
        ht.fn[e] = function (o) {
            return At(this, function (e, o, i) {
                var r = Z(e);
                return void 0 === i ? r ? r[t] : e[o] : void (r ? r.scrollTo(n ? r.pageXOffset : i, n ? i : r.pageYOffset) : e[o] = i)
            }, e, o, arguments.length)
        }
    }), ht.each(["top", "left"], function (e, t) {
        ht.cssHooks[t] = q(ft.pixelPosition, function (e, n) {
            return n ? (n = D(e, t), sn.test(n) ? ht(e).position()[t] + "px" : n) : void 0
        })
    }), ht.each({Height: "height", Width: "width"}, function (e, t) {
        ht.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, o) {
            ht.fn[o] = function (i, r) {
                var a = arguments.length && (n || "boolean" != typeof i),
                    s = n || (i === !0 || r === !0 ? "margin" : "border");
                return At(this, function (t, n, i) {
                    var r;
                    return ht.isWindow(t) ? 0 === o.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? ht.css(t, n, s) : ht.style(t, n, i, s)
                }, t, a ? i : void 0, a)
            }
        })
    }), ht.fn.extend({
        bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, o) {
            return this.on(t, e, n, o)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), ht.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function () {
        return ht
    });
    var Xn = e.jQuery, Vn = e.$;
    return ht.noConflict = function (t) {
        return e.$ === ht && (e.$ = Vn), t && e.jQuery === ht && (e.jQuery = Xn), ht
    }, t || (e.jQuery = e.$ = ht), ht
}), !function (e, t) {
    $window = e(t), e.fn.lazyload = function (n) {
        function o() {
            var t = 0;
            i.each(function () {
                var n = e(this);
                if (!r.skip_invisible || n.is(":visible")) if (e.abovethetop(this, r) || e.leftofbegin(this, r)) ; else if (e.belowthefold(this, r) || e.rightoffold(this, r)) {
                    if (++t > r.failure_limit) return !1
                } else n.trigger("appear")
            })
        }

        var i = this, r = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: t,
            data_attribute: "original",
            skip_invisible: !0,
            appear: null,
            load: null
        };
        return n && (void 0 !== n.failurelimit && (n.failure_limit = n.failurelimit, delete n.failurelimit), void 0 !== n.effectspeed && (n.effect_speed = n.effectspeed, delete n.effectspeed), e.extend(r, n)), $container = void 0 === r.container || r.container === t ? $window : e(r.container), 0 === r.event.indexOf("scroll") && $container.bind(r.event, function () {
            return o()
        }), this.each(function () {
            var t = this, n = e(t);
            t.loaded = !1, n.one("appear", function () {
                if (!this.loaded) {
                    if (r.appear) {
                        var o = i.length;
                        r.appear.call(t, o, r)
                    }
                    e("<img />").bind("load", function () {
                        n.hide().attr("src", n.data(r.data_attribute))[r.effect](r.effect_speed), t.loaded = !0;
                        var o = e.grep(i, function (e) {
                            return !e.loaded
                        });
                        if (i = e(o), r.load) {
                            var a = i.length;
                            r.load.call(t, a, r)
                        }
                    }).attr("src", n.data(r.data_attribute))
                }
            }), 0 !== r.event.indexOf("scroll") && n.bind(r.event, function () {
                t.loaded || n.trigger("appear")
            })
        }), $window.bind("resize", function () {
            o()
        }), o(), this
    }, e.belowthefold = function (n, o) {
        var i;
        return i = void 0 === o.container || o.container === t ? $window.height() + $window.scrollTop() : $container.offset().top + $container.height(), i <= e(n).offset().top - o.threshold
    }, e.rightoffold = function (n, o) {
        var i;
        return i = void 0 === o.container || o.container === t ? $window.width() + $window.scrollLeft() : $container.offset().left + $container.width(), i <= e(n).offset().left - o.threshold
    }, e.abovethetop = function (n, o) {
        var i;
        return i = void 0 === o.container || o.container === t ? $window.scrollTop() : $container.offset().top, i >= e(n).offset().top + o.threshold + e(n).height()
    }, e.leftofbegin = function (n, o) {
        var i;
        return i = void 0 === o.container || o.container === t ? $window.scrollLeft() : $container.offset().left, i >= e(n).offset().left + o.threshold + e(n).width()
    }, e.inviewport = function (t, n) {
        return !(e.rightofscreen(t, n) || e.leftofscreen(t, n) || e.belowthefold(t, n) || e.abovethetop(t, n))
    }, e.extend(e.expr[":"], {
        "below-the-fold": function (n) {
            return e.belowthefold(n, {threshold: 0, container: t})
        }, "above-the-top": function (n) {
            return !e.belowthefold(n, {threshold: 0, container: t})
        }, "right-of-screen": function (n) {
            return e.rightoffold(n, {threshold: 0, container: t})
        }, "left-of-screen": function (n) {
            return !e.rightoffold(n, {threshold: 0, container: t})
        }, "in-viewport": function (n) {
            return !e.inviewport(n, {threshold: 0, container: t})
        }, "above-the-fold": function (n) {
            return !e.belowthefold(n, {threshold: 0, container: t})
        }, "right-of-fold": function (n) {
            return e.rightoffold(n, {threshold: 0, container: t})
        }, "left-of-fold": function (n) {
            return !e.rightoffold(n, {threshold: 0, container: t})
        }
    })
}(jQuery, window), !function (e, t) {
    function n(t, n) {
        this.element = t, this.options = e.extend({}, r, n), this._defaults = r, this._name = i, this._loader = null, this.init()
    }

    function o() {
        e[i] || (e.isLoading = function (t) {
            e("body").isLoading(t)
        })
    }

    var i = "isLoading", r = {
        position: "right",
        text: "",
        "class": "icon-refresh",
        tpl: '<span class="isloading-wrapper %wrapper%">%text%<i class="%class% icon-spin"></i></span>',
        disableSource: !0,
        disableOthers: []
    };
    n.prototype = {
        init: function () {
            e(this.element).is("body") && (this.options.position = "overlay"), this.show()
        }, show: function () {
            var n = this, o = n.options.tpl.replace("%wrapper%", " isloading-show  isloading-" + n.options.position);
            switch (o = o.replace("%class%", n.options["class"]), o = o.replace("%text%", "" !== n.options.text ? n.options.text + " " : ""), n._loader = e(o), e(n.element).is("input, textarea") && !0 === n.options.disableSource ? e(n.element).attr("disabled", "disabled") : !0 === n.options.disableSource && e(n.element).addClass("disabled"), n.options.position) {
                case"inside":
                    e(n.element).html(n._loader);
                    break;
                case"overlay":
                    var i = null;
                    if (e(n.element).is("body")) i = e('<div class="isloading-overlay" style="position:fixed; left:0; top:0; z-index: 10000; background: rgba(0,0,0,0.5); width: 100%; height: ' + e(t).height() + 'px;" />'), e("body").prepend(i), e(t).on("resize", function () {
                        i.height(e(t).height() + "px"), n._loader.css({top: e(t).height() / 2 - n._loader.outerHeight() / 2 + "px"})
                    }); else {
                        var r = e(n.element).css("position"), a = {}, s = e(n.element).outerHeight() + "px", l = "100%";
                        a = "relative" === r || "absolute" === r ? {
                            top: 0,
                            left: 0
                        } : e(n.element).position(), i = e('<div class="isloading-overlay" style="position:absolute; top: ' + a.top + "px; left: " + a.left + "px; z-index: 10000; background: rgba(0,0,0,0.5); width: " + l + "; height: " + s + ';" />'), e(n.element).prepend(i), e(t).on("resize", function () {
                            i.height(e(n.element).outerHeight() + "px"), n._loader.css({top: i.outerHeight() / 2 - n._loader.outerHeight() / 2 + "px"})
                        })
                    }
                    i.html(n._loader), n._loader.css({top: i.outerHeight() / 2 - n._loader.outerHeight() / 2 + "px"});
                    break;
                default:
                    e(n.element).after(n._loader)
            }
            n.disableOthers()
        }, hide: function () {
            "overlay" === this.options.position ? e(this.element).find(".isloading-overlay").first().remove() : (e(this._loader).remove(), e(this.element).text(e(this.element).attr("data-isloading-label"))), e(this.element).removeAttr("disabled").removeClass("disabled"), this.enableOthers()
        }, disableOthers: function () {
            e.each(this.options.disableOthers, function (t, n) {
                var o = e(n);
                o.is("button, input, textarea") ? o.attr("disabled", "disabled") : o.addClass("disabled")
            })
        }, enableOthers: function () {
            e.each(this.options.disableOthers, function (t, n) {
                var o = e(n);
                o.is("button, input, textarea") ? o.removeAttr("disabled") : o.removeClass("disabled")
            })
        }
    }, e.fn[i] = function (t) {
        return this.each(function () {
            if (t && "hide" !== t || !e.data(this, "plugin_" + i)) e.data(this, "plugin_" + i, new n(this, t)); else {
                var o = e.data(this, "plugin_" + i);
                "hide" === t ? o.hide() : o.show()
            }
        })
    }, o()
}(jQuery), $(function () {
    fixbtnsBind(), topbarUserBind(), lazyloadBind(),  payComicBind(), recommendCoverBind(), recommendLikesBind(), introLikesBind(), shieldBind(), Chapterbox()
});