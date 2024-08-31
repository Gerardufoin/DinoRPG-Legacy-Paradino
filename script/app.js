var _____WB$wombat$assign$function_____ = function (name) {
  return (
    (self._wb_wombat &&
      self._wb_wombat.local_init &&
      self._wb_wombat.local_init(name)) ||
    self[name]
  );
};
if (!self.__WB_pmw) {
  self.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

  (function () {
    "use strict";
    var $hxClasses = {},
      $estr = function () {
        return js.Boot.__string_rec(this, "");
      };
    var EReg = function (r, opt) {
      opt = opt.split("u").join("");
      this.r = new RegExp(r, opt);
    };
    $hxClasses["EReg"] = EReg;
    EReg.__name__ = ["EReg"];
    EReg.prototype = {
      customReplace: function (s, f) {
        var buf = new StringBuf();
        while (true) {
          if (!this.match(s)) break;
          buf.b += Std.string(this.matchedLeft());
          buf.b += Std.string(f(this));
          s = this.matchedRight();
        }
        buf.b += Std.string(s);
        return buf.b;
      },
      replace: function (s, by) {
        return s.replace(this.r, by);
      },
      split: function (s) {
        var d = "#__delim__#";
        return s.replace(this.r, d).split(d);
      },
      matchedPos: function () {
        if (this.r.m == null) throw "No string matched";
        return { pos: this.r.m.index, len: this.r.m[0].length };
      },
      matchedRight: function () {
        if (this.r.m == null) throw "No string matched";
        var sz = this.r.m.index + this.r.m[0].length;
        return this.r.s.substr(sz, this.r.s.length - sz);
      },
      matchedLeft: function () {
        if (this.r.m == null) throw "No string matched";
        return this.r.s.substr(0, this.r.m.index);
      },
      matched: function (n) {
        return this.r.m != null && n >= 0 && n < this.r.m.length
          ? this.r.m[n]
          : (function ($this) {
              var $r;
              throw "EReg::matched";
              return $r;
            })(this);
      },
      match: function (s) {
        if (this.r.global) this.r.lastIndex = 0;
        this.r.m = this.r.exec(s);
        this.r.s = s;
        return this.r.m != null;
      },
      r: null,
      __class__: EReg,
    };
    var Hash = function () {
      this.h = {};
    };
    $hxClasses["Hash"] = Hash;
    Hash.__name__ = ["Hash"];
    Hash.prototype = {
      toString: function () {
        var s = new StringBuf();
        s.b += "{";
        var it = this.keys();
        while (it.hasNext()) {
          var i = it.next();
          s.b += Std.string(i);
          s.b += " => ";
          s.b += Std.string(Std.string(this.get(i)));
          if (it.hasNext()) s.b += ", ";
        }
        s.b += "}";
        return s.b;
      },
      iterator: function () {
        return {
          ref: this.h,
          it: this.keys(),
          hasNext: function () {
            return this.it.hasNext();
          },
          next: function () {
            var i = this.it.next();
            return this.ref["$" + i];
          },
        };
      },
      keys: function () {
        var a = [];
        for (var key in this.h) {
          if (this.h.hasOwnProperty(key)) a.push(key.substr(1));
        }
        return HxOverrides.iter(a);
      },
      remove: function (key) {
        key = "$" + key;
        if (!this.h.hasOwnProperty(key)) return false;
        delete this.h[key];
        return true;
      },
      exists: function (key) {
        return this.h.hasOwnProperty("$" + key);
      },
      get: function (key) {
        return this.h["$" + key];
      },
      set: function (key, value) {
        this.h["$" + key] = value;
      },
      h: null,
      __class__: Hash,
    };
    var HxOverrides = function () {};
    $hxClasses["HxOverrides"] = HxOverrides;
    HxOverrides.__name__ = ["HxOverrides"];
    HxOverrides.dateStr = function (date) {
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var mi = date.getMinutes();
      var s = date.getSeconds();
      return (
        date.getFullYear() +
        "-" +
        (m < 10 ? "0" + m : "" + m) +
        "-" +
        (d < 10 ? "0" + d : "" + d) +
        " " +
        (h < 10 ? "0" + h : "" + h) +
        ":" +
        (mi < 10 ? "0" + mi : "" + mi) +
        ":" +
        (s < 10 ? "0" + s : "" + s)
      );
    };
    HxOverrides.strDate = function (s) {
      switch (s.length) {
        case 8:
          var k = s.split(":");
          var d = new Date();
          d.setTime(0);
          d.setUTCHours(k[0]);
          d.setUTCMinutes(k[1]);
          d.setUTCSeconds(k[2]);
          return d;
        case 10:
          var k = s.split("-");
          return new Date(k[0], k[1] - 1, k[2], 0, 0, 0);
        case 19:
          var k = s.split(" ");
          var y = k[0].split("-");
          var t = k[1].split(":");
          return new Date(y[0], y[1] - 1, y[2], t[0], t[1], t[2]);
        default:
          throw "Invalid date format : " + s;
      }
    };
    HxOverrides.cca = function (s, index) {
      var x = s.cca(index);
      if (x != x) return undefined;
      return x;
    };
    HxOverrides.substr = function (s, pos, len) {
      if (pos != null && pos != 0 && len != null && len < 0) return "";
      if (len == null) len = s.length;
      if (pos < 0) {
        pos = s.length + pos;
        if (pos < 0) pos = 0;
      } else if (len < 0) len = s.length + len - pos;
      return s.substr(pos, len);
    };
    HxOverrides.remove = function (a, obj) {
      var i = 0;
      var l = a.length;
      while (i < l) {
        if (a[i] == obj) {
          a.splice(i, 1);
          return true;
        }
        i++;
      }
      return false;
    };
    HxOverrides.iter = function (a) {
      return {
        cur: 0,
        arr: a,
        hasNext: function () {
          return this.cur < this.arr.length;
        },
        next: function () {
          return this.arr[this.cur++];
        },
      };
    };
    var IntHash = function () {
      this.h = {};
    };
    $hxClasses["IntHash"] = IntHash;
    IntHash.__name__ = ["IntHash"];
    IntHash.prototype = {
      toString: function () {
        var s = new StringBuf();
        s.b += "{";
        var it = this.keys();
        while (it.hasNext()) {
          var i = it.next();
          s.b += Std.string(i);
          s.b += " => ";
          s.b += Std.string(Std.string(this.get(i)));
          if (it.hasNext()) s.b += ", ";
        }
        s.b += "}";
        return s.b;
      },
      iterator: function () {
        return {
          ref: this.h,
          it: this.keys(),
          hasNext: function () {
            return this.it.hasNext();
          },
          next: function () {
            var i = this.it.next();
            return this.ref[i];
          },
        };
      },
      keys: function () {
        var a = [];
        for (var key in this.h) {
          if (this.h.hasOwnProperty(key)) a.push(key | 0);
        }
        return HxOverrides.iter(a);
      },
      remove: function (key) {
        if (!this.h.hasOwnProperty(key)) return false;
        delete this.h[key];
        return true;
      },
      exists: function (key) {
        return this.h.hasOwnProperty(key);
      },
      get: function (key) {
        return this.h[key];
      },
      set: function (key, value) {
        this.h[key] = value;
      },
      h: null,
      __class__: IntHash,
    };
    var IntIter = function (min, max) {
      this.min = min;
      this.max = max;
    };
    $hxClasses["IntIter"] = IntIter;
    IntIter.__name__ = ["IntIter"];
    IntIter.prototype = {
      next: function () {
        return this.min++;
      },
      hasNext: function () {
        return this.min < this.max;
      },
      max: null,
      min: null,
      __class__: IntIter,
    };
    var Lambda = function () {};
    $hxClasses["Lambda"] = Lambda;
    Lambda.__name__ = ["Lambda"];
    Lambda.array = function (it) {
      var a = new Array();
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var i = $it0.next();
        a.push(i);
      }
      return a;
    };
    Lambda.list = function (it) {
      var l = new List();
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var i = $it0.next();
        l.add(i);
      }
      return l;
    };
    Lambda.map = function (it, f) {
      var l = new List();
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var x = $it0.next();
        l.add(f(x));
      }
      return l;
    };
    Lambda.mapi = function (it, f) {
      var l = new List();
      var i = 0;
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var x = $it0.next();
        l.add(f(i++, x));
      }
      return l;
    };
    Lambda.has = function (it, elt, cmp) {
      if (cmp == null) {
        var $it0 = $iterator(it)();
        while ($it0.hasNext()) {
          var x = $it0.next();
          if (x == elt) return true;
        }
      } else {
        var $it1 = $iterator(it)();
        while ($it1.hasNext()) {
          var x = $it1.next();
          if (cmp(x, elt)) return true;
        }
      }
      return false;
    };
    Lambda.exists = function (it, f) {
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var x = $it0.next();
        if (f(x)) return true;
      }
      return false;
    };
    Lambda.foreach = function (it, f) {
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var x = $it0.next();
        if (!f(x)) return false;
      }
      return true;
    };
    Lambda.iter = function (it, f) {
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var x = $it0.next();
        f(x);
      }
    };
    Lambda.filter = function (it, f) {
      var l = new List();
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var x = $it0.next();
        if (f(x)) l.add(x);
      }
      return l;
    };
    Lambda.fold = function (it, f, first) {
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var x = $it0.next();
        first = f(x, first);
      }
      return first;
    };
    Lambda.count = function (it, pred) {
      var n = 0;
      if (pred == null) {
        var $it0 = $iterator(it)();
        while ($it0.hasNext()) {
          var _ = $it0.next();
          n++;
        }
      } else {
        var $it1 = $iterator(it)();
        while ($it1.hasNext()) {
          var x = $it1.next();
          if (pred(x)) n++;
        }
      }
      return n;
    };
    Lambda.empty = function (it) {
      return !$iterator(it)().hasNext();
    };
    Lambda.indexOf = function (it, v) {
      var i = 0;
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var v2 = $it0.next();
        if (v == v2) return i;
        i++;
      }
      return -1;
    };
    Lambda.concat = function (a, b) {
      var l = new List();
      var $it0 = $iterator(a)();
      while ($it0.hasNext()) {
        var x = $it0.next();
        l.add(x);
      }
      var $it1 = $iterator(b)();
      while ($it1.hasNext()) {
        var x = $it1.next();
        l.add(x);
      }
      return l;
    };
    var List = function () {
      this.length = 0;
    };
    $hxClasses["List"] = List;
    List.__name__ = ["List"];
    List.prototype = {
      map: function (f) {
        var b = new List();
        var l = this.h;
        while (l != null) {
          var v = l[0];
          l = l[1];
          b.add(f(v));
        }
        return b;
      },
      filter: function (f) {
        var l2 = new List();
        var l = this.h;
        while (l != null) {
          var v = l[0];
          l = l[1];
          if (f(v)) l2.add(v);
        }
        return l2;
      },
      join: function (sep) {
        var s = new StringBuf();
        var first = true;
        var l = this.h;
        while (l != null) {
          if (first) first = false;
          else s.b += Std.string(sep);
          s.b += Std.string(l[0]);
          l = l[1];
        }
        return s.b;
      },
      toString: function () {
        var s = new StringBuf();
        var first = true;
        var l = this.h;
        s.b += "{";
        while (l != null) {
          if (first) first = false;
          else s.b += ", ";
          s.b += Std.string(Std.string(l[0]));
          l = l[1];
        }
        s.b += "}";
        return s.b;
      },
      iterator: function () {
        return {
          h: this.h,
          hasNext: function () {
            return this.h != null;
          },
          next: function () {
            if (this.h == null) return null;
            var x = this.h[0];
            this.h = this.h[1];
            return x;
          },
        };
      },
      remove: function (v) {
        var prev = null;
        var l = this.h;
        while (l != null) {
          if (l[0] == v) {
            if (prev == null) this.h = l[1];
            else prev[1] = l[1];
            if (this.q == l) this.q = prev;
            this.length--;
            return true;
          }
          prev = l;
          l = l[1];
        }
        return false;
      },
      clear: function () {
        this.h = null;
        this.q = null;
        this.length = 0;
      },
      isEmpty: function () {
        return this.h == null;
      },
      pop: function () {
        if (this.h == null) return null;
        var x = this.h[0];
        this.h = this.h[1];
        if (this.h == null) this.q = null;
        this.length--;
        return x;
      },
      last: function () {
        return this.q == null ? null : this.q[0];
      },
      first: function () {
        return this.h == null ? null : this.h[0];
      },
      push: function (item) {
        var x = [item, this.h];
        this.h = x;
        if (this.q == null) this.q = x;
        this.length++;
      },
      add: function (item) {
        var x = [item];
        if (this.h == null) this.h = x;
        else this.q[1] = x;
        this.q = x;
        this.length++;
      },
      length: null,
      q: null,
      h: null,
      __class__: List,
    };
    var Reflect = function () {};
    $hxClasses["Reflect"] = Reflect;
    Reflect.__name__ = ["Reflect"];
    Reflect.hasField = function (o, field) {
      return Object.prototype.hasOwnProperty.call(o, field);
    };
    Reflect.field = function (o, field) {
      var v = null;
      try {
        v = o[field];
      } catch (e) {}
      return v;
    };
    Reflect.setField = function (o, field, value) {
      o[field] = value;
    };
    Reflect.getProperty = function (o, field) {
      var tmp;
      return o == null
        ? null
        : o.__properties__ && (tmp = o.__properties__["get_" + field])
        ? o[tmp]()
        : o[field];
    };
    Reflect.setProperty = function (o, field, value) {
      var tmp;
      if (o.__properties__ && (tmp = o.__properties__["set_" + field]))
        o[tmp](value);
      else o[field] = value;
    };
    Reflect.callMethod = function (o, func, args) {
      return func.apply(o, args);
    };
    Reflect.fields = function (o) {
      var a = [];
      if (o != null) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        for (var f in o) {
          if (hasOwnProperty.call(o, f)) a.push(f);
        }
      }
      return a;
    };
    Reflect.isFunction = function (f) {
      return typeof f == "function" && !(f.__name__ || f.__ename__);
    };
    Reflect.compare = function (a, b) {
      return a == b ? 0 : a > b ? 1 : -1;
    };
    Reflect.compareMethods = function (f1, f2) {
      if (f1 == f2) return true;
      if (!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
      return (
        f1.scope == f2.scope && f1.method == f2.method && f1.method != null
      );
    };
    Reflect.isObject = function (v) {
      if (v == null) return false;
      var t = typeof v;
      return (
        t == "string" ||
        (t == "object" && !v.__enum__) ||
        (t == "function" && (v.__name__ || v.__ename__))
      );
    };
    Reflect.deleteField = function (o, f) {
      if (!Reflect.hasField(o, f)) return false;
      delete o[f];
      return true;
    };
    Reflect.copy = function (o) {
      var o2 = {};
      var _g = 0,
        _g1 = Reflect.fields(o);
      while (_g < _g1.length) {
        var f = _g1[_g];
        ++_g;
        o2[f] = Reflect.field(o, f);
      }
      return o2;
    };
    Reflect.makeVarArgs = function (f) {
      return function () {
        var a = Array.prototype.slice.call(arguments);
        return f(a);
      };
    };
    var Std = function () {};
    $hxClasses["Std"] = Std;
    Std.__name__ = ["Std"];
    Std["is"] = function (v, t) {
      return js.Boot.__instanceof(v, t);
    };
    Std.string = function (s) {
      return js.Boot.__string_rec(s, "");
    };
    Std["int"] = function (x) {
      return x | 0;
    };
    Std.parseInt = function (x) {
      var v = parseInt(x, 10);
      if (
        v == 0 &&
        (HxOverrides.cca(x, 1) == 120 || HxOverrides.cca(x, 1) == 88)
      )
        v = parseInt(x);
      if (isNaN(v)) return null;
      return v;
    };
    Std.parseFloat = function (x) {
      return parseFloat(x);
    };
    Std.random = function (x) {
      return x <= 0 ? 0 : Math.floor(Math.random() * x);
    };
    var StringBuf = function () {
      this.b = "";
    };
    $hxClasses["StringBuf"] = StringBuf;
    StringBuf.__name__ = ["StringBuf"];
    StringBuf.prototype = {
      toString: function () {
        return this.b;
      },
      addSub: function (s, pos, len) {
        this.b += HxOverrides.substr(s, pos, len);
      },
      addChar: function (c) {
        this.b += String.fromCharCode(c);
      },
      add: function (x) {
        this.b += Std.string(x);
      },
      b: null,
      __class__: StringBuf,
    };
    var StringTools = function () {};
    $hxClasses["StringTools"] = StringTools;
    $hxExpose(StringTools, "StringTools");
    StringTools.__name__ = ["StringTools"];
    StringTools.urlEncode = function (s) {
      return encodeURIComponent(s);
    };
    StringTools.urlDecode = function (s) {
      return decodeURIComponent(s.split("+").join(" "));
    };
    StringTools.htmlEscape = function (s, quotes) {
      s = s
        .split("&")
        .join("&amp;")
        .split("<")
        .join("&lt;")
        .split(">")
        .join("&gt;");
      return quotes ? s.split('"').join("&quot;").split("'").join("&#039;") : s;
    };
    StringTools.htmlUnescape = function (s) {
      return s
        .split("&gt;")
        .join(">")
        .split("&lt;")
        .join("<")
        .split("&quot;")
        .join('"')
        .split("&#039;")
        .join("'")
        .split("&amp;")
        .join("&");
    };
    StringTools.startsWith = function (s, start) {
      return (
        s.length >= start.length &&
        HxOverrides.substr(s, 0, start.length) == start
      );
    };
    StringTools.endsWith = function (s, end) {
      var elen = end.length;
      var slen = s.length;
      return slen >= elen && HxOverrides.substr(s, slen - elen, elen) == end;
    };
    StringTools.isSpace = function (s, pos) {
      var c = HxOverrides.cca(s, pos);
      return (c >= 9 && c <= 13) || c == 32;
    };
    StringTools.ltrim = function (s) {
      var l = s.length;
      var r = 0;
      while (r < l && StringTools.isSpace(s, r)) r++;
      if (r > 0) return HxOverrides.substr(s, r, l - r);
      else return s;
    };
    StringTools.rtrim = function (s) {
      var l = s.length;
      var r = 0;
      while (r < l && StringTools.isSpace(s, l - r - 1)) r++;
      if (r > 0) return HxOverrides.substr(s, 0, l - r);
      else return s;
    };
    StringTools.trim = function (s) {
      return StringTools.ltrim(StringTools.rtrim(s));
    };
    StringTools.rpad = function (s, c, l) {
      var sl = s.length;
      var cl = c.length;
      while (sl < l)
        if (l - sl < cl) {
          s += HxOverrides.substr(c, 0, l - sl);
          sl = l;
        } else {
          s += c;
          sl += cl;
        }
      return s;
    };
    StringTools.lpad = function (s, c, l) {
      var ns = "";
      var sl = s.length;
      if (sl >= l) return s;
      var cl = c.length;
      while (sl < l)
        if (l - sl < cl) {
          ns += HxOverrides.substr(c, 0, l - sl);
          sl = l;
        } else {
          ns += c;
          sl += cl;
        }
      return ns + s;
    };
    StringTools.replace = function (s, sub, by) {
      return s.split(sub).join(by);
    };
    StringTools.hex = function (n, digits) {
      var s = "";
      var hexChars = "0123456789ABCDEF";
      do {
        s = hexChars.charAt(n & 15) + s;
        n >>>= 4;
      } while (n > 0);
      if (digits != null) while (s.length < digits) s = "0" + s;
      return s;
    };
    StringTools.fastCodeAt = function (s, index) {
      return s.cca(index);
    };
    StringTools.isEOF = function (c) {
      return c != c;
    };
    var ValueType = ($hxClasses["ValueType"] = {
      __ename__: ["ValueType"],
      __constructs__: [
        "TNull",
        "TInt",
        "TFloat",
        "TBool",
        "TObject",
        "TFunction",
        "TClass",
        "TEnum",
        "TUnknown",
      ],
    });
    ValueType.TNull = ["TNull", 0];
    ValueType.TNull.toString = $estr;
    ValueType.TNull.__enum__ = ValueType;
    ValueType.TInt = ["TInt", 1];
    ValueType.TInt.toString = $estr;
    ValueType.TInt.__enum__ = ValueType;
    ValueType.TFloat = ["TFloat", 2];
    ValueType.TFloat.toString = $estr;
    ValueType.TFloat.__enum__ = ValueType;
    ValueType.TBool = ["TBool", 3];
    ValueType.TBool.toString = $estr;
    ValueType.TBool.__enum__ = ValueType;
    ValueType.TObject = ["TObject", 4];
    ValueType.TObject.toString = $estr;
    ValueType.TObject.__enum__ = ValueType;
    ValueType.TFunction = ["TFunction", 5];
    ValueType.TFunction.toString = $estr;
    ValueType.TFunction.__enum__ = ValueType;
    ValueType.TClass = function (c) {
      var $x = ["TClass", 6, c];
      $x.__enum__ = ValueType;
      $x.toString = $estr;
      return $x;
    };
    ValueType.TEnum = function (e) {
      var $x = ["TEnum", 7, e];
      $x.__enum__ = ValueType;
      $x.toString = $estr;
      return $x;
    };
    ValueType.TUnknown = ["TUnknown", 8];
    ValueType.TUnknown.toString = $estr;
    ValueType.TUnknown.__enum__ = ValueType;
    var Type = function () {};
    $hxClasses["Type"] = Type;
    Type.__name__ = ["Type"];
    Type.getClass = function (o) {
      if (o == null) return null;
      return o.__class__;
    };
    Type.getEnum = function (o) {
      if (o == null) return null;
      return o.__enum__;
    };
    Type.getSuperClass = function (c) {
      return c.__super__;
    };
    Type.getClassName = function (c) {
      var a = c.__name__;
      return a.join(".");
    };
    Type.getEnumName = function (e) {
      var a = e.__ename__;
      return a.join(".");
    };
    Type.resolveClass = function (name) {
      var cl = $hxClasses[name];
      if (cl == null || !cl.__name__) return null;
      return cl;
    };
    Type.resolveEnum = function (name) {
      var e = $hxClasses[name];
      if (e == null || !e.__ename__) return null;
      return e;
    };
    Type.createInstance = function (cl, args) {
      switch (args.length) {
        case 0:
          return new cl();
        case 1:
          return new cl(args[0]);
        case 2:
          return new cl(args[0], args[1]);
        case 3:
          return new cl(args[0], args[1], args[2]);
        case 4:
          return new cl(args[0], args[1], args[2], args[3]);
        case 5:
          return new cl(args[0], args[1], args[2], args[3], args[4]);
        case 6:
          return new cl(args[0], args[1], args[2], args[3], args[4], args[5]);
        case 7:
          return new cl(
            args[0],
            args[1],
            args[2],
            args[3],
            args[4],
            args[5],
            args[6]
          );
        case 8:
          return new cl(
            args[0],
            args[1],
            args[2],
            args[3],
            args[4],
            args[5],
            args[6],
            args[7]
          );
        default:
          throw "Too many arguments";
      }
      return null;
    };
    Type.createEmptyInstance = function (cl) {
      function empty() {}
      empty.prototype = cl.prototype;
      return new empty();
    };
    Type.createEnum = function (e, constr, params) {
      var f = Reflect.field(e, constr);
      if (f == null) throw "No such constructor " + constr;
      if (Reflect.isFunction(f)) {
        if (params == null) throw "Constructor " + constr + " need parameters";
        return f.apply(e, params);
      }
      if (params != null && params.length != 0)
        throw "Constructor " + constr + " does not need parameters";
      return f;
    };
    Type.createEnumIndex = function (e, index, params) {
      var c = e.__constructs__[index];
      if (c == null) throw index + " is not a valid enum constructor index";
      return Type.createEnum(e, c, params);
    };
    Type.getInstanceFields = function (c) {
      var a = [];
      for (var i in c.prototype) a.push(i);
      HxOverrides.remove(a, "__class__");
      HxOverrides.remove(a, "__properties__");
      return a;
    };
    Type.getClassFields = function (c) {
      var a = Reflect.fields(c);
      HxOverrides.remove(a, "__name__");
      HxOverrides.remove(a, "__interfaces__");
      HxOverrides.remove(a, "__properties__");
      HxOverrides.remove(a, "__super__");
      HxOverrides.remove(a, "prototype");
      return a;
    };
    Type.getEnumConstructs = function (e) {
      var a = e.__constructs__;
      return a.slice();
    };
    Type["typeof"] = function (v) {
      switch (typeof v) {
        case "boolean":
          return ValueType.TBool;
        case "string":
          return ValueType.TClass(String);
        case "number":
          if (Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
          return ValueType.TFloat;
        case "object":
          if (v == null) return ValueType.TNull;
          var e = v.__enum__;
          if (e != null) return ValueType.TEnum(e);
          var c = v.__class__;
          if (c != null) return ValueType.TClass(c);
          return ValueType.TObject;
        case "function":
          if (v.__name__ || v.__ename__) return ValueType.TObject;
          return ValueType.TFunction;
        case "undefined":
          return ValueType.TNull;
        default:
          return ValueType.TUnknown;
      }
    };
    Type.enumEq = function (a, b) {
      if (a == b) return true;
      try {
        if (a[0] != b[0]) return false;
        var _g1 = 2,
          _g = a.length;
        while (_g1 < _g) {
          var i = _g1++;
          if (!Type.enumEq(a[i], b[i])) return false;
        }
        var e = a.__enum__;
        if (e != b.__enum__ || e == null) return false;
      } catch (e) {
        return false;
      }
      return true;
    };
    Type.enumConstructor = function (e) {
      return e[0];
    };
    Type.enumParameters = function (e) {
      return e.slice(2);
    };
    Type.enumIndex = function (e) {
      return e[1];
    };
    Type.allEnums = function (e) {
      var all = [];
      var cst = e.__constructs__;
      var _g = 0;
      while (_g < cst.length) {
        var c = cst[_g];
        ++_g;
        var v = Reflect.field(e, c);
        if (!Reflect.isFunction(v)) all.push(v);
      }
      return all;
    };
    var Xml = function () {};
    $hxClasses["Xml"] = Xml;
    Xml.__name__ = ["Xml"];
    Xml.Element = null;
    Xml.PCData = null;
    Xml.CData = null;
    Xml.Comment = null;
    Xml.DocType = null;
    Xml.Prolog = null;
    Xml.Document = null;
    Xml.parse = function (str) {
      return haxe.xml.Parser.parse(str);
    };
    Xml.createElement = function (name) {
      var r = new Xml();
      r.nodeType = Xml.Element;
      r._children = new Array();
      r._attributes = new Hash();
      r.set_nodeName(name);
      return r;
    };
    Xml.createPCData = function (data) {
      var r = new Xml();
      r.nodeType = Xml.PCData;
      r.set_nodeValue(data);
      return r;
    };
    Xml.createCData = function (data) {
      var r = new Xml();
      r.nodeType = Xml.CData;
      r.set_nodeValue(data);
      return r;
    };
    Xml.createComment = function (data) {
      var r = new Xml();
      r.nodeType = Xml.Comment;
      r.set_nodeValue(data);
      return r;
    };
    Xml.createDocType = function (data) {
      var r = new Xml();
      r.nodeType = Xml.DocType;
      r.set_nodeValue(data);
      return r;
    };
    Xml.createProlog = function (data) {
      var r = new Xml();
      r.nodeType = Xml.Prolog;
      r.set_nodeValue(data);
      return r;
    };
    Xml.createDocument = function () {
      var r = new Xml();
      r.nodeType = Xml.Document;
      r._children = new Array();
      return r;
    };
    Xml.prototype = {
      toString: function () {
        if (this.nodeType == Xml.PCData) return this._nodeValue;
        if (this.nodeType == Xml.CData)
          return "<![CDATA[" + this._nodeValue + "]]>";
        if (this.nodeType == Xml.Comment)
          return "<!--" + this._nodeValue + "-->";
        if (this.nodeType == Xml.DocType)
          return "<!DOCTYPE " + this._nodeValue + ">";
        if (this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
        var s = new StringBuf();
        if (this.nodeType == Xml.Element) {
          s.b += "<";
          s.b += Std.string(this._nodeName);
          var $it0 = this._attributes.keys();
          while ($it0.hasNext()) {
            var k = $it0.next();
            s.b += " ";
            s.b += Std.string(k);
            s.b += '="';
            s.b += Std.string(this._attributes.get(k));
            s.b += '"';
          }
          if (this._children.length == 0) {
            s.b += "/>";
            return s.b;
          }
          s.b += ">";
        }
        var $it1 = this.iterator();
        while ($it1.hasNext()) {
          var x = $it1.next();
          s.b += Std.string(x.toString());
        }
        if (this.nodeType == Xml.Element) {
          s.b += "</";
          s.b += Std.string(this._nodeName);
          s.b += ">";
        }
        return s.b;
      },
      insertChild: function (x, pos) {
        if (this._children == null) throw "bad nodetype";
        if (x._parent != null) HxOverrides.remove(x._parent._children, x);
        x._parent = this;
        this._children.splice(pos, 0, x);
      },
      removeChild: function (x) {
        if (this._children == null) throw "bad nodetype";
        var b = HxOverrides.remove(this._children, x);
        if (b) x._parent = null;
        return b;
      },
      addChild: function (x) {
        if (this._children == null) throw "bad nodetype";
        if (x._parent != null) HxOverrides.remove(x._parent._children, x);
        x._parent = this;
        this._children.push(x);
      },
      firstElement: function () {
        if (this._children == null) throw "bad nodetype";
        var cur = 0;
        var l = this._children.length;
        while (cur < l) {
          var n = this._children[cur];
          if (n.nodeType == Xml.Element) return n;
          cur++;
        }
        return null;
      },
      firstChild: function () {
        if (this._children == null) throw "bad nodetype";
        return this._children[0];
      },
      elementsNamed: function (name) {
        if (this._children == null) throw "bad nodetype";
        return {
          cur: 0,
          x: this._children,
          hasNext: function () {
            var k = this.cur;
            var l = this.x.length;
            while (k < l) {
              var n = this.x[k];
              if (n.nodeType == Xml.Element && n._nodeName == name) break;
              k++;
            }
            this.cur = k;
            return k < l;
          },
          next: function () {
            var k = this.cur;
            var l = this.x.length;
            while (k < l) {
              var n = this.x[k];
              k++;
              if (n.nodeType == Xml.Element && n._nodeName == name) {
                this.cur = k;
                return n;
              }
            }
            return null;
          },
        };
      },
      elements: function () {
        if (this._children == null) throw "bad nodetype";
        return {
          cur: 0,
          x: this._children,
          hasNext: function () {
            var k = this.cur;
            var l = this.x.length;
            while (k < l) {
              if (this.x[k].nodeType == Xml.Element) break;
              k += 1;
            }
            this.cur = k;
            return k < l;
          },
          next: function () {
            var k = this.cur;
            var l = this.x.length;
            while (k < l) {
              var n = this.x[k];
              k += 1;
              if (n.nodeType == Xml.Element) {
                this.cur = k;
                return n;
              }
            }
            return null;
          },
        };
      },
      iterator: function () {
        if (this._children == null) throw "bad nodetype";
        return {
          cur: 0,
          x: this._children,
          hasNext: function () {
            return this.cur < this.x.length;
          },
          next: function () {
            return this.x[this.cur++];
          },
        };
      },
      attributes: function () {
        if (this.nodeType != Xml.Element) throw "bad nodeType";
        return this._attributes.keys();
      },
      exists: function (att) {
        if (this.nodeType != Xml.Element) throw "bad nodeType";
        return this._attributes.exists(att);
      },
      remove: function (att) {
        if (this.nodeType != Xml.Element) throw "bad nodeType";
        this._attributes.remove(att);
      },
      set: function (att, value) {
        if (this.nodeType != Xml.Element) throw "bad nodeType";
        this._attributes.set(att, value);
      },
      get: function (att) {
        if (this.nodeType != Xml.Element) throw "bad nodeType";
        return this._attributes.get(att);
      },
      get_parent: function () {
        return this._parent;
      },
      set_nodeValue: function (v) {
        if (this.nodeType == Xml.Element || this.nodeType == Xml.Document)
          throw "bad nodeType";
        return (this._nodeValue = v);
      },
      get_nodeValue: function () {
        if (this.nodeType == Xml.Element || this.nodeType == Xml.Document)
          throw "bad nodeType";
        return this._nodeValue;
      },
      set_nodeName: function (n) {
        if (this.nodeType != Xml.Element) throw "bad nodeType";
        return (this._nodeName = n);
      },
      get_nodeName: function () {
        if (this.nodeType != Xml.Element) throw "bad nodeType";
        return this._nodeName;
      },
      _parent: null,
      _children: null,
      _attributes: null,
      _nodeValue: null,
      _nodeName: null,
      parent: null,
      nodeType: null,
      __class__: Xml,
      __properties__: {
        set_nodeName: "set_nodeName",
        get_nodeName: "get_nodeName",
        set_nodeValue: "set_nodeValue",
        get_nodeValue: "get_nodeValue",
        get_parent: "get_parent",
      },
    };
    var haxe = {};
    haxe.Http = function (url) {
      this.url = url;
      this.headers = new Hash();
      this.params = new Hash();
      this.async = true;
    };
    $hxClasses["haxe.Http"] = haxe.Http;
    $hxExpose(haxe.Http, "haxe.Http");
    haxe.Http.__name__ = ["haxe", "Http"];
    haxe.Http.requestUrl = function (url) {
      var h = new haxe.Http(url);
      h.async = false;
      var r = null;
      h.onData = function (d) {
        r = d;
      };
      h.onError = function (e) {
        throw e;
      };
      h.request(false);
      return r;
    };
    haxe.Http.prototype = {
      onStatus: function (status) {},
      onError: function (msg) {},
      onData: function (data) {},
      request: function (post) {
        var me = this;
        var r = new js.XMLHttpRequest();
        var onreadystatechange = function () {
          if (r.readyState != 4) return;
          var s = (function ($this) {
            var $r;
            try {
              $r = r.status;
            } catch (e) {
              $r = null;
            }
            return $r;
          })(this);
          if (s == undefined) s = null;
          if (s != null) me.onStatus(s);
          if (s != null && s >= 200 && s < 400) me.onData(r.responseText);
          else
            switch (s) {
              case null:
              case undefined:
                me.onError("Failed to connect or resolve host");
                break;
              case 12029:
                me.onError("Failed to connect to host");
                break;
              case 12007:
                me.onError("Unknown host");
                break;
              default:
                me.onError("Http Error #" + r.status);
            }
        };
        if (this.async) r.onreadystatechange = onreadystatechange;
        var uri = this.postData;
        if (uri != null) post = true;
        else {
          var $it0 = this.params.keys();
          while ($it0.hasNext()) {
            var p = $it0.next();
            if (uri == null) uri = "";
            else uri += "&";
            uri +=
              StringTools.urlEncode(p) +
              "=" +
              StringTools.urlEncode(this.params.get(p));
          }
        }
        try {
          if (post) r.open("POST", this.url, this.async);
          else if (uri != null) {
            var question = this.url.split("?").length <= 1;
            r.open("GET", this.url + (question ? "?" : "&") + uri, this.async);
            uri = null;
          } else r.open("GET", this.url, this.async);
        } catch (e) {
          this.onError(e.toString());
          return;
        }
        if (
          this.headers.get("Content-Type") == null &&
          post &&
          this.postData == null
        )
          r.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
        var $it1 = this.headers.keys();
        while ($it1.hasNext()) {
          var h = $it1.next();
          r.setRequestHeader(h, this.headers.get(h));
        }
        r.send(uri);
        if (!this.async) onreadystatechange();
      },
      setPostData: function (data) {
        this.postData = data;
      },
      setParameter: function (param, value) {
        this.params.set(param, value);
      },
      setHeader: function (header, value) {
        this.headers.set(header, value);
      },
      params: null,
      headers: null,
      postData: null,
      async: null,
      url: null,
      __class__: haxe.Http,
    };
    haxe.Log = function () {};
    $hxClasses["haxe.Log"] = haxe.Log;
    haxe.Log.__name__ = ["haxe", "Log"];
    haxe.Log.trace = function (v, infos) {
      js.Boot.__trace(v, infos);
    };
    haxe.Log.clear = function () {
      js.Boot.__clear_trace();
    };
    haxe.Serializer = function () {
      this.buf = new StringBuf();
      this.cache = new Array();
      this.useCache = haxe.Serializer.USE_CACHE;
      this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
      this.shash = new Hash();
      this.scount = 0;
    };
    $hxClasses["haxe.Serializer"] = haxe.Serializer;
    haxe.Serializer.__name__ = ["haxe", "Serializer"];
    haxe.Serializer.run = function (v) {
      var s = new haxe.Serializer();
      s.serialize(v);
      return s.toString();
    };
    haxe.Serializer.prototype = {
      serializeException: function (e) {
        this.buf.b += "x";
        this.serialize(e);
      },
      serialize: function (v) {
        var $e = Type["typeof"](v);
        switch ($e[1]) {
          case 0:
            this.buf.b += "n";
            break;
          case 1:
            if (v == 0) {
              this.buf.b += "z";
              return;
            }
            this.buf.b += "i";
            this.buf.b += Std.string(v);
            break;
          case 2:
            if (Math.isNaN(v)) this.buf.b += "k";
            else if (!Math.isFinite(v))
              this.buf.b += Std.string(v < 0 ? "m" : "p");
            else {
              this.buf.b += "d";
              this.buf.b += Std.string(v);
            }
            break;
          case 3:
            this.buf.b += Std.string(v ? "t" : "f");
            break;
          case 6:
            var c = $e[2];
            if (c == String) {
              this.serializeString(v);
              return;
            }
            if (this.useCache && this.serializeRef(v)) return;
            switch (c) {
              case Array:
                var ucount = 0;
                this.buf.b += "a";
                var l = v.length;
                var _g = 0;
                while (_g < l) {
                  var i = _g++;
                  if (v[i] == null) ucount++;
                  else {
                    if (ucount > 0) {
                      if (ucount == 1) this.buf.b += "n";
                      else {
                        this.buf.b += "u";
                        this.buf.b += Std.string(ucount);
                      }
                      ucount = 0;
                    }
                    this.serialize(v[i]);
                  }
                }
                if (ucount > 0) {
                  if (ucount == 1) this.buf.b += "n";
                  else {
                    this.buf.b += "u";
                    this.buf.b += Std.string(ucount);
                  }
                }
                this.buf.b += "h";
                break;
              case List:
                this.buf.b += "l";
                var v1 = v;
                var $it0 = v1.iterator();
                while ($it0.hasNext()) {
                  var i = $it0.next();
                  this.serialize(i);
                }
                this.buf.b += "h";
                break;
              case Date:
                var d = v;
                this.buf.b += "v";
                this.buf.b += Std.string(HxOverrides.dateStr(d));
                break;
              case Hash:
                this.buf.b += "b";
                var v1 = v;
                var $it1 = v1.keys();
                while ($it1.hasNext()) {
                  var k = $it1.next();
                  this.serializeString(k);
                  this.serialize(v1.get(k));
                }
                this.buf.b += "h";
                break;
              case IntHash:
                this.buf.b += "q";
                var v1 = v;
                var $it2 = v1.keys();
                while ($it2.hasNext()) {
                  var k = $it2.next();
                  this.buf.b += ":";
                  this.buf.b += Std.string(k);
                  this.serialize(v1.get(k));
                }
                this.buf.b += "h";
                break;
              case haxe.io.Bytes:
                var v1 = v;
                var i = 0;
                var max = v1.length - 2;
                var charsBuf = new StringBuf();
                var b64 = haxe.Serializer.BASE64;
                while (i < max) {
                  var b1 = v1.b[i++];
                  var b2 = v1.b[i++];
                  var b3 = v1.b[i++];
                  charsBuf.b += Std.string(b64.charAt(b1 >> 2));
                  charsBuf.b += Std.string(
                    b64.charAt(((b1 << 4) | (b2 >> 4)) & 63)
                  );
                  charsBuf.b += Std.string(
                    b64.charAt(((b2 << 2) | (b3 >> 6)) & 63)
                  );
                  charsBuf.b += Std.string(b64.charAt(b3 & 63));
                }
                if (i == max) {
                  var b1 = v1.b[i++];
                  var b2 = v1.b[i++];
                  charsBuf.b += Std.string(b64.charAt(b1 >> 2));
                  charsBuf.b += Std.string(
                    b64.charAt(((b1 << 4) | (b2 >> 4)) & 63)
                  );
                  charsBuf.b += Std.string(b64.charAt((b2 << 2) & 63));
                } else if (i == max + 1) {
                  var b1 = v1.b[i++];
                  charsBuf.b += Std.string(b64.charAt(b1 >> 2));
                  charsBuf.b += Std.string(b64.charAt((b1 << 4) & 63));
                }
                var chars = charsBuf.b;
                this.buf.b += "s";
                this.buf.b += Std.string(chars.length);
                this.buf.b += ":";
                this.buf.b += Std.string(chars);
                break;
              default:
                this.cache.pop();
                if (v.hxSerialize != null) {
                  this.buf.b += "C";
                  this.serializeString(Type.getClassName(c));
                  this.cache.push(v);
                  v.hxSerialize(this);
                  this.buf.b += "g";
                } else {
                  this.buf.b += "c";
                  this.serializeString(Type.getClassName(c));
                  this.cache.push(v);
                  this.serializeFields(v);
                }
            }
            break;
          case 4:
            if (this.useCache && this.serializeRef(v)) return;
            this.buf.b += "o";
            this.serializeFields(v);
            break;
          case 7:
            var e = $e[2];
            if (this.useCache && this.serializeRef(v)) return;
            this.cache.pop();
            this.buf.b += Std.string(this.useEnumIndex ? "j" : "w");
            this.serializeString(Type.getEnumName(e));
            if (this.useEnumIndex) {
              this.buf.b += ":";
              this.buf.b += Std.string(v[1]);
            } else this.serializeString(v[0]);
            this.buf.b += ":";
            var l = v.length;
            this.buf.b += Std.string(l - 2);
            var _g = 2;
            while (_g < l) {
              var i = _g++;
              this.serialize(v[i]);
            }
            this.cache.push(v);
            break;
          case 5:
            throw "Cannot serialize function";
            break;
          default:
            throw "Cannot serialize " + Std.string(v);
        }
      },
      serializeFields: function (v) {
        var _g = 0,
          _g1 = Reflect.fields(v);
        while (_g < _g1.length) {
          var f = _g1[_g];
          ++_g;
          this.serializeString(f);
          this.serialize(Reflect.field(v, f));
        }
        this.buf.b += "g";
      },
      serializeRef: function (v) {
        var vt = typeof v;
        var _g1 = 0,
          _g = this.cache.length;
        while (_g1 < _g) {
          var i = _g1++;
          var ci = this.cache[i];
          if (typeof ci == vt && ci == v) {
            this.buf.b += "r";
            this.buf.b += Std.string(i);
            return true;
          }
        }
        this.cache.push(v);
        return false;
      },
      serializeString: function (s) {
        var x = this.shash.get(s);
        if (x != null) {
          this.buf.b += "R";
          this.buf.b += Std.string(x);
          return;
        }
        this.shash.set(s, this.scount++);
        this.buf.b += "y";
        s = StringTools.urlEncode(s);
        this.buf.b += Std.string(s.length);
        this.buf.b += ":";
        this.buf.b += Std.string(s);
      },
      toString: function () {
        return this.buf.b;
      },
      useEnumIndex: null,
      useCache: null,
      scount: null,
      shash: null,
      cache: null,
      buf: null,
      __class__: haxe.Serializer,
    };
    haxe.Timer = function (time_ms) {
      var me = this;
      this.id = setInterval(function () {
        me.run();
      }, time_ms);
    };
    $hxClasses["haxe.Timer"] = haxe.Timer;
    haxe.Timer.__name__ = ["haxe", "Timer"];
    haxe.Timer.delay = function (f, time_ms) {
      var t = new haxe.Timer(time_ms);
      t.run = function () {
        t.stop();
        f();
      };
      return t;
    };
    haxe.Timer.measure = function (f, pos) {
      var t0 = haxe.Timer.stamp();
      var r = f();
      haxe.Log.trace(haxe.Timer.stamp() - t0 + "s", pos);
      return r;
    };
    haxe.Timer.stamp = function () {
      return new Date().getTime() / 1000;
    };
    haxe.Timer.prototype = {
      run: function () {},
      stop: function () {
        if (this.id == null) return;
        clearInterval(this.id);
        this.id = null;
      },
      id: null,
      __class__: haxe.Timer,
    };
    haxe.Unserializer = function (buf) {
      this.buf = buf;
      this.length = buf.length;
      this.pos = 0;
      this.scache = new Array();
      this.cache = new Array();
      var r = haxe.Unserializer.DEFAULT_RESOLVER;
      if (r == null) {
        r = Type;
        haxe.Unserializer.DEFAULT_RESOLVER = r;
      }
      this.setResolver(r);
    };
    $hxClasses["haxe.Unserializer"] = haxe.Unserializer;
    haxe.Unserializer.__name__ = ["haxe", "Unserializer"];
    haxe.Unserializer.initCodes = function () {
      var codes = new Array();
      var _g1 = 0,
        _g = haxe.Unserializer.BASE64.length;
      while (_g1 < _g) {
        var i = _g1++;
        codes[haxe.Unserializer.BASE64.cca(i)] = i;
      }
      return codes;
    };
    haxe.Unserializer.run = function (v) {
      return new haxe.Unserializer(v).unserialize();
    };
    haxe.Unserializer.prototype = {
      unserialize: function () {
        switch (this.buf.cca(this.pos++)) {
          case 110:
            return null;
          case 116:
            return true;
          case 102:
            return false;
          case 122:
            return 0;
          case 105:
            return this.readDigits();
          case 100:
            var p1 = this.pos;
            while (true) {
              var c = this.buf.cca(this.pos);
              if ((c >= 43 && c < 58) || c == 101 || c == 69) this.pos++;
              else break;
            }
            return Std.parseFloat(
              HxOverrides.substr(this.buf, p1, this.pos - p1)
            );
          case 121:
            var len = this.readDigits();
            if (this.buf.cca(this.pos++) != 58 || this.length - this.pos < len)
              throw "Invalid string length";
            var s = HxOverrides.substr(this.buf, this.pos, len);
            this.pos += len;
            s = StringTools.urlDecode(s);
            this.scache.push(s);
            return s;
          case 107:
            return Math.NaN;
          case 109:
            return Math.NEGATIVE_INFINITY;
          case 112:
            return Math.POSITIVE_INFINITY;
          case 97:
            var buf = this.buf;
            var a = new Array();
            this.cache.push(a);
            while (true) {
              var c = this.buf.cca(this.pos);
              if (c == 104) {
                this.pos++;
                break;
              }
              if (c == 117) {
                this.pos++;
                var n = this.readDigits();
                a[a.length + n - 1] = null;
              } else a.push(this.unserialize());
            }
            return a;
          case 111:
            var o = {};
            this.cache.push(o);
            this.unserializeObject(o);
            return o;
          case 114:
            var n = this.readDigits();
            if (n < 0 || n >= this.cache.length) throw "Invalid reference";
            return this.cache[n];
          case 82:
            var n = this.readDigits();
            if (n < 0 || n >= this.scache.length)
              throw "Invalid string reference";
            return this.scache[n];
          case 120:
            throw this.unserialize();
            break;
          case 99:
            var name = this.unserialize();
            var cl = this.resolver.resolveClass(name);
            if (cl == null) throw "Class not found " + name;
            var o = Type.createEmptyInstance(cl);
            this.cache.push(o);
            this.unserializeObject(o);
            return o;
          case 119:
            var name = this.unserialize();
            var edecl = this.resolver.resolveEnum(name);
            if (edecl == null) throw "Enum not found " + name;
            var e = this.unserializeEnum(edecl, this.unserialize());
            this.cache.push(e);
            return e;
          case 106:
            var name = this.unserialize();
            var edecl = this.resolver.resolveEnum(name);
            if (edecl == null) throw "Enum not found " + name;
            this.pos++;
            var index = this.readDigits();
            var tag = Type.getEnumConstructs(edecl)[index];
            if (tag == null) throw "Unknown enum index " + name + "@" + index;
            var e = this.unserializeEnum(edecl, tag);
            this.cache.push(e);
            return e;
          case 108:
            var l = new List();
            this.cache.push(l);
            var buf = this.buf;
            while (this.buf.cca(this.pos) != 104) l.add(this.unserialize());
            this.pos++;
            return l;
          case 98:
            var h = new Hash();
            this.cache.push(h);
            var buf = this.buf;
            while (this.buf.cca(this.pos) != 104) {
              var s = this.unserialize();
              h.set(s, this.unserialize());
            }
            this.pos++;
            return h;
          case 113:
            var h = new IntHash();
            this.cache.push(h);
            var buf = this.buf;
            var c = this.buf.cca(this.pos++);
            while (c == 58) {
              var i = this.readDigits();
              h.set(i, this.unserialize());
              c = this.buf.cca(this.pos++);
            }
            if (c != 104) throw "Invalid IntHash format";
            return h;
          case 118:
            var d = HxOverrides.strDate(
              HxOverrides.substr(this.buf, this.pos, 19)
            );
            this.cache.push(d);
            this.pos += 19;
            return d;
          case 115:
            var len = this.readDigits();
            var buf = this.buf;
            if (this.buf.cca(this.pos++) != 58 || this.length - this.pos < len)
              throw "Invalid bytes length";
            var codes = haxe.Unserializer.CODES;
            if (codes == null) {
              codes = haxe.Unserializer.initCodes();
              haxe.Unserializer.CODES = codes;
            }
            var i = this.pos;
            var rest = len & 3;
            var size = (len >> 2) * 3 + (rest >= 2 ? rest - 1 : 0);
            var max = i + (len - rest);
            var bytes = haxe.io.Bytes.alloc(size);
            var bpos = 0;
            while (i < max) {
              var c1 = codes[buf.cca(i++)];
              var c2 = codes[buf.cca(i++)];
              bytes.b[bpos++] = ((c1 << 2) | (c2 >> 4)) & 255;
              var c3 = codes[buf.cca(i++)];
              bytes.b[bpos++] = ((c2 << 4) | (c3 >> 2)) & 255;
              var c4 = codes[buf.cca(i++)];
              bytes.b[bpos++] = ((c3 << 6) | c4) & 255;
            }
            if (rest >= 2) {
              var c1 = codes[buf.cca(i++)];
              var c2 = codes[buf.cca(i++)];
              bytes.b[bpos++] = ((c1 << 2) | (c2 >> 4)) & 255;
              if (rest == 3) {
                var c3 = codes[buf.cca(i++)];
                bytes.b[bpos++] = ((c2 << 4) | (c3 >> 2)) & 255;
              }
            }
            this.pos += len;
            this.cache.push(bytes);
            return bytes;
          case 67:
            var name = this.unserialize();
            var cl = this.resolver.resolveClass(name);
            if (cl == null) throw "Class not found " + name;
            var o = Type.createEmptyInstance(cl);
            this.cache.push(o);
            o.hxUnserialize(this);
            if (this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
            return o;
          default:
        }
        this.pos--;
        throw (
          "Invalid char " +
          this.buf.charAt(this.pos) +
          " at position " +
          this.pos
        );
      },
      unserializeEnum: function (edecl, tag) {
        if (this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
        var nargs = this.readDigits();
        if (nargs == 0) return Type.createEnum(edecl, tag);
        var args = new Array();
        while (nargs-- > 0) args.push(this.unserialize());
        return Type.createEnum(edecl, tag, args);
      },
      unserializeObject: function (o) {
        while (true) {
          if (this.pos >= this.length) throw "Invalid object";
          if (this.buf.cca(this.pos) == 103) break;
          var k = this.unserialize();
          if (!js.Boot.__instanceof(k, String)) throw "Invalid object key";
          var v = this.unserialize();
          o[k] = v;
        }
        this.pos++;
      },
      readDigits: function () {
        var k = 0;
        var s = false;
        var fpos = this.pos;
        while (true) {
          var c = this.buf.cca(this.pos);
          if (c != c) break;
          if (c == 45) {
            if (this.pos != fpos) break;
            s = true;
            this.pos++;
            continue;
          }
          if (c < 48 || c > 57) break;
          k = k * 10 + (c - 48);
          this.pos++;
        }
        if (s) k *= -1;
        return k;
      },
      get: function (p) {
        return this.buf.cca(p);
      },
      getResolver: function () {
        return this.resolver;
      },
      setResolver: function (r) {
        if (r == null)
          this.resolver = {
            resolveClass: function (_) {
              return null;
            },
            resolveEnum: function (_) {
              return null;
            },
          };
        else this.resolver = r;
      },
      resolver: null,
      scache: null,
      cache: null,
      length: null,
      pos: null,
      buf: null,
      __class__: haxe.Unserializer,
    };
    haxe.Utf8 = function (size) {
      this.__b = "";
    };
    $hxClasses["haxe.Utf8"] = haxe.Utf8;
    haxe.Utf8.__name__ = ["haxe", "Utf8"];
    haxe.Utf8.iter = function (s, chars) {
      var _g1 = 0,
        _g = s.length;
      while (_g1 < _g) {
        var i = _g1++;
        chars(HxOverrides.cca(s, i));
      }
    };
    haxe.Utf8.encode = function (s) {
      throw "Not implemented";
      return s;
    };
    haxe.Utf8.decode = function (s) {
      throw "Not implemented";
      return s;
    };
    haxe.Utf8.charCodeAt = function (s, index) {
      return HxOverrides.cca(s, index);
    };
    haxe.Utf8.validate = function (s) {
      return true;
    };
    haxe.Utf8.compare = function (a, b) {
      return a > b ? 1 : a == b ? 0 : -1;
    };
    haxe.Utf8.sub = function (s, pos, len) {
      return HxOverrides.substr(s, pos, len);
    };
    haxe.Utf8.prototype = {
      toString: function () {
        return this.__b;
      },
      addChar: function (c) {
        this.__b += String.fromCharCode(c);
      },
      __b: null,
      __class__: haxe.Utf8,
    };
    haxe.io = {};
    haxe.io.Bytes = function (length, b) {
      this.length = length;
      this.b = b;
    };
    $hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
    haxe.io.Bytes.__name__ = ["haxe", "io", "Bytes"];
    haxe.io.Bytes.alloc = function (length) {
      var a = new Array();
      var _g = 0;
      while (_g < length) {
        var i = _g++;
        a.push(0);
      }
      return new haxe.io.Bytes(length, a);
    };
    haxe.io.Bytes.ofString = function (s) {
      var a = new Array();
      var _g1 = 0,
        _g = s.length;
      while (_g1 < _g) {
        var i = _g1++;
        var c = s.cca(i);
        if (c <= 127) a.push(c);
        else if (c <= 2047) {
          a.push(192 | (c >> 6));
          a.push(128 | (c & 63));
        } else if (c <= 65535) {
          a.push(224 | (c >> 12));
          a.push(128 | ((c >> 6) & 63));
          a.push(128 | (c & 63));
        } else {
          a.push(240 | (c >> 18));
          a.push(128 | ((c >> 12) & 63));
          a.push(128 | ((c >> 6) & 63));
          a.push(128 | (c & 63));
        }
      }
      return new haxe.io.Bytes(a.length, a);
    };
    haxe.io.Bytes.ofData = function (b) {
      return new haxe.io.Bytes(b.length, b);
    };
    haxe.io.Bytes.fastGet = function (b, pos) {
      return b[pos];
    };
    haxe.io.Bytes.prototype = {
      getData: function () {
        return this.b;
      },
      toHex: function () {
        var s = new StringBuf();
        var chars = [];
        var str = "0123456789abcdef";
        var _g1 = 0,
          _g = str.length;
        while (_g1 < _g) {
          var i = _g1++;
          chars.push(HxOverrides.cca(str, i));
        }
        var _g1 = 0,
          _g = this.length;
        while (_g1 < _g) {
          var i = _g1++;
          var c = this.b[i];
          s.b += String.fromCharCode(chars[c >> 4]);
          s.b += String.fromCharCode(chars[c & 15]);
        }
        return s.b;
      },
      toString: function () {
        return this.readString(0, this.length);
      },
      readString: function (pos, len) {
        if (pos < 0 || len < 0 || pos + len > this.length)
          throw haxe.io.Error.OutsideBounds;
        var s = "";
        var b = this.b;
        var fcc = String.fromCharCode;
        var i = pos;
        var max = pos + len;
        while (i < max) {
          var c = b[i++];
          if (c < 128) {
            if (c == 0) break;
            s += fcc(c);
          } else if (c < 224) s += fcc(((c & 63) << 6) | (b[i++] & 127));
          else if (c < 240) {
            var c2 = b[i++];
            s += fcc(((c & 31) << 12) | ((c2 & 127) << 6) | (b[i++] & 127));
          } else {
            var c2 = b[i++];
            var c3 = b[i++];
            s += fcc(
              ((c & 15) << 18) |
                ((c2 & 127) << 12) |
                ((c3 << 6) & 127) |
                (b[i++] & 127)
            );
          }
        }
        return s;
      },
      compare: function (other) {
        var b1 = this.b;
        var b2 = other.b;
        var len = this.length < other.length ? this.length : other.length;
        var _g = 0;
        while (_g < len) {
          var i = _g++;
          if (b1[i] != b2[i]) return b1[i] - b2[i];
        }
        return this.length - other.length;
      },
      sub: function (pos, len) {
        if (pos < 0 || len < 0 || pos + len > this.length)
          throw haxe.io.Error.OutsideBounds;
        return new haxe.io.Bytes(len, this.b.slice(pos, pos + len));
      },
      blit: function (pos, src, srcpos, len) {
        if (
          pos < 0 ||
          srcpos < 0 ||
          len < 0 ||
          pos + len > this.length ||
          srcpos + len > src.length
        )
          throw haxe.io.Error.OutsideBounds;
        var b1 = this.b;
        var b2 = src.b;
        if (b1 == b2 && pos > srcpos) {
          var i = len;
          while (i > 0) {
            i--;
            b1[i + pos] = b2[i + srcpos];
          }
          return;
        }
        var _g = 0;
        while (_g < len) {
          var i = _g++;
          b1[i + pos] = b2[i + srcpos];
        }
      },
      set: function (pos, v) {
        this.b[pos] = v & 255;
      },
      get: function (pos) {
        return this.b[pos];
      },
      b: null,
      length: null,
      __class__: haxe.io.Bytes,
    };
    haxe.io.Error = $hxClasses["haxe.io.Error"] = {
      __ename__: ["haxe", "io", "Error"],
      __constructs__: ["Blocked", "Overflow", "OutsideBounds", "Custom"],
    };
    haxe.io.Error.Blocked = ["Blocked", 0];
    haxe.io.Error.Blocked.toString = $estr;
    haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
    haxe.io.Error.Overflow = ["Overflow", 1];
    haxe.io.Error.Overflow.toString = $estr;
    haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
    haxe.io.Error.OutsideBounds = ["OutsideBounds", 2];
    haxe.io.Error.OutsideBounds.toString = $estr;
    haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
    haxe.io.Error.Custom = function (e) {
      var $x = ["Custom", 3, e];
      $x.__enum__ = haxe.io.Error;
      $x.toString = $estr;
      return $x;
    };
    haxe.remoting = {};
    haxe.remoting.Connection = function () {};
    $hxClasses["haxe.remoting.Connection"] = haxe.remoting.Connection;
    haxe.remoting.Connection.__name__ = ["haxe", "remoting", "Connection"];
    haxe.remoting.Connection.prototype = {
      call: null,
      resolve: null,
      __class__: haxe.remoting.Connection,
    };
    haxe.remoting.Context = function () {
      this.objects = new Hash();
    };
    $hxClasses["haxe.remoting.Context"] = haxe.remoting.Context;
    haxe.remoting.Context.__name__ = ["haxe", "remoting", "Context"];
    haxe.remoting.Context.share = function (name, obj) {
      var ctx = new haxe.remoting.Context();
      ctx.addObject(name, obj);
      return ctx;
    };
    haxe.remoting.Context.prototype = {
      call: function (path, params) {
        if (path.length < 2) throw "Invalid path '" + path.join(".") + "'";
        var inf = this.objects.get(path[0]);
        if (inf == null) throw "No such object " + path[0];
        var o = inf.obj;
        var m = Reflect.field(o, path[1]);
        if (path.length > 2) {
          if (!inf.rec) throw "Can't access " + path.join(".");
          var _g1 = 2,
            _g = path.length;
          while (_g1 < _g) {
            var i = _g1++;
            o = m;
            m = Reflect.field(o, path[i]);
          }
        }
        if (!Reflect.isFunction(m)) throw "No such method " + path.join(".");
        return m.apply(o, params);
      },
      addObject: function (name, obj, recursive) {
        this.objects.set(name, { obj: obj, rec: recursive });
      },
      objects: null,
      __class__: haxe.remoting.Context,
    };
    haxe.remoting.ExternalConnection = function (data, path) {
      this.__data = data;
      this.__path = path;
    };
    $hxClasses["haxe.remoting.ExternalConnection"] =
      haxe.remoting.ExternalConnection;
    $hxExpose(
      haxe.remoting.ExternalConnection,
      "haxe.remoting.ExternalConnection"
    );
    haxe.remoting.ExternalConnection.__name__ = [
      "haxe",
      "remoting",
      "ExternalConnection",
    ];
    haxe.remoting.ExternalConnection.__interfaces__ = [
      haxe.remoting.Connection,
    ];
    haxe.remoting.ExternalConnection.escapeString = function (s) {
      return s;
    };
    haxe.remoting.ExternalConnection.doCall = function (name, path, params) {
      try {
        var cnx = haxe.remoting.ExternalConnection.connections.get(name);
        if (cnx == null) throw "Unknown connection : " + name;
        if (cnx.__data.ctx == null)
          throw "No context shared for the connection " + name;
        var params1 = new haxe.Unserializer(params).unserialize();
        var ret = cnx.__data.ctx.call(path.split("."), params1);
        var s = new haxe.Serializer();
        s.serialize(ret);
        return s.toString() + "#";
      } catch (e) {
        var s = new haxe.Serializer();
        s.serializeException(e);
        return s.toString();
      }
    };
    haxe.remoting.ExternalConnection.flashConnect = function (
      name,
      flashObjectID,
      ctx
    ) {
      var cnx = new haxe.remoting.ExternalConnection(
        { ctx: ctx, name: name, flash: flashObjectID },
        []
      );
      haxe.remoting.ExternalConnection.connections.set(name, cnx);
      return cnx;
    };
    haxe.remoting.ExternalConnection.prototype = {
      call: function (params) {
        var s = new haxe.Serializer();
        s.serialize(params);
        var params1 = s.toString();
        var data = null;
        var fobj = window.document[this.__data.flash];
        if (fobj == null)
          fobj = window.document.getElementById(this.__data.flash);
        if (fobj == null)
          throw "Could not find flash object '" + this.__data.flash + "'";
        try {
          data = fobj.externalRemotingCall(
            this.__data.name,
            this.__path.join("."),
            params1
          );
        } catch (e) {}
        if (data == null) {
          var domain, pageDomain;
          try {
            domain = fobj.src.split("/")[2];
            pageDomain = js.Lib.window.location.host;
          } catch (e) {
            domain = null;
            pageDomain = null;
          }
          if (domain != pageDomain)
            throw (
              "ExternalConnection call failure : SWF need allowDomain('" +
              pageDomain +
              "')"
            );
          throw (
            "Call failure : ExternalConnection is not " + "initialized in Flash"
          );
        }
        return new haxe.Unserializer(data).unserialize();
      },
      close: function () {
        haxe.remoting.ExternalConnection.connections.remove(this.__data.name);
      },
      resolve: function (field) {
        var e = new haxe.remoting.ExternalConnection(
          this.__data,
          this.__path.slice()
        );
        e.__path.push(field);
        return e;
      },
      __path: null,
      __data: null,
      __class__: haxe.remoting.ExternalConnection,
    };
    haxe.xml = {};
    haxe.xml.Parser = function () {};
    $hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
    haxe.xml.Parser.__name__ = ["haxe", "xml", "Parser"];
    haxe.xml.Parser.parse = function (str) {
      var doc = Xml.createDocument();
      haxe.xml.Parser.doParse(str, 0, doc);
      return doc;
    };
    haxe.xml.Parser.doParse = function (str, p, parent) {
      if (p == null) p = 0;
      var xml = null;
      var state = 1;
      var next = 1;
      var aname = null;
      var start = 0;
      var nsubs = 0;
      var nbrackets = 0;
      var c = str.cca(p);
      while (!(c != c)) {
        switch (state) {
          case 0:
            switch (c) {
              case 10:
              case 13:
              case 9:
              case 32:
                break;
              default:
                state = next;
                continue;
            }
            break;
          case 1:
            switch (c) {
              case 60:
                state = 0;
                next = 2;
                break;
              default:
                start = p;
                state = 13;
                continue;
            }
            break;
          case 13:
            if (c == 60) {
              var child = Xml.createPCData(
                HxOverrides.substr(str, start, p - start)
              );
              parent.addChild(child);
              nsubs++;
              state = 0;
              next = 2;
            }
            break;
          case 17:
            if (c == 93 && str.cca(p + 1) == 93 && str.cca(p + 2) == 62) {
              var child = Xml.createCData(
                HxOverrides.substr(str, start, p - start)
              );
              parent.addChild(child);
              nsubs++;
              p += 2;
              state = 1;
            }
            break;
          case 2:
            switch (c) {
              case 33:
                if (str.cca(p + 1) == 91) {
                  p += 2;
                  if (HxOverrides.substr(str, p, 6).toUpperCase() != "CDATA[")
                    throw "Expected <![CDATA[";
                  p += 5;
                  state = 17;
                  start = p + 1;
                } else if (str.cca(p + 1) == 68 || str.cca(p + 1) == 100) {
                  if (
                    HxOverrides.substr(str, p + 2, 6).toUpperCase() != "OCTYPE"
                  )
                    throw "Expected <!DOCTYPE";
                  p += 8;
                  state = 16;
                  start = p + 1;
                } else if (str.cca(p + 1) != 45 || str.cca(p + 2) != 45)
                  throw "Expected <!--";
                else {
                  p += 2;
                  state = 15;
                  start = p + 1;
                }
                break;
              case 63:
                state = 14;
                start = p;
                break;
              case 47:
                if (parent == null) throw "Expected node name";
                start = p + 1;
                state = 0;
                next = 10;
                break;
              default:
                state = 3;
                start = p;
                continue;
            }
            break;
          case 3:
            if (
              !(
                (c >= 97 && c <= 122) ||
                (c >= 65 && c <= 90) ||
                (c >= 48 && c <= 57) ||
                c == 58 ||
                c == 46 ||
                c == 95 ||
                c == 45
              )
            ) {
              if (p == start) throw "Expected node name";
              xml = Xml.createElement(
                HxOverrides.substr(str, start, p - start)
              );
              parent.addChild(xml);
              state = 0;
              next = 4;
              continue;
            }
            break;
          case 4:
            switch (c) {
              case 47:
                state = 11;
                nsubs++;
                break;
              case 62:
                state = 9;
                nsubs++;
                break;
              default:
                state = 5;
                start = p;
                continue;
            }
            break;
          case 5:
            if (
              !(
                (c >= 97 && c <= 122) ||
                (c >= 65 && c <= 90) ||
                (c >= 48 && c <= 57) ||
                c == 58 ||
                c == 46 ||
                c == 95 ||
                c == 45
              )
            ) {
              var tmp;
              if (start == p) throw "Expected attribute name";
              tmp = HxOverrides.substr(str, start, p - start);
              aname = tmp;
              if (xml.exists(aname)) throw "Duplicate attribute";
              state = 0;
              next = 6;
              continue;
            }
            break;
          case 6:
            switch (c) {
              case 61:
                state = 0;
                next = 7;
                break;
              default:
                throw "Expected =";
            }
            break;
          case 7:
            switch (c) {
              case 34:
              case 39:
                state = 8;
                start = p;
                break;
              default:
                throw 'Expected "';
            }
            break;
          case 8:
            if (c == str.cca(start)) {
              var val = HxOverrides.substr(str, start + 1, p - start - 1);
              xml.set(aname, val);
              state = 0;
              next = 4;
            }
            break;
          case 9:
            p = haxe.xml.Parser.doParse(str, p, xml);
            start = p;
            state = 1;
            break;
          case 11:
            switch (c) {
              case 62:
                state = 1;
                break;
              default:
                throw "Expected >";
            }
            break;
          case 12:
            switch (c) {
              case 62:
                if (nsubs == 0) parent.addChild(Xml.createPCData(""));
                return p;
              default:
                throw "Expected >";
            }
            break;
          case 10:
            if (
              !(
                (c >= 97 && c <= 122) ||
                (c >= 65 && c <= 90) ||
                (c >= 48 && c <= 57) ||
                c == 58 ||
                c == 46 ||
                c == 95 ||
                c == 45
              )
            ) {
              if (start == p) throw "Expected node name";
              var v = HxOverrides.substr(str, start, p - start);
              if (v != parent.get_nodeName())
                throw "Expected </" + parent.get_nodeName() + ">";
              state = 0;
              next = 12;
              continue;
            }
            break;
          case 15:
            if (c == 45 && str.cca(p + 1) == 45 && str.cca(p + 2) == 62) {
              parent.addChild(
                Xml.createComment(HxOverrides.substr(str, start, p - start))
              );
              p += 2;
              state = 1;
            }
            break;
          case 16:
            if (c == 91) nbrackets++;
            else if (c == 93) nbrackets--;
            else if (c == 62 && nbrackets == 0) {
              parent.addChild(
                Xml.createDocType(HxOverrides.substr(str, start, p - start))
              );
              state = 1;
            }
            break;
          case 14:
            if (c == 63 && str.cca(p + 1) == 62) {
              p++;
              var str1 = HxOverrides.substr(str, start + 1, p - start - 2);
              parent.addChild(Xml.createProlog(str1));
              state = 1;
            }
            break;
        }
        c = str.cca(++p);
      }
      if (state == 1) {
        start = p;
        state = 13;
      }
      if (state == 13) {
        if (p != start || nsubs == 0)
          parent.addChild(
            Xml.createPCData(HxOverrides.substr(str, start, p - start))
          );
        return p;
      }
      throw "Unexpected end";
    };
    haxe.xml.Parser.isValidChar = function (c) {
      return (
        (c >= 97 && c <= 122) ||
        (c >= 65 && c <= 90) ||
        (c >= 48 && c <= 57) ||
        c == 58 ||
        c == 46 ||
        c == 95 ||
        c == 45
      );
    };
    var js = {};
    js.pages = {};
    js.pages.Dojo = function () {
      this.defis = -1;
      this.targets = [];
      this.ltarget = 0;
      this.countHidden = 0;
    };
    $hxClasses["js.pages.Dojo"] = js.pages.Dojo;
    js.pages.Dojo.__name__ = ["js", "pages", "Dojo"];
    js.pages.Dojo.prototype = {
      showStartFightButton: function () {
        var f1 = js.Lib.document.getElementById("dinoL").getAttribute("name");
        var f2 = js.Lib.document.getElementById("dinoR").getAttribute("name");
        var e = js.Lib.document.getElementById("fightBtVS");
        e.style.display = "block";
        var a = js.Lib.document.getElementById("fightVS");
        if (this.defis > -1)
          a.href =
            this.baseURL +
            ("defis?defis=" + this.defis + "&f1=" + f1 + "&f2=" + f2);
        else a.href = this.baseURL + ("fight?f1=" + f1 + "&f2=" + f2);
        a.onclick = null;
        var me = this;
        a.onclick = function (_) {
          return eval("confirm('" + me.confirmMessage + "');");
        };
      },
      selectDino: function (did, name, level, file, params) {
        var target = this.targets[this.ltarget];
        this.ltarget = (this.ltarget + 1) % this.targets.length;
        var t = target.t;
        target.init = true;
        t.setAttribute("name", did);
        if (HxOverrides.substr(t.id, -1, null) == "L") params += "&flip=1";
        if (t.hasChildNodes()) t.removeChild(t.firstChild);
        var so = new js.SWFObject(file, did, 190, 165, "8", "#FFFFFFFF");
        so.addParam("FlashVars", params);
        so.addParam("wmode", "transparent");
        so.write(t.id);
        var ending = HxOverrides.substr(t.id, -1, null);
        js.Lib.document.getElementById("nomDino" + ending).innerHTML = name;
        js.Lib.document.getElementById("lvlDino" + ending).innerHTML = level;
        var _g = 0,
          _g1 = this.targets;
        while (_g < _g1.length) {
          var t1 = _g1[_g];
          ++_g;
          if (t1.init == false) return;
        }
        this.showStartFightButton();
      },
      initConfirmMessage: function (message) {
        this.confirmMessage = message
          .split("\\")
          .join("\\\\")
          .split("'")
          .join("\\'")
          .split("\r")
          .join("\\r")
          .split("\n")
          .join("\\n");
      },
      addTarget: function (t) {
        this.targets.push({
          t: js.Lib.document.getElementById(t),
          init: false,
        });
      },
      initDefis: function (id) {
        this.defis = id;
      },
      initScroller: function (name, prev, next, count, scroll) {
        var _g = this;
        var container = js.Lib.document.getElementById(name);
        if (container == null) return;
        var dinoWidth = 104;
        var maxWidth = count * dinoWidth;
        var scrollWidth = scroll * dinoWidth;
        var to = { left: 0, position: "relative" };
        var enabled = true;
        var current = 0;
        var aPrev = js.Lib.document.getElementById(prev);
        var aNext = js.Lib.document.getElementById(next);
        aPrev.onclick = function (_) {
          if (!enabled) return;
          var n = Math.max(0, current - scroll) | 0;
          var s = {
            position: _g.j(container).css("position"),
            left: Std.parseInt(_g.j(container).css("left")),
          };
          s.left = (s.left - (n - current) * dinoWidth) | 0;
          _g.j(container).animate(s, 200, function () {
            enabled = true;
          });
          current = n;
          enabled = false;
        };
        aNext.onclick = function (_) {
          if (!enabled) return;
          var n = Math.min(count - scroll, current + scroll) | 0;
          var s = {
            position: _g.j(container).css("position"),
            left: Std.parseInt(_g.j(container).css("left")),
          };
          s.left = (s.left - (n - current) * dinoWidth) | 0;
          _g.j(container).animate(s, 200, function () {
            enabled = true;
          });
          current = n;
          enabled = false;
        };
      },
      hide: function (n) {
        var e = js.Lib.document.getElementById(n);
        if (e != null) e.style.display = "none";
      },
      show: function (n) {
        var e = js.Lib.document.getElementById(n);
        if (e != null) e.style.display = "block";
      },
      hideVictories: function () {
        this.hiddenWinners = this.j("div .vsdinoLost")
          .removeClass("vsdinoLost")
          .get();
      },
      removeHiddenResult: function () {
        this.countHidden--;
        if (this.countHidden <= 0) this.showVictories();
      },
      addHiddenResult: function () {
        this.countHidden++;
      },
      showVictories: function () {
        var _g = 0,
          _g1 = this.hiddenWinners;
        while (_g < _g1.length) {
          var d = _g1[_g];
          ++_g;
          this.j(d).addClass("vsdinoLost");
        }
      },
      hiddenWinners: null,
      countHidden: null,
      setVersusChoice: function (teamId, id) {
        var newEntry = !Lambda.has(this.teams[teamId], id);
        if (!newEntry) {
          this.j("#dino" + id + "_" + teamId).removeClass("dinoSelected");
          HxOverrides.remove(this.teams[teamId], id);
        } else if (this.teams[teamId].length < this.limit) {
          var e = js.Lib.document.getElementById("dino_" + id + "_" + teamId);
          this.j("#dino" + id + "_" + teamId).addClass("dinoSelected");
          this.teams[teamId].push(id);
        }
        var b = js.Lib.document.getElementById("btValidateChoice");
        var ref = b.href.split("?")[0] + "?";
        if (this.friend != null) ref += "friend=" + this.friend + ";";
        ref += "f1=";
        var _g = 0,
          _g1 = this.teams[0];
        while (_g < _g1.length) {
          var did = _g1[_g];
          ++_g;
          ref += did + ":";
        }
        ref += ";f2=";
        var _g = 0,
          _g1 = this.teams[1];
        while (_g < _g1.length) {
          var did = _g1[_g];
          ++_g;
          ref += did + ":";
        }
        b.href = ref;
        b.style.display =
          this.teams[0].length > 0 && this.teams[1].length > 0
            ? "block"
            : "none";
        var fightCost = 0;
        if (this.friend != null)
          fightCost = [0, 250, 500, 750, 1000, 1000, 1000][
            mt.MLib.max(this.teams[0].length, this.teams[1].length) - 1
          ];
        var me = this;
        b.onclick = function (_) {
          return eval(
            "confirm('" + me.confirmMessage + ":" + fightCost + "');"
          );
        };
      },
      initVersusFight: function (limit, friend) {
        this.friend = friend;
        this.choice = [];
        this.teams = [];
        this.teams[0] = [];
        this.teams[1] = [];
        this.limit = limit;
        this.modeTournament = false;
        js.Lib.document.getElementById("btValidateChoice").style.display =
          "none";
      },
      friend: null,
      setChoice: function (id) {
        var newEntry = !Lambda.has(this.choice, id);
        if (!newEntry) {
          this.j("#dino_" + id).removeClass("dinoSelected");
          HxOverrides.remove(this.choice, id);
        } else if (this.choice.length < this.limit) {
          var e = js.Lib.document.getElementById("dino_" + id);
          if (e != null) {
            this.j("#dino_" + id).addClass("dinoSelected");
            this.choice.push(id);
          }
        }
        var b = js.Lib.document.getElementById("btValidateChoice");
        var ref = b.href.split("?team")[0] + "?team=";
        var _g = 0,
          _g1 = this.choice;
        while (_g < _g1.length) {
          var d = _g1[_g];
          ++_g;
          ref += d + ":";
        }
        b.href = HxOverrides.substr(ref, 0, ref.length - 1);
        b.style.display = this.choice.length > 0 ? "block" : "none";
      },
      initChoice: function (modeTournament, limit) {
        this.choice = [];
        this.limit = limit;
        this.modeTournament = modeTournament;
        js.Lib.document.getElementById("btValidateChoice").style.display =
          "none";
      },
      limit: null,
      modeTournament: null,
      teams: null,
      choice: null,
      j: function (e) {
        return js.App.j(e);
      },
      setBaseURL: function (url) {
        this.baseURL = url;
      },
      defis: null,
      confirmMessage: null,
      baseURL: null,
      ltarget: null,
      targets: null,
      __class__: js.pages.Dojo,
    };
    js.pages.Homepage = function () {
      this.currentId = 0;
      this.currentPage = 0;
      this.timer = null;
      this.time = 9000;
      this.autoSlide = true;
      this.dirty = false;
      this.combatsId = ["combat"];
      this.dinosId = [
        "caushemesh",
        "invocation",
        "elever",
        "xp",
        "competence",
        "levelup",
      ];
      this.eventsId = ["gdc", "gdc2", "cdc"];
      this.btPages = ["btCombat", "btDinoz", "btEvents"];
    };
    $hxClasses["js.pages.Homepage"] = js.pages.Homepage;
    js.pages.Homepage.__name__ = ["js", "pages", "Homepage"];
    js.pages.Homepage.prototype = {
      slide: function () {
        this.show();
        if (this.autoSlide) {
          if (this.currentPage == 0)
            this.timer = haxe.Timer.delay(
              (function (f, a1) {
                return function () {
                  return f(a1);
                };
              })($bind(this, this.nextSlide), true),
              4 * this.time
            );
          else
            this.timer = haxe.Timer.delay(
              (function (f1, a11) {
                return function () {
                  return f1(a11);
                };
              })($bind(this, this.nextSlide), true),
              this.time
            );
        }
      },
      show: function () {
        var _g = this;
        var div = js.App.j("#" + this.current[this.currentId]);
        if (div == null) return;
        js.App.j(div)
          .fadeIn(1000)
          .click(function (e) {
            _g.nextSlide(false);
          });
      },
      hide: function () {
        var div = js.App.j("#" + this.current[this.currentId]);
        if (div == null) return;
        js.App.j(div).fadeOut(1000);
      },
      nextSlide: function (changePage) {
        if (changePage == null) changePage = true;
        if (!changePage && this.current.length <= 1) return;
        this.clearTimer();
        this.hide();
        this.currentId++;
        if (this.dirty) {
          this.dirty = false;
          this.setPage(0);
          this.slide();
        } else if (changePage) {
          if (this.currentId >= this.current.length)
            this.setPage(++this.currentPage % 3);
          this.slide();
        } else {
          if (this.currentId >= this.current.length)
            this.currentId -= this.current.length;
          this.slide();
        }
      },
      clearTimer: function () {
        if (this.timer != null) this.timer.stop();
        this.timer = null;
      },
      nextPage: function () {
        this.setPage((this.currentPage + 1) % 3);
      },
      setPage: function (id) {
        this.currentId = 0;
        this.currentPage = id;
        this.current = (function ($this) {
          var $r;
          switch (id) {
            case 1:
              $r = $this.dinosId;
              break;
            case 0:
              $r = $this.combatsId;
              break;
            case 2:
              $r = $this.eventsId;
              break;
          }
          return $r;
        })(this);
      },
      onFightReady: function () {
        this.dirty = true;
      },
      init: function (fightClient) {
        var _g2 = this;
        var _g1 = 0,
          _g = this.btPages.length;
        while (_g1 < _g) {
          var i = [_g1++];
          js.App.j("#" + this.btPages[i[0]]).click(
            (function (i) {
              return function (e) {
                _g2.autoSlide = false;
                if (i[0] == 0)
                  js.App.displayRandomFight(
                    js.App.j("#combat").get()[0],
                    fightClient,
                    (function (i) {
                      return function () {
                        _g2.clearTimer();
                        _g2.hide();
                        _g2.setPage(i[0]);
                        _g2.slide();
                      };
                    })(i)
                  );
                else if (_g2.currentPage == i[0]) _g2.nextSlide(false);
                else {
                  _g2.clearTimer();
                  _g2.hide();
                  _g2.setPage(i[0]);
                  _g2.slide();
                }
              };
            })(i)
          );
        }
        js.App.j(".slide").css("position", "absolute").hide();
        this.setPage(1);
        this.slide();
        this.show();
        js.App.displayRandomFight(
          js.App.j("#combat").get()[0],
          fightClient,
          $bind(this, this.onFightReady)
        );
      },
      dirty: null,
      autoSlide: null,
      timer: null,
      time: null,
      currentId: null,
      currentPage: null,
      btPages: null,
      current: null,
      eventsId: null,
      dinosId: null,
      combatsId: null,
      __class__: js.pages.Homepage,
    };
    js.pages.News = function () {};
    $hxClasses["js.pages.News"] = js.pages.News;
    js.pages.News.__name__ = ["js", "pages", "News"];
    js.pages.News.prototype = {
      initAnnouncePanel: function () {
        var _g = this;
        var titles = this.j("#announces h6").click(function (e) {
          _g.j("#announces .announce:visible").slideUp(150);
          $(this).next().slideDown(300);
        });
        this.j("#announces .announce").hide();
      },
      reduceUpdates: function () {
        var _g2 = this;
        var limit = 5;
        var p = this.j("#updates");
        var l = this.j(p).find("li");
        var a = this.j(p).find("a .plus").first();
        if (l.length <= limit) {
          a.remove();
          return;
        }
        var _g1 = limit,
          _g = l.length;
        while (_g1 < _g) {
          var i = _g1++;
          this.j(l[i]).hide();
        }
        this.j(a).click(function (e) {
          var _g1 = limit,
            _g = l.length;
          while (_g1 < _g) {
            var i = _g1++;
            _g2.j(l[i]).show();
          }
          a.remove();
        });
      },
      updateNews: function (id, title, pic, date, content, active) {
        this.content.html(content);
        this.pic.html(pic);
        this.date.html(date);
        this.title.html(title);
        this.edit.attr(
          "href",
          HxOverrides.substr(
            this.edit.attr("href"),
            0,
            this.edit.attr("href").lastIndexOf("/")
          ) +
            "/" +
            id
        );
        if (active) this.j(this.main).removeClass("newsOff");
        else this.j(this.main).addClass("newsOff");
      },
      init: function () {
        this.main = this.j("#mainNews");
        this.pic = this.j(this.main).find("div .pic").first();
        this.title = this.j(this.main).find("div .title").first();
        this.date = this.j(this.main).find("div .date").first();
        this.content = this.j(this.main).find("div .content").first();
        this.edit = this.j(this.main).find("a .edit").first();
        this.initAnnouncePanel();
        this.reduceUpdates();
      },
      j: function (e) {
        return js.App.j(e);
      },
      edit: null,
      content: null,
      date: null,
      title: null,
      pic: null,
      main: null,
      __class__: js.pages.News,
    };
    js.pages.Admin = function () {};
    $hxClasses["js.pages.Admin"] = js.pages.Admin;
    js.pages.Admin.__name__ = ["js", "pages", "Admin"];
    js.pages.Admin.prototype = {
      addObject: function () {
        var ref = js.Lib.document.getElementById(
          "obj" + this.objectId
        ).nextSibling;
        if (ref == null) return;
        this.objectId++;
        var content =
          "<th>Item Bonus " +
          this.objectId +
          "</th><td colspan='3'><input class='field small' name='obj" +
          this.objectId +
          "' value=''/></td>";
        var r = js.Lib.document.createElement("tr");
        r.id = "obj" + this.objectId;
        js.App.insertAfter(ref.nextSibling, r);
        r.innerHTML = content;
        content =
          "<th>Counts</th><td colspan='3'><input class='field' name='objcounts" +
          this.objectId +
          "' value=''/> <code>#objs-#clans</code></td></tr>";
        r = js.Lib.document.createElement("tr");
        js.App.insertAfter(
          js.Lib.document.getElementById("obj" + this.objectId),
          r
        );
        r.innerHTML = content;
      },
      addItem: function () {
        if (this.itemId >= 3) {
          js.Lib.alert("more items isn't supported yet !");
          return;
        }
        var ref = js.Lib.document.getElementById("item" + this.itemId);
        if (ref == null) return;
        this.itemId++;
        var content =
          "\t<th>Item " +
          this.itemId +
          "</th>\r\n\t\t\t\t\t\t<td><input class='field small' name='it" +
          this.itemId +
          "' value='war" +
          this.item +
          "" +
          String.fromCharCode(HxOverrides.cca("a", 0) + this.itemId - 1) +
          "'/></td>\r\n\t\t\t\t\t\t<th>Count</th>\r\n\t\t\t\t\t\t<td><input class='field small' name='count" +
          this.itemId +
          "' value='0'/></td>";
        var r = js.Lib.document.createElement("tr");
        r.id = "item" + this.itemId;
        js.App.insertAfter(ref, r);
        r.innerHTML = content;
        return;
      },
      init: function (item) {
        this.item = item;
        this.itemId = 2;
        this.objectId = 1;
      },
      item: null,
      objectId: null,
      itemId: null,
      __class__: js.pages.Admin,
    };
    js.pages.ClanCastle = function () {};
    $hxClasses["js.pages.ClanCastle"] = js.pages.ClanCastle;
    js.pages.ClanCastle.__name__ = ["js", "pages", "ClanCastle"];
    js.pages.ClanCastle.prototype = {
      _initSortableList: function (selector, url) {
        js.App.j(selector).sortable({
          placeholder: "smallDinoz",
          update: function (event, ui) {
            if (url != null)
              new haxe.Http(
                url + Std.string($(this).sortable("toArray"))
              ).request(false);
          },
        });
        js.App.j(selector).disableSelection();
      },
      initSortableList: function (selector, url) {
        this._initSortableList(selector, url);
      },
      __class__: js.pages.ClanCastle,
    };
    var mt = {};
    mt.js = {};
    mt.js.Tip = function () {};
    $hxClasses["mt.js.Tip"] = mt.js.Tip;
    $hxExpose(mt.js.Tip, "mt.js.Tip");
    mt.js.Tip.__name__ = ["mt", "js", "Tip"];
    mt.js.Tip.lastRef = null;
    mt.js.Tip.placeRef = null;
    mt.js.Tip.initialized = null;
    mt.js.Tip.tooltip = null;
    mt.js.Tip.tooltipContent = null;
    mt.js.Tip.mousePos = null;
    mt.js.Tip.onHide = null;
    mt.js.Tip.excludeList = null;
    mt.js.Tip.show = function (refObj, contentHTML, cName, pRef) {
      mt.js.Tip.init();
      if (mt.js.Tip.tooltip == null) {
        mt.js.Tip.tooltip = js.Lib.document.getElementById(mt.js.Tip.tooltipId);
        if (mt.js.Tip.tooltip == null) {
          mt.js.Tip.tooltip = js.Lib.document.createElement("div");
          mt.js.Tip.tooltip.id = mt.js.Tip.tooltipId;
          js.Lib.document.body.insertBefore(
            mt.js.Tip.tooltip,
            js.Lib.document.body.firstChild
          );
        }
        mt.js.Tip.tooltip.style.top = "-1000px";
        mt.js.Tip.tooltip.style.position = "absolute";
        mt.js.Tip.tooltip.style.zIndex = mt.js.Tip.tipZIndex;
      }
      if (mt.js.Tip.tooltipContent == null) {
        mt.js.Tip.tooltipContent = js.Lib.document.getElementById(
          mt.js.Tip.tooltipContentId
        );
        if (mt.js.Tip.tooltipContent == null) {
          mt.js.Tip.tooltipContent = js.Lib.document.createElement("div");
          mt.js.Tip.tooltipContent.id = mt.js.Tip.tooltipContentId;
          mt.js.Tip.tooltip.appendChild(mt.js.Tip.tooltipContent);
        }
      }
      if (pRef == null) pRef = false;
      mt.js.Tip.placeRef = pRef;
      if (cName == null) mt.js.Tip.tooltip.className = mt.js.Tip.defaultClass;
      else mt.js.Tip.tooltip.className = cName;
      if (mt.js.Tip.lastRef != null && mt.js.Tip.onHide != null) {
        mt.js.Tip.onHide();
        mt.js.Tip.onHide = null;
      }
      mt.js.Tip.lastRef = refObj;
      mt.js.Tip.tooltipContent.innerHTML = contentHTML;
      if (mt.js.Tip.placeRef) mt.js.Tip.placeTooltipRef();
      else mt.js.Tip.placeTooltip();
    };
    mt.js.Tip.exclude = function (id) {
      var e = js.Lib.document.getElementById(id);
      if (e == null) throw id + " not found";
      if (mt.js.Tip.excludeList == null) mt.js.Tip.excludeList = new List();
      mt.js.Tip.excludeList.add(e);
    };
    mt.js.Tip.placeTooltip = function () {
      if (mt.js.Tip.mousePos == null) return;
      var tts = mt.js.Tip.elementSize(mt.js.Tip.tooltip);
      var w = mt.js.Tip.windowSize();
      var top = 0;
      var left = 0;
      left = mt.js.Tip.mousePos.x + mt.js.Tip.xOffset;
      top = mt.js.Tip.mousePos.y + mt.js.Tip.yOffset;
      if (top + tts.height > w.height - 2 + w.scrollTop) {
        if (mt.js.Tip.mousePos.y - tts.height > 5 + w.scrollTop)
          top = mt.js.Tip.mousePos.y - tts.height - 5;
        else top = w.height - 2 + w.scrollTop - tts.height;
      }
      if (left + tts.width > w.width - 22 + w.scrollLeft) {
        if (mt.js.Tip.mousePos.x - tts.width > 5 + w.scrollLeft)
          left = mt.js.Tip.mousePos.x - tts.width - 5;
        else left = w.width - 22 + w.scrollLeft - tts.width;
      }
      if (top < 0) top = 0;
      if (left < 0) left = 0;
      if (mt.js.Tip.excludeList != null) {
        var $it0 = mt.js.Tip.excludeList.iterator();
        while ($it0.hasNext()) {
          var e = $it0.next();
          var s = mt.js.Tip.elementSize(e);
          if (
            left > s.x + s.width ||
            left + tts.width < s.x ||
            top > s.y + s.height ||
            top + tts.height < s.y
          )
            continue;
          var dx1 = left - (s.x + s.width);
          var dx2 = left + tts.width - s.x;
          var dx = Math.abs(dx1) > Math.abs(dx2) ? dx2 : dx1;
          var dy1 = top - (s.y + s.height);
          var dy2 = top + tts.height - s.y;
          var dy = Math.abs(dy1) > Math.abs(dy2) ? dy2 : dy1;
          var cx = left + tts.width / 2 - mt.js.Tip.mousePos.x;
          var cy = top + tts.height / 2 - mt.js.Tip.mousePos.y;
          if ((cx - dx) * (cx - dx) + cy * cy > cx * cx + (cy - dy) * (cy - dy))
            top -= dy;
          else left -= dx;
        }
      }
      mt.js.Tip.tooltip.style.left = left + "px";
      mt.js.Tip.tooltip.style.top = top + "px";
    };
    mt.js.Tip.placeTooltipRef = function () {
      var o = mt.js.Tip.elementSize(mt.js.Tip.lastRef);
      var tts = mt.js.Tip.elementSize(mt.js.Tip.tooltip);
      if (o.width <= 0) mt.js.Tip.tooltip.style.left = o.x + "px";
      else
        mt.js.Tip.tooltip.style.left =
          o.x - tts.width * 0.5 + o.width * 0.5 + "px";
      mt.js.Tip.tooltip.style.top =
        o.y + Math.max(mt.js.Tip.minOffsetY, o.height) + "px";
    };
    mt.js.Tip.showTip = function (refObj, title, contentBase) {
      contentBase = "<p>" + contentBase + "</p>";
      mt.js.Tip.show(
        refObj,
        '<div class="title">' + title + "</div>" + contentBase
      );
    };
    mt.js.Tip.hide = function () {
      if (mt.js.Tip.lastRef == null) return;
      mt.js.Tip.lastRef = null;
      if (mt.js.Tip.onHide != null) {
        mt.js.Tip.onHide();
        mt.js.Tip.onHide = null;
      }
      mt.js.Tip.tooltip.style.top = "-1000px";
      mt.js.Tip.tooltip.style.width = "";
    };
    mt.js.Tip.clean = function () {
      if (mt.js.Tip.lastRef == null) return;
      if (mt.js.Tip.lastRef.parentNode == null) return mt.js.Tip.hide();
      if (mt.js.Tip.lastRef.id != null && mt.js.Tip.lastRef.id != "") {
        if (
          js.Lib.document.getElementById(mt.js.Tip.lastRef.id) !=
          mt.js.Tip.lastRef
        )
          return mt.js.Tip.hide();
      }
      return;
    };
    mt.js.Tip.elementSize = function (o) {
      var ret = { x: 0, y: 0, width: o.clientWidth, height: o.clientHeight };
      var p = o;
      while (p != null) {
        if (p.offsetParent != null) {
          ret.x += p.offsetLeft - p.scrollLeft;
          ret.y += p.offsetTop - p.scrollTop;
        } else {
          ret.x += p.offsetLeft;
          ret.y += p.offsetTop;
        }
        p = p.offsetParent;
      }
      return ret;
    };
    mt.js.Tip.windowSize = function () {
      var ret = {
        x: 0,
        y: 0,
        width: js.Lib.window.innerWidth,
        height: js.Lib.window.innerHeight,
        scrollLeft:
          js.Lib.document.body.scrollLeft +
          js.Lib.document.documentElement.scrollLeft,
        scrollTop:
          js.Lib.document.body.scrollTop +
          js.Lib.document.documentElement.scrollTop,
      };
      var isIE = document.all != null && window.opera == null;
      var body = isIE ? js.Lib.document.documentElement : js.Lib.document.body;
      if (ret.width == null) ret.width = body.clientWidth;
      if (ret.height == null) ret.height = body.clientHeight;
      return ret;
    };
    mt.js.Tip.onMouseMove = function (evt) {
      try {
        var posx = 0;
        var posy = 0;
        if (evt == null) evt = js.Lib.window.event;
        var e = evt;
        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
        } else if (e.clientX || e.clientY) {
          posx =
            e.clientX +
            js.Lib.document.body.scrollLeft +
            js.Lib.document.documentElement.scrollLeft;
          posy =
            e.clientY +
            js.Lib.document.body.scrollTop +
            js.Lib.document.documentElement.scrollTop;
        }
        mt.js.Tip.mousePos = { x: posx, y: posy };
        if (mt.js.Tip.lastRef != null && !mt.js.Tip.placeRef)
          mt.js.Tip.placeTooltip();
      } catch (e) {}
    };
    mt.js.Tip.trackMenu = function (elt, onOut) {
      mt.js.Tip.init();
      var ftrack = null;
      var body = js.Lib.document.body;
      ftrack = function (evt) {
        if (mt.js.Tip.mousePos == null) return;
        var size = mt.js.Tip.elementSize(elt);
        if (
          mt.js.Tip.mousePos.x < size.x ||
          mt.js.Tip.mousePos.y < size.y ||
          mt.js.Tip.mousePos.x > size.x + size.width ||
          mt.js.Tip.mousePos.y > size.y + size.height
        ) {
          if (body.attachEvent) body.detachEvent("onmousemove", ftrack);
          else body.removeEventListener("mousemove", ftrack, false);
          onOut();
        }
      };
      if (body.attachEvent) body.attachEvent("onmousemove", ftrack);
      else body.addEventListener("mousemove", ftrack, false);
    };
    mt.js.Tip.init = function () {
      if (mt.js.Tip.initialized) return;
      if (document.body != null) {
        mt.js.Tip.initialized = true;
        document.body.onmousemove = mt.js.Tip.onMouseMove;
      }
    };
    mt.js.Editor = function (name) {
      this.name = name;
      this.contentName = name + "_content";
      this.config = {
        buttons: new List(),
        icons: new List(),
        iconsUrl: "",
        autoLink: true,
        linkTarget: "_blank",
        uploadData: null,
        uploadColors: { bg: 0, fg: 16777215, fill: 32768 },
      };
    };
    $hxClasses["mt.js.Editor"] = mt.js.Editor;
    $hxExpose(mt.js.Editor, "mt.js.Editor");
    mt.js.Editor.__name__ = ["mt", "js", "Editor"];
    mt.js.Editor.getElementPosition = function (o) {
      var ret = { x: 0, y: 0, width: o.clientWidth, height: o.clientHeight };
      if (ret.width == 0) ret.width = o.offsetWidth;
      if (ret.height == 0) ret.height = o.offsetHeight;
      var p = o;
      while (p != null) {
        if (p.offsetParent != null) {
          ret.x += p.offsetLeft - p.scrollLeft;
          ret.y += p.offsetTop - p.scrollTop;
        } else {
          ret.x += p.offsetLeft;
          ret.y += p.offsetTop;
        }
        p = p.offsetParent;
      }
      return ret;
    };
    mt.js.Editor.prototype = {
      initUpload: function (id, act, target) {
        if (this.config.uploadData == null) throw "No data domain";
        var cnxName = "edcnx_" + id + "_" + this.name;
        var me = this;
        var api = {
          uploadResult: function (url) {
            act(url);
          },
          uploadError: function (e) {
            js.Lib.alert(me.config.uploadData.error + "\n(" + e + ")");
          },
        };
        var cnx = haxe.remoting.ExternalConnection.flashConnect(
          cnxName,
          null,
          haxe.remoting.Context.share("api", api)
        );
        var params = [
          this.config.uploadData.url + "upload/upload.swf",
          "swf_" + id,
          "100%",
          "100%",
          9,
        ];
        var swfobj;
        try {
          swfobj = eval("js.SWFObject");
          if (swfobj == null) throw null;
        } catch (e) {
          swfobj = eval("SWFObject");
        }
        var obj = Type.createInstance(swfobj, params);
        obj.addParam("AllowScriptAccess", "always");
        var c = this.config.uploadColors;
        var colors =
          "&bgcolor=" + c.bg + "&fgcolor=" + c.fg + "&color=" + c.fill;
        obj.addParam(
          "FlashVars",
          "name=" +
            cnxName +
            "&site=" +
            this.config.uploadData.site +
            "&prefix=" +
            this.config.uploadData.uid +
            colors +
            (target != null ? "&click=1" : "")
        );
        obj.addParam("wmode", "transparent");
        obj.write(id);
        return false;
      },
      updatePreview: function (id) {
        var doc = js.Lib.document.getElementById(id);
        doc.innerHTML = this.format(this.getDocument().value);
      },
      quoteSelection: function (begin, end) {
        var doc = this.getDocument();
        var sel = new js.Selection(doc);
        sel.insert(begin, sel.get(), end);
        if (doc.onkeyup != null) doc.onkeyup(null);
      },
      insertImage: function (url) {
        this.insert("@" + url + "@");
      },
      insert: function (txt) {
        this.quoteSelection(txt, "");
      },
      execute: function (act) {
        var act1 = haxe.Unserializer.run(act);
        var $e = act1;
        switch ($e[1]) {
          case 0:
            var tag = $e[2];
            this.insert(tag);
            break;
          case 1:
          case 2:
            var tag = $e[2];
            this.quoteSelection("[" + tag + "]", "[/" + tag + "]");
            break;
          case 3:
            var node = $e[4],
              text = $e[3],
              addr = $e[2];
            var url = js.Lib.window.prompt(addr, "http://");
            if (url == null || url.length == 0 || url == "http://")
              return false;
            var comment = js.Lib.window.prompt(text, url);
            if (comment.length == 0 || comment == url)
              this.insert("[" + node + "]" + url + "[/" + node + "]");
            else
              this.insert(
                "[" + node + "=" + url + "]" + comment + "[/" + node + "]"
              );
            break;
          case 4:
            break;
        }
        return false;
      },
      loadConfig: function (str) {
        this.config = haxe.Unserializer.run(str);
      },
      getDocument: function () {
        return js.Lib.document.getElementsByName(this.contentName)[0];
      },
      setUploadButton: function (target, act) {
        var id = target + "_swf";
        var loaded = false;
        js.Lib.document.write('<div id="' + id + '"></div>');
        var but = js.Lib.document.getElementById(target);
        var me = this;
        but.onmouseover = function (_) {
          if (loaded) return;
          loaded = true;
          var doc = js.Lib.document;
          var win = js.Lib.window;
          var swf = doc.getElementById(id);
          swf.style.position = "absolute";
          swf.style.left = "0px";
          swf.style.top = "0px";
          var p = mt.js.Editor.getElementPosition(but);
          swf.style.width = p.width + "px";
          swf.style.height = p.height + "px";
          swf.style.zIndex = 10;
          var p2 = mt.js.Editor.getElementPosition(swf);
          swf.style.top = p.y - p2.y + "px";
          swf.style.left = p.x - p2.x + "px";
          me.initUpload(id, act, but);
        };
      },
      format: function (txt) {
        if (txt == "" || txt == null) return "";
        this.sections = [];
        txt = StringTools.htmlEscape(txt);
        txt = txt.split("\r\n").join("\n");
        txt = txt.split("\r").join("\n");
        txt = StringTools.trim(txt);
        txt = txt.split("\\0")[0];
        if (txt == null) return "";
        var me = this;
        if (this.config.autoLink) {
          txt = new EReg(
            '([^@=>\\]"])(http://[a-zA-Z0-9/?;&=%_.#-]+)',
            ""
          ).customReplace(txt, function (r) {
            return (
              r.matched(1) +
              me.addSection(
                '<a href="' +
                  r.matched(2) +
                  '"' +
                  me.linkTarget() +
                  ">" +
                  r.matched(2) +
                  "</a>"
              )
            );
          });
          txt = new EReg("^(http://[a-zA-Z0-9/?;&=%_.#-]+)", "").customReplace(
            txt,
            function (r) {
              var url = r.matched(1);
              return me.addSection(
                '<a href="' + url + '"' + me.linkTarget() + ">" + url + "</a>"
              );
            }
          );
        }
        if (this.config.uploadData != null)
          txt = new EReg("@([A-Za-z0-9/_.]+)@", "").customReplace(
            txt,
            function (r) {
              return me.addSection(
                '<img src="' + me.config.uploadData.url + r.matched(1) + '"/>'
              );
            }
          );
        var icons = Lambda.array(this.config.icons);
        icons.sort($bind(this, this.compareIcons));
        var _g = 0;
        while (_g < icons.length) {
          var i = icons[_g];
          ++_g;
          txt = this.formatAction(txt, i.act);
        }
        var $it0 = this.config.buttons.iterator();
        while ($it0.hasNext()) {
          var b = $it0.next();
          txt = this.formatAction(txt, b.act);
        }
        txt = new EReg("<s:([0-9]+)/>", "").customReplace(txt, function (r) {
          return me.sections[Std.parseInt(r.matched(1))];
        });
        this.sections = null;
        txt = new EReg("<([a-z]+)></\\1>", "i").replace(txt, "");
        var schar = "";
        txt = txt.split(schar).join("");
        txt = new EReg("<([a-zA-Z0-9]+[^>]*/>)", "g").replace(
          txt,
          schar + "$1"
        );
        var r = new EReg("<([a-zA-Z0-9]+)([^>]*>[^<]*)</\\1>", "g");
        while (true) {
          var t = r.replace(txt, schar + "$1$2" + schar + "/$1>");
          if (t == txt) break;
          txt = t;
        }
        txt = new EReg("</?[a-zA-Z0-9]+[^>]*>", "g").replace(txt, "");
        txt = txt.split(schar).join("<");
        var b = new StringBuf();
        this.wordify(
          b,
          (function ($this) {
            var $r;
            try {
              $r = Xml.parse(txt);
            } catch (e) {
              $r = (function ($this) {
                var $r;
                throw "Invalid XML " + txt + " (" + Std.string(e) + ")";
                return $r;
              })($this);
            }
            return $r;
          })(this)
        );
        return b.b;
      },
      wordify: function (b, x) {
        switch (x.nodeType) {
          case Xml.Document:
            var $it0 = x.iterator();
            while ($it0.hasNext()) {
              var x1 = $it0.next();
              this.wordify(b, x1);
            }
            break;
          case Xml.Element:
            b.b += Std.string("<" + x.get_nodeName());
            var $it1 = x.attributes();
            while ($it1.hasNext()) {
              var a = $it1.next();
              b.b += Std.string(" " + a + '="' + x.get(a) + '"');
            }
            if (x.firstChild() == null) b.b += "/>";
            else {
              b.b += ">";
              var $it2 = x.iterator();
              while ($it2.hasNext()) {
                var x1 = $it2.next();
                this.wordify(b, x1);
              }
              b.b += Std.string("</" + x.get_nodeName() + ">");
            }
            break;
          case Xml.PCData:
          case Xml.CData:
            var first = true;
            var _g = 0,
              _g1 = x.get_nodeValue().split(" ");
            while (_g < _g1.length) {
              var data = _g1[_g];
              ++_g;
              if (first) first = false;
              else b.b += " ";
              while (data.length > 40) {
                b.b += Std.string(HxOverrides.substr(data, 0, 40));
                b.b += " ";
                data = HxOverrides.substr(data, 40, null);
              }
              b.b += Std.string(data);
            }
            break;
          default:
        }
      },
      formatAction: function (txt, act) {
        return (function ($this) {
          var $r;
          var $e = act;
          switch ($e[1]) {
            case 0:
              var img = $e[3],
                tag = $e[2];
              $r = txt
                .split(tag)
                .join('<img src="' + $this.image(img) + '" alt=""/>');
              break;
            case 1:
              var html = $e[3],
                node = $e[2];
              $r = $this.formatNode(
                txt,
                node,
                "<" + html + ">",
                "</" + html + ">"
              );
              break;
            case 2:
              var span = $e[3],
                node = $e[2];
              $r = $this.formatNode(
                txt,
                node,
                '<span class="' + span + '">',
                "</span>"
              );
              break;
            case 3:
              var node = $e[4];
              $r = (function ($this) {
                var $r;
                var r = new EReg(
                  "\\[" + node + '\\](https?://[^"]*?)\\[\\/' + node + "\\]",
                  "ig"
                );
                txt = r.replace(
                  txt,
                  '<a href="$1"' + $this.linkTarget() + ">$1</a>"
                );
                r = new EReg(
                  "\\[" +
                    node +
                    '=(https?://[^"]*?)\\](.*?)\\[\\/' +
                    node +
                    "\\]",
                  "i"
                );
                var me = $this;
                $r = r.customReplace(txt, function (r1) {
                  return (
                    me.addSection(
                      '<a href="' + r1.matched(1) + '"' + me.linkTarget() + ">"
                    ) +
                    r1.matched(2) +
                    "</a>"
                  );
                });
                return $r;
              })($this);
              break;
            case 4:
              var replace = $e[3],
                ereg = $e[2];
              $r = (function ($this) {
                var $r;
                var r = new EReg(ereg, "ig");
                $r = r.replace(txt, replace);
                return $r;
              })($this);
              break;
          }
          return $r;
        })(this);
      },
      compareIcons: function (a, b) {
        return (function ($this) {
          var $r;
          var $e = a.act;
          switch ($e[1]) {
            case 0:
              var taga = $e[2];
              $r = (function ($this) {
                var $r;
                var $e = b.act;
                switch ($e[1]) {
                  case 0:
                    var tagb = $e[2];
                    $r = Reflect.compare(tagb, taga);
                    break;
                  default:
                    $r = Reflect.compare(a, b);
                }
                return $r;
              })($this);
              break;
            default:
              $r = Reflect.compare(a, b);
          }
          return $r;
        })(this);
      },
      addSection: function (text) {
        var sid = this.sections.length;
        this.sections.push(text);
        return "<s:" + sid + "/>";
      },
      linkTarget: function () {
        return this.config.linkTarget == null
          ? ""
          : ' target="' + this.config.linkTarget + '"';
      },
      formatNode: function (txt, node, h1, h2) {
        return txt
          .split("[" + node + "]")
          .join(h1)
          .split("[/" + node + "]")
          .join(h2);
      },
      image: function (img) {
        return this.config.iconsUrl.split("::img::").join(img);
      },
      config: null,
      sections: null,
      name: null,
      contentName: null,
      __class__: mt.js.Editor,
    };
    mt.js.Timer = function (now, end, start) {
      this.t = now.getTime();
      this.start = start == null ? now : start;
      this.end = end;
      if (mt.js.Timer.timer == null) {
        mt.js.Timer.timer = new haxe.Timer(1000);
        mt.js.Timer.timer.run = function () {
          var _g = 0,
            _g1 = mt.js.Timer.timers;
          while (_g < _g1.length) {
            var t = _g1[_g];
            ++_g;
            t.update();
          }
        };
      }
      mt.js.Timer.timers.push(this);
    };
    $hxClasses["mt.js.Timer"] = mt.js.Timer;
    $hxExpose(mt.js.Timer, "mt.js.Timer");
    mt.js.Timer.__name__ = ["mt", "js", "Timer"];
    mt.js.Timer.timer = null;
    mt.js.Timer.alloc = function (now, end, prec, div) {
      if (div == null) {
        div = "timer_" + mt.js.Timer.timers.length;
        js.Lib.document.write('<div id="' + div + '" class="timer"></div>');
      }
      var t = new mt.js.Timer(
        HxOverrides.strDate(now),
        HxOverrides.strDate(end)
      );
      t.textDiv = { id: div, prec: prec };
      t.update();
      return t;
    };
    mt.js.Timer.prototype = {
      onUpdate: function () {},
      onReady: function () {
        if (this.rem.time < -2) {
          js.Lib.window.location = js.Lib.window.location;
          this.onReady = function () {};
        }
      },
      update: function () {
        this.t += 1000;
        var remt = (this.end.getTime() - this.t) / 1000;
        var rt = remt < 0 ? 0 : remt;
        this.rem = {
          days: (rt / 86400) | 0,
          hours: ((rt / 3600) | 0) % 24,
          minutes: ((rt / 60) | 0) % 60,
          seconds: rt % 60 | 0,
          time: remt,
        };
        var et = this.end.getTime();
        var st = this.start.getTime();
        this.progress = this.t >= et ? 1 : (this.t - st) / (et - st);
        if (this.textDiv != null) {
          var div = js.Lib.document.getElementById(this.textDiv.id);
          if (div != null) div.innerHTML = this.buildText();
        }
        if (this.progressDiv != null) {
          var div = js.Lib.document.getElementById(this.progressDiv.id);
          if (div != null) {
            var w = (this.progressDiv.width * this.progress) | 0;
            div.style.width = w + "px";
          }
        }
        if (remt <= 0) this.onReady();
        this.onUpdate();
      },
      buildText: function () {
        var str = "";
        var prec = this.textDiv.prec;
        var force = false;
        if (prec < 1) {
          var sep =
            this.rem.seconds % 2 == 0
              ? ":"
              : '<span style="opacity : 0">:</span>';
          if (this.rem.hours > 0) {
            var str1 = this.rem.hours + sep;
            if (this.rem.minutes < 10) str1 += "0";
            return str1 + this.rem.minutes;
          }
          var str1 = this.rem.minutes + sep;
          if (this.rem.seconds < 10) str1 += "0";
          return str1 + this.rem.seconds;
        }
        if (this.rem.days > 0) {
          str += this.rem.days + mt.js.Timer.TIMES.charAt(0) + " ";
          force = true;
          if (--prec == 0) return str;
        }
        if (force || this.rem.hours > 0) {
          str += this.rem.hours + mt.js.Timer.TIMES.charAt(1) + " ";
          force = true;
          if (--prec == 0) return str;
        }
        if (force || this.rem.minutes > 0) {
          if (force && this.rem.minutes < 10) str += "0";
          str += this.rem.minutes + mt.js.Timer.TIMES.charAt(2) + " ";
          force = true;
          if (--prec == 0) return str;
        }
        if (force && this.rem.seconds < 10) str += "0";
        str += this.rem.seconds + mt.js.Timer.TIMES.charAt(3) + " ";
        return str;
      },
      stop: function () {
        HxOverrides.remove(mt.js.Timer.timers, this);
      },
      progressDiv: null,
      textDiv: null,
      rem: null,
      progress: null,
      end: null,
      start: null,
      t: null,
      __class__: mt.js.Timer,
    };
    js.App = function () {};
    $hxClasses["js.App"] = js.App;
    js.App.__name__ = ["js", "App"];
    js.App.makeId = function (id) {
      var l = id.length;
      var k = 0;
      var p = l;
      while (p > 0) {
        var c = HxOverrides.cca(id, --p) - 96;
        if (c < 1 || c > 26) {
          c = c + 96 - 48;
          if (c >= 1 && c <= 5) c += 26;
          else return 0;
        }
        k <<= 5;
        k += c;
      }
      return k;
    };
    js.App.makeName = function (id) {
      var s = new StringBuf();
      while (id > 0) {
        var k = id & 31;
        if (k < 27) s.b += String.fromCharCode(k + 96);
        else s.b += String.fromCharCode(k + 22);
        id >>= 5;
      }
      return s.b;
    };
    js.App.tid = function () {
      return _tid;
    };
    js.App.openBank = function (params, closeCb) {
      _tid.askCashFrame(params, closeCb);
    };
    js.App.dialog = function (data, textId, afterDialogToggleId, containerId) {
      var pos = 0;
      var t = new haxe.Timer(30);
      data = data.split("&quot;").join('"');
      var text = js.Lib.document.getElementById(textId);
      var answers =
        afterDialogToggleId != null
          ? js.Lib.document.getElementById(afterDialogToggleId)
          : null;
      var box =
        containerId != null
          ? js.Lib.document.getElementById(containerId)
          : null;
      var delay = 0;
      var speed = 1;
      var tags = new List();
      var run = function () {
        var n = speed;
        while (n-- > 0) {
          if (delay > 0) {
            delay--;
            return;
          }
          switch (data.charAt(pos)) {
            case ".":
              delay = 6;
              break;
            case "!":
            case "?":
              delay = 4;
              break;
            case ",":
              delay = 2;
              break;
            case "<":
              if (data.charAt(pos + 1) == "/") tags.pop();
              else {
                var r = new EReg("^([A-Za-z]+)", "");
                r.match(HxOverrides.substr(data, pos + 1, null));
                tags.push("<" + r.matched(1) + "/>");
              }
              pos = data.indexOf(">", pos) + 1;
              if (data.charAt(pos - 2) == "/") tags.pop();
              break;
          }
          var str = HxOverrides.substr(data, 0, pos);
          var $it0 = tags.iterator();
          while ($it0.hasNext()) {
            var t1 = $it0.next();
            str += t1;
          }
          text.innerHTML = StringTools.htmlUnescape(str);
          pos++;
          if (pos > data.length) {
            t.stop();
            if (answers != null) answers.style.display = "block";
            return;
          }
        }
      };
      var speedUp = function (_) {
        speed = 20;
      };
      if (answers != null) answers.style.display = "none";
      t.run = run;
      if (box != null) box.onclick = speedUp;
    };
    js.App.get = function (id) {
      return js.Lib.document.getElementById(id);
    };
    js.App.updateId = function (val) {
      var i = js.Lib.document.getElementById("kid");
      i.value = js.App.makeId(val);
    };
    js.App.updateName = function (val) {
      var i = js.Lib.document.getElementById("kname");
      i.value = js.App.makeName(Std.parseInt(val));
    };
    js.App.toggle = function (id) {
      var x = js.Lib.document.getElementById(id);
      if (x == null) return false;
      x.style.display = x.style.display == "none" ? "" : "none";
      return false;
    };
    js.App.toggleVisible = function (id) {
      var x = js.Lib.document.getElementById(id);
      if (x == null) return false;
      x.style.visibility = x.style.visibility == "hidden" ? "" : "hidden";
      return false;
    };
    js.App.toggleFlash = function (id, fromH) {
      if (fromH == null) fromH = -80;
      var box = js.Lib.document.getElementById("debrief");
      if (box == null) return;
      js.App.toggle("debrief");
      var t = new haxe.Timer(30);
      var i = fromH;
      var spd = 3;
      var phase = 0;
      t.run = function () {
        if (i <= 0) {
          i += spd;
          spd++;
        }
        if (i > 0) {
          i = 0;
          if (spd >= 5) spd = -Math.floor(spd * 0.4);
          else {
            i = 0;
            t.stop();
          }
        }
        box.style.marginTop = i + "px";
      };
      t.run();
    };
    js.App.marketDetails = function (offerId, id, flag) {
      var block = js.Lib.document.getElementById(id);
      if (block == null) return false;
      if (flag) {
        block.className = "ext";
        js.Lib.document.getElementById("show_" + offerId).style.display =
          "none";
        js.Lib.document.getElementById("hide_" + offerId).style.display =
          "block";
      } else {
        block.className = "";
        js.Lib.document.getElementById("show_" + offerId).style.display =
          "block";
        js.Lib.document.getElementById("hide_" + offerId).style.display =
          "none";
      }
      return false;
    };
    js.App.showNotification = function () {
      js.App.j(js.Lib.document.body).addClass("noFlash");
      var t = js.App.j(js.Lib.document);
      var f = null;
      var content = js.App.j('#sitePopup:first-child a[class!="button"]');
      var hasLink = content.length > 0;
      var cb = (function ($this) {
        var $r;
        var cb1 = null;
        cb1 = function (e) {
          t.unbind("click", cb1);
          if (!hasLink) t.unbind("keydown", cb1);
          js.App.hideNotification();
          if (e != null) e.stopPropagation();
        };
        $r = cb1;
        return $r;
      })(this);
      if (!hasLink) t.click(cb);
      t.keydown(cb);
    };
    js.App.hideNotification = function () {
      js.App.j("#notification").css("display", "none");
      js.App.j(js.Lib.document.body).removeClass("noFlash");
      return false;
    };
    js.App.getClanList = function (elt) {
      if (js.App.clanListTimer != null) js.App.clanListTimer.stop();
      var d = js.App.j("#nameslist");
      d.hide();
      var name = StringTools.trim(elt.value);
      if (name == null || name.length < 1) return;
      elt.onblur = function (e) {
        if (js.App.clanListTimer != null) js.App.clanListTimer.stop();
        js.App.clanListTimer = null;
      };
      elt.setAttribute("autocomplete", "off");
      var r = new haxe.Http("/tools/list_clans");
      r.setParameter("name", StringTools.htmlEscape(name));
      r.setParameter("target", elt.id);
      r.onError = js.Lib.alert;
      r.onData = function (res) {
        var list = haxe.Unserializer.run(StringTools.urlDecode(res));
        if (list == null || js.App.clanListTimer == null) return;
        d.html(list);
        d.show();
      };
      js.App.clanListTimer = haxe.Timer.delay(
        (function (f, a1) {
          return function () {
            return f(a1);
          };
        })($bind(r, r.request), false),
        500
      );
    };
    js.App.applyListValue = function (eltName, value) {
      var elt = js.Lib.document.getElementById(eltName);
      if (elt != null) {
        var names = elt.value.split(";");
        names[names.length - 1] = StringTools.htmlUnescape(value);
        elt.value = names.join(";");
        elt.focus();
      }
      js.Lib.document.getElementById("nameslist").style.display = "none";
    };
    js.App.displayRandomFight = function (div, file, callme) {
      var r = new haxe.Http("/genFight");
      r.onError = function (e) {};
      r.onData = function (data) {
        var _g1 = 0,
          _g = div.childNodes.length;
        while (_g1 < _g) {
          var i = _g1++;
          div.removeChild(div.childNodes[i]);
        }
        var so = new js.SWFObject(file, "fight", 488, 300, "8", "#FFFFFFFF");
        so.addParam("FlashVars", "data=" + data);
        so.addParam("wmode", "transparent");
        so.write(div.id);
        if (callme != null) callme();
      };
      r.request(false);
    };
    js.App.checkAjaxURI = function (baseURL, ajaxArea, targetArea) {
      if (targetArea == null) targetArea = ajaxArea;
      if (
        js.Lib.window.location.hash != null &&
        js.Lib.window.location.hash.length > 0
      ) {
        var url =
          baseURL +
          "/" +
          HxOverrides.substr(
            js.Lib.window.location.href,
            js.Lib.window.location.href.indexOf("#") + 1,
            null
          );
        js.App.updateContent(
          url,
          [targetArea],
          null,
          (function (f, a1, a2, a3) {
            return function () {
              return f(a1, a2, a3);
            };
          })(js.App.ajaxify, baseURL, ajaxArea, targetArea)
        );
        return true;
      } else return false;
    };
    js.App.isAjaxURI = function (purl) {
      var ref = purl == null ? js.Lib.window.location.href : purl;
      return ref.indexOf("#") >= 0;
    };
    js.App.makeAjaxURI = function (baseURL, defaultParam) {
      var ref = js.Lib.window.location.href;
      if (js.App.isAjaxURI(ref)) return true;
      var base = HxOverrides.substr(
        ref,
        0,
        ref.indexOf(baseURL) + baseURL.length + 1
      );
      var params = HxOverrides.substr(
        ref,
        ref.indexOf(baseURL) + baseURL.length + 1,
        null
      );
      if (params.length > 0)
        js.Lib.window.location.replace(base + "#" + params);
      else js.Lib.window.location.replace(base + "#" + defaultParam);
      return params.length > 0;
    };
    js.App.ajaxify = function (baseURL, ajaxArea, targetArea) {
      if (StringTools.endsWith(baseURL, "/"))
        baseURL = HxOverrides.substr(baseURL, 0, baseURL.length - 1);
      var e = js.Lib.document.getElementById(ajaxArea);
      if (e == null) return;
      if (targetArea == null) targetArea = ajaxArea;
      var links = e.getElementsByTagName("a");
      var _g1 = 0,
        _g = links.length;
      while (_g1 < _g) {
        var i = _g1++;
        var a = links[i];
        if (StringTools.endsWith(a.href, "#"))
          a.href += HxOverrides.substr(js.Lib.window.location.hash, 1, null);
        if (
          a.href.indexOf(baseURL) == -1 ||
          a.href.indexOf("#") > -1 ||
          a.onclick != null
        )
          continue;
        var url = [a.href];
        var params = [url[0].split(baseURL)[1]];
        var href = baseURL + "#";
        if (params[0] != null) {
          if (params[0].charAt(0) == "/")
            params[0] = HxOverrides.substr(params[0], 1, null);
          params[0] = StringTools.urlDecode(params[0]);
          href += params[0];
        }
        a.href = href;
        js.App.j(a).click(
          (function (params, url) {
            return function (e1) {
              js.App._hashHistory.add(params[0]);
              js.App.updateContent(
                url[0],
                [targetArea],
                null,
                (function () {
                  return function (f, a1, a2, a3) {
                    return (function () {
                      return function () {
                        return f(a1, a2, a3);
                      };
                    })();
                  };
                })()(js.App.ajaxify, baseURL, ajaxArea, targetArea)
              );
              e1.stopPropagation();
            };
          })(params, url)
        );
      }
      if (!js.App._hashListening) {
        js.App._hashListening = true;
        js.App.j(js.Lib.window).bind("hashchange", function (e1) {
          var hash = HxOverrides.substr(js.Lib.window.location.hash, 1, null);
          if (hash.length > 0 && hash != js.App._hashHistory.last()) {
            js.App._hashHistory.pop();
            var url = baseURL + "/" + hash;
            js.App.updateContent(
              url,
              [targetArea],
              null,
              (function (f1, a11, a21, a31) {
                return function () {
                  return f1(a11, a21, a31);
                };
              })(js.App.ajaxify, baseURL, ajaxArea, targetArea)
            );
          }
        });
      }
    };
    js.App.updateContent = function (url, seek, dest, cb) {
      seek = seek.concat(["notifyBlock", "tutorial", "tutoClose", "newpop"]);
      if (dest != null)
        dest = dest.concat(["notifyBlock", "tutorial", "newpop"]);
      mt.js.Tip.hide();
      try {
        _tid.hidePointer();
      } catch (e) {}
      var e = js.App.j(js.Lib.document);
      return mt.js.Tools.updateContent(url, seek, dest, function () {
        mt.js.Twinoid.onLoad();
        if (cb != null) cb();
      });
    };
    js.App.showTutorial = function (selector, text) {
      var e = js.App.j(selector);
      if (e.length > 0) mt.js.Twinoid.point(e.first(), text);
    };
    js.App.fixHelper = function (e, ui) {
      ui.children().each(function () {
        var t = $(this);
        t.width(t.width());
      });
      return ui;
    };
    js.App.initSortableList = function (selector, url) {
      js.App._initSortableList(selector, url);
    };
    js.App._initSortableList = function (selector, url) {
      js.App.j(selector).sortable({
        helper: js.App.fixHelper,
        update: function (event, ui) {
          if (url != null)
            new haxe.Http(
              url + Std.string($(this).sortable("toArray"))
            ).request(false);
        },
      });
      js.App.j(selector).disableSelection();
    };
    js.App.getElementPos = function (elem, parent) {
      var pos = { right: 0, top: 0, left: 0, bottom: 0 };
      var tmp = elem;
      do {
        pos.left += tmp.offsetLeft;
        tmp = tmp.offsetParent;
      } while (tmp != parent);
      pos.right = pos.left + elem.offsetWidth;
      tmp = elem;
      do {
        pos.top += tmp.offsetTop;
        tmp = tmp.offsetParent;
      } while (tmp != parent);
      pos.bottom = pos.top + elem.offsetHeight;
      return pos;
    };
    js.App.marketPriceTyped = function (field, price, max) {
      var n = Std.parseInt(field.value);
      if (n == null) n = 0;
      if (n < 0) n = 0;
      if (n > max) n = max;
      if (field.value != "") field.value = Std.string(n);
      if (field.value == "0") field.value = "";
      field.focus();
      js.App.marketList.set(field.name, n * price);
      js.App.updatePreview();
    };
    js.App.marketSetMax = function (fid, max, price) {
      var field = js.Lib.document.getElementById(fid);
      if (field.value == Std.string(max)) field.value = "0";
      else field.value = Std.string(max);
      js.App.marketPriceTyped(field, price, max);
    };
    js.App.marketAdd = function (fid, inc, max, price) {
      var field = js.Lib.document.getElementById(fid);
      field.value = Std.string(Std.parseInt(field.value) + inc);
      js.App.marketPriceTyped(field, price, max);
      return false;
    };
    js.App.marketCheck = function (check, price) {
      if (check.checked) js.App.marketList.set(check.name, price);
      else js.App.marketList.set(check.name, 0);
      js.App.updatePreview();
    };
    js.App.updatePreview = function () {
      var total = 0;
      var $it0 = js.App.marketList.iterator();
      while ($it0.hasNext()) {
        var v = $it0.next();
        total += v;
      }
      var preview = js.Lib.document.getElementById("preview");
      preview.innerHTML = Std.string(total);
    };
    js.App.updateBuildPrice = function (s) {
      var prefix = "build_price_";
      var _g1 = 1,
        _g = s.options.length;
      while (_g1 < _g) {
        var i = _g1++;
        js.Lib.document.getElementById(
          prefix + s.options[i].value
        ).style.display = "none";
      }
      var id = s.options[s.selectedIndex].value;
      if (id != "")
        js.Lib.document.getElementById(prefix + id).style.display = "";
    };
    js.App.j = function (params) {
      return new js.JQuery(params);
    };
    js.App.main = function () {
      mt.js.Tip.defaultClass = "tip";
      if (js.Lib.window.js == null) js.Lib.window.js = {};
      js.Lib.window.SWFObject = js.SWFObject;
      js.Lib.window.js.JQuery = js.JQuery;
      js.Lib.window._ = js.App;
    };
    js.App.insertAfter = function (referenceNode, newNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };
    js.App.addCinemaAction = function (id, pos, label) {
      var block = js.Lib.document.getElementById("act_" + id).parentNode;
      var c = js.Lib.document.getElementById("ajout");
      var hide = false;
      if (c != null && block == c.parentNode) hide = true;
      if (c != null && c.parentNode != null) c.parentNode.removeChild(c);
      if (hide == false) {
        c = js.Lib.document.createElement("dl");
        c.id = "ajout";
        block.appendChild(c);
        var content =
          '<table id="addAction">\r\n\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t<th>Action</th>\r\n\t\t\t\t\t\t\t\t\t<td>';
        content += js.Lib.document.getElementById("tmpActions").innerHTML;
        content +=
          '\t\t\t</td>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t<td><input id="refIdInput" type="hidden" name="refId" value="' +
          Std.string(pos + 1) +
          '"></input></td>\r\n\t\t\t\t\t\t\t\t\t<td><input type="submit" class="button" value="' +
          Std.string(label) +
          '" onclick="submit();" /></td>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</table>';
        c.innerHTML = content;
      }
      return;
    };
    js.App.loadJS = function (url, id) {
      var e = js.Lib.document.createElement("script");
      e.src = url + ";id=" + id;
      e.async = true;
      js.Lib.document.body.appendChild(e);
    };
    js.App.timer = function (obj, seconds, lg) {
      var t = new haxe.Timer(1000);
      var d = haxe.Timer.stamp();
      t.run = function () {
        var n = haxe.Timer.stamp() - d;
        var r = Math.round(seconds - n);
        if (r < 0) r = 0;
        var h = Math.floor(r / 3600);
        var m = Math.floor((r % 3600) / 60);
        var s = r % 60;
        var str =
          StringTools.lpad(Std.string(h), "0", 2) +
          ":" +
          StringTools.lpad(Std.string(m), "0", 2) +
          ":" +
          StringTools.lpad(Std.string(s), "0", 2);
        obj.text(str);
      };
      t.run();
    };
    js.Boot = function () {};
    $hxClasses["js.Boot"] = js.Boot;
    js.Boot.__name__ = ["js", "Boot"];
    js.Boot.__unhtml = function (s) {
      return s
        .split("&")
        .join("&amp;")
        .split("<")
        .join("&lt;")
        .split(">")
        .join("&gt;");
    };
    js.Boot.__trace = function (v, i) {
      var msg = i != null ? i.fileName + ":" + i.lineNumber + ": " : "";
      msg += js.Boot.__string_rec(v, "");
      var d;
      if (
        typeof document != "undefined" &&
        (d = document.getElementById("haxe:trace")) != null
      )
        d.innerHTML += js.Boot.__unhtml(msg) + "<br/>";
      else if (typeof console != "undefined" && console.log != null)
        console.log(msg);
    };
    js.Boot.__clear_trace = function () {
      var d = document.getElementById("haxe:trace");
      if (d != null) d.innerHTML = "";
    };
    js.Boot.isClass = function (o) {
      return o.__name__;
    };
    js.Boot.isEnum = function (e) {
      return e.__ename__;
    };
    js.Boot.getClass = function (o) {
      return o.__class__;
    };
    js.Boot.__string_rec = function (o, s) {
      if (o == null) return "null";
      if (s.length >= 5) return "<...>";
      var t = typeof o;
      if (t == "function" && (o.__name__ || o.__ename__)) t = "object";
      switch (t) {
        case "object":
          if (o instanceof Array) {
            if (o.__enum__) {
              if (o.length == 2) return o[0];
              var str = o[0] + "(";
              s += "\t";
              var _g1 = 2,
                _g = o.length;
              while (_g1 < _g) {
                var i = _g1++;
                if (i != 2) str += "," + js.Boot.__string_rec(o[i], s);
                else str += js.Boot.__string_rec(o[i], s);
              }
              return str + ")";
            }
            var l = o.length;
            var i;
            var str = "[";
            s += "\t";
            var _g = 0;
            while (_g < l) {
              var i1 = _g++;
              str += (i1 > 0 ? "," : "") + js.Boot.__string_rec(o[i1], s);
            }
            str += "]";
            return str;
          }
          var tostr;
          try {
            tostr = o.toString;
          } catch (e) {
            return "???";
          }
          if (tostr != null && tostr != Object.toString) {
            var s2 = o.toString();
            if (s2 != "[object Object]") return s2;
          }
          var k = null;
          var str = "{\n";
          s += "\t";
          var hasp = o.hasOwnProperty != null;
          for (var k in o) {
            if (hasp && !o.hasOwnProperty(k)) {
              continue;
            }
            if (
              k == "prototype" ||
              k == "__class__" ||
              k == "__super__" ||
              k == "__interfaces__" ||
              k == "__properties__"
            ) {
              continue;
            }
            if (str.length != 2) str += ", \n";
            str += s + k + " : " + js.Boot.__string_rec(o[k], s);
          }
          s = s.substring(1);
          str += "\n" + s + "}";
          return str;
        case "function":
          return "<function>";
        case "string":
          return o;
        default:
          return String(o);
      }
    };
    js.Boot.__interfLoop = function (cc, cl) {
      if (cc == null) return false;
      if (cc == cl) return true;
      var intf = cc.__interfaces__;
      if (intf != null) {
        var _g1 = 0,
          _g = intf.length;
        while (_g1 < _g) {
          var i = _g1++;
          var i1 = intf[i];
          if (i1 == cl || js.Boot.__interfLoop(i1, cl)) return true;
        }
      }
      return js.Boot.__interfLoop(cc.__super__, cl);
    };
    js.Boot.__instanceof = function (o, cl) {
      try {
        if (o instanceof cl) {
          if (cl == Array) return o.__enum__ == null;
          return true;
        }
        if (js.Boot.__interfLoop(o.__class__, cl)) return true;
      } catch (e) {
        if (cl == null) return false;
      }
      switch (cl) {
        case Int:
          return Math.ceil(o % 2147483648.0) === o;
        case Float:
          return typeof o == "number";
        case Bool:
          return o === true || o === false;
        case String:
          return typeof o == "string";
        case Dynamic:
          return true;
        default:
          if (o == null) return false;
          if (cl == Class && o.__name__ != null) return true;
          else null;
          if (cl == Enum && o.__ename__ != null) return true;
          else null;
          return o.__enum__ == cl;
      }
    };
    js.Boot.__cast = function (o, t) {
      if (js.Boot.__instanceof(o, t)) return o;
      else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
    };
    js.Lib = function () {};
    $hxClasses["js.Lib"] = js.Lib;
    js.Lib.__name__ = ["js", "Lib"];
    js.Lib.document = null;
    js.Lib.window = null;
    js.Lib.debug = function () {
      debugger;
    };
    js.Lib.alert = function (v) {
      alert(js.Boot.__string_rec(v, ""));
    };
    js.Lib["eval"] = function (code) {
      return eval(code);
    };
    js.Lib.setErrorHandler = function (f) {
      js.Lib.onerror = f;
    };
    js.Selection = function (doc) {
      this.doc = doc;
    };
    $hxClasses["js.Selection"] = js.Selection;
    js.Selection.__name__ = ["js", "Selection"];
    js.Selection.prototype = {
      insert: function (left, text, right) {
        this.doc.focus();
        if (this.doc.selectionStart != null) {
          var top = this.doc.scrollTop;
          var start = this.doc.selectionStart;
          var end = this.doc.selectionEnd;
          this.doc.value =
            Std.string(this.doc.value.substr(0, start)) +
            left +
            text +
            right +
            Std.string(this.doc.value.substr(end));
          this.doc.selectionStart = start + left.length;
          this.doc.selectionEnd = start + left.length + text.length;
          this.doc.scrollTop = top;
          return;
        }
        var range = js.Lib.document.selection.createRange();
        range.text = left + text + right;
        range.moveStart("character", -text.length - right.length);
        range.moveEnd("character", -right.length);
        range.select();
      },
      select: function (start, end) {
        this.doc.focus();
        if (this.doc.selectionStart != null) {
          this.doc.selectionStart = start;
          this.doc.selectionEnd = end;
          return;
        }
        var value = this.doc.value;
        var p = 0,
          delta = 0;
        while (true) {
          var i = value.indexOf("\r\n", p);
          if (i < 0 || i > start) break;
          delta++;
          p = i + 2;
        }
        start -= delta;
        while (true) {
          var i = value.indexOf("\r\n", p);
          if (i < 0 || i > end) break;
          delta++;
          p = i + 2;
        }
        end -= delta;
        var r = this.doc.createTextRange();
        r.moveEnd("textedit", -1);
        r.moveStart("character", start);
        r.moveEnd("character", end - start);
        r.select();
      },
      get: function () {
        if (this.doc.selectionStart != null)
          return this.doc.value.substring(
            this.doc.selectionStart,
            this.doc.selectionEnd
          );
        var range = js.Lib.document.selection.createRange();
        if (range.parentElement() != this.doc) return "";
        return range.text;
      },
      doc: null,
      __class__: js.Selection,
    };
    mt.MLib = function () {};
    $hxClasses["mt.MLib"] = mt.MLib;
    mt.MLib.__name__ = ["mt", "MLib"];
    mt.MLib.NaN = function () {
      return Math.NaN;
    };
    mt.MLib.POSITIVE_INFINITY = function () {
      return Math.POSITIVE_INFINITY;
    };
    mt.MLib.NEGATIVE_INFINITY = function () {
      return Math.NEGATIVE_INFINITY;
    };
    mt.MLib.toRad = function (deg) {
      return deg * (3.141592653589793 / 180);
    };
    mt.MLib.toDeg = function (rad) {
      return rad * (180 / 3.141592653589793);
    };
    mt.MLib.min = function (x, y) {
      return x < y ? x : y;
    };
    mt.MLib.max = function (x, y) {
      return x > y ? x : y;
    };
    mt.MLib.abs = function (x) {
      return x < 0 ? -x : x;
    };
    mt.MLib.sgn = function (x) {
      return x > 0 ? 1 : x < 0 ? -1 : 0;
    };
    mt.MLib.clamp = function (x, min, max) {
      return x < min ? min : x > max ? max : x;
    };
    mt.MLib.clampSym = function (x, i) {
      return x < -i ? -i : x > i ? i : x;
    };
    mt.MLib.wrap = function (x, min, max) {
      return x < min ? x - min + max + 1 : x > max ? x - max + min - 1 : x;
    };
    mt.MLib.fmin = function (x, y) {
      return x < y ? x : y;
    };
    mt.MLib.fmax = function (x, y) {
      return x > y ? x : y;
    };
    mt.MLib.fabs = function (x) {
      return x < 0 ? -x : x;
    };
    mt.MLib.fsgn = function (x) {
      return x > 0 ? 1 : x < 0 ? -1 : 0;
    };
    mt.MLib.fclamp = function (x, min, max) {
      return x < min ? min : x > max ? max : x;
    };
    mt.MLib.fclampSym = function (x, i) {
      return x < -i ? -i : x > i ? i : x;
    };
    mt.MLib.fwrap = function (value, lower, upper) {
      return (
        value - (((value - lower) / (upper - lower)) | 0) * (upper - lower)
      );
    };
    mt.MLib.eqSgn = function (x, y) {
      return (x ^ y) >= 0;
    };
    mt.MLib.isEven = function (x) {
      return (x & 1) == 0;
    };
    mt.MLib.isPow2 = function (x) {
      return x > 0 && (x & (x - 1)) == 0;
    };
    mt.MLib.nearestPow2 = function (x) {
      return Math.pow(2, Math.round(Math.log(x) / Math.log(2)));
    };
    mt.MLib.lerp = function (a, b, t) {
      return a + (b - a) * t;
    };
    mt.MLib.slerp = function (a, b, t) {
      var m = Math;
      var c1 = m.sin(a * 0.5);
      var r1 = m.cos(a * 0.5);
      var c2 = m.sin(b * 0.5);
      var r2 = m.cos(b * 0.5);
      var c = r1 * r2 + c1 * c2;
      if (c < 0) {
        if (1 + c > 1e-6) {
          var o = m.acos(-c);
          var s = m.sin(o);
          var s0 = m.sin((1 - t) * o) / s;
          var s1 = m.sin(t * o) / s;
          return m.atan2(s0 * c1 - s1 * c2, s0 * r1 - s1 * r2) * 2;
        } else {
          var s0 = 1 - t;
          var s1 = t;
          return m.atan2(s0 * c1 - s1 * c2, s0 * r1 - s1 * r2) * 2;
        }
      } else if (1 - c > 1e-6) {
        var o = m.acos(c);
        var s = m.sin(o);
        var s0 = m.sin((1 - t) * o) / s;
        var s1 = m.sin(t * o) / s;
        return m.atan2(s0 * c1 + s1 * c2, s0 * r1 + s1 * r2) * 2;
      } else {
        var s0 = 1 - t;
        var s1 = t;
        return m.atan2(s0 * c1 + s1 * c2, s0 * r1 + s1 * r2) * 2;
      }
    };
    mt.MLib.nextPow2 = function (x) {
      var t = x;
      t |= t >> 1;
      t |= t >> 2;
      t |= t >> 3;
      t |= t >> 4;
      t |= t >> 5;
      return t + 1;
    };
    mt.MLib.exp = function (a, n) {
      var t = 1;
      var r = 0;
      while (true) {
        if ((n & 1) != 0) t = a * t;
        n >>= 1;
        if (n == 0) {
          r = t;
          break;
        } else a *= a;
      }
      return r;
    };
    mt.MLib.roundTo = function (x, y) {
      return mt.MLib.round(x / y) * y;
    };
    mt.MLib.round = function (x) {
      return (x > 0 ? x + 0.5 : x < 0 ? x - 0.5 : 0) | 0;
    };
    mt.MLib.ceil = function (x) {
      if (x > 0.0) {
        var t = (x + 0.5) | 0;
        return t < x ? t + 1 : t;
      } else if (x < 0.0) {
        var t = (x - 0.5) | 0;
        return t < x ? t + 1 : t;
      } else return 0;
    };
    mt.MLib.floor = function (x) {
      if (x > 0.0) {
        var t = (x + 0.5) | 0;
        return t < x ? t : t - 1;
      } else if (x < 0.0) {
        var t = (x - 0.5) | 0;
        return t > x ? t - 1 : t;
      } else return 0;
    };
    mt.MLib.invSqrt = function (x) {
      return 1 / Math.sqrt(x);
    };
    mt.MLib.cmpAbs = function (x, y, eps) {
      var d = x - y;
      return d > 0 ? d < eps : -d < eps;
    };
    mt.MLib.cmpZero = function (x, eps) {
      return x > 0 ? x < eps : -x < eps;
    };
    mt.MLib.snap = function (x, y) {
      return mt.MLib.floor((x + y * 0.5) / y);
    };
    mt.MLib.inRange = function (x, min, max) {
      return x >= min && x <= max;
    };
    mt.MLib.rand = function (max, rnd) {
      if (max == null) max = 2147483647;
      return (mt.MLib.frand(rnd) * max) | 0;
    };
    mt.MLib.randRange = function (min, max, rnd) {
      var l = min - 0.4999;
      var h = max + 0.4999;
      return mt.MLib.round(l + (h - l) * mt.MLib.frand(rnd));
    };
    mt.MLib.randRangeSym = function (range, rnd) {
      return mt.MLib.randRange(-range, range, rnd);
    };
    mt.MLib.frand = function (rnd) {
      if (rnd == null) rnd = Math.random;
      return rnd();
    };
    mt.MLib.frandRange = function (min, max, rnd) {
      return min + (max - min) * mt.MLib.frand(rnd);
    };
    mt.MLib.frandRangeSym = function (range, rnd) {
      return mt.MLib.frandRange(-range, range, rnd);
    };
    mt.MLib.wrapToPi = function (x) {
      var t = mt.MLib.round(x / 6.283185307179586);
      return x < -3.141592653589793
        ? x - t * 6.283185307179586
        : x > 3.141592653589793
        ? x - t * 6.283185307179586
        : x;
    };
    mt.MLib.gcd = function (x, y) {
      var d = 0;
      var r = 0;
      x = x < 0 ? -x : x;
      y = y < 0 ? -y : y;
      while (true)
        if (y == 0) {
          d = x;
          break;
        } else {
          r = x % y;
          x = y;
          y = r;
        }
      return d;
    };
    mt.MLib.maxPrecision = function (x, precision) {
      if (x == 0) return x;
      else {
        var correction = 10;
        var _g1 = 0,
          _g = precision - 1;
        while (_g1 < _g) {
          var i = _g1++;
          correction *= 10;
        }
        return mt.MLib.round(correction * x) / correction;
      }
    };
    mt.MLib.ofBool = function (x) {
      return x ? 1 : 0;
    };
    mt.ArrayStd = function () {};
    $hxClasses["mt.ArrayStd"] = mt.ArrayStd;
    mt.ArrayStd.__name__ = ["mt", "ArrayStd"];
    mt.ArrayStd.size = function (ar) {
      return ar.length;
    };
    mt.ArrayStd.first = function (ar) {
      return ar[0];
    };
    mt.ArrayStd.last = function (ar) {
      return ar[ar.length - 1];
    };
    mt.ArrayStd.clear = function (ar) {
      ar.splice(0, ar.length);
      return ar;
    };
    mt.ArrayStd.set = function (ar, index, v) {
      ar[index] = v;
      return ar;
    };
    mt.ArrayStd.at = function (ar, index) {
      return ar[index];
    };
    mt.ArrayStd.indexOf = function (ar, elt) {
      var id = -1,
        i = -1;
      var _g = 0;
      while (_g < ar.length) {
        var e = ar[_g];
        ++_g;
        ++i;
        if (e == elt) {
          id = i;
          break;
        }
      }
      return id;
    };
    mt.ArrayStd.addFirst = function (ar, e) {
      ar.unshift(e);
      return ar;
    };
    mt.ArrayStd.addLast = function (ar, e) {
      ar.push(e);
      return ar;
    };
    mt.ArrayStd.removeFirst = function (ar) {
      return ar.shift();
    };
    mt.ArrayStd.removeLast = function (ar) {
      return ar.pop();
    };
    mt.ArrayStd.map = function (ar, f) {
      var output = [];
      var _g = 0;
      while (_g < ar.length) {
        var e = ar[_g];
        ++_g;
        output.push(f(e));
      }
      return output;
    };
    mt.ArrayStd.stripNull = function (ar) {
      while (HxOverrides.remove(ar, null)) {}
      return ar;
    };
    mt.ArrayStd.flatten = function (ar) {
      var out = new Array();
      var _g1 = 0,
        _g = ar.length;
      while (_g1 < _g) {
        var i = _g1++;
        var $it0 = $iterator(ar[i])();
        while ($it0.hasNext()) {
          var x = $it0.next();
          out.push(x);
          out;
        }
        out;
      }
      return out;
    };
    mt.ArrayStd.append = function (ar, it) {
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var x = $it0.next();
        ar.push(x);
        ar;
      }
      return ar;
    };
    mt.ArrayStd.prepend = function (ar, it) {
      var a = Lambda.array(it);
      a.reverse();
      var _g = 0;
      while (_g < a.length) {
        var x = a[_g];
        ++_g;
        ar.unshift(x);
        ar;
      }
      return ar;
    };
    mt.ArrayStd.shuffle = function (ar, rand) {
      var rnd = rand != null ? rand : Std.random;
      var size = ar.length;
      var _g1 = 0,
        _g = size << 1;
      while (_g1 < _g) {
        var i = _g1++;
        var id0 = rnd(size),
          id1 = rnd(size);
        var tmp = ar[id0];
        ar[id0] = ar[id1];
        ar[id1] = tmp;
      }
      return ar;
    };
    mt.ArrayStd.getRandom = function (ar, rnd) {
      var random = rnd != null ? rnd : Std.random;
      var id = random(ar.length);
      return ar[id];
    };
    mt.ArrayStd.usort = function (t, f) {
      var a = t,
        i = 0,
        l = t.length;
      while (i < l) {
        var swap = false;
        var j = 0,
          max = l - i - 1;
        while (j < max) {
          if (f(a[j], a[j + 1]) > 0) {
            var tmp = a[j + 1];
            a[j + 1] = a[j];
            a[j] = tmp;
            swap = true;
          }
          j += 1;
        }
        if (!swap) break;
        i += 1;
      }
      return a;
    };
    mt.ListStd = function () {};
    $hxClasses["mt.ListStd"] = mt.ListStd;
    mt.ListStd.__name__ = ["mt", "ListStd"];
    mt.ListStd.size = function (l) {
      return l.length;
    };
    mt.ListStd.at = function (l, index) {
      var ite = l.iterator();
      while (--index > -1) ite.next();
      return ite.next();
    };
    mt.ListStd.indexOf = function (l, elt) {
      var id = -1,
        i = -1;
      var $it0 = l.iterator();
      while ($it0.hasNext()) {
        var e = $it0.next();
        ++i;
        if (e == elt) {
          id = i;
          break;
        }
      }
      return id;
    };
    mt.ListStd.addFirst = function (l, e) {
      l.push(e);
      return l;
    };
    mt.ListStd.addLast = function (l, e) {
      l.add(e);
      return l;
    };
    mt.ListStd.removeFirst = function (l) {
      return l.pop();
    };
    mt.ListStd.removeLast = function (l) {
      var cpy = Lambda.list(l);
      var ite = cpy.iterator();
      var last = l.last();
      l.clear();
      var _g1 = 0,
        _g = cpy.length - 1;
      while (_g1 < _g) {
        var i = _g1++;
        l.add(ite.next());
      }
      return last;
    };
    mt.ListStd.copy = function (l) {
      return Lambda.list(l);
    };
    mt.ListStd.flatten = function (l) {
      var out = new List();
      var _g1 = 0,
        _g = l.length;
      while (_g1 < _g) {
        var i = _g1++;
        var $it0 = $iterator(mt.ListStd.at(l, i))();
        while ($it0.hasNext()) {
          var x = $it0.next();
          out.add(x);
        }
        out;
      }
      return out;
    };
    mt.ListStd.append = function (l, it) {
      var $it0 = $iterator(it)();
      while ($it0.hasNext()) {
        var x = $it0.next();
        l.add(x);
      }
      return l;
    };
    mt.ListStd.prepend = function (l, it) {
      var a = Lambda.array(it);
      a.reverse();
      var _g = 0;
      while (_g < a.length) {
        var x = a[_g];
        ++_g;
        l.push(x);
        l;
      }
      return l;
    };
    mt.ListStd.reverse = function (l) {
      var cpy = [];
      while (l.length > 0) {
        cpy.unshift(l.pop());
        cpy;
      }
      while (cpy.length > 0) {
        l.push(cpy.pop());
        l;
      }
      return l;
    };
    mt.ListStd.shuffle = function (l, rand) {
      var ar = Lambda.array(l);
      mt.ArrayStd.shuffle(ar, rand);
      l.clear();
      var _g1 = 0,
        _g = ar.length;
      while (_g1 < _g) {
        var i = _g1++;
        l.add(ar[i]);
        l;
      }
      ar = null;
      return l;
    };
    mt.ListStd.slice = function (l, pos, end) {
      var out = new List();
      if (end == null) end = l.length;
      var _g = pos;
      while (_g < end) {
        var i = _g++;
        out.add(mt.ListStd.at(l, i));
        out;
      }
      return out;
    };
    mt.ListStd.splice = function (l, pos, len) {
      var out = new List();
      var copy = Lambda.list(l);
      l.clear();
      var i = 0;
      var $it0 = copy.iterator();
      while ($it0.hasNext()) {
        var e = $it0.next();
        if (i < pos) {
          l.add(e);
          l;
        } else if (i >= pos + len) {
          l.add(e);
          l;
        } else {
          out.add(e);
          out;
        }
        i++;
      }
      return out;
    };
    mt.ListStd.stripNull = function (l) {
      while (l.remove(null)) {}
      return l;
    };
    mt.ListStd.getRandom = function (l, rnd) {
      var random = rnd != null ? rnd : Std.random;
      var id = random(l.length);
      return mt.ListStd.at(l, id);
    };
    mt.ListStd.usort = function (l, f) {
      var a = Lambda.array(l);
      a = mt.ArrayStd.usort(a, f);
      l.clear();
      var _g = 0;
      while (_g < a.length) {
        var e = a[_g];
        ++_g;
        l.add(e);
        l;
      }
      return l;
    };
    mt.StringStd = function () {};
    $hxClasses["mt.StringStd"] = mt.StringStd;
    mt.StringStd.__name__ = ["mt", "StringStd"];
    mt.StringStd.getReducedChars = function () {
      return mt.StringStd.MT_CHARS;
    };
    mt.StringStd.isReduced = function (str) {
      var valid = true;
      haxe.Utf8.iter(str, function (c) {
        if (!mt.StringStd.MT_CHARS.exists(c)) valid = false;
      });
      return valid;
    };
    mt.js.EditorAction = $hxClasses["mt.js.EditorAction"] = {
      __ename__: ["mt", "js", "EditorAction"],
      __constructs__: ["AImage", "ANode", "ASpan", "ALink", "AReg"],
    };
    mt.js.EditorAction.AImage = function (tag, url) {
      var $x = ["AImage", 0, tag, url];
      $x.__enum__ = mt.js.EditorAction;
      $x.toString = $estr;
      return $x;
    };
    mt.js.EditorAction.ANode = function (node, html) {
      var $x = ["ANode", 1, node, html];
      $x.__enum__ = mt.js.EditorAction;
      $x.toString = $estr;
      return $x;
    };
    mt.js.EditorAction.ASpan = function (node, span) {
      var $x = ["ASpan", 2, node, span];
      $x.__enum__ = mt.js.EditorAction;
      $x.toString = $estr;
      return $x;
    };
    mt.js.EditorAction.ALink = function (text1, text2, node) {
      var $x = ["ALink", 3, text1, text2, node];
      $x.__enum__ = mt.js.EditorAction;
      $x.toString = $estr;
      return $x;
    };
    mt.js.EditorAction.AReg = function (ereg, replace) {
      var $x = ["AReg", 4, ereg, replace];
      $x.__enum__ = mt.js.EditorAction;
      $x.toString = $estr;
      return $x;
    };
    mt.js.Tools = function () {};
    $hxClasses["mt.js.Tools"] = mt.js.Tools;
    mt.js.Tools.__name__ = ["mt", "js", "Tools"];
    mt.js.Tools.globalEval = function (script) {
      if (script.content == null || script.content.length == 0) return;
      var o = js.Lib.document;
      js.Lib.document = {
        write: function (data) {
          var t = o.createElement("div");
          t.setAttribute("id", "_" + script.id);
          t.innerHTML = data;
          var s = o.getElementById(script.id);
          s.parentNode.insertBefore(t, s);
        },
        getElementById: function (id) {
          return o.getElementById(id);
        },
        getElementsByTagName: function (tag) {
          return o.getElementsByTagName(tag);
        },
        getElementsByName: function (name) {
          return o.getElementsByName(name);
        },
        body: o.body,
        handleEvent: function (event) {
          o.handleEvent(event);
        },
        dispatchEvent: function (event) {
          return o.dispatchEvent(event);
        },
        attachEvent: function (eventName, handler) {
          return o.attachEvent(eventName, handler);
        },
        detachEvent: function (eventName, handler) {
          return o.detachEvent(eventName, handler);
        },
        addEventListener: function (eventName, handler, useCapture) {
          return o.addEventListener(eventName, handler, useCapture);
        },
        removeEventListener: function (eventName, handler, useCapture) {
          return o.removeEventListener(eventName, handler, useCapture);
        },
        _document: o,
        cookie: o.cookie,
      };
      var error = null;
      try {
        js.JQuery.globalEval(script.content);
        js.Lib.document = o;
        return;
      } catch (e) {}
      try {
        js.Lib.window.execScript(script.content);
        js.Lib.document = o;
        return;
      } catch (e) {}
      try {
        js.Lib.window["eval"].call(js.Lib.window, script.content);
        js.Lib.document = o;
        return;
      } catch (e) {
        error = e;
      }
      js.Lib.document = o;
      throw (
        "global script evaluation impossible: (#" +
        script.id +
        " " +
        script.fullContent +
        ") has a container reference: " +
        Std.string(o.getElementById(script.id)) +
        " (error=" +
        Std.string(error) +
        ")"
      );
    };
    mt.js.Tools.extractContentFromId = function (flow, id) {
      var a = flow.split('id="' + id + '"');
      if (a.length != 2) return null;
      var tagPart = a[0];
      var id1 = tagPart.lastIndexOf("<") + 1;
      var tag = "";
      var _g1 = id1,
        _g = tagPart.length;
      while (_g1 < _g) {
        var i = _g1++;
        var c = HxOverrides.cca(tagPart, i);
        if ((c < 97 || c > 122) && (c < 65 || c > 90) && c != 58) break;
        tag += String.fromCharCode(c);
      }
      var imp = a[1];
      var beginIndex = imp.indexOf(">") + 1;
      var crtIndex = beginIndex;
      var nextCloseIndex = 0;
      var nextOpenIndex = 0;
      var count = 1;
      var limit = 2000;
      while (true) {
        nextCloseIndex = imp.indexOf("</" + tag + ">", crtIndex);
        nextOpenIndex = imp.indexOf("<" + tag, crtIndex);
        var descending = nextOpenIndex < nextCloseIndex && nextOpenIndex != -1;
        count += descending ? 1 : -1;
        if (count <= 0) break;
        crtIndex = descending
          ? imp.indexOf(">", nextOpenIndex + 1)
          : nextCloseIndex + 3 + tag.length;
        if (limit-- == 0) return null;
      }
      return HxOverrides.substr(
        imp,
        beginIndex,
        nextCloseIndex - 1 - beginIndex
      );
    };
    mt.js.Tools.extractTag = function (data, tag, offset) {
      if (offset == null) offset = 0;
      var start = data.indexOf("<" + tag, offset);
      if (start == -1) return null;
      var begin = data.indexOf(">", start) + 1;
      var end = data.indexOf("</" + tag + ">", begin);
      var content = HxOverrides.substr(data, begin, end - begin);
      end += 3 + tag.length;
      var fullContent = HxOverrides.substr(data, start, end - start);
      return {
        content: content,
        start: start,
        end: end,
        fullContent: fullContent,
        id: null,
      };
    };
    mt.js.Tools.extractScripts = function (data) {
      var scripts = [];
      var currentIndex = 0;
      while (true) {
        var info = mt.js.Tools.extractTag(data, "script", currentIndex);
        if (info == null) break;
        scripts.push(info);
        currentIndex = info.end;
      }
      return scripts;
    };
    mt.js.Tools.hasAttribute = function (attribute, source) {
      var pos = source.indexOf(attribute + "=");
      return pos > -1 && pos < source.indexOf(">");
    };
    mt.js.Tools.getAttribute = function (attribute, source) {
      return source.split(attribute + "=")[1].split('"')[1];
    };
    mt.js.Tools.makeId = function (source) {
      var output = {
        source: source,
        id: "injected_script_" + mt.js.Tools.SCRIPT_ID++,
      };
      var pos = source.indexOf(">");
      if (mt.js.Tools.hasAttribute("id", source))
        output.id = mt.js.Tools.getAttribute("id", source);
      else {
        var before = HxOverrides.substr(source, 0, pos);
        var after = HxOverrides.substr(source, pos, null);
        output.source = before + ' id="' + output.id + '"' + after;
      }
      return output;
    };
    mt.js.Tools.updateContent = function (url, seek, dest, cb) {
      var r = new haxe.Http(url);
      r.onData = function (data) {
        var _g1 = 0,
          _g = seek.length;
        while (_g1 < _g) {
          var i = _g1++;
          var target = js.Lib.document.getElementById(
            dest != null ? dest[i] : seek[i]
          );
          if (target == null) continue;
          var input = mt.js.Tools.extractContentFromId(data, seek[i]);
          if (input == null)
            try {
              target = js.Lib.document.body;
              input = mt.js.Tools.extractTag(data, "body", 0).content;
              var scripts = mt.js.Tools.extractScripts(input);
              var _g2 = 0;
              while (_g2 < scripts.length) {
                var s = scripts[_g2];
                ++_g2;
                var data1 = mt.js.Tools.makeId(s.fullContent);
                if (data1 != null) {
                  s.id = data1.id;
                  var index = input.indexOf(s.fullContent);
                  input =
                    HxOverrides.substr(input, 0, index) +
                    data1.source +
                    HxOverrides.substr(
                      input,
                      index + s.fullContent.length,
                      null
                    );
                }
              }
              target.innerHTML = input;
              var _g2 = 0;
              while (_g2 < scripts.length) {
                var s = scripts[_g2];
                ++_g2;
                mt.js.Tools.globalEval(s);
              }
              if (cb != null) cb();
              return;
            } catch (e) {
              js.Lib.window.location.assign(url);
              return;
            }
          var scripts = mt.js.Tools.extractScripts(input);
          var _g2 = 0;
          while (_g2 < scripts.length) {
            var s = scripts[_g2];
            ++_g2;
            var data1 = mt.js.Tools.makeId(s.fullContent);
            s.id = data1.id;
            var index = input.indexOf(s.fullContent);
            input =
              HxOverrides.substr(input, 0, index) +
              data1.source +
              HxOverrides.substr(input, index + s.fullContent.length, null);
          }
          target.innerHTML = input;
          var _g2 = 0;
          while (_g2 < scripts.length) {
            var s = scripts[_g2];
            ++_g2;
            mt.js.Tools.globalEval(s);
          }
        }
        if (cb != null) cb();
      };
      r.request(false);
      return false;
    };
    mt.js.Twinoid = function () {};
    $hxClasses["mt.js.Twinoid"] = mt.js.Twinoid;
    $hxExpose(mt.js.Twinoid, "mt.js.Twinoid");
    mt.js.Twinoid.__name__ = ["mt", "js", "Twinoid"];
    mt.js.Twinoid.call = function (method, args, callb) {
      if (mt.js.Twinoid.boot != null) {
        var m = Reflect.field(mt.js.Twinoid.boot, method);
        if (m == null) throw "No such method '" + method + "'";
        var r = m.apply(mt.js.Twinoid.boot, args);
        if (callb != null) callb(r);
        return;
      }
      var calls = (function ($this) {
        var $r;
        try {
          $r = js.Lib.window._tid_calls;
        } catch (e) {
          $r = null;
        }
        return $r;
      })(this);
      if (calls == null) {
        var t = new haxe.Timer(100);
        t.run = function () {
          var tid = null;
          try {
            tid = _tid;
          } catch (e) {}
          if (tid == null || !tid.isReady) return;
          mt.js.Twinoid.boot = tid;
          t.stop();
          var _g = 0;
          while (_g < calls.length) {
            var c = calls[_g];
            ++_g;
            var r = mt.js.Twinoid.call(c.m, c.a);
            if (c.c != null) c.c(r);
          }
          js.Lib.window._tid_calls = null;
        };
        calls = js.Lib.window._tid_calls = [];
      }
      calls.push({ m: method, a: args, c: callb });
    };
    mt.js.Twinoid.isConnected = function (proc) {
      mt.js.Twinoid.call("isConnected", [proc]);
    };
    mt.js.Twinoid.onLoad = function () {
      mt.js.Twinoid.call("onLoad", []);
    };
    mt.js.Twinoid.quickNotice = function (msg, error) {
      mt.js.Twinoid.call("quickNotice", [msg, error]);
    };
    mt.js.Twinoid.notice = function (msg, error) {
      mt.js.Twinoid.call("notice", [msg, error]);
    };
    mt.js.Twinoid.lockBar = function () {
      mt.js.Twinoid.call("lockBar", []);
    };
    mt.js.Twinoid.point = function (e, html) {
      mt.js.Twinoid.call("point", [e, html]);
    };
    mt.js.Twinoid.hidePointer = function () {
      mt.js.Twinoid.call("hidePointer", []);
    };
    mt.js.Twinoid.onCssReady = function (cb) {
      mt.js.Twinoid.call("isCssReady", [], function (b) {
        if (b) cb();
        else
          haxe.Timer.delay(
            (function (f, cb1) {
              return function () {
                return f(cb1);
              };
            })(mt.js.Twinoid.onCssReady, cb),
            100
          );
      });
    };
    mt.js.Twinoid.popImage = function (url, title) {
      mt.js.Twinoid.call("popImage", [url, title]);
    };
    mt.js.Twinoid.wallAutoShareUrl = function (url) {
      mt.js.Twinoid.call("wallAutoShareUrl", [url]);
    };
    mt.js.Twinoid.askCashFrame = function (params, onClose) {
      mt.js.Twinoid.call("askCashFrame", [params, onClose]);
    };
    mt.js.Twinoid.addLoadListener = function (callb) {
      mt.js.Twinoid.call("addLoadListener", [callb]);
    };
    function $iterator(o) {
      if (o instanceof Array)
        return function () {
          return HxOverrides.iter(o);
        };
      return typeof o.iterator == "function"
        ? $bind(o, o.iterator)
        : o.iterator;
    }
    var $_;
    function $bind(o, m) {
      var f = function () {
        return f.method.apply(f.scope, arguments);
      };
      f.scope = o;
      f.method = m;
      return f;
    }
    if (Array.prototype.indexOf)
      HxOverrides.remove = function (a, o) {
        var i = a.indexOf(o);
        if (i == -1) return false;
        a.splice(i, 1);
        return true;
      };
    else null;
    if (String.prototype.cca == null)
      String.prototype.cca = String.prototype.charCodeAt;
    Math.__name__ = ["Math"];
    Math.NaN = Number.NaN;
    Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
    Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    $hxClasses.Math = Math;
    Math.isFinite = function (i) {
      return isFinite(i);
    };
    Math.isNaN = function (i) {
      return isNaN(i);
    };
    String.prototype.__class__ = $hxClasses.String = String;
    String.__name__ = ["String"];
    Array.prototype.__class__ = $hxClasses.Array = Array;
    Array.__name__ = ["Array"];
    Date.prototype.__class__ = $hxClasses.Date = Date;
    Date.__name__ = ["Date"];
    var Int = ($hxClasses.Int = { __name__: ["Int"] });
    var Dynamic = ($hxClasses.Dynamic = { __name__: ["Dynamic"] });
    var Float = ($hxClasses.Float = Number);
    Float.__name__ = ["Float"];
    var Bool = ($hxClasses.Bool = Boolean);
    Bool.__ename__ = ["Bool"];
    var Class = ($hxClasses.Class = { __name__: ["Class"] });
    var Enum = {};
    var Void = ($hxClasses.Void = { __ename__: ["Void"] });
    Xml.Element = "element";
    Xml.PCData = "pcdata";
    Xml.CData = "cdata";
    Xml.Comment = "comment";
    Xml.DocType = "doctype";
    Xml.Prolog = "prolog";
    Xml.Document = "document";
    mt.js.Tip.init();
    if (typeof document != "undefined") js.Lib.document = document;
    if (typeof window != "undefined") {
      js.Lib.window = window;
      js.Lib.window.onerror = function (msg, url, line) {
        var f = js.Lib.onerror;
        if (f == null) return false;
        return f(msg, [url + ":" + line]);
      };
    }
    js.XMLHttpRequest = window.XMLHttpRequest
      ? XMLHttpRequest
      : window.ActiveXObject
      ? function () {
          try {
            return new ActiveXObject("Msxml2.XMLHTTP");
          } catch (e) {
            try {
              return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e1) {
              throw "Unable to create XMLHttpRequest object.";
            }
          }
        }
      : (function ($this) {
          var $r;
          throw "Unable to create XMLHttpRequest object.";
          return $r;
        })(this);
    haxe.Serializer.USE_CACHE = false;
    haxe.Serializer.USE_ENUM_INDEX = false;
    haxe.Serializer.BASE64 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    haxe.Unserializer.DEFAULT_RESOLVER = Type;
    haxe.Unserializer.BASE64 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    haxe.Unserializer.CODES = null;
    haxe.remoting.ExternalConnection.connections = new Hash();
    mt.js.Tip.xOffset = 3;
    mt.js.Tip.yOffset = 22;
    mt.js.Tip.defaultClass = "normalTip";
    mt.js.Tip.tooltipId = "tooltip";
    mt.js.Tip.tooltipContentId = "tooltipContent";
    mt.js.Tip.minOffsetY = 23;
    mt.js.Tip.tipZIndex = 10;
    mt.js.Timer.timers = new Array();
    mt.js.Timer.TIMES = "jhms";
    js.App.pages = {
      dojo: new js.pages.Dojo(),
      homepage: new js.pages.Homepage(),
      news: new js.pages.News(),
      admin: new js.pages.Admin(),
      clanCastle: new js.pages.ClanCastle(),
    };
    js.App.ref = [
      mt.js.Tip,
      mt.js.Editor,
      mt.js.Timer,
      haxe.Http,
      haxe.remoting.ExternalConnection,
    ];
    js.App.marketList = new Hash();
    js.App.clanListTimer = null;
    js.App._hashListening = false;
    js.App._hashHistory = new List();
    js.Lib.onerror = null;
    mt.MLib.INT8_MIN = -128;
    mt.MLib.INT8_MAX = 127;
    mt.MLib.UINT8_MAX = 255;
    mt.MLib.INT16_MIN = -32768;
    mt.MLib.INT16_MAX = 32767;
    mt.MLib.UINT16_MAX = 65535;
    mt.MLib.INT32_MIN = -2147483648;
    mt.MLib.INT32_MAX = 2147483647;
    mt.MLib.UINT32_MAX = -1;
    mt.MLib.INT_BITS = 32;
    mt.MLib.FLOAT_MAX = 3.4028234663852886e38;
    mt.MLib.FLOAT_MIN = -3.4028234663852886e38;
    mt.MLib.DOUBLE_MAX = 1.7976931348623157e308;
    mt.MLib.DOUBLE_MIN = -1.7976931348623157e308;
    mt.MLib.RAD_DEG = 180 / 3.141592653589793;
    mt.MLib.DEG_RAD = 3.141592653589793 / 180;
    mt.MLib.LN2 = 0.6931471805599453;
    mt.MLib.PIHALF = 1.5707963267948966;
    mt.MLib.PI = 3.141592653589793;
    mt.MLib.PI2 = 6.283185307179586;
    mt.MLib.EPS = 1e-6;
    mt.MLib.SQRT2 = 1.414213562373095;
    mt.StringStd.MT_CHARS = (function ($this) {
      var $r;
      var hash = new IntHash();
      var str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '-\"'%,?!$+:*.éèêëàäâïîüç0123456789+=><()[]/\\âàäéèêëîïôöùûüçáéíóúÁÉÍÓÚÑñ¡¿äÄÖÜß_²αβ";
      {
        var _g1 = 0,
          _g = str.length;
        while (_g1 < _g) {
          var c = _g1++;
          hash.set(str.cca(c), true);
        }
      }
      $r = hash;
      return $r;
    })(this);
    mt.js.Tools.SCRIPT_ID = 0;
    mt.js.Twinoid.boot = null;
    js.App.main();
    function $hxExpose(src, path) {
      var o = typeof window != "undefined" ? window : exports;
      var parts = path.split(".");
      for (var ii = 0; ii < parts.length - 1; ++ii) {
        var p = parts[ii];
        if (typeof o[p] == "undefined") o[p] = {};
        o = o[p];
      }
      o[parts[parts.length - 1]] = src;
    }
  })();
}
/*
     FILE ARCHIVED ON 01:19:18 Mar 18, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 18:11:08 Aug 20, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.563
  exclusion.robots: 0.023
  exclusion.robots.policy: 0.012
  esindex: 0.01
  cdx.remote: 176.085
  LoadShardBlock: 1624.258 (3)
  PetaboxLoader3.datanode: 1166.597 (4)
  PetaboxLoader3.resolve: 864.926 (2)
  load_resource: 438.031
*/
