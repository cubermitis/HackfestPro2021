(function (e) {
    function t(t) {
        for (var r, i, s = t[0], o = t[1], l = t[2], u = 0, g = []; u < s.length; u++) i = s[u], Object.prototype.hasOwnProperty.call(a, i) && a[i] && g.push(a[i][0]), a[i] = 0;
        for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
        d && d(t);
        while (g.length) g.shift()();
        return c.push.apply(c, l || []), n()
    }

    function n() {
        for (var e, t = 0; t < c.length; t++) {
            for (var n = c[t], r = !0, s = 1; s < n.length; s++) {
                var o = n[s];
                0 !== a[o] && (r = !1)
            }
            r && (c.splice(t--, 1), e = i(i.s = n[0]))
        }
        return e
    }
    var r = {},
        a = {
            app: 0
        },
        c = [];

    function i(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports
    }
    i.m = e, i.c = r, i.d = function (e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, i.r = function (e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, i.t = function (e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" === typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) i.d(n, r, function (t) {
                return e[t]
            }.bind(null, r));
        return n
    }, i.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e["default"]
        } : function () {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "/";
    var s = window["webpackJsonp"] = window["webpackJsonp"] || [],
        o = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var l = 0; l < s.length; l++) t(s[l]);
    var d = o;
    c.push([0, "chunk-vendors"]), n()
})({
    0: function (e, t, n) {
        e.exports = n("56d7")
    },
    "019e": function (e, t, n) {},
    "024c": function (e, t, n) {
        "use strict";
        n("7f5c")
    },
    "034f": function (e, t, n) {
        "use strict";
        n("85ec")
    },
    "0455": function (e, t, n) {
        "use strict";
        n("cb5c")
    },
    "0961": function (e, t, n) {
        "use strict";
        n("238f")
    },
    1612: function (e, t, n) {
        "use strict";
        n("540d")
    },
    "238f": function (e, t, n) {},
    "2dd3": function (e, t, n) {
        "use strict";
        n("019e")
    },
    4728: function (e, t, n) {},
    "4b78": function (e, t, n) {},
    "540d": function (e, t, n) {},
    "56d7": function (e, t, n) {
        "use strict";
        n.r(t);
        n("e260"), n("e6cf"), n("cca6"), n("a79d"), n("f9e3"), n("2dd8");
        var r = n("2b0e"),
            a = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    attrs: {
                        id: "app"
                    }
                }, [n("router-view")], 1)
            },
            c = [],
            i = {
                name: "App"
            },
            s = i,
            o = (n("034f"), n("2877")),
            l = Object(o["a"])(s, a, c, !1, null, null, null),
            d = l.exports,
            u = n("5f5b"),
            g = n("8c4f"),
            f = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    class: e.rendered_content[28]
                }, [n("Banner"), n("Navbar", {
                    attrs: {
                        rendered_content: e.rendered_content
                    }
                }), n("Carousel"), n("br"), n("br"), n("br"), n("Services", {
                    attrs: {
                        rendered_content: e.rendered_content
                    }
                }), n("Partners", {
                    attrs: {
                        rendered_content: e.rendered_content
                    }
                }), n("Certifications", {
                    attrs: {
                        rendered_content: e.rendered_content
                    }
                }), n("Footer", {
                    attrs: {
                        rendered_content: e.rendered_content
                    }
                })], 1)
            },
            p = [],
            h = n("1da1"),
            b = n("b85c"),
            m = (n("96cf"), n("38cf"), n("1276"), n("ac1f"), n("d3b7"), n("a630"), n("3ca3"), n("a434"), function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("b-carousel", {
                    attrs: {
                        align: "center",
                        interval: e.slideConfig.slideInterval,
                        controls: "",
                        indicators: "",
                        background: e.slideConfig.backgroundColor
                    },
                    model: {
                        value: e.slideConfig.slideNumber,
                        callback: function (t) {
                            e.$set(e.slideConfig, "slideNumber", t)
                        },
                        expression: "slideConfig.slideNumber"
                    }
                }, e._l(e.imageUrlList, (function (t) {
                    return n("b-carousel-slide", {
                        key: t,
                        scopedSlots: e._u([{
                            key: "img",
                            fn: function () {
                                return [n("img", {
                                    attrs: {
                                        width: "100%",
                                        src: t
                                    }
                                })]
                            },
                            proxy: !0
                        }], null, !0)
                    })
                })), 1)
            }),
            _ = [],
            v = {
                name: "Carousel",
                data: function () {
                    return {
                        imageUrlList: "/public/50e2f392-fa85-4912-a09a-da2df00a7f14.png,/public/ea671941-c615-4755-914b-2b9b57c8229c.png,/public/4435f738-8219-4af4-a50c-2e0228ce326c.png,/public/d3cc4180-f89a-4151-970b-2375caeb5f69.png,/public/50cac01e-c34e-4405-922f-66836ed5c060.png".split(","),
                        slideConfig: {
                            slideNumber: 0,
                            slideInterval: 5e3,
                            backgroundColor: "#ffffff"
                        }
                    }
                }
            },
            w = v,
            y = Object(o["a"])(w, m, _, !1, null, null, null),
            x = y.exports,
            k = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("b-navbar", {
                    class: e.rendered_content[26],
                    attrs: {
                        type: "dark"
                    }
                }, [n("b-navbar-brand", {
                    class: e.rendered_content[20],
                    attrs: {
                        href: "#"
                    }
                }, [n("span", {
                    staticClass: "orange"
                }, [e._v(">")]), e._v(" secure'nt "), n("span", {
                    staticClass: "orange"
                }, [e._v("|")]), e._v(" Secure your new technologies")]), n("b-navbar-nav", {
                    staticClass: "ml-auto"
                }, [n("b-nav-item", {
                    attrs: {
                        href: "#",
                        right: ""
                    }
                }, [e._v("Blog")]), n("b-nav-item", {
                    attrs: {
                        href: "#",
                        right: ""
                    }
                }, [e._v(e._s(e.rendered_content[24]))]), n("b-nav-item", {
                    attrs: {
                        href: "#",
                        right: ""
                    }
                }, [e._v("Career")]), n("b-nav-item-dropdown", {
                    attrs: {
                        text: e.rendered_content[29],
                        right: ""
                    }
                }, [n("b-dropdown-item", {
                    attrs: {
                        href: "#"
                    }
                }, [e._v("EN")]), n("b-dropdown-item", {
                    attrs: {
                        href: "#"
                    }
                }, [e._v("FR")]), n("b-dropdown-item", {
                    attrs: {
                        href: "#"
                    }
                }, [e._v("ES")]), n("b-dropdown-item", {
                    attrs: {
                        href: "#"
                    }
                }, [e._v("JP")]), n("b-dropdown-item", {
                    attrs: {
                        href: "#"
                    }
                }, [e._v("RU")])], 1)], 1)], 1)
            },
            C = [],
            O = {
                name: "Navbar",
                props: ["rendered_content"]
            },
            T = O,
            j = (n("e0a6"), Object(o["a"])(T, k, C, !1, null, "61d7ef16", null)),
            P = j.exports,
            S = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("b-row", [n("b-col", {
                    attrs: {
                        "offset-sm": "2",
                        sm: "8"
                    }
                }, [n("h2", {
                    class: e.rendered_content[21],
                    staticStyle: {
                        "font-weight": "bold"
                    }
                }, [e._v(" Our services ")]), n("b-row", [n("b-col", [n("b-card", {
                    class: e.rendered_content[22],
                    attrs: {
                        align: "center",
                        title: "Cloud configuration hardening"
                    }
                }, [n("img", {
                    attrs: {
                        height: "100px",
                        src: e.rendered_content[18]
                    }
                }), n("p", {
                    class: e.rendered_content[23]
                }, [e._v(" We're CEH certified and we're pretty good with Linux so it should be fine ")])])], 1), n("b-col", [n("b-card", {
                    class: e.rendered_content[22],
                    attrs: {
                        align: "center",
                        title: "Security by obscurity"
                    }
                }, [n("img", {
                    attrs: {
                        height: "100px",
                        src: e.rendered_content[1]
                    }
                }), n("p", {
                    class: e.rendered_content[23]
                }, [e._v(" If nobody can figure out how your infrastructure works, then it's secure by design ")])])], 1), n("b-col", [n("b-card", {
                    class: e.rendered_content[22],
                    attrs: {
                        align: "center",
                        title: "Hidding your deepest secrets"
                    }
                }, [n("img", {
                    attrs: {
                        height: "100px",
                        src: e.rendered_content[19]
                    }
                }), n("p", {
                    class: e.rendered_content[23]
                }, [e._v(" We can put all your secrets in a place were hackers aren't supposed to go ")])])], 1)], 1), n("br"), n("hr"), n("br")], 1)], 1)
            },
            I = [],
            E = {
                name: "Services",
                props: ["rendered_content"]
            },
            M = E,
            N = (n("7b7c"), Object(o["a"])(M, S, I, !1, null, "4fa7c6b4", null)),
            $ = N.exports,
            R = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("b-row", [n("b-col", {
                    attrs: {
                        "offset-sm": "2",
                        sm: "8"
                    }
                }, [n("h2", {
                    class: e.rendered_content[21],
                    staticStyle: {
                        "font-weight": "bold"
                    }
                }, [e._v(" They trust us ")]), n("center", [n("img", {
                    staticClass: "partner-logo",
                    attrs: {
                        width: "200px",
                        src: e.rendered_content[14]
                    }
                }), n("img", {
                    staticClass: "partner-logo",
                    attrs: {
                        width: "200px",
                        src: e.rendered_content[15]
                    }
                }), n("img", {
                    staticClass: "partner-logo",
                    attrs: {
                        width: "200px",
                        src: e.rendered_content[16]
                    }
                }), n("img", {
                    staticClass: "partner-logo",
                    attrs: {
                        width: "200px",
                        src: e.rendered_content[17]
                    }
                }), n("img", {
                    staticClass: "partner-logo",
                    attrs: {
                        width: "200px",
                        src: e.rendered_content[0]
                    }
                })]), n("br"), n("hr"), n("br")], 1)], 1)
            },
            D = [],
            F = {
                name: "Partners",
                props: ["rendered_content"]
            },
            U = F,
            A = (n("0961"), Object(o["a"])(U, R, D, !1, null, "0e16d9ca", null)),
            K = A.exports,
            B = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("b-row", [n("b-col", {
                    attrs: {
                        "offset-sm": "2",
                        sm: "8"
                    }
                }, [n("h2", {
                    class: e.rendered_content[21],
                    staticStyle: {
                        "font-weight": "bold"
                    }
                }, [e._v(" Our certifications ")]), n("center", [n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[3]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[4]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[2]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[5]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[6]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[7]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[8]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[9]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[10]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[11]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[12]
                    }
                }), n("img", {
                    attrs: {
                        width: "100px",
                        height: "100px",
                        src: e.rendered_content[13]
                    }
                })]), n("br"), n("br"), n("br")], 1)], 1)
            },
            H = [],
            W = {
                name: "Certifications",
                props: ["rendered_content"]
            },
            J = W,
            L = (n("8eab"), Object(o["a"])(J, B, H, !1, null, "183ee00e", null)),
            z = L.exports,
            q = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    class: e.rendered_content[27]
                }, [n("b-row", [n("b-col", {
                    attrs: {
                        "offset-sm": "2",
                        sm: "8"
                    }
                }, [n("p", {
                    staticClass: "footer-text"
                }, [e._v(e._s(e.rendered_content[25]))])])], 1)], 1)
            },
            G = [],
            Y = {
                name: "Footer",
                props: ["rendered_content"]
            },
            Q = Y,
            V = (n("0455"), Object(o["a"])(Q, q, G, !1, null, "34fcdd1c", null)),
            X = V.exports,
            Z = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", [n("b-alert", {
                    staticClass: "no-margin",
                    attrs: {
                        show: "",
                        variant: "danger",
                        dismissible: ""
                    }
                }, [e._v("secure'nt is a resilient company, and that is why we are proud to announce that, even after the terrible hack of June 19th, we are back in business and ready to help you scale your cloud infrastructure. We have fixed the bug and implemented monitoring measures, but we are still in the process of cleaning up the Website defacement. If you notice any visual glitches, please contact a secure'nt administrator at junk@" + e._s(e.domainName) + ".")])], 1)
            },
            ee = [],
            te = {
                name: "Banner",
                data: function () {
                    return {
                        domainName: "daxnbrain.hfctf.ca"
                    }
                }
            },
            ne = te,
            re = (n("911b"), Object(o["a"])(ne, Z, ee, !1, null, "29f1add8", null)),
            ae = re.exports,
            ce = {
                name: "Index",
                components: {
                    Carousel: x,
                    Navbar: P,
                    Services: $,
                    Partners: K,
                    Certifications: z,
                    Footer: X,
                    Banner: ae
                },
                data: function () {
                    return {
                        original_content: ["/images/original/twelve.png", "/images/original/service2.png", "/images/original/cert3.png", "/images/original/cert1.png", "/images/original/cert2.png", "/images/original/cert4.png", "/images/original/cert5.png", "/images/original/cert6.png", "/images/original/cert7.png", "/images/original/cert8.png", "/images/original/cert9.png", "/images/original/cert10.png", "/images/original/cert11.png", "/images/original/cert12.png", "/images/original/adblock.png", "/images/original/ds9.png", "/images/original/oaa.png", "/images/original/starfleet.png", "/images/original/service1.png", "/images/original/service3.png", "company-name", "", "", "", "Contact", "CopyrightÂ© 2021 secure'nt, Inc.", "header", "footer", "", "Language"],
                        glitched_content: ["/images/glitch/twelve.png", "/images/glitch/service2.png", "/images/glitch/cert3.png", "/images/glitch/cert1.png", "/images/glitch/cert2.png", "/images/glitch/cert4.png", "/images/glitch/cert5.png", "/images/glitch/cert6.png", "/images/glitch/cert7.png", "/images/glitch/cert8.png", "/images/glitch/cert9.png", "/images/glitch/cert10.png", "/images/glitch/cert11.png", "/images/glitch/cert12.png", "/images/glitch/adblock.png", "/images/glitch/ds9.png", "/images/glitch/oaa.png", "/images/glitch/starfleet.png", "/images/glitch/service1.png", "/images/glitch/service3.png", "glitch20", "glitch21", "glitch22", "glitch23", "K".repeat(101 * Math.random()), "Y".repeat(101 * Math.random()), "glitch26", "glitch27", "glitch28", "F".repeat(101 * Math.random())],
                        rendered_content: []
                    }
                },
                methods: {
                    getTokenFromHash: function (e) {
                        var t, n = location.hash.substring(1),
                            r = {},
                            a = Object(b["a"])(n.split("&"));
                        try {
                            for (a.s(); !(t = a.n()).done;) {
                                var c = t.value,
                                    i = c.split("=");
                                r[i[0]] = i[1]
                            }
                        } catch (s) {
                            a.e(s)
                        } finally {
                            a.f()
                        }
                        return r["".concat(e, "_token")] ? r["".concat(e, "_token")] : void 0
                    },
                    handleRedirection: function () {
                        var e = this.getTokenFromHash("access"),
                            t = this.getTokenFromHash("id");
                        t && localStorage.setItem("id_token", t), e && (localStorage.setItem("access_token", e), this.$router.push({
                            name: "Monitor"
                        }))
                    },
                    sleep: function (e) {
                        return new Promise((function (t) {
                            return setTimeout(t, e)
                        }))
                    },
                    getRandomIntInclusive: function (e, t) {
                        return e = Math.ceil(e), t = Math.floor(t), Math.floor(Math.random() * (t - e + 1) + e)
                    },
                    generateRenderedContent: function () {
                        var e = this;
                        return Object(h["a"])(regeneratorRuntime.mark((function t() {
                            var n, r;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                case 0:
                                    n = 0, e.rendered_content = Array.from(e.original_content);
                                case 2:
                                    if (0 !== n) {
                                        t.next = 9;
                                        break
                                    }
                                    return r = Math.round(Math.random() * e.rendered_content.length - 1), Math.random() < .5 ? e.rendered_content.splice(r, 1, e.glitched_content[r]) : e.rendered_content.splice(r, 1, e.original_content[r]), t.next = 7, e.sleep(e.getRandomIntInclusive(1e3, 2e3));
                                case 7:
                                    t.next = 2;
                                    break;
                                case 9:
                                case "end":
                                    return t.stop()
                                }
                            }), t)
                        })))()
                    }
                },
                created: function () {
                    this.handleRedirection(), this.generateRenderedContent()
                }
            },
            ie = ce,
            se = (n("024c"), Object(o["a"])(ie, f, p, !1, null, null, null)),
            oe = se.exports,
            le = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", [n("Navbar"), n("b-tabs", {
                    attrs: {
                        fill: ""
                    }
                }, [n("KanbanTab"), n("AwsTab"), n("DecryptorTab")], 1)], 1)
            },
            de = [],
            ue = (n("99af"), n("a15b"), function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("b-tab", {
                    attrs: {
                        title: "AWS Monitoring Dashboard"
                    }
                }, [n("iframe", {
                    attrs: {
                        src: e.dashboard_url,
                        width: "100%",
                        height: "100%"
                    }
                })])
            }),
            ge = [],
            fe = n("bc3a"),
            pe = n.n(fe),
            he = {
                name: "AwsTab",
                data: function () {
                    return {
                        dashboard_url: ""
                    }
                },
                methods: {
                    getDashboardUrl: function () {
                        var e = this;
                        pe.a.get("/api/dashboard_url").then((function (t) {
                            e.dashboard_url = t.data.dashboard_url
                        })).catch((function (e) {
                            console.log(e)
                        }))
                    }
                },
                created: function () {
                    this.getDashboardUrl()
                }
            },
            be = he,
            me = (n("adc7"), Object(o["a"])(be, ue, ge, !1, null, "810f0b30", null)),
            _e = me.exports,
            ve = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("b-tab", {
                    attrs: {
                        title: "Kanban Board"
                    }
                }, [n("div", {
                    staticClass: "margin"
                }, [n("b-row", [n("div", {
                    staticClass: "spacer-100"
                })]), n("b-row", [n("b-col", {
                    attrs: {
                        cols: "4"
                    }
                }, [n("b-card", {
                    attrs: {
                        header: "To do"
                    }
                }, e._l(e.toDoTasks, (function (t) {
                    return n("div", {
                        key: t.id
                    }, [n("b-card", [e._v(e._s(t.description))]), n("br")], 1)
                })), 0)], 1), n("b-col", {
                    attrs: {
                        cols: "4"
                    }
                }, [n("b-card", {
                    attrs: {
                        header: "In progress"
                    }
                }, e._l(e.inProgressTasks, (function (t) {
                    return n("div", {
                        key: t.id
                    }, [n("b-card", [e._v(e._s(t.description))]), n("br")], 1)
                })), 0)], 1), n("b-col", {
                    attrs: {
                        cols: "4"
                    }
                }, [n("b-card", {
                    attrs: {
                        header: "Done"
                    }
                }, e._l(e.doneTasks, (function (t) {
                    return n("div", {
                        key: t.id
                    }, [n("b-card", [e._v(e._s(t.description))]), n("br")], 1)
                })), 0)], 1)], 1)], 1)])
            },
            we = [],
            ye = {
                name: "KanbanTab",
                data: function () {
                    return {
                        kanbanTasks: []
                    }
                },
                computed: {
                    toDoTasks: function () {
                        var e, t = [],
                            n = Object(b["a"])(this.kanbanTasks);
                        try {
                            for (n.s(); !(e = n.n()).done;) {
                                var r = e.value;
                                "TO_DO" === r.status && t.push(r)
                            }
                        } catch (a) {
                            n.e(a)
                        } finally {
                            n.f()
                        }
                        return t
                    },
                    inProgressTasks: function () {
                        var e, t = [],
                            n = Object(b["a"])(this.kanbanTasks);
                        try {
                            for (n.s(); !(e = n.n()).done;) {
                                var r = e.value;
                                "IN_PROGRESS" === r.status && t.push(r)
                            }
                        } catch (a) {
                            n.e(a)
                        } finally {
                            n.f()
                        }
                        return t
                    },
                    doneTasks: function () {
                        var e, t = [],
                            n = Object(b["a"])(this.kanbanTasks);
                        try {
                            for (n.s(); !(e = n.n()).done;) {
                                var r = e.value;
                                "DONE" === r.status && t.push(r)
                            }
                        } catch (a) {
                            n.e(a)
                        } finally {
                            n.f()
                        }
                        return t
                    }
                },
                methods: {
                    getKanbanTasks: function () {
                        var e = this;
                        pe.a.get("/api/kanban_tasks").then((function (t) {
                            e.kanbanTasks = t.data
                        })).catch((function (e) {
                            console.log(e)
                        }))
                    }
                },
                created: function () {
                    this.getKanbanTasks()
                }
            },
            xe = ye,
            ke = (n("ba62"), Object(o["a"])(xe, ve, we, !1, null, "3bf57410", null)),
            Ce = ke.exports,
            Oe = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("b-tab", {
                    attrs: {
                        title: "Decryptor"
                    }
                }, [n("iframe", {
                    attrs: {
                        src: "/decryptor/index.html",
                        width: "100%",
                        height: "100%"
                    }
                })])
            },
            Te = [],
            je = {
                name: "DecryptorTab"
            },
            Pe = je,
            Se = (n("2dd3"), Object(o["a"])(Pe, Oe, Te, !1, null, "7fae6d5c", null)),
            Ie = Se.exports,
            Ee = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("b-navbar", {
                    staticClass: "header",
                    attrs: {
                        type: "dark"
                    }
                }, [n("b-navbar-brand", {
                    staticClass: "company-name",
                    attrs: {
                        href: "#"
                    }
                }, [n("span", {
                    staticClass: "orange"
                }, [e._v(">")]), e._v(" secure'nt "), n("span", {
                    staticClass: "orange"
                }, [e._v("|")]), e._v(" Secure your new technologies")])], 1)
            },
            Me = [],
            Ne = {
                name: "Navbar"
            },
            $e = Ne,
            Re = (n("1612"), Object(o["a"])($e, Ee, Me, !1, null, "2f0329c1", null)),
            De = Re.exports,
            Fe = {
                name: "Monitor",
                components: {
                    AwsTab: _e,
                    KanbanTab: Ce,
                    DecryptorTab: Ie,
                    Navbar: De
                },
                data: function () {
                    return {
                        userPoolDomain: "hf2021-securent",
                        userPoolRegion: "us-east-1",
                        userPoolClientId: "4inro09ih43ngggceg9rpk4bk5",
                        cognitoIdentityPoolId: "us-east-1:136662d5-3980-434c-ae70-864bea48006c",
                        userPoolClientResponseType: "token",
                        userPoolClientScope: ["openid"]
                    }
                },
                computed: {
                    redirectUrl: function () {
                        return encodeURIComponent(location.origin)
                    },
                    cognitoUrl: function () {
                        return "https://".concat(this.userPoolDomain, ".auth.").concat(this.userPoolRegion, ".amazoncognito.com/login?client_id=").concat(this.userPoolClientId, "&response_type=").concat(this.userPoolClientResponseType, "&scope=").concat(this.userPoolClientScope.join("+"), "&redirect_uri=").concat(this.redirectUrl)
                    }
                },
                created: function () {
                    var e = this;
                    pe.a.interceptors.request.use((function (e) {
                        var t = localStorage.getItem("access_token");
                        return t && (e.headers["Authorization"] = "Bearer ".concat(t)), e
                    }), (function (e) {
                        return Promise.reject(e)
                    })), pe.a.interceptors.response.use((function (e) {
                        return e
                    }), (function (t) {
                        return 401 !== t.response.status && 422 !== t.response.status || (location.href = e.cognitoUrl), Promise.reject(t)
                    }))
                }
            },
            Ue = Fe,
            Ae = Object(o["a"])(Ue, le, de, !1, null, null, null),
            Ke = Ae.exports,
            Be = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", [n("center", [n("h1", [n("b-img", {
                    staticClass: "offset",
                    attrs: {
                        height: "50px",
                        src: "/images/favicon.png"
                    }
                }), e._v("404 - Not Found ")], 1)])], 1)
            },
            He = [],
            We = {
                name: "NotFound"
            },
            Je = We,
            Le = (n("697a"), Object(o["a"])(Je, Be, He, !1, null, "9ef8e418", null)),
            ze = Le.exports;
        r["default"].config.productionTip = !1, r["default"].use(u["a"]), r["default"].use(g["a"]);
        var qe = [{
                path: "/",
                name: "Index",
                component: oe
            }, {
                path: "/monitor",
                name: "Monitor",
                component: Ke
            }, {
                path: "*",
                name: "NotFound",
                component: ze
            }],
            Ge = new g["a"]({
                routes: qe,
                mode: "history"
            });
        new r["default"]({
            router: Ge,
            render: function (e) {
                return e(d)
            }
        }).$mount("#app")
    },
    6560: function (e, t, n) {},
    "697a": function (e, t, n) {
        "use strict";
        n("6560")
    },
    "741a": function (e, t, n) {},
    "7b7c": function (e, t, n) {
        "use strict";
        n("741a")
    },
    "7f5c": function (e, t, n) {},
    "85ec": function (e, t, n) {},
    "8eab": function (e, t, n) {
        "use strict";
        n("bc4e")
    },
    "911b": function (e, t, n) {
        "use strict";
        n("9f9d")
    },
    "9c69": function (e, t, n) {},
    "9f9d": function (e, t, n) {},
    adc7: function (e, t, n) {
        "use strict";
        n("4728")
    },
    ba62: function (e, t, n) {
        "use strict";
        n("9c69")
    },
    bc4e: function (e, t, n) {},
    cb5c: function (e, t, n) {},
    e0a6: function (e, t, n) {
        "use strict";
        n("4b78")
    }
});
