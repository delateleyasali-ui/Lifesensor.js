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

        function isLivingTarget(target) {
            if (!target || !target.element) return false;

            var def = elements[target.element];
            if (!def) return false;

            var elementName = String(target.element).toLowerCase();
            var category = String(def.category || "").toLowerCase();

            if (def.isLiving === true) return true;

            if (
                elementName === "human" ||
                elementName === "ant" ||
                elementName === "fly" ||
                elementName === "bee"
            ) {
                return true;
            }

            if (
                category === "life" ||
                category === "animals" ||
                category === "living"
            ) {
                return true;
            }

            return false;
        }

        var detected = false;

        for (var x = -range; x <= range; x++) {
            for (var y = -range; y <= range; y++) {

                if (x === 0 && y === 0) continue;

                var checkX = pixel.x + x;
                var checkY = pixel.y + y;

                if (
                    checkX < 0 ||
                    checkX >= width ||
                    checkY < 0 ||
                    checkY >= height
                ) {
                    continue;
                }

                var target = pixelMap[checkX][checkY];

                if (isLivingTarget(target)) {
                    detected = true;
                    break;
                }
            }

            if (detected) break;
        }

        if (detected) {
            var neighbors = [
                [pixel.x, pixel.y - 1],
                [pixel.x, pixel.y + 1],
                [pixel.x - 1, pixel.y],
                [pixel.x + 1, pixel.y]
            ];

            for (var i = 0; i < neighbors.length; i++) {
                var nx = neighbors[i][0];
                var ny = neighbors[i][1];

                if (
                    nx >= 0 &&
                    nx < width &&
                    ny >= 0 &&
                    ny < height
                ) {
                    var neighborPixel = pixelMap[nx][ny];

                    if (
                        neighborPixel &&
                        neighborPixel.element === "wire" &&
                        !neighborPixel.charge
                    ) {
                        neighborPixel.charge = 1;
                    }
                }
            }
        }
    },

    desc: "Detects living entities. Click to change range: 1, 3, 5, 8."
};
