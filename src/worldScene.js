var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function WorldScene () {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },

    preload: function () {
        this.load.image('tiles', 'assets/tilesets/base_out_atlas.png');
        this.load.image('button', 'assets/tilesets/buttontiles.png');
        this.load.tilemapTiledJSON('map', 'assets/map/Tilemap.json');
        this.load.spritesheet('panda', 'assets/spritesheets/Panda.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    },

    create: function () {
        const scene = this;

        // map
        scene.map = scene.make.tilemap({ key: 'map' });
        scene.tileset = scene.map.addTilesetImage('Tiles', 'tiles');
        scene.button = scene.map.addTilesetImage('Buttons', 'button');
        scene.underLayer = scene.map.createStaticLayer("Under Player", scene.tileset, 0, 0);
        scene.worldLayer = scene.map.createStaticLayer("World", scene.tileset, 0, 0);
        scene.pressedButtonLayer = scene.map.createStaticLayer("Pressed Button", scene.button, 0, 0);
        scene.buttonLayer = scene.map.createStaticLayer("Button", scene.button, 0, 0);
        scene.aboveLayer = scene.map.createStaticLayer("Above Player", scene.tileset, 0, 0);
        scene.SpawnPoint = scene.map.getObjectLayer('Spawn Point')['objects'];
        scene.worldLayer.setCollisionByProperty({ collides: true });

        // player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('panda', { frames: [10, 11, 12, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('panda', { frames: [10, 11, 12, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('panda', { frames: [6, 7, 6, 8] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('panda', { frames: [1, 3, 4, 5] }),
            frameRate: 10,
            repeat: -1
        });

        scene.panda = scene.physics.add.sprite(50, 100, 'panda', 0);

        scene.physics.world.bounds.width = scene.map.widthInPixels;
        scene.physics.world.bounds.height = scene.map.heightInPixels;

        scene.panda.setCollideWorldBounds(true);

        scene.cameras.main.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);
        scene.cameras.main.startFollow(scene.panda);
        scene.cameras.main.roundPixels = true;

        scene.cursors = scene.input.keyboard.createCursorKeys();

        scene.physics.add.collider(scene.panda, scene.worldLayer);
    },

    update: function() {
        const scene = this;
        scene.panda.body.setVelocity(0);
        
        if (scene.cursors.left.isDown) {
            scene.panda.body.setVelocityX(-80);
        }
        else if (scene.cursors.right.isDown) {
            scene.panda.body.setVelocityX(80);
        }
        if (scene.cursors.up.isDown) {
            scene.panda.body.setVelocityY(-80);
        }
        else if (scene.cursors.down.isDown) {
            scene.panda.body.setVelocityY(80);
        }

        if (scene.cursors.left.isDown) {
            scene.panda.anims.play('left', true);
            scene.panda.flipX = true;
        }
        else if (scene.cursors.right.isDown) {
            scene.panda.anims.play('right', true);
            scene.panda.flipX = false;
        }
        else if (scene.cursors.up.isDown) {
            scene.panda.anims.play('up', true);
        }
        else if (scene.cursors.down.isDown) {
            scene.panda.anims.play('down', true);
        }
        else {
            scene.panda.anims.stop();
        }
    }
});