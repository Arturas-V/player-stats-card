(function(App){
    var PlayerCard = App.PlayerCard;

	var Player = (function(){

		function Player(){

			// reference to elements, containers.
            this.playerStatsElem = document.getElementById("player");
            this._fetchPlayersData();
        }
        
        /*
		 * Fetch players data from server json file.
		 */
        Player.prototype._fetchPlayersData = function() {
            var _this = this;
            var xhttp = new XMLHttpRequest();

            xhttp.overrideMimeType("application/json");
            xhttp.open("GET", "./data/player-stats.json", true);
            xhttp.onload  = function() {
                return _this.renderPlayersCard(JSON.parse(xhttp.responseText));
             };
            xhttp.send();
        }

		/*
		 * Render player card component
		 */
		Player.prototype.renderPlayersCard = function(data) {
            var settings = {
                playersData: data
            }
            var card = new PlayerCard(settings);

            this.playerStatsElem.appendChild(card.elem);
		}


		return Player;

	}());

	App.Player = Player;

})(App || (App = {}));

App.Player = new App.Player();
