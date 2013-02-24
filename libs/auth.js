var username;
var password;
var session;

function Auth(){}
	
	Auth.prototype = {
    	checkAuth : function()
    	{
        	return this.username;
    	},
    	setAuth : function()
    	{
    		return this.password;
    	},
    	getAuth : function()
    	{
    		return this.session;
    	}
	};

module.exports = new Auth;