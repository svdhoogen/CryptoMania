(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/cointable.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/cointable.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "cointable",
  props: {
    source: String
  },
  data: function data() {
    return {
      data: []
    };
  },
  methods: {
    GetCoinData: function GetCoinData() {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("https://api.coincap.io/v2/assets").then(function (response) {
        _this.data = response.data.data;
        console.log(_this.data);

        _this.data.forEach(function (coin) {
          coin.priceUsd = parseFloat(coin.priceUsd).toFixed(2);
          coin.marketCapUsd = parseFloat(coin.marketCapUsd).toFixed(2);
          coin.changePercent24Hr = parseFloat(coin.changePercent24Hr).toFixed(2);
        });
      });
    }
  },
  mounted: function mounted() {
    this.GetCoinData();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/cointable.vue?vue&type=template&id=23a343a2&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/cointable.vue?vue&type=template&id=23a343a2& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "table",
      { staticClass: "bg-light table table-bordered table-hover table-coin" },
      [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "tbody",
          { attrs: { id: "table-body-coin" } },
          _vm._l(_vm.data, function(coin) {
            return _c(
              "tr",
              { key: coin.rank, on: { click: function($event) {} } },
              [
                _c("td", [_vm._v(_vm._s(coin.rank))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(coin.name) + " ")]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(coin.symbol))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(coin.priceUsd))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(coin.marketCapUsd))]),
                _vm._v(" "),
                _c(
                  "td",
                  {
                    class: {
                      "text-success": coin.changePercent24Hr > 0,
                      "text-danger": coin.changePercent24Hr < 0
                    }
                  },
                  [_vm._v(_vm._s(coin.changePercent24Hr))]
                )
              ]
            )
          }),
          0
        )
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "d-flex justify-content-center" }, [
      !_vm.data.length
        ? _c(
            "div",
            {
              staticClass: "spinner-border text-success",
              attrs: { role: "status" }
            },
            [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
          )
        : _vm._e()
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", { staticClass: "thead-dark" }, [
      _c("tr", [
        _c("th", { staticClass: "text-center bg-success border-green" }, [
          _vm._v("Rank")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center bg-success border-green" }, [
          _vm._v("Name")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center bg-success border-green" }, [
          _vm._v("Symbol")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center bg-success border-green" }, [
          _vm._v("Price $")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center bg-success border-green" }, [
          _vm._v("Market cap $")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center bg-success border-green" }, [
          _vm._v("% 24hr")
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_cointable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/cointable */ "./resources/js/components/cointable.vue");




axios__WEBPACK_IMPORTED_MODULE_2___default.a.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
new vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  el: '#root',
  components: {
    cointable: _components_cointable__WEBPACK_IMPORTED_MODULE_3__["default"]
  }
});

/***/ }),

/***/ "./resources/js/components/cointable.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/cointable.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cointable_vue_vue_type_template_id_23a343a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cointable.vue?vue&type=template&id=23a343a2& */ "./resources/js/components/cointable.vue?vue&type=template&id=23a343a2&");
/* harmony import */ var _cointable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cointable.vue?vue&type=script&lang=js& */ "./resources/js/components/cointable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _cointable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _cointable_vue_vue_type_template_id_23a343a2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _cointable_vue_vue_type_template_id_23a343a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/cointable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/cointable.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/cointable.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cointable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./cointable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/cointable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cointable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/cointable.vue?vue&type=template&id=23a343a2&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/cointable.vue?vue&type=template&id=23a343a2& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_cointable_vue_vue_type_template_id_23a343a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./cointable.vue?vue&type=template&id=23a343a2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/cointable.vue?vue&type=template&id=23a343a2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_cointable_vue_vue_type_template_id_23a343a2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_cointable_vue_vue_type_template_id_23a343a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/sass/app.sass":
/*!*********************************!*\
  !*** ./resources/sass/app.sass ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.sass ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\Programs\laragon\www\CryptoMania\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! D:\Programs\laragon\www\CryptoMania\resources\sass\app.sass */"./resources/sass/app.sass");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);