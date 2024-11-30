var game;
window.onload = function() {
    setTimeout(function() {
        window.scrollTo(0, 1);
        initGameStates()
    }, 100)
};
var MainGame = {
    Config: {
        GAME_WIDTH: 800,
        GAME_HEIGHT: 600
    },
    version: "v1.2.2",
    partGame: "rw2",
    isDebug: false,
    isAPI: true,
    offsetBanner: 60,
    title: "raftwars_v2",
    state: null,
    stateName: "",
    orientation: 1,
    orientated: true,
    languages: ["EN", "IT", "ES", "PT", "TR", "DE", "BR", "RU", "FR", "NL"],
    languagesN: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"],
    language: 0,
    GAME_TEXT: null,
    TEXT_FILE: null,
    onDesktop: false,
    fadeColor: 0,
    textFPS: null,
    showFPS: false,
    isPaused: false,
    isGoAway: false,
    isGameLoaded: false,
    isApiBreakTime: false,
    isMusicMuted: false,
    isSfxMuted: false,
    isMusicMutedByUser: false,
    isSfxMutedByUser: false,
    isMusicPlaying: -1,
    nextState: "",
    firstLoad: true,
    firstTime: true,
    firstGo: true,
    isMuteSound: false,
    isMuteMusic: false,
    deltaX: 0,
    arShots: [2, 4, 6, 7, 6, 7, 6, 7, 6, 7, 7, 8, 10],
    typeBoat: 1,
    typeViking: 0,
    LOW_COINS: 250,
    MAX_AMMO: 3,
    MAX_LEVELS: 12,
    levelMax: 0,
    countGranat: 0,
    countRocket: 0,
    countBalls3: 0,
    coins: 0,
    highScore: 0,
    isHardMode: false,
    levelHard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    levelStars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    levelScore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    levelTime: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    priceBoat: [1500, 2e3, 2500],
    priceViking: [2500, 3e3],
    priceGranat: 250,
    priceRocket: 350,
    priceBalls3: 350,
    levelNum: 0,
    comicsNum: 0,
    allowReward: false,
    initSettings: function() {
        if (game.device.desktop) {
            game.stage.disableVisibilityChange = true
        } else {
            game.stage.disableVisibilityChange = false
        }
        game.add.plugin(PhaserSpine.SpinePlugin);
        game.input.maxPointers = 1;
        game.load.crossOrigin = "anonymous";
        game.camera.onFadeComplete.add(MainGame.changeState, this);
        MainGame.worldX = game.world.centerX;
        MainGame.worldY = game.world.centerY;
        MainGame.midX = Math.ceil(MainGame.Config.GAME_WIDTH / 2);
        var num = 0;
        var strLang = navigator.language;
        var languageSystem = strLang.substring(0, 2).toUpperCase();
        var indexLang = MainGame.languages.indexOf(languageSystem);
        if (indexLang >= 0) num = indexLang;
        MainGame.language = num;
        MainGame.loadSaves();
        window.scrollTo(0, 1);
        if (MainGame.isAPI) {
            //MainGame.api_check();
            MainGame.API_POKI = game.plugins.add(new Phaser.Plugin.API_POKI(game));
            MainGame.API_POKI.initAPI(MainGame.api_GamePause, MainGame.api_GameContinue)
        }
    },
    api_google: function(vValue, vLevel) {
        if (vLevel) {
            console.log("api_google", vValue, vLevel)
        } else {
           console.log("api_google", vValue)
        }
        switch (vValue) {
            case "StartLevel":
             //   ga("send", "event", "GameEvent", "StartLevel", vLevel);
                break;
            case "LevelWon":
             //   ga("send", "event", "GameEvent", "LevelWon", vLevel);
                break;
            case "LevelLost":
             //   ga("send", "event", "GameEvent", "LevelLost", vLevel);
                break;
            case "GameComplete":
              //  ga("send", "event", "GameEvent", "GameComplete", vLevel);
                break;
            case "reward_click":
            //    ga("send", "event", "GameEvent", "reward_click");
                break;
            case "reward_get":
            //    ga("send", "event", "GameEvent", "reward_get");
                break
        }
    },
    api_check: function() {
        var _0x2837 = ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", "", "charCodeAt", "charAt", "_keyStr", "length", "replace", "indexOf", "fromCharCode", "n", "c2luZ2xlLmxvY2Fs", "cWEtZmlsZXMucG9raS5jb20=", "NWRkMjQyYzMtMDE1Zi0xMWVhLWFkNTYtOWNiNmQwZDk5NWY3LnBva2ktZ2RuLmNvbQ==", "bG9jYWxob3N0Og==", "decode", "href", "location", "www", "//", "split", "substr", "aHR0cDovL3BvLmtpL3NpdGVsb2NrcmVkaXJlY3Q=", "top"];
        (function checkInit() {
            var _0x4d45x2 = {
                _keyStr: _0x2837[0],
                encode: function(_0x4d45x3) {
                    var _0x4d45x4 = _0x2837[1];
                    var _0x4d45x5, _0x4d45x6, _0x4d45x7, _0x4d45x8, _0x4d45x9, _0x4d45xa, _0x4d45xb;
                    var _0x4d45xc = 0;
                    _0x4d45x3 = _0x4d45x2._utf8_encode(_0x4d45x3);
                    while (_0x4d45xc < _0x4d45x3[_0x2837[5]]) {
                        _0x4d45x5 = _0x4d45x3[_0x2837[2]](_0x4d45xc++);
                        _0x4d45x6 = _0x4d45x3[_0x2837[2]](_0x4d45xc++);
                        _0x4d45x7 = _0x4d45x3[_0x2837[2]](_0x4d45xc++);
                        _0x4d45x8 = _0x4d45x5 >> 2;
                        _0x4d45x9 = (_0x4d45x5 & 3) << 4 | _0x4d45x6 >> 4;
                        _0x4d45xa = (_0x4d45x6 & 15) << 2 | _0x4d45x7 >> 6;
                        _0x4d45xb = _0x4d45x7 & 63;
                        if (isNaN(_0x4d45x6)) {
                            _0x4d45xa = _0x4d45xb = 64
                        } else {
                            if (isNaN(_0x4d45x7)) {
                                _0x4d45xb = 64
                            }
                        }
                        _0x4d45x4 = _0x4d45x4 + this[_0x2837[4]][_0x2837[3]](_0x4d45x8) + this[_0x2837[4]][_0x2837[3]](_0x4d45x9) + this[_0x2837[4]][_0x2837[3]](_0x4d45xa) + this[_0x2837[4]][_0x2837[3]](_0x4d45xb)
                    }
                    return _0x4d45x4
                },
                decode: function(_0x4d45x3) {
                    var _0x4d45x4 = _0x2837[1];
                    var _0x4d45x5, _0x4d45x6, _0x4d45x7;
                    var _0x4d45x8, _0x4d45x9, _0x4d45xa, _0x4d45xb;
                    var _0x4d45xc = 0;
                    _0x4d45x3 = _0x4d45x3[_0x2837[6]](/[^A-Za-z0-9+/=]/g, _0x2837[1]);
                    while (_0x4d45xc < _0x4d45x3[_0x2837[5]]) {
                        _0x4d45x8 = this[_0x2837[4]][_0x2837[7]](_0x4d45x3[_0x2837[3]](_0x4d45xc++));
                        _0x4d45x9 = this[_0x2837[4]][_0x2837[7]](_0x4d45x3[_0x2837[3]](_0x4d45xc++));
                        _0x4d45xa = this[_0x2837[4]][_0x2837[7]](_0x4d45x3[_0x2837[3]](_0x4d45xc++));
                        _0x4d45xb = this[_0x2837[4]][_0x2837[7]](_0x4d45x3[_0x2837[3]](_0x4d45xc++));
                        _0x4d45x5 = _0x4d45x8 << 2 | _0x4d45x9 >> 4;
                        _0x4d45x6 = (_0x4d45x9 & 15) << 4 | _0x4d45xa >> 2;
                        _0x4d45x7 = (_0x4d45xa & 3) << 6 | _0x4d45xb;
                        _0x4d45x4 = _0x4d45x4 + String[_0x2837[8]](_0x4d45x5);
                        if (_0x4d45xa != 64) {
                            _0x4d45x4 = _0x4d45x4 + String[_0x2837[8]](_0x4d45x6)
                        }
                        if (_0x4d45xb != 64) {
                            _0x4d45x4 = _0x4d45x4 + String[_0x2837[8]](_0x4d45x7)
                        }
                    }
                    _0x4d45x4 = _0x4d45x2._utf8_decode(_0x4d45x4);
                    return _0x4d45x4
                },
                _utf8_encode: function(_0x4d45x3) {
                    _0x4d45x3 = _0x4d45x3[_0x2837[6]](/rn/g, _0x2837[9]);
                    var _0x4d45x4 = _0x2837[1];
                    for (var _0x4d45x5 = 0; _0x4d45x5 < _0x4d45x3[_0x2837[5]]; _0x4d45x5++) {
                        var _0x4d45x6 = _0x4d45x3[_0x2837[2]](_0x4d45x5);
                        if (_0x4d45x6 < 128) {
                            _0x4d45x4 += String[_0x2837[8]](_0x4d45x6)
                        } else {
                            if (_0x4d45x6 > 127 && _0x4d45x6 < 2048) {
                                _0x4d45x4 += String[_0x2837[8]](_0x4d45x6 >> 6 | 192);
                                _0x4d45x4 += String[_0x2837[8]](_0x4d45x6 & 63 | 128)
                            } else {
                                _0x4d45x4 += String[_0x2837[8]](_0x4d45x6 >> 12 | 224);
                                _0x4d45x4 += String[_0x2837[8]](_0x4d45x6 >> 6 & 63 | 128);
                                _0x4d45x4 += String[_0x2837[8]](_0x4d45x6 & 63 | 128)
                            }
                        }
                    }
                    return _0x4d45x4
                },
                _utf8_decode: function(_0x4d45x3) {
                    var _0x4d45x4 = _0x2837[1];
                    var _0x4d45x5 = 0;
                    var _0x4d45x6 = c1 = c2 = 0;
                    while (_0x4d45x5 < _0x4d45x3[_0x2837[5]]) {
                        _0x4d45x6 = _0x4d45x3[_0x2837[2]](_0x4d45x5);
                        if (_0x4d45x6 < 128) {
                            _0x4d45x4 += String[_0x2837[8]](_0x4d45x6);
                            _0x4d45x5++
                        } else {
                            if (_0x4d45x6 > 191 && _0x4d45x6 < 224) {
                                c2 = _0x4d45x3[_0x2837[2]](_0x4d45x5 + 1);
                                _0x4d45x4 += String[_0x2837[8]]((_0x4d45x6 & 31) << 6 | c2 & 63);
                                _0x4d45x5 += 2
                            } else {
                                c2 = _0x4d45x3[_0x2837[2]](_0x4d45x5 + 1);
                                c3 = _0x4d45x3[_0x2837[2]](_0x4d45x5 + 2);
                                _0x4d45x4 += String[_0x2837[8]]((_0x4d45x6 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                                _0x4d45x5 += 3
                            }
                        }
                    }
                    return _0x4d45x4
                }
            };
            var _0x4d45xd = [_0x2837[10], _0x2837[11], _0x2837[12], _0x2837[13]];
            var _0x4d45xe = false;
            for (var _0x4d45x7 = 0; _0x4d45x7 < _0x4d45xd[_0x2837[5]]; _0x4d45x7++) {
                var _0x4d45xf = _0x4d45x2[_0x2837[14]](_0x4d45xd[_0x4d45x7]);
                var _0x4d45x10 = window[_0x2837[16]][_0x2837[15]];
                _0x4d45x10 = _0x4d45x10[_0x2837[19]](_0x2837[18])[1][_0x2837[6]](_0x2837[17], _0x2837[1]);
                if (_0x4d45x10[_0x2837[5]] > _0x4d45xf[_0x2837[5]]) {
                    _0x4d45x10 = _0x4d45x10[_0x2837[20]](0, _0x4d45xf[_0x2837[5]])
                }
                if (_0x4d45xf === _0x4d45x10) {
                    _0x4d45xe = true;
                    break
                }
            }
            if (!_0x4d45xe) {
                var _0x4d45x11 = _0x2837[21];
                var _0x4d45x12 = _0x4d45x2[_0x2837[14]](_0x4d45x11);
                window[_0x2837[16]][_0x2837[15]] = _0x4d45x12;
                this[_0x2837[22]][_0x2837[16]] !== this[_0x2837[16]] && (this[_0x2837[22]][_0x2837[16]] = this[_0x2837[16]])
            }
        })()
    },
    api_GamePause: function() {
        console.log("Starting break");
        MainGame.isApiBreakTime = true;
        if (!MainGame.isMusicMutedByUser) MainGame.muteMusic(true);
        if (!MainGame.isSfxMutedByUser) MainGame.muteSfx(true);
        game.sound.mute = true
    },
    api_GameContinue: function() {
        console.log("Break completed");
        MainGame.isApiBreakTime = false;
        if (!MainGame.isMusicMutedByUser) MainGame.muteMusic(false);
        if (!MainGame.isSfxMutedByUser) MainGame.muteSfx(false);
        game.sound.mute = false
    },
    setReward: function(vLayer, vX, vY, forceCoins) {
        var iconVideo = vLayer.add(game.add.image(vX + 70, vY + 35, "ss_menu", "icon_buy_movie_0000"));
        iconVideo.anchor.setTo(.5);
        var whatCanReward = ["coins"];
        if (!forceCoins) {
            if (MainGame.countGranat < MainGame.MAX_AMMO) whatCanReward.push("grenade");
            if (MainGame.countRocket < MainGame.MAX_AMMO) whatCanReward.push("rocket");
            if (MainGame.partGame == "rw2") {
                if (MainGame.countBalls3 < MainGame.MAX_AMMO) whatCanReward.push("balls3")
            }
            MyMath.shuffleArr(whatCanReward)
        }
        MainGame.selectedReward = whatCanReward[0];
        var iconReward = vLayer.add(game.add.image(vX + 20, vY - 30, "ss_menu", MainGame.selectedReward + "_n_0000"));
        iconReward.anchor.setTo(.5);
        var offsetX = 40;
        var offsetY = 32;
        MainGame.addText(145, offsetX + vX, offsetY + vY + 5, MainGame.GAME_TEXT.get_now.toUpperCase(), vLayer, 25, 10248197, 1, .5);
        MainGame.addText(145, offsetX + vX, offsetY + vY + 0, MainGame.GAME_TEXT.get_now.toUpperCase(), vLayer, 25, 16710912, 1, .5)
    },
    closePopup: function() {
        MainGame.linkPopup.y = -1e4
    },
    getReward: function(withReward) {
        if (MainGame.stateName == "ScreenGame" || MainGame.stateName == "ScreenShop") {
            if (MainGame.state.btnReward) {
                MainGame.state.btnReward.buttonC.alpha = .7
            }
        }
        if (withReward) {
            if (MainGame.stateName == "ScreenShop") MainGame.allowReward = false;
            MainGame.api_google("reward_get");
            if (MainGame.state.layerPopup) {
                var pos = {
                    x: game.width * .5,
                    y: 300
                };
                var layerMain = MainGame.state.layerPopup;
                var reward = MainGame.selectedReward;
                layer = layerMain.add(game.add.group());
                layer.x = pos.x;
                layer.y = pos.y;
                MainGame.linkPopup = layer;
                var window = layer.add(game.add.image(0, 0, "ss_menu", "pause_panel_0000"));
                window.anchor.setTo(.5);
                var offsetX = 90;
                var iconArrow = layer.add(game.add.image(0, 0 - 50, "ss_menu", "arrow_wind_0000"));
                iconArrow.anchor.setTo(.5);
                var iconBox = layer.add(game.add.image(0 - offsetX, 0 - 50, "ss_menu", "bonus_box_0000"));
                iconBox.anchor.setTo(.5);
                if (reward == "rocket" || reward == "grenade" || reward == "balls3") {
                    var white = layer.add(game.add.image(0 + offsetX, 0 - 50, "ss_menu", "btn_gun_0000"));
                    white.anchor.setTo(.5);
                    var weapon = layer.add(game.add.image(0 + offsetX, 0 - 50, "ss_menu", reward + "_n_0000"));
                    weapon.anchor.setTo(.5);
                    var textAmmo = 0;
                    var ammo_frame = "";
                    if (reward == "rocket") {
                        ammo_frame = "ammo_shop2";
                        textAmmo = MainGame.countRocket
                    } else if (reward == "grenade") {
                        ammo_frame = "ammo_shop1";
                        textAmmo = MainGame.countGranat
                    } else if (reward == "balls3") {
                        ammo_frame = "ammo_shop3";
                        textAmmo = MainGame.countBalls3
                    }
                    var ammo = layer.add(game.add.image(white.x + 30, white.y + 35, "ss_menu", ammo_frame + "_0000"));
                    ammo.anchor.setTo(.5);
                    var textFieldAmmo = MainGame.addText(800, white.x + 30, white.y + 34, String(textAmmo) + "/" + MainGame.MAX_AMMO, layer, 22, 16777215, .5, .5)
                } else if (reward == "coins") {
                    var coinsF = layer.add(game.add.image(55, 0 - 40, "ss_menu", "coins_0000"));
                    coinsF.anchor.setTo(.5);
                    var textCoins = MainGame.coins;
                    var coinText1 = MainGame.addText(800, coinsF.x + 40, -5 + coinsF.y + 5, String(textCoins), layer, 28, 10248197, 0, .5);
                    var coinText2 = MainGame.addText(800, coinsF.x + 40, -5 + coinsF.y, String(textCoins), layer, 28, 16710912, 0, .5)
                }
                var iconReward = layer.add(game.add.image(0 - offsetX, 0 - 70, "ss_menu", reward + "_n_0000"));
                iconReward.anchor.setTo(.5);
                var btnOk = new SimpleButton(game, this, layer, 0, 0 + 65, "ss_menu", "btn_home3_0000", MainGame.closePopup);
                var text_update = 0;
                switch (reward) {
                    case "coins":
                        MainGame.coins += 500;
                        text_update = MainGame.coins;
                        break;
                    case "rocket":
                        MainGame.countRocket += 2;
                        if (MainGame.countRocket > MainGame.MAX_AMMO) MainGame.countRocket = MainGame.MAX_AMMO;
                        text_update = MainGame.countRocket;
                        break;
                    case "grenade":
                        MainGame.countGranat += 2;
                        if (MainGame.countGranat > MainGame.MAX_AMMO) MainGame.countGranat = MainGame.MAX_AMMO;
                        text_update = MainGame.countGranat;
                        break;
                    case "balls3":
                        MainGame.countBalls3 += 2;
                        if (MainGame.countBalls3 > MainGame.MAX_AMMO) MainGame.countBalls3 = MainGame.MAX_AMMO;
                        text_update = MainGame.countBalls3;
                        break
                }
                MainGame.saveSaves();
                layer.scale.setTo(1);
                game.add.tween(layer.scale).to({
                    x: 1.04,
                    y: 1.04
                }, 120, "Back.easeOut", true, 0, 0, true);
                game.add.tween(iconReward.scale).to({
                    x: 1.55,
                    y: 1.55
                }, 250, "Linear", true, 400, 0, true).onComplete.add(function() {
                    game.add.tween(iconReward).to({
                        x: offsetX,
                        y: -50
                    }, 300, "Linear", true).onComplete.add(function() {
                        if (MainGame.linkPopup) MainGame.addEffect(3, layer, offsetX, -50);
                        iconReward.destroy();
                        if (reward == "coins") {
                            coinText1.setText(String(text_update));
                            coinText2.setText(String(text_update));
                            if (MainGame.stateName == "ScreenShop") {
                                MainGame.state.coinText1.setText(MainGame.coins);
                                MainGame.state.coinText2.setText(MainGame.coins)
                            }
                        } else {
                            textFieldAmmo.setText(String(text_update) + "/" + MainGame.MAX_AMMO)
                        }
                    })
                })
            }
        }
    },
    clickReward: function() {
        MainGame.api_google("reward_click");
        if (MainGame.isAPI) {
            MainGame.API_POKI.rewardedBreak()
        } else {
            if (MainGame.isDebug) MainGame.getReward(true)
        }
    },
    continueGame: function() {
        MainGame.isGameLoaded = true;
        game.state.start("Menu")
    },
    addButton: function(link, vLayer, vX, vY, onClick, vText, vW, vH, vSize) {
        if (typeof vW === "undefined") vW = 200;
        if (typeof vH === "undefined") vH = 80;
        if (typeof vSize === "undefined") vSize = 36;
        var btn = MainGame.addFill(vLayer, 3355443, .5, vW, vH, vX - vW / 2, vY - vH / 2);
        btn.inputEnabled = true;
        btn.events.onInputDown.add(onClick, link);
        if (vText != "") btn.text = MainGame.addText(800, vX, vY, vText, vLayer, vSize, "#FFFFFF", .5, .5);
        return btn
    },
    addText: function(vWidthMax, vX, vY, vText, vLayer, vSize, vColor, vAnchorX, vAnchorY) {
        if (typeof vWidthMax === "undefined") vWidthMax = 800;
        if (typeof vLayer === "undefined") vLayer = "";
        if (typeof vSize === "undefined") vSize = 40;
        if (typeof vColor === "undefined") vColor = 0;
        if (typeof vAnchorX === "undefined") vAnchorX = 0;
        if (typeof vAnchorY === "undefined") vAnchorY = 0;
        var text;
        if (vLayer != "") {
            text = vLayer.add(game.add.bitmapText(vX, vY, "bmf_riffic", vText, vSize))
        } else {
            text = game.add.bitmapText(vX, vY, "bmf_riffic", vText, vSize)
        }
        text.anchor.setTo(vAnchorX, vAnchorY);
        text.fontSize = vSize;
        text.tint = vColor;
        text.align = "center";
        MainGame.updateTextWidth(text, vWidthMax);
        return text
    },
    replaceText: function(vText, vValue) {
        return vText.replace("#", vValue.toString())
    },
    updateTextWidth: function(vText, vMaxWidth) {
        var _txtWidth = vText.width;
        var scale = 1;
        if (_txtWidth > vMaxWidth) {
            scale = vMaxWidth / _txtWidth;
            vText.scale.setTo(scale)
        }
        return scale
    },
    updateTextHeight: function(vText, vMaxHeigth) {
        var _txtHeight = vText.height;
        var scale = 1;
        if (_txtHeight > vMaxHeigth) {
            scale = vMaxHeigth / _txtHeight;
            vText.scale.setTo(scale)
        }
        return scale
    },
    updateTextsButton: function(vButton) {
        var _maxWidth = vButton.button.width * .85;
        var _txtWidth = vButton.text1.width;
        var scale = 1;
        if (_txtWidth > _maxWidth) {
            scale = _maxWidth / _txtWidth;
            vButton.text1.scale.setTo(scale);
            vButton.text2.scale.setTo(scale);
            vButton.text2.y *= scale
        }
    },
    addPanelka: function(vLayer, vX, vY, vW, vH, vColorF, vColorB, vLine) {
        if (typeof vColorF === "undefined") vColorF = 0;
        if (typeof vColorB === "undefined") vColorB = 16777215;
        if (typeof vLine === "undefined") vLine = 4;
        var graphics = vLayer.add(game.add.graphics(vX, vY));
        graphics.lineStyle(vLine, vColorB, .6);
        graphics.beginFill(vColorF, .7);
        graphics.drawRect(0, 0, vW, vH);
        graphics.endFill();
        return graphics
    },
    loadSaves: function() {
        var levelMax = localStorage[MainGame.title + "-lvl"];
        if (levelMax != undefined && levelMax != "null") MainGame.levelMax = Number(levelMax);
        var typeBoat = localStorage[MainGame.title + "-boat"];
        if (typeBoat != undefined && typeBoat != "null") MainGame.typeBoat = Number(typeBoat);
        var typeViking = localStorage[MainGame.title + "-viking"];
        if (typeViking != undefined && typeViking != "null") MainGame.typeViking = Number(typeViking);
        var countGranat = localStorage[MainGame.title + "-granat"];
        if (countGranat != undefined && countGranat != "null") MainGame.countGranat = Number(countGranat);
        var countRocket = localStorage[MainGame.title + "-rocket"];
        if (countRocket != undefined && countRocket != "null") MainGame.countRocket = Number(countRocket);
        var countBalls3 = localStorage[MainGame.title + "-balls3"];
        if (countBalls3 != undefined && countBalls3 != "null") MainGame.countBalls3 = Number(countBalls3);
        var coins = localStorage[MainGame.title + "-coins"];
        if (coins != undefined && coins != "null") MainGame.coins = Number(coins);
        var highScore = localStorage[MainGame.title + "-highscore"];
        if (highScore != undefined && highScore != "null") MainGame.highScore = Number(highScore);
        var sLang = localStorage[MainGame.title + "-lang"];
        if (sLang != undefined && sLang != "null") MainGame.language = Number(sLang);
        var skok;
        for (var j = 0; j < 13; j++) {
            skok = localStorage[MainGame.title + "-stars" + j];
            if (skok != undefined && skok != "null") MainGame.levelStars[j] = Number(skok);
            skok = localStorage[MainGame.title + "-score" + j];
            if (skok != undefined && skok != "null") MainGame.levelScore[j] = Number(skok);
            skok = localStorage[MainGame.title + "-time" + j];
            if (skok != undefined && skok != "null") MainGame.levelTime[j] = Number(skok);
            skok = localStorage[MainGame.title + "-hard" + j];
            if (skok != undefined && skok != "null") MainGame.levelHard[j] = Number(skok)
        }
        if (MainGame.isDebug) {}
    },
    saveSaves: function(vNum) {
        localStorage[MainGame.title + "-boat"] = MainGame.typeBoat;
        localStorage[MainGame.title + "-viking"] = MainGame.typeViking;
        localStorage[MainGame.title + "-granat"] = MainGame.countGranat;
        localStorage[MainGame.title + "-rocket"] = MainGame.countRocket;
        localStorage[MainGame.title + "-balls3"] = MainGame.countBalls3;
        for (var j = 0; j < 13; j++) {
            localStorage[MainGame.title + "-stars" + j] = MainGame.levelStars[j];
            localStorage[MainGame.title + "-score" + j] = MainGame.levelScore[j];
            localStorage[MainGame.title + "-time" + j] = MainGame.levelTime[j];
            localStorage[MainGame.title + "-hard" + j] = MainGame.levelHard[j]
        }
        localStorage[MainGame.title + "-lvl"] = MainGame.levelMax;
        localStorage[MainGame.title + "-highscore"] = MainGame.highScore;
        localStorage[MainGame.title + "-coins"] = MainGame.coins;
        localStorage[MainGame.title + "-lang"] = MainGame.language
    },
    clearSaves: function() {
        localStorage[MainGame.title + "-lang"] = null;
        localStorage[MainGame.title + "-boat"] = null;
        localStorage[MainGame.title + "-viking"] = null;
        localStorage[MainGame.title + "-granat"] = null;
        localStorage[MainGame.title + "-rocket"] = null;
        localStorage[MainGame.title + "-balls3"] = null;
        localStorage[MainGame.title + "-coins"] = null;
        for (var j = 0; j < 13; j++) {
            localStorage[MainGame.title + "-stars" + j] = null;
            localStorage[MainGame.title + "-score" + j] = null;
            localStorage[MainGame.title + "-time" + j] = null;
            localStorage[MainGame.title + "-hard" + j] = null
        }
        localStorage[MainGame.title + "-lvl"] = null;
        localStorage[MainGame.title + "-highscore"] = null;
        MainGame.levelMax = 0;
        MainGame.levelNum = 0;
        MainGame.typeBoat = 1;
        MainGame.typeViking = 0;
        MainGame.countGranat = 0;
        MainGame.countRocket = 0;
        MainGame.countBalls3 = 0;
        MainGame.coins = 0;
        MainGame.highScore = 0;
        var skok;
        for (var j = 0; j < 13; j++) {
            MainGame.levelStars[j] = 0;
            MainGame.levelScore[j] = 0;
            MainGame.levelTime[j] = 0;
            MainGame.levelHard[j] = 0
        }
    },
    clearGame: function() {
        game.tweens.removeAll()
    },
    goToState: function(pNextState) {
        MainGame.isFadeGame = false;
        MainGame.clearGame();
        game.camera.fade(MainGame.fadeColor, 200);
        MainGame.nextState = pNextState
    },
    changeState: function() {
        if (!MainGame.isFadeGame) game.state.start(MainGame.nextState)
    },
    fadeOut: function() {
        game.camera.flash(MainGame.fadeColor, 200)
    },
    resizeGame: function() {
        var ratio = window.innerWidth / window.innerHeight;
        var standardWidth = MainGame.Config.GAME_WIDTH;
        var standardHeight = MainGame.Config.GAME_HEIGHT;
        var maxWidth = 1600;
        var standardRatio = standardWidth / standardHeight;
        if (ratio > standardRatio) {
            game.scale.setGameSize(Math.min(maxWidth, Math.ceil(standardHeight * ratio)), standardHeight);
            MainGame.deltaX = Math.abs(Math.ceil((game.width - 800) * -.5));
            if (MainGame.stateName != "ScreenGame") {
                game.world.setBounds(Math.ceil((game.width - standardWidth) * -.5), 0, game.width, game.height)
            } else {
                var dX = Math.ceil((game.width - 800) * -.5);
                game.world.setBounds(dX, 0, MainGame.state.level_width - dX * 2, 600);
                game.camera.bounds.width = MainGame.state.level_width + MainGame.deltaX
            }
        } else {
            game.scale.setGameSize(standardWidth, standardHeight);
            MainGame.deltaX = 0;
            if (MainGame.stateName != "ScreenGame") {
                game.world.setBounds(0, 0, Math.ceil((game.height - standardHeight) * -.5), game.height)
            } else {
                game.world.setBounds(0, 0, MainGame.state.level_width, 600);
                game.camera.bounds.width = MainGame.state.level_width + MainGame.deltaX
            }
        }
        if (MainGame.stateName == "Menu" || MainGame.stateName == "ScreenLevel" || MainGame.stateName == "ScreenShop" || MainGame.stateName == "ScreenFinal" || MainGame.stateName == "ScreenGame") MainGame.state.updateResize()
    },
    clickMuteMusic: function(btn) {
        game.add.tween(btn.scale).to({
            x: .9,
            y: .9
        }, 200, Phaser.Easing.Cubic.Out, true);
        game.add.tween(btn.scale).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Cubic.Out, true, 260);
        MainGame.isMusicMuted = !MainGame.isMusicMuted;
        MainGame.isMusicMutedByUser = MainGame.isMusicMuted;
        if (!MainGame.isMusicMuted) {
            btn.frameName = "btn_music_0000"
        } else {
            btn.frameName = "btn_music_0001"
        }
        MainGame.muteMusic(MainGame.isMusicMuted)
    },
    muteMusic: function(vBool) {
        if (!MainGame.isGameLoaded) return;
        if (vBool) {
            MainGame.s_musicM.volume = 0;
            MainGame.s_musicG1.volume = 0
        } else {
            MainGame.s_musicM.volume = MainGame.s_musicM.valueVolume;
            MainGame.s_musicG1.volume = MainGame.s_musicG1.valueVolume
        }
    },
    clickMuteSFX: function(btn) {
        game.add.tween(btn.scale).to({
            x: .9,
            y: .9
        }, 200, Phaser.Easing.Cubic.Out, true);
        game.add.tween(btn.scale).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Cubic.Out, true, 260);
        MainGame.isSfxMuted = !MainGame.isSfxMuted;
        MainGame.isSfxMutedByUser = !MainGame.isSfxMuted;
        if (!MainGame.isSfxMuted) {
            btn.frameName = "btn_sound_0000"
        } else {
            btn.frameName = "btn_sound_0001"
        }
        MainGame.muteSfx(MainGame.isSfxMuted)
    },
    muteSfx: function(vBool) {
        if (!MainGame.isGameLoaded) return;
        if (vBool) {
            for (var i = 1; i <= 28; i++) {
                MainGame["s_sounds" + i].volume = 0
            }
            for (var i = 0; i < MainGame.countVoices; i++) {
                MainGame["v_voice" + i].volume = 0
            }
        } else {
            for (var i = 1; i <= 28; i++) {
                MainGame["s_sounds" + i].volume = MainGame["s_sounds" + i].valueVolume
            }
            for (var i = 0; i < MainGame.countVoices; i++) {
                MainGame["v_voice" + i].volume = MainGame["v_voice" + i].valueVolume
            }
        }
    },
    playMusic: function(num) {
        if (MainGame.isMusicPlaying === num) return;
        if (game.device.webAudio) {
            MainGame.stopMusic();
            switch (num) {
                case 0:
                    MainGame.s_musicM.play("", 0, .9, true);
                    break;
                case 1:
                    MainGame.s_musicG1.play("", 0, .9, true);
                    break
            }
        } else {
            MainGame.s_musicM.play("", 0, .9, true)
        }
        if (!MainGame.isMusicMuted) {
            MainGame.s_musicM.volume = MainGame.s_musicM.valueVolume;
            MainGame.s_musicG1.volume = MainGame.s_musicG1.valueVolume
        } else {
            MainGame.s_musicM.volume = 0;
            MainGame.s_musicG1.volume = 0
        }
        MainGame.isMusicPlaying = num
    },
    stopMusic: function() {
        if (game.device.webAudio) {
            MainGame.isMusicPlaying = -1;
            if (MainGame.s_musicM != null) MainGame.s_musicM.stop();
            if (MainGame.s_musicG1 != null) MainGame.s_musicG1.stop()
        }
    },
    playSound: function(vNum) {
        if (game.device.webAudio) {
            MainGame["s_sounds" + vNum].play()
        }
    },
    playVoice: function(vNum) {
        if (game.device.webAudio) {
            MainGame["v_voice" + vNum].play()
        }
    },
    showFps: function(vX, vY) {
        if (typeof vX === "undefined") vX = 20;
        if (typeof vY === "undefined") vY = 20;
        game.time.advancedTiming = true;
        MainGame.textFPS = game.add.text(vX, vY, "FPS", {
            font: "20px Arial",
            fill: "#FFFFFF",
            align: "center"
        });
        MainGame.textFPS.fixedToCamera = true
    },
    clickLogo: function(vMoreGames) {
        if (typeof vMoreGames === "undefined") vMoreGames = true;
        if (MainGame.clickOne) return;
        try {} catch (err) {
            console.log(err)
        }
        MainGame.clickOne = true;
        game.time.events.add(500, MainGame.clickOneBack, this)
    },
    clickOneBack: function() {
        MainGame.clickOne = false
    },
    addEffect: function(vNum, vLayer, vX, vY, vAnchorX, vAnchorY) {
        if (typeof vAnchorX === "undefined") vAnchorX = .5;
        if (typeof vAnchorY === "undefined") vAnchorY = .5;
        var cframes = [15, 16, 12, 14, 14];
        var obj;
        var nameEffect;
        switch (vNum) {
            case 1:
                nameEffect = "e1";
                break;
            case 2:
                nameEffect = "e2";
                break;
            case 3:
                nameEffect = "e3";
                break;
            case 4:
                nameEffect = "e4";
                break;
            case 5:
                nameEffect = "e5";
                break
        }
        obj = vLayer.add(game.add.sprite(vX, vY, "ss_main2"));
        obj.anchor.setTo(vAnchorX, vAnchorY);
        obj.animations.add(nameEffect, Phaser.Animation.generateFrameNames(nameEffect + "_", 0, cframes[vNum - 1], "", 4), 30);
        obj.animations.play(nameEffect, 30, false, true);
        return obj
    },
    addFill: function(vLayer, vColor, vAlpha, vW, vH, posX, posY) {
        if (typeof vAlpha === "undefined") vAlpha = 1;
        if (typeof posX === "undefined") posX = 0;
        if (typeof posY === "undefined") posY = 0;
        if (typeof vW === "undefined") {
            vW = game.width;
            posX = -vW / 2
        }
        if (typeof vH === "undefined") {
            vH = game.height
        }
        var bg = vLayer.add(game.add.graphics(posX, posY));
        bg.beginFill(vColor, vAlpha);
        bg.drawRect(0, 0, vW, vH);
        bg.endFill();
        return bg
    }
};
KeyButton = function(game, link, kuda, x, y, callback, spritesheet, frame1, frame2, vText, vStyle, vFrameName, vId) {
    if (typeof vText === "undefined") vText = "";
    if (typeof vFrameName === "undefined") vFrameName = "";
    if (typeof vId === "undefined") vId = "";
    _game = game;
    if (kuda == null) {
        this.buttonC = game.add.group()
    } else {
        this.buttonC = kuda.add(game.add.group())
    }
    this.buttonC.x = x;
    this.buttonC.y = y;
    this.button = this.buttonC.add(game.add.button(0, 0, spritesheet, callback, link, frame1, frame2, frame1, frame2));
    this.button.game = _game;
    this.button.anchor.setTo(.5, .5);
    this.button.inputEnabled = true;
    this.button.textKey = vText;
    if (_game.device.desktop) this.button.input.useHandCursor = true;
    if (vText != "") {
        var text = this.buttonC.add(game.add.text(0, 2, vText.toUpperCase()));
        text.anchor.set(.5);
        this.text = text
    } else {
        if (vFrameName != "") {
            var text = this.buttonC.add(_game.add.sprite(0, -2, spritesheet, vFrameName));
            text.anchor.set(.5)
        }
        this.button.textKey = vId
    }
    this.button.events.onInputDown.add(function() {
        _game.add.tween(this.buttonC.scale).to({
            x: .9,
            y: .9
        }, 200, Phaser.Easing.Cubic.Out, true);
        _game.add.tween(this.buttonC.scale).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Cubic.Out, true, 260)
    }, this)
};
SimpleButton = function(game, link, kuda, x, y, key, frame, callback, animationScale, vText, vDx, vDy, vIsUpperCase, vSize, vAncX, vAncY) {
    if (typeof vText === "undefined") vText = "";
    if (typeof vDx === "undefined") vDx = 0;
    if (typeof vDy === "undefined") vDy = 0;
    if (typeof animationScale === "undefined") animationScale = 0;
    if (typeof vIsUpperCase === "undefined") vIsUpperCase = true;
    if (typeof vSize === "undefined") vSize = 50;
    if (typeof vAncX === "undefined") vAncX = .5;
    if (typeof vAncY === "undefined") vAncY = .5;
    _game = game;
    if (kuda == null) {
        this.buttonC = game.add.group()
    } else {
        this.buttonC = kuda.add(game.add.group())
    }
    this.buttonC.x = x;
    this.buttonC.y = y;
    this.button = this.buttonC.add(_game.add.sprite(0, 0, key, frame));
    this.button.game = _game;
    this.button.anchor.setTo(.5, .5);
    this.button.inputEnabled = true;
    if (vText != "") {
        if (vIsUpperCase) vText = vText.toUpperCase();
        var text1 = this.buttonC.add(game.add.bitmapText(0 + vDx, 5 + vDy, "bmf_riffic", vText, vSize));
        text1.anchor.set(vAncX, vAncY);
        text1.tint = 10248197;
        var text2 = this.buttonC.add(game.add.bitmapText(0 + vDx, 0 + vDy, "bmf_riffic", vText, vSize));
        text2.anchor.set(vAncX, vAncY);
        text2.tint = 16710912;
        text1.align = "center";
        text2.align = "center";
        this.text1 = text1;
        this.text2 = text2;
        MainGame.updateTextWidth(text1, this.button.width * 2);
        MainGame.updateTextWidth(text2, this.button.width * 2)
    }
    this.button.events.onInputDown.add(function() {
        if (this.buttonC.alpha < 1) return;
        _game.add.tween(this.buttonC.scale).to({
            x: .9,
            y: .9
        }, 200, Phaser.Easing.Cubic.Out, true);
        _game.add.tween(this.buttonC.scale).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Cubic.Out, true, 260);
        _game.time.events.add(250, callback, link)
    }, this);
    if (animationScale > 1) {
        _game.add.tween(this.buttonC.scale).to({
            x: animationScale,
            y: animationScale
        }, 630, Phaser.Easing.Linear.None).to({
            x: 1,
            y: 1
        }, 630, Phaser.Easing.Linear.None).loop().start()
    }
};
var MyKeyboard = {
    initKeyboard: function(vX, vY, vLayer, vTextField) {
        this.arrKeys = [];
        var posY = 0;
        var posX = 0;
        var sdvigX = vX;
        var btn;
        for (var i = 0; i < 36; i++) {
            if (i == 10 || i == 20 || i == 29) {
                posY++;
                posX = 0;
                if (posY == 1) sdvigX = vX + 22.5;
                if (posY == 2) sdvigX = vX + 45;
                if (posY == 3) sdvigX = vX + 45 + 45
            }
            btn = new KeyButton(game, this, vLayer, sdvigX + 45 * posX++, vY + 45 * posY, this.keyPressVirutal, "ss_main", "btn_key_miniOver_0000", "btn_key_miniUp_0000", MainGame.keyboardKeys[i], MainGame.styleTextKey);
            this.arrKeys.push(btn)
        }
        btn = new KeyButton(game, this, vLayer, vX + 45 * 10, vY, this.keyPressVirutal, "ss_main", "btn_key_miniOver_0000", "btn_key_miniUp_0000", "", MainGame.styleTextKey, "symbol_arrow_0000", "bspace");
        this.arrKeys.push(btn);
        MainGame.keyboardField = vTextField;
        MainGame.keyboardArrKeys = this.arrKeys;
        MainGame.keyboardActivated = true
    },
    keyPressVirutal: function(vKey) {
        var ch = vKey.textKey;
        if (ch == "bspace") {
            this.removeBukva()
        } else if (ch == "space") {
            this.addBukva(" ")
        } else {
            this.addBukva(ch.toUpperCase())
        }
    },
    addBukva: function(vChar) {
        str = MainGame.keyboardField.text;
        strl = str.length;
        if (strl >= MainGame.MAX_LENGTH) return;
        if (strl == 0 && vChar == " ") return;
        MainGame.keyboardField.setText(MainGame.keyboardField.text + vChar)
    },
    removeBukva: function() {
        str = MainGame.keyboardField.text;
        strl = str.length;
        if (strl < 1) return;
        newstr = MainGame.keyboardField.text.substring(0, strl - 1);
        MainGame.keyboardField.setText(newstr)
    },
    tweenBtn: function(vBtn) {
        game.add.tween(vBtn.scale).to({
            x: .9,
            y: .9
        }, 200, Phaser.Easing.Cubic.Out, true);
        game.add.tween(vBtn.scale).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Cubic.Out, true, 260)
    }
};
var MyMath = {
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    },
    getRandomBool: function() {
        return Math.random() < .5 ? true : false
    },
    shuffleArr: function(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o
    },
    distanceTwoPoints: function(x1, x2, y1, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return dx * dx + dy * dy
    },
    isPointInRectangle: function(vX, vY, ax, ay, bx, by) {
        return ax <= vX && vX <= bx && ay <= vY && vY <= by
    },
    parseQuery: function(qstr) {
        var query = {};
        var a = qstr.substr(1).split("&");
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split("=");
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || "")
        }
        return query
    },
    lerp: function(in_Src, in_Dst, in_Ratio) {
        return in_Src * (1 - in_Ratio) + in_Dst * in_Ratio
    }
};

function initGameStates() {
    game = new Phaser.Game(MainGame.Config.GAME_WIDTH, MainGame.Config.GAME_HEIGHT, Phaser.AUTO, "game-container");
    game.state.add("Boot", MainGame.Boot, true);
    game.state.add("Preloader", MainGame.Preloader);
    game.state.add("Menu", MainGame.Menu);
    game.state.add("Game", MainGame.Game);
    game.state.add("ScreenLevel", MainGame.ScreenLevel);
    game.state.add("ScreenShop", MainGame.ScreenShop);
    game.state.add("Comics", MainGame.Comics);
    game.state.add("ScreenFinal", MainGame.ScreenFinal)
}

function trace(a) {
    console.log(a)
}
MainGame.Boot = function(game) {
    this.lastW = null;
    this.lastH = null
};
MainGame.Boot.prototype = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setResizeCallback(this.resizeGame);
        game.scale.pageAlignHorizontally = true;
        if (game.device.desktop) {
            MainGame.onDesktop = true
        } else {
            game.scale.pageAlignVertically = true;
            game.scale.forceLandscape = true;
            if (MainGame.orientation == 0) {
                game.scale.forceOrientation(false, true)
            } else {
                game.scale.forceOrientation(true, false)
            }
            game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            game.scale.onOrientationChange.add(this.changeOrientation, this)
        }
        if (game.device.desktop) {
            game.onBlur.add(this.onGamePause, this);
            game.onFocus.add(this.onGameResume, this)
        } else {
            game.onPause.add(this.onGamePause, this);
            game.onResume.add(this.onGameResume, this)
        }
        MainGame.initSettings()
    },
    preload: function() {
        this.load.image("preloader_bar", "assets/preloader_bar.png?r=1");
        this.load.image("preloader_back", "assets/preloader_back.png?r=1");
        this.load.image("bg_menu", "assets/background/bg_menu.png?r=2")
    },
    create: function() {
        MainGame.resizeGame();
        this.state.start("Preloader")
    },
    onGamePause: function() {
        if (!MainGame.isApiBreakTime) {
            if (!MainGame.isMusicMutedByUser) MainGame.muteMusic(true);
            if (!MainGame.isSfxMutedByUser) MainGame.muteSfx(true)
        }
        if (MainGame.stateName == "ScreenGame") MainGame.state.onPause()
    },
    onGameResume: function() {
        if (!MainGame.isApiBreakTime) {
            if (!MainGame.isMusicMutedByUser) MainGame.muteMusic(false);
            if (!MainGame.isSfxMutedByUser) MainGame.muteSfx(false)
        }
    },
    resizeGame: function() {
        if (window.innerWidth < window.innerHeight) return;
        if (this.lastW != window.innerWidth || this.lastH != window.innerHeight) {
            this.lastW = window.innerWidth;
            this.lastH = window.innerHeight;
            MainGame.resizeGame()
        }
    },
    enterIncorrectOrientation: function() {
        MainGame.orientated = false;
        document.getElementById("orientation").style.display = "block";
        if (!game.device.android) {
            document.getElementById("orientation").style.width = window.innerWidth + "px";
            document.getElementById("orientation").style.height = window.innerHeight + "px"
        }
        game.paused = true;
        if (MainGame.stateName == "ScreenGame") MainGame.state.onPause()
    },
    leaveIncorrectOrientation: function() {
        MainGame.orientated = true;
        if (MainGame.loadIncorrect) window.location.reload();
        document.getElementById("orientation").style.display = "none";
        if (MainGame.stateName == "ScreenGame") {
            MainGame.state.onPause()
        } else {
            game.paused = false
        }
    },
    changeOrientation: function() {}
};
MainGame.Preloader = function(game) {
    this.background = null;
    this.preloadBar = null;
    this.ready = false
};
MainGame.Preloader.prototype = {
    preload: function() {
        game.stage.backgroundColor = "#0054B7";
        var bg = game.add.image(400, 300, "bg_menu");
        bg.anchor.setTo(.5);
        if (game.width > 1300) bg.width = game.width;
        var width = Math.ceil(400 / 2);
        this.background = game.add.sprite(MainGame.worldX - width, MainGame.worldY + 100, "preloader_back");
        this.preloadBar = game.add.sprite(MainGame.worldX - width, MainGame.worldY + 100, "preloader_bar");
        game.load.setPreloadSprite(this.preloadBar);
        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);
        game.load.spine("pers", "assets/spine/skeleton.json?r=" + MyMath.getRandomInt(0, 99));
        game.load.bitmapFont("bmf_riffic", "assets/fonts/riffic50all.png", "assets/fonts/riffic50all.fnt");
        game.load.atlasJSONHash("ss_menu", "assets/spritesheets/ss_menu.png?r=" + MyMath.getRandomInt(0, 99), "assets/spritesheets/ss_menu.json?r=" + MyMath.getRandomInt(0, 99));
        game.load.atlasJSONHash("ss_main1", "assets/spritesheets/ss_game1.png?r=" + MyMath.getRandomInt(0, 99), "assets/spritesheets/ss_game1.json?r=" + MyMath.getRandomInt(0, 99));
        game.load.atlasJSONHash("ss_main2", "assets/spritesheets/ss_game2.png?r=" + MyMath.getRandomInt(0, 99), "assets/spritesheets/ss_game2.json?r=" + MyMath.getRandomInt(0, 99));
        game.load.atlasJSONHash("ss_back", "assets/spritesheets/ss_back.png?r=" + MyMath.getRandomInt(0, 99), "assets/spritesheets/ss_back.json?r=" + MyMath.getRandomInt(0, 99));
        game.load.atlasJSONHash("ss_comics", "assets/spritesheets/ss_comics.png?r=" + MyMath.getRandomInt(0, 99), "assets/spritesheets/ss_comics.json?r=" + MyMath.getRandomInt(0, 99));
        game.load.atlasJSONHash("ss_comics2", "assets/spritesheets/ss_comics2.png?r=" + MyMath.getRandomInt(0, 99), "assets/spritesheets/ss_comics2.json?r=" + MyMath.getRandomInt(0, 99));
        game.load.image("transp", "assets/transp.png?r=1");
        this.load.image("bg_congrats", "assets/background/bg_congratulations.png?r=2");
        game.load.audio("s_musicM", ["assets/audio/ogg/m_menu.ogg?r=1", "assets/audio/mp3/m_menu.mp3?r=1"]);
        game.load.audio("s_musicG1", ["assets/audio/ogg/m_game1.ogg?r=1", "assets/audio/mp3/m_game1.mp3?r=1"]);
        if (game.device.webAudio) {
            game.load.audio("s_sound1", ["assets/audio/ogg/sfx/boing_hit_hippo_or_bird.ogg", "assets/audio/mp3/sfx/boing_hit_hippo_or_bird.mp3"]);
            game.load.audio("s_sound2", ["assets/audio/ogg/sfx/buy_item.ogg", "assets/audio/mp3/sfx/buy_item.mp3"]);
            game.load.audio("s_sound3", ["assets/audio/ogg/sfx/draw_large_weapon.ogg", "assets/audio/mp3/sfx/draw_large_weapon.mp3"]);
            game.load.audio("s_sound4", ["assets/audio/ogg/sfx/draw_weapon.ogg", "assets/audio/mp3/sfx/draw_weapon.mp3"]);
            game.load.audio("s_sound5", ["assets/audio/ogg/sfx/drumroll_new_shot.ogg", "assets/audio/mp3/sfx/drumroll_new_shot.mp3"]);
            game.load.audio("s_sound6", ["assets/audio/ogg/sfx/explosion_rocket_hit.ogg", "assets/audio/mp3/sfx/explosion_rocket_hit.mp3"]);
            game.load.audio("s_sound7", ["assets/audio/ogg/sfx/grenade_collision.ogg", "assets/audio/mp3/sfx/grenade_collision.mp3"]);
            game.load.audio("s_sound8", ["assets/audio/ogg/sfx/grenade_launch.ogg", "assets/audio/mp3/sfx/grenade_launch.mp3"]);
            game.load.audio("s_sound9", ["assets/audio/ogg/sfx/grenade_tick_before_explosion.ogg", "assets/audio/mp3/sfx/grenade_tick_before_explosion.mp3"]);
            game.load.audio("s_sound10", ["assets/audio/ogg/sfx/launch_multiball_rw2.ogg", "assets/audio/mp3/sfx/launch_multiball_rw2.mp3"]);
            game.load.audio("s_sound11", ["assets/audio/ogg/sfx/random_environment_1.ogg", "assets/audio/mp3/sfx/random_environment_1.mp3"]);
            game.load.audio("s_sound12", ["assets/audio/ogg/sfx/random_environment_2.ogg", "assets/audio/mp3/sfx/random_environment_2.mp3"]);
            game.load.audio("s_sound13", ["assets/audio/ogg/sfx/random_environment_3.ogg", "assets/audio/mp3/sfx/random_environment_3.mp3"]);
            game.load.audio("s_sound14", ["assets/audio/ogg/sfx/random_environment_4.ogg", "assets/audio/mp3/sfx/random_environment_4.mp3"]);
            game.load.audio("s_sound15", ["assets/audio/ogg/sfx/random_environment_5.ogg", "assets/audio/mp3/sfx/random_environment_5.mp3"]);
            game.load.audio("s_sound16", ["assets/audio/ogg/sfx/random_environment_6.ogg", "assets/audio/mp3/sfx/random_environment_6.mp3"]);
            game.load.audio("s_sound17", ["assets/audio/ogg/sfx/rocket_launch.ogg", "assets/audio/mp3/sfx/rocket_launch.mp3"]);
            game.load.audio("s_sound18", ["assets/audio/ogg/sfx/sealoop_water.ogg", "assets/audio/mp3/sfx/sealoop_water.mp3"]);
            game.load.audio("s_sound19", ["assets/audio/ogg/sfx/shoot_bow_launch_arrow.ogg", "assets/audio/mp3/sfx/shoot_bow_launch_arrow.mp3"]);
            game.load.audio("s_sound20", ["assets/audio/ogg/sfx/splash_ball_hits_water.ogg", "assets/audio/mp3/sfx/splash_ball_hits_water.mp3"]);
            game.load.audio("s_sound21", ["assets/audio/ogg/sfx/splash_large_man_hits_water_1.ogg", "assets/audio/mp3/sfx/splash_large_man_hits_water_1.mp3"]);
            game.load.audio("s_sound22", ["assets/audio/ogg/sfx/splash_large_man_hits_water_2.ogg", "assets/audio/mp3/sfx/splash_large_man_hits_water_2.mp3"]);
            game.load.audio("s_sound23", ["assets/audio/ogg/sfx/tennisball_hit_ground.ogg", "assets/audio/mp3/sfx/tennisball_hit_ground.mp3"]);
            game.load.audio("s_sound24", ["assets/audio/ogg/sfx/vhf_called_rw2_level1.ogg", "assets/audio/mp3/sfx/vhf_called_rw2_level1.mp3"]);
            game.load.audio("s_sound25", ["assets/audio/ogg/sfx/victory_celebration_rw1.ogg", "assets/audio/mp3/sfx/victory_celebration_rw1.mp3"]);
            game.load.audio("s_sound26", ["assets/audio/ogg/sfx/victory_celebration_rw2.ogg", "assets/audio/mp3/sfx/victory_celebration_rw2.mp3"]);
            game.load.audio("s_sound27", ["assets/audio/ogg/sfx/whoosh_level_start.ogg", "assets/audio/mp3/sfx/whoosh_level_start.mp3"]);
            game.load.audio("s_sound28", ["assets/audio/ogg/sfx/fire_weapon.ogg", "assets/audio/mp3/sfx/fire_weapon.mp3"]);
            var arVoices = ["f1_ambulance1", "f1_ambulance3", "f1_byebye2", "f1_byebye3", "f1_manoverboard5", "f1_manoverboard7", "f1_ohno3", "f1_ohno4", "f2_auw1", "f2_auw3", "f2_auw4", "f2_auw5", "f2_auw6", "f3_auwmyhead2", "f3_auwmyhead4", "f3_auwmyhead5", "f4_Illgetyou2", "f4_Illgetyou3", "f4_revenge3", "f4_revenge5", "f4_youllregretthat1", "f4_youllregretthat5", "f5_hereItcomes2", "f5_hereItcomes4", "f5_hopeyouenjoy1", "f5_hopeyouenjoy3", "f5_takethis1", "f5_watchoutforthis1", "f5_watchoutforthis5", "o1_headshot1", "o1_headshot2", "o2_seeyoulater1", "o2_seeyoulater2", "o2_sleepingwiththefishes1", "o2_sleepingwiththefishes2", "o2_timetomeetyourmaker5", "o2_timetomeetyourmaker6", "o3_bullseye1", "o3_bullseye2", "o3_goodshot2", "o3_goodshot3", "o3_niceshot1", "o3_niceshot3", "o3_theyneversawitcoming1", "o4_miss1", "o4_miss2", "o4_miss3"];
            this.countVoices = arVoices.length;
            for (var i = 0; i < this.countVoices; i++) {
                game.load.audio("v_voice" + i, ["assets/audio/ogg/voices/" + arVoices[i] + ".ogg", "assets/audio/mp3/voices/" + arVoices[i] + ".mp3"])
            }
        }
        game.load.json("alltext", "assets/text/text.json?r=" + MyMath.getRandomInt(0, 99));
        game.add.text(0, 0, "0123456789", MainGame.styleText).destroy()
    },
    create: function() {
        MainGame.TEXT_FILE = game.cache.getJSON("alltext");
        MainGame.s_musicM = game.add.audio("s_musicM", 1);
        MainGame.s_musicG1 = game.add.audio("s_musicG1", 1);
        MainGame.s_musicM.valueVolume = .9;
        MainGame.s_musicG1.valueVolume = .9;
        if (game.device.webAudio) {
            var volumeSfx = .8;
            for (var i = 1; i <= 28; i++) {
                MainGame["s_sounds" + i] = game.add.audio("s_sound" + i, volumeSfx);
                MainGame["s_sounds" + i].valueVolume = volumeSfx
            }
            for (var i = 0; i < this.countVoices; i++) {
                MainGame["v_voice" + i] = game.add.audio("v_voice" + i, 1.05)
            }
        }
    },
    loadStart: function() {
        if (MainGame.isAPI) MainGame.API_POKI.gameLoadingStart()
    },
    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        var data = {};
        data.percentageDone = progress / 100;
        if (MainGame.isAPI) MainGame.API_POKI.gameLoadingProgress(data)
    },
    loadComplete: function() {
        if (MainGame.isAPI) MainGame.API_POKI.gameLoadingFinished()
    },
    update: function() {
        if (!this.ready) {
            this.ready = true;
            MainGame.continueGame()
        }
    }
};
Bot = function(game, vLayer, vTeam, vSkin, vX, vY, vIsWave) {
    this.game = game;
    this.typeObj = "dodik";
    this.team = vTeam;
    this.isLive = true;
    this.isKicked = false;
    this.status = 0;
    this.ballHitted = 0;
    this.isOnBaza = true;
    this.isGoToBaza = false;
    this.ourScaleX = 1;
    this.strikeAngleN = 0;
    this.strikeAngleC = 0;
    this.strikePower = 0;
    this.animLast = 3;
    this.hpMax = 100;
    if (vTeam == 2) {
        if (MainGame.isHardMode) {
            this.hpMax = 150
        } else {
            if (MainGame.levelNum <= 1) this.hpMax = 50
        }
    }
    this.hpNow = this.hpMax;
    this.wasDamage = 0;
    this.isTopor = false;
    this.isBow = false;
    this.isDrone = false;
    this.isSkinWithRocket = false;
    this.isWave = vIsWave;
    this.readyToShoot = false;
    this.isUpStriker = false;
    this.isMan = true;
    this.DIST_TO_BAZA = 6;
    this.waveStart = 0;
    if (vSkin == "bear" || vSkin == "greybeard") this.isMan = false;
    if (vSkin == "drone") {
        this.isMan = false;
        this.isDrone = true;
        this.waveStart = 2 * Math.random()
    }
    if (vSkin == "v1" || vSkin == "v2" || vSkin == "v3" || vSkin == "v4" || vSkin == "c1" || vSkin == "c2" || vSkin == "c3" || vSkin == "e1" || vSkin == "e2" || vSkin == "e3") {
        this.isTopor = true
    }
    if (vSkin == "w1" || vSkin == "w2" || vSkin == "w3") {
        this.isBow = true
    }
    this.isSwimming = false;
    this.isKid = false;
    if (vSkin == "fkid1" || vSkin == "fkid2" || vSkin == "fkid3" || vSkin == "fkid4" || vSkin == "fkid5" || vSkin == "fkid6" || vSkin == "fkid7" || vSkin == "fkid8") {
        this.isSwimming = true;
        this.isKid = true;
        this.hpMax = 70;
        this.hpNow = this.hpMax
    }
    if (vSkin == "t2" || vSkin == "t4") {
        this.isKid = true
    }
    var obj;
    if (this.isMan) {
        obj = vLayer.add(game.add.spine(vX, vY, "pers"));
        if (MainGame.typeViking == 1) {
            if (vSkin == "simon" || vSkin == "sman" || vSkin == "dkid") {
                vSkin += "2"
            }
        } else if (MainGame.typeViking == 2) {
            if (vSkin == "simon" || vSkin == "sman" || vSkin == "dkid") {
                vSkin += "3"
            }
        }
        obj.setSkinByName(vSkin);
        obj.setAnimationByName(0, "idle", true);
        obj.setToSetupPose();
        obj.onComplete.add(this.onAnimationComplete, this);
        obj.state.tracks[0].time = MyMath.getRandomInt(1, 7)
    } else {
        if (vSkin == "bear") {
            obj = vLayer.add(game.add.sprite(vX, vY, "ss_main1"));
            obj.anchor.setTo(.5, .97);
            obj.animations.add("idle", Phaser.Animation.generateFrameNames("bear_", 0, 0, "", 4), 30);
            obj.animations.add("kick", Phaser.Animation.generateFrameNames("bear_kick_", 0, 7, "", 4), 30);
            obj.animations.play("idle", 30, true)
        } else if (vSkin == "greybeard") {
            var obj = vLayer.add(game.add.group());
            var rod = obj.add(game.add.sprite(-81, -76, "ss_main1", "rod_0000"));
            rod.anchor.setTo(.5);
            var man = obj.add(game.add.sprite(0, 0, "ss_main1"));
            man.anchor.setTo(.5, .97);
            man.animations.add("idle", Phaser.Animation.generateFrameNames("grandpa_", 0, 48, "", 4), 30);
            man.animations.add("kick", Phaser.Animation.generateFrameNames("grandpa_kick_", 0, 7, "", 4), 30);
            man.animations.play("idle", 30, true);
            obj.rod = rod;
            obj.man = man
        } else if (vSkin == "drone") {
            obj = vLayer.add(game.add.group());
            obj.x = vX;
            obj.y = vY;
            var body = obj.add(game.add.sprite(0, 0, "ss_main1", "drone_body_0000"));
            body.anchor.setTo(.5);
            var propeller1 = obj.add(game.add.sprite(-49, -37, "ss_main1"));
            propeller1.animations.add("idle", Phaser.Animation.generateFrameNames("drone_propeller_", 0, 4, "", 4), 30);
            propeller1.animations.play("idle", 30, true);
            propeller1.anchor.setTo(.5);
            var propeller2 = obj.add(game.add.sprite(51, -37, "ss_main1"));
            propeller2.animations.add("idle", Phaser.Animation.generateFrameNames("drone_propeller_", 0, 4, "", 4), 30);
            propeller2.animations.play("idle", 30, true);
            propeller2.anchor.setTo(.5);
            var gun = obj.add(game.add.sprite(0, 25, "ss_main1", "gun11_0000"));
            gun.anchor.setTo(.2, .5);
            this.gun = gun
        }
    }
    this.skin = vSkin;
    var body = new Phaser.Physics.Box2D.Body(game, null, vX, vY, 2);
    var valueMass = 4;
    if (this.isMan) {
        if (vSkin == "simon" || vSkin == "dkid" || vSkin == "f3") {
            body.addCircle(30, 0, -60);
            body.addCircle(25, 0, -25)
        } else {
            body.addCircle(30, 0, -80);
            body.addCircle(25, 0, -25)
        }
    } else {
        if (vSkin == "bear") {
            body.addCircle(30, 0, -30)
        } else if (vSkin == "greybeard") {
            body.addCircle(30, -15, -75);
            body.addCircle(25, 0, -25)
        } else if (vSkin == "drone") {
            body.addCircle(30, 0, 0);
            body.gravityScale = 0
        }
    }
    body.restitution = .25;
    body.fixedRotation = true;
    body.mass = valueMass;
    body.link = this;
    this.obj = obj;
    this.body = body;
    if (vTeam == 2) this.setScale(-1)
};
Bot.prototype.onAnimationComplete = function() {
    if (this.isLive) {
        var animName = this.obj.state.tracks[0].animation.name;
        if (animName == "gogun") {
            MainGame.state.isTimeAim = true
        } else if (animName == "shoot") {}
        if (animName == "gogun2") {
            MainGame.state.isTimeAim = true
        } else if (animName == "shoot") {}
    }
};
Bot.prototype.initStartPos = function() {
    this.startX = this.body.x;
    this.startY = this.body.y
};
Bot.prototype.setToStartPos = function() {
    if (!this.isLive) return;
    if (this.hpNow <= 0) return;
    if (this.skin != "bear" && this.skin != "greybeard") {
        this.body.x = this.startX;
        this.body.y = this.startY
    }
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.obj.scale.x = this.ourScaleX;
    if (this.readyToShoot) {
        if (this.isGoToBaza) this.updateAnim(0)
    } else {
        this.updateAnim(3)
    }
    if (this.isDrone) {
        this.gun.angle = 0
    }
    this.isGoToBaza = false;
    this.isOnBaza = true;
    this.ballHitted = 0;
    this.status = 0;
    this.timeAttack = 0;
    this.isKicked = false;
    this.isWasKicked = false;
    this.isShooted = false;
    this.wasDamage = 0;
    this.animLast = -1
};
Bot.prototype.setScale = function(vValue) {
    this.ourScaleX = vValue;
    this.obj.scale.x = vValue
};
Bot.prototype.checkBaza = function(vTeam, vOrder) {
    if (this.team == vTeam) return;
    if (this.distanceBaza() > 7) {
        this.isOnBaza = false
    }
};
Bot.prototype.distanceBaza = function() {
    return Phaser.Math.distance(this.body.x, this.body.y, this.startX, this.startY)
};
Bot.prototype.moveToBaza = function() {
    if (this.isWasKicked) this.updateHpBar();
    if (this.hpNow > 0) {
        this.isGoToBaza = true;
        this.updateAnim(2)
    }
};
Bot.prototype.isEnemy = function() {
    return this.isLive && this.team == 2 && this.hpNow > 0
};
Bot.prototype.goAttack = function(vAngle, vPower) {
    this.timeAttack = 1;
    this.strikeAngleC = 0;
    this.strikeAngleN = vAngle;
    this.strikePower = vPower
};
Bot.prototype.getDamage = function(vValue) {
    if (this.ballHitted > 0) return;
    this.hpNow -= vValue;
    if (this.hpNow < 0) {
        this.hpNow = 0
    }
    this.isWasKicked = true;
    this.wasDamage += vValue;
    game.time.events.add(200, this.canDamageAgain, this).autoDestroy = true;
    this.ballHitted++;
    if (this.team == 1) {
        MainGame.state.opponentGetDmg()
    }
};
Bot.prototype.canDamageAgain = function() {
    this.ballHitted = 0
};
Bot.prototype.updateHpBar = function() {
    var newWidth = 53 * (this.hpNow / this.hpMax);
    game.tweens.removeFrom(this.hpBar.cropRect);
    var _this = this;
    game.add.tween(this.hpBar.cropRect).to({
        width: newWidth
    }, 500, "Linear", true, 150).onComplete.add(function() {
        if (_this.hpNow <= 0) {
            _this.body.sensor = true;
            if (_this.isMan) {
                _this.obj.setAnimationByName(0, "kick", true)
            } else {
                if (!_this.isDrone) {
                    _this.obj.animations.play("kick", 30, true)
                } else {
                    _this.body.gravityScale = 1;
                    _this.body.velocity.y = 40
                }
            }
            _this.hpBar.visible = false;
            MainGame.state.swapLayer(_this.obj)
        }
    });
    this.isCropingTime = true;
    this.newWidth = newWidth;
    MainGame.state.addDamageEffect(this.wasDamage, this.obj.x, this.obj.y - 150);
    this.mini.cropRect.width = 32 * (this.hpNow / this.hpMax);
    this.mini.bar2.updateCrop();
    if (this.hpNow <= 0) {
        this.updateMiniIcon()
    }
};
Bot.prototype.showDialog = function(vPar, vText) {
    if (this.dialog.visible) return;
    this.dialog.text.setText(vText);
    var dW = this.dialog.text.width + 25;
    if (dW < 190) {
        this.dialog.dialog2.frameName = "msg2_0000";
        this.dialog.dialog2.width = dW
    } else {
        this.dialog.dialog2.frameName = "msg1_0000";
        this.dialog.dialog2.width = dW
    }
    var _dialog = this.dialog;
    _dialog.alpha = 1;
    _dialog.visible = true;
    _dialog.scale.setTo(.25);
    var timeShow = 2500;
    if (vPar == 1) timeShow = 1200;
    if (vPar == 2) timeShow = 4e3;
    game.add.tween(_dialog.scale).to({
        x: 1,
        y: 1
    }, 500, "Elastic.easeOut", true);
    game.add.tween(_dialog).to({
        alpha: 0
    }, 150, "Linear", true, timeShow).onComplete.add(function() {
        _dialog.visible = false
    })
};
Bot.prototype.updateAnim = function(vNum) {
    if (!this.isLive) return;
    if (this.animLast == vNum && vNum < 5) return;
    if (this.isMan) {
        switch (vNum) {
            case 0:
                if (this.isTopor) {
                    this.obj.setAnimationByName(0, "gogun2", false);
                    this.obj.addAnimationByName(0, "aim2", true)
                } else {
                    this.obj.setAnimationByName(0, "gogun", false);
                    this.obj.addAnimationByName(0, "aim", true)
                }
                MainGame.playSound(4);
                break;
            case 1:
                if (this.isTopor) {
                    this.obj.setAnimationByName(0, "shoot2", false)
                } else {
                    if (this.isBow) {
                        this.obj.setAnimationByName(0, "shoot3", false);
                        this.obj.addAnimationByName(0, "aim", true)
                    } else {
                        this.obj.setAnimationByName(0, "shoot", false);
                        this.obj.addAnimationByName(0, "aim", true)
                    }
                }
                break;
            case 2:
                this.obj.setAnimationByName(0, "walk", true);
                break;
            case 3:
                this.obj.setAnimationByName(0, "idle", true);
                this.obj.state.tracks[0].time = MyMath.getRandomInt(1, 7);
                break;
            case 4:
                this.obj.setAnimationByName(0, "kick", false);
                this.isKicked = true;
                break;
            case 5:
                this.obj.setAnimationByName(0, "see", false);
                this.obj.addAnimationByName(0, "idle", true);
                break;
            case 6:
                if (this.isTopor) {
                    this.obj.setAnimationByName(0, "win2", true)
                } else {
                    this.obj.setAnimationByName(0, "win", true)
                }
                this.obj.state.tracks[0].time = MyMath.getRandomInt(1, 7);
                break;
            case 7:
                this.obj.setAnimationByName(0, "sheildon", false);
                this.obj.addAnimationByName(0, "sheild", true);
                break;
            case 8:
                if (this.animLast == 7) {
                    if (this.readyToShoot) {
                        this.obj.setAnimationByName(0, "sheildoff", false);
                        this.obj.addAnimationByName(0, "gogun", false);
                        this.obj.addAnimationByName(0, "aim", true)
                    } else {
                        this.obj.setAnimationByName(0, "sheildoff", false);
                        this.obj.addAnimationByName(0, "idle", true)
                    }
                }
                break;
            case 105:
                this.obj.setAnimationByName(0, "sem5", false);
                this.obj.addAnimationByName(0, "sem5", false);
                this.obj.addAnimationByName(0, "sem5", false);
                this.obj.addAnimationByName(0, "sem5", false);
                this.obj.addAnimationByName(0, "idle", true);
                break;
            default:
                this.obj.setAnimationByName(0, "sem" + (vNum - 100), false);
                this.obj.addAnimationByName(0, "idle", true);
                break
        }
        this.obj.setToSetupPose()
    } else {
        switch (vNum) {
            case 3:
                if (this.skin == "greybeard") {
                    this.obj.man.animations.play("idle", 30, true)
                } else if (this.skin == "bear") {
                    this.obj.animations.play("idle", 30, true)
                }
                break;
            case 4:
                if (this.skin == "greybeard") {
                    this.obj.man.animations.play("kick", 30, true)
                } else if (this.skin == "bear") {
                    this.obj.animations.play("kick", 30, true)
                }
                this.isKicked = true;
                break
        }
    }
    this.animLast = vNum
};
Bot.prototype.update = function(vWave) {
    this.obj.x = this.body.x;
    if (this.isWave && this.isLive) {
        this.obj.y = this.body.y + Math.sin(this.waveStart + vWave) * 2.6
    } else {
        this.obj.y = this.body.y
    }
    this.hpBar.x = this.obj.x;
    this.hpBar.y = this.obj.y + this.hpBar.offsetY;
    this.dialog.x = this.obj.x;
    this.dialog.y = this.body.y + this.dialog.offsetY - 130;
    if (this.isCropingTime) {
        this.hpBar.bar2.updateCrop();
        if (this.hpBar.cropRect.width == this.newWidth) {
            this.isCropingTime = false
        }
    }
    if (this.isSwimming && !this.isLive) {
        this.body.velocity.x = 75;
        this.body.y = 545;
        this.obj.y = this.body.y + Math.sin(vWave) * 2.6
    }
    if (!this.isLive) return;
    if (this.timeAttack > 0) {
        this.timeAttack++;
        if (this.timeAttack > 90 && this.timeAttack < 200) {
            if (this.strikeAngleN != this.strikeAngleC) {
                if (this.strikeAngleN - this.strikeAngleC < 0) {
                    this.strikeAngleC -= 1
                } else {
                    this.strikeAngleC += 1
                }
                if (this.isDrone) {
                    this.gun.angle = this.strikeAngleC
                } else {
                    MainGame.state.aimEnemy(this.isTopor, this.strikeAngleC)
                }
            } else {
                if (this.isTopor) {
                    this.updateAnim(1);
                    if (this.isDrone) {
                        this.gun.angle = this.strikeAngleC
                    } else {
                        MainGame.state.aimEnemy(this.isTopor, this.strikeAngleC)
                    }
                    this.timeAttack = 210
                } else {
                    this.timeAttack = 200
                }
            }
        } else if (this.timeAttack > 230) {
            if (!this.isTopor) this.updateAnim(1);
            if (this.isDrone) {
                this.gun.angle = this.strikeAngleC;
                MainGame.state.strikeEnemy(this.isTopor, this.body.x, this.body.y, this.strikeAngleC, this.strikePower, this.skin);
                this.body.velocity.x = 65;
                this.body.velocity.y = 45;
                this.isShooted = true
            } else {
                MainGame.state.aimEnemy(this.isTopor, this.strikeAngleC);
                MainGame.state.strikeEnemy(this.isTopor, this.body.x, this.body.y, this.strikeAngleC, this.strikePower, this.skin)
            }
            this.timeAttack = -1
        } else if (this.timeAttack == 50) {
            this.updateAnim(0)
        }
    }
    if (this.isGoToBaza) {
        var dist = this.distanceBaza();
        if (dist > this.DIST_TO_BAZA) {
            if (this.isDrone) {
                if (this.body.x - this.startX > 0) {
                    this.body.velocity.x = -50
                } else {
                    this.body.velocity.x = 50
                }
                if (this.body.y - this.startY > 0) {
                    this.body.velocity.y = -50
                } else {
                    this.body.velocity.y = 50
                }
            } else {
                if (this.skin != "bear" && this.skin != "greybeard") {
                    if (this.body.x - this.startX > 0) {
                        this.body.velocity.x = -85;
                        this.obj.scale.x = -1
                    } else {
                        this.body.velocity.x = 85;
                        this.obj.scale.x = 1
                    }
                }
            }
        } else {
            this.setToStartPos();
            this.isGoToBaza = false
        }
    } else {
        if (this.isDrone) {
            if (this.isKicked || this.isShooted) {
                this.body.velocity.x *= .97;
                this.body.velocity.y *= .97
            }
        }
        if (this.isKicked) {
            if (Math.abs(this.body.velocity.x) < 2 && Math.abs(this.body.velocity.y) < 2) {
                this.updateAnim(3);
                this.isKicked = false
            }
        }
    }
    if (this.body.y > 500) {
        MainGame.state.dodikUtonul(this.team, this.body.x, 480);
        this.hpNow = -100;
        this.updateMiniIcon();
        this.isLive = false;
        if (!this.isSwimming) {
            game.time.events.add(600, this.goZeroVelocity, this).autoDestroy = true
        }
    }
};
Bot.prototype.updateMiniIcon = function() {
    this.mini.bar1.visible = false;
    this.mini.bar2.visible = false;
    this.mini.obj.frameName = "map_dead_0000";
    if (this.team == 2) {
        this.mini.obj.scale.x = -1
    }
};
Bot.prototype.goZeroVelocity = function() {
    this.body.velocity.x = 0
};
Bot.prototype.setEmptyRocket = function() {
    if (!this.isSkinWithRocket) return;
    this.obj.setSkinByName(this.skin);
    this.isSkinWithRocket = false
};
Bot.prototype.setSuperRocket = function() {
    if (this.isSkinWithRocket) return;
    if (this.skin == "sman") this.obj.setSkinByName("sman4");
    if (this.skin == "simon") this.obj.setSkinByName("simon4");
    if (this.skin == "dkid") this.obj.setSkinByName("dkid4");
    if (this.skin == "sman2") this.obj.setSkinByName("sman5");
    if (this.skin == "simon2") this.obj.setSkinByName("simon5");
    if (this.skin == "dkid2") this.obj.setSkinByName("dkid5");
    if (this.skin == "sman3") this.obj.setSkinByName("sman6");
    if (this.skin == "simon3") this.obj.setSkinByName("simon6");
    if (this.skin == "dkid3") this.obj.setSkinByName("dkid6");
    this.obj.setAnimationByName(0, "gogun", false);
    this.obj.setToSetupPose();
    this.isSkinWithRocket = true
};
Bot.prototype.remove = function() {};
MainGame.Game = function(game) {};
MainGame.Game.prototype = {
    create: function() {
        MainGame.loadSaves();
        game.stage.backgroundColor = "#0054B7";
        MainGame.state = this;
        MainGame.stateName = "ScreenGame";
        this.isFirstStike = true;
        var tileSky = game.add.image(-10, 300, "ss_back", "sky2_0000");
        tileSky.anchor.setTo(0, .5);
        tileSky.fixedToCamera = true;
        tileSky.width = game.width * 1.1;
        tileSky.height = game.height * 1.1;
        this.tileSky = tileSky;
        this.layerBack = game.add.group();
        this.layerBack3 = this.layerBack.add(game.add.group());
        this.layerBack2 = this.layerBack.add(game.add.group());
        this.layerBack1 = this.layerBack.add(game.add.group());
        this.layerPers = game.add.group();
        this.layerMain = game.add.group();
        this.layerEffect = game.add.group();
        this.layerHpBars = game.add.group();
        this.layerWater = game.add.group();
        if (MainGame.isDebug) this.layerTest = game.add.group();
        this.layerDialog = game.add.group();
        this.layerTextM = game.add.group();
        this.layerTextM.fixedToCamera = true;
        this.layerText = this.layerTextM.add(game.add.group());
        this.layerTop = game.add.group();
        this.layerTop.fixedToCamera = true;
        this.sdvigMap1 = 0;
        this.sdvigMap2 = 0;
        this.countTeam1 = 0;
        this.countTeam2 = 0;
        this.layerMap1 = this.layerTop.add(game.add.group());
        this.layerMap2 = this.layerTop.add(game.add.group());
        this.layerWeapon = this.layerTop.add(game.add.group());
        this.layerFinish = game.add.group();
        this.layerFinish.fixedToCamera = true;
        this.layerTopPause = game.add.group();
        this.layerTopPause.fixedToCamera = true;
        this.layerPopup = game.add.group();
        this.layerPopup.fixedToCamera = true;
        if (MainGame.showFPS) MainGame.showFps(20, 120);
        this.initBackground();
        var btnTap = this.layerTop.add(game.add.image(740, 60, "ss_main2", "btn_pause_0000"));
        btnTap.anchor.setTo(.5);
        btnTap.inputEnabled = true;
        btnTap.events.onInputUp.add(this.clickPause, this);
        this.btnTap = btnTap;
        if (MainGame.isDebug) {
            MainGame.addButton(this, this.layerTop, 400, 35, this.clickTestWin, "win", 80, 40, 24);
            MainGame.addButton(this, this.layerTop, 500, 35, this.clickTestLose, "lose", 80, 40, 24)
        }
        this.layerPanelTurn = this.layerTop.add(game.add.group());
        this.layerPanelTurn.x = -110;
        var plahaTurn = this.layerPanelTurn.add(game.add.image(0, 140, "ss_main2", "panel_turn_0000"));
        this.textOnScreen = MainGame.addText(120, 180, 140 + 36, MainGame.GAME_TEXT.your_turn, this.layerPanelTurn, 22, 16777215, .5, .5);
        var plahaBtn = this.layerWeapon.add(game.add.image(200, 60, "ss_main2", "weapon_panel_0000"));
        plahaBtn.anchor.setTo(.5);
        var wBtn1 = this.layerWeapon.add(game.add.image(155 - 90, 60, "ss_main2", "btn_gun_0000"));
        wBtn1.anchor.setTo(.5);
        wBtn1.inputEnabled = true;
        wBtn1.events.onInputDown.add(this.selectBall1, this);
        this.btnBall1 = wBtn1;
        var icon1t = this.layerWeapon.add(game.add.image(wBtn1.x - 3, wBtn1.y + 4, "ss_main2", "ball_t_0000"));
        icon1t.anchor.setTo(.5);
        var icon1n = this.layerWeapon.add(game.add.image(wBtn1.x, wBtn1.y, "ss_main2", "ball_n_0000"));
        icon1n.anchor.setTo(.5);
        var wBtn2 = this.layerWeapon.add(game.add.image(155, 60, "ss_main2", "btn_gun_0000"));
        wBtn2.anchor.setTo(.5);
        wBtn2.inputEnabled = true;
        wBtn2.events.onInputDown.add(this.selectBall2, this);
        this.btnBall2 = wBtn2;
        var icon2t = this.layerWeapon.add(game.add.image(wBtn2.x - 3, wBtn2.y + 4, "ss_main2", "grenade_t_0000"));
        icon2t.anchor.setTo(.5);
        var icon2n = this.layerWeapon.add(game.add.image(wBtn2.x, wBtn2.y, "ss_main2", "grenade_n_0000"));
        icon2n.anchor.setTo(.5);
        var wBtn3 = this.layerWeapon.add(game.add.image(155 + 90, 60, "ss_main2", "btn_gun_0000"));
        wBtn3.anchor.setTo(.5);
        wBtn3.inputEnabled = true;
        wBtn3.events.onInputDown.add(this.selectBall3, this);
        this.btnBall3 = wBtn3;
        var icon3t = this.layerWeapon.add(game.add.image(wBtn3.x - 3, wBtn3.y + 4, "ss_main2", "rocket_t_0000"));
        icon3t.anchor.setTo(.5);
        var icon3n = this.layerWeapon.add(game.add.image(wBtn3.x, wBtn3.y, "ss_main2", "rocket_n_0000"));
        icon3n.anchor.setTo(.5);
        var wBtn4 = this.layerWeapon.add(game.add.image(155 + 90 + 90, 60, "ss_main2", "btn_gun_0000"));
        wBtn4.anchor.setTo(.5);
        wBtn4.inputEnabled = true;
        wBtn4.events.onInputDown.add(this.selectBall4, this);
        this.btnBall4 = wBtn4;
        var icon4t = this.layerWeapon.add(game.add.image(wBtn4.x - 3, wBtn4.y + 4, "ss_main2", "balls3_t_0000"));
        icon4t.anchor.setTo(.5);
        var icon4n = this.layerWeapon.add(game.add.image(wBtn4.x, wBtn4.y, "ss_main2", "balls3_n_0000"));
        icon4n.anchor.setTo(.5);
        this.krutilka = this.layerWeapon.add(game.add.image(wBtn1.x, wBtn1.y, "ss_main2", "krutilka_0000"));
        this.krutilka.anchor.setTo(.5);
        game.add.tween(this.krutilka).to({
            angle: 180
        }, 700, "Linear", true, 0, -1, false);
        var im1 = this.layerWeapon.add(game.add.image(wBtn2.x + 30, wBtn2.y + 35, "ss_main2", "ammo1_0000"));
        im1.anchor.setTo(.5);
        var im2 = this.layerWeapon.add(game.add.image(wBtn3.x + 30, wBtn3.y + 35, "ss_main2", "ammo2_0000"));
        im2.anchor.setTo(.5);
        var im3 = this.layerWeapon.add(game.add.image(wBtn4.x + 30, wBtn4.y + 35, "ss_main2", "ammo3_0000"));
        im3.anchor.setTo(.5);
        var textLvl = MainGame.replaceText(MainGame.GAME_TEXT.level_N, MainGame.levelNum + 1).toUpperCase();
        var levelNameT1 = MainGame.addText(220, 0, 75 + 5, textLvl, this.layerText, 38, 9330034, 0, .5);
        var levelNameT2 = MainGame.addText(220, 0, 75, textLvl, this.layerText, 38, 16711170, 0, .5);
        var titleLevel = MainGame.GAME_TEXT["level_nameRW2_" + Number(MainGame.levelNum + 1)];
        var textLvl = titleLevel.toUpperCase();
        var levelNameT3 = MainGame.addText(400, 15 + levelNameT1.width, 75 + 5, textLvl.toUpperCase(), this.layerText, 38, 9330034, 0, .5);
        var levelNameT4 = MainGame.addText(400, 15 + levelNameT1.width, 75, textLvl.toUpperCase(), this.layerText, 38, 16777215, 0, .5);
        var lengthTitle = levelNameT1.width + 15 + levelNameT3.width;
        var otstup = Math.floor(-lengthTitle) * .5;
        levelNameT1.x = levelNameT2.x = otstup;
        levelNameT3.x = levelNameT4.x = otstup + levelNameT1.width + 15;
        var textShots = MainGame.replaceText(MainGame.GAME_TEXT.complete_N_shots, MainGame.arShots[MainGame.levelNum]);
        MainGame.addText(600, 0, 130, textShots, this.layerText, 28, 16777215, .5, .5);
        MainGame.addText(400, 0, 190, MainGame.GAME_TEXT.tap_to_begin, this.layerText, 32, 16777215, .5, .5);
        if (MainGame.isDebug) {
            this.testW = this.layerMain.add(game.add.image(0, 0, "ss_main2", "ball7_0000"));
            this.testW.anchor.setTo(.5);
            this.testW.scale.setTo(.5);
            this.testW.tint = 16711680
        }
        this.timerSfxHitBall = 0;
        this.DISTANCE_FOR_AIM = 40;
        this.isShooted = false;
        this.isLevelCompleted = false;
        this.isFinishShown = false;
        this.isLevelWin = false;
        this.stepAttack = 0;
        this.countMissed = 0;
        this.turnNum = 1;
        this.gameStatus = 0;
        this.arDodiki = [];
        this.typeGun = 0;
        this.lastTypeGun = 0;
        this.isTimeAim = false;
        this.isInputPress = false;
        this.isHitWater = 0;
        this.worldManifold = new box2d.b2WorldManifold;
        this.launchVelocity = new Phaser.Point(0, 0);
        this.inputPointDown = new Phaser.Point(0, 0);
        this.dotPoint1 = new Phaser.Point(0, 0);
        this.dotPoint10 = new Phaser.Point(0, 0);
        this.cameraPoint = this.layerEffect.add(game.add.image(0, 0, "ss_main2", "ballG_0000"));
        this.cameraPoint.alpha = 0;
        this.waveCount = 0;
        this.isCanStartCheck = false;
        this.isOpponentMiss = true;
        this.isSimonTalked = false;
        this.dronesDestroyed = false;
        this.whaleKicked = false;
        this.isCropingTime = false;
        this.hpWhale = 300;
        this.isFinalDialog = true;
        this.miniSdvigX = 0;
        this.timeToStart = 0;
        this.stat_shots = 0;
        this.stat_enemy = 0;
        this.stat_time = 0;
        this.lastTargetPosP1 = 0;
        this.lastTargetPosP2 = 0;
        this.lastTargetPosC1 = 0;
        this.lastTargetPosC2 = 0;
        game.input.onDown.add(this.inputStageDown, this);
        game.input.onUp.add(this.inputStageUp, this);
        this.CATEGORY_BALL = 1;
        this.CATEGORY_DODIK = 2;
        this.CATEGORY_GROUND1 = 4;
        this.CATEGORY_GROUND2 = 8;
        this.CATEGORY_GROUND3 = 16;
        this.CATEGORY_HELICOPTER = 32;
        this.MASK_BALL = this.CATEGORY_DODIK | this.CATEGORY_GROUND1 | this.CATEGORY_GROUND2 | this.CATEGORY_GROUND3;
        this.MASK_DODIK1 = this.CATEGORY_BALL | this.CATEGORY_GROUND1 | this.CATEGORY_DODIK | this.CATEGORY_HELICOPTER;
        this.MASK_DODIK2 = this.CATEGORY_BALL | this.CATEGORY_GROUND2 | this.CATEGORY_DODIK | this.CATEGORY_HELICOPTER;
        this.MASK_DODIK3 = this.CATEGORY_BALL | this.CATEGORY_GROUND3 | this.CATEGORY_DODIK | this.CATEGORY_HELICOPTER;
        this.MASK_GROUND = this.CATEGORY_GROUND1 & this.CATEGORY_GROUND2 & this.CATEGORY_GROUND3;
        game.physics.startSystem(Phaser.Physics.BOX2D);
        game.physics.box2d.gravity.y = 550;
        this.ball = this.layerMain.add(game.add.sprite(0, -100, "ss_main1", "ball1_0000"));
        this.ball1 = this.layerMain.add(game.add.sprite(0, -100, "ss_main1", "ball1_0000"));
        this.ball2 = this.layerMain.add(game.add.sprite(0, -100, "ss_main1", "ball1_0000"));
        this.ball3 = this.layerMain.add(game.add.sprite(0, -100, "ss_main1", "ball1_0000"));
        this.initBall(this.ball, 15);
        this.initBall(this.ball1, 11);
        this.initBall(this.ball2, 11);
        this.initBall(this.ball3, 11);
        this.layerAiming = this.layerWater.add(game.add.group());
        this.aimCircle = this.layerAiming.add(game.add.sprite(0, -100, "ss_main2", "aimCircle_0000"));
        this.aimCircle.anchor.setTo(.5);
        this.aimCircle.visible = false;
        game.add.tween(this.aimCircle).to({
            angle: -180
        }, 1e3, "Linear", true, 0, -1, false);
        this.level_width = 2800;
        this.waveAr = [];
        var bodyBox;
        var boatPosX = 170 - 120;
        var boatPosY = 465 - 46;
        var hero1PosX = 240;
        var hero1PosY = 462;
        var hero2PosX = 100;
        var hero2PosY = 462;
        var hero3PosX = 0;
        var hero3PosY = 0;
        switch (MainGame.typeBoat) {
            case 1:
                this.addBodyShape(1, [231, 75, 223, 45, 240, 27], boatPosX, boatPosY);
                this.addBodyShape(1, [16, 45, 6, 75, 2, 27], boatPosX, boatPosY);
                this.addBodyShape(1, [231, 75, 6, 75, 16, 45, 223, 45], boatPosX, boatPosY);
                break;
            case 2:
                boatPosX = 50;
                boatPosY = 438;
                this.addBodyShape(1, [25, 20, 6, 50, 2, 2], boatPosX, boatPosY + 5);
                this.addBodyShape(1, [310, 50, 303, 20, 320, 2], boatPosX, boatPosY + 5);
                this.addBodyShape(1, [310, 50, 6, 50, 25, 20, 303, 20], boatPosX, boatPosY + 5);
                hero1PosX = 315;
                hero1PosY = 462;
                hero2PosX = 190;
                hero2PosY = 462;
                hero3PosX = 95;
                hero3PosY = 462;
                break;
            case 3:
                boatPosX = 40;
                boatPosY = 375;
                this.addBodyShape(1, [169, 8, 253, 84, 13, 114, 13, 8], boatPosX, boatPosY);
                this.addBodyShape(1, [485, 114, 478, 84, 495, 66], boatPosX, boatPosY);
                this.addBodyShape(1, [485, 114, 13, 114, 253, 84, 478, 84], boatPosX, boatPosY);
                hero1PosX = 480;
                hero1PosY = 458;
                hero2PosX = 340;
                hero2PosY = 458;
                hero3PosX = 110;
                hero3PosY = 382;
                break;
            case 4:
                boatPosX = 40;
                boatPosY = 248;
                this.addBodyShape(1, [485, 241, 478, 211, 495, 193], boatPosX, boatPosY);
                this.addBodyShape(1, [253, 211, 13, 241, 34, 135, 169, 135], boatPosX, boatPosY);
                this.addBodyShape(1, [34, 135, 13, 241, 15, 75, 35, 77], boatPosX, boatPosY);
                this.addBodyShape(1, [485, 241, 13, 241, 253, 211, 478, 211], boatPosX, boatPosY);
                hero1PosX = 480;
                hero1PosY = 458;
                hero2PosX = 340;
                hero2PosY = 458;
                hero3PosX = 160;
                hero3PosY = 382;
                break
        }
        var isPoolTiles = false;
        switch (MainGame.levelNum) {
            case 0:
                this.posCameraEnemy = 1500;
                isPoolTiles = true;
                this.layerBack1.add(game.add.image(650, 210, "ss_main1", "umbrella_0000"));
                this.layerBack1.add(game.add.image(860, 335, "ss_main1", "chair_0000"));
                this.layerBack1.add(game.add.image(960 + 10, 335, "ss_main1", "chair_0000"));
                var base = this.layerBack1.add(game.add.image(1500, 305, "ss_main1", "base1_0000"));
                this.addBodyShape(2, [180, 4, 180, 124, 14, 124, 14, 4], base.x, base.y);
                this.banka = this.addBanka(1590, 267);
                this.level_width = 1900;
                break;
            case 1:
                this.posCameraEnemy = 1850;
                this.miniSdvigX = 70;
                isPoolTiles = true;
                var umbrella = this.layerBack1.add(game.add.image(650, 210, "ss_main1", "umbrella_0000"));
                umbrella.angle = 15;
                var base = this.layerMain.add(game.add.image(2e3 - 100, 295, "ss_main1", "base2_0000"));
                this.addBodyShape(2, [409, 233, 244, 72, 245, 31, 410, 31], base.x, base.y);
                this.addBodyShape(2, [167, 111, 409, 233, 11, 235, 10, 111], base.x, base.y);
                this.addBodyShape(2, [244, 72, 409, 233, 167, 111, 168, 72], base.x, base.y);
                this.viking1 = this.addDodik(2, "s4", 1650 - 50 - 100, 467, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 10);
                this.viking2 = this.addDodik(2, "s1", 2080 - 100, 405, this.CATEGORY_DODIK, this.MASK_DODIK2, false, 10);
                var barrel = this.layerMain.add(game.add.image(1650 - 180 - 100, 450 + 20 - 76, "ss_main1", "boat13_0000"));
                this.addBodyShape(1, [302, 108, 270, 74, 297, 58, 320, 76], barrel.x, barrel.y);
                this.addBodyShape(1, [56, 74, 30, 108, 7, 65, 29, 47], barrel.x, barrel.y);
                this.addBodyShape(1, [30, 108, 56, 74, 270, 74, 302, 108], barrel.x, barrel.y);
                barrel.startY = barrel.y;
                this.waveAr.push(barrel);
                this.level_width = 2400;
                break;
            case 2:
                this.posCameraEnemy = 2200;
                this.miniSdvigX = 70;
                isPoolTiles = true;
                this.layerBack1.add(game.add.image(650, 210, "ss_main1", "umbrella_0000"));
                this.layerBack1.add(game.add.image(860, 335, "ss_main1", "chair_0000"));
                this.layerBack1.add(game.add.image(960 + 10, 335, "ss_main1", "chair_0000"));
                var base3 = this.layerBack1.add(game.add.image(1645, 130, "ss_main1", "base3_0000"));
                this.addBodyShape(1, [4, 57, 435, 57, 435, 72, 4, 74], base3.x, base3.y + 5);
                this.test = base3;
                var base = this.layerMain.add(game.add.image(2e3 - 100, 295, "ss_main1", "base2_0000"));
                this.addBodyShape(2, [409, 233, 244, 72, 245, 31, 410, 31], base.x, base.y);
                this.addBodyShape(2, [167, 111, 409, 233, 11, 235, 10, 111], base.x, base.y);
                this.addBodyShape(2, [244, 72, 409, 233, 167, 111, 168, 72], base.x, base.y);
                this.viking1 = this.addDodik(2, "f3", 1600, 469, this.CATEGORY_DODIK, this.MASK_DODIK3, true, 10);
                this.viking2 = this.addDodik(2, "f1", 1820, 191, this.CATEGORY_DODIK, this.MASK_DODIK1, false, 10);
                this.viking3 = this.addDodik(2, "f2", 2080 - 100, 405, this.CATEGORY_DODIK, this.MASK_DODIK2, false, 10);
                var barrel = this.layerMain.add(game.add.image(1550, 450, "ss_main1", "boat16_0000"));
                this.addBodyShape(3, [85, 10, 85, 40, 10, 40, 10, 10], barrel.x, barrel.y + 15);
                barrel.startY = barrel.y;
                this.waveAr.push(barrel);
                this.level_width = 2400;
                break;
            case 3:
                this.posCameraEnemy = 2400;
                var bridge = this.layerBack1.add(game.add.image(1790, 410, "ss_main1", "bridge3_0000"));
                var umbrella = this.layerBack1.add(game.add.image(2060, 210, "ss_main1", "umbrella_0000"));
                this.layerBack1.add(game.add.image(1960, 340, "ss_main1", "beach1_0000"));
                var base = this.layerBack1.add(game.add.image(2370, 50, "ss_main1", "base4_0000"));
                this.addBodyShape(2, [16, 69, 124, 7, 239, 33], umbrella.x, umbrella.y);
                this.addBodyShape(2, [430 + 180, 6, 430 + 180, 36, 15, 36, 15, 6], bridge.x, bridge.y);
                this.addBodyShape(2, [160, 199, 175, 231, 33, 384, 0, 380], base.x, base.y);
                this.addBodyShape(2, [320, 198, 349, 231, 175, 231, 160, 199], base.x, base.y);
                this.addBodyShape(2, [320, 198, 328, 68, 362, 58, 349, 231], base.x, base.y);
                this.addBodyShape(2, [87, 3, 362, 58, 328, 68, 86, 22], base.x, base.y);
                this.viking1 = this.addDodik(2, "l1", 1900, 415, this.CATEGORY_DODIK, this.MASK_DODIK2, false, 10);
                this.viking2 = this.addDodik(2, "f7", 2620, 247, this.CATEGORY_DODIK, this.MASK_DODIK2, false, 10);
                break;
            case 4:
                this.posCameraEnemy = 2200;
                this.miniSdvigX = 50;
                var sdvigX = 200;
                this.viking1 = this.addDodik(2, "f5", 1580 + sdvigX, 438, this.CATEGORY_DODIK, this.MASK_DODIK1, false, 10);
                this.viking2 = this.addDodik(2, "f6", 1860 + sdvigX, 457, this.CATEGORY_DODIK, this.MASK_DODIK2, false, 10);
                this.viking3 = this.addDodik(2, "f4", 2170 + sdvigX, 320, this.CATEGORY_DODIK, this.MASK_DODIK2, false, 10);
                var base = this.layerMain.add(game.add.image(1770 + sdvigX, 250, "ss_main1", "aquapark4_0000"));
                this.addBodyShape(2, [666, 278, 306, 123, 353, 71, 571, 71], base.x, base.y);
                this.addBodyShape(2, [56, 208, 20, 278, 19, 192], base.x, base.y);
                this.addBodyShape(2, [119, 209, 20, 278, 56, 208], base.x, base.y);
                this.addBodyShape(2, [187, 195, 666, 278, 20, 278, 119, 209], base.x, base.y);
                this.addBodyShape(2, [666, 278, 251, 163, 306, 123], base.x, base.y);
                this.addBodyShape(2, [666, 278, 187, 195, 251, 163], base.x, base.y);
                var base4 = this.layerMain.add(game.add.image(1500 + sdvigX, 420, "ss_main1", "aquapark3_0000"));
                this.addBodyShape(1, [13, 102, 12, 19, 127, 19, 128, 104], base4.x, base4.y);
                this.test = base4;
                break;
            case 5:
                var sdvigX = 250;
                this.level_width = 2800 + sdvigX;
                this.posCameraEnemy = 2300 + sdvigX;
                this.miniSdvigX = 10;
                var positionHelicopterX = 1100 + sdvigX;
                var positionHelicopterY = 50;
                var umbrella = this.layerBack1.add(game.add.image(2550 + sdvigX, 195, "ss_main1", "umbrella_0000"));
                var stone = this.layerEffect.add(game.add.image(2600 + sdvigX, 487 - 15, "ss_main1", "bridge3_0000"));
                stone.anchor.setTo(.5);
                var bodyBox = this.addRectangle(2640 + sdvigX, 450 - 15, 480, 30);
                bodyBox.setCollisionCategory(this.CATEGORY_GROUND3);
                var bodyBox = this.addRectangle(2900 + sdvigX, 390 - 15, 30, 150);
                bodyBox.setCollisionCategory(this.CATEGORY_GROUND3);
                var positionBoatX = 1900 + sdvigX;
                var barrel = this.layerMain.add(game.add.image(positionBoatX, 450 + 20 - 76, "ss_main1", "boat13_0000"));
                this.addBodyShape(1, [302, 108, 270, 74, 297, 58, 320, 76], barrel.x, barrel.y);
                this.addBodyShape(1, [56, 74, 30, 108, 7, 65, 29, 47], barrel.x, barrel.y);
                this.addBodyShape(1, [30, 108, 56, 74, 270, 74, 302, 108], barrel.x, barrel.y);
                barrel.startY = barrel.y;
                this.waveAr.push(barrel);
                var helicopterGroup = this.layerBack1.add(game.add.group());
                helicopterGroup.x = positionHelicopterX;
                helicopterGroup.y = positionHelicopterY;
                var pilot1 = helicopterGroup.add(game.add.sprite(54, 70, "ss_main1"));
                pilot1.animations.add("anim", Phaser.Animation.generateFrameNames("pilot1_", 0, 12, "", 4), 30);
                pilot1.animations.play("anim", 30, true);
                var helicopter = helicopterGroup.add(game.add.image(0, 0, "ss_main1", "helicopter_0000"));
                var helicopter_propeller1 = helicopterGroup.add(game.add.sprite(-125, 12, "ss_main1"));
                helicopter_propeller1.animations.add("anim", Phaser.Animation.generateFrameNames("helicopter_propeller1_", 0, 4, "", 4), 30);
                helicopter_propeller1.animations.play("anim", 30, true);
                var helicopter_propeller2 = helicopterGroup.add(game.add.sprite(489, 35, "ss_main1"));
                helicopter_propeller2.animations.add("anim", Phaser.Animation.generateFrameNames("helicopter_propeller2_", 0, 3, "", 4), 30);
                helicopter_propeller2.animations.play("anim", 30, true);
                this.addBodyShape(4, [117, 192, 136, 31, 168, 51, 146, 189], helicopterGroup.x, helicopterGroup.y);
                this.addBodyShape(4, [272, 196, 292, 220, 114, 222, 116, 197], helicopterGroup.x, helicopterGroup.y);
                this.addBodyShape(4, [306, 28, 277, 51, 168, 51, 136, 31], helicopterGroup.x, helicopterGroup.y);
                this.addBodyShape(4, [306, 28, 292, 220, 272, 196, 277, 51], helicopterGroup.x, helicopterGroup.y);
                helicopterGroup.startY = helicopterGroup.y;
                this.waveAr.push(helicopterGroup);
                this.helicopterGroup = helicopterGroup;
                this.viking1 = this.addDodik(2, "s4", positionHelicopterX + 220, positionHelicopterY + 200, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 10);
                this.viking2 = this.addDodik(2, "s1", 2060 - 55 + sdvigX, 467, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 10);
                this.viking3 = this.addDodik(2, "s2", 2060 + 55 + sdvigX, 467, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 10);
                this.viking4 = this.addDodik(2, "s3", 2460 + 100 + sdvigX, 434, this.CATEGORY_DODIK, this.MASK_DODIK3, false, 10);
                this.viking4.isUpStriker = true;
                break;
            case 6:
                var sdvigX = 150;
                this.level_width = 2800 + sdvigX;
                this.posCameraEnemy = 2300 + sdvigX;
                this.layerBack1.add(game.add.image(1960 + sdvigX, 340, "ss_main1", "beach1_0000"));
                excavator = this.layerBack1.add(game.add.image(2030 + sdvigX, -35, "ss_main1", "excavator_0000"));
                var kovsh = new Phaser.Point(2030 + sdvigX, 150);
                this.addBodyShape(4, [248, -79, 166, 56, 158, 26, 223, -87], kovsh.x, kovsh.y);
                this.addBodyShape(4, [158, 26, 166, 56, 13, 95, 63, 9, 127, 9], kovsh.x, kovsh.y);
                this.addBodyShape(4, [13, 95, 52, 1, 63, 9], kovsh.x, kovsh.y);
                this.addBodyShape(1, [579, 343, 609, 539, 379, 423, 426, 343], excavator.x, excavator.y);
                this.addBodyShape(1, [276, 471, 609, 539, 3, 540, 100, 471], excavator.x, excavator.y);
                this.addBodyShape(1, [379, 423, 609, 539, 276, 471], excavator.x, excavator.y);
                this.addBodyShape(1, [210, 138, 314, 15, 314, 48, 230, 155], excavator.x, excavator.y);
                this.addBodyShape(1, [579, 343, 567, 211, 608, 206, 609, 539], excavator.x, excavator.y);
                this.addBodyShape(1, [314, 15, 608, 206, 567, 211, 314, 48], excavator.x, excavator.y);
                this.viking1 = this.addDodik(2, "e3", kovsh.x + 100, 158, this.CATEGORY_DODIK, this.MASK_DODIK2, false, 10);
                this.viking2 = this.addDodik(2, "e1", 2230 + sdvigX, 435, this.CATEGORY_DODIK, this.MASK_DODIK1, false, 10);
                this.viking3 = this.addDodik(2, "e2", 2520 + sdvigX, 307, this.CATEGORY_DODIK, this.MASK_DODIK1, false, 10);
                break;
            case 7:
                var sdvigX = 200;
                this.level_width = 2800 + 600 + sdvigX;
                this.posCameraEnemy = 2300 + 600 + sdvigX;
                var positionBoat1X = 970 + 600 + sdvigX;
                var positionBoat2X = 1430 + 600 + sdvigX;
                var positionBoat3X = 1760 + 600 + sdvigX;
                var lodka1 = this.layerMain.add(game.add.image(positionBoat1X, 360, "ss_main1", "boat12_1_0000"));
                var lodka3 = this.layerBack.add(game.add.image(positionBoat3X, 400, "ss_main1", "boat12_3_0000"));
                var lodka2 = this.layerMain.add(game.add.image(positionBoat2X, 450, "ss_main1", "boat12_2_0000"));
                this.test = lodka2;
                this.addBodyShape(1, [157, 47, 228, 81, 164, 136, 43, 67], lodka1.x, lodka1.y - 5);
                this.addBodyShape(1, [400, 136, 389, 81, 448, 62], lodka1.x, lodka1.y - 5);
                this.addBodyShape(1, [228, 81, 157, 47, 190, 18], lodka1.x, lodka1.y - 5);
                this.addBodyShape(1, [400, 136, 164, 136, 228, 81, 389, 81], lodka1.x, lodka1.y - 5);
                this.addBodyShape(2, [832, 83, 91, 83, 78, 46, 834, 46, 877, 69], lodka3.x, lodka3.y - 5);
                this.addBodyShape(2, [78, 46, 91, 83, 21, 37, 31, 18], lodka3.x, lodka3.y - 5);
                lodka1.startY = lodka1.y;
                this.waveAr.push(lodka1);
                lodka2.startY = lodka2.y;
                this.waveAr.push(lodka2);
                lodka3.startY = lodka3.y;
                this.waveAr.push(lodka3);
                this.viking1 = this.addDodik(2, "f8", lodka1.x + 325, 435, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 10);
                var delta = 94;
                var offsetX = 120;
                this.viking2 = this.addDodik(2, "fkid1", lodka3.x + offsetX + delta * 0, 440, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 20);
                this.viking3 = this.addDodik(2, "fkid2", lodka3.x + offsetX + delta * 1, 440, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 20);
                this.viking4 = this.addDodik(2, "fkid3", lodka3.x + offsetX + delta * 2, 440, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 20);
                this.viking5 = this.addDodik(2, "fkid4", lodka3.x + offsetX + delta * 3, 440, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 20);
                this.viking6 = this.addDodik(2, "fkid5", lodka3.x + offsetX + delta * 4, 440, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 20);
                this.viking7 = this.addDodik(2, "fkid6", lodka3.x + offsetX + delta * 5, 440, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 20);
                this.viking8 = this.addDodik(2, "fkid7", lodka3.x + offsetX + delta * 6, 440, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 20);
                this.viking9 = this.addDodik(2, "fkid8", lodka3.x + offsetX + delta * 7, 440, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 20);
                this.viking1.isUpStriker = true;
                this.viking2.isUpStriker = true;
                this.viking3.isUpStriker = true;
                this.viking4.isUpStriker = true;
                this.viking5.isUpStriker = true;
                this.viking6.isUpStriker = true;
                this.viking7.isUpStriker = true;
                this.viking8.isUpStriker = true;
                this.viking9.isUpStriker = true;
                break;
            case 8:
                this.level_width = 2800 + 600;
                this.posCameraEnemy = 2300 + 600;
                var positionBoatX = 1960 + 600;
                var barrel = this.layerMain.add(game.add.image(positionBoatX, 40, "ss_main1", "kship_0000"));
                this.addBodyShape(1, [108, 295, 89, 267, 93, 258, 120, 266], barrel.x, barrel.y);
                this.addBodyShape(1, [18, 255, 89, 267, 48, 277, 15, 269], barrel.x, barrel.y);
                this.addBodyShape(1, [465, 229, 464, 419, 410, 345, 422, 229], barrel.x, barrel.y);
                this.addBodyShape(1, [464, 419, 124, 420, 242, 345, 410, 345], barrel.x, barrel.y);
                this.addBodyShape(1, [89, 267, 108, 295, 123, 335, 124, 420, 48, 277], barrel.x, barrel.y);
                this.addBodyShape(1, [124, 420, 123, 335, 210, 335, 242, 345], barrel.x, barrel.y);
                this.addBodyShape(2, [422, 229, 511, 229, 555, 418, 406, 419], barrel.x, barrel.y);
                this.addBodyShape(2, [560, 150, 555, 418, 511, 229, 527, 149], barrel.x, barrel.y);
                this.addBodyShape(3, [511, 229, 527, 149, 610, 149, 671, 319, 698, 420, 506, 420], barrel.x, barrel.y);
                this.addBodyShape(3, [698, 420, 671, 319, 729, 320], barrel.x, barrel.y);
                this.addBodyShape(3, [644, 131, 671, 319, 610, 149, 618, 131], barrel.x, barrel.y);
                this.addBodyShape(3, [659, 47, 671, 319, 644, 131, 644, 47], barrel.x, barrel.y);
                barrel.startY = barrel.y;
                this.waveAr.push(barrel);
                this.viking1 = this.addDodik(2, "k3", barrel.x + 250, 385, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 10);
                this.viking2 = this.addDodik(2, "k1", barrel.x + 355, 385, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 10);
                this.viking3 = this.addDodik(2, "k4", barrel.x + 460, 269, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 10);
                this.viking4 = this.addDodik(2, "k2", barrel.x + 560, 189, this.CATEGORY_DODIK, this.MASK_DODIK3, true, 10);
                this.viking1.isUpStriker = true;
                this.viking2.isUpStriker = true;
                break;
            case 9:
                var sdvigX = 200;
                this.posCameraEnemy = 2400 + sdvigX;
                this.miniSdvigX = 0;
                var umbrella = this.layerBack1.add(game.add.image(2310 + sdvigX, 130, "ss_main1", "umbrella_0000"));
                this.addBodyShape(2, [16, 69, 124, 7, 239, 33], umbrella.x, umbrella.y);
                var beach = this.layerBack1.add(game.add.image(1960 + sdvigX, 340, "ss_main1", "beach1_0000"));
                var offsetX = 7;
                var offsetY = 20;
                this.addBodyShape(1, [441, 40, 338, 63, 369, 16, 412, 7], beach.x - offsetX, beach.y - offsetY);
                this.addBodyShape(1, [338, 63, 441, 40, 501, 96, 291, 106, 308, 71], beach.x - offsetX, beach.y - offsetY);
                this.addBodyShape(1, [214, 116, 291, 106, 501, 96, 640, 96, 900, 196, 84, 196, 134, 134], beach.x - offsetX, beach.y - offsetY);
                this.addBodyShape(1, [501, 96, 441, 40, 466, 43], beach.x - offsetX, beach.y - offsetY);
                this.addBodyShape(1, [900, -126, 900, 196, 855, 54, 874, -126], beach.x - offsetX, beach.y - offsetY);
                this.addBodyShape(1, [900, 196, 640, 96, 762, 56, 855, 54], beach.x - offsetX, beach.y - offsetY);
                var sandbag = this.layerBack1.add(game.add.image(2235 + sdvigX, 320, "ss_main1", "sandbag_0000"));
                this.drone1 = this.addDodik(2, "drone", 1600 + sdvigX, 200 + 20, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 75);
                this.drone2 = this.addDodik(2, "drone", 1900 + sdvigX, 260 + 20, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 75);
                this.viking1 = this.addDodik(2, "s4", 2520 + sdvigX, 415, this.CATEGORY_DODIK, this.MASK_DODIK1, false, 10);
                this.viking1.isUpStriker = true;
                this.drone1.isUpStriker = true;
                this.drone2.isUpStriker = true;
                break;
            case 10:
                this.level_width = 2800 + 400;
                this.posCameraEnemy = 2400 + 400;
                this.miniSdvigX = 20;
                var positionBaseX = 2250 + 400;
                var base = this.layerMain.add(game.add.image(positionBaseX, 250, "ss_main1", "aquapark5_0000"));
                this.addBodyShape(2, [37, 229, 74, 197, 196, 197, 201, 218, 37, 304], base.x, base.y);
                this.addBodyShape(2, [74, 197, 37, 229, 13, 217], base.x, base.y);
                this.addBodyShape(2, [598, -8, 638, 77, 604, 54, 581, 3], base.x, base.y);
                this.addBodyShape(2, [433, 171, 424, 140, 604, 54, 638, 77], base.x, base.y);
                this.addBodyShape(2, [240, 173, 424, 140, 433, 171, 201, 218, 196, 197], base.x, base.y);
                var positionBoatX = 1500 + 400;
                var barrel = this.layerMain.add(game.add.image(positionBoatX, 407, "ss_main1", "boat15_0000"));
                this.addBodyShape(1, [404, 57, 385, 75, 385, 53, 408, 35], barrel.x, barrel.y + 5);
                this.addBodyShape(1, [35, 53, 35, 75, 11, 55, 8, 33], barrel.x, barrel.y + 5);
                this.addBodyShape(1, [385, 53, 385, 75, 35, 75, 35, 53], barrel.x, barrel.y + 5);
                barrel.startY = barrel.y;
                this.waveAr.push(barrel);
                this.test = base;
                this.drone1 = this.addDodik(2, "drone", 1700, 240, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 75);
                this.viking1 = this.addDodik(2, "f10", positionBoatX + 150, 464, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 10);
                this.viking2 = this.addDodik(2, "f9", positionBoatX + 280, 464, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 10);
                this.viking3 = this.addDodik(2, "f11", 2370 + 400, 446, this.CATEGORY_DODIK, this.MASK_DODIK2, false, 10);
                this.viking3.isUpStriker = true;
                break;
            case 11:
                this.level_width = 2800 + 1250;
                this.posCameraEnemy = 2400 + 1250;
                var positionBaseX = this.level_width - 1500;
                var base = this.layerMain.add(game.add.image(positionBaseX, 265, "ss_main1", "stoneland_3_0000"));
                this.addBodyShape(1, [419, 77, 691, 137, 774, 191, 840, 270, 373, 117, 383, 88], base.x, base.y);
                this.addBodyShape(1, [520, 40, 691, 137, 419, 77, 436, 40], base.x, base.y);
                this.addBodyShape(1, [691, 137, 520, 40, 577, 30], base.x, base.y);
                this.addBodyShape(1, [373, 117, 840, 270, 270, 269, 293, 166, 337, 123], base.x, base.y);
                this.addBodyShape(1, [14, 166, 293, 166, 186, 196, 14, 196], base.x, base.y);
                this.addBodyShape(1, [293, 166, 270, 269, 186, 196], base.x, base.y);
                var barrel = this.layerMain.add(game.add.image(base.x + 25, 420, "ss_main1", "turtleboat_0000"));
                barrel.startY = barrel.y;
                this.waveAr.push(barrel);
                var positionBoatX = this.level_width - 450;
                var barrel = this.layerMain.add(game.add.image(positionBoatX, 255, "ss_main1", "boat14_0000"));
                this.addBodyShape(2, [70, 174, 88, 190, 86, 240, 20, 169], barrel.x, barrel.y);
                this.addBodyShape(2, [383, 148, 357, 240, 333, 190, 365, 148], barrel.x, barrel.y);
                this.addBodyShape(2, [86, 240, 88, 190, 333, 190, 357, 240], barrel.x, barrel.y);
                this.addBodyShape(2, [90, 16, 92, 4, 362, 35], barrel.x, barrel.y);
                barrel.startY = barrel.y;
                this.waveAr.push(barrel);
                this.viking1 = this.addDodik(2, "t4", base.x + 170, 430, this.CATEGORY_DODIK, this.MASK_DODIK1, false, 0);
                this.viking2 = this.addDodik(2, "t2", base.x + 490, 304, this.CATEGORY_DODIK, this.MASK_DODIK1, false, 0);
                this.viking3 = this.addDodik(2, "t3", barrel.x + 130, 444, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 0);
                this.viking4 = this.addDodik(2, "t1", barrel.x + 255, 444, this.CATEGORY_DODIK, this.MASK_DODIK2, true, 0);
                this.viking1.isUpStriker = true;
                this.viking2.isUpStriker = true;
                this.viking3.isUpStriker = true;
                this.viking4.isUpStriker = true;
                break;
            case 12:
                this.level_width = 2800 + 2200;
                this.posCameraEnemy = 2400 + 2200;
                this.miniSdvigX = 45;
                var posX = this.level_width - 1640;
                this.layerBack1.add(game.add.image(posX, 340, "ss_main1", "beach1_0000"));
                var beach2 = this.layerBack1.add(game.add.image(posX + 845, 302, "ss_main1", "beach2_0000"));
                var whale_shadow = this.layerBack1.add(game.add.image(3610, 412, "ss_main1", "whale_shadow_0000"));
                var house = this.layerBack1.add(game.add.image(4310, 20, "ss_main1", "hamburgers_building_0000"));
                var umbrella = this.layerBack1.add(game.add.image(4790, 225, "ss_main1", "umbrella_0000"));
                var camcoder = this.layerBack1.add(game.add.image(4790, 350, "ss_main1", "camcoder_0000"));
                camcoder.scale.x = -1;
                this.addBodyShape(2, [377, 168, 500, 372, 58, 202, 57, 152, 212, 16], house.x, house.y);
                this.addBodyShape(2, [555, 101, 500, 132, 490, 129, 456, 47, 512, 35, 552, 55], house.x, house.y);
                this.addBodyShape(2, [456, 47, 490, 129, 452, 118, 433, 85], house.x, house.y);
                this.addBodyShape(2, [18, 226, 58, 202, 500, 372, 18, 372], house.x, house.y);
                this.addBodyShape(2, [500, 132, 500, 372, 490, 168, 490, 129], house.x, house.y);
                this.addBodyShape(2, [490, 168, 500, 372, 377, 168], house.x, house.y);
                var dodikTV1 = this.addDecorDodik("tv1", 4600, 445, "talk2");
                var dodikTV2 = this.addDecorDodik("tv2", 4840, 445, "idle");
                dodikTV2.scale.x = -1;
                this.drone1 = this.addDodik(2, "drone", 1800 + 0, 210, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 75);
                this.drone2 = this.addDodik(2, "drone", 1800 + 310, 310, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 75);
                this.drone3 = this.addDodik(2, "drone", 1800 + 800, 230, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 75);
                this.drone1.isUpStriker = true;
                this.drone2.isUpStriker = true;
                this.drone3.isUpStriker = true;
                this.whale_miniicon = this.addMiniIcon(4200, 2);
                this.whale_hpbar = this.addHpBar(3770, 225, 0, 2);
                break
        }
        if (isPoolTiles) {
            var tile;
            for (var i = 0; i < 40; i++) {
                tile = this.layerBack1.add(game.add.sprite(-450 + 90 * i, 430, "ss_main1", "pool_tile2_0000"))
            }
        }
        if (MainGame.isWater) {
            var countWaving = 15;
            var countWater = 6;
            if (MainGame.levelNum == 12) {
                countWaving = 18;
                countWater = 7
            }
            var wave;
            for (var i = 0; i < countWaving; i++) {
                wave = this.layerEffect.add(game.add.sprite(-400 + 300 * i, 455, "ss_main2"));
                wave.animations.add("waving", Phaser.Animation.generateFrameNames("wave2_", 0, 69, "", 4), 30);
                wave.animations.play("waving", 30, true);
                wave.scale.setTo(1.001, 1)
            }
            var w;
            for (var i = 0; i < countWater; i++) {
                w = this.layerWater.add(game.add.image(-400 + 800 * i, 600 + 1, "ss_main2", "water1_0000"));
                w.anchor.setTo(0, 1);
                w.scale.setTo(1.01, 1)
            }
        }
        this.layerArrowOld = {};
        this.layerArrow = {};
        this.layerAimPointsNew = this.layerWater.add(game.add.group());
        this.layerAimPointsOld = this.layerWater.add(game.add.group());
        this.layerInfoPower = this.layerAimPointsNew.add(game.add.group());
        this.powerIcon = this.layerInfoPower.add(game.add.sprite(32, -5 - 30, "ss_main2", "icon_power_0000"));
        this.powerIcon.anchor.setTo(.5);
        this.textPowerAiming1 = MainGame.addText(800, -10, 0 - 30, "100%", this.layerInfoPower, 29, 9395827, 1, .5);
        this.textPowerAiming2 = MainGame.addText(800, -10, -4 - 30, "100%", this.layerInfoPower, 29, 16776958, 1, .5);
        this.layerInfoPower.y = -1e3;
        MainGame.showPath = true;
        if (MainGame.showPath) {
            this.arBallPath = [];
            this.arBallPathLast = [];
            var tBall;
            for (var i = 0; i < 10; i++) {
                tBall = this.layerAimPointsNew.add(game.add.image(-100, -100, "ss_main2", "ballG_0000"));
                tBall.anchor.setTo(.5);
                tBall.alpha = 1;
                tBall.num = i * 1.4;
                this.arBallPath.push(tBall)
            }
            for (var i = 0; i < 10; i++) {
                tBall = this.layerAimPointsOld.add(game.add.image(-100, -100, "ss_main2", "ballG_0000"));
                tBall.anchor.setTo(.5);
                tBall.alpha = .5;
                tBall.num = i * 1.4;
                this.arBallPathLast.push(tBall)
            }
        }
        this.numStriker = 0;
        this.hero1 = this.addDodik(1, "sman", hero1PosX, hero1PosY, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 0);
        this.hero2 = this.addDodik(1, "simon", hero2PosX, hero2PosY, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 20);
        this.hero1.id = 1;
        this.hero2.id = 2;
        if (MainGame.typeBoat == 2) {
            this.dog = this.addDodik(1, "bear", hero3PosX, hero3PosY, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 35)
        } else if (MainGame.typeBoat == 3) {
            this.dog = this.addDodik(1, "greybeard", hero3PosX, hero3PosY, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 35)
        } else if (MainGame.typeBoat == 4) {
            this.hero3 = this.addDodik(1, "dkid", hero3PosX, hero3PosY, this.CATEGORY_DODIK, this.MASK_DODIK1, true, 20);
            this.hero3.id = 3
        }
        game.camera.bounds.width = this.level_width + MainGame.deltaX;
        this.layerHpBars.visible = false;
        this.layerPanelTurn.visible = false;
        this.layerWeapon.visible = false;
        var barrel = this.layerMain.add(game.add.image(boatPosX, boatPosY, "ss_main1", "boat" + MainGame.typeBoat + "_rw2_0000"));
        barrel.startY = barrel.y;
        this.waveAr.push(barrel);
        if (MainGame.typeBoat == 4) {
            var flag = this.layerMain.add(game.add.sprite(12, 250, "ss_main1"));
            flag.animations.add("flag", Phaser.Animation.generateFrameNames("flag_", 0, 20, "", 4), 30);
            flag.animations.play("flag", 30, true);
            flag.startY = flag.y;
            this.waveAr.push(flag)
        }
        if (MainGame.levelNum >= 3 && MainGame.levelNum != 8 && MainGame.levelNum != 11) {
            var posX = 1100;
            this.stick = this.addStick(posX, 490);
            this.gull = this.addGull(posX, 490 - 100)
        }
        if (MainGame.levelNum == 8 || MainGame.levelNum == 11 || MainGame.levelNum == 12) {
            var posX = 1350;
            var posY = 250;
            if (MainGame.levelNum == 12) {
                posX = this.level_width - 1550;
                posY = 135
            }
            this.addWhale(posX, posY);
            this.bird = this.addBird(posX + 261, posY - 12)
        }
        if (MainGame.levelNum >= 3 && MainGame.levelNum <= 4) {
            this.addShark("shark", 0)
        } else if (MainGame.levelNum >= 5) {
            this.addShark("grampus", 10)
        }
        this.waveArCount = this.waveAr.length;
        game.time.events.add(1e3, this.levelEvent, this, true);
        this.updateCamera(0, this.posCameraEnemy);
        game.time.events.loop(8e3, this.updateSimon, this);
        game.time.events.loop(1e3, this.soundEnvironment, this);
        this.setStriker(this.hero1);
        this.timerLevel = game.time.events.loop(1e3, this.updateTimer, this);
        this.textGranat = MainGame.addText(800, wBtn2.x + 30, wBtn2.y + 34, String(MainGame.countGranat), this.layerWeapon, 23, 16777215, .5, .5);
        this.textRocket = MainGame.addText(800, wBtn3.x + 30, wBtn3.y + 34, String(MainGame.countRocket), this.layerWeapon, 23, 16777215, .5, .5);
        this.textBalls3 = MainGame.addText(800, wBtn4.x + 30, wBtn4.y + 34, String(MainGame.countBalls3), this.layerWeapon, 23, 16777215, .5, .5);
        MainGame.fadeOut();
        this.isPaused = false;
        this.layerPause = this.layerTopPause.add(game.add.group());
        this.layerPause.visible = this.isPaused;
        var spr_bg = this.layerPause.add(this.game.add.graphics(0, 0));
        spr_bg.beginFill(1656488, .45);
        spr_bg.drawRect(-this.game.width * .5, 0, this.game.width, this.game.height);
        spr_bg.endFill();
        this.spr_bg = spr_bg;
        var posXbb = this.game.width * .5;
        var musicButton = this.layerPause.add(game.add.image(0, 60, "ss_menu", "btn_music_0000"));
        musicButton.anchor.setTo(.5, .5);
        if (MainGame.isMusicMuted) musicButton.frameName = "btn_music_0001";
        this.pauseBtnMusic = musicButton;
        var sfxButton = this.layerPause.add(game.add.image(0, 60, "ss_menu", "btn_sound_0000"));
        sfxButton.anchor.setTo(.5, .5);
        if (MainGame.isSfxMuted) sfxButton.frameName = "btn_sound_0001";
        this.pauseBtnSfx = sfxButton;
        var pButton = this.layerPause.add(game.add.image(0, 60, "ss_main2", "btn_pause_0000"));
        pButton.anchor.setTo(.5, .5);
        this.pauseBtnPause = pButton;
        var hButton = this.layerPause.add(game.add.image(0, 60, "ss_menu", "btn_home_0000"));
        hButton.anchor.setTo(.5, .5);
        this.pauseBtnHome = hButton;
        var midX = Math.floor(game.width * .5);
        var rButton = this.layerPause.add(game.add.image(0, 400, "ss_menu", "btn_replay_0000"));
        rButton.anchor.setTo(.5, .5);
        this.pauseBtnReplay = rButton;
        this.btnResume = new SimpleButton(game, this, this.layerPause, 0, 250, "ss_menu", "btn_play_0000", this.clickForResumePause);
        game.input.onUp.add(this.clickForResumePause, this);
        this.updateResize();
        PhaserSpine.Spine.globalAutoUpdate = true;
        game.physics.box2d.paused = false;
        MainGame.playMusic(1);
        MainGame.playSound(27);
        this.initKeyboardEvents();
        if (MainGame.isAPI) MainGame.API_POKI.gameplayStart();
        MainGame.api_google("StartLevel", MainGame.levelNum + 1);
        if (MainGame.isAPI) MainGame.API_POKI.displayAd()
    },
    initKeyboardEvents: function() {
        this.keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keySpace.onDown.add(this.pressSpacebar, this)
    },
    pressSpacebar: function() {
        if (this.isLevelCompleted && this.isFinishShown) {
            if (this.isLevelWin) {
                this.clickLevelMenu()
            } else {
                this.clickShop()
            }
        }
    },
    clickForResumePause: function() {
        if (!this.isPaused) return;
        var clickPosX = game.input.x - game.width * .5;
        var clickPosY = game.input.y;
        var _isPause = clickPosX > this.btnResume.buttonC.x - 150 && clickPosX < this.btnResume.buttonC.x + 150 && clickPosY > this.btnResume.buttonC.y - 50 && clickPosY < this.btnResume.buttonC.y + 50;
        if (_isPause) {
            this.pauseGame();
            return
        }
        _isPause = clickPosX > this.pauseBtnPause.x - 40 && clickPosX < this.pauseBtnPause.x + 40 && clickPosY > this.pauseBtnPause.y - 40 && clickPosY < this.pauseBtnPause.y + 40;
        if (_isPause) {
            this.pauseGame();
            return
        }
        if (clickPosX > this.pauseBtnMusic.x - 40 && clickPosX < this.pauseBtnMusic.x + 40 && clickPosY > this.pauseBtnMusic.y - 40 && clickPosY < this.pauseBtnMusic.y + 40) {
            if (!MainGame.isMusicMuted) {
                MainGame.clickMuteMusic(this.pauseBtnMusic);
                if (!MainGame.isMusicMuted) MainGame.clickMuteMusic(this.pauseBtnMusic)
            } else {
                MainGame.clickMuteMusic(this.pauseBtnMusic)
            }
        } else if (clickPosX > this.pauseBtnSfx.x - 40 && clickPosX < this.pauseBtnSfx.x + 40 && clickPosY > this.pauseBtnSfx.y - 40 && clickPosY < this.pauseBtnSfx.y + 40) {
            if (!MainGame.isSfxMuted) {
                MainGame.clickMuteSFX(this.pauseBtnSfx);
                if (!MainGame.isSfxMuted) MainGame.clickMuteSFX(this.pauseBtnSfx)
            } else {
                MainGame.clickMuteSFX(this.pauseBtnSfx)
            }
        } else if (clickPosX > this.pauseBtnHome.x - 40 && clickPosX < this.pauseBtnHome.x + 40 && clickPosY > this.pauseBtnHome.y - 40 && clickPosY < this.pauseBtnHome.y + 40) {
            this.pauseGame(false);
            MainGame.goToState("Menu")
        } else if (clickPosX > this.pauseBtnReplay.x - 140 && clickPosX < this.pauseBtnReplay.x + 140 && clickPosY > this.pauseBtnReplay.y - 50 && clickPosY < this.pauseBtnReplay.y + 50) {
            this.pauseGame(false);
            MainGame.goToState("Game")
        }
    },
    pauseGame: function(vBool) {
        if (typeof vBool === "undefined") vBool = true;
        this.isPaused = !this.isPaused;
        game.paused = this.isPaused;
        PhaserSpine.Spine.globalAutoUpdate = !this.isPaused;
        if (vBool) {
            game.physics.box2d.paused = this.isPaused;
            this.layerPause.visible = this.isPaused
        }
    },
    updateTimer: function() {
        this.stat_time++
    },
    updateResize: function() {
        var posP_R = 800 + (game.width - 800) * .5;
        var posP_L = -((game.width - 800) * .5);
        this.btnTap.x = game.width - 60;
        this.pauseBtnPause.x = game.width * .5 - 60;
        this.pauseBtnMusic.x = game.width * .5 - 150;
        this.pauseBtnSfx.x = game.width * .5 - 240;
        this.pauseBtnHome.x = game.width * .5 - 330;
        this.tileSky.width = game.width * 1.1;
        this.layerMap1.x = 0 + this.sdvigMap1;
        this.layerMap2.x = game.width - this.sdvigMap2;
        this.layerPause.x = game.width * .5;
        this.spr_bg.width = game.width;
        this.layerText.x = game.width * .5
    },
    playVoiceGroup: function(vNum) {
        var arVoiceGroups = [
            [0, 1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12],
            [13, 14, 15],
            [16, 17, 18, 19, 20, 21],
            [22, 23, 24, 25, 26, 27, 28],
            [29, 30],
            [31, 32, 33, 34, 35, 36],
            [37, 38, 39, 40, 41, 42, 43],
            [44, 45, 46]
        ];
        var countR = arVoiceGroups[vNum].length - 1;
        var r = MyMath.getRandomInt(0, countR);
        MainGame.playVoice(arVoiceGroups[vNum][r])
    },
    initBall: function(vBall, vRadius) {
        vBall.typeObj = "ball";
        vBall.anchor.setTo(.5);
        game.physics.box2d.enable(vBall);
        vBall.body.sensor = true;
        vBall.body.gravityScale = 0;
        vBall.body.setCircle(vRadius);
        vBall.body.angularDamping = .55;
        vBall.body.mass = .3;
        vBall.body.setCollisionCategory(this.CATEGORY_BALL);
        vBall.body.setCollisionMask(this.MASK_BALL);
        vBall.body.link = vBall
    },
    addDecor: function(vSkin, vX, vY) {
        var obj = this.layerPers.add(game.add.spine(vX, vY, "pers"));
        obj.setSkinByName(vSkin);
        obj.setAnimationByName(0, "idle", true);
        obj.setToSetupPose();
        var body = new Phaser.Physics.Box2D.Body(game, null, vX, vY, 2);
        if (vSkin == "dkid") {
            body.addCircle(30, 0, -60);
            body.addCircle(25, 0, -25)
        } else {
            body.addCircle(30, 0, -80);
            body.addCircle(25, 0, -25)
        }
        body.gravityScale = 0;
        body.kinematic = true;
        body.setCollisionCategory(this.CATEGORY_DODIK);
        body.setCollisionMask(this.CATEGORY_BALL);
        body.setCategoryContactCallback(this.CATEGORY_BALL, this.hitBallGround, this);
        body.link = obj;
        obj.body = body;
        obj.typeObj = "decor";
        return obj
    },
    addBanka: function(vX, vY) {
        var obj = this.layerMain.add(game.add.sprite(vX, vY, "ss_main1", "roll_0000"));
        obj.anchor.setTo(.5);
        game.physics.box2d.enable(obj);
        obj.body.setRectangle(70, 85, 0, -3, 0);
        obj.body.restitution = .25;
        obj.body.mass = 1.5;
        obj.body.setCollisionCategory(this.CATEGORY_DODIK);
        obj.body.setCollisionMask(this.MASK_DODIK2);
        obj.body.setCategoryContactCallback(this.CATEGORY_BALL, this.hitBallGround, this);
        obj.body.link = obj;
        obj.typeObj = "banka";
        this.testBanka = obj;
        return obj
    },
    addGull: function(vX, vY) {
        var obj = this.layerEffect.add(game.add.sprite(vX, vY, "ss_main2"));
        obj.animations.add("idle", Phaser.Animation.generateFrameNames("gull_", 0, 15, "", 4), 30);
        obj.animations.add("kick", Phaser.Animation.generateFrameNames("gull_kick_", 0, 7, "", 4), 30);
        obj.animations.play("idle", 30, true);
        obj.anchor.setTo(.5);
        game.physics.box2d.enable(obj);
        obj.body.setRectangle(30, 60, 0, 5, 0);
        obj.body.restitution = .25;
        obj.body.mass = 1;
        obj.body.fixedRotation = true;
        obj.body.setCollisionCategory(this.CATEGORY_DODIK);
        obj.body.setCollisionMask(this.MASK_DODIK2);
        obj.body.setCategoryContactCallback(this.CATEGORY_BALL, this.hitBallGround, this);
        obj.body.link = obj;
        obj.typeObj = "gull";
        obj.water = true;
        return obj
    },
    addStick: function(vX, vY) {
        var obj = this.layerEffect.add(game.add.sprite(vX, vY, "ss_main2", "log_gull_0000"));
        obj.anchor.setTo(.5);
        game.physics.box2d.enable(obj);
        obj.body.setRectangle(15, 120, 0, -5, 0);
        obj.body.static = true;
        obj.body.setCollisionCategory(this.CATEGORY_DODIK);
        obj.body.setCollisionMask(this.MASK_DODIK1);
        obj.body.setCategoryContactCallback(this.CATEGORY_BALL, this.hitBallGround, this);
        return obj
    },
    addBird: function(vX, vY) {
        var obj = this.layerEffect.add(game.add.sprite(vX, vY, "ss_main2"));
        obj.animations.add("idle", Phaser.Animation.generateFrameNames("bird_", 0, 15, "", 4), 30);
        obj.animations.add("attack", Phaser.Animation.generateFrameNames("bird_attack_", 0, 14, "", 4), 30);
        obj.animations.add("fly", Phaser.Animation.generateFrameNames("bird_fly_", 0, 15, "", 4), 30);
        obj.animations.play("idle", 30, true);
        obj.events.onAnimationComplete.add(this.onAnimCompleteBird, this);
        obj.anchor.setTo(.5);
        var body = new Phaser.Physics.Box2D.Body(game, null, vX, vY, 2);
        body.addCircle(20, 5, -10);
        body.gravityScale = 0;
        body.kinematic = true;
        body.sensor = true;
        body.setCollisionCategory(this.CATEGORY_DODIK);
        body.setCollisionMask(this.CATEGORY_BALL);
        body.setCategoryContactCallback(this.CATEGORY_BALL, this.hitBallGround, this);
        body.link = obj;
        obj.body = body;
        obj.typeObj = "bird";
        this.birdKicked = false;
        game.time.events.loop(3e3, this.birdAction, this);
        return obj
    },
    onAnimCompleteBird: function(sprite, animation) {
        if (animation.name === "attack") {
            sprite.animations.play("idle", 30, true)
        }
    },
    birdAction: function() {
        if (this.birdKicked) {
            return
        }
        if (Phaser.Utils.chanceRoll(40)) {
            this.bird.animations.play("attack", 30, false)
        }
    },
    birdBack: function() {
        this.bird.animations.play("idle", 30, true);
        this.birdKicked = false
    },
    kickBird: function(vVelocityBall) {
        this.birdKicked = true;
        var initPosBird = new Phaser.Point(this.bird.x, this.bird.y);
        var dx = initPosBird.x + Math.floor(vVelocityBall / 15);
        var dy = initPosBird.y - 90;
        game.add.tween(this.bird).to({
            x: dx,
            y: dy
        }, 500, "Back", false).to({
            x: initPosBird.x,
            y: initPosBird.y
        }, 700, "Linear").start();
        game.time.events.add(1200, this.birdBack, this);
        this.kickWhale()
    },
    addWhale: function(vX, vY) {
        var obj = this.layerEffect.add(game.add.sprite(vX, vY, "ss_main2", "whale_0000"));
        var whalePart1 = this.addBodyShape(0, [795, 231, 702, 225, 724, 212, 802, 200, 846, 213], obj.x, obj.y);
        var whalePart2 = this.addBodyShape(0, [702, 225, 795, 231, 819, 296], obj.x, obj.y);
        var whalePart3 = this.addBodyShape(0, [604, 138, 19, 155, 17, 115, 520, 90, 608, 99], obj.x, obj.y);
        var whalePart4 = this.addBodyShape(0, [19, 155, 604, 138, 724, 212, 702, 225, 313, 310, 115, 262], obj.x, obj.y);
        var whalePart5 = this.addBodyShape(0, [249, 18, 382, 40, 520, 90, 17, 115, 106, 42], obj.x, obj.y);
        obj.typeObj = "whale";
        whalePart1.link = obj;
        whalePart2.link = obj;
        whalePart3.link = obj;
        whalePart4.link = obj;
        whalePart5.link = obj;
        whalePart1.setCollisionCategory(this.CATEGORY_DODIK);
        whalePart1.setCollisionMask(this.CATEGORY_BALL);
        whalePart2.setCollisionCategory(this.CATEGORY_DODIK);
        whalePart2.setCollisionMask(this.CATEGORY_BALL);
        whalePart3.setCollisionCategory(this.CATEGORY_DODIK);
        whalePart3.setCollisionMask(this.CATEGORY_BALL);
        whalePart4.setCollisionCategory(this.CATEGORY_DODIK);
        whalePart4.setCollisionMask(this.CATEGORY_BALL);
        whalePart5.setCollisionCategory(this.CATEGORY_DODIK);
        whalePart5.setCollisionMask(this.CATEGORY_BALL)
    },
    addShark: function(vSkin, vOffsetY) {
        this.flagShark = true;
        var shark = this.layerEffect.add(game.add.image(0, 515 + vOffsetY, "ss_main2"));
        shark.animations.add("swim", Phaser.Animation.generateFrameNames(vSkin + "_swim_", 0, 0, "", 4), 30);
        shark.animations.add("attack", Phaser.Animation.generateFrameNames(vSkin + "_up_", 0, 18, "", 4), 30);
        shark.animations.play("swim", 30, true);
        shark.anchor.setTo(.5);
        shark.startY = shark.y;
        shark.typeObj = "shark";
        shark.events.onAnimationComplete.add(this.onAnimCompleteAnimal, this);
        this.waveAr.push(shark);
        var sdvigX = 100;
        var bodyBox = this.addPolygon([sdvigX + 262, 515 - 3, sdvigX + 362, 489 - 3, sdvigX + 528, 513 - 3, sdvigX + 529, 534 - 3, sdvigX + 267, 530 - 3]);
        bodyBox.setCollisionCategory(this.CATEGORY_DODIK);
        bodyBox.setCollisionMask(this.CATEGORY_BALL);
        bodyBox.link = shark;
        bodyBox.gravityScale = 0;
        bodyBox.kinematic = true;
        shark.body = bodyBox;
        var posX = 100 + MyMath.getRandomInt(0, 20) * 50;
        shark.body.x = posX;
        if (!this.flagShark) {
            shark.scale.x = -1
        }
        this.shark = shark
    },
    addHippo: function() {
        var sdvigHx = 0;
        var sdvigHy = -55;
        var hippo = this.layerEffect.add(game.add.image(sdvigHx + 1150, sdvigHy + 515, "ss_main2"));
        hippo.animations.add("swim", Phaser.Animation.generateFrameNames("hippo_idle_", 0, 0, "", 4), 30);
        hippo.animations.add("attack", Phaser.Animation.generateFrameNames("hippo_up_", 0, 18, "", 4), 30);
        hippo.animations.play("swim", 30, true);
        hippo.anchor.setTo(.5);
        hippo.startY = hippo.y;
        hippo.typeObj = "hippo";
        hippo.events.onAnimationComplete.add(this.onAnimCompleteAnimal, this);
        this.waveAr.push(hippo);
        var bodyBox = this.addPolygon([sdvigHx + 1020, sdvigHy + 482, sdvigHx + 1069, sdvigHy + 470, sdvigHx + 1099, sdvigHy + 440, sdvigHx + 1147, sdvigHy + 468, sdvigHx + 1210, sdvigHy + 469, sdvigHx + 1265, sdvigHy + 504, sdvigHx + 1270, sdvigHy + 550, sdvigHx + 1020, sdvigHy + 520]);
        bodyBox.setCollisionCategory(this.CATEGORY_DODIK);
        bodyBox.setCollisionMask(this.CATEGORY_BALL);
        bodyBox.link = hippo;
        bodyBox.gravityScale = 0;
        bodyBox.kinematic = true;
        hippo.body = bodyBox;
        this.hippo = hippo
    },
    finishGame: function(vIsWin) {
        this.isLevelCompleted = true;
        game.time.events.remove(this.timerLevel);
        this.layerTop.visible = false;
        this.layerText.visible = false;
        this.isFinishShown = true;
        var plashka = this.layerFinish.add(game.add.group());
        var textTitle;
        var midX = game.width * .5;
        var back;
        var s_earned;
        this.isLevelWin = vIsWin;
        if (vIsWin) {
            back = plashka.add(game.add.image(midX, 290, "ss_menu", "win_panel_0000"));
            back.anchor.setTo(.5);
            textTitle = MainGame.GAME_TEXT.battle_won.toUpperCase();
            if (MainGame.isHardMode) {
                MainGame.levelHard[MainGame.levelNum] = 1;
                var heroReward = plashka.add(game.add.image(midX, 180, "ss_menu", "heroic_coin_0000"));
                heroReward.anchor.setTo(.5);
                heroReward.scale.setTo(1);
                heroReward.alpha = 0;
                game.add.tween(heroReward).to({
                    alpha: 1
                }, 300, "Linear", true, 1400);
                game.add.tween(heroReward.scale).to({
                    x: 1.6,
                    y: 1.6
                }, 250, "Linear", false, 1300).to({
                    x: 1.2,
                    y: 1.2
                }, 250, "Linear").start()
            } else {
                var star1t = plashka.add(game.add.image(midX - 90, 190, "ss_menu", "empty_star_0000"));
                star1t.anchor.setTo(.5);
                star1t.angle = -15;
                var star2t = plashka.add(game.add.image(midX, 180, "ss_menu", "empty_star_0000"));
                star2t.anchor.setTo(.5);
                var star3t = plashka.add(game.add.image(midX + 90, 190, "ss_menu", "empty_star_0000"));
                star3t.anchor.setTo(.5);
                star3t.angle = 15;
                var star1s = plashka.add(game.add.image(midX - 92, 190 - 9, "ss_menu", "star_0000"));
                star1s.anchor.setTo(.5);
                star1s.angle = -15;
                var star2s = plashka.add(game.add.image(midX, 180 - 9, "ss_menu", "star_0000"));
                star2s.anchor.setTo(.5);
                var star3s = plashka.add(game.add.image(midX + 92, 190 - 9, "ss_menu", "star_0000"));
                star3s.anchor.setTo(.5);
                star3s.angle = 15
            }
            plashka.add(game.add.image(midX + 40, 265, "ss_menu", "coins_0000"));
            var icon1 = plashka.add(game.add.image(midX - 220, 300 + 45, "ss_menu", "ball_small_0000"));
            icon1.anchor.setTo(.5);
            var icon2 = plashka.add(game.add.image(midX - 220, 342 + 45, "ss_menu", "clocks_0000"));
            icon2.anchor.setTo(.5);
            var icon3 = plashka.add(game.add.image(midX - 220, 384 + 45, "ss_menu", "baddies_0000"));
            icon3.anchor.setTo(.5);
            var coin1 = plashka.add(game.add.image(midX + 130, 300 + 45, "ss_menu", "coin1_0000"));
            coin1.anchor.setTo(.5);
            var coin2 = plashka.add(game.add.image(midX + 130, 342 + 45, "ss_menu", "coin1_0000"));
            coin2.anchor.setTo(.5);
            var coin3 = plashka.add(game.add.image(midX + 130, 384 + 45, "ss_menu", "coin1_0000"));
            coin3.anchor.setTo(.5);
            var result = this.calculateScore();
            var countStars = result[0];
            var s_shots = result[1];
            var s_time = result[2];
            var s_killed = result[3];
            s_earned = result[4];
            if (!MainGame.isHardMode) {
                star1s.scale.setTo(.5);
                star1s.alpha = 0;
                star2s.scale.setTo(.5);
                star2s.alpha = 0;
                star3s.scale.setTo(.5);
                star3s.alpha = 0;
                if (countStars >= 1) {
                    game.add.tween(star1s).to({
                        alpha: 1
                    }, 300, "Linear", true, 1100);
                    game.add.tween(star1s.scale).to({
                        x: 1.6,
                        y: 1.6
                    }, 250, "Linear", false, 1e3).to({
                        x: 1,
                        y: 1
                    }, 250, "Linear").start()
                }
                if (countStars >= 2) {
                    game.add.tween(star2s).to({
                        alpha: 1
                    }, 300, "Linear", true, 1400);
                    game.add.tween(star2s.scale).to({
                        x: 1.6,
                        y: 1.6
                    }, 250, "Linear", false, 1300).to({
                        x: 1,
                        y: 1
                    }, 250, "Linear").start()
                }
                if (countStars == 3) {
                    game.add.tween(star3s).to({
                        alpha: 1
                    }, 300, "Linear", true, 1700);
                    game.add.tween(star3s.scale).to({
                        x: 1.6,
                        y: 1.6
                    }, 250, "Linear", false, 1600).to({
                        x: 1,
                        y: 1
                    }, 250, "Linear").start()
                }
            }
            this.btnNext = new SimpleButton(game, this, plashka, midX + 125, 520, "ss_menu", "btn_continue_0000", this.clickLevelMenu, 1);
            MainGame.addText(800, coin1.x + 22, coin1.y + 5 - 2, String(s_shots), plashka, 26, 10248197, 0, .5);
            MainGame.addText(800, coin1.x + 22, coin1.y + 0 - 2, String(s_shots), plashka, 26, 16710912, 0, .5);
            MainGame.addText(800, coin2.x + 22, coin2.y + 5 - 2, String(s_time), plashka, 26, 10248197, 0, .5);
            MainGame.addText(800, coin2.x + 22, coin2.y + 0 - 2, String(s_time), plashka, 26, 16710912, 0, .5);
            MainGame.addText(800, coin3.x + 22, coin3.y + 5 - 2, String(s_killed), plashka, 26, 10248197, 0, .5);
            MainGame.addText(800, coin3.x + 22, coin3.y + 0 - 2, String(s_killed), plashka, 26, 16710912, 0, .5);
            MainGame.addText(800, midX + 115, 288 + 5 - 2, String(s_earned), plashka, 38, 10248197, 0, .5);
            MainGame.addText(800, midX + 115, 288 + 0 - 2, String(s_earned), plashka, 38, 16710912, 0, .5);
            MainGame.addText(240, midX - 130, 250, MainGame.GAME_TEXT.total_score.toUpperCase(), plashka, 24, 16777215, .5, .5);
            MainGame.addText(240, midX + 130, 250, MainGame.GAME_TEXT.credits_earned.toUpperCase(), plashka, 24, 16777215, .5, .5);
            MainGame.addText(800, midX - 130, 250 + 38, String(MainGame.highScore), plashka, 26, 16777215, .5, .5);
            var shotsFired = MainGame.replaceText(MainGame.GAME_TEXT.shots_fired.toUpperCase(), String(this.stat_shots));
            var timeUsed = MainGame.replaceText(MainGame.GAME_TEXT.time_used_N.toUpperCase(), String(this.stat_time));
            var badiesSoaked = MainGame.replaceText(MainGame.GAME_TEXT.baddies_soaked.toUpperCase(), String(this.stat_enemy));
            MainGame.addText(280, midX - 195, coin1.y - 2, shotsFired, plashka, 26, 16777215, 0, .5);
            MainGame.addText(280, midX - 195, coin2.y - 2, timeUsed, plashka, 26, 16777215, 0, .5);
            MainGame.addText(280, midX - 195, coin3.y - 2, badiesSoaked, plashka, 26, 16777215, 0, .5);
            if (MainGame.isAPI) MainGame.API_POKI.happyTime(.5)
        } else {
            back = plashka.add(game.add.image(midX, 290, "ss_menu", "lost_panel_0000"));
            back.anchor.setTo(.5);
            textTitle = MainGame.GAME_TEXT.battle_lost.toUpperCase();
            var s_killed = this.stat_enemy * 150;
            if (MainGame.levelNum < MainGame.levelMax) {
                s_killed = Math.floor(s_killed * .5)
            }
            s_earned = s_killed;
            var icon3 = plashka.add(game.add.image(midX - 220, 384 + 45 - 65, "ss_menu", "baddies_0000"));
            icon3.anchor.setTo(.5);
            var coin3 = plashka.add(game.add.image(midX + 130, 384 + 45 - 65, "ss_menu", "coin1_0000"));
            coin3.anchor.setTo(.5);
            plashka.add(game.add.image(midX - 90, 265 - 25, "ss_menu", "coins_0000"));
            this.btnNext = new SimpleButton(game, this, plashka, midX + 125, 520, "ss_menu", "btn_continue_0000", this.clickShop);
            MainGame.addText(240, midX, 250 - 25 - 7, MainGame.GAME_TEXT.credits_earned.toUpperCase(), plashka, 26, 16777215, .5, .5);
            MainGame.addText(800, midX + 115 - 130, 288 + 5 - 25 - 2, String(s_earned), plashka, 38, 10248197, 0, .5);
            MainGame.addText(800, midX + 115 - 130, 288 + 0 - 25 - 2, String(s_earned), plashka, 38, 16710912, 0, .5);
            MainGame.addText(800, coin3.x + 22, coin3.y + 5 - 2, String(s_killed), plashka, 26, 10248197, 0, .5);
            MainGame.addText(800, coin3.x + 22, coin3.y + 0 - 2, String(s_killed), plashka, 26, 16710912, 0, .5);
            var badiesSoaked = MainGame.replaceText(MainGame.GAME_TEXT.baddies_soaked.toUpperCase(), String(this.stat_enemy));
            MainGame.addText(280, midX - 195, coin3.y - 2, badiesSoaked, plashka, 26, 16777215, 0, .5)
        }
        this.btnReward = new SimpleButton(game, this, plashka, midX - 125, 520 - 7, "ss_menu", "btn_bonus_0000", MainGame.clickReward, 1);
        MainGame.setReward(this.btnReward.buttonC, 0, 0, false);
        if (MainGame.isAPI) {
            if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) {
                this.btnReward.buttonC.alpha = .7
            }
        } else {
            if (!MainGame.isDebug) this.btnReward.buttonC.alpha = .7
        }
        MainGame.allowReward = true;
        this.finishLevelResult(vIsWin, s_earned);
        MainGame.addText(420, midX, 90 + 5, textTitle, plashka, 42, 9330034, .5, .5);
        MainGame.addText(420, midX, 90, textTitle, plashka, 42, 16777215, .5, .5);
        plashka.y = -600;
        game.add.tween(plashka).to({
            y: 0
        }, 1e3, Phaser.Easing.Elastic.Out).start();
        if (MainGame.isAPI) MainGame.API_POKI.destroyAd()
    },
    calculateScore: function() {
        var countStars = 1;
        var s_shots = MainGame.arShots[MainGame.levelNum] - this.stat_shots;
        if (s_shots >= 0) countStars++;
        if (s_shots < 0) s_shots = 0;
        var howTime = MainGame.arShots[MainGame.levelNum] * 20 - this.stat_time;
        if (howTime >= 0) countStars++;
        if (howTime < 0) howTime = 0;
        s_shots *= 300;
        var s_time = howTime * 2;
        var s_killed = this.stat_enemy * 150;
        if (MainGame.levelNum < MainGame.levelMax) {
            s_shots = Math.floor(s_shots * .5);
            s_time = Math.floor(s_time * .5);
            s_killed = Math.floor(s_killed * .5)
        }
        s_earned = s_shots + s_time + s_killed;
        if (MainGame.isHardMode) s_earned += 1e3;
        if (MainGame.levelScore[MainGame.levelNum] < s_earned) {
            MainGame.levelScore[MainGame.levelNum] = s_earned
        }
        if (MainGame.levelTime[MainGame.levelNum] > 0 && MainGame.levelTime[MainGame.levelNum] > this.stat_time) {
            MainGame.levelTime[MainGame.levelNum] = this.stat_time
        }
        if (MainGame.levelStars[MainGame.levelNum] < countStars) {
            MainGame.levelStars[MainGame.levelNum] = countStars
        }
        MainGame.highScore = 0;
        for (var i = 0; i < MainGame.MAX_LEVELS; i++) {
            MainGame.highScore += MainGame.levelScore[i]
        }
        return [countStars, s_shots, s_time, s_killed, s_earned]
    },
    finishLevelResult: function(vBool, vEarned) {
        if (vBool) {
            MainGame.api_google("LevelWon", MainGame.levelNum + 1);
            MainGame.levelNum++;
            if (MainGame.levelNum < 13) {
                if (MainGame.levelMax < MainGame.levelNum) {
                    MainGame.levelMax = MainGame.levelNum
                }
            }
        } else {
            MainGame.api_google("LevelLost", MainGame.levelNum + 1)
        }
        MainGame.coins += vEarned;
        MainGame.saveSaves(1)
    },
    addDamageEffect: function(vDmg, vX, vY) {
        var obj = this.addNumbers("-" + vDmg, this.layerEffect, vX, vY, 2);
        game.add.tween(obj).to({
            y: vY - 40
        }, 1e3, "Linear", true).onComplete.add(function() {
            obj.destroy()
        })
    },
    addNumbers: function(vValue, vLayer, vX, vY, vSpace, vScale, vIsCenter, vIsShadow) {
        if (typeof vScale === "undefined") vScale = 1;
        if (typeof vIsCenter === "undefined") vIsCenter = false;
        if (typeof vIsShadow === "undefined") vIsShadow = true;
        if (typeof vSpace === "undefined") vSpace = 0;
        vValue += "";
        var arrayOfNum = vValue.split("");
        var num1;
        var num2;
        var chr;
        var objLayer = vLayer.add(game.add.group());
        objLayer.x = vX;
        objLayer.y = vY;
        var wObjs = 0;
        for (var i = 0; i < arrayOfNum.length; i++) {
            chr = arrayOfNum[i];
            switch (chr) {
                case "+":
                    num1 = objLayer.add(game.add.image(wObjs, 4, "ss_main2", "num_43_0000"));
                    num2 = objLayer.add(game.add.image(wObjs, 0, "ss_main2", "num_43_0000"));
                    break;
                case "-":
                    num1 = objLayer.add(game.add.image(wObjs, 4, "ss_main2", "num_45_0000"));
                    num2 = objLayer.add(game.add.image(wObjs, 0, "ss_main2", "num_45_0000"));
                    break;
                case ":":
                    num1 = objLayer.add(game.add.image(wObjs, 4, "ss_main2", "num_58_0000"));
                    num2 = objLayer.add(game.add.image(wObjs, 0, "ss_main2", "num_58_0000"));
                    break;
                default:
                    num1 = objLayer.add(game.add.image(wObjs, 4, "ss_main2", "num_" + Number(arrayOfNum[i]) + "_0000"));
                    num2 = objLayer.add(game.add.image(wObjs, 0, "ss_main2", "num_" + Number(arrayOfNum[i]) + "_0000"));
                    break
            }
            num1.anchor.setTo(1, 0);
            num1.scale.setTo(vScale);
            num2.anchor.setTo(1, 0);
            num2.scale.setTo(vScale);
            num1.tint = 9395827;
            num2.tint = 16776958;
            if (!vIsShadow) num1.visible = false;
            num1.x += num1.width;
            num2.x += num1.width;
            wObjs += num1.width - vSpace
        }
        if (vIsCenter) objLayer.x -= wObjs * .5;
        return objLayer
    },
    setStriker: function(vHero) {
        this.striker = vHero;
        this.setIK(this.striker);
        this.aimX = this.striker.obj.x - 15;
        this.aimY = this.striker.obj.y - 48;
        this.layerArrow.x = this.aimX;
        this.layerArrow.y = this.aimY;
        this.layerArrowOld.x = this.aimX;
        this.layerArrowOld.y = this.aimY;
        this.numStriker = vHero.id
    },
    setIK: function(vHero) {
        this.targetIK1 = vHero.obj.skeleton.ikConstraints[0];
        this.targetIK2 = vHero.obj.skeleton.ikConstraints[4];
        if (this.targetIK1.data.name != "aim") console.log("[WARNING] Can't find IK: aim!");
        if (this.targetIK2.data.name != "target") console.log("[WARNING] Can't find IK: tatget!");
        this.targetIK1.target.y = 30;
        this.targetIK2.target.y = 55;
        this.lastTargetPosP1 = this.targetIK1.target.y;
        this.lastTargetPosP2 = this.targetIK2.target.y
    },
    initBackground: function() {
        this.addObject(275, 82, this.layerBack3, "cloud0", 2);
        this.addObject(1045, 80, this.layerBack3, "cloud0", 2);
        this.addObject(160, 95, this.layerBack3, "cloud0", 1);
        this.addObject(557, 45, this.layerBack3, "cloud0", 3);
        this.addObject(316, 376, this.layerBack3, "ground3_", 1);
        this.addObject(570, 316, this.layerBack3, "ground3_", 1);
        this.addObject(932, 342, this.layerBack2, "ground2_", 3);
        this.addObject(716, 300, this.layerBack2, "ground2_", 1);
        this.addObject(1220, 320, this.layerBack2, "ground2_", 1);
        this.addObject(456, 332, this.layerBack2, "ground2_", 2);
        var palm1 = this.addObject(600, 180, this.layerBack1, "palm", 1);
        palm1.scale.x = -1;
        palm1.angle = -13;
        this.addObject(1364 - 220, 200, this.layerBack1, "palm", 1);
        this.addObject(840, 396, this.layerBack1, "ground1_", 2);
        this.addObject(1710, 380, this.layerBack1, "ground1_", 2);
        this.addObject(1480, 357, this.layerBack1, "ground1_", 1);
        this.addObject(1130, 417, this.layerBack1, "ground1_", 2);
        this.addObject(224, 406, this.layerBack1, "ground1_", 1);
        this.addObject(412, 380, this.layerBack1, "ground1_", 2);
        this.addObject(50, 440, this.layerBack1, "ground1_", 3)
    },
    addObject: function(vX, vY, vLayer, vName, vType) {
        return vLayer.add(game.add.image(vX, vY, "ss_back", vName + vType + "_0000"))
    },
    playAnim: function(e) {
        this.hero2.updateAnim(100 + e.id)
    },
    levelEvent: function() {
        switch (MainGame.levelNum) {
            case 6:
                this.viking1.updateAnim(5);
                break;
            case 3:
            case 11:
                this.viking2.updateAnim(5);
                break;
            case 8:
                this.viking4.updateAnim(5);
                break
        }
    },
    updateSimon: function(vNum) {
        if (!this.isSimonTalked) return;
        if (typeof vNum == undefined) vNum = 0;
        if (this.turnNum == 2) return;
        if (this.gameStatus == 0) return;
        if (this.hero2.hpNow <= 0) return;
        var nameAnim = this.hero2.obj.state.tracks[0].animation.name;
        if (nameAnim == "idle") {
            var r = MyMath.getRandomInt(1, 9);
            if (vNum > 0) r = vNum;
            if (r == 7) r = MyMath.getRandomInt(1, 5);
            if (MainGame.typeViking == 0) {
                if (r == 9) {
                    r = MyMath.getRandomInt(1, 5)
                }
            } else {
                if (r == 7 || r == 8) r = 9;
                if (r == 3) r = MyMath.getRandomInt(4, 6)
            }
            if (r == 6 && this.stat_shots == 0) r = 2;
            this.hero2.updateAnim(100 + r);
            if (r == 5) {
                var rnd = MyMath.getRandomInt(1, 3);
                if (rnd == 1) {
                    var talk = MainGame.GAME_TEXT.simon_talk1;
                    this.hero2.showDialog(0, talk)
                } else if (rnd == 2) {
                    var talk = MainGame.GAME_TEXT.simon_talk2;
                    this.hero2.showDialog(0, talk)
                } else {
                    var talk = MainGame.GAME_TEXT.simon_talk3;
                    this.hero2.showDialog(0, talk)
                }
            } else if (r == 6) {
                var talk = MainGame.GAME_TEXT.simon_talk4;
                this.hero2.showDialog(0, talk)
            } else if (r == 8 || r == 9) {
                var talk = MainGame.GAME_TEXT.simon_talk5;
                this.hero2.showDialog(2, talk)
            }
        }
    },
    selectBall1: function() {
        this.typeGun = 0;
        this.krutilka.x = this.btnBall1.x;
        this.krutilka.y = this.btnBall1.y
    },
    selectBall2: function() {
        if (MainGame.countGranat <= 0) return;
        this.typeGun = 1;
        this.krutilka.x = this.btnBall2.x;
        this.krutilka.y = this.btnBall2.y
    },
    selectBall3: function() {
        if (MainGame.countRocket <= 0) return;
        this.typeGun = 2;
        this.krutilka.x = this.btnBall3.x;
        this.krutilka.y = this.btnBall3.y
    },
    selectBall4: function() {
        if (MainGame.countBalls3 <= 0) return;
        this.typeGun = 3;
        this.krutilka.x = this.btnBall4.x;
        this.krutilka.y = this.btnBall4.y
    },
    updateCamera: function(vNum, vX, vWhoFollow, vLerp) {
        if (MainGame.isDebug) {
            if (vNum > 0) return
        }
        if (typeof vX == undefined) vX = 0;
        if (typeof vWhoFollow == undefined) vWhoFollow = null;
        if (typeof vLerp == undefined) vLerp = .1;
        switch (vNum) {
            case 100:
                this.cameraPoint.x = game.camera.x + 400;
                var time = Math.floor(this.level_width * .7);
                this.timeToStart = time;
                game.add.tween(this.cameraPoint).to({
                    x: vX
                }, this.timeToStart, "Sine.easeIn", true);
                game.camera.follow(this.cameraPoint, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, .1, .1);
                break;
            case 0:
                game.camera.focusOnXY(vX, 0);
                this.cameraPoint.x = game.camera.x;
                break;
            case 1:
                game.camera.follow(vWhoFollow, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, vLerp, vLerp);
                this.cameraPoint.x = vWhoFollow.x;
                break;
            case 2:
                this.cameraPoint.x = game.camera.x + 400;
                game.add.tween(this.cameraPoint).to({
                    x: vX
                }, 1e3, "Quad.easeOut", true);
                game.camera.follow(this.cameraPoint, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, vLerp, vLerp);
                break
        }
    },
    addDecorDodik: function(vSkin, vX, vY, vAnim) {
        var obj = this.layerPers.add(game.add.spine(vX, vY, "pers"));
        obj.setSkinByName(vSkin);
        obj.setAnimationByName(0, vAnim, true);
        obj.setToSetupPose();
        obj.state.tracks[0].time = MyMath.getRandomInt(1, 7);
        return obj
    },
    addDodik: function(vTeam, vSkin, vX, vY, vCategory, vMask, vIsWave, vHpBarY) {
        var dodik = new Bot(game, this.layerPers, vTeam, vSkin, vX, vY, vIsWave);
        dodik.body.setCollisionCategory(vCategory);
        dodik.body.setCollisionMask(vMask);
        dodik.body.setCategoryContactCallback(this.CATEGORY_BALL, this.hitBall, this);
        dodik.body.setCategoryContactCallback(this.CATEGORY_DODIK, this.hitDodik, this);
        this.arDodiki.push(dodik);
        this.countDodik = this.arDodiki.length;
        dodik.hpBar = this.addHpBar(vX, vY, vHpBarY, 1);
        dodik.dialog = this.addDialog(vX, vY, vHpBarY);
        dodik.dialog.visible = false;
        dodik.mini = this.addMiniIcon(vX, vTeam);
        return dodik
    },
    addHpBar: function(vX, vY, vSdvig, vType) {
        var hpBar = this.layerHpBars.add(game.add.group());
        hpBar.x = vX;
        hpBar.y = vY;
        var suffix = "";
        var crW = 52;
        var crH = 15;
        if (vType == 2) {
            suffix = "_wh";
            crW = 206;
            crH = 40
        }
        var obj1 = hpBar.add(game.add.image(-25, -130, "ss_main2", "hp_bar2" + suffix + "_0000"));
        var obj2 = hpBar.add(game.add.image(-25, -130, "ss_main2", "hp_bar1" + suffix + "_0000"));
        hpBar.bar1 = obj1;
        hpBar.bar2 = obj2;
        hpBar.offsetY = vSdvig;
        hpBar.cropRect = new Phaser.Rectangle(0, 0, crW, crH);
        hpBar.bar2.crop(hpBar.cropRect);
        return hpBar
    },
    addDialog: function(vX, vY, vSdvig) {
        var dialog = this.layerDialog.add(game.add.group());
        dialog.x = vX;
        dialog.y = vY;
        var obj2 = dialog.add(game.add.image(-22, 0, "ss_main2", "msg2_0000"));
        obj2.anchor.setTo(0, 1);
        var obj1 = dialog.add(game.add.image(5, 0, "ss_main2", "msg_tail_0000"));
        obj1.anchor.setTo(.5, .25);
        dialog.dialog1 = obj1;
        dialog.dialog2 = obj2;
        dialog.offsetY = vSdvig;
        dialog.text = MainGame.addText(800, -10, -35, "", dialog, 22, 9330034);
        return dialog
    },
    addMiniIcon: function(vX, vTeam) {
        var offsetX = 45;
        if (vTeam == 1) {
            iconGroup = this.layerMap1.add(game.add.group());
            iconGroup.x = -offsetX * this.countTeam1;
            this.countTeam1++;
            this.sdvigMap1 += offsetX
        } else {
            iconGroup = this.layerMap2.add(game.add.group());
            iconGroup.x = offsetX * this.countTeam2;
            this.countTeam2++;
            this.sdvigMap2 += offsetX
        }
        iconGroup.y = 566;
        var obj = iconGroup.add(game.add.image(0, 0, "ss_main2", "map_h" + vTeam + "_0000"));
        obj.anchor.setTo(.5);
        var obj1 = iconGroup.add(game.add.image(-16, -27, "ss_main2", "hp_bar2mini_0000"));
        var obj2 = iconGroup.add(game.add.image(-16, -27, "ss_main2", "hp_bar1mini_0000"));
        iconGroup.bar1 = obj1;
        iconGroup.bar2 = obj2;
        iconGroup.obj = obj;
        iconGroup.cropRect = new Phaser.Rectangle(0, 0, 30, 10);
        iconGroup.bar2.crop(iconGroup.cropRect);
        return iconGroup
    },
    addBodyShape: function(vCategory, vVertices, offsetX, offsetY) {
        var bodyBox = this.addPolygon(vVertices, offsetX, offsetY);
        if (vCategory == 1) bodyBox.setCollisionCategory(this.CATEGORY_GROUND1);
        if (vCategory == 2) bodyBox.setCollisionCategory(this.CATEGORY_GROUND2);
        if (vCategory == 3) bodyBox.setCollisionCategory(this.CATEGORY_GROUND3);
        if (vCategory == 4) bodyBox.setCollisionCategory(this.CATEGORY_HELICOPTER);
        return bodyBox
    },
    addPolygon: function(vVertices, offsetX, offsetY) {
        if (vVertices.length >= 6) {
            var body = new Phaser.Physics.Box2D.Body(this.game, null, offsetX, offsetY, 0);
            body.static = true;
            body.setPolygon(vVertices);
            body.setCategoryContactCallback(this.CATEGORY_BALL, this.hitBallGround, this);
            return body
        }
    },
    addRectangle: function(vX, vY, vW, vH) {
        var body = new Phaser.Physics.Box2D.Body(game, null, vX, vY, 0);
        body.setRectangle(vW, vH, 0, 0);
        body.setCategoryContactCallback(this.CATEGORY_BALL, this.hitBallGround, this);
        return body
    },
    checkDodiki: function() {
        var dodik;
        var countNeedWait = 0;
        var timeWait = 500;
        for (var i = 0; i < this.countDodik; i++) {
            dodik = this.arDodiki[i];
            if (dodik.isLive) {
                dodik.checkBaza(this.turnNum, countNeedWait);
                if (!dodik.isOnBaza || dodik.isWasKicked) {
                    countNeedWait++;
                    if (this.turnNum == 2) {
                        dodik.moveToBaza()
                    } else {
                        game.time.events.add(timeWait, this.gogoDodik, this, dodik);
                        if (dodik.isWasKicked) {
                            timeWait += 900
                        }
                        if (MainGame.levelNum == 5) {
                            if (dodik.hpNow <= 0 && dodik.skin == "s4") {
                                game.time.events.add(1500, this.helicopterEscape, this);
                                timeWait += 2e3
                            }
                        }
                    }
                    if (!dodik.isOnBaza) {
                        timeWait += 8 * Math.floor(dodik.distanceBaza())
                    }
                }
            }
        }
        if (this.turnNum == 2 && !this.isOpponentMiss) this.playVoiceGroup(3);
        if (MainGame.levelNum == 12) {
            if (this.whaleKicked) {
                timeWait = 1500;
                this.showWhaleDamage()
            }
        }
        if (this.turnNum == 2) {
            this.shieldEvent(false)
        }
        game.time.events.add(200 + timeWait, this.nextTurn, this)
    },
    swapLayer: function(vHero, vNum) {
        this.layerMain.remove(vHero);
        this.layerEffect.add(vHero)
    },
    gogoDodik: function(vHero) {
        vHero.moveToBaza();
        this.updateCamera(2, vHero.obj.x);
        if (vHero.isEnemy() && vHero.isGoToBaza && vHero.isWasKicked && !vHero.isDrone) {
            this.heroDialog(vHero)
        }
    },
    playScene0_1: function() {
        this.decor1.setAnimationByName(0, "talk1", true);
        var dialog = this.addDialog(this.decor1.x - 75, this.decor1.y - 155);
        dialog.text.setText(MainGame.GAME_TEXT.security_talk);
        dialog.dialog2.frameName = "msg1_0000";
        dialog.dialog2.width = 390;
        dialog.dialog2.height = 70;
        dialog.dialog2.y += 27;
        dialog.dialog1.x += 15;
        dialog.dialog1.y += 24;
        dialog.text.maxWidth = 390;
        dialog.dialog2.width = Math.floor(dialog.text.width * 1.1);
        if (dialog.text.height > dialog.dialog2.height) {
            dialog.dialog2.height += 20;
            dialog.dialog1.y += 25;
            dialog.dialog2.y += 25
        }
        dialog.scale.setTo(.25);
        game.add.tween(dialog.scale).to({
            x: 1,
            y: 1
        }, 500, "Elastic.easeOut", true)
    },
    showScene: function(vNum) {
        if (vNum == 0) {
            this.isLevelCompleted = true;
            MainGame.stopMusic();
            MainGame.playSound(25);
            game.time.events.add(4e3, this.finishGame, this, true);
            this.level_width = 2800;
            game.camera.bounds.width = this.level_width + MainGame.deltaX;
            this.decor1 = this.addDecor("f7", 2100, 430);
            this.decor1.scale.x = -1;
            this.updateCamera(2, this.decor1.x);
            this.pyatno = this.layerEffect.add(game.add.image(2150, 515, "ss_main1", "water_purple_0000"));
            this.pyatno.anchor.setTo(.5);
            this.pyatno.scale.x = .6;
            game.add.tween(this.pyatno.scale).to({
                x: 1
            }, 5e3, "Linear", true, 300);
            this.vedro = this.layerEffect.add(game.add.image(2160, 505, "ss_main1", "roll_0000"));
            this.vedro.anchor.setTo(.5);
            this.vedro.angle = 35;
            game.add.tween(this.vedro).to({
                y: "7"
            }, 1500, "Linear", true, 0, -1, true);
            game.add.tween(this.vedro).to({
                angle: 40
            }, 1500, "Linear", true, 0, -1, true);
            game.time.events.add(1500, this.playScene0_1, this, true)
        }
    },
    nextTurn: function() {
        this.isOpponentMiss = true;
        for (var i = 0; i < this.countDodik; i++) this.arDodiki[i].setToStartPos();
        this.targetIK1.target.y = 30;
        this.targetIK2.target.y = 55;
        var isLiveHeroes = false;
        if (this.hero1.hpNow > 0 || this.hero2.hpNow > 0) isLiveHeroes = true;
        if (MainGame.typeBoat == 4 && (isLiveHeroes || this.hero3.hpNow > 0)) isLiveHeroes = true;
        if (isLiveHeroes) {
            if (this.turnNum == 1) {
                if (MainGame.levelNum == 0) {
                    if (this.banka.body.y < 700) {
                        this.timeToStrikeAgain();
                        this.layerAimPointsOld.visible = true
                    } else {
                        this.showScene(0)
                    }
                    return
                }
                var isLiveEnemy = false;
                var dodik;
                for (var i = 0; i < this.countDodik; i++) {
                    dodik = this.arDodiki[i];
                    if (dodik.isEnemy()) isLiveEnemy = true
                }
                if (isLiveEnemy) {
                    this.attackEnemy();
                    if (MainGame.isAPI) MainGame.API_POKI.gameplayStart()
                } else {
                    if (MainGame.levelNum == 12) {
                        this.checkWhale()
                    } else {
                        this.levelWin()
                    }
                }
            } else {
                if (MainGame.isAPI) MainGame.API_POKI.gameplayStart();
                if (this.striker.hpNow <= 0) {
                    var arHeroes = [];
                    if (this.hero1.hpNow > 0) arHeroes.push(this.hero1);
                    if (this.hero2.hpNow > 0) arHeroes.push(this.hero2);
                    if (MainGame.typeBoat == 4 && this.hero3.hpNow > 0) arHeroes.push(this.hero3);
                    this.striker = arHeroes[0];
                    this.striker.updateAnim(0);
                    this.striker.readyToShoot = true;
                    this.layerAimPointsOld.visible = false
                } else {
                    this.layerAimPointsOld.visible = true
                }
                this.timeToStrikeAgain()
            }
        } else {
            this.gameStatus = -1;
            this.layerTop.visible = false;
            this.levelLose()
        }
        this.layerHpBars.visible = false
    },
    timeToStrikeAgain: function() {
        this.gameStatus = 4;
        this.typeGun = this.lastTypeGun;
        this.turnNum = 1;
        this.updateCamera(2, 300);
        this.showPanel();
        this.setStriker(this.striker);
        this.isShooted = false;
        if (this.dronesDestroyed) {
            this.striker.setSuperRocket();
            this.typeGun = 100;
            this.layerWeapon.visible = false;
            if (this.isFinalDialog) {
                this.striker.showDialog(2, MainGame.GAME_TEXT.blow_up_whale);
                this.isFinalDialog = false
            }
        }
    },
    shieldBeReady: function() {
        this.shieldEvent(true)
    },
    shieldEvent: function(vBool) {
        if (MainGame.typeViking != 2) return;
        var numAnim = 7;
        if (!vBool) numAnim = 8;
        if (this.hero1 && this.hero1.hpNow > 0) this.hero1.updateAnim(numAnim);
        if (this.hero2 && this.hero1.hpNow > 0) this.hero2.updateAnim(numAnim);
        if (MainGame.typeBoat == 4) {
            if (this.hero3 && this.hero1.hpNow > 0) this.hero3.updateAnim(numAnim)
        }
    },
    levelWin: function() {
        this.isLevelCompleted = true;
        this.updateCamera(2, 300);
        var dodik;
        for (var i = 0; i < this.countDodik; i++) {
            dodik = this.arDodiki[i];
            if (dodik.team == 1) dodik.updateAnim(6)
        }
        MainGame.stopMusic();
        MainGame.playSound(25);
        game.time.events.add(2e3, this.finishGame, this, true)
    },
    levelLose: function() {
        this.isLevelCompleted = true;
        if (MainGame.levelNum == 12) {
            this.posCameraEnemy = 2300
        }
        this.updateCamera(2, this.posCameraEnemy);
        var dodik;
        for (var i = 0; i < this.countDodik; i++) {
            dodik = this.arDodiki[i];
            if (dodik.team == 2) dodik.updateAnim(6)
        }
        MainGame.stopMusic();
        MainGame.playSound(26);
        game.time.events.add(2e3, this.finishGame, this, false)
    },
    attackEnemy: function(vNumStiker) {
        if (typeof vNumStiker === "undefined") vNumStiker = 0;
        this.turnNum = 2;
        var dodik;
        var whatDodik = vNumStiker;
        if (MainGame.isDebug) {
            for (var i = 0; i < this.countDodik; i++) {
                dodik = this.arDodiki[i];
                if (dodik.isEnemy()) {
                    if (whatDodik == 1) {
                        break
                    } else {
                        whatDodik--
                    }
                }
            }
        } else {
            for (var i = 0; i < this.countDodik; i++) {
                dodik = this.arDodiki[i];
                if (dodik.isEnemy()) break
            }
        }
        var goalX;
        var goalY;
        var angleAim = 0;
        var powerAim = 0;
        var aimX = dodik.obj.x;
        var aimY = dodik.obj.y - 48;
        var isMinWay = true;
        var delta = 80;
        if (dodik.isDrone) {
            aimY = dodik.obj.y + 25;
            delta = 60
        }
        var arHeroes = [];
        if (this.hero1.isLive) arHeroes.push(this.hero1);
        if (this.hero2.isLive) arHeroes.push(this.hero2);
        if ((MainGame.typeBoat == 2 || MainGame.typeBoat == 3) && this.dog.isLive) arHeroes.push(this.dog);
        if (MainGame.typeBoat == 4 && this.hero3.isLive) arHeroes.push(this.hero3);
        var r = Math.floor(Math.random() * arHeroes.length);
        if (r > 0) isMinWay = false;
        if (dodik.isUpStriker) isMinWay = false;
        goalX = arHeroes[r].obj.x;
        goalY = arHeroes[r].obj.y - 75;
        if (MainGame.typeBoat == 2 && (arHeroes[r].skin == "bear" || arHeroes[r].skin == "greybeard")) goalY += 25;
        this.stepAttack++;
        var awp = 14 - MainGame.levelNum - this.stepAttack;
        if (MainGame.levelNum == 4) awp = Math.round(awp * .8);
        var chanceValue = 10 + this.countMissed * 10 + 2 * (12 - MainGame.levelNum);
        if (MainGame.levelNum < 7) {
            chanceValue += 15
        }
        if (Phaser.Utils.chanceRoll(chanceValue)) {
            awp = MyMath.getRandomInt(1, 3);
            goalX += 5 * MyMath.getRandomInt(-3, 3);
            goalY += 5 * MyMath.getRandomInt(-3, 3)
        }
        if (dodik.isKid) {
            goalX += 20 * MyMath.getRandomInt(-3, 3);
            goalY += 20 * MyMath.getRandomInt(-3, 3)
        }
        if (MainGame.isHardMode) {
            awp = 2 - this.stepAttack
        }
        console.log("isHardMode", MainGame.isHardMode);
        if (awp < 0) awp = 0;
        if (MainGame.isDebug) awp = 0;
        if (isMinWay) {
            goalX += awp * 50;
            goalY += awp * 10
        } else {
            goalX -= awp * 5;
            goalY -= awp * 20
        }
        console.log("go attack", vNumStiker, "stepAttack", this.stepAttack, "awp", awp);
        if (Phaser.Utils.chanceRoll(6)) {
            goalX += 5 * MyMath.getRandomInt(-5, 5);
            goalY += 5 * MyMath.getRandomInt(-5, 5)
        }
        var isReadyStrike = false;
        if (isMinWay) {
            for (var k = 0; k < 20; k += 2) {
                angleAim = -k;
                for (var j = 0; j < 120; j += 10) {
                    powerAim = 200 + j;
                    isReadyStrike = this.checkScope(aimX, aimY, goalX, goalY, angleAim, powerAim, delta);
                    if (isReadyStrike) break
                }
                if (isReadyStrike) break
            }
        } else {
            for (var k = 33; k > 5; k -= 1) {
                angleAim = -k;
                for (var j = -60; j < 100; j += 10) {
                    powerAim = 240 - j;
                    isReadyStrike = this.checkScope(aimX, aimY, goalX, goalY, angleAim, powerAim, delta);
                    if (isReadyStrike) break
                }
                if (isReadyStrike) break
            }
        }
        dodik.goAttack(angleAim, powerAim);
        this.updateCamera(2, dodik.obj.x + 10);
        if (dodik.isDrone) {} else {
            this.setIK(dodik);
            this.enemyDialog(dodik);
            MainGame.playSound(5)
        }
    },
    checkScope: function(vAimX, vAimY, vGoalX, vGoalY, vAngle, vPower, vDelta) {
        var angleDeg = Phaser.Math.degToRad(vAngle);
        var ballX = vAimX - Math.cos(angleDeg) * vDelta;
        var ballY = vAimY + Math.sin(angleDeg) * vDelta;
        var finalAimX = vAimX - Math.cos(angleDeg) * (vDelta + vPower);
        var finalAimY = vAimY + Math.sin(angleDeg) * (vDelta + vPower);
        var launchVelocity = new Phaser.Point(0, 0);
        launchVelocity.x = finalAimX - vAimX;
        launchVelocity.y = finalAimY - vAimY;
        launchVelocity.multiply(4, 4);
        var trajectoryPoint;
        var dist;
        if (MainGame.isDebug) this.layerTest.removeAll();
        var minScopeCount = 40;
        var maxScopeCount = 130;
        if (MainGame.levelNum == 7) {
            minScopeCount = 70;
            maxScopeCount = 160
        } else if (MainGame.levelNum == 11) {
            minScopeCount = 120;
            maxScopeCount = 180
        }
        for (var i = minScopeCount; i < maxScopeCount; i++) {
            trajectoryPoint = this.getTrajectoryPoint(60, ballX, ballY, launchVelocity.x, launchVelocity.y, 0 + i);
            if (MainGame.isDebug) this.addRedPoint(trajectoryPoint.x, trajectoryPoint.y);
            if (trajectoryPoint.y > 650 || trajectoryPoint.x < 10) {
                break
            } else {
                dist = Math.floor(Phaser.Math.distance(vGoalX, vGoalY, trajectoryPoint.x, trajectoryPoint.y));
                if (dist < 17) {
                    isReadyStrike = true;
                    if (MainGame.isDebug) {
                        console.log("checkScope:", i, "dist", dist)
                    }
                    return true
                }
            }
        }
        return false
    },
    addRedPoint: function(vX, vY) {
        var obj = this.layerTest.add(game.add.image(vX, vY, "ss_main2", "aimball_0000"));
        obj.scale.setTo(.5);
        obj.anchor.setTo(.5)
    },
    aimEnemy: function(vIsTopor, vAngle) {
        this.targetIK1.target.y = 30 - vAngle * .544;
        this.lastTargetPosC1 = this.targetIK1.target.y;
        this.targetIK2.target.y = 55 - vAngle * .9;
        this.lastTargetPosC2 = this.targetIK2.target.y
    },
    strikeEnemy: function(vIsTopor, vX, vY, vAngle, vPower, vSkin) {
        switch (MainGame.levelNum) {
            case 1:
            case 5:
            case 8:
            case 9:
            case 12:
                this.typeGun = 4;
                MainGame.playSound(28);
                break;
            case 2:
            case 3:
            case 4:
                this.typeGun = 5;
                MainGame.playSound(28);
                break;
            case 6:
                this.typeGun = 6;
                MainGame.playSound(19);
                break;
            case 7:
                if (vSkin == "f8") {
                    this.typeGun = 5
                } else {
                    this.typeGun = 7
                }
                MainGame.playSound(28);
                break;
            case 10:
                this.typeGun = 9;
                MainGame.playSound(28);
                break;
            case 11:
                this.typeGun = 10;
                this.ball.frameName = "ball3_0000";
                this.ball.body.fixedRotation = false;
                this.ball.body.angularVelocity = -15;
                MainGame.playSound(28);
                break
        }
        var aimX = vX - 10;
        var aimY = vY - 55;
        var delta = 80;
        if (vSkin == "drone") {
            this.typeGun = 8;
            aimY = vY + 25;
            delta = 60
        } else {
            this.targetIK1.target.y = this.lastTargetPosC1;
            this.targetIK2.target.y = this.lastTargetPosC2
        }
        var angleDeg = Phaser.Math.degToRad(vAngle);
        var ballX = aimX - Math.cos(angleDeg) * delta;
        var ballY = aimY + Math.sin(angleDeg) * delta;
        var finalAimX = aimX - Math.cos(angleDeg) * (delta + vPower);
        var finalAimY = aimY + Math.sin(angleDeg) * (delta + vPower);
        var launchVelocity = new Phaser.Point(0, 0);
        launchVelocity.x = finalAimX - aimX;
        launchVelocity.y = finalAimY - aimY;
        launchVelocity.multiply(4, 4);
        if (this.typeGun == 4 || this.typeGun == 5 || this.typeGun == 7 || this.typeGun == 8 || this.typeGun == 9 || this.typeGun == 10) {
            var effectPukX = aimX - Math.cos(angleDeg) * (delta + 20);
            var effectPukY = aimY + Math.sin(angleDeg) * (delta + 20);
            var strikeEffect = this.addEffect(4, this.layerEffect, effectPukX, effectPukY, .6);
            strikeEffect.angle = -vAngle;
            strikeEffect.scale.x = -1
        }
        this.prepareShoot(ballX, ballY, launchVelocity);
        var timeShield = Math.floor(1600 - Math.abs(launchVelocity.x));
        if (timeShield < 100) timeShield = 100;
        game.time.events.add(timeShield, this.shieldBeReady, this, true)
    },
    hitBallGround: function(body1, body2, fixture1, fixture2, begin, contact) {
        if (!begin) return;
        contact.GetWorldManifold(this.worldManifold);
        if (this.worldManifold.points.length == 0) return;
        var point = this.worldManifold.points[0];
        var pX = -point.x * game.physics.box2d.ptmRatio;
        var pY = -point.y * game.physics.box2d.ptmRatio;
        var ballVlc = Math.abs(body2.velocity.x) + Math.abs(body2.velocity.y);
        if (this.typeGun == 1) {
            if (ballVlc > 250) MainGame.playSound(7)
        }
        if (this.typeGun == 2 || this.typeGun == 10 || this.typeGun == 100) {
            this.boomBomb(body2.x, body2.y, this.typeGun);
            if (body1.link && body1.link.typeObj) {
                if (body1.link.typeObj == "whale") {
                    this.kickWhale()
                }
            }
        } else {
            if (ballVlc > 320 && this.timerSfxHitBall <= 0) {
                MainGame.playSound(23);
                this.timerSfxHitBall = 100
            }
            if (body1.link && body1.link.typeObj) {
                if (body1.link.typeObj == "shark") {
                    this.shark.animations.play("attack", 30, false);
                    MainGame.playSound(1);
                    body2.velocity.y = -350;
                    if (Math.abs(this.ball.body.velocity.x) < 30) {
                        if (this.ball.body.velocity.x > 0) {
                            body2.velocity.x = MyMath.getRandomInt(30, 60)
                        } else {
                            body2.velocity.x = MyMath.getRandomInt(30, 60) * -1
                        }
                    }
                } else if (body1.link.typeObj == "hippo") {
                    this.hippo.animations.play("attack", 30, false);
                    MainGame.playSound(1);
                    body2.velocity.y = -350;
                    if (Math.abs(body2.velocity.x) < 10) {
                        if (this.ball.body.velocity.x > 0) {
                            body2.velocity.x = MyMath.getRandomInt(30, 60)
                        } else {
                            body2.velocity.x = MyMath.getRandomInt(30, 60) * -1
                        }
                    }
                } else if (body1.link.typeObj == "decor") {
                    body1.link.setAnimationByName(0, "kick", false);
                    body1.link.addAnimationByName(0, "idle", true);
                    this.addEffect(3, this.layerEffect, pX, pY)
                } else if (body1.link.typeObj == "banka") {
                    this.addEffect(3, this.layerEffect, pX, pY);
                    body1.velocity.x += 50
                } else if (body1.link.typeObj == "gull") {
                    this.gull.animations.play("kick", 30, true);
                    this.addEffect(3, this.layerEffect, pX, pY);
                    body1.velocity.x = 80;
                    body1.velocity.y = -350;
                    game.time.events.add(300, this.gullTimerKick, this, true)
                } else if (body1.link.typeObj == "bird") {
                    if (!this.birdKicked) {
                        this.bird.animations.play("fly", 30, true);
                        this.addEffect(3, this.layerEffect, pX, pY);
                        this.kickBird(body2.velocity.x)
                    }
                }
            }
        }
    },
    gullTimerKick: function() {
        this.gull.body.sensor = true
    },
    updateGull: function() {
        if (this.gull.body.sensor && this.gull.water) {
            if (this.gull.body.y > 500) {
                var r = 21 + MyMath.getRandomInt(0, 1);
                MainGame.playSound(r);
                this.addEffect(2, this.layerEffect, this.gull.body.x, this.gull.body.y - 20);
                this.gull.water = false
            }
        }
    },
    checkWhale: function() {
        if (this.hpWhale <= 0) {
            var result = this.calculateScore();
            var s_earned = result[4];
            MainGame.coins += s_earned;
            MainGame.saveSaves(1);
            MainGame.comicsNum = 8;
            MainGame.goToState("Comics");
            return
        }
        this.dronesDestroyed = true;
        this.whaleKicked = false;
        this.timeToStrikeAgain();
        this.layerAimPointsOld.visible = true
    },
    showWhaleDamage: function() {
        this.updateCamera(2, 4e3);
        this.isCropingTime = true;
        this.newWidth = 200 * (this.hpWhale / 300);
        this.whale_miniicon.cropRect.width = 32 * (this.hpWhale / 300);
        this.whale_miniicon.bar2.updateCrop();
        var _this = this;
        game.add.tween(this.whale_hpbar.cropRect).to({
            width: this.newWidth
        }, 800, "Linear", true, 500)
    },
    updateWhale: function() {
        if (this.isCropingTime) {
            this.whale_hpbar.bar2.updateCrop();
            if (this.whale_hpbar.cropRect.width == this.newWidth) {
                this.isCropingTime = false
            }
        }
    },
    kickWhale: function() {
        if (MainGame.levelNum == 12) {
            if (this.typeGun == 100 && !this.whaleKicked) {
                this.hpWhale -= 100;
                this.whaleKicked = true
            }
        }
    },
    testDrone: function() {
        this.drone1.getDamage(1e3);
        this.drone2.getDamage(1e3);
        this.drone3.getDamage(1e3)
    },
    hitBall: function(body1, body2, fixture1, fixture2, begin, contact) {
        if (!begin) return;
        if (body1.link && body2.link) {
            if (body1.link.typeObj == "dodik") {
                if (body2.link.typeObj == "ball") {
                    var ballVlc = Math.abs(body2.velocity.x) + Math.abs(body2.velocity.y);
                    var telo = body1.link;
                    if (telo.ballHitted > 0 || ballVlc < 100) return;
                    contact.GetWorldManifold(this.worldManifold);
                    if (this.worldManifold.points.length == 0) return;
                    if (ballVlc > 250) {
                        if (this.typeGun == 1) {
                            MainGame.playSound(7);
                            body2.velocity.x *= .6;
                            body2.velocity.y *= .6
                        } else {
                            if (this.typeGun == 1 || this.typeGun == 2 || this.typeGun == 10 || this.typeGun == 100) {} else {
                                MainGame.playSound(23)
                            }
                        }
                    }
                    var point = this.worldManifold.points[0];
                    var pX = -point.x * game.physics.box2d.ptmRatio;
                    var pY = -point.y * game.physics.box2d.ptmRatio;
                    if (this.typeGun == 2 || this.typeGun == 10 || this.typeGun == 100) {
                        this.boomBomb(body2.x, body2.y, this.typeGun);
                        return
                    }
                    var isHead = false;
                    if (telo.isDrone) {
                        body1.velocity.y += 40
                    } else {
                        if (body1.y - pY > 70) {
                            isHead = true
                        }
                        if (ballVlc > 50) body1.velocity.y = -210;
                        if (telo.skin == "bear" || telo.skin == "greybeard") {
                            body1.velocity.y -= 105;
                            body1.velocity.x -= 90;
                            body1.sensor = true
                        }
                    }
                    telo.updateAnim(4);
                    this.addEffect(3, this.layerEffect, pX, pY);
                    var dmg = Math.floor(ballVlc / 50) + 5;
                    if (isHead) {
                        dmg *= 1.3;
                        if (this.turnNum == 2 && MainGame.typeViking >= 1) {
                            dmg *= .75
                        }
                    } else {
                        if (this.turnNum == 2 && MainGame.typeViking == 2) {
                            dmg *= .75
                        }
                    }
                    if (this.typeGun == 6) dmg *= 1.2;
                    telo.getDamage(Math.floor(dmg));
                    if (telo.team == 1) {
                        if (isHead) {
                            this.playVoiceGroup(2)
                        } else {
                            this.playVoiceGroup(1)
                        }
                    } else {
                        if (isHead) {
                            this.playVoiceGroup(5)
                        } else {
                            this.playVoiceGroup(7)
                        }
                    }
                    this.updateCamera(1, 0, telo.obj)
                }
            }
        }
    },
    hitDodik: function(body1, body2, fixture1, fixture2, begin, contact) {
        if (!begin) return;
        if (this.isTimeAim) return;
        if (body1.link && body2.link) {
            if (body2.link.typeObj == "dodik") {
                if (body1.link.typeObj == "dodik") {
                    var telo = body2.link;
                    if (telo.status == 0) {
                        telo.status = 1;
                        telo.getDamage(15);
                        telo.updateAnim(4)
                    }
                }
            }
        }
    },
    activateBall: function(vBall, vX, vY, vVelX, vVelY) {
        vBall.visible = true;
        if (this.turnNum == 1) {
            vBall.body.sensor = false
        } else {
            vBall.body.sensor = true
        }
        vBall.body.angle = 0;
        vBall.body.x = vX;
        vBall.body.y = vY;
        vBall.body.velocity.x = vVelX;
        vBall.body.velocity.y = vVelY;
        vBall.body.gravityScale = 1;
        vBall.status = 1
    },
    setBallSensor: function() {
        if (this.ball.visible) this.ball.body.sensor = false;
        if (this.ball1.visible) this.ball1.body.sensor = false;
        if (this.ball2.visible) this.ball2.body.sensor = false;
        if (this.ball3.visible) this.ball3.body.sensor = false
    },
    prepareShoot: function(vX, vY, vLaunchVelocity) {
        if (this.isFirstStike) {
            for (var i = 0; i < this.countDodik; i++) this.arDodiki[i].initStartPos();
            this.isFirstStike = false
        }
        if (this.typeGun == 3 || this.typeGun == 8 || this.typeGun == 9) {
            this.isHitWater = 3;
            this.activateBall(this.ball1, vX, vY, vLaunchVelocity.x, vLaunchVelocity.y);
            this.activateBall(this.ball2, vX, vY, vLaunchVelocity.x - 50, vLaunchVelocity.y + 20);
            this.activateBall(this.ball3, vX, vY, vLaunchVelocity.x - 100, vLaunchVelocity.y + 40);
            this.updateCamera(1, 0, this.ball1)
        } else {
            this.isHitWater = 1;
            this.activateBall(this.ball, vX, vY, vLaunchVelocity.x, vLaunchVelocity.y);
            this.ball.body.mass = .35;
            this.updateCamera(1, 0, this.ball)
        }
        game.time.events.add(250, this.setBallSensor, this, true);
        switch (this.typeGun) {
            case 0:
                this.ball.frameName = "ball1_0000";
                this.ball.body.fixedRotation = false;
                this.ball.body.angularVelocity = 10;
                this.ball.body.restitution = .4;
                if (this.turnNum != 1) this.ball.body.angularVelocity *= -1;
                break;
            case 1:
                this.ball.frameName = "grenade_0000";
                this.ball.body.fixedRotation = false;
                this.ball.body.angularVelocity = 10;
                this.ball.body.restitution = .22;
                this.ball.body.mass = .52;
                game.time.events.add(3e3, this.timeGranata, this, true);
                game.time.events.add(1e3, this.tickGrenade, this, true);
                game.time.events.add(1500, this.tickGrenade, this, true);
                game.time.events.add(2e3, this.tickGrenade, this, true);
                game.time.events.add(2500, this.tickGrenade, this, true);
                MainGame.countGranat--;
                this.textGranat.setText(MainGame.countGranat);
                break;
            case 2:
                this.ball.frameName = "rocket_0000";
                this.ball.body.fixedRotation = false;
                this.ball.body.angularVelocity = 10;
                this.ball.body.restitution = .18;
                this.ball.body.mass = .65;
                game.time.events.repeat(100, 20, this.createTrail, this);
                MainGame.countRocket--;
                this.textRocket.setText(MainGame.countRocket);
                break;
            case 100:
                this.ball.frameName = "rocket2_0000";
                this.ball.body.fixedRotation = false;
                this.ball.body.angularVelocity = 10;
                this.ball.body.restitution = .18;
                this.ball.body.mass = .65;
                game.time.events.repeat(100, 20, this.createTrail, this);
                break;
            case 3:
                this.ball1.frameName = "ball7_0000";
                this.ball1.body.fixedRotation = false;
                this.ball1.body.angularVelocity = 10;
                this.ball1.body.restitution = .25;
                this.ball1.body.mass = .2;
                this.ball2.frameName = "ball7_0000";
                this.ball2.body.fixedRotation = false;
                this.ball2.body.angularVelocity = 10;
                this.ball2.body.restitution = .25;
                this.ball2.body.mass = .2;
                this.ball3.frameName = "ball7_0000";
                this.ball3.body.fixedRotation = false;
                this.ball3.body.angularVelocity = 10;
                this.ball3.body.restitution = .25;
                this.ball3.body.mass = .2;
                MainGame.countBalls3--;
                this.textBalls3.setText(MainGame.countBalls3);
                break;
            case 4:
                this.ball.frameName = "ball2_0000";
                this.ball.body.fixedRotation = false;
                this.ball.body.angularVelocity = -15;
                break;
            case 5:
                this.ball.frameName = "ball5_0000";
                this.ball.body.fixedRotation = false;
                this.ball.body.angularVelocity = -15;
                break;
            case 6:
                this.ball.frameName = "hammer1_0000";
                this.ball.body.fixedRotation = false;
                this.ball.body.angularVelocity = -8;
                break;
            case 7:
                this.ball.frameName = "ball7_0000";
                this.ball.body.fixedRotation = false;
                this.ball.body.angularVelocity = -15;
                this.ball3.body.mass = .2;
                break;
            case 8:
                this.ball1.frameName = "ball6_0000";
                this.ball1.body.fixedRotation = false;
                this.ball1.body.angularVelocity = -10;
                this.ball1.body.restitution = .25;
                this.ball1.body.mass = .2;
                this.ball2.frameName = "ball6_0000";
                this.ball2.body.fixedRotation = false;
                this.ball2.body.angularVelocity = -10;
                this.ball2.body.restitution = .25;
                this.ball2.body.mass = .2;
                this.ball3.frameName = "ball6_0000";
                this.ball3.body.fixedRotation = false;
                this.ball3.body.angularVelocity = -10;
                this.ball3.body.restitution = .25;
                this.ball3.body.mass = .2;
                break;
            case 9:
                this.ball1.frameName = "ball7_0000";
                this.ball1.body.fixedRotation = false;
                this.ball1.body.angularVelocity = -10;
                this.ball1.body.restitution = .25;
                this.ball1.body.mass = .2;
                this.ball2.frameName = "ball7_0000";
                this.ball2.body.fixedRotation = false;
                this.ball2.body.angularVelocity = -10;
                this.ball2.body.restitution = .25;
                this.ball2.body.mass = .2;
                this.ball3.frameName = "ball7_0000";
                this.ball3.body.fixedRotation = false;
                this.ball3.body.angularVelocity = -10;
                this.ball3.body.restitution = .25;
                this.ball3.body.mass = .2;
                break
        }
    },
    createTrail: function() {
        if (this.ball.visible) this.addEffect(5, this.layerEffect, this.ball.x - 15, this.ball.y)
    },
    onAnimCompleteAnimal: function(sprite, animation) {
        if (animation.name === "attack") {
            sprite.animations.play("swim", 30, true)
        }
    },
    boomBomb: function(vX, vY, vType) {
        if (!this.ball.visible) return;
        var maxDistance = 250;
        var dist;
        var dodik;
        var pW = {
            x: vX,
            y: vY
        };
        var force = 0;
        for (var i = 0; i < this.countDodik; i++) {
            dodik = this.arDodiki[i];
            dist = Math.floor(Phaser.Math.distance(vX, vY, dodik.obj.x, dodik.obj.y - 50));
            if (dist < maxDistance) {
                force = (350 - dist) * 4;
                if (vType == 10) force *= .52;
                if (vX - dodik.obj.x > 0) force *= -1;
                dodik.body.applyForce(force, pW);
                dodik.body.velocity.y = -(300 - dist);
                dodik.updateAnim(4);
                var damageCount = Math.floor(Math.abs(force) * .09);
                if (vType == 1) {
                    damageCount = Math.floor(damageCount * .85)
                } else if (vType == 2) {
                    damageCount = Math.floor(damageCount * .75)
                } else if (vType == 10) {
                    damageCount = Math.floor(damageCount * .85)
                }
                dodik.getDamage(damageCount)
            }
        }
        if (this.gull) {
            dist = Math.floor(Phaser.Math.distance(vX, vY, this.gull.x, this.gull.y));
            if (dist < maxDistance) {
                this.gull.animations.play("kick", 30, true);
                this.addEffect(3, this.layerEffect, this.gull.x, this.gull.y);
                this.gull.body.velocity.x += 50;
                this.gull.body.velocity.y = -270;
                game.time.events.add(300, this.gullTimerKick, this, true)
            }
        }
        if (this.bird) {
            dist = Math.floor(Phaser.Math.distance(vX, vY, this.bird.x, this.bird.y));
            if (dist < maxDistance) {
                this.bird.animations.play("fly", 30, true);
                this.addEffect(3, this.layerEffect, this.bird.x, this.bird.y);
                this.kickBird(1500)
            }
        }
        this.addEffect(1, this.layerEffect, vX, vY);
        MainGame.playSound(6);
        game.camera.flash(16777215, 300);
        this.goShake();
        this.stopBall(this.ball)
    },
    goShake: function() {
        var properties = {
            x: MyMath.getRandomInt(-5, 5),
            y: -MyMath.getRandomInt(-5, 5)
        };
        var duration = 50;
        var repeat = 1;
        var ease = Phaser.Easing.Bounce.InOut;
        var autoStart = true;
        var delay = 0;
        var yoyo = true;
        game.add.tween(this.layerEffect).to(properties, duration, ease, autoStart, delay, repeat, yoyo)
    },
    showPanel: function() {
        this.layerPanelTurn.visible = true;
        this.layerPanelTurn.x = -250;
        game.add.tween(this.layerPanelTurn).to({
            x: -110
        }, 500, "Back.easeOut", true, 100);
        if (MainGame.levelNum == 0) return;
        this.layerWeapon.visible = true;
        if (this.lastTypeGun == 1 && MainGame.countGranat == 0) {
            this.krutilka.x = this.btnBall1.x;
            this.krutilka.y = this.btnBall1.y;
            this.typeGun = 0
        }
        if (this.lastTypeGun == 2 && MainGame.countRocket == 0) {
            this.krutilka.x = this.btnBall1.x;
            this.krutilka.y = this.btnBall1.y;
            this.typeGun = 0
        }
        if (this.lastTypeGun == 3 && MainGame.countBalls3 == 0) {
            this.krutilka.x = this.btnBall1.x;
            this.krutilka.y = this.btnBall1.y;
            this.typeGun = 0
        }
    },
    inputStageDown: function(pointer) {
        if (this.isLevelCompleted || this.isPaused) return;
        if (MainGame.isDebug && this.gameStatus == 1) {}
        if (this.game.input.worldY < 110) return;
        if (this.turnNum != 1) return;
        if (this.isShooted) return;
        this.isInputPress = true;
        if (this.gameStatus == 0) {
            this.layerText.removeAll();
            this.updateCamera(100, 300);
            this.gameStatus = 1;
            var time = this.timeToStart;
            game.time.events.add(time, this.showPanel, this, true);
            game.time.events.add(time + 300, this.sayDialog1, this, true);
            game.time.events.add(time + 2900, this.sayDialog2, this, true)
        } else if (this.gameStatus == 1) {
            this.striker.updateAnim(0);
            this.striker.readyToShoot = true;
            this.gameStatus = 2;
            for (var i = 0; i < this.countDodik; i++) this.arDodiki[i].initStartPos();
            this.updateSimon();
            this.showAimCircle()
        } else if (this.gameStatus == 3) {
            this.updateCamera(2, 300);
            this.gameStatus = 4
        } else if (this.gameStatus == 4) {
            this.gameStatus = 2;
            this.isTimeAim = true
        }
        if (this.isTimeAim) {
            this.showAimCircle()
        } else {
            this.aimCircle.visible = false
        }
    },
    showAimCircle: function() {
        this.inputPointDown.x = this.game.input.worldX;
        this.inputPointDown.y = this.game.input.worldY;
        this.aimCircle.visible = true;
        this.aimCircle.x = this.inputPointDown.x;
        this.aimCircle.y = this.inputPointDown.y
    },
    inputStageUp: function() {
        if (this.game.input.x < 10 || this.game.input.y < 10 || this.game.input.y > game.height - 10) {
            this.aimCircle.visible = false;
            this.layerAimPointsNew.visible = false;
            this.isInputPress = false;
            return
        }
        if (this.isLevelCompleted || this.isPaused) return;
        if (this.game.input.worldY < 150) return;
        if (!this.isInputPress || !this.isTimeAim) return;
        if (this.turnNum != 1) return;
        if (this.isShooted) return;
        if (this.turnNum == 1 && this.isTimeAim) {
            this.aimCircle.visible = false
        }
        if (this.distanceAim > this.DISTANCE_FOR_AIM) {
            this.isShooted = true;
            this.layerAimPointsNew.visible = false;
            this.layerAimPointsOld.visible = false;
            this.layerArrowOld.angle = this.layerArrow.angle;
            for (var i = 0; i < 10; i++) {
                this.arBallPathLast[i].x = this.arBallPath[i].x;
                this.arBallPathLast[i].y = this.arBallPath[i].y
            }
            this.striker.updateAnim(1);
            this.targetIK1.target.y = this.lastTargetPosP1;
            this.targetIK2.target.y = this.lastTargetPosP2;
            var angleDeg = Phaser.Math.degToRad(this.angleDeg);
            var ballX = this.aimX + Math.cos(angleDeg) * 120;
            var ballY = this.aimY + Math.sin(angleDeg) * 120;
            var strikeEffect = this.addEffect(4, this.layerEffect, ballX, ballY, .6);
            strikeEffect.angle = this.layerArrow.angle;
            this.isTimeAim = false;
            this.isInputPress = false;
            this.lastTypeGun = this.typeGun;
            if (this.typeGun == 0) MainGame.playSound(28);
            if (this.typeGun == 1) MainGame.playSound(8);
            if (this.typeGun == 2) MainGame.playSound(17);
            if (this.typeGun == 3) MainGame.playSound(28);
            if (this.typeGun == 100) MainGame.playSound(17);
            this.playVoiceGroup(4);
            this.prepareShoot(ballX, ballY, this.launchVelocity);
            this.striker.setEmptyRocket();
            this.layerPanelTurn.visible = false;
            this.layerWeapon.visible = false;
            this.stat_shots++
        }
    },
    updateAiminInfo: function(vX, vY, vAngle, vDistance) {
        var power = Math.floor(vDistance / 3.75);
        this.textPowerAiming1.setText(power + "%");
        this.textPowerAiming2.setText(power + "%");
        var midXdot = (this.dotPoint10.x - this.dotPoint1.x) * .5;
        var midYdot = (this.dotPoint10.y - this.dotPoint1.y) * .5;
        this.layerInfoPower.x = this.dotPoint1.x + midXdot;
        this.layerInfoPower.y = this.dotPoint1.y + midYdot;
        this.layerInfoPower.angle = vAngle
    },
    updateArrow: function() {
        if (this.layerArrow.angle == undefined) this.layerArrow.angle = 0;
        if (this.game.input.worldY < 110) return;
        var inpX1 = this.inputPointDown.x;
        var inpY1 = this.inputPointDown.y;
        var inpX2 = this.game.input.worldX;
        var inpY2 = this.game.input.worldY;
        if (inpX1 < inpX2) return;
        this.aimCircle.visible = true;
        var distance = Phaser.Math.distance(inpX1, inpY1, inpX2, inpY2);
        if (distance > 375) distance = 375;
        var d = 25;
        var count = Math.ceil(distance / d);
        var angleRad = Math.atan2(inpY1 - inpY2, inpX1 - inpX2);
        var angleDeg = angleRad * 57.295;
        if (angleDeg > 28) {
            angleDeg = 28
        } else if (angleDeg < -40) {
            angleDeg = -40
        }
        this.layerArrow.angle = angleDeg;
        this.angleDeg = angleDeg;
        this.distanceAim = distance;
        var fAngleRad = Phaser.Math.degToRad(this.angleDeg);
        var ballX = this.aimX + Math.cos(fAngleRad) * 120;
        var ballY = this.aimY + Math.sin(fAngleRad) * 120;
        var finalAimX = this.aimX + Math.cos(fAngleRad) * this.distanceAim;
        var finalAimY = this.aimY + Math.sin(fAngleRad) * this.distanceAim;
        var pM = 5;
        this.launchVelocity.x = finalAimX - this.aimX;
        this.launchVelocity.y = finalAimY - this.aimY;
        this.launchVelocity.multiply(pM, pM);
        if (MainGame.showPath) {
            var p;
            for (var i = 0; i < 10; i++) {
                p = this.arBallPath[i];
                var trajectoryPoint = this.getTrajectoryPoint(100, ballX, ballY, this.launchVelocity.x, this.launchVelocity.y, p.num);
                p.x = trajectoryPoint.x;
                p.y = trajectoryPoint.y;
                if (i == 0) {
                    this.dotPoint1.x = p.x;
                    this.dotPoint1.y = p.y
                } else if (i == 9) {
                    this.dotPoint10.x = p.x;
                    this.dotPoint10.y = p.y
                }
            }
        }
        this.updateAiminInfo(this.aimX, this.aimY, angleDeg, distance);
        if (this.distanceAim < this.DISTANCE_FOR_AIM) {
            this.layerAimPointsNew.visible = false
        } else {
            this.layerAimPointsNew.visible = true
        }
    },
    heroDialog: function(vHero) {
        var r = Math.floor(Math.random() * 10);
        vHero.showDialog(1, MainGame.GAME_TEXT["pain_talk" + r])
    },
    enemyDialog: function(vHero) {
        var r = Math.floor(Math.random() * 9);
        vHero.showDialog(0, MainGame.GAME_TEXT["enemy_talk" + r])
    },
    sayDialog1: function() {
        this.hero1.showDialog(0, MainGame.GAME_TEXT["start_brother_talkRW2_" + MainGame.levelNum])
    },
    sayDialog2: function() {
        this.hero2.showDialog(0, MainGame.GAME_TEXT["start_simon_talkRW2_" + MainGame.levelNum]);
        this.isSimonTalked = true
    },
    soundEnvironment: function() {
        if (Phaser.Utils.chanceRoll(7)) {
            var r = 11 + MyMath.getRandomInt(0, 5);
            MainGame.playSound(r)
        }
    },
    tickGrenade: function() {
        if (this.ball.visible) MainGame.playSound(9)
    },
    timeGranata: function() {
        this.boomBomb(this.ball.x, this.ball.y, this.typeGun)
    },
    dodikUtonul: function(vTema, vX, vY) {
        if (vTema == 2) {
            this.stepAttack++;
            this.playVoiceGroup(6);
            this.stat_enemy++
        } else {
            this.playVoiceGroup(0)
        }
        var r = 21 + MyMath.getRandomInt(0, 1);
        MainGame.playSound(r);
        this.addEffect(2, this.layerEffect, vX, vY)
    },
    stopBall: function(vBall, vIsWater) {
        if (typeof vIsWater === "undefined") vIsWater = false;
        if (this.isHitWater == 0) return;
        this.isHitWater--;
        if (vBall.visible && vIsWater && !vBall.body.sensor) {
            this.addEffect(2, this.layerEffect, vBall.body.x, vBall.body.y);
            MainGame.playSound(20)
        }
        vBall.visible = false;
        vBall.status = 0;
        vBall.body.gravityScale = 0;
        vBall.body.velocity.x = 0;
        vBall.body.velocity.y = 0;
        vBall.body.angularVelocity = 0;
        vBall.body.angularDamping = 0;
        vBall.body.sensor = true;
        vBall.body.y = -100;
        vBall.body.x = -100;
        if (this.isHitWater == 0) {
            game.time.events.add(1e3, this.goStartCheckDodiki, this, true);
            if (MainGame.levelNum > 0) {
                this.layerHpBars.visible = true;
                if (this.turnNum == 2 && this.isOpponentMiss) {
                    if (this.isOpponentMiss) {
                        this.playVoiceGroup(8);
                        this.countMissed++
                    } else {
                        this.countMissed = 0
                    }
                }
            }
        }
    },
    opponentGetDmg: function() {
        this.isOpponentMiss = false
    },
    goStartCheckDodiki: function() {
        this.isCanStartCheck = true;
        if (MainGame.isAPI) {
            MainGame.API_POKI.gameplayStop();
            MainGame.API_POKI.destroyAd();
            MainGame.API_POKI.displayAd()
        }
    },
    getTrajectoryPoint: function(vTime, startX, startY, velocityX, velocityY, n) {
        var t = 1 / vTime;
        var stepVelocityX = t * game.physics.box2d.pxm(-velocityX);
        var stepVelocityY = t * game.physics.box2d.pxm(-velocityY);
        var stepGravityX = t * t * game.physics.box2d.pxm(-game.physics.box2d.gravity.x);
        var stepGravityY = t * t * game.physics.box2d.pxm(-game.physics.box2d.gravity.y);
        startX = game.physics.box2d.pxm(-startX);
        startY = game.physics.box2d.pxm(-startY);
        var tpx = startX + n * stepVelocityX + .5 * (n * n + n) * stepGravityX;
        var tpy = startY + n * stepVelocityY + .5 * (n * n + n) * stepGravityY;
        tpx = game.physics.box2d.mpx(-tpx);
        tpy = game.physics.box2d.mpx(-tpy);
        return {
            x: tpx,
            y: tpy
        }
    },
    checkSleep: function() {
        var cD = this.countDodik;
        for (var i = 0; i < this.countDodik; i++) {
            dodik = this.arDodiki[i];
            if (dodik.isLive) {
                if (Math.abs(dodik.body.velocity.x) < 3 && Math.abs(dodik.body.velocity.y) < 3) {
                    cD--
                }
            } else {
                cD--
            }
        }
        if (cD == 0) {
            this.isCanStartCheck = false;
            this.checkDodiki()
        }
    },
    render: function() {},
    update: function() {
        if (MainGame.showFPS) MainGame.textFPS.setText("FPS: " + game.time.fps);
        this.layerBack2.x = game.camera.x * .2;
        this.layerBack3.x = game.camera.x * .6;
        this.waveCount += .06;
        if (this.timerSfxHitBall > 0) this.timerSfxHitBall--;
        for (var i = 0; i < this.waveArCount; i++) {
            this.waveAr[i].y = this.waveAr[i].startY + Math.sin(this.waveCount) * 2.6
        }
        if (this.isCanStartCheck) this.checkSleep();
        for (var i = 0; i < this.countDodik; i++) {
            this.arDodiki[i].update(this.waveCount)
        }
        if (this.shark) {
            if (this.flagShark) {
                this.shark.body.velocity.x = -90;
                if (this.shark.body.x < -800) {
                    this.flagShark = false;
                    this.shark.scale.x = -1
                }
            } else {
                this.shark.body.velocity.x = 90;
                if (this.shark.body.x > 2700) {
                    this.flagShark = true;
                    this.shark.scale.x = 1
                }
            }
            this.shark.x = this.shark.body.x + 500
        }
        if (this.gull) {
            this.updateGull()
        }
        if (!this.isLevelCompleted) {
            if (this.isHitWater > 0) {
                if (this.ball.visible) {
                    if (this.typeGun == 2 || this.typeGun == 10 || this.typeGun == 100) {
                        var flyingAngle = Math.atan2(this.ball.body.velocity.y, this.ball.body.velocity.x);
                        this.ball.body.angle = Phaser.Math.radToDeg(flyingAngle)
                    }
                    this.updateBall(this.ball)
                }
                if (this.ball1.visible) this.updateBall(this.ball1);
                if (this.ball2.visible) this.updateBall(this.ball2);
                if (this.ball3.visible) this.updateBall(this.ball3)
            }
            if (this.turnNum == 1 && this.isTimeAim) {
                if (game.input.activePointer.isDown) {
                    this.updateArrow();
                    this.targetIK1.target.y = 30 - this.layerArrow.angle * .544;
                    this.targetIK2.target.y = 55 - this.layerArrow.angle * .9;
                    this.lastTargetPosP1 = this.targetIK1.target.y;
                    this.lastTargetPosP2 = this.targetIK2.target.y
                }
            }
            if (MainGame.levelNum == 12) {
                this.updateWhale()
            } else if (MainGame.levelNum == 0) {
                if (this.banka.visible && this.banka.body.y > 500) {
                    this.addEffect(2, this.layerEffect, this.banka.body.x, this.banka.body.y);
                    this.banka.visible = false
                }
            }
        }
    },
    updateBall: function(vBall) {
        if (vBall.status > 0) {
            if (Math.abs(vBall.body.velocity.x) < 35 && Math.abs(vBall.body.velocity.y) < 20) {
                vBall.body.sensor = true
            }
        }
        if (vBall.body.y > 494) {
            this.stopBall(vBall, true)
        } else if (vBall.body.x > this.level_width) {
            this.stopBall(vBall)
        }
    },
    helicopterEscape: function() {
        game.add.tween(this.helicopterGroup).to({
            angle: -10
        }, 900, "Linear", true, 0);
        game.add.tween(this.helicopterGroup).to({
            x: 700
        }, 2e3, "Back.easeIn", true, 0);
        game.add.tween(this.helicopterGroup).to({
            startY: -400
        }, 2e3, "Linear", true, 600)
    },
    testStrike: function(vBtn) {
        this.attackEnemy(vBtn.id)
    },
    clickMoveMap1: function() {
        game.camera.x -= 150
    },
    clickMoveMap2: function() {
        game.camera.x += 150
    },
    clickFlyHelicopter: function() {
        this.helicopterEscape()
    },
    clickLevelMenu: function() {
        if (MainGame.levelNum == 8) {
            MainGame.comicsNum = 5;
            MainGame.goToState("Comics")
        } else {
            MainGame.goToState("ScreenLevel")
        }
        if (MainGame.isAPI) MainGame.API_POKI.commercialBreak()
    },
    clickShop: function() {
        MainGame.goToState("ScreenShop");
        if (MainGame.isAPI) MainGame.API_POKI.commercialBreak()
    },
    clickReplay: function() {
        MainGame.goToState("Game")
    },
    clickMenu: function() {
        MainGame.goToState("Menu")
    },
    clickTestWin: function() {
        MainGame.state.finishGame(true)
    },
    clickTestLose: function() {
        MainGame.state.finishGame(false)
    },
    clickPause: function() {
        this.pauseGame()
    },
    onPause: function() {
        if (!MainGame.state.isPaused) {
            MainGame.state.pauseGame()
        }
    },
    addEffect: function(vNum, vLayer, vX, vY, vAnchorX, vAnchorY) {
        if (typeof vAnchorX === "undefined") vAnchorX = .5;
        if (typeof vAnchorY === "undefined") vAnchorY = .5;
        var cframes = [15, 16, 12, 14, 14];
        var obj;
        var nameEffect;
        switch (vNum) {
            case 1:
                nameEffect = "e1";
                break;
            case 2:
                nameEffect = "e2";
                break;
            case 3:
                nameEffect = "e3";
                break;
            case 4:
                nameEffect = "e4";
                break;
            case 5:
                nameEffect = "e5";
                break
        }
        obj = vLayer.add(game.add.sprite(vX, vY, "ss_main2"));
        obj.anchor.setTo(vAnchorX, vAnchorY);
        obj.animations.add(nameEffect, Phaser.Animation.generateFrameNames(nameEffect + "_", 0, cframes[vNum - 1], "", 4), 30);
        obj.animations.play(nameEffect, 30, false, true);
        return obj
    },
    onEffectAnimationComplete: function(sprite, animation) {}
};
MainGame.Menu = function(game) {};
MainGame.Menu.prototype = {
    create: function() {
        game.stage.backgroundColor = "#0054B7";
        MainGame.state = this;
        MainGame.stateName = "Menu";
        MainGame.GAME_TEXT = MainGame.TEXT_FILE[MainGame.languages[MainGame.language]];
        var bg = game.add.image(400, 300, "bg_menu");
        bg.anchor.setTo(.5);
        if (game.width > 1300) bg.width = game.width;
        this.layerMain = game.add.group();
        var offsetY = 15;
        var krug = this.layerMain.add(game.add.image(401, 258 - offsetY, "ss_menu", "Lifebuoy_0000"));
        krug.anchor.setTo(.5);
        var logoP2 = this.layerMain.add(game.add.image(526 - 18, 308 - offsetY, "ss_menu", "logosimon2_0000"));
        logoP2.anchor.setTo(.5, .85);
        var logoP1 = this.layerMain.add(game.add.image(267 + 18, 320 - offsetY, "ss_menu", "logosman_0000"));
        logoP1.anchor.setTo(.5, .85);
        var logoG = this.layerMain.add(game.add.image(412, 120 + 20 - offsetY, "ss_menu", "logo_grenade_0000"));
        logoG.anchor.setTo(.5, .5);
        game.add.tween(logoP1).to({
            angle: -3
        }, 1500, "Linear", true, 0, -1, true);
        game.add.tween(logoP1).to({
            y: "5"
        }, 2e3, "Linear", true, 0, -1, true);
        game.add.tween(logoP2).to({
            angle: 3
        }, 1500, "Linear", true, 0, -1, true);
        game.add.tween(logoP2).to({
            y: "+5"
        }, 2e3, "Linear", true, 0, -1, true);
        game.add.tween(logoG).to({
            angle: 6
        }, 1500, "Linear", true, 0, -1, true);
        game.add.tween(logoG).to({
            y: "+10"
        }, 2e3, "Linear", true, 0, -1, true);
        this.obj = logoG;
        var logoT = this.layerMain.add(game.add.image(400, 380 - offsetY, "ss_menu", "logo_0000"));
        logoT.anchor.setTo(.5);
        this.backLang = this.layerMain.add(game.add.image(58, 56, "ss_menu", "window_language_small_0000"));
        this.backLang.anchor.setTo(.5);
        this.btnLanguage = new SimpleButton(game, this, this.layerMain, 58, 58, "ss_menu", "flag_language_00" + MainGame.languagesN[MainGame.language], this.openLanguage);
        this.panelLanguage = this.layerMain.add(game.add.group());
        var panelLB = this.panelLanguage.add(game.add.image(100, 20, "ss_menu", "window_language_big_0000"));
        this.btnCloseLanguage = new SimpleButton(game, this, this.panelLanguage, 58, 58, "ss_menu", "btn_close_0000", this.closeLanguage);
        var arrL = ["EN", "IT", "ES", "PT", "TR", "DE", "BR", "RU", "FR", "NL"];
        var arrC = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
        arrL.splice(MainGame.language, 1);
        arrC.splice(MainGame.language, 1);
        var sizeFlag = 68;
        var offsetFlagX = 147;
        var offsetFlagY = 66;
        this.btnLang_1 = new SimpleButton(game, this, this.panelLanguage, offsetFlagX + sizeFlag * 0, offsetFlagY + sizeFlag * 0, "ss_menu", "flag_language_00" + arrC[0], this["changeLang" + arrL[0]]);
        this.btnLang_2 = new SimpleButton(game, this, this.panelLanguage, offsetFlagX + sizeFlag * 1, offsetFlagY + sizeFlag * 0, "ss_menu", "flag_language_00" + arrC[1], this["changeLang" + arrL[1]]);
        this.btnLang_3 = new SimpleButton(game, this, this.panelLanguage, offsetFlagX + sizeFlag * 2, offsetFlagY + sizeFlag * 0, "ss_menu", "flag_language_00" + arrC[2], this["changeLang" + arrL[2]]);
        this.btnLang_4 = new SimpleButton(game, this, this.panelLanguage, offsetFlagX + sizeFlag * 0, offsetFlagY + sizeFlag * 1, "ss_menu", "flag_language_00" + arrC[3], this["changeLang" + arrL[3]]);
        this.btnLang_5 = new SimpleButton(game, this, this.panelLanguage, offsetFlagX + sizeFlag * 1, offsetFlagY + sizeFlag * 1, "ss_menu", "flag_language_00" + arrC[4], this["changeLang" + arrL[4]]);
        this.btnLang_6 = new SimpleButton(game, this, this.panelLanguage, offsetFlagX + sizeFlag * 2, offsetFlagY + sizeFlag * 1, "ss_menu", "flag_language_00" + arrC[5], this["changeLang" + arrL[5]]);
        this.btnLang_7 = new SimpleButton(game, this, this.panelLanguage, offsetFlagX + sizeFlag * 0, offsetFlagY + sizeFlag * 2, "ss_menu", "flag_language_00" + arrC[6], this["changeLang" + arrL[6]]);
        this.btnLang_8 = new SimpleButton(game, this, this.panelLanguage, offsetFlagX + sizeFlag * 1, offsetFlagY + sizeFlag * 2, "ss_menu", "flag_language_00" + arrC[7], this["changeLang" + arrL[7]]);
        this.btnLang_9 = new SimpleButton(game, this, this.panelLanguage, offsetFlagX + sizeFlag * 2, offsetFlagY + sizeFlag * 2, "ss_menu", "flag_language_00" + arrC[8], this["changeLang" + arrL[8]]);
        this.panelLanguage.visible = false;
        this.btnStart = new SimpleButton(game, this, this.layerMain, 400, 520 - 80, "ss_menu", "btn_play2_0000", this.clickStart);
        this.btnCredits = new SimpleButton(game, this, this.layerMain, 400 - 345, 58, "ss_menu", "btn_credits_0000", this.clickCredits);
        var posX = 200;
        var posY = 200;
        if (MainGame.isDebug) {
            MainGame.addButton(this, this.layerMain, posX + 110 * 0, posY, this.clickS1, "scene 1", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, posX + 110 * 1, posY, this.clickS2, "scene 2", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, posX + 110 * 2, posY, this.clickS3, "scene 3", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, posX + 110 * 3, posY, this.clickS4, "scene 4", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, posX + 110 * 4, posY, this.clickS5, "scene 5", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, posX + 110 * 0, posY + 45, this.clickS6, "scene 6", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, posX + 110 * 1, posY + 45, this.clickS7, "scene 7", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, posX + 110 * 2, posY + 45, this.clickS8, "scene 8", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, posX + 110 * 3, posY + 45, this.clickS9, "scene 9", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, posX + 110 * 4, posY + 45, this.clickS10, "scene 10", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, posX + 110 * 0, posY + 90, this.clickFinal, "final", 100, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 0, 380, this.clickL1, "lvl 1", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 1, 380, this.clickL2, "lvl 2", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 2, 380, this.clickL3, "lvl 3", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 3, 380, this.clickL4, "lvl 4", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 4, 380, this.clickL5, "lvl 5", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 5, 380, this.clickL6, "lvl 6", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 0, 425, this.clickL7, "lvl 7", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 1, 425, this.clickL8, "lvl 8", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 2, 425, this.clickL9, "lvl 9", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 3, 425, this.clickL10, "lvl 10", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 4, 425, this.clickL11, "lvl 11", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 5, 425, this.clickL12, "lvl 12", 80, 40, 24);
            MainGame.addButton(this, this.layerMain, 100 + 90 * 6, 425, this.clickL13, "lvl 13", 80, 40, 24)
        }
        MainGame.isWater = true;
        this.musicButton = this.layerMain.add(game.add.image(400 + 345, 58, "ss_menu", "btn_music_0000"));
        this.musicButton.anchor.setTo(.5, .5);
        this.musicButton.inputEnabled = true;
        this.musicButton.events.onInputDown.add(MainGame.clickMuteMusic, this);
        if (MainGame.isMusicMuted) this.musicButton.frameName = "btn_music_0001";
        this.sfxButton = this.layerMain.add(game.add.image(400 + 345, 58, "ss_menu", "btn_sound_0000"));
        this.sfxButton.anchor.setTo(.5, .5);
        this.sfxButton.inputEnabled = true;
        this.sfxButton.events.onInputDown.add(MainGame.clickMuteSFX, this);
        if (MainGame.isSfxMuted) this.sfxButton.frameName = "btn_sound_0001";
        if (MainGame.firstGo) {
            this.musicButton.frameName = "btn_music_0001";
            this.sfxButton.frameName = "btn_sound_0001"
        } else {
            MainGame.playMusic(0)
        }
        game.input.onDown.addOnce(this.playOnce, this);
        MainGame.resizeGame();
        MainGame.fadeOut();
        this.layerCredits = this.layerMain.add(game.add.group());
        var plaha = this.layerCredits.add(game.add.image(400, 305, "ss_menu", "credits_panel_0000"));
        plaha.anchor.setTo(.5);
        var logo_tbs = this.layerCredits.add(game.add.image(400, 300, "ss_menu", "logo_tbs_0000"));
        logo_tbs.anchor.setTo(.5);
        var logo_phaser = this.layerCredits.add(game.add.image(400, 530, "ss_menu", "logo_phazer_0000"));
        logo_phaser.anchor.setTo(.5);
        var closeCredits = new SimpleButton(game, this, this.layerCredits, 215, 50, "ss_menu", "btn_close_0000", this.clickCredits);
        this.btnClearProgress = new SimpleButton(game, this, this.layerMain, 400, 540, "ss_menu", "btn_progress_0000", this.clearSaves, 1, MainGame.GAME_TEXT.clear_progress);
        this.btnClearProgress.text1.fontSize = 22;
        this.btnClearProgress.text1.y = 3;
        this.btnClearProgress.text2.fontSize = 22;
        MainGame.addText(270, 400, 75 + 5, MainGame.GAME_TEXT.credits.toUpperCase(), this.layerCredits, 40, 10248197, .5, .5);
        MainGame.addText(270, 400, 75, MainGame.GAME_TEXT.credits.toUpperCase(), this.layerCredits, 40, 16710912, .5, .5);
        var sizeWhiteFont = 28;
        MainGame.addText(270, 400, 130, MainGame.GAME_TEXT.producer, this.layerCredits, sizeWhiteFont, 16777215, .5, .5);
        MainGame.addText(270, 400, 130 + 30, "Martijn Kunst", this.layerCredits, sizeWhiteFont, 16777215, .5, .5);
        MainGame.addText(270, 400, 220, MainGame.GAME_TEXT.developed_by, this.layerCredits, sizeWhiteFont, 16777215, .5, .5);
        MainGame.addText(270, 400, 400, MainGame.GAME_TEXT.music_by, this.layerCredits, sizeWhiteFont, 16777215, .5, .5);
        MainGame.addText(270, 400, 400 + 30, "Eric Matyas", this.layerCredits, sizeWhiteFont, 16777215, .5, .5);
        MainGame.addText(270, 400, 487, MainGame.GAME_TEXT.made_with, this.layerCredits, sizeWhiteFont, 16777215, .5, .5);
        this.layerCredits.visible = false;
        this.btnClearProgress.buttonC.visible = false;
        MainGame.addText(320, 560, 563, MainGame.version, this.layerCredits, 16, 16777215, 1, .5);
        this.layerConfirm = this.layerMain.add(game.add.group());
        var spr_bg = this.layerConfirm.add(this.game.add.graphics(400, 300));
        spr_bg.beginFill(1656488, .7);
        spr_bg.drawRect(-this.game.width * .5, -this.game.height * .5, this.game.width, this.game.height);
        spr_bg.endFill();
        this.spr_bg = spr_bg;
        var plaha = this.layerConfirm.add(game.add.image(400, 300, "ss_menu", "pause_panel_0000"));
        plaha.anchor.setTo(.5);
        var btnYes = new SimpleButton(game, this, this.layerConfirm, 400 - 80, 350, "ss_menu", "btn_home3_0000", this.clickClearYes);
        var btnNo = new SimpleButton(game, this, this.layerConfirm, 400 + 80, 350, "ss_menu", "btn_home4_0000", this.clickClearNo);
        MainGame.addText(320, 400, 250, MainGame.GAME_TEXT.clear_confirm, this.layerConfirm, 30, 16777215, .5, .5);
        this.layerConfirm.visible = false;
        this.updateResize();
        this.initKeyboardEvents();
        if (MainGame.isAPI) MainGame.API_POKI.displayAd()
    },
    initKeyboardEvents: function() {
        this.keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keySpace.onDown.add(this.clickStart, this)
    },
    updateResize: function() {
        var posP_R = 800 + (game.width - 800) * .5;
        var posP_L = -((game.width - 800) * .5);
        this.musicButton.x = posP_R - 60 - 90;
        this.sfxButton.x = posP_R - 60 - 90 - 90;
        this.btnCredits.buttonC.x = posP_R - 60;
        if (this.btnClearProgress) this.btnClearProgress.buttonC.x = posP_L + 100;
        if (this.spr_bg) this.spr_bg.width = game.width;
        this.btnLanguage.buttonC.x = posP_L + 60;
        this.backLang.x = posP_L + 60
    },
    openLanguage: function() {
        var posP_L = -((game.width - 800) * .5);
        this.btnLanguage.buttonC.visible = false;
        this.backLang.visible = false;
        this.panelLanguage.visible = true;
        this.panelLanguage.x = posP_L - 400;
        game.add.tween(this.panelLanguage).to({
            x: posP_L
        }, 400, "Back.easeOut").start()
    },
    closeLanguage: function() {
        game.add.tween(this.panelLanguage).to({
            x: -400
        }, 400, "Back.easeIn", true).onComplete.add(function() {
            MainGame.state.panelLanguage.visible = false
        });
        this.btnLanguage.buttonC.visible = true;
        this.backLang.visible = true
    },
    changeLangEN: function() {
        this.updateLanguage(0)
    },
    changeLangIT: function() {
        this.updateLanguage(1)
    },
    changeLangES: function() {
        this.updateLanguage(2)
    },
    changeLangPT: function() {
        this.updateLanguage(3)
    },
    changeLangTR: function() {
        this.updateLanguage(4)
    },
    changeLangDE: function() {
        this.updateLanguage(5)
    },
    changeLangBR: function() {
        this.updateLanguage(6)
    },
    changeLangRU: function() {
        this.updateLanguage(7)
    },
    changeLangFR: function() {
        this.updateLanguage(8)
    },
    changeLangNL: function() {
        this.updateLanguage(9)
    },
    updateLanguage: function(vPar) {
        MainGame.language = vPar;
        MainGame.saveSaves();
        MainGame.goToState("Menu")
    },
    playOnce: function() {
        if (!MainGame.firstGo) return;
        MainGame.firstGo = false;
        this.musicButton.frameName = "btn_music_0000";
        this.sfxButton.frameName = "btn_sound_0000";
        MainGame.playMusic(0)
    },
    clickS1: function() {
        MainGame.comicsNum = 0;
        MainGame.goToState("Comics")
    },
    clickS2: function() {
        MainGame.comicsNum = 1;
        MainGame.goToState("Comics")
    },
    clickS3: function() {
        MainGame.comicsNum = 2;
        MainGame.goToState("Comics")
    },
    clickS4: function() {
        MainGame.comicsNum = 3;
        MainGame.goToState("Comics")
    },
    clickS5: function() {
        MainGame.comicsNum = 4;
        MainGame.goToState("Comics")
    },
    clickS6: function() {
        MainGame.comicsNum = 5;
        MainGame.goToState("Comics")
    },
    clickS7: function() {
        MainGame.comicsNum = 6;
        MainGame.goToState("Comics")
    },
    clickS8: function() {
        MainGame.comicsNum = 7;
        MainGame.goToState("Comics")
    },
    clickS9: function() {
        MainGame.comicsNum = 8;
        MainGame.goToState("Comics")
    },
    clickS10: function() {
        MainGame.comicsNum = 9;
        MainGame.goToState("Comics")
    },
    clickFinal: function() {
        MainGame.goToState("ScreenFinal")
    },
    clickL1: function() {
        MainGame.levelNum = 0;
        MainGame.goToState("Game")
    },
    clickL2: function() {
        MainGame.levelNum = 1;
        MainGame.goToState("Game")
    },
    clickL3: function() {
        MainGame.levelNum = 2;
        MainGame.goToState("Game")
    },
    clickL4: function() {
        MainGame.levelNum = 3;
        MainGame.goToState("Game")
    },
    clickL5: function() {
        MainGame.levelNum = 4;
        MainGame.goToState("Game")
    },
    clickL6: function() {
        MainGame.levelNum = 5;
        MainGame.goToState("Game")
    },
    clickL7: function() {
        MainGame.levelNum = 6;
        MainGame.goToState("Game")
    },
    clickL8: function() {
        MainGame.levelNum = 7;
        MainGame.goToState("Game")
    },
    clickL9: function() {
        MainGame.levelNum = 8;
        MainGame.goToState("Game")
    },
    clickL10: function() {
        MainGame.levelNum = 9;
        MainGame.goToState("Game")
    },
    clickL11: function() {
        MainGame.levelNum = 10;
        MainGame.goToState("Game")
    },
    clickL12: function() {
        MainGame.levelNum = 11;
        MainGame.goToState("Game")
    },
    clickL13: function() {
        MainGame.levelNum = 12;
        MainGame.goToState("Game")
    },
    clickWater: function() {
        MainGame.isWater = !MainGame.isWater;
        MainGame.state.btnWater.text.setText("water: " + MainGame.isWater)
    },
    clickCredits: function() {
        if (this.layerCredits.visible) {
            game.add.tween(this.layerCredits).to({
                y: -550
            }, 400, "Back.easeIn", true).onComplete.add(function() {
                MainGame.state.layerCredits.visible = false
            });
            game.add.tween(this.btnClearProgress.buttonC).to({
                y: 650
            }, 400, "Back.easeIn", true).onComplete.add(function() {
                MainGame.state.btnClearProgress.buttonC.visible = false
            })
        } else {
            this.layerCredits.y = -550;
            this.layerCredits.visible = true;
            game.add.tween(this.layerCredits).to({
                y: 0
            }, 400, "Back.easeOut", true);
            this.btnClearProgress.buttonC.y = 650;
            this.btnClearProgress.buttonC.visible = true;
            game.add.tween(this.btnClearProgress.buttonC).to({
                y: 540
            }, 400, "Back.easeOut", true)
        }
    },
    clearSaves: function() {
        this.layerConfirm.visible = true
    },
    clickClearYes: function() {
        MainGame.clearSaves();
        this.layerConfirm.visible = false;
        this.clickCredits()
    },
    clickClearNo: function() {
        this.layerConfirm.visible = false
    },
    clickStart: function() {
        if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
        if (MainGame.levelMax == 0) {
            MainGame.comicsNum = 0;
            MainGame.goToState("Comics")
        } else {
            MainGame.goToState("ScreenLevel")
        }
    }
};
MainGame.ScreenLevel = function(game) {};
MainGame.ScreenLevel.prototype = {
    create: function() {
        MainGame.state = this;
        MainGame.stateName = "ScreenLevel";
        var bg = game.add.image(400, 300, "bg_menu");
        bg.anchor.setTo(.5);
        if (game.width > 1300) bg.width = game.width;
        this.layerMain = game.add.group();
        this.btnHome = new SimpleButton(game, this, this.layerMain, 400 - 345, 58, "ss_menu", "btn_home_0000", this.clickHome);
        var coins = this.layerMain.add(game.add.image(400 - 75, 45, "ss_menu", "coins_0000"));
        coins.anchor.setTo(.5);
        var LEVELS_MAX = 13;
        this.scrollingMap = this.layerMain.add(game.add.tileSprite(0, 150, 800 / 2 + LEVELS_MAX * 340 + 120, 280, "transp"));
        this.scrollingMap.inputEnabled = true;
        this.scrollingMap.input.enableDrag(false);
        this.scrollingMap.input.allowVerticalDrag = false;
        this.scrollingMap.input.boundsRect = new Phaser.Rectangle(800 - this.scrollingMap.width, 150, this.scrollingMap.width * 2 - 800, 300);
        this.currentPage = 0;
        this.clickX = 0;
        this.currentPage = MainGame.levelNum = MainGame.levelMax;
        this.scrollingMap.x = this.currentPage * -340;
        for (var i = 0; i < LEVELS_MAX; i++) {
            var iconMap = game.add.image(800 / 2 + i * 340, 140, "ss_menu", "l" + (i + 1) + "_0000");
            iconMap.anchor.set(.5);
            this.scrollingMap.addChild(iconMap);
            var iconHero = game.add.image(800 / 2 + i * 340, 55, "ss_menu", "heroic_empty_0000");
            iconHero.anchor.set(.5);
            this.scrollingMap.addChild(iconHero);
            if (MainGame.levelHard[i] == 1) {
                iconHero.frameName = "heroic_coin_0000"
            }
            if (i <= MainGame.levelMax) {
                var starts = MainGame.levelStars[i];
                if (starts == 1) {
                    var star1 = game.add.image(800 / 2 + i * 340 + 62, 220, "ss_menu", "empty_star_0000");
                    star1.anchor.set(.5);
                    star1.scale.set(.7);
                    this.scrollingMap.addChild(star1);
                    var star2 = game.add.image(800 / 2 + i * 340, 220, "ss_menu", "empty_star_0000");
                    star2.anchor.set(.5);
                    star2.scale.set(.7);
                    this.scrollingMap.addChild(star2);
                    var star3 = game.add.image(800 / 2 + i * 340 - 62, 220, "ss_menu", "star_0000");
                    star3.anchor.set(.5);
                    star3.scale.set(.7);
                    this.scrollingMap.addChild(star3)
                } else if (starts == 2) {
                    var star1 = game.add.image(800 / 2 + i * 340 + 62, 220, "ss_menu", "empty_star_0000");
                    star1.anchor.set(.5);
                    star1.scale.set(.7);
                    this.scrollingMap.addChild(star1);
                    var star2 = game.add.image(800 / 2 + i * 340, 220, "ss_menu", "star_0000");
                    star2.anchor.set(.5);
                    star2.scale.set(.7);
                    this.scrollingMap.addChild(star2);
                    var star3 = game.add.image(800 / 2 + i * 340 - 62, 220, "ss_menu", "star_0000");
                    star3.anchor.set(.5);
                    star3.scale.set(.7);
                    this.scrollingMap.addChild(star3)
                } else if (starts == 3) {
                    var star1 = game.add.image(800 / 2 + i * 340 + 62, 220, "ss_menu", "star_0000");
                    star1.anchor.set(.5);
                    star1.scale.set(.7);
                    this.scrollingMap.addChild(star1);
                    var star2 = game.add.image(800 / 2 + i * 340, 220, "ss_menu", "star_0000");
                    star2.anchor.set(.5);
                    star2.scale.set(.7);
                    this.scrollingMap.addChild(star2);
                    var star3 = game.add.image(800 / 2 + i * 340 - 62, 220, "ss_menu", "star_0000");
                    star3.anchor.set(.5);
                    star3.scale.set(.7);
                    this.scrollingMap.addChild(star3)
                }
            } else {
                var zamok = game.add.image(800 / 2 + i * 340, 220, "ss_menu", "close_0000");
                zamok.anchor.set(.5);
                this.scrollingMap.addChild(zamok)
            }
        }
        MainGame.addText(800, 375, 40 + 5, String(MainGame.coins), this.layerMain, 40, 10248197, 0, .5);
        MainGame.addText(800, 375, 40, String(MainGame.coins), this.layerMain, 40, 16710912, 0, .5);
        var titleLevel = MainGame.GAME_TEXT["level_nameRW2_" + Number(MainGame.levelNum + 1)];
        this.textLevel = MainGame.addText(320, 400, 439, titleLevel, this.layerMain, 26, 16777215, .5, .5);
        for (var i = 0; i < LEVELS_MAX; i++) {
            var fish = MainGame.addText(800, 800 / 2 + i * 340, -18, i + 1, this.layerMain, 38, 16777215, .5, .5);
            this.scrollingMap.addChild(fish)
        }
        this.scrollingMap.events.onDragStart.add(function() {
            this.scrollingMap.startPosition = this.scrollingMap.x
        }, this);
        this.scrollingMap.events.onDragStop.add(function() {
            if (Math.abs(this.clickX - game.input.worldX) < 10) return;
            var page = Math.round(-this.scrollingMap.x / 340);
            if (page <= 0) page = 0;
            this.changePage(page)
        }, this);
        this.scrollingMap.events.onInputDown.add(this.onDownScrollMap, this);
        this.scrollingMap.events.onInputUp.add(this.onUpScrollMap, this);
        this.btnSelect = new SimpleButton(game, this, this.layerMain, 400, 525, "ss_menu", "btn_play2_0000", this.clickStart);
        this.btnHard = new SimpleButton(game, this, this.layerMain, 400 + 180, 525, "ss_menu", "btn_heroic_0000", this.clickStartHard);
        this.changePage(this.currentPage);
        MainGame.resizeGame();
        MainGame.fadeOut();
        this.updateResize();
        MainGame.playMusic(0);
        this.initKeyboardEvents();
        MainGame.isHardMode = false;
        if (MainGame.isAPI) MainGame.API_POKI.destroyAd()
    },
    initKeyboardEvents: function() {
        this.keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keySpace.onDown.add(this.clickStart, this);
        this.keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.keyRight.onDown.add(this.scrollMapRight, this);
        this.keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keyLeft.onDown.add(this.scrollMapLeft, this)
    },
    scrollMapRight: function() {
        if (this.currentPage < MainGame.MAX_LEVELS) this.changePage(this.currentPage + 1)
    },
    scrollMapLeft: function() {
        if (this.currentPage > 0) this.changePage(this.currentPage - 1)
    },
    updateResize: function() {
        var posP_R = 800 + (game.width - 800) * .5;
        var posP_L = -((game.width - 800) * .5);
        this.btnHome.buttonC.x = posP_L + 60
    },
    onDownScrollMap: function() {
        this.clickX = game.input.worldX
    },
    onUpScrollMap: function() {
        if (Math.abs(this.clickX - game.input.worldX) > 10) return;
        if (game.input.worldX > 400 + 180) {
            if (this.currentPage < MainGame.MAX_LEVELS) this.changePage(this.currentPage + 1);
            this.isClicked = true
        } else if (game.input.worldX < 400 - 180) {
            if (this.currentPage > 0) this.changePage(this.currentPage - 1);
            this.isClicked = true
        }
    },
    addLevel: function() {
        var coins = this.layerMain.add(game.add.image(400 - 75, 45, "ss_menu", "coins_0000"));
        coins.anchor.setTo(.5)
    },
    changePage: function(page) {
        this.currentPage = page;
        var titleLevel = MainGame.GAME_TEXT["level_nameRW2_" + Number(this.currentPage + 1)];
        this.textLevel.setText(titleLevel);
        var tween = game.add.tween(this.scrollingMap).to({
            x: this.currentPage * -340
        }, 250, Phaser.Easing.Cubic.Out, true);
        if (this.currentPage > MainGame.levelMax) {
            this.btnSelect.buttonC.alpha = .55
        } else {
            this.btnSelect.buttonC.alpha = 1
        }
        if (MainGame.levelStars[this.currentPage] > 0) {
            this.btnHard.buttonC.visible = true
        } else {
            this.btnHard.buttonC.visible = false
        }
    },
    clickStart: function() {
        MainGame.isHardMode = false;
        if (this.currentPage > MainGame.levelMax) return;
        MainGame.levelNum = this.currentPage;
        if (MainGame.levelNum == 0) {
            MainGame.comicsNum = 0;
            MainGame.goToState("Comics")
        } else {
            MainGame.goToState("ScreenShop")
        }
    },
    clickStartHard: function() {
        this.clickStart();
        MainGame.isHardMode = true
    },
    clickHome: function() {
        MainGame.goToState("Menu")
    }
};
MainGame.ScreenShop = function(game) {};
MainGame.ScreenShop.prototype = {
    create: function() {
        MainGame.state = this;
        MainGame.stateName = "ScreenShop";
        var tileSky = game.add.image(-10, 300, "ss_back", "sky2_0000");
        tileSky.anchor.setTo(0, .5);
        tileSky.fixedToCamera = true;
        tileSky.width = game.width * 1.1;
        tileSky.height = game.height * 1.1;
        this.tileSky = tileSky;
        this.layerBack = game.add.group();
        this.layerBack3 = this.layerBack.add(game.add.group());
        this.layerBack2 = this.layerBack.add(game.add.group());
        this.layerBack1 = this.layerBack.add(game.add.group());
        this.layerBoat = game.add.group();
        this.layerEffect = game.add.group();
        this.layerWater = game.add.group();
        this.layerMain = game.add.group();
        this.layerTop = game.add.group();
        this.layerPopup = game.add.group();
        this.layerPopup.fixedToCamera = true;
        MainGame.loadSaves();
        this.btnHome = new SimpleButton(game, this, this.layerMain, 400 - 345, 58, "ss_menu", "btn_home_0000", this.clickHome);
        var coins = this.layerMain.add(game.add.image(400 - 75, 45, "ss_menu", "coins_0000"));
        coins.anchor.setTo(.5);
        var plaha = this.layerTop.add(game.add.image(580, 265, "ss_menu", "upgrade_panel_0000"));
        plaha.anchor.setTo(.5);
        var posBtnsX = 450;
        var wBtn2 = this.layerTop.add(game.add.image(posBtnsX + 130 * 0, 140, "ss_menu", "btn_gun_0000"));
        wBtn2.anchor.setTo(.5);
        var icon2t = this.layerTop.add(game.add.image(wBtn2.x - 3, wBtn2.y + 4, "ss_menu", "grenade_t_0000"));
        icon2t.anchor.setTo(.5);
        var icon2n = this.layerTop.add(game.add.image(wBtn2.x, wBtn2.y, "ss_menu", "grenade_n_0000"));
        icon2n.anchor.setTo(.5);
        var wBtn3 = this.layerTop.add(game.add.image(posBtnsX + 130 * 1, 140, "ss_menu", "btn_gun_0000"));
        wBtn3.anchor.setTo(.5);
        var icon3t = this.layerTop.add(game.add.image(wBtn3.x - 3, wBtn3.y + 4, "ss_menu", "rocket_t_0000"));
        icon3t.anchor.setTo(.5);
        var icon3n = this.layerTop.add(game.add.image(wBtn3.x, wBtn3.y, "ss_menu", "rocket_n_0000"));
        icon3n.anchor.setTo(.5);
        var wBtn4 = this.layerTop.add(game.add.image(posBtnsX + 130 * 2, 140, "ss_menu", "btn_gun_0000"));
        wBtn4.anchor.setTo(.5);
        var icon4t = this.layerTop.add(game.add.image(wBtn4.x - 3, wBtn4.y + 4, "ss_menu", "balls3_t_0000"));
        icon4t.anchor.setTo(.5);
        var icon4n = this.layerTop.add(game.add.image(wBtn4.x, wBtn4.y, "ss_menu", "balls3_n_0000"));
        icon4n.anchor.setTo(.5);
        var im1 = this.layerTop.add(game.add.image(wBtn2.x + 30, wBtn2.y + 35, "ss_menu", "ammo_shop1_0000"));
        im1.anchor.setTo(.5);
        var im2 = this.layerTop.add(game.add.image(wBtn3.x + 30, wBtn3.y + 35, "ss_menu", "ammo_shop2_0000"));
        im2.anchor.setTo(.5);
        var im3 = this.layerTop.add(game.add.image(wBtn4.x + 30, wBtn4.y + 35, "ss_menu", "ammo_shop3_0000"));
        im3.anchor.setTo(.5);
        var wBtnBoat = this.layerTop.add(game.add.image(675, 320, "ss_menu", "btn_shop2_0000"));
        wBtnBoat.anchor.setTo(.5);
        var boatIcon = this.layerTop.add(game.add.image(wBtnBoat.x, wBtnBoat.y, "ss_menu", "boatshop1_0000"));
        boatIcon.anchor.setTo(.5);
        this.boatIcon = boatIcon;
        var wBtnViking = this.layerTop.add(game.add.image(485, 320, "ss_menu", "btn_shop2_0000"));
        wBtnViking.anchor.setTo(.5);
        var vikingIcon = this.layerTop.add(game.add.image(wBtnViking.x, wBtnViking.y, "ss_menu", "sheildshop1_0000"));
        vikingIcon.anchor.setTo(.5);
        this.vikingIcon = vikingIcon;
        this.btnUpgrade = new SimpleButton(game, this, this.layerTop, wBtnBoat.x, wBtnBoat.y + 92, "ss_menu", "coin_panel2_0000", this.upgradeBoat, 1, MainGame.priceBoat[0], -12, -5, false, 28, 0, .5);
        this.coinBtnUpgrade = this.btnUpgrade.buttonC.add(game.add.image(-50, -17, "ss_menu", "coin1_0000"));
        this.btnViking = new SimpleButton(game, this, this.layerTop, wBtnViking.x, wBtnViking.y + 92, "ss_menu", "coin_panel2_0000", this.upgradeViking, 1, MainGame.priceViking[0], -12, -5, false, 28, 0, .5);
        this.coinBtnViking = this.btnViking.buttonC.add(game.add.image(-50, -17, "ss_menu", "coin1_0000"));
        this.btnBuyGranat = new SimpleButton(game, this, this.layerTop, wBtn2.x, wBtn2.y + 82, "ss_menu", "coin_panel_0000", this.buyGranat, 1, MainGame.priceGranat, -12, -5, false, 28, 0, .5);
        this.coinBtnBuyGranat = this.btnBuyGranat.buttonC.add(game.add.image(-50, -17, "ss_menu", "coin1_0000"));
        this.btnBuyRocket = new SimpleButton(game, this, this.layerTop, wBtn3.x, wBtn3.y + 82, "ss_menu", "coin_panel_0000", this.buyRocket, 1, MainGame.priceRocket, -12, -5, false, 28, 0, .5);
        this.coinBtnBuyRocket = this.btnBuyRocket.buttonC.add(game.add.image(-50, -17, "ss_menu", "coin1_0000"));
        this.btnBuyBalls3 = new SimpleButton(game, this, this.layerTop, wBtn4.x, wBtn4.y + 82, "ss_menu", "coin_panel_0000", this.buyBalls3, 1, MainGame.priceBalls3, -12, -5, false, 28, 0, .5);
        this.coinBtnBuyBalls3 = this.btnBuyBalls3.buttonC.add(game.add.image(-50, -17, "ss_menu", "coin1_0000"));
        this.btnReward = new SimpleButton(game, this, this.layerTop, 400, 520 - 7, "ss_menu", "btn_bonus_0000", MainGame.clickReward, 1);
        MainGame.setReward(this.btnReward.buttonC, 0, 0, true);
        this.btnReward.buttonC.visible = !false;
        if (MainGame.isAPI) {
            if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) {
                this.btnReward.buttonC.alpha = .7
            }
        } else {
            if (!MainGame.isDebug) this.btnReward.buttonC.alpha = .7
        }
        this.initBackground();
        var wave;
        for (var i = 0; i < 12; i++) {
            wave = this.layerEffect.add(game.add.sprite(-400 + 300 * i, 455, "ss_main2"));
            wave.animations.add("waving", Phaser.Animation.generateFrameNames("wave2_", 0, 69, "", 4), 30);
            wave.animations.play("waving", 30, true);
            wave.scale.setTo(1.001, 1)
        }
        var w;
        for (var i = 0; i < 5; i++) {
            w = this.layerWater.add(game.add.image(-400 + 800 * i, 600 + 1, "ss_main2", "water1_0000"));
            w.anchor.setTo(0, 1);
            w.scale.setTo(1.01, 1)
        }
        this.btnGo = new SimpleButton(game, this, this.layerTop, 400 + 240, 520, "ss_menu", "btn_play_0000", this.clickGo);
        this.initBoat();
        this.textGranat = MainGame.addText(800, wBtn2.x + 30, wBtn2.y + 34, String(MainGame.countGranat) + "/3", this.layerTop, 22, 16777215, .5, .5);
        this.textRocket = MainGame.addText(800, wBtn3.x + 30, wBtn3.y + 34, String(MainGame.countRocket) + "/3", this.layerTop, 22, 16777215, .5, .5);
        this.textBalls3 = MainGame.addText(800, wBtn4.x + 30, wBtn4.y + 34, String(MainGame.countBalls3) + "/3", this.layerTop, 22, 16777215, .5, .5);
        this.coinText1 = MainGame.addText(800, 375, 40 + 5, String(MainGame.coins), this.layerMain, 40, 10248197, 0, .5);
        this.coinText2 = MainGame.addText(800, 375, 40, String(MainGame.coins), this.layerMain, 40, 16710912, 0, .5);
        MainGame.addText(200, 400 + 240, 38 + 5, MainGame.GAME_TEXT.upgrades.toUpperCase(), this.layerTop, 44, 9330034, .5, .5);
        MainGame.addText(200, 400 + 240, 38, MainGame.GAME_TEXT.upgrades.toUpperCase(), this.layerTop, 44, 16777215, .5, .5);
        MainGame.resizeGame();
        MainGame.fadeOut();
        this.updateResize();
        this.checkBtns();
        this.initKeyboardEvents();
        if (MainGame.isAPI) MainGame.API_POKI.destroyAd()
    },
    initKeyboardEvents: function() {
        this.keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keySpace.onDown.add(this.clickGo, this)
    },
    updateResize: function() {
        var posP_R = 800 + (game.width - 800) * .5;
        var posP_L = -((game.width - 800) * .5);
        this.btnHome.buttonC.x = posP_L + 60;
        this.layerTop.x = posP_R - 800;
        this.tileSky.width = game.width * 1.1
    },
    upgradeBoat: function() {
        if (MainGame.typeBoat < 4 && MainGame.coins >= MainGame.priceBoat[MainGame.typeBoat - 1]) {
            MainGame.coins -= MainGame.priceBoat[MainGame.typeBoat - 1];
            this.coinText1.setText(String(MainGame.coins));
            this.coinText2.setText(String(MainGame.coins));
            MainGame.typeBoat++;
            this.updateBoat();
            this.checkBtns();
            MainGame.playSound(2);
            var happyValue = MainGame.typeBoat / 10;
            if (MainGame.isAPI) MainGame.API_POKI.happyTime(happyValue)
        }
    },
    upgradeViking: function() {
        if (MainGame.typeViking < 2 && MainGame.coins >= MainGame.priceViking[MainGame.typeViking]) {
            MainGame.coins -= MainGame.priceViking[MainGame.typeViking];
            this.coinText1.setText(String(MainGame.coins));
            this.coinText2.setText(String(MainGame.coins));
            MainGame.typeViking++;
            this.updateViking();
            this.checkBtns();
            MainGame.playSound(2)
        }
    },
    buyGranat: function() {
        if (MainGame.countGranat < 3 && MainGame.coins >= MainGame.priceGranat) {
            MainGame.coins -= MainGame.priceGranat;
            this.coinText1.setText(String(MainGame.coins));
            this.coinText2.setText(String(MainGame.coins));
            MainGame.countGranat++;
            this.textGranat.setText(String(MainGame.countGranat) + "/3");
            this.checkBtns();
            MainGame.playSound(2)
        }
    },
    buyRocket: function() {
        if (MainGame.countRocket < 3 && MainGame.coins >= MainGame.priceRocket) {
            MainGame.coins -= MainGame.priceRocket;
            this.coinText1.setText(String(MainGame.coins));
            this.coinText2.setText(String(MainGame.coins));
            MainGame.countRocket++;
            this.textRocket.setText(String(MainGame.countRocket) + "/3");
            this.checkBtns();
            MainGame.playSound(2)
        }
    },
    buyBalls3: function() {
        if (MainGame.countBalls3 < 3 && MainGame.coins >= MainGame.priceBalls3) {
            MainGame.coins -= MainGame.priceBalls3;
            this.coinText1.setText(String(MainGame.coins));
            this.coinText2.setText(String(MainGame.coins));
            MainGame.countBalls3++;
            this.textBalls3.setText(String(MainGame.countBalls3) + "/3");
            this.checkBtns();
            MainGame.playSound(2)
        }
    },
    checkBtns: function() {
        var textMax = MainGame.GAME_TEXT.max.toUpperCase();
        if (MainGame.typeBoat == 4) {
            this.coinBtnUpgrade.visible = false;
            this.btnUpgrade.text1.setText(textMax);
            this.btnUpgrade.text1.anchor.x = .5;
            this.btnUpgrade.text1.x = 0;
            this.btnUpgrade.text2.setText(textMax);
            this.btnUpgrade.text2.anchor.x = .5;
            this.btnUpgrade.text2.x = 0
        } else {
            this.btnUpgrade.text1.setText(MainGame.priceBoat[MainGame.typeBoat - 1]);
            this.btnUpgrade.text2.setText(MainGame.priceBoat[MainGame.typeBoat - 1])
        }
        if (MainGame.typeViking == 2) {
            this.coinBtnViking.visible = false;
            this.btnViking.text1.setText(textMax);
            this.btnViking.text1.anchor.x = .5;
            this.btnViking.text1.x = 0;
            this.btnViking.text2.setText(textMax);
            this.btnViking.text2.anchor.x = .5;
            this.btnViking.text2.x = 0
        } else {
            this.btnViking.text1.setText(MainGame.priceViking[MainGame.typeViking]);
            this.btnViking.text2.setText(MainGame.priceViking[MainGame.typeViking])
        }
        if (MainGame.countGranat == 3) {
            this.coinBtnBuyGranat.visible = false;
            this.btnBuyGranat.text1.setText(textMax);
            this.btnBuyGranat.text1.anchor.x = .5;
            this.btnBuyGranat.text1.x = 0;
            this.btnBuyGranat.text2.setText(textMax);
            this.btnBuyGranat.text2.anchor.x = .5;
            this.btnBuyGranat.text2.x = 0
        }
        if (MainGame.countRocket == 3) {
            this.coinBtnBuyRocket.visible = false;
            this.btnBuyRocket.text1.setText(textMax);
            this.btnBuyRocket.text1.anchor.x = .5;
            this.btnBuyRocket.text1.x = 0;
            this.btnBuyRocket.text2.setText(textMax);
            this.btnBuyRocket.text2.anchor.x = .5;
            this.btnBuyRocket.text2.x = 0
        }
        if (MainGame.countBalls3 == 3) {
            this.coinBtnBuyBalls3.visible = false;
            this.btnBuyBalls3.text1.setText(textMax);
            this.btnBuyBalls3.text1.anchor.x = .5;
            this.btnBuyBalls3.text1.x = 0;
            this.btnBuyBalls3.text2.setText(textMax);
            this.btnBuyBalls3.text2.anchor.x = .5;
            this.btnBuyBalls3.text2.x = 0
        }
        MainGame.updateTextsButton(this.btnUpgrade);
        MainGame.updateTextsButton(this.btnViking);
        MainGame.updateTextsButton(this.btnBuyGranat);
        MainGame.updateTextsButton(this.btnBuyRocket);
        MainGame.updateTextsButton(this.btnBuyBalls3);
        MainGame.saveSaves(0);
        if (MainGame.coins < MainGame.LOW_COINS && MainGame.allowReward) {
            this.btnReward.buttonC.visible = true
        }
    },
    initBoat: function() {
        this.waveAr = [];
        this.hero1 = this.addHero(this.layerBoat, "sman", 0, 0);
        this.hero2 = this.addHero(this.layerBoat, "simon", 0, 0);
        this.hero3 = this.addHero(this.layerBoat, "dkid", 0, 0);
        this.bear = this.addHero(this.layerBoat, "bear", 0, 0);
        this.rod = this.layerBoat.add(game.add.image(0, 0, "ss_main1", "rod_0000"));
        this.waveAr.push(this.rod);
        this.greybeard = this.addHero(this.layerBoat, "greybeard", 0, 0);
        var barrel = this.layerBoat.add(game.add.image(0, 0, "ss_main1", "boat1_rw2_0000"));
        barrel.anchor.setTo(.5);
        barrel.startY = barrel.y;
        this.waveAr.push(barrel);
        this.barrel = barrel;
        var flag = this.layerBoat.add(game.add.sprite(2, 252, "ss_main1"));
        flag.animations.add("flag", Phaser.Animation.generateFrameNames("flag_", 0, 20, "", 4), 30);
        flag.animations.play("flag", 30, true);
        flag.startY = flag.y;
        this.waveAr.push(flag);
        this.flag = flag;
        this.waveCount = 0;
        this.waveArCount = this.waveAr.length;
        this.hero1.visible = false;
        this.hero2.visible = false;
        this.hero3.visible = false;
        this.bear.visible = false;
        this.greybeard.visible = false;
        this.rod.visible = false;
        this.flag.visible = false;
        this.updateBoat();
        this.updateViking()
    },
    updateViking: function() {
        this.vikingIcon.frameName = "sheildshop" + (Number(MainGame.typeViking) + 1) + "_0000";
        if (MainGame.typeViking == 0) {
            this.hero1.setSkinByName("sman");
            this.hero2.setSkinByName("simon");
            this.hero3.setSkinByName("dkid")
        } else if (MainGame.typeViking == 1) {
            this.hero1.setSkinByName("sman2");
            this.hero2.setSkinByName("simon2");
            this.hero3.setSkinByName("dkid2")
        } else if (MainGame.typeViking == 2) {
            this.hero1.setSkinByName("sman3");
            this.hero2.setSkinByName("simon3");
            this.hero3.setSkinByName("dkid3")
        }
        this.hero1.setAnimationByName(0, "idle", true);
        this.hero2.setAnimationByName(0, "idle", true);
        this.hero3.setAnimationByName(0, "idle", true);
        this.hero1.setToSetupPose();
        this.hero2.setToSetupPose();
        this.hero3.setToSetupPose();
        this.hero1.state.tracks[0].time = MyMath.getRandomInt(1, 7);
        this.hero2.state.tracks[0].time = MyMath.getRandomInt(1, 7);
        this.hero3.state.tracks[0].time = MyMath.getRandomInt(1, 7)
    },
    updateBoat: function() {
        var boatPosX = 172;
        var boatPosY = 468;
        var hero1PosX = 240;
        var hero1PosY = 464;
        var hero2PosX = 100;
        var hero2PosY = 464;
        var hero3PosX = 0;
        var hero3PosY = 0;
        this.hero1.visible = false;
        this.hero2.visible = false;
        this.hero3.visible = false;
        this.bear.visible = false;
        this.greybeard.visible = false;
        this.flag.visible = false;
        this.rod.visible = false;
        switch (MainGame.typeBoat) {
            case 1:
                this.hero1.visible = true;
                this.hero2.visible = true;
                break;
            case 2:
                boatPosX = 211;
                boatPosY = 475;
                hero1PosX = 315;
                hero1PosY = 463;
                hero2PosX = 190;
                hero2PosY = 463;
                hero3PosX = 95;
                hero3PosY = 463;
                this.hero1.visible = true;
                this.hero2.visible = true;
                this.bear.visible = true;
                break;
            case 3:
                boatPosX = 280;
                boatPosY = 445;
                hero1PosX = 470;
                hero1PosY = 460;
                hero2PosX = 330;
                hero2PosY = 460;
                hero3PosX = 101;
                hero3PosY = 384;
                this.rod.x = -40;
                this.rod.y = 258;
                this.rod.startY = this.rod.y;
                this.hero1.visible = true;
                this.hero2.visible = true;
                this.greybeard.visible = true;
                this.rod.visible = true;
                break;
            case 4:
                boatPosX = 280;
                boatPosY = 382;
                hero1PosX = 470;
                hero1PosY = 460;
                hero2PosX = 330;
                hero2PosY = 460;
                hero3PosX = 148;
                hero3PosY = 384;
                this.hero1.visible = true;
                this.hero2.visible = true;
                this.hero3.visible = true;
                this.flag.visible = true;
                break
        }
        this.hero1.x = hero1PosX;
        this.hero1.y = hero1PosY;
        this.hero1.startY = hero1PosY;
        this.hero2.x = hero2PosX;
        this.hero2.y = hero2PosY;
        this.hero2.startY = hero2PosY;
        this.hero3.x = hero3PosX;
        this.hero3.y = hero3PosY;
        this.hero3.startY = hero3PosY;
        this.bear.x = hero3PosX;
        this.bear.y = hero3PosY;
        this.bear.startY = hero3PosY;
        this.greybeard.x = hero3PosX;
        this.greybeard.y = hero3PosY;
        this.greybeard.startY = hero3PosY;
        this.barrel.frameName = "boat" + MainGame.typeBoat + "_rw2_0000";
        this.barrel.x = boatPosX;
        this.barrel.y = boatPosY;
        this.barrel.startY = boatPosY;
        this.boatIcon.frameName = "boatshop" + MainGame.typeBoat + "_0000";
        var scaleBoatIcons = [.9, .75, .7, 1];
        this.boatIcon.scale.setTo(scaleBoatIcons[MainGame.typeBoat - 1])
    },
    addHero: function(vLayer, vSkin, vX, vY) {
        var obj;
        if (vSkin == "bear") {
            obj = vLayer.add(game.add.sprite(vX, vY, "ss_main1"));
            obj.anchor.setTo(.5, .97);
            obj.animations.add("idle", Phaser.Animation.generateFrameNames("bear_", 0, 0, "", 4), 30);
            obj.animations.play("idle", 30, true)
        } else if (vSkin == "greybeard") {
            obj = vLayer.add(game.add.sprite(vX, vY, "ss_main1"));
            obj.anchor.setTo(.5, .97);
            obj.animations.add("idle", Phaser.Animation.generateFrameNames("grandpa_", 0, 48, "", 4), 30);
            obj.animations.play("idle", 30, true)
        } else {
            obj = vLayer.add(game.add.spine(vX, vY, "pers"))
        }
        obj.startY = vY;
        this.waveAr.push(obj);
        return obj
    },
    initBackground: function() {
        this.addObject(275, 82, this.layerBack3, "cloud0", 2);
        this.addObject(1045, 80, this.layerBack3, "cloud0", 2);
        this.addObject(160, 95, this.layerBack3, "cloud0", 1);
        this.addObject(557, 45, this.layerBack3, "cloud0", 3);
        this.addObject(316, 376, this.layerBack3, "ground3_", 1);
        this.addObject(570, 316, this.layerBack3, "ground3_", 1);
        this.addObject(932, 342, this.layerBack2, "ground2_", 3);
        this.addObject(716, 300, this.layerBack2, "ground2_", 1);
        this.addObject(1220, 320, this.layerBack2, "ground2_", 1);
        this.addObject(456, 332, this.layerBack2, "ground2_", 2);
        var palm1 = this.addObject(600, 180, this.layerBack1, "palm", 1);
        palm1.scale.x = -1;
        palm1.angle = -13;
        this.addObject(1364, 200, this.layerBack1, "palm", 1);
        this.addObject(840, 396, this.layerBack1, "ground1_", 2);
        this.addObject(1710, 380, this.layerBack1, "ground1_", 2);
        this.addObject(1480, 357, this.layerBack1, "ground1_", 1);
        this.addObject(1130, 417, this.layerBack1, "ground1_", 2);
        this.addObject(224, 406, this.layerBack1, "ground1_", 1);
        this.addObject(412, 380, this.layerBack1, "ground1_", 2);
        this.addObject(50, 440, this.layerBack1, "ground1_", 3)
    },
    addObject: function(vX, vY, vLayer, vName, vType) {
        return vLayer.add(game.add.image(vX, vY, "ss_back", vName + vType + "_0000"))
    },
    update: function() {
        this.waveCount += .06;
        for (var i = 0; i < this.waveArCount; i++) {
            this.waveAr[i].y = this.waveAr[i].startY + Math.sin(this.waveCount) * 2.6
        }
    },
    clickHome: function() {
        MainGame.goToState("Menu")
    },
    clickGo: function() {
        if (MainGame.levelNum == 12) {
            MainGame.comicsNum = 6;
            MainGame.goToState("Comics")
        } else {
            MainGame.goToState("Game")
        }
    }
};
MainGame.Comics = function(game) {};
MainGame.Comics.prototype = {
    create: function() {
        MainGame.state = this;
        MainGame.stateName = "Comics";
        game.stage.backgroundColor = "#000000";
        this.layerComics = game.add.group();
        this.layerBlack = game.add.group();
        this.layerBtns = game.add.group();
        this.layerComics.x = MainGame.midX;
        this.initComics();
        MainGame.addFill(this.layerBlack, 0, 1, 300, 600, -550, 0);
        MainGame.addFill(this.layerBlack, 0, 1, 300, 600, 1050, 0);
        game.input.onDown.add(this.updateComics, this);
        MainGame.resizeGame();
        if (MainGame.isAPI) MainGame.API_POKI.destroyAd()
    },
    initComics: function() {
        this.layerBtns.removeAll();
        this.spritesheet = "ss_comics";
        if (MainGame.comicsNum >= 5) this.spritesheet = "ss_comics2";
        if (MainGame.comicsNum != 9) MainGame.fadeOut();
        this.stepAction = 0;
        if (game.width > 1300) {
            this.halfWG = Math.floor(1300 * .5)
        } else {
            this.halfWG = Math.floor(game.width * .5)
        }
        var dxBoat = Math.floor(this.halfWG * .5);
        this.dxBoat = dxBoat;
        switch (MainGame.comicsNum) {
            case 0:
                this.whiteBack = MainGame.addFill(this.layerComics, 16777215, 1, game.width, 600, -this.halfWG, 0);
                this.textOnScreen = MainGame.addText(400, 0, 270, MainGame.GAME_TEXT.comicsRW2_0_text1, this.layerComics, 30, 9330034, .5, .5);
                break;
            case 1:
                this.back1 = this.addGraphic("cbox1", 0, 0);
                this.back2 = this.addGraphic("cbox2", -325, 300);
                this.back3 = this.addGraphic("cbox3", 325, 300);
                this.anim1_1 = this.addAnim("csdig", 22, -37, 135);
                this.gold_part1 = this.addGraphic("gold_part1", 121, 226);
                this.diamonds_part2 = this.addGraphic("diamonds_part2", -30, 230);
                this.anim1_2 = this.addAnim("cflash", 19, 121 - 35, 226 - 12);
                this.anim1_3 = this.addAnim("cflash", 19, -30 - 35, 230 - 12);
                this.cssonboat1 = this.addGraphic("cssonboat1", -dxBoat, 405);
                this.pirate1 = this.addGraphic("cp1", 200, 400);
                this.cpirate = this.addGraphic("cpirate", 325, 300);
                this.pirate2 = this.addGraphic("cp2", 205, 400);
                this.ball = this.addGraphic("cball", -dxBoat + 135, 440);
                game.add.tween(this.cssonboat1).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                game.add.tween(this.pirate1).to({
                    y: "+4"
                }, 1400, "Sine.easeInOut", true, 0, -1, true);
                game.add.tween(this.cpirate).to({
                    y: "+4"
                }, 1400, "Sine.easeInOut", true, 0, -1, true);
                this.water1 = this.addGraphic("cbox2_2", -325, 600);
                this.water1.anchor.setTo(.5, 1);
                this.water2 = this.addGraphic("cbox2_2", 325, 600);
                this.water2.anchor.setTo(.5, 1);
                this.dialog1_1 = this.addGraphic("cmsg9", 0, 0);
                this.dialog1_2 = this.addGraphic("cmsg5", 115, 115);
                this.dialog1_3 = this.addGraphic("cmsg5", 115, 115);
                this.dialog1_4 = this.addGraphic("cmsg5", 115, 115);
                this.dialog2_1 = this.addGraphic("cmsg1", -dxBoat, 300);
                this.dialog3_1 = this.addGraphic("cmsg2", 170, 335);
                this.addDialog(this.dialog1_1, MainGame.GAME_TEXT.comicsRW2_1_text1);
                this.addDialog(this.dialog1_2, MainGame.GAME_TEXT.comicsRW2_1_text2, 6);
                this.addDialog(this.dialog1_3, MainGame.GAME_TEXT.comicsRW2_1_text3, 6);
                this.addDialog(this.dialog1_4, MainGame.GAME_TEXT.comicsRW2_1_text4, 6);
                this.addDialog(this.dialog2_1, MainGame.GAME_TEXT.comicsRW2_1_text5);
                this.addDialog(this.dialog3_1, MainGame.GAME_TEXT.comicsRW2_1_text6, 6);
                this.back1.alpha = 1;
                this.anim1_1.alpha = 1;
                break;
            case 2:
                if (this.effectBulk1) this.effectBulk1.visible = false;
                if (this.effectBulk2) this.effectBulk2.visible = false;
                this.whiteBack = MainGame.addFill(this.layerComics, 16777215, 1, game.width, 600, -this.halfWG, 0);
                this.textOnScreen = MainGame.addText(400, 0, 270, MainGame.GAME_TEXT.comicsRW2_2_text1, this.layerComics, 30, 9330034, .5, .5);
                break;
            case 3:
                this.back1 = this.addGraphic("cbox4", -325, 0);
                this.back2 = this.addGraphic("cbox11", 325, 0);
                this.back3 = this.addGraphic("cbox6", -325, 300);
                this.back4 = this.addGraphic("cbox7", 325, 300);
                this.cairplane1 = this.addGraphic("cairplane1", -325, 100);
                game.add.tween(this.cairplane1).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.cbin1 = this.addGraphic("cbin1", dxBoat, 60);
                this.history_cloud = this.addGraphic("history_cloud", dxBoat + 5, 305);
                this.dialog1_1 = this.addGraphic("cmsg1", -dxBoat, 0);
                this.dialog1_2 = this.addGraphic("cmsg18", -240, 85);
                this.dialog2_1 = this.addGraphic("cmsg2", dxBoat, 245);
                this.dialog3_1 = this.addGraphic("cmsg11", -280, 410);
                this.dialog3_2 = this.addGraphic("cmsg8", -260, 410);
                this.dialog4_1 = this.addGraphic("cmsg10", dxBoat, 300);
                this.addDialog(this.dialog1_1, MainGame.GAME_TEXT.comicsRW2_3_text1);
                this.addDialog(this.dialog1_2, MainGame.GAME_TEXT.comicsRW2_3_text2, 6);
                this.addDialog(this.dialog2_1, MainGame.GAME_TEXT.comicsRW2_3_text3, 6);
                this.addDialog(this.dialog3_1, MainGame.GAME_TEXT.comicsRW2_3_text4, 6);
                this.addDialog(this.dialog3_2, MainGame.GAME_TEXT.comicsRW2_3_text5, 6);
                this.addDialog(this.dialog4_1, MainGame.GAME_TEXT.comicsRW2_3_text6);
                this.back1.alpha = 1;
                this.cairplane1.alpha = 1;
                this.showDialog(this.dialog1_1);
                this.cairplane1.x = -600;
                game.add.tween(this.cairplane1).to({
                    x: -325
                }, 1500, "Linear", true);
                game.time.events.add(1500, this.checkTimer, this, true, 3);
                break;
            case 4:
                this.back1 = this.addGraphic("cbox8", 0, 0);
                this.back2 = this.addGraphic("cbox9", 0, 300);
                this.cssonboat1 = this.addGraphic("cssonboat2", 0, 135);
                this.cssonboat2 = this.addGraphic("cssonboat2", 0, 435);
                game.add.tween(this.cssonboat1).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                game.add.tween(this.cssonboat2).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.water1 = this.addGraphic("cbox8_2", 0, 300);
                this.water1.anchor.setTo(.5, 1);
                this.water2 = this.addGraphic("cbox8_2", 0, 600);
                this.water2.anchor.setTo(.5, 1);
                this.dialog1_1 = this.addGraphic("cmsg12", -180, 65);
                this.dialog1_2 = this.addGraphic("cmsg12", 190, 65);
                this.dialog2_1 = this.addGraphic("cmsg13", 30, 365);
                this.addDialog(this.dialog1_1, MainGame.GAME_TEXT.comicsRW2_4_text1, 8);
                this.addDialog(this.dialog1_2, MainGame.GAME_TEXT.comicsRW2_4_text2, 8);
                this.addDialog(this.dialog2_1, MainGame.GAME_TEXT.comicsRW2_4_text3, 8);
                this.dialog1_1.scale.x = -1;
                this.back1.alpha = 1;
                this.cssonboat1.alpha = 1;
                this.water1.alpha = 1;
                this.cssonboat1.x = -800;
                game.add.tween(this.cssonboat1).to({
                    x: 0
                }, 3e3, "Linear", true);
                game.time.events.add(3e3, this.checkTimer, this, true, 6);
                break;
            case 5:
                this.back1 = this.addGraphic("cbox2", -325, 0);
                this.back2 = this.addGraphic("cbox11", 325, 0);
                this.back3 = this.addGraphic("cbox11", -325, 300);
                this.back4 = this.addGraphic("cbox2", 325, 300);
                this.cssonboat3 = this.addGraphic("cssonboat3", -dxBoat, 100);
                game.add.tween(this.cssonboat3).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.cssonboat5 = this.addGraphic("cssonboat5", dxBoat, 300 + 100);
                game.add.tween(this.cssonboat5).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.cbin2 = this.addGraphic("cbin2", dxBoat, 50);
                this.cbin3 = this.addGraphic("cbin3", -dxBoat, 300 + 50);
                this.water1 = this.addGraphic("cbox2_2", -325, 300);
                this.water1.anchor.setTo(.5, 1);
                this.water2 = this.addGraphic("cbox2_2", 325, 600);
                this.water2.anchor.setTo(.5, 1);
                this.dialog1_1 = this.addGraphic("cmsg13", -dxBoat + 25, 30);
                this.dialog4_1 = this.addGraphic("cmsg2", dxBoat + 20, 350);
                this.dialog4_2 = this.addGraphic("cmsg8", dxBoat + 9 + 20, 320);
                this.addDialog(this.dialog1_1, MainGame.GAME_TEXT.comicsRW2_5_text1, 8);
                this.addDialog(this.dialog4_1, MainGame.GAME_TEXT.comicsRW2_5_text2, 8);
                this.addDialog(this.dialog4_2, MainGame.GAME_TEXT.comicsRW2_5_text3, 8);
                this.back1.alpha = 1;
                this.cssonboat3.alpha = 1;
                this.water1.alpha = 1;
                this.cssonboat3.x = -500;
                game.add.tween(this.cssonboat3).to({
                    x: -dxBoat
                }, 2500, "Linear", true);
                game.time.events.add(2500, this.checkTimer, this, true, 8);
                break;
            case 6:
                this.back1 = this.addGraphic("cbox13", 0, 0);
                this.back2 = this.addGraphic("cbox2", -325, 300);
                this.back3 = this.addGraphic("cbox11", 325, 300);
                this.cwhale3 = this.addGraphic("cwhale3", 0, 10);
                this.cwhale2 = this.addGraphic("cwhale2", 0, 32);
                this.cwhale1 = this.addGraphic("cwhale1", 0, 52);
                this.cwhale1.anchor.setTo(.5);
                this.cwhale1.y += this.cwhale1.height * .5;
                this.cwhale2.anchor.setTo(.5);
                this.cwhale2.y += this.cwhale2.height * .5;
                this.cwhale3.anchor.setTo(.5);
                this.cwhale3.y += this.cwhale3.height * .5;
                game.add.tween(this.cwhale1.scale).to({
                    y: 1.03
                }, 1e3, "Linear", true, 0, -1, true);
                game.add.tween(this.cwhale2.scale).to({
                    y: 1.03
                }, 800, "Linear", true, 0, -1, true);
                game.add.tween(this.cwhale3.scale).to({
                    y: 1.03
                }, 600, "Linear", true, 0, -1, true);
                this.ctv = this.addGraphic("ctv", 170, 185);
                this.cbin3 = this.addGraphic("cbin4", dxBoat, 300 + 50);
                this.cssonboat3 = this.addGraphic("cssonboat3", -dxBoat, 300 + 100);
                game.add.tween(this.cssonboat3).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.water1 = this.addGraphic("cbox2_2", -325, 600);
                this.water1.anchor.setTo(.5, 1);
                this.dialog1_1 = this.addGraphic("cmsg14", 115, 95);
                this.dialog1_2 = this.addGraphic("cmsg15", 107, 95);
                this.dialog1_3 = this.addGraphic("cmsg16", 82, 95);
                this.dialog2_1 = this.addGraphic("cmsg13", -dxBoat + 9, 320);
                this.dialog2_1.width = 285;
                this.addDialog(this.dialog1_1, MainGame.GAME_TEXT.comicsRW2_6_text1, 8);
                this.addDialog(this.dialog1_2, MainGame.GAME_TEXT.comicsRW2_6_text2, 8);
                this.addDialog(this.dialog1_3, MainGame.GAME_TEXT.comicsRW2_6_text3, 8);
                this.addDialog(this.dialog2_1, MainGame.GAME_TEXT.comicsRW2_6_text4, 8, 12);
                this.back1.alpha = 1;
                this.cwhale1.alpha = 1;
                this.ctv.alpha = 1;
                break;
            case 7:
                this.back1 = this.addGraphic("cbox15", 0, 0);
                this.back2 = this.addGraphic("cbox16", -325, 300);
                this.back3 = this.addGraphic("cbox16", 325, 300);
                this.cssonboat3 = this.addGraphic("cssonboat3", 0, 130);
                game.add.tween(this.cssonboat3).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.water1 = this.addGraphic("cbox8_2", 0, 300);
                this.water1.anchor.setTo(.5, 1);
                this.cstar = this.addGraphic("cstar", -dxBoat - 5, 490);
                this.cstar.anchor.setTo(.5);
                this.cbomb1 = this.addGraphic("cbomb1", -dxBoat, 435);
                this.cbomb2 = this.addGraphic("cbomb2", dxBoat, 409);
                this.dialog1_1 = this.addGraphic("cmsg15", 85, 40);
                this.dialog1_2 = this.addGraphic("cmsg16", 60, 40);
                this.dialog2_1 = this.addGraphic("cmsg11", -dxBoat, 325);
                this.dialog3_1 = this.addGraphic("cmsg12", dxBoat, 325);
                this.addDialog(this.dialog1_1, MainGame.GAME_TEXT.comicsRW2_7_text1, 8);
                this.addDialog(this.dialog1_2, MainGame.GAME_TEXT.comicsRW2_7_text2, 8);
                this.addDialog(this.dialog2_1, MainGame.GAME_TEXT.comicsRW2_7_text3, 8);
                this.addDialog(this.dialog3_1, MainGame.GAME_TEXT.comicsRW2_7_text4, 8);
                this.back1.alpha = 1;
                this.cssonboat3.alpha = 1;
                this.water1.alpha = 1;
                this.showDialog(this.dialog1_1);
                break;
            case 8:
                var sdvigX = 325 - this.halfWG;
                this.back1 = this.addGraphic("cbox2", -325, 0);
                this.back2 = this.addGraphic("cbox17", 325, 0);
                this.back3 = this.addGraphic("cbox17", sdvigX, 300);
                MainGame.addFill(this.layerComics, 0, 1, 400, 300, 0, 300);
                this.back4 = this.addGraphic("cbox17", 325, 300);
                this.cssonboat3 = this.addGraphic("cssonboat3", -dxBoat, 100);
                game.add.tween(this.cssonboat3).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.crack = this.addGraphic("crack", 390, 485);
                this.poopok1 = this.addGraphic("poopok", 290, 165);
                this.poopok2 = this.addGraphic("poopok", sdvigX - 35, 300 + 165);
                this.poopok3 = this.addGraphic("poopok", 290, 300 + 165);
                this.cbird1 = this.addAnim("cbird1", 18, this.poopok1.x + 70, this.poopok1.y - 100);
                this.cbird1.anchor.setTo(1, 0);
                this.cbird2 = this.addAnim("cbird2", 0, this.poopok2.x + 70, this.poopok2.y - 100);
                this.cbird2.anchor.setTo(1, 0);
                this.cbird3 = this.addAnim("cbird3", 9, this.poopok3.x + 70, this.poopok3.y - 100);
                this.cbird3.anchor.setTo(1, 0);
                this.cbung = this.addAnim("cbung", 11, 285, 490);
                this.cbung.anchor.setTo(.5);
                this.water1 = this.addGraphic("cbox2_2", -325, 300);
                this.water1.anchor.setTo(.5, 1);
                this.dialog1_1 = this.addGraphic("cmsg19", -dxBoat - 130, 60);
                this.dialog1_2 = this.addGraphic("cmsg2", -dxBoat + 55, 60);
                this.dialog2_1 = this.addGraphic("cmsg4", dxBoat, 300 - 46, true);
                this.dialog3_1 = this.addGraphic("cmsg19", sdvigX - 20, 320);
                this.dialog3_2 = this.addGraphic("cmsg19", sdvigX - 20, 320);
                this.addDialog(this.dialog1_1, MainGame.GAME_TEXT.comicsRW2_8_text1, 8);
                this.addDialog(this.dialog1_2, MainGame.GAME_TEXT.comicsRW2_8_text2, 8);
                this.addDialog(this.dialog2_1, MainGame.GAME_TEXT.comicsRW2_8_text3);
                this.addDialog(this.dialog3_1, MainGame.GAME_TEXT.comicsRW2_8_text4, 8);
                this.addDialog(this.dialog3_2, MainGame.GAME_TEXT.comicsRW2_8_text5, 8);
                this.back1.alpha = 1;
                this.cssonboat3.alpha = 1;
                this.water1.alpha = 1;
                this.showDialog(this.dialog1_1);
                break;
            case 9:
                this.back1 = this.addGraphic("cbox18", 0, 100);
                this.cssonboat4 = this.addGraphic("cssonboat4", 0, 285);
                game.add.tween(this.cssonboat4).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.water1 = this.addGraphic("cbox18_2", 0, 500);
                this.water1.anchor.setTo(.5, 1);
                this.dialog1_1 = this.addGraphic("cmsg18", -107, 240);
                this.dialog1_1.scale.setTo(1.2);
                this.dialog1_2 = this.addGraphic("cmsg5", 107, 240);
                this.dialog1_2.scale.setTo(1.2);
                this.addDialog(this.dialog1_1, MainGame.GAME_TEXT.comicsRW2_9_text1, 8);
                this.addDialog(this.dialog1_2, MainGame.GAME_TEXT.comicsRW2_9_text2, 8);
                game.camera.flash(16777215, 700);
                this.goShake(this.layerComics, 5);
                this.back1.alpha = 1;
                this.cssonboat4.alpha = 1;
                this.water1.alpha = 1;
                this.showDialog(this.dialog1_1);
                this.showDialog(this.dialog1_2);
                break
        }
        this.checkStep = this["checkStep" + MainGame.comicsNum];
        var btn_skip1 = this.layerBtns.add(game.add.image(772, 30, "ss_menu", "btn_skip1_0000"));
        btn_skip1.anchor.setTo(.5);
        var btn_skip2 = this.layerBtns.add(game.add.image(772, 28, "ss_menu", "btn_skip2_0000"));
        btn_skip2.anchor.setTo(.5);
        var txtTap1 = MainGame.addText(260, 785, 570 + 3, MainGame.GAME_TEXT.tap_to_continue.toUpperCase(), this.layerBtns, 24, 9330034, 1, .5);
        var txtTap2 = MainGame.addText(260, 785, 570, MainGame.GAME_TEXT.tap_to_continue.toUpperCase(), this.layerBtns, 24, 16777215, 1, .5);
        if (MainGame.comicsNum == 0 || MainGame.comicsNum == 2) {
            btn_skip1.visible = false;
            txtTap2.visible = false
        } else {
            btn_skip2.visible = false
        }
        this.updateResize()
    },
    updateResize: function() {
        var posP_R = 800 + (game.width - 800) * .5;
        var posP_L = -((game.width - 800) * .5);
        this.layerBtns.x = posP_R - 800
    },
    goShake: function(vObject, vPower) {
        var dirX = vPower;
        var dirY = vPower;
        if (MyMath.getRandomBool()) dirX *= -1;
        if (MyMath.getRandomBool()) dirY *= -1;
        var properties = {
            x: vObject.x + dirX,
            y: vObject.y + dirY
        };
        var duration = 50;
        var repeat = 4;
        var ease = Phaser.Easing.Bounce.InOut;
        var autoStart = true;
        var delay = 0;
        var yoyo = true;
        game.add.tween(vObject).to(properties, duration, ease, autoStart, delay, repeat, yoyo)
    },
    checkTimer: function(vP, vNum) {
        var isNextStep = false;
        if (vNum == 0 && this.stepAction == 5) isNextStep = true;
        if (vNum == 1 && this.stepAction == 7) isNextStep = true;
        if (vNum == 2 && this.stepAction == 8) isNextStep = true;
        if (vNum == 3 && this.stepAction == 0) isNextStep = true;
        if (vNum == 4 && this.stepAction == 2) isNextStep = true;
        if (vNum == 5 && this.stepAction == 6) isNextStep = true;
        if (vNum == 6 && this.stepAction == 0) isNextStep = true;
        if (vNum == 7 && this.stepAction == 3) isNextStep = true;
        if (vNum == 8 && this.stepAction == 0) isNextStep = true;
        if (vNum == 9 && this.stepAction == 2) isNextStep = true;
        if (isNextStep) {
            this.stepAction++;
            this.checkStep()
        }
    },
    checkStep0: function() {
        switch (this.stepAction) {
            case 1:
                this.layerComics.removeAll();
                MainGame.comicsNum = 1;
                this.initComics();
                break
        }
    },
    checkStep1: function() {
        switch (this.stepAction) {
            case 1:
                this.showDialog(this.dialog1_1);
                break;
            case 2:
                this.showObject(this.gold_part1);
                this.showDialog(this.dialog1_2);
                this.gold_part1.y += 20;
                game.add.tween(this.gold_part1).to({
                    y: "-20"
                }, 250, "Quint", true);
                break;
            case 3:
                this.dialog1_2.visible = false;
                this.dialog1_2.txt.visible = false;
                this.showObject(this.diamonds_part2);
                this.showDialog(this.dialog1_3);
                this.diamonds_part2.y += 20;
                game.add.tween(this.diamonds_part2).to({
                    y: "-20"
                }, 250, "Quint", true);
                break;
            case 4:
                this.dialog1_3.visible = false;
                this.dialog1_3.txt.visible = false;
                this.showDialog(this.dialog1_4);
                break;
            case 5:
                this.showObject(this.back3);
                this.showObject(this.water2);
                this.showObject(this.pirate1);
                this.showObject(this.pirate2);
                this.showObject(this.cpirate);
                this.cpirate.x = this.halfWG + this.cpirate.width;
                game.add.tween(this.cpirate).to({
                    x: 325
                }, 600 + game.width, "Quart.easeOut", true, 100);
                this.pirate1.x = this.cpirate.x - 125;
                game.add.tween(this.pirate1).to({
                    x: 200
                }, 600 + game.width, "Quart.easeOut", true, 100);
                game.time.events.add(1e3, this.checkTimer, this, true, 0);
                this.pirate2.visible = false;
                break;
            case 6:
                this.showDialog(this.dialog3_1);
                break;
            case 7:
                this.showObject(this.back2);
                this.showObject(this.water1);
                this.showObject(this.cssonboat1);
                this.showDialog(this.dialog2_1);
                this.showObject(this.cpirate);
                this.posBoatX = this.cssonboat1.x;
                this.cssonboat1.x = -this.halfWG - 130;
                game.add.tween(this.cssonboat1).to({
                    x: this.posBoatX
                }, 1200 + game.width, "Quart.easeOut", true, 300);
                game.time.events.add(1900, this.checkTimer, this, true, 1);
                break;
            case 8:
                game.tweens.removeFrom(this.cssonboat1);
                game.add.tween(this.cssonboat1).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.cssonboat1.x = this.posBoatX;
                this.addEffect("ceffect", this.layerComics, 14, this.cssonboat1.x + 140, 450);
                this.showObject(this.ball);
                var _ball = this.ball;
                game.add.tween(this.ball).to({
                    x: -5,
                    y: 430
                }, game.width / 4, "Linear", true).onComplete.add(function() {
                    _ball.visible = false
                });
                game.time.events.add(500, this.checkTimer, this, true, 2);
                break;
            case 9:
                this.ball.visible = true;
                this.ball.x = 10;
                this.ball.y = 390;
                var _pirate1 = this.pirate1;
                var _pirate2 = this.pirate2;
                var _ball = this.ball;
                game.add.tween(this.ball).to({
                    x: 200,
                    y: 410
                }, 250, "Linear", true).onComplete.add(function() {
                    _pirate1.visible = false;
                    _pirate2.visible = true;
                    game.add.tween(_ball).to({
                        x: 80,
                        y: 550
                    }, 500, "Linear", true);
                    game.add.tween(_pirate2).to({
                        x: 350,
                        y: 540
                    }, 800, "Linear", true).onComplete.add(function() {
                        _pirate2.visible = false
                    })
                });
                game.time.events.add(250 + 400, this.addBulk1, this, true);
                game.time.events.add(250 + 550, this.addBulk2, this, true);
                break;
            case 10:
                this.layerComics.removeAll();
                MainGame.comicsNum = 2;
                this.initComics();
                break
        }
    },
    addBulk1: function() {
        if (MainGame.comicsNum != 1) return;
        this.effectBulk1 = this.addEffect("e2", this.layerComics, 16, this.ball.x, this.ball.y + 10)
    },
    addBulk2: function() {
        if (MainGame.comicsNum != 1) return;
        this.effectBulk2 = this.addEffect("e2", this.layerComics, 16, this.pirate2.x + 10, this.pirate2.y + 30)
    },
    checkStep2: function() {
        switch (this.stepAction) {
            case 1:
                this.layerComics.removeAll();
                MainGame.comicsNum = 3;
                this.initComics();
                break
        }
    },
    checkStep3: function() {
        switch (this.stepAction) {
            case 1:
                this.cairplane1.x = -325;
                game.tweens.removeFrom(this.cairplane1);
                game.add.tween(this.cairplane1).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.showDialog(this.dialog1_2);
                break;
            case 2:
                this.showObject(this.back2);
                this.showObject(this.cbin1);
                this.cbin1.y -= 20;
                game.add.tween(this.cbin1).to({
                    y: "+20"
                }, 500, "Linear", true);
                game.time.events.add(500, this.checkTimer, this, true, 4);
                break;
            case 3:
                this.showDialog(this.dialog2_1);
                break;
            case 4:
                this.showObject(this.back3);
                this.showDialog(this.dialog3_1);
                break;
            case 5:
                this.dialog3_1.visible = false;
                this.dialog3_1.txt.visible = false;
                this.showDialog(this.dialog3_2);
                break;
            case 6:
                this.showObject(this.back4);
                this.showObject(this.history_cloud);
                game.time.events.add(700, this.checkTimer, this, true, 5);
                break;
            case 7:
                this.showDialog(this.dialog4_1);
                break;
            case 8:
                this.layerComics.removeAll();
                MainGame.comicsNum = 4;
                this.initComics();
                break
        }
    },
    checkStep4: function() {
        switch (this.stepAction) {
            case 1:
                this.showDialog(this.dialog1_1);
                this.cssonboat1.x = 0;
                game.tweens.removeFrom(this.cssonboat1);
                game.add.tween(this.cssonboat1).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                break;
            case 2:
                this.showDialog(this.dialog1_2);
                break;
            case 3:
                this.showObject(this.back2);
                this.showObject(this.water2);
                this.showObject(this.cssonboat2);
                this.showDialog(this.dialog2_1);
                game.time.events.add(700, this.checkTimer, this, true, 7);
                break;
            case 4:
                game.add.tween(this.cssonboat2).to({
                    x: 800
                }, 3e3, "Linear", true);
                break;
            case 5:
                this.finishComics();
                break
        }
    },
    checkStep5: function() {
        switch (this.stepAction) {
            case 1:
                this.cssonboat3.x = -this.dxBoat;
                game.tweens.removeFrom(this.cssonboat3);
                game.add.tween(this.cssonboat3).to({
                    y: "+5"
                }, 800, "Sine.easeInOut", true, 0, -1, true);
                this.showDialog(this.dialog1_1);
                break;
            case 2:
                this.showObject(this.back2);
                this.showObject(this.cbin2);
                this.cbin2.y -= 20;
                game.add.tween(this.cbin2).to({
                    y: "+20"
                }, 500, "Linear", true);
                break;
            case 3:
                this.showObject(this.back3);
                this.showObject(this.cbin3);
                this.cbin3.y -= 20;
                game.add.tween(this.cbin3).to({
                    y: "+20"
                }, 500, "Linear", true);
                break;
            case 4:
                this.showObject(this.back4);
                this.showObject(this.cssonboat5);
                this.showObject(this.water2);
                this.showDialog(this.dialog4_1);
                break;
            case 5:
                this.dialog4_1.visible = false;
                this.dialog4_1.txt.visible = false;
                this.showDialog(this.dialog4_2);
                break;
            case 6:
                this.finishComics();
                break
        }
    },
    checkStep6: function() {
        switch (this.stepAction) {
            case 1:
                this.showDialog(this.dialog1_1);
                break;
            case 2:
                this.dialog1_1.visible = false;
                this.dialog1_1.txt.visible = false;
                this.showDialog(this.dialog1_2);
                this.goShake(this.cwhale1, 5);
                this.hideObject(this.cwhale1, 200);
                this.showObject(this.cwhale2);
                break;
            case 3:
                this.dialog1_2.visible = false;
                this.dialog1_2.txt.visible = false;
                this.showDialog(this.dialog1_3);
                this.goShake(this.cwhale2, 5);
                this.hideObject(this.cwhale2, 200);
                this.showObject(this.cwhale3);
                break;
            case 4:
                this.showObject(this.back2);
                this.showObject(this.cssonboat3);
                this.showObject(this.water1);
                this.showDialog(this.dialog2_1);
                break;
            case 5:
                this.showObject(this.back3);
                this.showObject(this.cbin3);
                this.cbin3.y -= 20;
                game.add.tween(this.cbin3).to({
                    y: "+20"
                }, 500, "Linear", true);
                break;
            case 6:
                this.layerComics.removeAll();
                MainGame.comicsNum = 7;
                this.initComics();
                break
        }
    },
    checkStep7: function() {
        switch (this.stepAction) {
            case 1:
                this.dialog1_1.visible = false;
                this.dialog1_1.txt.visible = false;
                this.showDialog(this.dialog1_2);
                break;
            case 2:
                this.showObject(this.back2);
                this.showObject(this.cbomb1);
                this.cbomb1.y = 600;
                game.add.tween(this.cbomb1).to({
                    y: 435
                }, 400, "Linear", true);
                game.time.events.add(500, this.checkTimer, this, true, 9);
                break;
            case 3:
                this.showObject(this.cstar);
                this.cstar.scale.setTo(.5);
                game.add.tween(this.cstar.scale).to({
                    x: 1,
                    y: 1
                }, 500, "Back.easeOut", true);
                this.showDialog(this.dialog2_1);
                break;
            case 4:
                this.showObject(this.back3);
                this.showObject(this.cbomb2);
                this.showDialog(this.dialog3_1);
                this.cbomb2.y = 600;
                game.add.tween(this.cbomb2).to({
                    y: 409
                }, 400, "Linear", true);
                break;
            case 5:
                this.finishComics();
                break
        }
    },
    checkStep8: function() {
        switch (this.stepAction) {
            case 1:
                this.showDialog(this.dialog1_2);
                break;
            case 2:
                this.showObject(this.back2);
                this.showObject(this.poopok1);
                this.showObject(this.cbird1);
                break;
            case 3:
                this.showDialog(this.dialog2_1);
                break;
            case 4:
                this.showObject(this.back3);
                this.showObject(this.poopok2);
                this.showObject(this.cbird2);
                this.showDialog(this.dialog3_1);
                break;
            case 5:
                this.dialog3_1.visible = false;
                this.dialog3_1.txt.visible = false;
                this.showDialog(this.dialog3_2);
                break;
            case 6:
                this.showObject(this.back4);
                this.showObject(this.poopok3);
                this.showObject(this.cbird3);
                this.showObject(this.cbung);
                break;
            case 7:
                this.showObject(this.crack);
                this.goShake(this.layerComics, 3);
                break;
            case 8:
                this.layerComics.removeAll();
                MainGame.comicsNum = 9;
                this.initComics();
                break
        }
    },
    checkStep9: function() {
        this.finishComics()
    },
    finishComics: function() {
        if (MainGame.comicsNum == 5) {
            MainGame.goToState("ScreenLevel")
        } else if (MainGame.comicsNum == 8 || MainGame.comicsNum == 9) {
            MainGame.goToState("ScreenFinal")
        } else {
            MainGame.goToState("Game")
        }
    },
    showObject: function(vObj) {
        game.add.tween(vObj).to({
            alpha: 1
        }, 300, "Linear", true)
    },
    hideObject: function(vObj, vDelay) {
        game.add.tween(vObj).to({
            alpha: 0
        }, 300, "Linear", true, vDelay)
    },
    showDialog: function(vDialog) {
        game.add.tween(vDialog).to({
            alpha: 1
        }, 300, "Linear", true);
        game.add.tween(vDialog.txt).to({
            alpha: 1
        }, 300, "Linear", true)
    },
    addDialog: function(vOblako, vText, vDx, vWidth, isAlignBottom) {
        if (!vOblako) return;
        if (typeof vDx === "undefined") vDx = 0;
        if (typeof vWidth === "undefined") vWidth = 15;
        var wOblako = vOblako.width;
        var hOblako = vOblako.height - 10 - vDx;
        var pX = vOblako.x;
        var pY = vOblako.y + Math.round(vOblako.height * .5) - vDx;
        var vSize = 22;
        var vColor = 9330034;
        var vAnchorX = .5;
        var vAnchorY = .55;
        var text = this.layerComics.add(game.add.bitmapText(pX, pY, "bmf_riffic", vText, vSize));
        text.anchor.setTo(vAnchorX, vAnchorY);
        text.fontSize = vSize;
        text.tint = vColor;
        text.align = "center";
        if (vDx > 0) {
            if (Math.abs(text.width - vOblako.width) < 15) {
                vOblako.width = Math.floor(vOblako.width * 1.2);
                wOblako = vOblako.width
            }
        }
        text.maxWidth = wOblako;
        if (vOblako.height < text.height + vDx + 10) {
            var oldH = vOblako.height;
            vOblako.height = vDx + 10 + Math.floor(text.height * 1.22);
            if (vOblako.needUpdate) {
                vOblako.y -= vOblako.height - oldH
            }
            text.y = vOblako.y + Math.round(vOblako.height * .5) - vDx;
            if (vOblako.needUpdate) {
                vOblako.anchor.y = 1;
                vOblako.y += vOblako.height
            }
        }
        vOblako.txt = text;
        if (!this.isDebug) vOblako.txt.alpha = 0;
        return text
    },
    addGraphic: function(vName, vX, vY, isAlignBottom) {
        var obj = this.layerComics.add(game.add.image(vX, vY, this.spritesheet, vName + "_0000"));
        obj.anchor.setTo(.5, 0);
        obj.needUpdate = isAlignBottom;
        if (!this.isDebug) obj.alpha = 0;
        return obj
    },
    addAnim: function(vName, vFrames, vX, vY) {
        var obj = this.layerComics.add(game.add.sprite(vX, vY, this.spritesheet));
        obj.animations.add("anim", Phaser.Animation.generateFrameNames(vName + "_", 0, vFrames, "", 4), 30);
        obj.animations.play("anim", 30, true);
        if (!this.isDebug) obj.alpha = 0;
        return obj
    },
    updateComics: function(vPointer) {
        if (vPointer) {
            if (vPointer.x > game.width - 50 && vPointer.y < 50) {
                this.finishComics();
                return
            }
        }
        this.stepAction++;
        this.checkStep()
    },
    addEffect: function(vName, vLayer, vFrames, vX, vY, vAnchorX, vAnchorY) {
        if (typeof vAnchorX === "undefined") vAnchorX = .5;
        if (typeof vAnchorY === "undefined") vAnchorY = .5;
        var obj;
        obj = vLayer.add(game.add.sprite(vX, vY, this.spritesheet));
        obj.anchor.setTo(vAnchorX, vAnchorY);
        obj.animations.add("anim", Phaser.Animation.generateFrameNames(vName + "_", 0, vFrames, "", 4), 30);
        obj.animations.play("anim", 30, false, true);
        return obj
    },
    clickStart: function() {
        MainGame.goToState("Game")
    }
};
MainGame.ScreenFinal = function(game) {};
MainGame.ScreenFinal.prototype = {
    create: function() {
        game.stage.backgroundColor = "#000000";
        MainGame.state = this;
        MainGame.stateName = "ScreenFinal";
        var bg = game.add.image(400, 300, "bg_congrats");
        bg.anchor.setTo(.5);
        this.layerMain = game.add.group();
        var anim1 = this.addAnim("cflash", 19, 125, 470);
        anim1.scale.setTo(.8, -.8);
        var anim2 = this.addAnim("cflash", 19, 240, 335);
        this.btnHome = new SimpleButton(game, this, this.layerMain, 400 - 345, 58, "ss_menu", "btn_home_0000", this.clickHome);
        var panel = this.layerMain.add(game.add.image(400, 495, "ss_menu", "congratulations_panel_0000"));
        panel.anchor.setTo(.5, .5);
        var text_conrats = MainGame.GAME_TEXT.text_finalRW1;
        this.dialog1_1 = this.addGraphic("cmsg20", 400, 0);
        this.dialog1_1.anchor.setTo(.5, 0);
        this.addDialog(this.dialog1_1, text_conrats);
        var textTitle = MainGame.GAME_TEXT.congratulations.toUpperCase();
        MainGame.addText(400, 410, 174 + 5, textTitle, this.layerMain, 42, 9330034, .5, .5);
        MainGame.addText(400, 410, 174, textTitle, this.layerMain, 42, 16777215, .5, .5);
        MainGame.addText(225, 410, 460, MainGame.GAME_TEXT.total_score.toUpperCase(), this.layerMain, 26, 16777215, 1, .5);
        MainGame.addText(225, 410, 520, MainGame.GAME_TEXT.time_used.toUpperCase(), this.layerMain, 26, 16777215, 1, .5);
        MainGame.addText(800, 430, 455 + 5, String(MainGame.highScore), this.layerMain, 38, 10248197, 0, .5);
        MainGame.addText(800, 430, 455 + 0, String(MainGame.highScore), this.layerMain, 38, 16710912, 0, .5);
        var timeTotal = 0;
        for (var i = 0; i < 11; i++) {
            timeTotal += MainGame.levelTime[i]
        }
        var s_time = this.secToHHMMSS(timeTotal);
        MainGame.addText(800, 430, 520, s_time, this.layerMain, 26, 16777215, 0, .5);
        MainGame.resizeGame();
        MainGame.fadeOut();
        this.updateResize();
        this.initKeyboardEvents();
        if (MainGame.isAPI) MainGame.API_POKI.happyTime(1);
        if (MainGame.isAPI) MainGame.API_POKI.destroyAd();
        MainGame.api_google("GameComplete", MainGame.highScore)
    },
    initKeyboardEvents: function() {
        this.keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keySpace.onDown.add(this.clickHome, this)
    },
    updateResize: function() {
        var posP_R = 800 + (game.width - 800) * .5;
        var posP_L = -((game.width - 800) * .5);
        if (this.musicButton) this.musicButton.x = posP_R - 60;
        if (this.btnHome) this.btnHome.buttonC.x = posP_L + 60
    },
    secToHHMMSS: function(vSec) {
        var seconds = parseInt(vSec, 10);
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds - hours * 3600) / 60);
        var seconds = seconds - hours * 3600 - minutes * 60;
        if (hours < 10) {
            hours = "0" + hours
        }
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        var time = hours + ":" + minutes + ":" + seconds;
        return time
    },
    addGraphic: function(vName, vX, vY) {
        var obj = this.layerMain.add(game.add.image(vX, vY, "ss_menu", vName + "_0000"));
        return obj
    },
    addDialog: function(vOblako, vText, vDx, vWidth) {
        if (!vOblako) return;
        if (typeof vDx === "undefined") vDx = 0;
        if (typeof vWidth === "undefined") vWidth = 15;
        var wOblako = vOblako.width;
        var pX = vOblako.x;
        var pY = vOblako.y + Math.round(vOblako.height * .5) + 2;
        var vSize = 22;
        var vColor = 9330034;
        var vAnchorX = .5;
        var vAnchorY = .55;
        var text = this.layerMain.add(game.add.bitmapText(pX, pY, "bmf_riffic", vText, vSize));
        text.anchor.setTo(vAnchorX, vAnchorY);
        text.fontSize = vSize;
        text.tint = vColor;
        text.align = "center";
        text.maxWidth = wOblako;
        MainGame.updateTextWidth(text, wOblako);
        vOblako.txt = text;
        return text
    },
    addAnim: function(vName, vFrames, vX, vY) {
        var obj = this.layerMain.add(game.add.sprite(vX, vY, "ss_menu"));
        obj.animations.add("anim", Phaser.Animation.generateFrameNames(vName + "_", 0, vFrames, "", 4), 30);
        obj.animations.play("anim", 30, true);
        return obj
    },
    clickHome: function() {
        MainGame.goToState("Menu")
    }
};