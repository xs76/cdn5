function CStartAnimation(oParentContainer, aWhiteFinalPos, aBlackFinalPos, oAnimationContainer){
    
    var _iNumChips;
    var _iBoxOpenCounter = 0;
    var _iWhiteIndex = 0;
    var _iBlackIndex = 0;
    var _iPawnPositioned = 0;
    
    var _aWhiteFinalPos;
    var _aBlackFinalPos;
    var _aWhiteChips;
    var _aBlackChips;
    
    var _oParentContainer;
    var _oTopContainer;
    var _oBotContainer;
    var _oTopBox;
    var _oBotBox;
    
    this._init = function(oParentContainer, aWhiteFinalPos, aBlackFinalPos, oAnimationContainer){
        _aWhiteFinalPos = new Array();
        _aBlackFinalPos = new Array();
        for(var i=0; i<aWhiteFinalPos.length; i++){
            //_aWhiteFinalPos[i] = {x: aWhiteFinalPos[i].x/s_oStage.scaleX, y: aWhiteFinalPos[i].y/s_oStage.scaleY};
            //_aBlackFinalPos[i] = {x: aBlackFinalPos[i].x/s_oStage.scaleX, y: aBlackFinalPos[i].y/s_oStage.scaleY};
            
            _aWhiteFinalPos[i] = oAnimationContainer.globalToLocal(aWhiteFinalPos[i].x, aWhiteFinalPos[i].y);
            _aBlackFinalPos[i] = oAnimationContainer.globalToLocal(aBlackFinalPos[i].x, aBlackFinalPos[i].y);
        }
        
        
        var iOffset = 19;
        _iNumChips = 12;
        
        _oParentContainer = oParentContainer;
        //var iYOffset = 520;
        var iYOffset = 360;
        
        _oTopContainer = new createjs.Container();
        _oTopContainer.y = -iYOffset;
        _oParentContainer.addChild(_oTopContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('chip_flip_black');
        var oData = {   // image to use
                        images: [oSprite], 
                        framerate: 6,
                        // width, height & registration point of each sprite
                        "frames": [
                            [0, 0, 22, 91, 0, -38, -3],
                            [22, 0, 30, 93, 0, -33, -2],
                            [52, 0, 74, 92, 0, -11, -2],
                            [0, 93, 98, 99, 0, -1, -1],
                            [98, 93, 98, 99, 0, -1, -1]
                        ], 
                        "animations": {
                            "chip_0": [0,0,"chip_1"], "chip_1": [1,1,"chip_2"], "chip_2": [2,2,"chip_4"], "chip_3": [3,3,"chip_4"], "chip_4": [4,4,"stop"]// 1, 2, 3, 4]
                        }

        };        

        var oSprite = s_oSpriteLibrary.getSprite('chip_box');
        _oTopBox = createBitmap(oSprite);
        _oTopBox.regX = oSprite.width/2;
        _oTopBox.regY = oSprite.height/2;        
        _oTopContainer.addChild(_oTopBox);
        
        var oSpriteSheet = new createjs.SpriteSheet(oData);        
        _aBlackChips = new Array();
        for(var i=0; i<_iNumChips; i++){
            _aBlackChips[i] = createSprite(oSpriteSheet,"chip_0",PAWN_SIZE/2,PAWN_SIZE/2,PAWN_SIZE,PAWN_SIZE);
            _aBlackChips[i].x = -160 - i*iOffset;
            _aBlackChips[i].y = -34;
            _aBlackChips[i].gotoAndStop("chip_0");
            _oTopContainer.addChild(_aBlackChips[i]);
        }
        
        _oBotContainer = new createjs.Container();
        _oBotContainer.y = iYOffset  - 25;
        _oParentContainer.addChild(_oBotContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('chip_flip_white');
        var oData = {   // image to use
                        images: [oSprite], 
                        framerate: 6,
                        // width, height & registration point of each sprite
                        "frames": [
                            [0, 0, 22, 91, 0, -38, -3],
                            [22, 0, 30, 93, 0, -33, -2],
                            [52, 0, 74, 92, 0, -11, -2],
                            [0, 93, 98, 99, 0, -1, -1],
                            [98, 93, 98, 99, 0, -1, -1]
                        ], 
                        "animations": {
                            "chip_0": [0,0,"chip_1"], "chip_1": [1,1,"chip_2"], "chip_2": [2,2,"chip_4"], "chip_3": [3,3,"chip_4"], "chip_4": [4,4,"stop"]
                        }

        };       
        
        var oSprite = s_oSpriteLibrary.getSprite('chip_box');
        _oBotBox = createBitmap(oSprite);
        _oBotBox.regX = oSprite.width/2;
        _oBotBox.regY = oSprite.height/2;        
        _oBotContainer.addChild(_oBotBox);
        
        var oSpriteSheet = new createjs.SpriteSheet(oData);        
        _aWhiteChips = new Array();
        for(var i=0; i<_iNumChips; i++){
            _aWhiteChips[i] = createSprite(oSpriteSheet,"chip_0",PAWN_SIZE/2,PAWN_SIZE/2,PAWN_SIZE,PAWN_SIZE);
            _aWhiteChips[i].x = 80 + i*iOffset;
            _aWhiteChips[i].y = -36;
            _aWhiteChips[i].gotoAndStop("chip_0");
            //_aWhiteChips[i].regY = PAWN_SIZE/2;
            _oBotContainer.addChild(_aWhiteChips[i]);
        }
        
        this._openBox();
        
    };
    
    this.unload = function(){
        _oParentContainer.removeChild(_oTopContainer);
        _oParentContainer.removeChild(_oBotContainer);
    };
    
    this._openBox = function(){
        playSound("drawer",1,false);

        
        createjs.Tween.get(_oTopContainer).to({y:_oTopContainer.y - 160}, 1000).call(function(){
            _oParent._onBoxOpen();
        });        
        createjs.Tween.get(_oBotContainer).to({y:_oBotContainer.y + 160}, 1000).call(function(){        
            _oParent._onBoxOpen();
        });
    };
    
    this._onBoxOpen = function(){
        _iBoxOpenCounter++;
        
        if(_iBoxOpenCounter === 2){
            
            var iWaitTime = 150;

            for(var i=0; i<_iNumChips; i++){
                //var iNewX = _aBlackChips[i].localToGlobal(0,0).x/s_oStage.scaleX;
                //var iNewY = _aBlackChips[i].localToGlobal(0,0).y/s_oStage.scaleY;
                
                var iNewX = _aBlackChips[i].localToLocal(0,0, oAnimationContainer).x;
                var iNewY = _aBlackChips[i].localToLocal(0,0, oAnimationContainer).y;

                _oTopContainer.removeChild(_aBlackChips[i]);
                _aBlackChips[i].x = iNewX;
                _aBlackChips[i].y = iNewY;
                oAnimationContainer.addChild(_aBlackChips[i]);
                
                setTimeout(function(){_oParent.playBlack();}, iWaitTime);
                createjs.Tween.get(_aBlackChips[i]).wait(iWaitTime).to({x:_aBlackFinalPos[i].x - PAWN_SIZE/2 +2, y:_aBlackFinalPos[i].y - PAWN_SIZE/2 +1}, 500, createjs.Ease.cubicOut).
                        call(function(){
                            
                            playSound("click_cell",1,false);

                            _oParent._onFinishPositioning();
                        
                        });
                        
                //var iNewX = _aWhiteChips[i].localToGlobal(0,0).x/s_oStage.scaleX;
                //var iNewY = _aWhiteChips[i].localToGlobal(0,0).y/s_oStage.scaleY;
                var iNewX = _aWhiteChips[i].localToLocal(0,0, oAnimationContainer).x;
                var iNewY = _aWhiteChips[i].localToLocal(0,0, oAnimationContainer).y;
                
                _oBotContainer.removeChild(_aWhiteChips[i]);
                _aWhiteChips[i].x = iNewX;
                _aWhiteChips[i].y = iNewY;
                oAnimationContainer.addChild(_aWhiteChips[i]);
                
                setTimeout(function(){_oParent.playWhite();}, iWaitTime);
                createjs.Tween.get(_aWhiteChips[i]).wait(iWaitTime).to({x:_aWhiteFinalPos[_iNumChips-i-1].x - PAWN_SIZE/2 +1, y:_aWhiteFinalPos[_iNumChips-i-1].y - PAWN_SIZE/2 +1}, 500, createjs.Ease.cubicOut).
                        call(function(){                            
                            playSound("click_cell",1,false);
                            
                            _oParent._onFinishPositioning();                        
                        });
                //iWaitTime += 150;        
                        
                iWaitTime += 150;
                
            }
            
            var iWaitTime = 150;
            for(var i=0; i<_iNumChips; i++){
                
            }
        }
    };
    
    this.playWhite = function(){        
        _aWhiteChips[_iWhiteIndex].gotoAndPlay("chip_1");
        _iWhiteIndex++;
    };
    
    this.playBlack = function(){        
        _aBlackChips[_iBlackIndex].gotoAndPlay("chip_1");
        _iBlackIndex++;
    };
    
    this._onFinishPositioning = function(){
        _iPawnPositioned++;
        if(_iPawnPositioned === _iNumChips*2){

            for(var i=0; i<_iNumChips; i++){
                oAnimationContainer.removeChild(_aBlackChips[i]);
                oAnimationContainer.removeChild(_aWhiteChips[i]);
                s_oGame.setAllVisible(true);
                s_oGame._onExitHelp();
            }
        }
    };
    
    var _oParent = this;
    this._init(oParentContainer, aWhiteFinalPos, aBlackFinalPos, oAnimationContainer);
}

var startanim = this;