/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "popperGenerator": () => (/* binding */ popperGenerator),
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__.default)
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__.default)(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__.default)(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__.default)(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__.default)((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__.default)([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__.default)([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__.default)(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__.default)(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__.default)(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__.default)(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__.default)(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__.default)(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__.default)(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__.default)((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__.default)(element)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__.default)((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__.default)((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__.default)(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__.default)((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__.default)(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__.default)(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__.default)(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__.default)(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__.default)(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");






 // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__.default)(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_1__.default)(elementOrVirtualElement);
  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_4__.default)(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_5__.default)(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_1__.default)(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_6__.default)(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__.default)(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__.default)(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__.default)(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__.default)(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__.default)(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__.default)(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");







function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_2__.default)(element);

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_4__.default)(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_5__.default)(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__.default)(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__.default)(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__.default)(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__.default)(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__.default)(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");



function getViewportRect(element) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__.default)(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__.default)(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__.default)((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__.default)(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__.default)(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isHTMLElement": () => (/* binding */ isHTMLElement),
/* harmony export */   "isShadowRoot": () => (/* binding */ isShadowRoot)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__.default)(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__.default)(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__.default)(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__.default)(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__.default)(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "auto": () => (/* binding */ auto),
/* harmony export */   "basePlacements": () => (/* binding */ basePlacements),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "end": () => (/* binding */ end),
/* harmony export */   "clippingParents": () => (/* binding */ clippingParents),
/* harmony export */   "viewport": () => (/* binding */ viewport),
/* harmony export */   "popper": () => (/* binding */ popper),
/* harmony export */   "reference": () => (/* binding */ reference),
/* harmony export */   "variationPlacements": () => (/* binding */ variationPlacements),
/* harmony export */   "placements": () => (/* binding */ placements),
/* harmony export */   "beforeRead": () => (/* binding */ beforeRead),
/* harmony export */   "read": () => (/* binding */ read),
/* harmony export */   "afterRead": () => (/* binding */ afterRead),
/* harmony export */   "beforeMain": () => (/* binding */ beforeMain),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "afterMain": () => (/* binding */ afterMain),
/* harmony export */   "beforeWrite": () => (/* binding */ beforeWrite),
/* harmony export */   "write": () => (/* binding */ write),
/* harmony export */   "afterWrite": () => (/* binding */ afterWrite),
/* harmony export */   "modifierPhases": () => (/* binding */ modifierPhases)
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterMain),
/* harmony export */   "afterRead": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterRead),
/* harmony export */   "afterWrite": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterWrite),
/* harmony export */   "auto": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.auto),
/* harmony export */   "basePlacements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements),
/* harmony export */   "beforeMain": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeMain),
/* harmony export */   "beforeRead": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeRead),
/* harmony export */   "beforeWrite": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeWrite),
/* harmony export */   "bottom": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom),
/* harmony export */   "clippingParents": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents),
/* harmony export */   "end": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.end),
/* harmony export */   "left": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.left),
/* harmony export */   "main": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.main),
/* harmony export */   "modifierPhases": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases),
/* harmony export */   "placements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements),
/* harmony export */   "popper": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper),
/* harmony export */   "read": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.read),
/* harmony export */   "reference": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference),
/* harmony export */   "right": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.right),
/* harmony export */   "start": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.start),
/* harmony export */   "top": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.top),
/* harmony export */   "variationPlacements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements),
/* harmony export */   "viewport": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport),
/* harmony export */   "write": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.write),
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.computeStyles),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.offset),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.preventOverflow),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.popperGenerator),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "createPopperBase": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.createPopper),
/* harmony export */   "createPopper": () => (/* reexport safe */ _popper_js__WEBPACK_IMPORTED_MODULE_4__.createPopper),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__.createPopper)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__.default)(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__.default)(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__.default)(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__.default)(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__.default)(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__.default)(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.default)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__.default)(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapToStyles": () => (/* binding */ mapToStyles),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");






 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr) || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__.default)(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__.default)(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__.default)(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__.default)(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__.default)(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__.default)(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__.default)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__.default)(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__.default)(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "arrow": () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "hide": () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "offset": () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__.default)
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "distanceAndSkiddingToXY": () => (/* binding */ distanceAndSkiddingToXY),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__.default)(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__.default)(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__.default)(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__.default)(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__.default)(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__.default)();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.default)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__.default)(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.default)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

      var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.default)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(_min, tetherMin) : _min, _offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__.default)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__.default, _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__.default, _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__.default, _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__.default];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__.default, _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__.default, _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__.default, _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__.default, _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__.default, _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__.default, _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__.default, _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__.default, _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__.default];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__.default)(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__.default)(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__.default)(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__.default)(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__.default)(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__.default)((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__.default)(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__.default)(referenceElement);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__.default)({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__.default)(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "round": () => (/* binding */ round)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniqueBy)
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validateModifiers)
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ within)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}

/***/ }),

/***/ "./resources/js/bootstrap.bundle.js":
/*!******************************************!*\
  !*** ./resources/js/bootstrap.bundle.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap v5.0.2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);
})(this, function () {
  'use strict';
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var _KEY_TO_DIRECTION;

  var NODE_TEXT = 3;
  var SelectorEngine = {
    find: function find(selector) {
      var _ref5;

      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
      return (_ref5 = []).concat.apply(_ref5, _toConsumableArray(Element.prototype.querySelectorAll.call(element, selector)));
    },
    findOne: function findOne(selector) {
      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
      return Element.prototype.querySelector.call(element, selector);
    },
    children: function children(element, selector) {
      var _ref6;

      return (_ref6 = []).concat.apply(_ref6, _toConsumableArray(element.children)).filter(function (child) {
        return child.matches(selector);
      });
    },
    parents: function parents(element, selector) {
      var parents = [];
      var ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },
    prev: function prev(element, selector) {
      var previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },
    next: function next(element, selector) {
      var next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    }
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000;
  var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  var toType = function toType(obj) {
    if (obj === null || obj === undefined) {
      return "".concat(obj);
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var getUID = function getUID(prefix) {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  var getSelector = function getSelector(element) {
    var selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = "#".concat(hrefAttr.split('#')[1]);
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  var getSelectorFromElement = function getSelectorFromElement(element) {
    var selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  var getElementFromSelector = function getElementFromSelector(element) {
    var selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    var _window$getComputedSt = window.getComputedStyle(element),
        transitionDuration = _window$getComputedSt.transitionDuration,
        transitionDelay = _window$getComputedSt.transitionDelay;

    var floatTransitionDuration = Number.parseFloat(transitionDuration);
    var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  var triggerTransitionEnd = function triggerTransitionEnd(element) {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  var isElement$1 = function isElement$1(obj) {
    if (!obj || _typeof(obj) !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  var getElement = function getElement(obj) {
    if (isElement$1(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return SelectorEngine.findOne(obj);
    }

    return null;
  };

  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement$1(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError("".concat(componentName.toUpperCase(), ": Option \"").concat(property, "\" provided type \"").concat(valueType, "\" but expected type \"").concat(expectedTypes, "\"."));
      }
    });
  };

  var isVisible = function isVisible(element) {
    if (!isElement$1(element) || element.getClientRects().length === 0) {
      return false;
    }

    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  };

  var isDisabled = function isDisabled(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };

  var findShadowRoot = function findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      var root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  var noop = function noop() {};

  var reflow = function reflow(element) {
    return element.offsetHeight;
  };

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  var DOMContentLoadedCallbacks = [];

  var onDOMContentLoaded = function onDOMContentLoaded(callback) {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', function () {
          DOMContentLoadedCallbacks.forEach(function (callback) {
            return callback();
          });
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  var isRTL = function isRTL() {
    return document.documentElement.dir === 'rtl';
  };

  var defineJQueryPlugin = function defineJQueryPlugin(plugin) {
    onDOMContentLoaded(function () {
      var $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        var name = plugin.NAME;
        var JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = function () {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  var execute = function execute(callback) {
    if (typeof callback === 'function') {
      callback();
    }
  };

  var executeAfterTransition = function executeAfterTransition(callback, transitionElement) {
    var waitForTransition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (!waitForTransition) {
      execute(callback);
      return;
    }

    var durationPadding = 5;
    var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    var called = false;

    var handler = function handler(_ref7) {
      var target = _ref7.target;

      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */


  var getNextActiveElement = function getNextActiveElement(list, activeElement, shouldGetNext, isCycleAllowed) {
    var index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

    if (index === -1) {
      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
    }

    var listLength = list.length;
    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))];
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {}; // Events storage

  var uidEvent = 1;
  var customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  var customEventsRegex = /^(mouseenter|mouseleave)/i;
  var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && "".concat(uid, "::").concat(uidEvent++) || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    var uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      var domElements = element.querySelectorAll(selector);

      for (var target = event.target; target && target !== this; target = target.parentNode) {
        for (var i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              // eslint-disable-next-line unicorn/consistent-destructuring
              EventHandler.off(element, event.type, selector, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler) {
    var delegationSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var uidEventList = Object.keys(events);

    for (var i = 0, len = uidEventList.length; i < len; i++) {
      var event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    var delegation = typeof handler === 'string';
    var originalHandler = delegation ? delegationFn : handler;
    var typeEvent = getTypeEvent(originalTypeEvent);
    var isNative = nativeEvents.has(typeEvent);

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


    if (customEventsRegex.test(originalTypeEvent)) {
      var wrapFn = function wrapFn(fn) {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      if (delegationFn) {
        delegationFn = wrapFn(delegationFn);
      } else {
        handler = wrapFn(handler);
      }
    }

    var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
        _normalizeParams2 = _slicedToArray(_normalizeParams, 3),
        delegation = _normalizeParams2[0],
        originalHandler = _normalizeParams2[1],
        typeEvent = _normalizeParams2[2];

    var events = getEvent(element);
    var handlers = events[typeEvent] || (events[typeEvent] = {});
    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    var fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.includes(namespace)) {
        var event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  var EventHandler = {
    on: function on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },
    one: function one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },
    off: function off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      var _normalizeParams3 = normalizeParams(originalTypeEvent, handler, delegationFn),
          _normalizeParams4 = _slicedToArray(_normalizeParams3, 3),
          delegation = _normalizeParams4[0],
          originalHandler = _normalizeParams4[1],
          typeEvent = _normalizeParams4[2];

      var inNamespace = typeEvent !== originalTypeEvent;
      var events = getEvent(element);
      var isNamespace = originalTypeEvent.startsWith('.');

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      var storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        var handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          var event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },
    trigger: function trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      var $ = getjQuery();
      var typeEvent = getTypeEvent(event);
      var inNamespace = event !== typeEvent;
      var isNative = nativeEvents.has(typeEvent);
      var jQueryEvent;
      var bubbles = true;
      var nativeDispatch = true;
      var defaultPrevented = false;
      var evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        });
      } // merge custom information in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get() {
              return args[key];
            }
          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var elementMap = new Map();
  var Data = {
    set: function set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      var instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error("Bootstrap doesn't allow more than one instance per element. Bound instance: ".concat(Array.from(instanceMap.keys())[0], "."));
        return;
      }

      instanceMap.set(key, instance);
    },
    get: function get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },
    remove: function remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      var instanceMap = elementMap.get(element);
      instanceMap["delete"](key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap["delete"](element);
      }
    }
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var VERSION = '5.0.2';

  var BaseComponent = /*#__PURE__*/function () {
    function BaseComponent(element) {
      _classCallCheck(this, BaseComponent);

      element = getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    _createClass(BaseComponent, [{
      key: "dispose",
      value: function dispose() {
        var _this = this;

        Data.remove(this._element, this.constructor.DATA_KEY);
        EventHandler.off(this._element, this.constructor.EVENT_KEY);
        Object.getOwnPropertyNames(this).forEach(function (propertyName) {
          _this[propertyName] = null;
        });
      }
    }, {
      key: "_queueCallback",
      value: function _queueCallback(callback, element) {
        var isAnimated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        executeAfterTransition(callback, element, isAnimated);
      }
      /** Static */

    }], [{
      key: "getInstance",
      value: function getInstance(element) {
        return Data.get(element, this.DATA_KEY);
      }
    }, {
      key: "getOrCreateInstance",
      value: function getOrCreateInstance(element) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return this.getInstance(element) || new this(element, _typeof(config) === 'object' ? config : null);
      }
    }, {
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "NAME",
      get: function get() {
        throw new Error('You have to implement the static method "NAME", for each component!');
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.".concat(this.NAME);
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".".concat(this.DATA_KEY);
      }
    }]);

    return BaseComponent;
  }();
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$c = 'alert';
  var DATA_KEY$b = 'bs.alert';
  var EVENT_KEY$b = ".".concat(DATA_KEY$b);
  var DATA_API_KEY$8 = '.data-api';
  var SELECTOR_DISMISS = '[data-bs-dismiss="alert"]';
  var EVENT_CLOSE = "close".concat(EVENT_KEY$b);
  var EVENT_CLOSED = "closed".concat(EVENT_KEY$b);
  var EVENT_CLICK_DATA_API$7 = "click".concat(EVENT_KEY$b).concat(DATA_API_KEY$8);
  var CLASS_NAME_ALERT = 'alert';
  var CLASS_NAME_FADE$6 = 'fade';
  var CLASS_NAME_SHOW$9 = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = /*#__PURE__*/function (_BaseComponent) {
    _inherits(Alert, _BaseComponent);

    var _super = _createSuper(Alert);

    function Alert() {
      _classCallCheck(this, Alert);

      return _super.apply(this, arguments);
    }

    _createClass(Alert, [{
      key: "close",
      value: // Public
      function close(element) {
        var rootElement = element ? this._getRootElement(element) : this._element;

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent === null || customEvent.defaultPrevented) {
          return;
        }

        this._removeElement(rootElement);
      } // Private

    }, {
      key: "_getRootElement",
      value: function _getRootElement(element) {
        return getElementFromSelector(element) || element.closest(".".concat(CLASS_NAME_ALERT));
      }
    }, {
      key: "_triggerCloseEvent",
      value: function _triggerCloseEvent(element) {
        return EventHandler.trigger(element, EVENT_CLOSE);
      }
    }, {
      key: "_removeElement",
      value: function _removeElement(element) {
        var _this2 = this;

        element.classList.remove(CLASS_NAME_SHOW$9);
        var isAnimated = element.classList.contains(CLASS_NAME_FADE$6);

        this._queueCallback(function () {
          return _this2._destroyElement(element);
        }, element, isAnimated);
      }
    }, {
      key: "_destroyElement",
      value: function _destroyElement(element) {
        element.remove();
        EventHandler.trigger(element, EVENT_CLOSED);
      } // Static

    }], [{
      key: "NAME",
      get: // Getters
      function get() {
        return NAME$c;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Alert.getOrCreateInstance(this);

          if (config === 'close') {
            data[config](this);
          }
        });
      }
    }, {
      key: "handleDismiss",
      value: function handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      }
    }]);

    return Alert;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$7, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Alert to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Alert);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$b = 'button';
  var DATA_KEY$a = 'bs.button';
  var EVENT_KEY$a = ".".concat(DATA_KEY$a);
  var DATA_API_KEY$7 = '.data-api';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  var EVENT_CLICK_DATA_API$6 = "click".concat(EVENT_KEY$a).concat(DATA_API_KEY$7);
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function (_BaseComponent2) {
    _inherits(Button, _BaseComponent2);

    var _super2 = _createSuper(Button);

    function Button() {
      _classCallCheck(this, Button);

      return _super2.apply(this, arguments);
    }

    _createClass(Button, [{
      key: "toggle",
      value: // Public
      function toggle() {
        // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
        this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
      } // Static

    }], [{
      key: "NAME",
      get: // Getters
      function get() {
        return NAME$b;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Button.getOrCreateInstance(this);

          if (config === 'toggle') {
            data[config]();
          }
        });
      }
    }]);

    return Button;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, function (event) {
    event.preventDefault();
    var button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    var data = Button.getOrCreateInstance(button);
    data.toggle();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Button to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Button);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, function (chr) {
      return "-".concat(chr.toLowerCase());
    });
  }

  var Manipulator = {
    setDataAttribute: function setDataAttribute(element, key, value) {
      element.setAttribute("data-bs-".concat(normalizeDataKey(key)), value);
    },
    removeDataAttribute: function removeDataAttribute(element, key) {
      element.removeAttribute("data-bs-".concat(normalizeDataKey(key)));
    },
    getDataAttributes: function getDataAttributes(element) {
      if (!element) {
        return {};
      }

      var attributes = {};
      Object.keys(element.dataset).filter(function (key) {
        return key.startsWith('bs');
      }).forEach(function (key) {
        var pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      });
      return attributes;
    },
    getDataAttribute: function getDataAttribute(element, key) {
      return normalizeData(element.getAttribute("data-bs-".concat(normalizeDataKey(key))));
    },
    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    },
    position: function position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    }
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'carousel';
  var DATA_KEY$9 = 'bs.carousel';
  var EVENT_KEY$9 = ".".concat(DATA_KEY$9);
  var DATA_API_KEY$6 = '.data-api';
  var ARROW_LEFT_KEY = 'ArrowLeft';
  var ARROW_RIGHT_KEY = 'ArrowRight';
  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default$9 = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType$9 = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var ORDER_NEXT = 'next';
  var ORDER_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var KEY_TO_DIRECTION = (_KEY_TO_DIRECTION = {}, _defineProperty(_KEY_TO_DIRECTION, ARROW_LEFT_KEY, DIRECTION_RIGHT), _defineProperty(_KEY_TO_DIRECTION, ARROW_RIGHT_KEY, DIRECTION_LEFT), _KEY_TO_DIRECTION);
  var EVENT_SLIDE = "slide".concat(EVENT_KEY$9);
  var EVENT_SLID = "slid".concat(EVENT_KEY$9);
  var EVENT_KEYDOWN = "keydown".concat(EVENT_KEY$9);
  var EVENT_MOUSEENTER = "mouseenter".concat(EVENT_KEY$9);
  var EVENT_MOUSELEAVE = "mouseleave".concat(EVENT_KEY$9);
  var EVENT_TOUCHSTART = "touchstart".concat(EVENT_KEY$9);
  var EVENT_TOUCHMOVE = "touchmove".concat(EVENT_KEY$9);
  var EVENT_TOUCHEND = "touchend".concat(EVENT_KEY$9);
  var EVENT_POINTERDOWN = "pointerdown".concat(EVENT_KEY$9);
  var EVENT_POINTERUP = "pointerup".concat(EVENT_KEY$9);
  var EVENT_DRAG_START = "dragstart".concat(EVENT_KEY$9);
  var EVENT_LOAD_DATA_API$2 = "load".concat(EVENT_KEY$9).concat(DATA_API_KEY$6);
  var EVENT_CLICK_DATA_API$5 = "click".concat(EVENT_KEY$9).concat(DATA_API_KEY$6);
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_END = 'carousel-item-end';
  var CLASS_NAME_START = 'carousel-item-start';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_INDICATOR = '[data-bs-target]';
  var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  var POINTER_TYPE_TOUCH = 'touch';
  var POINTER_TYPE_PEN = 'pen';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = /*#__PURE__*/function (_BaseComponent3) {
    _inherits(Carousel, _BaseComponent3);

    var _super3 = _createSuper(Carousel);

    function Carousel(element, config) {
      var _this3;

      _classCallCheck(this, Carousel);

      _this3 = _super3.call(this, element);
      _this3._items = null;
      _this3._interval = null;
      _this3._activeElement = null;
      _this3._isPaused = false;
      _this3._isSliding = false;
      _this3.touchTimeout = null;
      _this3.touchStartX = 0;
      _this3.touchDeltaX = 0;
      _this3._config = _this3._getConfig(config);
      _this3._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this3._element);
      _this3._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      _this3._pointerEvent = Boolean(window.PointerEvent);

      _this3._addEventListeners();

      return _this3;
    } // Getters


    _createClass(Carousel, [{
      key: "next",
      value: // Public
      function next() {
        this._slide(ORDER_NEXT);
      }
    }, {
      key: "nextWhenVisible",
      value: function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && isVisible(this._element)) {
          this.next();
        }
      }
    }, {
      key: "prev",
      value: function prev() {
        this._slide(ORDER_PREV);
      }
    }, {
      key: "pause",
      value: function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
          triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      }
    }, {
      key: "cycle",
      value: function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config && this._config.interval && !this._isPaused) {
          this._updateInterval();

          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      }
    }, {
      key: "to",
      value: function to(index) {
        var _this4 = this;

        this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          EventHandler.one(this._element, EVENT_SLID, function () {
            return _this4.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

        this._slide(order, this._items[index]);
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default$9), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
        typeCheckConfig(NAME$a, config, DefaultType$9);
        return config;
      }
    }, {
      key: "_handleSwipe",
      value: function _handleSwipe() {
        var absDeltax = Math.abs(this.touchDeltaX);

        if (absDeltax <= SWIPE_THRESHOLD) {
          return;
        }

        var direction = absDeltax / this.touchDeltaX;
        this.touchDeltaX = 0;

        if (!direction) {
          return;
        }

        this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
      }
    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this5 = this;

        if (this._config.keyboard) {
          EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
            return _this5._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) {
            return _this5.pause(event);
          });
          EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) {
            return _this5.cycle(event);
          });
        }

        if (this._config.touch && this._touchSupported) {
          this._addTouchEventListeners();
        }
      }
    }, {
      key: "_addTouchEventListeners",
      value: function _addTouchEventListeners() {
        var _this6 = this;

        var start = function start(event) {
          if (_this6._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
            _this6.touchStartX = event.clientX;
          } else if (!_this6._pointerEvent) {
            _this6.touchStartX = event.touches[0].clientX;
          }
        };

        var move = function move(event) {
          // ensure swiping with one touch and not pinching
          _this6.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - _this6.touchStartX;
        };

        var end = function end(event) {
          if (_this6._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
            _this6.touchDeltaX = event.clientX - _this6.touchStartX;
          }

          _this6._handleSwipe();

          if (_this6._config.pause === 'hover') {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            _this6.pause();

            if (_this6.touchTimeout) {
              clearTimeout(_this6.touchTimeout);
            }

            _this6.touchTimeout = setTimeout(function (event) {
              return _this6.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this6._config.interval);
          }
        };

        SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
          EventHandler.on(itemImg, EVENT_DRAG_START, function (e) {
            return e.preventDefault();
          });
        });

        if (this._pointerEvent) {
          EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
            return start(event);
          });
          EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
            return end(event);
          });

          this._element.classList.add(CLASS_NAME_POINTER_EVENT);
        } else {
          EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
            return start(event);
          });
          EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
            return move(event);
          });
          EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
            return end(event);
          });
        }
      }
    }, {
      key: "_keydown",
      value: function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        var direction = KEY_TO_DIRECTION[event.key];

        if (direction) {
          event.preventDefault();

          this._slide(direction);
        }
      }
    }, {
      key: "_getItemIndex",
      value: function _getItemIndex(element) {
        this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
        return this._items.indexOf(element);
      }
    }, {
      key: "_getItemByOrder",
      value: function _getItemByOrder(order, activeElement) {
        var isNext = order === ORDER_NEXT;
        return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
      }
    }, {
      key: "_triggerSlideEvent",
      value: function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

        return EventHandler.trigger(this._element, EVENT_SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
      }
    }, {
      key: "_setActiveIndicatorElement",
      value: function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
          activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
          activeIndicator.removeAttribute('aria-current');
          var indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

          for (var i = 0; i < indicators.length; i++) {
            if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
              indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
              indicators[i].setAttribute('aria-current', 'true');
              break;
            }
          }
        }
      }
    }, {
      key: "_updateInterval",
      value: function _updateInterval() {
        var element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

        if (!element) {
          return;
        }

        var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

        if (elementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = elementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }
      }
    }, {
      key: "_slide",
      value: function _slide(directionOrOrder, element) {
        var _this7 = this;

        var order = this._directionToOrder(directionOrOrder);

        var activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || this._getItemByOrder(order, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var isNext = order === ORDER_NEXT;
        var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
        var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

        var eventDirectionName = this._orderToDirection(order);

        if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
          this._isSliding = false;
          return;
        }

        if (this._isSliding) {
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.defaultPrevented) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        this._activeElement = nextElement;

        var triggerSlidEvent = function triggerSlidEvent() {
          EventHandler.trigger(_this7._element, EVENT_SLID, {
            relatedTarget: nextElement,
            direction: eventDirectionName,
            from: activeElementIndex,
            to: nextElementIndex
          });
        };

        if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
          nextElement.classList.add(orderClassName);
          reflow(nextElement);
          activeElement.classList.add(directionalClassName);
          nextElement.classList.add(directionalClassName);

          var completeCallBack = function completeCallBack() {
            nextElement.classList.remove(directionalClassName, orderClassName);
            nextElement.classList.add(CLASS_NAME_ACTIVE$2);
            activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
            _this7._isSliding = false;
            setTimeout(triggerSlidEvent, 0);
          };

          this._queueCallback(completeCallBack, activeElement, true);
        } else {
          activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
          nextElement.classList.add(CLASS_NAME_ACTIVE$2);
          this._isSliding = false;
          triggerSlidEvent();
        }

        if (isCycling) {
          this.cycle();
        }
      }
    }, {
      key: "_directionToOrder",
      value: function _directionToOrder(direction) {
        if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
          return direction;
        }

        if (isRTL()) {
          return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
        }

        return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
      }
    }, {
      key: "_orderToDirection",
      value: function _orderToDirection(order) {
        if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
          return order;
        }

        if (isRTL()) {
          return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }

        return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$9;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$a;
      }
    }, {
      key: "carouselInterface",
      value: function carouselInterface(element, config) {
        var data = Carousel.getOrCreateInstance(element, config);
        var _config = data._config;

        if (_typeof(config) === 'object') {
          _config = _objectSpread(_objectSpread({}, _config), config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"".concat(action, "\""));
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          Carousel.carouselInterface(this, config);
        });
      }
    }, {
      key: "dataApiClickHandler",
      value: function dataApiClickHandler(event) {
        var target = getElementFromSelector(this);

        if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
          return;
        }

        var config = _objectSpread(_objectSpread({}, Manipulator.getDataAttributes(target)), Manipulator.getDataAttributes(this));

        var slideIndex = this.getAttribute('data-bs-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel.carouselInterface(target, config);

        if (slideIndex) {
          Carousel.getInstance(target).to(slideIndex);
        }

        event.preventDefault();
      }
    }]);

    return Carousel;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, function () {
    var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

    for (var i = 0, len = carousels.length; i < len; i++) {
      Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Carousel to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Carousel);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'collapse';
  var DATA_KEY$8 = 'bs.collapse';
  var EVENT_KEY$8 = ".".concat(DATA_KEY$8);
  var DATA_API_KEY$5 = '.data-api';
  var Default$8 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$8 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW$5 = "show".concat(EVENT_KEY$8);
  var EVENT_SHOWN$5 = "shown".concat(EVENT_KEY$8);
  var EVENT_HIDE$5 = "hide".concat(EVENT_KEY$8);
  var EVENT_HIDDEN$5 = "hidden".concat(EVENT_KEY$8);
  var EVENT_CLICK_DATA_API$4 = "click".concat(EVENT_KEY$8).concat(DATA_API_KEY$5);
  var CLASS_NAME_SHOW$8 = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var WIDTH = 'width';
  var HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/function (_BaseComponent4) {
    _inherits(Collapse, _BaseComponent4);

    var _super4 = _createSuper(Collapse);

    function Collapse(element, config) {
      var _this8;

      _classCallCheck(this, Collapse);

      _this8 = _super4.call(this, element);
      _this8._isTransitioning = false;
      _this8._config = _this8._getConfig(config);
      _this8._triggerArray = SelectorEngine.find("".concat(SELECTOR_DATA_TOGGLE$4, "[href=\"#").concat(_this8._element.id, "\"],") + "".concat(SELECTOR_DATA_TOGGLE$4, "[data-bs-target=\"#").concat(_this8._element.id, "\"]"));
      var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = getSelectorFromElement(elem);
        var filterElement = SelectorEngine.find(selector).filter(function (foundElem) {
          return foundElem === _this8._element;
        });

        if (selector !== null && filterElement.length) {
          _this8._selector = selector;

          _this8._triggerArray.push(elem);
        }
      }

      _this8._parent = _this8._config.parent ? _this8._getParent() : null;

      if (!_this8._config.parent) {
        _this8._addAriaAndCollapsedClass(_this8._element, _this8._triggerArray);
      }

      if (_this8._config.toggle) {
        _this8.toggle();
      }

      return _this8;
    } // Getters


    _createClass(Collapse, [{
      key: "toggle",
      value: // Public
      function toggle() {
        if (this._element.classList.contains(CLASS_NAME_SHOW$8)) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: "show",
      value: function show() {
        var _this9 = this;

        if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW$8)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (elem) {
            if (typeof _this9._config.parent === 'string') {
              return elem.getAttribute('data-bs-parent') === _this9._config.parent;
            }

            return elem.classList.contains(CLASS_NAME_COLLAPSE);
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        var container = SelectorEngine.findOne(this._selector);

        if (actives) {
          var tempActiveData = actives.find(function (elem) {
            return container !== elem;
          });
          activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

        if (startEvent.defaultPrevented) {
          return;
        }

        if (actives) {
          actives.forEach(function (elemActive) {
            if (container !== elemActive) {
              Collapse.collapseInterface(elemActive, 'hide');
            }

            if (!activesData) {
              Data.set(elemActive, DATA_KEY$8, null);
            }
          });
        }

        var dimension = this._getDimension();

        this._element.classList.remove(CLASS_NAME_COLLAPSE);

        this._element.classList.add(CLASS_NAME_COLLAPSING);

        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          this._triggerArray.forEach(function (element) {
            element.classList.remove(CLASS_NAME_COLLAPSED);
            element.setAttribute('aria-expanded', true);
          });
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this9._element.classList.remove(CLASS_NAME_COLLAPSING);

          _this9._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

          _this9._element.style[dimension] = '';

          _this9.setTransitioning(false);

          EventHandler.trigger(_this9._element, EVENT_SHOWN$5);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll".concat(capitalizedDimension);

        this._queueCallback(complete, this._element, true);

        this._element.style[dimension] = "".concat(this._element[scrollSize], "px");
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this10 = this;

        if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW$8)) {
          return;
        }

        var startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

        if (startEvent.defaultPrevented) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = "".concat(this._element.getBoundingClientRect()[dimension], "px");
        reflow(this._element);

        this._element.classList.add(CLASS_NAME_COLLAPSING);

        this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var elem = getElementFromSelector(trigger);

            if (elem && !elem.classList.contains(CLASS_NAME_SHOW$8)) {
              trigger.classList.add(CLASS_NAME_COLLAPSED);
              trigger.setAttribute('aria-expanded', false);
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this10.setTransitioning(false);

          _this10._element.classList.remove(CLASS_NAME_COLLAPSING);

          _this10._element.classList.add(CLASS_NAME_COLLAPSE);

          EventHandler.trigger(_this10._element, EVENT_HIDDEN$5);
        };

        this._element.style[dimension] = '';

        this._queueCallback(complete, this._element, true);
      }
    }, {
      key: "setTransitioning",
      value: function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread({}, Default$8), config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        typeCheckConfig(NAME$9, config, DefaultType$8);
        return config;
      }
    }, {
      key: "_getDimension",
      value: function _getDimension() {
        return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
      }
    }, {
      key: "_getParent",
      value: function _getParent() {
        var _this11 = this;

        var parent = this._config.parent;
        parent = getElement(parent);
        var selector = "".concat(SELECTOR_DATA_TOGGLE$4, "[data-bs-parent=\"").concat(parent, "\"]");
        SelectorEngine.find(selector, parent).forEach(function (element) {
          var selected = getElementFromSelector(element);

          _this11._addAriaAndCollapsedClass(selected, [element]);
        });
        return parent;
      }
    }, {
      key: "_addAriaAndCollapsedClass",
      value: function _addAriaAndCollapsedClass(element, triggerArray) {
        if (!element || !triggerArray.length) {
          return;
        }

        var isOpen = element.classList.contains(CLASS_NAME_SHOW$8);
        triggerArray.forEach(function (elem) {
          if (isOpen) {
            elem.classList.remove(CLASS_NAME_COLLAPSED);
          } else {
            elem.classList.add(CLASS_NAME_COLLAPSED);
          }

          elem.setAttribute('aria-expanded', isOpen);
        });
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$8;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$9;
      }
    }, {
      key: "collapseInterface",
      value: function collapseInterface(element, config) {
        var data = Collapse.getInstance(element);

        var _config = _objectSpread(_objectSpread(_objectSpread({}, Default$8), Manipulator.getDataAttributes(element)), _typeof(config) === 'object' && config ? config : {});

        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(element, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          Collapse.collapseInterface(this, config);
        });
      }
    }]);

    return Collapse;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }

    var triggerData = Manipulator.getDataAttributes(this);
    var selector = getSelectorFromElement(this);
    var selectorElements = SelectorEngine.find(selector);
    selectorElements.forEach(function (element) {
      var data = Collapse.getInstance(element);
      var config;

      if (data) {
        // update parent attribute
        if (data._parent === null && typeof triggerData.parent === 'string') {
          data._config.parent = triggerData.parent;
          data._parent = data._getParent();
        }

        config = 'toggle';
      } else {
        config = triggerData;
      }

      Collapse.collapseInterface(element, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Collapse to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Collapse);
  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  } // and applies them to the HTMLElements such as popper and arrow


  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$2,
    requires: ['computeStyles']
  };

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  function getBoundingClientRect(element) {
    var rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      x: rect.left,
      y: rect.top
    };
  } // means it doesn't take into account transforms.


  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
    var isIE = navigator.userAgent.indexOf('Trident') !== -1;

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle$1(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$1(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$1,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };
  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref) {
    var x = _ref.x,
        y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(round(x * dpr) / dpr) || 0,
      y: round(round(y * dpr) / dpr) || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets;

    var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
        _ref3$x = _ref3.x,
        x = _ref3$x === void 0 ? 0 : _ref3$x,
        _ref3$y = _ref3.y,
        y = _ref3$y === void 0 ? 0 : _ref3$y;

    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle$1(offsetParent).position !== 'static') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top) {
        sideY = bottom; // $FlowFixMe[prop-missing]

        y -= offsetParent[heightProp] - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left) {
        sideX = right; // $FlowFixMe[prop-missing]

        x -= offsetParent[widthProp] - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref4) {
    var state = _ref4.state,
        options = _ref4.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };
  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };
  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };

  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };

  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
    // can be obscured underneath it.
    // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
    // if it isn't open, so if this isn't available, the popper will be detected
    // to overflow the bottom of the screen too early.

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
      // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
      // errors due to floating point numbers, so we need to check precision.
      // Safari returns a number <= 0, usually < -1 when pinch-zoomed
      // Feature detection fails in mobile emulation mode in Chrome.
      // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
      // 0.001
      // Fallback here: "Not Safari" userAgent

      if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  } // of the `<html>` and `<body>` rect bounds if horizontally scrollable


  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }
  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */


  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element) {
    var rect = getBoundingClientRect(element);
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var referenceElement = state.elements.reference;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = getBoundingClientRect(referenceElement);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name; // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step

    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis || checkAltAxis) {
      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
      var max$1 = popperOffsets[mainAxis] - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
      var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

      if (checkMainAxis) {
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }

      if (checkAltAxis) {
        var _mainSide = mainAxis === 'x' ? top : left;

        var _altSide = mainAxis === 'x' ? bottom : right;

        var _offset = popperOffsets[altAxis];

        var _min = _offset + overflow[_mainSide];

        var _max = _offset - overflow[_altSide];

        var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  } // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement);
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(options) {
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          }); // Validate the provided modifiers so that the consumer will get warned

          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref3) {
          var name = _ref3.name,
              _ref3$options = _ref3.options,
              options = _ref3$options === void 0 ? {} : _ref3$options,
              effect = _ref3.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }

  var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers$1
  }); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  var Popper = /*#__PURE__*/Object.freeze({
    __proto__: null,
    popperGenerator: popperGenerator,
    detectOverflow: detectOverflow,
    createPopperBase: createPopper$2,
    createPopper: createPopper,
    createPopperLite: createPopper$1,
    top: top,
    bottom: bottom,
    right: right,
    left: left,
    auto: auto,
    basePlacements: basePlacements,
    start: start,
    end: end,
    clippingParents: clippingParents,
    viewport: viewport,
    popper: popper,
    reference: reference,
    variationPlacements: variationPlacements,
    placements: placements,
    beforeRead: beforeRead,
    read: read,
    afterRead: afterRead,
    beforeMain: beforeMain,
    main: main,
    afterMain: afterMain,
    beforeWrite: beforeWrite,
    write: write,
    afterWrite: afterWrite,
    modifierPhases: modifierPhases,
    applyStyles: applyStyles$1,
    arrow: arrow$1,
    computeStyles: computeStyles$1,
    eventListeners: eventListeners,
    flip: flip$1,
    hide: hide$1,
    offset: offset$1,
    popperOffsets: popperOffsets$1,
    preventOverflow: preventOverflow$1
  });
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'dropdown';
  var DATA_KEY$7 = 'bs.dropdown';
  var EVENT_KEY$7 = ".".concat(DATA_KEY$7);
  var DATA_API_KEY$4 = '.data-api';
  var ESCAPE_KEY$2 = 'Escape';
  var SPACE_KEY = 'Space';
  var TAB_KEY = 'Tab';
  var ARROW_UP_KEY = 'ArrowUp';
  var ARROW_DOWN_KEY = 'ArrowDown';
  var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  var REGEXP_KEYDOWN = new RegExp("".concat(ARROW_UP_KEY, "|").concat(ARROW_DOWN_KEY, "|").concat(ESCAPE_KEY$2));
  var EVENT_HIDE$4 = "hide".concat(EVENT_KEY$7);
  var EVENT_HIDDEN$4 = "hidden".concat(EVENT_KEY$7);
  var EVENT_SHOW$4 = "show".concat(EVENT_KEY$7);
  var EVENT_SHOWN$4 = "shown".concat(EVENT_KEY$7);
  var EVENT_CLICK = "click".concat(EVENT_KEY$7);
  var EVENT_CLICK_DATA_API$3 = "click".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
  var EVENT_KEYDOWN_DATA_API = "keydown".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
  var EVENT_KEYUP_DATA_API = "keyup".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
  var CLASS_NAME_SHOW$7 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPEND = 'dropend';
  var CLASS_NAME_DROPSTART = 'dropstart';
  var CLASS_NAME_NAVBAR = 'navbar';
  var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  var PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  var PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  var PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  var PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  var PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  var Default$7 = {
    offset: [0, 2],
    boundary: 'clippingParents',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null,
    autoClose: true
  };
  var DefaultType$7 = {
    offset: '(array|string|function)',
    boundary: '(string|element)',
    reference: '(string|element|object)',
    display: 'string',
    popperConfig: '(null|object|function)',
    autoClose: '(boolean|string)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = /*#__PURE__*/function (_BaseComponent5) {
    _inherits(Dropdown, _BaseComponent5);

    var _super5 = _createSuper(Dropdown);

    function Dropdown(element, config) {
      var _this12;

      _classCallCheck(this, Dropdown);

      _this12 = _super5.call(this, element);
      _this12._popper = null;
      _this12._config = _this12._getConfig(config);
      _this12._menu = _this12._getMenuElement();
      _this12._inNavbar = _this12._detectNavbar();

      _this12._addEventListeners();

      return _this12;
    } // Getters


    _createClass(Dropdown, [{
      key: "toggle",
      value: // Public
      function toggle() {
        if (isDisabled(this._element)) {
          return;
        }

        var isActive = this._element.classList.contains(CLASS_NAME_SHOW$7);

        if (isActive) {
          this.hide();
          return;
        }

        this.show();
      }
    }, {
      key: "show",
      value: function show() {
        if (isDisabled(this._element) || this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
          return;
        }

        var parent = Dropdown.getParentFromElement(this._element);
        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

        if (showEvent.defaultPrevented) {
          return;
        } // Totally disable Popper for Dropdowns in Navbar


        if (this._inNavbar) {
          Manipulator.setDataAttribute(this._menu, 'popper', 'none');
        } else {
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (isElement$1(this._config.reference)) {
            referenceElement = getElement(this._config.reference);
          } else if (_typeof(this._config.reference) === 'object') {
            referenceElement = this._config.reference;
          }

          var popperConfig = this._getPopperConfig();

          var isDisplayStatic = popperConfig.modifiers.find(function (modifier) {
            return modifier.name === 'applyStyles' && modifier.enabled === false;
          });
          this._popper = createPopper(referenceElement, this._menu, popperConfig);

          if (isDisplayStatic) {
            Manipulator.setDataAttribute(this._menu, 'popper', 'static');
          }
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
          var _ref8;

          (_ref8 = []).concat.apply(_ref8, _toConsumableArray(document.body.children)).forEach(function (elem) {
            return EventHandler.on(elem, 'mouseover', noop);
          });
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        this._menu.classList.toggle(CLASS_NAME_SHOW$7);

        this._element.classList.toggle(CLASS_NAME_SHOW$7);

        EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
      }
    }, {
      key: "hide",
      value: function hide() {
        if (isDisabled(this._element) || !this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };

        this._completeHide(relatedTarget);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (this._popper) {
          this._popper.destroy();
        }

        _get(_getPrototypeOf(Dropdown.prototype), "dispose", this).call(this);
      }
    }, {
      key: "update",
      value: function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper) {
          this._popper.update();
        }
      } // Private

    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this13 = this;

        EventHandler.on(this._element, EVENT_CLICK, function (event) {
          event.preventDefault();

          _this13.toggle();
        });
      }
    }, {
      key: "_completeHide",
      value: function _completeHide(relatedTarget) {
        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

        if (hideEvent.defaultPrevented) {
          return;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          var _ref9;

          (_ref9 = []).concat.apply(_ref9, _toConsumableArray(document.body.children)).forEach(function (elem) {
            return EventHandler.off(elem, 'mouseover', noop);
          });
        }

        if (this._popper) {
          this._popper.destroy();
        }

        this._menu.classList.remove(CLASS_NAME_SHOW$7);

        this._element.classList.remove(CLASS_NAME_SHOW$7);

        this._element.setAttribute('aria-expanded', 'false');

        Manipulator.removeDataAttribute(this._menu, 'popper');
        EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, this.constructor.Default), Manipulator.getDataAttributes(this._element)), config);
        typeCheckConfig(NAME$8, config, this.constructor.DefaultType);

        if (_typeof(config.reference) === 'object' && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
          // Popper virtual elements require a getBoundingClientRect method
          throw new TypeError("".concat(NAME$8.toUpperCase(), ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method."));
        }

        return config;
      }
    }, {
      key: "_getMenuElement",
      value: function _getMenuElement() {
        return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
      }
    }, {
      key: "_getPlacement",
      value: function _getPlacement() {
        var parentDropdown = this._element.parentNode;

        if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
          return PLACEMENT_RIGHT;
        }

        if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
          return PLACEMENT_LEFT;
        } // We need to trim the value because custom properties can also include spaces


        var isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

        if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
          return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
        }

        return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
      }
    }, {
      key: "_detectNavbar",
      value: function _detectNavbar() {
        return this._element.closest(".".concat(CLASS_NAME_NAVBAR)) !== null;
      }
    }, {
      key: "_getOffset",
      value: function _getOffset() {
        var _this14 = this;

        var offset = this._config.offset;

        if (typeof offset === 'string') {
          return offset.split(',').map(function (val) {
            return Number.parseInt(val, 10);
          });
        }

        if (typeof offset === 'function') {
          return function (popperData) {
            return offset(popperData, _this14._element);
          };
        }

        return offset;
      }
    }, {
      key: "_getPopperConfig",
      value: function _getPopperConfig() {
        var defaultBsPopperConfig = {
          placement: this._getPlacement(),
          modifiers: [{
            name: 'preventOverflow',
            options: {
              boundary: this._config.boundary
            }
          }, {
            name: 'offset',
            options: {
              offset: this._getOffset()
            }
          }]
        }; // Disable Popper if we have a static display

        if (this._config.display === 'static') {
          defaultBsPopperConfig.modifiers = [{
            name: 'applyStyles',
            enabled: false
          }];
        }

        return _objectSpread(_objectSpread({}, defaultBsPopperConfig), typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
      }
    }, {
      key: "_selectMenuItem",
      value: function _selectMenuItem(_ref10) {
        var key = _ref10.key,
            target = _ref10.target;
        var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

        if (!items.length) {
          return;
        } // if target isn't included in items (e.g. when expanding the dropdown)
        // allow cycling to get the last item in case key equals ARROW_UP_KEY


        getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$8;
      }
    }, {
      key: "dropdownInterface",
      value: function dropdownInterface(element, config) {
        var data = Dropdown.getOrCreateInstance(element, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          Dropdown.dropdownInterface(this, config);
        });
      }
    }, {
      key: "clearMenus",
      value: function clearMenus(event) {
        if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
          return;
        }

        var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

        for (var i = 0, len = toggles.length; i < len; i++) {
          var context = Dropdown.getInstance(toggles[i]);

          if (!context || context._config.autoClose === false) {
            continue;
          }

          if (!context._element.classList.contains(CLASS_NAME_SHOW$7)) {
            continue;
          }

          var relatedTarget = {
            relatedTarget: context._element
          };

          if (event) {
            var composedPath = event.composedPath();
            var isMenuTarget = composedPath.includes(context._menu);

            if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
              continue;
            } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


            if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
              continue;
            }

            if (event.type === 'click') {
              relatedTarget.clickEvent = event;
            }
          }

          context._completeHide(relatedTarget);
        }
      }
    }, {
      key: "getParentFromElement",
      value: function getParentFromElement(element) {
        return getElementFromSelector(element) || element.parentNode;
      }
    }, {
      key: "dataApiKeydownHandler",
      value: function dataApiKeydownHandler(event) {
        var _this15 = this;

        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
          return;
        }

        var isActive = this.classList.contains(CLASS_NAME_SHOW$7);

        if (!isActive && event.key === ESCAPE_KEY$2) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (isDisabled(this)) {
          return;
        }

        var getToggleButton = function getToggleButton() {
          return _this15.matches(SELECTOR_DATA_TOGGLE$3) ? _this15 : SelectorEngine.prev(_this15, SELECTOR_DATA_TOGGLE$3)[0];
        };

        if (event.key === ESCAPE_KEY$2) {
          getToggleButton().focus();
          Dropdown.clearMenus();
          return;
        }

        if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
          if (!isActive) {
            getToggleButton().click();
          }

          Dropdown.getInstance(getToggleButton())._selectMenuItem(event);

          return;
        }

        if (!isActive || event.key === SPACE_KEY) {
          Dropdown.clearMenus();
        }
      }
    }]);

    return Dropdown;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.dropdownInterface(this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Dropdown to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Dropdown);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';

  var ScrollBarHelper = /*#__PURE__*/function () {
    function ScrollBarHelper() {
      _classCallCheck(this, ScrollBarHelper);

      this._element = document.body;
    }

    _createClass(ScrollBarHelper, [{
      key: "getWidth",
      value: function getWidth() {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
        var documentWidth = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - documentWidth);
      }
    }, {
      key: "hide",
      value: function hide() {
        var width = this.getWidth();

        this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


        this._setElementAttributes(this._element, 'paddingRight', function (calculatedValue) {
          return calculatedValue + width;
        }); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


        this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', function (calculatedValue) {
          return calculatedValue + width;
        });

        this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', function (calculatedValue) {
          return calculatedValue - width;
        });
      }
    }, {
      key: "_disableOverFlow",
      value: function _disableOverFlow() {
        this._saveInitialAttribute(this._element, 'overflow');

        this._element.style.overflow = 'hidden';
      }
    }, {
      key: "_setElementAttributes",
      value: function _setElementAttributes(selector, styleProp, callback) {
        var _this16 = this;

        var scrollbarWidth = this.getWidth();

        var manipulationCallBack = function manipulationCallBack(element) {
          if (element !== _this16._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
            return;
          }

          _this16._saveInitialAttribute(element, styleProp);

          var calculatedValue = window.getComputedStyle(element)[styleProp];
          element.style[styleProp] = "".concat(callback(Number.parseFloat(calculatedValue)), "px");
        };

        this._applyManipulationCallback(selector, manipulationCallBack);
      }
    }, {
      key: "reset",
      value: function reset() {
        this._resetElementAttributes(this._element, 'overflow');

        this._resetElementAttributes(this._element, 'paddingRight');

        this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

        this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
      }
    }, {
      key: "_saveInitialAttribute",
      value: function _saveInitialAttribute(element, styleProp) {
        var actualValue = element.style[styleProp];

        if (actualValue) {
          Manipulator.setDataAttribute(element, styleProp, actualValue);
        }
      }
    }, {
      key: "_resetElementAttributes",
      value: function _resetElementAttributes(selector, styleProp) {
        var manipulationCallBack = function manipulationCallBack(element) {
          var value = Manipulator.getDataAttribute(element, styleProp);

          if (typeof value === 'undefined') {
            element.style.removeProperty(styleProp);
          } else {
            Manipulator.removeDataAttribute(element, styleProp);
            element.style[styleProp] = value;
          }
        };

        this._applyManipulationCallback(selector, manipulationCallBack);
      }
    }, {
      key: "_applyManipulationCallback",
      value: function _applyManipulationCallback(selector, callBack) {
        if (isElement$1(selector)) {
          callBack(selector);
        } else {
          SelectorEngine.find(selector, this._element).forEach(callBack);
        }
      }
    }, {
      key: "isOverflowing",
      value: function isOverflowing() {
        return this.getWidth() > 0;
      }
    }]);

    return ScrollBarHelper;
  }();
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Default$6 = {
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    isAnimated: false,
    rootElement: 'body',
    // give the choice to place backdrop under different elements
    clickCallback: null
  };
  var DefaultType$6 = {
    isVisible: 'boolean',
    isAnimated: 'boolean',
    rootElement: '(element|string)',
    clickCallback: '(function|null)'
  };
  var NAME$7 = 'backdrop';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_FADE$5 = 'fade';
  var CLASS_NAME_SHOW$6 = 'show';
  var EVENT_MOUSEDOWN = "mousedown.bs.".concat(NAME$7);

  var Backdrop = /*#__PURE__*/function () {
    function Backdrop(config) {
      _classCallCheck(this, Backdrop);

      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }

    _createClass(Backdrop, [{
      key: "show",
      value: function show(callback) {
        if (!this._config.isVisible) {
          execute(callback);
          return;
        }

        this._append();

        if (this._config.isAnimated) {
          reflow(this._getElement());
        }

        this._getElement().classList.add(CLASS_NAME_SHOW$6);

        this._emulateAnimation(function () {
          execute(callback);
        });
      }
    }, {
      key: "hide",
      value: function hide(callback) {
        var _this17 = this;

        if (!this._config.isVisible) {
          execute(callback);
          return;
        }

        this._getElement().classList.remove(CLASS_NAME_SHOW$6);

        this._emulateAnimation(function () {
          _this17.dispose();

          execute(callback);
        });
      } // Private

    }, {
      key: "_getElement",
      value: function _getElement() {
        if (!this._element) {
          var backdrop = document.createElement('div');
          backdrop.className = CLASS_NAME_BACKDROP;

          if (this._config.isAnimated) {
            backdrop.classList.add(CLASS_NAME_FADE$5);
          }

          this._element = backdrop;
        }

        return this._element;
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread({}, Default$6), _typeof(config) === 'object' ? config : {}); // use getElement() with the default "body" to get a fresh Element on each instantiation

        config.rootElement = getElement(config.rootElement);
        typeCheckConfig(NAME$7, config, DefaultType$6);
        return config;
      }
    }, {
      key: "_append",
      value: function _append() {
        var _this18 = this;

        if (this._isAppended) {
          return;
        }

        this._config.rootElement.appendChild(this._getElement());

        EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, function () {
          execute(_this18._config.clickCallback);
        });
        this._isAppended = true;
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (!this._isAppended) {
          return;
        }

        EventHandler.off(this._element, EVENT_MOUSEDOWN);

        this._element.remove();

        this._isAppended = false;
      }
    }, {
      key: "_emulateAnimation",
      value: function _emulateAnimation(callback) {
        executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
      }
    }]);

    return Backdrop;
  }();
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$6 = 'modal';
  var DATA_KEY$6 = 'bs.modal';
  var EVENT_KEY$6 = ".".concat(DATA_KEY$6);
  var DATA_API_KEY$3 = '.data-api';
  var ESCAPE_KEY$1 = 'Escape';
  var Default$5 = {
    backdrop: true,
    keyboard: true,
    focus: true
  };
  var DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean'
  };
  var EVENT_HIDE$3 = "hide".concat(EVENT_KEY$6);
  var EVENT_HIDE_PREVENTED = "hidePrevented".concat(EVENT_KEY$6);
  var EVENT_HIDDEN$3 = "hidden".concat(EVENT_KEY$6);
  var EVENT_SHOW$3 = "show".concat(EVENT_KEY$6);
  var EVENT_SHOWN$3 = "shown".concat(EVENT_KEY$6);
  var EVENT_FOCUSIN$2 = "focusin".concat(EVENT_KEY$6);
  var EVENT_RESIZE = "resize".concat(EVENT_KEY$6);
  var EVENT_CLICK_DISMISS$2 = "click.dismiss".concat(EVENT_KEY$6);
  var EVENT_KEYDOWN_DISMISS$1 = "keydown.dismiss".concat(EVENT_KEY$6);
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss".concat(EVENT_KEY$6);
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss".concat(EVENT_KEY$6);
  var EVENT_CLICK_DATA_API$2 = "click".concat(EVENT_KEY$6).concat(DATA_API_KEY$3);
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  var SELECTOR_DATA_DISMISS$2 = '[data-bs-dismiss="modal"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = /*#__PURE__*/function (_BaseComponent6) {
    _inherits(Modal, _BaseComponent6);

    var _super6 = _createSuper(Modal);

    function Modal(element, config) {
      var _this19;

      _classCallCheck(this, Modal);

      _this19 = _super6.call(this, element);
      _this19._config = _this19._getConfig(config);
      _this19._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, _this19._element);
      _this19._backdrop = _this19._initializeBackDrop();
      _this19._isShown = false;
      _this19._ignoreBackdropClick = false;
      _this19._isTransitioning = false;
      _this19._scrollBar = new ScrollBarHelper();
      return _this19;
    } // Getters


    _createClass(Modal, [{
      key: "toggle",
      value: // Public
      function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
    }, {
      key: "show",
      value: function show(relatedTarget) {
        var _this20 = this;

        if (this._isShown || this._isTransitioning) {
          return;
        }

        var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
          relatedTarget: relatedTarget
        });

        if (showEvent.defaultPrevented) {
          return;
        }

        this._isShown = true;

        if (this._isAnimated()) {
          this._isTransitioning = true;
        }

        this._scrollBar.hide();

        document.body.classList.add(CLASS_NAME_OPEN);

        this._adjustDialog();

        this._setEscapeEvent();

        this._setResizeEvent();

        EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, SELECTOR_DATA_DISMISS$2, function (event) {
          return _this20.hide(event);
        });
        EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
          EventHandler.one(_this20._element, EVENT_MOUSEUP_DISMISS, function (event) {
            if (event.target === _this20._element) {
              _this20._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this20._showElement(relatedTarget);
        });
      }
    }, {
      key: "hide",
      value: function hide(event) {
        var _this21 = this;

        if (event && ['A', 'AREA'].includes(event.target.tagName)) {
          event.preventDefault();
        }

        if (!this._isShown || this._isTransitioning) {
          return;
        }

        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

        if (hideEvent.defaultPrevented) {
          return;
        }

        this._isShown = false;

        var isAnimated = this._isAnimated();

        if (isAnimated) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        EventHandler.off(document, EVENT_FOCUSIN$2);

        this._element.classList.remove(CLASS_NAME_SHOW$5);

        EventHandler.off(this._element, EVENT_CLICK_DISMISS$2);
        EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

        this._queueCallback(function () {
          return _this21._hideModal();
        }, this._element, isAnimated);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        [window, this._dialog].forEach(function (htmlElement) {
          return EventHandler.off(htmlElement, EVENT_KEY$6);
        });

        this._backdrop.dispose();

        _get(_getPrototypeOf(Modal.prototype), "dispose", this).call(this);
        /**
         * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
         * Do not move `document` in `htmlElements` array
         * It will remove `EVENT_CLICK_DATA_API` event that should remain
         */


        EventHandler.off(document, EVENT_FOCUSIN$2);
      }
    }, {
      key: "handleUpdate",
      value: function handleUpdate() {
        this._adjustDialog();
      } // Private

    }, {
      key: "_initializeBackDrop",
      value: function _initializeBackDrop() {
        return new Backdrop({
          isVisible: Boolean(this._config.backdrop),
          // 'static' option will be translated to true, and booleans will keep their value
          isAnimated: this._isAnimated()
        });
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default$5), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
        typeCheckConfig(NAME$6, config, DefaultType$5);
        return config;
      }
    }, {
      key: "_showElement",
      value: function _showElement(relatedTarget) {
        var _this22 = this;

        var isAnimated = this._isAnimated();

        var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.setAttribute('aria-modal', true);

        this._element.setAttribute('role', 'dialog');

        this._element.scrollTop = 0;

        if (modalBody) {
          modalBody.scrollTop = 0;
        }

        if (isAnimated) {
          reflow(this._element);
        }

        this._element.classList.add(CLASS_NAME_SHOW$5);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var transitionComplete = function transitionComplete() {
          if (_this22._config.focus) {
            _this22._element.focus();
          }

          _this22._isTransitioning = false;
          EventHandler.trigger(_this22._element, EVENT_SHOWN$3, {
            relatedTarget: relatedTarget
          });
        };

        this._queueCallback(transitionComplete, this._dialog, isAnimated);
      }
    }, {
      key: "_enforceFocus",
      value: function _enforceFocus() {
        var _this23 = this;

        EventHandler.off(document, EVENT_FOCUSIN$2); // guard against infinite focus loop

        EventHandler.on(document, EVENT_FOCUSIN$2, function (event) {
          if (document !== event.target && _this23._element !== event.target && !_this23._element.contains(event.target)) {
            _this23._element.focus();
          }
        });
      }
    }, {
      key: "_setEscapeEvent",
      value: function _setEscapeEvent() {
        var _this24 = this;

        if (this._isShown) {
          EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, function (event) {
            if (_this24._config.keyboard && event.key === ESCAPE_KEY$1) {
              event.preventDefault();

              _this24.hide();
            } else if (!_this24._config.keyboard && event.key === ESCAPE_KEY$1) {
              _this24._triggerBackdropTransition();
            }
          });
        } else {
          EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
        }
      }
    }, {
      key: "_setResizeEvent",
      value: function _setResizeEvent() {
        var _this25 = this;

        if (this._isShown) {
          EventHandler.on(window, EVENT_RESIZE, function () {
            return _this25._adjustDialog();
          });
        } else {
          EventHandler.off(window, EVENT_RESIZE);
        }
      }
    }, {
      key: "_hideModal",
      value: function _hideModal() {
        var _this26 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._element.removeAttribute('aria-modal');

        this._element.removeAttribute('role');

        this._isTransitioning = false;

        this._backdrop.hide(function () {
          document.body.classList.remove(CLASS_NAME_OPEN);

          _this26._resetAdjustments();

          _this26._scrollBar.reset();

          EventHandler.trigger(_this26._element, EVENT_HIDDEN$3);
        });
      }
    }, {
      key: "_showBackdrop",
      value: function _showBackdrop(callback) {
        var _this27 = this;

        EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, function (event) {
          if (_this27._ignoreBackdropClick) {
            _this27._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this27._config.backdrop === true) {
            _this27.hide();
          } else if (_this27._config.backdrop === 'static') {
            _this27._triggerBackdropTransition();
          }
        });

        this._backdrop.show(callback);
      }
    }, {
      key: "_isAnimated",
      value: function _isAnimated() {
        return this._element.classList.contains(CLASS_NAME_FADE$4);
      }
    }, {
      key: "_triggerBackdropTransition",
      value: function _triggerBackdropTransition() {
        var _this28 = this;

        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

        if (hideEvent.defaultPrevented) {
          return;
        }

        var _this$_element = this._element,
            classList = _this$_element.classList,
            scrollHeight = _this$_element.scrollHeight,
            style = _this$_element.style;
        var isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

        if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
          return;
        }

        if (!isModalOverflowing) {
          style.overflowY = 'hidden';
        }

        classList.add(CLASS_NAME_STATIC);

        this._queueCallback(function () {
          classList.remove(CLASS_NAME_STATIC);

          if (!isModalOverflowing) {
            _this28._queueCallback(function () {
              style.overflowY = '';
            }, _this28._dialog);
          }
        }, this._dialog);

        this._element.focus();
      } // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // ----------------------------------------------------------------------

    }, {
      key: "_adjustDialog",
      value: function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        var scrollbarWidth = this._scrollBar.getWidth();

        var isBodyOverflowing = scrollbarWidth > 0;

        if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
          this._element.style.paddingLeft = "".concat(scrollbarWidth, "px");
        }

        if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
          this._element.style.paddingRight = "".concat(scrollbarWidth, "px");
        }
      }
    }, {
      key: "_resetAdjustments",
      value: function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = Modal.getOrCreateInstance(this, config);

          if (typeof config !== 'string') {
            return;
          }

          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config](relatedTarget);
        });
      }
    }]);

    return Modal;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    var _this29 = this;

    var target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW$3, function (showEvent) {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, EVENT_HIDDEN$3, function () {
        if (isVisible(_this29)) {
          _this29.focus();
        }
      });
    });
    var data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Modal to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Modal);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'offcanvas';
  var DATA_KEY$5 = 'bs.offcanvas';
  var EVENT_KEY$5 = ".".concat(DATA_KEY$5);
  var DATA_API_KEY$2 = '.data-api';
  var EVENT_LOAD_DATA_API$1 = "load".concat(EVENT_KEY$5).concat(DATA_API_KEY$2);
  var ESCAPE_KEY = 'Escape';
  var Default$4 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  var DefaultType$4 = {
    backdrop: 'boolean',
    keyboard: 'boolean',
    scroll: 'boolean'
  };
  var CLASS_NAME_SHOW$4 = 'show';
  var OPEN_SELECTOR = '.offcanvas.show';
  var EVENT_SHOW$2 = "show".concat(EVENT_KEY$5);
  var EVENT_SHOWN$2 = "shown".concat(EVENT_KEY$5);
  var EVENT_HIDE$2 = "hide".concat(EVENT_KEY$5);
  var EVENT_HIDDEN$2 = "hidden".concat(EVENT_KEY$5);
  var EVENT_FOCUSIN$1 = "focusin".concat(EVENT_KEY$5);
  var EVENT_CLICK_DATA_API$1 = "click".concat(EVENT_KEY$5).concat(DATA_API_KEY$2);
  var EVENT_CLICK_DISMISS$1 = "click.dismiss".concat(EVENT_KEY$5);
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss".concat(EVENT_KEY$5);
  var SELECTOR_DATA_DISMISS$1 = '[data-bs-dismiss="offcanvas"]';
  var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Offcanvas = /*#__PURE__*/function (_BaseComponent7) {
    _inherits(Offcanvas, _BaseComponent7);

    var _super7 = _createSuper(Offcanvas);

    function Offcanvas(element, config) {
      var _this30;

      _classCallCheck(this, Offcanvas);

      _this30 = _super7.call(this, element);
      _this30._config = _this30._getConfig(config);
      _this30._isShown = false;
      _this30._backdrop = _this30._initializeBackDrop();

      _this30._addEventListeners();

      return _this30;
    } // Getters


    _createClass(Offcanvas, [{
      key: "toggle",
      value: // Public
      function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
    }, {
      key: "show",
      value: function show(relatedTarget) {
        var _this31 = this;

        if (this._isShown) {
          return;
        }

        var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
          relatedTarget: relatedTarget
        });

        if (showEvent.defaultPrevented) {
          return;
        }

        this._isShown = true;
        this._element.style.visibility = 'visible';

        this._backdrop.show();

        if (!this._config.scroll) {
          new ScrollBarHelper().hide();

          this._enforceFocusOnElement(this._element);
        }

        this._element.removeAttribute('aria-hidden');

        this._element.setAttribute('aria-modal', true);

        this._element.setAttribute('role', 'dialog');

        this._element.classList.add(CLASS_NAME_SHOW$4);

        var completeCallBack = function completeCallBack() {
          EventHandler.trigger(_this31._element, EVENT_SHOWN$2, {
            relatedTarget: relatedTarget
          });
        };

        this._queueCallback(completeCallBack, this._element, true);
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this32 = this;

        if (!this._isShown) {
          return;
        }

        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

        if (hideEvent.defaultPrevented) {
          return;
        }

        EventHandler.off(document, EVENT_FOCUSIN$1);

        this._element.blur();

        this._isShown = false;

        this._element.classList.remove(CLASS_NAME_SHOW$4);

        this._backdrop.hide();

        var completeCallback = function completeCallback() {
          _this32._element.setAttribute('aria-hidden', true);

          _this32._element.removeAttribute('aria-modal');

          _this32._element.removeAttribute('role');

          _this32._element.style.visibility = 'hidden';

          if (!_this32._config.scroll) {
            new ScrollBarHelper().reset();
          }

          EventHandler.trigger(_this32._element, EVENT_HIDDEN$2);
        };

        this._queueCallback(completeCallback, this._element, true);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._backdrop.dispose();

        _get(_getPrototypeOf(Offcanvas.prototype), "dispose", this).call(this);

        EventHandler.off(document, EVENT_FOCUSIN$1);
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default$4), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
        typeCheckConfig(NAME$5, config, DefaultType$4);
        return config;
      }
    }, {
      key: "_initializeBackDrop",
      value: function _initializeBackDrop() {
        var _this33 = this;

        return new Backdrop({
          isVisible: this._config.backdrop,
          isAnimated: true,
          rootElement: this._element.parentNode,
          clickCallback: function clickCallback() {
            return _this33.hide();
          }
        });
      }
    }, {
      key: "_enforceFocusOnElement",
      value: function _enforceFocusOnElement(element) {
        EventHandler.off(document, EVENT_FOCUSIN$1); // guard against infinite focus loop

        EventHandler.on(document, EVENT_FOCUSIN$1, function (event) {
          if (document !== event.target && element !== event.target && !element.contains(event.target)) {
            element.focus();
          }
        });
        element.focus();
      }
    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this34 = this;

        EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
          return _this34.hide();
        });
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this34._config.keyboard && event.key === ESCAPE_KEY) {
            _this34.hide();
          }
        });
      } // Static

    }], [{
      key: "NAME",
      get: function get() {
        return NAME$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Offcanvas.getOrCreateInstance(this, config);

          if (typeof config !== 'string') {
            return;
          }

          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config](this);
        });
      }
    }]);

    return Offcanvas;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    var _this35 = this;

    var target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$2, function () {
      // focus on trigger when it is closed
      if (isVisible(_this35)) {
        _this35.focus();
      }
    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

    var allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

    if (allReadyOpen && allReadyOpen !== target) {
      Offcanvas.getInstance(allReadyOpen).hide();
    }

    var data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
    return SelectorEngine.find(OPEN_SELECTOR).forEach(function (el) {
      return Offcanvas.getOrCreateInstance(el).show();
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  defineJQueryPlugin(Offcanvas);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.includes(attrName)) {
      if (uriAttrs.has(attrName)) {
        return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (regExp[i].test(attrName)) {
        return true;
      }
    }

    return false;
  };

  var DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };

  function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
    var _ref11;

    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var allowlistKeys = Object.keys(allowList);

    var elements = (_ref11 = []).concat.apply(_ref11, _toConsumableArray(createdDocument.body.querySelectorAll('*')));

    var _loop2 = function _loop2(i, len) {
      var _ref12;

      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (!allowlistKeys.includes(elName)) {
        el.remove();
        return "continue";
      }

      var attributeList = (_ref12 = []).concat.apply(_ref12, _toConsumableArray(el.attributes));

      var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, allowedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret2 = _loop2(i, len);

      if (_ret2 === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$4 = 'tooltip';
  var DATA_KEY$4 = 'bs.tooltip';
  var EVENT_KEY$4 = ".".concat(DATA_KEY$4);
  var CLASS_PREFIX$1 = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)".concat(CLASS_PREFIX$1, "\\S+"), 'g');
  var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  var DefaultType$3 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(array|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacements: 'array',
    boundary: '(string|element)',
    customClass: '(string|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    allowList: 'object',
    popperConfig: '(null|object|function)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  var Default$3 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: [0, 0],
    container: false,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    boundary: 'clippingParents',
    customClass: '',
    sanitize: true,
    sanitizeFn: null,
    allowList: DefaultAllowlist,
    popperConfig: null
  };
  var Event$2 = {
    HIDE: "hide".concat(EVENT_KEY$4),
    HIDDEN: "hidden".concat(EVENT_KEY$4),
    SHOW: "show".concat(EVENT_KEY$4),
    SHOWN: "shown".concat(EVENT_KEY$4),
    INSERTED: "inserted".concat(EVENT_KEY$4),
    CLICK: "click".concat(EVENT_KEY$4),
    FOCUSIN: "focusin".concat(EVENT_KEY$4),
    FOCUSOUT: "focusout".concat(EVENT_KEY$4),
    MOUSEENTER: "mouseenter".concat(EVENT_KEY$4),
    MOUSELEAVE: "mouseleave".concat(EVENT_KEY$4)
  };
  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_MODAL = 'modal';
  var CLASS_NAME_SHOW$3 = 'show';
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = /*#__PURE__*/function (_BaseComponent8) {
    _inherits(Tooltip, _BaseComponent8);

    var _super8 = _createSuper(Tooltip);

    function Tooltip(element, config) {
      var _this36;

      _classCallCheck(this, Tooltip);

      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      }

      _this36 = _super8.call(this, element); // private

      _this36._isEnabled = true;
      _this36._timeout = 0;
      _this36._hoverState = '';
      _this36._activeTrigger = {};
      _this36._popper = null; // Protected

      _this36._config = _this36._getConfig(config);
      _this36.tip = null;

      _this36._setListeners();

      return _this36;
    } // Getters


    _createClass(Tooltip, [{
      key: "enable",
      value: // Public
      function enable() {
        this._isEnabled = true;
      }
    }, {
      key: "disable",
      value: function disable() {
        this._isEnabled = false;
      }
    }, {
      key: "toggleEnabled",
      value: function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
    }, {
      key: "toggle",
      value: function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var context = this._initializeOnDelegatedTarget(event);

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        clearTimeout(this._timeout);
        EventHandler.off(this._element.closest(".".concat(CLASS_NAME_MODAL)), 'hide.bs.modal', this._hideModalHandler);

        if (this.tip) {
          this.tip.remove();
        }

        if (this._popper) {
          this._popper.destroy();
        }

        _get(_getPrototypeOf(Tooltip.prototype), "dispose", this).call(this);
      }
    }, {
      key: "show",
      value: function show() {
        var _this37 = this;

        if (this._element.style.display === 'none') {
          throw new Error('Please use show on visible elements');
        }

        if (!(this.isWithContent() && this._isEnabled)) {
          return;
        }

        var showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
        var shadowRoot = findShadowRoot(this._element);
        var isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

        if (showEvent.defaultPrevented || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);

        this._element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this._config.animation) {
          tip.classList.add(CLASS_NAME_FADE$3);
        }

        var placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

        var attachment = this._getAttachment(placement);

        this._addAttachmentClass(attachment);

        var container = this._config.container;
        Data.set(tip, this.constructor.DATA_KEY, this);

        if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
          container.appendChild(tip);
          EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
        }

        if (this._popper) {
          this._popper.update();
        } else {
          this._popper = createPopper(this._element, tip, this._getPopperConfig(attachment));
        }

        tip.classList.add(CLASS_NAME_SHOW$3);
        var customClass = typeof this._config.customClass === 'function' ? this._config.customClass() : this._config.customClass;

        if (customClass) {
          var _tip$classList;

          (_tip$classList = tip.classList).add.apply(_tip$classList, _toConsumableArray(customClass.split(' ')));
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement) {
          var _ref13;

          (_ref13 = []).concat.apply(_ref13, _toConsumableArray(document.body.children)).forEach(function (element) {
            EventHandler.on(element, 'mouseover', noop);
          });
        }

        var complete = function complete() {
          var prevHoverState = _this37._hoverState;
          _this37._hoverState = null;
          EventHandler.trigger(_this37._element, _this37.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this37._leave(null, _this37);
          }
        };

        var isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$3);

        this._queueCallback(complete, this.tip, isAnimated);
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this38 = this;

        if (!this._popper) {
          return;
        }

        var tip = this.getTipElement();

        var complete = function complete() {
          if (_this38._isWithActiveTrigger()) {
            return;
          }

          if (_this38._hoverState !== HOVER_STATE_SHOW) {
            tip.remove();
          }

          _this38._cleanTipClass();

          _this38._element.removeAttribute('aria-describedby');

          EventHandler.trigger(_this38._element, _this38.constructor.Event.HIDDEN);

          if (_this38._popper) {
            _this38._popper.destroy();

            _this38._popper = null;
          }
        };

        var hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

        if (hideEvent.defaultPrevented) {
          return;
        }

        tip.classList.remove(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          var _ref14;

          (_ref14 = []).concat.apply(_ref14, _toConsumableArray(document.body.children)).forEach(function (element) {
            return EventHandler.off(element, 'mouseover', noop);
          });
        }

        this._activeTrigger[TRIGGER_CLICK] = false;
        this._activeTrigger[TRIGGER_FOCUS] = false;
        this._activeTrigger[TRIGGER_HOVER] = false;
        var isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$3);

        this._queueCallback(complete, this.tip, isAnimated);

        this._hoverState = '';
      }
    }, {
      key: "update",
      value: function update() {
        if (this._popper !== null) {
          this._popper.update();
        }
      } // Protected

    }, {
      key: "isWithContent",
      value: function isWithContent() {
        return Boolean(this.getTitle());
      }
    }, {
      key: "getTipElement",
      value: function getTipElement() {
        if (this.tip) {
          return this.tip;
        }

        var element = document.createElement('div');
        element.innerHTML = this._config.template;
        this.tip = element.children[0];
        return this.tip;
      }
    }, {
      key: "setContent",
      value: function setContent() {
        var tip = this.getTipElement();
        this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
        tip.classList.remove(CLASS_NAME_FADE$3, CLASS_NAME_SHOW$3);
      }
    }, {
      key: "setElementContent",
      value: function setElementContent(element, content) {
        if (element === null) {
          return;
        }

        if (isElement$1(content)) {
          content = getElement(content); // content is a DOM node or a jQuery

          if (this._config.html) {
            if (content.parentNode !== element) {
              element.innerHTML = '';
              element.appendChild(content);
            }
          } else {
            element.textContent = content.textContent;
          }

          return;
        }

        if (this._config.html) {
          if (this._config.sanitize) {
            content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
          }

          element.innerHTML = content;
        } else {
          element.textContent = content;
        }
      }
    }, {
      key: "getTitle",
      value: function getTitle() {
        var title = this._element.getAttribute('data-bs-original-title');

        if (!title) {
          title = typeof this._config.title === 'function' ? this._config.title.call(this._element) : this._config.title;
        }

        return title;
      }
    }, {
      key: "updateAttachment",
      value: function updateAttachment(attachment) {
        if (attachment === 'right') {
          return 'end';
        }

        if (attachment === 'left') {
          return 'start';
        }

        return attachment;
      } // Private

    }, {
      key: "_initializeOnDelegatedTarget",
      value: function _initializeOnDelegatedTarget(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || Data.get(event.delegateTarget, dataKey);

        if (!context) {
          context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
          Data.set(event.delegateTarget, dataKey, context);
        }

        return context;
      }
    }, {
      key: "_getOffset",
      value: function _getOffset() {
        var _this39 = this;

        var offset = this._config.offset;

        if (typeof offset === 'string') {
          return offset.split(',').map(function (val) {
            return Number.parseInt(val, 10);
          });
        }

        if (typeof offset === 'function') {
          return function (popperData) {
            return offset(popperData, _this39._element);
          };
        }

        return offset;
      }
    }, {
      key: "_getPopperConfig",
      value: function _getPopperConfig(attachment) {
        var _this40 = this;

        var defaultBsPopperConfig = {
          placement: attachment,
          modifiers: [{
            name: 'flip',
            options: {
              fallbackPlacements: this._config.fallbackPlacements
            }
          }, {
            name: 'offset',
            options: {
              offset: this._getOffset()
            }
          }, {
            name: 'preventOverflow',
            options: {
              boundary: this._config.boundary
            }
          }, {
            name: 'arrow',
            options: {
              element: ".".concat(this.constructor.NAME, "-arrow")
            }
          }, {
            name: 'onChange',
            enabled: true,
            phase: 'afterWrite',
            fn: function fn(data) {
              return _this40._handlePopperPlacementChange(data);
            }
          }],
          onFirstUpdate: function onFirstUpdate(data) {
            if (data.options.placement !== data.placement) {
              _this40._handlePopperPlacementChange(data);
            }
          }
        };
        return _objectSpread(_objectSpread({}, defaultBsPopperConfig), typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
      }
    }, {
      key: "_addAttachmentClass",
      value: function _addAttachmentClass(attachment) {
        this.getTipElement().classList.add("".concat(CLASS_PREFIX$1, "-").concat(this.updateAttachment(attachment)));
      }
    }, {
      key: "_getAttachment",
      value: function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      }
    }, {
      key: "_setListeners",
      value: function _setListeners() {
        var _this41 = this;

        var triggers = this._config.trigger.split(' ');

        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            EventHandler.on(_this41._element, _this41.constructor.Event.CLICK, _this41._config.selector, function (event) {
              return _this41.toggle(event);
            });
          } else if (trigger !== TRIGGER_MANUAL) {
            var eventIn = trigger === TRIGGER_HOVER ? _this41.constructor.Event.MOUSEENTER : _this41.constructor.Event.FOCUSIN;
            var eventOut = trigger === TRIGGER_HOVER ? _this41.constructor.Event.MOUSELEAVE : _this41.constructor.Event.FOCUSOUT;
            EventHandler.on(_this41._element, eventIn, _this41._config.selector, function (event) {
              return _this41._enter(event);
            });
            EventHandler.on(_this41._element, eventOut, _this41._config.selector, function (event) {
              return _this41._leave(event);
            });
          }
        });

        this._hideModalHandler = function () {
          if (_this41._element) {
            _this41.hide();
          }
        };

        EventHandler.on(this._element.closest(".".concat(CLASS_NAME_MODAL)), 'hide.bs.modal', this._hideModalHandler);

        if (this._config.selector) {
          this._config = _objectSpread(_objectSpread({}, this._config), {}, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      }
    }, {
      key: "_fixTitle",
      value: function _fixTitle() {
        var title = this._element.getAttribute('title');

        var originalTitleType = _typeof(this._element.getAttribute('data-bs-original-title'));

        if (title || originalTitleType !== 'string') {
          this._element.setAttribute('data-bs-original-title', title || '');

          if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
            this._element.setAttribute('aria-label', title);
          }

          this._element.setAttribute('title', '');
        }
      }
    }, {
      key: "_enter",
      value: function _enter(event, context) {
        context = this._initializeOnDelegatedTarget(event, context);

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
        }

        if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
          context._hoverState = HOVER_STATE_SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HOVER_STATE_SHOW;

        if (!context._config.delay || !context._config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HOVER_STATE_SHOW) {
            context.show();
          }
        }, context._config.delay.show);
      }
    }, {
      key: "_leave",
      value: function _leave(event, context) {
        context = this._initializeOnDelegatedTarget(event, context);

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HOVER_STATE_OUT;

        if (!context._config.delay || !context._config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HOVER_STATE_OUT) {
            context.hide();
          }
        }, context._config.delay.hide);
      }
    }, {
      key: "_isWithActiveTrigger",
      value: function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        var dataAttributes = Manipulator.getDataAttributes(this._element);
        Object.keys(dataAttributes).forEach(function (dataAttr) {
          if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
            delete dataAttributes[dataAttr];
          }
        });
        config = _objectSpread(_objectSpread(_objectSpread({}, this.constructor.Default), dataAttributes), _typeof(config) === 'object' && config ? config : {});
        config.container = config.container === false ? document.body : getElement(config.container);

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

        if (config.sanitize) {
          config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
        }

        return config;
      }
    }, {
      key: "_getDelegateConfig",
      value: function _getDelegateConfig() {
        var config = {};

        if (this._config) {
          for (var key in this._config) {
            if (this.constructor.Default[key] !== this._config[key]) {
              config[key] = this._config[key];
            }
          }
        }

        return config;
      }
    }, {
      key: "_cleanTipClass",
      value: function _cleanTipClass() {
        var tip = this.getTipElement();
        var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

        if (tabClass !== null && tabClass.length > 0) {
          tabClass.map(function (token) {
            return token.trim();
          }).forEach(function (tClass) {
            return tip.classList.remove(tClass);
          });
        }
      }
    }, {
      key: "_handlePopperPlacementChange",
      value: function _handlePopperPlacementChange(popperData) {
        var state = popperData.state;

        if (!state) {
          return;
        }

        this.tip = state.elements.popper;

        this._cleanTipClass();

        this._addAttachmentClass(this._getAttachment(state.placement));
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$4;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$3;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Tooltip.getOrCreateInstance(this, config);

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"".concat(config, "\""));
            }

            data[config]();
          }
        });
      }
    }]);

    return Tooltip;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tooltip to jQuery only if jQuery is present
   */


  defineJQueryPlugin(Tooltip);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'popover';
  var DATA_KEY$3 = 'bs.popover';
  var EVENT_KEY$3 = ".".concat(DATA_KEY$3);
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)".concat(CLASS_PREFIX, "\\S+"), 'g');

  var Default$2 = _objectSpread(_objectSpread({}, Tooltip.Default), {}, {
    placement: 'right',
    offset: [0, 8],
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
  });

  var DefaultType$2 = _objectSpread(_objectSpread({}, Tooltip.DefaultType), {}, {
    content: '(string|element|function)'
  });

  var Event$1 = {
    HIDE: "hide".concat(EVENT_KEY$3),
    HIDDEN: "hidden".concat(EVENT_KEY$3),
    SHOW: "show".concat(EVENT_KEY$3),
    SHOWN: "shown".concat(EVENT_KEY$3),
    INSERTED: "inserted".concat(EVENT_KEY$3),
    CLICK: "click".concat(EVENT_KEY$3),
    FOCUSIN: "focusin".concat(EVENT_KEY$3),
    FOCUSOUT: "focusout".concat(EVENT_KEY$3),
    MOUSEENTER: "mouseenter".concat(EVENT_KEY$3),
    MOUSELEAVE: "mouseleave".concat(EVENT_KEY$3)
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$2 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = /*#__PURE__*/function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    var _super9 = _createSuper(Popover);

    function Popover() {
      _classCallCheck(this, Popover);

      return _super9.apply(this, arguments);
    }

    _createClass(Popover, [{
      key: "isWithContent",
      value: // Overrides
      function isWithContent() {
        return this.getTitle() || this._getContent();
      }
    }, {
      key: "getTipElement",
      value: function getTipElement() {
        if (this.tip) {
          return this.tip;
        }

        this.tip = _get(_getPrototypeOf(Popover.prototype), "getTipElement", this).call(this);

        if (!this.getTitle()) {
          SelectorEngine.findOne(SELECTOR_TITLE, this.tip).remove();
        }

        if (!this._getContent()) {
          SelectorEngine.findOne(SELECTOR_CONTENT, this.tip).remove();
        }

        return this.tip;
      }
    }, {
      key: "setContent",
      value: function setContent() {
        var tip = this.getTipElement(); // we use append for html objects to maintain js events

        this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this._element);
        }

        this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
        tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      } // Private

    }, {
      key: "_addAttachmentClass",
      value: function _addAttachmentClass(attachment) {
        this.getTipElement().classList.add("".concat(CLASS_PREFIX, "-").concat(this.updateAttachment(attachment)));
      }
    }, {
      key: "_getContent",
      value: function _getContent() {
        return this._element.getAttribute('data-bs-content') || this._config.content;
      }
    }, {
      key: "_cleanTipClass",
      value: function _cleanTipClass() {
        var tip = this.getTipElement();
        var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          tabClass.map(function (token) {
            return token.trim();
          }).forEach(function (tClass) {
            return tip.classList.remove(tClass);
          });
        }
      } // Static

    }], [{
      key: "Default",
      get: // Getters
      function get() {
        return Default$2;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$3;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Popover.getOrCreateInstance(this, config);

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"".concat(config, "\""));
            }

            data[config]();
          }
        });
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Popover to jQuery only if jQuery is present
   */


  defineJQueryPlugin(Popover);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'scrollspy';
  var DATA_KEY$2 = 'bs.scrollspy';
  var EVENT_KEY$2 = ".".concat(DATA_KEY$2);
  var DATA_API_KEY$1 = '.data-api';
  var Default$1 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$1 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate".concat(EVENT_KEY$2);
  var EVENT_SCROLL = "scroll".concat(EVENT_KEY$2);
  var EVENT_LOAD_DATA_API = "load".concat(EVENT_KEY$2).concat(DATA_API_KEY$1);
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/function (_BaseComponent9) {
    _inherits(ScrollSpy, _BaseComponent9);

    var _super10 = _createSuper(ScrollSpy);

    function ScrollSpy(element, config) {
      var _this42;

      _classCallCheck(this, ScrollSpy);

      _this42 = _super10.call(this, element);
      _this42._scrollElement = _this42._element.tagName === 'BODY' ? window : _this42._element;
      _this42._config = _this42._getConfig(config);
      _this42._selector = "".concat(_this42._config.target, " ").concat(SELECTOR_NAV_LINKS, ", ").concat(_this42._config.target, " ").concat(SELECTOR_LIST_ITEMS, ", ").concat(_this42._config.target, " .").concat(CLASS_NAME_DROPDOWN_ITEM);
      _this42._offsets = [];
      _this42._targets = [];
      _this42._activeTarget = null;
      _this42._scrollHeight = 0;
      EventHandler.on(_this42._scrollElement, EVENT_SCROLL, function () {
        return _this42._process();
      });

      _this42.refresh();

      _this42._process();

      return _this42;
    } // Getters


    _createClass(ScrollSpy, [{
      key: "refresh",
      value: // Public
      function refresh() {
        var _this43 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = SelectorEngine.find(this._selector);
        targets.map(function (element) {
          var targetSelector = getSelectorFromElement(element);
          var target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this43._offsets.push(item[0]);

          _this43._targets.push(item[1]);
        });
      }
    }, {
      key: "dispose",
      value: function dispose() {
        EventHandler.off(this._scrollElement, EVENT_KEY$2);

        _get(_getPrototypeOf(ScrollSpy.prototype), "dispose", this).call(this);
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default$1), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' && config ? config : {});

        if (typeof config.target !== 'string' && isElement$1(config.target)) {
          var id = config.target.id;

          if (!id) {
            id = getUID(NAME$2);
            config.target.id = id;
          }

          config.target = "#".concat(id);
        }

        typeCheckConfig(NAME$2, config, DefaultType$1);
        return config;
      }
    }, {
      key: "_getScrollTop",
      value: function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      }
    }, {
      key: "_getScrollHeight",
      value: function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }
    }, {
      key: "_getOffsetHeight",
      value: function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      }
    }, {
      key: "_process",
      value: function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      }
    }, {
      key: "_activate",
      value: function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',').map(function (selector) {
          return "".concat(selector, "[data-bs-target=\"").concat(target, "\"],").concat(selector, "[href=\"").concat(target, "\"]");
        });

        var link = SelectorEngine.findOne(queries.join(','));

        if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
          SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
          link.classList.add(CLASS_NAME_ACTIVE$1);
        } else {
          // Set triggered link as active
          link.classList.add(CLASS_NAME_ACTIVE$1);
          SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(function (listGroup) {
            // Set triggered links parents as active
            // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
            SelectorEngine.prev(listGroup, "".concat(SELECTOR_NAV_LINKS, ", ").concat(SELECTOR_LIST_ITEMS)).forEach(function (item) {
              return item.classList.add(CLASS_NAME_ACTIVE$1);
            }); // Handle special case when .nav-link is inside .nav-item

            SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
              SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) {
                return item.classList.add(CLASS_NAME_ACTIVE$1);
              });
            });
          });
        }

        EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
          relatedTarget: target
        });
      }
    }, {
      key: "_clear",
      value: function _clear() {
        SelectorEngine.find(this._selector).filter(function (node) {
          return node.classList.contains(CLASS_NAME_ACTIVE$1);
        }).forEach(function (node) {
          return node.classList.remove(CLASS_NAME_ACTIVE$1);
        });
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$2;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = ScrollSpy.getOrCreateInstance(this, config);

          if (typeof config !== 'string') {
            return;
          }

          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        });
      }
    }]);

    return ScrollSpy;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
    SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) {
      return new ScrollSpy(spy);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .ScrollSpy to jQuery only if jQuery is present
   */

  defineJQueryPlugin(ScrollSpy);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'tab';
  var DATA_KEY$1 = 'bs.tab';
  var EVENT_KEY$1 = ".".concat(DATA_KEY$1);
  var DATA_API_KEY = '.data-api';
  var EVENT_HIDE$1 = "hide".concat(EVENT_KEY$1);
  var EVENT_HIDDEN$1 = "hidden".concat(EVENT_KEY$1);
  var EVENT_SHOW$1 = "show".concat(EVENT_KEY$1);
  var EVENT_SHOWN$1 = "shown".concat(EVENT_KEY$1);
  var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY$1).concat(DATA_API_KEY);
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_SHOW$1 = 'show';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_UL = ':scope > li > .active';
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/function (_BaseComponent10) {
    _inherits(Tab, _BaseComponent10);

    var _super11 = _createSuper(Tab);

    function Tab() {
      _classCallCheck(this, Tab);

      return _super11.apply(this, arguments);
    }

    _createClass(Tab, [{
      key: "show",
      value: // Public
      function show() {
        var _this44 = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
          return;
        }

        var previous;
        var target = getElementFromSelector(this._element);

        var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
          previous = SelectorEngine.find(itemSelector, listElement);
          previous = previous[previous.length - 1];
        }

        var hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
          relatedTarget: this._element
        }) : null;
        var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
          relatedTarget: previous
        });

        if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
          return;
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          EventHandler.trigger(previous, EVENT_HIDDEN$1, {
            relatedTarget: _this44._element
          });
          EventHandler.trigger(_this44._element, EVENT_SHOWN$1, {
            relatedTarget: previous
          });
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      } // Private

    }, {
      key: "_activate",
      value: function _activate(element, container, callback) {
        var _this45 = this;

        var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
        var active = activeElements[0];
        var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

        var complete = function complete() {
          return _this45._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          active.classList.remove(CLASS_NAME_SHOW$1);

          this._queueCallback(complete, element, true);
        } else {
          complete();
        }
      }
    }, {
      key: "_transitionComplete",
      value: function _transitionComplete(element, active, callback) {
        if (active) {
          active.classList.remove(CLASS_NAME_ACTIVE);
          var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

          if (dropdownChild) {
            dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        element.classList.add(CLASS_NAME_ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        reflow(element);

        if (element.classList.contains(CLASS_NAME_FADE$1)) {
          element.classList.add(CLASS_NAME_SHOW$1);
        }

        var parent = element.parentNode;

        if (parent && parent.nodeName === 'LI') {
          parent = parent.parentNode;
        }

        if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
          var dropdownElement = element.closest(SELECTOR_DROPDOWN);

          if (dropdownElement) {
            SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(function (dropdown) {
              return dropdown.classList.add(CLASS_NAME_ACTIVE);
            });
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      } // Static

    }], [{
      key: "NAME",
      get: // Getters
      function get() {
        return NAME$1;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Tab.getOrCreateInstance(this);

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"".concat(config, "\""));
            }

            data[config]();
          }
        });
      }
    }]);

    return Tab;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    var data = Tab.getOrCreateInstance(this);
    data.show();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tab to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Tab);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'toast';
  var DATA_KEY = 'bs.toast';
  var EVENT_KEY = ".".concat(DATA_KEY);
  var EVENT_CLICK_DISMISS = "click.dismiss".concat(EVENT_KEY);
  var EVENT_MOUSEOVER = "mouseover".concat(EVENT_KEY);
  var EVENT_MOUSEOUT = "mouseout".concat(EVENT_KEY);
  var EVENT_FOCUSIN = "focusin".concat(EVENT_KEY);
  var EVENT_FOCUSOUT = "focusout".concat(EVENT_KEY);
  var EVENT_HIDE = "hide".concat(EVENT_KEY);
  var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
  var EVENT_SHOW = "show".concat(EVENT_KEY);
  var EVENT_SHOWN = "shown".concat(EVENT_KEY);
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };
  var SELECTOR_DATA_DISMISS = '[data-bs-dismiss="toast"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast = /*#__PURE__*/function (_BaseComponent11) {
    _inherits(Toast, _BaseComponent11);

    var _super12 = _createSuper(Toast);

    function Toast(element, config) {
      var _this46;

      _classCallCheck(this, Toast);

      _this46 = _super12.call(this, element);
      _this46._config = _this46._getConfig(config);
      _this46._timeout = null;
      _this46._hasMouseInteraction = false;
      _this46._hasKeyboardInteraction = false;

      _this46._setListeners();

      return _this46;
    } // Getters


    _createClass(Toast, [{
      key: "show",
      value: // Public
      function show() {
        var _this47 = this;

        var showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

        if (showEvent.defaultPrevented) {
          return;
        }

        this._clearTimeout();

        if (this._config.animation) {
          this._element.classList.add(CLASS_NAME_FADE);
        }

        var complete = function complete() {
          _this47._element.classList.remove(CLASS_NAME_SHOWING);

          _this47._element.classList.add(CLASS_NAME_SHOW);

          EventHandler.trigger(_this47._element, EVENT_SHOWN);

          _this47._maybeScheduleHide();
        };

        this._element.classList.remove(CLASS_NAME_HIDE);

        reflow(this._element);

        this._element.classList.add(CLASS_NAME_SHOWING);

        this._queueCallback(complete, this._element, this._config.animation);
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this48 = this;

        if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
          return;
        }

        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

        if (hideEvent.defaultPrevented) {
          return;
        }

        var complete = function complete() {
          _this48._element.classList.add(CLASS_NAME_HIDE);

          EventHandler.trigger(_this48._element, EVENT_HIDDEN);
        };

        this._element.classList.remove(CLASS_NAME_SHOW);

        this._queueCallback(complete, this._element, this._config.animation);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._clearTimeout();

        if (this._element.classList.contains(CLASS_NAME_SHOW)) {
          this._element.classList.remove(CLASS_NAME_SHOW);
        }

        _get(_getPrototypeOf(Toast.prototype), "dispose", this).call(this);
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' && config ? config : {});
        typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      }
    }, {
      key: "_maybeScheduleHide",
      value: function _maybeScheduleHide() {
        var _this49 = this;

        if (!this._config.autohide) {
          return;
        }

        if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
          return;
        }

        this._timeout = setTimeout(function () {
          _this49.hide();
        }, this._config.delay);
      }
    }, {
      key: "_onInteraction",
      value: function _onInteraction(event, isInteracting) {
        switch (event.type) {
          case 'mouseover':
          case 'mouseout':
            this._hasMouseInteraction = isInteracting;
            break;

          case 'focusin':
          case 'focusout':
            this._hasKeyboardInteraction = isInteracting;
            break;
        }

        if (isInteracting) {
          this._clearTimeout();

          return;
        }

        var nextElement = event.relatedTarget;

        if (this._element === nextElement || this._element.contains(nextElement)) {
          return;
        }

        this._maybeScheduleHide();
      }
    }, {
      key: "_setListeners",
      value: function _setListeners() {
        var _this50 = this;

        EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function () {
          return _this50.hide();
        });
        EventHandler.on(this._element, EVENT_MOUSEOVER, function (event) {
          return _this50._onInteraction(event, true);
        });
        EventHandler.on(this._element, EVENT_MOUSEOUT, function (event) {
          return _this50._onInteraction(event, false);
        });
        EventHandler.on(this._element, EVENT_FOCUSIN, function (event) {
          return _this50._onInteraction(event, true);
        });
        EventHandler.on(this._element, EVENT_FOCUSOUT, function (event) {
          return _this50._onInteraction(event, false);
        });
      }
    }, {
      key: "_clearTimeout",
      value: function _clearTimeout() {
        clearTimeout(this._timeout);
        this._timeout = null;
      } // Static

    }], [{
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Toast.getOrCreateInstance(this, config);

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"".concat(config, "\""));
            }

            data[config](this);
          }
        });
      }
    }]);

    return Toast;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Toast to jQuery only if jQuery is present
   */


  defineJQueryPlugin(Toast);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var index_umd = {
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Offcanvas: Offcanvas,
    Popover: Popover,
    ScrollSpy: ScrollSpy,
    Tab: Tab,
    Toast: Toast,
    Tooltip: Tooltip
  };
  return index_umd;
});

/***/ }),

/***/ "./resources/js/bootstrap.esm.js":
/*!***************************************!*\
  !*** ./resources/js/bootstrap.esm.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alert": () => (/* binding */ Alert),
/* harmony export */   "Button": () => (/* binding */ Button),
/* harmony export */   "Carousel": () => (/* binding */ Carousel),
/* harmony export */   "Collapse": () => (/* binding */ Collapse),
/* harmony export */   "Dropdown": () => (/* binding */ Dropdown),
/* harmony export */   "Modal": () => (/* binding */ Modal),
/* harmony export */   "Offcanvas": () => (/* binding */ Offcanvas),
/* harmony export */   "Popover": () => (/* binding */ Popover),
/* harmony export */   "ScrollSpy": () => (/* binding */ ScrollSpy),
/* harmony export */   "Tab": () => (/* binding */ Tab),
/* harmony export */   "Toast": () => (/* binding */ Toast),
/* harmony export */   "Tooltip": () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
var _KEY_TO_DIRECTION;

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*!
  * Bootstrap v5.0.2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NODE_TEXT = 3;
var SelectorEngine = {
  find: function find(selector) {
    var _ref;

    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return (_ref = []).concat.apply(_ref, _toConsumableArray(Element.prototype.querySelectorAll.call(element, selector)));
  },
  findOne: function findOne(selector) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return Element.prototype.querySelector.call(element, selector);
  },
  children: function children(element, selector) {
    var _ref2;

    return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(element.children)).filter(function (child) {
      return child.matches(selector);
    });
  },
  parents: function parents(element, selector) {
    var parents = [];
    var ancestor = element.parentNode;

    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (ancestor.matches(selector)) {
        parents.push(ancestor);
      }

      ancestor = ancestor.parentNode;
    }

    return parents;
  },
  prev: function prev(element, selector) {
    var previous = element.previousElementSibling;

    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }

      previous = previous.previousElementSibling;
    }

    return [];
  },
  next: function next(element, selector) {
    var next = element.nextElementSibling;

    while (next) {
      if (next.matches(selector)) {
        return [next];
      }

      next = next.nextElementSibling;
    }

    return [];
  }
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

var MAX_UID = 1000000;
var MILLISECONDS_MULTIPLIER = 1000;
var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

var toType = function toType(obj) {
  if (obj === null || obj === undefined) {
    return "".concat(obj);
  }

  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
};
/**
 * --------------------------------------------------------------------------
 * Public Util Api
 * --------------------------------------------------------------------------
 */


var getUID = function getUID(prefix) {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));

  return prefix;
};

var getSelector = function getSelector(element) {
  var selector = element.getAttribute('data-bs-target');

  if (!selector || selector === '#') {
    var hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273

    if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
      return null;
    } // Just in case some CMS puts out a full URL with the anchor appended


    if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
      hrefAttr = "#".concat(hrefAttr.split('#')[1]);
    }

    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
  }

  return selector;
};

var getSelectorFromElement = function getSelectorFromElement(element) {
  var selector = getSelector(element);

  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }

  return null;
};

var getElementFromSelector = function getElementFromSelector(element) {
  var selector = getSelector(element);
  return selector ? document.querySelector(selector) : null;
};

var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
  if (!element) {
    return 0;
  } // Get transition-duration of the element


  var _window$getComputedSt = window.getComputedStyle(element),
      transitionDuration = _window$getComputedSt.transitionDuration,
      transitionDelay = _window$getComputedSt.transitionDelay;

  var floatTransitionDuration = Number.parseFloat(transitionDuration);
  var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  } // If multiple durations are defined, take the first


  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};

var triggerTransitionEnd = function triggerTransitionEnd(element) {
  element.dispatchEvent(new Event(TRANSITION_END));
};

var isElement = function isElement(obj) {
  if (!obj || _typeof(obj) !== 'object') {
    return false;
  }

  if (typeof obj.jquery !== 'undefined') {
    obj = obj[0];
  }

  return typeof obj.nodeType !== 'undefined';
};

var getElement = function getElement(obj) {
  if (isElement(obj)) {
    // it's a jQuery object or a node element
    return obj.jquery ? obj[0] : obj;
  }

  if (typeof obj === 'string' && obj.length > 0) {
    return SelectorEngine.findOne(obj);
  }

  return null;
};

var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
  Object.keys(configTypes).forEach(function (property) {
    var expectedTypes = configTypes[property];
    var value = config[property];
    var valueType = value && isElement(value) ? 'element' : toType(value);

    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError("".concat(componentName.toUpperCase(), ": Option \"").concat(property, "\" provided type \"").concat(valueType, "\" but expected type \"").concat(expectedTypes, "\"."));
    }
  });
};

var isVisible = function isVisible(element) {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false;
  }

  return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
};

var isDisabled = function isDisabled(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }

  if (element.classList.contains('disabled')) {
    return true;
  }

  if (typeof element.disabled !== 'undefined') {
    return element.disabled;
  }

  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};

var findShadowRoot = function findShadowRoot(element) {
  if (!document.documentElement.attachShadow) {
    return null;
  } // Can find the shadow root otherwise it'll return the document


  if (typeof element.getRootNode === 'function') {
    var root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }

  if (element instanceof ShadowRoot) {
    return element;
  } // when we don't find a shadow root


  if (!element.parentNode) {
    return null;
  }

  return findShadowRoot(element.parentNode);
};

var noop = function noop() {};

var reflow = function reflow(element) {
  return element.offsetHeight;
};

var getjQuery = function getjQuery() {
  var _window = window,
      jQuery = _window.jQuery;

  if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return jQuery;
  }

  return null;
};

var DOMContentLoadedCallbacks = [];

var onDOMContentLoaded = function onDOMContentLoaded(callback) {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', function () {
        DOMContentLoadedCallbacks.forEach(function (callback) {
          return callback();
        });
      });
    }

    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};

var isRTL = function isRTL() {
  return document.documentElement.dir === 'rtl';
};

var defineJQueryPlugin = function defineJQueryPlugin(plugin) {
  onDOMContentLoaded(function () {
    var $ = getjQuery();
    /* istanbul ignore if */

    if ($) {
      var name = plugin.NAME;
      var JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;

      $.fn[name].noConflict = function () {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};

var execute = function execute(callback) {
  if (typeof callback === 'function') {
    callback();
  }
};

var executeAfterTransition = function executeAfterTransition(callback, transitionElement) {
  var waitForTransition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!waitForTransition) {
    execute(callback);
    return;
  }

  var durationPadding = 5;
  var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  var called = false;

  var handler = function handler(_ref3) {
    var target = _ref3.target;

    if (target !== transitionElement) {
      return;
    }

    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };

  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(function () {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};
/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */


var getNextActiveElement = function getNextActiveElement(list, activeElement, shouldGetNext, isCycleAllowed) {
  var index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

  if (index === -1) {
    return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
  }

  var listLength = list.length;
  index += shouldGetNext ? 1 : -1;

  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }

  return list[Math.max(0, Math.min(index, listLength - 1))];
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
var stripNameRegex = /\..*/;
var stripUidRegex = /::\d+$/;
var eventRegistry = {}; // Events storage

var uidEvent = 1;
var customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
var customEventsRegex = /^(mouseenter|mouseleave)/i;
var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
/**
 * ------------------------------------------------------------------------
 * Private methods
 * ------------------------------------------------------------------------
 */

function getUidEvent(element, uid) {
  return uid && "".concat(uid, "::").concat(uidEvent++) || element.uidEvent || uidEvent++;
}

function getEvent(element) {
  var uid = getUidEvent(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}

function bootstrapHandler(element, fn) {
  return function handler(event) {
    event.delegateTarget = element;

    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn);
    }

    return fn.apply(element, [event]);
  };
}

function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    var domElements = element.querySelectorAll(selector);

    for (var target = event.target; target && target !== this; target = target.parentNode) {
      for (var i = domElements.length; i--;) {
        if (domElements[i] === target) {
          event.delegateTarget = target;

          if (handler.oneOff) {
            // eslint-disable-next-line unicorn/consistent-destructuring
            EventHandler.off(element, event.type, selector, fn);
          }

          return fn.apply(target, [event]);
        }
      }
    } // To please ESLint


    return null;
  };
}

function findHandler(events, handler) {
  var delegationSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var uidEventList = Object.keys(events);

  for (var i = 0, len = uidEventList.length; i < len; i++) {
    var event = events[uidEventList[i]];

    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
      return event;
    }
  }

  return null;
}

function normalizeParams(originalTypeEvent, handler, delegationFn) {
  var delegation = typeof handler === 'string';
  var originalHandler = delegation ? delegationFn : handler;
  var typeEvent = getTypeEvent(originalTypeEvent);
  var isNative = nativeEvents.has(typeEvent);

  if (!isNative) {
    typeEvent = originalTypeEvent;
  }

  return [delegation, originalHandler, typeEvent];
}

function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return;
  }

  if (!handler) {
    handler = delegationFn;
    delegationFn = null;
  } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does


  if (customEventsRegex.test(originalTypeEvent)) {
    var wrapFn = function wrapFn(fn) {
      return function (event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn.call(this, event);
        }
      };
    };

    if (delegationFn) {
      delegationFn = wrapFn(delegationFn);
    } else {
      handler = wrapFn(handler);
    }
  }

  var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
      _normalizeParams2 = _slicedToArray(_normalizeParams, 3),
      delegation = _normalizeParams2[0],
      originalHandler = _normalizeParams2[1],
      typeEvent = _normalizeParams2[2];

  var events = getEvent(element);
  var handlers = events[typeEvent] || (events[typeEvent] = {});
  var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

  if (previousFn) {
    previousFn.oneOff = previousFn.oneOff && oneOff;
    return;
  }

  var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
  var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
  fn.delegationSelector = delegation ? handler : null;
  fn.originalHandler = originalHandler;
  fn.oneOff = oneOff;
  fn.uidEvent = uid;
  handlers[uid] = fn;
  element.addEventListener(typeEvent, fn, delegation);
}

function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  var fn = findHandler(events[typeEvent], handler, delegationSelector);

  if (!fn) {
    return;
  }

  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
  delete events[typeEvent][fn.uidEvent];
}

function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  var storeElementEvent = events[typeEvent] || {};
  Object.keys(storeElementEvent).forEach(function (handlerKey) {
    if (handlerKey.includes(namespace)) {
      var event = storeElementEvent[handlerKey];
      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
    }
  });
}

function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '');
  return customEvents[event] || event;
}

var EventHandler = {
  on: function on(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, false);
  },
  one: function one(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, true);
  },
  off: function off(element, originalTypeEvent, handler, delegationFn) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    var _normalizeParams3 = normalizeParams(originalTypeEvent, handler, delegationFn),
        _normalizeParams4 = _slicedToArray(_normalizeParams3, 3),
        delegation = _normalizeParams4[0],
        originalHandler = _normalizeParams4[1],
        typeEvent = _normalizeParams4[2];

    var inNamespace = typeEvent !== originalTypeEvent;
    var events = getEvent(element);
    var isNamespace = originalTypeEvent.startsWith('.');

    if (typeof originalHandler !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!events || !events[typeEvent]) {
        return;
      }

      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
      return;
    }

    if (isNamespace) {
      Object.keys(events).forEach(function (elementEvent) {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      });
    }

    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (keyHandlers) {
      var handlerKey = keyHandlers.replace(stripUidRegex, '');

      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        var event = storeElementEvent[keyHandlers];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  },
  trigger: function trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null;
    }

    var $ = getjQuery();
    var typeEvent = getTypeEvent(event);
    var inNamespace = event !== typeEvent;
    var isNative = nativeEvents.has(typeEvent);
    var jQueryEvent;
    var bubbles = true;
    var nativeDispatch = true;
    var defaultPrevented = false;
    var evt = null;

    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }

    if (isNative) {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(typeEvent, bubbles, true);
    } else {
      evt = new CustomEvent(event, {
        bubbles: bubbles,
        cancelable: true
      });
    } // merge custom information in our event


    if (typeof args !== 'undefined') {
      Object.keys(args).forEach(function (key) {
        Object.defineProperty(evt, key, {
          get: function get() {
            return args[key];
          }
        });
      });
    }

    if (defaultPrevented) {
      evt.preventDefault();
    }

    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }

    if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
      jQueryEvent.preventDefault();
    }

    return evt;
  }
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var elementMap = new Map();
var Data = {
  set: function set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }

    var instanceMap = elementMap.get(element); // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used

    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error("Bootstrap doesn't allow more than one instance per element. Bound instance: ".concat(Array.from(instanceMap.keys())[0], "."));
      return;
    }

    instanceMap.set(key, instance);
  },
  get: function get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }

    return null;
  },
  remove: function remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }

    var instanceMap = elementMap.get(element);
    instanceMap["delete"](key); // free up element references if there are no instances left for an element

    if (instanceMap.size === 0) {
      elementMap["delete"](element);
    }
  }
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var VERSION = '5.0.2';

var BaseComponent = /*#__PURE__*/function () {
  function BaseComponent(element) {
    _classCallCheck(this, BaseComponent);

    element = getElement(element);

    if (!element) {
      return;
    }

    this._element = element;
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  _createClass(BaseComponent, [{
    key: "dispose",
    value: function dispose() {
      var _this = this;

      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      Object.getOwnPropertyNames(this).forEach(function (propertyName) {
        _this[propertyName] = null;
      });
    }
  }, {
    key: "_queueCallback",
    value: function _queueCallback(callback, element) {
      var isAnimated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      executeAfterTransition(callback, element, isAnimated);
    }
    /** Static */

  }], [{
    key: "getInstance",
    value: function getInstance(element) {
      return Data.get(element, this.DATA_KEY);
    }
  }, {
    key: "getOrCreateInstance",
    value: function getOrCreateInstance(element) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.getInstance(element) || new this(element, _typeof(config) === 'object' ? config : null);
    }
  }, {
    key: "VERSION",
    get: function get() {
      return VERSION;
    }
  }, {
    key: "NAME",
    get: function get() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return "bs.".concat(this.NAME);
    }
  }, {
    key: "EVENT_KEY",
    get: function get() {
      return ".".concat(this.DATA_KEY);
    }
  }]);

  return BaseComponent;
}();
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$c = 'alert';
var DATA_KEY$b = 'bs.alert';
var EVENT_KEY$b = ".".concat(DATA_KEY$b);
var DATA_API_KEY$8 = '.data-api';
var SELECTOR_DISMISS = '[data-bs-dismiss="alert"]';
var EVENT_CLOSE = "close".concat(EVENT_KEY$b);
var EVENT_CLOSED = "closed".concat(EVENT_KEY$b);
var EVENT_CLICK_DATA_API$7 = "click".concat(EVENT_KEY$b).concat(DATA_API_KEY$8);
var CLASS_NAME_ALERT = 'alert';
var CLASS_NAME_FADE$6 = 'fade';
var CLASS_NAME_SHOW$9 = 'show';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Alert = /*#__PURE__*/function (_BaseComponent) {
  _inherits(Alert, _BaseComponent);

  var _super = _createSuper(Alert);

  function Alert() {
    _classCallCheck(this, Alert);

    return _super.apply(this, arguments);
  }

  _createClass(Alert, [{
    key: "close",
    value: // Public
    function close(element) {
      var rootElement = element ? this._getRootElement(element) : this._element;

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent === null || customEvent.defaultPrevented) {
        return;
      }

      this._removeElement(rootElement);
    } // Private

  }, {
    key: "_getRootElement",
    value: function _getRootElement(element) {
      return getElementFromSelector(element) || element.closest(".".concat(CLASS_NAME_ALERT));
    }
  }, {
    key: "_triggerCloseEvent",
    value: function _triggerCloseEvent(element) {
      return EventHandler.trigger(element, EVENT_CLOSE);
    }
  }, {
    key: "_removeElement",
    value: function _removeElement(element) {
      var _this2 = this;

      element.classList.remove(CLASS_NAME_SHOW$9);
      var isAnimated = element.classList.contains(CLASS_NAME_FADE$6);

      this._queueCallback(function () {
        return _this2._destroyElement(element);
      }, element, isAnimated);
    }
  }, {
    key: "_destroyElement",
    value: function _destroyElement(element) {
      element.remove();
      EventHandler.trigger(element, EVENT_CLOSED);
    } // Static

  }], [{
    key: "NAME",
    get: // Getters
    function get() {
      return NAME$c;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Alert.getOrCreateInstance(this);

        if (config === 'close') {
          data[config](this);
        }
      });
    }
  }, {
    key: "handleDismiss",
    value: function handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    }
  }]);

  return Alert;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$7, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Alert to jQuery only if jQuery is present
 */

defineJQueryPlugin(Alert);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$b = 'button';
var DATA_KEY$a = 'bs.button';
var EVENT_KEY$a = ".".concat(DATA_KEY$a);
var DATA_API_KEY$7 = '.data-api';
var CLASS_NAME_ACTIVE$3 = 'active';
var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
var EVENT_CLICK_DATA_API$6 = "click".concat(EVENT_KEY$a).concat(DATA_API_KEY$7);
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Button = /*#__PURE__*/function (_BaseComponent2) {
  _inherits(Button, _BaseComponent2);

  var _super2 = _createSuper(Button);

  function Button() {
    _classCallCheck(this, Button);

    return _super2.apply(this, arguments);
  }

  _createClass(Button, [{
    key: "toggle",
    value: // Public
    function toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    } // Static

  }], [{
    key: "NAME",
    get: // Getters
    function get() {
      return NAME$b;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Button.getOrCreateInstance(this);

        if (config === 'toggle') {
          data[config]();
        }
      });
    }
  }]);

  return Button;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, function (event) {
  event.preventDefault();
  var button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  var data = Button.getOrCreateInstance(button);
  data.toggle();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Button to jQuery only if jQuery is present
 */

defineJQueryPlugin(Button);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(val) {
  if (val === 'true') {
    return true;
  }

  if (val === 'false') {
    return false;
  }

  if (val === Number(val).toString()) {
    return Number(val);
  }

  if (val === '' || val === 'null') {
    return null;
  }

  return val;
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, function (chr) {
    return "-".concat(chr.toLowerCase());
  });
}

var Manipulator = {
  setDataAttribute: function setDataAttribute(element, key, value) {
    element.setAttribute("data-bs-".concat(normalizeDataKey(key)), value);
  },
  removeDataAttribute: function removeDataAttribute(element, key) {
    element.removeAttribute("data-bs-".concat(normalizeDataKey(key)));
  },
  getDataAttributes: function getDataAttributes(element) {
    if (!element) {
      return {};
    }

    var attributes = {};
    Object.keys(element.dataset).filter(function (key) {
      return key.startsWith('bs');
    }).forEach(function (key) {
      var pureKey = key.replace(/^bs/, '');
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    });
    return attributes;
  },
  getDataAttribute: function getDataAttribute(element, key) {
    return normalizeData(element.getAttribute("data-bs-".concat(normalizeDataKey(key))));
  },
  offset: function offset(element) {
    var rect = element.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  },
  position: function position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  }
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$a = 'carousel';
var DATA_KEY$9 = 'bs.carousel';
var EVENT_KEY$9 = ".".concat(DATA_KEY$9);
var DATA_API_KEY$6 = '.data-api';
var ARROW_LEFT_KEY = 'ArrowLeft';
var ARROW_RIGHT_KEY = 'ArrowRight';
var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

var SWIPE_THRESHOLD = 40;
var Default$9 = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
};
var DefaultType$9 = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  slide: '(boolean|string)',
  pause: '(string|boolean)',
  wrap: 'boolean',
  touch: 'boolean'
};
var ORDER_NEXT = 'next';
var ORDER_PREV = 'prev';
var DIRECTION_LEFT = 'left';
var DIRECTION_RIGHT = 'right';
var KEY_TO_DIRECTION = (_KEY_TO_DIRECTION = {}, _defineProperty(_KEY_TO_DIRECTION, ARROW_LEFT_KEY, DIRECTION_RIGHT), _defineProperty(_KEY_TO_DIRECTION, ARROW_RIGHT_KEY, DIRECTION_LEFT), _KEY_TO_DIRECTION);
var EVENT_SLIDE = "slide".concat(EVENT_KEY$9);
var EVENT_SLID = "slid".concat(EVENT_KEY$9);
var EVENT_KEYDOWN = "keydown".concat(EVENT_KEY$9);
var EVENT_MOUSEENTER = "mouseenter".concat(EVENT_KEY$9);
var EVENT_MOUSELEAVE = "mouseleave".concat(EVENT_KEY$9);
var EVENT_TOUCHSTART = "touchstart".concat(EVENT_KEY$9);
var EVENT_TOUCHMOVE = "touchmove".concat(EVENT_KEY$9);
var EVENT_TOUCHEND = "touchend".concat(EVENT_KEY$9);
var EVENT_POINTERDOWN = "pointerdown".concat(EVENT_KEY$9);
var EVENT_POINTERUP = "pointerup".concat(EVENT_KEY$9);
var EVENT_DRAG_START = "dragstart".concat(EVENT_KEY$9);
var EVENT_LOAD_DATA_API$2 = "load".concat(EVENT_KEY$9).concat(DATA_API_KEY$6);
var EVENT_CLICK_DATA_API$5 = "click".concat(EVENT_KEY$9).concat(DATA_API_KEY$6);
var CLASS_NAME_CAROUSEL = 'carousel';
var CLASS_NAME_ACTIVE$2 = 'active';
var CLASS_NAME_SLIDE = 'slide';
var CLASS_NAME_END = 'carousel-item-end';
var CLASS_NAME_START = 'carousel-item-start';
var CLASS_NAME_NEXT = 'carousel-item-next';
var CLASS_NAME_PREV = 'carousel-item-prev';
var CLASS_NAME_POINTER_EVENT = 'pointer-event';
var SELECTOR_ACTIVE$1 = '.active';
var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
var SELECTOR_ITEM = '.carousel-item';
var SELECTOR_ITEM_IMG = '.carousel-item img';
var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
var SELECTOR_INDICATORS = '.carousel-indicators';
var SELECTOR_INDICATOR = '[data-bs-target]';
var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
var POINTER_TYPE_TOUCH = 'touch';
var POINTER_TYPE_PEN = 'pen';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Carousel = /*#__PURE__*/function (_BaseComponent3) {
  _inherits(Carousel, _BaseComponent3);

  var _super3 = _createSuper(Carousel);

  function Carousel(element, config) {
    var _this3;

    _classCallCheck(this, Carousel);

    _this3 = _super3.call(this, element);
    _this3._items = null;
    _this3._interval = null;
    _this3._activeElement = null;
    _this3._isPaused = false;
    _this3._isSliding = false;
    _this3.touchTimeout = null;
    _this3.touchStartX = 0;
    _this3.touchDeltaX = 0;
    _this3._config = _this3._getConfig(config);
    _this3._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this3._element);
    _this3._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    _this3._pointerEvent = Boolean(window.PointerEvent);

    _this3._addEventListeners();

    return _this3;
  } // Getters


  _createClass(Carousel, [{
    key: "next",
    value: // Public
    function next() {
      this._slide(ORDER_NEXT);
    }
  }, {
    key: "nextWhenVisible",
    value: function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
  }, {
    key: "prev",
    value: function prev() {
      this._slide(ORDER_PREV);
    }
  }, {
    key: "pause",
    value: function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    }
  }, {
    key: "cycle",
    value: function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config && this._config.interval && !this._isPaused) {
        this._updateInterval();

        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    }
  }, {
    key: "to",
    value: function to(index) {
      var _this4 = this;

      this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, function () {
          return _this4.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

      this._slide(order, this._items[index]);
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, Default$9), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
      typeCheckConfig(NAME$a, config, DefaultType$9);
      return config;
    }
  }, {
    key: "_handleSwipe",
    value: function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0;

      if (!direction) {
        return;
      }

      this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this5 = this;

      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
          return _this5._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) {
          return _this5.pause(event);
        });
        EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) {
          return _this5.cycle(event);
        });
      }

      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners();
      }
    }
  }, {
    key: "_addTouchEventListeners",
    value: function _addTouchEventListeners() {
      var _this6 = this;

      var start = function start(event) {
        if (_this6._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
          _this6.touchStartX = event.clientX;
        } else if (!_this6._pointerEvent) {
          _this6.touchStartX = event.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        _this6.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - _this6.touchStartX;
      };

      var end = function end(event) {
        if (_this6._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
          _this6.touchDeltaX = event.clientX - _this6.touchStartX;
        }

        _this6._handleSwipe();

        if (_this6._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this6.pause();

          if (_this6.touchTimeout) {
            clearTimeout(_this6.touchTimeout);
          }

          _this6.touchTimeout = setTimeout(function (event) {
            return _this6.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this6._config.interval);
        }
      };

      SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
        EventHandler.on(itemImg, EVENT_DRAG_START, function (e) {
          return e.preventDefault();
        });
      });

      if (this._pointerEvent) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    }
  }, {
    key: "_keydown",
    value: function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      var direction = KEY_TO_DIRECTION[event.key];

      if (direction) {
        event.preventDefault();

        this._slide(direction);
      }
    }
  }, {
    key: "_getItemIndex",
    value: function _getItemIndex(element) {
      this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
      return this._items.indexOf(element);
    }
  }, {
    key: "_getItemByOrder",
    value: function _getItemByOrder(order, activeElement) {
      var isNext = order === ORDER_NEXT;
      return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
    }
  }, {
    key: "_triggerSlideEvent",
    value: function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

      return EventHandler.trigger(this._element, EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
    }
  }, {
    key: "_setActiveIndicatorElement",
    value: function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
        activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
        activeIndicator.removeAttribute('aria-current');
        var indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

        for (var i = 0; i < indicators.length; i++) {
          if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
            indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
            indicators[i].setAttribute('aria-current', 'true');
            break;
          }
        }
      }
    }
  }, {
    key: "_updateInterval",
    value: function _updateInterval() {
      var element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      if (!element) {
        return;
      }

      var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = elementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    }
  }, {
    key: "_slide",
    value: function _slide(directionOrOrder, element) {
      var _this7 = this;

      var order = this._directionToOrder(directionOrOrder);

      var activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || this._getItemByOrder(order, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var isNext = order === ORDER_NEXT;
      var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

      var eventDirectionName = this._orderToDirection(order);

      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
        this._isSliding = false;
        return;
      }

      if (this._isSliding) {
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      this._activeElement = nextElement;

      var triggerSlidEvent = function triggerSlidEvent() {
        EventHandler.trigger(_this7._element, EVENT_SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
      };

      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);

        var completeCallBack = function completeCallBack() {
          nextElement.classList.remove(directionalClassName, orderClassName);
          nextElement.classList.add(CLASS_NAME_ACTIVE$2);
          activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
          _this7._isSliding = false;
          setTimeout(triggerSlidEvent, 0);
        };

        this._queueCallback(completeCallBack, activeElement, true);
      } else {
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        this._isSliding = false;
        triggerSlidEvent();
      }

      if (isCycling) {
        this.cycle();
      }
    }
  }, {
    key: "_directionToOrder",
    value: function _directionToOrder(direction) {
      if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
        return direction;
      }

      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }

      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
  }, {
    key: "_orderToDirection",
    value: function _orderToDirection(order) {
      if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
        return order;
      }

      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }

      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$9;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$a;
    }
  }, {
    key: "carouselInterface",
    value: function carouselInterface(element, config) {
      var data = Carousel.getOrCreateInstance(element, config);
      var _config = data._config;

      if (_typeof(config) === 'object') {
        _config = _objectSpread(_objectSpread({}, _config), config);
      }

      var action = typeof config === 'string' ? config : _config.slide;

      if (typeof config === 'number') {
        data.to(config);
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError("No method named \"".concat(action, "\""));
        }

        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        Carousel.carouselInterface(this, config);
      });
    }
  }, {
    key: "dataApiClickHandler",
    value: function dataApiClickHandler(event) {
      var target = getElementFromSelector(this);

      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _objectSpread(_objectSpread({}, Manipulator.getDataAttributes(target)), Manipulator.getDataAttributes(this));

      var slideIndex = this.getAttribute('data-bs-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel.carouselInterface(target, config);

      if (slideIndex) {
        Carousel.getInstance(target).to(slideIndex);
      }

      event.preventDefault();
    }
  }]);

  return Carousel;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
EventHandler.on(window, EVENT_LOAD_DATA_API$2, function () {
  var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

  for (var i = 0, len = carousels.length; i < len; i++) {
    Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
  }
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Carousel to jQuery only if jQuery is present
 */

defineJQueryPlugin(Carousel);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$9 = 'collapse';
var DATA_KEY$8 = 'bs.collapse';
var EVENT_KEY$8 = ".".concat(DATA_KEY$8);
var DATA_API_KEY$5 = '.data-api';
var Default$8 = {
  toggle: true,
  parent: ''
};
var DefaultType$8 = {
  toggle: 'boolean',
  parent: '(string|element)'
};
var EVENT_SHOW$5 = "show".concat(EVENT_KEY$8);
var EVENT_SHOWN$5 = "shown".concat(EVENT_KEY$8);
var EVENT_HIDE$5 = "hide".concat(EVENT_KEY$8);
var EVENT_HIDDEN$5 = "hidden".concat(EVENT_KEY$8);
var EVENT_CLICK_DATA_API$4 = "click".concat(EVENT_KEY$8).concat(DATA_API_KEY$5);
var CLASS_NAME_SHOW$8 = 'show';
var CLASS_NAME_COLLAPSE = 'collapse';
var CLASS_NAME_COLLAPSING = 'collapsing';
var CLASS_NAME_COLLAPSED = 'collapsed';
var WIDTH = 'width';
var HEIGHT = 'height';
var SELECTOR_ACTIVES = '.show, .collapsing';
var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Collapse = /*#__PURE__*/function (_BaseComponent4) {
  _inherits(Collapse, _BaseComponent4);

  var _super4 = _createSuper(Collapse);

  function Collapse(element, config) {
    var _this8;

    _classCallCheck(this, Collapse);

    _this8 = _super4.call(this, element);
    _this8._isTransitioning = false;
    _this8._config = _this8._getConfig(config);
    _this8._triggerArray = SelectorEngine.find("".concat(SELECTOR_DATA_TOGGLE$4, "[href=\"#").concat(_this8._element.id, "\"],") + "".concat(SELECTOR_DATA_TOGGLE$4, "[data-bs-target=\"#").concat(_this8._element.id, "\"]"));
    var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

    for (var i = 0, len = toggleList.length; i < len; i++) {
      var elem = toggleList[i];
      var selector = getSelectorFromElement(elem);
      var filterElement = SelectorEngine.find(selector).filter(function (foundElem) {
        return foundElem === _this8._element;
      });

      if (selector !== null && filterElement.length) {
        _this8._selector = selector;

        _this8._triggerArray.push(elem);
      }
    }

    _this8._parent = _this8._config.parent ? _this8._getParent() : null;

    if (!_this8._config.parent) {
      _this8._addAriaAndCollapsedClass(_this8._element, _this8._triggerArray);
    }

    if (_this8._config.toggle) {
      _this8.toggle();
    }

    return _this8;
  } // Getters


  _createClass(Collapse, [{
    key: "toggle",
    value: // Public
    function toggle() {
      if (this._element.classList.contains(CLASS_NAME_SHOW$8)) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this9 = this;

      if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW$8)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (elem) {
          if (typeof _this9._config.parent === 'string') {
            return elem.getAttribute('data-bs-parent') === _this9._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      var container = SelectorEngine.findOne(this._selector);

      if (actives) {
        var tempActiveData = actives.find(function (elem) {
          return container !== elem;
        });
        activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

      if (startEvent.defaultPrevented) {
        return;
      }

      if (actives) {
        actives.forEach(function (elemActive) {
          if (container !== elemActive) {
            Collapse.collapseInterface(elemActive, 'hide');
          }

          if (!activesData) {
            Data.set(elemActive, DATA_KEY$8, null);
          }
        });
      }

      var dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        this._triggerArray.forEach(function (element) {
          element.classList.remove(CLASS_NAME_COLLAPSED);
          element.setAttribute('aria-expanded', true);
        });
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this9._element.classList.remove(CLASS_NAME_COLLAPSING);

        _this9._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

        _this9._element.style[dimension] = '';

        _this9.setTransitioning(false);

        EventHandler.trigger(_this9._element, EVENT_SHOWN$5);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll".concat(capitalizedDimension);

      this._queueCallback(complete, this._element, true);

      this._element.style[dimension] = "".concat(this._element[scrollSize], "px");
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this10 = this;

      if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW$8)) {
        return;
      }

      var startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

      if (startEvent.defaultPrevented) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = "".concat(this._element.getBoundingClientRect()[dimension], "px");
      reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var elem = getElementFromSelector(trigger);

          if (elem && !elem.classList.contains(CLASS_NAME_SHOW$8)) {
            trigger.classList.add(CLASS_NAME_COLLAPSED);
            trigger.setAttribute('aria-expanded', false);
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this10.setTransitioning(false);

        _this10._element.classList.remove(CLASS_NAME_COLLAPSING);

        _this10._element.classList.add(CLASS_NAME_COLLAPSE);

        EventHandler.trigger(_this10._element, EVENT_HIDDEN$5);
      };

      this._element.style[dimension] = '';

      this._queueCallback(complete, this._element, true);
    }
  }, {
    key: "setTransitioning",
    value: function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread({}, Default$8), config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      typeCheckConfig(NAME$9, config, DefaultType$8);
      return config;
    }
  }, {
    key: "_getDimension",
    value: function _getDimension() {
      return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
    }
  }, {
    key: "_getParent",
    value: function _getParent() {
      var _this11 = this;

      var parent = this._config.parent;
      parent = getElement(parent);
      var selector = "".concat(SELECTOR_DATA_TOGGLE$4, "[data-bs-parent=\"").concat(parent, "\"]");
      SelectorEngine.find(selector, parent).forEach(function (element) {
        var selected = getElementFromSelector(element);

        _this11._addAriaAndCollapsedClass(selected, [element]);
      });
      return parent;
    }
  }, {
    key: "_addAriaAndCollapsedClass",
    value: function _addAriaAndCollapsedClass(element, triggerArray) {
      if (!element || !triggerArray.length) {
        return;
      }

      var isOpen = element.classList.contains(CLASS_NAME_SHOW$8);
      triggerArray.forEach(function (elem) {
        if (isOpen) {
          elem.classList.remove(CLASS_NAME_COLLAPSED);
        } else {
          elem.classList.add(CLASS_NAME_COLLAPSED);
        }

        elem.setAttribute('aria-expanded', isOpen);
      });
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$8;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$9;
    }
  }, {
    key: "collapseInterface",
    value: function collapseInterface(element, config) {
      var data = Collapse.getInstance(element);

      var _config = _objectSpread(_objectSpread(_objectSpread({}, Default$8), Manipulator.getDataAttributes(element)), _typeof(config) === 'object' && config ? config : {});

      if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      if (!data) {
        data = new Collapse(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config]();
      }
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        Collapse.collapseInterface(this, config);
      });
    }
  }]);

  return Collapse;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }

  var triggerData = Manipulator.getDataAttributes(this);
  var selector = getSelectorFromElement(this);
  var selectorElements = SelectorEngine.find(selector);
  selectorElements.forEach(function (element) {
    var data = Collapse.getInstance(element);
    var config;

    if (data) {
      // update parent attribute
      if (data._parent === null && typeof triggerData.parent === 'string') {
        data._config.parent = triggerData.parent;
        data._parent = data._getParent();
      }

      config = 'toggle';
    } else {
      config = triggerData;
    }

    Collapse.collapseInterface(element, config);
  });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Collapse to jQuery only if jQuery is present
 */

defineJQueryPlugin(Collapse);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$8 = 'dropdown';
var DATA_KEY$7 = 'bs.dropdown';
var EVENT_KEY$7 = ".".concat(DATA_KEY$7);
var DATA_API_KEY$4 = '.data-api';
var ESCAPE_KEY$2 = 'Escape';
var SPACE_KEY = 'Space';
var TAB_KEY = 'Tab';
var ARROW_UP_KEY = 'ArrowUp';
var ARROW_DOWN_KEY = 'ArrowDown';
var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

var REGEXP_KEYDOWN = new RegExp("".concat(ARROW_UP_KEY, "|").concat(ARROW_DOWN_KEY, "|").concat(ESCAPE_KEY$2));
var EVENT_HIDE$4 = "hide".concat(EVENT_KEY$7);
var EVENT_HIDDEN$4 = "hidden".concat(EVENT_KEY$7);
var EVENT_SHOW$4 = "show".concat(EVENT_KEY$7);
var EVENT_SHOWN$4 = "shown".concat(EVENT_KEY$7);
var EVENT_CLICK = "click".concat(EVENT_KEY$7);
var EVENT_CLICK_DATA_API$3 = "click".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
var EVENT_KEYDOWN_DATA_API = "keydown".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
var EVENT_KEYUP_DATA_API = "keyup".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
var CLASS_NAME_SHOW$7 = 'show';
var CLASS_NAME_DROPUP = 'dropup';
var CLASS_NAME_DROPEND = 'dropend';
var CLASS_NAME_DROPSTART = 'dropstart';
var CLASS_NAME_NAVBAR = 'navbar';
var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
var SELECTOR_MENU = '.dropdown-menu';
var SELECTOR_NAVBAR_NAV = '.navbar-nav';
var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
var PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
var PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
var PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
var PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
var PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
var PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
var Default$7 = {
  offset: [0, 2],
  boundary: 'clippingParents',
  reference: 'toggle',
  display: 'dynamic',
  popperConfig: null,
  autoClose: true
};
var DefaultType$7 = {
  offset: '(array|string|function)',
  boundary: '(string|element)',
  reference: '(string|element|object)',
  display: 'string',
  popperConfig: '(null|object|function)',
  autoClose: '(boolean|string)'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Dropdown = /*#__PURE__*/function (_BaseComponent5) {
  _inherits(Dropdown, _BaseComponent5);

  var _super5 = _createSuper(Dropdown);

  function Dropdown(element, config) {
    var _this12;

    _classCallCheck(this, Dropdown);

    _this12 = _super5.call(this, element);
    _this12._popper = null;
    _this12._config = _this12._getConfig(config);
    _this12._menu = _this12._getMenuElement();
    _this12._inNavbar = _this12._detectNavbar();

    _this12._addEventListeners();

    return _this12;
  } // Getters


  _createClass(Dropdown, [{
    key: "toggle",
    value: // Public
    function toggle() {
      if (isDisabled(this._element)) {
        return;
      }

      var isActive = this._element.classList.contains(CLASS_NAME_SHOW$7);

      if (isActive) {
        this.hide();
        return;
      }

      this.show();
    }
  }, {
    key: "show",
    value: function show() {
      if (isDisabled(this._element) || this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this._element);
      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      } // Totally disable Popper for Dropdowns in Navbar


      if (this._inNavbar) {
        Manipulator.setDataAttribute(this._menu, 'popper', 'none');
      } else {
        if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (isElement(this._config.reference)) {
          referenceElement = getElement(this._config.reference);
        } else if (_typeof(this._config.reference) === 'object') {
          referenceElement = this._config.reference;
        }

        var popperConfig = this._getPopperConfig();

        var isDisplayStatic = popperConfig.modifiers.find(function (modifier) {
          return modifier.name === 'applyStyles' && modifier.enabled === false;
        });
        this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_1__.createPopper(referenceElement, this._menu, popperConfig);

        if (isDisplayStatic) {
          Manipulator.setDataAttribute(this._menu, 'popper', 'static');
        }
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
        var _ref4;

        (_ref4 = []).concat.apply(_ref4, _toConsumableArray(document.body.children)).forEach(function (elem) {
          return EventHandler.on(elem, 'mouseover', noop);
        });
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      this._menu.classList.toggle(CLASS_NAME_SHOW$7);

      this._element.classList.toggle(CLASS_NAME_SHOW$7);

      EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
    }
  }, {
    key: "hide",
    value: function hide() {
      if (isDisabled(this._element) || !this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };

      this._completeHide(relatedTarget);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this._popper) {
        this._popper.destroy();
      }

      _get(_getPrototypeOf(Dropdown.prototype), "dispose", this).call(this);
    }
  }, {
    key: "update",
    value: function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper) {
        this._popper.update();
      }
    } // Private

  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this13 = this;

      EventHandler.on(this._element, EVENT_CLICK, function (event) {
        event.preventDefault();

        _this13.toggle();
      });
    }
  }, {
    key: "_completeHide",
    value: function _completeHide(relatedTarget) {
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      } // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support


      if ('ontouchstart' in document.documentElement) {
        var _ref5;

        (_ref5 = []).concat.apply(_ref5, _toConsumableArray(document.body.children)).forEach(function (elem) {
          return EventHandler.off(elem, 'mouseover', noop);
        });
      }

      if (this._popper) {
        this._popper.destroy();
      }

      this._menu.classList.remove(CLASS_NAME_SHOW$7);

      this._element.classList.remove(CLASS_NAME_SHOW$7);

      this._element.setAttribute('aria-expanded', 'false');

      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, this.constructor.Default), Manipulator.getDataAttributes(this._element)), config);
      typeCheckConfig(NAME$8, config, this.constructor.DefaultType);

      if (_typeof(config.reference) === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError("".concat(NAME$8.toUpperCase(), ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method."));
      }

      return config;
    }
  }, {
    key: "_getMenuElement",
    value: function _getMenuElement() {
      return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
    }
  }, {
    key: "_getPlacement",
    value: function _getPlacement() {
      var parentDropdown = this._element.parentNode;

      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      } // We need to trim the value because custom properties can also include spaces


      var isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }

      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
  }, {
    key: "_detectNavbar",
    value: function _detectNavbar() {
      return this._element.closest(".".concat(CLASS_NAME_NAVBAR)) !== null;
    }
  }, {
    key: "_getOffset",
    value: function _getOffset() {
      var _this14 = this;

      var offset = this._config.offset;

      if (typeof offset === 'string') {
        return offset.split(',').map(function (val) {
          return Number.parseInt(val, 10);
        });
      }

      if (typeof offset === 'function') {
        return function (popperData) {
          return offset(popperData, _this14._element);
        };
      }

      return offset;
    }
  }, {
    key: "_getPopperConfig",
    value: function _getPopperConfig() {
      var defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      }; // Disable Popper if we have a static display

      if (this._config.display === 'static') {
        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }

      return _objectSpread(_objectSpread({}, defaultBsPopperConfig), typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
    }
  }, {
    key: "_selectMenuItem",
    value: function _selectMenuItem(_ref6) {
      var key = _ref6.key,
          target = _ref6.target;
      var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

      if (!items.length) {
        return;
      } // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY


      getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$7;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$7;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$8;
    }
  }, {
    key: "dropdownInterface",
    value: function dropdownInterface(element, config) {
      var data = Dropdown.getOrCreateInstance(element, config);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config]();
      }
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        Dropdown.dropdownInterface(this, config);
      });
    }
  }, {
    key: "clearMenus",
    value: function clearMenus(event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
        return;
      }

      var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

      for (var i = 0, len = toggles.length; i < len; i++) {
        var context = Dropdown.getInstance(toggles[i]);

        if (!context || context._config.autoClose === false) {
          continue;
        }

        if (!context._element.classList.contains(CLASS_NAME_SHOW$7)) {
          continue;
        }

        var relatedTarget = {
          relatedTarget: context._element
        };

        if (event) {
          var composedPath = event.composedPath();
          var isMenuTarget = composedPath.includes(context._menu);

          if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
            continue;
          } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


          if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
            continue;
          }

          if (event.type === 'click') {
            relatedTarget.clickEvent = event;
          }
        }

        context._completeHide(relatedTarget);
      }
    }
  }, {
    key: "getParentFromElement",
    value: function getParentFromElement(element) {
      return getElementFromSelector(element) || element.parentNode;
    }
  }, {
    key: "dataApiKeydownHandler",
    value: function dataApiKeydownHandler(event) {
      var _this15 = this;

      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
        return;
      }

      var isActive = this.classList.contains(CLASS_NAME_SHOW$7);

      if (!isActive && event.key === ESCAPE_KEY$2) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (isDisabled(this)) {
        return;
      }

      var getToggleButton = function getToggleButton() {
        return _this15.matches(SELECTOR_DATA_TOGGLE$3) ? _this15 : SelectorEngine.prev(_this15, SELECTOR_DATA_TOGGLE$3)[0];
      };

      if (event.key === ESCAPE_KEY$2) {
        getToggleButton().focus();
        Dropdown.clearMenus();
        return;
      }

      if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
        if (!isActive) {
          getToggleButton().click();
        }

        Dropdown.getInstance(getToggleButton())._selectMenuItem(event);

        return;
      }

      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus();
      }
    }
  }]);

  return Dropdown;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  event.preventDefault();
  Dropdown.dropdownInterface(this);
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Dropdown to jQuery only if jQuery is present
 */

defineJQueryPlugin(Dropdown);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
var SELECTOR_STICKY_CONTENT = '.sticky-top';

var ScrollBarHelper = /*#__PURE__*/function () {
  function ScrollBarHelper() {
    _classCallCheck(this, ScrollBarHelper);

    this._element = document.body;
  }

  _createClass(ScrollBarHelper, [{
    key: "getWidth",
    value: function getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      var documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
  }, {
    key: "hide",
    value: function hide() {
      var width = this.getWidth();

      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


      this._setElementAttributes(this._element, 'paddingRight', function (calculatedValue) {
        return calculatedValue + width;
      }); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', function (calculatedValue) {
        return calculatedValue + width;
      });

      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', function (calculatedValue) {
        return calculatedValue - width;
      });
    }
  }, {
    key: "_disableOverFlow",
    value: function _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');

      this._element.style.overflow = 'hidden';
    }
  }, {
    key: "_setElementAttributes",
    value: function _setElementAttributes(selector, styleProp, callback) {
      var _this16 = this;

      var scrollbarWidth = this.getWidth();

      var manipulationCallBack = function manipulationCallBack(element) {
        if (element !== _this16._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }

        _this16._saveInitialAttribute(element, styleProp);

        var calculatedValue = window.getComputedStyle(element)[styleProp];
        element.style[styleProp] = "".concat(callback(Number.parseFloat(calculatedValue)), "px");
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }
  }, {
    key: "reset",
    value: function reset() {
      this._resetElementAttributes(this._element, 'overflow');

      this._resetElementAttributes(this._element, 'paddingRight');

      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
    }
  }, {
    key: "_saveInitialAttribute",
    value: function _saveInitialAttribute(element, styleProp) {
      var actualValue = element.style[styleProp];

      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProp, actualValue);
      }
    }
  }, {
    key: "_resetElementAttributes",
    value: function _resetElementAttributes(selector, styleProp) {
      var manipulationCallBack = function manipulationCallBack(element) {
        var value = Manipulator.getDataAttribute(element, styleProp);

        if (typeof value === 'undefined') {
          element.style.removeProperty(styleProp);
        } else {
          Manipulator.removeDataAttribute(element, styleProp);
          element.style[styleProp] = value;
        }
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }
  }, {
    key: "_applyManipulationCallback",
    value: function _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
      } else {
        SelectorEngine.find(selector, this._element).forEach(callBack);
      }
    }
  }, {
    key: "isOverflowing",
    value: function isOverflowing() {
      return this.getWidth() > 0;
    }
  }]);

  return ScrollBarHelper;
}();
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */


var Default$6 = {
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  isAnimated: false,
  rootElement: 'body',
  // give the choice to place backdrop under different elements
  clickCallback: null
};
var DefaultType$6 = {
  isVisible: 'boolean',
  isAnimated: 'boolean',
  rootElement: '(element|string)',
  clickCallback: '(function|null)'
};
var NAME$7 = 'backdrop';
var CLASS_NAME_BACKDROP = 'modal-backdrop';
var CLASS_NAME_FADE$5 = 'fade';
var CLASS_NAME_SHOW$6 = 'show';
var EVENT_MOUSEDOWN = "mousedown.bs.".concat(NAME$7);

var Backdrop = /*#__PURE__*/function () {
  function Backdrop(config) {
    _classCallCheck(this, Backdrop);

    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }

  _createClass(Backdrop, [{
    key: "show",
    value: function show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._append();

      if (this._config.isAnimated) {
        reflow(this._getElement());
      }

      this._getElement().classList.add(CLASS_NAME_SHOW$6);

      this._emulateAnimation(function () {
        execute(callback);
      });
    }
  }, {
    key: "hide",
    value: function hide(callback) {
      var _this17 = this;

      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._getElement().classList.remove(CLASS_NAME_SHOW$6);

      this._emulateAnimation(function () {
        _this17.dispose();

        execute(callback);
      });
    } // Private

  }, {
    key: "_getElement",
    value: function _getElement() {
      if (!this._element) {
        var backdrop = document.createElement('div');
        backdrop.className = CLASS_NAME_BACKDROP;

        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$5);
        }

        this._element = backdrop;
      }

      return this._element;
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread({}, Default$6), _typeof(config) === 'object' ? config : {}); // use getElement() with the default "body" to get a fresh Element on each instantiation

      config.rootElement = getElement(config.rootElement);
      typeCheckConfig(NAME$7, config, DefaultType$6);
      return config;
    }
  }, {
    key: "_append",
    value: function _append() {
      var _this18 = this;

      if (this._isAppended) {
        return;
      }

      this._config.rootElement.appendChild(this._getElement());

      EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, function () {
        execute(_this18._config.clickCallback);
      });
      this._isAppended = true;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (!this._isAppended) {
        return;
      }

      EventHandler.off(this._element, EVENT_MOUSEDOWN);

      this._element.remove();

      this._isAppended = false;
    }
  }, {
    key: "_emulateAnimation",
    value: function _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  }]);

  return Backdrop;
}();
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$6 = 'modal';
var DATA_KEY$6 = 'bs.modal';
var EVENT_KEY$6 = ".".concat(DATA_KEY$6);
var DATA_API_KEY$3 = '.data-api';
var ESCAPE_KEY$1 = 'Escape';
var Default$5 = {
  backdrop: true,
  keyboard: true,
  focus: true
};
var DefaultType$5 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  focus: 'boolean'
};
var EVENT_HIDE$3 = "hide".concat(EVENT_KEY$6);
var EVENT_HIDE_PREVENTED = "hidePrevented".concat(EVENT_KEY$6);
var EVENT_HIDDEN$3 = "hidden".concat(EVENT_KEY$6);
var EVENT_SHOW$3 = "show".concat(EVENT_KEY$6);
var EVENT_SHOWN$3 = "shown".concat(EVENT_KEY$6);
var EVENT_FOCUSIN$2 = "focusin".concat(EVENT_KEY$6);
var EVENT_RESIZE = "resize".concat(EVENT_KEY$6);
var EVENT_CLICK_DISMISS$2 = "click.dismiss".concat(EVENT_KEY$6);
var EVENT_KEYDOWN_DISMISS$1 = "keydown.dismiss".concat(EVENT_KEY$6);
var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss".concat(EVENT_KEY$6);
var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss".concat(EVENT_KEY$6);
var EVENT_CLICK_DATA_API$2 = "click".concat(EVENT_KEY$6).concat(DATA_API_KEY$3);
var CLASS_NAME_OPEN = 'modal-open';
var CLASS_NAME_FADE$4 = 'fade';
var CLASS_NAME_SHOW$5 = 'show';
var CLASS_NAME_STATIC = 'modal-static';
var SELECTOR_DIALOG = '.modal-dialog';
var SELECTOR_MODAL_BODY = '.modal-body';
var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
var SELECTOR_DATA_DISMISS$2 = '[data-bs-dismiss="modal"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Modal = /*#__PURE__*/function (_BaseComponent6) {
  _inherits(Modal, _BaseComponent6);

  var _super6 = _createSuper(Modal);

  function Modal(element, config) {
    var _this19;

    _classCallCheck(this, Modal);

    _this19 = _super6.call(this, element);
    _this19._config = _this19._getConfig(config);
    _this19._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, _this19._element);
    _this19._backdrop = _this19._initializeBackDrop();
    _this19._isShown = false;
    _this19._ignoreBackdropClick = false;
    _this19._isTransitioning = false;
    _this19._scrollBar = new ScrollBarHelper();
    return _this19;
  } // Getters


  _createClass(Modal, [{
    key: "toggle",
    value: // Public
    function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
  }, {
    key: "show",
    value: function show(relatedTarget) {
      var _this20 = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget: relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      if (this._isAnimated()) {
        this._isTransitioning = true;
      }

      this._scrollBar.hide();

      document.body.classList.add(CLASS_NAME_OPEN);

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, SELECTOR_DATA_DISMISS$2, function (event) {
        return _this20.hide(event);
      });
      EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
        EventHandler.one(_this20._element, EVENT_MOUSEUP_DISMISS, function (event) {
          if (event.target === _this20._element) {
            _this20._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this20._showElement(relatedTarget);
      });
    }
  }, {
    key: "hide",
    value: function hide(event) {
      var _this21 = this;

      if (event && ['A', 'AREA'].includes(event.target.tagName)) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;

      var isAnimated = this._isAnimated();

      if (isAnimated) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.off(document, EVENT_FOCUSIN$2);

      this._element.classList.remove(CLASS_NAME_SHOW$5);

      EventHandler.off(this._element, EVENT_CLICK_DISMISS$2);
      EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

      this._queueCallback(function () {
        return _this21._hideModal();
      }, this._element, isAnimated);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      [window, this._dialog].forEach(function (htmlElement) {
        return EventHandler.off(htmlElement, EVENT_KEY$6);
      });

      this._backdrop.dispose();

      _get(_getPrototypeOf(Modal.prototype), "dispose", this).call(this);
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */


      EventHandler.off(document, EVENT_FOCUSIN$2);
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate() {
      this._adjustDialog();
    } // Private

  }, {
    key: "_initializeBackDrop",
    value: function _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value
        isAnimated: this._isAnimated()
      });
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, Default$5), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
      typeCheckConfig(NAME$6, config, DefaultType$5);
      return config;
    }
  }, {
    key: "_showElement",
    value: function _showElement(relatedTarget) {
      var _this22 = this;

      var isAnimated = this._isAnimated();

      var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.scrollTop = 0;

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      if (isAnimated) {
        reflow(this._element);
      }

      this._element.classList.add(CLASS_NAME_SHOW$5);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var transitionComplete = function transitionComplete() {
        if (_this22._config.focus) {
          _this22._element.focus();
        }

        _this22._isTransitioning = false;
        EventHandler.trigger(_this22._element, EVENT_SHOWN$3, {
          relatedTarget: relatedTarget
        });
      };

      this._queueCallback(transitionComplete, this._dialog, isAnimated);
    }
  }, {
    key: "_enforceFocus",
    value: function _enforceFocus() {
      var _this23 = this;

      EventHandler.off(document, EVENT_FOCUSIN$2); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN$2, function (event) {
        if (document !== event.target && _this23._element !== event.target && !_this23._element.contains(event.target)) {
          _this23._element.focus();
        }
      });
    }
  }, {
    key: "_setEscapeEvent",
    value: function _setEscapeEvent() {
      var _this24 = this;

      if (this._isShown) {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, function (event) {
          if (_this24._config.keyboard && event.key === ESCAPE_KEY$1) {
            event.preventDefault();

            _this24.hide();
          } else if (!_this24._config.keyboard && event.key === ESCAPE_KEY$1) {
            _this24._triggerBackdropTransition();
          }
        });
      } else {
        EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
      }
    }
  }, {
    key: "_setResizeEvent",
    value: function _setResizeEvent() {
      var _this25 = this;

      if (this._isShown) {
        EventHandler.on(window, EVENT_RESIZE, function () {
          return _this25._adjustDialog();
        });
      } else {
        EventHandler.off(window, EVENT_RESIZE);
      }
    }
  }, {
    key: "_hideModal",
    value: function _hideModal() {
      var _this26 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._backdrop.hide(function () {
        document.body.classList.remove(CLASS_NAME_OPEN);

        _this26._resetAdjustments();

        _this26._scrollBar.reset();

        EventHandler.trigger(_this26._element, EVENT_HIDDEN$3);
      });
    }
  }, {
    key: "_showBackdrop",
    value: function _showBackdrop(callback) {
      var _this27 = this;

      EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, function (event) {
        if (_this27._ignoreBackdropClick) {
          _this27._ignoreBackdropClick = false;
          return;
        }

        if (event.target !== event.currentTarget) {
          return;
        }

        if (_this27._config.backdrop === true) {
          _this27.hide();
        } else if (_this27._config.backdrop === 'static') {
          _this27._triggerBackdropTransition();
        }
      });

      this._backdrop.show(callback);
    }
  }, {
    key: "_isAnimated",
    value: function _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$4);
    }
  }, {
    key: "_triggerBackdropTransition",
    value: function _triggerBackdropTransition() {
      var _this28 = this;

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

      if (hideEvent.defaultPrevented) {
        return;
      }

      var _this$_element = this._element,
          classList = _this$_element.classList,
          scrollHeight = _this$_element.scrollHeight,
          style = _this$_element.style;
      var isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

      if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
        return;
      }

      if (!isModalOverflowing) {
        style.overflowY = 'hidden';
      }

      classList.add(CLASS_NAME_STATIC);

      this._queueCallback(function () {
        classList.remove(CLASS_NAME_STATIC);

        if (!isModalOverflowing) {
          _this28._queueCallback(function () {
            style.overflowY = '';
          }, _this28._dialog);
        }
      }, this._dialog);

      this._element.focus();
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------

  }, {
    key: "_adjustDialog",
    value: function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      var scrollbarWidth = this._scrollBar.getWidth();

      var isBodyOverflowing = scrollbarWidth > 0;

      if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
        this._element.style.paddingLeft = "".concat(scrollbarWidth, "px");
      }

      if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
        this._element.style.paddingRight = "".concat(scrollbarWidth, "px");
      }
    }
  }, {
    key: "_resetAdjustments",
    value: function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$5;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$6;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = Modal.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config](relatedTarget);
      });
    }
  }]);

  return Modal;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
  var _this29 = this;

  var target = getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  EventHandler.one(target, EVENT_SHOW$3, function (showEvent) {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$3, function () {
      if (isVisible(_this29)) {
        _this29.focus();
      }
    });
  });
  var data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Modal to jQuery only if jQuery is present
 */

defineJQueryPlugin(Modal);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$5 = 'offcanvas';
var DATA_KEY$5 = 'bs.offcanvas';
var EVENT_KEY$5 = ".".concat(DATA_KEY$5);
var DATA_API_KEY$2 = '.data-api';
var EVENT_LOAD_DATA_API$1 = "load".concat(EVENT_KEY$5).concat(DATA_API_KEY$2);
var ESCAPE_KEY = 'Escape';
var Default$4 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
var DefaultType$4 = {
  backdrop: 'boolean',
  keyboard: 'boolean',
  scroll: 'boolean'
};
var CLASS_NAME_SHOW$4 = 'show';
var OPEN_SELECTOR = '.offcanvas.show';
var EVENT_SHOW$2 = "show".concat(EVENT_KEY$5);
var EVENT_SHOWN$2 = "shown".concat(EVENT_KEY$5);
var EVENT_HIDE$2 = "hide".concat(EVENT_KEY$5);
var EVENT_HIDDEN$2 = "hidden".concat(EVENT_KEY$5);
var EVENT_FOCUSIN$1 = "focusin".concat(EVENT_KEY$5);
var EVENT_CLICK_DATA_API$1 = "click".concat(EVENT_KEY$5).concat(DATA_API_KEY$2);
var EVENT_CLICK_DISMISS$1 = "click.dismiss".concat(EVENT_KEY$5);
var EVENT_KEYDOWN_DISMISS = "keydown.dismiss".concat(EVENT_KEY$5);
var SELECTOR_DATA_DISMISS$1 = '[data-bs-dismiss="offcanvas"]';
var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Offcanvas = /*#__PURE__*/function (_BaseComponent7) {
  _inherits(Offcanvas, _BaseComponent7);

  var _super7 = _createSuper(Offcanvas);

  function Offcanvas(element, config) {
    var _this30;

    _classCallCheck(this, Offcanvas);

    _this30 = _super7.call(this, element);
    _this30._config = _this30._getConfig(config);
    _this30._isShown = false;
    _this30._backdrop = _this30._initializeBackDrop();

    _this30._addEventListeners();

    return _this30;
  } // Getters


  _createClass(Offcanvas, [{
    key: "toggle",
    value: // Public
    function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
  }, {
    key: "show",
    value: function show(relatedTarget) {
      var _this31 = this;

      if (this._isShown) {
        return;
      }

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;
      this._element.style.visibility = 'visible';

      this._backdrop.show();

      if (!this._config.scroll) {
        new ScrollBarHelper().hide();

        this._enforceFocusOnElement(this._element);
      }

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.classList.add(CLASS_NAME_SHOW$4);

      var completeCallBack = function completeCallBack() {
        EventHandler.trigger(_this31._element, EVENT_SHOWN$2, {
          relatedTarget: relatedTarget
        });
      };

      this._queueCallback(completeCallBack, this._element, true);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this32 = this;

      if (!this._isShown) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

      if (hideEvent.defaultPrevented) {
        return;
      }

      EventHandler.off(document, EVENT_FOCUSIN$1);

      this._element.blur();

      this._isShown = false;

      this._element.classList.remove(CLASS_NAME_SHOW$4);

      this._backdrop.hide();

      var completeCallback = function completeCallback() {
        _this32._element.setAttribute('aria-hidden', true);

        _this32._element.removeAttribute('aria-modal');

        _this32._element.removeAttribute('role');

        _this32._element.style.visibility = 'hidden';

        if (!_this32._config.scroll) {
          new ScrollBarHelper().reset();
        }

        EventHandler.trigger(_this32._element, EVENT_HIDDEN$2);
      };

      this._queueCallback(completeCallback, this._element, true);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._backdrop.dispose();

      _get(_getPrototypeOf(Offcanvas.prototype), "dispose", this).call(this);

      EventHandler.off(document, EVENT_FOCUSIN$1);
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, Default$4), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
      typeCheckConfig(NAME$5, config, DefaultType$4);
      return config;
    }
  }, {
    key: "_initializeBackDrop",
    value: function _initializeBackDrop() {
      var _this33 = this;

      return new Backdrop({
        isVisible: this._config.backdrop,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: function clickCallback() {
          return _this33.hide();
        }
      });
    }
  }, {
    key: "_enforceFocusOnElement",
    value: function _enforceFocusOnElement(element) {
      EventHandler.off(document, EVENT_FOCUSIN$1); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN$1, function (event) {
        if (document !== event.target && element !== event.target && !element.contains(event.target)) {
          element.focus();
        }
      });
      element.focus();
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this34 = this;

      EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this34.hide();
      });
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
        if (_this34._config.keyboard && event.key === ESCAPE_KEY) {
          _this34.hide();
        }
      });
    } // Static

  }], [{
    key: "NAME",
    get: function get() {
      return NAME$5;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$4;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Offcanvas.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config](this);
      });
    }
  }]);

  return Offcanvas;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
  var _this35 = this;

  var target = getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  EventHandler.one(target, EVENT_HIDDEN$2, function () {
    // focus on trigger when it is closed
    if (isVisible(_this35)) {
      _this35.focus();
    }
  }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

  var allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

  if (allReadyOpen && allReadyOpen !== target) {
    Offcanvas.getInstance(allReadyOpen).hide();
  }

  var data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
  return SelectorEngine.find(OPEN_SELECTOR).forEach(function (el) {
    return Offcanvas.getOrCreateInstance(el).show();
  });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

defineJQueryPlugin(Offcanvas);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

var uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */

var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i;
/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */

var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
  var attrName = attr.nodeName.toLowerCase();

  if (allowedAttributeList.includes(attrName)) {
    if (uriAttrs.has(attrName)) {
      return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
    }

    return true;
  }

  var regExp = allowedAttributeList.filter(function (attrRegex) {
    return attrRegex instanceof RegExp;
  }); // Check if a regular expression validates the attribute.

  for (var i = 0, len = regExp.length; i < len; i++) {
    if (regExp[i].test(attrName)) {
      return true;
    }
  }

  return false;
};

var DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};

function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
  var _ref7;

  if (!unsafeHtml.length) {
    return unsafeHtml;
  }

  if (sanitizeFn && typeof sanitizeFn === 'function') {
    return sanitizeFn(unsafeHtml);
  }

  var domParser = new window.DOMParser();
  var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  var allowlistKeys = Object.keys(allowList);

  var elements = (_ref7 = []).concat.apply(_ref7, _toConsumableArray(createdDocument.body.querySelectorAll('*')));

  var _loop = function _loop(i, len) {
    var _ref8;

    var el = elements[i];
    var elName = el.nodeName.toLowerCase();

    if (!allowlistKeys.includes(elName)) {
      el.remove();
      return "continue";
    }

    var attributeList = (_ref8 = []).concat.apply(_ref8, _toConsumableArray(el.attributes));

    var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
    attributeList.forEach(function (attr) {
      if (!allowedAttribute(attr, allowedAttributes)) {
        el.removeAttribute(attr.nodeName);
      }
    });
  };

  for (var i = 0, len = elements.length; i < len; i++) {
    var _ret = _loop(i, len);

    if (_ret === "continue") continue;
  }

  return createdDocument.body.innerHTML;
}
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$4 = 'tooltip';
var DATA_KEY$4 = 'bs.tooltip';
var EVENT_KEY$4 = ".".concat(DATA_KEY$4);
var CLASS_PREFIX$1 = 'bs-tooltip';
var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)".concat(CLASS_PREFIX$1, "\\S+"), 'g');
var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
var DefaultType$3 = {
  animation: 'boolean',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string',
  delay: '(number|object)',
  html: 'boolean',
  selector: '(string|boolean)',
  placement: '(string|function)',
  offset: '(array|string|function)',
  container: '(string|element|boolean)',
  fallbackPlacements: 'array',
  boundary: '(string|element)',
  customClass: '(string|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  allowList: 'object',
  popperConfig: '(null|object|function)'
};
var AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
};
var Default$3 = {
  animation: true,
  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  selector: false,
  placement: 'top',
  offset: [0, 0],
  container: false,
  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
  boundary: 'clippingParents',
  customClass: '',
  sanitize: true,
  sanitizeFn: null,
  allowList: DefaultAllowlist,
  popperConfig: null
};
var Event$2 = {
  HIDE: "hide".concat(EVENT_KEY$4),
  HIDDEN: "hidden".concat(EVENT_KEY$4),
  SHOW: "show".concat(EVENT_KEY$4),
  SHOWN: "shown".concat(EVENT_KEY$4),
  INSERTED: "inserted".concat(EVENT_KEY$4),
  CLICK: "click".concat(EVENT_KEY$4),
  FOCUSIN: "focusin".concat(EVENT_KEY$4),
  FOCUSOUT: "focusout".concat(EVENT_KEY$4),
  MOUSEENTER: "mouseenter".concat(EVENT_KEY$4),
  MOUSELEAVE: "mouseleave".concat(EVENT_KEY$4)
};
var CLASS_NAME_FADE$3 = 'fade';
var CLASS_NAME_MODAL = 'modal';
var CLASS_NAME_SHOW$3 = 'show';
var HOVER_STATE_SHOW = 'show';
var HOVER_STATE_OUT = 'out';
var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
var TRIGGER_HOVER = 'hover';
var TRIGGER_FOCUS = 'focus';
var TRIGGER_CLICK = 'click';
var TRIGGER_MANUAL = 'manual';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Tooltip = /*#__PURE__*/function (_BaseComponent8) {
  _inherits(Tooltip, _BaseComponent8);

  var _super8 = _createSuper(Tooltip);

  function Tooltip(element, config) {
    var _this36;

    _classCallCheck(this, Tooltip);

    if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
    }

    _this36 = _super8.call(this, element); // private

    _this36._isEnabled = true;
    _this36._timeout = 0;
    _this36._hoverState = '';
    _this36._activeTrigger = {};
    _this36._popper = null; // Protected

    _this36._config = _this36._getConfig(config);
    _this36.tip = null;

    _this36._setListeners();

    return _this36;
  } // Getters


  _createClass(Tooltip, [{
    key: "enable",
    value: // Public
    function enable() {
      this._isEnabled = true;
    }
  }, {
    key: "disable",
    value: function disable() {
      this._isEnabled = false;
    }
  }, {
    key: "toggleEnabled",
    value: function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
  }, {
    key: "toggle",
    value: function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var context = this._initializeOnDelegatedTarget(event);

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(".".concat(CLASS_NAME_MODAL)), 'hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        this.tip.remove();
      }

      if (this._popper) {
        this._popper.destroy();
      }

      _get(_getPrototypeOf(Tooltip.prototype), "dispose", this).call(this);
    }
  }, {
    key: "show",
    value: function show() {
      var _this37 = this;

      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (!(this.isWithContent() && this._isEnabled)) {
        return;
      }

      var showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
      var shadowRoot = findShadowRoot(this._element);
      var isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      var tip = this.getTipElement();
      var tipId = getUID(this.constructor.NAME);
      tip.setAttribute('id', tipId);

      this._element.setAttribute('aria-describedby', tipId);

      this.setContent();

      if (this._config.animation) {
        tip.classList.add(CLASS_NAME_FADE$3);
      }

      var placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

      var attachment = this._getAttachment(placement);

      this._addAttachmentClass(attachment);

      var container = this._config.container;
      Data.set(tip, this.constructor.DATA_KEY, this);

      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.appendChild(tip);
        EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
      }

      if (this._popper) {
        this._popper.update();
      } else {
        this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_1__.createPopper(this._element, tip, this._getPopperConfig(attachment));
      }

      tip.classList.add(CLASS_NAME_SHOW$3);
      var customClass = typeof this._config.customClass === 'function' ? this._config.customClass() : this._config.customClass;

      if (customClass) {
        var _tip$classList;

        (_tip$classList = tip.classList).add.apply(_tip$classList, _toConsumableArray(customClass.split(' ')));
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement) {
        var _ref9;

        (_ref9 = []).concat.apply(_ref9, _toConsumableArray(document.body.children)).forEach(function (element) {
          EventHandler.on(element, 'mouseover', noop);
        });
      }

      var complete = function complete() {
        var prevHoverState = _this37._hoverState;
        _this37._hoverState = null;
        EventHandler.trigger(_this37._element, _this37.constructor.Event.SHOWN);

        if (prevHoverState === HOVER_STATE_OUT) {
          _this37._leave(null, _this37);
        }
      };

      var isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$3);

      this._queueCallback(complete, this.tip, isAnimated);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this38 = this;

      if (!this._popper) {
        return;
      }

      var tip = this.getTipElement();

      var complete = function complete() {
        if (_this38._isWithActiveTrigger()) {
          return;
        }

        if (_this38._hoverState !== HOVER_STATE_SHOW) {
          tip.remove();
        }

        _this38._cleanTipClass();

        _this38._element.removeAttribute('aria-describedby');

        EventHandler.trigger(_this38._element, _this38.constructor.Event.HIDDEN);

        if (_this38._popper) {
          _this38._popper.destroy();

          _this38._popper = null;
        }
      };

      var hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      tip.classList.remove(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        var _ref10;

        (_ref10 = []).concat.apply(_ref10, _toConsumableArray(document.body.children)).forEach(function (element) {
          return EventHandler.off(element, 'mouseover', noop);
        });
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      var isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$3);

      this._queueCallback(complete, this.tip, isAnimated);

      this._hoverState = '';
    }
  }, {
    key: "update",
    value: function update() {
      if (this._popper !== null) {
        this._popper.update();
      }
    } // Protected

  }, {
    key: "isWithContent",
    value: function isWithContent() {
      return Boolean(this.getTitle());
    }
  }, {
    key: "getTipElement",
    value: function getTipElement() {
      if (this.tip) {
        return this.tip;
      }

      var element = document.createElement('div');
      element.innerHTML = this._config.template;
      this.tip = element.children[0];
      return this.tip;
    }
  }, {
    key: "setContent",
    value: function setContent() {
      var tip = this.getTipElement();
      this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
      tip.classList.remove(CLASS_NAME_FADE$3, CLASS_NAME_SHOW$3);
    }
  }, {
    key: "setElementContent",
    value: function setElementContent(element, content) {
      if (element === null) {
        return;
      }

      if (isElement(content)) {
        content = getElement(content); // content is a DOM node or a jQuery

        if (this._config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = '';
            element.appendChild(content);
          }
        } else {
          element.textContent = content.textContent;
        }

        return;
      }

      if (this._config.html) {
        if (this._config.sanitize) {
          content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
        }

        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      var title = this._element.getAttribute('data-bs-original-title');

      if (!title) {
        title = typeof this._config.title === 'function' ? this._config.title.call(this._element) : this._config.title;
      }

      return title;
    }
  }, {
    key: "updateAttachment",
    value: function updateAttachment(attachment) {
      if (attachment === 'right') {
        return 'end';
      }

      if (attachment === 'left') {
        return 'start';
      }

      return attachment;
    } // Private

  }, {
    key: "_initializeOnDelegatedTarget",
    value: function _initializeOnDelegatedTarget(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.get(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.set(event.delegateTarget, dataKey, context);
      }

      return context;
    }
  }, {
    key: "_getOffset",
    value: function _getOffset() {
      var _this39 = this;

      var offset = this._config.offset;

      if (typeof offset === 'string') {
        return offset.split(',').map(function (val) {
          return Number.parseInt(val, 10);
        });
      }

      if (typeof offset === 'function') {
        return function (popperData) {
          return offset(popperData, _this39._element);
        };
      }

      return offset;
    }
  }, {
    key: "_getPopperConfig",
    value: function _getPopperConfig(attachment) {
      var _this40 = this;

      var defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: ".".concat(this.constructor.NAME, "-arrow")
          }
        }, {
          name: 'onChange',
          enabled: true,
          phase: 'afterWrite',
          fn: function fn(data) {
            return _this40._handlePopperPlacementChange(data);
          }
        }],
        onFirstUpdate: function onFirstUpdate(data) {
          if (data.options.placement !== data.placement) {
            _this40._handlePopperPlacementChange(data);
          }
        }
      };
      return _objectSpread(_objectSpread({}, defaultBsPopperConfig), typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
    }
  }, {
    key: "_addAttachmentClass",
    value: function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add("".concat(CLASS_PREFIX$1, "-").concat(this.updateAttachment(attachment)));
    }
  }, {
    key: "_getAttachment",
    value: function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    }
  }, {
    key: "_setListeners",
    value: function _setListeners() {
      var _this41 = this;

      var triggers = this._config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          EventHandler.on(_this41._element, _this41.constructor.Event.CLICK, _this41._config.selector, function (event) {
            return _this41.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this41.constructor.Event.MOUSEENTER : _this41.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this41.constructor.Event.MOUSELEAVE : _this41.constructor.Event.FOCUSOUT;
          EventHandler.on(_this41._element, eventIn, _this41._config.selector, function (event) {
            return _this41._enter(event);
          });
          EventHandler.on(_this41._element, eventOut, _this41._config.selector, function (event) {
            return _this41._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this41._element) {
          _this41.hide();
        }
      };

      EventHandler.on(this._element.closest(".".concat(CLASS_NAME_MODAL)), 'hide.bs.modal', this._hideModalHandler);

      if (this._config.selector) {
        this._config = _objectSpread(_objectSpread({}, this._config), {}, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    }
  }, {
    key: "_fixTitle",
    value: function _fixTitle() {
      var title = this._element.getAttribute('title');

      var originalTitleType = _typeof(this._element.getAttribute('data-bs-original-title'));

      if (title || originalTitleType !== 'string') {
        this._element.setAttribute('data-bs-original-title', title || '');

        if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
          this._element.setAttribute('aria-label', title);
        }

        this._element.setAttribute('title', '');
      }
    }
  }, {
    key: "_enter",
    value: function _enter(event, context) {
      context = this._initializeOnDelegatedTarget(event, context);

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context._config.delay || !context._config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context._config.delay.show);
    }
  }, {
    key: "_leave",
    value: function _leave(event, context) {
      context = this._initializeOnDelegatedTarget(event, context);

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context._config.delay || !context._config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context._config.delay.hide);
    }
  }, {
    key: "_isWithActiveTrigger",
    value: function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      var dataAttributes = Manipulator.getDataAttributes(this._element);
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _objectSpread(_objectSpread(_objectSpread({}, this.constructor.Default), dataAttributes), _typeof(config) === 'object' && config ? config : {});
      config.container = config.container === false ? document.body : getElement(config.container);

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
      }

      return config;
    }
  }, {
    key: "_getDelegateConfig",
    value: function _getDelegateConfig() {
      var config = {};

      if (this._config) {
        for (var key in this._config) {
          if (this.constructor.Default[key] !== this._config[key]) {
            config[key] = this._config[key];
          }
        }
      }

      return config;
    }
  }, {
    key: "_cleanTipClass",
    value: function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    }
  }, {
    key: "_handlePopperPlacementChange",
    value: function _handlePopperPlacementChange(popperData) {
      var state = popperData.state;

      if (!state) {
        return;
      }

      this.tip = state.elements.popper;

      this._cleanTipClass();

      this._addAttachmentClass(this._getAttachment(state.placement));
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$3;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$4;
    }
  }, {
    key: "Event",
    get: function get() {
      return Event$2;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$3;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Tooltip.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      });
    }
  }]);

  return Tooltip;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tooltip to jQuery only if jQuery is present
 */


defineJQueryPlugin(Tooltip);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$3 = 'popover';
var DATA_KEY$3 = 'bs.popover';
var EVENT_KEY$3 = ".".concat(DATA_KEY$3);
var CLASS_PREFIX = 'bs-popover';
var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)".concat(CLASS_PREFIX, "\\S+"), 'g');

var Default$2 = _objectSpread(_objectSpread({}, Tooltip.Default), {}, {
  placement: 'right',
  offset: [0, 8],
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
});

var DefaultType$2 = _objectSpread(_objectSpread({}, Tooltip.DefaultType), {}, {
  content: '(string|element|function)'
});

var Event$1 = {
  HIDE: "hide".concat(EVENT_KEY$3),
  HIDDEN: "hidden".concat(EVENT_KEY$3),
  SHOW: "show".concat(EVENT_KEY$3),
  SHOWN: "shown".concat(EVENT_KEY$3),
  INSERTED: "inserted".concat(EVENT_KEY$3),
  CLICK: "click".concat(EVENT_KEY$3),
  FOCUSIN: "focusin".concat(EVENT_KEY$3),
  FOCUSOUT: "focusout".concat(EVENT_KEY$3),
  MOUSEENTER: "mouseenter".concat(EVENT_KEY$3),
  MOUSELEAVE: "mouseleave".concat(EVENT_KEY$3)
};
var CLASS_NAME_FADE$2 = 'fade';
var CLASS_NAME_SHOW$2 = 'show';
var SELECTOR_TITLE = '.popover-header';
var SELECTOR_CONTENT = '.popover-body';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Popover = /*#__PURE__*/function (_Tooltip) {
  _inherits(Popover, _Tooltip);

  var _super9 = _createSuper(Popover);

  function Popover() {
    _classCallCheck(this, Popover);

    return _super9.apply(this, arguments);
  }

  _createClass(Popover, [{
    key: "isWithContent",
    value: // Overrides
    function isWithContent() {
      return this.getTitle() || this._getContent();
    }
  }, {
    key: "getTipElement",
    value: function getTipElement() {
      if (this.tip) {
        return this.tip;
      }

      this.tip = _get(_getPrototypeOf(Popover.prototype), "getTipElement", this).call(this);

      if (!this.getTitle()) {
        SelectorEngine.findOne(SELECTOR_TITLE, this.tip).remove();
      }

      if (!this._getContent()) {
        SelectorEngine.findOne(SELECTOR_CONTENT, this.tip).remove();
      }

      return this.tip;
    }
  }, {
    key: "setContent",
    value: function setContent() {
      var tip = this.getTipElement(); // we use append for html objects to maintain js events

      this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this._element);
      }

      this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
    } // Private

  }, {
    key: "_addAttachmentClass",
    value: function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add("".concat(CLASS_PREFIX, "-").concat(this.updateAttachment(attachment)));
    }
  }, {
    key: "_getContent",
    value: function _getContent() {
      return this._element.getAttribute('data-bs-content') || this._config.content;
    }
  }, {
    key: "_cleanTipClass",
    value: function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    } // Static

  }], [{
    key: "Default",
    get: // Getters
    function get() {
      return Default$2;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$3;
    }
  }, {
    key: "Event",
    get: function get() {
      return Event$1;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$2;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Popover.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      });
    }
  }]);

  return Popover;
}(Tooltip);
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Popover to jQuery only if jQuery is present
 */


defineJQueryPlugin(Popover);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$2 = 'scrollspy';
var DATA_KEY$2 = 'bs.scrollspy';
var EVENT_KEY$2 = ".".concat(DATA_KEY$2);
var DATA_API_KEY$1 = '.data-api';
var Default$1 = {
  offset: 10,
  method: 'auto',
  target: ''
};
var DefaultType$1 = {
  offset: 'number',
  method: 'string',
  target: '(string|element)'
};
var EVENT_ACTIVATE = "activate".concat(EVENT_KEY$2);
var EVENT_SCROLL = "scroll".concat(EVENT_KEY$2);
var EVENT_LOAD_DATA_API = "load".concat(EVENT_KEY$2).concat(DATA_API_KEY$1);
var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
var CLASS_NAME_ACTIVE$1 = 'active';
var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
var SELECTOR_NAV_LINKS = '.nav-link';
var SELECTOR_NAV_ITEMS = '.nav-item';
var SELECTOR_LIST_ITEMS = '.list-group-item';
var SELECTOR_DROPDOWN$1 = '.dropdown';
var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
var METHOD_OFFSET = 'offset';
var METHOD_POSITION = 'position';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var ScrollSpy = /*#__PURE__*/function (_BaseComponent9) {
  _inherits(ScrollSpy, _BaseComponent9);

  var _super10 = _createSuper(ScrollSpy);

  function ScrollSpy(element, config) {
    var _this42;

    _classCallCheck(this, ScrollSpy);

    _this42 = _super10.call(this, element);
    _this42._scrollElement = _this42._element.tagName === 'BODY' ? window : _this42._element;
    _this42._config = _this42._getConfig(config);
    _this42._selector = "".concat(_this42._config.target, " ").concat(SELECTOR_NAV_LINKS, ", ").concat(_this42._config.target, " ").concat(SELECTOR_LIST_ITEMS, ", ").concat(_this42._config.target, " .").concat(CLASS_NAME_DROPDOWN_ITEM);
    _this42._offsets = [];
    _this42._targets = [];
    _this42._activeTarget = null;
    _this42._scrollHeight = 0;
    EventHandler.on(_this42._scrollElement, EVENT_SCROLL, function () {
      return _this42._process();
    });

    _this42.refresh();

    _this42._process();

    return _this42;
  } // Getters


  _createClass(ScrollSpy, [{
    key: "refresh",
    value: // Public
    function refresh() {
      var _this43 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = SelectorEngine.find(this._selector);
      targets.map(function (element) {
        var targetSelector = getSelectorFromElement(element);
        var target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this43._offsets.push(item[0]);

        _this43._targets.push(item[1]);
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      EventHandler.off(this._scrollElement, EVENT_KEY$2);

      _get(_getPrototypeOf(ScrollSpy.prototype), "dispose", this).call(this);
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, Default$1), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && isElement(config.target)) {
        var id = config.target.id;

        if (!id) {
          id = getUID(NAME$2);
          config.target.id = id;
        }

        config.target = "#".concat(id);
      }

      typeCheckConfig(NAME$2, config, DefaultType$1);
      return config;
    }
  }, {
    key: "_getScrollTop",
    value: function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }
  }, {
    key: "_getScrollHeight",
    value: function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
  }, {
    key: "_getOffsetHeight",
    value: function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }
  }, {
    key: "_process",
    value: function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    }
  }, {
    key: "_activate",
    value: function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return "".concat(selector, "[data-bs-target=\"").concat(target, "\"],").concat(selector, "[href=\"").concat(target, "\"]");
      });

      var link = SelectorEngine.findOne(queries.join(','));

      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
        link.classList.add(CLASS_NAME_ACTIVE$1);
      } else {
        // Set triggered link as active
        link.classList.add(CLASS_NAME_ACTIVE$1);
        SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(function (listGroup) {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          SelectorEngine.prev(listGroup, "".concat(SELECTOR_NAV_LINKS, ", ").concat(SELECTOR_LIST_ITEMS)).forEach(function (item) {
            return item.classList.add(CLASS_NAME_ACTIVE$1);
          }); // Handle special case when .nav-link is inside .nav-item

          SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
            SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) {
              return item.classList.add(CLASS_NAME_ACTIVE$1);
            });
          });
        });
      }

      EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
  }, {
    key: "_clear",
    value: function _clear() {
      SelectorEngine.find(this._selector).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$1);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$1);
      });
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$1;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$2;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = ScrollSpy.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config]();
      });
    }
  }]);

  return ScrollSpy;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
  SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) {
    return new ScrollSpy(spy);
  });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .ScrollSpy to jQuery only if jQuery is present
 */

defineJQueryPlugin(ScrollSpy);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$1 = 'tab';
var DATA_KEY$1 = 'bs.tab';
var EVENT_KEY$1 = ".".concat(DATA_KEY$1);
var DATA_API_KEY = '.data-api';
var EVENT_HIDE$1 = "hide".concat(EVENT_KEY$1);
var EVENT_HIDDEN$1 = "hidden".concat(EVENT_KEY$1);
var EVENT_SHOW$1 = "show".concat(EVENT_KEY$1);
var EVENT_SHOWN$1 = "shown".concat(EVENT_KEY$1);
var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY$1).concat(DATA_API_KEY);
var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
var CLASS_NAME_ACTIVE = 'active';
var CLASS_NAME_FADE$1 = 'fade';
var CLASS_NAME_SHOW$1 = 'show';
var SELECTOR_DROPDOWN = '.dropdown';
var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
var SELECTOR_ACTIVE = '.active';
var SELECTOR_ACTIVE_UL = ':scope > li > .active';
var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Tab = /*#__PURE__*/function (_BaseComponent10) {
  _inherits(Tab, _BaseComponent10);

  var _super11 = _createSuper(Tab);

  function Tab() {
    _classCallCheck(this, Tab);

    return _super11.apply(this, arguments);
  }

  _createClass(Tab, [{
    key: "show",
    value: // Public
    function show() {
      var _this44 = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
        return;
      }

      var previous;
      var target = getElementFromSelector(this._element);

      var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = SelectorEngine.find(itemSelector, listElement);
        previous = previous[previous.length - 1];
      }

      var hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
        relatedTarget: this._element
      }) : null;
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
        relatedTarget: previous
      });

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        EventHandler.trigger(previous, EVENT_HIDDEN$1, {
          relatedTarget: _this44._element
        });
        EventHandler.trigger(_this44._element, EVENT_SHOWN$1, {
          relatedTarget: previous
        });
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    } // Private

  }, {
    key: "_activate",
    value: function _activate(element, container, callback) {
      var _this45 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

      var complete = function complete() {
        return _this45._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        active.classList.remove(CLASS_NAME_SHOW$1);

        this._queueCallback(complete, element, true);
      } else {
        complete();
      }
    }
  }, {
    key: "_transitionComplete",
    value: function _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE);
        var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      element.classList.add(CLASS_NAME_ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$1)) {
        element.classList.add(CLASS_NAME_SHOW$1);
      }

      var parent = element.parentNode;

      if (parent && parent.nodeName === 'LI') {
        parent = parent.parentNode;
      }

      if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = element.closest(SELECTOR_DROPDOWN);

        if (dropdownElement) {
          SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(function (dropdown) {
            return dropdown.classList.add(CLASS_NAME_ACTIVE);
          });
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static

  }], [{
    key: "NAME",
    get: // Getters
    function get() {
      return NAME$1;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Tab.getOrCreateInstance(this);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      });
    }
  }]);

  return Tab;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  var data = Tab.getOrCreateInstance(this);
  data.show();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tab to jQuery only if jQuery is present
 */

defineJQueryPlugin(Tab);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'toast';
var DATA_KEY = 'bs.toast';
var EVENT_KEY = ".".concat(DATA_KEY);
var EVENT_CLICK_DISMISS = "click.dismiss".concat(EVENT_KEY);
var EVENT_MOUSEOVER = "mouseover".concat(EVENT_KEY);
var EVENT_MOUSEOUT = "mouseout".concat(EVENT_KEY);
var EVENT_FOCUSIN = "focusin".concat(EVENT_KEY);
var EVENT_FOCUSOUT = "focusout".concat(EVENT_KEY);
var EVENT_HIDE = "hide".concat(EVENT_KEY);
var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
var EVENT_SHOW = "show".concat(EVENT_KEY);
var EVENT_SHOWN = "shown".concat(EVENT_KEY);
var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_HIDE = 'hide';
var CLASS_NAME_SHOW = 'show';
var CLASS_NAME_SHOWING = 'showing';
var DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
var Default = {
  animation: true,
  autohide: true,
  delay: 5000
};
var SELECTOR_DATA_DISMISS = '[data-bs-dismiss="toast"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Toast = /*#__PURE__*/function (_BaseComponent11) {
  _inherits(Toast, _BaseComponent11);

  var _super12 = _createSuper(Toast);

  function Toast(element, config) {
    var _this46;

    _classCallCheck(this, Toast);

    _this46 = _super12.call(this, element);
    _this46._config = _this46._getConfig(config);
    _this46._timeout = null;
    _this46._hasMouseInteraction = false;
    _this46._hasKeyboardInteraction = false;

    _this46._setListeners();

    return _this46;
  } // Getters


  _createClass(Toast, [{
    key: "show",
    value: // Public
    function show() {
      var _this47 = this;

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }

      var complete = function complete() {
        _this47._element.classList.remove(CLASS_NAME_SHOWING);

        _this47._element.classList.add(CLASS_NAME_SHOW);

        EventHandler.trigger(_this47._element, EVENT_SHOWN);

        _this47._maybeScheduleHide();
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this48 = this;

      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      var complete = function complete() {
        _this48._element.classList.add(CLASS_NAME_HIDE);

        EventHandler.trigger(_this48._element, EVENT_HIDDEN);
      };

      this._element.classList.remove(CLASS_NAME_SHOW);

      this._queueCallback(complete, this._element, this._config.animation);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }

      _get(_getPrototypeOf(Toast.prototype), "dispose", this).call(this);
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, Default), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' && config ? config : {});
      typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    }
  }, {
    key: "_maybeScheduleHide",
    value: function _maybeScheduleHide() {
      var _this49 = this;

      if (!this._config.autohide) {
        return;
      }

      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }

      this._timeout = setTimeout(function () {
        _this49.hide();
      }, this._config.delay);
    }
  }, {
    key: "_onInteraction",
    value: function _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          this._hasMouseInteraction = isInteracting;
          break;

        case 'focusin':
        case 'focusout':
          this._hasKeyboardInteraction = isInteracting;
          break;
      }

      if (isInteracting) {
        this._clearTimeout();

        return;
      }

      var nextElement = event.relatedTarget;

      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }

      this._maybeScheduleHide();
    }
  }, {
    key: "_setListeners",
    value: function _setListeners() {
      var _this50 = this;

      EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function () {
        return _this50.hide();
      });
      EventHandler.on(this._element, EVENT_MOUSEOVER, function (event) {
        return _this50._onInteraction(event, true);
      });
      EventHandler.on(this._element, EVENT_MOUSEOUT, function (event) {
        return _this50._onInteraction(event, false);
      });
      EventHandler.on(this._element, EVENT_FOCUSIN, function (event) {
        return _this50._onInteraction(event, true);
      });
      EventHandler.on(this._element, EVENT_FOCUSOUT, function (event) {
        return _this50._onInteraction(event, false);
      });
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static

  }], [{
    key: "DefaultType",
    get: function get() {
      return DefaultType;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Toast.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config](this);
        }
      });
    }
  }]);

  return Toast;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Toast to jQuery only if jQuery is present
 */


defineJQueryPlugin(Toast);


/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap v5.0.2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? module.exports = factory(__webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js")) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);
})(this, function (Popper) {
  'use strict';

  var _KEY_TO_DIRECTION;

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);

    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function get() {
              return e[k];
            }
          });
        }
      });
    }

    n['default'] = e;
    return Object.freeze(n);
  }

  var Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NODE_TEXT = 3;
  var SelectorEngine = {
    find: function find(selector) {
      var _ref;

      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
      return (_ref = []).concat.apply(_ref, _toConsumableArray(Element.prototype.querySelectorAll.call(element, selector)));
    },
    findOne: function findOne(selector) {
      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
      return Element.prototype.querySelector.call(element, selector);
    },
    children: function children(element, selector) {
      var _ref2;

      return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(element.children)).filter(function (child) {
        return child.matches(selector);
      });
    },
    parents: function parents(element, selector) {
      var parents = [];
      var ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },
    prev: function prev(element, selector) {
      var previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },
    next: function next(element, selector) {
      var next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    }
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000;
  var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  var toType = function toType(obj) {
    if (obj === null || obj === undefined) {
      return "".concat(obj);
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var getUID = function getUID(prefix) {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  var getSelector = function getSelector(element) {
    var selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = "#".concat(hrefAttr.split('#')[1]);
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  var getSelectorFromElement = function getSelectorFromElement(element) {
    var selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  var getElementFromSelector = function getElementFromSelector(element) {
    var selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    var _window$getComputedSt = window.getComputedStyle(element),
        transitionDuration = _window$getComputedSt.transitionDuration,
        transitionDelay = _window$getComputedSt.transitionDelay;

    var floatTransitionDuration = Number.parseFloat(transitionDuration);
    var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  var triggerTransitionEnd = function triggerTransitionEnd(element) {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  var isElement = function isElement(obj) {
    if (!obj || _typeof(obj) !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  var getElement = function getElement(obj) {
    if (isElement(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return SelectorEngine.findOne(obj);
    }

    return null;
  };

  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError("".concat(componentName.toUpperCase(), ": Option \"").concat(property, "\" provided type \"").concat(valueType, "\" but expected type \"").concat(expectedTypes, "\"."));
      }
    });
  };

  var isVisible = function isVisible(element) {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  };

  var isDisabled = function isDisabled(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };

  var findShadowRoot = function findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      var root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  var noop = function noop() {};

  var reflow = function reflow(element) {
    return element.offsetHeight;
  };

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  var DOMContentLoadedCallbacks = [];

  var onDOMContentLoaded = function onDOMContentLoaded(callback) {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', function () {
          DOMContentLoadedCallbacks.forEach(function (callback) {
            return callback();
          });
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  var isRTL = function isRTL() {
    return document.documentElement.dir === 'rtl';
  };

  var defineJQueryPlugin = function defineJQueryPlugin(plugin) {
    onDOMContentLoaded(function () {
      var $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        var name = plugin.NAME;
        var JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = function () {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  var execute = function execute(callback) {
    if (typeof callback === 'function') {
      callback();
    }
  };

  var executeAfterTransition = function executeAfterTransition(callback, transitionElement) {
    var waitForTransition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (!waitForTransition) {
      execute(callback);
      return;
    }

    var durationPadding = 5;
    var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    var called = false;

    var handler = function handler(_ref3) {
      var target = _ref3.target;

      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */


  var getNextActiveElement = function getNextActiveElement(list, activeElement, shouldGetNext, isCycleAllowed) {
    var index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

    if (index === -1) {
      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
    }

    var listLength = list.length;
    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))];
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {}; // Events storage

  var uidEvent = 1;
  var customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  var customEventsRegex = /^(mouseenter|mouseleave)/i;
  var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && "".concat(uid, "::").concat(uidEvent++) || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    var uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      var domElements = element.querySelectorAll(selector);

      for (var target = event.target; target && target !== this; target = target.parentNode) {
        for (var i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              // eslint-disable-next-line unicorn/consistent-destructuring
              EventHandler.off(element, event.type, selector, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler) {
    var delegationSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var uidEventList = Object.keys(events);

    for (var i = 0, len = uidEventList.length; i < len; i++) {
      var event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    var delegation = typeof handler === 'string';
    var originalHandler = delegation ? delegationFn : handler;
    var typeEvent = getTypeEvent(originalTypeEvent);
    var isNative = nativeEvents.has(typeEvent);

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


    if (customEventsRegex.test(originalTypeEvent)) {
      var wrapFn = function wrapFn(fn) {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      if (delegationFn) {
        delegationFn = wrapFn(delegationFn);
      } else {
        handler = wrapFn(handler);
      }
    }

    var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
        _normalizeParams2 = _slicedToArray(_normalizeParams, 3),
        delegation = _normalizeParams2[0],
        originalHandler = _normalizeParams2[1],
        typeEvent = _normalizeParams2[2];

    var events = getEvent(element);
    var handlers = events[typeEvent] || (events[typeEvent] = {});
    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    var fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.includes(namespace)) {
        var event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  var EventHandler = {
    on: function on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },
    one: function one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },
    off: function off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      var _normalizeParams3 = normalizeParams(originalTypeEvent, handler, delegationFn),
          _normalizeParams4 = _slicedToArray(_normalizeParams3, 3),
          delegation = _normalizeParams4[0],
          originalHandler = _normalizeParams4[1],
          typeEvent = _normalizeParams4[2];

      var inNamespace = typeEvent !== originalTypeEvent;
      var events = getEvent(element);
      var isNamespace = originalTypeEvent.startsWith('.');

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      var storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        var handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          var event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },
    trigger: function trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      var $ = getjQuery();
      var typeEvent = getTypeEvent(event);
      var inNamespace = event !== typeEvent;
      var isNative = nativeEvents.has(typeEvent);
      var jQueryEvent;
      var bubbles = true;
      var nativeDispatch = true;
      var defaultPrevented = false;
      var evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        });
      } // merge custom information in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get() {
              return args[key];
            }
          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var elementMap = new Map();
  var Data = {
    set: function set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      var instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error("Bootstrap doesn't allow more than one instance per element. Bound instance: ".concat(Array.from(instanceMap.keys())[0], "."));
        return;
      }

      instanceMap.set(key, instance);
    },
    get: function get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },
    remove: function remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      var instanceMap = elementMap.get(element);
      instanceMap["delete"](key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap["delete"](element);
      }
    }
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var VERSION = '5.0.2';

  var BaseComponent = /*#__PURE__*/function () {
    function BaseComponent(element) {
      _classCallCheck(this, BaseComponent);

      element = getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    _createClass(BaseComponent, [{
      key: "dispose",
      value: function dispose() {
        var _this = this;

        Data.remove(this._element, this.constructor.DATA_KEY);
        EventHandler.off(this._element, this.constructor.EVENT_KEY);
        Object.getOwnPropertyNames(this).forEach(function (propertyName) {
          _this[propertyName] = null;
        });
      }
    }, {
      key: "_queueCallback",
      value: function _queueCallback(callback, element) {
        var isAnimated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        executeAfterTransition(callback, element, isAnimated);
      }
      /** Static */

    }], [{
      key: "getInstance",
      value: function getInstance(element) {
        return Data.get(element, this.DATA_KEY);
      }
    }, {
      key: "getOrCreateInstance",
      value: function getOrCreateInstance(element) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return this.getInstance(element) || new this(element, _typeof(config) === 'object' ? config : null);
      }
    }, {
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "NAME",
      get: function get() {
        throw new Error('You have to implement the static method "NAME", for each component!');
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.".concat(this.NAME);
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".".concat(this.DATA_KEY);
      }
    }]);

    return BaseComponent;
  }();
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$c = 'alert';
  var DATA_KEY$b = 'bs.alert';
  var EVENT_KEY$b = ".".concat(DATA_KEY$b);
  var DATA_API_KEY$8 = '.data-api';
  var SELECTOR_DISMISS = '[data-bs-dismiss="alert"]';
  var EVENT_CLOSE = "close".concat(EVENT_KEY$b);
  var EVENT_CLOSED = "closed".concat(EVENT_KEY$b);
  var EVENT_CLICK_DATA_API$7 = "click".concat(EVENT_KEY$b).concat(DATA_API_KEY$8);
  var CLASS_NAME_ALERT = 'alert';
  var CLASS_NAME_FADE$6 = 'fade';
  var CLASS_NAME_SHOW$9 = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = /*#__PURE__*/function (_BaseComponent) {
    _inherits(Alert, _BaseComponent);

    var _super = _createSuper(Alert);

    function Alert() {
      _classCallCheck(this, Alert);

      return _super.apply(this, arguments);
    }

    _createClass(Alert, [{
      key: "close",
      value: // Public
      function close(element) {
        var rootElement = element ? this._getRootElement(element) : this._element;

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent === null || customEvent.defaultPrevented) {
          return;
        }

        this._removeElement(rootElement);
      } // Private

    }, {
      key: "_getRootElement",
      value: function _getRootElement(element) {
        return getElementFromSelector(element) || element.closest(".".concat(CLASS_NAME_ALERT));
      }
    }, {
      key: "_triggerCloseEvent",
      value: function _triggerCloseEvent(element) {
        return EventHandler.trigger(element, EVENT_CLOSE);
      }
    }, {
      key: "_removeElement",
      value: function _removeElement(element) {
        var _this2 = this;

        element.classList.remove(CLASS_NAME_SHOW$9);
        var isAnimated = element.classList.contains(CLASS_NAME_FADE$6);

        this._queueCallback(function () {
          return _this2._destroyElement(element);
        }, element, isAnimated);
      }
    }, {
      key: "_destroyElement",
      value: function _destroyElement(element) {
        element.remove();
        EventHandler.trigger(element, EVENT_CLOSED);
      } // Static

    }], [{
      key: "NAME",
      get: // Getters
      function get() {
        return NAME$c;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Alert.getOrCreateInstance(this);

          if (config === 'close') {
            data[config](this);
          }
        });
      }
    }, {
      key: "handleDismiss",
      value: function handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      }
    }]);

    return Alert;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$7, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Alert to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Alert);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$b = 'button';
  var DATA_KEY$a = 'bs.button';
  var EVENT_KEY$a = ".".concat(DATA_KEY$a);
  var DATA_API_KEY$7 = '.data-api';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  var EVENT_CLICK_DATA_API$6 = "click".concat(EVENT_KEY$a).concat(DATA_API_KEY$7);
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function (_BaseComponent2) {
    _inherits(Button, _BaseComponent2);

    var _super2 = _createSuper(Button);

    function Button() {
      _classCallCheck(this, Button);

      return _super2.apply(this, arguments);
    }

    _createClass(Button, [{
      key: "toggle",
      value: // Public
      function toggle() {
        // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
        this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
      } // Static

    }], [{
      key: "NAME",
      get: // Getters
      function get() {
        return NAME$b;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Button.getOrCreateInstance(this);

          if (config === 'toggle') {
            data[config]();
          }
        });
      }
    }]);

    return Button;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, function (event) {
    event.preventDefault();
    var button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    var data = Button.getOrCreateInstance(button);
    data.toggle();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Button to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Button);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, function (chr) {
      return "-".concat(chr.toLowerCase());
    });
  }

  var Manipulator = {
    setDataAttribute: function setDataAttribute(element, key, value) {
      element.setAttribute("data-bs-".concat(normalizeDataKey(key)), value);
    },
    removeDataAttribute: function removeDataAttribute(element, key) {
      element.removeAttribute("data-bs-".concat(normalizeDataKey(key)));
    },
    getDataAttributes: function getDataAttributes(element) {
      if (!element) {
        return {};
      }

      var attributes = {};
      Object.keys(element.dataset).filter(function (key) {
        return key.startsWith('bs');
      }).forEach(function (key) {
        var pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      });
      return attributes;
    },
    getDataAttribute: function getDataAttribute(element, key) {
      return normalizeData(element.getAttribute("data-bs-".concat(normalizeDataKey(key))));
    },
    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    },
    position: function position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    }
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'carousel';
  var DATA_KEY$9 = 'bs.carousel';
  var EVENT_KEY$9 = ".".concat(DATA_KEY$9);
  var DATA_API_KEY$6 = '.data-api';
  var ARROW_LEFT_KEY = 'ArrowLeft';
  var ARROW_RIGHT_KEY = 'ArrowRight';
  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default$9 = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType$9 = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var ORDER_NEXT = 'next';
  var ORDER_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var KEY_TO_DIRECTION = (_KEY_TO_DIRECTION = {}, _defineProperty(_KEY_TO_DIRECTION, ARROW_LEFT_KEY, DIRECTION_RIGHT), _defineProperty(_KEY_TO_DIRECTION, ARROW_RIGHT_KEY, DIRECTION_LEFT), _KEY_TO_DIRECTION);
  var EVENT_SLIDE = "slide".concat(EVENT_KEY$9);
  var EVENT_SLID = "slid".concat(EVENT_KEY$9);
  var EVENT_KEYDOWN = "keydown".concat(EVENT_KEY$9);
  var EVENT_MOUSEENTER = "mouseenter".concat(EVENT_KEY$9);
  var EVENT_MOUSELEAVE = "mouseleave".concat(EVENT_KEY$9);
  var EVENT_TOUCHSTART = "touchstart".concat(EVENT_KEY$9);
  var EVENT_TOUCHMOVE = "touchmove".concat(EVENT_KEY$9);
  var EVENT_TOUCHEND = "touchend".concat(EVENT_KEY$9);
  var EVENT_POINTERDOWN = "pointerdown".concat(EVENT_KEY$9);
  var EVENT_POINTERUP = "pointerup".concat(EVENT_KEY$9);
  var EVENT_DRAG_START = "dragstart".concat(EVENT_KEY$9);
  var EVENT_LOAD_DATA_API$2 = "load".concat(EVENT_KEY$9).concat(DATA_API_KEY$6);
  var EVENT_CLICK_DATA_API$5 = "click".concat(EVENT_KEY$9).concat(DATA_API_KEY$6);
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_END = 'carousel-item-end';
  var CLASS_NAME_START = 'carousel-item-start';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_INDICATOR = '[data-bs-target]';
  var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  var POINTER_TYPE_TOUCH = 'touch';
  var POINTER_TYPE_PEN = 'pen';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = /*#__PURE__*/function (_BaseComponent3) {
    _inherits(Carousel, _BaseComponent3);

    var _super3 = _createSuper(Carousel);

    function Carousel(element, config) {
      var _this3;

      _classCallCheck(this, Carousel);

      _this3 = _super3.call(this, element);
      _this3._items = null;
      _this3._interval = null;
      _this3._activeElement = null;
      _this3._isPaused = false;
      _this3._isSliding = false;
      _this3.touchTimeout = null;
      _this3.touchStartX = 0;
      _this3.touchDeltaX = 0;
      _this3._config = _this3._getConfig(config);
      _this3._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this3._element);
      _this3._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      _this3._pointerEvent = Boolean(window.PointerEvent);

      _this3._addEventListeners();

      return _this3;
    } // Getters


    _createClass(Carousel, [{
      key: "next",
      value: // Public
      function next() {
        this._slide(ORDER_NEXT);
      }
    }, {
      key: "nextWhenVisible",
      value: function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && isVisible(this._element)) {
          this.next();
        }
      }
    }, {
      key: "prev",
      value: function prev() {
        this._slide(ORDER_PREV);
      }
    }, {
      key: "pause",
      value: function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
          triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      }
    }, {
      key: "cycle",
      value: function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config && this._config.interval && !this._isPaused) {
          this._updateInterval();

          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      }
    }, {
      key: "to",
      value: function to(index) {
        var _this4 = this;

        this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          EventHandler.one(this._element, EVENT_SLID, function () {
            return _this4.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

        this._slide(order, this._items[index]);
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default$9), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
        typeCheckConfig(NAME$a, config, DefaultType$9);
        return config;
      }
    }, {
      key: "_handleSwipe",
      value: function _handleSwipe() {
        var absDeltax = Math.abs(this.touchDeltaX);

        if (absDeltax <= SWIPE_THRESHOLD) {
          return;
        }

        var direction = absDeltax / this.touchDeltaX;
        this.touchDeltaX = 0;

        if (!direction) {
          return;
        }

        this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
      }
    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this5 = this;

        if (this._config.keyboard) {
          EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
            return _this5._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) {
            return _this5.pause(event);
          });
          EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) {
            return _this5.cycle(event);
          });
        }

        if (this._config.touch && this._touchSupported) {
          this._addTouchEventListeners();
        }
      }
    }, {
      key: "_addTouchEventListeners",
      value: function _addTouchEventListeners() {
        var _this6 = this;

        var start = function start(event) {
          if (_this6._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
            _this6.touchStartX = event.clientX;
          } else if (!_this6._pointerEvent) {
            _this6.touchStartX = event.touches[0].clientX;
          }
        };

        var move = function move(event) {
          // ensure swiping with one touch and not pinching
          _this6.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - _this6.touchStartX;
        };

        var end = function end(event) {
          if (_this6._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
            _this6.touchDeltaX = event.clientX - _this6.touchStartX;
          }

          _this6._handleSwipe();

          if (_this6._config.pause === 'hover') {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            _this6.pause();

            if (_this6.touchTimeout) {
              clearTimeout(_this6.touchTimeout);
            }

            _this6.touchTimeout = setTimeout(function (event) {
              return _this6.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this6._config.interval);
          }
        };

        SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
          EventHandler.on(itemImg, EVENT_DRAG_START, function (e) {
            return e.preventDefault();
          });
        });

        if (this._pointerEvent) {
          EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
            return start(event);
          });
          EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
            return end(event);
          });

          this._element.classList.add(CLASS_NAME_POINTER_EVENT);
        } else {
          EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
            return start(event);
          });
          EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
            return move(event);
          });
          EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
            return end(event);
          });
        }
      }
    }, {
      key: "_keydown",
      value: function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        var direction = KEY_TO_DIRECTION[event.key];

        if (direction) {
          event.preventDefault();

          this._slide(direction);
        }
      }
    }, {
      key: "_getItemIndex",
      value: function _getItemIndex(element) {
        this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
        return this._items.indexOf(element);
      }
    }, {
      key: "_getItemByOrder",
      value: function _getItemByOrder(order, activeElement) {
        var isNext = order === ORDER_NEXT;
        return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
      }
    }, {
      key: "_triggerSlideEvent",
      value: function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

        return EventHandler.trigger(this._element, EVENT_SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
      }
    }, {
      key: "_setActiveIndicatorElement",
      value: function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
          activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
          activeIndicator.removeAttribute('aria-current');
          var indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

          for (var i = 0; i < indicators.length; i++) {
            if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
              indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
              indicators[i].setAttribute('aria-current', 'true');
              break;
            }
          }
        }
      }
    }, {
      key: "_updateInterval",
      value: function _updateInterval() {
        var element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

        if (!element) {
          return;
        }

        var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

        if (elementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = elementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }
      }
    }, {
      key: "_slide",
      value: function _slide(directionOrOrder, element) {
        var _this7 = this;

        var order = this._directionToOrder(directionOrOrder);

        var activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || this._getItemByOrder(order, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var isNext = order === ORDER_NEXT;
        var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
        var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

        var eventDirectionName = this._orderToDirection(order);

        if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
          this._isSliding = false;
          return;
        }

        if (this._isSliding) {
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.defaultPrevented) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        this._activeElement = nextElement;

        var triggerSlidEvent = function triggerSlidEvent() {
          EventHandler.trigger(_this7._element, EVENT_SLID, {
            relatedTarget: nextElement,
            direction: eventDirectionName,
            from: activeElementIndex,
            to: nextElementIndex
          });
        };

        if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
          nextElement.classList.add(orderClassName);
          reflow(nextElement);
          activeElement.classList.add(directionalClassName);
          nextElement.classList.add(directionalClassName);

          var completeCallBack = function completeCallBack() {
            nextElement.classList.remove(directionalClassName, orderClassName);
            nextElement.classList.add(CLASS_NAME_ACTIVE$2);
            activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
            _this7._isSliding = false;
            setTimeout(triggerSlidEvent, 0);
          };

          this._queueCallback(completeCallBack, activeElement, true);
        } else {
          activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
          nextElement.classList.add(CLASS_NAME_ACTIVE$2);
          this._isSliding = false;
          triggerSlidEvent();
        }

        if (isCycling) {
          this.cycle();
        }
      }
    }, {
      key: "_directionToOrder",
      value: function _directionToOrder(direction) {
        if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
          return direction;
        }

        if (isRTL()) {
          return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
        }

        return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
      }
    }, {
      key: "_orderToDirection",
      value: function _orderToDirection(order) {
        if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
          return order;
        }

        if (isRTL()) {
          return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }

        return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$9;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$a;
      }
    }, {
      key: "carouselInterface",
      value: function carouselInterface(element, config) {
        var data = Carousel.getOrCreateInstance(element, config);
        var _config = data._config;

        if (_typeof(config) === 'object') {
          _config = _objectSpread(_objectSpread({}, _config), config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"".concat(action, "\""));
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          Carousel.carouselInterface(this, config);
        });
      }
    }, {
      key: "dataApiClickHandler",
      value: function dataApiClickHandler(event) {
        var target = getElementFromSelector(this);

        if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
          return;
        }

        var config = _objectSpread(_objectSpread({}, Manipulator.getDataAttributes(target)), Manipulator.getDataAttributes(this));

        var slideIndex = this.getAttribute('data-bs-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel.carouselInterface(target, config);

        if (slideIndex) {
          Carousel.getInstance(target).to(slideIndex);
        }

        event.preventDefault();
      }
    }]);

    return Carousel;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, function () {
    var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

    for (var i = 0, len = carousels.length; i < len; i++) {
      Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Carousel to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Carousel);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'collapse';
  var DATA_KEY$8 = 'bs.collapse';
  var EVENT_KEY$8 = ".".concat(DATA_KEY$8);
  var DATA_API_KEY$5 = '.data-api';
  var Default$8 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$8 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW$5 = "show".concat(EVENT_KEY$8);
  var EVENT_SHOWN$5 = "shown".concat(EVENT_KEY$8);
  var EVENT_HIDE$5 = "hide".concat(EVENT_KEY$8);
  var EVENT_HIDDEN$5 = "hidden".concat(EVENT_KEY$8);
  var EVENT_CLICK_DATA_API$4 = "click".concat(EVENT_KEY$8).concat(DATA_API_KEY$5);
  var CLASS_NAME_SHOW$8 = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var WIDTH = 'width';
  var HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/function (_BaseComponent4) {
    _inherits(Collapse, _BaseComponent4);

    var _super4 = _createSuper(Collapse);

    function Collapse(element, config) {
      var _this8;

      _classCallCheck(this, Collapse);

      _this8 = _super4.call(this, element);
      _this8._isTransitioning = false;
      _this8._config = _this8._getConfig(config);
      _this8._triggerArray = SelectorEngine.find("".concat(SELECTOR_DATA_TOGGLE$4, "[href=\"#").concat(_this8._element.id, "\"],") + "".concat(SELECTOR_DATA_TOGGLE$4, "[data-bs-target=\"#").concat(_this8._element.id, "\"]"));
      var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = getSelectorFromElement(elem);
        var filterElement = SelectorEngine.find(selector).filter(function (foundElem) {
          return foundElem === _this8._element;
        });

        if (selector !== null && filterElement.length) {
          _this8._selector = selector;

          _this8._triggerArray.push(elem);
        }
      }

      _this8._parent = _this8._config.parent ? _this8._getParent() : null;

      if (!_this8._config.parent) {
        _this8._addAriaAndCollapsedClass(_this8._element, _this8._triggerArray);
      }

      if (_this8._config.toggle) {
        _this8.toggle();
      }

      return _this8;
    } // Getters


    _createClass(Collapse, [{
      key: "toggle",
      value: // Public
      function toggle() {
        if (this._element.classList.contains(CLASS_NAME_SHOW$8)) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: "show",
      value: function show() {
        var _this9 = this;

        if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW$8)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (elem) {
            if (typeof _this9._config.parent === 'string') {
              return elem.getAttribute('data-bs-parent') === _this9._config.parent;
            }

            return elem.classList.contains(CLASS_NAME_COLLAPSE);
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        var container = SelectorEngine.findOne(this._selector);

        if (actives) {
          var tempActiveData = actives.find(function (elem) {
            return container !== elem;
          });
          activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

        if (startEvent.defaultPrevented) {
          return;
        }

        if (actives) {
          actives.forEach(function (elemActive) {
            if (container !== elemActive) {
              Collapse.collapseInterface(elemActive, 'hide');
            }

            if (!activesData) {
              Data.set(elemActive, DATA_KEY$8, null);
            }
          });
        }

        var dimension = this._getDimension();

        this._element.classList.remove(CLASS_NAME_COLLAPSE);

        this._element.classList.add(CLASS_NAME_COLLAPSING);

        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          this._triggerArray.forEach(function (element) {
            element.classList.remove(CLASS_NAME_COLLAPSED);
            element.setAttribute('aria-expanded', true);
          });
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this9._element.classList.remove(CLASS_NAME_COLLAPSING);

          _this9._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

          _this9._element.style[dimension] = '';

          _this9.setTransitioning(false);

          EventHandler.trigger(_this9._element, EVENT_SHOWN$5);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll".concat(capitalizedDimension);

        this._queueCallback(complete, this._element, true);

        this._element.style[dimension] = "".concat(this._element[scrollSize], "px");
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this10 = this;

        if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW$8)) {
          return;
        }

        var startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

        if (startEvent.defaultPrevented) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = "".concat(this._element.getBoundingClientRect()[dimension], "px");
        reflow(this._element);

        this._element.classList.add(CLASS_NAME_COLLAPSING);

        this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var elem = getElementFromSelector(trigger);

            if (elem && !elem.classList.contains(CLASS_NAME_SHOW$8)) {
              trigger.classList.add(CLASS_NAME_COLLAPSED);
              trigger.setAttribute('aria-expanded', false);
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this10.setTransitioning(false);

          _this10._element.classList.remove(CLASS_NAME_COLLAPSING);

          _this10._element.classList.add(CLASS_NAME_COLLAPSE);

          EventHandler.trigger(_this10._element, EVENT_HIDDEN$5);
        };

        this._element.style[dimension] = '';

        this._queueCallback(complete, this._element, true);
      }
    }, {
      key: "setTransitioning",
      value: function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread({}, Default$8), config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        typeCheckConfig(NAME$9, config, DefaultType$8);
        return config;
      }
    }, {
      key: "_getDimension",
      value: function _getDimension() {
        return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
      }
    }, {
      key: "_getParent",
      value: function _getParent() {
        var _this11 = this;

        var parent = this._config.parent;
        parent = getElement(parent);
        var selector = "".concat(SELECTOR_DATA_TOGGLE$4, "[data-bs-parent=\"").concat(parent, "\"]");
        SelectorEngine.find(selector, parent).forEach(function (element) {
          var selected = getElementFromSelector(element);

          _this11._addAriaAndCollapsedClass(selected, [element]);
        });
        return parent;
      }
    }, {
      key: "_addAriaAndCollapsedClass",
      value: function _addAriaAndCollapsedClass(element, triggerArray) {
        if (!element || !triggerArray.length) {
          return;
        }

        var isOpen = element.classList.contains(CLASS_NAME_SHOW$8);
        triggerArray.forEach(function (elem) {
          if (isOpen) {
            elem.classList.remove(CLASS_NAME_COLLAPSED);
          } else {
            elem.classList.add(CLASS_NAME_COLLAPSED);
          }

          elem.setAttribute('aria-expanded', isOpen);
        });
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$8;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$9;
      }
    }, {
      key: "collapseInterface",
      value: function collapseInterface(element, config) {
        var data = Collapse.getInstance(element);

        var _config = _objectSpread(_objectSpread(_objectSpread({}, Default$8), Manipulator.getDataAttributes(element)), _typeof(config) === 'object' && config ? config : {});

        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(element, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          Collapse.collapseInterface(this, config);
        });
      }
    }]);

    return Collapse;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }

    var triggerData = Manipulator.getDataAttributes(this);
    var selector = getSelectorFromElement(this);
    var selectorElements = SelectorEngine.find(selector);
    selectorElements.forEach(function (element) {
      var data = Collapse.getInstance(element);
      var config;

      if (data) {
        // update parent attribute
        if (data._parent === null && typeof triggerData.parent === 'string') {
          data._config.parent = triggerData.parent;
          data._parent = data._getParent();
        }

        config = 'toggle';
      } else {
        config = triggerData;
      }

      Collapse.collapseInterface(element, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Collapse to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Collapse);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'dropdown';
  var DATA_KEY$7 = 'bs.dropdown';
  var EVENT_KEY$7 = ".".concat(DATA_KEY$7);
  var DATA_API_KEY$4 = '.data-api';
  var ESCAPE_KEY$2 = 'Escape';
  var SPACE_KEY = 'Space';
  var TAB_KEY = 'Tab';
  var ARROW_UP_KEY = 'ArrowUp';
  var ARROW_DOWN_KEY = 'ArrowDown';
  var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  var REGEXP_KEYDOWN = new RegExp("".concat(ARROW_UP_KEY, "|").concat(ARROW_DOWN_KEY, "|").concat(ESCAPE_KEY$2));
  var EVENT_HIDE$4 = "hide".concat(EVENT_KEY$7);
  var EVENT_HIDDEN$4 = "hidden".concat(EVENT_KEY$7);
  var EVENT_SHOW$4 = "show".concat(EVENT_KEY$7);
  var EVENT_SHOWN$4 = "shown".concat(EVENT_KEY$7);
  var EVENT_CLICK = "click".concat(EVENT_KEY$7);
  var EVENT_CLICK_DATA_API$3 = "click".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
  var EVENT_KEYDOWN_DATA_API = "keydown".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
  var EVENT_KEYUP_DATA_API = "keyup".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
  var CLASS_NAME_SHOW$7 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPEND = 'dropend';
  var CLASS_NAME_DROPSTART = 'dropstart';
  var CLASS_NAME_NAVBAR = 'navbar';
  var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  var PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  var PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  var PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  var PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  var PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  var Default$7 = {
    offset: [0, 2],
    boundary: 'clippingParents',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null,
    autoClose: true
  };
  var DefaultType$7 = {
    offset: '(array|string|function)',
    boundary: '(string|element)',
    reference: '(string|element|object)',
    display: 'string',
    popperConfig: '(null|object|function)',
    autoClose: '(boolean|string)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = /*#__PURE__*/function (_BaseComponent5) {
    _inherits(Dropdown, _BaseComponent5);

    var _super5 = _createSuper(Dropdown);

    function Dropdown(element, config) {
      var _this12;

      _classCallCheck(this, Dropdown);

      _this12 = _super5.call(this, element);
      _this12._popper = null;
      _this12._config = _this12._getConfig(config);
      _this12._menu = _this12._getMenuElement();
      _this12._inNavbar = _this12._detectNavbar();

      _this12._addEventListeners();

      return _this12;
    } // Getters


    _createClass(Dropdown, [{
      key: "toggle",
      value: // Public
      function toggle() {
        if (isDisabled(this._element)) {
          return;
        }

        var isActive = this._element.classList.contains(CLASS_NAME_SHOW$7);

        if (isActive) {
          this.hide();
          return;
        }

        this.show();
      }
    }, {
      key: "show",
      value: function show() {
        if (isDisabled(this._element) || this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
          return;
        }

        var parent = Dropdown.getParentFromElement(this._element);
        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

        if (showEvent.defaultPrevented) {
          return;
        } // Totally disable Popper for Dropdowns in Navbar


        if (this._inNavbar) {
          Manipulator.setDataAttribute(this._menu, 'popper', 'none');
        } else {
          if (typeof Popper__namespace === 'undefined') {
            throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (isElement(this._config.reference)) {
            referenceElement = getElement(this._config.reference);
          } else if (_typeof(this._config.reference) === 'object') {
            referenceElement = this._config.reference;
          }

          var popperConfig = this._getPopperConfig();

          var isDisplayStatic = popperConfig.modifiers.find(function (modifier) {
            return modifier.name === 'applyStyles' && modifier.enabled === false;
          });
          this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);

          if (isDisplayStatic) {
            Manipulator.setDataAttribute(this._menu, 'popper', 'static');
          }
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
          var _ref4;

          (_ref4 = []).concat.apply(_ref4, _toConsumableArray(document.body.children)).forEach(function (elem) {
            return EventHandler.on(elem, 'mouseover', noop);
          });
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        this._menu.classList.toggle(CLASS_NAME_SHOW$7);

        this._element.classList.toggle(CLASS_NAME_SHOW$7);

        EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
      }
    }, {
      key: "hide",
      value: function hide() {
        if (isDisabled(this._element) || !this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };

        this._completeHide(relatedTarget);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (this._popper) {
          this._popper.destroy();
        }

        _get(_getPrototypeOf(Dropdown.prototype), "dispose", this).call(this);
      }
    }, {
      key: "update",
      value: function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper) {
          this._popper.update();
        }
      } // Private

    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this13 = this;

        EventHandler.on(this._element, EVENT_CLICK, function (event) {
          event.preventDefault();

          _this13.toggle();
        });
      }
    }, {
      key: "_completeHide",
      value: function _completeHide(relatedTarget) {
        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

        if (hideEvent.defaultPrevented) {
          return;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          var _ref5;

          (_ref5 = []).concat.apply(_ref5, _toConsumableArray(document.body.children)).forEach(function (elem) {
            return EventHandler.off(elem, 'mouseover', noop);
          });
        }

        if (this._popper) {
          this._popper.destroy();
        }

        this._menu.classList.remove(CLASS_NAME_SHOW$7);

        this._element.classList.remove(CLASS_NAME_SHOW$7);

        this._element.setAttribute('aria-expanded', 'false');

        Manipulator.removeDataAttribute(this._menu, 'popper');
        EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, this.constructor.Default), Manipulator.getDataAttributes(this._element)), config);
        typeCheckConfig(NAME$8, config, this.constructor.DefaultType);

        if (_typeof(config.reference) === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
          // Popper virtual elements require a getBoundingClientRect method
          throw new TypeError("".concat(NAME$8.toUpperCase(), ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method."));
        }

        return config;
      }
    }, {
      key: "_getMenuElement",
      value: function _getMenuElement() {
        return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
      }
    }, {
      key: "_getPlacement",
      value: function _getPlacement() {
        var parentDropdown = this._element.parentNode;

        if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
          return PLACEMENT_RIGHT;
        }

        if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
          return PLACEMENT_LEFT;
        } // We need to trim the value because custom properties can also include spaces


        var isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

        if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
          return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
        }

        return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
      }
    }, {
      key: "_detectNavbar",
      value: function _detectNavbar() {
        return this._element.closest(".".concat(CLASS_NAME_NAVBAR)) !== null;
      }
    }, {
      key: "_getOffset",
      value: function _getOffset() {
        var _this14 = this;

        var offset = this._config.offset;

        if (typeof offset === 'string') {
          return offset.split(',').map(function (val) {
            return Number.parseInt(val, 10);
          });
        }

        if (typeof offset === 'function') {
          return function (popperData) {
            return offset(popperData, _this14._element);
          };
        }

        return offset;
      }
    }, {
      key: "_getPopperConfig",
      value: function _getPopperConfig() {
        var defaultBsPopperConfig = {
          placement: this._getPlacement(),
          modifiers: [{
            name: 'preventOverflow',
            options: {
              boundary: this._config.boundary
            }
          }, {
            name: 'offset',
            options: {
              offset: this._getOffset()
            }
          }]
        }; // Disable Popper if we have a static display

        if (this._config.display === 'static') {
          defaultBsPopperConfig.modifiers = [{
            name: 'applyStyles',
            enabled: false
          }];
        }

        return _objectSpread(_objectSpread({}, defaultBsPopperConfig), typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
      }
    }, {
      key: "_selectMenuItem",
      value: function _selectMenuItem(_ref6) {
        var key = _ref6.key,
            target = _ref6.target;
        var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

        if (!items.length) {
          return;
        } // if target isn't included in items (e.g. when expanding the dropdown)
        // allow cycling to get the last item in case key equals ARROW_UP_KEY


        getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$8;
      }
    }, {
      key: "dropdownInterface",
      value: function dropdownInterface(element, config) {
        var data = Dropdown.getOrCreateInstance(element, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          Dropdown.dropdownInterface(this, config);
        });
      }
    }, {
      key: "clearMenus",
      value: function clearMenus(event) {
        if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
          return;
        }

        var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

        for (var i = 0, len = toggles.length; i < len; i++) {
          var context = Dropdown.getInstance(toggles[i]);

          if (!context || context._config.autoClose === false) {
            continue;
          }

          if (!context._element.classList.contains(CLASS_NAME_SHOW$7)) {
            continue;
          }

          var relatedTarget = {
            relatedTarget: context._element
          };

          if (event) {
            var composedPath = event.composedPath();
            var isMenuTarget = composedPath.includes(context._menu);

            if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
              continue;
            } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


            if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
              continue;
            }

            if (event.type === 'click') {
              relatedTarget.clickEvent = event;
            }
          }

          context._completeHide(relatedTarget);
        }
      }
    }, {
      key: "getParentFromElement",
      value: function getParentFromElement(element) {
        return getElementFromSelector(element) || element.parentNode;
      }
    }, {
      key: "dataApiKeydownHandler",
      value: function dataApiKeydownHandler(event) {
        var _this15 = this;

        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
          return;
        }

        var isActive = this.classList.contains(CLASS_NAME_SHOW$7);

        if (!isActive && event.key === ESCAPE_KEY$2) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (isDisabled(this)) {
          return;
        }

        var getToggleButton = function getToggleButton() {
          return _this15.matches(SELECTOR_DATA_TOGGLE$3) ? _this15 : SelectorEngine.prev(_this15, SELECTOR_DATA_TOGGLE$3)[0];
        };

        if (event.key === ESCAPE_KEY$2) {
          getToggleButton().focus();
          Dropdown.clearMenus();
          return;
        }

        if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
          if (!isActive) {
            getToggleButton().click();
          }

          Dropdown.getInstance(getToggleButton())._selectMenuItem(event);

          return;
        }

        if (!isActive || event.key === SPACE_KEY) {
          Dropdown.clearMenus();
        }
      }
    }]);

    return Dropdown;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.dropdownInterface(this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Dropdown to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Dropdown);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';

  var ScrollBarHelper = /*#__PURE__*/function () {
    function ScrollBarHelper() {
      _classCallCheck(this, ScrollBarHelper);

      this._element = document.body;
    }

    _createClass(ScrollBarHelper, [{
      key: "getWidth",
      value: function getWidth() {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
        var documentWidth = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - documentWidth);
      }
    }, {
      key: "hide",
      value: function hide() {
        var width = this.getWidth();

        this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


        this._setElementAttributes(this._element, 'paddingRight', function (calculatedValue) {
          return calculatedValue + width;
        }); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


        this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', function (calculatedValue) {
          return calculatedValue + width;
        });

        this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', function (calculatedValue) {
          return calculatedValue - width;
        });
      }
    }, {
      key: "_disableOverFlow",
      value: function _disableOverFlow() {
        this._saveInitialAttribute(this._element, 'overflow');

        this._element.style.overflow = 'hidden';
      }
    }, {
      key: "_setElementAttributes",
      value: function _setElementAttributes(selector, styleProp, callback) {
        var _this16 = this;

        var scrollbarWidth = this.getWidth();

        var manipulationCallBack = function manipulationCallBack(element) {
          if (element !== _this16._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
            return;
          }

          _this16._saveInitialAttribute(element, styleProp);

          var calculatedValue = window.getComputedStyle(element)[styleProp];
          element.style[styleProp] = "".concat(callback(Number.parseFloat(calculatedValue)), "px");
        };

        this._applyManipulationCallback(selector, manipulationCallBack);
      }
    }, {
      key: "reset",
      value: function reset() {
        this._resetElementAttributes(this._element, 'overflow');

        this._resetElementAttributes(this._element, 'paddingRight');

        this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

        this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
      }
    }, {
      key: "_saveInitialAttribute",
      value: function _saveInitialAttribute(element, styleProp) {
        var actualValue = element.style[styleProp];

        if (actualValue) {
          Manipulator.setDataAttribute(element, styleProp, actualValue);
        }
      }
    }, {
      key: "_resetElementAttributes",
      value: function _resetElementAttributes(selector, styleProp) {
        var manipulationCallBack = function manipulationCallBack(element) {
          var value = Manipulator.getDataAttribute(element, styleProp);

          if (typeof value === 'undefined') {
            element.style.removeProperty(styleProp);
          } else {
            Manipulator.removeDataAttribute(element, styleProp);
            element.style[styleProp] = value;
          }
        };

        this._applyManipulationCallback(selector, manipulationCallBack);
      }
    }, {
      key: "_applyManipulationCallback",
      value: function _applyManipulationCallback(selector, callBack) {
        if (isElement(selector)) {
          callBack(selector);
        } else {
          SelectorEngine.find(selector, this._element).forEach(callBack);
        }
      }
    }, {
      key: "isOverflowing",
      value: function isOverflowing() {
        return this.getWidth() > 0;
      }
    }]);

    return ScrollBarHelper;
  }();
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Default$6 = {
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    isAnimated: false,
    rootElement: 'body',
    // give the choice to place backdrop under different elements
    clickCallback: null
  };
  var DefaultType$6 = {
    isVisible: 'boolean',
    isAnimated: 'boolean',
    rootElement: '(element|string)',
    clickCallback: '(function|null)'
  };
  var NAME$7 = 'backdrop';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_FADE$5 = 'fade';
  var CLASS_NAME_SHOW$6 = 'show';
  var EVENT_MOUSEDOWN = "mousedown.bs.".concat(NAME$7);

  var Backdrop = /*#__PURE__*/function () {
    function Backdrop(config) {
      _classCallCheck(this, Backdrop);

      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }

    _createClass(Backdrop, [{
      key: "show",
      value: function show(callback) {
        if (!this._config.isVisible) {
          execute(callback);
          return;
        }

        this._append();

        if (this._config.isAnimated) {
          reflow(this._getElement());
        }

        this._getElement().classList.add(CLASS_NAME_SHOW$6);

        this._emulateAnimation(function () {
          execute(callback);
        });
      }
    }, {
      key: "hide",
      value: function hide(callback) {
        var _this17 = this;

        if (!this._config.isVisible) {
          execute(callback);
          return;
        }

        this._getElement().classList.remove(CLASS_NAME_SHOW$6);

        this._emulateAnimation(function () {
          _this17.dispose();

          execute(callback);
        });
      } // Private

    }, {
      key: "_getElement",
      value: function _getElement() {
        if (!this._element) {
          var backdrop = document.createElement('div');
          backdrop.className = CLASS_NAME_BACKDROP;

          if (this._config.isAnimated) {
            backdrop.classList.add(CLASS_NAME_FADE$5);
          }

          this._element = backdrop;
        }

        return this._element;
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread({}, Default$6), _typeof(config) === 'object' ? config : {}); // use getElement() with the default "body" to get a fresh Element on each instantiation

        config.rootElement = getElement(config.rootElement);
        typeCheckConfig(NAME$7, config, DefaultType$6);
        return config;
      }
    }, {
      key: "_append",
      value: function _append() {
        var _this18 = this;

        if (this._isAppended) {
          return;
        }

        this._config.rootElement.appendChild(this._getElement());

        EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, function () {
          execute(_this18._config.clickCallback);
        });
        this._isAppended = true;
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (!this._isAppended) {
          return;
        }

        EventHandler.off(this._element, EVENT_MOUSEDOWN);

        this._element.remove();

        this._isAppended = false;
      }
    }, {
      key: "_emulateAnimation",
      value: function _emulateAnimation(callback) {
        executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
      }
    }]);

    return Backdrop;
  }();
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$6 = 'modal';
  var DATA_KEY$6 = 'bs.modal';
  var EVENT_KEY$6 = ".".concat(DATA_KEY$6);
  var DATA_API_KEY$3 = '.data-api';
  var ESCAPE_KEY$1 = 'Escape';
  var Default$5 = {
    backdrop: true,
    keyboard: true,
    focus: true
  };
  var DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean'
  };
  var EVENT_HIDE$3 = "hide".concat(EVENT_KEY$6);
  var EVENT_HIDE_PREVENTED = "hidePrevented".concat(EVENT_KEY$6);
  var EVENT_HIDDEN$3 = "hidden".concat(EVENT_KEY$6);
  var EVENT_SHOW$3 = "show".concat(EVENT_KEY$6);
  var EVENT_SHOWN$3 = "shown".concat(EVENT_KEY$6);
  var EVENT_FOCUSIN$2 = "focusin".concat(EVENT_KEY$6);
  var EVENT_RESIZE = "resize".concat(EVENT_KEY$6);
  var EVENT_CLICK_DISMISS$2 = "click.dismiss".concat(EVENT_KEY$6);
  var EVENT_KEYDOWN_DISMISS$1 = "keydown.dismiss".concat(EVENT_KEY$6);
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss".concat(EVENT_KEY$6);
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss".concat(EVENT_KEY$6);
  var EVENT_CLICK_DATA_API$2 = "click".concat(EVENT_KEY$6).concat(DATA_API_KEY$3);
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  var SELECTOR_DATA_DISMISS$2 = '[data-bs-dismiss="modal"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = /*#__PURE__*/function (_BaseComponent6) {
    _inherits(Modal, _BaseComponent6);

    var _super6 = _createSuper(Modal);

    function Modal(element, config) {
      var _this19;

      _classCallCheck(this, Modal);

      _this19 = _super6.call(this, element);
      _this19._config = _this19._getConfig(config);
      _this19._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, _this19._element);
      _this19._backdrop = _this19._initializeBackDrop();
      _this19._isShown = false;
      _this19._ignoreBackdropClick = false;
      _this19._isTransitioning = false;
      _this19._scrollBar = new ScrollBarHelper();
      return _this19;
    } // Getters


    _createClass(Modal, [{
      key: "toggle",
      value: // Public
      function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
    }, {
      key: "show",
      value: function show(relatedTarget) {
        var _this20 = this;

        if (this._isShown || this._isTransitioning) {
          return;
        }

        var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
          relatedTarget: relatedTarget
        });

        if (showEvent.defaultPrevented) {
          return;
        }

        this._isShown = true;

        if (this._isAnimated()) {
          this._isTransitioning = true;
        }

        this._scrollBar.hide();

        document.body.classList.add(CLASS_NAME_OPEN);

        this._adjustDialog();

        this._setEscapeEvent();

        this._setResizeEvent();

        EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, SELECTOR_DATA_DISMISS$2, function (event) {
          return _this20.hide(event);
        });
        EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
          EventHandler.one(_this20._element, EVENT_MOUSEUP_DISMISS, function (event) {
            if (event.target === _this20._element) {
              _this20._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this20._showElement(relatedTarget);
        });
      }
    }, {
      key: "hide",
      value: function hide(event) {
        var _this21 = this;

        if (event && ['A', 'AREA'].includes(event.target.tagName)) {
          event.preventDefault();
        }

        if (!this._isShown || this._isTransitioning) {
          return;
        }

        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

        if (hideEvent.defaultPrevented) {
          return;
        }

        this._isShown = false;

        var isAnimated = this._isAnimated();

        if (isAnimated) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        EventHandler.off(document, EVENT_FOCUSIN$2);

        this._element.classList.remove(CLASS_NAME_SHOW$5);

        EventHandler.off(this._element, EVENT_CLICK_DISMISS$2);
        EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

        this._queueCallback(function () {
          return _this21._hideModal();
        }, this._element, isAnimated);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        [window, this._dialog].forEach(function (htmlElement) {
          return EventHandler.off(htmlElement, EVENT_KEY$6);
        });

        this._backdrop.dispose();

        _get(_getPrototypeOf(Modal.prototype), "dispose", this).call(this);
        /**
         * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
         * Do not move `document` in `htmlElements` array
         * It will remove `EVENT_CLICK_DATA_API` event that should remain
         */


        EventHandler.off(document, EVENT_FOCUSIN$2);
      }
    }, {
      key: "handleUpdate",
      value: function handleUpdate() {
        this._adjustDialog();
      } // Private

    }, {
      key: "_initializeBackDrop",
      value: function _initializeBackDrop() {
        return new Backdrop({
          isVisible: Boolean(this._config.backdrop),
          // 'static' option will be translated to true, and booleans will keep their value
          isAnimated: this._isAnimated()
        });
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default$5), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
        typeCheckConfig(NAME$6, config, DefaultType$5);
        return config;
      }
    }, {
      key: "_showElement",
      value: function _showElement(relatedTarget) {
        var _this22 = this;

        var isAnimated = this._isAnimated();

        var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.setAttribute('aria-modal', true);

        this._element.setAttribute('role', 'dialog');

        this._element.scrollTop = 0;

        if (modalBody) {
          modalBody.scrollTop = 0;
        }

        if (isAnimated) {
          reflow(this._element);
        }

        this._element.classList.add(CLASS_NAME_SHOW$5);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var transitionComplete = function transitionComplete() {
          if (_this22._config.focus) {
            _this22._element.focus();
          }

          _this22._isTransitioning = false;
          EventHandler.trigger(_this22._element, EVENT_SHOWN$3, {
            relatedTarget: relatedTarget
          });
        };

        this._queueCallback(transitionComplete, this._dialog, isAnimated);
      }
    }, {
      key: "_enforceFocus",
      value: function _enforceFocus() {
        var _this23 = this;

        EventHandler.off(document, EVENT_FOCUSIN$2); // guard against infinite focus loop

        EventHandler.on(document, EVENT_FOCUSIN$2, function (event) {
          if (document !== event.target && _this23._element !== event.target && !_this23._element.contains(event.target)) {
            _this23._element.focus();
          }
        });
      }
    }, {
      key: "_setEscapeEvent",
      value: function _setEscapeEvent() {
        var _this24 = this;

        if (this._isShown) {
          EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, function (event) {
            if (_this24._config.keyboard && event.key === ESCAPE_KEY$1) {
              event.preventDefault();

              _this24.hide();
            } else if (!_this24._config.keyboard && event.key === ESCAPE_KEY$1) {
              _this24._triggerBackdropTransition();
            }
          });
        } else {
          EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
        }
      }
    }, {
      key: "_setResizeEvent",
      value: function _setResizeEvent() {
        var _this25 = this;

        if (this._isShown) {
          EventHandler.on(window, EVENT_RESIZE, function () {
            return _this25._adjustDialog();
          });
        } else {
          EventHandler.off(window, EVENT_RESIZE);
        }
      }
    }, {
      key: "_hideModal",
      value: function _hideModal() {
        var _this26 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._element.removeAttribute('aria-modal');

        this._element.removeAttribute('role');

        this._isTransitioning = false;

        this._backdrop.hide(function () {
          document.body.classList.remove(CLASS_NAME_OPEN);

          _this26._resetAdjustments();

          _this26._scrollBar.reset();

          EventHandler.trigger(_this26._element, EVENT_HIDDEN$3);
        });
      }
    }, {
      key: "_showBackdrop",
      value: function _showBackdrop(callback) {
        var _this27 = this;

        EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, function (event) {
          if (_this27._ignoreBackdropClick) {
            _this27._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this27._config.backdrop === true) {
            _this27.hide();
          } else if (_this27._config.backdrop === 'static') {
            _this27._triggerBackdropTransition();
          }
        });

        this._backdrop.show(callback);
      }
    }, {
      key: "_isAnimated",
      value: function _isAnimated() {
        return this._element.classList.contains(CLASS_NAME_FADE$4);
      }
    }, {
      key: "_triggerBackdropTransition",
      value: function _triggerBackdropTransition() {
        var _this28 = this;

        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

        if (hideEvent.defaultPrevented) {
          return;
        }

        var _this$_element = this._element,
            classList = _this$_element.classList,
            scrollHeight = _this$_element.scrollHeight,
            style = _this$_element.style;
        var isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

        if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
          return;
        }

        if (!isModalOverflowing) {
          style.overflowY = 'hidden';
        }

        classList.add(CLASS_NAME_STATIC);

        this._queueCallback(function () {
          classList.remove(CLASS_NAME_STATIC);

          if (!isModalOverflowing) {
            _this28._queueCallback(function () {
              style.overflowY = '';
            }, _this28._dialog);
          }
        }, this._dialog);

        this._element.focus();
      } // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // ----------------------------------------------------------------------

    }, {
      key: "_adjustDialog",
      value: function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        var scrollbarWidth = this._scrollBar.getWidth();

        var isBodyOverflowing = scrollbarWidth > 0;

        if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
          this._element.style.paddingLeft = "".concat(scrollbarWidth, "px");
        }

        if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
          this._element.style.paddingRight = "".concat(scrollbarWidth, "px");
        }
      }
    }, {
      key: "_resetAdjustments",
      value: function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = Modal.getOrCreateInstance(this, config);

          if (typeof config !== 'string') {
            return;
          }

          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config](relatedTarget);
        });
      }
    }]);

    return Modal;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    var _this29 = this;

    var target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW$3, function (showEvent) {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, EVENT_HIDDEN$3, function () {
        if (isVisible(_this29)) {
          _this29.focus();
        }
      });
    });
    var data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Modal to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Modal);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'offcanvas';
  var DATA_KEY$5 = 'bs.offcanvas';
  var EVENT_KEY$5 = ".".concat(DATA_KEY$5);
  var DATA_API_KEY$2 = '.data-api';
  var EVENT_LOAD_DATA_API$1 = "load".concat(EVENT_KEY$5).concat(DATA_API_KEY$2);
  var ESCAPE_KEY = 'Escape';
  var Default$4 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  var DefaultType$4 = {
    backdrop: 'boolean',
    keyboard: 'boolean',
    scroll: 'boolean'
  };
  var CLASS_NAME_SHOW$4 = 'show';
  var OPEN_SELECTOR = '.offcanvas.show';
  var EVENT_SHOW$2 = "show".concat(EVENT_KEY$5);
  var EVENT_SHOWN$2 = "shown".concat(EVENT_KEY$5);
  var EVENT_HIDE$2 = "hide".concat(EVENT_KEY$5);
  var EVENT_HIDDEN$2 = "hidden".concat(EVENT_KEY$5);
  var EVENT_FOCUSIN$1 = "focusin".concat(EVENT_KEY$5);
  var EVENT_CLICK_DATA_API$1 = "click".concat(EVENT_KEY$5).concat(DATA_API_KEY$2);
  var EVENT_CLICK_DISMISS$1 = "click.dismiss".concat(EVENT_KEY$5);
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss".concat(EVENT_KEY$5);
  var SELECTOR_DATA_DISMISS$1 = '[data-bs-dismiss="offcanvas"]';
  var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Offcanvas = /*#__PURE__*/function (_BaseComponent7) {
    _inherits(Offcanvas, _BaseComponent7);

    var _super7 = _createSuper(Offcanvas);

    function Offcanvas(element, config) {
      var _this30;

      _classCallCheck(this, Offcanvas);

      _this30 = _super7.call(this, element);
      _this30._config = _this30._getConfig(config);
      _this30._isShown = false;
      _this30._backdrop = _this30._initializeBackDrop();

      _this30._addEventListeners();

      return _this30;
    } // Getters


    _createClass(Offcanvas, [{
      key: "toggle",
      value: // Public
      function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
    }, {
      key: "show",
      value: function show(relatedTarget) {
        var _this31 = this;

        if (this._isShown) {
          return;
        }

        var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
          relatedTarget: relatedTarget
        });

        if (showEvent.defaultPrevented) {
          return;
        }

        this._isShown = true;
        this._element.style.visibility = 'visible';

        this._backdrop.show();

        if (!this._config.scroll) {
          new ScrollBarHelper().hide();

          this._enforceFocusOnElement(this._element);
        }

        this._element.removeAttribute('aria-hidden');

        this._element.setAttribute('aria-modal', true);

        this._element.setAttribute('role', 'dialog');

        this._element.classList.add(CLASS_NAME_SHOW$4);

        var completeCallBack = function completeCallBack() {
          EventHandler.trigger(_this31._element, EVENT_SHOWN$2, {
            relatedTarget: relatedTarget
          });
        };

        this._queueCallback(completeCallBack, this._element, true);
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this32 = this;

        if (!this._isShown) {
          return;
        }

        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

        if (hideEvent.defaultPrevented) {
          return;
        }

        EventHandler.off(document, EVENT_FOCUSIN$1);

        this._element.blur();

        this._isShown = false;

        this._element.classList.remove(CLASS_NAME_SHOW$4);

        this._backdrop.hide();

        var completeCallback = function completeCallback() {
          _this32._element.setAttribute('aria-hidden', true);

          _this32._element.removeAttribute('aria-modal');

          _this32._element.removeAttribute('role');

          _this32._element.style.visibility = 'hidden';

          if (!_this32._config.scroll) {
            new ScrollBarHelper().reset();
          }

          EventHandler.trigger(_this32._element, EVENT_HIDDEN$2);
        };

        this._queueCallback(completeCallback, this._element, true);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._backdrop.dispose();

        _get(_getPrototypeOf(Offcanvas.prototype), "dispose", this).call(this);

        EventHandler.off(document, EVENT_FOCUSIN$1);
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default$4), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
        typeCheckConfig(NAME$5, config, DefaultType$4);
        return config;
      }
    }, {
      key: "_initializeBackDrop",
      value: function _initializeBackDrop() {
        var _this33 = this;

        return new Backdrop({
          isVisible: this._config.backdrop,
          isAnimated: true,
          rootElement: this._element.parentNode,
          clickCallback: function clickCallback() {
            return _this33.hide();
          }
        });
      }
    }, {
      key: "_enforceFocusOnElement",
      value: function _enforceFocusOnElement(element) {
        EventHandler.off(document, EVENT_FOCUSIN$1); // guard against infinite focus loop

        EventHandler.on(document, EVENT_FOCUSIN$1, function (event) {
          if (document !== event.target && element !== event.target && !element.contains(event.target)) {
            element.focus();
          }
        });
        element.focus();
      }
    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this34 = this;

        EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
          return _this34.hide();
        });
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this34._config.keyboard && event.key === ESCAPE_KEY) {
            _this34.hide();
          }
        });
      } // Static

    }], [{
      key: "NAME",
      get: function get() {
        return NAME$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Offcanvas.getOrCreateInstance(this, config);

          if (typeof config !== 'string') {
            return;
          }

          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config](this);
        });
      }
    }]);

    return Offcanvas;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    var _this35 = this;

    var target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$2, function () {
      // focus on trigger when it is closed
      if (isVisible(_this35)) {
        _this35.focus();
      }
    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

    var allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

    if (allReadyOpen && allReadyOpen !== target) {
      Offcanvas.getInstance(allReadyOpen).hide();
    }

    var data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
    return SelectorEngine.find(OPEN_SELECTOR).forEach(function (el) {
      return Offcanvas.getOrCreateInstance(el).show();
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  defineJQueryPlugin(Offcanvas);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.includes(attrName)) {
      if (uriAttrs.has(attrName)) {
        return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (regExp[i].test(attrName)) {
        return true;
      }
    }

    return false;
  };

  var DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };

  function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
    var _ref7;

    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var allowlistKeys = Object.keys(allowList);

    var elements = (_ref7 = []).concat.apply(_ref7, _toConsumableArray(createdDocument.body.querySelectorAll('*')));

    var _loop = function _loop(i, len) {
      var _ref8;

      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (!allowlistKeys.includes(elName)) {
        el.remove();
        return "continue";
      }

      var attributeList = (_ref8 = []).concat.apply(_ref8, _toConsumableArray(el.attributes));

      var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, allowedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$4 = 'tooltip';
  var DATA_KEY$4 = 'bs.tooltip';
  var EVENT_KEY$4 = ".".concat(DATA_KEY$4);
  var CLASS_PREFIX$1 = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)".concat(CLASS_PREFIX$1, "\\S+"), 'g');
  var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  var DefaultType$3 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(array|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacements: 'array',
    boundary: '(string|element)',
    customClass: '(string|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    allowList: 'object',
    popperConfig: '(null|object|function)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  var Default$3 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: [0, 0],
    container: false,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    boundary: 'clippingParents',
    customClass: '',
    sanitize: true,
    sanitizeFn: null,
    allowList: DefaultAllowlist,
    popperConfig: null
  };
  var Event$2 = {
    HIDE: "hide".concat(EVENT_KEY$4),
    HIDDEN: "hidden".concat(EVENT_KEY$4),
    SHOW: "show".concat(EVENT_KEY$4),
    SHOWN: "shown".concat(EVENT_KEY$4),
    INSERTED: "inserted".concat(EVENT_KEY$4),
    CLICK: "click".concat(EVENT_KEY$4),
    FOCUSIN: "focusin".concat(EVENT_KEY$4),
    FOCUSOUT: "focusout".concat(EVENT_KEY$4),
    MOUSEENTER: "mouseenter".concat(EVENT_KEY$4),
    MOUSELEAVE: "mouseleave".concat(EVENT_KEY$4)
  };
  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_MODAL = 'modal';
  var CLASS_NAME_SHOW$3 = 'show';
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = /*#__PURE__*/function (_BaseComponent8) {
    _inherits(Tooltip, _BaseComponent8);

    var _super8 = _createSuper(Tooltip);

    function Tooltip(element, config) {
      var _this36;

      _classCallCheck(this, Tooltip);

      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      }

      _this36 = _super8.call(this, element); // private

      _this36._isEnabled = true;
      _this36._timeout = 0;
      _this36._hoverState = '';
      _this36._activeTrigger = {};
      _this36._popper = null; // Protected

      _this36._config = _this36._getConfig(config);
      _this36.tip = null;

      _this36._setListeners();

      return _this36;
    } // Getters


    _createClass(Tooltip, [{
      key: "enable",
      value: // Public
      function enable() {
        this._isEnabled = true;
      }
    }, {
      key: "disable",
      value: function disable() {
        this._isEnabled = false;
      }
    }, {
      key: "toggleEnabled",
      value: function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
    }, {
      key: "toggle",
      value: function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var context = this._initializeOnDelegatedTarget(event);

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        clearTimeout(this._timeout);
        EventHandler.off(this._element.closest(".".concat(CLASS_NAME_MODAL)), 'hide.bs.modal', this._hideModalHandler);

        if (this.tip) {
          this.tip.remove();
        }

        if (this._popper) {
          this._popper.destroy();
        }

        _get(_getPrototypeOf(Tooltip.prototype), "dispose", this).call(this);
      }
    }, {
      key: "show",
      value: function show() {
        var _this37 = this;

        if (this._element.style.display === 'none') {
          throw new Error('Please use show on visible elements');
        }

        if (!(this.isWithContent() && this._isEnabled)) {
          return;
        }

        var showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
        var shadowRoot = findShadowRoot(this._element);
        var isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

        if (showEvent.defaultPrevented || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);

        this._element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this._config.animation) {
          tip.classList.add(CLASS_NAME_FADE$3);
        }

        var placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

        var attachment = this._getAttachment(placement);

        this._addAttachmentClass(attachment);

        var container = this._config.container;
        Data.set(tip, this.constructor.DATA_KEY, this);

        if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
          container.appendChild(tip);
          EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
        }

        if (this._popper) {
          this._popper.update();
        } else {
          this._popper = Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
        }

        tip.classList.add(CLASS_NAME_SHOW$3);
        var customClass = typeof this._config.customClass === 'function' ? this._config.customClass() : this._config.customClass;

        if (customClass) {
          var _tip$classList;

          (_tip$classList = tip.classList).add.apply(_tip$classList, _toConsumableArray(customClass.split(' ')));
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement) {
          var _ref9;

          (_ref9 = []).concat.apply(_ref9, _toConsumableArray(document.body.children)).forEach(function (element) {
            EventHandler.on(element, 'mouseover', noop);
          });
        }

        var complete = function complete() {
          var prevHoverState = _this37._hoverState;
          _this37._hoverState = null;
          EventHandler.trigger(_this37._element, _this37.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this37._leave(null, _this37);
          }
        };

        var isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$3);

        this._queueCallback(complete, this.tip, isAnimated);
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this38 = this;

        if (!this._popper) {
          return;
        }

        var tip = this.getTipElement();

        var complete = function complete() {
          if (_this38._isWithActiveTrigger()) {
            return;
          }

          if (_this38._hoverState !== HOVER_STATE_SHOW) {
            tip.remove();
          }

          _this38._cleanTipClass();

          _this38._element.removeAttribute('aria-describedby');

          EventHandler.trigger(_this38._element, _this38.constructor.Event.HIDDEN);

          if (_this38._popper) {
            _this38._popper.destroy();

            _this38._popper = null;
          }
        };

        var hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

        if (hideEvent.defaultPrevented) {
          return;
        }

        tip.classList.remove(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          var _ref10;

          (_ref10 = []).concat.apply(_ref10, _toConsumableArray(document.body.children)).forEach(function (element) {
            return EventHandler.off(element, 'mouseover', noop);
          });
        }

        this._activeTrigger[TRIGGER_CLICK] = false;
        this._activeTrigger[TRIGGER_FOCUS] = false;
        this._activeTrigger[TRIGGER_HOVER] = false;
        var isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$3);

        this._queueCallback(complete, this.tip, isAnimated);

        this._hoverState = '';
      }
    }, {
      key: "update",
      value: function update() {
        if (this._popper !== null) {
          this._popper.update();
        }
      } // Protected

    }, {
      key: "isWithContent",
      value: function isWithContent() {
        return Boolean(this.getTitle());
      }
    }, {
      key: "getTipElement",
      value: function getTipElement() {
        if (this.tip) {
          return this.tip;
        }

        var element = document.createElement('div');
        element.innerHTML = this._config.template;
        this.tip = element.children[0];
        return this.tip;
      }
    }, {
      key: "setContent",
      value: function setContent() {
        var tip = this.getTipElement();
        this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
        tip.classList.remove(CLASS_NAME_FADE$3, CLASS_NAME_SHOW$3);
      }
    }, {
      key: "setElementContent",
      value: function setElementContent(element, content) {
        if (element === null) {
          return;
        }

        if (isElement(content)) {
          content = getElement(content); // content is a DOM node or a jQuery

          if (this._config.html) {
            if (content.parentNode !== element) {
              element.innerHTML = '';
              element.appendChild(content);
            }
          } else {
            element.textContent = content.textContent;
          }

          return;
        }

        if (this._config.html) {
          if (this._config.sanitize) {
            content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
          }

          element.innerHTML = content;
        } else {
          element.textContent = content;
        }
      }
    }, {
      key: "getTitle",
      value: function getTitle() {
        var title = this._element.getAttribute('data-bs-original-title');

        if (!title) {
          title = typeof this._config.title === 'function' ? this._config.title.call(this._element) : this._config.title;
        }

        return title;
      }
    }, {
      key: "updateAttachment",
      value: function updateAttachment(attachment) {
        if (attachment === 'right') {
          return 'end';
        }

        if (attachment === 'left') {
          return 'start';
        }

        return attachment;
      } // Private

    }, {
      key: "_initializeOnDelegatedTarget",
      value: function _initializeOnDelegatedTarget(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || Data.get(event.delegateTarget, dataKey);

        if (!context) {
          context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
          Data.set(event.delegateTarget, dataKey, context);
        }

        return context;
      }
    }, {
      key: "_getOffset",
      value: function _getOffset() {
        var _this39 = this;

        var offset = this._config.offset;

        if (typeof offset === 'string') {
          return offset.split(',').map(function (val) {
            return Number.parseInt(val, 10);
          });
        }

        if (typeof offset === 'function') {
          return function (popperData) {
            return offset(popperData, _this39._element);
          };
        }

        return offset;
      }
    }, {
      key: "_getPopperConfig",
      value: function _getPopperConfig(attachment) {
        var _this40 = this;

        var defaultBsPopperConfig = {
          placement: attachment,
          modifiers: [{
            name: 'flip',
            options: {
              fallbackPlacements: this._config.fallbackPlacements
            }
          }, {
            name: 'offset',
            options: {
              offset: this._getOffset()
            }
          }, {
            name: 'preventOverflow',
            options: {
              boundary: this._config.boundary
            }
          }, {
            name: 'arrow',
            options: {
              element: ".".concat(this.constructor.NAME, "-arrow")
            }
          }, {
            name: 'onChange',
            enabled: true,
            phase: 'afterWrite',
            fn: function fn(data) {
              return _this40._handlePopperPlacementChange(data);
            }
          }],
          onFirstUpdate: function onFirstUpdate(data) {
            if (data.options.placement !== data.placement) {
              _this40._handlePopperPlacementChange(data);
            }
          }
        };
        return _objectSpread(_objectSpread({}, defaultBsPopperConfig), typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
      }
    }, {
      key: "_addAttachmentClass",
      value: function _addAttachmentClass(attachment) {
        this.getTipElement().classList.add("".concat(CLASS_PREFIX$1, "-").concat(this.updateAttachment(attachment)));
      }
    }, {
      key: "_getAttachment",
      value: function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      }
    }, {
      key: "_setListeners",
      value: function _setListeners() {
        var _this41 = this;

        var triggers = this._config.trigger.split(' ');

        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            EventHandler.on(_this41._element, _this41.constructor.Event.CLICK, _this41._config.selector, function (event) {
              return _this41.toggle(event);
            });
          } else if (trigger !== TRIGGER_MANUAL) {
            var eventIn = trigger === TRIGGER_HOVER ? _this41.constructor.Event.MOUSEENTER : _this41.constructor.Event.FOCUSIN;
            var eventOut = trigger === TRIGGER_HOVER ? _this41.constructor.Event.MOUSELEAVE : _this41.constructor.Event.FOCUSOUT;
            EventHandler.on(_this41._element, eventIn, _this41._config.selector, function (event) {
              return _this41._enter(event);
            });
            EventHandler.on(_this41._element, eventOut, _this41._config.selector, function (event) {
              return _this41._leave(event);
            });
          }
        });

        this._hideModalHandler = function () {
          if (_this41._element) {
            _this41.hide();
          }
        };

        EventHandler.on(this._element.closest(".".concat(CLASS_NAME_MODAL)), 'hide.bs.modal', this._hideModalHandler);

        if (this._config.selector) {
          this._config = _objectSpread(_objectSpread({}, this._config), {}, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      }
    }, {
      key: "_fixTitle",
      value: function _fixTitle() {
        var title = this._element.getAttribute('title');

        var originalTitleType = _typeof(this._element.getAttribute('data-bs-original-title'));

        if (title || originalTitleType !== 'string') {
          this._element.setAttribute('data-bs-original-title', title || '');

          if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
            this._element.setAttribute('aria-label', title);
          }

          this._element.setAttribute('title', '');
        }
      }
    }, {
      key: "_enter",
      value: function _enter(event, context) {
        context = this._initializeOnDelegatedTarget(event, context);

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
        }

        if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
          context._hoverState = HOVER_STATE_SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HOVER_STATE_SHOW;

        if (!context._config.delay || !context._config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HOVER_STATE_SHOW) {
            context.show();
          }
        }, context._config.delay.show);
      }
    }, {
      key: "_leave",
      value: function _leave(event, context) {
        context = this._initializeOnDelegatedTarget(event, context);

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HOVER_STATE_OUT;

        if (!context._config.delay || !context._config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HOVER_STATE_OUT) {
            context.hide();
          }
        }, context._config.delay.hide);
      }
    }, {
      key: "_isWithActiveTrigger",
      value: function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        var dataAttributes = Manipulator.getDataAttributes(this._element);
        Object.keys(dataAttributes).forEach(function (dataAttr) {
          if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
            delete dataAttributes[dataAttr];
          }
        });
        config = _objectSpread(_objectSpread(_objectSpread({}, this.constructor.Default), dataAttributes), _typeof(config) === 'object' && config ? config : {});
        config.container = config.container === false ? document.body : getElement(config.container);

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

        if (config.sanitize) {
          config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
        }

        return config;
      }
    }, {
      key: "_getDelegateConfig",
      value: function _getDelegateConfig() {
        var config = {};

        if (this._config) {
          for (var key in this._config) {
            if (this.constructor.Default[key] !== this._config[key]) {
              config[key] = this._config[key];
            }
          }
        }

        return config;
      }
    }, {
      key: "_cleanTipClass",
      value: function _cleanTipClass() {
        var tip = this.getTipElement();
        var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

        if (tabClass !== null && tabClass.length > 0) {
          tabClass.map(function (token) {
            return token.trim();
          }).forEach(function (tClass) {
            return tip.classList.remove(tClass);
          });
        }
      }
    }, {
      key: "_handlePopperPlacementChange",
      value: function _handlePopperPlacementChange(popperData) {
        var state = popperData.state;

        if (!state) {
          return;
        }

        this.tip = state.elements.popper;

        this._cleanTipClass();

        this._addAttachmentClass(this._getAttachment(state.placement));
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$4;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$3;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Tooltip.getOrCreateInstance(this, config);

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"".concat(config, "\""));
            }

            data[config]();
          }
        });
      }
    }]);

    return Tooltip;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tooltip to jQuery only if jQuery is present
   */


  defineJQueryPlugin(Tooltip);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'popover';
  var DATA_KEY$3 = 'bs.popover';
  var EVENT_KEY$3 = ".".concat(DATA_KEY$3);
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)".concat(CLASS_PREFIX, "\\S+"), 'g');

  var Default$2 = _objectSpread(_objectSpread({}, Tooltip.Default), {}, {
    placement: 'right',
    offset: [0, 8],
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
  });

  var DefaultType$2 = _objectSpread(_objectSpread({}, Tooltip.DefaultType), {}, {
    content: '(string|element|function)'
  });

  var Event$1 = {
    HIDE: "hide".concat(EVENT_KEY$3),
    HIDDEN: "hidden".concat(EVENT_KEY$3),
    SHOW: "show".concat(EVENT_KEY$3),
    SHOWN: "shown".concat(EVENT_KEY$3),
    INSERTED: "inserted".concat(EVENT_KEY$3),
    CLICK: "click".concat(EVENT_KEY$3),
    FOCUSIN: "focusin".concat(EVENT_KEY$3),
    FOCUSOUT: "focusout".concat(EVENT_KEY$3),
    MOUSEENTER: "mouseenter".concat(EVENT_KEY$3),
    MOUSELEAVE: "mouseleave".concat(EVENT_KEY$3)
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$2 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = /*#__PURE__*/function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    var _super9 = _createSuper(Popover);

    function Popover() {
      _classCallCheck(this, Popover);

      return _super9.apply(this, arguments);
    }

    _createClass(Popover, [{
      key: "isWithContent",
      value: // Overrides
      function isWithContent() {
        return this.getTitle() || this._getContent();
      }
    }, {
      key: "getTipElement",
      value: function getTipElement() {
        if (this.tip) {
          return this.tip;
        }

        this.tip = _get(_getPrototypeOf(Popover.prototype), "getTipElement", this).call(this);

        if (!this.getTitle()) {
          SelectorEngine.findOne(SELECTOR_TITLE, this.tip).remove();
        }

        if (!this._getContent()) {
          SelectorEngine.findOne(SELECTOR_CONTENT, this.tip).remove();
        }

        return this.tip;
      }
    }, {
      key: "setContent",
      value: function setContent() {
        var tip = this.getTipElement(); // we use append for html objects to maintain js events

        this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this._element);
        }

        this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
        tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      } // Private

    }, {
      key: "_addAttachmentClass",
      value: function _addAttachmentClass(attachment) {
        this.getTipElement().classList.add("".concat(CLASS_PREFIX, "-").concat(this.updateAttachment(attachment)));
      }
    }, {
      key: "_getContent",
      value: function _getContent() {
        return this._element.getAttribute('data-bs-content') || this._config.content;
      }
    }, {
      key: "_cleanTipClass",
      value: function _cleanTipClass() {
        var tip = this.getTipElement();
        var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          tabClass.map(function (token) {
            return token.trim();
          }).forEach(function (tClass) {
            return tip.classList.remove(tClass);
          });
        }
      } // Static

    }], [{
      key: "Default",
      get: // Getters
      function get() {
        return Default$2;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$3;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Popover.getOrCreateInstance(this, config);

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"".concat(config, "\""));
            }

            data[config]();
          }
        });
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Popover to jQuery only if jQuery is present
   */


  defineJQueryPlugin(Popover);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'scrollspy';
  var DATA_KEY$2 = 'bs.scrollspy';
  var EVENT_KEY$2 = ".".concat(DATA_KEY$2);
  var DATA_API_KEY$1 = '.data-api';
  var Default$1 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$1 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate".concat(EVENT_KEY$2);
  var EVENT_SCROLL = "scroll".concat(EVENT_KEY$2);
  var EVENT_LOAD_DATA_API = "load".concat(EVENT_KEY$2).concat(DATA_API_KEY$1);
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/function (_BaseComponent9) {
    _inherits(ScrollSpy, _BaseComponent9);

    var _super10 = _createSuper(ScrollSpy);

    function ScrollSpy(element, config) {
      var _this42;

      _classCallCheck(this, ScrollSpy);

      _this42 = _super10.call(this, element);
      _this42._scrollElement = _this42._element.tagName === 'BODY' ? window : _this42._element;
      _this42._config = _this42._getConfig(config);
      _this42._selector = "".concat(_this42._config.target, " ").concat(SELECTOR_NAV_LINKS, ", ").concat(_this42._config.target, " ").concat(SELECTOR_LIST_ITEMS, ", ").concat(_this42._config.target, " .").concat(CLASS_NAME_DROPDOWN_ITEM);
      _this42._offsets = [];
      _this42._targets = [];
      _this42._activeTarget = null;
      _this42._scrollHeight = 0;
      EventHandler.on(_this42._scrollElement, EVENT_SCROLL, function () {
        return _this42._process();
      });

      _this42.refresh();

      _this42._process();

      return _this42;
    } // Getters


    _createClass(ScrollSpy, [{
      key: "refresh",
      value: // Public
      function refresh() {
        var _this43 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = SelectorEngine.find(this._selector);
        targets.map(function (element) {
          var targetSelector = getSelectorFromElement(element);
          var target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this43._offsets.push(item[0]);

          _this43._targets.push(item[1]);
        });
      }
    }, {
      key: "dispose",
      value: function dispose() {
        EventHandler.off(this._scrollElement, EVENT_KEY$2);

        _get(_getPrototypeOf(ScrollSpy.prototype), "dispose", this).call(this);
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default$1), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' && config ? config : {});

        if (typeof config.target !== 'string' && isElement(config.target)) {
          var id = config.target.id;

          if (!id) {
            id = getUID(NAME$2);
            config.target.id = id;
          }

          config.target = "#".concat(id);
        }

        typeCheckConfig(NAME$2, config, DefaultType$1);
        return config;
      }
    }, {
      key: "_getScrollTop",
      value: function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      }
    }, {
      key: "_getScrollHeight",
      value: function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }
    }, {
      key: "_getOffsetHeight",
      value: function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      }
    }, {
      key: "_process",
      value: function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      }
    }, {
      key: "_activate",
      value: function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',').map(function (selector) {
          return "".concat(selector, "[data-bs-target=\"").concat(target, "\"],").concat(selector, "[href=\"").concat(target, "\"]");
        });

        var link = SelectorEngine.findOne(queries.join(','));

        if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
          SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
          link.classList.add(CLASS_NAME_ACTIVE$1);
        } else {
          // Set triggered link as active
          link.classList.add(CLASS_NAME_ACTIVE$1);
          SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(function (listGroup) {
            // Set triggered links parents as active
            // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
            SelectorEngine.prev(listGroup, "".concat(SELECTOR_NAV_LINKS, ", ").concat(SELECTOR_LIST_ITEMS)).forEach(function (item) {
              return item.classList.add(CLASS_NAME_ACTIVE$1);
            }); // Handle special case when .nav-link is inside .nav-item

            SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
              SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) {
                return item.classList.add(CLASS_NAME_ACTIVE$1);
              });
            });
          });
        }

        EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
          relatedTarget: target
        });
      }
    }, {
      key: "_clear",
      value: function _clear() {
        SelectorEngine.find(this._selector).filter(function (node) {
          return node.classList.contains(CLASS_NAME_ACTIVE$1);
        }).forEach(function (node) {
          return node.classList.remove(CLASS_NAME_ACTIVE$1);
        });
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$2;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = ScrollSpy.getOrCreateInstance(this, config);

          if (typeof config !== 'string') {
            return;
          }

          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        });
      }
    }]);

    return ScrollSpy;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
    SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) {
      return new ScrollSpy(spy);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .ScrollSpy to jQuery only if jQuery is present
   */

  defineJQueryPlugin(ScrollSpy);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'tab';
  var DATA_KEY$1 = 'bs.tab';
  var EVENT_KEY$1 = ".".concat(DATA_KEY$1);
  var DATA_API_KEY = '.data-api';
  var EVENT_HIDE$1 = "hide".concat(EVENT_KEY$1);
  var EVENT_HIDDEN$1 = "hidden".concat(EVENT_KEY$1);
  var EVENT_SHOW$1 = "show".concat(EVENT_KEY$1);
  var EVENT_SHOWN$1 = "shown".concat(EVENT_KEY$1);
  var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY$1).concat(DATA_API_KEY);
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_SHOW$1 = 'show';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_UL = ':scope > li > .active';
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/function (_BaseComponent10) {
    _inherits(Tab, _BaseComponent10);

    var _super11 = _createSuper(Tab);

    function Tab() {
      _classCallCheck(this, Tab);

      return _super11.apply(this, arguments);
    }

    _createClass(Tab, [{
      key: "show",
      value: // Public
      function show() {
        var _this44 = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
          return;
        }

        var previous;
        var target = getElementFromSelector(this._element);

        var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
          previous = SelectorEngine.find(itemSelector, listElement);
          previous = previous[previous.length - 1];
        }

        var hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
          relatedTarget: this._element
        }) : null;
        var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
          relatedTarget: previous
        });

        if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
          return;
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          EventHandler.trigger(previous, EVENT_HIDDEN$1, {
            relatedTarget: _this44._element
          });
          EventHandler.trigger(_this44._element, EVENT_SHOWN$1, {
            relatedTarget: previous
          });
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      } // Private

    }, {
      key: "_activate",
      value: function _activate(element, container, callback) {
        var _this45 = this;

        var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
        var active = activeElements[0];
        var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

        var complete = function complete() {
          return _this45._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          active.classList.remove(CLASS_NAME_SHOW$1);

          this._queueCallback(complete, element, true);
        } else {
          complete();
        }
      }
    }, {
      key: "_transitionComplete",
      value: function _transitionComplete(element, active, callback) {
        if (active) {
          active.classList.remove(CLASS_NAME_ACTIVE);
          var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

          if (dropdownChild) {
            dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        element.classList.add(CLASS_NAME_ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        reflow(element);

        if (element.classList.contains(CLASS_NAME_FADE$1)) {
          element.classList.add(CLASS_NAME_SHOW$1);
        }

        var parent = element.parentNode;

        if (parent && parent.nodeName === 'LI') {
          parent = parent.parentNode;
        }

        if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
          var dropdownElement = element.closest(SELECTOR_DROPDOWN);

          if (dropdownElement) {
            SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(function (dropdown) {
              return dropdown.classList.add(CLASS_NAME_ACTIVE);
            });
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      } // Static

    }], [{
      key: "NAME",
      get: // Getters
      function get() {
        return NAME$1;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Tab.getOrCreateInstance(this);

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"".concat(config, "\""));
            }

            data[config]();
          }
        });
      }
    }]);

    return Tab;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    var data = Tab.getOrCreateInstance(this);
    data.show();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tab to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Tab);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'toast';
  var DATA_KEY = 'bs.toast';
  var EVENT_KEY = ".".concat(DATA_KEY);
  var EVENT_CLICK_DISMISS = "click.dismiss".concat(EVENT_KEY);
  var EVENT_MOUSEOVER = "mouseover".concat(EVENT_KEY);
  var EVENT_MOUSEOUT = "mouseout".concat(EVENT_KEY);
  var EVENT_FOCUSIN = "focusin".concat(EVENT_KEY);
  var EVENT_FOCUSOUT = "focusout".concat(EVENT_KEY);
  var EVENT_HIDE = "hide".concat(EVENT_KEY);
  var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
  var EVENT_SHOW = "show".concat(EVENT_KEY);
  var EVENT_SHOWN = "shown".concat(EVENT_KEY);
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };
  var SELECTOR_DATA_DISMISS = '[data-bs-dismiss="toast"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast = /*#__PURE__*/function (_BaseComponent11) {
    _inherits(Toast, _BaseComponent11);

    var _super12 = _createSuper(Toast);

    function Toast(element, config) {
      var _this46;

      _classCallCheck(this, Toast);

      _this46 = _super12.call(this, element);
      _this46._config = _this46._getConfig(config);
      _this46._timeout = null;
      _this46._hasMouseInteraction = false;
      _this46._hasKeyboardInteraction = false;

      _this46._setListeners();

      return _this46;
    } // Getters


    _createClass(Toast, [{
      key: "show",
      value: // Public
      function show() {
        var _this47 = this;

        var showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

        if (showEvent.defaultPrevented) {
          return;
        }

        this._clearTimeout();

        if (this._config.animation) {
          this._element.classList.add(CLASS_NAME_FADE);
        }

        var complete = function complete() {
          _this47._element.classList.remove(CLASS_NAME_SHOWING);

          _this47._element.classList.add(CLASS_NAME_SHOW);

          EventHandler.trigger(_this47._element, EVENT_SHOWN);

          _this47._maybeScheduleHide();
        };

        this._element.classList.remove(CLASS_NAME_HIDE);

        reflow(this._element);

        this._element.classList.add(CLASS_NAME_SHOWING);

        this._queueCallback(complete, this._element, this._config.animation);
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this48 = this;

        if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
          return;
        }

        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

        if (hideEvent.defaultPrevented) {
          return;
        }

        var complete = function complete() {
          _this48._element.classList.add(CLASS_NAME_HIDE);

          EventHandler.trigger(_this48._element, EVENT_HIDDEN);
        };

        this._element.classList.remove(CLASS_NAME_SHOW);

        this._queueCallback(complete, this._element, this._config.animation);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._clearTimeout();

        if (this._element.classList.contains(CLASS_NAME_SHOW)) {
          this._element.classList.remove(CLASS_NAME_SHOW);
        }

        _get(_getPrototypeOf(Toast.prototype), "dispose", this).call(this);
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' && config ? config : {});
        typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      }
    }, {
      key: "_maybeScheduleHide",
      value: function _maybeScheduleHide() {
        var _this49 = this;

        if (!this._config.autohide) {
          return;
        }

        if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
          return;
        }

        this._timeout = setTimeout(function () {
          _this49.hide();
        }, this._config.delay);
      }
    }, {
      key: "_onInteraction",
      value: function _onInteraction(event, isInteracting) {
        switch (event.type) {
          case 'mouseover':
          case 'mouseout':
            this._hasMouseInteraction = isInteracting;
            break;

          case 'focusin':
          case 'focusout':
            this._hasKeyboardInteraction = isInteracting;
            break;
        }

        if (isInteracting) {
          this._clearTimeout();

          return;
        }

        var nextElement = event.relatedTarget;

        if (this._element === nextElement || this._element.contains(nextElement)) {
          return;
        }

        this._maybeScheduleHide();
      }
    }, {
      key: "_setListeners",
      value: function _setListeners() {
        var _this50 = this;

        EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function () {
          return _this50.hide();
        });
        EventHandler.on(this._element, EVENT_MOUSEOVER, function (event) {
          return _this50._onInteraction(event, true);
        });
        EventHandler.on(this._element, EVENT_MOUSEOUT, function (event) {
          return _this50._onInteraction(event, false);
        });
        EventHandler.on(this._element, EVENT_FOCUSIN, function (event) {
          return _this50._onInteraction(event, true);
        });
        EventHandler.on(this._element, EVENT_FOCUSOUT, function (event) {
          return _this50._onInteraction(event, false);
        });
      }
    }, {
      key: "_clearTimeout",
      value: function _clearTimeout() {
        clearTimeout(this._timeout);
        this._timeout = null;
      } // Static

    }], [{
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = Toast.getOrCreateInstance(this, config);

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"".concat(config, "\""));
            }

            data[config](this);
          }
        });
      }
    }]);

    return Toast;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Toast to jQuery only if jQuery is present
   */


  defineJQueryPlugin(Toast);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.2): index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var index_umd = {
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Offcanvas: Offcanvas,
    Popover: Popover,
    ScrollSpy: ScrollSpy,
    Tab: Tab,
    Toast: Toast,
    Tooltip: Tooltip
  };
  return index_umd;
});

/***/ }),

/***/ "./resources/js/jquery-3.6.0.min.js":
/*!******************************************!*\
  !*** ./resources/js/jquery-3.6.0.min.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function (e, t) {
  "use strict";

  "object" == ( false ? 0 : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e);
  } : t(e);
}("undefined" != typeof window ? window : this, function (C, e) {
  "use strict";

  var t = [],
      r = Object.getPrototypeOf,
      s = t.slice,
      g = t.flat ? function (e) {
    return t.flat.call(e);
  } : function (e) {
    return t.concat.apply([], e);
  },
      u = t.push,
      i = t.indexOf,
      n = {},
      o = n.toString,
      v = n.hasOwnProperty,
      a = v.toString,
      l = a.call(Object),
      y = {},
      m = function m(e) {
    return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item;
  },
      x = function x(e) {
    return null != e && e === e.window;
  },
      E = C.document,
      c = {
    type: !0,
    src: !0,
    nonce: !0,
    noModule: !0
  };

  function b(e, t, n) {
    var r,
        i,
        o = (n = n || E).createElement("script");
    if (o.text = e, t) for (r in c) {
      (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
    }
    n.head.appendChild(o).parentNode.removeChild(o);
  }

  function w(e) {
    return null == e ? e + "" : "object" == _typeof(e) || "function" == typeof e ? n[o.call(e)] || "object" : _typeof(e);
  }

  var f = "3.6.0",
      S = function S(e, t) {
    return new S.fn.init(e, t);
  };

  function p(e) {
    var t = !!e && "length" in e && e.length,
        n = w(e);
    return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
  }

  S.fn = S.prototype = {
    jquery: f,
    constructor: S,
    length: 0,
    toArray: function toArray() {
      return s.call(this);
    },
    get: function get(e) {
      return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e];
    },
    pushStack: function pushStack(e) {
      var t = S.merge(this.constructor(), e);
      return t.prevObject = this, t;
    },
    each: function each(e) {
      return S.each(this, e);
    },
    map: function map(n) {
      return this.pushStack(S.map(this, function (e, t) {
        return n.call(e, t, e);
      }));
    },
    slice: function slice() {
      return this.pushStack(s.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    even: function even() {
      return this.pushStack(S.grep(this, function (e, t) {
        return (t + 1) % 2;
      }));
    },
    odd: function odd() {
      return this.pushStack(S.grep(this, function (e, t) {
        return t % 2;
      }));
    },
    eq: function eq(e) {
      var t = this.length,
          n = +e + (e < 0 ? t : 0);
      return this.pushStack(0 <= n && n < t ? [this[n]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    push: u,
    sort: t.sort,
    splice: t.splice
  }, S.extend = S.fn.extend = function () {
    var e,
        t,
        n,
        r,
        i,
        o,
        a = arguments[0] || {},
        s = 1,
        u = arguments.length,
        l = !1;

    for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == _typeof(a) || m(a) || (a = {}), s === u && (a = this, s--); s < u; s++) {
      if (null != (e = arguments[s])) for (t in e) {
        r = e[t], "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {}, i = !1, a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r));
      }
    }

    return a;
  }, S.extend({
    expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function error(e) {
      throw new Error(e);
    },
    noop: function noop() {},
    isPlainObject: function isPlainObject(e) {
      var t, n;
      return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = v.call(t, "constructor") && t.constructor) && a.call(n) === l);
    },
    isEmptyObject: function isEmptyObject(e) {
      var t;

      for (t in e) {
        return !1;
      }

      return !0;
    },
    globalEval: function globalEval(e, t, n) {
      b(e, {
        nonce: t && t.nonce
      }, n);
    },
    each: function each(e, t) {
      var n,
          r = 0;

      if (p(e)) {
        for (n = e.length; r < n; r++) {
          if (!1 === t.call(e[r], r, e[r])) break;
        }
      } else for (r in e) {
        if (!1 === t.call(e[r], r, e[r])) break;
      }

      return e;
    },
    makeArray: function makeArray(e, t) {
      var n = t || [];
      return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n;
    },
    inArray: function inArray(e, t, n) {
      return null == t ? -1 : i.call(t, e, n);
    },
    merge: function merge(e, t) {
      for (var n = +t.length, r = 0, i = e.length; r < n; r++) {
        e[i++] = t[r];
      }

      return e.length = i, e;
    },
    grep: function grep(e, t, n) {
      for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) {
        !t(e[i], i) !== a && r.push(e[i]);
      }

      return r;
    },
    map: function map(e, t, n) {
      var r,
          i,
          o = 0,
          a = [];
      if (p(e)) for (r = e.length; o < r; o++) {
        null != (i = t(e[o], o, n)) && a.push(i);
      } else for (o in e) {
        null != (i = t(e[o], o, n)) && a.push(i);
      }
      return g(a);
    },
    guid: 1,
    support: y
  }), "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]), S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
    n["[object " + t + "]"] = t.toLowerCase();
  });

  var d = function (n) {
    var e,
        d,
        b,
        o,
        i,
        h,
        f,
        g,
        w,
        u,
        l,
        T,
        C,
        a,
        E,
        v,
        s,
        c,
        y,
        S = "sizzle" + 1 * new Date(),
        p = n.document,
        k = 0,
        r = 0,
        m = ue(),
        x = ue(),
        A = ue(),
        N = ue(),
        j = function j(e, t) {
      return e === t && (l = !0), 0;
    },
        D = {}.hasOwnProperty,
        t = [],
        q = t.pop,
        L = t.push,
        H = t.push,
        O = t.slice,
        P = function P(e, t) {
      for (var n = 0, r = e.length; n < r; n++) {
        if (e[n] === t) return n;
      }

      return -1;
    },
        R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        M = "[\\x20\\t\\r\\n\\f]",
        I = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]",
        F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
        B = new RegExp(M + "+", "g"),
        $ = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
        _ = new RegExp("^" + M + "*," + M + "*"),
        z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
        U = new RegExp(M + "|>"),
        X = new RegExp(F),
        V = new RegExp("^" + I + "$"),
        G = {
      ID: new RegExp("^#(" + I + ")"),
      CLASS: new RegExp("^\\.(" + I + ")"),
      TAG: new RegExp("^(" + I + "|[*])"),
      ATTR: new RegExp("^" + W),
      PSEUDO: new RegExp("^" + F),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + R + ")$", "i"),
      needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
    },
        Y = /HTML$/i,
        Q = /^(?:input|select|textarea|button)$/i,
        J = /^h\d$/i,
        K = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ee = /[+~]/,
        te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])", "g"),
        ne = function ne(e, t) {
      var n = "0x" + e.slice(1) - 65536;
      return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320));
    },
        re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ie = function ie(e, t) {
      return t ? "\0" === e ? "\uFFFD" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
    },
        oe = function oe() {
      T();
    },
        ae = be(function (e) {
      return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
    }, {
      dir: "parentNode",
      next: "legend"
    });

    try {
      H.apply(t = O.call(p.childNodes), p.childNodes), t[p.childNodes.length].nodeType;
    } catch (e) {
      H = {
        apply: t.length ? function (e, t) {
          L.apply(e, O.call(t));
        } : function (e, t) {
          var n = e.length,
              r = 0;

          while (e[n++] = t[r++]) {
            ;
          }

          e.length = n - 1;
        }
      };
    }

    function se(t, e, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = e && e.ownerDocument,
          p = e ? e.nodeType : 9;
      if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;

      if (!r && (T(e), e = e || C, E)) {
        if (11 !== p && (u = Z.exec(t))) if (i = u[1]) {
          if (9 === p) {
            if (!(a = e.getElementById(i))) return n;
            if (a.id === i) return n.push(a), n;
          } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i) return n.push(a), n;
        } else {
          if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
          if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName) return H.apply(n, e.getElementsByClassName(i)), n;
        }

        if (d.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
          if (c = t, f = e, 1 === p && (U.test(t) || z.test(t))) {
            (f = ee.test(t) && ye(e.parentNode) || e) === e && d.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = S)), o = (l = h(t)).length;

            while (o--) {
              l[o] = (s ? "#" + s : ":scope") + " " + xe(l[o]);
            }

            c = l.join(",");
          }

          try {
            return H.apply(n, f.querySelectorAll(c)), n;
          } catch (e) {
            N(t, !0);
          } finally {
            s === S && e.removeAttribute("id");
          }
        }
      }

      return g(t.replace($, "$1"), e, n, r);
    }

    function ue() {
      var r = [];
      return function e(t, n) {
        return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n;
      };
    }

    function le(e) {
      return e[S] = !0, e;
    }

    function ce(e) {
      var t = C.createElement("fieldset");

      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null;
      }
    }

    function fe(e, t) {
      var n = e.split("|"),
          r = n.length;

      while (r--) {
        b.attrHandle[n[r]] = t;
      }
    }

    function pe(e, t) {
      var n = t && e,
          r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
      if (r) return r;
      if (n) while (n = n.nextSibling) {
        if (n === t) return -1;
      }
      return e ? 1 : -1;
    }

    function de(t) {
      return function (e) {
        return "input" === e.nodeName.toLowerCase() && e.type === t;
      };
    }

    function he(n) {
      return function (e) {
        var t = e.nodeName.toLowerCase();
        return ("input" === t || "button" === t) && e.type === n;
      };
    }

    function ge(t) {
      return function (e) {
        return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label" in e && e.disabled === t;
      };
    }

    function ve(a) {
      return le(function (o) {
        return o = +o, le(function (e, t) {
          var n,
              r = a([], e.length, o),
              i = r.length;

          while (i--) {
            e[n = r[i]] && (e[n] = !(t[n] = e[n]));
          }
        });
      });
    }

    function ye(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e;
    }

    for (e in d = se.support = {}, i = se.isXML = function (e) {
      var t = e && e.namespaceURI,
          n = e && (e.ownerDocument || e).documentElement;
      return !Y.test(t || n && n.nodeName || "HTML");
    }, T = se.setDocument = function (e) {
      var t,
          n,
          r = e ? e.ownerDocument || e : p;
      return r != C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement, E = !i(C), p != C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)), d.scope = ce(function (e) {
        return a.appendChild(e).appendChild(C.createElement("div")), "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length;
      }), d.attributes = ce(function (e) {
        return e.className = "i", !e.getAttribute("className");
      }), d.getElementsByTagName = ce(function (e) {
        return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length;
      }), d.getElementsByClassName = K.test(C.getElementsByClassName), d.getById = ce(function (e) {
        return a.appendChild(e).id = S, !C.getElementsByName || !C.getElementsByName(S).length;
      }), d.getById ? (b.filter.ID = function (e) {
        var t = e.replace(te, ne);
        return function (e) {
          return e.getAttribute("id") === t;
        };
      }, b.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && E) {
          var n = t.getElementById(e);
          return n ? [n] : [];
        }
      }) : (b.filter.ID = function (e) {
        var n = e.replace(te, ne);
        return function (e) {
          var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
          return t && t.value === n;
        };
      }, b.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && E) {
          var n,
              r,
              i,
              o = t.getElementById(e);

          if (o) {
            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
            i = t.getElementsByName(e), r = 0;

            while (o = i[r++]) {
              if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
            }
          }

          return [];
        }
      }), b.find.TAG = d.getElementsByTagName ? function (e, t) {
        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0;
      } : function (e, t) {
        var n,
            r = [],
            i = 0,
            o = t.getElementsByTagName(e);

        if ("*" === e) {
          while (n = o[i++]) {
            1 === n.nodeType && r.push(n);
          }

          return r;
        }

        return o;
      }, b.find.CLASS = d.getElementsByClassName && function (e, t) {
        if ("undefined" != typeof t.getElementsByClassName && E) return t.getElementsByClassName(e);
      }, s = [], v = [], (d.qsa = K.test(C.querySelectorAll)) && (ce(function (e) {
        var t;
        a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="), (t = C.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]");
      }), ce(function (e) {
        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
        var t = C.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:");
      })), (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function (e) {
        d.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", F);
      }), v = v.length && new RegExp(v.join("|")), s = s.length && new RegExp(s.join("|")), t = K.test(a.compareDocumentPosition), y = t || K.test(a.contains) ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;
        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
      } : function (e, t) {
        if (t) while (t = t.parentNode) {
          if (t === e) return !0;
        }
        return !1;
      }, j = t ? function (e, t) {
        if (e === t) return l = !0, 0;
        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == p && y(p, e) ? -1 : t == C || t.ownerDocument == p && y(p, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1);
      } : function (e, t) {
        if (e === t) return l = !0, 0;
        var n,
            r = 0,
            i = e.parentNode,
            o = t.parentNode,
            a = [e],
            s = [t];
        if (!i || !o) return e == C ? -1 : t == C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
        if (i === o) return pe(e, t);
        n = e;

        while (n = n.parentNode) {
          a.unshift(n);
        }

        n = t;

        while (n = n.parentNode) {
          s.unshift(n);
        }

        while (a[r] === s[r]) {
          r++;
        }

        return r ? pe(a[r], s[r]) : a[r] == p ? -1 : s[r] == p ? 1 : 0;
      }), C;
    }, se.matches = function (e, t) {
      return se(e, null, null, t);
    }, se.matchesSelector = function (e, t) {
      if (T(e), d.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t))) try {
        var n = c.call(e, t);
        if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
      } catch (e) {
        N(t, !0);
      }
      return 0 < se(t, C, null, [e]).length;
    }, se.contains = function (e, t) {
      return (e.ownerDocument || e) != C && T(e), y(e, t);
    }, se.attr = function (e, t) {
      (e.ownerDocument || e) != C && T(e);
      var n = b.attrHandle[t.toLowerCase()],
          r = n && D.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
      return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }, se.escape = function (e) {
      return (e + "").replace(re, ie);
    }, se.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }, se.uniqueSort = function (e) {
      var t,
          n = [],
          r = 0,
          i = 0;

      if (l = !d.detectDuplicates, u = !d.sortStable && e.slice(0), e.sort(j), l) {
        while (t = e[i++]) {
          t === e[i] && (r = n.push(i));
        }

        while (r--) {
          e.splice(n[r], 1);
        }
      }

      return u = null, e;
    }, o = se.getText = function (e) {
      var t,
          n = "",
          r = 0,
          i = e.nodeType;

      if (i) {
        if (1 === i || 9 === i || 11 === i) {
          if ("string" == typeof e.textContent) return e.textContent;

          for (e = e.firstChild; e; e = e.nextSibling) {
            n += o(e);
          }
        } else if (3 === i || 4 === i) return e.nodeValue;
      } else while (t = e[r++]) {
        n += o(t);
      }

      return n;
    }, (b = se.selectors = {
      cacheLength: 50,
      createPseudo: le,
      match: G,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function ATTR(e) {
          return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
        },
        CHILD: function CHILD(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e;
        },
        PSEUDO: function PSEUDO(e) {
          var t,
              n = !e[6] && e[2];
          return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
        }
      },
      filter: {
        TAG: function TAG(e) {
          var t = e.replace(te, ne).toLowerCase();
          return "*" === e ? function () {
            return !0;
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t;
          };
        },
        CLASS: function CLASS(e) {
          var t = m[e + " "];
          return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && m(e, function (e) {
            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
          });
        },
        ATTR: function ATTR(n, r, i) {
          return function (e) {
            var t = se.attr(e, n);
            return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"));
          };
        },
        CHILD: function CHILD(h, e, t, g, v) {
          var y = "nth" !== h.slice(0, 3),
              m = "last" !== h.slice(-4),
              x = "of-type" === e;
          return 1 === g && 0 === v ? function (e) {
            return !!e.parentNode;
          } : function (e, t, n) {
            var r,
                i,
                o,
                a,
                s,
                u,
                l = y !== m ? "nextSibling" : "previousSibling",
                c = e.parentNode,
                f = x && e.nodeName.toLowerCase(),
                p = !n && !x,
                d = !1;

            if (c) {
              if (y) {
                while (l) {
                  a = e;

                  while (a = a[l]) {
                    if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
                  }

                  u = l = "only" === h && !u && "nextSibling";
                }

                return !0;
              }

              if (u = [m ? c.firstChild : c.lastChild], m && p) {
                d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2], a = s && c.childNodes[s];

                while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) {
                  if (1 === a.nodeType && ++d && a === e) {
                    i[h] = [k, s, d];
                    break;
                  }
                }
              } else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]), !1 === d) while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) {
                if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [k, d]), a === e)) break;
              }

              return (d -= v) === g || d % g == 0 && 0 <= d / g;
            }
          };
        },
        PSEUDO: function PSEUDO(e, o) {
          var t,
              a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
          return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function (e, t) {
            var n,
                r = a(e, o),
                i = r.length;

            while (i--) {
              e[n = P(e, r[i])] = !(t[n] = r[i]);
            }
          }) : function (e) {
            return a(e, 0, t);
          }) : a;
        }
      },
      pseudos: {
        not: le(function (e) {
          var r = [],
              i = [],
              s = f(e.replace($, "$1"));
          return s[S] ? le(function (e, t, n, r) {
            var i,
                o = s(e, null, r, []),
                a = e.length;

            while (a--) {
              (i = o[a]) && (e[a] = !(t[a] = i));
            }
          }) : function (e, t, n) {
            return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop();
          };
        }),
        has: le(function (t) {
          return function (e) {
            return 0 < se(t, e).length;
          };
        }),
        contains: le(function (t) {
          return t = t.replace(te, ne), function (e) {
            return -1 < (e.textContent || o(e)).indexOf(t);
          };
        }),
        lang: le(function (n) {
          return V.test(n || "") || se.error("unsupported lang: " + n), n = n.replace(te, ne).toLowerCase(), function (e) {
            var t;

            do {
              if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
            } while ((e = e.parentNode) && 1 === e.nodeType);

            return !1;
          };
        }),
        target: function target(e) {
          var t = n.location && n.location.hash;
          return t && t.slice(1) === e.id;
        },
        root: function root(e) {
          return e === a;
        },
        focus: function focus(e) {
          return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
        },
        enabled: ge(!1),
        disabled: ge(!0),
        checked: function checked(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected;
        },
        selected: function selected(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
        },
        empty: function empty(e) {
          for (e = e.firstChild; e; e = e.nextSibling) {
            if (e.nodeType < 6) return !1;
          }

          return !0;
        },
        parent: function parent(e) {
          return !b.pseudos.empty(e);
        },
        header: function header(e) {
          return J.test(e.nodeName);
        },
        input: function input(e) {
          return Q.test(e.nodeName);
        },
        button: function button(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t;
        },
        text: function text(e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
        },
        first: ve(function () {
          return [0];
        }),
        last: ve(function (e, t) {
          return [t - 1];
        }),
        eq: ve(function (e, t, n) {
          return [n < 0 ? n + t : n];
        }),
        even: ve(function (e, t) {
          for (var n = 0; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        odd: ve(function (e, t) {
          for (var n = 1; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        lt: ve(function (e, t, n) {
          for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) {
            e.push(r);
          }

          return e;
        }),
        gt: ve(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; ++r < t;) {
            e.push(r);
          }

          return e;
        })
      }
    }).pseudos.nth = b.pseudos.eq, {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) {
      b.pseudos[e] = de(e);
    }

    for (e in {
      submit: !0,
      reset: !0
    }) {
      b.pseudos[e] = he(e);
    }

    function me() {}

    function xe(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++) {
        r += e[t].value;
      }

      return r;
    }

    function be(s, e, t) {
      var u = e.dir,
          l = e.next,
          c = l || u,
          f = t && "parentNode" === c,
          p = r++;
      return e.first ? function (e, t, n) {
        while (e = e[u]) {
          if (1 === e.nodeType || f) return s(e, t, n);
        }

        return !1;
      } : function (e, t, n) {
        var r,
            i,
            o,
            a = [k, p];

        if (n) {
          while (e = e[u]) {
            if ((1 === e.nodeType || f) && s(e, t, n)) return !0;
          }
        } else while (e = e[u]) {
          if (1 === e.nodeType || f) if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[u] || e;else {
            if ((r = i[c]) && r[0] === k && r[1] === p) return a[2] = r[2];
            if ((i[c] = a)[2] = s(e, t, n)) return !0;
          }
        }

        return !1;
      };
    }

    function we(i) {
      return 1 < i.length ? function (e, t, n) {
        var r = i.length;

        while (r--) {
          if (!i[r](e, t, n)) return !1;
        }

        return !0;
      } : i[0];
    }

    function Te(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) {
        (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
      }

      return a;
    }

    function Ce(d, h, g, v, y, e) {
      return v && !v[S] && (v = Ce(v)), y && !y[S] && (y = Ce(y, e)), le(function (e, t, n, r) {
        var i,
            o,
            a,
            s = [],
            u = [],
            l = t.length,
            c = e || function (e, t, n) {
          for (var r = 0, i = t.length; r < i; r++) {
            se(e, t[r], n);
          }

          return n;
        }(h || "*", n.nodeType ? [n] : n, []),
            f = !d || !e && h ? c : Te(c, s, d, n, r),
            p = g ? y || (e ? d : l || v) ? [] : t : f;

        if (g && g(f, p, n, r), v) {
          i = Te(p, u), v(i, [], n, r), o = i.length;

          while (o--) {
            (a = i[o]) && (p[u[o]] = !(f[u[o]] = a));
          }
        }

        if (e) {
          if (y || d) {
            if (y) {
              i = [], o = p.length;

              while (o--) {
                (a = p[o]) && i.push(f[o] = a);
              }

              y(null, p = [], i, r);
            }

            o = p.length;

            while (o--) {
              (a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a));
            }
          }
        } else p = Te(p === t ? p.splice(l, p.length) : p), y ? y(null, t, p, r) : H.apply(t, p);
      });
    }

    function Ee(e) {
      for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function (e) {
        return e === i;
      }, a, !0), l = be(function (e) {
        return -1 < P(i, e);
      }, a, !0), c = [function (e, t, n) {
        var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
        return i = null, r;
      }]; s < r; s++) {
        if (t = b.relative[e[s].type]) c = [be(we(c), t)];else {
          if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
            for (n = ++s; n < r; n++) {
              if (b.relative[e[n].type]) break;
            }

            return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
              value: " " === e[s - 2].type ? "*" : ""
            })).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e));
          }

          c.push(t);
        }
      }

      return we(c);
    }

    return me.prototype = b.filters = b.pseudos, b.setFilters = new me(), h = se.tokenize = function (e, t) {
      var n,
          r,
          i,
          o,
          a,
          s,
          u,
          l = x[e + " "];
      if (l) return t ? 0 : l.slice(0);
      a = e, s = [], u = b.preFilter;

      while (a) {
        for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = z.exec(a)) && (n = r.shift(), i.push({
          value: n,
          type: r[0].replace($, " ")
        }), a = a.slice(n.length)), b.filter) {
          !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
            value: n,
            type: o,
            matches: r
          }), a = a.slice(n.length));
        }

        if (!n) break;
      }

      return t ? a.length : a ? se.error(e) : x(e, s).slice(0);
    }, f = se.compile = function (e, t) {
      var n,
          v,
          y,
          m,
          x,
          r,
          i = [],
          o = [],
          a = A[e + " "];

      if (!a) {
        t || (t = h(e)), n = t.length;

        while (n--) {
          (a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
        }

        (a = A(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function r(e, t, n, _r, i) {
          var o,
              a,
              s,
              u = 0,
              l = "0",
              c = e && [],
              f = [],
              p = w,
              d = e || x && b.find.TAG("*", i),
              h = k += null == p ? 1 : Math.random() || .1,
              g = d.length;

          for (i && (w = t == C || t || i); l !== g && null != (o = d[l]); l++) {
            if (x && o) {
              a = 0, t || o.ownerDocument == C || (T(o), n = !E);

              while (s = v[a++]) {
                if (s(o, t || C, n)) {
                  _r.push(o);

                  break;
                }
              }

              i && (k = h);
            }

            m && ((o = !s && o) && u--, e && c.push(o));
          }

          if (u += l, m && l !== u) {
            a = 0;

            while (s = y[a++]) {
              s(c, f, t, n);
            }

            if (e) {
              if (0 < u) while (l--) {
                c[l] || f[l] || (f[l] = q.call(_r));
              }
              f = Te(f);
            }

            H.apply(_r, f), i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(_r);
          }

          return i && (k = h, w = p), c;
        }, m ? le(r) : r))).selector = e;
      }

      return a;
    }, g = se.select = function (e, t, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l = "function" == typeof e && e,
          c = !r && h(e = l.selector || e);

      if (n = n || [], 1 === c.length) {
        if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
          if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0])) return n;
          l && (t = t.parentNode), e = e.slice(o.shift().value.length);
        }

        i = G.needsContext.test(e) ? 0 : o.length;

        while (i--) {
          if (a = o[i], b.relative[s = a.type]) break;

          if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
            if (o.splice(i, 1), !(e = r.length && xe(o))) return H.apply(n, r), n;
            break;
          }
        }
      }

      return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t), n;
    }, d.sortStable = S.split("").sort(j).join("") === S, d.detectDuplicates = !!l, T(), d.sortDetached = ce(function (e) {
      return 1 & e.compareDocumentPosition(C.createElement("fieldset"));
    }), ce(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
    }) || fe("type|href|height|width", function (e, t, n) {
      if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
    }), d.attributes && ce(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
    }) || fe("value", function (e, t, n) {
      if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
    }), ce(function (e) {
      return null == e.getAttribute("disabled");
    }) || fe(R, function (e, t, n) {
      var r;
      if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }), se;
  }(C);

  S.find = d, S.expr = d.selectors, S.expr[":"] = S.expr.pseudos, S.uniqueSort = S.unique = d.uniqueSort, S.text = d.getText, S.isXMLDoc = d.isXML, S.contains = d.contains, S.escapeSelector = d.escape;

  var h = function h(e, t, n) {
    var r = [],
        i = void 0 !== n;

    while ((e = e[t]) && 9 !== e.nodeType) {
      if (1 === e.nodeType) {
        if (i && S(e).is(n)) break;
        r.push(e);
      }
    }

    return r;
  },
      T = function T(e, t) {
    for (var n = []; e; e = e.nextSibling) {
      1 === e.nodeType && e !== t && n.push(e);
    }

    return n;
  },
      k = S.expr.match.needsContext;

  function A(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }

  var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

  function j(e, n, r) {
    return m(n) ? S.grep(e, function (e, t) {
      return !!n.call(e, t, e) !== r;
    }) : n.nodeType ? S.grep(e, function (e) {
      return e === n !== r;
    }) : "string" != typeof n ? S.grep(e, function (e) {
      return -1 < i.call(n, e) !== r;
    }) : S.filter(n, e, r);
  }

  S.filter = function (e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function (e) {
      return 1 === e.nodeType;
    }));
  }, S.fn.extend({
    find: function find(e) {
      var t,
          n,
          r = this.length,
          i = this;
      if ("string" != typeof e) return this.pushStack(S(e).filter(function () {
        for (t = 0; t < r; t++) {
          if (S.contains(i[t], this)) return !0;
        }
      }));

      for (n = this.pushStack([]), t = 0; t < r; t++) {
        S.find(e, i[t], n);
      }

      return 1 < r ? S.uniqueSort(n) : n;
    },
    filter: function filter(e) {
      return this.pushStack(j(this, e || [], !1));
    },
    not: function not(e) {
      return this.pushStack(j(this, e || [], !0));
    },
    is: function is(e) {
      return !!j(this, "string" == typeof e && k.test(e) ? S(e) : e || [], !1).length;
    }
  });
  var D,
      q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (S.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;

    if (n = n || D, "string" == typeof e) {
      if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : q.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);

      if (r[1]) {
        if (t = t instanceof S ? t[0] : t, S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), N.test(r[1]) && S.isPlainObject(t)) for (r in t) {
          m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        }
        return this;
      }

      return (i = E.getElementById(r[2])) && (this[0] = i, this.length = 1), this;
    }

    return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this);
  }).prototype = S.fn, D = S(E);
  var L = /^(?:parents|prev(?:Until|All))/,
      H = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };

  function O(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType) {
      ;
    }

    return e;
  }

  S.fn.extend({
    has: function has(e) {
      var t = S(e, this),
          n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) {
          if (S.contains(this, t[e])) return !0;
        }
      });
    },
    closest: function closest(e, t) {
      var n,
          r = 0,
          i = this.length,
          o = [],
          a = "string" != typeof e && S(e);
      if (!k.test(e)) for (; r < i; r++) {
        for (n = this[r]; n && n !== t; n = n.parentNode) {
          if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
            o.push(n);
            break;
          }
        }
      }
      return this.pushStack(1 < o.length ? S.uniqueSort(o) : o);
    },
    index: function index(e) {
      return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function add(e, t) {
      return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))));
    },
    addBack: function addBack(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }
  }), S.each({
    parent: function parent(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null;
    },
    parents: function parents(e) {
      return h(e, "parentNode");
    },
    parentsUntil: function parentsUntil(e, t, n) {
      return h(e, "parentNode", n);
    },
    next: function next(e) {
      return O(e, "nextSibling");
    },
    prev: function prev(e) {
      return O(e, "previousSibling");
    },
    nextAll: function nextAll(e) {
      return h(e, "nextSibling");
    },
    prevAll: function prevAll(e) {
      return h(e, "previousSibling");
    },
    nextUntil: function nextUntil(e, t, n) {
      return h(e, "nextSibling", n);
    },
    prevUntil: function prevUntil(e, t, n) {
      return h(e, "previousSibling", n);
    },
    siblings: function siblings(e) {
      return T((e.parentNode || {}).firstChild, e);
    },
    children: function children(e) {
      return T(e.firstChild);
    },
    contents: function contents(e) {
      return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e), S.merge([], e.childNodes));
    }
  }, function (r, i) {
    S.fn[r] = function (e, t) {
      var n = S.map(this, i, e);
      return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = S.filter(t, n)), 1 < this.length && (H[r] || S.uniqueSort(n), L.test(r) && n.reverse()), this.pushStack(n);
    };
  });
  var P = /[^\x20\t\r\n\f]+/g;

  function R(e) {
    return e;
  }

  function M(e) {
    throw e;
  }

  function I(e, t, n, r) {
    var i;

    try {
      e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }

  S.Callbacks = function (r) {
    var e, n;
    r = "string" == typeof r ? (e = r, n = {}, S.each(e.match(P) || [], function (e, t) {
      n[t] = !0;
    }), n) : S.extend({}, r);

    var i,
        t,
        o,
        a,
        s = [],
        u = [],
        l = -1,
        c = function c() {
      for (a = a || r.once, o = i = !0; u.length; l = -1) {
        t = u.shift();

        while (++l < s.length) {
          !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1);
        }
      }

      r.memory || (t = !1), i = !1, a && (s = t ? [] : "");
    },
        f = {
      add: function add() {
        return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) {
          S.each(e, function (e, t) {
            m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t);
          });
        }(arguments), t && !i && c()), this;
      },
      remove: function remove() {
        return S.each(arguments, function (e, t) {
          var n;

          while (-1 < (n = S.inArray(t, s, n))) {
            s.splice(n, 1), n <= l && l--;
          }
        }), this;
      },
      has: function has(e) {
        return e ? -1 < S.inArray(e, s) : 0 < s.length;
      },
      empty: function empty() {
        return s && (s = []), this;
      },
      disable: function disable() {
        return a = u = [], s = t = "", this;
      },
      disabled: function disabled() {
        return !s;
      },
      lock: function lock() {
        return a = u = [], t || i || (s = t = ""), this;
      },
      locked: function locked() {
        return !!a;
      },
      fireWith: function fireWith(e, t) {
        return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this;
      },
      fire: function fire() {
        return f.fireWith(this, arguments), this;
      },
      fired: function fired() {
        return !!o;
      }
    };

    return f;
  }, S.extend({
    Deferred: function Deferred(e) {
      var o = [["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2], ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]],
          i = "pending",
          a = {
        state: function state() {
          return i;
        },
        always: function always() {
          return s.done(arguments).fail(arguments), this;
        },
        "catch": function _catch(e) {
          return a.then(null, e);
        },
        pipe: function pipe() {
          var i = arguments;
          return S.Deferred(function (r) {
            S.each(o, function (e, t) {
              var n = m(i[t[4]]) && i[t[4]];
              s[t[1]](function () {
                var e = n && n.apply(this, arguments);
                e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments);
              });
            }), i = null;
          }).promise();
        },
        then: function then(t, n, r) {
          var u = 0;

          function l(i, o, a, s) {
            return function () {
              var n = this,
                  r = arguments,
                  e = function e() {
                var e, t;

                if (!(i < u)) {
                  if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                  t = e && ("object" == _typeof(e) || "function" == typeof e) && e.then, m(t) ? s ? t.call(e, l(u, o, R, s), l(u, o, M, s)) : (u++, t.call(e, l(u, o, R, s), l(u, o, M, s), l(u, o, R, o.notifyWith))) : (a !== R && (n = void 0, r = [e]), (s || o.resolveWith)(n, r));
                }
              },
                  t = s ? e : function () {
                try {
                  e();
                } catch (e) {
                  S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== M && (n = void 0, r = [e]), o.rejectWith(n, r));
                }
              };

              i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()), C.setTimeout(t));
            };
          }

          return S.Deferred(function (e) {
            o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)), o[1][3].add(l(0, e, m(t) ? t : R)), o[2][3].add(l(0, e, m(n) ? n : M));
          }).promise();
        },
        promise: function promise(e) {
          return null != e ? S.extend(e, a) : a;
        }
      },
          s = {};
      return S.each(o, function (e, t) {
        var n = t[2],
            r = t[5];
        a[t[1]] = n.add, r && n.add(function () {
          i = r;
        }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function () {
          return s[t[0] + "With"](this === s ? void 0 : this, arguments), this;
        }, s[t[0] + "With"] = n.fireWith;
      }), a.promise(s), e && e.call(s, s), s;
    },
    when: function when(e) {
      var n = arguments.length,
          t = n,
          r = Array(t),
          i = s.call(arguments),
          o = S.Deferred(),
          a = function a(t) {
        return function (e) {
          r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i);
        };
      };

      if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || m(i[t] && i[t].then))) return o.then();

      while (t--) {
        I(i[t], a(t), o.reject);
      }

      return o.promise();
    }
  });
  var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  S.Deferred.exceptionHook = function (e, t) {
    C.console && C.console.warn && e && W.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
  }, S.readyException = function (e) {
    C.setTimeout(function () {
      throw e;
    });
  };
  var F = S.Deferred();

  function B() {
    E.removeEventListener("DOMContentLoaded", B), C.removeEventListener("load", B), S.ready();
  }

  S.fn.ready = function (e) {
    return F.then(e)["catch"](function (e) {
      S.readyException(e);
    }), this;
  }, S.extend({
    isReady: !1,
    readyWait: 1,
    ready: function ready(e) {
      (!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [S]);
    }
  }), S.ready.then = F.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B), C.addEventListener("load", B));

  var $ = function $(e, t, n, r, i, o, a) {
    var s = 0,
        u = e.length,
        l = null == n;
    if ("object" === w(n)) for (s in i = !0, n) {
      $(e, t, s, n[s], !0, o, a);
    } else if (void 0 !== r && (i = !0, m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
      return l.call(S(e), n);
    })), t)) for (; s < u; s++) {
      t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
    }
    return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
  },
      _ = /^-ms-/,
      z = /-([a-z])/g;

  function U(e, t) {
    return t.toUpperCase();
  }

  function X(e) {
    return e.replace(_, "ms-").replace(z, U);
  }

  var V = function V(e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };

  function G() {
    this.expando = S.expando + G.uid++;
  }

  G.uid = 1, G.prototype = {
    cache: function cache(e) {
      var t = e[this.expando];
      return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
        value: t,
        configurable: !0
      }))), t;
    },
    set: function set(e, t, n) {
      var r,
          i = this.cache(e);
      if ("string" == typeof t) i[X(t)] = n;else for (r in t) {
        i[X(r)] = t[r];
      }
      return i;
    },
    get: function get(e, t) {
      return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)];
    },
    access: function access(e, t, n) {
      return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
    },
    remove: function remove(e, t) {
      var n,
          r = e[this.expando];

      if (void 0 !== r) {
        if (void 0 !== t) {
          n = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in r ? [t] : t.match(P) || []).length;

          while (n--) {
            delete r[t[n]];
          }
        }

        (void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
      }
    },
    hasData: function hasData(e) {
      var t = e[this.expando];
      return void 0 !== t && !S.isEmptyObject(t);
    }
  };
  var Y = new G(),
      Q = new G(),
      J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      K = /[A-Z]/g;

  function Z(e, t, n) {
    var r, i;
    if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
      try {
        n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i);
      } catch (e) {}

      Q.set(e, t, n);
    } else n = void 0;
    return n;
  }

  S.extend({
    hasData: function hasData(e) {
      return Q.hasData(e) || Y.hasData(e);
    },
    data: function data(e, t, n) {
      return Q.access(e, t, n);
    },
    removeData: function removeData(e, t) {
      Q.remove(e, t);
    },
    _data: function _data(e, t, n) {
      return Y.access(e, t, n);
    },
    _removeData: function _removeData(e, t) {
      Y.remove(e, t);
    }
  }), S.fn.extend({
    data: function data(n, e) {
      var t,
          r,
          i,
          o = this[0],
          a = o && o.attributes;

      if (void 0 === n) {
        if (this.length && (i = Q.get(o), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
          t = a.length;

          while (t--) {
            a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = X(r.slice(5)), Z(o, r, i[r]));
          }

          Y.set(o, "hasDataAttrs", !0);
        }

        return i;
      }

      return "object" == _typeof(n) ? this.each(function () {
        Q.set(this, n);
      }) : $(this, function (e) {
        var t;
        if (o && void 0 === e) return void 0 !== (t = Q.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0;
        this.each(function () {
          Q.set(this, n, e);
        });
      }, null, e, 1 < arguments.length, null, !0);
    },
    removeData: function removeData(e) {
      return this.each(function () {
        Q.remove(this, e);
      });
    }
  }), S.extend({
    queue: function queue(e, t, n) {
      var r;
      if (e) return t = (t || "fx") + "queue", r = Y.get(e, t), n && (!r || Array.isArray(n) ? r = Y.access(e, t, S.makeArray(n)) : r.push(n)), r || [];
    },
    dequeue: function dequeue(e, t) {
      t = t || "fx";

      var n = S.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = S._queueHooks(e, t);

      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
        S.dequeue(e, t);
      }, o)), !r && o && o.empty.fire();
    },
    _queueHooks: function _queueHooks(e, t) {
      var n = t + "queueHooks";
      return Y.get(e, n) || Y.access(e, n, {
        empty: S.Callbacks("once memory").add(function () {
          Y.remove(e, [t + "queue", n]);
        })
      });
    }
  }), S.fn.extend({
    queue: function queue(t, n) {
      var e = 2;
      return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each(function () {
        var e = S.queue(this, t, n);
        S._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t);
      });
    },
    dequeue: function dequeue(e) {
      return this.each(function () {
        S.dequeue(this, e);
      });
    },
    clearQueue: function clearQueue(e) {
      return this.queue(e || "fx", []);
    },
    promise: function promise(e, t) {
      var n,
          r = 1,
          i = S.Deferred(),
          o = this,
          a = this.length,
          s = function s() {
        --r || i.resolveWith(o, [o]);
      };

      "string" != typeof e && (t = e, e = void 0), e = e || "fx";

      while (a--) {
        (n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
      }

      return s(), i.promise(t);
    }
  });

  var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
      ne = ["Top", "Right", "Bottom", "Left"],
      re = E.documentElement,
      ie = function ie(e) {
    return S.contains(e.ownerDocument, e);
  },
      oe = {
    composed: !0
  };

  re.getRootNode && (ie = function ie(e) {
    return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument;
  });

  var ae = function ae(e, t) {
    return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === S.css(e, "display");
  };

  function se(e, t, n, r) {
    var i,
        o,
        a = 20,
        s = r ? function () {
      return r.cur();
    } : function () {
      return S.css(e, t, "");
    },
        u = s(),
        l = n && n[3] || (S.cssNumber[t] ? "" : "px"),
        c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && te.exec(S.css(e, t));

    if (c && c[3] !== l) {
      u /= 2, l = l || c[3], c = +u || 1;

      while (a--) {
        S.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
      }

      c *= 2, S.style(e, t, c + l), n = n || [];
    }

    return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
  }

  var ue = {};

  function le(e, t) {
    for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++) {
      (r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = Y.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = ue[s]) || (o = a.body.appendChild(a.createElement(s)), u = S.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), ue[s] = u)))) : "none" !== n && (l[c] = "none", Y.set(r, "display", n)));
    }

    for (c = 0; c < f; c++) {
      null != l[c] && (e[c].style.display = l[c]);
    }

    return e;
  }

  S.fn.extend({
    show: function show() {
      return le(this, !0);
    },
    hide: function hide() {
      return le(this);
    },
    toggle: function toggle(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        ae(this) ? S(this).show() : S(this).hide();
      });
    }
  });
  var ce,
      fe,
      pe = /^(?:checkbox|radio)$/i,
      de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      he = /^$|^module$|\/(?:java|ecma)script/i;
  ce = E.createDocumentFragment().appendChild(E.createElement("div")), (fe = E.createElement("input")).setAttribute("type", "radio"), fe.setAttribute("checked", "checked"), fe.setAttribute("name", "t"), ce.appendChild(fe), y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue, ce.innerHTML = "<option></option>", y.option = !!ce.lastChild;
  var ge = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };

  function ve(e, t) {
    var n;
    return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && A(e, t) ? S.merge([e], n) : n;
  }

  function ye(e, t) {
    for (var n = 0, r = e.length; n < r; n++) {
      Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"));
    }
  }

  ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, y.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
  var me = /<|&#?\w+;/;

  function xe(e, t, n, r, i) {
    for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++) {
      if ((o = e[d]) || 0 === o) if ("object" === w(o)) S.merge(p, o.nodeType ? [o] : o);else if (me.test(o)) {
        a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2], c = u[0];

        while (c--) {
          a = a.lastChild;
        }

        S.merge(p, a.childNodes), (a = f.firstChild).textContent = "";
      } else p.push(t.createTextNode(o));
    }

    f.textContent = "", d = 0;

    while (o = p[d++]) {
      if (r && -1 < S.inArray(o, r)) i && i.push(o);else if (l = ie(o), a = ve(f.appendChild(o), "script"), l && ye(a), n) {
        c = 0;

        while (o = a[c++]) {
          he.test(o.type || "") && n.push(o);
        }
      }
    }

    return f;
  }

  var be = /^([^.]*)(?:\.(.+)|)/;

  function we() {
    return !0;
  }

  function Te() {
    return !1;
  }

  function Ce(e, t) {
    return e === function () {
      try {
        return E.activeElement;
      } catch (e) {}
    }() == ("focus" === t);
  }

  function Ee(e, t, n, r, i, o) {
    var a, s;

    if ("object" == _typeof(t)) {
      for (s in "string" != typeof n && (r = r || n, n = void 0), t) {
        Ee(e, s, n, r, t[s], o);
      }

      return e;
    }

    if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Te;else if (!i) return e;
    return 1 === o && (a = i, (i = function i(e) {
      return S().off(e), a.apply(this, arguments);
    }).guid = a.guid || (a.guid = S.guid++)), e.each(function () {
      S.event.add(this, t, i, r, n);
    });
  }

  function Se(e, i, o) {
    o ? (Y.set(e, i, !1), S.event.add(e, i, {
      namespace: !1,
      handler: function handler(e) {
        var t,
            n,
            r = Y.get(this, i);

        if (1 & e.isTrigger && this[i]) {
          if (r.length) (S.event.special[i] || {}).delegateType && e.stopPropagation();else if (r = s.call(arguments), Y.set(this, i, r), t = o(this, i), this[i](), r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {}, r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n && n.value;
        } else r.length && (Y.set(this, i, {
          value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
        }), e.stopImmediatePropagation());
      }
    })) : void 0 === Y.get(e, i) && S.event.add(e, i, we);
  }

  S.event = {
    global: {},
    add: function add(t, e, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          v = Y.get(t);

      if (V(t)) {
        n.handler && (n = (o = n).handler, i = o.selector), i && S.find.matchesSelector(re, i), n.guid || (n.guid = S.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function (e) {
          return "undefined" != typeof S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0;
        }), l = (e = (e || "").match(P) || [""]).length;

        while (l--) {
          d = g = (s = be.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = S.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = S.event.special[d] || {}, c = S.extend({
            type: d,
            origType: g,
            data: r,
            handler: n,
            guid: n.guid,
            selector: i,
            needsContext: i && S.expr.match.needsContext.test(i),
            namespace: h.join(".")
          }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), S.event.global[d] = !0);
        }
      }
    },
    remove: function remove(e, t, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          v = Y.hasData(e) && Y.get(e);

      if (v && (u = v.events)) {
        l = (t = (t || "").match(P) || [""]).length;

        while (l--) {
          if (d = g = (s = be.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
            f = S.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;

            while (o--) {
              c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
            }

            a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle), delete u[d]);
          } else for (d in u) {
            S.event.remove(e, d + t[l], n, r, !0);
          }
        }

        S.isEmptyObject(u) && Y.remove(e, "handle events");
      }
    },
    dispatch: function dispatch(e) {
      var t,
          n,
          r,
          i,
          o,
          a,
          s = new Array(arguments.length),
          u = S.event.fix(e),
          l = (Y.get(this, "events") || Object.create(null))[u.type] || [],
          c = S.event.special[u.type] || {};

      for (s[0] = u, t = 1; t < arguments.length; t++) {
        s[t] = arguments[t];
      }

      if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
        a = S.event.handlers.call(this, u, l), t = 0;

        while ((i = a[t++]) && !u.isPropagationStopped()) {
          u.currentTarget = i.elem, n = 0;

          while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) {
            u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()));
          }
        }

        return c.postDispatch && c.postDispatch.call(this, u), u.result;
      }
    },
    handlers: function handlers(e, t) {
      var n,
          r,
          i,
          o,
          a,
          s = [],
          u = t.delegateCount,
          l = e.target;
      if (u && l.nodeType && !("click" === e.type && 1 <= e.button)) for (; l !== this; l = l.parentNode || this) {
        if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
          for (o = [], a = {}, n = 0; n < u; n++) {
            void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [l]).length), a[i] && o.push(r);
          }

          o.length && s.push({
            elem: l,
            handlers: o
          });
        }
      }
      return l = this, u < t.length && s.push({
        elem: l,
        handlers: t.slice(u)
      }), s;
    },
    addProp: function addProp(t, e) {
      Object.defineProperty(S.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: m(e) ? function () {
          if (this.originalEvent) return e(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[t];
        },
        set: function set(e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e
          });
        }
      });
    },
    fix: function fix(e) {
      return e[S.expando] ? e : new S.Event(e);
    },
    special: {
      load: {
        noBubble: !0
      },
      click: {
        setup: function setup(e) {
          var t = this || e;
          return pe.test(t.type) && t.click && A(t, "input") && Se(t, "click", we), !1;
        },
        trigger: function trigger(e) {
          var t = this || e;
          return pe.test(t.type) && t.click && A(t, "input") && Se(t, "click"), !0;
        },
        _default: function _default(e) {
          var t = e.target;
          return pe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
        }
      }
    }
  }, S.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n);
  }, S.Event = function (e, t) {
    if (!(this instanceof S.Event)) return new S.Event(e, t);
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? we : Te, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && S.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[S.expando] = !0;
  }, S.Event.prototype = {
    constructor: S.Event,
    isDefaultPrevented: Te,
    isPropagationStopped: Te,
    isImmediatePropagationStopped: Te,
    isSimulated: !1,
    preventDefault: function preventDefault() {
      var e = this.originalEvent;
      this.isDefaultPrevented = we, e && !this.isSimulated && e.preventDefault();
    },
    stopPropagation: function stopPropagation() {
      var e = this.originalEvent;
      this.isPropagationStopped = we, e && !this.isSimulated && e.stopPropagation();
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = we, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
    }
  }, S.each({
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
    code: !0,
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
    which: !0
  }, S.event.addProp), S.each({
    focus: "focusin",
    blur: "focusout"
  }, function (e, t) {
    S.event.special[e] = {
      setup: function setup() {
        return Se(this, e, Ce), !1;
      },
      trigger: function trigger() {
        return Se(this, e), !0;
      },
      _default: function _default() {
        return !0;
      },
      delegateType: t
    };
  }), S.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, i) {
    S.event.special[e] = {
      delegateType: i,
      bindType: i,
      handle: function handle(e) {
        var t,
            n = e.relatedTarget,
            r = e.handleObj;
        return n && (n === this || S.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t;
      }
    };
  }), S.fn.extend({
    on: function on(e, t, n, r) {
      return Ee(this, e, t, n, r);
    },
    one: function one(e, t, n, r) {
      return Ee(this, e, t, n, r, 1);
    },
    off: function off(e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;

      if ("object" == _typeof(e)) {
        for (i in e) {
          this.off(i, t, e[i]);
        }

        return this;
      }

      return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Te), this.each(function () {
        S.event.remove(this, e, n, t);
      });
    }
  });
  var ke = /<script|<style|<link/i,
      Ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  function je(e, t) {
    return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e;
  }

  function De(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
  }

  function qe(e) {
    return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
  }

  function Le(e, t) {
    var n, r, i, o, a, s;

    if (1 === t.nodeType) {
      if (Y.hasData(e) && (s = Y.get(e).events)) for (i in Y.remove(t, "handle events"), s) {
        for (n = 0, r = s[i].length; n < r; n++) {
          S.event.add(t, i, s[i][n]);
        }
      }
      Q.hasData(e) && (o = Q.access(e), a = S.extend({}, o), Q.set(t, a));
    }
  }

  function He(n, r, i, o) {
    r = g(r);
    var e,
        t,
        a,
        s,
        u,
        l,
        c = 0,
        f = n.length,
        p = f - 1,
        d = r[0],
        h = m(d);
    if (h || 1 < f && "string" == typeof d && !y.checkClone && Ae.test(d)) return n.each(function (e) {
      var t = n.eq(e);
      h && (r[0] = d.call(this, e, t.html())), He(t, r, i, o);
    });

    if (f && (t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
      for (s = (a = S.map(ve(e, "script"), De)).length; c < f; c++) {
        u = e, c !== p && (u = S.clone(u, !0, !0), s && S.merge(a, ve(u, "script"))), i.call(n[c], u, c);
      }

      if (s) for (l = a[a.length - 1].ownerDocument, S.map(a, qe), c = 0; c < s; c++) {
        u = a[c], he.test(u.type || "") && !Y.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, {
          nonce: u.nonce || u.getAttribute("nonce")
        }, l) : b(u.textContent.replace(Ne, ""), u, l));
      }
    }

    return n;
  }

  function Oe(e, t, n) {
    for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++) {
      n || 1 !== r.nodeType || S.cleanData(ve(r)), r.parentNode && (n && ie(r) && ye(ve(r, "script")), r.parentNode.removeChild(r));
    }

    return e;
  }

  S.extend({
    htmlPrefilter: function htmlPrefilter(e) {
      return e;
    },
    clone: function clone(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c = e.cloneNode(!0),
          f = ie(e);
      if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e))) for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++) {
        s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
      }
      if (t) if (n) for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++) {
        Le(o[r], a[r]);
      } else Le(e, c);
      return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c;
    },
    cleanData: function cleanData(e) {
      for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++) {
        if (V(n)) {
          if (t = n[Y.expando]) {
            if (t.events) for (r in t.events) {
              i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
            }
            n[Y.expando] = void 0;
          }

          n[Q.expando] && (n[Q.expando] = void 0);
        }
      }
    }
  }), S.fn.extend({
    detach: function detach(e) {
      return Oe(this, e, !0);
    },
    remove: function remove(e) {
      return Oe(this, e);
    },
    text: function text(e) {
      return $(this, function (e) {
        return void 0 === e ? S.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
        });
      }, null, e, arguments.length);
    },
    append: function append() {
      return He(this, arguments, function (e) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || je(this, e).appendChild(e);
      });
    },
    prepend: function prepend() {
      return He(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = je(this, e);
          t.insertBefore(e, t.firstChild);
        }
      });
    },
    before: function before() {
      return He(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    },
    after: function after() {
      return He(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    },
    empty: function empty() {
      for (var e, t = 0; null != (e = this[t]); t++) {
        1 === e.nodeType && (S.cleanData(ve(e, !1)), e.textContent = "");
      }

      return this;
    },
    clone: function clone(e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return S.clone(this, e, t);
      });
    },
    html: function html(e) {
      return $(this, function (e) {
        var t = this[0] || {},
            n = 0,
            r = this.length;
        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;

        if ("string" == typeof e && !ke.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = S.htmlPrefilter(e);

          try {
            for (; n < r; n++) {
              1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)), t.innerHTML = e);
            }

            t = 0;
          } catch (e) {}
        }

        t && this.empty().append(e);
      }, null, e, arguments.length);
    },
    replaceWith: function replaceWith() {
      var n = [];
      return He(this, arguments, function (e) {
        var t = this.parentNode;
        S.inArray(this, n) < 0 && (S.cleanData(ve(this)), t && t.replaceChild(e, this));
      }, n);
    }
  }), S.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, a) {
    S.fn[e] = function (e) {
      for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++) {
        t = o === i ? this : this.clone(!0), S(r[o])[a](t), u.apply(n, t.get());
      }

      return this.pushStack(n);
    };
  });

  var Pe = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
      Re = function Re(e) {
    var t = e.ownerDocument.defaultView;
    return t && t.opener || (t = C), t.getComputedStyle(e);
  },
      Me = function Me(e, t, n) {
    var r,
        i,
        o = {};

    for (i in t) {
      o[i] = e.style[i], e.style[i] = t[i];
    }

    for (i in r = n.call(e), t) {
      e.style[i] = o[i];
    }

    return r;
  },
      Ie = new RegExp(ne.join("|"), "i");

  function We(e, t, n) {
    var r,
        i,
        o,
        a,
        s = e.style;
    return (n = n || Re(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = S.style(e, t)), !y.pixelBoxStyles() && Pe.test(a) && Ie.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a;
  }

  function Fe(e, t) {
    return {
      get: function get() {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      }
    };
  }

  !function () {
    function e() {
      if (l) {
        u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", re.appendChild(u).appendChild(l);
        var e = C.getComputedStyle(l);
        n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), re.removeChild(u), l = null;
      }
    }

    function t(e) {
      return Math.round(parseFloat(e));
    }

    var n,
        r,
        i,
        o,
        a,
        s,
        u = E.createElement("div"),
        l = E.createElement("div");
    l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === l.style.backgroundClip, S.extend(y, {
      boxSizingReliable: function boxSizingReliable() {
        return e(), r;
      },
      pixelBoxStyles: function pixelBoxStyles() {
        return e(), o;
      },
      pixelPosition: function pixelPosition() {
        return e(), n;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        return e(), s;
      },
      scrollboxSize: function scrollboxSize() {
        return e(), i;
      },
      reliableTrDimensions: function reliableTrDimensions() {
        var e, t, n, r;
        return null == a && (e = E.createElement("table"), t = E.createElement("tr"), n = E.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", re.appendChild(e).appendChild(t).appendChild(n), r = C.getComputedStyle(t), a = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight, re.removeChild(e)), a;
      }
    }));
  }();
  var Be = ["Webkit", "Moz", "ms"],
      $e = E.createElement("div").style,
      _e = {};

  function ze(e) {
    var t = S.cssProps[e] || _e[e];
    return t || (e in $e ? e : _e[e] = function (e) {
      var t = e[0].toUpperCase() + e.slice(1),
          n = Be.length;

      while (n--) {
        if ((e = Be[n] + t) in $e) return e;
      }
    }(e) || e);
  }

  var Ue = /^(none|table(?!-c[ea]).+)/,
      Xe = /^--/,
      Ve = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      Ge = {
    letterSpacing: "0",
    fontWeight: "400"
  };

  function Ye(e, t, n) {
    var r = te.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }

  function Qe(e, t, n, r, i, o) {
    var a = "width" === t ? 1 : 0,
        s = 0,
        u = 0;
    if (n === (r ? "border" : "content")) return 0;

    for (; a < 4; a += 2) {
      "margin" === n && (u += S.css(e, n + ne[a], !0, i)), r ? ("content" === n && (u -= S.css(e, "padding" + ne[a], !0, i)), "margin" !== n && (u -= S.css(e, "border" + ne[a] + "Width", !0, i))) : (u += S.css(e, "padding" + ne[a], !0, i), "padding" !== n ? u += S.css(e, "border" + ne[a] + "Width", !0, i) : s += S.css(e, "border" + ne[a] + "Width", !0, i));
    }

    return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u;
  }

  function Je(e, t, n) {
    var r = Re(e),
        i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r),
        o = i,
        a = We(e, t, r),
        s = "offset" + t[0].toUpperCase() + t.slice(1);

    if (Pe.test(a)) {
      if (!n) return a;
      a = "auto";
    }

    return (!y.boxSizingReliable() && i || !y.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Qe(e, t, n || (i ? "border" : "content"), o, r, a) + "px";
  }

  function Ke(e, t, n, r, i) {
    return new Ke.prototype.init(e, t, n, r, i);
  }

  S.extend({
    cssHooks: {
      opacity: {
        get: function get(e, t) {
          if (t) {
            var n = We(e, "opacity");
            return "" === n ? "1" : n;
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
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {},
    style: function style(e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
            o,
            a,
            s = X(t),
            u = Xe.test(t),
            l = e.style;
        if (u || (t = ze(s)), a = S.cssHooks[t] || S.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
        "string" === (o = _typeof(n)) && (i = te.exec(n)) && i[1] && (n = se(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n));
      }
    },
    css: function css(e, t, n, r) {
      var i,
          o,
          a,
          s = X(t);
      return Xe.test(t) || (t = ze(s)), (a = S.cssHooks[t] || S.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = We(e, t, r)), "normal" === i && t in Ge && (i = Ge[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i;
    }
  }), S.each(["height", "width"], function (e, u) {
    S.cssHooks[u] = {
      get: function get(e, t, n) {
        if (t) return !Ue.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Je(e, u, n) : Me(e, Ve, function () {
          return Je(e, u, n);
        });
      },
      set: function set(e, t, n) {
        var r,
            i = Re(e),
            o = !y.scrollboxSize() && "absolute" === i.position,
            a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i),
            s = n ? Qe(e, u, n, a, i) : 0;
        return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Qe(e, u, "border", !1, i) - .5)), s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = S.css(e, u)), Ye(0, t, s);
      }
    };
  }), S.cssHooks.marginLeft = Fe(y.reliableMarginLeft, function (e, t) {
    if (t) return (parseFloat(We(e, "marginLeft")) || e.getBoundingClientRect().left - Me(e, {
      marginLeft: 0
    }, function () {
      return e.getBoundingClientRect().left;
    })) + "px";
  }), S.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (i, o) {
    S.cssHooks[i + o] = {
      expand: function expand(e) {
        for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) {
          n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
        }

        return n;
      }
    }, "margin" !== i && (S.cssHooks[i + o].set = Ye);
  }), S.fn.extend({
    css: function css(e, t) {
      return $(this, function (e, t, n) {
        var r,
            i,
            o = {},
            a = 0;

        if (Array.isArray(t)) {
          for (r = Re(e), i = t.length; a < i; a++) {
            o[t[a]] = S.css(e, t[a], !1, r);
          }

          return o;
        }

        return void 0 !== n ? S.style(e, t, n) : S.css(e, t);
      }, e, t, 1 < arguments.length);
    }
  }), ((S.Tween = Ke).prototype = {
    constructor: Ke,
    init: function init(e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || S.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (S.cssNumber[n] ? "" : "px");
    },
    cur: function cur() {
      var e = Ke.propHooks[this.prop];
      return e && e.get ? e.get(this) : Ke.propHooks._default.get(this);
    },
    run: function run(e) {
      var t,
          n = Ke.propHooks[this.prop];
      return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ke.propHooks._default.set(this), this;
    }
  }).init.prototype = Ke.prototype, (Ke.propHooks = {
    _default: {
      get: function get(e) {
        var t;
        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
      },
      set: function set(e) {
        S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[ze(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit);
      }
    }
  }).scrollTop = Ke.propHooks.scrollLeft = {
    set: function set(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    }
  }, S.easing = {
    linear: function linear(e) {
      return e;
    },
    swing: function swing(e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    },
    _default: "swing"
  }, S.fx = Ke.prototype.init, S.fx.step = {};
  var Ze,
      et,
      tt,
      nt,
      rt = /^(?:toggle|show|hide)$/,
      it = /queueHooks$/;

  function ot() {
    et && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(ot) : C.setTimeout(ot, S.fx.interval), S.fx.tick());
  }

  function at() {
    return C.setTimeout(function () {
      Ze = void 0;
    }), Ze = Date.now();
  }

  function st(e, t) {
    var n,
        r = 0,
        i = {
      height: e
    };

    for (t = t ? 1 : 0; r < 4; r += 2 - t) {
      i["margin" + (n = ne[r])] = i["padding" + n] = e;
    }

    return t && (i.opacity = i.width = e), i;
  }

  function ut(e, t, n) {
    for (var r, i = (lt.tweeners[t] || []).concat(lt.tweeners["*"]), o = 0, a = i.length; o < a; o++) {
      if (r = i[o].call(n, t, e)) return r;
    }
  }

  function lt(o, e, t) {
    var n,
        a,
        r = 0,
        i = lt.prefilters.length,
        s = S.Deferred().always(function () {
      delete u.elem;
    }),
        u = function u() {
      if (a) return !1;

      for (var e = Ze || at(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) {
        l.tweens[r].run(n);
      }

      return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1);
    },
        l = s.promise({
      elem: o,
      props: S.extend({}, e),
      opts: S.extend(!0, {
        specialEasing: {},
        easing: S.easing._default
      }, t),
      originalProperties: e,
      originalOptions: t,
      startTime: Ze || at(),
      duration: t.duration,
      tweens: [],
      createTween: function createTween(e, t) {
        var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
        return l.tweens.push(n), n;
      },
      stop: function stop(e) {
        var t = 0,
            n = e ? l.tweens.length : 0;
        if (a) return this;

        for (a = !0; t < n; t++) {
          l.tweens[t].run(1);
        }

        return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this;
      }
    }),
        c = l.props;

    for (!function (e, t) {
      var n, r, i, o, a;

      for (n in e) {
        if (i = t[r = X(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = S.cssHooks[r]) && ("expand" in a)) for (n in o = a.expand(o), delete e[r], o) {
          (n in e) || (e[n] = o[n], t[n] = i);
        } else t[r] = i;
      }
    }(c, l.opts.specialEasing); r < i; r++) {
      if (n = lt.prefilters[r].call(l, o, c, l.opts)) return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), n;
    }

    return S.map(c, ut, l), m(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), S.fx.timer(S.extend(u, {
      elem: o,
      anim: l,
      queue: l.opts.queue
    })), l;
  }

  S.Animation = S.extend(lt, {
    tweeners: {
      "*": [function (e, t) {
        var n = this.createTween(e, t);
        return se(n.elem, e, te.exec(t), n), n;
      }]
    },
    tweener: function tweener(e, t) {
      m(e) ? (t = e, e = ["*"]) : e = e.match(P);

      for (var n, r = 0, i = e.length; r < i; r++) {
        n = e[r], lt.tweeners[n] = lt.tweeners[n] || [], lt.tweeners[n].unshift(t);
      }
    },
    prefilters: [function (e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = "width" in t || "height" in t,
          p = this,
          d = {},
          h = e.style,
          g = e.nodeType && ae(e),
          v = Y.get(e, "fxshow");

      for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
        a.unqueued || s();
      }), a.unqueued++, p.always(function () {
        p.always(function () {
          a.unqueued--, S.queue(e, "fx").length || a.empty.fire();
        });
      })), t) {
        if (i = t[r], rt.test(i)) {
          if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
            if ("show" !== i || !v || void 0 === v[r]) continue;
            g = !0;
          }

          d[r] = v && v[r] || S.style(e, r);
        }
      }

      if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d)) for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = Y.get(e, "display")), "none" === (c = S.css(e, "display")) && (l ? c = l : (le([e], !0), l = e.style.display || l, c = S.css(e, "display"), le([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done(function () {
        h.display = l;
      }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
      })), u = !1, d) {
        u || (v ? "hidden" in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
          display: l
        }), o && (v.hidden = !g), g && le([e], !0), p.done(function () {
          for (r in g || le([e]), Y.remove(e, "fxshow"), d) {
            S.style(e, r, d[r]);
          }
        })), u = ut(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0));
      }
    }],
    prefilter: function prefilter(e, t) {
      t ? lt.prefilters.unshift(e) : lt.prefilters.push(e);
    }
  }), S.speed = function (e, t, n) {
    var r = e && "object" == _typeof(e) ? S.extend({}, e) : {
      complete: n || !n && t || m(e) && e,
      duration: e,
      easing: n && t || t && !m(t) && t
    };
    return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      m(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue);
    }, r;
  }, S.fn.extend({
    fadeTo: function fadeTo(e, t, n, r) {
      return this.filter(ae).css("opacity", 0).show().end().animate({
        opacity: t
      }, e, n, r);
    },
    animate: function animate(t, e, n, r) {
      var i = S.isEmptyObject(t),
          o = S.speed(e, n, r),
          a = function a() {
        var e = lt(this, S.extend({}, t), o);
        (i || Y.get(this, "finish")) && e.stop(!0);
      };

      return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
    },
    stop: function stop(i, e, o) {
      var a = function a(e) {
        var t = e.stop;
        delete e.stop, t(o);
      };

      return "string" != typeof i && (o = e, e = i, i = void 0), e && this.queue(i || "fx", []), this.each(function () {
        var e = !0,
            t = null != i && i + "queueHooks",
            n = S.timers,
            r = Y.get(this);
        if (t) r[t] && r[t].stop && a(r[t]);else for (t in r) {
          r[t] && r[t].stop && it.test(t) && a(r[t]);
        }

        for (t = n.length; t--;) {
          n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
        }

        !e && o || S.dequeue(this, i);
      });
    },
    finish: function finish(a) {
      return !1 !== a && (a = a || "fx"), this.each(function () {
        var e,
            t = Y.get(this),
            n = t[a + "queue"],
            r = t[a + "queueHooks"],
            i = S.timers,
            o = n ? n.length : 0;

        for (t.finish = !0, S.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) {
          i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
        }

        for (e = 0; e < o; e++) {
          n[e] && n[e].finish && n[e].finish.call(this);
        }

        delete t.finish;
      });
    }
  }), S.each(["toggle", "show", "hide"], function (e, r) {
    var i = S.fn[r];

    S.fn[r] = function (e, t, n) {
      return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(st(r, !0), e, t, n);
    };
  }), S.each({
    slideDown: st("show"),
    slideUp: st("hide"),
    slideToggle: st("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (e, r) {
    S.fn[e] = function (e, t, n) {
      return this.animate(r, e, t, n);
    };
  }), S.timers = [], S.fx.tick = function () {
    var e,
        t = 0,
        n = S.timers;

    for (Ze = Date.now(); t < n.length; t++) {
      (e = n[t])() || n[t] !== e || n.splice(t--, 1);
    }

    n.length || S.fx.stop(), Ze = void 0;
  }, S.fx.timer = function (e) {
    S.timers.push(e), S.fx.start();
  }, S.fx.interval = 13, S.fx.start = function () {
    et || (et = !0, ot());
  }, S.fx.stop = function () {
    et = null;
  }, S.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, S.fn.delay = function (r, e) {
    return r = S.fx && S.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, t) {
      var n = C.setTimeout(e, r);

      t.stop = function () {
        C.clearTimeout(n);
      };
    });
  }, tt = E.createElement("input"), nt = E.createElement("select").appendChild(E.createElement("option")), tt.type = "checkbox", y.checkOn = "" !== tt.value, y.optSelected = nt.selected, (tt = E.createElement("input")).value = "t", tt.type = "radio", y.radioValue = "t" === tt.value;
  var ct,
      ft = S.expr.attrHandle;
  S.fn.extend({
    attr: function attr(e, t) {
      return $(this, S.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function removeAttr(e) {
      return this.each(function () {
        S.removeAttr(this, e);
      });
    }
  }), S.extend({
    attr: function attr(e, t, n) {
      var r,
          i,
          o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? ct : void 0)), void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r);
    },
    attrHooks: {
      type: {
        set: function set(e, t) {
          if (!y.radioValue && "radio" === t && A(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t;
          }
        }
      }
    },
    removeAttr: function removeAttr(e, t) {
      var n,
          r = 0,
          i = t && t.match(P);
      if (i && 1 === e.nodeType) while (n = i[r++]) {
        e.removeAttribute(n);
      }
    }
  }), ct = {
    set: function set(e, t, n) {
      return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
    }
  }, S.each(S.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var a = ft[t] || S.find.attr;

    ft[t] = function (e, t, n) {
      var r,
          i,
          o = t.toLowerCase();
      return n || (i = ft[o], ft[o] = r, r = null != a(e, t, n) ? o : null, ft[o] = i), r;
    };
  });
  var pt = /^(?:input|select|textarea|button)$/i,
      dt = /^(?:a|area)$/i;

  function ht(e) {
    return (e.match(P) || []).join(" ");
  }

  function gt(e) {
    return e.getAttribute && e.getAttribute("class") || "";
  }

  function vt(e) {
    return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || [];
  }

  S.fn.extend({
    prop: function prop(e, t) {
      return $(this, S.prop, e, t, 1 < arguments.length);
    },
    removeProp: function removeProp(e) {
      return this.each(function () {
        delete this[S.propFix[e] || e];
      });
    }
  }), S.extend({
    prop: function prop(e, t, n) {
      var r,
          i,
          o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t, i = S.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
    },
    propHooks: {
      tabIndex: {
        get: function get(e) {
          var t = S.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : pt.test(e.nodeName) || dt.test(e.nodeName) && e.href ? 0 : -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }), y.optSelected || (S.propHooks.selected = {
    get: function get(e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null;
    },
    set: function set(e) {
      var t = e.parentNode;
      t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
    }
  }), S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    S.propFix[this.toLowerCase()] = this;
  }), S.fn.extend({
    addClass: function addClass(t) {
      var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
      if (m(t)) return this.each(function (e) {
        S(this).addClass(t.call(this, e, gt(this)));
      });
      if ((e = vt(t)).length) while (n = this[u++]) {
        if (i = gt(n), r = 1 === n.nodeType && " " + ht(i) + " ") {
          a = 0;

          while (o = e[a++]) {
            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
          }

          i !== (s = ht(r)) && n.setAttribute("class", s);
        }
      }
      return this;
    },
    removeClass: function removeClass(t) {
      var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
      if (m(t)) return this.each(function (e) {
        S(this).removeClass(t.call(this, e, gt(this)));
      });
      if (!arguments.length) return this.attr("class", "");
      if ((e = vt(t)).length) while (n = this[u++]) {
        if (i = gt(n), r = 1 === n.nodeType && " " + ht(i) + " ") {
          a = 0;

          while (o = e[a++]) {
            while (-1 < r.indexOf(" " + o + " ")) {
              r = r.replace(" " + o + " ", " ");
            }
          }

          i !== (s = ht(r)) && n.setAttribute("class", s);
        }
      }
      return this;
    },
    toggleClass: function toggleClass(i, t) {
      var o = _typeof(i),
          a = "string" === o || Array.isArray(i);

      return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function (e) {
        S(this).toggleClass(i.call(this, e, gt(this), t), t);
      }) : this.each(function () {
        var e, t, n, r;

        if (a) {
          t = 0, n = S(this), r = vt(i);

          while (e = r[t++]) {
            n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
          }
        } else void 0 !== i && "boolean" !== o || ((e = gt(this)) && Y.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || ""));
      });
    },
    hasClass: function hasClass(e) {
      var t,
          n,
          r = 0;
      t = " " + e + " ";

      while (n = this[r++]) {
        if (1 === n.nodeType && -1 < (" " + ht(gt(n)) + " ").indexOf(t)) return !0;
      }

      return !1;
    }
  });
  var yt = /\r/g;
  S.fn.extend({
    val: function val(n) {
      var r,
          e,
          i,
          t = this[0];
      return arguments.length ? (i = m(n), this.each(function (e) {
        var t;
        1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, function (e) {
          return null == e ? "" : e + "";
        })), (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t));
      })) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(yt, "") : null == e ? "" : e : void 0;
    }
  }), S.extend({
    valHooks: {
      option: {
        get: function get(e) {
          var t = S.find.attr(e, "value");
          return null != t ? t : ht(S.text(e));
        }
      },
      select: {
        get: function get(e) {
          var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              a = "select-one" === e.type,
              s = a ? null : [],
              u = a ? o + 1 : i.length;

          for (r = o < 0 ? u : a ? o : 0; r < u; r++) {
            if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
              if (t = S(n).val(), a) return t;
              s.push(t);
            }
          }

          return s;
        },
        set: function set(e, t) {
          var n,
              r,
              i = e.options,
              o = S.makeArray(t),
              a = i.length;

          while (a--) {
            ((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
          }

          return n || (e.selectedIndex = -1), o;
        }
      }
    }
  }), S.each(["radio", "checkbox"], function () {
    S.valHooks[this] = {
      set: function set(e, t) {
        if (Array.isArray(t)) return e.checked = -1 < S.inArray(S(e).val(), t);
      }
    }, y.checkOn || (S.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value;
    });
  }), y.focusin = "onfocusin" in C;

  var mt = /^(?:focusinfocus|focusoutblur)$/,
      xt = function xt(e) {
    e.stopPropagation();
  };

  S.extend(S.event, {
    trigger: function trigger(e, t, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f,
          p = [n || E],
          d = v.call(e, "type") ? e.type : e,
          h = v.call(e, "namespace") ? e.namespace.split(".") : [];

      if (o = f = a = n = n || E, 3 !== n.nodeType && 8 !== n.nodeType && !mt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[S.expando] ? e : new S.Event(d, "object" == _typeof(e) && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : S.makeArray(t, [e]), c = S.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
        if (!r && !c.noBubble && !x(n)) {
          for (s = c.delegateType || d, mt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) {
            p.push(o), a = o;
          }

          a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C);
        }

        i = 0;

        while ((o = p[i++]) && !e.isPropagationStopped()) {
          f = o, e.type = 1 < i ? s : c.bindType || d, (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && V(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
        }

        return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !V(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null), S.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, xt), n[d](), e.isPropagationStopped() && f.removeEventListener(d, xt), S.event.triggered = void 0, a && (n[u] = a)), e.result;
      }
    },
    simulate: function simulate(e, t, n) {
      var r = S.extend(new S.Event(), n, {
        type: e,
        isSimulated: !0
      });
      S.event.trigger(r, null, t);
    }
  }), S.fn.extend({
    trigger: function trigger(e, t) {
      return this.each(function () {
        S.event.trigger(e, t, this);
      });
    },
    triggerHandler: function triggerHandler(e, t) {
      var n = this[0];
      if (n) return S.event.trigger(e, t, n, !0);
    }
  }), y.focusin || S.each({
    focus: "focusin",
    blur: "focusout"
  }, function (n, r) {
    var i = function i(e) {
      S.event.simulate(r, e.target, S.event.fix(e));
    };

    S.event.special[r] = {
      setup: function setup() {
        var e = this.ownerDocument || this.document || this,
            t = Y.access(e, r);
        t || e.addEventListener(n, i, !0), Y.access(e, r, (t || 0) + 1);
      },
      teardown: function teardown() {
        var e = this.ownerDocument || this.document || this,
            t = Y.access(e, r) - 1;
        t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0), Y.remove(e, r));
      }
    };
  });
  var bt = C.location,
      wt = {
    guid: Date.now()
  },
      Tt = /\?/;

  S.parseXML = function (e) {
    var t, n;
    if (!e || "string" != typeof e) return null;

    try {
      t = new C.DOMParser().parseFromString(e, "text/xml");
    } catch (e) {}

    return n = t && t.getElementsByTagName("parsererror")[0], t && !n || S.error("Invalid XML: " + (n ? S.map(n.childNodes, function (e) {
      return e.textContent;
    }).join("\n") : e)), t;
  };

  var Ct = /\[\]$/,
      Et = /\r?\n/g,
      St = /^(?:submit|button|image|reset|file)$/i,
      kt = /^(?:input|select|textarea|keygen)/i;

  function At(n, e, r, i) {
    var t;
    if (Array.isArray(e)) S.each(e, function (e, t) {
      r || Ct.test(n) ? i(n, t) : At(n + "[" + ("object" == _typeof(t) && null != t ? e : "") + "]", t, r, i);
    });else if (r || "object" !== w(e)) i(n, e);else for (t in e) {
      At(n + "[" + t + "]", e[t], r, i);
    }
  }

  S.param = function (e, t) {
    var n,
        r = [],
        i = function i(e, t) {
      var n = m(t) ? t() : t;
      r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
    };

    if (null == e) return "";
    if (Array.isArray(e) || e.jquery && !S.isPlainObject(e)) S.each(e, function () {
      i(this.name, this.value);
    });else for (n in e) {
      At(n, e[n], t, i);
    }
    return r.join("&");
  }, S.fn.extend({
    serialize: function serialize() {
      return S.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        var e = S.prop(this, "elements");
        return e ? S.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;
        return this.name && !S(this).is(":disabled") && kt.test(this.nodeName) && !St.test(e) && (this.checked || !pe.test(e));
      }).map(function (e, t) {
        var n = S(this).val();
        return null == n ? null : Array.isArray(n) ? S.map(n, function (e) {
          return {
            name: t.name,
            value: e.replace(Et, "\r\n")
          };
        }) : {
          name: t.name,
          value: n.replace(Et, "\r\n")
        };
      }).get();
    }
  });
  var Nt = /%20/g,
      jt = /#.*$/,
      Dt = /([?&])_=[^&]*/,
      qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Lt = /^(?:GET|HEAD)$/,
      Ht = /^\/\//,
      Ot = {},
      Pt = {},
      Rt = "*/".concat("*"),
      Mt = E.createElement("a");

  function It(o) {
    return function (e, t) {
      "string" != typeof e && (t = e, e = "*");
      var n,
          r = 0,
          i = e.toLowerCase().match(P) || [];
      if (m(t)) while (n = i[r++]) {
        "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t);
      }
    };
  }

  function Wt(t, i, o, a) {
    var s = {},
        u = t === Pt;

    function l(e) {
      var r;
      return s[e] = !0, S.each(t[e] || [], function (e, t) {
        var n = t(i, o, a);
        return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1);
      }), r;
    }

    return l(i.dataTypes[0]) || !s["*"] && l("*");
  }

  function Ft(e, t) {
    var n,
        r,
        i = S.ajaxSettings.flatOptions || {};

    for (n in t) {
      void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    }

    return r && S.extend(!0, e, r), e;
  }

  Mt.href = bt.href, S.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: bt.href,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Rt,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": JSON.parse,
        "text xml": S.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function ajaxSetup(e, t) {
      return t ? Ft(Ft(e, S.ajaxSettings), t) : Ft(S.ajaxSettings, e);
    },
    ajaxPrefilter: It(Ot),
    ajaxTransport: It(Pt),
    ajax: function ajax(e, t) {
      "object" == _typeof(e) && (t = e, e = void 0), t = t || {};
      var c,
          f,
          p,
          n,
          d,
          r,
          h,
          g,
          i,
          o,
          v = S.ajaxSetup({}, t),
          y = v.context || v,
          m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event,
          x = S.Deferred(),
          b = S.Callbacks("once memory"),
          w = v.statusCode || {},
          a = {},
          s = {},
          u = "canceled",
          T = {
        readyState: 0,
        getResponseHeader: function getResponseHeader(e) {
          var t;

          if (h) {
            if (!n) {
              n = {};

              while (t = qt.exec(p)) {
                n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
              }
            }

            t = n[e.toLowerCase() + " "];
          }

          return null == t ? null : t.join(", ");
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return h ? p : null;
        },
        setRequestHeader: function setRequestHeader(e, t) {
          return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this;
        },
        overrideMimeType: function overrideMimeType(e) {
          return null == h && (v.mimeType = e), this;
        },
        statusCode: function statusCode(e) {
          var t;
          if (e) if (h) T.always(e[T.status]);else for (t in e) {
            w[t] = [w[t], e[t]];
          }
          return this;
        },
        abort: function abort(e) {
          var t = e || u;
          return c && c.abort(t), l(0, t), this;
        }
      };

      if (x.promise(T), v.url = ((e || v.url || bt.href) + "").replace(Ht, bt.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [""], null == v.crossDomain) {
        r = E.createElement("a");

        try {
          r.href = v.url, r.href = r.href, v.crossDomain = Mt.protocol + "//" + Mt.host != r.protocol + "//" + r.host;
        } catch (e) {
          v.crossDomain = !0;
        }
      }

      if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)), Wt(Ot, v, t, T), h) return T;

      for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Lt.test(v.type), f = v.url.replace(jt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Nt, "+")) : (o = v.url.slice(f.length), v.data && (v.processData || "string" == typeof v.data) && (f += (Tt.test(f) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (f = f.replace(Dt, "$1"), o = (Tt.test(f) ? "&" : "?") + "_=" + wt.guid++ + o), v.url = f + o), v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]), S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : v.accepts["*"]), v.headers) {
        T.setRequestHeader(i, v.headers[i]);
      }

      if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort();

      if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = Wt(Pt, v, t, T)) {
        if (T.readyState = 1, g && m.trigger("ajaxSend", [T, v]), h) return T;
        v.async && 0 < v.timeout && (d = C.setTimeout(function () {
          T.abort("timeout");
        }, v.timeout));

        try {
          h = !1, c.send(a, l);
        } catch (e) {
          if (h) throw e;
          l(-1, e);
        }
      } else l(-1, "No Transport");

      function l(e, t, n, r) {
        var i,
            o,
            a,
            s,
            u,
            l = t;
        h || (h = !0, d && C.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function (e, t, n) {
          var r,
              i,
              o,
              a,
              s = e.contents,
              u = e.dataTypes;

          while ("*" === u[0]) {
            u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
          }

          if (r) for (i in s) {
            if (s[i] && s[i].test(r)) {
              u.unshift(i);
              break;
            }
          }
          if (u[0] in n) o = u[0];else {
            for (i in n) {
              if (!u[0] || e.converters[i + " " + u[0]]) {
                o = i;
                break;
              }

              a || (a = i);
            }

            o = o || a;
          }
          if (o) return o !== u[0] && u.unshift(o), n[o];
        }(v, T, n)), !i && -1 < S.inArray("script", v.dataTypes) && S.inArray("json", v.dataTypes) < 0 && (v.converters["text script"] = function () {}), s = function (e, t, n, r) {
          var i,
              o,
              a,
              s,
              u,
              l = {},
              c = e.dataTypes.slice();
          if (c[1]) for (a in e.converters) {
            l[a.toLowerCase()] = e.converters[a];
          }
          o = c.shift();

          while (o) {
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
              if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) {
                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                  !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                  break;
                }
              }
              if (!0 !== a) if (a && e["throws"]) t = a(t);else try {
                t = a(t);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: a ? e : "No conversion from " + u + " to " + o
                };
              }
            }
          }

          return {
            state: "success",
            data: t
          };
        }(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u), (u = T.getResponseHeader("etag")) && (S.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]), T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]), b.fireWith(y, [T, l]), g && (m.trigger("ajaxComplete", [T, v]), --S.active || S.event.trigger("ajaxStop")));
      }

      return T;
    },
    getJSON: function getJSON(e, t, n) {
      return S.get(e, t, n, "json");
    },
    getScript: function getScript(e, t) {
      return S.get(e, void 0, t, "script");
    }
  }), S.each(["get", "post"], function (e, i) {
    S[i] = function (e, t, n, r) {
      return m(t) && (r = r || n, n = t, t = void 0), S.ajax(S.extend({
        url: e,
        type: i,
        dataType: r,
        data: t,
        success: n
      }, S.isPlainObject(e) && e));
    };
  }), S.ajaxPrefilter(function (e) {
    var t;

    for (t in e.headers) {
      "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
    }
  }), S._evalUrl = function (e, t, n) {
    return S.ajax({
      url: e,
      type: "GET",
      dataType: "script",
      cache: !0,
      async: !1,
      global: !1,
      converters: {
        "text script": function textScript() {}
      },
      dataFilter: function dataFilter(e) {
        S.globalEval(e, t, n);
      }
    });
  }, S.fn.extend({
    wrapAll: function wrapAll(e) {
      var t;
      return this[0] && (m(e) && (e = e.call(this[0])), t = S(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        var e = this;

        while (e.firstElementChild) {
          e = e.firstElementChild;
        }

        return e;
      }).append(this)), this;
    },
    wrapInner: function wrapInner(n) {
      return m(n) ? this.each(function (e) {
        S(this).wrapInner(n.call(this, e));
      }) : this.each(function () {
        var e = S(this),
            t = e.contents();
        t.length ? t.wrapAll(n) : e.append(n);
      });
    },
    wrap: function wrap(t) {
      var n = m(t);
      return this.each(function (e) {
        S(this).wrapAll(n ? t.call(this, e) : t);
      });
    },
    unwrap: function unwrap(e) {
      return this.parent(e).not("body").each(function () {
        S(this).replaceWith(this.childNodes);
      }), this;
    }
  }), S.expr.pseudos.hidden = function (e) {
    return !S.expr.pseudos.visible(e);
  }, S.expr.pseudos.visible = function (e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }, S.ajaxSettings.xhr = function () {
    try {
      return new C.XMLHttpRequest();
    } catch (e) {}
  };
  var Bt = {
    0: 200,
    1223: 204
  },
      $t = S.ajaxSettings.xhr();
  y.cors = !!$t && "withCredentials" in $t, y.ajax = $t = !!$t, S.ajaxTransport(function (i) {
    var _o, a;

    if (y.cors || $t && !i.crossDomain) return {
      send: function send(e, t) {
        var n,
            r = i.xhr();
        if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields) for (n in i.xhrFields) {
          r[n] = i.xhrFields[n];
        }

        for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) {
          r.setRequestHeader(n, e[n]);
        }

        _o = function o(e) {
          return function () {
            _o && (_o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Bt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
              binary: r.response
            } : {
              text: r.responseText
            }, r.getAllResponseHeaders()));
          };
        }, r.onload = _o(), a = r.onerror = r.ontimeout = _o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function () {
          4 === r.readyState && C.setTimeout(function () {
            _o && a();
          });
        }, _o = _o("abort");

        try {
          r.send(i.hasContent && i.data || null);
        } catch (e) {
          if (_o) throw e;
        }
      },
      abort: function abort() {
        _o && _o();
      }
    };
  }), S.ajaxPrefilter(function (e) {
    e.crossDomain && (e.contents.script = !1);
  }), S.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(e) {
        return S.globalEval(e), e;
      }
    }
  }), S.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
  }), S.ajaxTransport("script", function (n) {
    var r, _i;

    if (n.crossDomain || n.scriptAttrs) return {
      send: function send(e, t) {
        r = S("<script>").attr(n.scriptAttrs || {}).prop({
          charset: n.scriptCharset,
          src: n.url
        }).on("load error", _i = function i(e) {
          r.remove(), _i = null, e && t("error" === e.type ? 404 : 200, e.type);
        }), E.head.appendChild(r[0]);
      },
      abort: function abort() {
        _i && _i();
      }
    };
  });

  var _t,
      zt = [],
      Ut = /(=)\?(?=&|$)|\?\?/;

  S.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var e = zt.pop() || S.expando + "_" + wt.guid++;
      return this[e] = !0, e;
    }
  }), S.ajaxPrefilter("json jsonp", function (e, t, n) {
    var r,
        i,
        o,
        a = !1 !== e.jsonp && (Ut.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ut.test(e.data) && "data");
    if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Ut, "$1" + r) : !1 !== e.jsonp && (e.url += (Tt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
      return o || S.error(r + " was not called"), o[0];
    }, e.dataTypes[0] = "json", i = C[r], C[r] = function () {
      o = arguments;
    }, n.always(function () {
      void 0 === i ? S(C).removeProp(r) : C[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, zt.push(r)), o && m(i) && i(o[0]), o = i = void 0;
    }), "script";
  }), y.createHTMLDocument = ((_t = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === _t.childNodes.length), S.parseHTML = function (e, t, n) {
    return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, t.head.appendChild(r)) : t = E), o = !n && [], (i = N.exec(e)) ? [t.createElement(i[1])] : (i = xe([e], t, o), o && o.length && S(o).remove(), S.merge([], i.childNodes)));
    var r, i, o;
  }, S.fn.load = function (e, t, n) {
    var r,
        i,
        o,
        a = this,
        s = e.indexOf(" ");
    return -1 < s && (r = ht(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == _typeof(t) && (i = "POST"), 0 < a.length && S.ajax({
      url: e,
      type: i || "GET",
      dataType: "html",
      data: t
    }).done(function (e) {
      o = arguments, a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e);
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, o || [e.responseText, t, e]);
      });
    }), this;
  }, S.expr.pseudos.animated = function (t) {
    return S.grep(S.timers, function (e) {
      return t === e.elem;
    }).length;
  }, S.offset = {
    setOffset: function setOffset(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l = S.css(e, "position"),
          c = S(e),
          f = {};
      "static" === l && (e.style.position = "relative"), s = c.offset(), o = S.css(e, "top"), u = S.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, S.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f);
    }
  }, S.fn.extend({
    offset: function offset(t) {
      if (arguments.length) return void 0 === t ? this : this.each(function (e) {
        S.offset.setOffset(this, t, e);
      });
      var e,
          n,
          r = this[0];
      return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
        top: e.top + n.pageYOffset,
        left: e.left + n.pageXOffset
      }) : {
        top: 0,
        left: 0
      } : void 0;
    },
    position: function position() {
      if (this[0]) {
        var e,
            t,
            n,
            r = this[0],
            i = {
          top: 0,
          left: 0
        };
        if ("fixed" === S.css(r, "position")) t = r.getBoundingClientRect();else {
          t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;

          while (e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position")) {
            e = e.parentNode;
          }

          e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0), i.left += S.css(e, "borderLeftWidth", !0));
        }
        return {
          top: t.top - i.top - S.css(r, "marginTop", !0),
          left: t.left - i.left - S.css(r, "marginLeft", !0)
        };
      }
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        var e = this.offsetParent;

        while (e && "static" === S.css(e, "position")) {
          e = e.offsetParent;
        }

        return e || re;
      });
    }
  }), S.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (t, i) {
    var o = "pageYOffset" === i;

    S.fn[t] = function (e) {
      return $(this, function (e, t, n) {
        var r;
        if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t];
        r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n;
      }, t, e, arguments.length);
    };
  }), S.each(["top", "left"], function (e, n) {
    S.cssHooks[n] = Fe(y.pixelPosition, function (e, t) {
      if (t) return t = We(e, n), Pe.test(t) ? S(e).position()[n] + "px" : t;
    });
  }), S.each({
    Height: "height",
    Width: "width"
  }, function (a, s) {
    S.each({
      padding: "inner" + a,
      content: s,
      "": "outer" + a
    }, function (r, o) {
      S.fn[o] = function (e, t) {
        var n = arguments.length && (r || "boolean" != typeof e),
            i = r || (!0 === e || !0 === t ? "margin" : "border");
        return $(this, function (e, t, n) {
          var r;
          return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i);
        }, s, n ? e : void 0, n);
      };
    });
  }), S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    S.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), S.fn.extend({
    bind: function bind(e, t, n) {
      return this.on(e, null, t, n);
    },
    unbind: function unbind(e, t) {
      return this.off(e, null, t);
    },
    delegate: function delegate(e, t, n, r) {
      return this.on(t, e, n, r);
    },
    undelegate: function undelegate(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
    },
    hover: function hover(e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    }
  }), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
    S.fn[n] = function (e, t) {
      return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
    };
  });
  var Xt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  S.proxy = function (e, t) {
    var n, r, i;
    if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), (i = function i() {
      return e.apply(t || this, r.concat(s.call(arguments)));
    }).guid = e.guid = e.guid || S.guid++, i;
  }, S.holdReady = function (e) {
    e ? S.readyWait++ : S.ready(!0);
  }, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = A, S.isFunction = m, S.isWindow = x, S.camelCase = X, S.type = w, S.now = Date.now, S.isNumeric = function (e) {
    var t = S.type(e);
    return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
  }, S.trim = function (e) {
    return null == e ? "" : (e + "").replace(Xt, "");
  },  true && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return S;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  var Vt = C.jQuery,
      Gt = C.$;
  return S.noConflict = function (e) {
    return C.$ === S && (C.$ = Gt), e && C.jQuery === S && (C.jQuery = Vt), S;
  }, "undefined" == typeof e && (C.jQuery = C.$ = S), S;
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./resources/js/jquery-3.6.0.min.js");
/******/ 	__webpack_require__("./resources/js/bootstrap.js");
/******/ 	__webpack_require__("./resources/js/bootstrap.bundle.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/js/bootstrap.esm.js");
/******/ 	
/******/ })()
;