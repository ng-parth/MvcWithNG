(function () { var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, d = e.filter, g = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, _ = Object.keys, j = i.bind, w = function (n) { return n instanceof w ? n : this instanceof w ? (this._wrapped = n, void 0) : new w(n) }; "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = w), exports._ = w) : n._ = w, w.VERSION = "1.4.4"; var A = w.each = w.forEach = function (n, t, e) { if (null != n) if (s && n.forEach === s) n.forEach(t, e); else if (n.length === +n.length) { for (var u = 0, i = n.length; i > u; u++) if (t.call(e, n[u], u, n) === r) return } else for (var a in n) if (w.has(n, a) && t.call(e, n[a], a, n) === r) return }; w.map = w.collect = function (n, t, r) { var e = []; return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function (n, u, i) { e[e.length] = t.call(r, n, u, i) }), e) }; var O = "Reduce of empty array with no initial value"; w.reduce = w.foldl = w.inject = function (n, t, r, e) { var u = arguments.length > 2; if (null == n && (n = []), h && n.reduce === h) return e && (t = w.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t); if (A(n, function (n, i, a) { u ? r = t.call(e, r, n, i, a) : (r = n, u = !0) }), !u) throw new TypeError(O); return r }, w.reduceRight = w.foldr = function (n, t, r, e) { var u = arguments.length > 2; if (null == n && (n = []), v && n.reduceRight === v) return e && (t = w.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t); var i = n.length; if (i !== +i) { var a = w.keys(n); i = a.length } if (A(n, function (o, c, l) { c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0) }), !u) throw new TypeError(O); return r }, w.find = w.detect = function (n, t, r) { var e; return E(n, function (n, u, i) { return t.call(r, n, u, i) ? (e = n, !0) : void 0 }), e }, w.filter = w.select = function (n, t, r) { var e = []; return null == n ? e : d && n.filter === d ? n.filter(t, r) : (A(n, function (n, u, i) { t.call(r, n, u, i) && (e[e.length] = n) }), e) }, w.reject = function (n, t, r) { return w.filter(n, function (n, e, u) { return !t.call(r, n, e, u) }, r) }, w.every = w.all = function (n, t, e) { t || (t = w.identity); var u = !0; return null == n ? u : g && n.every === g ? n.every(t, e) : (A(n, function (n, i, a) { return (u = u && t.call(e, n, i, a)) ? void 0 : r }), !!u) }; var E = w.some = w.any = function (n, t, e) { t || (t = w.identity); var u = !1; return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function (n, i, a) { return u || (u = t.call(e, n, i, a)) ? r : void 0 }), !!u) }; w.contains = w.include = function (n, t) { return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : E(n, function (n) { return n === t }) }, w.invoke = function (n, t) { var r = o.call(arguments, 2), e = w.isFunction(t); return w.map(n, function (n) { return (e ? t : n[t]).apply(n, r) }) }, w.pluck = function (n, t) { return w.map(n, function (n) { return n[t] }) }, w.where = function (n, t, r) { return w.isEmpty(t) ? r ? null : [] : w[r ? "find" : "filter"](n, function (n) { for (var r in t) if (t[r] !== n[r]) return !1; return !0 }) }, w.findWhere = function (n, t) { return w.where(n, t, !0) }, w.max = function (n, t, r) { if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) return Math.max.apply(Math, n); if (!t && w.isEmpty(n)) return -1 / 0; var e = { computed: -1 / 0, value: -1 / 0 }; return A(n, function (n, u, i) { var a = t ? t.call(r, n, u, i) : n; a >= e.computed && (e = { value: n, computed: a }) }), e.value }, w.min = function (n, t, r) { if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) return Math.min.apply(Math, n); if (!t && w.isEmpty(n)) return 1 / 0; var e = { computed: 1 / 0, value: 1 / 0 }; return A(n, function (n, u, i) { var a = t ? t.call(r, n, u, i) : n; e.computed > a && (e = { value: n, computed: a }) }), e.value }, w.shuffle = function (n) { var t, r = 0, e = []; return A(n, function (n) { t = w.random(r++), e[r - 1] = e[t], e[t] = n }), e }; var k = function (n) { return w.isFunction(n) ? n : function (t) { return t[n] } }; w.sortBy = function (n, t, r) { var e = k(t); return w.pluck(w.map(n, function (n, t, u) { return { value: n, index: t, criteria: e.call(r, n, t, u) } }).sort(function (n, t) { var r = n.criteria, e = t.criteria; if (r !== e) { if (r > e || r === void 0) return 1; if (e > r || e === void 0) return -1 } return n.index < t.index ? -1 : 1 }), "value") }; var F = function (n, t, r, e) { var u = {}, i = k(t || w.identity); return A(n, function (t, a) { var o = i.call(r, t, a, n); e(u, o, t) }), u }; w.groupBy = function (n, t, r) { return F(n, t, r, function (n, t, r) { (w.has(n, t) ? n[t] : n[t] = []).push(r) }) }, w.countBy = function (n, t, r) { return F(n, t, r, function (n, t) { w.has(n, t) || (n[t] = 0), n[t]++ }) }, w.sortedIndex = function (n, t, r, e) { r = null == r ? w.identity : k(r); for (var u = r.call(e, t), i = 0, a = n.length; a > i;) { var o = i + a >>> 1; u > r.call(e, n[o]) ? i = o + 1 : a = o } return i }, w.toArray = function (n) { return n ? w.isArray(n) ? o.call(n) : n.length === +n.length ? w.map(n, w.identity) : w.values(n) : [] }, w.size = function (n) { return null == n ? 0 : n.length === +n.length ? n.length : w.keys(n).length }, w.first = w.head = w.take = function (n, t, r) { return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t) }, w.initial = function (n, t, r) { return o.call(n, 0, n.length - (null == t || r ? 1 : t)) }, w.last = function (n, t, r) { return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0)) }, w.rest = w.tail = w.drop = function (n, t, r) { return o.call(n, null == t || r ? 1 : t) }, w.compact = function (n) { return w.filter(n, w.identity) }; var R = function (n, t, r) { return A(n, function (n) { w.isArray(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n) }), r }; w.flatten = function (n, t) { return R(n, t, []) }, w.without = function (n) { return w.difference(n, o.call(arguments, 1)) }, w.uniq = w.unique = function (n, t, r, e) { w.isFunction(t) && (e = r, r = t, t = !1); var u = r ? w.map(n, r, e) : n, i = [], a = []; return A(u, function (r, e) { (t ? e && a[a.length - 1] === r : w.contains(a, r)) || (a.push(r), i.push(n[e])) }), i }, w.union = function () { return w.uniq(c.apply(e, arguments)) }, w.intersection = function (n) { var t = o.call(arguments, 1); return w.filter(w.uniq(n), function (n) { return w.every(t, function (t) { return w.indexOf(t, n) >= 0 }) }) }, w.difference = function (n) { var t = c.apply(e, o.call(arguments, 1)); return w.filter(n, function (n) { return !w.contains(t, n) }) }, w.zip = function () { for (var n = o.call(arguments), t = w.max(w.pluck(n, "length")), r = Array(t), e = 0; t > e; e++) r[e] = w.pluck(n, "" + e); return r }, w.object = function (n, t) { if (null == n) return {}; for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1]; return r }, w.indexOf = function (n, t, r) { if (null == n) return -1; var e = 0, u = n.length; if (r) { if ("number" != typeof r) return e = w.sortedIndex(n, t), n[e] === t ? e : -1; e = 0 > r ? Math.max(0, u + r) : r } if (y && n.indexOf === y) return n.indexOf(t, r); for (; u > e; e++) if (n[e] === t) return e; return -1 }, w.lastIndexOf = function (n, t, r) { if (null == n) return -1; var e = null != r; if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t); for (var u = e ? r : n.length; u--;) if (n[u] === t) return u; return -1 }, w.range = function (n, t, r) { 1 >= arguments.length && (t = n || 0, n = 0), r = arguments[2] || 1; for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = Array(e) ; e > u;) i[u++] = n, n += r; return i }, w.bind = function (n, t) { if (n.bind === j && j) return j.apply(n, o.call(arguments, 1)); var r = o.call(arguments, 2); return function () { return n.apply(t, r.concat(o.call(arguments))) } }, w.partial = function (n) { var t = o.call(arguments, 1); return function () { return n.apply(this, t.concat(o.call(arguments))) } }, w.bindAll = function (n) { var t = o.call(arguments, 1); return 0 === t.length && (t = w.functions(n)), A(t, function (t) { n[t] = w.bind(n[t], n) }), n }, w.memoize = function (n, t) { var r = {}; return t || (t = w.identity), function () { var e = t.apply(this, arguments); return w.has(r, e) ? r[e] : r[e] = n.apply(this, arguments) } }, w.delay = function (n, t) { var r = o.call(arguments, 2); return setTimeout(function () { return n.apply(null, r) }, t) }, w.defer = function (n) { return w.delay.apply(w, [n, 1].concat(o.call(arguments, 1))) }, w.throttle = function (n, t) { var r, e, u, i, a = 0, o = function () { a = new Date, u = null, i = n.apply(r, e) }; return function () { var c = new Date, l = t - (c - a); return r = this, e = arguments, 0 >= l ? (clearTimeout(u), u = null, a = c, i = n.apply(r, e)) : u || (u = setTimeout(o, l)), i } }, w.debounce = function (n, t, r) { var e, u; return function () { var i = this, a = arguments, o = function () { e = null, r || (u = n.apply(i, a)) }, c = r && !e; return clearTimeout(e), e = setTimeout(o, t), c && (u = n.apply(i, a)), u } }, w.once = function (n) { var t, r = !1; return function () { return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t) } }, w.wrap = function (n, t) { return function () { var r = [n]; return a.apply(r, arguments), t.apply(this, r) } }, w.compose = function () { var n = arguments; return function () { for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [n[r].apply(this, t)]; return t[0] } }, w.after = function (n, t) { return 0 >= n ? t() : function () { return 1 > --n ? t.apply(this, arguments) : void 0 } }, w.keys = _ || function (n) { if (n !== Object(n)) throw new TypeError("Invalid object"); var t = []; for (var r in n) w.has(n, r) && (t[t.length] = r); return t }, w.values = function (n) { var t = []; for (var r in n) w.has(n, r) && t.push(n[r]); return t }, w.pairs = function (n) { var t = []; for (var r in n) w.has(n, r) && t.push([r, n[r]]); return t }, w.invert = function (n) { var t = {}; for (var r in n) w.has(n, r) && (t[n[r]] = r); return t }, w.functions = w.methods = function (n) { var t = []; for (var r in n) w.isFunction(n[r]) && t.push(r); return t.sort() }, w.extend = function (n) { return A(o.call(arguments, 1), function (t) { if (t) for (var r in t) n[r] = t[r] }), n }, w.pick = function (n) { var t = {}, r = c.apply(e, o.call(arguments, 1)); return A(r, function (r) { r in n && (t[r] = n[r]) }), t }, w.omit = function (n) { var t = {}, r = c.apply(e, o.call(arguments, 1)); for (var u in n) w.contains(r, u) || (t[u] = n[u]); return t }, w.defaults = function (n) { return A(o.call(arguments, 1), function (t) { if (t) for (var r in t) null == n[r] && (n[r] = t[r]) }), n }, w.clone = function (n) { return w.isObject(n) ? w.isArray(n) ? n.slice() : w.extend({}, n) : n }, w.tap = function (n, t) { return t(n), n }; var I = function (n, t, r, e) { if (n === t) return 0 !== n || 1 / n == 1 / t; if (null == n || null == t) return n === t; n instanceof w && (n = n._wrapped), t instanceof w && (t = t._wrapped); var u = l.call(n); if (u != l.call(t)) return !1; switch (u) { case "[object String]": return n == t + ""; case "[object Number]": return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t; case "[object Date]": case "[object Boolean]": return +n == +t; case "[object RegExp]": return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase } if ("object" != typeof n || "object" != typeof t) return !1; for (var i = r.length; i--;) if (r[i] == n) return e[i] == t; r.push(n), e.push(t); var a = 0, o = !0; if ("[object Array]" == u) { if (a = n.length, o = a == t.length) for (; a-- && (o = I(n[a], t[a], r, e)) ;); } else { var c = n.constructor, f = t.constructor; if (c !== f && !(w.isFunction(c) && c instanceof c && w.isFunction(f) && f instanceof f)) return !1; for (var s in n) if (w.has(n, s) && (a++, !(o = w.has(t, s) && I(n[s], t[s], r, e)))) break; if (o) { for (s in t) if (w.has(t, s) && !a--) break; o = !a } } return r.pop(), e.pop(), o }; w.isEqual = function (n, t) { return I(n, t, [], []) }, w.isEmpty = function (n) { if (null == n) return !0; if (w.isArray(n) || w.isString(n)) return 0 === n.length; for (var t in n) if (w.has(n, t)) return !1; return !0 }, w.isElement = function (n) { return !(!n || 1 !== n.nodeType) }, w.isArray = x || function (n) { return "[object Array]" == l.call(n) }, w.isObject = function (n) { return n === Object(n) }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (n) { w["is" + n] = function (t) { return l.call(t) == "[object " + n + "]" } }), w.isArguments(arguments) || (w.isArguments = function (n) { return !(!n || !w.has(n, "callee")) }), "function" != typeof /./ && (w.isFunction = function (n) { return "function" == typeof n }), w.isFinite = function (n) { return isFinite(n) && !isNaN(parseFloat(n)) }, w.isNaN = function (n) { return w.isNumber(n) && n != +n }, w.isBoolean = function (n) { return n === !0 || n === !1 || "[object Boolean]" == l.call(n) }, w.isNull = function (n) { return null === n }, w.isUndefined = function (n) { return n === void 0 }, w.has = function (n, t) { return f.call(n, t) }, w.noConflict = function () { return n._ = t, this }, w.identity = function (n) { return n }, w.times = function (n, t, r) { for (var e = Array(n), u = 0; n > u; u++) e[u] = t.call(r, u); return e }, w.random = function (n, t) { return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1)) }; var M = { escape: { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;" } }; M.unescape = w.invert(M.escape); var S = { escape: RegExp("[" + w.keys(M.escape).join("") + "]", "g"), unescape: RegExp("(" + w.keys(M.unescape).join("|") + ")", "g") }; w.each(["escape", "unescape"], function (n) { w[n] = function (t) { return null == t ? "" : ("" + t).replace(S[n], function (t) { return M[n][t] }) } }), w.result = function (n, t) { if (null == n) return null; var r = n[t]; return w.isFunction(r) ? r.call(n) : r }, w.mixin = function (n) { A(w.functions(n), function (t) { var r = w[t] = n[t]; w.prototype[t] = function () { var n = [this._wrapped]; return a.apply(n, arguments), D.call(this, r.apply(w, n)) } }) }; var N = 0; w.uniqueId = function (n) { var t = ++N + ""; return n ? n + t : t }, w.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g }; var T = /(.)^/, q = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "	": "t", "\u2028": "u2028", "\u2029": "u2029" }, B = /\\|'|\r|\n|\t|\u2028|\u2029/g; w.template = function (n, t, r) { var e; r = w.defaults({}, r, w.templateSettings); var u = RegExp([(r.escape || T).source, (r.interpolate || T).source, (r.evaluate || T).source].join("|") + "|$", "g"), i = 0, a = "__p+='"; n.replace(u, function (t, r, e, u, o) { return a += n.slice(i, o).replace(B, function (n) { return "\\" + q[n] }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n"; try { e = Function(r.variable || "obj", "_", a) } catch (o) { throw o.source = a, o } if (t) return e(t, w); var c = function (n) { return e.call(this, n, w) }; return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c }, w.chain = function (n) { return w(n).chain() }; var D = function (n) { return this._chain ? w(n).chain() : n }; w.mixin(w), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) { var t = e[n]; w.prototype[n] = function () { var r = this._wrapped; return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], D.call(this, r) } }), A(["concat", "join", "slice"], function (n) { var t = e[n]; w.prototype[n] = function () { return D.call(this, t.apply(this._wrapped, arguments)) } }), w.extend(w.prototype, { chain: function () { return this._chain = !0, this }, value: function () { return this._wrapped } }) }).call(this);



/*
string.js - Copyright (C) 2012-2013, JP Richardson <jprichardson@gmail.com>
*/

!(function () {
    "use strict";

    var VERSION = '1.6.0';

    var ENTITIES = {};

    //******************************************************************************
    // Added an initialize function which is essentially the code from the S
    // constructor.  Now, the S constructor calls this and a new method named
    // setValue calls it as well.  The setValue function allows constructors for
    // modules that extend string.js to set the initial value of an object without
    // knowing the internal workings of string.js.
    //
    // Also, all methods which return a new S object now call:
    //
    //      return new this.constructor(s);
    //
    // instead of:
    //
    //      return new S(s);
    //
    // This allows extended objects to keep their proper instanceOf and constructor.
    //******************************************************************************

    function initialize(object, s) {
        if (s !== null && s !== undefined) {
            if (typeof s === 'string')
                object.s = s;
            else
                object.s = s.toString();
        } else {
            object.s = s; //null or undefined
        }

        object.orig = s; //original object, currently only used by toCSV() and toBoolean()

        if (s !== null && s !== undefined) {
            if (object.__defineGetter__) {
                object.__defineGetter__('length', function () {
                    return object.s.length;
                })
            } else {
                object.length = s.length;
            }
        } else {
            object.length = -1;
        }
    }

    function S(s) {
        initialize(this, s);
    }

    var __nsp = String.prototype;
    var __sp = S.prototype = {

        between: function (left, right) {
            var s = this.s;
            var startPos = s.indexOf(left);
            var endPos = s.indexOf(right);
            var start = startPos + left.length;
            return new this.constructor(endPos > startPos ? s.slice(start, endPos) : "");
        },

        //# modified slightly from https://github.com/epeli/underscore.string
        camelize: function () {
            var s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function (mathc, sep, c) {
                return (c ? c.toUpperCase() : '');
            });
            return new this.constructor(s);
        },

        capitalize: function () {
            return new this.constructor(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());
        },

        charAt: function (index) {
            return this.s.charAt(index);
        },

        chompLeft: function (prefix) {
            var s = this.s;
            if (s.indexOf(prefix) === 0) {
                s = s.slice(prefix.length);
                return new this.constructor(s);
            } else {
                return this;
            }
        },

        chompRight: function (suffix) {
            if (this.endsWith(suffix)) {
                var s = this.s;
                s = s.slice(0, s.length - suffix.length);
                return new this.constructor(s);
            } else {
                return this;
            }
        },

        //#thanks Google
        collapseWhitespace: function () {
            var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
            return new this.constructor(s);
        },

        contains: function (ss) {
            return this.s.indexOf(ss) >= 0;
        },

        count: function (ss) {
            var count = 0
              , pos = this.s.indexOf(ss)

            while (pos >= 0) {
                count += 1
                pos = this.s.indexOf(ss, pos + 1)
            }

            return count
        },

        //#modified from https://github.com/epeli/underscore.string
        dasherize: function () {
            var s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
            return new this.constructor(s);
        },

        decodeHtmlEntities: function () { //https://github.com/substack/node-ent/blob/master/index.js
            var s = this.s;
            s = s.replace(/&#(\d+);?/g, function (_, code) {
                return String.fromCharCode(code);
            })
            .replace(/&#[xX]([A-Fa-f0-9]+);?/g, function (_, hex) {
                return String.fromCharCode(parseInt(hex, 16));
            })
            .replace(/&([^;\W]+;?)/g, function (m, e) {
                var ee = e.replace(/;$/, '');
                var target = ENTITIES[e] || (e.match(/;$/) && ENTITIES[ee]);

                if (typeof target === 'number') {
                    return String.fromCharCode(target);
                }
                else if (typeof target === 'string') {
                    return target;
                }
                else {
                    return m;
                }
            })

            return new this.constructor(s);
        },

        endsWith: function (suffix) {
            var l = this.s.length - suffix.length;
            return l >= 0 && this.s.indexOf(suffix, l) === l;
        },

        escapeHTML: function () { //from underscore.string
            return new this.constructor(this.s.replace(/[&<>"']/g, function (m) { return '&' + reversedEscapeChars[m] + ';'; }));
        },

        ensureLeft: function (prefix) {
            var s = this.s;
            if (s.indexOf(prefix) === 0) {
                return this;
            } else {
                return new this.constructor(prefix + s);
            }
        },

        ensureRight: function (suffix) {
            var s = this.s;
            if (this.endsWith(suffix)) {
                return this;
            } else {
                return new this.constructor(s + suffix);
            }
        },

        humanize: function () { //modified from underscore.string
            if (this.s === null || this.s === undefined)
                return new this.constructor('')
            var s = this.underscore().replace(/_id$/, '').replace(/_/g, ' ').trim().capitalize()
            return new this.constructor(s)
        },

        isAlpha: function () {
            return !/[^a-z\xC0-\xFF]/.test(this.s.toLowerCase());
        },

        isAlphaNumeric: function () {
            return !/[^0-9a-z\xC0-\xFF]/.test(this.s.toLowerCase());
        },

        isEmpty: function () {
            return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);
        },

        isLower: function () {
            return this.isAlpha() && this.s.toLowerCase() === this.s;
        },

        isNumeric: function () {
            return !/[^0-9]/.test(this.s);
        },

        isUpper: function () {
            return this.isAlpha() && this.s.toUpperCase() === this.s;
        },

        left: function (N) {
            if (N >= 0) {
                var s = this.s.substr(0, N);
                return new this.constructor(s);
            } else {
                return this.right(-N);
            }
        },

        lines: function () { //convert windows newlines to unix newlines then convert to an Array of lines
            return this.replaceAll('\r\n', '\n').s.split('\n');
        },

        pad: function (len, ch) { //https://github.com/component/pad
            ch = ch || ' ';
            if (this.s.length >= len) return new this.constructor(this.s);
            len = len - this.s.length;
            var left = Array(Math.ceil(len / 2) + 1).join(ch);
            var right = Array(Math.floor(len / 2) + 1).join(ch);
            return new this.constructor(left + this.s + right);
        },

        padLeft: function (len, ch) { //https://github.com/component/pad
            ch = ch || ' ';
            if (this.s.length >= len) return new this.constructor(this.s);
            return new this.constructor(Array(len - this.s.length + 1).join(ch) + this.s);
        },

        padRight: function (len, ch) { //https://github.com/component/pad
            ch = ch || ' ';
            if (this.s.length >= len) return new this.constructor(this.s);
            return new this.constructor(this.s + Array(len - this.s.length + 1).join(ch));
        },

        parseCSV: function (delimiter, qualifier, escape, lineDelimiter) { //try to parse no matter what
            delimiter = delimiter || ',';
            escape = escape || '\\'
            if (typeof qualifier == 'undefined')
                qualifier = '"';

            var i = 0, fieldBuffer = [], fields = [], len = this.s.length, inField = false, self = this;
            var ca = function (i) { return self.s.charAt(i) };
            if (typeof lineDelimiter !== 'undefined') var rows = [];

            if (!qualifier)
                inField = true;

            while (i < len) {
                var current = ca(i);
                switch (current) {
                    case escape:
                        //fix for issues #32 and #35
                        if (inField && ((escape !== qualifier) || ca(i + 1) === qualifier)) {
                            i += 1;
                            fieldBuffer.push(ca(i));
                            break;
                        }
                        if (escape !== qualifier) break;
                    case qualifier:
                        inField = !inField;
                        break;
                    case delimiter:
                        if (inField && qualifier)
                            fieldBuffer.push(current);
                        else {
                            fields.push(fieldBuffer.join(''))
                            fieldBuffer.length = 0;
                        }
                        break;
                    case lineDelimiter:
                        if (inField) {
                            fieldBuffer.push(current);
                        } else {
                            if (rows) {
                                fields.push(fieldBuffer.join(''))
                                rows.push(fields);
                                fields = [];
                                fieldBuffer.length = 0;
                            }
                        }
                        break;
                    default:
                        if (inField)
                            fieldBuffer.push(current);
                        break;
                }
                i += 1;
            }

            fields.push(fieldBuffer.join(''));
            if (rows) {
                rows.push(fields);
                return rows;
            }
            return fields;
        },

        replaceAll: function (ss, r) {
            //var s = this.s.replace(new RegExp(ss, 'g'), r);
            var s = this.s.split(ss).join(r)
            return new this.constructor(s);
        },

        right: function (N) {
            if (N >= 0) {
                var s = this.s.substr(this.s.length - N, N);
                return new this.constructor(s);
            } else {
                return this.left(-N);
            }
        },

        setValue: function (s) {
            initialize(this, s);
            return this;
        },

        slugify: function () {
            var sl = (new S(this.s.replace(/[^\w\s-]/g, '').toLowerCase())).dasherize().s;
            if (sl.charAt(0) === '-')
                sl = sl.substr(1);
            return new this.constructor(sl);
        },

        startsWith: function (prefix) {
            return this.s.lastIndexOf(prefix, 0) === 0;
        },

        stripPunctuation: function () {
            //return new this.constructor(this.s.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""));
            return new this.constructor(this.s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
        },

        stripTags: function () { //from sugar.js
            var s = this.s, args = arguments.length > 0 ? arguments : [''];
            multiArgs(args, function (tag) {
                s = s.replace(RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');
            });
            return new this.constructor(s);
        },

        template: function (values, opening, closing) {
            var s = this.s
            var opening = opening || Export.TMPL_OPEN
            var closing = closing || Export.TMPL_CLOSE
            var r = new RegExp(opening + '(.+?)' + closing, 'g')
            //, r = /\{\{(.+?)\}\}/g
            var matches = s.match(r) || [];

            matches.forEach(function (match) {
                var key = match.substring(opening.length, match.length - closing.length);//chop {{ and }}
                if (typeof values[key] != 'undefined')
                    s = s.replace(match, values[key]);
            });
            return new this.constructor(s);
        },

        times: function (n) {
            return new this.constructor(new Array(n + 1).join(this.s));
        },

        toBoolean: function () {
            if (typeof this.orig === 'string') {
                var s = this.s.toLowerCase();
                return s === 'true' || s === 'yes' || s === 'on';
            } else
                return this.orig === true || this.orig === 1;
        },

        toFloat: function (precision) {
            var num = parseFloat(this.s)
            if (precision)
                return parseFloat(num.toFixed(precision))
            else
                return num
        },

        toInt: function () { //thanks Google
            // If the string starts with '0x' or '-0x', parse as hex.
            return /^\s*-?0x/i.test(this.s) ? parseInt(this.s, 16) : parseInt(this.s, 10)
        },

        trim: function () {
            var s;
            if (typeof __nsp.trim === 'undefined')
                s = this.s.replace(/(^\s*|\s*$)/g, '')
            else
                s = this.s.trim()
            return new this.constructor(s);
        },

        trimLeft: function () {
            var s;
            if (__nsp.trimLeft)
                s = this.s.trimLeft();
            else
                s = this.s.replace(/(^\s*)/g, '');
            return new this.constructor(s);
        },

        trimRight: function () {
            var s;
            if (__nsp.trimRight)
                s = this.s.trimRight();
            else
                s = this.s.replace(/\s+$/, '');
            return new this.constructor(s);
        },

        truncate: function (length, pruneStr) { //from underscore.string, author: github.com/rwz
            var str = this.s;

            length = ~~length;
            pruneStr = pruneStr || '...';

            if (str.length <= length) return new this.constructor(str);

            var tmpl = function (c) { return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
              template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

            if (template.slice(template.length - 2).match(/\w\w/))
                template = template.replace(/\s*\S+$/, '');
            else
                template = new S(template.slice(0, template.length - 1)).trimRight().s;

            return (template + pruneStr).length > str.length ? new S(str) : new S(str.slice(0, template.length) + pruneStr);
        },

        toCSV: function () {
            var delim = ',', qualifier = '"', escape = '\\', encloseNumbers = true, keys = false;
            var dataArray = [];

            function hasVal(it) {
                return it !== null && it !== '';
            }

            if (typeof arguments[0] === 'object') {
                delim = arguments[0].delimiter || delim;
                delim = arguments[0].separator || delim;
                qualifier = arguments[0].qualifier || qualifier;
                encloseNumbers = !!arguments[0].encloseNumbers;
                escape = arguments[0].escape || escape;
                keys = !!arguments[0].keys;
            } else if (typeof arguments[0] === 'string') {
                delim = arguments[0];
            }

            if (typeof arguments[1] === 'string')
                qualifier = arguments[1];

            if (arguments[1] === null)
                qualifier = null;

            if (this.orig instanceof Array)
                dataArray = this.orig;
            else { //object
                for (var key in this.orig)
                    if (this.orig.hasOwnProperty(key))
                        if (keys)
                            dataArray.push(key);
                        else
                            dataArray.push(this.orig[key]);
            }

            var rep = escape + qualifier;
            var buildString = [];
            for (var i = 0; i < dataArray.length; ++i) {
                var shouldQualify = hasVal(qualifier)
                if (typeof dataArray[i] == 'number')
                    shouldQualify &= encloseNumbers;

                if (shouldQualify)
                    buildString.push(qualifier);

                if (dataArray[i] !== null && dataArray[i] !== undefined) {
                    var d = new S(dataArray[i]).replaceAll(qualifier, rep).s;
                    buildString.push(d);
                } else
                    buildString.push('')

                if (shouldQualify)
                    buildString.push(qualifier);

                if (delim)
                    buildString.push(delim);
            }

            //chop last delim
            //console.log(buildString.length)
            buildString.length = buildString.length - 1;
            return new this.constructor(buildString.join(''));
        },

        toString: function () {
            return this.s;
        },

        //#modified from https://github.com/epeli/underscore.string
        underscore: function () {
            var s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
            if ((new S(this.s.charAt(0))).isUpper()) {
                s = '_' + s;
            }
            return new this.constructor(s);
        },

        unescapeHTML: function () { //from underscore.string
            return new this.constructor(this.s.replace(/\&([^;]+);/g, function (entity, entityCode) {
                var match;

                if (entityCode in escapeChars) {
                    return escapeChars[entityCode];
                } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
                    return String.fromCharCode(parseInt(match[1], 16));
                } else if (match = entityCode.match(/^#(\d+)$/)) {
                    return String.fromCharCode(~~match[1]);
                } else {
                    return entity;
                }
            }));
        },

        valueOf: function () {
            return this.s.valueOf();
        }

    }

    var methodsAdded = [];
    function extendPrototype() {
        for (var name in __sp) {
            (function (name) {
                var func = __sp[name];
                if (!__nsp.hasOwnProperty(name)) {
                    methodsAdded.push(name);
                    __nsp[name] = function () {
                        String.prototype.s = this;
                        return func.apply(this, arguments);
                    }
                }
            })(name);
        }
    }

    function restorePrototype() {
        for (var i = 0; i < methodsAdded.length; ++i)
            delete String.prototype[methodsAdded[i]];
        methodsAdded.length = 0;
    }


    /*************************************
    /* Attach Native JavaScript String Properties
    /*************************************/

    var nativeProperties = getNativeStringProperties();
    for (var name in nativeProperties) {
        (function (name) {
            var stringProp = __nsp[name];
            if (typeof stringProp == 'function') {
                //console.log(stringProp)
                if (!__sp[name]) {
                    if (nativeProperties[name] === 'string') {
                        __sp[name] = function () {
                            //console.log(name)
                            return new this.constructor(stringProp.apply(this, arguments));
                        }
                    } else {
                        __sp[name] = stringProp;
                    }
                }
            }
        })(name);
    }


    /*************************************
    /* Function Aliases
    /*************************************/

    __sp.repeat = __sp.times;
    __sp.include = __sp.contains;
    __sp.toInteger = __sp.toInt;
    __sp.toBool = __sp.toBoolean;
    __sp.decodeHTMLEntities = __sp.decodeHtmlEntities //ensure consistent casing scheme of 'HTML'


    //******************************************************************************
    // Set the constructor.  Without this, string.js objects are instances of
    // Object instead of S.
    //******************************************************************************

    __sp.constructor = S;


    /*************************************
    /* Private Functions
    /*************************************/

    function getNativeStringProperties() {
        var names = getNativeStringPropertyNames();
        var retObj = {};

        for (var i = 0; i < names.length; ++i) {
            var name = names[i];
            var func = __nsp[name];
            try {
                var type = typeof func.apply('teststring', []);
                retObj[name] = type;
            } catch (e) { }
        }
        return retObj;
    }

    function getNativeStringPropertyNames() {
        var results = [];
        if (Object.getOwnPropertyNames) {
            results = Object.getOwnPropertyNames(__nsp);
            results.splice(results.indexOf('valueOf'), 1);
            results.splice(results.indexOf('toString'), 1);
            return results;
        } else { //meant for legacy cruft, this could probably be made more efficient
            var stringNames = {};
            var objectNames = [];
            for (var name in String.prototype)
                stringNames[name] = name;

            for (var name in Object.prototype)
                delete stringNames[name];

            //stringNames['toString'] = 'toString'; //this was deleted with the rest of the object names
            for (var name in stringNames) {
                results.push(name);
            }
            return results;
        }
    }

    function Export(str) {
        return new S(str);
    };

    //attach exports to StringJSWrapper
    Export.extendPrototype = extendPrototype;
    Export.restorePrototype = restorePrototype;
    Export.VERSION = VERSION;
    Export.TMPL_OPEN = '{{';
    Export.TMPL_CLOSE = '}}';
    Export.ENTITIES = ENTITIES;



    /*************************************
    /* Exports
    /*************************************/

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Export;

    } else {

        if (typeof define === "function" && define.amd) {
            define([], function () {
                return Export;
            });
        } else {
            window.S = Export;
        }
    }


    /*************************************
    /* 3rd Party Private Functions
    /*************************************/

    //from sugar.js
    function multiArgs(args, fn) {
        var result = [], i;
        for (i = 0; i < args.length; i++) {
            result.push(args[i]);
            if (fn) fn.call(args, args[i], i);
        }
        return result;
    }

    //from underscore.string
    var escapeChars = {
        lt: '<',
        gt: '>',
        quot: '"',
        apos: "'",
        amp: '&'
    };

    //from underscore.string
    var reversedEscapeChars = {};
    for (var key in escapeChars) { reversedEscapeChars[escapeChars[key]] = key; }

    ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": "\"",
        "apos": "'",
        "AElig": 198,
        "Aacute": 193,
        "Acirc": 194,
        "Agrave": 192,
        "Aring": 197,
        "Atilde": 195,
        "Auml": 196,
        "Ccedil": 199,
        "ETH": 208,
        "Eacute": 201,
        "Ecirc": 202,
        "Egrave": 200,
        "Euml": 203,
        "Iacute": 205,
        "Icirc": 206,
        "Igrave": 204,
        "Iuml": 207,
        "Ntilde": 209,
        "Oacute": 211,
        "Ocirc": 212,
        "Ograve": 210,
        "Oslash": 216,
        "Otilde": 213,
        "Ouml": 214,
        "THORN": 222,
        "Uacute": 218,
        "Ucirc": 219,
        "Ugrave": 217,
        "Uuml": 220,
        "Yacute": 221,
        "aacute": 225,
        "acirc": 226,
        "aelig": 230,
        "agrave": 224,
        "aring": 229,
        "atilde": 227,
        "auml": 228,
        "ccedil": 231,
        "eacute": 233,
        "ecirc": 234,
        "egrave": 232,
        "eth": 240,
        "euml": 235,
        "iacute": 237,
        "icirc": 238,
        "igrave": 236,
        "iuml": 239,
        "ntilde": 241,
        "oacute": 243,
        "ocirc": 244,
        "ograve": 242,
        "oslash": 248,
        "otilde": 245,
        "ouml": 246,
        "szlig": 223,
        "thorn": 254,
        "uacute": 250,
        "ucirc": 251,
        "ugrave": 249,
        "uuml": 252,
        "yacute": 253,
        "yuml": 255,
        "copy": 169,
        "reg": 174,
        "nbsp": 160,
        "iexcl": 161,
        "cent": 162,
        "pound": 163,
        "curren": 164,
        "yen": 165,
        "brvbar": 166,
        "sect": 167,
        "uml": 168,
        "ordf": 170,
        "laquo": 171,
        "not": 172,
        "shy": 173,
        "macr": 175,
        "deg": 176,
        "plusmn": 177,
        "sup1": 185,
        "sup2": 178,
        "sup3": 179,
        "acute": 180,
        "micro": 181,
        "para": 182,
        "middot": 183,
        "cedil": 184,
        "ordm": 186,
        "raquo": 187,
        "frac14": 188,
        "frac12": 189,
        "frac34": 190,
        "iquest": 191,
        "times": 215,
        "divide": 247,
        "OElig;": 338,
        "oelig;": 339,
        "Scaron;": 352,
        "scaron;": 353,
        "Yuml;": 376,
        "fnof;": 402,
        "circ;": 710,
        "tilde;": 732,
        "Alpha;": 913,
        "Beta;": 914,
        "Gamma;": 915,
        "Delta;": 916,
        "Epsilon;": 917,
        "Zeta;": 918,
        "Eta;": 919,
        "Theta;": 920,
        "Iota;": 921,
        "Kappa;": 922,
        "Lambda;": 923,
        "Mu;": 924,
        "Nu;": 925,
        "Xi;": 926,
        "Omicron;": 927,
        "Pi;": 928,
        "Rho;": 929,
        "Sigma;": 931,
        "Tau;": 932,
        "Upsilon;": 933,
        "Phi;": 934,
        "Chi;": 935,
        "Psi;": 936,
        "Omega;": 937,
        "alpha;": 945,
        "beta;": 946,
        "gamma;": 947,
        "delta;": 948,
        "epsilon;": 949,
        "zeta;": 950,
        "eta;": 951,
        "theta;": 952,
        "iota;": 953,
        "kappa;": 954,
        "lambda;": 955,
        "mu;": 956,
        "nu;": 957,
        "xi;": 958,
        "omicron;": 959,
        "pi;": 960,
        "rho;": 961,
        "sigmaf;": 962,
        "sigma;": 963,
        "tau;": 964,
        "upsilon;": 965,
        "phi;": 966,
        "chi;": 967,
        "psi;": 968,
        "omega;": 969,
        "thetasym;": 977,
        "upsih;": 978,
        "piv;": 982,
        "ensp;": 8194,
        "emsp;": 8195,
        "thinsp;": 8201,
        "zwnj;": 8204,
        "zwj;": 8205,
        "lrm;": 8206,
        "rlm;": 8207,
        "ndash;": 8211,
        "mdash;": 8212,
        "lsquo;": 8216,
        "rsquo;": 8217,
        "sbquo;": 8218,
        "ldquo;": 8220,
        "rdquo;": 8221,
        "bdquo;": 8222,
        "dagger;": 8224,
        "Dagger;": 8225,
        "bull;": 8226,
        "hellip;": 8230,
        "permil;": 8240,
        "prime;": 8242,
        "Prime;": 8243,
        "lsaquo;": 8249,
        "rsaquo;": 8250,
        "oline;": 8254,
        "frasl;": 8260,
        "euro;": 8364,
        "image;": 8465,
        "weierp;": 8472,
        "real;": 8476,
        "trade;": 8482,
        "alefsym;": 8501,
        "larr;": 8592,
        "uarr;": 8593,
        "rarr;": 8594,
        "darr;": 8595,
        "harr;": 8596,
        "crarr;": 8629,
        "lArr;": 8656,
        "uArr;": 8657,
        "rArr;": 8658,
        "dArr;": 8659,
        "hArr;": 8660,
        "forall;": 8704,
        "part;": 8706,
        "exist;": 8707,
        "empty;": 8709,
        "nabla;": 8711,
        "isin;": 8712,
        "notin;": 8713,
        "ni;": 8715,
        "prod;": 8719,
        "sum;": 8721,
        "minus;": 8722,
        "lowast;": 8727,
        "radic;": 8730,
        "prop;": 8733,
        "infin;": 8734,
        "ang;": 8736,
        "and;": 8743,
        "or;": 8744,
        "cap;": 8745,
        "cup;": 8746,
        "int;": 8747,
        "there4;": 8756,
        "sim;": 8764,
        "cong;": 8773,
        "asymp;": 8776,
        "ne;": 8800,
        "equiv;": 8801,
        "le;": 8804,
        "ge;": 8805,
        "sub;": 8834,
        "sup;": 8835,
        "nsub;": 8836,
        "sube;": 8838,
        "supe;": 8839,
        "oplus;": 8853,
        "otimes;": 8855,
        "perp;": 8869,
        "sdot;": 8901,
        "lceil;": 8968,
        "rceil;": 8969,
        "lfloor;": 8970,
        "rfloor;": 8971,
        "lang;": 9001,
        "rang;": 9002,
        "loz;": 9674,
        "spades;": 9824,
        "clubs;": 9827,
        "hearts;": 9829,
        "diams;": 9830
    }


}).call(this);