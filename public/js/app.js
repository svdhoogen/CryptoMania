(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinmodal.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/coinmodal.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LineChart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LineChart.js */ "./resources/js/LineChart.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
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
  name: "coinmodal",
  components: {
    LineChart: _LineChart_js__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    loggedin: String
  },
  data: function data() {
    return {
      coin: [],
      chartData: {
        labels: [],
        datasets: [{
          label: 'Price past 2 years',
          data: [],
          borderColor: "#21bb45",
          backgroundColor: "rgba(44, 211, 83, 0.2)",
          pointBackgroundColor: "#39e661"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    // Handle coin history when received
    CoinHistoryReceived: function CoinHistoryReceived(response) {
      console.log(response);

      for (var index = response.data.data.length - 1; index > 0; index -= 7) {
        this.chartData.labels.push(moment__WEBPACK_IMPORTED_MODULE_1___default()(response.data.data[index].time).format('LL'));
        this.chartData.datasets[0].data.push(response.data.data[index].priceUsd);
      }

      this.chartData.labels.reverse();
      this.chartData.datasets[0].data.reverse();
      console.log("Succesfully set chart data!");
      console.log(this.chartData);
    },
    // Handle my coin data when received
    MyCoinDataReceived: function MyCoinDataReceived(response) {
      console.log(response);
      var amount = response.data;

      if (amount == undefined || isNaN(amount) || parseFloat(amount) <= 0) {
        console.log("ERROR: Tried to parse received coin count, but value was empty, not a valid float or <= 0!");
        return;
      }

      console.log("Succesfully set coin count!"); // Update count

      this.$refs['amount'].value = amount;
    },
    // Present modal to user
    PresentModal: function PresentModal(coin) {
      var _this = this;

      // Update current coin
      this.coin = coin;
      console.log("Requesting coin history for coin: " + this.coin.id); // Get coin history

      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("https://api.coincap.io/v2/assets/" + this.coin.id + "/history?interval=d1").then(function (response) {
        return _this.CoinHistoryReceived(response);
      }); // Get my coin data

      if (this.loggedin) {
        console.log("Logged in so requestion my coin count for: " + this.coin.id);
        axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("/mycoins/" + coin.id).then(function (response) {
          return _this.MyCoinDataReceived(response);
        });
      }

      console.log("Presenting modal for coin: " + coin.id); // Show modal

      jquery__WEBPACK_IMPORTED_MODULE_3___default()('#modal').modal('show');
    },
    // Reset modal completely
    ResetModal: function ResetModal() {
      // Reset amount
      this.$refs['amount'].value = ""; // Reset coin

      this.coin = []; // Reset chart data

      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
      console.log("Hiding modal!!!!!");
    },
    // When user wants to update coin amount
    UpdateCoinAmount: function UpdateCoinAmount() {
      var _this2 = this;

      // Retrieve new value form input
      var newAmount = this.$refs['amount'].value; // Check if new amount is valid

      if (newAmount == undefined || isNaN(newAmount) || parseFloat(newAmount) <= 0 || this.coin.count == newAmount) {
        console.log("ERROR: Tried to parse amount entered, but value was empty, not a valid float or equal to current amount!");
        return;
      }

      console.log("Updating " + this.coin.id + " to new amount: " + parseFloat(newAmount)); // Create form data

      var formData = new FormData();
      formData.append("count", newAmount); // Send post request to update coin amount

      axios__WEBPACK_IMPORTED_MODULE_2___default.a.post("/mycoins/" + this.coin.id, formData).then(function (response) {
        return _this2.CoinAmountUpdated(response, _this2.coin.id);
      });
    },
    // When coin amount has been updated
    CoinAmountUpdated: function CoinAmountUpdated(response, coinId) {
      console.log(response); // Get new amount

      var newAmount = response.data; // Check if amount is valid

      if (newAmount == undefined || newAmount == '' || isNaN(newAmount) || parseFloat(newAmount) <= 0 || this.coin.id != coinId) {
        console.log("ERROR: Tried to parse new coin amount, but returned value isn't valid or a new coin is shown!");
        return;
      } // Update count


      this.$refs['amount'].value = newAmount;
      console.log("Succesfully updated coin amount to: " + newAmount + "!");
    }
  },
  mounted: function mounted() {
    Event.$on('showGraph', this.PresentModal);
    jquery__WEBPACK_IMPORTED_MODULE_3___default()("#modal").on('hide.bs.modal', this.ResetModal);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinnews.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/coinnews.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
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
  name: "coinnews",
  data: function data() {
    return {
      data: []
    };
  },
  methods: {
    GetNewsData: function GetNewsData() {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("https://cryptocontrol.io/api/v1/public/news?language=en", {
        'headers': {
          'x-api-key': "ca309c24e5710df683fcfbeb52ebd9fd"
        }
      }).then(function (response) {
        _this.data = response.data;

        _this.data.forEach(function (news) {
          news.publishedAt = moment__WEBPACK_IMPORTED_MODULE_0___default()(news.publishedAt).format('LL');
        });

        console.log(_this.data);
      });
    }
  },
  mounted: function mounted() {
    this.GetNewsData();
  }
  /*
      _id: (...)
      hotness: 73233.99238355865
      activityHotness: (...)
      primaryCategory: (...)
      words: (...)
      similarArticles: (...)
      coins: (...)
      description: (...)
      publishedAt: (...)
      title: (...)
      url: (...)
      source: (...)
      thumbnail: (...)
      sourceDomain: (...)
      originalImageUrl: (...)
  */

});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinportfolio.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/coinportfolio.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
  name: "coinportfolio",
  data: function data() {
    return {
      myCoins: []
    };
  },
  methods: {
    // When user wants to update coin amount
    UpdateCoinAmount: function UpdateCoinAmount(coinId) {
      var _this = this;

      // Retrieve new value form input
      var newAmount = this.$refs['amount-' + coinId][0].value; // Retrieve coin to update

      var myCoin = this.myCoins.find(function (myCoin) {
        return myCoin.coin_id === coinId;
      }); // Check if new amount is valid

      if (myCoin == undefined || newAmount == undefined || isNaN(newAmount) || parseFloat(newAmount) <= 0 || myCoin.count == newAmount) {
        console.log("ERROR: Tried to parse amount entered, but value was empty, not a valid float or equal to current amount!");
        return;
      }

      console.log("Updating " + myCoin.coin_id + " to new amount: " + parseFloat(newAmount)); // Create form data

      var formData = new FormData();
      formData.append("coin_id", myCoin.coin_id);
      formData.append("count", newAmount); // Send post request to update coin amount

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/mycoins", formData).then(function (response) {
        return _this.CoinAmountUpdated(response, myCoin);
      });
    },
    // When coin amount has been updated
    CoinAmountUpdated: function CoinAmountUpdated(response, myCoin) {
      console.log(response); // Get new amount

      var newAmount = response.data; // Check if amount is valid

      if (newAmount == undefined || newAmount == '' || isNaN(newAmount) || parseFloat(newAmount) <= 0) {
        console.log("ERROR: Tried to parse new coin amount, but returned value isn't valid!");
        return;
      }

      console.log("Succesfully updated coin amount to: " + newAmount + "!"); // Update local count

      myCoin.count = newAmount;
    },
    // When user wants to remove a coin
    RemoveCoin: function RemoveCoin(coinId) {
      var _this2 = this;

      console.log("Removing " + coinId); // Retrieve coin to delete

      var myCoin = this.myCoins.find(function (myCoin) {
        return myCoin.coin_id === coinId;
      }); // Check if coin found

      if (myCoin == undefined) {
        console.log("ERROR: Tried to retrieve coin to delete, but coin was not found!");
        return;
      } // Send delete request to delete coin


      axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"]("/mycoins/" + myCoin.coin_id).then(function (response) {
        return _this2.CoinRemoved(response);
      });
    },
    // When coin has been removed
    CoinRemoved: function CoinRemoved(response) {
      console.log(response); // Get coin id

      var coinId = response.data; // Check if id is valid

      if (coinId == undefined || coinId == '') {
        console.log("ERROR: Tried to parse deleted coin, but returned coin id isn't valid!");
        return;
      } // Remove element from my coins array


      this.myCoins.splice(this.myCoins.findIndex(function (coin) {
        return coin.coin_id == coinId;
      }), 1); // No more coins, redirect user

      if (myCoins.length == 0) this.RedirectUser();
    },
    // Retrieved my coins
    MyCoinsRetrieved: function MyCoinsRetrieved(response) {
      var _this3 = this;

      // Set data
      this.myCoins = response.data; // No coins retrieved, redirect user

      if (this.myCoins == undefined || this.myCoins.length == 0) {
        this.RedirectUser();
        return;
      }

      console.log("Retrieved my coins successfully!"); // Coin cap url

      var coinCapUrl = 'https://api.coincap.io/v2/assets?ids='; // Add each id to coin cap url

      this.myCoins.forEach(function (coin) {
        coinCapUrl += coin.coin_id + ',';
      });
      console.log("Getting coin data about my coins from url: " + coinCapUrl); // Retrieve coin data

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(coinCapUrl).then(function (response) {
        return _this3.CoinDataRetrieved(response);
      });
    },
    // When coin data retrieved, add data from coins to my coin array
    CoinDataRetrieved: function CoinDataRetrieved(response) {
      var _this4 = this;

      response.data.data.forEach(function (coin) {
        // Find coin by id
        var myCoin = _this4.myCoins.find(function (myCoin) {
          return myCoin.coin_id === coin.id;
        }); // Update price if coin found


        if (myCoin != null) {
          myCoin.name = coin.name;
          myCoin.symbol = coin.symbol;
          myCoin.priceUsd = parseFloat(coin.priceUsd).toFixed(8);
        }
      }); // Force update

      this.$forceUpdate();
      console.log("Retrieved data for my coins successfully!");
    },
    RedirectUser: function RedirectUser() {
      window.location.href = "/";
    }
  },
  mounted: function mounted() {
    var _this5 = this;

    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/mycoins").then(function (response) {
      return _this5.MyCoinsRetrieved(response);
    });
  }
});

/***/ }),

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
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "cointable",
  data: function data() {
    return {
      coins: [],
      sort: 'rank',
      sortDir: 'asc',
      filter: ''
    };
  },
  methods: {
    // Emits show graph event with corresponding coin
    ShowGraph: function ShowGraph(coin) {
      console.log("Raising show graph event for coin: " + coin);
      Event.$emit('showGraph', coin);
    },
    // Updates the table with a new sort
    SortTable: function SortTable(newSort) {
      // If same sort, reverse order
      if (newSort === this.sort) this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'; // Else reset to ascending
      else this.sortDir = 'asc'; // Update current sort

      this.sort = newSort;
    },
    // Updates price on new price received
    UpdatePrices: function UpdatePrices(prices) {
      for (var key in prices) {
        // Find coin by id
        var coin = this.coins.find(function (coin) {
          return coin.id === key;
        }); // Update price if coin found

        if (coin != null) coin.priceUsd = prices[key];
      }
    },
    OnScroll: function OnScroll() {
      var _this = this;

      window.onscroll = function () {
        if (window.scrollY + window.innerHeight > document.body.scrollHeight - 1) {
          _this.LoadMore();
        }
      };
    },
    LoadMore: function LoadMore() {
      console.log("Loading more images!");
    }
  },
  computed: {
    // Reactive array of coins sorted by current configuration
    sortedCoins: function sortedCoins() {
      var _this2 = this;

      var filteredCoins = this.coins;
      if (this.filter != '') filteredCoins = this.coins.filter(function (coin) {
        return coin.name.toLowerCase().trim().includes(_this2.filter.toLowerCase().trim());
      });
      console.log(this.filter);
      console.log(filteredCoins);
      return filteredCoins.sort(function (a, b) {
        if (_this2.sort == 'name' || _this2.sort == 'symbol') {
          var modifier = 1; // Descending, reverse order

          if (_this2.sortDir == 'desc') modifier = -1; // String is alphabetically later

          if (a[_this2.sort] > b[_this2.sort]) return modifier; // String is alphabetically first

          if (a[_this2.sort] < b[_this2.sort]) return -modifier; // Strings are equal

          return 0;
        } // Return sorting order


        if (_this2.sortDir == 'asc') return a[_this2.sort] - b[_this2.sort];else return b[_this2.sort] - a[_this2.sort];
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.OnScroll(); // Retrieve initial coin data + initialize web socket when done

    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("https://api.coincap.io/v2/assets").then(function (response) {
      _this3.coins = response.data.data;
      console.log(_this3.coins); // Normalize values to 2 decimals

      _this3.coins.forEach(function (coin) {
        coin.priceUsd = parseFloat(coin.priceUsd).toFixed(8);
        coin.marketCapUsd = parseFloat(coin.marketCapUsd).toFixed(2);
        coin.changePercent24Hr = parseFloat(coin.changePercent24Hr).toFixed(2);
        coin.volumeUsd24Hr = parseFloat(coin.volumeUsd24Hr).toFixed(2);
        coin.supply = parseFloat(coin.supply).toFixed(2);
      });

      var assets = []; // Constructs list of all assets, using coin id + ','

      _this3.coins.forEach(function (coin) {
        assets.push(coin.id + ',');
      }); // Init websocket from adress with all 200 assets


      var priceUpdate = new WebSocket('wss://ws.coincap.io/prices?assets=' + assets); // On price update, update prices

      priceUpdate.onmessage = function (msg) {
        return _this3.UpdatePrices(JSON.parse(msg.data));
      };

      ;
    });
  }
});

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinmodal.vue?vue&type=template&id=1b7e7b01&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/coinmodal.vue?vue&type=template&id=1b7e7b01& ***!
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
  return _c(
    "div",
    {
      staticClass: "modal",
      attrs: { id: "modal", tabindex: "-1", role: "dialog" }
    },
    [
      _c(
        "div",
        { staticClass: "modal-dialog modal-xl", attrs: { role: "document" } },
        [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-header" }, [
              _c("h2", { staticClass: "text-bold text-success" }, [
                _vm._v(
                  _vm._s(_vm.coin.name) + " (" + _vm._s(_vm.coin.symbol) + ")"
                )
              ]),
              _vm._v(" "),
              _vm._m(0)
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body row" }, [
              _c("div", { staticClass: "col-sm-3" }, [
                _c("div", { staticClass: "card" }, [
                  _c("div", { staticClass: "card-body" }, [
                    _c("h5", { staticClass: "card-title text-success" }, [
                      _vm._v("Price")
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "card-text" }, [
                      _vm._v("$ " + _vm._s(_vm.coin.priceUsd))
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-sm-3" }, [
                _c("div", { staticClass: "card" }, [
                  _c("div", { staticClass: "card-body" }, [
                    _c("h5", { staticClass: "card-title text-success" }, [
                      _vm._v("Market cap")
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "card-text" }, [
                      _vm._v("$ " + _vm._s(_vm.coin.marketCapUsd))
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-sm-3" }, [
                _c("div", { staticClass: "card" }, [
                  _c("div", { staticClass: "card-body" }, [
                    _c("h5", { staticClass: "card-title text-success" }, [
                      _vm._v("Supply")
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "card-text" }, [
                      _vm._v(_vm._s(_vm.coin.supply))
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-sm-3" }, [
                _c("div", { staticClass: "card" }, [
                  _c("div", { staticClass: "card-body" }, [
                    _c("h5", { staticClass: "card-title text-success" }, [
                      _vm._v("Volume")
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "card-text" }, [
                      _vm._v(_vm._s(_vm.coin.volumeUsd24Hr))
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _vm.loggedin
                ? _c(
                    "div",
                    {
                      staticClass:
                        "input-group col-md-6 justify-content-center mt-3 mb-3"
                    },
                    [
                      _c("input", {
                        ref: "amount",
                        staticClass: "form-control",
                        attrs: {
                          value: "",
                          type: "text",
                          placeholder: "Amount",
                          "aria-label": "Amount"
                        }
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group-append" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-outline-success",
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                return _vm.UpdateCoinAmount()
                              }
                            }
                          },
                          [_vm._v("Set # owned")]
                        )
                      ]),
                      _vm._v(" "),
                      _vm._m(1)
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-md-12" },
                [
                  _vm.chartData.labels.length
                    ? _c("line-chart", {
                        attrs: {
                          "chart-data": _vm.chartData,
                          options: _vm.options
                        }
                      })
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              !_vm.chartData.labels.length
                ? _c(
                    "div",
                    {
                      staticClass:
                        "d-flex col-md-12 justify-content-center mt-3"
                    },
                    [_vm._m(2)]
                  )
                : _vm._e()
            ])
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c(
        "a",
        {
          staticClass: "btn btn-outline-success",
          attrs: { href: "/portfolio" }
        },
        [_vm._v("Manage coins")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border text-success", attrs: { role: "status" } },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinnews.vue?vue&type=template&id=58298fa2&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/coinnews.vue?vue&type=template&id=58298fa2& ***!
  \***********************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "col-md-8 justify-content-center" },
    [
      _vm._l(_vm.data, function(news) {
        return _c("div", { key: news.id, staticClass: "card mb-2" }, [
          _c("div", { staticClass: "card-body row" }, [
            _c("div", { staticClass: "col-md-3" }, [
              _c("a", { attrs: { href: news.url } }, [
                _c("img", {
                  attrs: { src: news.thumbnail, alt: "Article image" }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-9" }, [
              _c("a", { attrs: { href: news.url } }, [
                _c("h5", { staticClass: "card-title text-success" }, [
                  _vm._v(_vm._s(news.title))
                ])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "card-text" }, [
                _vm._v(_vm._s(news.description))
              ])
            ]),
            _vm._v(" "),
            _c("a", { attrs: { href: news.url } }, [
              _c(
                "p",
                {
                  staticClass:
                    "text-muted font-weight-lighter font-italic mb-0 ml-3 mt-2"
                },
                [
                  _vm._v(
                    "Source: " +
                      _vm._s(news.source.name) +
                      ", " +
                      _vm._s(news.publishedAt)
                  )
                ]
              )
            ])
          ])
        ])
      }),
      _vm._v(" "),
      !_vm.data.length
        ? _c("div", { staticClass: "d-flex justify-content-center mt-5" }, [
            _vm._m(0)
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border text-success", attrs: { role: "status" } },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinportfolio.vue?vue&type=template&id=75db7bc8&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/coinportfolio.vue?vue&type=template&id=75db7bc8& ***!
  \****************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "col-md-12" }, [
    _c("table", { staticClass: "bg-light table table-bordered" }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "tbody",
        _vm._l(_vm.myCoins, function(coin) {
          return _c("tr", { key: coin.coin_id }, [
            _c("td", [_vm._v(_vm._s(coin.name) + " ")]),
            _vm._v(" "),
            _c("td", [
              _c("img", {
                staticClass: "mr-2",
                attrs: {
                  height: "20",
                  src: "images/coin-logos/" + coin.coin_id + ".png"
                }
              }),
              _vm._v(_vm._s(coin.symbol))
            ]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(coin.priceUsd))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(coin.priceUsd * coin.count))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(coin.count))]),
            _vm._v(" "),
            _c("td", [
              _c("div", { staticClass: "input-group mb-3" }, [
                _c("input", {
                  ref: "amount-" + coin.coin_id,
                  refInFor: true,
                  staticClass: "form-control",
                  attrs: {
                    type: "text",
                    placeholder: "Amount",
                    "aria-label": "Amount"
                  },
                  domProps: { value: coin.count }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "input-group-append" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-success",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.UpdateCoinAmount(coin.coin_id)
                        }
                      }
                    },
                    [_vm._v("Set # owned")]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "input-group-append" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-danger",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.RemoveCoin(coin.coin_id)
                        }
                      }
                    },
                    [_vm._v("Remove")]
                  )
                ])
              ])
            ])
          ])
        }),
        0
      )
    ]),
    _vm._v(" "),
    !_vm.myCoins.length
      ? _c("div", { staticClass: "d-flex justify-content-center" }, [_vm._m(1)])
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", { staticClass: "thead-dark" }, [
      _c("tr", [
        _c("th", { staticClass: "text-center border-success bg-green" }, [
          _vm._v("Name")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center border-success bg-green" }, [
          _vm._v("Symbol")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center border-success bg-green" }, [
          _vm._v("Price $")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center border-success bg-green" }, [
          _vm._v("Owned $")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center border-success bg-green" }, [
          _vm._v("Owned #")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center border-success bg-green" }, [
          _vm._v("Set # owned")
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border text-success", attrs: { role: "status" } },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
    )
  }
]
render._withStripped = true



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
  return _c("div", { staticClass: "col-md-12" }, [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.filter,
          expression: "filter"
        }
      ],
      staticClass: "form-control col-md-3 mb-3",
      attrs: { type: "text", placeholder: "Search", "aria-label": "Search" },
      domProps: { value: _vm.filter },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.filter = $event.target.value
        }
      }
    }),
    _vm._v(" "),
    _c(
      "table",
      {
        staticClass: "bg-light table table-bordered table-hover",
        attrs: { id: "table-coin" }
      },
      [
        _c("thead", { staticClass: "thead-dark" }, [
          _c("tr", [
            _c(
              "th",
              {
                staticClass: "text-center border-success bg-green",
                on: {
                  click: function($event) {
                    return _vm.SortTable("rank")
                  }
                }
              },
              [_vm._v("Rank")]
            ),
            _vm._v(" "),
            _c(
              "th",
              {
                staticClass: "text-center border-success bg-green",
                on: {
                  click: function($event) {
                    return _vm.SortTable("name")
                  }
                }
              },
              [_vm._v("Name")]
            ),
            _vm._v(" "),
            _c(
              "th",
              {
                staticClass: "text-center border-success bg-green",
                on: {
                  click: function($event) {
                    return _vm.SortTable("symbol")
                  }
                }
              },
              [_vm._v("Symbol")]
            ),
            _vm._v(" "),
            _c(
              "th",
              {
                staticClass: "text-center border-success bg-green",
                on: {
                  click: function($event) {
                    return _vm.SortTable("priceUsd")
                  }
                }
              },
              [_vm._v("Price $")]
            ),
            _vm._v(" "),
            _c(
              "th",
              {
                staticClass: "text-center border-success bg-green",
                on: {
                  click: function($event) {
                    return _vm.SortTable("marketCapUsd")
                  }
                }
              },
              [_vm._v("Market cap $")]
            ),
            _vm._v(" "),
            _c(
              "th",
              {
                staticClass: "text-center border-success bg-green",
                on: {
                  click: function($event) {
                    return _vm.SortTable("changePercent24Hr")
                  }
                }
              },
              [_vm._v("% 24hr")]
            )
          ])
        ]),
        _vm._v(" "),
        _c(
          "tbody",
          _vm._l(_vm.sortedCoins, function(coin) {
            return _c(
              "tr",
              {
                key: coin.rank,
                on: {
                  click: function($event) {
                    return _vm.ShowGraph(coin)
                  }
                }
              },
              [
                _c("td", [_vm._v(_vm._s(coin.rank))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(coin.name) + " ")]),
                _vm._v(" "),
                _c("td", [
                  _c("img", {
                    staticClass: "mr-2",
                    attrs: {
                      height: "20",
                      src: "images/coin-logos/" + coin.id + ".png"
                    }
                  }),
                  _vm._v(_vm._s(coin.symbol))
                ]),
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
    !_vm.coins.length
      ? _c("div", { staticClass: "d-flex justify-content-center" }, [_vm._m(0)])
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border text-success", attrs: { role: "status" } },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/LineChart.js":
/*!***********************************!*\
  !*** ./resources/js/LineChart.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/es/index.js");

var reactiveProp = vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["mixins"].reactiveProp;
/* harmony default export */ __webpack_exports__["default"] = ({
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["Line"],
  mixins: [reactiveProp],
  props: ['options'],
  mounted: function mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  }
});

/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_coinportfolio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/coinportfolio */ "./resources/js/components/coinportfolio.vue");
/* harmony import */ var _components_cointable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/cointable */ "./resources/js/components/cointable.vue");
/* harmony import */ var _components_coinmodal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/coinmodal */ "./resources/js/components/coinmodal.vue");
/* harmony import */ var _components_coinnews__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/coinnews */ "./resources/js/components/coinnews.vue");






 // Enable vue event logic

window.Event = new vue__WEBPACK_IMPORTED_MODULE_2___default.a();
axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
new vue__WEBPACK_IMPORTED_MODULE_2___default.a({
  el: '#root',
  components: {
    coinportfolio: _components_coinportfolio__WEBPACK_IMPORTED_MODULE_3__["default"],
    cointable: _components_cointable__WEBPACK_IMPORTED_MODULE_4__["default"],
    coinmodal: _components_coinmodal__WEBPACK_IMPORTED_MODULE_5__["default"],
    coinnews: _components_coinnews__WEBPACK_IMPORTED_MODULE_6__["default"]
  }
});

/***/ }),

/***/ "./resources/js/components/coinmodal.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/coinmodal.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _coinmodal_vue_vue_type_template_id_1b7e7b01___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coinmodal.vue?vue&type=template&id=1b7e7b01& */ "./resources/js/components/coinmodal.vue?vue&type=template&id=1b7e7b01&");
/* harmony import */ var _coinmodal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coinmodal.vue?vue&type=script&lang=js& */ "./resources/js/components/coinmodal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _coinmodal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _coinmodal_vue_vue_type_template_id_1b7e7b01___WEBPACK_IMPORTED_MODULE_0__["render"],
  _coinmodal_vue_vue_type_template_id_1b7e7b01___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/coinmodal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/coinmodal.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/coinmodal.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coinmodal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./coinmodal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinmodal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coinmodal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/coinmodal.vue?vue&type=template&id=1b7e7b01&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/coinmodal.vue?vue&type=template&id=1b7e7b01& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coinmodal_vue_vue_type_template_id_1b7e7b01___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./coinmodal.vue?vue&type=template&id=1b7e7b01& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinmodal.vue?vue&type=template&id=1b7e7b01&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coinmodal_vue_vue_type_template_id_1b7e7b01___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coinmodal_vue_vue_type_template_id_1b7e7b01___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/coinnews.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/coinnews.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _coinnews_vue_vue_type_template_id_58298fa2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coinnews.vue?vue&type=template&id=58298fa2& */ "./resources/js/components/coinnews.vue?vue&type=template&id=58298fa2&");
/* harmony import */ var _coinnews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coinnews.vue?vue&type=script&lang=js& */ "./resources/js/components/coinnews.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _coinnews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _coinnews_vue_vue_type_template_id_58298fa2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _coinnews_vue_vue_type_template_id_58298fa2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/coinnews.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/coinnews.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/coinnews.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coinnews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./coinnews.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinnews.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coinnews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/coinnews.vue?vue&type=template&id=58298fa2&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/coinnews.vue?vue&type=template&id=58298fa2& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coinnews_vue_vue_type_template_id_58298fa2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./coinnews.vue?vue&type=template&id=58298fa2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinnews.vue?vue&type=template&id=58298fa2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coinnews_vue_vue_type_template_id_58298fa2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coinnews_vue_vue_type_template_id_58298fa2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/coinportfolio.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/coinportfolio.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _coinportfolio_vue_vue_type_template_id_75db7bc8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coinportfolio.vue?vue&type=template&id=75db7bc8& */ "./resources/js/components/coinportfolio.vue?vue&type=template&id=75db7bc8&");
/* harmony import */ var _coinportfolio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coinportfolio.vue?vue&type=script&lang=js& */ "./resources/js/components/coinportfolio.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _coinportfolio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _coinportfolio_vue_vue_type_template_id_75db7bc8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _coinportfolio_vue_vue_type_template_id_75db7bc8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/coinportfolio.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/coinportfolio.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/coinportfolio.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coinportfolio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./coinportfolio.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinportfolio.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coinportfolio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/coinportfolio.vue?vue&type=template&id=75db7bc8&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/coinportfolio.vue?vue&type=template&id=75db7bc8& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coinportfolio_vue_vue_type_template_id_75db7bc8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./coinportfolio.vue?vue&type=template&id=75db7bc8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/coinportfolio.vue?vue&type=template&id=75db7bc8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coinportfolio_vue_vue_type_template_id_75db7bc8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coinportfolio_vue_vue_type_template_id_75db7bc8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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