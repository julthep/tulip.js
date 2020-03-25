// Transcrypt'ed from Python, 2020-03-25 20:29:40
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var __author__ = 'Julthep Nandakwang';
export var __version__ = '0.1.2';
export var __license__ = 'LGPL-3.0';
export var TulipJS =  __class__ ('TulipJS', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, d) {
		self.member = (function () {
			var __accu0__ = [];
			for (var i = 0; i < len (d ['member']); i++) {
				__accu0__.append (TulipJS (d ['member'] [i]));
			}
			return __accu0__;
		}) ();
		self.py_metatype = dict ({'Group': d ['type'] ['Group'], 'Item': d ['type'] ['Item'], 'Page': d ['type'] ['Page'], 'Paragraph': d ['type'] ['Paragraph'], 'Table': d ['type'] ['Table'], 'Column': d ['type'] ['Column'], 'Row': d ['type'] ['Row'], 'Cell': d ['type'] ['Cell'], 'List': d ['type'] ['List'], 'ListItem': d ['type'] ['ListItem']});
		self.label = d ['label'];
		self.style = dict ({'Emphasize': d ['style'] ['Emphasize'], 'Enumerate': d ['style'] ['Enumerate'], 'ColMajor': d ['style'] ['ColMajor'], 'RowMajor': d ['style'] ['RowMajor'], 'GrpSpan': d ['style'] ['GrpSpan'], 'LineSpan': d ['style'] ['LineSpan'], 'GrpSpanBr': d ['style'] ['GrpSpanBr'], 'LineSpanBr': d ['style'] ['LineSpanBr']});
		self.dimension = d ['dimension'];
		self.link = d ['link'];
		self.local = dict ({'GrpSkip': null, 'LineSkip': null, 'GrpSpan': null, 'LineSpan': null, 'Hidden': null, 'Chart': null});
	});},
	get __len__ () {return __get__ (this, function (self) {
		return len (self.member);
	});},
	get __iter__ () {return __get__ (this, function* (self) {
		for (var item of self.member) {
			yield item;
		}
		});},
	[Symbol.iterator] () {return this.__iter__ ()},
	get to_list () {return __get__ (this, function (self) {
		for (var key of self.py_metatype.py_keys ()) {
			self.py_metatype [key] = null;
		}
		self.py_metatype ['List'] = true;
	});},
	get to_table () {return __get__ (this, function (self) {
		for (var key of self.py_metatype.py_keys ()) {
			self.py_metatype [key] = null;
		}
		self.py_metatype ['Table'] = true;
	});},
	get to_row_maj () {return __get__ (this, function (self) {
		self.style ['ColMajor'] = false;
		self.style ['RowMajor'] = true;
	});},
	get to_col_maj () {return __get__ (this, function (self) {
		self.style ['RowMajor'] = false;
		self.style ['ColMajor'] = true;
	});},
	get show () {return __get__ (this, function (self) {
		self.local ['Hidden'] = false;
	});},
	get hide () {return __get__ (this, function (self) {
		self.local ['Hidden'] = true;
	});},
	get chart_on () {return __get__ (this, function (self) {
		self.local ['Chart'] = true;
	});},
	get chart_off () {return __get__ (this, function (self) {
		self.local ['Chart'] = false;
	});}
});
export var tulip_obj = '';
export var to_list = function (tulip, id) {
	tulip.to_list ();
	regen (tulip_obj);
	draw_chart (tulip, id);
};
export var to_table = function (tulip, id) {
	tulip.to_table ();
	regen (tulip_obj);
	draw_chart (tulip, id);
};
export var to_row_maj = function (tulip, id) {
	tulip.to_row_maj ();
	regen (tulip_obj);
	draw_chart (tulip, id);
};
export var to_col_maj = function (tulip, id) {
	tulip.to_col_maj ();
	regen (tulip_obj);
	draw_chart (tulip, id);
};
export var show = function (tulip, id) {
	tulip.show ();
	regen (tulip_obj);
	draw_chart (tulip, id);
};
export var hide = function (tulip, id) {
	tulip.hide ();
	regen (tulip_obj);
	draw_chart (tulip, id);
};
export var chart_on = function (tulip, id) {
	tulip.chart_on ();
	regen (tulip_obj);
	draw_chart (tulip, id);
};
export var chart_off = function (tulip) {
	tulip.chart_off ();
	regen (tulip_obj);
};
export var draw_chart = function (tulip, id) {
	if (!(tulip.local ['Chart'])) {
		return ;
	}
	var col_major = (!(tulip.style ['RowMajor']) ? true : false);
	var chart_obj = 
	        {
	            type: null,
	            data: {
	                labels: [],
	                datasets: [],
	            },
	            options: {
	                responsive: true,
	                title: {
	                    display: true,
	                    text: null,
	                },
	                tooltips: {
	                    mode: 'index',
	                    intersect: false,
	                },
	                hover: {
	                    mode: 'nearest',
	                    intersect: true,
	                },
	                scales: {
	                    xAxes: [{
	                        display: true,
	                        scaleLabel: {
	                            display: false,
	                            labelString: null,
	                        },
	                    }],
	                    yAxes: [{
	                        display: true,
	                        scaleLabel: {
	                            display: false,
	                            labelString: null,
	                        },
	                    }],
	                },
	                animation: {
	                    duration: 0,
	                },
	                plugins: {
	                    colorschemes: {
	                        scheme: 'tableau.Tableau10',
	                    },
	                },
	            },
	        };
	chart_obj.type = 'line';
	chart_obj.options.title.text = tulip.label;
	if (col_major) {
		chart_obj.data.labels = (function () {
			var __accu0__ = [];
			for (var x of tulip.member.__getslice__ (1, null, 1)) {
				__accu0__.append (x.member [0].label);
			}
			return __accu0__;
		}) ();
		for (var [i, y] of enumerate (tulip.member [0].member.__getslice__ (1, null, 1))) {
			chart_obj.data.datasets.push ({ label: null, data: [], fill: false }
			);
			chart_obj.data.datasets [i] ['label'] = y.label;
		}
		for (var [i, x] of enumerate (tulip.member.__getslice__ (1, null, 1))) {
			for (var [j, y] of enumerate (x.member.__getslice__ (1, null, 1))) {
				chart_obj.data.datasets [j] ['data'] [i] = y.label.py_replace (',', '');
			}
		}
	}
	else {
		chart_obj.data.labels = (function () {
			var __accu0__ = [];
			for (var x of tulip.member [0].member.__getslice__ (1, null, 1)) {
				__accu0__.append (x.label);
			}
			return __accu0__;
		}) ();
		for (var [i, y] of enumerate (tulip.member.__getslice__ (1, null, 1))) {
			chart_obj.data.datasets.push ({ label: null, data: [], fill: false }
			);
			chart_obj.data.datasets [i] ['label'] = y.member [0].label;
		}
		for (var [i, x] of enumerate (tulip.member.__getslice__ (1, null, 1))) {
			for (var [j, y] of enumerate (x.member.__getslice__ (1, null, 1))) {
				chart_obj.data.datasets [i] ['data'] [j] = y.label.py_replace (',', '');
			}
		}
	}
	var ctx = document.getElementById (id).getContext ('2d');
	window.myLine = new Chart (ctx, chart_obj);
};
export var read_url = function (url) {
	if (typeof url == 'undefined' || (url != null && url.hasOwnProperty ("__kwargtrans__"))) {;
		var url = document.getElementById ('tulip_res').value + '.json';
	};
	print ('Reading url', url);
	var xhr = new XMLHttpRequest ();
	var success = function () {
		var tulip_text = xhr.responseText;
		var tulip_json = JSON.parse (tulip_text);
		tulip_obj = TulipJS (tulip_json);
		regen (tulip_obj);
	};
	xhr.onload = success;
	xhr.open ('GET', url);
	xhr.setRequestHeader ('Content-Type', 'application/json');
	xhr.setRequestHeader ('Charset', 'utf-8');
	xhr.send ();
};
export var regen = function (tulip) {
	var res = gen_html (tulip);
	document.getElementById ('tulip_out').innerHTML = res;
	document.getElementById ('tulip_src').innerHTML = res;
};
export var gen_html = function (tulip) {
	print ('Generating HTML');
	var html = '<!DOCTYPE html>\n<html>\n  <head>\n    <title>';
	if (tulip.label != null) {
		html += tulip.label;
	}
	html += '</title>\n  </head>\n  <body style="font-family: sans-serif">\n    <h1>';
	if (tulip.label != null) {
		html += tulip.label;
	}
	html += '</h1>\n';
	var indent = str_repeat (' ', 2);
	var level = 1;
	for (var [num, tulip_grp] of enumerate (tulip)) {
		if (tulip_grp.py_metatype ['Table']) {
			level++;
			html += _html_table_recursion (tulip_grp, level, ('.member[' + str (num)) + ']');
			level--;
		}
		else if (tulip_grp.py_metatype ['List']) {
			level++;
			html += _html_list_recursion (tulip_grp, level, ('.member[' + str (num)) + ']');
			level--;
		}
		else {
			// pass;
		}
	}
	html += str_repeat (indent, level) + '</body>\n';
	html += '</html>';
	return html;
};
export var str_repeat = function (str, n) {
	var repeat = '';
	for (var _ = 0; _ < n; _++) {
		repeat += str;
	}
	return repeat;
};
export var _html_table_recursion = function (tulip, level, submem) {
	var indent = str_repeat (' ', 2);
	var col_major = (!(tulip.style ['RowMajor']) ? true : false);
	var html = '';
	html += ((((str_repeat (indent, level) + '<button onclick="tulip.to_list(tulip.tulip_obj') + submem) + ",'id") + submem) + '\')">=> List</button>\n';
	html += str_repeat (indent, level) + (col_major ? ((('<button onclick="tulip.to_row_maj(tulip.tulip_obj' + submem) + ",'id") + submem) + '\')">=> Row Maj</button>\n' : ((('<button onclick="tulip.to_col_maj(tulip.tulip_obj' + submem) + ",'id") + submem) + '\')">=> Col Maj</button>\n');
	html += str_repeat (indent, level) + (tulip.local ['Hidden'] ? ((('<button onclick="tulip.show(tulip.tulip_obj' + submem) + ",'id") + submem) + '\')">+</button>\n' : ((('<button onclick="tulip.hide(tulip.tulip_obj' + submem) + ",'id") + submem) + '\')">-</button>\n');
	html += str_repeat (indent, level) + (tulip.local ['Chart'] ? ('<button onclick="tulip.chart_off(tulip.tulip_obj' + submem) + ')">Chart -</button>\n' : ((('<button onclick="tulip.chart_on(tulip.tulip_obj' + submem) + ",'id") + submem) + '\')">Chart +</button>\n');
	if (!(tulip.local ['Hidden'])) {
		html += str_repeat (indent, level) + '<table border="1" style="border-collapse: collapse">\n';
		if (tulip.label != null) {
			html += ((str_repeat (indent, level + 1) + '<caption><strong>') + tulip.label.py_replace ('\n', '<br />')) + '</strong></caption>\n';
		}
		var max_line = 0;
		var max_grp = len (tulip);
		for (var grp = 0; grp < max_grp; grp++) {
			var line_span = null;
			var line_len = len (tulip.member [grp]);
			if (line_len > max_line) {
				var max_line = line_len;
			}
			for (var line = 0; line < line_len; line++) {
				if (line_span == null) {
					var show_line = line;
					var line_span = 0;
				}
				line_span++;
				try {
					tulip.member [grp].member [line].local ['LineSkip'] = true;
				}
				catch (__except0__) {
					var line_span = null;
				}
				try {
					if (tulip.member [grp].member [line].style ['LineSpan'] == null || line == line_len - 1) {
						tulip.member [grp].member [show_line].local ['LineSpan'] = line_span;
						tulip.member [grp].member [show_line].local ['LineSkip'] = null;
						var line_span = null;
					}
					else if (tulip.member [grp].member [line].style ['LineSpan'] && tulip.member [grp].member [line].label != tulip.member [grp].member [line + 1].label) {
						tulip.member [grp].member [show_line].local ['LineSpan'] = line_span;
						tulip.member [grp].member [show_line].local ['LineSkip'] = null;
						var line_span = null;
					}
				}
				catch (__except0__) {
					var line_span = null;
				}
			}
		}
		for (var line = 0; line < max_line; line++) {
			var grp_span = null;
			for (var grp = 0; grp < max_grp; grp++) {
				if (grp_span == null) {
					var show_grp = grp;
					var grp_span = 0;
				}
				grp_span++;
				try {
					tulip.member [grp].member [line].local ['GrpSkip'] = true;
				}
				catch (__except0__) {
					var grp_span = null;
				}
				try {
					if (tulip.member [grp].member [line].style ['GrpSpan'] == null || grp == max_grp - 1) {
						tulip.member [show_grp].member [line].local ['GrpSpan'] = grp_span;
						tulip.member [show_grp].member [line].local ['GrpSkip'] = null;
						var grp_span = null;
					}
					else if (tulip.member [grp].member [line].style ['GrpSpan'] && tulip.member [grp].member [line].label != tulip.member [grp + 1].member [line].label) {
						tulip.member [show_grp].member [line].local ['GrpSpan'] = grp_span;
						tulip.member [show_grp].member [line].local ['GrpSkip'] = null;
						var grp_span = null;
					}
				}
				catch (__except0__) {
					var grp_span = null;
				}
			}
		}
		level++;
		var has_dummy_row = false;
		var has_table_row = false;
		var dummy_row = str_repeat (indent, level) + '<tr>\n';
		var dummy_row_th = dummy_row;
		for (var col = 0; col < len (tulip); col++) {
			if (len (tulip.member [col]) > 0) {
				var has_table_row = true;
			}
			if (tulip.member [col].local ['LineSkip']) {
				continue;
			}
			if (tulip.member [col].local ['LineSpan'] != null) {
				var col_span = tulip.member [col].local ['LineSpan'];
			}
			level++;
			if (col_span > 1) {
				dummy_row += str_repeat (indent, level) + (tulip.member [col].style ['Emphasize'] ? ('<th colspan="' + str (col_span)) + '">\n' : ('<td colspan="' + str (col_span)) + '">\n');
				dummy_row_th += ((str_repeat (indent, level) + '<th colspan="') + str (col_span)) + '">\n';
			}
			else {
				dummy_row += str_repeat (indent, level) + (tulip.member [col].style ['Emphasize'] ? '<th>\n' : '<td>\n');
				dummy_row_th += str_repeat (indent, level) + '<th>\n';
			}
			level++;
			if (tulip.member [col].label != null) {
				var linked_text = tulip.member [col].label;
				var has_dummy_row = true;
			}
			else {
				var linked_text = '';
			}
			for (var [key, url] of Object.entries (tulip.member [col].link)) {
				if (key.__getslice__ (0, 5, 1) == 'text:') {
					var linked_text = linked_text.py_replace (key.__getslice__ (5, null, 1), ((('<a href="' + url) + '">') + key.__getslice__ (5, null, 1)) + '</a>');
				}
				else if (key.__getslice__ (0, 6, 1) == 'image:') {
					linked_text += ((('<a href="' + url) + '"><img src="') + key.__getslice__ (6, null, 1)) + '"></a>';
				}
			}
			if (linked_text != '') {
				var dummy_row_tmp = (str_repeat (indent, level) + linked_text.py_replace ('\n', '<br />')) + '\n';
				dummy_row += dummy_row_tmp;
				dummy_row_th += dummy_row_tmp;
			}
			level--;
			dummy_row += str_repeat (indent, level) + (tulip.member [col].style ['Emphasize'] ? '</th>\n' : '</td>\n');
			dummy_row_th += str_repeat (indent, level) + '</th>\n';
			level--;
		}
		dummy_row += str_repeat (indent, level) + '</tr>\n';
		dummy_row_th += str_repeat (indent, level) + '</tr>\n';
		level--;
		if (col_major && has_dummy_row) {
			html += (has_table_row ? dummy_row_th : dummy_row);
		}
		var max_row = (col_major ? max_line : max_grp);
		var max_col = (col_major ? max_grp : max_line);
		for (var row = 0; row < max_row; row++) {
			level++;
			html += str_repeat (indent, level) + '<tr>\n';
			if (!(col_major) && has_dummy_row && !(tulip.member [row].local ['LineSkip'])) {
				if (tulip.member [row].local ['LineSpan'] != null) {
					var row_span = tulip.member [row].local ['LineSpan'];
				}
				if (row_span > 1) {
					html += str_repeat (indent, level) + (tulip.member [row].style ['Emphasize'] || has_table_row ? ('<th rowspan="' + str (row_span)) + '">\n' : ('<td rowspan="' + str (row_span)) + '">\n');
				}
				else {
					html += str_repeat (indent, level) + (tulip.member [row].style ['Emphasize'] || has_table_row ? '<th>\n' : '<td>\n');
				}
				if (tulip.member [row].label != null) {
					var linked_text = tulip.member [row].label;
				}
				else {
					var linked_text = '';
				}
				for (var [key, url] of Object.entries (tulip.member [row].link)) {
					if (key.__getslice__ (0, 5, 1) == 'text:') {
						var linked_text = linked_text.py_replace (key.__getslice__ (5, null, 1), ((('<a href="' + url) + '">') + key.__getslice__ (5, null, 1)) + '</a>');
					}
					else if (key.__getslice__ (0, 6, 1) == 'image:') {
						linked_text += ((('<a href="' + url) + '"><img src="') + key.__getslice__ (6, null, 1)) + '"></a>';
					}
				}
				if (linked_text != '') {
					html += (str_repeat (indent, level) + linked_text.py_replace ('\n', '<br />')) + '\n';
				}
				html += str_repeat (indent, level) + (tulip.member [row].style ['Emphasize'] || has_table_row ? '</th>\n' : '</td>\n');
			}
			var row_span = 0;
			var col_span = 0;
			for (var col = 0; col < max_col; col++) {
				try {
					if (col_major) {
						if (tulip.member [col].member [row].local ['GrpSkip'] || tulip.member [col].member [row].local ['LineSkip']) {
							continue;
						}
					}
					else if (tulip.member [row].member [col].local ['GrpSkip'] || tulip.member [row].member [col].local ['LineSkip']) {
						continue;
					}
				}
				catch (__except0__) {
					// pass;
				}
				try {
					if (col_major) {
						if (tulip.member [col].member [row].local ['LineSpan'] != null) {
							var row_span = tulip.member [col].member [row].local ['LineSpan'];
						}
					}
					else if (tulip.member [row].member [col].local ['GrpSpan'] != null) {
						var row_span = tulip.member [row].member [col].local ['GrpSpan'];
					}
				}
				catch (__except0__) {
					// pass;
				}
				try {
					if (col_major) {
						if (tulip.member [col].member [row].local ['GrpSpan'] != null) {
							var col_span = tulip.member [col].member [row].local ['GrpSpan'];
						}
					}
					else if (tulip.member [row].member [col].local ['LineSpan'] != null) {
						var col_span = tulip.member [row].member [col].local ['LineSpan'];
					}
				}
				catch (__except0__) {
					// pass;
				}
				level++;
				try {
					if (col_major) {
						if (row_span > 1) {
							html += str_repeat (indent, level) + (tulip.member [col].member [row].style ['Emphasize'] ? ('<th rowspan="' + str (row_span)) + '">\n' : ('<td rowspan="' + str (row_span)) + '">\n');
						}
						else if (col_span > 1) {
							html += str_repeat (indent, level) + (tulip.member [col].member [row].style ['Emphasize'] ? ('<th colspan="' + str (col_span)) + '">\n' : ('<td colspan="' + str (col_span)) + '">\n');
						}
						else {
							html += str_repeat (indent, level) + (tulip.member [col].member [row].style ['Emphasize'] ? '<th>\n' : '<td>\n');
						}
					}
					else if (row_span > 1) {
						html += str_repeat (indent, level) + (tulip.member [row].member [col].style ['Emphasize'] ? ('<th rowspan="' + str (row_span)) + '">\n' : ('<td rowspan="' + str (row_span)) + '">\n');
					}
					else if (col_span > 1) {
						html += str_repeat (indent, level) + (tulip.member [row].member [col].style ['Emphasize'] ? ('<th colspan="' + str (col_span)) + '">\n' : ('<td colspan="' + str (col_span)) + '">\n');
					}
					else {
						html += str_repeat (indent, level) + (tulip.member [row].member [col].style ['Emphasize'] ? '<th>\n' : '<td>\n');
					}
				}
				catch (__except0__) {
					html += str_repeat (indent, level) + '<td>\n';
				}
				level++;
				try {
					if (col_major) {
						if (tulip.member [col].member [row].label != null) {
							var linked_text = tulip.member [col].member [row].label;
						}
						else {
							var linked_text = '';
						}
					}
					else if (tulip.member [row].member [col].label != null) {
						var linked_text = tulip.member [row].member [col].label;
					}
					else {
						var linked_text = '';
					}
					if (col_major) {
						for (var [key, url] of Object.entries (tulip.member [col].member [row].link)) {
							if (key.__getslice__ (0, 5, 1) == 'text:') {
								var linked_text = linked_text.py_replace (key.__getslice__ (5, null, 1), ((('<a href="' + url) + '">') + key.__getslice__ (5, null, 1)) + '</a>');
							}
							else if (key.__getslice__ (0, 6, 1) == 'image:') {
								linked_text += ((('<a href="' + url) + '"><img src="') + key.__getslice__ (6, null, 1)) + '"></a>';
							}
						}
					}
					else {
						for (var [key, url] of Object.entries (tulip.member [row].member [col].link)) {
							if (key.__getslice__ (0, 5, 1) == 'text:') {
								var linked_text = linked_text.py_replace (key.__getslice__ (5, null, 1), ((('<a href="' + url) + '">') + key.__getslice__ (5, null, 1)) + '</a>');
							}
							else if (key.__getslice__ (0, 6, 1) == 'image:') {
								linked_text += ((('<a href="' + url) + '"><img src="') + key.__getslice__ (6, null, 1)) + '"></a>';
							}
						}
					}
					if (linked_text != '') {
						html += (str_repeat (indent, level) + linked_text.py_replace ('\n', '<br />')) + '\n';
					}
					if (col_major) {
						if (tulip.member [col].member [row].py_metatype ['Table']) {
							html += _html_table_recursion (tulip.member [col].member [row], level, ((((submem + '.member[') + str (col)) + '].member[') + str (row)) + ']');
						}
						else {
							html += _html_list_recursion (tulip.member [col].member [row], level, ((((submem + '.member[') + str (col)) + '].member[') + str (row)) + ']');
						}
					}
					else if (tulip.member [row].member [col].py_metatype ['Table']) {
						html += _html_table_recursion (tulip.member [row].member [col], level, ((((submem + '.member[') + str (row)) + '].member[') + str (col)) + ']');
					}
					else {
						html += _html_list_recursion (tulip.member [row].member [col], level, ((((submem + '.member[') + str (row)) + '].member[') + str (col)) + ']');
					}
				}
				catch (__except0__) {
					// pass;
				}
				level--;
				try {
					if (col_major) {
						html += str_repeat (indent, level) + (tulip.member [col].member [row].style ['Emphasize'] ? '</th>\n' : '</td>\n');
					}
					else {
						html += str_repeat (indent, level) + (tulip.member [row].member [col].style ['Emphasize'] ? '</th>\n' : '</td>\n');
					}
				}
				catch (__except0__) {
					html += str_repeat (indent, level) + '</td>\n';
				}
				level--;
			}
			html += str_repeat (indent, level) + '</tr>\n';
			level--;
		}
		html += str_repeat (indent, level) + '</table>\n';
	}
	if (tulip.local ['Chart']) {
		html += ((str_repeat (indent, level) + '<div style="width:50%;"><canvas id="id') + submem) + '"></canvas></div>\n';
	}
	return html;
};
export var _html_list_recursion = function (tulip, level, submem) {
	var indent = str_repeat (' ', 2);
	var html = '';
	if (level == 2 && tulip.label != null) {
		html += ((str_repeat (indent, level) + '<strong>') + tulip.label.py_replace ('\n', '<br />')) + '</strong>\n';
	}
	var header_added = false;
	var list_tag = (tulip.style ['Enumerate'] ? 'ol' : 'ul');
	for (var [i, node] of enumerate (tulip)) {
		if (!(header_added)) {
			html += ((((str_repeat (indent, level) + '<button onclick="tulip.to_table(tulip.tulip_obj') + submem) + ",'id") + submem) + '\')">=> Table</button>\n';
			html += str_repeat (indent, level) + (tulip.local ['Hidden'] ? ((('<button onclick="tulip.show(tulip.tulip_obj' + submem) + ",'id") + submem) + '\')">+</button>\n' : ((('<button onclick="tulip.hide(tulip.tulip_obj' + submem) + ",'id") + submem) + '\')">-</button>\n');
			if (tulip.local ['Chart']) {
				html += ((str_repeat (indent, level) + '<button onclick="tulip.chart_off(tulip.tulip_obj') + submem) + ')">Chart -</button>\n';
			}
			if (tulip.local ['Hidden']) {
				if (tulip.local ['Chart']) {
					html += ((str_repeat (indent, level) + '<div style="width:50%;"><canvas id="id') + submem) + '"></canvas></div>\n';
				}
				return html;
			}
			html += ((str_repeat (indent, level) + '<') + list_tag) + '>\n';
			level++;
			var header_added = true;
		}
		html += str_repeat (indent, level) + '<li>\n';
		level++;
		if (node.label != null) {
			var linked_text = node.label;
		}
		else {
			var linked_text = '';
		}
		for (var [key, url] of Object.entries (node.link)) {
			if (key.__getslice__ (0, 5, 1) == 'text:') {
				var linked_text = linked_text.py_replace (key.__getslice__ (5, null, 1), ((('<a href="' + url) + '">') + key.__getslice__ (5, null, 1)) + '</a>');
			}
			else if (key.__getslice__ (0, 6, 1) == 'image:') {
				linked_text += ((('<a href="' + url) + '"><img src="') + key.__getslice__ (6, null, 1)) + '"></a>';
			}
		}
		if (linked_text != '') {
			html += (str_repeat (indent, level) + (node.style ['Emphasize'] ? ('<strong>' + linked_text.py_replace ('\n', '<br />')) + '</strong>' : linked_text.py_replace ('\n', '<br />'))) + '\n';
		}
		if (tulip.member [i].py_metatype ['Table']) {
			html += _html_table_recursion (tulip.member [i], level, ((submem + '.member[') + str (i)) + ']');
		}
		else {
			html += _html_list_recursion (tulip.member [i], level, ((submem + '.member[') + str (i)) + ']');
		}
		level--;
		html += str_repeat (indent, level) + '</li>\n';
	}
	if (header_added) {
		level--;
		html += ((str_repeat (indent, level) + '</') + list_tag) + '>\n';
	}
	if (tulip.local ['Chart']) {
		html += ((str_repeat (indent, level) + '<div style="width:50%;"><canvas id="id') + submem) + '"></canvas></div>\n';
	}
	return html;
};
export var main = function () {
	var test_article = 'Chulalongkorn University';
	read_url (test_article.py_replace (' ', '_') + '.json');
};
if (__name__ == '__main__') {
	main ();
}

//# sourceMappingURL=tulip.map