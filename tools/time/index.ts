
const Curren = {
	//时间截取
	formatDatebox: function(value:string, char:string, style:any) {
		var year = value.substr(0, 4);
		var month = value.substr(5, 2);
		var day = value.substr(8, 2);
		var date = Curren.isEmpty(char) ? value.substr(0, 10) : year + char + month + char + day;
		if(!Curren.isEmpty(style)) {
			if(style == 6) {
				date = date.substr(0, 7);
			} else if(style == 2) {
				date = date.substr(8, 2);
			}
		}
		return date;
	},
  isEmpty: function(obj:any) {
		if(typeof obj == "undefined" || obj == null || obj == "") {
			return true;
		} else {
			return false;
		}
	},
	getQueryString: function(name:string) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return decodeURI(r[2]);
		}
		return null;
	},
}
