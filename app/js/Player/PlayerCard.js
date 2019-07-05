(function(App){

    // imports 
    var Delegate = App.Delegate;

	var PlayerCard = (function(){

        // Player Stats Card constructor
        function PlayerCard(settings){
            var _this = this;

            // players data array object
            this.data = settings.playersData.players;

            // node references
            this.elem = null;
            this.selectElem = null;
            this.player = null;

            // delegates
			this.selectPlayer_delegate = new Delegate(_this._selectPlayerHandler, _this);

            // create element
            this._createElement();

            // disposal reference
            this.dispose = this._dispose;

            return this;
        }
        
        /*
         * Create player stats card element
         * and add player select option box
         */
        PlayerCard.prototype._createElement = function() {
            this.elem = document.createElement("div");
            this.elem.className = "playerCard";

            // render select box with players if any exists
            if(this.data.length) {
                this._renderSelect();
            }
            
        }

        /*
         * Render select box with player we have in json data
         */ 
        PlayerCard.prototype._renderSelect = function() {
            var _this = this;

            // create select node and ad class name
            this.selectElem = document.createElement("select");
            this.selectElem.className = "playerCard-PlayerSelect";

            // create and add preselected option "Select a player..." 
            var optionPreSelect = document.createElement("option");
            var optionPreSelectText = document.createTextNode("Select a player...");
            optionPreSelect.appendChild(optionPreSelectText);
            this.selectElem.appendChild(optionPreSelect);

            // add players list to select box
            for(var i=0; i<this.data.length; i++) {
                var playerItem = this.data[i].player;
                var option = document.createElement("option");
                var optionText = document.createTextNode(playerItem.name.first + " " + playerItem.name.last);

                // attributes set
                option.setAttribute("data-player", i);

                // append player name text node
                option.appendChild(optionText);

                // class names
                option.className = "playerCard-PlayerSelect_Option";

                // append option node to select
                this.selectElem.appendChild(option);
            }

            // add event listener to fire handler when player is selected
            this.selectElem.addEventListener("change", _this.selectPlayer_delegate);

            // append select box to card 
            this.elem.appendChild(this.selectElem);
        }

        /*
         * Player select event handler
         */
        PlayerCard.prototype._selectPlayerHandler = function(event, scope) {
            var target = event[0].target;
            var playerEnum = target.options[target.selectedIndex].getAttribute("data-player") - 0;

            // clean up previously selected player
            if(scope.player) {
                scope.player.parentNode.removeChild(scope.player);
                scope.player = null;
            }

            scope.player = scope._createPlayer(scope.data[playerEnum]);
            scope.elem.appendChild(scope.player);
        }

        /*
         * Create player node with all information
         */
        PlayerCard.prototype._createPlayer = function(playerData) {
            var player = playerData.player;
            var stats = playerData.stats;

            // nodes references
            var node = document.createElement("div");
            var image = document.createElement("img");
            var info = document.createElement("div");
            var infoWrapper = document.createElement("div");
            var details = document.createElement("div");
            var name = document.createElement("h2");
            var title = document.createElement("h4");
            var teamLogo = document.createElement("div");

            // text nodes
            var playerName = document.createTextNode(player.name.first + " " + player.name.last);
            var playerTitle = document.createTextNode(player.info.positionInfo);

            // class names
            node.className = "playerCard-PlayerContainer";
            image.className = "playerCard-Image_Image";
            info.className = "playerCard-Info";
            infoWrapper.className = "playerCard-InfoWrapper";
            details.className = "playerCard-InfoDetails";
            name.className = "playerCard-InfoDetails_Name";
            title.className = "playerCard-InfoDetails_Title";
            teamLogo.className = "playerCard-Info_TeamLogo playerCard-Info_TeamLogo-" + player.currentTeam.id;

            // other atributes
            image.src = "./assets/p" + player.id + ".png";
            image.alt = player.name.first + " " + player.name.last;


            // append player nodes
            node.appendChild(image);
            name.appendChild(playerName);
            title.appendChild(playerTitle);
            details.appendChild(name);
            details.appendChild(title);
            infoWrapper.appendChild(details);
            infoWrapper.appendChild(teamLogo);
            info.appendChild(infoWrapper);


            // lets add some stats if any exists
            if(stats.length) {
                for (var i=0; i<stats.length; i++){
                    // create nodes
                    var statsItem = document.createElement("div");
                    var statsText = document.createElement("span");
                    var statsStat = document.createElement("span");

                    // text nodes
                    var text = document.createTextNode(stats[i].name.replace("_", " "));
                    var stat = document.createTextNode(stats[i].value);

                    // class names
                    statsItem.className = "playerCard-InfoStatsItem";
                    statsText.className = "playerCard-InfoStatsItem_Text";
                    statsStat.className = "playerCard-InfoStatsItem_Stat";

                    // append texts
                    statsText.appendChild(text);
                    statsStat.appendChild(stat);

                    // child nodes append
                    statsItem.appendChild(statsText);
                    statsItem.appendChild(statsStat);

                    // add stats line to card
                    info.appendChild(statsItem);
                }
            }

            node.appendChild(info);

            // return player node
            return node;
        }

        /*
         * Dispose Card 
         */
        PlayerCard.prototype._dispose = function(){
            var _this = this;

            this.selectElem.removeEventListener("change", _this.selectPlayer_delegate);
            this.elem.parentNode.removeChild(_this.elem);

        }

		return PlayerCard;


    }());

    App.PlayerCard = PlayerCard;


})(App || (App = {}));