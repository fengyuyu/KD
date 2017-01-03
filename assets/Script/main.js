cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        ndLogo: cc.Node,
        ndStart: cc.Node,
        ndCredits: cc.Node,
        ndLeft: cc.Node,
        ndSave: cc.Node,
        spSaveItem: [cc.Sprite],
        spSaveItemClose: [cc.Sprite],

        spriteFrameStartClick: cc.SpriteFrame,

        aniLogo: {
            default: null,
            type: cc.Animation,
            visible: false
        },
        aniStartBtn: {
            default: null,
            type: cc.Animation,
            visible: false
        },
        aniCreditsBtn: {
            default: null,
            type: cc.Animation,
            visible: false
        }
    },

    onLogoAniFinish: function () {
        this.ndStart.active = true;
        this.aniStartBtn.play();
    },


    onStartAniFinish: function () {
        this.ndCredits.active = true;
        this.aniCreditsBtn.play();
    },

    onCreditsAniFinish: function () {
        this.ndLeft.active = true;
    },

    onSaveClose: function (params) {
        cc.log("aaaaaaa")
        this.ndSave.runAction(cc.moveTo(0.2, 0, -470));
        this.onLogoAniFinish();
    },

    // use this for initialization
    onLoad: function () {
        this.spStartNormal = this.ndStart.getComponent(cc.Sprite).spriteFrame;

        this.ndStart.active = false;
        this.ndCredits.active = false;
        this.ndLeft.active = false;

        this.aniLogo = this.ndLogo.getComponent(cc.Animation);
        this.aniStartBtn = this.ndStart.getComponent(cc.Animation);
        this.aniCreditsBtn = this.ndCredits.getComponent(cc.Animation);

        this.aniLogo.on("finished", this.onLogoAniFinish, this);
        this.aniStartBtn.on("finished", this.onStartAniFinish, this);
        this.aniCreditsBtn.on("finished", this.onCreditsAniFinish, this);

        this.ndStart.on("touchstart", function (event) {
            let target = event.currentTarget,
                size = target.getContentSize(),
                rect = cc.rect(0+40, 0+30, size.width-80, size.height/3 +15),
                location = target.convertToNodeSpace(event.getLocation());
            if (rect.contains(location)) {
                target.getComponent(cc.Sprite).spriteFrame = this.spriteFrameStartClick;
                return true;
            }
            return false;
        }, this);
        this.ndStart.on("touchend", function (event) {
            let target = event.currentTarget;
            this.ndStart.getComponent(cc.Sprite).spriteFrame = this.spStartNormal;
            this.ndStart.active = false;
            this.ndCredits.active = false;
            this.ndSave.runAction(cc.moveTo(0.2, 0, -135));
        }, this);

        this.aniLogo.play();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
