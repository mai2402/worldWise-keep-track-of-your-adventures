import {
  require_react_dom
} from "./chunk-OWQ2P627.js";
import {
  __publicField,
  __toESM,
  require_react
} from "./chunk-I2YVUVOB.js";

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// node_modules/react-datepicker/dist/es/index.js
var import_react4 = __toESM(require_react());

// node_modules/react-onclickoutside/dist/react-onclickoutside.es.js
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function isNodeFound(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  }
  if (current.correspondingElement) {
    return current.correspondingElement.classList.contains(ignoreClass);
  }
  return current.classList.contains(ignoreClass);
}
function findHighest(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  }
  while (current.parentNode || current.host) {
    if (current.parentNode && isNodeFound(current, componentNode, ignoreClass)) {
      return true;
    }
    current = current.parentNode || current.host;
  }
  return current;
}
function clickedScrollbar(evt) {
  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;
}
var testPassiveEventSupport = function testPassiveEventSupport2() {
  if (typeof window === "undefined" || typeof window.addEventListener !== "function") {
    return;
  }
  var passive = false;
  var options = Object.defineProperty({}, "passive", {
    get: function get() {
      passive = true;
    }
  });
  var noop = function noop2() {
  };
  window.addEventListener("testPassiveEventSupport", noop, options);
  window.removeEventListener("testPassiveEventSupport", noop, options);
  return passive;
};
function autoInc(seed) {
  if (seed === void 0) {
    seed = 0;
  }
  return function() {
    return ++seed;
  };
}
var uid = autoInc();
var passiveEventSupport;
var handlersMap = {};
var enabledInstances = {};
var touchEvents = ["touchstart", "touchmove"];
var IGNORE_CLASS_NAME = "ignore-react-onclickoutside";
function getEventHandlerOptions(instance, eventName) {
  var handlerOptions = {};
  var isTouchEvent = touchEvents.indexOf(eventName) !== -1;
  if (isTouchEvent && passiveEventSupport) {
    handlerOptions.passive = !instance.props.preventDefault;
  }
  return handlerOptions;
}
function onClickOutsideHOC(WrappedComponent, config) {
  var _class, _temp;
  var componentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
  return _temp = _class = function(_Component) {
    _inheritsLoose(onClickOutside, _Component);
    function onClickOutside(props) {
      var _this;
      _this = _Component.call(this, props) || this;
      _this.__outsideClickHandler = function(event) {
        if (typeof _this.__clickOutsideHandlerProp === "function") {
          _this.__clickOutsideHandlerProp(event);
          return;
        }
        var instance = _this.getInstance();
        if (typeof instance.props.handleClickOutside === "function") {
          instance.props.handleClickOutside(event);
          return;
        }
        if (typeof instance.handleClickOutside === "function") {
          instance.handleClickOutside(event);
          return;
        }
        throw new Error("WrappedComponent: " + componentName + " lacks a handleClickOutside(event) function for processing outside click events.");
      };
      _this.__getComponentNode = function() {
        var instance = _this.getInstance();
        if (config && typeof config.setClickOutsideRef === "function") {
          return config.setClickOutsideRef()(instance);
        }
        if (typeof instance.setClickOutsideRef === "function") {
          return instance.setClickOutsideRef();
        }
        return (0, import_react_dom.findDOMNode)(instance);
      };
      _this.enableOnClickOutside = function() {
        if (typeof document === "undefined" || enabledInstances[_this._uid]) {
          return;
        }
        if (typeof passiveEventSupport === "undefined") {
          passiveEventSupport = testPassiveEventSupport();
        }
        enabledInstances[_this._uid] = true;
        var events = _this.props.eventTypes;
        if (!events.forEach) {
          events = [events];
        }
        handlersMap[_this._uid] = function(event) {
          if (_this.componentNode === null)
            return;
          if (_this.initTimeStamp > event.timeStamp)
            return;
          if (_this.props.preventDefault) {
            event.preventDefault();
          }
          if (_this.props.stopPropagation) {
            event.stopPropagation();
          }
          if (_this.props.excludeScrollbar && clickedScrollbar(event))
            return;
          var current = event.composed && event.composedPath && event.composedPath().shift() || event.target;
          if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {
            return;
          }
          _this.__outsideClickHandler(event);
        };
        events.forEach(function(eventName) {
          document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_assertThisInitialized(_this), eventName));
        });
      };
      _this.disableOnClickOutside = function() {
        delete enabledInstances[_this._uid];
        var fn = handlersMap[_this._uid];
        if (fn && typeof document !== "undefined") {
          var events = _this.props.eventTypes;
          if (!events.forEach) {
            events = [events];
          }
          events.forEach(function(eventName) {
            return document.removeEventListener(eventName, fn, getEventHandlerOptions(_assertThisInitialized(_this), eventName));
          });
          delete handlersMap[_this._uid];
        }
      };
      _this.getRef = function(ref) {
        return _this.instanceRef = ref;
      };
      _this._uid = uid();
      _this.initTimeStamp = performance.now();
      return _this;
    }
    var _proto = onClickOutside.prototype;
    _proto.getInstance = function getInstance() {
      if (WrappedComponent.prototype && !WrappedComponent.prototype.isReactComponent) {
        return this;
      }
      var ref = this.instanceRef;
      return ref.getInstance ? ref.getInstance() : ref;
    };
    _proto.componentDidMount = function componentDidMount() {
      if (typeof document === "undefined" || !document.createElement) {
        return;
      }
      var instance = this.getInstance();
      if (config && typeof config.handleClickOutside === "function") {
        this.__clickOutsideHandlerProp = config.handleClickOutside(instance);
        if (typeof this.__clickOutsideHandlerProp !== "function") {
          throw new Error("WrappedComponent: " + componentName + " lacks a function for processing outside click events specified by the handleClickOutside config option.");
        }
      }
      this.componentNode = this.__getComponentNode();
      if (this.props.disableOnClickOutside)
        return;
      this.enableOnClickOutside();
    };
    _proto.componentDidUpdate = function componentDidUpdate() {
      this.componentNode = this.__getComponentNode();
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.disableOnClickOutside();
    };
    _proto.render = function render() {
      var _this$props = this.props;
      _this$props.excludeScrollbar;
      var props = _objectWithoutPropertiesLoose(_this$props, ["excludeScrollbar"]);
      if (WrappedComponent.prototype && WrappedComponent.prototype.isReactComponent) {
        props.ref = this.getRef;
      } else {
        props.wrappedRef = this.getRef;
      }
      props.disableOnClickOutside = this.disableOnClickOutside;
      props.enableOnClickOutside = this.enableOnClickOutside;
      return (0, import_react.createElement)(WrappedComponent, props);
    };
    return onClickOutside;
  }(import_react.Component), _class.displayName = "OnClickOutside(" + componentName + ")", _class.defaultProps = {
    eventTypes: ["mousedown", "touchstart"],
    excludeScrollbar: config && config.excludeScrollbar || false,
    outsideClickIgnoreClass: IGNORE_CLASS_NAME,
    preventDefault: false,
    stopPropagation: false
  }, _class.getClass = function() {
    return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;
  }, _temp;
}
var react_onclickoutside_es_default = onClickOutsideHOC;

// node_modules/date-fns/toDate.mjs
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    return new argument.constructor(+argument);
  } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
    return new Date(argument);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
}

// node_modules/date-fns/constructFrom.mjs
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}

// node_modules/date-fns/addDays.mjs
function addDays(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount))
    return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  _date.setDate(_date.getDate() + amount);
  return _date;
}

// node_modules/date-fns/addMilliseconds.mjs
function addMilliseconds(date, amount) {
  const timestamp = +toDate(date);
  return constructFrom(date, timestamp + amount);
}

// node_modules/date-fns/constants.mjs
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInWeek = 6048e5;
var millisecondsInDay = 864e5;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;

// node_modules/date-fns/addHours.mjs
function addHours(date, amount) {
  return addMilliseconds(date, amount * millisecondsInHour);
}

// node_modules/date-fns/addMinutes.mjs
function addMinutes(date, amount) {
  return addMilliseconds(date, amount * millisecondsInMinute);
}

// node_modules/date-fns/addMonths.mjs
function addMonths(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount))
    return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  const dayOfMonth = _date.getDate();
  const endOfDesiredMonth = constructFrom(date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth
    );
    return _date;
  }
}

// node_modules/date-fns/addQuarters.mjs
function addQuarters(date, amount) {
  const months = amount * 3;
  return addMonths(date, months);
}

// node_modules/date-fns/addSeconds.mjs
function addSeconds(date, amount) {
  return addMilliseconds(date, amount * 1e3);
}

// node_modules/date-fns/addWeeks.mjs
function addWeeks(date, amount) {
  const days = amount * 7;
  return addDays(date, days);
}

// node_modules/date-fns/addYears.mjs
function addYears(date, amount) {
  return addMonths(date, amount * 12);
}

// node_modules/date-fns/startOfDay.mjs
function startOfDay(date) {
  const _date = toDate(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

// node_modules/date-fns/differenceInCalendarDays.mjs
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = startOfDay(dateLeft);
  const startOfDayRight = startOfDay(dateRight);
  const timestampLeft = +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  const timestampRight = +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
}

// node_modules/date-fns/differenceInCalendarMonths.mjs
function differenceInCalendarMonths(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const yearDiff = _dateLeft.getFullYear() - _dateRight.getFullYear();
  const monthDiff = _dateLeft.getMonth() - _dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}

// node_modules/date-fns/getQuarter.mjs
function getQuarter(date) {
  const _date = toDate(date);
  const quarter = Math.trunc(_date.getMonth() / 3) + 1;
  return quarter;
}

// node_modules/date-fns/differenceInCalendarQuarters.mjs
function differenceInCalendarQuarters(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const yearDiff = _dateLeft.getFullYear() - _dateRight.getFullYear();
  const quarterDiff = getQuarter(_dateLeft) - getQuarter(_dateRight);
  return yearDiff * 4 + quarterDiff;
}

// node_modules/date-fns/differenceInCalendarYears.mjs
function differenceInCalendarYears(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  return _dateLeft.getFullYear() - _dateRight.getFullYear();
}

// node_modules/date-fns/endOfDay.mjs
function endOfDay(date) {
  const _date = toDate(date);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/date-fns/endOfMonth.mjs
function endOfMonth(date) {
  const _date = toDate(date);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/date-fns/_lib/defaultOptions.mjs
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/date-fns/endOfWeek.mjs
function endOfWeek(date, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/date-fns/endOfYear.mjs
function endOfYear(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = (token, count2, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count2 === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count2.toString());
  }
  if (options == null ? void 0 : options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};

// node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/date-fns/locale/en-US/_lib/formatLong.mjs
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};

// node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

// node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index3 = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index3];
  };
}

// node_modules/date-fns/locale/en-US/_lib/localize.mjs
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};

// node_modules/date-fns/locale/_lib/buildMatchFn.mjs
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}

// node_modules/date-fns/locale/en-US/_lib/match.mjs
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index3) => index3 + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};

// node_modules/date-fns/locale/en-US.mjs
var enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

// node_modules/date-fns/startOfYear.mjs
function startOfYear(date) {
  const cleanDate = toDate(date);
  const _date = constructFrom(date, 0);
  _date.setFullYear(cleanDate.getFullYear(), 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/getDayOfYear.mjs
function getDayOfYear(date) {
  const _date = toDate(date);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// node_modules/date-fns/startOfWeek.mjs
function startOfWeek(date, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/startOfISOWeek.mjs
function startOfISOWeek(date) {
  return startOfWeek(date, { weekStartsOn: 1 });
}

// node_modules/date-fns/getISOWeekYear.mjs
function getISOWeekYear(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/startOfISOWeekYear.mjs
function startOfISOWeekYear(date) {
  const year = getISOWeekYear(date);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// node_modules/date-fns/getISOWeek.mjs
function getISOWeek(date) {
  const _date = toDate(date);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/getWeekYear.mjs
function getWeekYear(date, options) {
  var _a2, _b, _c, _d;
  const _date = toDate(date);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const firstWeekOfNextYear = constructFrom(date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/startOfWeekYear.mjs
function startOfWeekYear(date, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// node_modules/date-fns/getWeek.mjs
function getWeek(date, options) {
  const _date = toDate(date);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/_lib/addLeadingZeros.mjs
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

// node_modules/date-fns/_lib/format/lightFormatters.mjs
var lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

// node_modules/date-fns/_lib/format/formatters.mjs
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(date.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    const timestamp = date.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset4, delimiter = "") {
  const sign = offset4 > 0 ? "-" : "+";
  const absOffset = Math.abs(offset4);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset4, delimiter) {
  if (offset4 % 60 === 0) {
    const sign = offset4 > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset4) / 60, 2);
  }
  return formatTimezone(offset4, delimiter);
}
function formatTimezone(offset4, delimiter = "") {
  const sign = offset4 > 0 ? "-" : "+";
  const absOffset = Math.abs(offset4);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

// node_modules/date-fns/_lib/format/longFormatters.mjs
var dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
var timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
var dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

// node_modules/date-fns/_lib/protectedTokens.mjs
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token))
    throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// node_modules/date-fns/isDate.mjs
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/date-fns/isValid.mjs
function isValid(date) {
  if (!isDate(date) && typeof date !== "number") {
    return false;
  }
  const _date = toDate(date);
  return !isNaN(Number(_date));
}

// node_modules/date-fns/format.mjs
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e = options == null ? void 0 : options.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  const originalDate = toDate(date);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken)
      return part.value;
    const token = part.value;
    if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token) || !(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/date-fns/getDate.mjs
function getDate(date) {
  const _date = toDate(date);
  const dayOfMonth = _date.getDate();
  return dayOfMonth;
}

// node_modules/date-fns/getDay.mjs
function getDay(date) {
  const _date = toDate(date);
  const day = _date.getDay();
  return day;
}

// node_modules/date-fns/getHours.mjs
function getHours(date) {
  const _date = toDate(date);
  const hours = _date.getHours();
  return hours;
}

// node_modules/date-fns/getMinutes.mjs
function getMinutes(date) {
  const _date = toDate(date);
  const minutes = _date.getMinutes();
  return minutes;
}

// node_modules/date-fns/getMonth.mjs
function getMonth(date) {
  const _date = toDate(date);
  const month = _date.getMonth();
  return month;
}

// node_modules/date-fns/getSeconds.mjs
function getSeconds(date) {
  const _date = toDate(date);
  const seconds = _date.getSeconds();
  return seconds;
}

// node_modules/date-fns/getTime.mjs
function getTime(date) {
  const _date = toDate(date);
  const timestamp = _date.getTime();
  return timestamp;
}

// node_modules/date-fns/getYear.mjs
function getYear(date) {
  return toDate(date).getFullYear();
}

// node_modules/date-fns/isAfter.mjs
function isAfter(date, dateToCompare) {
  const _date = toDate(date);
  const _dateToCompare = toDate(dateToCompare);
  return _date.getTime() > _dateToCompare.getTime();
}

// node_modules/date-fns/isBefore.mjs
function isBefore(date, dateToCompare) {
  const _date = toDate(date);
  const _dateToCompare = toDate(dateToCompare);
  return +_date < +_dateToCompare;
}

// node_modules/date-fns/isEqual.mjs
function isEqual(leftDate, rightDate) {
  const _dateLeft = toDate(leftDate);
  const _dateRight = toDate(rightDate);
  return +_dateLeft === +_dateRight;
}

// node_modules/date-fns/isSameDay.mjs
function isSameDay(dateLeft, dateRight) {
  const dateLeftStartOfDay = startOfDay(dateLeft);
  const dateRightStartOfDay = startOfDay(dateRight);
  return +dateLeftStartOfDay === +dateRightStartOfDay;
}

// node_modules/date-fns/isSameMonth.mjs
function isSameMonth(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  return _dateLeft.getFullYear() === _dateRight.getFullYear() && _dateLeft.getMonth() === _dateRight.getMonth();
}

// node_modules/date-fns/startOfQuarter.mjs
function startOfQuarter(date) {
  const _date = toDate(date);
  const currentMonth = _date.getMonth();
  const month = currentMonth - currentMonth % 3;
  _date.setMonth(month, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/isSameQuarter.mjs
function isSameQuarter(dateLeft, dateRight) {
  const dateLeftStartOfQuarter = startOfQuarter(dateLeft);
  const dateRightStartOfQuarter = startOfQuarter(dateRight);
  return +dateLeftStartOfQuarter === +dateRightStartOfQuarter;
}

// node_modules/date-fns/isSameYear.mjs
function isSameYear(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  return _dateLeft.getFullYear() === _dateRight.getFullYear();
}

// node_modules/date-fns/isWithinInterval.mjs
function isWithinInterval(date, interval) {
  const time = +toDate(date);
  const [startTime, endTime] = [
    +toDate(interval.start),
    +toDate(interval.end)
  ].sort((a, b) => a - b);
  return time >= startTime && time <= endTime;
}

// node_modules/date-fns/max.mjs
function max(dates) {
  let result;
  dates.forEach(function(dirtyDate) {
    const currentDate = toDate(dirtyDate);
    if (result === void 0 || result < currentDate || isNaN(Number(currentDate))) {
      result = currentDate;
    }
  });
  return result || /* @__PURE__ */ new Date(NaN);
}

// node_modules/date-fns/min.mjs
function min(dates) {
  let result;
  dates.forEach((dirtyDate) => {
    const date = toDate(dirtyDate);
    if (!result || result > date || isNaN(+date)) {
      result = date;
    }
  });
  return result || /* @__PURE__ */ new Date(NaN);
}

// node_modules/date-fns/getDefaultOptions.mjs
function getDefaultOptions2() {
  return Object.assign({}, getDefaultOptions());
}

// node_modules/date-fns/transpose.mjs
function transpose(fromDate, constructor) {
  const date = constructor instanceof Date ? constructFrom(constructor, 0) : new constructor(0);
  date.setFullYear(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate()
  );
  date.setHours(
    fromDate.getHours(),
    fromDate.getMinutes(),
    fromDate.getSeconds(),
    fromDate.getMilliseconds()
  );
  return date;
}

// node_modules/date-fns/parse/_lib/Setter.mjs
var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = class {
  constructor() {
    __publicField(this, "subPriority", 0);
  }
  validate(_utcDate, _options) {
    return true;
  }
};
var ValueSetter = class extends Setter {
  constructor(value, validateValue, setValue, priority, subPriority) {
    super();
    this.value = value;
    this.validateValue = validateValue;
    this.setValue = setValue;
    this.priority = priority;
    if (subPriority) {
      this.subPriority = subPriority;
    }
  }
  validate(date, options) {
    return this.validateValue(date, this.value, options);
  }
  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options);
  }
};
var DateToSystemTimezoneSetter = class extends Setter {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", TIMEZONE_UNIT_PRIORITY);
    __publicField(this, "subPriority", -1);
  }
  set(date, flags) {
    if (flags.timestampIsSet)
      return date;
    return constructFrom(date, transpose(date, Date));
  }
};

// node_modules/date-fns/parse/_lib/Parser.mjs
var Parser = class {
  run(dateString, token, match2, options) {
    const result = this.parse(dateString, token, match2, options);
    if (!result) {
      return null;
    }
    return {
      setter: new ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: result.rest
    };
  }
  validate(_utcDate, _value, _options) {
    return true;
  }
};

// node_modules/date-fns/parse/_lib/parsers/EraParser.mjs
var EraParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 140);
    __publicField(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
      case "GGGGG":
        return match2.era(dateString, { width: "narrow" });
      case "GGGG":
      default:
        return match2.era(dateString, { width: "wide" }) || match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
    }
  }
  set(date, flags, value) {
    flags.era = value;
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/constants.mjs
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};

// node_modules/date-fns/parse/_lib/utils.mjs
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  const sign = matchResult[1] === "+" ? 1 : -1;
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  const isCommonEra = currentYear > 0;
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  let result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

// node_modules/date-fns/parse/_lib/parsers/YearParser.mjs
var YearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "yy"
    });
    switch (token) {
      case "y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value) {
    const currentYear = date.getFullYear();
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(normalizedTwoDigitYear, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.mjs
var LocalWeekYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "YY"
    });
    switch (token) {
      case "Y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "Yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value, options) {
    const currentYear = getWeekYear(date, options);
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(
        normalizedTwoDigitYear,
        0,
        options.firstWeekContainsDate
      );
      date.setHours(0, 0, 0, 0);
      return startOfWeek(date, options);
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, options.firstWeekContainsDate);
    date.setHours(0, 0, 0, 0);
    return startOfWeek(date, options);
  }
};

// node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.mjs
var ISOWeekYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", [
      "G",
      "y",
      "Y",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token) {
    if (token === "R") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    const firstWeekOfYear = constructFrom(date, 0);
    firstWeekOfYear.setFullYear(value, 0, 4);
    firstWeekOfYear.setHours(0, 0, 0, 0);
    return startOfISOWeek(firstWeekOfYear);
  }
};

// node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.mjs
var ExtendedYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token) {
    if (token === "u") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/QuarterParser.mjs
var QuarterParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "Q":
      case "QQ":
        return parseNDigits(token.length, dateString);
      case "Qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
      case "QQQ":
        return match2.quarter(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQQ":
        return match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return match2.quarter(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.mjs
var StandAloneQuarterParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "q":
      case "qq":
        return parseNDigits(token.length, dateString);
      case "qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
      case "qqq":
        return match2.quarter(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqqq":
        return match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return match2.quarter(dateString, {
          width: "wide",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/MonthParser.mjs
var MonthParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "L",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    __publicField(this, "priority", 110);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      case "M":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      case "MM":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      case "Mo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      case "MMM":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
      case "MMMMM":
        return match2.month(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return match2.month(dateString, { width: "wide", context: "formatting" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.mjs
var StandAloneMonthParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 110);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      case "L":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      case "LL":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      case "Lo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      case "LLL":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
      case "LLLLL":
        return match2.month(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return match2.month(dateString, { width: "wide", context: "standalone" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/setWeek.mjs
function setWeek(date, week, options) {
  const _date = toDate(date);
  const diff = getWeek(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.mjs
var LocalWeekParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 100);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "w":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "wo":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value, options) {
    return startOfWeek(setWeek(date, value, options), options);
  }
};

// node_modules/date-fns/setISOWeek.mjs
function setISOWeek(date, week) {
  const _date = toDate(date);
  const diff = getISOWeek(_date) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.mjs
var ISOWeekParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 100);
    __publicField(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "I":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "Io":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value) {
    return startOfISOWeek(setISOWeek(date, value));
  }
};

// node_modules/date-fns/parse/_lib/parsers/DateParser.mjs
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
var DateParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "subPriority", 1);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "d":
        return parseNumericPattern(numericPatterns.date, dateString);
      case "do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = isLeapYearIndex(year);
    const month = date.getMonth();
    if (isLeapYear) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH[month];
    }
  }
  set(date, _flags, value) {
    date.setDate(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.mjs
var DayOfYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "subpriority", 1);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "E",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "D":
      case "DD":
        return parseNumericPattern(numericPatterns.dayOfYear, dateString);
      case "Do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = isLeapYearIndex(year);
    if (isLeapYear) {
      return value >= 1 && value <= 366;
    } else {
      return value >= 1 && value <= 365;
    }
  }
  set(date, _flags, value) {
    date.setMonth(0, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/setDay.mjs
function setDay(date, day, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const currentDay = _date.getDay();
  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;
  const delta = 7 - weekStartsOn;
  const diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return addDays(_date, diff);
}

// node_modules/date-fns/parse/_lib/parsers/DayParser.mjs
var DayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "EEEEE":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "EEEE":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/LocalDayParser.mjs
var LocalDayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      case "e":
      case "ee":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      case "eo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      case "eee":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "eeeee":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "eeee":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.mjs
var StandAloneLocalDayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "e",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      case "c":
      case "cc":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      case "co":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      case "ccc":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      case "ccccc":
        return match2.day(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      case "cccc":
      default:
        return match2.day(dateString, { width: "wide", context: "standalone" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/getISODay.mjs
function getISODay(date) {
  const _date = toDate(date);
  let day = _date.getDay();
  if (day === 0) {
    day = 7;
  }
  return day;
}

// node_modules/date-fns/setISODay.mjs
function setISODay(date, day) {
  const _date = toDate(date);
  const currentDay = getISODay(_date);
  const diff = day - currentDay;
  return addDays(_date, diff);
}

// node_modules/date-fns/parse/_lib/parsers/ISODayParser.mjs
var ISODayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "E",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => {
      if (value === 0) {
        return 7;
      }
      return value;
    };
    switch (token) {
      case "i":
      case "ii":
        return parseNDigits(token.length, dateString);
      case "io":
        return match2.ordinalNumber(dateString, { unit: "day" });
      case "iii":
        return mapValue(
          match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiiii":
        return mapValue(
          match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiiiii":
        return mapValue(
          match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiii":
      default:
        return mapValue(
          match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 7;
  }
  set(date, _flags, value) {
    date = setISODay(date, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/AMPMParser.mjs
var AMPMParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "a":
      case "aa":
      case "aaa":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.mjs
var AMPMMidnightParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "b":
      case "bb":
      case "bbb":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.mjs
var DayPeriodParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.mjs
var Hour1to12Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "h":
        return parseNumericPattern(numericPatterns.hour12h, dateString);
      case "ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 12;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.mjs
var Hour0to23Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "H":
        return parseNumericPattern(numericPatterns.hour23h, dateString);
      case "Ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 23;
  }
  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.mjs
var Hour0To11Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "K":
        return parseNumericPattern(numericPatterns.hour11h, dateString);
      case "Ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.mjs
var Hour1To24Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "k":
        return parseNumericPattern(numericPatterns.hour24h, dateString);
      case "ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 24;
  }
  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value;
    date.setHours(hours, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/MinuteParser.mjs
var MinuteParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 60);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "m":
        return parseNumericPattern(numericPatterns.minute, dateString);
      case "mo":
        return match2.ordinalNumber(dateString, { unit: "minute" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setMinutes(value, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/SecondParser.mjs
var SecondParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 50);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "s":
        return parseNumericPattern(numericPatterns.second, dateString);
      case "so":
        return match2.ordinalNumber(dateString, { unit: "second" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setSeconds(value, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.mjs
var FractionOfSecondParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 30);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token) {
    const valueCallback = (value) => Math.trunc(value * Math.pow(10, -token.length + 3));
    return mapValue(parseNDigits(token.length, dateString), valueCallback);
  }
  set(date, _flags, value) {
    date.setMilliseconds(value);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.mjs
var ISOTimezoneWithZParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(dateString, token) {
    switch (token) {
      case "X":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "XX":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "XXXX":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "XXXXX":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "XXX":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet)
      return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
};

// node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.mjs
var ISOTimezoneParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(dateString, token) {
    switch (token) {
      case "x":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "xx":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "xxxx":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "xxxxx":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "xxx":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet)
      return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
};

// node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.mjs
var TimestampSecondsParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 40);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value * 1e3), { timestampIsSet: true }];
  }
};

// node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.mjs
var TimestampMillisecondsParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 20);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value), { timestampIsSet: true }];
  }
};

// node_modules/date-fns/parse/_lib/parsers.mjs
var parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
};

// node_modules/date-fns/parse.mjs
var formattingTokensRegExp2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp2 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp2 = /^'([^]*?)'?$/;
var doubleQuoteRegExp2 = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp2 = /[a-zA-Z]/;
function parse(dateStr, formatStr, referenceDate, options) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions2();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e = options == null ? void 0 : options.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  if (formatStr === "") {
    if (dateStr === "") {
      return toDate(referenceDate);
    } else {
      return constructFrom(referenceDate, NaN);
    }
  }
  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  const setters = [new DateToSystemTimezoneSetter()];
  const tokens = formatStr.match(longFormattingTokensRegExp2).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter in longFormatters) {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp2);
  const usedTokens = [];
  for (let token of tokens) {
    if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    if (!(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    const firstCharacter = token[0];
    const parser = parsers[firstCharacter];
    if (parser) {
      const { incompatibleTokens } = parser;
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) => incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter
        );
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`
          );
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`
        );
      }
      usedTokens.push({ token: firstCharacter, fullToken: token });
      const parseResult = parser.run(
        dateStr,
        token,
        locale.match,
        subFnOptions
      );
      if (!parseResult) {
        return constructFrom(referenceDate, NaN);
      }
      setters.push(parseResult.setter);
      dateStr = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp2)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
        );
      }
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString2(token);
      }
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length);
      } else {
        return constructFrom(referenceDate, NaN);
      }
    }
  }
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return constructFrom(referenceDate, NaN);
  }
  const uniquePrioritySetters = setters.map((setter) => setter.priority).sort((a, b) => b - a).filter((priority, index3, array) => array.indexOf(priority) === index3).map(
    (priority) => setters.filter((setter) => setter.priority === priority).sort((a, b) => b.subPriority - a.subPriority)
  ).map((setterArray) => setterArray[0]);
  let date = toDate(referenceDate);
  if (isNaN(date.getTime())) {
    return constructFrom(referenceDate, NaN);
  }
  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return constructFrom(referenceDate, NaN);
    }
    const result = setter.set(date, flags, subFnOptions);
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
    } else {
      date = result;
    }
  }
  return constructFrom(referenceDate, date);
}
function cleanEscapedString2(input) {
  return input.match(escapedStringRegExp2)[1].replace(doubleQuoteRegExp2, "'");
}

// node_modules/date-fns/parseISO.mjs
function parseISO(argument, options) {
  const additionalDigits = (options == null ? void 0 : options.additionalDigits) ?? 2;
  const dateStrings = splitDateString(argument);
  let date;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }
  if (!date || isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  const timestamp = date.getTime();
  let time = 0;
  let offset4;
  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  if (dateStrings.timezone) {
    offset4 = parseTimezone(dateStrings.timezone);
    if (isNaN(offset4)) {
      return /* @__PURE__ */ new Date(NaN);
    }
  } else {
    const dirtyDate = new Date(timestamp + time);
    const result = /* @__PURE__ */ new Date(0);
    result.setFullYear(
      dirtyDate.getUTCFullYear(),
      dirtyDate.getUTCMonth(),
      dirtyDate.getUTCDate()
    );
    result.setHours(
      dirtyDate.getUTCHours(),
      dirtyDate.getUTCMinutes(),
      dirtyDate.getUTCSeconds(),
      dirtyDate.getUTCMilliseconds()
    );
    return result;
  }
  return new Date(timestamp + time + offset4);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString;
  if (array.length > 2) {
    return dateStrings;
  }
  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(
        dateStrings.date.length,
        dateString.length
      );
    }
  }
  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  const regex = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)"
  );
  const captures = dateString.match(regex);
  if (!captures)
    return { year: NaN, restDateString: "" };
  const year = captures[1] ? parseInt(captures[1]) : null;
  const century = captures[2] ? parseInt(captures[2]) : null;
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}
function parseDate(dateString, year) {
  if (year === null)
    return /* @__PURE__ */ new Date(NaN);
  const captures = dateString.match(dateRegex);
  if (!captures)
    return /* @__PURE__ */ new Date(NaN);
  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;
  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    const date = /* @__PURE__ */ new Date(0);
    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}
function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
  const captures = timeString.match(timeRegex);
  if (!captures)
    return NaN;
  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);
  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }
  return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
}
function parseTimeUnit(value) {
  return value && parseFloat(value.replace(",", ".")) || 0;
}
function parseTimezone(timezoneString) {
  if (timezoneString === "Z")
    return 0;
  const captures = timezoneString.match(timezoneRegex);
  if (!captures)
    return 0;
  const sign = captures[1] === "+" ? -1 : 1;
  const hours = parseInt(captures[2]);
  const minutes = captures[3] && parseInt(captures[3]) || 0;
  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }
  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  const date = /* @__PURE__ */ new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex2(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex2(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex2(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }
  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

// node_modules/date-fns/getDaysInMonth.mjs
function getDaysInMonth(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth = constructFrom(date, 0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

// node_modules/date-fns/setMonth.mjs
function setMonth(date, month) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const day = _date.getDate();
  const dateWithDesiredMonth = constructFrom(date, 0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}

// node_modules/date-fns/set.mjs
function set(date, values) {
  let _date = toDate(date);
  if (isNaN(+_date)) {
    return constructFrom(date, NaN);
  }
  if (values.year != null) {
    _date.setFullYear(values.year);
  }
  if (values.month != null) {
    _date = setMonth(_date, values.month);
  }
  if (values.date != null) {
    _date.setDate(values.date);
  }
  if (values.hours != null) {
    _date.setHours(values.hours);
  }
  if (values.minutes != null) {
    _date.setMinutes(values.minutes);
  }
  if (values.seconds != null) {
    _date.setSeconds(values.seconds);
  }
  if (values.milliseconds != null) {
    _date.setMilliseconds(values.milliseconds);
  }
  return _date;
}

// node_modules/date-fns/setHours.mjs
function setHours(date, hours) {
  const _date = toDate(date);
  _date.setHours(hours);
  return _date;
}

// node_modules/date-fns/setMinutes.mjs
function setMinutes(date, minutes) {
  const _date = toDate(date);
  _date.setMinutes(minutes);
  return _date;
}

// node_modules/date-fns/setQuarter.mjs
function setQuarter(date, quarter) {
  const _date = toDate(date);
  const oldQuarter = Math.trunc(_date.getMonth() / 3) + 1;
  const diff = quarter - oldQuarter;
  return setMonth(_date, _date.getMonth() + diff * 3);
}

// node_modules/date-fns/setSeconds.mjs
function setSeconds(date, seconds) {
  const _date = toDate(date);
  _date.setSeconds(seconds);
  return _date;
}

// node_modules/date-fns/setYear.mjs
function setYear(date, year) {
  const _date = toDate(date);
  if (isNaN(+_date)) {
    return constructFrom(date, NaN);
  }
  _date.setFullYear(year);
  return _date;
}

// node_modules/date-fns/startOfMonth.mjs
function startOfMonth(date) {
  const _date = toDate(date);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/subDays.mjs
function subDays(date, amount) {
  return addDays(date, -amount);
}

// node_modules/date-fns/subMonths.mjs
function subMonths(date, amount) {
  return addMonths(date, -amount);
}

// node_modules/date-fns/subQuarters.mjs
function subQuarters(date, amount) {
  return addQuarters(date, -amount);
}

// node_modules/date-fns/subWeeks.mjs
function subWeeks(date, amount) {
  return addWeeks(date, -amount);
}

// node_modules/date-fns/subYears.mjs
function subYears(date, amount) {
  return addYears(date, -amount);
}

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var React2 = __toESM(require_react(), 1);
var import_react3 = __toESM(require_react(), 1);

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle2(element);
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isTopLayer(currentNode)) {
      return null;
    }
    if (isContainingBlock(currentNode)) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

// node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
function isSafari() {
  return /apple/i.test(navigator.vendor);
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min2 = Math.min;
var max2 = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max2(start, min2(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/tabbable/dist/index.esm.js
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var ReactDOM2 = __toESM(require_react_dom(), 1);

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min2(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min2(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max3 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset4 = clamp(min$1, center, max3);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset4 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max3 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset4,
        centerOffset: center - offset4 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max2(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max2(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max2(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max2(rect.top, accRect.top);
    accRect.right = min2(rect.right, accRect.right);
    accRect.bottom = min2(rect.bottom, accRect.bottom);
    accRect.left = max2(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId2;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId2);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max2(0, min2(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId2 = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var flip2 = flip;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var React = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);
var ReactDOM = __toESM(require_react_dom(), 1);
var index = typeof document !== "undefined" ? import_react2.useLayoutEffect : import_react2.useEffect;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length)
        return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React.useState(null);
  const [_floating, _setFloating] = React.useState(null);
  const setReference = React.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React.useRef(null);
  const floatingRef = React.useRef(null);
  const dataRef = React.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const update = React.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        isPositioned: true
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl)
      referenceRef.current = referenceEl;
    if (floatingEl)
      floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
var arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === "function" ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow2({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return arrow2({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};
var offset3 = (options, deps) => ({
  ...offset2(options),
  options: [options, deps]
});
var flip3 = (options, deps) => ({
  ...flip2(options),
  options: [options, deps]
});
var arrow3 = (options, deps) => ({
  ...arrow$1(options),
  options: [options, deps]
});

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
function useMergeRefs(refs) {
  return React2.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          ref.current = value;
        }
      });
    };
  }, refs);
}
var SafeReact = {
  ...React2
};
var useInsertionEffect = SafeReact.useInsertionEffect;
var useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = React2.useRef(() => {
    if (true) {
      throw new Error("Cannot call an event handler while rendering.");
    }
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return React2.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
var ARROW_UP = "ArrowUp";
var ARROW_DOWN = "ArrowDown";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";
function isDifferentRow(index3, cols, prevRow) {
  return Math.floor(index3 / cols) !== prevRow;
}
function isIndexOutOfBounds(listRef, index3) {
  return index3 < 0 || index3 >= listRef.current.length;
}
function getMinIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    disabledIndices
  });
}
function getMaxIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}
function findNonDisabledIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1
  } = _temp === void 0 ? {} : _temp;
  const list = listRef.current;
  let index3 = startingIndex;
  do {
    index3 += decrement ? -amount : amount;
  } while (index3 >= 0 && index3 <= list.length - 1 && isDisabled(list, index3, disabledIndices));
  return index3;
}
function getGridNavigatedIndex(elementsRef, _ref) {
  let {
    event,
    orientation,
    loop,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false
  } = _ref;
  let nextIndex = prevIndex;
  if (event.key === ARROW_UP) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = maxIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: nextIndex,
        amount: cols,
        decrement: true,
        disabledIndices
      });
      if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
        const col = prevIndex % cols;
        const maxCol = maxIndex % cols;
        const offset4 = maxIndex - (maxCol - col);
        if (maxCol === col) {
          nextIndex = maxIndex;
        } else {
          nextIndex = maxCol > col ? offset4 : offset4 - cols;
        }
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (event.key === ARROW_DOWN) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = minIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: prevIndex,
        amount: cols,
        disabledIndices
      });
      if (loop && prevIndex + cols > maxIndex) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex % cols - cols,
          amount: cols,
          disabledIndices
        });
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (orientation === "both") {
    const prevRow = floor(prevIndex / cols);
    if (event.key === ARROW_RIGHT) {
      stop && stopEvent(event);
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    if (event.key === ARROW_LEFT) {
      stop && stopEvent(event);
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          decrement: true,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex + (cols - prevIndex % cols),
            decrement: true,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex + (cols - prevIndex % cols),
          decrement: true,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    const lastRow = floor(maxIndex / cols) === prevRow;
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      if (loop && lastRow) {
        nextIndex = event.key === ARROW_LEFT ? maxIndex : findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      } else {
        nextIndex = prevIndex;
      }
    }
  }
  return nextIndex;
}
function buildCellMap(sizes, cols, dense) {
  const cellMap = [];
  let startIndex = 0;
  sizes.forEach((_ref2, index3) => {
    let {
      width,
      height
    } = _ref2;
    if (width > cols) {
      if (true) {
        throw new Error("[Floating UI]: Invalid grid - item width at index " + index3 + " is greater than grid columns");
      }
    }
    let itemPlaced = false;
    if (dense) {
      startIndex = 0;
    }
    while (!itemPlaced) {
      const targetCells = [];
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          targetCells.push(startIndex + i + j * cols);
        }
      }
      if (startIndex % cols + width <= cols && targetCells.every((cell) => cellMap[cell] == null)) {
        targetCells.forEach((cell) => {
          cellMap[cell] = index3;
        });
        itemPlaced = true;
      } else {
        startIndex++;
      }
    }
  });
  return [...cellMap];
}
function getCellIndexOfCorner(index3, sizes, cellMap, cols, corner) {
  if (index3 === -1)
    return -1;
  const firstCellIndex = cellMap.indexOf(index3);
  const sizeItem = sizes[index3];
  switch (corner) {
    case "tl":
      return firstCellIndex;
    case "tr":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + sizeItem.width - 1;
    case "bl":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + (sizeItem.height - 1) * cols;
    case "br":
      return cellMap.lastIndexOf(index3);
  }
}
function getCellIndices(indices, cellMap) {
  return cellMap.flatMap((index3, cellIndex) => indices.includes(index3) ? [cellIndex] : []);
}
function isDisabled(list, index3, disabledIndices) {
  if (disabledIndices) {
    return disabledIndices.includes(index3);
  }
  const element = list[index3];
  return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}
var rafId = 0;
function enqueueFocus(el, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    preventScroll = false,
    cancelPrevious = true,
    sync = false
  } = options;
  cancelPrevious && cancelAnimationFrame(rafId);
  const exec = () => el == null ? void 0 : el.focus({
    preventScroll
  });
  if (sync) {
    exec();
  } else {
    rafId = requestAnimationFrame(exec);
  }
}
var index2 = typeof document !== "undefined" ? import_react3.useLayoutEffect : import_react3.useEffect;
function sortByDocumentPosition(a, b) {
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return -1;
  }
  if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
    return 1;
  }
  return 0;
}
function areMapsEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }
  for (const [key, value] of map1.entries()) {
    if (value !== map2.get(key)) {
      return false;
    }
  }
  return true;
}
var FloatingListContext = React2.createContext({
  register: () => {
  },
  unregister: () => {
  },
  map: /* @__PURE__ */ new Map(),
  elementsRef: {
    current: []
  }
});
function FloatingList(props) {
  const {
    children,
    elementsRef,
    labelsRef
  } = props;
  const [map, setMap] = React2.useState(() => /* @__PURE__ */ new Map());
  const register = React2.useCallback((node) => {
    setMap((prevMap) => new Map(prevMap).set(node, null));
  }, []);
  const unregister = React2.useCallback((node) => {
    setMap((prevMap) => {
      const map2 = new Map(prevMap);
      map2.delete(node);
      return map2;
    });
  }, []);
  index2(() => {
    const newMap = new Map(map);
    const nodes = Array.from(newMap.keys()).sort(sortByDocumentPosition);
    nodes.forEach((node, index3) => {
      newMap.set(node, index3);
    });
    if (!areMapsEqual(map, newMap)) {
      setMap(newMap);
    }
  }, [map]);
  return React2.createElement(FloatingListContext.Provider, {
    value: React2.useMemo(() => ({
      register,
      unregister,
      map,
      elementsRef,
      labelsRef
    }), [register, unregister, map, elementsRef, labelsRef])
  }, children);
}
function useListItem(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    label
  } = props;
  const {
    register,
    unregister,
    map,
    elementsRef,
    labelsRef
  } = React2.useContext(FloatingListContext);
  const [index$1, setIndex] = React2.useState(null);
  const componentRef = React2.useRef(null);
  const ref = React2.useCallback((node) => {
    componentRef.current = node;
    if (index$1 !== null) {
      elementsRef.current[index$1] = node;
      if (labelsRef) {
        var _node$textContent;
        const isLabelDefined = label !== void 0;
        labelsRef.current[index$1] = isLabelDefined ? label : (_node$textContent = node == null ? void 0 : node.textContent) != null ? _node$textContent : null;
      }
    }
  }, [index$1, elementsRef, labelsRef, label]);
  index2(() => {
    const node = componentRef.current;
    if (node) {
      register(node);
      return () => {
        unregister(node);
      };
    }
  }, [register, unregister]);
  index2(() => {
    const index3 = componentRef.current ? map.get(componentRef.current) : null;
    if (index3 != null) {
      setIndex(index3);
    }
  }, [map]);
  return React2.useMemo(() => ({
    ref,
    index: index$1 == null ? -1 : index$1
  }), [index$1, ref]);
}
function renderJsx(render, computedProps) {
  if (typeof render === "function") {
    return render(computedProps);
  }
  if (render) {
    return React2.cloneElement(render, computedProps);
  }
  return React2.createElement("div", computedProps);
}
var CompositeContext = React2.createContext({
  activeIndex: 0,
  onNavigate: () => {
  }
});
var horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
var verticalKeys = [ARROW_UP, ARROW_DOWN];
var allKeys = [...horizontalKeys, ...verticalKeys];
var Composite = React2.forwardRef(function Composite2(props, forwardedRef) {
  const {
    render,
    orientation = "both",
    loop = true,
    cols = 1,
    disabledIndices,
    activeIndex: externalActiveIndex,
    onNavigate: externalSetActiveIndex,
    itemSizes,
    dense = false,
    ...domProps
  } = props;
  const [internalActiveIndex, internalSetActiveIndex] = React2.useState(0);
  const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
  const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
  const elementsRef = React2.useRef([]);
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const contextValue = React2.useMemo(() => ({
    activeIndex,
    onNavigate
  }), [activeIndex, onNavigate]);
  const isGrid = cols > 1;
  function handleKeyDown(event) {
    if (!allKeys.includes(event.key))
      return;
    let nextIndex = activeIndex;
    const minIndex = getMinIndex(elementsRef, disabledIndices);
    const maxIndex = getMaxIndex(elementsRef, disabledIndices);
    if (isGrid) {
      const sizes = itemSizes || Array.from({
        length: elementsRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      const cellMap = buildCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex((index3) => index3 != null && !isDisabled(elementsRef.current, index3, disabledIndices));
      const maxGridIndex = cellMap.reduce((foundIndex, index3, cellIndex) => index3 != null && !isDisabled(elementsRef.current, index3, disabledIndices) ? cellIndex : foundIndex, -1);
      nextIndex = cellMap[getGridNavigatedIndex({
        current: cellMap.map((itemIndex) => itemIndex ? elementsRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getCellIndices([...disabledIndices || elementsRef.current.map((_, index3) => isDisabled(elementsRef.current, index3) ? index3 : void 0), void 0], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getCellIndexOfCorner(
          activeIndex > maxIndex ? minIndex : activeIndex,
          sizes,
          cellMap,
          cols,
          // use a corner matching the edge closest to the direction we're
          // moving in so we don't end up in the same item. Prefer
          // top/left over bottom/right.
          event.key === ARROW_DOWN ? "bl" : event.key === ARROW_RIGHT ? "tr" : "tl"
        )
      })];
    }
    const toEndKeys = {
      horizontal: [ARROW_RIGHT],
      vertical: [ARROW_DOWN],
      both: [ARROW_RIGHT, ARROW_DOWN]
    }[orientation];
    const toStartKeys = {
      horizontal: [ARROW_LEFT],
      vertical: [ARROW_UP],
      both: [ARROW_LEFT, ARROW_UP]
    }[orientation];
    const preventedKeys = isGrid ? allKeys : {
      horizontal: horizontalKeys,
      vertical: verticalKeys,
      both: allKeys
    }[orientation];
    if (nextIndex === activeIndex && [...toEndKeys, ...toStartKeys].includes(event.key)) {
      if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) {
        nextIndex = minIndex;
      } else if (loop && nextIndex === minIndex && toStartKeys.includes(event.key)) {
        nextIndex = maxIndex;
      } else {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: nextIndex,
          decrement: toStartKeys.includes(event.key),
          disabledIndices
        });
      }
    }
    if (nextIndex !== activeIndex && !isIndexOutOfBounds(elementsRef, nextIndex)) {
      event.stopPropagation();
      if (preventedKeys.includes(event.key)) {
        event.preventDefault();
      }
      onNavigate(nextIndex);
      queueMicrotask(() => {
        enqueueFocus(elementsRef.current[nextIndex]);
      });
    }
  }
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: forwardedRef,
    "aria-orientation": orientation === "both" ? void 0 : orientation,
    onKeyDown(e) {
      domProps.onKeyDown == null || domProps.onKeyDown(e);
      renderElementProps.onKeyDown == null || renderElementProps.onKeyDown(e);
      handleKeyDown(e);
    }
  };
  return React2.createElement(CompositeContext.Provider, {
    value: contextValue
  }, React2.createElement(FloatingList, {
    elementsRef
  }, renderJsx(render, computedProps)));
});
var CompositeItem = React2.forwardRef(function CompositeItem2(props, forwardedRef) {
  const {
    render,
    ...domProps
  } = props;
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const {
    activeIndex,
    onNavigate
  } = React2.useContext(CompositeContext);
  const {
    ref,
    index: index3
  } = useListItem();
  const mergedRef = useMergeRefs([ref, forwardedRef, renderElementProps.ref]);
  const isActive = activeIndex === index3;
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: mergedRef,
    tabIndex: isActive ? 0 : -1,
    "data-active": isActive ? "" : void 0,
    onFocus(e) {
      domProps.onFocus == null || domProps.onFocus(e);
      renderElementProps.onFocus == null || renderElementProps.onFocus(e);
      onNavigate(index3);
    }
  };
  return renderJsx(render, computedProps);
});
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var serverHandoffComplete = false;
var count = 0;
var genId = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++
);
function useFloatingId() {
  const [id, setId] = React2.useState(() => serverHandoffComplete ? genId() : void 0);
  index2(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  React2.useEffect(() => {
    serverHandoffComplete = true;
  }, []);
  return id;
}
var useReactId = SafeReact.useId;
var useId = useReactId || useFloatingId;
var devMessageSet;
if (true) {
  devMessageSet = /* @__PURE__ */ new Set();
}
function warn() {
  var _devMessageSet;
  for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }
  const message2 = "Floating UI: " + messages.join(" ");
  if (!((_devMessageSet = devMessageSet) != null && _devMessageSet.has(message2))) {
    var _devMessageSet2;
    (_devMessageSet2 = devMessageSet) == null || _devMessageSet2.add(message2);
    console.warn(message2);
  }
}
function error() {
  var _devMessageSet3;
  for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    messages[_key2] = arguments[_key2];
  }
  const message2 = "Floating UI: " + messages.join(" ");
  if (!((_devMessageSet3 = devMessageSet) != null && _devMessageSet3.has(message2))) {
    var _devMessageSet4;
    (_devMessageSet4 = devMessageSet) == null || _devMessageSet4.add(message2);
    console.error(message2);
  }
}
var FloatingArrow = React2.forwardRef(function FloatingArrow2(props, ref) {
  const {
    context: {
      placement,
      elements: {
        floating
      },
      middlewareData: {
        arrow: arrow4
      }
    },
    width = 14,
    height = 7,
    tipRadius = 0,
    strokeWidth = 0,
    staticOffset,
    stroke,
    d,
    style: {
      transform,
      ...restStyle
    } = {},
    ...rest
  } = props;
  if (true) {
    if (!ref) {
      warn("The `ref` prop is required for `FloatingArrow`.");
    }
  }
  const clipPathId = useId();
  const [isRTL2, setIsRTL] = React2.useState(false);
  index2(() => {
    if (!floating)
      return;
    const isRTL3 = getComputedStyle2(floating).direction === "rtl";
    if (isRTL3) {
      setIsRTL(true);
    }
  }, [floating]);
  if (!floating) {
    return null;
  }
  const computedStrokeWidth = strokeWidth * 2;
  const halfStrokeWidth = computedStrokeWidth / 2;
  const svgX = width / 2 * (tipRadius / -8 + 1);
  const svgY = height / 2 * tipRadius / 4;
  const [side, alignment] = placement.split("-");
  const isCustomShape = !!d;
  const isVerticalSide = side === "top" || side === "bottom";
  const yOffsetProp = staticOffset && alignment === "end" ? "bottom" : "top";
  let xOffsetProp = staticOffset && alignment === "end" ? "right" : "left";
  if (staticOffset && isRTL2) {
    xOffsetProp = alignment === "end" ? "left" : "right";
  }
  const arrowX = (arrow4 == null ? void 0 : arrow4.x) != null ? staticOffset || arrow4.x : "";
  const arrowY = (arrow4 == null ? void 0 : arrow4.y) != null ? staticOffset || arrow4.y : "";
  const dValue = d || "M0,0" + (" H" + width) + (" L" + (width - svgX) + "," + (height - svgY)) + (" Q" + width / 2 + "," + height + " " + svgX + "," + (height - svgY)) + " Z";
  const rotation = {
    top: isCustomShape ? "rotate(180deg)" : "",
    left: isCustomShape ? "rotate(90deg)" : "rotate(-90deg)",
    bottom: isCustomShape ? "" : "rotate(180deg)",
    right: isCustomShape ? "rotate(-90deg)" : "rotate(90deg)"
  }[side];
  return React2.createElement("svg", _extends({}, rest, {
    "aria-hidden": true,
    ref,
    width: isCustomShape ? width : width + computedStrokeWidth,
    height: width,
    viewBox: "0 0 " + width + " " + (height > width ? height : width),
    style: {
      position: "absolute",
      pointerEvents: "none",
      [xOffsetProp]: arrowX,
      [yOffsetProp]: arrowY,
      [side]: isVerticalSide || isCustomShape ? "100%" : "calc(100% - " + computedStrokeWidth / 2 + "px)",
      transform: "" + rotation + (transform != null ? transform : ""),
      ...restStyle
    }
  }), computedStrokeWidth > 0 && React2.createElement("path", {
    clipPath: "url(#" + clipPathId + ")",
    fill: "none",
    stroke,
    strokeWidth: computedStrokeWidth + (d ? 0 : 1),
    d: dValue
  }), React2.createElement("path", {
    stroke: computedStrokeWidth && !d ? rest.fill : "none",
    d: dValue
  }), React2.createElement("clipPath", {
    id: clipPathId
  }, React2.createElement("rect", {
    x: -halfStrokeWidth,
    y: halfStrokeWidth * (isCustomShape ? -1 : 1),
    width: width + computedStrokeWidth,
    height: width
  })));
});
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null || _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...map.get(event) || [], listener]);
    },
    off(event, listener) {
      var _map$get2;
      map.set(event, ((_map$get2 = map.get(event)) == null ? void 0 : _map$get2.filter((l) => l !== listener)) || []);
    }
  };
}
var FloatingNodeContext = React2.createContext(null);
var FloatingTreeContext = React2.createContext(null);
var useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = React2.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
var useFloatingTree = () => React2.useContext(FloatingTreeContext);
function createAttribute(name) {
  return "data-floating-ui-" + name;
}
var safePolygonIdentifier = createAttribute("safe-polygon");
var NOOP = () => {
};
var FloatingDelayGroupContext = React2.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: NOOP,
  setState: NOOP,
  isInstantPhase: false
});
var HIDDEN_STYLES = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
var timeoutId;
function setActiveElementOnTab(event) {
  if (event.key === "Tab") {
    event.target;
    clearTimeout(timeoutId);
  }
}
var FocusGuard = React2.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = React2.useState();
  index2(() => {
    if (isSafari()) {
      setRole("button");
    }
    document.addEventListener("keydown", setActiveElementOnTab);
    return () => {
      document.removeEventListener("keydown", setActiveElementOnTab);
    };
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    "aria-hidden": role ? void 0 : true,
    [createAttribute("focus-guard")]: "",
    style: HIDDEN_STYLES
  };
  return React2.createElement("span", _extends({}, props, restProps));
});
var PortalContext = React2.createContext(null);
var attr = createAttribute("portal");
var VisuallyHiddenDismiss = React2.forwardRef(function VisuallyHiddenDismiss2(props, ref) {
  return React2.createElement("button", _extends({}, props, {
    type: "button",
    ref,
    tabIndex: -1,
    style: HIDDEN_STYLES
  }));
});
var activeLocks = /* @__PURE__ */ new Set();
var FloatingOverlay = React2.forwardRef(function FloatingOverlay2(props, ref) {
  const {
    lockScroll = false,
    ...rest
  } = props;
  const lockId = useId();
  index2(() => {
    if (!lockScroll)
      return;
    activeLocks.add(lockId);
    const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform());
    const bodyStyle = document.body.style;
    const scrollbarX = Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;
    const paddingProp = scrollbarX ? "paddingLeft" : "paddingRight";
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.pageXOffset;
    const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.pageYOffset;
    bodyStyle.overflow = "hidden";
    if (scrollbarWidth) {
      bodyStyle[paddingProp] = scrollbarWidth + "px";
    }
    if (isIOS) {
      var _window$visualViewpor, _window$visualViewpor2;
      const offsetLeft = ((_window$visualViewpor = window.visualViewport) == null ? void 0 : _window$visualViewpor.offsetLeft) || 0;
      const offsetTop = ((_window$visualViewpor2 = window.visualViewport) == null ? void 0 : _window$visualViewpor2.offsetTop) || 0;
      Object.assign(bodyStyle, {
        position: "fixed",
        top: -(scrollY - Math.floor(offsetTop)) + "px",
        left: -(scrollX - Math.floor(offsetLeft)) + "px",
        right: "0"
      });
    }
    return () => {
      activeLocks.delete(lockId);
      if (activeLocks.size === 0) {
        Object.assign(bodyStyle, {
          overflow: "",
          [paddingProp]: ""
        });
        if (isIOS) {
          Object.assign(bodyStyle, {
            position: "",
            top: "",
            left: "",
            right: ""
          });
          window.scrollTo(scrollX, scrollY);
        }
      }
    };
  }, [lockId, lockScroll]);
  return React2.createElement("div", _extends({
    ref
  }, rest, {
    style: {
      position: "fixed",
      overflow: "auto",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...rest.style
    }
  }));
});
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp
  } = options;
  const floatingId = useId();
  const dataRef = React2.useRef({});
  const [events] = React2.useState(() => createPubSub());
  const nested = useFloatingParentNodeId() != null;
  if (true) {
    const optionDomReference = elementsProp.reference;
    if (optionDomReference && !isElement(optionDomReference)) {
      error("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
    }
  }
  const [positionReference, setPositionReference] = React2.useState(elementsProp.reference);
  const onOpenChange = useEffectEvent((open2, event, reason) => {
    dataRef.current.openEvent = open2 ? event : void 0;
    events.emit("openchange", {
      open: open2,
      event,
      reason,
      nested
    });
    onOpenChangeProp == null || onOpenChangeProp(open2, event, reason);
  });
  const refs = React2.useMemo(() => ({
    setPositionReference
  }), []);
  const elements = React2.useMemo(() => ({
    reference: positionReference || elementsProp.reference || null,
    floating: elementsProp.floating || null,
    domReference: elementsProp.reference
  }), [positionReference, elementsProp.reference, elementsProp.floating]);
  return React2.useMemo(() => ({
    dataRef,
    open,
    onOpenChange,
    elements,
    events,
    floatingId,
    refs
  }), [open, onOpenChange, elements, events, floatingId, refs]);
}
function useFloating2(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    nodeId
  } = options;
  const internalRootContext = useFloatingRootContext({
    ...options,
    elements: {
      reference: null,
      floating: null,
      ...options.elements
    }
  });
  const rootContext = options.rootContext || internalRootContext;
  const computedElements = rootContext.elements;
  const [_domReference, setDomReference] = React2.useState(null);
  const [positionReference, _setPositionReference] = React2.useState(null);
  const optionDomReference = computedElements == null ? void 0 : computedElements.reference;
  const domReference = optionDomReference || _domReference;
  const domReferenceRef = React2.useRef(null);
  const tree = useFloatingTree();
  index2(() => {
    if (domReference) {
      domReferenceRef.current = domReference;
    }
  }, [domReference]);
  const position = useFloating({
    ...options,
    elements: {
      ...computedElements,
      ...positionReference && {
        reference: positionReference
      }
    }
  });
  const setPositionReference = React2.useCallback((node) => {
    const computedPositionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      contextElement: node
    } : node;
    _setPositionReference(computedPositionReference);
    position.refs.setReference(computedPositionReference);
  }, [position.refs]);
  const setReference = React2.useCallback((node) => {
    if (isElement(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }
    if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = React2.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = React2.useMemo(() => ({
    ...position.elements,
    domReference
  }), [position.elements, domReference]);
  const context = React2.useMemo(() => ({
    ...position,
    ...rootContext,
    refs,
    elements,
    nodeId
  }), [position, refs, elements, nodeId, rootContext]);
  index2(() => {
    rootContext.dataRef.current.floatingContext = context;
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return React2.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}

// node_modules/react-datepicker/dist/es/index.js
var import_react_dom4 = __toESM(require_react_dom());
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return _extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  _extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var _assign = function __assign() {
  _assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return _assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var CalendarContainer = function(_a2) {
  var _b = _a2.showTimeSelectOnly, showTimeSelectOnly = _b === void 0 ? false : _b, _c = _a2.showTime, showTime = _c === void 0 ? false : _c, className = _a2.className, children = _a2.children;
  var ariaLabel = showTimeSelectOnly ? "Choose Time" : "Choose Date".concat(showTime ? " and Time" : "");
  return import_react4.default.createElement("div", { className, role: "dialog", "aria-label": ariaLabel, "aria-modal": "true" }, children);
};
var KeyType;
(function(KeyType2) {
  KeyType2["ArrowUp"] = "ArrowUp";
  KeyType2["ArrowDown"] = "ArrowDown";
  KeyType2["ArrowLeft"] = "ArrowLeft";
  KeyType2["ArrowRight"] = "ArrowRight";
  KeyType2["PageUp"] = "PageUp";
  KeyType2["PageDown"] = "PageDown";
  KeyType2["Home"] = "Home";
  KeyType2["End"] = "End";
  KeyType2["Enter"] = "Enter";
  KeyType2["Space"] = " ";
  KeyType2["Tab"] = "Tab";
  KeyType2["Escape"] = "Escape";
  KeyType2["Backspace"] = "Backspace";
  KeyType2["X"] = "x";
})(KeyType || (KeyType = {}));
function getLocaleScope() {
  var scope = typeof window !== "undefined" ? window : globalThis;
  return scope;
}
var DEFAULT_YEAR_ITEM_NUMBER = 12;
var longFormattingTokensRegExp3 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
function newDate(value) {
  if (value == null) {
    return /* @__PURE__ */ new Date();
  }
  var d = typeof value === "string" ? parseISO(value) : toDate(value);
  return isValid2(d) ? d : /* @__PURE__ */ new Date();
}
function parseDate2(value, dateFormat, locale, strictParsing, minDate) {
  var _a2;
  var parsedDate = null;
  var localeObject = getLocaleObject(locale) || getLocaleObject(getDefaultLocale());
  var strictParsingValueMatch = true;
  if (Array.isArray(dateFormat)) {
    dateFormat.forEach(function(df) {
      var tryParseDate = parse(value, df, /* @__PURE__ */ new Date(), {
        locale: localeObject,
        useAdditionalWeekYearTokens: true,
        useAdditionalDayOfYearTokens: true
      });
      if (strictParsing) {
        strictParsingValueMatch = isValid2(tryParseDate, minDate) && value === formatDate(tryParseDate, df, locale);
      }
      if (isValid2(tryParseDate, minDate) && strictParsingValueMatch) {
        parsedDate = tryParseDate;
      }
    });
    return parsedDate;
  }
  parsedDate = parse(value, dateFormat, /* @__PURE__ */ new Date(), {
    locale: localeObject,
    useAdditionalWeekYearTokens: true,
    useAdditionalDayOfYearTokens: true
  });
  if (strictParsing) {
    strictParsingValueMatch = isValid2(parsedDate) && value === formatDate(parsedDate, dateFormat, locale);
  } else if (!isValid2(parsedDate)) {
    var format_1 = ((_a2 = dateFormat.match(longFormattingTokensRegExp3)) !== null && _a2 !== void 0 ? _a2 : []).map(function(substring) {
      var firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        var longFormatter = longFormatters[firstCharacter];
        return localeObject ? longFormatter(substring, localeObject.formatLong) : firstCharacter;
      }
      return substring;
    }).join("");
    if (value.length > 0) {
      parsedDate = parse(value, format_1.slice(0, value.length), /* @__PURE__ */ new Date(), {
        useAdditionalWeekYearTokens: true,
        useAdditionalDayOfYearTokens: true
      });
    }
    if (!isValid2(parsedDate)) {
      parsedDate = new Date(value);
    }
  }
  return isValid2(parsedDate) && strictParsingValueMatch ? parsedDate : null;
}
function isValid2(date, minDate) {
  return isValid(date) && !isBefore(date, minDate !== null && minDate !== void 0 ? minDate : /* @__PURE__ */ new Date("1/1/1800"));
}
function formatDate(date, formatStr, locale) {
  if (locale === "en") {
    return format(date, formatStr, {
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true
    });
  }
  var localeObj = locale ? getLocaleObject(locale) : void 0;
  if (locale && !localeObj) {
    console.warn('A locale object was not found for the provided string ["'.concat(locale, '"].'));
  }
  if (!localeObj && !!getDefaultLocale() && !!getLocaleObject(getDefaultLocale())) {
    localeObj = getLocaleObject(getDefaultLocale());
  }
  return format(date, formatStr, {
    locale: localeObj,
    useAdditionalWeekYearTokens: true,
    useAdditionalDayOfYearTokens: true
  });
}
function safeDateFormat(date, _a2) {
  var dateFormat = _a2.dateFormat, locale = _a2.locale;
  var formatStr = Array.isArray(dateFormat) && dateFormat.length > 0 ? dateFormat[0] : dateFormat;
  return date && formatDate(date, formatStr, locale) || "";
}
function safeDateRangeFormat(startDate, endDate, props) {
  if (!startDate) {
    return "";
  }
  var formattedStartDate = safeDateFormat(startDate, props);
  var formattedEndDate = endDate ? safeDateFormat(endDate, props) : "";
  return "".concat(formattedStartDate, " - ").concat(formattedEndDate);
}
function safeMultipleDatesFormat(dates, props) {
  if (!(dates === null || dates === void 0 ? void 0 : dates.length)) {
    return "";
  }
  var formattedFirstDate = dates[0] ? safeDateFormat(dates[0], props) : "";
  if (dates.length === 1) {
    return formattedFirstDate;
  }
  if (dates.length === 2 && dates[1]) {
    var formattedSecondDate = safeDateFormat(dates[1], props);
    return "".concat(formattedFirstDate, ", ").concat(formattedSecondDate);
  }
  var extraDatesCount = dates.length - 1;
  return "".concat(formattedFirstDate, " (+").concat(extraDatesCount, ")");
}
function setTime(date, _a2) {
  var _b = _a2.hour, hour = _b === void 0 ? 0 : _b, _c = _a2.minute, minute = _c === void 0 ? 0 : _c, _d = _a2.second, second = _d === void 0 ? 0 : _d;
  return setHours(setMinutes(setSeconds(date, second), minute), hour);
}
function getWeek2(date) {
  return getISOWeek(date);
}
function getDayOfWeekCode(day, locale) {
  return formatDate(day, "ddd", locale);
}
function getStartOfDay(date) {
  return startOfDay(date);
}
function getStartOfWeek(date, locale, calendarStartDay) {
  var localeObj = locale ? getLocaleObject(locale) : getLocaleObject(getDefaultLocale());
  return startOfWeek(date, {
    locale: localeObj,
    weekStartsOn: calendarStartDay
  });
}
function getStartOfMonth(date) {
  return startOfMonth(date);
}
function getStartOfYear(date) {
  return startOfYear(date);
}
function getStartOfQuarter(date) {
  return startOfQuarter(date);
}
function getStartOfToday() {
  return startOfDay(newDate());
}
function getEndOfDay(date) {
  return endOfDay(date);
}
function getEndOfWeek(date) {
  return endOfWeek(date);
}
function isSameYear2(date1, date2) {
  if (date1 && date2) {
    return isSameYear(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameMonth2(date1, date2) {
  if (date1 && date2) {
    return isSameMonth(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameQuarter2(date1, date2) {
  if (date1 && date2) {
    return isSameQuarter(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameDay2(date1, date2) {
  if (date1 && date2) {
    return isSameDay(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isEqual2(date1, date2) {
  if (date1 && date2) {
    return isEqual(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isDayInRange(day, startDate, endDate) {
  var valid;
  var start = startOfDay(startDate);
  var end = endOfDay(endDate);
  try {
    valid = isWithinInterval(day, { start, end });
  } catch (err) {
    valid = false;
  }
  return valid;
}
function registerLocale(localeName, localeData) {
  var scope = getLocaleScope();
  if (!scope.__localeData__) {
    scope.__localeData__ = {};
  }
  scope.__localeData__[localeName] = localeData;
}
function setDefaultLocale(localeName) {
  var scope = getLocaleScope();
  scope.__localeId__ = localeName;
}
function getDefaultLocale() {
  var scope = getLocaleScope();
  return scope.__localeId__;
}
function getLocaleObject(localeSpec) {
  if (typeof localeSpec === "string") {
    var scope = getLocaleScope();
    return scope.__localeData__ ? scope.__localeData__[localeSpec] : void 0;
  } else {
    return localeSpec;
  }
}
function getFormattedWeekdayInLocale(date, formatFunc, locale) {
  return formatFunc(formatDate(date, "EEEE", locale));
}
function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "EEEEEE", locale);
}
function getWeekdayShortInLocale(date, locale) {
  return formatDate(date, "EEE", locale);
}
function getMonthInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLLL", locale);
}
function getMonthShortInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLL", locale);
}
function getQuarterShortInLocale(quarter, locale) {
  return formatDate(setQuarter(newDate(), quarter), "QQQ", locale);
}
function isDayDisabled(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, excludeDateIntervals = _b.excludeDateIntervals, includeDates = _b.includeDates, includeDateIntervals = _b.includeDateIntervals, filterDate = _b.filterDate;
  return isOutOfBounds(day, { minDate, maxDate }) || excludeDates && excludeDates.some(function(excludeDate) {
    var _a3;
    if (excludeDate instanceof Date) {
      return isSameDay2(day, excludeDate);
    } else {
      return isSameDay2(day, (_a3 = excludeDate.date) !== null && _a3 !== void 0 ? _a3 : /* @__PURE__ */ new Date());
    }
  }) || excludeDateIntervals && excludeDateIntervals.some(function(_a3) {
    var start = _a3.start, end = _a3.end;
    return isWithinInterval(day, { start, end });
  }) || includeDates && !includeDates.some(function(includeDate) {
    return isSameDay2(day, includeDate);
  }) || includeDateIntervals && !includeDateIntervals.some(function(_a3) {
    var start = _a3.start, end = _a3.end;
    return isWithinInterval(day, { start, end });
  }) || filterDate && !filterDate(newDate(day)) || false;
}
function isDayExcluded(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, excludeDates = _b.excludeDates, excludeDateIntervals = _b.excludeDateIntervals;
  if (excludeDateIntervals && excludeDateIntervals.length > 0) {
    return excludeDateIntervals.some(function(_a3) {
      var start = _a3.start, end = _a3.end;
      return isWithinInterval(day, { start, end });
    });
  }
  return excludeDates && excludeDates.some(function(excludeDate) {
    var _a3;
    if (excludeDate instanceof Date) {
      return isSameDay2(day, excludeDate);
    } else {
      return isSameDay2(day, (_a3 = excludeDate.date) !== null && _a3 !== void 0 ? _a3 : /* @__PURE__ */ new Date());
    }
  }) || false;
}
function isMonthDisabled(month, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
  return isOutOfBounds(month, {
    minDate: minDate ? startOfMonth(minDate) : void 0,
    maxDate: maxDate ? endOfMonth(maxDate) : void 0
  }) || (excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.some(function(excludeDate) {
    return isSameMonth2(month, excludeDate instanceof Date ? excludeDate : excludeDate.date);
  })) || includeDates && !includeDates.some(function(includeDate) {
    return isSameMonth2(month, includeDate);
  }) || filterDate && !filterDate(newDate(month)) || false;
}
function isMonthInRange(startDate, endDate, m, day) {
  var startDateYear = getYear(startDate);
  var startDateMonth = getMonth(startDate);
  var endDateYear = getYear(endDate);
  var endDateMonth = getMonth(endDate);
  var dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateMonth <= m && m <= endDateMonth;
  } else if (startDateYear < endDateYear) {
    return dayYear === startDateYear && startDateMonth <= m || dayYear === endDateYear && endDateMonth >= m || dayYear < endDateYear && dayYear > startDateYear;
  }
  return false;
}
function isMonthYearDisabled(date, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates;
  return isOutOfBounds(date, { minDate, maxDate }) || excludeDates && excludeDates.some(function(excludedDate) {
    return isSameMonth2(excludedDate instanceof Date ? excludedDate : excludedDate.date, date);
  }) || includeDates && !includeDates.some(function(includedDate) {
    return isSameMonth2(includedDate, date);
  }) || false;
}
function isQuarterDisabled(quarter, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
  return isOutOfBounds(quarter, { minDate, maxDate }) || (excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.some(function(excludeDate) {
    return isSameQuarter2(quarter, excludeDate instanceof Date ? excludeDate : excludeDate.date);
  })) || includeDates && !includeDates.some(function(includeDate) {
    return isSameQuarter2(quarter, includeDate);
  }) || filterDate && !filterDate(newDate(quarter)) || false;
}
function isYearInRange(year, start, end) {
  if (!start || !end)
    return false;
  if (!isValid(start) || !isValid(end))
    return false;
  var startYear = getYear(start);
  var endYear = getYear(end);
  return startYear <= year && endYear >= year;
}
function isYearDisabled(year, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
  var date = new Date(year, 0, 1);
  return isOutOfBounds(date, {
    minDate: minDate ? startOfYear(minDate) : void 0,
    maxDate: maxDate ? endOfYear(maxDate) : void 0
  }) || (excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.some(function(excludeDate) {
    return isSameYear2(date, excludeDate instanceof Date ? excludeDate : excludeDate.date);
  })) || includeDates && !includeDates.some(function(includeDate) {
    return isSameYear2(date, includeDate);
  }) || filterDate && !filterDate(newDate(date)) || false;
}
function isQuarterInRange(startDate, endDate, q, day) {
  var startDateYear = getYear(startDate);
  var startDateQuarter = getQuarter(startDate);
  var endDateYear = getYear(endDate);
  var endDateQuarter = getQuarter(endDate);
  var dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateQuarter <= q && q <= endDateQuarter;
  } else if (startDateYear < endDateYear) {
    return dayYear === startDateYear && startDateQuarter <= q || dayYear === endDateYear && endDateQuarter >= q || dayYear < endDateYear && dayYear > startDateYear;
  }
  return false;
}
function isOutOfBounds(day, _a2) {
  var _b;
  var _c = _a2 === void 0 ? {} : _a2, minDate = _c.minDate, maxDate = _c.maxDate;
  return (_b = minDate && differenceInCalendarDays(day, minDate) < 0 || maxDate && differenceInCalendarDays(day, maxDate) > 0) !== null && _b !== void 0 ? _b : false;
}
function isTimeInList(time, times) {
  return times.some(function(listTime) {
    return getHours(listTime) === getHours(time) && getMinutes(listTime) === getMinutes(time) && getSeconds(listTime) === getSeconds(time);
  });
}
function isTimeDisabled(time, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, excludeTimes = _b.excludeTimes, includeTimes = _b.includeTimes, filterTime = _b.filterTime;
  return excludeTimes && isTimeInList(time, excludeTimes) || includeTimes && !isTimeInList(time, includeTimes) || filterTime && !filterTime(time) || false;
}
function isTimeInDisabledRange(time, _a2) {
  var minTime2 = _a2.minTime, maxTime2 = _a2.maxTime;
  if (!minTime2 || !maxTime2) {
    throw new Error("Both minTime and maxTime props required");
  }
  var baseTime = newDate();
  baseTime = setHours(baseTime, getHours(time));
  baseTime = setMinutes(baseTime, getMinutes(time));
  baseTime = setSeconds(baseTime, getSeconds(time));
  var min3 = newDate();
  min3 = setHours(min3, getHours(minTime2));
  min3 = setMinutes(min3, getMinutes(minTime2));
  min3 = setSeconds(min3, getSeconds(minTime2));
  var max3 = newDate();
  max3 = setHours(max3, getHours(maxTime2));
  max3 = setMinutes(max3, getMinutes(maxTime2));
  max3 = setSeconds(max3, getSeconds(maxTime2));
  var valid;
  try {
    valid = !isWithinInterval(baseTime, { start: min3, end: max3 });
  } catch (err) {
    valid = false;
  }
  return valid;
}
function monthDisabledBefore(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, includeDates = _b.includeDates;
  var previousMonth = subMonths(day, 1);
  return minDate && differenceInCalendarMonths(minDate, previousMonth) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarMonths(includeDate, previousMonth) > 0;
  }) || false;
}
function monthDisabledAfter(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, maxDate = _b.maxDate, includeDates = _b.includeDates;
  var nextMonth = addMonths(day, 1);
  return maxDate && differenceInCalendarMonths(nextMonth, maxDate) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarMonths(nextMonth, includeDate) > 0;
  }) || false;
}
function quarterDisabledBefore(date, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, includeDates = _b.includeDates;
  var firstDateOfYear = startOfYear(date);
  var previousQuarter = subQuarters(firstDateOfYear, 1);
  return minDate && differenceInCalendarQuarters(minDate, previousQuarter) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarQuarters(includeDate, previousQuarter) > 0;
  }) || false;
}
function quarterDisabledAfter(date, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, maxDate = _b.maxDate, includeDates = _b.includeDates;
  var lastDateOfYear = endOfYear(date);
  var nextQuarter = addQuarters(lastDateOfYear, 1);
  return maxDate && differenceInCalendarQuarters(nextQuarter, maxDate) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarQuarters(nextQuarter, includeDate) > 0;
  }) || false;
}
function yearDisabledBefore(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, includeDates = _b.includeDates;
  var previousYear = subYears(day, 1);
  return minDate && differenceInCalendarYears(minDate, previousYear) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarYears(includeDate, previousYear) > 0;
  }) || false;
}
function yearsDisabledBefore(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
  var previousYear = getStartOfYear(subYears(day, yearItemNumber));
  var endPeriod = getYearsPeriod(previousYear, yearItemNumber).endPeriod;
  var minDateYear = minDate && getYear(minDate);
  return minDateYear && minDateYear > endPeriod || false;
}
function yearDisabledAfter(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, maxDate = _b.maxDate, includeDates = _b.includeDates;
  var nextYear = addYears(day, 1);
  return maxDate && differenceInCalendarYears(nextYear, maxDate) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarYears(nextYear, includeDate) > 0;
  }) || false;
}
function yearsDisabledAfter(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, maxDate = _b.maxDate, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
  var nextYear = addYears(day, yearItemNumber);
  var startPeriod = getYearsPeriod(nextYear, yearItemNumber).startPeriod;
  var maxDateYear = maxDate && getYear(maxDate);
  return maxDateYear && maxDateYear < startPeriod || false;
}
function getEffectiveMinDate(_a2) {
  var minDate = _a2.minDate, includeDates = _a2.includeDates;
  if (includeDates && minDate) {
    var minDates = includeDates.filter(function(includeDate) {
      return differenceInCalendarDays(includeDate, minDate) >= 0;
    });
    return min(minDates);
  } else if (includeDates) {
    return min(includeDates);
  } else {
    return minDate;
  }
}
function getEffectiveMaxDate(_a2) {
  var maxDate = _a2.maxDate, includeDates = _a2.includeDates;
  if (includeDates && maxDate) {
    var maxDates = includeDates.filter(function(includeDate) {
      return differenceInCalendarDays(includeDate, maxDate) <= 0;
    });
    return max(maxDates);
  } else if (includeDates) {
    return max(includeDates);
  } else {
    return maxDate;
  }
}
function getHighLightDaysMap(highlightDates, defaultClassName) {
  var _a2;
  if (highlightDates === void 0) {
    highlightDates = [];
  }
  if (defaultClassName === void 0) {
    defaultClassName = "react-datepicker__day--highlighted";
  }
  var dateClasses = /* @__PURE__ */ new Map();
  for (var i = 0, len = highlightDates.length; i < len; i++) {
    var obj = highlightDates[i];
    if (isDate(obj)) {
      var key = formatDate(obj, "MM.dd.yyyy");
      var classNamesArr = dateClasses.get(key) || [];
      if (!classNamesArr.includes(defaultClassName)) {
        classNamesArr.push(defaultClassName);
        dateClasses.set(key, classNamesArr);
      }
    } else if (typeof obj === "object") {
      var keys = Object.keys(obj);
      var className = (_a2 = keys[0]) !== null && _a2 !== void 0 ? _a2 : "";
      var arrOfDates = obj[className];
      if (typeof className === "string" && Array.isArray(arrOfDates)) {
        for (var k = 0, len_1 = arrOfDates.length; k < len_1; k++) {
          var dateK = arrOfDates[k];
          if (dateK) {
            var key = formatDate(dateK, "MM.dd.yyyy");
            var classNamesArr = dateClasses.get(key) || [];
            if (!classNamesArr.includes(className)) {
              classNamesArr.push(className);
              dateClasses.set(key, classNamesArr);
            }
          }
        }
      }
    }
  }
  return dateClasses;
}
function arraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every(function(value, index3) {
    return value === array2[index3];
  });
}
function getHolidaysMap(holidayDates, defaultClassName) {
  if (holidayDates === void 0) {
    holidayDates = [];
  }
  if (defaultClassName === void 0) {
    defaultClassName = "react-datepicker__day--holidays";
  }
  var dateClasses = /* @__PURE__ */ new Map();
  holidayDates.forEach(function(holiday) {
    var dateObj = holiday.date, holidayName = holiday.holidayName;
    if (!isDate(dateObj)) {
      return;
    }
    var key = formatDate(dateObj, "MM.dd.yyyy");
    var classNamesObj = dateClasses.get(key) || {
      className: "",
      holidayNames: []
    };
    if ("className" in classNamesObj && classNamesObj["className"] === defaultClassName && arraysAreEqual(classNamesObj["holidayNames"], [holidayName])) {
      return;
    }
    classNamesObj["className"] = defaultClassName;
    var holidayNameArr = classNamesObj["holidayNames"];
    classNamesObj["holidayNames"] = holidayNameArr ? __spreadArray(__spreadArray([], holidayNameArr, true), [holidayName], false) : [holidayName];
    dateClasses.set(key, classNamesObj);
  });
  return dateClasses;
}
function timesToInjectAfter(startOfDay2, currentTime, currentMultiplier, intervals, injectedTimes) {
  var l = injectedTimes.length;
  var times = [];
  for (var i = 0; i < l; i++) {
    var injectedTime = startOfDay2;
    var injectedTimeValue = injectedTimes[i];
    if (injectedTimeValue) {
      injectedTime = addHours(injectedTime, getHours(injectedTimeValue));
      injectedTime = addMinutes(injectedTime, getMinutes(injectedTimeValue));
      injectedTime = addSeconds(injectedTime, getSeconds(injectedTimeValue));
    }
    var nextTime = addMinutes(startOfDay2, (currentMultiplier + 1) * intervals);
    if (isAfter(injectedTime, currentTime) && isBefore(injectedTime, nextTime) && injectedTimeValue != void 0) {
      times.push(injectedTimeValue);
    }
  }
  return times;
}
function addZero(i) {
  return i < 10 ? "0".concat(i) : "".concat(i);
}
function getYearsPeriod(date, yearItemNumber) {
  if (yearItemNumber === void 0) {
    yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER;
  }
  var endPeriod = Math.ceil(getYear(date) / yearItemNumber) * yearItemNumber;
  var startPeriod = endPeriod - (yearItemNumber - 1);
  return { startPeriod, endPeriod };
}
function getHoursInDay(d) {
  var startOfDay2 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var startOfTheNextDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 24);
  return Math.round((+startOfTheNextDay - +startOfDay2) / 36e5);
}
function startOfMinute(d) {
  var seconds = d.getSeconds();
  var milliseconds = d.getMilliseconds();
  return toDate(d.getTime() - seconds * 1e3 - milliseconds);
}
function isSameMinute(d1, d2) {
  return startOfMinute(d1).getTime() === startOfMinute(d2).getTime();
}
function getMidnightDate(date) {
  if (!isDate(date)) {
    throw new Error("Invalid date");
  }
  var dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  return dateWithoutTime;
}
function isDateBefore(date, dateToCompare) {
  if (!isDate(date) || !isDate(dateToCompare)) {
    throw new Error("Invalid date received");
  }
  var midnightDate = getMidnightDate(date);
  var midnightDateToCompare = getMidnightDate(dateToCompare);
  return isBefore(midnightDate, midnightDateToCompare);
}
function isSpaceKeyDown(event) {
  return event.key === KeyType.Space;
}
var InputTime = (
  /** @class */
  function(_super) {
    __extends(InputTime2, _super);
    function InputTime2(props) {
      var _this = _super.call(this, props) || this;
      _this.onTimeChange = function(time) {
        var _a2, _b;
        _this.setState({ time });
        var propDate = _this.props.date;
        var isPropDateValid = propDate instanceof Date && !isNaN(+propDate);
        var date = isPropDateValid ? propDate : /* @__PURE__ */ new Date();
        if (time === null || time === void 0 ? void 0 : time.includes(":")) {
          var _c = time.split(":"), hours = _c[0], minutes = _c[1];
          date.setHours(Number(hours));
          date.setMinutes(Number(minutes));
        }
        (_b = (_a2 = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a2, date);
      };
      _this.renderTimeInput = function() {
        var time = _this.state.time;
        var _a2 = _this.props, date = _a2.date, timeString = _a2.timeString, customTimeInput = _a2.customTimeInput;
        if (customTimeInput) {
          return (0, import_react4.cloneElement)(customTimeInput, {
            date,
            value: time,
            onChange: _this.onTimeChange
          });
        }
        return import_react4.default.createElement("input", { type: "time", className: "react-datepicker-time__input", placeholder: "Time", name: "time-input", required: true, value: time, onChange: function(event) {
          _this.onTimeChange(event.target.value || timeString);
        } });
      };
      _this.state = {
        time: _this.props.timeString
      };
      return _this;
    }
    InputTime2.getDerivedStateFromProps = function(props, state) {
      if (props.timeString !== state.time) {
        return {
          time: props.timeString
        };
      }
      return null;
    };
    InputTime2.prototype.render = function() {
      return import_react4.default.createElement(
        "div",
        { className: "react-datepicker__input-time-container" },
        import_react4.default.createElement("div", { className: "react-datepicker-time__caption" }, this.props.timeInputLabel),
        import_react4.default.createElement(
          "div",
          { className: "react-datepicker-time__input-container" },
          import_react4.default.createElement("div", { className: "react-datepicker-time__input" }, this.renderTimeInput())
        )
      );
    };
    return InputTime2;
  }(import_react4.Component)
);
var Day = (
  /** @class */
  function(_super) {
    __extends(Day2, _super);
    function Day2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.dayEl = (0, import_react4.createRef)();
      _this.handleClick = function(event) {
        if (!_this.isDisabled() && _this.props.onClick) {
          _this.props.onClick(event);
        }
      };
      _this.handleMouseEnter = function(event) {
        if (!_this.isDisabled() && _this.props.onMouseEnter) {
          _this.props.onMouseEnter(event);
        }
      };
      _this.handleOnKeyDown = function(event) {
        var _a2, _b;
        var eventKey = event.key;
        if (eventKey === KeyType.Space) {
          event.preventDefault();
          event.key = KeyType.Enter;
        }
        (_b = (_a2 = _this.props).handleOnKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
      };
      _this.isSameDay = function(other) {
        return isSameDay2(_this.props.day, other);
      };
      _this.isKeyboardSelected = function() {
        var _a2;
        if (_this.props.disabledKeyboardNavigation) {
          return false;
        }
        var isSelectedDate = _this.props.selectsMultiple ? (_a2 = _this.props.selectedDates) === null || _a2 === void 0 ? void 0 : _a2.some(function(date) {
          return _this.isSameDayOrWeek(date);
        }) : _this.isSameDayOrWeek(_this.props.selected);
        return !isSelectedDate && _this.isSameDayOrWeek(_this.props.preSelection);
      };
      _this.isDisabled = function() {
        return isDayDisabled(_this.props.day, {
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          excludeDateIntervals: _this.props.excludeDateIntervals,
          includeDateIntervals: _this.props.includeDateIntervals,
          includeDates: _this.props.includeDates,
          filterDate: _this.props.filterDate
        });
      };
      _this.isExcluded = function() {
        return isDayExcluded(_this.props.day, {
          excludeDates: _this.props.excludeDates,
          excludeDateIntervals: _this.props.excludeDateIntervals
        });
      };
      _this.isStartOfWeek = function() {
        return isSameDay2(_this.props.day, getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay));
      };
      _this.isSameWeek = function(other) {
        return _this.props.showWeekPicker && isSameDay2(other, getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay));
      };
      _this.isSameDayOrWeek = function(other) {
        return _this.isSameDay(other) || _this.isSameWeek(other);
      };
      _this.getHighLightedClass = function() {
        var _a2 = _this.props, day = _a2.day, highlightDates = _a2.highlightDates;
        if (!highlightDates) {
          return false;
        }
        var dayStr = formatDate(day, "MM.dd.yyyy");
        return highlightDates.get(dayStr);
      };
      _this.getHolidaysClass = function() {
        var _a2;
        var _b = _this.props, day = _b.day, holidays = _b.holidays;
        if (!holidays) {
          return [void 0];
        }
        var dayStr = formatDate(day, "MM.dd.yyyy");
        if (holidays.has(dayStr)) {
          return [(_a2 = holidays.get(dayStr)) === null || _a2 === void 0 ? void 0 : _a2.className];
        }
        return [void 0];
      };
      _this.isInRange = function() {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isDayInRange(day, startDate, endDate);
      };
      _this.isInSelectingRange = function() {
        var _a2;
        var _b = _this.props, day = _b.day, selectsStart = _b.selectsStart, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange, selectsDisabledDaysInRange = _b.selectsDisabledDaysInRange, startDate = _b.startDate, endDate = _b.endDate;
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate || !selectsDisabledDaysInRange && _this.isDisabled()) {
          return false;
        }
        if (selectsStart && endDate && (isBefore(selectingDate, endDate) || isEqual2(selectingDate, endDate))) {
          return isDayInRange(day, selectingDate, endDate);
        }
        if (selectsEnd && startDate && (isAfter(selectingDate, startDate) || isEqual2(selectingDate, startDate))) {
          return isDayInRange(day, startDate, selectingDate);
        }
        if (selectsRange && startDate && !endDate && (isAfter(selectingDate, startDate) || isEqual2(selectingDate, startDate))) {
          return isDayInRange(day, startDate, selectingDate);
        }
        return false;
      };
      _this.isSelectingRangeStart = function() {
        var _a2;
        if (!_this.isInSelectingRange()) {
          return false;
        }
        var _b = _this.props, day = _b.day, startDate = _b.startDate, selectsStart = _b.selectsStart;
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (selectsStart) {
          return isSameDay2(day, selectingDate);
        } else {
          return isSameDay2(day, startDate);
        }
      };
      _this.isSelectingRangeEnd = function() {
        var _a2;
        if (!_this.isInSelectingRange()) {
          return false;
        }
        var _b = _this.props, day = _b.day, endDate = _b.endDate, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange;
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (selectsEnd || selectsRange) {
          return isSameDay2(day, selectingDate);
        } else {
          return isSameDay2(day, endDate);
        }
      };
      _this.isRangeStart = function() {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameDay2(startDate, day);
      };
      _this.isRangeEnd = function() {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameDay2(endDate, day);
      };
      _this.isWeekend = function() {
        var weekday = getDay(_this.props.day);
        return weekday === 0 || weekday === 6;
      };
      _this.isAfterMonth = function() {
        return _this.props.month !== void 0 && (_this.props.month + 1) % 12 === getMonth(_this.props.day);
      };
      _this.isBeforeMonth = function() {
        return _this.props.month !== void 0 && (getMonth(_this.props.day) + 1) % 12 === _this.props.month;
      };
      _this.isCurrentDay = function() {
        return _this.isSameDay(newDate());
      };
      _this.isSelected = function() {
        var _a2;
        if (_this.props.selectsMultiple) {
          return (_a2 = _this.props.selectedDates) === null || _a2 === void 0 ? void 0 : _a2.some(function(date) {
            return _this.isSameDayOrWeek(date);
          });
        }
        return _this.isSameDayOrWeek(_this.props.selected);
      };
      _this.getClassNames = function(date) {
        var dayClassName = _this.props.dayClassName ? _this.props.dayClassName(date) : void 0;
        return clsx("react-datepicker__day", dayClassName, "react-datepicker__day--" + getDayOfWeekCode(_this.props.day), {
          "react-datepicker__day--disabled": _this.isDisabled(),
          "react-datepicker__day--excluded": _this.isExcluded(),
          "react-datepicker__day--selected": _this.isSelected(),
          "react-datepicker__day--keyboard-selected": _this.isKeyboardSelected(),
          "react-datepicker__day--range-start": _this.isRangeStart(),
          "react-datepicker__day--range-end": _this.isRangeEnd(),
          "react-datepicker__day--in-range": _this.isInRange(),
          "react-datepicker__day--in-selecting-range": _this.isInSelectingRange(),
          "react-datepicker__day--selecting-range-start": _this.isSelectingRangeStart(),
          "react-datepicker__day--selecting-range-end": _this.isSelectingRangeEnd(),
          "react-datepicker__day--today": _this.isCurrentDay(),
          "react-datepicker__day--weekend": _this.isWeekend(),
          "react-datepicker__day--outside-month": _this.isAfterMonth() || _this.isBeforeMonth()
        }, _this.getHighLightedClass(), _this.getHolidaysClass());
      };
      _this.getAriaLabel = function() {
        var _a2 = _this.props, day = _a2.day, _b = _a2.ariaLabelPrefixWhenEnabled, ariaLabelPrefixWhenEnabled = _b === void 0 ? "Choose" : _b, _c = _a2.ariaLabelPrefixWhenDisabled, ariaLabelPrefixWhenDisabled = _c === void 0 ? "Not available" : _c;
        var prefix = _this.isDisabled() || _this.isExcluded() ? ariaLabelPrefixWhenDisabled : ariaLabelPrefixWhenEnabled;
        return "".concat(prefix, " ").concat(formatDate(day, "PPPP", _this.props.locale));
      };
      _this.getTitle = function() {
        var _a2 = _this.props, day = _a2.day, _b = _a2.holidays, holidays = _b === void 0 ? /* @__PURE__ */ new Map() : _b, excludeDates = _a2.excludeDates;
        var compareDt = formatDate(day, "MM.dd.yyyy");
        var titles = [];
        if (holidays.has(compareDt)) {
          titles.push.apply(titles, holidays.get(compareDt).holidayNames);
        }
        if (_this.isExcluded()) {
          titles.push(excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.filter(function(excludeDate) {
            if (excludeDate instanceof Date) {
              return isSameDay2(excludeDate, day);
            }
            return isSameDay2(excludeDate === null || excludeDate === void 0 ? void 0 : excludeDate.date, day);
          }).map(function(excludeDate) {
            if (excludeDate instanceof Date) {
              return void 0;
            }
            return excludeDate === null || excludeDate === void 0 ? void 0 : excludeDate.message;
          }));
        }
        return titles.join(", ");
      };
      _this.getTabIndex = function() {
        var selectedDay = _this.props.selected;
        var preSelectionDay = _this.props.preSelection;
        var tabIndex = !(_this.props.showWeekPicker && (_this.props.showWeekNumber || !_this.isStartOfWeek())) && (_this.isKeyboardSelected() || _this.isSameDay(selectedDay) && isSameDay2(preSelectionDay, selectedDay)) ? 0 : -1;
        return tabIndex;
      };
      _this.handleFocusDay = function() {
        var _a2;
        _this.shouldFocusDay() && ((_a2 = _this.dayEl.current) === null || _a2 === void 0 ? void 0 : _a2.focus({ preventScroll: true }));
      };
      _this.renderDayContents = function() {
        if (_this.props.monthShowsDuplicateDaysEnd && _this.isAfterMonth())
          return null;
        if (_this.props.monthShowsDuplicateDaysStart && _this.isBeforeMonth())
          return null;
        return _this.props.renderDayContents ? _this.props.renderDayContents(getDate(_this.props.day), _this.props.day) : getDate(_this.props.day);
      };
      _this.render = function() {
        return (
          // TODO: Use <option> instead of the "option" role to ensure accessibility across all devices.
          import_react4.default.createElement(
            "div",
            { ref: _this.dayEl, className: _this.getClassNames(_this.props.day), onKeyDown: _this.handleOnKeyDown, onClick: _this.handleClick, onMouseEnter: !_this.props.usePointerEvent ? _this.handleMouseEnter : void 0, onPointerEnter: _this.props.usePointerEvent ? _this.handleMouseEnter : void 0, tabIndex: _this.getTabIndex(), "aria-label": _this.getAriaLabel(), role: "option", title: _this.getTitle(), "aria-disabled": _this.isDisabled(), "aria-current": _this.isCurrentDay() ? "date" : void 0, "aria-selected": _this.isSelected() || _this.isInRange() },
            _this.renderDayContents(),
            _this.getTitle() !== "" && import_react4.default.createElement("span", { className: "overlay" }, _this.getTitle())
          )
        );
      };
      return _this;
    }
    Day2.prototype.componentDidMount = function() {
      this.handleFocusDay();
    };
    Day2.prototype.componentDidUpdate = function() {
      this.handleFocusDay();
    };
    Day2.prototype.shouldFocusDay = function() {
      var shouldFocusDay = false;
      if (this.getTabIndex() === 0 && this.isSameDay(this.props.preSelection)) {
        if (!document.activeElement || document.activeElement === document.body) {
          shouldFocusDay = true;
        }
        if (this.props.inline && !this.props.shouldFocusDayInline) {
          shouldFocusDay = false;
        }
        if (this.isDayActiveElement()) {
          shouldFocusDay = true;
        }
        if (this.isDuplicateDay()) {
          shouldFocusDay = false;
        }
      }
      return shouldFocusDay;
    };
    Day2.prototype.isDayActiveElement = function() {
      var _a2, _b, _c;
      return ((_b = (_a2 = this.props.containerRef) === null || _a2 === void 0 ? void 0 : _a2.current) === null || _b === void 0 ? void 0 : _b.contains(document.activeElement)) && ((_c = document.activeElement) === null || _c === void 0 ? void 0 : _c.classList.contains("react-datepicker__day"));
    };
    Day2.prototype.isDuplicateDay = function() {
      return (
        //day is one of the non rendered duplicate days
        this.props.monthShowsDuplicateDaysEnd && this.isAfterMonth() || this.props.monthShowsDuplicateDaysStart && this.isBeforeMonth()
      );
    };
    return Day2;
  }(import_react4.Component)
);
var WeekNumber = (
  /** @class */
  function(_super) {
    __extends(WeekNumber2, _super);
    function WeekNumber2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.weekNumberEl = (0, import_react4.createRef)();
      _this.handleClick = function(event) {
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
      };
      _this.handleOnKeyDown = function(event) {
        var _a2, _b;
        var eventKey = event.key;
        if (eventKey === KeyType.Space) {
          event.preventDefault();
          event.key = KeyType.Enter;
        }
        (_b = (_a2 = _this.props).handleOnKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
      };
      _this.isKeyboardSelected = function() {
        return !_this.props.disabledKeyboardNavigation && !isSameDay2(_this.props.date, _this.props.selected) && isSameDay2(_this.props.date, _this.props.preSelection);
      };
      _this.getTabIndex = function() {
        return _this.props.showWeekPicker && _this.props.showWeekNumber && (_this.isKeyboardSelected() || isSameDay2(_this.props.date, _this.props.selected) && isSameDay2(_this.props.preSelection, _this.props.selected)) ? 0 : -1;
      };
      _this.handleFocusWeekNumber = function(prevProps) {
        var shouldFocusWeekNumber = false;
        if (_this.getTabIndex() === 0 && !(prevProps === null || prevProps === void 0 ? void 0 : prevProps.isInputFocused) && isSameDay2(_this.props.date, _this.props.preSelection)) {
          if (!document.activeElement || document.activeElement === document.body) {
            shouldFocusWeekNumber = true;
          }
          if (_this.props.inline && !_this.props.shouldFocusDayInline) {
            shouldFocusWeekNumber = false;
          }
          if (_this.props.containerRef && _this.props.containerRef.current && _this.props.containerRef.current.contains(document.activeElement) && document.activeElement && document.activeElement.classList.contains("react-datepicker__week-number")) {
            shouldFocusWeekNumber = true;
          }
        }
        shouldFocusWeekNumber && _this.weekNumberEl.current && _this.weekNumberEl.current.focus({ preventScroll: true });
      };
      return _this;
    }
    Object.defineProperty(WeekNumber2, "defaultProps", {
      get: function() {
        return {
          ariaLabelPrefix: "week "
        };
      },
      enumerable: false,
      configurable: true
    });
    WeekNumber2.prototype.componentDidMount = function() {
      this.handleFocusWeekNumber();
    };
    WeekNumber2.prototype.componentDidUpdate = function(prevProps) {
      this.handleFocusWeekNumber(prevProps);
    };
    WeekNumber2.prototype.render = function() {
      var _a2 = this.props, weekNumber = _a2.weekNumber, _b = _a2.ariaLabelPrefix, ariaLabelPrefix = _b === void 0 ? WeekNumber2.defaultProps.ariaLabelPrefix : _b, onClick = _a2.onClick;
      var weekNumberClasses = {
        "react-datepicker__week-number": true,
        "react-datepicker__week-number--clickable": !!onClick,
        "react-datepicker__week-number--selected": !!onClick && isSameDay2(this.props.date, this.props.selected),
        "react-datepicker__week-number--keyboard-selected": this.isKeyboardSelected()
      };
      return import_react4.default.createElement("div", { ref: this.weekNumberEl, className: clsx(weekNumberClasses), "aria-label": "".concat(ariaLabelPrefix, " ").concat(this.props.weekNumber), onClick: this.handleClick, onKeyDown: this.handleOnKeyDown, tabIndex: this.getTabIndex() }, weekNumber);
    };
    return WeekNumber2;
  }(import_react4.Component)
);
var Week = (
  /** @class */
  function(_super) {
    __extends(Week2, _super);
    function Week2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.isDisabled = function(day) {
        return isDayDisabled(day, {
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          excludeDateIntervals: _this.props.excludeDateIntervals,
          includeDateIntervals: _this.props.includeDateIntervals,
          includeDates: _this.props.includeDates,
          filterDate: _this.props.filterDate
        });
      };
      _this.handleDayClick = function(day, event) {
        if (_this.props.onDayClick) {
          _this.props.onDayClick(day, event);
        }
      };
      _this.handleDayMouseEnter = function(day) {
        if (_this.props.onDayMouseEnter) {
          _this.props.onDayMouseEnter(day);
        }
      };
      _this.handleWeekClick = function(day, weekNumber, event) {
        var _a2, _b, _c;
        var enabledWeekDay = new Date(day);
        for (var i = 0; i < 7; i++) {
          var processingDay = new Date(day);
          processingDay.setDate(processingDay.getDate() + i);
          var isEnabled = !_this.isDisabled(processingDay);
          if (isEnabled) {
            enabledWeekDay = processingDay;
            break;
          }
        }
        if (typeof _this.props.onWeekSelect === "function") {
          _this.props.onWeekSelect(enabledWeekDay, weekNumber, event);
        }
        if (_this.props.showWeekPicker) {
          _this.handleDayClick(enabledWeekDay, event);
        }
        if ((_a2 = _this.props.shouldCloseOnSelect) !== null && _a2 !== void 0 ? _a2 : Week2.defaultProps.shouldCloseOnSelect) {
          (_c = (_b = _this.props).setOpen) === null || _c === void 0 ? void 0 : _c.call(_b, false);
        }
      };
      _this.formatWeekNumber = function(date) {
        if (_this.props.formatWeekNumber) {
          return _this.props.formatWeekNumber(date);
        }
        return getWeek2(date);
      };
      _this.renderDays = function() {
        var startOfWeek2 = _this.startOfWeek();
        var days = [];
        var weekNumber = _this.formatWeekNumber(startOfWeek2);
        if (_this.props.showWeekNumber) {
          var onClickAction = _this.props.onWeekSelect || _this.props.showWeekPicker ? _this.handleWeekClick.bind(_this, startOfWeek2, weekNumber) : void 0;
          days.push(import_react4.default.createElement(WeekNumber, _assign({ key: "W" }, Week2.defaultProps, _this.props, { weekNumber, date: startOfWeek2, onClick: onClickAction })));
        }
        return days.concat([0, 1, 2, 3, 4, 5, 6].map(function(offset4) {
          var day = addDays(startOfWeek2, offset4);
          return import_react4.default.createElement(Day, _assign({}, Week2.defaultProps, _this.props, { ariaLabelPrefixWhenEnabled: _this.props.chooseDayAriaLabelPrefix, ariaLabelPrefixWhenDisabled: _this.props.disabledDayAriaLabelPrefix, key: day.valueOf(), day, onClick: _this.handleDayClick.bind(_this, day), onMouseEnter: _this.handleDayMouseEnter.bind(_this, day) }));
        }));
      };
      _this.startOfWeek = function() {
        return getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay);
      };
      _this.isKeyboardSelected = function() {
        return !_this.props.disabledKeyboardNavigation && !isSameDay2(_this.startOfWeek(), _this.props.selected) && isSameDay2(_this.startOfWeek(), _this.props.preSelection);
      };
      return _this;
    }
    Object.defineProperty(Week2, "defaultProps", {
      get: function() {
        return {
          shouldCloseOnSelect: true
        };
      },
      enumerable: false,
      configurable: true
    });
    Week2.prototype.render = function() {
      var weekNumberClasses = {
        "react-datepicker__week": true,
        "react-datepicker__week--selected": isSameDay2(this.startOfWeek(), this.props.selected),
        "react-datepicker__week--keyboard-selected": this.isKeyboardSelected()
      };
      return import_react4.default.createElement("div", { className: clsx(weekNumberClasses) }, this.renderDays());
    };
    return Week2;
  }(import_react4.Component)
);
var _a;
var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;
var MONTH_COLUMNS_LAYOUT = {
  TWO_COLUMNS: "two_columns",
  THREE_COLUMNS: "three_columns",
  FOUR_COLUMNS: "four_columns"
};
var MONTH_COLUMNS = (_a = {}, _a[MONTH_COLUMNS_LAYOUT.TWO_COLUMNS] = {
  grid: [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
    [10, 11]
  ],
  verticalNavigationOffset: 2
}, _a[MONTH_COLUMNS_LAYOUT.THREE_COLUMNS] = {
  grid: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11]
  ],
  verticalNavigationOffset: 3
}, _a[MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS] = {
  grid: [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11]
  ],
  verticalNavigationOffset: 4
}, _a);
var MONTH_NAVIGATION_HORIZONTAL_OFFSET = 1;
function getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker) {
  if (showFourColumnMonthYearPicker) {
    return MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS;
  }
  if (showTwoColumnMonthYearPicker) {
    return MONTH_COLUMNS_LAYOUT.TWO_COLUMNS;
  }
  return MONTH_COLUMNS_LAYOUT.THREE_COLUMNS;
}
var Month = (
  /** @class */
  function(_super) {
    __extends(Month2, _super);
    function Month2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.MONTH_REFS = __spreadArray([], Array(12), true).map(function() {
        return (0, import_react4.createRef)();
      });
      _this.QUARTER_REFS = __spreadArray([], Array(4), true).map(function() {
        return (0, import_react4.createRef)();
      });
      _this.isDisabled = function(day) {
        return isDayDisabled(day, {
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          excludeDateIntervals: _this.props.excludeDateIntervals,
          includeDateIntervals: _this.props.includeDateIntervals,
          includeDates: _this.props.includeDates,
          filterDate: _this.props.filterDate
        });
      };
      _this.isExcluded = function(day) {
        return isDayExcluded(day, {
          excludeDates: _this.props.excludeDates,
          excludeDateIntervals: _this.props.excludeDateIntervals
        });
      };
      _this.handleDayClick = function(day, event) {
        var _a2, _b;
        (_b = (_a2 = _this.props).onDayClick) === null || _b === void 0 ? void 0 : _b.call(_a2, day, event, _this.props.orderInDisplay);
      };
      _this.handleDayMouseEnter = function(day) {
        var _a2, _b;
        (_b = (_a2 = _this.props).onDayMouseEnter) === null || _b === void 0 ? void 0 : _b.call(_a2, day);
      };
      _this.handleMouseLeave = function() {
        var _a2, _b;
        (_b = (_a2 = _this.props).onMouseLeave) === null || _b === void 0 ? void 0 : _b.call(_a2);
      };
      _this.isRangeStartMonth = function(m) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameMonth2(setMonth(day, m), startDate);
      };
      _this.isRangeStartQuarter = function(q) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameQuarter2(setQuarter(day, q), startDate);
      };
      _this.isRangeEndMonth = function(m) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameMonth2(setMonth(day, m), endDate);
      };
      _this.isRangeEndQuarter = function(q) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameQuarter2(setQuarter(day, q), endDate);
      };
      _this.isInSelectingRangeMonth = function(m) {
        var _a2;
        var _b = _this.props, day = _b.day, selectsStart = _b.selectsStart, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange, startDate = _b.startDate, endDate = _b.endDate;
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
          return false;
        }
        if (selectsStart && endDate) {
          return isMonthInRange(selectingDate, endDate, m, day);
        }
        if (selectsEnd && startDate) {
          return isMonthInRange(startDate, selectingDate, m, day);
        }
        if (selectsRange && startDate && !endDate) {
          return isMonthInRange(startDate, selectingDate, m, day);
        }
        return false;
      };
      _this.isSelectingMonthRangeStart = function(m) {
        var _a2;
        if (!_this.isInSelectingRangeMonth(m)) {
          return false;
        }
        var _b = _this.props, day = _b.day, startDate = _b.startDate, selectsStart = _b.selectsStart;
        var _month = setMonth(day, m);
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (selectsStart) {
          return isSameMonth2(_month, selectingDate);
        } else {
          return isSameMonth2(_month, startDate);
        }
      };
      _this.isSelectingMonthRangeEnd = function(m) {
        var _a2;
        if (!_this.isInSelectingRangeMonth(m)) {
          return false;
        }
        var _b = _this.props, day = _b.day, endDate = _b.endDate, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange;
        var _month = setMonth(day, m);
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (selectsEnd || selectsRange) {
          return isSameMonth2(_month, selectingDate);
        } else {
          return isSameMonth2(_month, endDate);
        }
      };
      _this.isInSelectingRangeQuarter = function(q) {
        var _a2;
        var _b = _this.props, day = _b.day, selectsStart = _b.selectsStart, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange, startDate = _b.startDate, endDate = _b.endDate;
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
          return false;
        }
        if (selectsStart && endDate) {
          return isQuarterInRange(selectingDate, endDate, q, day);
        }
        if (selectsEnd && startDate) {
          return isQuarterInRange(startDate, selectingDate, q, day);
        }
        if (selectsRange && startDate && !endDate) {
          return isQuarterInRange(startDate, selectingDate, q, day);
        }
        return false;
      };
      _this.isWeekInMonth = function(startOfWeek2) {
        var day = _this.props.day;
        var endOfWeek2 = addDays(startOfWeek2, 6);
        return isSameMonth2(startOfWeek2, day) || isSameMonth2(endOfWeek2, day);
      };
      _this.isCurrentMonth = function(day, m) {
        return getYear(day) === getYear(newDate()) && m === getMonth(newDate());
      };
      _this.isCurrentQuarter = function(day, q) {
        return getYear(day) === getYear(newDate()) && q === getQuarter(newDate());
      };
      _this.isSelectedMonth = function(day, m, selected) {
        return getMonth(selected) === m && getYear(day) === getYear(selected);
      };
      _this.isSelectedQuarter = function(day, q, selected) {
        return getQuarter(day) === q && getYear(day) === getYear(selected);
      };
      _this.renderWeeks = function() {
        var weeks = [];
        var isFixedHeight = _this.props.fixedHeight;
        var i = 0;
        var breakAfterNextPush = false;
        var currentWeekStart = getStartOfWeek(getStartOfMonth(_this.props.day), _this.props.locale, _this.props.calendarStartDay);
        var isPreSelected = function(preSelection2) {
          return _this.props.showWeekPicker ? getStartOfWeek(preSelection2, _this.props.locale, _this.props.calendarStartDay) : _this.props.preSelection;
        };
        var isSelected = function(selected2) {
          return _this.props.showWeekPicker ? getStartOfWeek(selected2, _this.props.locale, _this.props.calendarStartDay) : _this.props.selected;
        };
        var selected = _this.props.selected ? isSelected(_this.props.selected) : void 0;
        var preSelection = _this.props.preSelection ? isPreSelected(_this.props.preSelection) : void 0;
        while (true) {
          weeks.push(import_react4.default.createElement(Week, _assign({}, _this.props, { ariaLabelPrefix: _this.props.weekAriaLabelPrefix, key: i, day: currentWeekStart, month: getMonth(_this.props.day), onDayClick: _this.handleDayClick, onDayMouseEnter: _this.handleDayMouseEnter, selected, preSelection, showWeekNumber: _this.props.showWeekNumbers })));
          if (breakAfterNextPush)
            break;
          i++;
          currentWeekStart = addWeeks(currentWeekStart, 1);
          var isFixedAndFinalWeek = isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
          var isNonFixedAndOutOfMonth = !isFixedHeight && !_this.isWeekInMonth(currentWeekStart);
          if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
            if (_this.props.peekNextMonth) {
              breakAfterNextPush = true;
            } else {
              break;
            }
          }
        }
        return weeks;
      };
      _this.onMonthClick = function(event, m) {
        var _a2 = _this.isMonthDisabledForLabelDate(m), isDisabled2 = _a2.isDisabled, labelDate = _a2.labelDate;
        if (isDisabled2) {
          return;
        }
        _this.handleDayClick(getStartOfMonth(labelDate), event);
      };
      _this.onMonthMouseEnter = function(m) {
        var _a2 = _this.isMonthDisabledForLabelDate(m), isDisabled2 = _a2.isDisabled, labelDate = _a2.labelDate;
        if (isDisabled2) {
          return;
        }
        _this.handleDayMouseEnter(getStartOfMonth(labelDate));
      };
      _this.handleMonthNavigation = function(newMonth, newDate2) {
        var _a2, _b, _c, _d;
        (_b = (_a2 = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a2, newDate2);
        (_d = (_c = _this.MONTH_REFS[newMonth]) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.focus();
      };
      _this.handleKeyboardNavigation = function(event, eventKey, month) {
        var _a2;
        var _b = _this.props, selected = _b.selected, preSelection = _b.preSelection, setPreSelection = _b.setPreSelection, minDate = _b.minDate, maxDate = _b.maxDate, showFourColumnMonthYearPicker = _b.showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker = _b.showTwoColumnMonthYearPicker;
        if (!preSelection)
          return;
        var monthColumnsLayout = getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker);
        var verticalOffset = _this.getVerticalOffset(monthColumnsLayout);
        var monthsGrid = (_a2 = MONTH_COLUMNS[monthColumnsLayout]) === null || _a2 === void 0 ? void 0 : _a2.grid;
        var calculateNewDateAndMonth = function(eventKey2, date, month2) {
          var _a3, _b2;
          var newCalculatedDate2 = date;
          var newCalculatedMonth2 = month2;
          switch (eventKey2) {
            case KeyType.ArrowRight:
              newCalculatedDate2 = addMonths(date, MONTH_NAVIGATION_HORIZONTAL_OFFSET);
              newCalculatedMonth2 = month2 === 11 ? 0 : month2 + MONTH_NAVIGATION_HORIZONTAL_OFFSET;
              break;
            case KeyType.ArrowLeft:
              newCalculatedDate2 = subMonths(date, MONTH_NAVIGATION_HORIZONTAL_OFFSET);
              newCalculatedMonth2 = month2 === 0 ? 11 : month2 - MONTH_NAVIGATION_HORIZONTAL_OFFSET;
              break;
            case KeyType.ArrowUp:
              newCalculatedDate2 = subMonths(date, verticalOffset);
              newCalculatedMonth2 = ((_a3 = monthsGrid === null || monthsGrid === void 0 ? void 0 : monthsGrid[0]) === null || _a3 === void 0 ? void 0 : _a3.includes(month2)) ? month2 + 12 - verticalOffset : month2 - verticalOffset;
              break;
            case KeyType.ArrowDown:
              newCalculatedDate2 = addMonths(date, verticalOffset);
              newCalculatedMonth2 = ((_b2 = monthsGrid === null || monthsGrid === void 0 ? void 0 : monthsGrid[monthsGrid.length - 1]) === null || _b2 === void 0 ? void 0 : _b2.includes(month2)) ? month2 - 12 + verticalOffset : month2 + verticalOffset;
              break;
          }
          return { newCalculatedDate: newCalculatedDate2, newCalculatedMonth: newCalculatedMonth2 };
        };
        var getNewDateAndMonth = function(eventKey2, selectedDate, month2) {
          var MAX_ITERATIONS = 40;
          var eventKeyCopy = eventKey2;
          var validDateFound = false;
          var iterations = 0;
          var _a3 = calculateNewDateAndMonth(eventKeyCopy, selectedDate, month2), newCalculatedDate2 = _a3.newCalculatedDate, newCalculatedMonth2 = _a3.newCalculatedMonth;
          while (!validDateFound) {
            if (iterations >= MAX_ITERATIONS) {
              newCalculatedDate2 = selectedDate;
              newCalculatedMonth2 = month2;
              break;
            }
            if (minDate && newCalculatedDate2 < minDate) {
              eventKeyCopy = KeyType.ArrowRight;
              var obj = calculateNewDateAndMonth(eventKeyCopy, newCalculatedDate2, newCalculatedMonth2);
              newCalculatedDate2 = obj.newCalculatedDate;
              newCalculatedMonth2 = obj.newCalculatedMonth;
            }
            if (maxDate && newCalculatedDate2 > maxDate) {
              eventKeyCopy = KeyType.ArrowLeft;
              var obj = calculateNewDateAndMonth(eventKeyCopy, newCalculatedDate2, newCalculatedMonth2);
              newCalculatedDate2 = obj.newCalculatedDate;
              newCalculatedMonth2 = obj.newCalculatedMonth;
            }
            if (isMonthYearDisabled(newCalculatedDate2, _this.props)) {
              var obj = calculateNewDateAndMonth(eventKeyCopy, newCalculatedDate2, newCalculatedMonth2);
              newCalculatedDate2 = obj.newCalculatedDate;
              newCalculatedMonth2 = obj.newCalculatedMonth;
            } else {
              validDateFound = true;
            }
            iterations++;
          }
          return { newCalculatedDate: newCalculatedDate2, newCalculatedMonth: newCalculatedMonth2 };
        };
        if (eventKey === KeyType.Enter) {
          if (!_this.isMonthDisabled(month)) {
            _this.onMonthClick(event, month);
            setPreSelection === null || setPreSelection === void 0 ? void 0 : setPreSelection(selected);
          }
          return;
        }
        var _c = getNewDateAndMonth(eventKey, preSelection, month), newCalculatedDate = _c.newCalculatedDate, newCalculatedMonth = _c.newCalculatedMonth;
        switch (eventKey) {
          case KeyType.ArrowRight:
          case KeyType.ArrowLeft:
          case KeyType.ArrowUp:
          case KeyType.ArrowDown:
            _this.handleMonthNavigation(newCalculatedMonth, newCalculatedDate);
            break;
        }
      };
      _this.getVerticalOffset = function(monthColumnsLayout) {
        var _a2, _b;
        return (_b = (_a2 = MONTH_COLUMNS[monthColumnsLayout]) === null || _a2 === void 0 ? void 0 : _a2.verticalNavigationOffset) !== null && _b !== void 0 ? _b : 0;
      };
      _this.onMonthKeyDown = function(event, month) {
        var _a2 = _this.props, disabledKeyboardNavigation = _a2.disabledKeyboardNavigation, handleOnMonthKeyDown = _a2.handleOnMonthKeyDown;
        var eventKey = event.key;
        if (eventKey !== KeyType.Tab) {
          event.preventDefault();
        }
        if (!disabledKeyboardNavigation) {
          _this.handleKeyboardNavigation(event, eventKey, month);
        }
        handleOnMonthKeyDown && handleOnMonthKeyDown(event);
      };
      _this.onQuarterClick = function(event, q) {
        var labelDate = setQuarter(_this.props.day, q);
        if (isQuarterDisabled(labelDate, _this.props)) {
          return;
        }
        _this.handleDayClick(getStartOfQuarter(labelDate), event);
      };
      _this.onQuarterMouseEnter = function(q) {
        var labelDate = setQuarter(_this.props.day, q);
        if (isQuarterDisabled(labelDate, _this.props)) {
          return;
        }
        _this.handleDayMouseEnter(getStartOfQuarter(labelDate));
      };
      _this.handleQuarterNavigation = function(newQuarter, newDate2) {
        var _a2, _b, _c, _d;
        if (_this.isDisabled(newDate2) || _this.isExcluded(newDate2)) {
          return;
        }
        (_b = (_a2 = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a2, newDate2);
        (_d = (_c = _this.QUARTER_REFS[newQuarter - 1]) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.focus();
      };
      _this.onQuarterKeyDown = function(event, quarter) {
        var _a2, _b;
        var eventKey = event.key;
        if (!_this.props.disabledKeyboardNavigation) {
          switch (eventKey) {
            case KeyType.Enter:
              _this.onQuarterClick(event, quarter);
              (_b = (_a2 = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a2, _this.props.selected);
              break;
            case KeyType.ArrowRight:
              if (!_this.props.preSelection) {
                break;
              }
              _this.handleQuarterNavigation(quarter === 4 ? 1 : quarter + 1, addQuarters(_this.props.preSelection, 1));
              break;
            case KeyType.ArrowLeft:
              if (!_this.props.preSelection) {
                break;
              }
              _this.handleQuarterNavigation(quarter === 1 ? 4 : quarter - 1, subQuarters(_this.props.preSelection, 1));
              break;
          }
        }
      };
      _this.isMonthDisabledForLabelDate = function(month) {
        var _a2;
        var _b = _this.props, day = _b.day, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates;
        var labelDate = setMonth(day, month);
        return {
          isDisabled: (_a2 = (minDate || maxDate || excludeDates || includeDates) && isMonthDisabled(labelDate, _this.props)) !== null && _a2 !== void 0 ? _a2 : false,
          labelDate
        };
      };
      _this.isMonthDisabled = function(month) {
        var isDisabled2 = _this.isMonthDisabledForLabelDate(month).isDisabled;
        return isDisabled2;
      };
      _this.getMonthClassNames = function(m) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate, selected = _a2.selected, preSelection = _a2.preSelection, monthClassName = _a2.monthClassName;
        var _monthClassName = monthClassName ? monthClassName(setMonth(day, m)) : void 0;
        return clsx("react-datepicker__month-text", "react-datepicker__month-".concat(m), _monthClassName, {
          "react-datepicker__month-text--disabled": _this.isMonthDisabled(m),
          "react-datepicker__month-text--selected": selected ? _this.isSelectedMonth(day, m, selected) : void 0,
          "react-datepicker__month-text--keyboard-selected": !_this.props.disabledKeyboardNavigation && preSelection && _this.isSelectedMonth(day, m, preSelection),
          "react-datepicker__month-text--in-selecting-range": _this.isInSelectingRangeMonth(m),
          "react-datepicker__month-text--in-range": startDate && endDate ? isMonthInRange(startDate, endDate, m, day) : void 0,
          "react-datepicker__month-text--range-start": _this.isRangeStartMonth(m),
          "react-datepicker__month-text--range-end": _this.isRangeEndMonth(m),
          "react-datepicker__month-text--selecting-range-start": _this.isSelectingMonthRangeStart(m),
          "react-datepicker__month-text--selecting-range-end": _this.isSelectingMonthRangeEnd(m),
          "react-datepicker__month-text--today": _this.isCurrentMonth(day, m)
        });
      };
      _this.getTabIndex = function(m) {
        if (_this.props.preSelection == null) {
          return "-1";
        }
        var preSelectedMonth = getMonth(_this.props.preSelection);
        var tabIndex = !_this.props.disabledKeyboardNavigation && m === preSelectedMonth ? "0" : "-1";
        return tabIndex;
      };
      _this.getQuarterTabIndex = function(q) {
        if (_this.props.preSelection == null) {
          return "-1";
        }
        var preSelectedQuarter = getQuarter(_this.props.preSelection);
        var tabIndex = !_this.props.disabledKeyboardNavigation && q === preSelectedQuarter ? "0" : "-1";
        return tabIndex;
      };
      _this.getAriaLabel = function(month) {
        var _a2 = _this.props, _b = _a2.chooseDayAriaLabelPrefix, chooseDayAriaLabelPrefix = _b === void 0 ? "Choose" : _b, _c = _a2.disabledDayAriaLabelPrefix, disabledDayAriaLabelPrefix = _c === void 0 ? "Not available" : _c, day = _a2.day, locale = _a2.locale;
        var labelDate = setMonth(day, month);
        var prefix = _this.isDisabled(labelDate) || _this.isExcluded(labelDate) ? disabledDayAriaLabelPrefix : chooseDayAriaLabelPrefix;
        return "".concat(prefix, " ").concat(formatDate(labelDate, "MMMM yyyy", locale));
      };
      _this.getQuarterClassNames = function(q) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate, selected = _a2.selected, minDate = _a2.minDate, maxDate = _a2.maxDate, preSelection = _a2.preSelection, disabledKeyboardNavigation = _a2.disabledKeyboardNavigation;
        return clsx("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(q), {
          "react-datepicker__quarter-text--disabled": (minDate || maxDate) && isQuarterDisabled(setQuarter(day, q), _this.props),
          "react-datepicker__quarter-text--selected": selected ? _this.isSelectedQuarter(day, q, selected) : void 0,
          "react-datepicker__quarter-text--keyboard-selected": !disabledKeyboardNavigation && preSelection && _this.isSelectedQuarter(day, q, preSelection),
          "react-datepicker__quarter-text--in-selecting-range": _this.isInSelectingRangeQuarter(q),
          "react-datepicker__quarter-text--in-range": startDate && endDate ? isQuarterInRange(startDate, endDate, q, day) : void 0,
          "react-datepicker__quarter-text--range-start": _this.isRangeStartQuarter(q),
          "react-datepicker__quarter-text--range-end": _this.isRangeEndQuarter(q)
        });
      };
      _this.getMonthContent = function(m) {
        var _a2 = _this.props, showFullMonthYearPicker = _a2.showFullMonthYearPicker, renderMonthContent = _a2.renderMonthContent, locale = _a2.locale, day = _a2.day;
        var shortMonthText = getMonthShortInLocale(m, locale);
        var fullMonthText = getMonthInLocale(m, locale);
        if (renderMonthContent) {
          return renderMonthContent(m, shortMonthText, fullMonthText, day);
        }
        return showFullMonthYearPicker ? fullMonthText : shortMonthText;
      };
      _this.getQuarterContent = function(q) {
        var _a2;
        var _b = _this.props, renderQuarterContent = _b.renderQuarterContent, locale = _b.locale;
        var shortQuarter = getQuarterShortInLocale(q, locale);
        return (_a2 = renderQuarterContent === null || renderQuarterContent === void 0 ? void 0 : renderQuarterContent(q, shortQuarter)) !== null && _a2 !== void 0 ? _a2 : shortQuarter;
      };
      _this.renderMonths = function() {
        var _a2;
        var _b = _this.props, showTwoColumnMonthYearPicker = _b.showTwoColumnMonthYearPicker, showFourColumnMonthYearPicker = _b.showFourColumnMonthYearPicker, day = _b.day, selected = _b.selected;
        var monthColumns = (_a2 = MONTH_COLUMNS[getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker)]) === null || _a2 === void 0 ? void 0 : _a2.grid;
        return monthColumns === null || monthColumns === void 0 ? void 0 : monthColumns.map(function(month, i) {
          return import_react4.default.createElement("div", { className: "react-datepicker__month-wrapper", key: i }, month.map(function(m, j) {
            return import_react4.default.createElement("div", { ref: _this.MONTH_REFS[m], key: j, onClick: function(event) {
              _this.onMonthClick(event, m);
            }, onKeyDown: function(event) {
              if (isSpaceKeyDown(event)) {
                event.preventDefault();
                event.key = KeyType.Enter;
              }
              _this.onMonthKeyDown(event, m);
            }, onMouseEnter: !_this.props.usePointerEvent ? function() {
              return _this.onMonthMouseEnter(m);
            } : void 0, onPointerEnter: _this.props.usePointerEvent ? function() {
              return _this.onMonthMouseEnter(m);
            } : void 0, tabIndex: Number(_this.getTabIndex(m)), className: _this.getMonthClassNames(m), "aria-disabled": _this.isMonthDisabled(m), role: "option", "aria-label": _this.getAriaLabel(m), "aria-current": _this.isCurrentMonth(day, m) ? "date" : void 0, "aria-selected": selected ? _this.isSelectedMonth(day, m, selected) : void 0 }, _this.getMonthContent(m));
          }));
        });
      };
      _this.renderQuarters = function() {
        var _a2 = _this.props, day = _a2.day, selected = _a2.selected;
        var quarters = [1, 2, 3, 4];
        return import_react4.default.createElement("div", { className: "react-datepicker__quarter-wrapper" }, quarters.map(function(q, j) {
          return import_react4.default.createElement("div", { key: j, ref: _this.QUARTER_REFS[j], role: "option", onClick: function(event) {
            _this.onQuarterClick(event, q);
          }, onKeyDown: function(event) {
            _this.onQuarterKeyDown(event, q);
          }, onMouseEnter: !_this.props.usePointerEvent ? function() {
            return _this.onQuarterMouseEnter(q);
          } : void 0, onPointerEnter: _this.props.usePointerEvent ? function() {
            return _this.onQuarterMouseEnter(q);
          } : void 0, className: _this.getQuarterClassNames(q), "aria-selected": selected ? _this.isSelectedQuarter(day, q, selected) : void 0, tabIndex: Number(_this.getQuarterTabIndex(q)), "aria-current": _this.isCurrentQuarter(day, q) ? "date" : void 0 }, _this.getQuarterContent(q));
        }));
      };
      _this.getClassNames = function() {
        var _a2 = _this.props, selectingDate = _a2.selectingDate, selectsStart = _a2.selectsStart, selectsEnd = _a2.selectsEnd, showMonthYearPicker = _a2.showMonthYearPicker, showQuarterYearPicker = _a2.showQuarterYearPicker, showWeekPicker = _a2.showWeekPicker;
        return clsx("react-datepicker__month", {
          "react-datepicker__month--selecting-range": selectingDate && (selectsStart || selectsEnd)
        }, { "react-datepicker__monthPicker": showMonthYearPicker }, { "react-datepicker__quarterPicker": showQuarterYearPicker }, { "react-datepicker__weekPicker": showWeekPicker });
      };
      return _this;
    }
    Month2.prototype.render = function() {
      var _a2 = this.props, showMonthYearPicker = _a2.showMonthYearPicker, showQuarterYearPicker = _a2.showQuarterYearPicker, day = _a2.day, _b = _a2.ariaLabelPrefix, ariaLabelPrefix = _b === void 0 ? "Month " : _b;
      var formattedAriaLabelPrefix = ariaLabelPrefix ? ariaLabelPrefix.trim() + " " : "";
      return import_react4.default.createElement("div", { className: this.getClassNames(), onMouseLeave: !this.props.usePointerEvent ? this.handleMouseLeave : void 0, onPointerLeave: this.props.usePointerEvent ? this.handleMouseLeave : void 0, "aria-label": "".concat(formattedAriaLabelPrefix).concat(formatDate(day, "MMMM, yyyy", this.props.locale)), role: "listbox" }, showMonthYearPicker ? this.renderMonths() : showQuarterYearPicker ? this.renderQuarters() : this.renderWeeks());
    };
    return Month2;
  }(import_react4.Component)
);
var MonthDropdownOptions = (
  /** @class */
  function(_super) {
    __extends(MonthDropdownOptions2, _super);
    function MonthDropdownOptions2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.isSelectedMonth = function(i) {
        return _this.props.month === i;
      };
      _this.renderOptions = function() {
        return _this.props.monthNames.map(function(month, i) {
          return import_react4.default.createElement(
            "div",
            { className: _this.isSelectedMonth(i) ? "react-datepicker__month-option react-datepicker__month-option--selected_month" : "react-datepicker__month-option", key: month, onClick: _this.onChange.bind(_this, i), "aria-selected": _this.isSelectedMonth(i) ? "true" : void 0 },
            _this.isSelectedMonth(i) ? import_react4.default.createElement("span", { className: "react-datepicker__month-option--selected" }, "✓") : "",
            month
          );
        });
      };
      _this.onChange = function(month) {
        return _this.props.onChange(month);
      };
      _this.handleClickOutside = function() {
        return _this.props.onCancel();
      };
      return _this;
    }
    MonthDropdownOptions2.prototype.render = function() {
      return import_react4.default.createElement("div", { className: "react-datepicker__month-dropdown" }, this.renderOptions());
    };
    return MonthDropdownOptions2;
  }(import_react4.Component)
);
var WrappedMonthDropdownOptions = react_onclickoutside_es_default(MonthDropdownOptions);
var MonthDropdown = (
  /** @class */
  function(_super) {
    __extends(MonthDropdown2, _super);
    function MonthDropdown2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.state = {
        dropdownVisible: false
      };
      _this.renderSelectOptions = function(monthNames) {
        return monthNames.map(function(m, i) {
          return import_react4.default.createElement("option", { key: m, value: i }, m);
        });
      };
      _this.renderSelectMode = function(monthNames) {
        return import_react4.default.createElement("select", { value: _this.props.month, className: "react-datepicker__month-select", onChange: function(e) {
          return _this.onChange(parseInt(e.target.value));
        } }, _this.renderSelectOptions(monthNames));
      };
      _this.renderReadView = function(visible, monthNames) {
        return import_react4.default.createElement(
          "div",
          { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__month-read-view", onClick: _this.toggleDropdown },
          import_react4.default.createElement("span", { className: "react-datepicker__month-read-view--down-arrow" }),
          import_react4.default.createElement("span", { className: "react-datepicker__month-read-view--selected-month" }, monthNames[_this.props.month])
        );
      };
      _this.renderDropdown = function(monthNames) {
        return import_react4.default.createElement(WrappedMonthDropdownOptions, _assign({ key: "dropdown" }, _this.props, { monthNames, onChange: _this.onChange, onCancel: _this.toggleDropdown }));
      };
      _this.renderScrollMode = function(monthNames) {
        var dropdownVisible = _this.state.dropdownVisible;
        var result = [_this.renderReadView(!dropdownVisible, monthNames)];
        if (dropdownVisible) {
          result.unshift(_this.renderDropdown(monthNames));
        }
        return result;
      };
      _this.onChange = function(month) {
        _this.toggleDropdown();
        if (month !== _this.props.month) {
          _this.props.onChange(month);
        }
      };
      _this.toggleDropdown = function() {
        return _this.setState({
          dropdownVisible: !_this.state.dropdownVisible
        });
      };
      return _this;
    }
    MonthDropdown2.prototype.render = function() {
      var _this = this;
      var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(this.props.useShortMonthInDropdown ? function(m) {
        return getMonthShortInLocale(m, _this.props.locale);
      } : function(m) {
        return getMonthInLocale(m, _this.props.locale);
      });
      var renderedDropdown;
      switch (this.props.dropdownMode) {
        case "scroll":
          renderedDropdown = this.renderScrollMode(monthNames);
          break;
        case "select":
          renderedDropdown = this.renderSelectMode(monthNames);
          break;
      }
      return import_react4.default.createElement("div", { className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown);
    };
    return MonthDropdown2;
  }(import_react4.Component)
);
function generateMonthYears(minDate, maxDate) {
  var list = [];
  var currDate = getStartOfMonth(minDate);
  var lastDate = getStartOfMonth(maxDate);
  while (!isAfter(currDate, lastDate)) {
    list.push(newDate(currDate));
    currDate = addMonths(currDate, 1);
  }
  return list;
}
var MonthYearDropdownOptions = (
  /** @class */
  function(_super) {
    __extends(MonthYearDropdownOptions2, _super);
    function MonthYearDropdownOptions2(props) {
      var _this = _super.call(this, props) || this;
      _this.renderOptions = function() {
        return _this.state.monthYearsList.map(function(monthYear) {
          var monthYearPoint = getTime(monthYear);
          var isSameMonthYear = isSameYear2(_this.props.date, monthYear) && isSameMonth2(_this.props.date, monthYear);
          return import_react4.default.createElement(
            "div",
            { className: isSameMonthYear ? "react-datepicker__month-year-option--selected_month-year" : "react-datepicker__month-year-option", key: monthYearPoint, onClick: _this.onChange.bind(_this, monthYearPoint), "aria-selected": isSameMonthYear ? "true" : void 0 },
            isSameMonthYear ? import_react4.default.createElement("span", { className: "react-datepicker__month-year-option--selected" }, "✓") : "",
            formatDate(monthYear, _this.props.dateFormat, _this.props.locale)
          );
        });
      };
      _this.onChange = function(monthYear) {
        return _this.props.onChange(monthYear);
      };
      _this.handleClickOutside = function() {
        _this.props.onCancel();
      };
      _this.state = {
        monthYearsList: generateMonthYears(_this.props.minDate, _this.props.maxDate)
      };
      return _this;
    }
    MonthYearDropdownOptions2.prototype.render = function() {
      var dropdownClass = clsx({
        "react-datepicker__month-year-dropdown": true,
        "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown
      });
      return import_react4.default.createElement("div", { className: dropdownClass }, this.renderOptions());
    };
    return MonthYearDropdownOptions2;
  }(import_react4.Component)
);
var WrappedMonthYearDropdownOptions = react_onclickoutside_es_default(MonthYearDropdownOptions);
var MonthYearDropdown = (
  /** @class */
  function(_super) {
    __extends(MonthYearDropdown2, _super);
    function MonthYearDropdown2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.state = {
        dropdownVisible: false
      };
      _this.renderSelectOptions = function() {
        var currDate = getStartOfMonth(_this.props.minDate);
        var lastDate = getStartOfMonth(_this.props.maxDate);
        var options = [];
        while (!isAfter(currDate, lastDate)) {
          var timePoint = getTime(currDate);
          options.push(import_react4.default.createElement("option", { key: timePoint, value: timePoint }, formatDate(currDate, _this.props.dateFormat, _this.props.locale)));
          currDate = addMonths(currDate, 1);
        }
        return options;
      };
      _this.onSelectChange = function(event) {
        _this.onChange(parseInt(event.target.value));
      };
      _this.renderSelectMode = function() {
        return import_react4.default.createElement("select", { value: getTime(getStartOfMonth(_this.props.date)), className: "react-datepicker__month-year-select", onChange: _this.onSelectChange }, _this.renderSelectOptions());
      };
      _this.renderReadView = function(visible) {
        var yearMonth = formatDate(_this.props.date, _this.props.dateFormat, _this.props.locale);
        return import_react4.default.createElement(
          "div",
          { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__month-year-read-view", onClick: _this.toggleDropdown },
          import_react4.default.createElement("span", { className: "react-datepicker__month-year-read-view--down-arrow" }),
          import_react4.default.createElement("span", { className: "react-datepicker__month-year-read-view--selected-month-year" }, yearMonth)
        );
      };
      _this.renderDropdown = function() {
        return import_react4.default.createElement(WrappedMonthYearDropdownOptions, _assign({ key: "dropdown" }, _this.props, { onChange: _this.onChange, onCancel: _this.toggleDropdown }));
      };
      _this.renderScrollMode = function() {
        var dropdownVisible = _this.state.dropdownVisible;
        var result = [_this.renderReadView(!dropdownVisible)];
        if (dropdownVisible) {
          result.unshift(_this.renderDropdown());
        }
        return result;
      };
      _this.onChange = function(monthYearPoint) {
        _this.toggleDropdown();
        var changedDate = newDate(monthYearPoint);
        if (isSameYear2(_this.props.date, changedDate) && isSameMonth2(_this.props.date, changedDate)) {
          return;
        }
        _this.props.onChange(changedDate);
      };
      _this.toggleDropdown = function() {
        return _this.setState({
          dropdownVisible: !_this.state.dropdownVisible
        });
      };
      return _this;
    }
    MonthYearDropdown2.prototype.render = function() {
      var renderedDropdown;
      switch (this.props.dropdownMode) {
        case "scroll":
          renderedDropdown = this.renderScrollMode();
          break;
        case "select":
          renderedDropdown = this.renderSelectMode();
          break;
      }
      return import_react4.default.createElement("div", { className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown);
    };
    return MonthYearDropdown2;
  }(import_react4.Component)
);
var Time = (
  /** @class */
  function(_super) {
    __extends(Time2, _super);
    function Time2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.state = {
        height: null
      };
      _this.scrollToTheSelectedTime = function() {
        requestAnimationFrame(function() {
          var _a2, _b, _c;
          if (!_this.list)
            return;
          _this.list.scrollTop = (_c = _this.centerLi && Time2.calcCenterPosition(_this.props.monthRef ? _this.props.monthRef.clientHeight - ((_b = (_a2 = _this.header) === null || _a2 === void 0 ? void 0 : _a2.clientHeight) !== null && _b !== void 0 ? _b : 0) : _this.list.clientHeight, _this.centerLi)) !== null && _c !== void 0 ? _c : 0;
        });
      };
      _this.handleClick = function(time) {
        var _a2, _b;
        if ((_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || (_this.props.excludeTimes || _this.props.includeTimes || _this.props.filterTime) && isTimeDisabled(time, _this.props)) {
          return;
        }
        (_b = (_a2 = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a2, time);
      };
      _this.isSelectedTime = function(time) {
        return _this.props.selected && isSameMinute(_this.props.selected, time);
      };
      _this.isDisabledTime = function(time) {
        return (_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || (_this.props.excludeTimes || _this.props.includeTimes || _this.props.filterTime) && isTimeDisabled(time, _this.props);
      };
      _this.liClasses = function(time) {
        var _a2;
        var classes = [
          "react-datepicker__time-list-item",
          _this.props.timeClassName ? _this.props.timeClassName(time) : void 0
        ];
        if (_this.isSelectedTime(time)) {
          classes.push("react-datepicker__time-list-item--selected");
        }
        if (_this.isDisabledTime(time)) {
          classes.push("react-datepicker__time-list-item--disabled");
        }
        if (_this.props.injectTimes && (getHours(time) * 3600 + getMinutes(time) * 60 + getSeconds(time)) % (((_a2 = _this.props.intervals) !== null && _a2 !== void 0 ? _a2 : Time2.defaultProps.intervals) * 60) !== 0) {
          classes.push("react-datepicker__time-list-item--injected");
        }
        return classes.join(" ");
      };
      _this.handleOnKeyDown = function(event, time) {
        var _a2, _b;
        if (event.key === KeyType.Space) {
          event.preventDefault();
          event.key = KeyType.Enter;
        }
        if ((event.key === KeyType.ArrowUp || event.key === KeyType.ArrowLeft) && event.target instanceof HTMLElement && event.target.previousSibling) {
          event.preventDefault();
          event.target.previousSibling instanceof HTMLElement && event.target.previousSibling.focus();
        }
        if ((event.key === KeyType.ArrowDown || event.key === KeyType.ArrowRight) && event.target instanceof HTMLElement && event.target.nextSibling) {
          event.preventDefault();
          event.target.nextSibling instanceof HTMLElement && event.target.nextSibling.focus();
        }
        if (event.key === KeyType.Enter) {
          _this.handleClick(time);
        }
        (_b = (_a2 = _this.props).handleOnKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
      };
      _this.renderTimes = function() {
        var _a2;
        var times = [];
        var format2 = _this.props.format ? _this.props.format : "p";
        var intervals = (_a2 = _this.props.intervals) !== null && _a2 !== void 0 ? _a2 : Time2.defaultProps.intervals;
        var activeDate = _this.props.selected || _this.props.openToDate || newDate();
        var base = getStartOfDay(activeDate);
        var sortedInjectTimes = _this.props.injectTimes && _this.props.injectTimes.sort(function(a, b) {
          return a.getTime() - b.getTime();
        });
        var minutesInDay = 60 * getHoursInDay(activeDate);
        var multiplier = minutesInDay / intervals;
        for (var i = 0; i < multiplier; i++) {
          var currentTime = addMinutes(base, i * intervals);
          times.push(currentTime);
          if (sortedInjectTimes) {
            var timesToInject = timesToInjectAfter(base, currentTime, i, intervals, sortedInjectTimes);
            times = times.concat(timesToInject);
          }
        }
        var timeToFocus = times.reduce(function(prev, time) {
          if (time.getTime() <= activeDate.getTime()) {
            return time;
          }
          return prev;
        }, times[0]);
        return times.map(function(time) {
          return import_react4.default.createElement("li", { key: time.valueOf(), onClick: _this.handleClick.bind(_this, time), className: _this.liClasses(time), ref: function(li) {
            if (time === timeToFocus) {
              _this.centerLi = li;
            }
          }, onKeyDown: function(event) {
            _this.handleOnKeyDown(event, time);
          }, tabIndex: time === timeToFocus ? 0 : -1, role: "option", "aria-selected": _this.isSelectedTime(time) ? "true" : void 0, "aria-disabled": _this.isDisabledTime(time) ? "true" : void 0 }, formatDate(time, format2, _this.props.locale));
        });
      };
      return _this;
    }
    Object.defineProperty(Time2, "defaultProps", {
      get: function() {
        return {
          intervals: 30,
          todayButton: null,
          timeCaption: "Time"
        };
      },
      enumerable: false,
      configurable: true
    });
    Time2.prototype.componentDidMount = function() {
      this.scrollToTheSelectedTime();
      if (this.props.monthRef && this.header) {
        this.setState({
          height: this.props.monthRef.clientHeight - this.header.clientHeight
        });
      }
    };
    Time2.prototype.render = function() {
      var _this = this;
      var _a2;
      var height = this.state.height;
      return import_react4.default.createElement(
        "div",
        { className: "react-datepicker__time-container ".concat(((_a2 = this.props.todayButton) !== null && _a2 !== void 0 ? _a2 : Time2.defaultProps.todayButton) ? "react-datepicker__time-container--with-today-button" : "") },
        import_react4.default.createElement(
          "div",
          { className: "react-datepicker__header react-datepicker__header--time ".concat(this.props.showTimeSelectOnly ? "react-datepicker__header--time--only" : ""), ref: function(header) {
            _this.header = header;
          } },
          import_react4.default.createElement("div", { className: "react-datepicker-time__header" }, this.props.timeCaption)
        ),
        import_react4.default.createElement(
          "div",
          { className: "react-datepicker__time" },
          import_react4.default.createElement(
            "div",
            { className: "react-datepicker__time-box" },
            import_react4.default.createElement("ul", { className: "react-datepicker__time-list", ref: function(list) {
              _this.list = list;
            }, style: height ? { height } : {}, role: "listbox", "aria-label": this.props.timeCaption }, this.renderTimes())
          )
        )
      );
    };
    Time2.calcCenterPosition = function(listHeight, centerLiRef) {
      return centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2);
    };
    return Time2;
  }(import_react4.Component)
);
var VERTICAL_NAVIGATION_OFFSET = 3;
var Year = (
  /** @class */
  function(_super) {
    __extends(Year2, _super);
    function Year2(props) {
      var _this = _super.call(this, props) || this;
      _this.YEAR_REFS = __spreadArray([], Array(_this.props.yearItemNumber), true).map(function() {
        return (0, import_react4.createRef)();
      });
      _this.isDisabled = function(date) {
        return isDayDisabled(date, {
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          includeDates: _this.props.includeDates,
          filterDate: _this.props.filterDate
        });
      };
      _this.isExcluded = function(date) {
        return isDayExcluded(date, {
          excludeDates: _this.props.excludeDates
        });
      };
      _this.selectingDate = function() {
        var _a2;
        return (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
      };
      _this.updateFocusOnPaginate = function(refIndex) {
        var waitForReRender = function() {
          var _a2, _b;
          (_b = (_a2 = _this.YEAR_REFS[refIndex]) === null || _a2 === void 0 ? void 0 : _a2.current) === null || _b === void 0 ? void 0 : _b.focus();
        };
        window.requestAnimationFrame(waitForReRender);
      };
      _this.handleYearClick = function(day, event) {
        if (_this.props.onDayClick) {
          _this.props.onDayClick(day, event);
        }
      };
      _this.handleYearNavigation = function(newYear, newDate2) {
        var _a2, _b, _c, _d;
        var _e = _this.props, date = _e.date, yearItemNumber = _e.yearItemNumber;
        if (date === void 0 || yearItemNumber === void 0) {
          return;
        }
        var startPeriod = getYearsPeriod(date, yearItemNumber).startPeriod;
        if (_this.isDisabled(newDate2) || _this.isExcluded(newDate2)) {
          return;
        }
        (_b = (_a2 = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a2, newDate2);
        if (newYear - startPeriod < 0) {
          _this.updateFocusOnPaginate(yearItemNumber - (startPeriod - newYear));
        } else if (newYear - startPeriod >= yearItemNumber) {
          _this.updateFocusOnPaginate(Math.abs(yearItemNumber - (newYear - startPeriod)));
        } else
          (_d = (_c = _this.YEAR_REFS[newYear - startPeriod]) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.focus();
      };
      _this.isSameDay = function(y, other) {
        return isSameDay2(y, other);
      };
      _this.isCurrentYear = function(y) {
        return y === getYear(newDate());
      };
      _this.isRangeStart = function(y) {
        return _this.props.startDate && _this.props.endDate && isSameYear2(setYear(newDate(), y), _this.props.startDate);
      };
      _this.isRangeEnd = function(y) {
        return _this.props.startDate && _this.props.endDate && isSameYear2(setYear(newDate(), y), _this.props.endDate);
      };
      _this.isInRange = function(y) {
        return isYearInRange(y, _this.props.startDate, _this.props.endDate);
      };
      _this.isInSelectingRange = function(y) {
        var _a2 = _this.props, selectsStart = _a2.selectsStart, selectsEnd = _a2.selectsEnd, selectsRange = _a2.selectsRange, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!(selectsStart || selectsEnd || selectsRange) || !_this.selectingDate()) {
          return false;
        }
        if (selectsStart && endDate) {
          return isYearInRange(y, _this.selectingDate(), endDate);
        }
        if (selectsEnd && startDate) {
          return isYearInRange(y, startDate, _this.selectingDate());
        }
        if (selectsRange && startDate && !endDate) {
          return isYearInRange(y, startDate, _this.selectingDate());
        }
        return false;
      };
      _this.isSelectingRangeStart = function(y) {
        var _a2;
        if (!_this.isInSelectingRange(y)) {
          return false;
        }
        var _b = _this.props, startDate = _b.startDate, selectsStart = _b.selectsStart;
        var _year = setYear(newDate(), y);
        if (selectsStart) {
          return isSameYear2(_year, (_a2 = _this.selectingDate()) !== null && _a2 !== void 0 ? _a2 : null);
        }
        return isSameYear2(_year, startDate !== null && startDate !== void 0 ? startDate : null);
      };
      _this.isSelectingRangeEnd = function(y) {
        var _a2;
        if (!_this.isInSelectingRange(y)) {
          return false;
        }
        var _b = _this.props, endDate = _b.endDate, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange;
        var _year = setYear(newDate(), y);
        if (selectsEnd || selectsRange) {
          return isSameYear2(_year, (_a2 = _this.selectingDate()) !== null && _a2 !== void 0 ? _a2 : null);
        }
        return isSameYear2(_year, endDate !== null && endDate !== void 0 ? endDate : null);
      };
      _this.isKeyboardSelected = function(y) {
        if (_this.props.date === void 0 || _this.props.selected == null || _this.props.preSelection == null) {
          return;
        }
        var date = getStartOfYear(setYear(_this.props.date, y));
        return !_this.props.disabledKeyboardNavigation && !_this.props.inline && !isSameDay2(date, getStartOfYear(_this.props.selected)) && isSameDay2(date, getStartOfYear(_this.props.preSelection));
      };
      _this.onYearClick = function(event, y) {
        var date = _this.props.date;
        if (date === void 0) {
          return;
        }
        _this.handleYearClick(getStartOfYear(setYear(date, y)), event);
      };
      _this.onYearKeyDown = function(event, y) {
        var _a2, _b;
        var key = event.key;
        var _c = _this.props, date = _c.date, yearItemNumber = _c.yearItemNumber, handleOnKeyDown = _c.handleOnKeyDown;
        if (key !== KeyType.Tab) {
          event.preventDefault();
        }
        if (!_this.props.disabledKeyboardNavigation) {
          switch (key) {
            case KeyType.Enter:
              if (_this.props.selected == null) {
                break;
              }
              _this.onYearClick(event, y);
              (_b = (_a2 = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a2, _this.props.selected);
              break;
            case KeyType.ArrowRight:
              if (_this.props.preSelection == null) {
                break;
              }
              _this.handleYearNavigation(y + 1, addYears(_this.props.preSelection, 1));
              break;
            case KeyType.ArrowLeft:
              if (_this.props.preSelection == null) {
                break;
              }
              _this.handleYearNavigation(y - 1, subYears(_this.props.preSelection, 1));
              break;
            case KeyType.ArrowUp: {
              if (date === void 0 || yearItemNumber === void 0 || _this.props.preSelection == null) {
                break;
              }
              var startPeriod = getYearsPeriod(date, yearItemNumber).startPeriod;
              var offset4 = VERTICAL_NAVIGATION_OFFSET;
              var newYear = y - offset4;
              if (newYear < startPeriod) {
                var leftOverOffset = yearItemNumber % offset4;
                if (y >= startPeriod && y < startPeriod + leftOverOffset) {
                  offset4 = leftOverOffset;
                } else {
                  offset4 += leftOverOffset;
                }
                newYear = y - offset4;
              }
              _this.handleYearNavigation(newYear, subYears(_this.props.preSelection, offset4));
              break;
            }
            case KeyType.ArrowDown: {
              if (date === void 0 || yearItemNumber === void 0 || _this.props.preSelection == null) {
                break;
              }
              var endPeriod = getYearsPeriod(date, yearItemNumber).endPeriod;
              var offset4 = VERTICAL_NAVIGATION_OFFSET;
              var newYear = y + offset4;
              if (newYear > endPeriod) {
                var leftOverOffset = yearItemNumber % offset4;
                if (y <= endPeriod && y > endPeriod - leftOverOffset) {
                  offset4 = leftOverOffset;
                } else {
                  offset4 += leftOverOffset;
                }
                newYear = y + offset4;
              }
              _this.handleYearNavigation(newYear, addYears(_this.props.preSelection, offset4));
              break;
            }
          }
        }
        handleOnKeyDown && handleOnKeyDown(event);
      };
      _this.getYearClassNames = function(y) {
        var _a2 = _this.props, date = _a2.date, minDate = _a2.minDate, maxDate = _a2.maxDate, selected = _a2.selected, excludeDates = _a2.excludeDates, includeDates = _a2.includeDates, filterDate = _a2.filterDate, yearClassName = _a2.yearClassName;
        return clsx("react-datepicker__year-text", "react-datepicker__year-".concat(y), date ? yearClassName === null || yearClassName === void 0 ? void 0 : yearClassName(setYear(date, y)) : void 0, {
          "react-datepicker__year-text--selected": selected ? y === getYear(selected) : void 0,
          "react-datepicker__year-text--disabled": (minDate || maxDate || excludeDates || includeDates || filterDate) && isYearDisabled(y, _this.props),
          "react-datepicker__year-text--keyboard-selected": _this.isKeyboardSelected(y),
          "react-datepicker__year-text--range-start": _this.isRangeStart(y),
          "react-datepicker__year-text--range-end": _this.isRangeEnd(y),
          "react-datepicker__year-text--in-range": _this.isInRange(y),
          "react-datepicker__year-text--in-selecting-range": _this.isInSelectingRange(y),
          "react-datepicker__year-text--selecting-range-start": _this.isSelectingRangeStart(y),
          "react-datepicker__year-text--selecting-range-end": _this.isSelectingRangeEnd(y),
          "react-datepicker__year-text--today": _this.isCurrentYear(y)
        });
      };
      _this.getYearTabIndex = function(y) {
        if (_this.props.disabledKeyboardNavigation || _this.props.preSelection == null) {
          return "-1";
        }
        var preSelected = getYear(_this.props.preSelection);
        return y === preSelected ? "0" : "-1";
      };
      _this.getYearContainerClassNames = function() {
        var _a2 = _this.props, selectingDate = _a2.selectingDate, selectsStart = _a2.selectsStart, selectsEnd = _a2.selectsEnd, selectsRange = _a2.selectsRange;
        return clsx("react-datepicker__year", {
          "react-datepicker__year--selecting-range": selectingDate && (selectsStart || selectsEnd || selectsRange)
        });
      };
      _this.getYearContent = function(y) {
        return _this.props.renderYearContent ? _this.props.renderYearContent(y) : y;
      };
      return _this;
    }
    Year2.prototype.render = function() {
      var _this = this;
      var yearsList = [];
      var _a2 = this.props, date = _a2.date, yearItemNumber = _a2.yearItemNumber, onYearMouseEnter = _a2.onYearMouseEnter, onYearMouseLeave = _a2.onYearMouseLeave;
      if (date === void 0) {
        return null;
      }
      var _b = getYearsPeriod(date, yearItemNumber), startPeriod = _b.startPeriod, endPeriod = _b.endPeriod;
      var _loop_1 = function(y2) {
        yearsList.push(import_react4.default.createElement("div", { ref: this_1.YEAR_REFS[y2 - startPeriod], onClick: function(event) {
          _this.onYearClick(event, y2);
        }, onKeyDown: function(event) {
          if (isSpaceKeyDown(event)) {
            event.preventDefault();
            event.key = KeyType.Enter;
          }
          _this.onYearKeyDown(event, y2);
        }, tabIndex: Number(this_1.getYearTabIndex(y2)), className: this_1.getYearClassNames(y2), onMouseEnter: !this_1.props.usePointerEvent ? function(event) {
          return onYearMouseEnter(event, y2);
        } : void 0, onPointerEnter: this_1.props.usePointerEvent ? function(event) {
          return onYearMouseEnter(event, y2);
        } : void 0, onMouseLeave: !this_1.props.usePointerEvent ? function(event) {
          return onYearMouseLeave(event, y2);
        } : void 0, onPointerLeave: this_1.props.usePointerEvent ? function(event) {
          return onYearMouseLeave(event, y2);
        } : void 0, key: y2, "aria-current": this_1.isCurrentYear(y2) ? "date" : void 0 }, this_1.getYearContent(y2)));
      };
      var this_1 = this;
      for (var y = startPeriod; y <= endPeriod; y++) {
        _loop_1(y);
      }
      return import_react4.default.createElement(
        "div",
        { className: this.getYearContainerClassNames() },
        import_react4.default.createElement("div", { className: "react-datepicker__year-wrapper", onMouseLeave: !this.props.usePointerEvent ? this.props.clearSelectingDate : void 0, onPointerLeave: this.props.usePointerEvent ? this.props.clearSelectingDate : void 0 }, yearsList)
      );
    };
    return Year2;
  }(import_react4.Component)
);
function generateYears(year, noOfYear, minDate, maxDate) {
  var list = [];
  for (var i = 0; i < 2 * noOfYear + 1; i++) {
    var newYear = year + noOfYear - i;
    var isInRange = true;
    if (minDate) {
      isInRange = getYear(minDate) <= newYear;
    }
    if (maxDate && isInRange) {
      isInRange = getYear(maxDate) >= newYear;
    }
    if (isInRange) {
      list.push(newYear);
    }
  }
  return list;
}
var YearDropdownOptions = (
  /** @class */
  function(_super) {
    __extends(YearDropdownOptions2, _super);
    function YearDropdownOptions2(props) {
      var _this = _super.call(this, props) || this;
      _this.renderOptions = function() {
        var selectedYear = _this.props.year;
        var options = _this.state.yearsList.map(function(year) {
          return import_react4.default.createElement(
            "div",
            { className: selectedYear === year ? "react-datepicker__year-option react-datepicker__year-option--selected_year" : "react-datepicker__year-option", key: year, onClick: _this.onChange.bind(_this, year), "aria-selected": selectedYear === year ? "true" : void 0 },
            selectedYear === year ? import_react4.default.createElement("span", { className: "react-datepicker__year-option--selected" }, "✓") : "",
            year
          );
        });
        var minYear = _this.props.minDate ? getYear(_this.props.minDate) : null;
        var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : null;
        if (!maxYear || !_this.state.yearsList.find(function(year) {
          return year === maxYear;
        })) {
          options.unshift(import_react4.default.createElement(
            "div",
            { className: "react-datepicker__year-option", key: "upcoming", onClick: _this.incrementYears },
            import_react4.default.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" })
          ));
        }
        if (!minYear || !_this.state.yearsList.find(function(year) {
          return year === minYear;
        })) {
          options.push(import_react4.default.createElement(
            "div",
            { className: "react-datepicker__year-option", key: "previous", onClick: _this.decrementYears },
            import_react4.default.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" })
          ));
        }
        return options;
      };
      _this.onChange = function(year) {
        _this.props.onChange(year);
      };
      _this.handleClickOutside = function() {
        _this.props.onCancel();
      };
      _this.shiftYears = function(amount) {
        var years = _this.state.yearsList.map(function(year) {
          return year + amount;
        });
        _this.setState({
          yearsList: years
        });
      };
      _this.incrementYears = function() {
        return _this.shiftYears(1);
      };
      _this.decrementYears = function() {
        return _this.shiftYears(-1);
      };
      var yearDropdownItemNumber = props.yearDropdownItemNumber, scrollableYearDropdown = props.scrollableYearDropdown;
      var noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);
      _this.state = {
        yearsList: generateYears(_this.props.year, noOfYear, _this.props.minDate, _this.props.maxDate)
      };
      _this.dropdownRef = (0, import_react4.createRef)();
      return _this;
    }
    YearDropdownOptions2.prototype.componentDidMount = function() {
      var dropdownCurrent = this.dropdownRef.current;
      if (dropdownCurrent) {
        var dropdownCurrentChildren = dropdownCurrent.children ? Array.from(dropdownCurrent.children) : null;
        var selectedYearOptionEl = dropdownCurrentChildren ? dropdownCurrentChildren.find(function(childEl) {
          return childEl.ariaSelected;
        }) : null;
        dropdownCurrent.scrollTop = selectedYearOptionEl && selectedYearOptionEl instanceof HTMLElement ? selectedYearOptionEl.offsetTop + (selectedYearOptionEl.clientHeight - dropdownCurrent.clientHeight) / 2 : (dropdownCurrent.scrollHeight - dropdownCurrent.clientHeight) / 2;
      }
    };
    YearDropdownOptions2.prototype.render = function() {
      var dropdownClass = clsx({
        "react-datepicker__year-dropdown": true,
        "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown
      });
      return import_react4.default.createElement("div", { className: dropdownClass, ref: this.dropdownRef }, this.renderOptions());
    };
    return YearDropdownOptions2;
  }(import_react4.Component)
);
var WrappedYearDropdownOptions = react_onclickoutside_es_default(YearDropdownOptions);
var YearDropdown = (
  /** @class */
  function(_super) {
    __extends(YearDropdown2, _super);
    function YearDropdown2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.state = {
        dropdownVisible: false
      };
      _this.renderSelectOptions = function() {
        var minYear = _this.props.minDate ? getYear(_this.props.minDate) : 1900;
        var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : 2100;
        var options = [];
        for (var i = minYear; i <= maxYear; i++) {
          options.push(import_react4.default.createElement("option", { key: i, value: i }, i));
        }
        return options;
      };
      _this.onSelectChange = function(event) {
        _this.onChange(parseInt(event.target.value));
      };
      _this.renderSelectMode = function() {
        return import_react4.default.createElement("select", { value: _this.props.year, className: "react-datepicker__year-select", onChange: _this.onSelectChange }, _this.renderSelectOptions());
      };
      _this.renderReadView = function(visible) {
        return import_react4.default.createElement(
          "div",
          { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__year-read-view", onClick: function(event) {
            return _this.toggleDropdown(event);
          } },
          import_react4.default.createElement("span", { className: "react-datepicker__year-read-view--down-arrow" }),
          import_react4.default.createElement("span", { className: "react-datepicker__year-read-view--selected-year" }, _this.props.year)
        );
      };
      _this.renderDropdown = function() {
        return import_react4.default.createElement(WrappedYearDropdownOptions, _assign({ key: "dropdown" }, _this.props, { onChange: _this.onChange, onCancel: _this.toggleDropdown }));
      };
      _this.renderScrollMode = function() {
        var dropdownVisible = _this.state.dropdownVisible;
        var result = [_this.renderReadView(!dropdownVisible)];
        if (dropdownVisible) {
          result.unshift(_this.renderDropdown());
        }
        return result;
      };
      _this.onChange = function(year) {
        _this.toggleDropdown();
        if (year === _this.props.year)
          return;
        _this.props.onChange(year);
      };
      _this.toggleDropdown = function(event) {
        _this.setState({
          dropdownVisible: !_this.state.dropdownVisible
        }, function() {
          if (_this.props.adjustDateOnChange) {
            _this.handleYearChange(_this.props.date, event);
          }
        });
      };
      _this.handleYearChange = function(date, event) {
        _this.onSelect(date, event);
        _this.setOpen();
      };
      _this.onSelect = function(date, event) {
        if (_this.props.onSelect) {
          _this.props.onSelect(date, event);
        }
      };
      _this.setOpen = function() {
        if (_this.props.setOpen) {
          _this.props.setOpen(true);
        }
      };
      return _this;
    }
    YearDropdown2.prototype.render = function() {
      var renderedDropdown;
      switch (this.props.dropdownMode) {
        case "scroll":
          renderedDropdown = this.renderScrollMode();
          break;
        case "select":
          renderedDropdown = this.renderSelectMode();
          break;
      }
      return import_react4.default.createElement("div", { className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown);
    };
    return YearDropdown2;
  }(import_react4.Component)
);
var DROPDOWN_FOCUS_CLASSNAMES = [
  "react-datepicker__year-select",
  "react-datepicker__month-select",
  "react-datepicker__month-year-select"
];
var isDropdownSelect = function(element) {
  var classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(function(testClassname) {
    return classNames.indexOf(testClassname) >= 0;
  });
};
var Calendar = (
  /** @class */
  function(_super) {
    __extends(Calendar2, _super);
    function Calendar2(props) {
      var _this = _super.call(this, props) || this;
      _this.monthContainer = void 0;
      _this.handleClickOutside = function(event) {
        _this.props.onClickOutside(event);
      };
      _this.setClickOutsideRef = function() {
        return _this.containerRef.current;
      };
      _this.handleDropdownFocus = function(event) {
        var _a2, _b;
        if (isDropdownSelect(event.target)) {
          (_b = (_a2 = _this.props).onDropdownFocus) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
        }
      };
      _this.getDateInView = function() {
        var _a2 = _this.props, preSelection = _a2.preSelection, selected = _a2.selected, openToDate = _a2.openToDate;
        var minDate = getEffectiveMinDate(_this.props);
        var maxDate = getEffectiveMaxDate(_this.props);
        var current = newDate();
        var initialDate = openToDate || selected || preSelection;
        if (initialDate) {
          return initialDate;
        } else {
          if (minDate && isBefore(current, minDate)) {
            return minDate;
          } else if (maxDate && isAfter(current, maxDate)) {
            return maxDate;
          }
        }
        return current;
      };
      _this.increaseMonth = function() {
        _this.setState(function(_a2) {
          var date = _a2.date;
          return {
            date: addMonths(date, 1)
          };
        }, function() {
          return _this.handleMonthChange(_this.state.date);
        });
      };
      _this.decreaseMonth = function() {
        _this.setState(function(_a2) {
          var date = _a2.date;
          return {
            date: subMonths(date, 1)
          };
        }, function() {
          return _this.handleMonthChange(_this.state.date);
        });
      };
      _this.handleDayClick = function(day, event, monthSelectedIn) {
        _this.props.onSelect(day, event, monthSelectedIn);
        _this.props.setPreSelection && _this.props.setPreSelection(day);
      };
      _this.handleDayMouseEnter = function(day) {
        _this.setState({ selectingDate: day });
        _this.props.onDayMouseEnter && _this.props.onDayMouseEnter(day);
      };
      _this.handleMonthMouseLeave = function() {
        _this.setState({ selectingDate: void 0 });
        _this.props.onMonthMouseLeave && _this.props.onMonthMouseLeave();
      };
      _this.handleYearMouseEnter = function(event, year) {
        _this.setState({ selectingDate: setYear(newDate(), year) });
        !!_this.props.onYearMouseEnter && _this.props.onYearMouseEnter(event, year);
      };
      _this.handleYearMouseLeave = function(event, year) {
        !!_this.props.onYearMouseLeave && _this.props.onYearMouseLeave(event, year);
      };
      _this.handleYearChange = function(date) {
        if (_this.props.onYearChange) {
          _this.props.onYearChange(date);
          _this.setState({ isRenderAriaLiveMessage: true });
        }
        if (_this.props.adjustDateOnChange) {
          if (_this.props.onSelect) {
            _this.props.onSelect(date);
          }
          if (_this.props.setOpen) {
            _this.props.setOpen(true);
          }
        }
        _this.props.setPreSelection && _this.props.setPreSelection(date);
      };
      _this.handleMonthChange = function(date) {
        _this.handleCustomMonthChange(date);
        if (_this.props.adjustDateOnChange) {
          if (_this.props.onSelect) {
            _this.props.onSelect(date);
          }
          if (_this.props.setOpen) {
            _this.props.setOpen(true);
          }
        }
        _this.props.setPreSelection && _this.props.setPreSelection(date);
      };
      _this.handleCustomMonthChange = function(date) {
        if (_this.props.onMonthChange) {
          _this.props.onMonthChange(date);
          _this.setState({ isRenderAriaLiveMessage: true });
        }
      };
      _this.handleMonthYearChange = function(date) {
        _this.handleYearChange(date);
        _this.handleMonthChange(date);
      };
      _this.changeYear = function(year) {
        _this.setState(function(_a2) {
          var date = _a2.date;
          return {
            date: setYear(date, Number(year))
          };
        }, function() {
          return _this.handleYearChange(_this.state.date);
        });
      };
      _this.changeMonth = function(month) {
        _this.setState(function(_a2) {
          var date = _a2.date;
          return {
            date: setMonth(date, Number(month))
          };
        }, function() {
          return _this.handleMonthChange(_this.state.date);
        });
      };
      _this.changeMonthYear = function(monthYear) {
        _this.setState(function(_a2) {
          var date = _a2.date;
          return {
            date: setYear(setMonth(date, getMonth(monthYear)), getYear(monthYear))
          };
        }, function() {
          return _this.handleMonthYearChange(_this.state.date);
        });
      };
      _this.header = function(date) {
        if (date === void 0) {
          date = _this.state.date;
        }
        var startOfWeek2 = getStartOfWeek(date, _this.props.locale, _this.props.calendarStartDay);
        var dayNames = [];
        if (_this.props.showWeekNumbers) {
          dayNames.push(import_react4.default.createElement("div", { key: "W", className: "react-datepicker__day-name" }, _this.props.weekLabel || "#"));
        }
        return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function(offset4) {
          var day = addDays(startOfWeek2, offset4);
          var weekDayName = _this.formatWeekday(day, _this.props.locale);
          var weekDayClassName = _this.props.weekDayClassName ? _this.props.weekDayClassName(day) : void 0;
          return import_react4.default.createElement("div", { key: offset4, "aria-label": formatDate(day, "EEEE", _this.props.locale), className: clsx("react-datepicker__day-name", weekDayClassName) }, weekDayName);
        }));
      };
      _this.formatWeekday = function(day, locale) {
        if (_this.props.formatWeekDay) {
          return getFormattedWeekdayInLocale(day, _this.props.formatWeekDay, locale);
        }
        return _this.props.useWeekdaysShort ? getWeekdayShortInLocale(day, locale) : getWeekdayMinInLocale(day, locale);
      };
      _this.decreaseYear = function() {
        _this.setState(function(_a2) {
          var _b;
          var date = _a2.date;
          return {
            date: subYears(date, _this.props.showYearPicker ? (_b = _this.props.yearItemNumber) !== null && _b !== void 0 ? _b : Calendar2.defaultProps.yearItemNumber : 1)
          };
        }, function() {
          return _this.handleYearChange(_this.state.date);
        });
      };
      _this.clearSelectingDate = function() {
        _this.setState({ selectingDate: void 0 });
      };
      _this.renderPreviousButton = function() {
        var _a2;
        if (_this.props.renderCustomHeader) {
          return;
        }
        var allPrevDaysDisabled;
        switch (true) {
          case _this.props.showMonthYearPicker:
            allPrevDaysDisabled = yearDisabledBefore(_this.state.date, _this.props);
            break;
          case _this.props.showYearPicker:
            allPrevDaysDisabled = yearsDisabledBefore(_this.state.date, _this.props);
            break;
          case _this.props.showQuarterYearPicker:
            allPrevDaysDisabled = quarterDisabledBefore(_this.state.date, _this.props);
            break;
          default:
            allPrevDaysDisabled = monthDisabledBefore(_this.state.date, _this.props);
            break;
        }
        if (!((_a2 = _this.props.forceShowMonthNavigation) !== null && _a2 !== void 0 ? _a2 : Calendar2.defaultProps.forceShowMonthNavigation) && !_this.props.showDisabledMonthNavigation && allPrevDaysDisabled || _this.props.showTimeSelectOnly) {
          return;
        }
        var iconClasses = [
          "react-datepicker__navigation-icon",
          "react-datepicker__navigation-icon--previous"
        ];
        var classes = [
          "react-datepicker__navigation",
          "react-datepicker__navigation--previous"
        ];
        var clickHandler = _this.decreaseMonth;
        if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker) {
          clickHandler = _this.decreaseYear;
        }
        if (allPrevDaysDisabled && _this.props.showDisabledMonthNavigation) {
          classes.push("react-datepicker__navigation--previous--disabled");
          clickHandler = void 0;
        }
        var isForYear = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker;
        var _b = _this.props, _c = _b.previousMonthButtonLabel, previousMonthButtonLabel = _c === void 0 ? Calendar2.defaultProps.previousMonthButtonLabel : _c, _d = _b.previousYearButtonLabel, previousYearButtonLabel = _d === void 0 ? Calendar2.defaultProps.previousYearButtonLabel : _d;
        var _e = _this.props, _f = _e.previousMonthAriaLabel, previousMonthAriaLabel = _f === void 0 ? typeof previousMonthButtonLabel === "string" ? previousMonthButtonLabel : "Previous Month" : _f, _g = _e.previousYearAriaLabel, previousYearAriaLabel = _g === void 0 ? typeof previousYearButtonLabel === "string" ? previousYearButtonLabel : "Previous Year" : _g;
        return import_react4.default.createElement(
          "button",
          { type: "button", className: classes.join(" "), onClick: clickHandler, onKeyDown: _this.props.handleOnKeyDown, "aria-label": isForYear ? previousYearAriaLabel : previousMonthAriaLabel },
          import_react4.default.createElement("span", { className: iconClasses.join(" ") }, isForYear ? previousYearButtonLabel : previousMonthButtonLabel)
        );
      };
      _this.increaseYear = function() {
        _this.setState(function(_a2) {
          var _b;
          var date = _a2.date;
          return {
            date: addYears(date, _this.props.showYearPicker ? (_b = _this.props.yearItemNumber) !== null && _b !== void 0 ? _b : Calendar2.defaultProps.yearItemNumber : 1)
          };
        }, function() {
          return _this.handleYearChange(_this.state.date);
        });
      };
      _this.renderNextButton = function() {
        var _a2;
        if (_this.props.renderCustomHeader) {
          return;
        }
        var allNextDaysDisabled;
        switch (true) {
          case _this.props.showMonthYearPicker:
            allNextDaysDisabled = yearDisabledAfter(_this.state.date, _this.props);
            break;
          case _this.props.showYearPicker:
            allNextDaysDisabled = yearsDisabledAfter(_this.state.date, _this.props);
            break;
          case _this.props.showQuarterYearPicker:
            allNextDaysDisabled = quarterDisabledAfter(_this.state.date, _this.props);
            break;
          default:
            allNextDaysDisabled = monthDisabledAfter(_this.state.date, _this.props);
            break;
        }
        if (!((_a2 = _this.props.forceShowMonthNavigation) !== null && _a2 !== void 0 ? _a2 : Calendar2.defaultProps.forceShowMonthNavigation) && !_this.props.showDisabledMonthNavigation && allNextDaysDisabled || _this.props.showTimeSelectOnly) {
          return;
        }
        var classes = [
          "react-datepicker__navigation",
          "react-datepicker__navigation--next"
        ];
        var iconClasses = [
          "react-datepicker__navigation-icon",
          "react-datepicker__navigation-icon--next"
        ];
        if (_this.props.showTimeSelect) {
          classes.push("react-datepicker__navigation--next--with-time");
        }
        if (_this.props.todayButton) {
          classes.push("react-datepicker__navigation--next--with-today-button");
        }
        var clickHandler = _this.increaseMonth;
        if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker) {
          clickHandler = _this.increaseYear;
        }
        if (allNextDaysDisabled && _this.props.showDisabledMonthNavigation) {
          classes.push("react-datepicker__navigation--next--disabled");
          clickHandler = void 0;
        }
        var isForYear = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker;
        var _b = _this.props, _c = _b.nextMonthButtonLabel, nextMonthButtonLabel = _c === void 0 ? Calendar2.defaultProps.nextMonthButtonLabel : _c, _d = _b.nextYearButtonLabel, nextYearButtonLabel = _d === void 0 ? Calendar2.defaultProps.nextYearButtonLabel : _d;
        var _e = _this.props, _f = _e.nextMonthAriaLabel, nextMonthAriaLabel = _f === void 0 ? typeof nextMonthButtonLabel === "string" ? nextMonthButtonLabel : "Next Month" : _f, _g = _e.nextYearAriaLabel, nextYearAriaLabel = _g === void 0 ? typeof nextYearButtonLabel === "string" ? nextYearButtonLabel : "Next Year" : _g;
        return import_react4.default.createElement(
          "button",
          { type: "button", className: classes.join(" "), onClick: clickHandler, onKeyDown: _this.props.handleOnKeyDown, "aria-label": isForYear ? nextYearAriaLabel : nextMonthAriaLabel },
          import_react4.default.createElement("span", { className: iconClasses.join(" ") }, isForYear ? nextYearButtonLabel : nextMonthButtonLabel)
        );
      };
      _this.renderCurrentMonth = function(date) {
        if (date === void 0) {
          date = _this.state.date;
        }
        var classes = ["react-datepicker__current-month"];
        if (_this.props.showYearDropdown) {
          classes.push("react-datepicker__current-month--hasYearDropdown");
        }
        if (_this.props.showMonthDropdown) {
          classes.push("react-datepicker__current-month--hasMonthDropdown");
        }
        if (_this.props.showMonthYearDropdown) {
          classes.push("react-datepicker__current-month--hasMonthYearDropdown");
        }
        return import_react4.default.createElement("h2", { className: classes.join(" ") }, formatDate(date, _this.props.dateFormat, _this.props.locale));
      };
      _this.renderYearDropdown = function(overrideHide) {
        if (overrideHide === void 0) {
          overrideHide = false;
        }
        if (!_this.props.showYearDropdown || overrideHide) {
          return;
        }
        return import_react4.default.createElement(YearDropdown, _assign({}, Calendar2.defaultProps, _this.props, { date: _this.state.date, onChange: _this.changeYear, year: getYear(_this.state.date) }));
      };
      _this.renderMonthDropdown = function(overrideHide) {
        if (overrideHide === void 0) {
          overrideHide = false;
        }
        if (!_this.props.showMonthDropdown || overrideHide) {
          return;
        }
        return import_react4.default.createElement(MonthDropdown, _assign({}, Calendar2.defaultProps, _this.props, { month: getMonth(_this.state.date), onChange: _this.changeMonth }));
      };
      _this.renderMonthYearDropdown = function(overrideHide) {
        if (overrideHide === void 0) {
          overrideHide = false;
        }
        if (!_this.props.showMonthYearDropdown || overrideHide) {
          return;
        }
        return import_react4.default.createElement(MonthYearDropdown, _assign({}, Calendar2.defaultProps, _this.props, { date: _this.state.date, onChange: _this.changeMonthYear }));
      };
      _this.handleTodayButtonClick = function(event) {
        _this.props.onSelect(getStartOfToday(), event);
        _this.props.setPreSelection && _this.props.setPreSelection(getStartOfToday());
      };
      _this.renderTodayButton = function() {
        if (!_this.props.todayButton || _this.props.showTimeSelectOnly) {
          return;
        }
        return import_react4.default.createElement("div", { className: "react-datepicker__today-button", onClick: _this.handleTodayButtonClick }, _this.props.todayButton);
      };
      _this.renderDefaultHeader = function(_a2) {
        var monthDate = _a2.monthDate, i = _a2.i;
        return import_react4.default.createElement(
          "div",
          { className: "react-datepicker__header ".concat(_this.props.showTimeSelect ? "react-datepicker__header--has-time-select" : "") },
          _this.renderCurrentMonth(monthDate),
          import_react4.default.createElement(
            "div",
            { className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(_this.props.dropdownMode), onFocus: _this.handleDropdownFocus },
            _this.renderMonthDropdown(i !== 0),
            _this.renderMonthYearDropdown(i !== 0),
            _this.renderYearDropdown(i !== 0)
          ),
          import_react4.default.createElement("div", { className: "react-datepicker__day-names" }, _this.header(monthDate))
        );
      };
      _this.renderCustomHeader = function(headerArgs) {
        var _a2, _b;
        var monthDate = headerArgs.monthDate, i = headerArgs.i;
        if (_this.props.showTimeSelect && !_this.state.monthContainer || _this.props.showTimeSelectOnly) {
          return null;
        }
        var prevMonthButtonDisabled = monthDisabledBefore(_this.state.date, _this.props);
        var nextMonthButtonDisabled = monthDisabledAfter(_this.state.date, _this.props);
        var prevYearButtonDisabled = yearDisabledBefore(_this.state.date, _this.props);
        var nextYearButtonDisabled = yearDisabledAfter(_this.state.date, _this.props);
        var showDayNames = !_this.props.showMonthYearPicker && !_this.props.showQuarterYearPicker && !_this.props.showYearPicker;
        return import_react4.default.createElement(
          "div",
          { className: "react-datepicker__header react-datepicker__header--custom", onFocus: _this.props.onDropdownFocus },
          (_b = (_a2 = _this.props).renderCustomHeader) === null || _b === void 0 ? void 0 : _b.call(_a2, _assign(_assign({}, _this.state), { customHeaderCount: i, monthDate, changeMonth: _this.changeMonth, changeYear: _this.changeYear, decreaseMonth: _this.decreaseMonth, increaseMonth: _this.increaseMonth, decreaseYear: _this.decreaseYear, increaseYear: _this.increaseYear, prevMonthButtonDisabled, nextMonthButtonDisabled, prevYearButtonDisabled, nextYearButtonDisabled })),
          showDayNames && import_react4.default.createElement("div", { className: "react-datepicker__day-names" }, _this.header(monthDate))
        );
      };
      _this.renderYearHeader = function(_a2) {
        var monthDate = _a2.monthDate;
        var _b = _this.props, showYearPicker = _b.showYearPicker, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? Calendar2.defaultProps.yearItemNumber : _c;
        var _d = getYearsPeriod(monthDate, yearItemNumber), startPeriod = _d.startPeriod, endPeriod = _d.endPeriod;
        return import_react4.default.createElement("div", { className: "react-datepicker__header react-datepicker-year-header" }, showYearPicker ? "".concat(startPeriod, " - ").concat(endPeriod) : getYear(monthDate));
      };
      _this.renderHeader = function(_a2) {
        var monthDate = _a2.monthDate, _b = _a2.i, i = _b === void 0 ? 0 : _b;
        var headerArgs = { monthDate, i };
        switch (true) {
          case _this.props.renderCustomHeader !== void 0:
            return _this.renderCustomHeader(headerArgs);
          case (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker):
            return _this.renderYearHeader(headerArgs);
          default:
            return _this.renderDefaultHeader(headerArgs);
        }
      };
      _this.renderMonths = function() {
        var _a2, _b;
        if (_this.props.showTimeSelectOnly || _this.props.showYearPicker) {
          return;
        }
        var monthList = [];
        var monthsShown = (_a2 = _this.props.monthsShown) !== null && _a2 !== void 0 ? _a2 : Calendar2.defaultProps.monthsShown;
        var monthsToSubtract = _this.props.showPreviousMonths ? monthsShown - 1 : 0;
        var fromMonthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker ? addYears(_this.state.date, monthsToSubtract) : subMonths(_this.state.date, monthsToSubtract);
        var monthSelectedIn = (_b = _this.props.monthSelectedIn) !== null && _b !== void 0 ? _b : monthsToSubtract;
        for (var i = 0; i < monthsShown; ++i) {
          var monthsToAdd = i - monthSelectedIn + monthsToSubtract;
          var monthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker ? addYears(fromMonthDate, monthsToAdd) : addMonths(fromMonthDate, monthsToAdd);
          var monthKey = "month-".concat(i);
          var monthShowsDuplicateDaysEnd = i < monthsShown - 1;
          var monthShowsDuplicateDaysStart = i > 0;
          monthList.push(import_react4.default.createElement(
            "div",
            { key: monthKey, ref: function(div) {
              _this.monthContainer = div !== null && div !== void 0 ? div : void 0;
            }, className: "react-datepicker__month-container" },
            _this.renderHeader({ monthDate, i }),
            import_react4.default.createElement(Month, _assign({}, Calendar2.defaultProps, _this.props, { ariaLabelPrefix: _this.props.monthAriaLabelPrefix, day: monthDate, onDayClick: _this.handleDayClick, handleOnKeyDown: _this.props.handleOnDayKeyDown, handleOnMonthKeyDown: _this.props.handleOnKeyDown, onDayMouseEnter: _this.handleDayMouseEnter, onMouseLeave: _this.handleMonthMouseLeave, orderInDisplay: i, selectingDate: _this.state.selectingDate, monthShowsDuplicateDaysEnd, monthShowsDuplicateDaysStart }))
          ));
        }
        return monthList;
      };
      _this.renderYears = function() {
        if (_this.props.showTimeSelectOnly) {
          return;
        }
        if (_this.props.showYearPicker) {
          return import_react4.default.createElement(
            "div",
            { className: "react-datepicker__year--container" },
            _this.renderHeader({ monthDate: _this.state.date }),
            import_react4.default.createElement(Year, _assign({}, Calendar2.defaultProps, _this.props, { selectingDate: _this.state.selectingDate, date: _this.state.date, onDayClick: _this.handleDayClick, clearSelectingDate: _this.clearSelectingDate, onYearMouseEnter: _this.handleYearMouseEnter, onYearMouseLeave: _this.handleYearMouseLeave }))
          );
        }
        return;
      };
      _this.renderTimeSection = function() {
        if (_this.props.showTimeSelect && (_this.state.monthContainer || _this.props.showTimeSelectOnly)) {
          return import_react4.default.createElement(Time, _assign({}, Calendar2.defaultProps, _this.props, { onChange: _this.props.onTimeChange, format: _this.props.timeFormat, intervals: _this.props.timeIntervals, monthRef: _this.state.monthContainer }));
        }
        return;
      };
      _this.renderInputTimeSection = function() {
        var time = _this.props.selected ? new Date(_this.props.selected) : void 0;
        var timeValid = time && isValid2(time) && Boolean(_this.props.selected);
        var timeString = timeValid ? "".concat(addZero(time.getHours()), ":").concat(addZero(time.getMinutes())) : "";
        if (_this.props.showTimeInput) {
          return import_react4.default.createElement(InputTime, _assign({}, Calendar2.defaultProps, _this.props, { date: time, timeString, onChange: _this.props.onTimeChange }));
        }
        return;
      };
      _this.renderAriaLiveRegion = function() {
        var _a2;
        var _b = getYearsPeriod(_this.state.date, (_a2 = _this.props.yearItemNumber) !== null && _a2 !== void 0 ? _a2 : Calendar2.defaultProps.yearItemNumber), startPeriod = _b.startPeriod, endPeriod = _b.endPeriod;
        var ariaLiveMessage;
        if (_this.props.showYearPicker) {
          ariaLiveMessage = "".concat(startPeriod, " - ").concat(endPeriod);
        } else if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker) {
          ariaLiveMessage = getYear(_this.state.date);
        } else {
          ariaLiveMessage = "".concat(getMonthInLocale(getMonth(_this.state.date), _this.props.locale), " ").concat(getYear(_this.state.date));
        }
        return import_react4.default.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, _this.state.isRenderAriaLiveMessage && ariaLiveMessage);
      };
      _this.renderChildren = function() {
        if (_this.props.children) {
          return import_react4.default.createElement("div", { className: "react-datepicker__children-container" }, _this.props.children);
        }
        return;
      };
      _this.containerRef = (0, import_react4.createRef)();
      _this.state = {
        date: _this.getDateInView(),
        selectingDate: void 0,
        monthContainer: void 0,
        isRenderAriaLiveMessage: false
      };
      return _this;
    }
    Object.defineProperty(Calendar2, "defaultProps", {
      get: function() {
        return {
          monthsShown: 1,
          forceShowMonthNavigation: false,
          timeCaption: "Time",
          previousYearButtonLabel: "Previous Year",
          nextYearButtonLabel: "Next Year",
          previousMonthButtonLabel: "Previous Month",
          nextMonthButtonLabel: "Next Month",
          yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER
        };
      },
      enumerable: false,
      configurable: true
    });
    Calendar2.prototype.componentDidMount = function() {
      var _this = this;
      if (this.props.showTimeSelect) {
        this.assignMonthContainer = function() {
          _this.setState({ monthContainer: _this.monthContainer });
        }();
      }
    };
    Calendar2.prototype.componentDidUpdate = function(prevProps) {
      var _this = this;
      if (this.props.preSelection && (!isSameDay2(this.props.preSelection, prevProps.preSelection) || this.props.monthSelectedIn !== prevProps.monthSelectedIn)) {
        var hasMonthChanged_1 = !isSameMonth2(this.state.date, this.props.preSelection);
        this.setState({
          date: this.props.preSelection
        }, function() {
          return hasMonthChanged_1 && _this.handleCustomMonthChange(_this.state.date);
        });
      } else if (this.props.openToDate && !isSameDay2(this.props.openToDate, prevProps.openToDate)) {
        this.setState({
          date: this.props.openToDate
        });
      }
    };
    Calendar2.prototype.render = function() {
      var Container = this.props.container || CalendarContainer;
      return import_react4.default.createElement(
        "div",
        { style: { display: "contents" }, ref: this.containerRef },
        import_react4.default.createElement(
          Container,
          { className: clsx("react-datepicker", this.props.className, {
            "react-datepicker--time-only": this.props.showTimeSelectOnly
          }), showTime: this.props.showTimeSelect || this.props.showTimeInput, showTimeSelectOnly: this.props.showTimeSelectOnly },
          this.renderAriaLiveRegion(),
          this.renderPreviousButton(),
          this.renderNextButton(),
          this.renderMonths(),
          this.renderYears(),
          this.renderTodayButton(),
          this.renderTimeSection(),
          this.renderInputTimeSection(),
          this.renderChildren()
        )
      );
    };
    return Calendar2;
  }(import_react4.Component)
);
var CalendarIcon = function(_a2) {
  var icon = _a2.icon, _b = _a2.className, className = _b === void 0 ? "" : _b, onClick = _a2.onClick;
  var defaultClass = "react-datepicker__calendar-icon";
  if (typeof icon === "string") {
    return import_react4.default.createElement("i", { className: "".concat(defaultClass, " ").concat(icon, " ").concat(className), "aria-hidden": "true", onClick });
  }
  if (import_react4.default.isValidElement(icon)) {
    return import_react4.default.cloneElement(icon, {
      className: "".concat(icon.props.className || "", " ").concat(defaultClass, " ").concat(className),
      onClick: function(event) {
        if (typeof icon.props.onClick === "function") {
          icon.props.onClick(event);
        }
        if (typeof onClick === "function") {
          onClick(event);
        }
      }
    });
  }
  return import_react4.default.createElement(
    "svg",
    { className: "".concat(defaultClass, " ").concat(className), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", onClick },
    import_react4.default.createElement("path", { d: "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" })
  );
};
var Portal = (
  /** @class */
  function(_super) {
    __extends(Portal2, _super);
    function Portal2(props) {
      var _this = _super.call(this, props) || this;
      _this.portalRoot = null;
      _this.el = document.createElement("div");
      return _this;
    }
    Portal2.prototype.componentDidMount = function() {
      this.portalRoot = (this.props.portalHost || document).getElementById(this.props.portalId);
      if (!this.portalRoot) {
        this.portalRoot = document.createElement("div");
        this.portalRoot.setAttribute("id", this.props.portalId);
        (this.props.portalHost || document.body).appendChild(this.portalRoot);
      }
      this.portalRoot.appendChild(this.el);
    };
    Portal2.prototype.componentWillUnmount = function() {
      if (this.portalRoot) {
        this.portalRoot.removeChild(this.el);
      }
    };
    Portal2.prototype.render = function() {
      return import_react_dom4.default.createPortal(this.props.children, this.el);
    };
    return Portal2;
  }(import_react4.Component)
);
var focusableElementsSelector = "[tabindex], a, button, input, select, textarea";
var focusableFilter = function(node) {
  if (node instanceof HTMLAnchorElement) {
    return node.tabIndex !== -1;
  }
  return !node.disabled && node.tabIndex !== -1;
};
var TabLoop = (
  /** @class */
  function(_super) {
    __extends(TabLoop2, _super);
    function TabLoop2(props) {
      var _this = _super.call(this, props) || this;
      _this.getTabChildren = function() {
        var _a2;
        return Array.prototype.slice.call((_a2 = _this.tabLoopRef.current) === null || _a2 === void 0 ? void 0 : _a2.querySelectorAll(focusableElementsSelector), 1, -1).filter(focusableFilter);
      };
      _this.handleFocusStart = function() {
        var tabChildren = _this.getTabChildren();
        tabChildren && tabChildren.length > 1 && tabChildren[tabChildren.length - 1].focus();
      };
      _this.handleFocusEnd = function() {
        var tabChildren = _this.getTabChildren();
        tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
      };
      _this.tabLoopRef = (0, import_react4.createRef)();
      return _this;
    }
    TabLoop2.prototype.render = function() {
      var _a2;
      if (!((_a2 = this.props.enableTabLoop) !== null && _a2 !== void 0 ? _a2 : TabLoop2.defaultProps.enableTabLoop)) {
        return this.props.children;
      }
      return import_react4.default.createElement(
        "div",
        { className: "react-datepicker__tab-loop", ref: this.tabLoopRef },
        import_react4.default.createElement("div", { className: "react-datepicker__tab-loop__start", tabIndex: 0, onFocus: this.handleFocusStart }),
        this.props.children,
        import_react4.default.createElement("div", { className: "react-datepicker__tab-loop__end", tabIndex: 0, onFocus: this.handleFocusEnd })
      );
    };
    TabLoop2.defaultProps = {
      enableTabLoop: true
    };
    return TabLoop2;
  }(import_react4.Component)
);
function withFloating(Component3) {
  var WithFloating = function(props) {
    var _a2;
    var hidePopper = typeof props.hidePopper === "boolean" ? props.hidePopper : true;
    var arrowRef = (0, import_react4.useRef)(null);
    var floatingProps = useFloating2(_assign({ open: !hidePopper, whileElementsMounted: autoUpdate, placement: props.popperPlacement, middleware: __spreadArray([
      flip3({ padding: 15 }),
      offset3(10),
      arrow3({ element: arrowRef })
    ], (_a2 = props.popperModifiers) !== null && _a2 !== void 0 ? _a2 : [], true) }, props.popperProps));
    var componentProps = _assign(_assign({}, props), { hidePopper, popperProps: _assign(_assign({}, floatingProps), { arrowRef }) });
    return import_react4.default.createElement(Component3, _assign({}, componentProps));
  };
  return WithFloating;
}
var PopperComponent = (
  /** @class */
  function(_super) {
    __extends(PopperComponent2, _super);
    function PopperComponent2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PopperComponent2, "defaultProps", {
      get: function() {
        return {
          hidePopper: true
        };
      },
      enumerable: false,
      configurable: true
    });
    PopperComponent2.prototype.render = function() {
      var _a2 = this.props, className = _a2.className, wrapperClassName = _a2.wrapperClassName, _b = _a2.hidePopper, hidePopper = _b === void 0 ? PopperComponent2.defaultProps.hidePopper : _b, popperComponent = _a2.popperComponent, targetComponent = _a2.targetComponent, enableTabLoop = _a2.enableTabLoop, popperOnKeyDown = _a2.popperOnKeyDown, portalId = _a2.portalId, portalHost = _a2.portalHost, popperProps = _a2.popperProps, showArrow = _a2.showArrow;
      var popper = void 0;
      if (!hidePopper) {
        var classes = clsx("react-datepicker-popper", className);
        popper = import_react4.default.createElement(
          TabLoop,
          { enableTabLoop },
          import_react4.default.createElement(
            "div",
            { ref: popperProps.refs.setFloating, style: popperProps.floatingStyles, className: classes, "data-placement": popperProps.placement, onKeyDown: popperOnKeyDown },
            popperComponent,
            showArrow && import_react4.default.createElement(FloatingArrow, { ref: popperProps.arrowRef, context: popperProps.context, fill: "currentColor", strokeWidth: 1, height: 8, width: 16, style: { transform: "translateY(-1px)" }, className: "react-datepicker__triangle" })
          )
        );
      }
      if (this.props.popperContainer) {
        popper = (0, import_react4.createElement)(this.props.popperContainer, {}, popper);
      }
      if (portalId && !hidePopper) {
        popper = import_react4.default.createElement(Portal, { portalId, portalHost }, popper);
      }
      var wrapperClasses = clsx("react-datepicker-wrapper", wrapperClassName);
      return import_react4.default.createElement(
        import_react4.default.Fragment,
        null,
        import_react4.default.createElement("div", { ref: popperProps.refs.setReference, className: wrapperClasses }, targetComponent),
        popper
      );
    };
    return PopperComponent2;
  }(import_react4.Component)
);
var PopperComponent$1 = withFloating(PopperComponent);
var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
var WrappedCalendar = react_onclickoutside_es_default(Calendar);
function hasPreSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return getMonth(date1) !== getMonth(date2) || getYear(date1) !== getYear(date2);
  }
  return date1 !== date2;
}
var INPUT_ERR_1 = "Date input not valid.";
var DatePicker = (
  /** @class */
  function(_super) {
    __extends(DatePicker2, _super);
    function DatePicker2(props) {
      var _this = _super.call(this, props) || this;
      _this.calendar = null;
      _this.input = null;
      _this.getPreSelection = function() {
        return _this.props.openToDate ? _this.props.openToDate : _this.props.selectsEnd && _this.props.startDate ? _this.props.startDate : _this.props.selectsStart && _this.props.endDate ? _this.props.endDate : newDate();
      };
      _this.modifyHolidays = function() {
        var _a2;
        return (_a2 = _this.props.holidays) === null || _a2 === void 0 ? void 0 : _a2.reduce(function(accumulator, holiday) {
          var date = new Date(holiday.date);
          if (!isValid2(date)) {
            return accumulator;
          }
          return __spreadArray(__spreadArray([], accumulator, true), [_assign(_assign({}, holiday), { date })], false);
        }, []);
      };
      _this.calcInitialState = function() {
        var _a2;
        var defaultPreSelection = _this.getPreSelection();
        var minDate = getEffectiveMinDate(_this.props);
        var maxDate = getEffectiveMaxDate(_this.props);
        var boundedPreSelection = minDate && isBefore(defaultPreSelection, getStartOfDay(minDate)) ? minDate : maxDate && isAfter(defaultPreSelection, getEndOfDay(maxDate)) ? maxDate : defaultPreSelection;
        return {
          open: _this.props.startOpen || false,
          preventFocus: false,
          inputValue: null,
          preSelection: (_a2 = _this.props.selectsRange ? _this.props.startDate : _this.props.selected) !== null && _a2 !== void 0 ? _a2 : boundedPreSelection,
          // transforming highlighted days (perhaps nested array)
          // to flat Map for faster access in day.jsx
          highlightDates: getHighLightDaysMap(_this.props.highlightDates),
          focused: false,
          // used to focus day in inline version after month has changed, but not on
          // initial render
          shouldFocusDayInline: false,
          isRenderAriaLiveMessage: false,
          wasHidden: false
        };
      };
      _this.resetHiddenStatus = function() {
        _this.setState(_assign(_assign({}, _this.state), { wasHidden: false }));
      };
      _this.setHiddenStatus = function() {
        _this.setState(_assign(_assign({}, _this.state), { wasHidden: true }));
      };
      _this.setHiddenStateOnVisibilityHidden = function() {
        if (document.visibilityState !== "hidden") {
          return;
        }
        _this.setHiddenStatus();
      };
      _this.clearPreventFocusTimeout = function() {
        if (_this.preventFocusTimeout) {
          clearTimeout(_this.preventFocusTimeout);
        }
      };
      _this.setFocus = function() {
        if (_this.input && _this.input.focus) {
          _this.input.focus({ preventScroll: true });
        }
      };
      _this.setBlur = function() {
        if (_this.input && _this.input.blur) {
          _this.input.blur();
        }
        _this.cancelFocusInput();
      };
      _this.setOpen = function(open, skipSetBlur) {
        if (skipSetBlur === void 0) {
          skipSetBlur = false;
        }
        _this.setState({
          open,
          preSelection: open && _this.state.open ? _this.state.preSelection : _this.calcInitialState().preSelection,
          lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE
        }, function() {
          if (!open) {
            _this.setState(function(prev) {
              return {
                focused: skipSetBlur ? prev.focused : false
              };
            }, function() {
              !skipSetBlur && _this.setBlur();
              _this.setState({ inputValue: null });
            });
          }
        });
      };
      _this.inputOk = function() {
        return isDate(_this.state.preSelection);
      };
      _this.isCalendarOpen = function() {
        return _this.props.open === void 0 ? _this.state.open && !_this.props.disabled && !_this.props.readOnly : _this.props.open;
      };
      _this.handleFocus = function(event) {
        var _a2, _b;
        var isAutoReFocus = _this.state.wasHidden;
        var isOpenAllowed = isAutoReFocus ? _this.state.open : true;
        if (isAutoReFocus) {
          _this.resetHiddenStatus();
        }
        if (!_this.state.preventFocus && isOpenAllowed) {
          (_b = (_a2 = _this.props).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
          if (!_this.props.preventOpenOnFocus && !_this.props.readOnly) {
            _this.setOpen(true);
          }
        }
        _this.setState({ focused: true });
      };
      _this.sendFocusBackToInput = function() {
        if (_this.preventFocusTimeout) {
          _this.clearPreventFocusTimeout();
        }
        _this.setState({ preventFocus: true }, function() {
          _this.preventFocusTimeout = setTimeout(function() {
            _this.setFocus();
            _this.setState({ preventFocus: false });
          });
        });
      };
      _this.cancelFocusInput = function() {
        clearTimeout(_this.inputFocusTimeout);
        _this.inputFocusTimeout = void 0;
      };
      _this.deferFocusInput = function() {
        _this.cancelFocusInput();
        _this.inputFocusTimeout = setTimeout(function() {
          return _this.setFocus();
        }, 1);
      };
      _this.handleDropdownFocus = function() {
        _this.cancelFocusInput();
      };
      _this.handleBlur = function(event) {
        var _a2, _b;
        if (!_this.state.open || _this.props.withPortal || _this.props.showTimeInput) {
          (_b = (_a2 = _this.props).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
        }
        _this.setState({ focused: false });
      };
      _this.handleCalendarClickOutside = function(event) {
        var _a2, _b;
        if (!_this.props.inline) {
          _this.setOpen(false);
        }
        (_b = (_a2 = _this.props).onClickOutside) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
        if (_this.props.withPortal) {
          event.preventDefault();
        }
      };
      _this.handleChange = function() {
        var allArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          allArgs[_i] = arguments[_i];
        }
        var event = allArgs[0];
        if (_this.props.onChangeRaw) {
          _this.props.onChangeRaw.apply(_this, allArgs);
          if (!event || typeof event.isDefaultPrevented !== "function" || event.isDefaultPrevented()) {
            return;
          }
        }
        _this.setState({
          inputValue: (event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement ? event.target.value : null,
          lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT
        });
        var _a2 = _this.props, _b = _a2.dateFormat, dateFormat = _b === void 0 ? DatePicker2.defaultProps.dateFormat : _b, _c = _a2.strictParsing, strictParsing = _c === void 0 ? DatePicker2.defaultProps.strictParsing : _c;
        var date = parseDate2((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement ? event.target.value : "", dateFormat, _this.props.locale, strictParsing, _this.props.minDate);
        if (_this.props.showTimeSelectOnly && _this.props.selected && date && !isSameDay2(date, _this.props.selected)) {
          date = set(_this.props.selected, {
            hours: getHours(date),
            minutes: getMinutes(date),
            seconds: getSeconds(date)
          });
        }
        if (date || !((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement) || !(event === null || event === void 0 ? void 0 : event.target.value)) {
          _this.setSelected(date, event, true);
        }
      };
      _this.handleSelect = function(date, event, monthSelectedIn) {
        if (_this.props.shouldCloseOnSelect && !_this.props.showTimeSelect) {
          _this.sendFocusBackToInput();
        }
        if (_this.props.onChangeRaw) {
          _this.props.onChangeRaw(event);
        }
        _this.setSelected(date, event, false, monthSelectedIn);
        if (_this.props.showDateSelect) {
          _this.setState({ isRenderAriaLiveMessage: true });
        }
        if (!_this.props.shouldCloseOnSelect || _this.props.showTimeSelect) {
          _this.setPreSelection(date);
        } else if (!_this.props.inline) {
          if (!_this.props.selectsRange) {
            _this.setOpen(false);
          }
          var _a2 = _this.props, startDate = _a2.startDate, endDate = _a2.endDate;
          if (startDate && !endDate && (_this.props.swapRange || !isDateBefore(date, startDate))) {
            _this.setOpen(false);
          }
        }
      };
      _this.setSelected = function(date, event, keepInput, monthSelectedIn) {
        var changedDate = date;
        if (_this.props.showYearPicker) {
          if (changedDate !== null && isYearDisabled(getYear(changedDate), _this.props)) {
            return;
          }
        } else if (_this.props.showMonthYearPicker) {
          if (changedDate !== null && isMonthDisabled(changedDate, _this.props)) {
            return;
          }
        } else {
          if (changedDate !== null && isDayDisabled(changedDate, _this.props)) {
            return;
          }
        }
        var _a2 = _this.props, onChange = _a2.onChange, selectsRange = _a2.selectsRange, startDate = _a2.startDate, endDate = _a2.endDate, selectsMultiple = _a2.selectsMultiple, selectedDates = _a2.selectedDates, minTime2 = _a2.minTime, swapRange = _a2.swapRange;
        if (!isEqual2(_this.props.selected, changedDate) || _this.props.allowSameDay || selectsRange || selectsMultiple) {
          if (changedDate !== null) {
            if (_this.props.selected && (!keepInput || !_this.props.showTimeSelect && !_this.props.showTimeSelectOnly && !_this.props.showTimeInput)) {
              changedDate = setTime(changedDate, {
                hour: getHours(_this.props.selected),
                minute: getMinutes(_this.props.selected),
                second: getSeconds(_this.props.selected)
              });
            }
            if (!keepInput && (_this.props.showTimeSelect || _this.props.showTimeSelectOnly)) {
              if (minTime2) {
                changedDate = setTime(changedDate, {
                  hour: minTime2.getHours(),
                  minute: minTime2.getMinutes(),
                  second: minTime2.getSeconds()
                });
              }
            }
            if (!_this.props.inline) {
              _this.setState({
                preSelection: changedDate
              });
            }
            if (!_this.props.focusSelectedMonth) {
              _this.setState({ monthSelectedIn });
            }
          }
          if (selectsRange) {
            var noRanges = !startDate && !endDate;
            var hasStartRange = startDate && !endDate;
            var isRangeFilled = startDate && endDate;
            if (noRanges) {
              onChange([changedDate, null], event);
            } else if (hasStartRange) {
              if (changedDate === null) {
                onChange([null, null], event);
              } else if (isDateBefore(changedDate, startDate)) {
                if (swapRange) {
                  onChange([changedDate, startDate], event);
                } else {
                  onChange([changedDate, null], event);
                }
              } else {
                onChange([startDate, changedDate], event);
              }
            }
            if (isRangeFilled) {
              onChange([changedDate, null], event);
            }
          } else if (selectsMultiple) {
            if (changedDate !== null) {
              if (!(selectedDates === null || selectedDates === void 0 ? void 0 : selectedDates.length)) {
                onChange([changedDate], event);
              } else {
                var isChangedDateAlreadySelected = selectedDates.some(function(selectedDate) {
                  return isSameDay2(selectedDate, changedDate);
                });
                if (isChangedDateAlreadySelected) {
                  var nextDates = selectedDates.filter(function(selectedDate) {
                    return !isSameDay2(selectedDate, changedDate);
                  });
                  onChange(nextDates, event);
                } else {
                  onChange(__spreadArray(__spreadArray([], selectedDates, true), [changedDate], false), event);
                }
              }
            }
          } else {
            onChange(changedDate, event);
          }
        }
        if (!keepInput) {
          _this.props.onSelect(changedDate, event);
          _this.setState({ inputValue: null });
        }
      };
      _this.setPreSelection = function(date) {
        var hasMinDate = isDate(_this.props.minDate);
        var hasMaxDate = isDate(_this.props.maxDate);
        var isValidDateSelection = true;
        if (date) {
          var dateStartOfDay = getStartOfDay(date);
          if (hasMinDate && hasMaxDate) {
            isValidDateSelection = isDayInRange(date, _this.props.minDate, _this.props.maxDate);
          } else if (hasMinDate) {
            var minDateStartOfDay = getStartOfDay(_this.props.minDate);
            isValidDateSelection = isAfter(date, minDateStartOfDay) || isEqual2(dateStartOfDay, minDateStartOfDay);
          } else if (hasMaxDate) {
            var maxDateEndOfDay = getEndOfDay(_this.props.maxDate);
            isValidDateSelection = isBefore(date, maxDateEndOfDay) || isEqual2(dateStartOfDay, maxDateEndOfDay);
          }
        }
        if (isValidDateSelection) {
          _this.setState({
            preSelection: date
          });
        }
      };
      _this.toggleCalendar = function() {
        _this.setOpen(!_this.state.open);
      };
      _this.handleTimeChange = function(time) {
        if (_this.props.selectsRange || _this.props.selectsMultiple) {
          return;
        }
        var selected = _this.props.selected ? _this.props.selected : _this.getPreSelection();
        var changedDate = _this.props.selected ? time : setTime(selected, {
          hour: getHours(time),
          minute: getMinutes(time)
        });
        _this.setState({
          preSelection: changedDate
        });
        _this.props.onChange(changedDate);
        if (_this.props.shouldCloseOnSelect && !_this.props.showTimeInput) {
          _this.sendFocusBackToInput();
          _this.setOpen(false);
        }
        if (_this.props.showTimeInput) {
          _this.setOpen(true);
        }
        if (_this.props.showTimeSelectOnly || _this.props.showTimeSelect) {
          _this.setState({ isRenderAriaLiveMessage: true });
        }
        _this.setState({ inputValue: null });
      };
      _this.onInputClick = function() {
        var _a2, _b;
        if (!_this.props.disabled && !_this.props.readOnly) {
          _this.setOpen(true);
        }
        (_b = (_a2 = _this.props).onInputClick) === null || _b === void 0 ? void 0 : _b.call(_a2);
      };
      _this.onInputKeyDown = function(event) {
        var _a2, _b, _c, _d, _e;
        (_b = (_a2 = _this.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
        var eventKey = event.key;
        if (!_this.state.open && !_this.props.inline && !_this.props.preventOpenOnFocus) {
          if (eventKey === KeyType.ArrowDown || eventKey === KeyType.ArrowUp || eventKey === KeyType.Enter) {
            _this.onInputClick();
          }
          return;
        }
        if (_this.state.open) {
          if (eventKey === KeyType.ArrowDown || eventKey === KeyType.ArrowUp) {
            event.preventDefault();
            var selectorString = _this.props.showTimeSelectOnly ? ".react-datepicker__time-list-item[tabindex='0']" : _this.props.showWeekPicker && _this.props.showWeekNumbers ? '.react-datepicker__week-number[tabindex="0"]' : _this.props.showFullMonthYearPicker || _this.props.showMonthYearPicker ? '.react-datepicker__month-text[tabindex="0"]' : '.react-datepicker__day[tabindex="0"]';
            var selectedItem = ((_c = _this.calendar) === null || _c === void 0 ? void 0 : _c.componentNode) instanceof Element && _this.calendar.componentNode.querySelector(selectorString);
            selectedItem instanceof HTMLElement && selectedItem.focus({ preventScroll: true });
            return;
          }
          var copy = newDate(_this.state.preSelection);
          if (eventKey === KeyType.Enter) {
            event.preventDefault();
            if (_this.inputOk() && _this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE) {
              _this.handleSelect(copy, event);
              !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
            } else {
              _this.setOpen(false);
            }
          } else if (eventKey === KeyType.Escape) {
            event.preventDefault();
            _this.sendFocusBackToInput();
            _this.setOpen(false);
          } else if (eventKey === KeyType.Tab) {
            _this.setOpen(false);
          }
          if (!_this.inputOk()) {
            (_e = (_d = _this.props).onInputError) === null || _e === void 0 ? void 0 : _e.call(_d, { code: 1, msg: INPUT_ERR_1 });
          }
        }
      };
      _this.onPortalKeyDown = function(event) {
        var eventKey = event.key;
        if (eventKey === KeyType.Escape) {
          event.preventDefault();
          _this.setState({
            preventFocus: true
          }, function() {
            _this.setOpen(false);
            setTimeout(function() {
              _this.setFocus();
              _this.setState({ preventFocus: false });
            });
          });
        }
      };
      _this.onDayKeyDown = function(event) {
        var _a2, _b, _c, _d;
        var _e = _this.props, minDate = _e.minDate, maxDate = _e.maxDate, disabledKeyboardNavigation = _e.disabledKeyboardNavigation, showWeekPicker = _e.showWeekPicker, shouldCloseOnSelect = _e.shouldCloseOnSelect, locale = _e.locale, calendarStartDay = _e.calendarStartDay, adjustDateOnChange = _e.adjustDateOnChange, inline4 = _e.inline;
        (_b = (_a2 = _this.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
        if (disabledKeyboardNavigation)
          return;
        var eventKey = event.key;
        var isShiftKeyActive = event.shiftKey;
        var copy = newDate(_this.state.preSelection);
        var calculateNewDate = function(eventKey2, date) {
          var newCalculatedDate = date;
          switch (eventKey2) {
            case KeyType.ArrowRight:
              newCalculatedDate = showWeekPicker ? addWeeks(date, 1) : addDays(date, 1);
              break;
            case KeyType.ArrowLeft:
              newCalculatedDate = showWeekPicker ? subWeeks(date, 1) : subDays(date, 1);
              break;
            case KeyType.ArrowUp:
              newCalculatedDate = subWeeks(date, 1);
              break;
            case KeyType.ArrowDown:
              newCalculatedDate = addWeeks(date, 1);
              break;
            case KeyType.PageUp:
              newCalculatedDate = isShiftKeyActive ? subYears(date, 1) : subMonths(date, 1);
              break;
            case KeyType.PageDown:
              newCalculatedDate = isShiftKeyActive ? addYears(date, 1) : addMonths(date, 1);
              break;
            case KeyType.Home:
              newCalculatedDate = getStartOfWeek(date, locale, calendarStartDay);
              break;
            case KeyType.End:
              newCalculatedDate = getEndOfWeek(date);
              break;
          }
          return newCalculatedDate;
        };
        var getNewDate = function(eventKey2, date) {
          var MAX_ITERATIONS = 40;
          var eventKeyCopy = eventKey2;
          var validDateFound = false;
          var iterations = 0;
          var newSelection2 = calculateNewDate(eventKey2, date);
          while (!validDateFound) {
            if (iterations >= MAX_ITERATIONS) {
              newSelection2 = date;
              break;
            }
            if (minDate && newSelection2 < minDate) {
              eventKeyCopy = KeyType.ArrowRight;
              newSelection2 = isDayDisabled(minDate, _this.props) ? calculateNewDate(eventKeyCopy, newSelection2) : minDate;
            }
            if (maxDate && newSelection2 > maxDate) {
              eventKeyCopy = KeyType.ArrowLeft;
              newSelection2 = isDayDisabled(maxDate, _this.props) ? calculateNewDate(eventKeyCopy, newSelection2) : maxDate;
            }
            if (isDayDisabled(newSelection2, _this.props)) {
              if (eventKeyCopy === KeyType.PageUp || eventKeyCopy === KeyType.Home) {
                eventKeyCopy = KeyType.ArrowRight;
              }
              if (eventKeyCopy === KeyType.PageDown || eventKeyCopy === KeyType.End) {
                eventKeyCopy = KeyType.ArrowLeft;
              }
              newSelection2 = calculateNewDate(eventKeyCopy, newSelection2);
            } else {
              validDateFound = true;
            }
            iterations++;
          }
          return newSelection2;
        };
        if (eventKey === KeyType.Enter) {
          event.preventDefault();
          _this.handleSelect(copy, event);
          !shouldCloseOnSelect && _this.setPreSelection(copy);
          return;
        } else if (eventKey === KeyType.Escape) {
          event.preventDefault();
          _this.setOpen(false);
          if (!_this.inputOk()) {
            (_d = (_c = _this.props).onInputError) === null || _d === void 0 ? void 0 : _d.call(_c, { code: 1, msg: INPUT_ERR_1 });
          }
          return;
        }
        var newSelection = null;
        switch (eventKey) {
          case KeyType.ArrowLeft:
          case KeyType.ArrowRight:
          case KeyType.ArrowUp:
          case KeyType.ArrowDown:
          case KeyType.PageUp:
          case KeyType.PageDown:
          case KeyType.Home:
          case KeyType.End:
            newSelection = getNewDate(eventKey, copy);
            break;
        }
        if (!newSelection) {
          if (_this.props.onInputError) {
            _this.props.onInputError({ code: 1, msg: INPUT_ERR_1 });
          }
          return;
        }
        event.preventDefault();
        _this.setState({ lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE });
        if (adjustDateOnChange) {
          _this.setSelected(newSelection);
        }
        _this.setPreSelection(newSelection);
        if (inline4) {
          var prevMonth = getMonth(copy);
          var newMonth = getMonth(newSelection);
          var prevYear = getYear(copy);
          var newYear = getYear(newSelection);
          if (prevMonth !== newMonth || prevYear !== newYear) {
            _this.setState({ shouldFocusDayInline: true });
          } else {
            _this.setState({ shouldFocusDayInline: false });
          }
        }
      };
      _this.onPopperKeyDown = function(event) {
        var eventKey = event.key;
        if (eventKey === KeyType.Escape) {
          event.preventDefault();
          _this.sendFocusBackToInput();
        }
      };
      _this.onClearClick = function(event) {
        if (event) {
          if (event.preventDefault) {
            event.preventDefault();
          }
        }
        _this.sendFocusBackToInput();
        var _a2 = _this.props, selectsRange = _a2.selectsRange, onChange = _a2.onChange;
        if (selectsRange) {
          onChange([null, null], event);
        } else {
          onChange(null, event);
        }
        if (_this.props.selectsRange) {
          _this.props.onChange([null, null], event);
        } else {
          _this.props.onChange(null, event);
        }
        _this.setState({ inputValue: null });
      };
      _this.clear = function() {
        _this.onClearClick();
      };
      _this.onScroll = function(event) {
        if (typeof _this.props.closeOnScroll === "boolean" && _this.props.closeOnScroll) {
          if (event.target === document || event.target === document.documentElement || event.target === document.body) {
            _this.setOpen(false);
          }
        } else if (typeof _this.props.closeOnScroll === "function") {
          if (_this.props.closeOnScroll(event)) {
            _this.setOpen(false);
          }
        }
      };
      _this.renderCalendar = function() {
        var _a2, _b;
        if (!_this.props.inline && !_this.isCalendarOpen()) {
          return null;
        }
        return import_react4.default.createElement(WrappedCalendar, _assign({ ref: function(elem) {
          _this.calendar = elem;
        } }, _this.props, _this.state, { setOpen: _this.setOpen, dateFormat: (_a2 = _this.props.dateFormatCalendar) !== null && _a2 !== void 0 ? _a2 : DatePicker2.defaultProps.dateFormatCalendar, onSelect: _this.handleSelect, onClickOutside: _this.handleCalendarClickOutside, holidays: getHolidaysMap(_this.modifyHolidays()), outsideClickIgnoreClass, onDropdownFocus: _this.handleDropdownFocus, onTimeChange: _this.handleTimeChange, className: _this.props.calendarClassName, container: _this.props.calendarContainer, handleOnKeyDown: _this.props.onKeyDown, handleOnDayKeyDown: _this.onDayKeyDown, setPreSelection: _this.setPreSelection, dropdownMode: (_b = _this.props.dropdownMode) !== null && _b !== void 0 ? _b : DatePicker2.defaultProps.dropdownMode }), _this.props.children);
      };
      _this.renderAriaLiveRegion = function() {
        var _a2 = _this.props, _b = _a2.dateFormat, dateFormat = _b === void 0 ? DatePicker2.defaultProps.dateFormat : _b, locale = _a2.locale;
        var isContainsTime = _this.props.showTimeInput || _this.props.showTimeSelect;
        var longDateFormat = isContainsTime ? "PPPPp" : "PPPP";
        var ariaLiveMessage;
        if (_this.props.selectsRange) {
          ariaLiveMessage = "Selected start date: ".concat(safeDateFormat(_this.props.startDate, {
            dateFormat: longDateFormat,
            locale
          }), ". ").concat(_this.props.endDate ? "End date: " + safeDateFormat(_this.props.endDate, {
            dateFormat: longDateFormat,
            locale
          }) : "");
        } else {
          if (_this.props.showTimeSelectOnly) {
            ariaLiveMessage = "Selected time: ".concat(safeDateFormat(_this.props.selected, { dateFormat, locale }));
          } else if (_this.props.showYearPicker) {
            ariaLiveMessage = "Selected year: ".concat(safeDateFormat(_this.props.selected, { dateFormat: "yyyy", locale }));
          } else if (_this.props.showMonthYearPicker) {
            ariaLiveMessage = "Selected month: ".concat(safeDateFormat(_this.props.selected, { dateFormat: "MMMM yyyy", locale }));
          } else if (_this.props.showQuarterYearPicker) {
            ariaLiveMessage = "Selected quarter: ".concat(safeDateFormat(_this.props.selected, {
              dateFormat: "yyyy, QQQ",
              locale
            }));
          } else {
            ariaLiveMessage = "Selected date: ".concat(safeDateFormat(_this.props.selected, {
              dateFormat: longDateFormat,
              locale
            }));
          }
        }
        return import_react4.default.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, ariaLiveMessage);
      };
      _this.renderDateInput = function() {
        var _a2, _b;
        var _c;
        var className = clsx(_this.props.className, (_a2 = {}, _a2[outsideClickIgnoreClass] = _this.state.open, _a2));
        var customInput = _this.props.customInput || import_react4.default.createElement("input", { type: "text" });
        var customInputRef = _this.props.customInputRef || "ref";
        var _d = _this.props, _e = _d.dateFormat, dateFormat = _e === void 0 ? DatePicker2.defaultProps.dateFormat : _e, locale = _d.locale;
        var inputValue = typeof _this.props.value === "string" ? _this.props.value : typeof _this.state.inputValue === "string" ? _this.state.inputValue : _this.props.selectsRange ? safeDateRangeFormat(_this.props.startDate, _this.props.endDate, {
          dateFormat,
          locale
        }) : _this.props.selectsMultiple ? safeMultipleDatesFormat((_c = _this.props.selectedDates) !== null && _c !== void 0 ? _c : [], {
          dateFormat,
          locale
        }) : safeDateFormat(_this.props.selected, {
          dateFormat,
          locale
        });
        return (0, import_react4.cloneElement)(customInput, (_b = {}, _b[customInputRef] = function(input) {
          _this.input = input;
        }, _b.value = inputValue, _b.onBlur = _this.handleBlur, _b.onChange = _this.handleChange, _b.onClick = _this.onInputClick, _b.onFocus = _this.handleFocus, _b.onKeyDown = _this.onInputKeyDown, _b.id = _this.props.id, _b.name = _this.props.name, _b.form = _this.props.form, _b.autoFocus = _this.props.autoFocus, _b.placeholder = _this.props.placeholderText, _b.disabled = _this.props.disabled, _b.autoComplete = _this.props.autoComplete, _b.className = clsx(customInput.props.className, className), _b.title = _this.props.title, _b.readOnly = _this.props.readOnly, _b.required = _this.props.required, _b.tabIndex = _this.props.tabIndex, _b["aria-describedby"] = _this.props.ariaDescribedBy, _b["aria-invalid"] = _this.props.ariaInvalid, _b["aria-labelledby"] = _this.props.ariaLabelledBy, _b["aria-required"] = _this.props.ariaRequired, _b));
      };
      _this.renderClearButton = function() {
        var _a2 = _this.props, isClearable = _a2.isClearable, disabled = _a2.disabled, selected = _a2.selected, startDate = _a2.startDate, endDate = _a2.endDate, clearButtonTitle = _a2.clearButtonTitle, _b = _a2.clearButtonClassName, clearButtonClassName = _b === void 0 ? "" : _b, _c = _a2.ariaLabelClose, ariaLabelClose = _c === void 0 ? "Close" : _c, selectedDates = _a2.selectedDates;
        if (isClearable && (selected != null || startDate != null || endDate != null || (selectedDates === null || selectedDates === void 0 ? void 0 : selectedDates.length))) {
          return import_react4.default.createElement("button", { type: "button", className: clsx("react-datepicker__close-icon", clearButtonClassName, { "react-datepicker__close-icon--disabled": disabled }), disabled, "aria-label": ariaLabelClose, onClick: _this.onClearClick, title: clearButtonTitle, tabIndex: -1 });
        } else {
          return null;
        }
      };
      _this.state = _this.calcInitialState();
      _this.preventFocusTimeout = void 0;
      return _this;
    }
    Object.defineProperty(DatePicker2, "defaultProps", {
      get: function() {
        return {
          allowSameDay: false,
          dateFormat: "MM/dd/yyyy",
          dateFormatCalendar: "LLLL yyyy",
          onChange: function() {
          },
          disabled: false,
          disabledKeyboardNavigation: false,
          dropdownMode: "scroll",
          onFocus: function() {
          },
          onBlur: function() {
          },
          onKeyDown: function() {
          },
          onInputClick: function() {
          },
          onSelect: function() {
          },
          onClickOutside: function() {
          },
          onMonthChange: function() {
          },
          onCalendarOpen: function() {
          },
          onCalendarClose: function() {
          },
          preventOpenOnFocus: false,
          onYearChange: function() {
          },
          onInputError: function() {
          },
          monthsShown: 1,
          readOnly: false,
          withPortal: false,
          selectsDisabledDaysInRange: false,
          shouldCloseOnSelect: true,
          showTimeSelect: false,
          showTimeInput: false,
          showPreviousMonths: false,
          showMonthYearPicker: false,
          showFullMonthYearPicker: false,
          showTwoColumnMonthYearPicker: false,
          showFourColumnMonthYearPicker: false,
          showYearPicker: false,
          showQuarterYearPicker: false,
          showWeekPicker: false,
          strictParsing: false,
          swapRange: false,
          timeIntervals: 30,
          timeCaption: "Time",
          previousMonthAriaLabel: "Previous Month",
          previousMonthButtonLabel: "Previous Month",
          nextMonthAriaLabel: "Next Month",
          nextMonthButtonLabel: "Next Month",
          previousYearAriaLabel: "Previous Year",
          previousYearButtonLabel: "Previous Year",
          nextYearAriaLabel: "Next Year",
          nextYearButtonLabel: "Next Year",
          timeInputLabel: "Time",
          enableTabLoop: true,
          yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
          focusSelectedMonth: false,
          showPopperArrow: true,
          excludeScrollbar: true,
          customTimeInput: null,
          calendarStartDay: void 0,
          toggleCalendarOnIconClick: false,
          usePointerEvent: false
        };
      },
      enumerable: false,
      configurable: true
    });
    DatePicker2.prototype.componentDidMount = function() {
      window.addEventListener("scroll", this.onScroll, true);
      document.addEventListener("visibilitychange", this.setHiddenStateOnVisibilityHidden);
    };
    DatePicker2.prototype.componentDidUpdate = function(prevProps, prevState) {
      var _a2, _b, _c, _d;
      if (prevProps.inline && hasPreSelectionChanged(prevProps.selected, this.props.selected)) {
        this.setPreSelection(this.props.selected);
      }
      if (this.state.monthSelectedIn !== void 0 && prevProps.monthsShown !== this.props.monthsShown) {
        this.setState({ monthSelectedIn: 0 });
      }
      if (prevProps.highlightDates !== this.props.highlightDates) {
        this.setState({
          highlightDates: getHighLightDaysMap(this.props.highlightDates)
        });
      }
      if (!prevState.focused && !isEqual2(prevProps.selected, this.props.selected)) {
        this.setState({ inputValue: null });
      }
      if (prevState.open !== this.state.open) {
        if (prevState.open === false && this.state.open === true) {
          (_b = (_a2 = this.props).onCalendarOpen) === null || _b === void 0 ? void 0 : _b.call(_a2);
        }
        if (prevState.open === true && this.state.open === false) {
          (_d = (_c = this.props).onCalendarClose) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
      }
    };
    DatePicker2.prototype.componentWillUnmount = function() {
      this.clearPreventFocusTimeout();
      window.removeEventListener("scroll", this.onScroll, true);
      document.removeEventListener("visibilitychange", this.setHiddenStateOnVisibilityHidden);
    };
    DatePicker2.prototype.renderInputContainer = function() {
      var _a2 = this.props, showIcon = _a2.showIcon, icon = _a2.icon, calendarIconClassname = _a2.calendarIconClassname, calendarIconClassName = _a2.calendarIconClassName, toggleCalendarOnIconClick = _a2.toggleCalendarOnIconClick;
      var open = this.state.open;
      if (calendarIconClassname) {
        console.warn("calendarIconClassname props is deprecated. should use calendarIconClassName props.");
      }
      return import_react4.default.createElement(
        "div",
        { className: "react-datepicker__input-container".concat(showIcon ? " react-datepicker__view-calendar-icon" : "") },
        showIcon && import_react4.default.createElement(CalendarIcon, _assign({ icon, className: clsx(calendarIconClassName, !calendarIconClassName && calendarIconClassname, open && "react-datepicker-ignore-onclickoutside") }, toggleCalendarOnIconClick ? {
          onClick: this.toggleCalendar
        } : null)),
        this.state.isRenderAriaLiveMessage && this.renderAriaLiveRegion(),
        this.renderDateInput(),
        this.renderClearButton()
      );
    };
    DatePicker2.prototype.render = function() {
      var calendar = this.renderCalendar();
      if (this.props.inline)
        return calendar;
      if (this.props.withPortal) {
        var portalContainer = this.state.open ? import_react4.default.createElement(
          TabLoop,
          { enableTabLoop: this.props.enableTabLoop },
          import_react4.default.createElement("div", { className: "react-datepicker__portal", tabIndex: -1, onKeyDown: this.onPortalKeyDown }, calendar)
        ) : null;
        if (this.state.open && this.props.portalId) {
          portalContainer = import_react4.default.createElement(Portal, _assign({ portalId: this.props.portalId }, this.props), portalContainer);
        }
        return import_react4.default.createElement(
          "div",
          null,
          this.renderInputContainer(),
          portalContainer
        );
      }
      return import_react4.default.createElement(PopperComponent$1, _assign({}, this.props, { className: this.props.popperClassName, hidePopper: !this.isCalendarOpen(), targetComponent: this.renderInputContainer(), popperComponent: calendar, popperOnKeyDown: this.onPopperKeyDown, showArrow: this.props.showPopperArrow }));
    };
    return DatePicker2;
  }(import_react4.Component)
);
var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";
export {
  CalendarContainer,
  DatePicker as default,
  getDefaultLocale,
  registerLocale,
  setDefaultLocale
};
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

react-datepicker/dist/es/index.js:
  (*!
    react-datepicker v7.2.0
    https://github.com/Hacker0x01/react-datepicker
    Released under the MIT License.
  *)
*/
//# sourceMappingURL=react-datepicker.js.map
