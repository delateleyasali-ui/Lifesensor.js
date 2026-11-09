elements.life_sensor = {
    color: "#00ffcc",

    category: "sensors",
    state: "solid",
    movable: false,

    properties: {
        range: 3
    },

   onClicked: function(pixel) {
    var ranges = [1, 3, 5, 8];
    var current = Number(pixel.range) || 3;
    var index = ranges.indexOf(current);

    pixel.range = ranges[(index + 1) % ranges.length];

    var colors = {
        1: "#00ff99",
        3: "#00ffcc",
        5: "#0088ff",
        8: "#9900ff"
    };

    pixel.color = colors[pixel.range];
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
