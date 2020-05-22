/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~analytics~main","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/data.csv":
/*!*************************!*\
  !*** ./assets/data.csv ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [["Year","Industry_aggregation_NZSIOC","Industry_code_NZSIOC","Industry_name_NZSIOC","Units","Variable_code","Variable_name","Variable_category","Value","Industry_code_ANZSIC06"],["2018","Level 1","99999","All industries","Dollars (millions)","H01","Total income","Financial performance","691859","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H04","Sales, government funding, grants and subsidies","Financial performance","605766","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H05","Interest, dividends and donations","Financial performance","63509","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H07","Non-operating income","Financial performance","22583","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H08","Total expenditure","Financial performance","597623","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H09","Interest and donations","Financial performance","34223","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H10","Indirect taxes","Financial performance","7124","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H11","Depreciation","Financial performance","19863","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H12","Salaries and wages paid","Financial performance","106351","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H13","Redundancy and severance","Financial performance","297","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H14","Salaries and wages to self employed commission agents","Financial performance","1659","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H19","Purchases and other operating expenses","Financial performance","418642","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H20","Non-operating expenses","Financial performance","9762","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H21","Opening stocks","Financial performance","59433","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H22","Closing stocks","Financial performance","63592","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H23","Surplus before income tax","Financial performance","98395","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H24","Total assets","Financial position","2068648","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H25","Current assets","Financial position","571177","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H26","Fixed tangible assets","Financial position","499274","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H29","Other assets","Financial position","998194","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H30","Total equity and liabilities","Financial position","2068649","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H31","Shareholders funds or owners equity","Financial position","700186","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H32","Current liabilities","Financial position","740971","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars (millions)","H33","Other liabilities","Financial position","627488","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars","H34","Total income per employee count","Financial ratios","376800","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Dollars","H35","Surplus per employee count","Financial ratios","53600","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Percentage","H36","Current ratio","Financial ratios","77","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Percentage","H37","Quick ratio","Financial ratios","69","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Percentage","H39","Return on equity","Financial ratios","14","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Percentage","H40","Return on total assets","Financial ratios","5","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","99999","All industries","Percentage","H41","Liabilities structure","Financial ratios","34","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H01","Total income","Financial performance","44753","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H04","Sales of goods and services","Financial performance","41108","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H05","Interest, dividends and donations","Financial performance","540","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H06","Government funding, grants and subsidies","Financial performance","12","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H07","Non-operating income","Financial performance","3093","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H08","Total expenditure","Financial performance","36651","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H09","Interest and donations","Financial performance","2860","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H10","Indirect taxes","Financial performance","451","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H11","Depreciation","Financial performance","1963","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H12","Salaries and wages paid","Financial performance","5283","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H13","Redundancy and severance","Financial performance","0","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H19","Purchases and other operating expenses","Financial performance","25638","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H20","Non-operating expenses","Financial performance","454","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H21","Opening stocks","Financial performance","14370","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H22","Closing stocks","Financial performance","14467","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H23","Surplus before income tax","Financial performance","8200","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H24","Total assets","Financial position","171053","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H25","Current assets","Financial position","33397","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H26","Fixed tangible assets","Financial position","97637","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H29","Other assets","Financial position","40018","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H30","Total equity and liabilities","Financial position","171053","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H31","Shareholders funds or owners equity","Financial position","80270","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H32","Current liabilities","Financial position","29317","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars (millions)","H33","Other liabilities","Financial position","61465","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars","H34","Total income per employee count","Financial ratios","395500","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Dollars","H35","Surplus per employee count","Financial ratios","72500","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Percentage","H36","Current ratio","Financial ratios","114","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Percentage","H37","Quick ratio","Financial ratios","65","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Percentage","H39","Return on equity","Financial ratios","10","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Percentage","H40","Return on total assets","Financial ratios","5","ANZSIC06 division A"],["2018","Level 1","AA","Agriculture, Forestry and Fishing","Percentage","H41","Liabilities structure","Financial ratios","47","ANZSIC06 division A"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H01","Total income","Financial performance","4432","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H04","Sales, government funding, grants and subsidies","Financial performance","4119","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H05","Interest, dividends and donations","Financial performance","101","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H07","Non-operating income","Financial performance","211","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H08","Total expenditure","Financial performance","3579","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H09","Interest and donations","Financial performance","180","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H10","Indirect taxes","Financial performance","33","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H11","Depreciation","Financial performance","200","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H12","Salaries and wages paid","Financial performance","744","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H13","Redundancy and severance","Financial performance","0","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H19","Purchases and other operating expenses","Financial performance","2408","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H20","Non-operating expenses","Financial performance","14","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H21","Opening stocks","Financial performance","317","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H22","Closing stocks","Financial performance","317","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H23","Surplus before income tax","Financial performance","854","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H24","Total assets","Financial position","13187","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H25","Current assets","Financial position","2352","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H26","Fixed tangible assets","Financial position","8714","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H29","Other assets","Financial position","2121","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H30","Total equity and liabilities","Financial position","13187","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H31","Shareholders funds or owners equity","Financial position","6107","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H32","Current liabilities","Financial position","3213","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars (millions)","H33","Other liabilities","Financial position","3867","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars","H34","Total income per employee count","Financial ratios","179700","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Dollars","H35","Surplus per employee count","Financial ratios","34600","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Percentage","H36","Current ratio","Financial ratios","73","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Percentage","H37","Quick ratio","Financial ratios","63","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Percentage","H39","Return on equity","Financial ratios","14","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Percentage","H40","Return on total assets","Financial ratios","6","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA11","Horticulture and Fruit Growing","Percentage","H41","Liabilities structure","Financial ratios","46","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H01","Total income","Financial performance","4432","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H04","Sales, government funding, grants and subsidies","Financial performance","4119","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H05","Interest, dividends and donations","Financial performance","101","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H07","Non-operating income","Financial performance","211","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H08","Total expenditure","Financial performance","3579","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H09","Interest and donations","Financial performance","180","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H10","Indirect taxes","Financial performance","33","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H11","Depreciation","Financial performance","200","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H12","Salaries and wages paid","Financial performance","744","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H13","Redundancy and severance","Financial performance","0","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H19","Purchases and other operating expenses","Financial performance","2408","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H20","Non-operating expenses","Financial performance","14","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H21","Opening stocks","Financial performance","317","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H22","Closing stocks","Financial performance","317","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H23","Surplus before income tax","Financial performance","854","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H24","Total assets","Financial position","13187","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H25","Current assets","Financial position","2352","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H26","Fixed tangible assets","Financial position","8714","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H29","Other assets","Financial position","2121","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H30","Total equity and liabilities","Financial position","13187","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H31","Shareholders funds or owners equity","Financial position","6107","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H32","Current liabilities","Financial position","3213","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars (millions)","H33","Other liabilities","Financial position","3867","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars","H34","Total income per employee count","Financial ratios","179700","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Dollars","H35","Surplus per employee count","Financial ratios","34600","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Percentage","H36","Current ratio","Financial ratios","73","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Percentage","H37","Quick ratio","Financial ratios","63","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Percentage","H39","Return on equity","Financial ratios","14","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Percentage","H40","Return on total assets","Financial ratios","6","ANZSIC06 groups A011, A012, and A013"],["2018","Level 4","AA111","Horticulture and Fruit Growing","Percentage","H41","Liabilities structure","Financial ratios","46","ANZSIC06 groups A011, A012, and A013"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H01","Total income","Financial performance","11555","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H04","Sales, government funding, grants and subsidies","Financial performance","10812","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H05","Interest, dividends and donations","Financial performance","135","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H07","Non-operating income","Financial performance","608","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H08","Total expenditure","Financial performance","9867","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H09","Interest and donations","Financial performance","699","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H10","Indirect taxes","Financial performance","178","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H11","Depreciation","Financial performance","526","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H12","Salaries and wages paid","Financial performance","998","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H13","Redundancy and severance","Financial performance","0","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H19","Purchases and other operating expenses","Financial performance","7416","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H20","Non-operating expenses","Financial performance","50","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H21","Opening stocks","Financial performance","6246","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H22","Closing stocks","Financial performance","6393","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H23","Surplus before income tax","Financial performance","1835","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H24","Total assets","Financial position","56454","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H25","Current assets","Financial position","12803","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H26","Fixed tangible assets","Financial position","35858","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H29","Other assets","Financial position","7793","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H30","Total equity and liabilities","Financial position","56454","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H31","Shareholders funds or owners equity","Financial position","31056","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H32","Current liabilities","Financial position","9333","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H33","Other liabilities","Financial position","16065","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars","H34","Total income per employee count","Financial ratios","542300","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Dollars","H35","Surplus per employee count","Financial ratios","86100","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Percentage","H36","Current ratio","Financial ratios","137","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Percentage","H37","Quick ratio","Financial ratios","69","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Percentage","H39","Return on equity","Financial ratios","6","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Percentage","H40","Return on total assets","Financial ratios","3","ANZSIC06 groups A014 and A015"],["2018","Level 3","AA12","Sheep, Beef Cattle and Grain Farming","Percentage","H41","Liabilities structure","Financial ratios","55","ANZSIC06 groups A014 and A015"],["2018","Level 4","AA121","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H01","Total income","Financial performance","11555","ANZSIC06 groups A014 and A015"],["2018","Level 4","AA121","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H04","Sales, government funding, grants and subsidies","Financial performance","10812","ANZSIC06 groups A014 and A015"],["2018","Level 4","AA121","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H05","Interest, dividends and donations","Financial performance","135","ANZSIC06 groups A014 and A015"],["2018","Level 4","AA121","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H07","Non-operating income","Financial performance","608","ANZSIC06 groups A014 and A015"],["2018","Level 4","AA121","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H08","Total expenditure","Financial performance","9867","ANZSIC06 groups A014 and A015"],["2018","Level 4","AA121","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H09","Interest and donations","Financial performance","699","ANZSIC06 groups A014 and A015"],["2018","Level 4","AA121","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H10","Indirect taxes","Financial performance","178","ANZSIC06 groups A014 and A015"],["2018","Level 4","AA121","Sheep, Beef Cattle and Grain Farming","Dollars (millions)","H11","Depreciation","Financial performance","526","ANZSIC06 groups A014 and A015"]]

/***/ }),

/***/ "./assets/data.xml":
/*!*************************!*\
  !*** ./assets/data.xml ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {"email":{"to":["Oleg"],"from":["WebPack"],"heading":["Tutorial"],"body":["First record"]}}

/***/ }),

/***/ "./assets/json.json":
/*!**************************!*\
  !*** ./assets/json.json ***!
  \**************************/
/*! exports provided: title, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"I am JSON title\"}");

/***/ }),

/***/ "./assets/webpack-logo.png":
/*!*********************************!*\
  !*** ./assets/webpack-logo.png ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "47692505d122dbcae490be2492a60b2e.png");

/***/ }),

/***/ "./babel.js":
/*!******************!*\
  !*** ./babel.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function start() {
  return _start.apply(this, arguments);
}

function _start() {
  _start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.resolve('Async is working');

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _start.apply(this, arguments);
}

start().then(console.log);
var unused = 42;

var Util = function Util() {
  _classCallCheck(this, Util);
};

_defineProperty(Util, "id", Date.now());

console.log('Util ID: ', Util.id); // console.log('unused: ', unused);

__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! lodash */ "../node_modules/lodash/lodash.js", 7)).then(function (_) {
  console.log('Lodash: ', _.random(0, 99, true));
});

/***/ }),

/***/ "./index.jsx":
/*!*******************!*\
  !*** ./index.jsx ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_Post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @models/Post */ "./models/Post.js");
/* harmony import */ var _assets_json_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/json.json */ "./assets/json.json");
var _assets_json_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./assets/json.json */ "./assets/json.json", 1);
/* harmony import */ var _assets_data_xml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/data.xml */ "./assets/data.xml");
/* harmony import */ var _assets_data_xml__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_data_xml__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_data_csv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/data.csv */ "./assets/data.csv");
/* harmony import */ var _assets_data_csv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_data_csv__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_webpack_logo_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/assets/webpack-logo.png */ "./assets/webpack-logo.png");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/babel.js */ "./babel.js");
/* harmony import */ var _babel_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./styles/styles.css */ "./styles/styles.css");
/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _styles_less_less__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/styles/less.less */ "./styles/less.less");
/* harmony import */ var _styles_less_less__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_less_less__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _styles_scss_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/styles/scss.scss */ "./styles/scss.scss");
/* harmony import */ var _styles_scss_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_scss_scss__WEBPACK_IMPORTED_MODULE_11__);












var post = new _models_Post__WEBPACK_IMPORTED_MODULE_1__["Post"]('Webpack Post Title', _assets_webpack_logo_png__WEBPACK_IMPORTED_MODULE_5__["default"]);
jquery__WEBPACK_IMPORTED_MODULE_0__('pre').addClass('code').html(post.toString(_assets_json_json__WEBPACK_IMPORTED_MODULE_2__));

var App = function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h1", null, "Webpack template"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "by Ivantsov Oleg"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("hr", null));
};

Object(react_dom__WEBPACK_IMPORTED_MODULE_7__["render"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(App, null), document.getElementById('app')); // console.log('Post to String: ', post.toString());
//
// console.log('JSON', json);
// console.log('xml', xml);
// console.log('csv', csv);

/***/ }),

/***/ "./models/Post.js":
/*!************************!*\
  !*** ./models/Post.js ***!
  \************************/
/*! exports provided: Post */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Post", function() { return Post; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Post = /*#__PURE__*/function () {
  function Post(title, img) {
    _classCallCheck(this, Post);

    this.title = title;
    this.img = img;
    this.date = new Date();
  }

  _createClass(Post, [{
    key: "toString",
    value: function toString() {
      return JSON.stringify({
        title: this.title,
        date: this.date.toJSON(),
        img: this.img
      }, null, 1);
    }
  }, {
    key: "upperCaseTitle",
    get: function get() {
      return this.title.toUpperCase();
    }
  }]);

  return Post;
}();

/***/ }),

/***/ "./styles/less.less":
/*!**************************!*\
  !*** ./styles/less.less ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ "./styles/scss.scss":
/*!**************************!*\
  !*** ./styles/scss.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ "./styles/styles.css":
/*!***************************!*\
  !*** ./styles/styles.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi @babel/polyfill ./index.jsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @babel/polyfill */"../node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./index.jsx */"./index.jsx");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map