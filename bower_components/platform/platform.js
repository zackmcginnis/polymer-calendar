/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version: 0.4.2

window.Platform = window.Platform || {}, window.logFlags = window.logFlags || {},
	function(a) {
		var b = a.flags || {};
		location.search.slice(1).split("&").forEach(function(a) {
			a = a.split("="), a[0] && (b[a[0]] = a[1] || !0)
		});
		var c = document.currentScript || document.querySelector('script[src*="platform.js"]');
		if (c)
			for (var d, e = c.attributes, f = 0; f < e.length; f++) d = e[f], "src" !== d.name && (b[d.name] = d.value || !0);
		b.log && b.log.split(",").forEach(function(a) {
			window.logFlags[a] = !0
		}), b.shadow = b.shadow || b.shadowdom || b.polyfill, b.shadow = "native" === b.shadow ? !1 : b.shadow || !HTMLElement.prototype.createShadowRoot, b.shadow && document.querySelectorAll("script").length > 1 && console.log("Warning: platform.js is not the first script on the page. See http://www.polymer-project.org/docs/start/platform.html#setup for details."), b.register && (window.CustomElements = window.CustomElements || {
			flags: {}
		}, window.CustomElements.flags.register = b.register), b.imports && (window.HTMLImports = window.HTMLImports || {
			flags: {}
		}, window.HTMLImports.flags.imports = b.imports), a.flags = b
	}(Platform), "undefined" == typeof WeakMap && ! function() {
		var a = Object.defineProperty,
			b = Date.now() % 1e9,
			c = function() {
				this.name = "__st" + (1e9 * Math.random() >>> 0) + (b++ +"__")
			};
		c.prototype = {
			set: function(b, c) {
				var d = b[this.name];
				return d && d[0] === b ? d[1] = c : a(b, this.name, {
					value: [b, c],
					writable: !0
				}), this
			},
			get: function(a) {
				var b;
				return (b = a[this.name]) && b[0] === a ? b[1] : void 0
			},
			"delete": function(a) {
				var b = a[this.name];
				if (!b) return !1;
				var c = b[0] === a;
				return b[0] = b[1] = void 0, c
			},
			has: function(a) {
				var b = a[this.name];
				return b ? b[0] === a : !1
			}
		}, window.WeakMap = c
	}(), Platform.flags.shadow ? (! function(a) {
		"use strict";

		function b() {
			function a(a) {
				b = a
			}
			if ("function" != typeof Object.observe || "function" != typeof Array.observe) return !1;
			var b = [],
				c = {},
				d = [];
			return Object.observe(c, a), Array.observe(d, a), c.id = 1, c.id = 2, delete c.id, d.push(1, 2), d.length = 0, Object.deliverChangeRecords(a), 5 !== b.length ? !1 : "add" != b[0].type || "update" != b[1].type || "delete" != b[2].type || "splice" != b[3].type || "splice" != b[4].type ? !1 : (Object.unobserve(c, a), Array.unobserve(d, a), !0)
		}

		function c() {
			if ("undefined" != typeof chrome && chrome.app && chrome.app.runtime) return !1;
			if ("undefined" != typeof navigator && navigator.getDeviceStorage) return !1;
			try {
				var a = new Function("", "return true;");
				return a()
			} catch (b) {
				return !1
			}
		}

		function d(a) {
			return +a === a >>> 0 && "" !== a
		}

		function e(a) {
			return +a
		}

		function f(a) {
			return a === Object(a)
		}

		function g(a, b) {
			return a === b ? 0 !== a || 1 / a === 1 / b : R(a) && R(b) ? !0 : a !== a && b !== b
		}

		function h(a) {
			if (void 0 === a) return "eof";
			var b = a.charCodeAt(0);
			switch (b) {
				case 91:
				case 93:
				case 46:
				case 34:
				case 39:
				case 48:
					return a;
				case 95:
				case 36:
					return "ident";
				case 32:
				case 9:
				case 10:
				case 13:
				case 160:
				case 65279:
				case 8232:
				case 8233:
					return "ws"
			}
			return b >= 97 && 122 >= b || b >= 65 && 90 >= b ? "ident" : b >= 49 && 57 >= b ? "number" : "else"
		}

		function i() {}

		function j(a) {
			function b() {
				if (!(m >= a.length)) {
					var b = a[m + 1];
					return "inSingleQuote" == n && "'" == b || "inDoubleQuote" == n && '"' == b ? (m++, d = b, o.append(), !0) : void 0
				}
			}
			for (var c, d, e, f, g, j, k, l = [], m = -1, n = "beforePath", o = {
					push: function() {
						void 0 !== e && (l.push(e), e = void 0)
					},
					append: function() {
						void 0 === e ? e = d : e += d
					}
				}; n;)
				if (m++, c = a[m], "\\" != c || !b(n)) {
					if (f = h(c), k = W[n], g = k[f] || k["else"] || "error", "error" == g) return;
					if (n = g[0], j = o[g[1]] || i, d = void 0 === g[2] ? c : g[2], j(), "afterPath" === n) return l
				}
		}

		function k(a) {
			return V.test(a)
		}

		function l(a, b) {
			if (b !== X) throw Error("Use Path.get to retrieve path objects");
			for (var c = 0; c < a.length; c++) this.push(String(a[c]));
			Q && this.length && (this.getValueFrom = this.compiledGetValueFromFn())
		}

		function m(a) {
			if (a instanceof l) return a;
			if ((null == a || 0 == a.length) && (a = ""), "string" != typeof a) {
				if (d(a.length)) return new l(a, X);
				a = String(a)
			}
			var b = Y[a];
			if (b) return b;
			var c = j(a);
			if (!c) return Z;
			var b = new l(c, X);
			return Y[a] = b, b
		}

		function n(a) {
			return d(a) ? "[" + a + "]" : '["' + a.replace(/"/g, '\\"') + '"]'
		}

		function o(b) {
			for (var c = 0; _ > c && b.check_();) c++;
			return O && (a.dirtyCheckCycleCount = c), c > 0
		}

		function p(a) {
			for (var b in a) return !1;
			return !0
		}

		function q(a) {
			return p(a.added) && p(a.removed) && p(a.changed)
		}

		function r(a, b) {
			var c = {},
				d = {},
				e = {};
			for (var f in b) {
				var g = a[f];
				(void 0 === g || g !== b[f]) && (f in a ? g !== b[f] && (e[f] = g) : d[f] = void 0)
			}
			for (var f in a) f in b || (c[f] = a[f]);
			return Array.isArray(a) && a.length !== b.length && (e.length = a.length), {
				added: c,
				removed: d,
				changed: e
			}
		}

		function s() {
			if (!ab.length) return !1;
			for (var a = 0; a < ab.length; a++) ab[a]();
			return ab.length = 0, !0
		}

		function t() {
			function a(a) {
				b && b.state_ === fb && !d && b.check_(a)
			}
			var b, c, d = !1,
				e = !0;
			return {
				open: function(c) {
					if (b) throw Error("ObservedObject in use");
					e || Object.deliverChangeRecords(a), b = c, e = !1
				},
				observe: function(b, d) {
					c = b, d ? Array.observe(c, a) : Object.observe(c, a)
				},
				deliver: function(b) {
					d = b, Object.deliverChangeRecords(a), d = !1
				},
				close: function() {
					b = void 0, Object.unobserve(c, a), cb.push(this)
				}
			}
		}

		function u(a, b, c) {
			var d = cb.pop() || t();
			return d.open(a), d.observe(b, c), d
		}

		function v() {
			function a(b, f) {
				b && (b === d && (e[f] = !0), h.indexOf(b) < 0 && (h.push(b), Object.observe(b, c)), a(Object.getPrototypeOf(b), f))
			}

			function b(a) {
				for (var b = 0; b < a.length; b++) {
					var c = a[b];
					if (c.object !== d || e[c.name] || "setPrototype" === c.type) return !1
				}
				return !0
			}

			function c(c) {
				if (!b(c)) {
					for (var d, e = 0; e < g.length; e++) d = g[e], d.state_ == fb && d.iterateObjects_(a);
					for (var e = 0; e < g.length; e++) d = g[e], d.state_ == fb && d.check_()
				}
			}
			var d, e, f = 0,
				g = [],
				h = [],
				i = {
					object: void 0,
					objects: h,
					open: function(b, c) {
						d || (d = c, e = {}), g.push(b), f++, b.iterateObjects_(a)
					},
					close: function() {
						if (f--, !(f > 0)) {
							for (var a = 0; a < h.length; a++) Object.unobserve(h[a], c), x.unobservedCount++;
							g.length = 0, h.length = 0, d = void 0, e = void 0, db.push(this)
						}
					}
				};
			return i
		}

		function w(a, b) {
			return $ && $.object === b || ($ = db.pop() || v(), $.object = b), $.open(a, b), $
		}

		function x() {
			this.state_ = eb, this.callback_ = void 0, this.target_ = void 0, this.directObserver_ = void 0, this.value_ = void 0, this.id_ = ib++
		}

		function y(a) {
			x._allObserversCount++, kb && jb.push(a)
		}

		function z() {
			x._allObserversCount--
		}

		function A(a) {
			x.call(this), this.value_ = a, this.oldObject_ = void 0
		}

		function B(a) {
			if (!Array.isArray(a)) throw Error("Provided object is not an Array");
			A.call(this, a)
		}

		function C(a, b) {
			x.call(this), this.object_ = a, this.path_ = m(b), this.directObserver_ = void 0
		}

		function D(a) {
			x.call(this), this.reportChangesOnOpen_ = a, this.value_ = [], this.directObserver_ = void 0, this.observed_ = []
		}

		function E(a) {
			return a
		}

		function F(a, b, c, d) {
			this.callback_ = void 0, this.target_ = void 0, this.value_ = void 0, this.observable_ = a, this.getValueFn_ = b || E, this.setValueFn_ = c || E, this.dontPassThroughSet_ = d
		}

		function G(a, b, c) {
			for (var d = {}, e = {}, f = 0; f < b.length; f++) {
				var g = b[f];
				nb[g.type] ? (g.name in c || (c[g.name] = g.oldValue), "update" != g.type && ("add" != g.type ? g.name in d ? (delete d[g.name], delete c[g.name]) : e[g.name] = !0 : g.name in e ? delete e[g.name] : d[g.name] = !0)) : (console.error("Unknown changeRecord type: " + g.type), console.error(g))
			}
			for (var h in d) d[h] = a[h];
			for (var h in e) e[h] = void 0;
			var i = {};
			for (var h in c)
				if (!(h in d || h in e)) {
					var j = a[h];
					c[h] !== j && (i[h] = j)
				}
			return {
				added: d,
				removed: e,
				changed: i
			}
		}

		function H(a, b, c) {
			return {
				index: a,
				removed: b,
				addedCount: c
			}
		}

		function I() {}

		function J(a, b, c, d, e, f) {
			return sb.calcSplices(a, b, c, d, e, f)
		}

		function K(a, b, c, d) {
			return c > b || a > d ? -1 : b == c || d == a ? 0 : c > a ? d > b ? b - c : d - c : b > d ? d - a : b - a
		}

		function L(a, b, c, d) {
			for (var e = H(b, c, d), f = !1, g = 0, h = 0; h < a.length; h++) {
				var i = a[h];
				if (i.index += g, !f) {
					var j = K(e.index, e.index + e.removed.length, i.index, i.index + i.addedCount);
					if (j >= 0) {
						a.splice(h, 1), h--, g -= i.addedCount - i.removed.length, e.addedCount += i.addedCount - j;
						var k = e.removed.length + i.removed.length - j;
						if (e.addedCount || k) {
							var c = i.removed;
							if (e.index < i.index) {
								var l = e.removed.slice(0, i.index - e.index);
								Array.prototype.push.apply(l, c), c = l
							}
							if (e.index + e.removed.length > i.index + i.addedCount) {
								var m = e.removed.slice(i.index + i.addedCount - e.index);
								Array.prototype.push.apply(c, m)
							}
							e.removed = c, i.index < e.index && (e.index = i.index)
						} else f = !0
					} else if (e.index < i.index) {
						f = !0, a.splice(h, 0, e), h++;
						var n = e.addedCount - e.removed.length;
						i.index += n, g += n
					}
				}
			}
			f || a.push(e)
		}

		function M(a, b) {
			for (var c = [], f = 0; f < b.length; f++) {
				var g = b[f];
				switch (g.type) {
					case "splice":
						L(c, g.index, g.removed.slice(), g.addedCount);
						break;
					case "add":
					case "update":
					case "delete":
						if (!d(g.name)) continue;
						var h = e(g.name);
						if (0 > h) continue;
						L(c, h, [g.oldValue], 1);
						break;
					default:
						console.error("Unexpected record type: " + JSON.stringify(g))
				}
			}
			return c
		}

		function N(a, b) {
			var c = [];
			return M(a, b).forEach(function(b) {
				return 1 == b.addedCount && 1 == b.removed.length ? void(b.removed[0] !== a[b.index] && c.push(b)) : void(c = c.concat(J(a, b.index, b.index + b.addedCount, b.removed, 0, b.removed.length)))
			}), c
		}
		var O = a.testingExposeCycleCount,
			P = b(),
			Q = c(),
			R = a.Number.isNaN || function(b) {
				return "number" == typeof b && a.isNaN(b)
			},
			S = "__proto__" in {} ? function(a) {
				return a
			} : function(a) {
				var b = a.__proto__;
				if (!b) return a;
				var c = Object.create(b);
				return Object.getOwnPropertyNames(a).forEach(function(b) {
					Object.defineProperty(c, b, Object.getOwnPropertyDescriptor(a, b))
				}), c
			},
			T = "[$_a-zA-Z]",
			U = "[$_a-zA-Z0-9]",
			V = new RegExp("^" + T + "+" + U + "*$"),
			W = {
				beforePath: {
					ws: ["beforePath"],
					ident: ["inIdent", "append"],
					"[": ["beforeElement"],
					eof: ["afterPath"]
				},
				inPath: {
					ws: ["inPath"],
					".": ["beforeIdent"],
					"[": ["beforeElement"],
					eof: ["afterPath"]
				},
				beforeIdent: {
					ws: ["beforeIdent"],
					ident: ["inIdent", "append"]
				},
				inIdent: {
					ident: ["inIdent", "append"],
					0: ["inIdent", "append"],
					number: ["inIdent", "append"],
					ws: ["inPath", "push"],
					".": ["beforeIdent", "push"],
					"[": ["beforeElement", "push"],
					eof: ["afterPath", "push"]
				},
				beforeElement: {
					ws: ["beforeElement"],
					0: ["afterZero", "append"],
					number: ["inIndex", "append"],
					"'": ["inSingleQuote", "append", ""],
					'"': ["inDoubleQuote", "append", ""]
				},
				afterZero: {
					ws: ["afterElement", "push"],
					"]": ["inPath", "push"]
				},
				inIndex: {
					0: ["inIndex", "append"],
					number: ["inIndex", "append"],
					ws: ["afterElement"],
					"]": ["inPath", "push"]
				},
				inSingleQuote: {
					"'": ["afterElement"],
					eof: ["error"],
					"else": ["inSingleQuote", "append"]
				},
				inDoubleQuote: {
					'"': ["afterElement"],
					eof: ["error"],
					"else": ["inDoubleQuote", "append"]
				},
				afterElement: {
					ws: ["afterElement"],
					"]": ["inPath", "push"]
				}
			},
			X = {},
			Y = {};
		l.get = m, l.prototype = S({
			__proto__: [],
			valid: !0,
			toString: function() {
				for (var a = "", b = 0; b < this.length; b++) {
					var c = this[b];
					a += k(c) ? b ? "." + c : c : n(c)
				}
				return a
			},
			getValueFrom: function(a) {
				for (var b = 0; b < this.length; b++) {
					if (null == a) return;
					a = a[this[b]]
				}
				return a
			},
			iterateObjects: function(a, b) {
				for (var c = 0; c < this.length; c++) {
					if (c && (a = a[this[c - 1]]), !f(a)) return;
					b(a, this[0])
				}
			},
			compiledGetValueFromFn: function() {
				var a = "",
					b = "obj";
				a += "if (obj != null";
				for (var c, d = 0; d < this.length - 1; d++) c = this[d], b += k(c) ? "." + c : n(c), a += " &&\n     " + b + " != null";
				a += ")\n";
				var c = this[d];
				return b += k(c) ? "." + c : n(c), a += "  return " + b + ";\nelse\n  return undefined;", new Function("obj", a)
			},
			setValueFrom: function(a, b) {
				if (!this.length) return !1;
				for (var c = 0; c < this.length - 1; c++) {
					if (!f(a)) return !1;
					a = a[this[c]]
				}
				return f(a) ? (a[this[c]] = b, !0) : !1
			}
		});
		var Z = new l("", X);
		Z.valid = !1, Z.getValueFrom = Z.setValueFrom = function() {};
		var $, _ = 1e3,
			ab = [],
			bb = P ? function() {
				var a = {
						pingPong: !0
					},
					b = !1;
				return Object.observe(a, function() {
						s(), b = !1
					}),
					function(c) {
						ab.push(c), b || (b = !0, a.pingPong = !a.pingPong)
					}
			}() : function() {
				return function(a) {
					ab.push(a)
				}
			}(),
			cb = [],
			db = [],
			eb = 0,
			fb = 1,
			gb = 2,
			hb = 3,
			ib = 1;
		x.prototype = {
			open: function(a, b) {
				if (this.state_ != eb) throw Error("Observer has already been opened.");
				return y(this), this.callback_ = a, this.target_ = b, this.connect_(), this.state_ = fb, this.value_
			},
			close: function() {
				this.state_ == fb && (z(this), this.disconnect_(), this.value_ = void 0, this.callback_ = void 0, this.target_ = void 0, this.state_ = gb)
			},
			deliver: function() {
				this.state_ == fb && o(this)
			},
			report_: function(a) {
				try {
					this.callback_.apply(this.target_, a)
				} catch (b) {
					x._errorThrownDuringCallback = !0, console.error("Exception caught during observer callback: " + (b.stack || b))
				}
			},
			discardChanges: function() {
				return this.check_(void 0, !0), this.value_
			}
		};
		var jb, kb = !P;
		x._allObserversCount = 0, kb && (jb = []);
		var lb = !1;
		a.Platform = a.Platform || {}, a.Platform.performMicrotaskCheckpoint = function() {
			if (!lb && kb) {
				lb = !0;
				var b, c, d = 0;
				do {
					d++, c = jb, jb = [], b = !1;
					for (var e = 0; e < c.length; e++) {
						var f = c[e];
						f.state_ == fb && (f.check_() && (b = !0), jb.push(f))
					}
					s() && (b = !0)
				} while (_ > d && b);
				O && (a.dirtyCheckCycleCount = d), lb = !1
			}
		}, kb && (a.Platform.clearObservers = function() {
			jb = []
		}), A.prototype = S({
			__proto__: x.prototype,
			arrayObserve: !1,
			connect_: function() {
				P ? this.directObserver_ = u(this, this.value_, this.arrayObserve) : this.oldObject_ = this.copyObject(this.value_)
			},
			copyObject: function(a) {
				var b = Array.isArray(a) ? [] : {};
				for (var c in a) b[c] = a[c];
				return Array.isArray(a) && (b.length = a.length), b
			},
			check_: function(a) {
				var b, c;
				if (P) {
					if (!a) return !1;
					c = {}, b = G(this.value_, a, c)
				} else c = this.oldObject_, b = r(this.value_, this.oldObject_);
				return q(b) ? !1 : (P || (this.oldObject_ = this.copyObject(this.value_)), this.report_([b.added || {}, b.removed || {}, b.changed || {}, function(a) {
					return c[a]
				}]), !0)
			},
			disconnect_: function() {
				P ? (this.directObserver_.close(), this.directObserver_ = void 0) : this.oldObject_ = void 0
			},
			deliver: function() {
				this.state_ == fb && (P ? this.directObserver_.deliver(!1) : o(this))
			},
			discardChanges: function() {
				return this.directObserver_ ? this.directObserver_.deliver(!0) : this.oldObject_ = this.copyObject(this.value_), this.value_
			}
		}), B.prototype = S({
			__proto__: A.prototype,
			arrayObserve: !0,
			copyObject: function(a) {
				return a.slice()
			},
			check_: function(a) {
				var b;
				if (P) {
					if (!a) return !1;
					b = N(this.value_, a)
				} else b = J(this.value_, 0, this.value_.length, this.oldObject_, 0, this.oldObject_.length);
				return b && b.length ? (P || (this.oldObject_ = this.copyObject(this.value_)), this.report_([b]), !0) : !1
			}
		}), B.applySplices = function(a, b, c) {
			c.forEach(function(c) {
				for (var d = [c.index, c.removed.length], e = c.index; e < c.index + c.addedCount;) d.push(b[e]), e++;
				Array.prototype.splice.apply(a, d)
			})
		}, C.prototype = S({
			__proto__: x.prototype,
			get path() {
				return this.path_
			},
			connect_: function() {
				P && (this.directObserver_ = w(this, this.object_)), this.check_(void 0, !0)
			},
			disconnect_: function() {
				this.value_ = void 0, this.directObserver_ && (this.directObserver_.close(this), this.directObserver_ = void 0)
			},
			iterateObjects_: function(a) {
				this.path_.iterateObjects(this.object_, a)
			},
			check_: function(a, b) {
				var c = this.value_;
				return this.value_ = this.path_.getValueFrom(this.object_), b || g(this.value_, c) ? !1 : (this.report_([this.value_, c, this]), !0)
			},
			setValue: function(a) {
				this.path_ && this.path_.setValueFrom(this.object_, a)
			}
		});
		var mb = {};
		D.prototype = S({
			__proto__: x.prototype,
			connect_: function() {
				if (P) {
					for (var a, b = !1, c = 0; c < this.observed_.length; c += 2)
						if (a = this.observed_[c], a !== mb) {
							b = !0;
							break
						}
					b && (this.directObserver_ = w(this, a))
				}
				this.check_(void 0, !this.reportChangesOnOpen_)
			},
			disconnect_: function() {
				for (var a = 0; a < this.observed_.length; a += 2) this.observed_[a] === mb && this.observed_[a + 1].close();
				this.observed_.length = 0, this.value_.length = 0, this.directObserver_ && (this.directObserver_.close(this), this.directObserver_ = void 0)
			},
			addPath: function(a, b) {
				if (this.state_ != eb && this.state_ != hb) throw Error("Cannot add paths once started.");
				var b = m(b);
				if (this.observed_.push(a, b), this.reportChangesOnOpen_) {
					var c = this.observed_.length / 2 - 1;
					this.value_[c] = b.getValueFrom(a)
				}
			},
			addObserver: function(a) {
				if (this.state_ != eb && this.state_ != hb) throw Error("Cannot add observers once started.");
				if (this.observed_.push(mb, a), this.reportChangesOnOpen_) {
					var b = this.observed_.length / 2 - 1;
					this.value_[b] = a.open(this.deliver, this)
				}
			},
			startReset: function() {
				if (this.state_ != fb) throw Error("Can only reset while open");
				this.state_ = hb, this.disconnect_()
			},
			finishReset: function() {
				if (this.state_ != hb) throw Error("Can only finishReset after startReset");
				return this.state_ = fb, this.connect_(), this.value_
			},
			iterateObjects_: function(a) {
				for (var b, c = 0; c < this.observed_.length; c += 2) b = this.observed_[c], b !== mb && this.observed_[c + 1].iterateObjects(b, a)
			},
			check_: function(a, b) {
				for (var c, d = 0; d < this.observed_.length; d += 2) {
					var e, f = this.observed_[d],
						h = this.observed_[d + 1];
					if (f === mb) {
						var i = h;
						e = this.state_ === eb ? i.open(this.deliver, this) : i.discardChanges()
					} else e = h.getValueFrom(f);
					b ? this.value_[d / 2] = e : g(e, this.value_[d / 2]) || (c = c || [], c[d / 2] = this.value_[d / 2], this.value_[d / 2] = e)
				}
				return c ? (this.report_([this.value_, c, this.observed_]), !0) : !1
			}
		}), F.prototype = {
			open: function(a, b) {
				return this.callback_ = a, this.target_ = b, this.value_ = this.getValueFn_(this.observable_.open(this.observedCallback_, this)), this.value_
			},
			observedCallback_: function(a) {
				if (a = this.getValueFn_(a), !g(a, this.value_)) {
					var b = this.value_;
					this.value_ = a, this.callback_.call(this.target_, this.value_, b)
				}
			},
			discardChanges: function() {
				return this.value_ = this.getValueFn_(this.observable_.discardChanges()), this.value_
			},
			deliver: function() {
				return this.observable_.deliver()
			},
			setValue: function(a) {
				return a = this.setValueFn_(a), !this.dontPassThroughSet_ && this.observable_.setValue ? this.observable_.setValue(a) : void 0
			},
			close: function() {
				this.observable_ && this.observable_.close(), this.callback_ = void 0, this.target_ = void 0, this.observable_ = void 0, this.value_ = void 0, this.getValueFn_ = void 0, this.setValueFn_ = void 0
			}
		};
		var nb = {
				add: !0,
				update: !0,
				"delete": !0
			},
			ob = 0,
			pb = 1,
			qb = 2,
			rb = 3;
		I.prototype = {
			calcEditDistances: function(a, b, c, d, e, f) {
				for (var g = f - e + 1, h = c - b + 1, i = new Array(g), j = 0; g > j; j++) i[j] = new Array(h), i[j][0] = j;
				for (var k = 0; h > k; k++) i[0][k] = k;
				for (var j = 1; g > j; j++)
					for (var k = 1; h > k; k++)
						if (this.equals(a[b + k - 1], d[e + j - 1])) i[j][k] = i[j - 1][k - 1];
						else {
							var l = i[j - 1][k] + 1,
								m = i[j][k - 1] + 1;
							i[j][k] = m > l ? l : m
						}
				return i
			},
			spliceOperationsFromEditDistances: function(a) {
				for (var b = a.length - 1, c = a[0].length - 1, d = a[b][c], e = []; b > 0 || c > 0;)
					if (0 != b)
						if (0 != c) {
							var f, g = a[b - 1][c - 1],
								h = a[b - 1][c],
								i = a[b][c - 1];
							f = i > h ? g > h ? h : g : g > i ? i : g, f == g ? (g == d ? e.push(ob) : (e.push(pb), d = g), b--, c--) : f == h ? (e.push(rb), b--, d = h) : (e.push(qb), c--, d = i)
						} else e.push(rb), b--;
				else e.push(qb), c--;
				return e.reverse(), e
			},
			calcSplices: function(a, b, c, d, e, f) {
				var g = 0,
					h = 0,
					i = Math.min(c - b, f - e);
				if (0 == b && 0 == e && (g = this.sharedPrefix(a, d, i)), c == a.length && f == d.length && (h = this.sharedSuffix(a, d, i - g)), b += g, e += g, c -= h, f -= h, c - b == 0 && f - e == 0) return [];
				if (b == c) {
					for (var j = H(b, [], 0); f > e;) j.removed.push(d[e++]);
					return [j]
				}
				if (e == f) return [H(b, [], c - b)];
				for (var k = this.spliceOperationsFromEditDistances(this.calcEditDistances(a, b, c, d, e, f)), j = void 0, l = [], m = b, n = e, o = 0; o < k.length; o++) switch (k[o]) {
					case ob:
						j && (l.push(j), j = void 0), m++, n++;
						break;
					case pb:
						j || (j = H(m, [], 0)), j.addedCount++, m++, j.removed.push(d[n]), n++;
						break;
					case qb:
						j || (j = H(m, [], 0)), j.addedCount++, m++;
						break;
					case rb:
						j || (j = H(m, [], 0)), j.removed.push(d[n]), n++
				}
				return j && l.push(j), l
			},
			sharedPrefix: function(a, b, c) {
				for (var d = 0; c > d; d++)
					if (!this.equals(a[d], b[d])) return d;
				return c
			},
			sharedSuffix: function(a, b, c) {
				for (var d = a.length, e = b.length, f = 0; c > f && this.equals(a[--d], b[--e]);) f++;
				return f
			},
			calculateSplices: function(a, b) {
				return this.calcSplices(a, 0, a.length, b, 0, b.length)
			},
			equals: function(a, b) {
				return a === b
			}
		};
		var sb = new I;
		a.Observer = x, a.Observer.runEOM_ = bb, a.Observer.observerSentinel_ = mb, a.Observer.hasObjectObserve = P, a.ArrayObserver = B, a.ArrayObserver.calculateSplices = function(a, b) {
			return sb.calculateSplices(a, b)
		}, a.ArraySplice = I, a.ObjectObserver = A, a.PathObserver = C, a.CompoundObserver = D, a.Path = l, a.ObserverTransform = F
	}("undefined" != typeof global && global && "undefined" != typeof module && module ? global : this || window), window.ShadowDOMPolyfill = {}, function(a) {
		"use strict";

		function b() {
			if ("undefined" != typeof chrome && chrome.app && chrome.app.runtime) return !1;
			if (navigator.getDeviceStorage) return !1;
			try {
				var a = new Function("return true;");
				return a()
			} catch (b) {
				return !1
			}
		}

		function c(a) {
			if (!a) throw new Error("Assertion failed")
		}

		function d(a, b) {
			for (var c = N(b), d = 0; d < c.length; d++) {
				var e = c[d];
				M(a, e, O(b, e))
			}
			return a
		}

		function e(a, b) {
			for (var c = N(b), d = 0; d < c.length; d++) {
				var e = c[d];
				switch (e) {
					case "arguments":
					case "caller":
					case "length":
					case "name":
					case "prototype":
					case "toString":
						continue
				}
				M(a, e, O(b, e))
			}
			return a
		}

		function f(a, b) {
			for (var c = 0; c < b.length; c++)
				if (b[c] in a) return b[c]
		}

		function g(a, b, c) {
			P.value = c, M(a, b, P)
		}

		function h(a) {
			var b = a.__proto__ || Object.getPrototypeOf(a),
				c = I.get(b);
			if (c) return c;
			var d = h(b),
				e = v(d);
			return s(b, e, a), e
		}

		function i(a, b) {
			q(a, b, !0)
		}

		function j(a, b) {
			q(b, a, !1)
		}

		function k(a) {
			return /^on[a-z]+$/.test(a)
		}

		function l(a) {
			return /^\w[a-zA-Z_0-9]*$/.test(a)
		}

		function m(a) {
			return L && l(a) ? new Function("return this.__impl4cf1e782hg__." + a) : function() {
				return this.__impl4cf1e782hg__[a]
			}
		}

		function n(a) {
			return L && l(a) ? new Function("v", "this.__impl4cf1e782hg__." + a + " = v") : function(b) {
				this.__impl4cf1e782hg__[a] = b
			}
		}

		function o(a) {
			return L && l(a) ? new Function("return this.__impl4cf1e782hg__." + a + ".apply(this.__impl4cf1e782hg__, arguments)") : function() {
				return this.__impl4cf1e782hg__[a].apply(this.__impl4cf1e782hg__, arguments)
			}
		}

		function p(a, b) {
			try {
				return Object.getOwnPropertyDescriptor(a, b)
			} catch (c) {
				return R
			}
		}

		function q(b, c, d) {
			for (var e = N(b), f = 0; f < e.length; f++) {
				var g = e[f];
				if ("polymerBlackList_" !== g && !(g in c || b.polymerBlackList_ && b.polymerBlackList_[g])) {
					Q && b.__lookupGetter__(g);
					var h, i, j = p(b, g);
					if (d && "function" == typeof j.value) c[g] = o(g);
					else {
						var l = k(g);
						h = l ? a.getEventHandlerGetter(g) : m(g), (j.writable || j.set || S) && (i = l ? a.getEventHandlerSetter(g) : n(g)), M(c, g, {
							get: h,
							set: i,
							configurable: j.configurable,
							enumerable: j.enumerable
						})
					}
				}
			}
		}

		function r(a, b, c) {
			var d = a.prototype;
			s(d, b, c), e(b, a)
		}

		function s(a, b, d) {
			var e = b.prototype;
			c(void 0 === I.get(a)), I.set(a, b), J.set(e, a), i(a, e), d && j(e, d), g(e, "constructor", b), b.prototype = e
		}

		function t(a, b) {
			return I.get(b.prototype) === a
		}

		function u(a) {
			var b = Object.getPrototypeOf(a),
				c = h(b),
				d = v(c);
			return s(b, d, a), d
		}

		function v(a) {
			function b(b) {
				a.call(this, b)
			}
			var c = Object.create(a.prototype);
			return c.constructor = b, b.prototype = c, b
		}

		function w(a) {
			return a && a.__impl4cf1e782hg__
		}

		function x(a) {
			return !w(a)
		}

		function y(a) {
			return null === a ? null : (c(x(a)), a.__wrapper8e3dd93a60__ || (a.__wrapper8e3dd93a60__ = new(h(a))(a)))
		}

		function z(a) {
			return null === a ? null : (c(w(a)), a.__impl4cf1e782hg__)
		}

		function A(a) {
			return a.__impl4cf1e782hg__
		}

		function B(a, b) {
			b.__impl4cf1e782hg__ = a, a.__wrapper8e3dd93a60__ = b
		}

		function C(a) {
			return a && w(a) ? z(a) : a
		}

		function D(a) {
			return a && !w(a) ? y(a) : a
		}

		function E(a, b) {
			null !== b && (c(x(a)), c(void 0 === b || w(b)), a.__wrapper8e3dd93a60__ = b)
		}

		function F(a, b, c) {
			T.get = c, M(a.prototype, b, T)
		}

		function G(a, b) {
			F(a, b, function() {
				return y(this.__impl4cf1e782hg__[b])
			})
		}

		function H(a, b) {
			a.forEach(function(a) {
				b.forEach(function(b) {
					a.prototype[b] = function() {
						var a = D(this);
						return a[b].apply(a, arguments)
					}
				})
			})
		}
		var I = new WeakMap,
			J = new WeakMap,
			K = Object.create(null),
			L = b(),
			M = Object.defineProperty,
			N = Object.getOwnPropertyNames,
			O = Object.getOwnPropertyDescriptor,
			P = {
				value: void 0,
				configurable: !0,
				enumerable: !1,
				writable: !0
			};
		N(window);
		var Q = /Firefox/.test(navigator.userAgent),
			R = {
				get: function() {},
				set: function() {},
				configurable: !0,
				enumerable: !0
			},
			S = function() {
				var a = Object.getOwnPropertyDescriptor(Node.prototype, "nodeType");
				return !!a && "set" in a
			}(),
			T = {
				get: void 0,
				configurable: !0,
				enumerable: !0
			};
		a.assert = c, a.constructorTable = I, a.defineGetter = F, a.defineWrapGetter = G, a.forwardMethodsToWrapper = H, a.isWrapper = w, a.isWrapperFor = t, a.mixin = d, a.nativePrototypeTable = J, a.oneOf = f, a.registerObject = u, a.registerWrapper = r, a.rewrap = E, a.setWrapper = B, a.unsafeUnwrap = A, a.unwrap = z, a.unwrapIfNeeded = C, a.wrap = y, a.wrapIfNeeded = D, a.wrappers = K
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b() {
			g = !1;
			var a = f.slice(0);
			f = [];
			for (var b = 0; b < a.length; b++) a[b]()
		}

		function c(a) {
			f.push(a), g || (g = !0, d(b, 0))
		}
		var d, e = window.MutationObserver,
			f = [],
			g = !1;
		if (e) {
			var h = 1,
				i = new e(b),
				j = document.createTextNode(h);
			i.observe(j, {
				characterData: !0
			}), d = function() {
				h = (h + 1) % 2, j.data = h
			}
		} else d = window.setImmediate || window.setTimeout;
		a.setEndOfMicrotask = c
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			a.scheduled_ || (a.scheduled_ = !0, o.push(a), p || (k(c), p = !0))
		}

		function c() {
			for (p = !1; o.length;) {
				var a = o;
				o = [], a.sort(function(a, b) {
					return a.uid_ - b.uid_
				});
				for (var b = 0; b < a.length; b++) {
					var c = a[b];
					c.scheduled_ = !1;
					var d = c.takeRecords();
					f(c), d.length && c.callback_(d, c)
				}
			}
		}

		function d(a, b) {
			this.type = a, this.target = b, this.addedNodes = new m.NodeList, this.removedNodes = new m.NodeList, this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null
		}

		function e(a, b) {
			for (; a; a = a.parentNode) {
				var c = n.get(a);
				if (c)
					for (var d = 0; d < c.length; d++) {
						var e = c[d];
						e.options.subtree && e.addTransientObserver(b)
					}
			}
		}

		function f(a) {
			for (var b = 0; b < a.nodes_.length; b++) {
				var c = a.nodes_[b],
					d = n.get(c);
				if (!d) return;
				for (var e = 0; e < d.length; e++) {
					var f = d[e];
					f.observer === a && f.removeTransientObservers()
				}
			}
		}

		function g(a, c, e) {
			for (var f = Object.create(null), g = Object.create(null), h = a; h; h = h.parentNode) {
				var i = n.get(h);
				if (i)
					for (var j = 0; j < i.length; j++) {
						var k = i[j],
							l = k.options;
						if ((h === a || l.subtree) && !("attributes" === c && !l.attributes || "attributes" === c && l.attributeFilter && (null !== e.namespace || -1 === l.attributeFilter.indexOf(e.name)) || "characterData" === c && !l.characterData || "childList" === c && !l.childList)) {
							var m = k.observer;
							f[m.uid_] = m, ("attributes" === c && l.attributeOldValue || "characterData" === c && l.characterDataOldValue) && (g[m.uid_] = e.oldValue)
						}
					}
			}
			for (var o in f) {
				var m = f[o],
					p = new d(c, a);
				"name" in e && "namespace" in e && (p.attributeName = e.name, p.attributeNamespace = e.namespace), e.addedNodes && (p.addedNodes = e.addedNodes), e.removedNodes && (p.removedNodes = e.removedNodes), e.previousSibling && (p.previousSibling = e.previousSibling), e.nextSibling && (p.nextSibling = e.nextSibling), void 0 !== g[o] && (p.oldValue = g[o]), b(m), m.records_.push(p)
			}
		}

		function h(a) {
			if (this.childList = !!a.childList, this.subtree = !!a.subtree, this.attributes = "attributes" in a || !("attributeOldValue" in a || "attributeFilter" in a) ? !!a.attributes : !0, this.characterData = "characterDataOldValue" in a && !("characterData" in a) ? !0 : !!a.characterData, !this.attributes && (a.attributeOldValue || "attributeFilter" in a) || !this.characterData && a.characterDataOldValue) throw new TypeError;
			if (this.characterData = !!a.characterData, this.attributeOldValue = !!a.attributeOldValue, this.characterDataOldValue = !!a.characterDataOldValue, "attributeFilter" in a) {
				if (null == a.attributeFilter || "object" != typeof a.attributeFilter) throw new TypeError;
				this.attributeFilter = q.call(a.attributeFilter)
			} else this.attributeFilter = null
		}

		function i(a) {
			this.callback_ = a, this.nodes_ = [], this.records_ = [], this.uid_ = ++r, this.scheduled_ = !1
		}

		function j(a, b, c) {
			this.observer = a, this.target = b, this.options = c, this.transientObservedNodes = []
		}
		var k = a.setEndOfMicrotask,
			l = a.wrapIfNeeded,
			m = a.wrappers,
			n = new WeakMap,
			o = [],
			p = !1,
			q = Array.prototype.slice,
			r = 0;
		i.prototype = {
			constructor: i,
			observe: function(a, b) {
				a = l(a);
				var c, d = new h(b),
					e = n.get(a);
				e || n.set(a, e = []);
				for (var f = 0; f < e.length; f++) e[f].observer === this && (c = e[f], c.removeTransientObservers(), c.options = d);
				c || (c = new j(this, a, d), e.push(c), this.nodes_.push(a))
			},
			disconnect: function() {
				this.nodes_.forEach(function(a) {
					for (var b = n.get(a), c = 0; c < b.length; c++) {
						var d = b[c];
						if (d.observer === this) {
							b.splice(c, 1);
							break
						}
					}
				}, this), this.records_ = []
			},
			takeRecords: function() {
				var a = this.records_;
				return this.records_ = [], a
			}
		}, j.prototype = {
			addTransientObserver: function(a) {
				if (a !== this.target) {
					b(this.observer), this.transientObservedNodes.push(a);
					var c = n.get(a);
					c || n.set(a, c = []), c.push(this)
				}
			},
			removeTransientObservers: function() {
				var a = this.transientObservedNodes;
				this.transientObservedNodes = [];
				for (var b = 0; b < a.length; b++)
					for (var c = a[b], d = n.get(c), e = 0; e < d.length; e++)
						if (d[e] === this) {
							d.splice(e, 1);
							break
						}
			}
		}, a.enqueueMutation = g, a.registerTransientObservers = e, a.wrappers.MutationObserver = i, a.wrappers.MutationRecord = d
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a, b) {
			this.root = a, this.parent = b
		}

		function c(a, b) {
			if (a.treeScope_ !== b) {
				a.treeScope_ = b;
				for (var d = a.shadowRoot; d; d = d.olderShadowRoot) d.treeScope_.parent = b;
				for (var e = a.firstChild; e; e = e.nextSibling) c(e, b)
			}
		}

		function d(c) {
			if (c instanceof a.wrappers.Window, c.treeScope_) return c.treeScope_;
			var e, f = c.parentNode;
			return e = f ? d(f) : new b(c, null), c.treeScope_ = e
		}
		b.prototype = {get renderer() {
				return this.root instanceof a.wrappers.ShadowRoot ? a.getRendererForHost(this.root.host) : null
			},
			contains: function(a) {
				for (; a; a = a.parent)
					if (a === this) return !0;
				return !1
			}
		}, a.TreeScope = b, a.getTreeScope = d, a.setTreeScope = c
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			return a instanceof T.ShadowRoot
		}

		function c(a) {
			return M(a).root
		}

		function d(a, d) {
			var h = [],
				i = a;
			for (h.push(i); i;) {
				var j = g(i);
				if (j && j.length > 0) {
					for (var k = 0; k < j.length; k++) {
						var m = j[k];
						if (f(m)) {
							var n = c(m),
								o = n.olderShadowRoot;
							o && h.push(o)
						}
						h.push(m)
					}
					i = j[j.length - 1]
				} else if (b(i)) {
					if (l(a, i) && e(d)) break;
					i = i.host, h.push(i)
				} else i = i.parentNode, i && h.push(i)
			}
			return h
		}

		function e(a) {
			if (!a) return !1;
			switch (a.type) {
				case "abort":
				case "error":
				case "select":
				case "change":
				case "load":
				case "reset":
				case "resize":
				case "scroll":
				case "selectstart":
					return !0
			}
			return !1
		}

		function f(a) {
			return a instanceof HTMLShadowElement
		}

		function g(b) {
			return a.getDestinationInsertionPoints(b)
		}

		function h(a, b) {
			if (0 === a.length) return b;
			b instanceof T.Window && (b = b.document);
			for (var c = M(b), d = a[0], e = M(d), f = j(c, e), g = 0; g < a.length; g++) {
				var h = a[g];
				if (M(h) === f) return h
			}
			return a[a.length - 1]
		}

		function i(a) {
			for (var b = []; a; a = a.parent) b.push(a);
			return b
		}

		function j(a, b) {
			for (var c = i(a), d = i(b), e = null; c.length > 0 && d.length > 0;) {
				var f = c.pop(),
					g = d.pop();
				if (f !== g) break;
				e = f
			}
			return e
		}

		function k(a, b, c) {
			b instanceof T.Window && (b = b.document);
			var e, f = M(b),
				g = M(c),
				h = d(c, a),
				e = j(f, g);
			e || (e = g.root);
			for (var i = e; i; i = i.parent)
				for (var k = 0; k < h.length; k++) {
					var l = h[k];
					if (M(l) === i) return l
				}
			return null
		}

		function l(a, b) {
			return M(a) === M(b)
		}

		function m(a) {
			if (!V.get(a) && (V.set(a, !0), o(S(a), S(a.target)), K)) {
				var b = K;
				throw K = null, b
			}
		}

		function n(a) {
			switch (a.type) {
				case "load":
				case "beforeunload":
				case "unload":
					return !0
			}
			return !1
		}

		function o(b, c) {
			if (W.get(b)) throw new Error("InvalidStateError");
			W.set(b, !0), a.renderAllPending();
			var e, f, g;
			if (n(b) && !b.bubbles) {
				var h = c;
				h instanceof T.Document && (g = h.defaultView) && (f = h, e = [])
			}
			if (!e)
				if (c instanceof T.Window) g = c, e = [];
				else if (e = d(c, b), !n(b)) {
				var h = e[e.length - 1];
				h instanceof T.Document && (g = h.defaultView)
			}
			return cb.set(b, e), p(b, e, g, f) && q(b, e, g, f) && r(b, e, g, f), $.set(b, db), Y.delete(b, null), W.delete(b), b.defaultPrevented
		}

		function p(a, b, c, d) {
			var e = eb;
			if (c && !s(c, a, e, b, d)) return !1;
			for (var f = b.length - 1; f > 0; f--)
				if (!s(b[f], a, e, b, d)) return !1;
			return !0
		}

		function q(a, b, c, d) {
			var e = fb,
				f = b[0] || c;
			return s(f, a, e, b, d)
		}

		function r(a, b, c, d) {
			for (var e = gb, f = 1; f < b.length; f++)
				if (!s(b[f], a, e, b, d)) return;
			c && b.length > 0 && s(c, a, e, b, d)
		}

		function s(a, b, c, d, e) {
			var f = U.get(a);
			if (!f) return !0;
			var g = e || h(d, a);
			if (g === a) {
				if (c === eb) return !0;
				c === gb && (c = fb)
			} else if (c === gb && !b.bubbles) return !0;
			if ("relatedTarget" in b) {
				var i = R(b),
					j = i.relatedTarget;
				if (j) {
					if (j instanceof Object && j.addEventListener) {
						var l = S(j),
							m = k(b, a, l);
						if (m === g) return !0
					} else m = null;
					Z.set(b, m)
				}
			}
			$.set(b, c);
			var n = b.type,
				o = !1;
			X.set(b, g), Y.set(b, a), f.depth++;
			for (var p = 0, q = f.length; q > p; p++) {
				var r = f[p];
				if (r.removed) o = !0;
				else if (!(r.type !== n || !r.capture && c === eb || r.capture && c === gb)) try {
					if ("function" == typeof r.handler ? r.handler.call(a, b) : r.handler.handleEvent(b), ab.get(b)) return !1
				} catch (s) {
					K || (K = s)
				}
			}
			if (f.depth--, o && 0 === f.depth) {
				var t = f.slice();
				f.length = 0;
				for (var p = 0; p < t.length; p++) t[p].removed || f.push(t[p])
			}
			return !_.get(b)
		}

		function t(a, b, c) {
			this.type = a, this.handler = b, this.capture = Boolean(c)
		}

		function u(a, b) {
			if (!(a instanceof hb)) return S(y(hb, "Event", a, b));
			var c = a;
			return sb || "beforeunload" !== c.type || this instanceof z ? void P(c, this) : new z(c)
		}

		function v(a) {
			return a && a.relatedTarget ? Object.create(a, {
				relatedTarget: {
					value: R(a.relatedTarget)
				}
			}) : a
		}

		function w(a, b, c) {
			var d = window[a],
				e = function(b, c) {
					return b instanceof d ? void P(b, this) : S(y(d, a, b, c))
				};
			if (e.prototype = Object.create(b.prototype), c && N(e.prototype, c), d) try {
				O(d, e, new d("temp"))
			} catch (f) {
				O(d, e, document.createEvent(a))
			}
			return e
		}

		function x(a, b) {
			return function() {
				arguments[b] = R(arguments[b]);
				var c = R(this);
				c[a].apply(c, arguments)
			}
		}

		function y(a, b, c, d) {
			if (qb) return new a(c, v(d));
			var e = R(document.createEvent(b)),
				f = pb[b],
				g = [c];
			return Object.keys(f).forEach(function(a) {
				var b = null != d && a in d ? d[a] : f[a];
				"relatedTarget" === a && (b = R(b)), g.push(b)
			}), e["init" + b].apply(e, g), e
		}

		function z(a) {
			u.call(this, a)
		}

		function A(a) {
			return "function" == typeof a ? !0 : a && a.handleEvent
		}

		function B(a) {
			switch (a) {
				case "DOMAttrModified":
				case "DOMAttributeNameChanged":
				case "DOMCharacterDataModified":
				case "DOMElementNameChanged":
				case "DOMNodeInserted":
				case "DOMNodeInsertedIntoDocument":
				case "DOMNodeRemoved":
				case "DOMNodeRemovedFromDocument":
				case "DOMSubtreeModified":
					return !0
			}
			return !1
		}

		function C(a) {
			P(a, this)
		}

		function D(a) {
			return a instanceof T.ShadowRoot && (a = a.host), R(a)
		}

		function E(a, b) {
			var c = U.get(a);
			if (c)
				for (var d = 0; d < c.length; d++)
					if (!c[d].removed && c[d].type === b) return !0;
			return !1
		}

		function F(a, b) {
			for (var c = R(a); c; c = c.parentNode)
				if (E(S(c), b)) return !0;
			return !1
		}

		function G(a) {
			L(a, ub)
		}

		function H(b, c, e, f) {
			a.renderAllPending();
			var g = S(vb.call(Q(c), e, f));
			if (!g) return null;
			var i = d(g, null),
				j = i.lastIndexOf(b);
			return -1 == j ? null : (i = i.slice(0, j), h(i, b))
		}

		function I(a) {
			return function() {
				var b = bb.get(this);
				return b && b[a] && b[a].value || null
			}
		}

		function J(a) {
			var b = a.slice(2);
			return function(c) {
				var d = bb.get(this);
				d || (d = Object.create(null), bb.set(this, d));
				var e = d[a];
				if (e && this.removeEventListener(b, e.wrapped, !1), "function" == typeof c) {
					var f = function(b) {
						var d = c.call(this, b);
						d === !1 ? b.preventDefault() : "onbeforeunload" === a && "string" == typeof d && (b.returnValue = d)
					};
					this.addEventListener(b, f, !1), d[a] = {
						value: c,
						wrapped: f
					}
				}
			}
		}
		var K, L = a.forwardMethodsToWrapper,
			M = a.getTreeScope,
			N = a.mixin,
			O = a.registerWrapper,
			P = a.setWrapper,
			Q = a.unsafeUnwrap,
			R = a.unwrap,
			S = a.wrap,
			T = a.wrappers,
			U = (new WeakMap, new WeakMap),
			V = new WeakMap,
			W = new WeakMap,
			X = new WeakMap,
			Y = new WeakMap,
			Z = new WeakMap,
			$ = new WeakMap,
			_ = new WeakMap,
			ab = new WeakMap,
			bb = new WeakMap,
			cb = new WeakMap,
			db = 0,
			eb = 1,
			fb = 2,
			gb = 3;
		t.prototype = {
			equals: function(a) {
				return this.handler === a.handler && this.type === a.type && this.capture === a.capture
			},
			get removed() {
				return null === this.handler
			},
			remove: function() {
				this.handler = null
			}
		};
		var hb = window.Event;
		hb.prototype.polymerBlackList_ = {
			returnValue: !0,
			keyLocation: !0
		}, u.prototype = {get target() {
				return X.get(this)
			},
			get currentTarget() {
				return Y.get(this)
			},
			get eventPhase() {
				return $.get(this)
			},
			get path() {
				var a = cb.get(this);
				return a ? a.slice() : []
			},
			stopPropagation: function() {
				_.set(this, !0)
			},
			stopImmediatePropagation: function() {
				_.set(this, !0), ab.set(this, !0)
			}
		}, O(hb, u, document.createEvent("Event"));
		var ib = w("UIEvent", u),
			jb = w("CustomEvent", u),
			kb = {get relatedTarget() {
					var a = Z.get(this);
					return void 0 !== a ? a : S(R(this).relatedTarget)
				}
			},
			lb = N({
				initMouseEvent: x("initMouseEvent", 14)
			}, kb),
			mb = N({
				initFocusEvent: x("initFocusEvent", 5)
			}, kb),
			nb = w("MouseEvent", ib, lb),
			ob = w("FocusEvent", ib, mb),
			pb = Object.create(null),
			qb = function() {
				try {
					new window.FocusEvent("focus")
				} catch (a) {
					return !1
				}
				return !0
			}();
		if (!qb) {
			var rb = function(a, b, c) {
				if (c) {
					var d = pb[c];
					b = N(N({}, d), b)
				}
				pb[a] = b
			};
			rb("Event", {
				bubbles: !1,
				cancelable: !1
			}), rb("CustomEvent", {
				detail: null
			}, "Event"), rb("UIEvent", {
				view: null,
				detail: 0
			}, "Event"), rb("MouseEvent", {
				screenX: 0,
				screenY: 0,
				clientX: 0,
				clientY: 0,
				ctrlKey: !1,
				altKey: !1,
				shiftKey: !1,
				metaKey: !1,
				button: 0,
				relatedTarget: null
			}, "UIEvent"), rb("FocusEvent", {
				relatedTarget: null
			}, "UIEvent")
		}
		var sb = window.BeforeUnloadEvent;
		z.prototype = Object.create(u.prototype), N(z.prototype, {get returnValue() {
				return Q(this).returnValue
			},
			set returnValue(a) {
				Q(this).returnValue = a
			}
		}), sb && O(sb, z);
		var tb = window.EventTarget,
			ub = ["addEventListener", "removeEventListener", "dispatchEvent"];
		[Node, Window].forEach(function(a) {
			var b = a.prototype;
			ub.forEach(function(a) {
				Object.defineProperty(b, a + "_", {
					value: b[a]
				})
			})
		}), C.prototype = {
			addEventListener: function(a, b, c) {
				if (A(b) && !B(a)) {
					var d = new t(a, b, c),
						e = U.get(this);
					if (e) {
						for (var f = 0; f < e.length; f++)
							if (d.equals(e[f])) return
					} else e = [], e.depth = 0, U.set(this, e);
					e.push(d);
					var g = D(this);
					g.addEventListener_(a, m, !0)
				}
			},
			removeEventListener: function(a, b, c) {
				c = Boolean(c);
				var d = U.get(this);
				if (d) {
					for (var e = 0, f = !1, g = 0; g < d.length; g++) d[g].type === a && d[g].capture === c && (e++, d[g].handler === b && (f = !0, d[g].remove()));
					if (f && 1 === e) {
						var h = D(this);
						h.removeEventListener_(a, m, !0)
					}
				}
			},
			dispatchEvent: function(b) {
				var c = R(b),
					d = c.type;
				V.set(c, !1), a.renderAllPending();
				var e;
				F(this, d) || (e = function() {}, this.addEventListener(d, e, !0));
				try {
					return R(this).dispatchEvent_(c)
				} finally {
					e && this.removeEventListener(d, e, !0)
				}
			}
		}, tb && O(tb, C);
		var vb = document.elementFromPoint;
		a.elementFromPoint = H, a.getEventHandlerGetter = I, a.getEventHandlerSetter = J, a.wrapEventTargetMethods = G, a.wrappers.BeforeUnloadEvent = z, a.wrappers.CustomEvent = jb, a.wrappers.Event = u, a.wrappers.EventTarget = C, a.wrappers.FocusEvent = ob, a.wrappers.MouseEvent = nb, a.wrappers.UIEvent = ib
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a, b) {
			Object.defineProperty(a, b, p)
		}

		function c(a) {
			j(a, this)
		}

		function d() {
			this.length = 0, b(this, "length")
		}

		function e(a) {
			for (var b = new d, e = 0; e < a.length; e++) b[e] = new c(a[e]);
			return b.length = e, b
		}

		function f(a) {
			g.call(this, a)
		}
		var g = a.wrappers.UIEvent,
			h = a.mixin,
			i = a.registerWrapper,
			j = a.setWrapper,
			k = a.unsafeUnwrap,
			l = a.wrap,
			m = window.TouchEvent;
		if (m) {
			var n;
			try {
				n = document.createEvent("TouchEvent")
			} catch (o) {
				return
			}
			var p = {
				enumerable: !1
			};
			c.prototype = {get target() {
					return l(k(this).target)
				}
			};
			var q = {
				configurable: !0,
				enumerable: !0,
				get: null
			};
			["clientX", "clientY", "screenX", "screenY", "pageX", "pageY", "identifier", "webkitRadiusX", "webkitRadiusY", "webkitRotationAngle", "webkitForce"].forEach(function(a) {
				q.get = function() {
					return k(this)[a]
				}, Object.defineProperty(c.prototype, a, q)
			}), d.prototype = {
				item: function(a) {
					return this[a]
				}
			}, f.prototype = Object.create(g.prototype), h(f.prototype, {get touches() {
					return e(k(this).touches)
				},
				get targetTouches() {
					return e(k(this).targetTouches)
				},
				get changedTouches() {
					return e(k(this).changedTouches)
				},
				initTouchEvent: function() {
					throw new Error("Not implemented")
				}
			}), i(m, f, n), a.wrappers.Touch = c, a.wrappers.TouchEvent = f, a.wrappers.TouchList = d
		}
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a, b) {
			Object.defineProperty(a, b, h)
		}

		function c() {
			this.length = 0, b(this, "length")
		}

		function d(a) {
			if (null == a) return a;
			for (var b = new c, d = 0, e = a.length; e > d; d++) b[d] = g(a[d]);
			return b.length = e, b
		}

		function e(a, b) {
			a.prototype[b] = function() {
				return d(f(this)[b].apply(f(this), arguments))
			}
		}
		var f = a.unsafeUnwrap,
			g = a.wrap,
			h = {
				enumerable: !1
			};
		c.prototype = {
			item: function(a) {
				return this[a]
			}
		}, b(c.prototype, "item"), a.wrappers.NodeList = c, a.addWrapNodeListMethod = e, a.wrapNodeList = d
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";
		a.wrapHTMLCollection = a.wrapNodeList, a.wrappers.HTMLCollection = a.wrappers.NodeList
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			A(a instanceof w)
		}

		function c(a) {
			var b = new y;
			return b[0] = a, b.length = 1, b
		}

		function d(a, b, c) {
			C(b, "childList", {
				removedNodes: c,
				previousSibling: a.previousSibling,
				nextSibling: a.nextSibling
			})
		}

		function e(a, b) {
			C(a, "childList", {
				removedNodes: b
			})
		}

		function f(a, b, d, e) {
			if (a instanceof DocumentFragment) {
				var f = h(a);
				P = !0;
				for (var g = f.length - 1; g >= 0; g--) a.removeChild(f[g]), f[g].parentNode_ = b;
				P = !1;
				for (var g = 0; g < f.length; g++) f[g].previousSibling_ = f[g - 1] || d, f[g].nextSibling_ = f[g + 1] || e;
				return d && (d.nextSibling_ = f[0]), e && (e.previousSibling_ = f[f.length - 1]), f
			}
			var f = c(a),
				i = a.parentNode;
			return i && i.removeChild(a), a.parentNode_ = b, a.previousSibling_ = d, a.nextSibling_ = e, d && (d.nextSibling_ = a), e && (e.previousSibling_ = a), f
		}

		function g(a) {
			if (a instanceof DocumentFragment) return h(a);
			var b = c(a),
				e = a.parentNode;
			return e && d(a, e, b), b
		}

		function h(a) {
			for (var b = new y, c = 0, d = a.firstChild; d; d = d.nextSibling) b[c++] = d;
			return b.length = c, e(a, b), b
		}

		function i(a) {
			return a
		}

		function j(a, b) {
			I(a, b), a.nodeIsInserted_()
		}

		function k(a, b) {
			for (var c = D(b), d = 0; d < a.length; d++) j(a[d], c)
		}

		function l(a) {
			I(a, new z(a, null))
		}

		function m(a) {
			for (var b = 0; b < a.length; b++) l(a[b])
		}

		function n(a, b) {
			var c = a.nodeType === w.DOCUMENT_NODE ? a : a.ownerDocument;
			c !== b.ownerDocument && c.adoptNode(b)
		}

		function o(b, c) {
			if (c.length) {
				var d = b.ownerDocument;
				if (d !== c[0].ownerDocument)
					for (var e = 0; e < c.length; e++) a.adoptNodeNoRemove(c[e], d)
			}
		}

		function p(a, b) {
			o(a, b);
			var c = b.length;
			if (1 === c) return K(b[0]);
			for (var d = K(a.ownerDocument.createDocumentFragment()), e = 0; c > e; e++) d.appendChild(K(b[e]));
			return d
		}

		function q(a) {
			if (void 0 !== a.firstChild_)
				for (var b = a.firstChild_; b;) {
					var c = b;
					b = b.nextSibling_, c.parentNode_ = c.previousSibling_ = c.nextSibling_ = void 0
				}
			a.firstChild_ = a.lastChild_ = void 0
		}

		function r(a) {
			if (a.invalidateShadowRenderer()) {
				for (var b = a.firstChild; b;) {
					A(b.parentNode === a);
					var c = b.nextSibling,
						d = K(b),
						e = d.parentNode;
					e && W.call(e, d), b.previousSibling_ = b.nextSibling_ = b.parentNode_ = null, b = c
				}
				a.firstChild_ = a.lastChild_ = null
			} else
				for (var c, f = K(a), g = f.firstChild; g;) c = g.nextSibling, W.call(f, g), g = c
		}

		function s(a) {
			var b = a.parentNode;
			return b && b.invalidateShadowRenderer()
		}

		function t(a) {
			for (var b, c = 0; c < a.length; c++) b = a[c], b.parentNode.removeChild(b)
		}

		function u(a, b, c) {
			var d;
			if (d = M(c ? Q.call(c, J(a), !1) : R.call(J(a), !1)), b) {
				for (var e = a.firstChild; e; e = e.nextSibling) d.appendChild(u(e, !0, c));
				if (a instanceof O.HTMLTemplateElement)
					for (var f = d.content, e = a.content.firstChild; e; e = e.nextSibling) f.appendChild(u(e, !0, c))
			}
			return d
		}

		function v(a, b) {
			if (!b || D(a) !== D(b)) return !1;
			for (var c = b; c; c = c.parentNode)
				if (c === a) return !0;
			return !1
		}

		function w(a) {
			A(a instanceof S), x.call(this, a), this.parentNode_ = void 0, this.firstChild_ = void 0, this.lastChild_ = void 0, this.nextSibling_ = void 0, this.previousSibling_ = void 0, this.treeScope_ = void 0
		}
		var x = a.wrappers.EventTarget,
			y = a.wrappers.NodeList,
			z = a.TreeScope,
			A = a.assert,
			B = a.defineWrapGetter,
			C = a.enqueueMutation,
			D = a.getTreeScope,
			E = a.isWrapper,
			F = a.mixin,
			G = a.registerTransientObservers,
			H = a.registerWrapper,
			I = a.setTreeScope,
			J = a.unsafeUnwrap,
			K = a.unwrap,
			L = a.unwrapIfNeeded,
			M = a.wrap,
			N = a.wrapIfNeeded,
			O = a.wrappers,
			P = !1,
			Q = document.importNode,
			R = window.Node.prototype.cloneNode,
			S = window.Node,
			T = window.DocumentFragment,
			U = (S.prototype.appendChild, S.prototype.compareDocumentPosition),
			V = S.prototype.insertBefore,
			W = S.prototype.removeChild,
			X = S.prototype.replaceChild,
			Y = /Trident/.test(navigator.userAgent),
			Z = Y ? function(a, b) {
				try {
					W.call(a, b)
				} catch (c) {
					if (!(a instanceof T)) throw c
				}
			} : function(a, b) {
				W.call(a, b)
			};
		w.prototype = Object.create(x.prototype), F(w.prototype, {
			appendChild: function(a) {
				return this.insertBefore(a, null)
			},
			insertBefore: function(a, c) {
				b(a);
				var d;
				c ? E(c) ? d = K(c) : (d = c, c = M(d)) : (c = null, d = null), c && A(c.parentNode === this);
				var e, h = c ? c.previousSibling : this.lastChild,
					i = !this.invalidateShadowRenderer() && !s(a);
				if (e = i ? g(a) : f(a, this, h, c), i) n(this, a), q(this), V.call(J(this), K(a), d);
				else {
					h || (this.firstChild_ = e[0]), c || (this.lastChild_ = e[e.length - 1], void 0 === this.firstChild_ && (this.firstChild_ = this.firstChild));
					var j = d ? d.parentNode : J(this);
					j ? V.call(j, p(this, e), d) : o(this, e)
				}
				return C(this, "childList", {
					addedNodes: e,
					nextSibling: c,
					previousSibling: h
				}), k(e, this), a
			},
			removeChild: function(a) {
				if (b(a), a.parentNode !== this) {
					for (var d = !1, e = (this.childNodes, this.firstChild); e; e = e.nextSibling)
						if (e === a) {
							d = !0;
							break
						}
					if (!d) throw new Error("NotFoundError")
				}
				var f = K(a),
					g = a.nextSibling,
					h = a.previousSibling;
				if (this.invalidateShadowRenderer()) {
					var i = this.firstChild,
						j = this.lastChild,
						k = f.parentNode;
					k && Z(k, f), i === a && (this.firstChild_ = g), j === a && (this.lastChild_ = h), h && (h.nextSibling_ = g), g && (g.previousSibling_ = h), a.previousSibling_ = a.nextSibling_ = a.parentNode_ = void 0
				} else q(this), Z(J(this), f);
				return P || C(this, "childList", {
					removedNodes: c(a),
					nextSibling: g,
					previousSibling: h
				}), G(this, a), a
			},
			replaceChild: function(a, d) {
				b(a);
				var e;
				if (E(d) ? e = K(d) : (e = d, d = M(e)), d.parentNode !== this) throw new Error("NotFoundError");
				var h, i = d.nextSibling,
					j = d.previousSibling,
					m = !this.invalidateShadowRenderer() && !s(a);
				return m ? h = g(a) : (i === a && (i = a.nextSibling), h = f(a, this, j, i)), m ? (n(this, a), q(this), X.call(J(this), K(a), e)) : (this.firstChild === d && (this.firstChild_ = h[0]), this.lastChild === d && (this.lastChild_ = h[h.length - 1]), d.previousSibling_ = d.nextSibling_ = d.parentNode_ = void 0, e.parentNode && X.call(e.parentNode, p(this, h), e)), C(this, "childList", {
					addedNodes: h,
					removedNodes: c(d),
					nextSibling: i,
					previousSibling: j
				}), l(d), k(h, this), d
			},
			nodeIsInserted_: function() {
				for (var a = this.firstChild; a; a = a.nextSibling) a.nodeIsInserted_()
			},
			hasChildNodes: function() {
				return null !== this.firstChild
			},
			get parentNode() {
				return void 0 !== this.parentNode_ ? this.parentNode_ : M(J(this).parentNode)
			},
			get firstChild() {
				return void 0 !== this.firstChild_ ? this.firstChild_ : M(J(this).firstChild)
			},
			get lastChild() {
				return void 0 !== this.lastChild_ ? this.lastChild_ : M(J(this).lastChild)
			},
			get nextSibling() {
				return void 0 !== this.nextSibling_ ? this.nextSibling_ : M(J(this).nextSibling)
			},
			get previousSibling() {
				return void 0 !== this.previousSibling_ ? this.previousSibling_ : M(J(this).previousSibling)
			},
			get parentElement() {
				for (var a = this.parentNode; a && a.nodeType !== w.ELEMENT_NODE;) a = a.parentNode;
				return a
			},
			get textContent() {
				for (var a = "", b = this.firstChild; b; b = b.nextSibling) b.nodeType != w.COMMENT_NODE && (a += b.textContent);
				return a
			},
			set textContent(a) {
				var b = i(this.childNodes);
				if (this.invalidateShadowRenderer()) {
					if (r(this), "" !== a) {
						var c = J(this).ownerDocument.createTextNode(a);
						this.appendChild(c)
					}
				} else q(this), J(this).textContent = a;
				var d = i(this.childNodes);
				C(this, "childList", {
					addedNodes: d,
					removedNodes: b
				}), m(b), k(d, this)
			},
			get childNodes() {
				for (var a = new y, b = 0, c = this.firstChild; c; c = c.nextSibling) a[b++] = c;
				return a.length = b, a
			},
			cloneNode: function(a) {
				return u(this, a)
			},
			contains: function(a) {
				return v(this, N(a))
			},
			compareDocumentPosition: function(a) {
				return U.call(J(this), L(a))
			},
			normalize: function() {
				for (var a, b, c = i(this.childNodes), d = [], e = "", f = 0; f < c.length; f++) b = c[f], b.nodeType === w.TEXT_NODE ? a || b.data.length ? a ? (e += b.data, d.push(b)) : a = b : this.removeNode(b) : (a && d.length && (a.data += e, t(d)), d = [], e = "", a = null, b.childNodes.length && b.normalize());
				a && d.length && (a.data += e, t(d))
			}
		}), B(w, "ownerDocument"), H(S, w, document.createDocumentFragment()), delete w.prototype.querySelector, delete w.prototype.querySelectorAll, w.prototype = F(Object.create(x.prototype), w.prototype), a.cloneNode = u, a.nodeWasAdded = j, a.nodeWasRemoved = l, a.nodesWereAdded = k, a.nodesWereRemoved = m, a.originalInsertBefore = V, a.originalRemoveChild = W, a.snapshotNodeList = i, a.wrappers.Node = w
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(b, c, d, e) {
			for (var f = null, g = null, h = 0, i = b.length; i > h; h++) f = s(b[h]), !e && (g = q(f).root) && g instanceof a.wrappers.ShadowRoot || (d[c++] = f);
			return c
		}

		function c(a) {
			return String(a).replace(/\/deep\//g, " ")
		}

		function d(a, b) {
			for (var c, e = a.firstElementChild; e;) {
				if (e.matches(b)) return e;
				if (c = d(e, b)) return c;
				e = e.nextElementSibling
			}
			return null
		}

		function e(a, b) {
			return a.matches(b)
		}

		function f(a, b, c) {
			var d = a.localName;
			return d === b || d === c && a.namespaceURI === D
		}

		function g() {
			return !0
		}

		function h(a, b, c) {
			return a.localName === c
		}

		function i(a, b) {
			return a.namespaceURI === b
		}

		function j(a, b, c) {
			return a.namespaceURI === b && a.localName === c
		}

		function k(a, b, c, d, e, f) {
			for (var g = a.firstElementChild; g;) d(g, e, f) && (c[b++] = g), b = k(g, b, c, d, e, f), g = g.nextElementSibling;
			return b
		}

		function l(c, d, e, f, g) {
			var h, i = r(this),
				j = q(this).root;
			if (j instanceof a.wrappers.ShadowRoot) return k(this, d, e, c, f, null);
			if (i instanceof B) h = w.call(i, f);
			else {
				if (!(i instanceof C)) return k(this, d, e, c, f, null);
				h = v.call(i, f)
			}
			return b(h, d, e, g)
		}

		function m(c, d, e, f, g) {
			var h, i = r(this),
				j = q(this).root;
			if (j instanceof a.wrappers.ShadowRoot) return k(this, d, e, c, f, g);
			if (i instanceof B) h = y.call(i, f, g);
			else {
				if (!(i instanceof C)) return k(this, d, e, c, f, g);
				h = x.call(i, f, g)
			}
			return b(h, d, e, !1)
		}

		function n(c, d, e, f, g) {
			var h, i = r(this),
				j = q(this).root;
			if (j instanceof a.wrappers.ShadowRoot) return k(this, d, e, c, f, g);
			if (i instanceof B) h = A.call(i, f, g);
			else {
				if (!(i instanceof C)) return k(this, d, e, c, f, g);
				h = z.call(i, f, g)
			}
			return b(h, d, e, !1)
		}
		var o = a.wrappers.HTMLCollection,
			p = a.wrappers.NodeList,
			q = a.getTreeScope,
			r = a.unsafeUnwrap,
			s = a.wrap,
			t = document.querySelector,
			u = document.documentElement.querySelector,
			v = document.querySelectorAll,
			w = document.documentElement.querySelectorAll,
			x = document.getElementsByTagName,
			y = document.documentElement.getElementsByTagName,
			z = document.getElementsByTagNameNS,
			A = document.documentElement.getElementsByTagNameNS,
			B = window.Element,
			C = window.HTMLDocument || window.Document,
			D = "http://www.w3.org/1999/xhtml",
			E = {
				querySelector: function(b) {
					var e = c(b),
						f = e !== b;
					b = e;
					var g, h = r(this),
						i = q(this).root;
					if (i instanceof a.wrappers.ShadowRoot) return d(this, b);
					if (h instanceof B) g = s(u.call(h, b));
					else {
						if (!(h instanceof C)) return d(this, b);
						g = s(t.call(h, b))
					}
					return g && !f && (i = q(g).root) && i instanceof a.wrappers.ShadowRoot ? d(this, b) : g
				},
				querySelectorAll: function(a) {
					var b = c(a),
						d = b !== a;
					a = b;
					var f = new p;
					return f.length = l.call(this, e, 0, f, a, d), f
				}
			},
			F = {
				getElementsByTagName: function(a) {
					var b = new o,
						c = "*" === a ? g : f;
					return b.length = m.call(this, c, 0, b, a, a.toLowerCase()), b
				},
				getElementsByClassName: function(a) {
					return this.querySelectorAll("." + a)
				},
				getElementsByTagNameNS: function(a, b) {
					var c = new o,
						d = null;
					return d = "*" === a ? "*" === b ? g : h : "*" === b ? i : j, c.length = n.call(this, d, 0, c, a || null, b), c
				}
			};
		a.GetElementsByInterface = F, a.SelectorsInterface = E
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			for (; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.nextSibling;
			return a
		}

		function c(a) {
			for (; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.previousSibling;
			return a
		}
		var d = a.wrappers.NodeList,
			e = {get firstElementChild() {
					return b(this.firstChild)
				},
				get lastElementChild() {
					return c(this.lastChild)
				},
				get childElementCount() {
					for (var a = 0, b = this.firstElementChild; b; b = b.nextElementSibling) a++;
					return a
				},
				get children() {
					for (var a = new d, b = 0, c = this.firstElementChild; c; c = c.nextElementSibling) a[b++] = c;
					return a.length = b, a
				},
				remove: function() {
					var a = this.parentNode;
					a && a.removeChild(this)
				}
			},
			f = {get nextElementSibling() {
					return b(this.nextSibling)
				},
				get previousElementSibling() {
					return c(this.previousSibling)
				}
			};
		a.ChildNodeInterface = f, a.ParentNodeInterface = e
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			d.call(this, a)
		}
		var c = a.ChildNodeInterface,
			d = a.wrappers.Node,
			e = a.enqueueMutation,
			f = a.mixin,
			g = a.registerWrapper,
			h = a.unsafeUnwrap,
			i = window.CharacterData;
		b.prototype = Object.create(d.prototype), f(b.prototype, {get textContent() {
				return this.data
			},
			set textContent(a) {
				this.data = a
			},
			get data() {
				return h(this).data
			},
			set data(a) {
				var b = h(this).data;
				e(this, "characterData", {
					oldValue: b
				}), h(this).data = a
			}
		}), f(b.prototype, c), g(i, b, document.createTextNode("")), a.wrappers.CharacterData = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			return a >>> 0
		}

		function c(a) {
			d.call(this, a)
		}
		var d = a.wrappers.CharacterData,
			e = (a.enqueueMutation, a.mixin),
			f = a.registerWrapper,
			g = window.Text;
		c.prototype = Object.create(d.prototype), e(c.prototype, {
			splitText: function(a) {
				a = b(a);
				var c = this.data;
				if (a > c.length) throw new Error("IndexSizeError");
				var d = c.slice(0, a),
					e = c.slice(a);
				this.data = d;
				var f = this.ownerDocument.createTextNode(e);
				return this.parentNode && this.parentNode.insertBefore(f, this.nextSibling), f
			}
		}), f(g, c, document.createTextNode("")), a.wrappers.Text = c
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(b) {
			a.invalidateRendererBasedOnAttribute(b, "class")
		}

		function c(a, b) {
			d(a, this), this.ownerElement_ = b
		}
		var d = a.setWrapper,
			e = a.unsafeUnwrap;
		c.prototype = {
			constructor: c,
			get length() {
				return e(this).length
			},
			item: function(a) {
				return e(this).item(a)
			},
			contains: function(a) {
				return e(this).contains(a)
			},
			add: function() {
				e(this).add.apply(e(this), arguments), b(this.ownerElement_)
			},
			remove: function() {
				e(this).remove.apply(e(this), arguments), b(this.ownerElement_)
			},
			toggle: function() {
				var a = e(this).toggle.apply(e(this), arguments);
				return b(this.ownerElement_), a
			},
			toString: function() {
				return e(this).toString()
			}
		}, a.wrappers.DOMTokenList = c
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(b, c) {
			var d = b.parentNode;
			if (d && d.shadowRoot) {
				var e = a.getRendererForHost(d);
				e.dependsOnAttribute(c) && e.invalidate()
			}
		}

		function c(a, b, c) {
			k(a, "attributes", {
				name: b,
				namespace: null,
				oldValue: c
			})
		}

		function d(a) {
			g.call(this, a)
		}
		var e = a.ChildNodeInterface,
			f = a.GetElementsByInterface,
			g = a.wrappers.Node,
			h = a.wrappers.DOMTokenList,
			i = a.ParentNodeInterface,
			j = a.SelectorsInterface,
			k = (a.addWrapNodeListMethod, a.enqueueMutation),
			l = a.mixin,
			m = (a.oneOf, a.registerWrapper),
			n = a.unsafeUnwrap,
			o = a.wrappers,
			p = window.Element,
			q = ["matches", "mozMatchesSelector", "msMatchesSelector", "webkitMatchesSelector"].filter(function(a) {
				return p.prototype[a]
			}),
			r = q[0],
			s = p.prototype[r],
			t = new WeakMap;
		d.prototype = Object.create(g.prototype), l(d.prototype, {
			createShadowRoot: function() {
				var b = new o.ShadowRoot(this);
				n(this).polymerShadowRoot_ = b;
				var c = a.getRendererForHost(this);
				return c.invalidate(), b
			},
			get shadowRoot() {
				return n(this).polymerShadowRoot_ || null
			},
			setAttribute: function(a, d) {
				var e = n(this).getAttribute(a);
				n(this).setAttribute(a, d), c(this, a, e), b(this, a)
			},
			removeAttribute: function(a) {
				var d = n(this).getAttribute(a);
				n(this).removeAttribute(a), c(this, a, d), b(this, a)
			},
			matches: function(a) {
				return s.call(n(this), a)
			},
			get classList() {
				var a = t.get(this);
				return a || t.set(this, a = new h(n(this).classList, this)), a
			},
			get className() {
				return n(this).className
			},
			set className(a) {
				this.setAttribute("class", a)
			},
			get id() {
				return n(this).id
			},
			set id(a) {
				this.setAttribute("id", a)
			}
		}), q.forEach(function(a) {
			"matches" !== a && (d.prototype[a] = function(a) {
				return this.matches(a)
			})
		}), p.prototype.webkitCreateShadowRoot && (d.prototype.webkitCreateShadowRoot = d.prototype.createShadowRoot), l(d.prototype, e), l(d.prototype, f), l(d.prototype, i), l(d.prototype, j), m(p, d, document.createElementNS(null, "x")), a.invalidateRendererBasedOnAttribute = b, a.matchesNames = q, a.wrappers.Element = d
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			switch (a) {
				case "&":
					return "&amp;";
				case "<":
					return "&lt;";
				case ">":
					return "&gt;";
				case '"':
					return "&quot;";
				case "\xa0":
					return "&nbsp;"
			}
		}

		function c(a) {
			return a.replace(A, b)
		}

		function d(a) {
			return a.replace(B, b)
		}

		function e(a) {
			for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;
			return b
		}

		function f(a, b) {
			switch (a.nodeType) {
				case Node.ELEMENT_NODE:
					for (var e, f = a.tagName.toLowerCase(), h = "<" + f, i = a.attributes, j = 0; e = i[j]; j++) h += " " + e.name + '="' + c(e.value) + '"';
					return h += ">", C[f] ? h : h + g(a) + "</" + f + ">";
				case Node.TEXT_NODE:
					var k = a.data;
					return b && D[b.localName] ? k : d(k);
				case Node.COMMENT_NODE:
					return "<!--" + a.data + "-->";
				default:
					throw console.error(a), new Error("not implemented")
			}
		}

		function g(a) {
			a instanceof z.HTMLTemplateElement && (a = a.content);
			for (var b = "", c = a.firstChild; c; c = c.nextSibling) b += f(c, a);
			return b
		}

		function h(a, b, c) {
			var d = c || "div";
			a.textContent = "";
			var e = x(a.ownerDocument.createElement(d));
			e.innerHTML = b;
			for (var f; f = e.firstChild;) a.appendChild(y(f))
		}

		function i(a) {
			o.call(this, a)
		}

		function j(a, b) {
			var c = x(a.cloneNode(!1));
			c.innerHTML = b;
			for (var d, e = x(document.createDocumentFragment()); d = c.firstChild;) e.appendChild(d);
			return y(e)
		}

		function k(b) {
			return function() {
				return a.renderAllPending(), w(this)[b]
			}
		}

		function l(a) {
			p(i, a, k(a))
		}

		function m(b) {
			Object.defineProperty(i.prototype, b, {
				get: k(b),
				set: function(c) {
					a.renderAllPending(), w(this)[b] = c
				},
				configurable: !0,
				enumerable: !0
			})
		}

		function n(b) {
			Object.defineProperty(i.prototype, b, {
				value: function() {
					return a.renderAllPending(), w(this)[b].apply(w(this), arguments)
				},
				configurable: !0,
				enumerable: !0
			})
		}
		var o = a.wrappers.Element,
			p = a.defineGetter,
			q = a.enqueueMutation,
			r = a.mixin,
			s = a.nodesWereAdded,
			t = a.nodesWereRemoved,
			u = a.registerWrapper,
			v = a.snapshotNodeList,
			w = a.unsafeUnwrap,
			x = a.unwrap,
			y = a.wrap,
			z = a.wrappers,
			A = /[&\u00A0"]/g,
			B = /[&\u00A0<>]/g,
			C = e(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]),
			D = e(["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"]),
			E = /MSIE/.test(navigator.userAgent),
			F = window.HTMLElement,
			G = window.HTMLTemplateElement;
		i.prototype = Object.create(o.prototype), r(i.prototype, {get innerHTML() {
				return g(this)
			},
			set innerHTML(a) {
				if (E && D[this.localName]) return void(this.textContent = a);
				var b = v(this.childNodes);
				this.invalidateShadowRenderer() ? this instanceof z.HTMLTemplateElement ? h(this.content, a) : h(this, a, this.tagName) : !G && this instanceof z.HTMLTemplateElement ? h(this.content, a) : w(this).innerHTML = a;
				var c = v(this.childNodes);
				q(this, "childList", {
					addedNodes: c,
					removedNodes: b
				}), t(b), s(c, this)
			},
			get outerHTML() {
				return f(this, this.parentNode)
			},
			set outerHTML(a) {
				var b = this.parentNode;
				if (b) {
					b.invalidateShadowRenderer();
					var c = j(b, a);
					b.replaceChild(c, this)
				}
			},
			insertAdjacentHTML: function(a, b) {
				var c, d;
				switch (String(a).toLowerCase()) {
					case "beforebegin":
						c = this.parentNode, d = this;
						break;
					case "afterend":
						c = this.parentNode, d = this.nextSibling;
						break;
					case "afterbegin":
						c = this, d = this.firstChild;
						break;
					case "beforeend":
						c = this, d = null;
						break;
					default:
						return
				}
				var e = j(c, b);
				c.insertBefore(e, d)
			},
			get hidden() {
				return this.hasAttribute("hidden")
			},
			set hidden(a) {
				a ? this.setAttribute("hidden", "") : this.removeAttribute("hidden")
			}
		}), ["clientHeight", "clientLeft", "clientTop", "clientWidth", "offsetHeight", "offsetLeft", "offsetTop", "offsetWidth", "scrollHeight", "scrollWidth"].forEach(l), ["scrollLeft", "scrollTop"].forEach(m), ["getBoundingClientRect", "getClientRects", "scrollIntoView"].forEach(n), u(F, i, document.createElement("b")), a.wrappers.HTMLElement = i, a.getInnerHTML = g, a.setInnerHTML = h
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.HTMLElement,
			d = a.mixin,
			e = a.registerWrapper,
			f = a.unsafeUnwrap,
			g = a.wrap,
			h = window.HTMLCanvasElement;
		b.prototype = Object.create(c.prototype), d(b.prototype, {
			getContext: function() {
				var a = f(this).getContext.apply(f(this), arguments);
				return a && g(a)
			}
		}), e(h, b, document.createElement("canvas")), a.wrappers.HTMLCanvasElement = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.HTMLElement,
			d = a.mixin,
			e = a.registerWrapper,
			f = window.HTMLContentElement;
		b.prototype = Object.create(c.prototype), d(b.prototype, {
			constructor: b,
			get select() {
				return this.getAttribute("select")
			},
			set select(a) {
				this.setAttribute("select", a)
			},
			setAttribute: function(a, b) {
				c.prototype.setAttribute.call(this, a, b), "select" === String(a).toLowerCase() && this.invalidateShadowRenderer(!0)
			}
		}), f && e(f, b), a.wrappers.HTMLContentElement = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.HTMLElement,
			d = a.mixin,
			e = a.registerWrapper,
			f = a.wrapHTMLCollection,
			g = a.unwrap,
			h = window.HTMLFormElement;
		b.prototype = Object.create(c.prototype), d(b.prototype, {get elements() {
				return f(g(this).elements)
			}
		}), e(h, b, document.createElement("form")), a.wrappers.HTMLFormElement = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			d.call(this, a)
		}

		function c(a, b) {
			if (!(this instanceof c)) throw new TypeError("DOM object constructor cannot be called as a function.");
			var e = f(document.createElement("img"));
			d.call(this, e), g(e, this), void 0 !== a && (e.width = a), void 0 !== b && (e.height = b)
		}
		var d = a.wrappers.HTMLElement,
			e = a.registerWrapper,
			f = a.unwrap,
			g = a.rewrap,
			h = window.HTMLImageElement;
		b.prototype = Object.create(d.prototype), e(h, b, document.createElement("img")), c.prototype = b.prototype, a.wrappers.HTMLImageElement = b, a.wrappers.Image = c
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.HTMLElement,
			d = (a.mixin, a.wrappers.NodeList, a.registerWrapper),
			e = window.HTMLShadowElement;
		b.prototype = Object.create(c.prototype), b.prototype.constructor = b, e && d(e, b), a.wrappers.HTMLShadowElement = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			if (!a.defaultView) return a;
			var b = l.get(a);
			if (!b) {
				for (b = a.implementation.createHTMLDocument(""); b.lastChild;) b.removeChild(b.lastChild);
				l.set(a, b)
			}
			return b
		}

		function c(a) {
			for (var c, d = b(a.ownerDocument), e = i(d.createDocumentFragment()); c = a.firstChild;) e.appendChild(c);
			return e
		}

		function d(a) {
			if (e.call(this, a), !m) {
				var b = c(a);
				k.set(this, j(b))
			}
		}
		var e = a.wrappers.HTMLElement,
			f = a.mixin,
			g = a.registerWrapper,
			h = a.unsafeUnwrap,
			i = a.unwrap,
			j = a.wrap,
			k = new WeakMap,
			l = new WeakMap,
			m = window.HTMLTemplateElement;
		d.prototype = Object.create(e.prototype), f(d.prototype, {
			constructor: d,
			get content() {
				return m ? j(h(this).content) : k.get(this)
			}
		}), m && g(m, d), a.wrappers.HTMLTemplateElement = d
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.HTMLElement,
			d = a.registerWrapper,
			e = window.HTMLMediaElement;
		e && (b.prototype = Object.create(c.prototype), d(e, b, document.createElement("audio")), a.wrappers.HTMLMediaElement = b)
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			d.call(this, a)
		}

		function c(a) {
			if (!(this instanceof c)) throw new TypeError("DOM object constructor cannot be called as a function.");
			var b = f(document.createElement("audio"));
			d.call(this, b), g(b, this), b.setAttribute("preload", "auto"), void 0 !== a && b.setAttribute("src", a)
		}
		var d = a.wrappers.HTMLMediaElement,
			e = a.registerWrapper,
			f = a.unwrap,
			g = a.rewrap,
			h = window.HTMLAudioElement;
		h && (b.prototype = Object.create(d.prototype), e(h, b, document.createElement("audio")), c.prototype = b.prototype, a.wrappers.HTMLAudioElement = b, a.wrappers.Audio = c)
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			return a.replace(/\s+/g, " ").trim()
		}

		function c(a) {
			e.call(this, a)
		}

		function d(a, b, c, f) {
			if (!(this instanceof d)) throw new TypeError("DOM object constructor cannot be called as a function.");
			var g = i(document.createElement("option"));
			e.call(this, g), h(g, this), void 0 !== a && (g.text = a), void 0 !== b && g.setAttribute("value", b), c === !0 && g.setAttribute("selected", ""), g.selected = f === !0
		}
		var e = a.wrappers.HTMLElement,
			f = a.mixin,
			g = a.registerWrapper,
			h = a.rewrap,
			i = a.unwrap,
			j = a.wrap,
			k = window.HTMLOptionElement;
		c.prototype = Object.create(e.prototype), f(c.prototype, {get text() {
				return b(this.textContent)
			},
			set text(a) {
				this.textContent = b(String(a))
			},
			get form() {
				return j(i(this).form)
			}
		}), g(k, c, document.createElement("option")), d.prototype = c.prototype, a.wrappers.HTMLOptionElement = c, a.wrappers.Option = d
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.HTMLElement,
			d = a.mixin,
			e = a.registerWrapper,
			f = a.unwrap,
			g = a.wrap,
			h = window.HTMLSelectElement;
		b.prototype = Object.create(c.prototype), d(b.prototype, {
			add: function(a, b) {
				"object" == typeof b && (b = f(b)), f(this).add(f(a), b)
			},
			remove: function(a) {
				return void 0 === a ? void c.prototype.remove.call(this) : ("object" == typeof a && (a = f(a)), void f(this).remove(a))
			},
			get form() {
				return g(f(this).form)
			}
		}), e(h, b, document.createElement("select")), a.wrappers.HTMLSelectElement = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.HTMLElement,
			d = a.mixin,
			e = a.registerWrapper,
			f = a.unwrap,
			g = a.wrap,
			h = a.wrapHTMLCollection,
			i = window.HTMLTableElement;
		b.prototype = Object.create(c.prototype), d(b.prototype, {get caption() {
				return g(f(this).caption)
			},
			createCaption: function() {
				return g(f(this).createCaption())
			},
			get tHead() {
				return g(f(this).tHead)
			},
			createTHead: function() {
				return g(f(this).createTHead())
			},
			createTFoot: function() {
				return g(f(this).createTFoot())
			},
			get tFoot() {
				return g(f(this).tFoot)
			},
			get tBodies() {
				return h(f(this).tBodies)
			},
			createTBody: function() {
				return g(f(this).createTBody())
			},
			get rows() {
				return h(f(this).rows)
			},
			insertRow: function(a) {
				return g(f(this).insertRow(a))
			}
		}), e(i, b, document.createElement("table")), a.wrappers.HTMLTableElement = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.HTMLElement,
			d = a.mixin,
			e = a.registerWrapper,
			f = a.wrapHTMLCollection,
			g = a.unwrap,
			h = a.wrap,
			i = window.HTMLTableSectionElement;
		b.prototype = Object.create(c.prototype), d(b.prototype, {
			constructor: b,
			get rows() {
				return f(g(this).rows)
			},
			insertRow: function(a) {
				return h(g(this).insertRow(a))
			}
		}), e(i, b, document.createElement("thead")), a.wrappers.HTMLTableSectionElement = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.HTMLElement,
			d = a.mixin,
			e = a.registerWrapper,
			f = a.wrapHTMLCollection,
			g = a.unwrap,
			h = a.wrap,
			i = window.HTMLTableRowElement;
		b.prototype = Object.create(c.prototype), d(b.prototype, {get cells() {
				return f(g(this).cells)
			},
			insertCell: function(a) {
				return h(g(this).insertCell(a))
			}
		}), e(i, b, document.createElement("tr")), a.wrappers.HTMLTableRowElement = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			switch (a.localName) {
				case "content":
					return new c(a);
				case "shadow":
					return new e(a);
				case "template":
					return new f(a)
			}
			d.call(this, a)
		}
		var c = a.wrappers.HTMLContentElement,
			d = a.wrappers.HTMLElement,
			e = a.wrappers.HTMLShadowElement,
			f = a.wrappers.HTMLTemplateElement,
			g = (a.mixin, a.registerWrapper),
			h = window.HTMLUnknownElement;
		b.prototype = Object.create(d.prototype), g(h, b), a.wrappers.HTMLUnknownElement = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";
		var b = a.wrappers.Element,
			c = a.wrappers.HTMLElement,
			d = a.registerObject,
			e = "http://www.w3.org/2000/svg",
			f = document.createElementNS(e, "title"),
			g = d(f),
			h = Object.getPrototypeOf(g.prototype).constructor;
		if (!("classList" in f)) {
			var i = Object.getOwnPropertyDescriptor(b.prototype, "classList");
			Object.defineProperty(c.prototype, "classList", i), delete b.prototype.classList
		}
		a.wrappers.SVGElement = h
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			m.call(this, a)
		}
		var c = a.mixin,
			d = a.registerWrapper,
			e = a.unwrap,
			f = a.wrap,
			g = window.SVGUseElement,
			h = "http://www.w3.org/2000/svg",
			i = f(document.createElementNS(h, "g")),
			j = document.createElementNS(h, "use"),
			k = i.constructor,
			l = Object.getPrototypeOf(k.prototype),
			m = l.constructor;
		b.prototype = Object.create(l), "instanceRoot" in j && c(b.prototype, {get instanceRoot() {
				return f(e(this).instanceRoot)
			},
			get animatedInstanceRoot() {
				return f(e(this).animatedInstanceRoot)
			}
		}), d(g, b, j), a.wrappers.SVGUseElement = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.EventTarget,
			d = a.mixin,
			e = a.registerWrapper,
			f = a.unsafeUnwrap,
			g = a.wrap,
			h = window.SVGElementInstance;
		h && (b.prototype = Object.create(c.prototype), d(b.prototype, {get correspondingElement() {
				return g(f(this).correspondingElement)
			},
			get correspondingUseElement() {
				return g(f(this).correspondingUseElement)
			},
			get parentNode() {
				return g(f(this).parentNode)
			},
			get childNodes() {
				throw new Error("Not implemented")
			},
			get firstChild() {
				return g(f(this).firstChild)
			},
			get lastChild() {
				return g(f(this).lastChild)
			},
			get previousSibling() {
				return g(f(this).previousSibling)
			},
			get nextSibling() {
				return g(f(this).nextSibling)
			}
		}), e(h, b), a.wrappers.SVGElementInstance = b)
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			e(a, this)
		}
		var c = a.mixin,
			d = a.registerWrapper,
			e = a.setWrapper,
			f = a.unsafeUnwrap,
			g = a.unwrap,
			h = a.unwrapIfNeeded,
			i = a.wrap,
			j = window.CanvasRenderingContext2D;
		c(b.prototype, {get canvas() {
				return i(f(this).canvas)
			},
			drawImage: function() {
				arguments[0] = h(arguments[0]), f(this).drawImage.apply(f(this), arguments)
			},
			createPattern: function() {
				return arguments[0] = g(arguments[0]), f(this).createPattern.apply(f(this), arguments)
			}
		}), d(j, b, document.createElement("canvas").getContext("2d")), a.wrappers.CanvasRenderingContext2D = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			e(a, this)
		}
		var c = a.mixin,
			d = a.registerWrapper,
			e = a.setWrapper,
			f = a.unsafeUnwrap,
			g = a.unwrapIfNeeded,
			h = a.wrap,
			i = window.WebGLRenderingContext;
		if (i) {
			c(b.prototype, {get canvas() {
					return h(f(this).canvas)
				},
				texImage2D: function() {
					arguments[5] = g(arguments[5]), f(this).texImage2D.apply(f(this), arguments)
				},
				texSubImage2D: function() {
					arguments[6] = g(arguments[6]), f(this).texSubImage2D.apply(f(this), arguments)
				}
			});
			var j = /WebKit/.test(navigator.userAgent) ? {
				drawingBufferHeight: null,
				drawingBufferWidth: null
			} : {};
			d(i, b, j), a.wrappers.WebGLRenderingContext = b
		}
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			d(a, this)
		}
		var c = a.registerWrapper,
			d = a.setWrapper,
			e = a.unsafeUnwrap,
			f = a.unwrap,
			g = a.unwrapIfNeeded,
			h = a.wrap,
			i = window.Range;
		b.prototype = {get startContainer() {
				return h(e(this).startContainer)
			},
			get endContainer() {
				return h(e(this).endContainer)
			},
			get commonAncestorContainer() {
				return h(e(this).commonAncestorContainer)
			},
			setStart: function(a, b) {
				e(this).setStart(g(a), b)
			},
			setEnd: function(a, b) {
				e(this).setEnd(g(a), b)
			},
			setStartBefore: function(a) {
				e(this).setStartBefore(g(a))
			},
			setStartAfter: function(a) {
				e(this).setStartAfter(g(a))
			},
			setEndBefore: function(a) {
				e(this).setEndBefore(g(a))
			},
			setEndAfter: function(a) {
				e(this).setEndAfter(g(a))
			},
			selectNode: function(a) {
				e(this).selectNode(g(a))
			},
			selectNodeContents: function(a) {
				e(this).selectNodeContents(g(a))
			},
			compareBoundaryPoints: function(a, b) {
				return e(this).compareBoundaryPoints(a, f(b))
			},
			extractContents: function() {
				return h(e(this).extractContents())
			},
			cloneContents: function() {
				return h(e(this).cloneContents())
			},
			insertNode: function(a) {
				e(this).insertNode(g(a))
			},
			surroundContents: function(a) {
				e(this).surroundContents(g(a))
			},
			cloneRange: function() {
				return h(e(this).cloneRange())
			},
			isPointInRange: function(a, b) {
				return e(this).isPointInRange(g(a), b)
			},
			comparePoint: function(a, b) {
				return e(this).comparePoint(g(a), b)
			},
			intersectsNode: function(a) {
				return e(this).intersectsNode(g(a))
			},
			toString: function() {
				return e(this).toString()
			}
		}, i.prototype.createContextualFragment && (b.prototype.createContextualFragment = function(a) {
			return h(e(this).createContextualFragment(a))
		}), c(window.Range, b, document.createRange()), a.wrappers.Range = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";
		var b = a.GetElementsByInterface,
			c = a.ParentNodeInterface,
			d = a.SelectorsInterface,
			e = a.mixin,
			f = a.registerObject,
			g = f(document.createDocumentFragment());
		e(g.prototype, c), e(g.prototype, d), e(g.prototype, b);
		var h = f(document.createComment(""));
		a.wrappers.Comment = h, a.wrappers.DocumentFragment = g
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			var b = l(k(a).ownerDocument.createDocumentFragment());
			c.call(this, b), i(b, this);
			var e = a.shadowRoot;
			n.set(this, e), this.treeScope_ = new d(this, g(e || a)), m.set(this, a)
		}
		var c = a.wrappers.DocumentFragment,
			d = a.TreeScope,
			e = a.elementFromPoint,
			f = a.getInnerHTML,
			g = a.getTreeScope,
			h = a.mixin,
			i = a.rewrap,
			j = a.setInnerHTML,
			k = a.unsafeUnwrap,
			l = a.unwrap,
			m = new WeakMap,
			n = new WeakMap,
			o = /[ \t\n\r\f]/;
		b.prototype = Object.create(c.prototype), h(b.prototype, {
			constructor: b,
			get innerHTML() {
				return f(this)
			},
			set innerHTML(a) {
				j(this, a), this.invalidateShadowRenderer()
			},
			get olderShadowRoot() {
				return n.get(this) || null
			},
			get host() {
				return m.get(this) || null
			},
			invalidateShadowRenderer: function() {
				return m.get(this).invalidateShadowRenderer()
			},
			elementFromPoint: function(a, b) {
				return e(this, this.ownerDocument, a, b)
			},
			getElementById: function(a) {
				return o.test(a) ? null : this.querySelector('[id="' + a + '"]')
			}
		}), a.wrappers.ShadowRoot = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			a.previousSibling_ = a.previousSibling, a.nextSibling_ = a.nextSibling, a.parentNode_ = a.parentNode
		}

		function c(c, e, f) {
			var g = H(c),
				h = H(e),
				i = f ? H(f) : null;
			if (d(e), b(e), f) c.firstChild === f && (c.firstChild_ = f), f.previousSibling_ = f.previousSibling;
			else {
				c.lastChild_ = c.lastChild, c.lastChild === c.firstChild && (c.firstChild_ = c.firstChild);
				var j = I(g.lastChild);
				j && (j.nextSibling_ = j.nextSibling)
			}
			a.originalInsertBefore.call(g, h, i)
		}

		function d(c) {
			var d = H(c),
				e = d.parentNode;
			if (e) {
				var f = I(e);
				b(c), c.previousSibling && (c.previousSibling.nextSibling_ = c), c.nextSibling && (c.nextSibling.previousSibling_ = c), f.lastChild === c && (f.lastChild_ = c), f.firstChild === c && (f.firstChild_ = c), a.originalRemoveChild.call(e, d)
			}
		}

		function e(a) {
			J.set(a, [])
		}

		function f(a) {
			var b = J.get(a);
			return b || J.set(a, b = []), b
		}

		function g(a) {
			for (var b = [], c = 0, d = a.firstChild; d; d = d.nextSibling) b[c++] = d;
			return b
		}

		function h() {
			for (var a = 0; a < N.length; a++) {
				var b = N[a],
					c = b.parentRenderer;
				c && c.dirty || b.render()
			}
			N = []
		}

		function i() {
			y = null, h()
		}

		function j(a) {
			var b = L.get(a);
			return b || (b = new n(a), L.set(a, b)), b
		}

		function k(a) {
			var b = E(a).root;
			return b instanceof D ? b : null
		}

		function l(a) {
			return j(a.host)
		}

		function m(a) {
			this.skip = !1, this.node = a, this.childNodes = []
		}

		function n(a) {
			this.host = a, this.dirty = !1, this.invalidateAttributes(), this.associateNode(a)
		}

		function o(a) {
			for (var b = [], c = a.firstChild; c; c = c.nextSibling) v(c) ? b.push.apply(b, f(c)) : b.push(c);
			return b
		}

		function p(a) {
			if (a instanceof B) return a;
			if (a instanceof A) return null;
			for (var b = a.firstChild; b; b = b.nextSibling) {
				var c = p(b);
				if (c) return c
			}
			return null
		}

		function q(a, b) {
			f(b).push(a);
			var c = K.get(a);
			c ? c.push(b) : K.set(a, [b])
		}

		function r(a) {
			return K.get(a)
		}

		function s(a) {
			K.set(a, void 0)
		}

		function t(a, b) {
			var c = b.getAttribute("select");
			if (!c) return !0;
			if (c = c.trim(), !c) return !0;
			if (!(a instanceof z)) return !1;
			if (!P.test(c)) return !1;
			try {
				return a.matches(c)
			} catch (d) {
				return !1
			}
		}

		function u(a, b) {
			var c = r(b);
			return c && c[c.length - 1] === a
		}

		function v(a) {
			return a instanceof A || a instanceof B
		}

		function w(a) {
			return a.shadowRoot
		}

		function x(a) {
			for (var b = [], c = a.shadowRoot; c; c = c.olderShadowRoot) b.push(c);
			return b
		}
		var y, z = a.wrappers.Element,
			A = a.wrappers.HTMLContentElement,
			B = a.wrappers.HTMLShadowElement,
			C = a.wrappers.Node,
			D = a.wrappers.ShadowRoot,
			E = (a.assert, a.getTreeScope),
			F = (a.mixin, a.oneOf),
			G = a.unsafeUnwrap,
			H = a.unwrap,
			I = a.wrap,
			J = new WeakMap,
			K = new WeakMap,
			L = new WeakMap,
			M = F(window, ["requestAnimationFrame", "mozRequestAnimationFrame", "webkitRequestAnimationFrame", "setTimeout"]),
			N = [],
			O = new ArraySplice;
		O.equals = function(a, b) {
			return H(a.node) === b
		}, m.prototype = {
			append: function(a) {
				var b = new m(a);
				return this.childNodes.push(b), b
			},
			sync: function(a) {
				if (!this.skip) {
					for (var b = this.node, e = this.childNodes, f = g(H(b)), h = a || new WeakMap, i = O.calculateSplices(e, f), j = 0, k = 0, l = 0, m = 0; m < i.length; m++) {
						for (var n = i[m]; l < n.index; l++) k++, e[j++].sync(h);
						for (var o = n.removed.length, p = 0; o > p; p++) {
							var q = I(f[k++]);
							h.get(q) || d(q)
						}
						for (var r = n.addedCount, s = f[k] && I(f[k]), p = 0; r > p; p++) {
							var t = e[j++],
								u = t.node;
							c(b, u, s), h.set(u, !0), t.sync(h)
						}
						l += r
					}
					for (var m = l; m < e.length; m++) e[m].sync(h)
				}
			}
		}, n.prototype = {
			render: function(a) {
				if (this.dirty) {
					this.invalidateAttributes();
					var b = this.host;
					this.distribution(b);
					var c = a || new m(b);
					this.buildRenderTree(c, b);
					var d = !a;
					d && c.sync(), this.dirty = !1
				}
			},
			get parentRenderer() {
				return E(this.host).renderer
			},
			invalidate: function() {
				if (!this.dirty) {
					this.dirty = !0;
					var a = this.parentRenderer;
					if (a && a.invalidate(), N.push(this), y) return;
					y = window[M](i, 0)
				}
			},
			distribution: function(a) {
				this.resetAllSubtrees(a), this.distributionResolution(a)
			},
			resetAll: function(a) {
				v(a) ? e(a) : s(a), this.resetAllSubtrees(a)
			},
			resetAllSubtrees: function(a) {
				for (var b = a.firstChild; b; b = b.nextSibling) this.resetAll(b);
				a.shadowRoot && this.resetAll(a.shadowRoot), a.olderShadowRoot && this.resetAll(a.olderShadowRoot)
			},
			distributionResolution: function(a) {
				if (w(a)) {
					for (var b = a, c = o(b), d = x(b), e = 0; e < d.length; e++) this.poolDistribution(d[e], c);
					for (var e = d.length - 1; e >= 0; e--) {
						var f = d[e],
							g = p(f);
						if (g) {
							var h = f.olderShadowRoot;
							h && (c = o(h));
							for (var i = 0; i < c.length; i++) q(c[i], g)
						}
						this.distributionResolution(f)
					}
				}
				for (var j = a.firstChild; j; j = j.nextSibling) this.distributionResolution(j)
			},
			poolDistribution: function(a, b) {
				if (!(a instanceof B))
					if (a instanceof A) {
						var c = a;
						this.updateDependentAttributes(c.getAttribute("select"));
						for (var d = !1, e = 0; e < b.length; e++) {
							var a = b[e];
							a && t(a, c) && (q(a, c), b[e] = void 0, d = !0)
						}
						if (!d)
							for (var f = c.firstChild; f; f = f.nextSibling) q(f, c)
					} else
						for (var f = a.firstChild; f; f = f.nextSibling) this.poolDistribution(f, b)
			},
			buildRenderTree: function(a, b) {
				for (var c = this.compose(b), d = 0; d < c.length; d++) {
					var e = c[d],
						f = a.append(e);
					this.buildRenderTree(f, e)
				}
				if (w(b)) {
					var g = j(b);
					g.dirty = !1
				}
			},
			compose: function(a) {
				for (var b = [], c = a.shadowRoot || a, d = c.firstChild; d; d = d.nextSibling)
					if (v(d)) {
						this.associateNode(c);
						for (var e = f(d), g = 0; g < e.length; g++) {
							var h = e[g];
							u(d, h) && b.push(h)
						}
					} else b.push(d);
				return b
			},
			invalidateAttributes: function() {
				this.attributes = Object.create(null)
			},
			updateDependentAttributes: function(a) {
				if (a) {
					var b = this.attributes;
					/\.\w+/.test(a) && (b["class"] = !0), /#\w+/.test(a) && (b.id = !0), a.replace(/\[\s*([^\s=\|~\]]+)/g, function(a, c) {
						b[c] = !0
					})
				}
			},
			dependsOnAttribute: function(a) {
				return this.attributes[a]
			},
			associateNode: function(a) {
				G(a).polymerShadowRenderer_ = this
			}
		};
		var P = /^(:not\()?[*.#[a-zA-Z_|]/;
		C.prototype.invalidateShadowRenderer = function() {
			var a = G(this).polymerShadowRenderer_;
			return a ? (a.invalidate(), !0) : !1
		}, A.prototype.getDistributedNodes = B.prototype.getDistributedNodes = function() {
			return h(), f(this)
		}, z.prototype.getDestinationInsertionPoints = function() {
			return h(), r(this) || []
		}, A.prototype.nodeIsInserted_ = B.prototype.nodeIsInserted_ = function() {
			this.invalidateShadowRenderer();
			var a, b = k(this);
			b && (a = l(b)), G(this).polymerShadowRenderer_ = a, a && a.invalidate()
		}, a.getRendererForHost = j, a.getShadowTrees = x, a.renderAllPending = h, a.getDestinationInsertionPoints = r, a.visual = {
			insertBefore: c,
			remove: d
		}
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(b) {
			if (window[b]) {
				d(!a.wrappers[b]);
				var i = function(a) {
					c.call(this, a)
				};
				i.prototype = Object.create(c.prototype), e(i.prototype, {get form() {
						return h(g(this).form)
					}
				}), f(window[b], i, document.createElement(b.slice(4, -7))), a.wrappers[b] = i
			}
		}
		var c = a.wrappers.HTMLElement,
			d = a.assert,
			e = a.mixin,
			f = a.registerWrapper,
			g = a.unwrap,
			h = a.wrap,
			i = ["HTMLButtonElement", "HTMLFieldSetElement", "HTMLInputElement", "HTMLKeygenElement", "HTMLLabelElement", "HTMLLegendElement", "HTMLObjectElement", "HTMLOutputElement", "HTMLTextAreaElement"];
		i.forEach(b)
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			d(a, this)
		} {
			var c = a.registerWrapper,
				d = a.setWrapper,
				e = a.unsafeUnwrap,
				f = a.unwrap,
				g = a.unwrapIfNeeded,
				h = a.wrap;
			window.Selection
		}
		b.prototype = {get anchorNode() {
				return h(e(this).anchorNode)
			},
			get focusNode() {
				return h(e(this).focusNode)
			},
			addRange: function(a) {
				e(this).addRange(f(a))
			},
			collapse: function(a, b) {
				e(this).collapse(g(a), b)
			},
			containsNode: function(a, b) {
				return e(this).containsNode(g(a), b)
			},
			extend: function(a, b) {
				e(this).extend(g(a), b)
			},
			getRangeAt: function(a) {
				return h(e(this).getRangeAt(a))
			},
			removeRange: function(a) {
				e(this).removeRange(f(a))
			},
			selectAllChildren: function(a) {
				e(this).selectAllChildren(g(a))
			},
			toString: function() {
				return e(this).toString()
			}
		}, c(window.Selection, b, window.getSelection()), a.wrappers.Selection = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			k.call(this, a), this.treeScope_ = new p(this, null)
		}

		function c(a) {
			var c = document[a];
			b.prototype[a] = function() {
				return C(c.apply(A(this), arguments))
			}
		}

		function d(a, b) {
			F.call(A(b), B(a)), e(a, b)
		}

		function e(a, b) {
			a.shadowRoot && b.adoptNode(a.shadowRoot), a instanceof o && f(a, b);
			for (var c = a.firstChild; c; c = c.nextSibling) e(c, b)
		}

		function f(a, b) {
			var c = a.olderShadowRoot;
			c && b.adoptNode(c)
		}

		function g(a) {
			z(a, this)
		}

		function h(a, b) {
			var c = document.implementation[b];
			a.prototype[b] = function() {
				return C(c.apply(A(this), arguments))
			}
		}

		function i(a, b) {
			var c = document.implementation[b];
			a.prototype[b] = function() {
				return c.apply(A(this), arguments)
			}
		}
		var j = a.GetElementsByInterface,
			k = a.wrappers.Node,
			l = a.ParentNodeInterface,
			m = a.wrappers.Selection,
			n = a.SelectorsInterface,
			o = a.wrappers.ShadowRoot,
			p = a.TreeScope,
			q = a.cloneNode,
			r = a.defineWrapGetter,
			s = a.elementFromPoint,
			t = a.forwardMethodsToWrapper,
			u = a.matchesNames,
			v = a.mixin,
			w = a.registerWrapper,
			x = a.renderAllPending,
			y = a.rewrap,
			z = a.setWrapper,
			A = a.unsafeUnwrap,
			B = a.unwrap,
			C = a.wrap,
			D = a.wrapEventTargetMethods,
			E = (a.wrapNodeList, new WeakMap);
		b.prototype = Object.create(k.prototype), r(b, "documentElement"), r(b, "body"), r(b, "head"), ["createComment", "createDocumentFragment", "createElement", "createElementNS", "createEvent", "createEventNS", "createRange", "createTextNode", "getElementById"].forEach(c);
		var F = document.adoptNode,
			G = document.getSelection;
		if (v(b.prototype, {
				adoptNode: function(a) {
					return a.parentNode && a.parentNode.removeChild(a), d(a, this), a
				},
				elementFromPoint: function(a, b) {
					return s(this, this, a, b)
				},
				importNode: function(a, b) {
					return q(a, b, A(this))
				},
				getSelection: function() {
					return x(), new m(G.call(B(this)))
				},
				getElementsByName: function(a) {
					return n.querySelectorAll.call(this, "[name=" + JSON.stringify(String(a)) + "]")
				}
			}), document.registerElement) {
			var H = document.registerElement;
			b.prototype.registerElement = function(b, c) {
				function d(a) {
					return a ? void z(a, this) : f ? document.createElement(f, b) : document.createElement(b)
				}
				var e, f;
				if (void 0 !== c && (e = c.prototype, f = c.extends), e || (e = Object.create(HTMLElement.prototype)), a.nativePrototypeTable.get(e)) throw new Error("NotSupportedError");
				for (var g, h = Object.getPrototypeOf(e), i = []; h && !(g = a.nativePrototypeTable.get(h));) i.push(h), h = Object.getPrototypeOf(h);
				if (!g) throw new Error("NotSupportedError");
				for (var j = Object.create(g), k = i.length - 1; k >= 0; k--) j = Object.create(j);
				["createdCallback", "attachedCallback", "detachedCallback", "attributeChangedCallback"].forEach(function(a) {
					var b = e[a];
					b && (j[a] = function() {
						C(this) instanceof d || y(this), b.apply(C(this), arguments)
					})
				});
				var l = {
					prototype: j
				};
				f && (l.extends = f), d.prototype = e, d.prototype.constructor = d, a.constructorTable.set(j, d), a.nativePrototypeTable.set(e, j);
				H.call(B(this), b, l);
				return d
			}, t([window.HTMLDocument || window.Document], ["registerElement"])
		}
		t([window.HTMLBodyElement, window.HTMLDocument || window.Document, window.HTMLHeadElement, window.HTMLHtmlElement], ["appendChild", "compareDocumentPosition", "contains", "getElementsByClassName", "getElementsByTagName", "getElementsByTagNameNS", "insertBefore", "querySelector", "querySelectorAll", "removeChild", "replaceChild"].concat(u)), t([window.HTMLDocument || window.Document], ["adoptNode", "importNode", "contains", "createComment", "createDocumentFragment", "createElement", "createElementNS", "createEvent", "createEventNS", "createRange", "createTextNode", "elementFromPoint", "getElementById", "getElementsByName", "getSelection"]), v(b.prototype, j), v(b.prototype, l), v(b.prototype, n), v(b.prototype, {get implementation() {
				var a = E.get(this);
				return a ? a : (a = new g(B(this).implementation), E.set(this, a), a)
			},
			get defaultView() {
				return C(B(this).defaultView)
			}
		}), w(window.Document, b, document.implementation.createHTMLDocument("")), window.HTMLDocument && w(window.HTMLDocument, b), D([window.HTMLBodyElement, window.HTMLDocument || window.Document, window.HTMLHeadElement]), h(g, "createDocumentType"), h(g, "createDocument"), h(g, "createHTMLDocument"), i(g, "hasFeature"), w(window.DOMImplementation, g), t([window.DOMImplementation], ["createDocumentType", "createDocument", "createHTMLDocument", "hasFeature"]), a.adoptNodeNoRemove = d, a.wrappers.DOMImplementation = g, a.wrappers.Document = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			c.call(this, a)
		}
		var c = a.wrappers.EventTarget,
			d = a.wrappers.Selection,
			e = a.mixin,
			f = a.registerWrapper,
			g = a.renderAllPending,
			h = a.unwrap,
			i = a.unwrapIfNeeded,
			j = a.wrap,
			k = window.Window,
			l = window.getComputedStyle,
			m = window.getDefaultComputedStyle,
			n = window.getSelection;
		b.prototype = Object.create(c.prototype), k.prototype.getComputedStyle = function(a, b) {
			return j(this || window).getComputedStyle(i(a), b)
		}, m && (k.prototype.getDefaultComputedStyle = function(a, b) {
			return j(this || window).getDefaultComputedStyle(i(a), b)
		}), k.prototype.getSelection = function() {
			return j(this || window).getSelection()
		}, delete window.getComputedStyle, delete window.getDefaultComputedStyle, delete window.getSelection, ["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(a) {
			k.prototype[a] = function() {
				var b = j(this || window);
				return b[a].apply(b, arguments)
			}, delete window[a]
		}), e(b.prototype, {
			getComputedStyle: function(a, b) {
				return g(), l.call(h(this), i(a), b)
			},
			getSelection: function() {
				return g(), new d(n.call(h(this)))
			},
			get document() {
				return j(h(this).document)
			}
		}), m && (b.prototype.getDefaultComputedStyle = function(a, b) {
			return g(), m.call(h(this), i(a), b)
		}), f(k, b, window), a.wrappers.Window = b
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";
		var b = a.unwrap,
			c = window.DataTransfer || window.Clipboard,
			d = c.prototype.setDragImage;
		d && (c.prototype.setDragImage = function(a, c, e) {
			d.call(this, b(a), c, e)
		})
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			var b;
			b = a instanceof f ? a : new f(a && e(a)), d(b, this)
		}
		var c = a.registerWrapper,
			d = a.setWrapper,
			e = a.unwrap,
			f = window.FormData;
		f && (c(f, b, new f), a.wrappers.FormData = b)
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";
		var b = a.unwrapIfNeeded,
			c = XMLHttpRequest.prototype.send;
		XMLHttpRequest.prototype.send = function(a) {
			return c.call(this, b(a))
		}
	}(window.ShadowDOMPolyfill), function(a) {
		"use strict";

		function b(a) {
			var b = c[a],
				d = window[b];
			if (d) {
				var e = document.createElement(a),
					f = e.constructor;
				window[b] = f
			}
		}
		var c = (a.isWrapperFor, {
			a: "HTMLAnchorElement",
			area: "HTMLAreaElement",
			audio: "HTMLAudioElement",
			base: "HTMLBaseElement",
			body: "HTMLBodyElement",
			br: "HTMLBRElement",
			button: "HTMLButtonElement",
			canvas: "HTMLCanvasElement",
			caption: "HTMLTableCaptionElement",
			col: "HTMLTableColElement",
			content: "HTMLContentElement",
			data: "HTMLDataElement",
			datalist: "HTMLDataListElement",
			del: "HTMLModElement",
			dir: "HTMLDirectoryElement",
			div: "HTMLDivElement",
			dl: "HTMLDListElement",
			embed: "HTMLEmbedElement",
			fieldset: "HTMLFieldSetElement",
			font: "HTMLFontElement",
			form: "HTMLFormElement",
			frame: "HTMLFrameElement",
			frameset: "HTMLFrameSetElement",
			h1: "HTMLHeadingElement",
			head: "HTMLHeadElement",
			hr: "HTMLHRElement",
			html: "HTMLHtmlElement",
			iframe: "HTMLIFrameElement",
			img: "HTMLImageElement",
			input: "HTMLInputElement",
			keygen: "HTMLKeygenElement",
			label: "HTMLLabelElement",
			legend: "HTMLLegendElement",
			li: "HTMLLIElement",
			link: "HTMLLinkElement",
			map: "HTMLMapElement",
			marquee: "HTMLMarqueeElement",
			menu: "HTMLMenuElement",
			menuitem: "HTMLMenuItemElement",
			meta: "HTMLMetaElement",
			meter: "HTMLMeterElement",
			object: "HTMLObjectElement",
			ol: "HTMLOListElement",
			optgroup: "HTMLOptGroupElement",
			option: "HTMLOptionElement",
			output: "HTMLOutputElement",
			p: "HTMLParagraphElement",
			param: "HTMLParamElement",
			pre: "HTMLPreElement",
			progress: "HTMLProgressElement",
			q: "HTMLQuoteElement",
			script: "HTMLScriptElement",
			select: "HTMLSelectElement",
			shadow: "HTMLShadowElement",
			source: "HTMLSourceElement",
			span: "HTMLSpanElement",
			style: "HTMLStyleElement",
			table: "HTMLTableElement",
			tbody: "HTMLTableSectionElement",
			template: "HTMLTemplateElement",
			textarea: "HTMLTextAreaElement",
			thead: "HTMLTableSectionElement",
			time: "HTMLTimeElement",
			title: "HTMLTitleElement",
			tr: "HTMLTableRowElement",
			track: "HTMLTrackElement",
			ul: "HTMLUListElement",
			video: "HTMLVideoElement"
		});
		Object.keys(c).forEach(b), Object.getOwnPropertyNames(a.wrappers).forEach(function(b) {
			window[b] = a.wrappers[b]
		})
	}(window.ShadowDOMPolyfill), function(a) {
		function b(a, c) {
			var d, e, f, g, h = a.firstElementChild;
			for (e = [], f = a.shadowRoot; f;) e.push(f), f = f.olderShadowRoot;
			for (g = e.length - 1; g >= 0; g--)
				if (d = e[g].querySelector(c)) return d;
			for (; h;) {
				if (d = b(h, c)) return d;
				h = h.nextElementSibling
			}
			return null
		}

		function c(a, b, d) {
			var e, f, g, h, i, j = a.firstElementChild;
			for (g = [], f = a.shadowRoot; f;) g.push(f), f = f.olderShadowRoot;
			for (h = g.length - 1; h >= 0; h--)
				for (e = g[h].querySelectorAll(b), i = 0; i < e.length; i++) d.push(e[i]);
			for (; j;) c(j, b, d), j = j.nextElementSibling;
			return d
		}
		window.wrap = ShadowDOMPolyfill.wrapIfNeeded, window.unwrap = ShadowDOMPolyfill.unwrapIfNeeded, Object.defineProperty(Element.prototype, "webkitShadowRoot", Object.getOwnPropertyDescriptor(Element.prototype, "shadowRoot"));
		var d = Element.prototype.createShadowRoot;
		Element.prototype.createShadowRoot = function() {
			var a = d.call(this);
			return CustomElements.watchShadow(this), a
		}, Element.prototype.webkitCreateShadowRoot = Element.prototype.createShadowRoot, a.queryAllShadows = function(a, d, e) {
			return e ? c(a, d, []) : b(a, d)
		}
	}(window.Platform), function(a) {
		function b(a, b) {
			var c = "";
			return Array.prototype.forEach.call(a, function(a) {
				c += a.textContent + "\n\n"
			}), b || (c = c.replace(l, "")), c
		}

		function c(a) {
			var b = document.createElement("style");
			return b.textContent = a, b
		}

		function d(a) {
			var b = c(a);
			document.head.appendChild(b);
			var d = [];
			if (b.sheet) try {
				d = b.sheet.cssRules
			} catch (e) {} else console.warn("sheet not found", b);
			return b.parentNode.removeChild(b), d
		}

		function e() {
			v.initialized = !0, document.body.appendChild(v);
			var a = v.contentDocument,
				b = a.createElement("base");
			b.href = document.baseURI, a.head.appendChild(b)
		}

		function f(a) {
			v.initialized || e(), document.body.appendChild(v), a(v.contentDocument), document.body.removeChild(v)
		}

		function g(a, b) {
			if (b) {
				var e;
				if (a.match("@import") && x) {
					var g = c(a);
					f(function(a) {
						a.head.appendChild(g.impl), e = Array.prototype.slice.call(g.sheet.cssRules, 0), b(e)
					})
				} else e = d(a), b(e)
			}
		}

		function h(a) {
			a && j().appendChild(document.createTextNode(a))
		}

		function i(a, b) {
			var d = c(a);
			d.setAttribute(b, ""), d.setAttribute(z, ""), document.head.appendChild(d)
		}

		function j() {
			return w || (w = document.createElement("style"), w.setAttribute(z, ""), w[z] = !0), w
		}
		var k = {
				strictStyling: !1,
				registry: {},
				shimStyling: function(a, c, d) {
					var e = this.prepareRoot(a, c, d),
						f = this.isTypeExtension(d),
						g = this.makeScopeSelector(c, f),
						h = b(e, !0);
					h = this.scopeCssText(h, g), a && (a.shimmedStyle = h), this.addCssToDocument(h, c)
				},
				shimStyle: function(a, b) {
					return this.shimCssText(a.textContent, b)
				},
				shimCssText: function(a, b) {
					return a = this.insertDirectives(a), this.scopeCssText(a, b)
				},
				makeScopeSelector: function(a, b) {
					return a ? b ? "[is=" + a + "]" : a : ""
				},
				isTypeExtension: function(a) {
					return a && a.indexOf("-") < 0
				},
				prepareRoot: function(a, b, c) {
					var d = this.registerRoot(a, b, c);
					return this.replaceTextInStyles(d.rootStyles, this.insertDirectives), this.removeStyles(a, d.rootStyles), this.strictStyling && this.applyScopeToContent(a, b), d.scopeStyles
				},
				removeStyles: function(a, b) {
					for (var c, d = 0, e = b.length; e > d && (c = b[d]); d++) c.parentNode.removeChild(c)
				},
				registerRoot: function(a, b, c) {
					var d = this.registry[b] = {
							root: a,
							name: b,
							extendsName: c
						},
						e = this.findStyles(a);
					d.rootStyles = e, d.scopeStyles = d.rootStyles;
					var f = this.registry[d.extendsName];
					return f && (d.scopeStyles = f.scopeStyles.concat(d.scopeStyles)), d
				},
				findStyles: function(a) {
					if (!a) return [];
					var b = a.querySelectorAll("style");
					return Array.prototype.filter.call(b, function(a) {
						return !a.hasAttribute(A)
					})
				},
				applyScopeToContent: function(a, b) {
					a && (Array.prototype.forEach.call(a.querySelectorAll("*"), function(a) {
						a.setAttribute(b, "")
					}), Array.prototype.forEach.call(a.querySelectorAll("template"), function(a) {
						this.applyScopeToContent(a.content, b)
					}, this))
				},
				insertDirectives: function(a) {
					return a = this.insertPolyfillDirectivesInCssText(a), this.insertPolyfillRulesInCssText(a)
				},
				insertPolyfillDirectivesInCssText: function(a) {
					return a = a.replace(m, function(a, b) {
						return b.slice(0, -2) + "{"
					}), a.replace(n, function(a, b) {
						return b + " {"
					})
				},
				insertPolyfillRulesInCssText: function(a) {
					return a = a.replace(o, function(a, b) {
						return b.slice(0, -1)
					}), a.replace(p, function(a, b, c, d) {
						var e = a.replace(b, "").replace(c, "");
						return d + e
					})
				},
				scopeCssText: function(a, b) {
					var c = this.extractUnscopedRulesFromCssText(a);
					if (a = this.insertPolyfillHostInCssText(a), a = this.convertColonHost(a), a = this.convertColonHostContext(a), a = this.convertShadowDOMSelectors(a), b) {
						var a, d = this;
						g(a, function(c) {
							a = d.scopeRules(c, b)
						})
					}
					return a = a + "\n" + c, a.trim()
				},
				extractUnscopedRulesFromCssText: function(a) {
					for (var b, c = ""; b = q.exec(a);) c += b[1].slice(0, -1) + "\n\n";
					for (; b = r.exec(a);) c += b[0].replace(b[2], "").replace(b[1], b[3]) + "\n\n";
					return c
				},
				convertColonHost: function(a) {
					return this.convertColonRule(a, cssColonHostRe, this.colonHostPartReplacer)
				},
				convertColonHostContext: function(a) {
					return this.convertColonRule(a, cssColonHostContextRe, this.colonHostContextPartReplacer)
				},
				convertColonRule: function(a, b, c) {
					return a.replace(b, function(a, b, d, e) {
						if (b = polyfillHostNoCombinator, d) {
							for (var f, g = d.split(","), h = [], i = 0, j = g.length; j > i && (f = g[i]); i++) f = f.trim(), h.push(c(b, f, e));
							return h.join(",")
						}
						return b + e
					})
				},
				colonHostContextPartReplacer: function(a, b, c) {
					return b.match(s) ? this.colonHostPartReplacer(a, b, c) : a + b + c + ", " + b + " " + a + c
				},
				colonHostPartReplacer: function(a, b, c) {
					return a + b.replace(s, "") + c
				},
				convertShadowDOMSelectors: function(a) {
					for (var b = 0; b < shadowDOMSelectorsRe.length; b++) a = a.replace(shadowDOMSelectorsRe[b], " ");
					return a
				},
				scopeRules: function(a, b) {
					var c = "";
					return a && Array.prototype.forEach.call(a, function(a) {
						if (a.selectorText && a.style && void 0 !== a.style.cssText) c += this.scopeSelector(a.selectorText, b, this.strictStyling) + " {\n	", c += this.propertiesFromRule(a) + "\n}\n\n";
						else if (a.type === CSSRule.MEDIA_RULE) c += "@media " + a.media.mediaText + " {\n", c += this.scopeRules(a.cssRules, b), c += "\n}\n\n";
						else try {
							a.cssText && (c += a.cssText + "\n\n")
						} catch (d) {
							a.type === CSSRule.KEYFRAMES_RULE && a.cssRules && (c += this.ieSafeCssTextFromKeyFrameRule(a))
						}
					}, this), c
				},
				ieSafeCssTextFromKeyFrameRule: function(a) {
					var b = "@keyframes " + a.name + " {";
					return Array.prototype.forEach.call(a.cssRules, function(a) {
						b += " " + a.keyText + " {" + a.style.cssText + "}"
					}), b += " }"
				},
				scopeSelector: function(a, b, c) {
					var d = [],
						e = a.split(",");
					return e.forEach(function(a) {
						a = a.trim(), this.selectorNeedsScoping(a, b) && (a = c && !a.match(polyfillHostNoCombinator) ? this.applyStrictSelectorScope(a, b) : this.applySelectorScope(a, b)), d.push(a)
					}, this), d.join(", ")
				},
				selectorNeedsScoping: function(a, b) {
					if (Array.isArray(b)) return !0;
					var c = this.makeScopeMatcher(b);
					return !a.match(c)
				},
				makeScopeMatcher: function(a) {
					return a = a.replace(/\[/g, "\\[").replace(/\[/g, "\\]"), new RegExp("^(" + a + ")" + selectorReSuffix, "m")
				},
				applySelectorScope: function(a, b) {
					return Array.isArray(b) ? this.applySelectorScopeList(a, b) : this.applySimpleSelectorScope(a, b)
				},
				applySelectorScopeList: function(a, b) {
					for (var c, d = [], e = 0; c = b[e]; e++) d.push(this.applySimpleSelectorScope(a, c));
					return d.join(", ")
				},
				applySimpleSelectorScope: function(a, b) {
					return a.match(polyfillHostRe) ? (a = a.replace(polyfillHostNoCombinator, b), a.replace(polyfillHostRe, b + " ")) : b + " " + a
				},
				applyStrictSelectorScope: function(a, b) {
					b = b.replace(/\[is=([^\]]*)\]/g, "$1");
					var c = [" ", ">", "+", "~"],
						d = a,
						e = "[" + b + "]";
					return c.forEach(function(a) {
						var b = d.split(a);
						d = b.map(function(a) {
							var b = a.trim().replace(polyfillHostRe, "");
							return b && c.indexOf(b) < 0 && b.indexOf(e) < 0 && (a = b.replace(/([^:]*)(:*)(.*)/, "$1" + e + "$2$3")), a
						}).join(a)
					}), d
				},
				insertPolyfillHostInCssText: function(a) {
					return a.replace(colonHostContextRe, t).replace(colonHostRe, s)
				},
				propertiesFromRule: function(a) {
					var b = a.style.cssText;
					a.style.content && !a.style.content.match(/['"]+|attr/) && (b = b.replace(/content:[^;]*;/g, "content: '" + a.style.content + "';"));
					var c = a.style;
					for (var d in c) "initial" === c[d] && (b += d + ": initial; ");
					return b
				},
				replaceTextInStyles: function(a, b) {
					a && b && (a instanceof Array || (a = [a]), Array.prototype.forEach.call(a, function(a) {
						a.textContent = b.call(this, a.textContent)
					}, this))
				},
				addCssToDocument: function(a, b) {
					a.match("@import") ? i(a, b) : h(a)
				}
			},
			l = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
			m = /\/\*\s*@polyfill ([^*]*\*+([^/*][^*]*\*+)*\/)([^{]*?){/gim,
			n = /polyfill-next-selector[^}]*content\:[\s]*?['"](.*?)['"][;\s]*}([^{]*?){/gim,
			o = /\/\*\s@polyfill-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,
			p = /(polyfill-rule)[^}]*(content\:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim,
			q = /\/\*\s@polyfill-unscoped-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,
			r = /(polyfill-unscoped-rule)[^}]*(content\:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim,
			s = "-shadowcsshost",
			t = "-shadowcsscontext",
			u = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";
		cssColonHostRe = new RegExp("(" + s + u, "gim"), cssColonHostContextRe = new RegExp("(" + t + u, "gim"), selectorReSuffix = "([>\\s~+[.,{:][\\s\\S]*)?$", colonHostRe = /\:host/gim, colonHostContextRe = /\:host-context/gim, polyfillHostNoCombinator = s + "-no-combinator", polyfillHostRe = new RegExp(s, "gim"), polyfillHostContextRe = new RegExp(t, "gim"), shadowDOMSelectorsRe = [/\^\^/g, /\^/g, /\/shadow\//g, /\/shadow-deep\//g, /::shadow/g, /\/deep\//g, /::content/g];
		var v = document.createElement("iframe");
		v.style.display = "none";
		var w, x = navigator.userAgent.match("Chrome"),
			y = "shim-shadowdom",
			z = "shim-shadowdom-css",
			A = "no-shim";
		if (window.ShadowDOMPolyfill) {
			h("style { display: none !important; }\n");
			var B = wrap(document),
				C = B.querySelector("head");
			C.insertBefore(j(), C.childNodes[0]), document.addEventListener("DOMContentLoaded", function() {
				a.urlResolver;
				if (window.HTMLImports && !HTMLImports.useNative) {
					var b = "link[rel=stylesheet][" + y + "]",
						c = "style[" + y + "]";
					HTMLImports.importer.documentPreloadSelectors += "," + b, HTMLImports.importer.importsPreloadSelectors += "," + b, HTMLImports.parser.documentSelectors = [HTMLImports.parser.documentSelectors, b, c].join(",");
					var d = HTMLImports.parser.parseGeneric;
					HTMLImports.parser.parseGeneric = function(a) {
						if (!a[z]) {
							var b = a.__importElement || a;
							if (!b.hasAttribute(y)) return void d.call(this, a);
							a.__resource && (b = a.ownerDocument.createElement("style"), b.textContent = a.__resource), HTMLImports.path.resolveUrlsInStyle(b), b.textContent = k.shimStyle(b), b.removeAttribute(y, ""), b.setAttribute(z, ""), b[z] = !0, b.parentNode !== C && (a.parentNode === C ? C.replaceChild(b, a) : this.addElementToDocument(b)), b.__importParsed = !0, this.markParsingComplete(a), this.parseNext()
						}
					};
					var e = HTMLImports.parser.hasResource;
					HTMLImports.parser.hasResource = function(a) {
						return "link" === a.localName && "stylesheet" === a.rel && a.hasAttribute(y) ? a.__resource : e.call(this, a)
					}
				}
			})
		}
		a.ShadowCSS = k
	}(window.Platform)) : ! function() {
		window.wrap = window.unwrap = function(a) {
			return a
		}, addEventListener("DOMContentLoaded", function() {
			if (CustomElements.useNative === !1) {
				var a = Element.prototype.createShadowRoot;
				Element.prototype.createShadowRoot = function() {
					var b = a.call(this);
					return CustomElements.watchShadow(this), b
				}
			}
		})
	}(window.Platform),
	function(a) {
		"use strict";

		function b(a) {
			return void 0 !== m[a]
		}

		function c() {
			h.call(this), this._isInvalid = !0
		}

		function d(a) {
			return "" == a && c.call(this), a.toLowerCase()
		}

		function e(a) {
			var b = a.charCodeAt(0);
			return b > 32 && 127 > b && -1 == [34, 35, 60, 62, 63, 96].indexOf(b) ? a : encodeURIComponent(a)
		}

		function f(a) {
			var b = a.charCodeAt(0);
			return b > 32 && 127 > b && -1 == [34, 35, 60, 62, 96].indexOf(b) ? a : encodeURIComponent(a)
		}

		function g(a, g, h) {
			function i(a) {
				t.push(a)
			}
			var j = g || "scheme start",
				k = 0,
				l = "",
				r = !1,
				s = !1,
				t = [];
			a: for (;
				(a[k - 1] != o || 0 == k) && !this._isInvalid;) {
				var u = a[k];
				switch (j) {
					case "scheme start":
						if (!u || !p.test(u)) {
							if (g) {
								i("Invalid scheme.");
								break a
							}
							l = "", j = "no scheme";
							continue
						}
						l += u.toLowerCase(), j = "scheme";
						break;
					case "scheme":
						if (u && q.test(u)) l += u.toLowerCase();
						else {
							if (":" != u) {
								if (g) {
									if (o == u) break a;
									i("Code point not allowed in scheme: " + u);
									break a
								}
								l = "", k = 0, j = "no scheme";
								continue
							}
							if (this._scheme = l, l = "", g) break a;
							b(this._scheme) && (this._isRelative = !0), j = "file" == this._scheme ? "relative" : this._isRelative && h && h._scheme == this._scheme ? "relative or authority" : this._isRelative ? "authority first slash" : "scheme data"
						}
						break;
					case "scheme data":
						"?" == u ? (query = "?", j = "query") : "#" == u ? (this._fragment = "#", j = "fragment") : o != u && "	" != u && "\n" != u && "\r" != u && (this._schemeData += e(u));
						break;
					case "no scheme":
						if (h && b(h._scheme)) {
							j = "relative";
							continue
						}
						i("Missing scheme."), c.call(this);
						break;
					case "relative or authority":
						if ("/" != u || "/" != a[k + 1]) {
							i("Expected /, got: " + u), j = "relative";
							continue
						}
						j = "authority ignore slashes";
						break;
					case "relative":
						if (this._isRelative = !0, "file" != this._scheme && (this._scheme = h._scheme), o == u) {
							this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._query = h._query;
							break a
						}
						if ("/" == u || "\\" == u) "\\" == u && i("\\ is an invalid code point."), j = "relative slash";
						else if ("?" == u) this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._query = "?", j = "query";
						else {
							if ("#" != u) {
								var v = a[k + 1],
									w = a[k + 2];
								("file" != this._scheme || !p.test(u) || ":" != v && "|" != v || o != w && "/" != w && "\\" != w && "?" != w && "#" != w) && (this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._path.pop()), j = "relative path";
								continue
							}
							this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._query = h._query, this._fragment = "#", j = "fragment"
						}
						break;
					case "relative slash":
						if ("/" != u && "\\" != u) {
							"file" != this._scheme && (this._host = h._host, this._port = h._port), j = "relative path";
							continue
						}
						"\\" == u && i("\\ is an invalid code point."), j = "file" == this._scheme ? "file host" : "authority ignore slashes";
						break;
					case "authority first slash":
						if ("/" != u) {
							i("Expected '/', got: " + u), j = "authority ignore slashes";
							continue
						}
						j = "authority second slash";
						break;
					case "authority second slash":
						if (j = "authority ignore slashes", "/" != u) {
							i("Expected '/', got: " + u);
							continue
						}
						break;
					case "authority ignore slashes":
						if ("/" != u && "\\" != u) {
							j = "authority";
							continue
						}
						i("Expected authority, got: " + u);
						break;
					case "authority":
						if ("@" == u) {
							r && (i("@ already seen."), l += "%40"), r = !0;
							for (var x = 0; x < l.length; x++) {
								var y = l[x];
								if ("	" != y && "\n" != y && "\r" != y)
									if (":" != y || null !== this._password) {
										var z = e(y);
										null !== this._password ? this._password += z : this._username += z
									} else this._password = "";
								else i("Invalid whitespace in authority.")
							}
							l = ""
						} else {
							if (o == u || "/" == u || "\\" == u || "?" == u || "#" == u) {
								k -= l.length, l = "", j = "host";
								continue
							}
							l += u
						}
						break;
					case "file host":
						if (o == u || "/" == u || "\\" == u || "?" == u || "#" == u) {
							2 != l.length || !p.test(l[0]) || ":" != l[1] && "|" != l[1] ? 0 == l.length ? j = "relative path start" : (this._host = d.call(this, l), l = "", j = "relative path start") : j = "relative path";
							continue
						}
						"	" == u || "\n" == u || "\r" == u ? i("Invalid whitespace in file host.") : l += u;
						break;
					case "host":
					case "hostname":
						if (":" != u || s) {
							if (o == u || "/" == u || "\\" == u || "?" == u || "#" == u) {
								if (this._host = d.call(this, l), l = "", j = "relative path start", g) break a;
								continue
							}
							"	" != u && "\n" != u && "\r" != u ? ("[" == u ? s = !0 : "]" == u && (s = !1), l += u) : i("Invalid code point in host/hostname: " + u)
						} else if (this._host = d.call(this, l), l = "", j = "port", "hostname" == g) break a;
						break;
					case "port":
						if (/[0-9]/.test(u)) l += u;
						else {
							if (o == u || "/" == u || "\\" == u || "?" == u || "#" == u || g) {
								if ("" != l) {
									var A = parseInt(l, 10);
									A != m[this._scheme] && (this._port = A + ""), l = ""
								}
								if (g) break a;
								j = "relative path start";
								continue
							}
							"	" == u || "\n" == u || "\r" == u ? i("Invalid code point in port: " + u) : c.call(this)
						}
						break;
					case "relative path start":
						if ("\\" == u && i("'\\' not allowed in path."), j = "relative path", "/" != u && "\\" != u) continue;
						break;
					case "relative path":
						if (o != u && "/" != u && "\\" != u && (g || "?" != u && "#" != u)) "	" != u && "\n" != u && "\r" != u && (l += e(u));
						else {
							"\\" == u && i("\\ not allowed in relative path.");
							var B;
							(B = n[l.toLowerCase()]) && (l = B), ".." == l ? (this._path.pop(), "/" != u && "\\" != u && this._path.push("")) : "." == l && "/" != u && "\\" != u ? this._path.push("") : "." != l && ("file" == this._scheme && 0 == this._path.length && 2 == l.length && p.test(l[0]) && "|" == l[1] && (l = l[0] + ":"), this._path.push(l)), l = "", "?" == u ? (this._query = "?", j = "query") : "#" == u && (this._fragment = "#", j = "fragment")
						}
						break;
					case "query":
						g || "#" != u ? o != u && "	" != u && "\n" != u && "\r" != u && (this._query += f(u)) : (this._fragment = "#", j = "fragment");
						break;
					case "fragment":
						o != u && "	" != u && "\n" != u && "\r" != u && (this._fragment += u)
				}
				k++
			}
		}

		function h() {
			this._scheme = "", this._schemeData = "", this._username = "", this._password = null, this._host = "", this._port = "", this._path = [], this._query = "", this._fragment = "", this._isInvalid = !1, this._isRelative = !1
		}

		function i(a, b) {
			void 0 === b || b instanceof i || (b = new i(String(b))), this._url = a, h.call(this);
			var c = a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
			g.call(this, c, null, b)
		}
		var j = !1;
		if (!a.forceJURL) try {
			var k = new URL("b", "http://a");
			j = "http://a/b" === k.href
		} catch (l) {}
		if (!j) {
			var m = Object.create(null);
			m.ftp = 21, m.file = 0, m.gopher = 70, m.http = 80, m.https = 443, m.ws = 80, m.wss = 443;
			var n = Object.create(null);
			n["%2e"] = ".", n[".%2e"] = "..", n["%2e."] = "..", n["%2e%2e"] = "..";
			var o = void 0,
				p = /[a-zA-Z]/,
				q = /[a-zA-Z0-9\+\-\.]/;
			i.prototype = {get href() {
					if (this._isInvalid) return this._url;
					var a = "";
					return ("" != this._username || null != this._password) && (a = this._username + (null != this._password ? ":" + this._password : "") + "@"), this.protocol + (this._isRelative ? "//" + a + this.host : "") + this.pathname + this._query + this._fragment
				},
				set href(a) {
					h.call(this), g.call(this, a)
				},
				get protocol() {
					return this._scheme + ":"
				},
				set protocol(a) {
					this._isInvalid || g.call(this, a + ":", "scheme start")
				},
				get host() {
					return this._isInvalid ? "" : this._port ? this._host + ":" + this._port : this._host
				},
				set host(a) {
					!this._isInvalid && this._isRelative && g.call(this, a, "host")
				},
				get hostname() {
					return this._host
				},
				set hostname(a) {
					!this._isInvalid && this._isRelative && g.call(this, a, "hostname")
				},
				get port() {
					return this._port
				},
				set port(a) {
					!this._isInvalid && this._isRelative && g.call(this, a, "port")
				},
				get pathname() {
					return this._isInvalid ? "" : this._isRelative ? "/" + this._path.join("/") : this._schemeData
				},
				set pathname(a) {
					!this._isInvalid && this._isRelative && (this._path = [], g.call(this, a, "relative path start"))
				},
				get search() {
					return this._isInvalid || !this._query || "?" == this._query ? "" : this._query
				},
				set search(a) {
					!this._isInvalid && this._isRelative && (this._query = "?", "?" == a[0] && (a = a.slice(1)), g.call(this, a, "query"))
				},
				get hash() {
					return this._isInvalid || !this._fragment || "#" == this._fragment ? "" : this._fragment
				},
				set hash(a) {
					this._isInvalid || (this._fragment = "#", "#" == a[0] && (a = a.slice(1)), g.call(this, a, "fragment"))
				},
				get origin() {
					var a;
					if (this._isInvalid || !this._scheme) return "";
					switch (this._scheme) {
						case "data":
						case "file":
						case "javascript":
						case "mailto":
							return "null"
					}
					return a = this.host, a ? this._scheme + "://" + a : ""
				}
			};
			var r = a.URL;
			r && (i.createObjectURL = function() {
				return r.createObjectURL.apply(r, arguments)
			}, i.revokeObjectURL = function(a) {
				r.revokeObjectURL(a)
			}), a.URL = i
		}
	}(this),
	function() {
		Function.prototype.bind || (Function.prototype.bind = function(a) {
			var b = this,
				c = Array.prototype.slice.call(arguments, 1);
			return function() {
				var d = c.slice();
				return d.push.apply(d, arguments), b.apply(a, d)
			}
		})
	}(window.Platform),
	function(a) {
		function b(a) {
			u.push(a), t || (t = !0, q(d))
		}

		function c(a) {
			return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(a) || a
		}

		function d() {
			t = !1;
			var a = u;
			u = [], a.sort(function(a, b) {
				return a.uid_ - b.uid_
			});
			var b = !1;
			a.forEach(function(a) {
				var c = a.takeRecords();
				e(a), c.length && (a.callback_(c, a), b = !0)
			}), b && d()
		}

		function e(a) {
			a.nodes_.forEach(function(b) {
				var c = p.get(b);
				c && c.forEach(function(b) {
					b.observer === a && b.removeTransientObservers()
				})
			})
		}

		function f(a, b) {
			for (var c = a; c; c = c.parentNode) {
				var d = p.get(c);
				if (d)
					for (var e = 0; e < d.length; e++) {
						var f = d[e],
							g = f.options;
						if (c === a || g.subtree) {
							var h = b(g);
							h && f.enqueue(h)
						}
					}
			}
		}

		function g(a) {
			this.callback_ = a, this.nodes_ = [], this.records_ = [], this.uid_ = ++v
		}

		function h(a, b) {
			this.type = a, this.target = b, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null
		}

		function i(a) {
			var b = new h(a.type, a.target);
			return b.addedNodes = a.addedNodes.slice(), b.removedNodes = a.removedNodes.slice(), b.previousSibling = a.previousSibling, b.nextSibling = a.nextSibling, b.attributeName = a.attributeName, b.attributeNamespace = a.attributeNamespace, b.oldValue = a.oldValue, b
		}

		function j(a, b) {
			return w = new h(a, b)
		}

		function k(a) {
			return x ? x : (x = i(w), x.oldValue = a, x)
		}

		function l() {
			w = x = void 0
		}

		function m(a) {
			return a === x || a === w
		}

		function n(a, b) {
			return a === b ? a : x && m(a) ? x : null
		}

		function o(a, b, c) {
			this.observer = a, this.target = b, this.options = c, this.transientObservedNodes = []
		}
		var p = new WeakMap,
			q = window.msSetImmediate;
		if (!q) {
			var r = [],
				s = String(Math.random());
			window.addEventListener("message", function(a) {
				if (a.data === s) {
					var b = r;
					r = [], b.forEach(function(a) {
						a()
					})
				}
			}), q = function(a) {
				r.push(a), window.postMessage(s, "*")
			}
		}
		var t = !1,
			u = [],
			v = 0;
		g.prototype = {
			observe: function(a, b) {
				if (a = c(a), !b.childList && !b.attributes && !b.characterData || b.attributeOldValue && !b.attributes || b.attributeFilter && b.attributeFilter.length && !b.attributes || b.characterDataOldValue && !b.characterData) throw new SyntaxError;
				var d = p.get(a);
				d || p.set(a, d = []);
				for (var e, f = 0; f < d.length; f++)
					if (d[f].observer === this) {
						e = d[f], e.removeListeners(), e.options = b;
						break
					}
				e || (e = new o(this, a, b), d.push(e), this.nodes_.push(a)), e.addListeners()
			},
			disconnect: function() {
				this.nodes_.forEach(function(a) {
					for (var b = p.get(a), c = 0; c < b.length; c++) {
						var d = b[c];
						if (d.observer === this) {
							d.removeListeners(), b.splice(c, 1);
							break
						}
					}
				}, this), this.records_ = []
			},
			takeRecords: function() {
				var a = this.records_;
				return this.records_ = [], a
			}
		};
		var w, x;
		o.prototype = {
			enqueue: function(a) {
				var c = this.observer.records_,
					d = c.length;
				if (c.length > 0) {
					var e = c[d - 1],
						f = n(e, a);
					if (f) return void(c[d - 1] = f)
				} else b(this.observer);
				c[d] = a
			},
			addListeners: function() {
				this.addListeners_(this.target)
			},
			addListeners_: function(a) {
				var b = this.options;
				b.attributes && a.addEventListener("DOMAttrModified", this, !0), b.characterData && a.addEventListener("DOMCharacterDataModified", this, !0), b.childList && a.addEventListener("DOMNodeInserted", this, !0), (b.childList || b.subtree) && a.addEventListener("DOMNodeRemoved", this, !0)
			},
			removeListeners: function() {
				this.removeListeners_(this.target)
			},
			removeListeners_: function(a) {
				var b = this.options;
				b.attributes && a.removeEventListener("DOMAttrModified", this, !0), b.characterData && a.removeEventListener("DOMCharacterDataModified", this, !0), b.childList && a.removeEventListener("DOMNodeInserted", this, !0), (b.childList || b.subtree) && a.removeEventListener("DOMNodeRemoved", this, !0)
			},
			addTransientObserver: function(a) {
				if (a !== this.target) {
					this.addListeners_(a), this.transientObservedNodes.push(a);
					var b = p.get(a);
					b || p.set(a, b = []), b.push(this)
				}
			},
			removeTransientObservers: function() {
				var a = this.transientObservedNodes;
				this.transientObservedNodes = [], a.forEach(function(a) {
					this.removeListeners_(a);
					for (var b = p.get(a), c = 0; c < b.length; c++)
						if (b[c] === this) {
							b.splice(c, 1);
							break
						}
				}, this)
			},
			handleEvent: function(a) {
				switch (a.stopImmediatePropagation(), a.type) {
					case "DOMAttrModified":
						var b = a.attrName,
							c = a.relatedNode.namespaceURI,
							d = a.target,
							e = new j("attributes", d);
						e.attributeName = b, e.attributeNamespace = c;
						var g = a.attrChange === MutationEvent.ADDITION ? null : a.prevValue;
						f(d, function(a) {
							return !a.attributes || a.attributeFilter && a.attributeFilter.length && -1 === a.attributeFilter.indexOf(b) && -1 === a.attributeFilter.indexOf(c) ? void 0 : a.attributeOldValue ? k(g) : e
						});
						break;
					case "DOMCharacterDataModified":
						var d = a.target,
							e = j("characterData", d),
							g = a.prevValue;
						f(d, function(a) {
							return a.characterData ? a.characterDataOldValue ? k(g) : e : void 0
						});
						break;
					case "DOMNodeRemoved":
						this.addTransientObserver(a.target);
					case "DOMNodeInserted":
						var h, i, d = a.relatedNode,
							m = a.target;
						"DOMNodeInserted" === a.type ? (h = [m], i = []) : (h = [], i = [m]);
						var n = m.previousSibling,
							o = m.nextSibling,
							e = j("childList", d);
						e.addedNodes = h, e.removedNodes = i, e.previousSibling = n, e.nextSibling = o, f(d, function(a) {
							return a.childList ? e : void 0
						})
				}
				l()
			}
		}, a.JsMutationObserver = g, a.MutationObserver || (a.MutationObserver = g)
	}(this), window.HTMLImports = window.HTMLImports || {
		flags: {}
	},
	function(a) {
		function b(a, b) {
			b = b || q, d(function() {
				f(a, b)
			}, b)
		}

		function c(a) {
			return "complete" === a.readyState || a.readyState === s
		}

		function d(a, b) {
			if (c(b)) a && a();
			else {
				var e = function() {
					("complete" === b.readyState || b.readyState === s) && (b.removeEventListener(t, e), d(a, b))
				};
				b.addEventListener(t, e)
			}
		}

		function e(a) {
			a.target.__loaded = !0
		}

		function f(a, b) {
			function c() {
				h == i && a && a()
			}

			function d(a) {
				e(a), h++, c()
			}
			var f = b.querySelectorAll("link[rel=import]"),
				h = 0,
				i = f.length;
			if (i)
				for (var j, k = 0; i > k && (j = f[k]); k++) g(j) ? d.call(j, {
					target: j
				}) : (j.addEventListener("load", d), j.addEventListener("error", d));
			else c()
		}

		function g(a) {
			return m ? a.__loaded || a.import && "loading" !== a.import.readyState : a.__importParsed
		}

		function h(a) {
			for (var b, c = 0, d = a.length; d > c && (b = a[c]); c++) i(b) && j(b)
		}

		function i(a) {
			return "link" === a.localName && "import" === a.rel
		}

		function j(a) {
			var b = a.import;
			b ? e({
				target: a
			}) : (a.addEventListener("load", e), a.addEventListener("error", e))
		}
		var k = "import",
			l = k in document.createElement("link"),
			m = l,
			n = /Trident/.test(navigator.userAgent),
			o = Boolean(window.ShadowDOMPolyfill),
			p = function(a) {
				return o ? ShadowDOMPolyfill.wrapIfNeeded(a) : a
			},
			q = p(document),
			r = {
				get: function() {
					var a = HTMLImports.currentScript || document.currentScript || ("complete" !== document.readyState ? document.scripts[document.scripts.length - 1] : null);
					return p(a)
				},
				configurable: !0
			};
		Object.defineProperty(document, "_currentScript", r), Object.defineProperty(q, "_currentScript", r);
		var s = n ? "complete" : "interactive",
			t = "readystatechange";
		m && (new MutationObserver(function(a) {
			for (var b, c = 0, d = a.length; d > c && (b = a[c]); c++) b.addedNodes && h(b.addedNodes)
		}).observe(document.head, {
			childList: !0
		}), function() {
			if ("loading" === document.readyState)
				for (var a, b = document.querySelectorAll("link[rel=import]"), c = 0, d = b.length; d > c && (a = b[c]); c++) j(a)
		}()), b(function() {
			HTMLImports.ready = !0, HTMLImports.readyTime = (new Date).getTime(), q.dispatchEvent(new CustomEvent("HTMLImportsLoaded", {
				bubbles: !0
			}))
		}), a.useNative = m, a.isImportLoaded = g, a.whenReady = b, a.rootDocument = q, a.IMPORT_LINK_TYPE = k, a.isIE = n
	}(window.HTMLImports),
	function(a) {
		var b = (a.path, a.xhr),
			c = a.flags,
			d = function(a, b) {
				this.cache = {}, this.onload = a, this.oncomplete = b, this.inflight = 0, this.pending = {}
			};
		d.prototype = {
			addNodes: function(a) {
				this.inflight += a.length;
				for (var b, c = 0, d = a.length; d > c && (b = a[c]); c++) this.require(b);
				this.checkDone()
			},
			addNode: function(a) {
				this.inflight++, this.require(a), this.checkDone()
			},
			require: function(a) {
				var b = a.src || a.href;
				a.__nodeUrl = b, this.dedupe(b, a) || this.fetch(b, a)
			},
			dedupe: function(a, b) {
				if (this.pending[a]) return this.pending[a].push(b), !0;
				return this.cache[a] ? (this.onload(a, b, this.cache[a]), this.tail(), !0) : (this.pending[a] = [b], !1)
			},
			fetch: function(a, d) {
				if (c.load && console.log("fetch", a, d), a.match(/^data:/)) {
					var e = a.split(","),
						f = e[0],
						g = e[1];
					g = f.indexOf(";base64") > -1 ? atob(g) : decodeURIComponent(g), setTimeout(function() {
						this.receive(a, d, null, g)
					}.bind(this), 0)
				} else {
					var h = function(b, c, e) {
						this.receive(a, d, b, c, e)
					}.bind(this);
					b.load(a, h)
				}
			},
			receive: function(a, b, c, d, e) {
				this.cache[a] = d;
				for (var f, g = this.pending[a], h = 0, i = g.length; i > h && (f = g[h]); h++) this.onload(a, f, d, c, e), this.tail();
				this.pending[a] = null
			},
			tail: function() {
				--this.inflight, this.checkDone()
			},
			checkDone: function() {
				this.inflight || this.oncomplete()
			}
		}, b = b || {
			async: !0,
			ok: function(a) {
				return a.status >= 200 && a.status < 300 || 304 === a.status || 0 === a.status
			},
			load: function(c, d, e) {
				var f = new XMLHttpRequest;
				return (a.flags.debug || a.flags.bust) && (c += "?" + Math.random()), f.open("GET", c, b.async), f.addEventListener("readystatechange", function() {
					if (4 === f.readyState) {
						var a = f.getResponseHeader("Location"),
							c = null;
						if (a) var c = "/" === a.substr(0, 1) ? location.origin + a : a;
						d.call(e, !b.ok(f) && f, f.response || f.responseText, c)
					}
				}), f.send(), f
			},
			loadDocument: function(a, b, c) {
				this.load(a, b, c).responseType = "document"
			}
		}, a.xhr = b, a.Loader = d
	}(window.HTMLImports),
	function(a) {
		function b(a) {
			return "link" === a.localName && a.rel === j
		}

		function c(a) {
			var b = d(a);
			return "data:text/javascript;charset=utf-8," + encodeURIComponent(b)
		}

		function d(a) {
			return a.textContent + e(a)
		}

		function e(a) {
			var b = a.__nodeUrl;
			if (!b) {
				b = a.ownerDocument.baseURI;
				var c = "[" + Math.floor(1e3 * (Math.random() + 1)) + "]",
					d = a.textContent.match(/Polymer\(['"]([^'"]*)/);
				c = d && d[1] || c, b += "/" + c + ".js"
			}
			return "\n//# sourceURL=" + b + "\n"
		}

		function f(a) {
			var b = a.ownerDocument.createElement("style");
			return b.textContent = a.textContent, n.resolveUrlsInStyle(b), b
		}
		var g = a.rootDocument,
			h = a.flags,
			i = a.isIE,
			j = a.IMPORT_LINK_TYPE,
			k = {
				documentSelectors: "link[rel=" + j + "]",
				importsSelectors: ["link[rel=" + j + "]", "link[rel=stylesheet]", "style", "script:not([type])", 'script[type="text/javascript"]'].join(","),
				map: {
					link: "parseLink",
					script: "parseScript",
					style: "parseStyle"
				},
				dynamicElements: [],
				parseNext: function() {
					var a = this.nextToParse();
					a && this.parse(a)
				},
				parse: function(a) {
					if (this.isParsed(a)) return void(h.parse && console.log("[%s] is already parsed", a.localName));
					var b = this[this.map[a.localName]];
					b && (this.markParsing(a), b.call(this, a))
				},
				parseDynamic: function(a, b) {
					this.dynamicElements.push(a), b || this.parseNext()
				},
				markParsing: function(a) {
					h.parse && console.log("parsing", a), this.parsingElement = a
				},
				markParsingComplete: function(a) {
					a.__importParsed = !0, this.markDynamicParsingComplete(a), a.__importElement && (a.__importElement.__importParsed = !0, this.markDynamicParsingComplete(a.__importElement)), this.parsingElement = null, h.parse && console.log("completed", a)
				},
				markDynamicParsingComplete: function(a) {
					var b = this.dynamicElements.indexOf(a);
					b >= 0 && this.dynamicElements.splice(b, 1)
				},
				parseImport: function(a) {
					if (HTMLImports.__importsParsingHook && HTMLImports.__importsParsingHook(a), a.import && (a.import.__importParsed = !0), this.markParsingComplete(a), a.dispatchEvent(a.__resource && !a.__error ? new CustomEvent("load", {
							bubbles: !1
						}) : new CustomEvent("error", {
							bubbles: !1
						})), a.__pending)
						for (var b; a.__pending.length;) b = a.__pending.shift(), b && b({
							target: a
						});
					this.parseNext()
				},
				parseLink: function(a) {
					b(a) ? this.parseImport(a) : (a.href = a.href, this.parseGeneric(a))
				},
				parseStyle: function(a) {
					var b = a;
					a = f(a), a.__importElement = b, this.parseGeneric(a)
				},
				parseGeneric: function(a) {
					this.trackElement(a), this.addElementToDocument(a)
				},
				rootImportForElement: function(a) {
					for (var b = a; b.ownerDocument.__importLink;) b = b.ownerDocument.__importLink;
					return b
				},
				addElementToDocument: function(a) {
					for (var b = this.rootImportForElement(a.__importElement || a), c = b.__insertedElements = b.__insertedElements || 0, d = b.nextElementSibling, e = 0; c > e; e++) d = d && d.nextElementSibling;
					b.parentNode.insertBefore(a, d)
				},
				trackElement: function(a, b) {
					var c = this,
						d = function(d) {
							b && b(d), c.markParsingComplete(a), c.parseNext()
						};
					if (a.addEventListener("load", d), a.addEventListener("error", d), i && "style" === a.localName) {
						var e = !1;
						if (-1 == a.textContent.indexOf("@import")) e = !0;
						else if (a.sheet) {
							e = !0;
							for (var f, g = a.sheet.cssRules, h = g ? g.length : 0, j = 0; h > j && (f = g[j]); j++) f.type === CSSRule.IMPORT_RULE && (e = e && Boolean(f.styleSheet))
						}
						e && a.dispatchEvent(new CustomEvent("load", {
							bubbles: !1
						}))
					}
				},
				parseScript: function(b) {
					var d = document.createElement("script");
					d.__importElement = b, d.src = b.src ? b.src : c(b), a.currentScript = b, this.trackElement(d, function() {
						d.parentNode.removeChild(d), a.currentScript = null
					}), this.addElementToDocument(d)
				},
				nextToParse: function() {
					return this._mayParse = [], !this.parsingElement && (this.nextToParseInDoc(g) || this.nextToParseDynamic())
				},
				nextToParseInDoc: function(a, c) {
					if (a && this._mayParse.indexOf(a) < 0) {
						this._mayParse.push(a);
						for (var d, e = a.querySelectorAll(this.parseSelectorsForNode(a)), f = 0, g = e.length; g > f && (d = e[f]); f++)
							if (!this.isParsed(d)) return this.hasResource(d) ? b(d) ? this.nextToParseInDoc(d.import, d) : d : void 0
					}
					return c
				},
				nextToParseDynamic: function() {
					return this.dynamicElements[0]
				},
				parseSelectorsForNode: function(a) {
					var b = a.ownerDocument || a;
					return b === g ? this.documentSelectors : this.importsSelectors
				},
				isParsed: function(a) {
					return a.__importParsed
				},
				needsDynamicParsing: function(a) {
					return this.dynamicElements.indexOf(a) >= 0
				},
				hasResource: function(a) {
					return b(a) && void 0 === a.import ? !1 : !0
				}
			},
			l = /(url\()([^)]*)(\))/g,
			m = /(@import[\s]+(?!url\())([^;]*)(;)/g,
			n = {
				resolveUrlsInStyle: function(a) {
					var b = a.ownerDocument,
						c = b.createElement("a");
					return a.textContent = this.resolveUrlsInCssText(a.textContent, c), a
				},
				resolveUrlsInCssText: function(a, b) {
					var c = this.replaceUrls(a, b, l);
					return c = this.replaceUrls(c, b, m)
				},
				replaceUrls: function(a, b, c) {
					return a.replace(c, function(a, c, d, e) {
						var f = d.replace(/["']/g, "");
						return b.href = f, f = b.href, c + "'" + f + "'" + e
					})
				}
			};
		a.parser = k, a.path = n
	}(HTMLImports),
	function(a) {
		function b(a) {
			return c(a, g)
		}

		function c(a, b) {
			return "link" === a.localName && a.getAttribute("rel") === b
		}

		function d(a, b) {
			var c = a;
			c instanceof Document || (c = document.implementation.createHTMLDocument(g)), c._URL = b;
			var d = c.createElement("base");
			d.setAttribute("href", b), c.baseURI || (c.baseURI = b);
			var e = c.createElement("meta");
			return e.setAttribute("charset", "utf-8"), c.head.appendChild(e), c.head.appendChild(d), a instanceof Document || (c.body.innerHTML = a), window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap(c), c
		}
		var e = a.useNative,
			f = a.flags,
			g = a.IMPORT_LINK_TYPE;
		if (e) var h = {};
		else {
			var i = a.rootDocument,
				j = (a.xhr, a.Loader),
				k = a.parser,
				h = {
					documents: {},
					documentPreloadSelectors: "link[rel=" + g + "]",
					importsPreloadSelectors: ["link[rel=" + g + "]"].join(","),
					loadNode: function(a) {
						l.addNode(a)
					},
					loadSubtree: function(a) {
						var b = this.marshalNodes(a);
						l.addNodes(b)
					},
					marshalNodes: function(a) {
						return a.querySelectorAll(this.loadSelectorsForNode(a))
					},
					loadSelectorsForNode: function(a) {
						var b = a.ownerDocument || a;
						return b === i ? this.documentPreloadSelectors : this.importsPreloadSelectors
					},
					loaded: function(a, c, e, g, h) {
						if (f.load && console.log("loaded", a, c), c.__resource = e, c.__error = g, b(c)) {
							var i = this.documents[a];
							void 0 === i && (i = g ? null : d(e, h || a), i && (i.__importLink = c, this.bootDocument(i)), this.documents[a] = i), c.import = i
						}
						k.parseNext()
					},
					bootDocument: function(a) {
						this.loadSubtree(a), this.observe(a), k.parseNext()
					},
					loadedAll: function() {
						k.parseNext()
					}
				},
				l = new j(h.loaded.bind(h), h.loadedAll.bind(h));
			if (!document.baseURI) {
				var m = {
					get: function() {
						var a = document.querySelector("base");
						return a ? a.href : window.location.href
					},
					configurable: !0
				};
				Object.defineProperty(document, "baseURI", m), Object.defineProperty(i, "baseURI", m)
			}
			"function" != typeof window.CustomEvent && (window.CustomEvent = function(a, b) {
				var c = document.createEvent("HTMLEvents");
				return c.initEvent(a, b.bubbles === !1 ? !1 : !0, b.cancelable === !1 ? !1 : !0, b.detail), c
			})
		}
		a.importer = h, a.IMPORT_LINK_TYPE = g, a.importLoader = l
	}(window.HTMLImports),
	function(a) {
		function b(a) {
			for (var b, d = 0, e = a.length; e > d && (b = a[d]); d++) "childList" === b.type && b.addedNodes.length && c(b.addedNodes)
		}

		function c(a) {
			for (var b, f, i, j, k = 0, l = a.length; l > k && (i = a[k]); k++) b || (b = i.ownerDocument, f = h.isParsed(b)), j = d(i), j && g.loadNode(i), e(i) && f && h.parseDynamic(i, j), i.children && i.children.length && c(i.children)
		}

		function d(a) {
			return 1 === a.nodeType && i.call(a, g.loadSelectorsForNode(a))
		}

		function e(a) {
			return 1 === a.nodeType && i.call(a, h.parseSelectorsForNode(a))
		}

		function f(a) {
			j.observe(a, {
				childList: !0,
				subtree: !0
			})
		}
		var g = (a.IMPORT_LINK_TYPE, a.importer),
			h = a.parser,
			i = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector,
			j = new MutationObserver(b);
		a.observe = f, g.observe = f
	}(HTMLImports),
	function() {
		function a() {
			HTMLImports.importer.bootDocument(b)
		}
		var b = window.ShadowDOMPolyfill ? window.ShadowDOMPolyfill.wrapIfNeeded(document) : document;
		HTMLImports.useNative || ("complete" === document.readyState || "interactive" === document.readyState && !window.attachEvent ? a() : document.addEventListener("DOMContentLoaded", a))
	}(), window.CustomElements = window.CustomElements || {
		flags: {}
	},
	function(a) {
		function b(a, c, d) {
			var e = a.firstElementChild;
			if (!e)
				for (e = a.firstChild; e && e.nodeType !== Node.ELEMENT_NODE;) e = e.nextSibling;
			for (; e;) c(e, d) !== !0 && b(e, c, d), e = e.nextElementSibling;
			return null
		}

		function c(a, b) {
			for (var c = a.shadowRoot; c;) d(c, b), c = c.olderShadowRoot
		}

		function d(a, d) {
			b(a, function(a) {
				return d(a) ? !0 : void c(a, d)
			}), c(a, d)
		}

		function e(a) {
			return h(a) ? (i(a), !0) : void l(a)
		}

		function f(a) {
			d(a, function(a) {
				return e(a) ? !0 : void 0
			})
		}

		function g(a) {
			return e(a) || f(a)
		}

		function h(b) {
			if (!b.__upgraded__ && b.nodeType === Node.ELEMENT_NODE) {
				var c = b.getAttribute("is") || b.localName,
					d = a.registry[c];
				if (d) return B.dom && console.group("upgrade:", b.localName), a.upgrade(b), B.dom && console.groupEnd(), !0
			}
		}

		function i(a) {
			l(a), r(a) && d(a, function(a) {
				l(a)
			})
		}

		function j(a) {
			if (G.push(a), !F) {
				F = !0;
				var b = window.Platform && window.Platform.endOfMicrotask || setTimeout;
				b(k)
			}
		}

		function k() {
			F = !1;
			for (var a, b = G, c = 0, d = b.length; d > c && (a = b[c]); c++) a();
			G = []
		}

		function l(a) {
			D ? j(function() {
				m(a)
			}) : m(a)
		}

		function m(a) {
			(a.attachedCallback || a.detachedCallback || a.__upgraded__ && B.dom) && (B.dom && console.group("inserted:", a.localName), r(a) && (a.__inserted = (a.__inserted || 0) + 1, a.__inserted < 1 && (a.__inserted = 1), a.__inserted > 1 ? B.dom && console.warn("inserted:", a.localName, "insert/remove count:", a.__inserted) : a.attachedCallback && (B.dom && console.log("inserted:", a.localName), a.attachedCallback())), B.dom && console.groupEnd())
		}

		function n(a) {
			o(a), d(a, function(a) {
				o(a)
			})
		}

		function o(a) {
			D ? j(function() {
				p(a)
			}) : p(a)
		}

		function p(a) {
			(a.attachedCallback || a.detachedCallback || a.__upgraded__ && B.dom) && (B.dom && console.group("removed:", a.localName), r(a) || (a.__inserted = (a.__inserted || 0) - 1, a.__inserted > 0 && (a.__inserted = 0), a.__inserted < 0 ? B.dom && console.warn("removed:", a.localName, "insert/remove count:", a.__inserted) : a.detachedCallback && a.detachedCallback()), B.dom && console.groupEnd())
		}

		function q(a) {
			return window.ShadowDOMPolyfill ? ShadowDOMPolyfill.wrapIfNeeded(a) : a
		}

		function r(a) {
			for (var b = a, c = q(document); b;) {
				if (b == c) return !0;
				b = b.parentNode || b.host
			}
		}

		function s(a) {
			if (a.shadowRoot && !a.shadowRoot.__watched) {
				B.dom && console.log("watching shadow-root for: ", a.localName);
				for (var b = a.shadowRoot; b;) t(b), b = b.olderShadowRoot
			}
		}

		function t(a) {
			w(a)
		}

		function u(a) {
			if (B.dom) {
				var b = a[0];
				if (b && "childList" === b.type && b.addedNodes && b.addedNodes) {
					for (var c = b.addedNodes[0]; c && c !== document && !c.host;) c = c.parentNode;
					var d = c && (c.URL || c._URL || c.host && c.host.localName) || "";
					d = d.split("/?").shift().split("/").pop()
				}
				console.group("mutations (%d) [%s]", a.length, d || "")
			}
			a.forEach(function(a) {
				"childList" === a.type && (H(a.addedNodes, function(a) {
					a.localName && g(a)
				}), H(a.removedNodes, function(a) {
					a.localName && n(a)
				}))
			}), B.dom && console.groupEnd()
		}

		function v(a) {
			for (a || (a = q(document)); a.parentNode;) a = a.parentNode;
			var b = a.__observer;
			b && (u(b.takeRecords()), k())
		}

		function w(a) {
			if (!a.__observer) {
				var b = new MutationObserver(u);
				b.observe(a, {
					childList: !0,
					subtree: !0
				}), a.__observer = b
			}
		}

		function x(a) {
			w(a)
		}

		function y(a) {
			B.dom && console.group("upgradeDocument: ", a.baseURI.split("/").pop()), g(a), B.dom && console.groupEnd()
		}

		function z(a) {
			E = [], A(a), E = null
		}

		function A(a) {
			if (a = q(a), !(E.indexOf(a) >= 0)) {
				E.push(a);
				for (var b, c = a.querySelectorAll("link[rel=" + C + "]"), d = 0, e = c.length; e > d && (b = c[d]); d++) b.import && b.import.__parsed && A(b.import);
				y(a)
			}
		}
		var B = window.logFlags || {},
			C = window.HTMLImports ? HTMLImports.IMPORT_LINK_TYPE : "none",
			D = !window.MutationObserver || window.MutationObserver === window.JsMutationObserver;
		a.hasPolyfillMutations = D;
		var E, F = !1,
			G = [],
			H = Array.prototype.forEach.call.bind(Array.prototype.forEach);
		a.IMPORT_LINK_TYPE = C, a.watchShadow = s, a.upgradeDocumentTree = z, a.upgradeAll = g, a.upgradeSubtree = f, a.insertedNode = i, a.observeDocument = x, a.upgradeDocument = y, a.takeRecords = v
	}(window.CustomElements),
	function(a) {
		function b(b, g) {
			var h = g || {};
			if (!b) throw new Error("document.registerElement: first argument `name` must not be empty");
			if (b.indexOf("-") < 0) throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(b) + "'.");
			if (c(b)) throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(b) + "'. The type name is invalid.");
			if (n(b)) throw new Error("DuplicateDefinitionError: a type with name '" + String(b) + "' is already registered");
			if (!h.prototype) throw new Error("Options missing required prototype property");
			return h.__name = b.toLowerCase(), h.lifecycle = h.lifecycle || {}, h.ancestry = d(h.extends), e(h), f(h), l(h.prototype), o(h.__name, h), h.ctor = p(h), h.ctor.prototype = h.prototype, h.prototype.constructor = h.ctor, a.ready && a.upgradeDocumentTree(document), h.ctor
		}

		function c(a) {
			for (var b = 0; b < y.length; b++)
				if (a === y[b]) return !0
		}

		function d(a) {
			var b = n(a);
			return b ? d(b.extends).concat([b]) : []
		}

		function e(a) {
			for (var b, c = a.extends, d = 0; b = a.ancestry[d]; d++) c = b.is && b.tag;
			a.tag = c || a.__name, c && (a.is = a.__name)
		}

		function f(a) {
			if (!Object.__proto__) {
				var b = HTMLElement.prototype;
				if (a.is) {
					var c = document.createElement(a.tag),
						d = Object.getPrototypeOf(c);
					d === a.prototype && (b = d)
				}
				for (var e, f = a.prototype; f && f !== b;) e = Object.getPrototypeOf(f), f.__proto__ = e, f = e;
				a.native = b
			}
		}

		function g(a) {
			return h(B(a.tag), a)
		}

		function h(b, c) {
			return c.is && b.setAttribute("is", c.is), i(b, c), b.__upgraded__ = !0, k(b), a.insertedNode(b), a.upgradeSubtree(b), b
		}

		function i(a, b) {
			Object.__proto__ ? a.__proto__ = b.prototype : (j(a, b.prototype, b.native), a.__proto__ = b.prototype)
		}

		function j(a, b, c) {
			for (var d = {}, e = b; e !== c && e !== HTMLElement.prototype;) {
				for (var f, g = Object.getOwnPropertyNames(e), h = 0; f = g[h]; h++) d[f] || (Object.defineProperty(a, f, Object.getOwnPropertyDescriptor(e, f)), d[f] = 1);
				e = Object.getPrototypeOf(e)
			}
		}

		function k(a) {
			a.createdCallback && a.createdCallback()
		}

		function l(a) {
			if (!a.setAttribute._polyfilled) {
				var b = a.setAttribute;
				a.setAttribute = function(a, c) {
					m.call(this, a, c, b)
				};
				var c = a.removeAttribute;
				a.removeAttribute = function(a) {
					m.call(this, a, null, c)
				}, a.setAttribute._polyfilled = !0
			}
		}

		function m(a, b, c) {
			a = a.toLowerCase();
			var d = this.getAttribute(a);
			c.apply(this, arguments);
			var e = this.getAttribute(a);
			this.attributeChangedCallback && e !== d && this.attributeChangedCallback(a, d, e)
		}

		function n(a) {
			return a ? z[a.toLowerCase()] : void 0
		}

		function o(a, b) {
			z[a] = b
		}

		function p(a) {
			return function() {
				return g(a)
			}
		}

		function q(a, b, c) {
			return a === A ? r(b, c) : C(a, b)
		}

		function r(a, b) {
			var c = n(b || a);
			if (c) {
				if (a == c.tag && b == c.is) return new c.ctor;
				if (!b && !c.is) return new c.ctor
			}
			if (b) {
				var d = r(a);
				return d.setAttribute("is", b), d
			}
			var d = B(a);
			return a.indexOf("-") >= 0 && i(d, HTMLElement), d
		}

		function s(a) {
			if (!a.__upgraded__ && a.nodeType === Node.ELEMENT_NODE) {
				var b = a.getAttribute("is"),
					c = n(b || a.localName);
				if (c) {
					if (b && c.tag == a.localName) return h(a, c);
					if (!b && !c.extends) return h(a, c)
				}
			}
		}

		function t(b) {
			var c = D.call(this, b);
			return a.upgradeAll(c), c
		}
		a || (a = window.CustomElements = {
			flags: {}
		});
		var u = a.flags,
			v = Boolean(document.registerElement),
			w = !u.register && v && !window.ShadowDOMPolyfill && (!window.HTMLImports || HTMLImports.useNative);
		if (w) {
			var x = function() {};
			a.registry = {}, a.upgradeElement = x, a.watchShadow = x, a.upgrade = x, a.upgradeAll = x, a.upgradeSubtree = x, a.observeDocument = x, a.upgradeDocument = x, a.upgradeDocumentTree = x, a.takeRecords = x, a.reservedTagList = []
		} else {
			var y = ["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"],
				z = {},
				A = "http://www.w3.org/1999/xhtml",
				B = document.createElement.bind(document),
				C = document.createElementNS.bind(document),
				D = Node.prototype.cloneNode;
			document.registerElement = b, document.createElement = r, document.createElementNS = q, Node.prototype.cloneNode = t, a.registry = z, a.upgrade = s
		}
		var E;
		E = Object.__proto__ || w ? function(a, b) {
			return a instanceof b
		} : function(a, b) {
			for (var c = a; c;) {
				if (c === b.prototype) return !0;
				c = c.__proto__
			}
			return !1
		}, a.instanceof = E, a.reservedTagList = y, document.register = document.registerElement, a.hasNative = v, a.useNative = w
	}(window.CustomElements),
	function(a) {
		function b(a) {
			return "link" === a.localName && a.getAttribute("rel") === c
		}
		var c = a.IMPORT_LINK_TYPE,
			d = {
				selectors: ["link[rel=" + c + "]"],
				map: {
					link: "parseLink"
				},
				parse: function(a) {
					if (!a.__parsed) {
						a.__parsed = !0;
						var b = a.querySelectorAll(d.selectors);
						e(b, function(a) {
							d[d.map[a.localName]](a)
						}), CustomElements.upgradeDocument(a), CustomElements.observeDocument(a)
					}
				},
				parseLink: function(a) {
					b(a) && this.parseImport(a)
				},
				parseImport: function(a) {
					a.import && d.parse(a.import)
				}
			},
			e = Array.prototype.forEach.call.bind(Array.prototype.forEach);
		a.parser = d, a.IMPORT_LINK_TYPE = c
	}(window.CustomElements),
	function(a) {
		function b() {
			CustomElements.parser.parse(document), CustomElements.upgradeDocument(document), window.HTMLImports && (HTMLImports.__importsParsingHook = function(a) {
				CustomElements.parser.parse(a.import)
			}), CustomElements.ready = !0, setTimeout(function() {
				CustomElements.readyTime = Date.now(), window.HTMLImports && (CustomElements.elapsed = CustomElements.readyTime - HTMLImports.readyTime), document.dispatchEvent(new CustomEvent("WebComponentsReady", {
					bubbles: !0
				}))
			})
		}
		if ("function" != typeof window.CustomEvent && (window.CustomEvent = function(a, b) {
				b = b || {};
				var c = document.createEvent("CustomEvent");
				return c.initCustomEvent(a, Boolean(b.bubbles), Boolean(b.cancelable), b.detail), c
			}, window.CustomEvent.prototype = window.Event.prototype), "complete" === document.readyState || a.flags.eager) b();
		else if ("interactive" !== document.readyState || window.attachEvent || window.HTMLImports && !window.HTMLImports.ready) {
			var c = window.HTMLImports && !HTMLImports.ready ? "HTMLImportsLoaded" : "DOMContentLoaded";
			window.addEventListener(c, b)
		} else b()
	}(window.CustomElements),
	function() {
		if (window.ShadowDOMPolyfill) {
			var a = ["upgradeAll", "upgradeSubtree", "observeDocument", "upgradeDocument"],
				b = {};
			a.forEach(function(a) {
				b[a] = CustomElements[a]
			}), a.forEach(function(a) {
				CustomElements[a] = function(c) {
					return b[a](wrap(c))
				}
			})
		}
	}(),
	function(a) {
		"use strict";

		function b() {
			window.Polymer === e && (window.Polymer = function() {
				throw new Error('You tried to use polymer without loading it first. To load polymer, <link rel="import" href="components/polymer/polymer.html">')
			})
		}
		if (!window.performance) {
			var c = Date.now();
			window.performance = {
				now: function() {
					return Date.now() - c
				}
			}
		}
		window.requestAnimationFrame || (window.requestAnimationFrame = function() {
			var a = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
			return a ? function(b) {
				return a(function() {
					b(performance.now())
				})
			} : function(a) {
				return window.setTimeout(a, 1e3 / 60)
			}
		}()), window.cancelAnimationFrame || (window.cancelAnimationFrame = function() {
			return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function(a) {
				clearTimeout(a)
			}
		}());
		var d = [],
			e = function(a) {
				"string" != typeof a && 1 === arguments.length && Array.prototype.push.call(arguments, document._currentScript), d.push(arguments)
			};
		window.Polymer = e, a.consumeDeclarations = function(b) {
			a.consumeDeclarations = function() {
				throw "Possible attempt to load Polymer twice"
			}, b && b(d), d = null
		}, HTMLImports.useNative ? b() : addEventListener("DOMContentLoaded", b)
	}(window.Platform),
	function() {
		var a = document.createElement("style");
		a.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";
		var b = document.querySelector("head");
		b.insertBefore(a, b.firstChild)
	}(Platform),
	function(a) {
		function b(a, b) {
			return b = b || [], b.map || (b = [b]), a.apply(this, b.map(d))
		}

		function c(a, c, d) {
			var e;
			switch (arguments.length) {
				case 0:
					return;
				case 1:
					e = null;
					break;
				case 2:
					e = c.apply(this);
					break;
				default:
					e = b(d, c)
			}
			f[a] = e
		}

		function d(a) {
			return f[a]
		}

		function e(a, c) {
			HTMLImports.whenImportsReady(function() {
				b(c, a)
			})
		}
		var f = {};
		a.marshal = d, a.modularize = c, a.using = e
	}(window);
//# sourceMappingURL=platform.js.map