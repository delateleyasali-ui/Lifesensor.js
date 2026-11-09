elements.life_sensor = {
    color: "#00ffcc",

    category: "sensors",
    state: "solid",
    movable: false,

    properties: {
        range: 3
    },

    click: function(pixel) {
        if (!pixel.range) {
            pixel.range = 3;
        }

        if (pixel.range === 1) {
            pixel.range = 3;
            pixel.color = "#00ffcc";

        } else if (pixel.range === 3) {
            pixel.range = 5;
            pixel.color = "#0088ff";

        } else if (pixel.range === 5) {
            pixel.range = 8;
            pixel.color = "#9900ff";

        } else {
            pixel.range = 1;
            pixel.color = "#00ff99";
        }
    },

  tick: function(pixel) {
    var range = Number(pixel.range) || 3;
    var detected = false;

    for (var x = -range; x <= range; x++) {
        for (var y = -range; y <= range; y++) {
            if (x === 0 && y === 0) continue;

            var checkX = pixel.x + x;
            var checkY = pixel.y + y;

            if (
                checkX < 0 || checkX >= width ||
                checkY < 0 || checkY >= height
            ) {
                continue;
            }

            var target = getPixel(checkX, checkY);

            if (!target) continue;

            var name = String(target.element).toLowerCase();

            if (
                name === "bee" ||
                name === "ant" ||
                name === "fly" ||
                name === "human"
            ) {
                detected = true;
                break;
            }
        }

        if (detected) break;
    }

    if (detected) {
        pixel.color = "#ff3333";
    } else {
        var colors = {
            1: "#00ff99",
            3: "#00ffcc",
            5: "#0088ff",
            8: "#9900ff"
        };

        pixel.color = colors[range] || "#00ffcc";
    }
},
    desc: "Detects living entities. Click to change range: 1, 3, 5, 8."
};
