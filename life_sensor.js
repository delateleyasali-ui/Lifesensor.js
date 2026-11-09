function makeLifeSensor(direction) {
    return {
        color: "#00ffcc",
        category: "sensors",
        state: "solid",
        movable: false,

        properties: {
            range: 3
        },

        onClicked: function(pixel) {
            var ranges = [1, 3, 10, 45];
            var current = Number(pixel.range) || 3;
            var index = ranges.indexOf(current);

            pixel.range = ranges[(index + 1) % ranges.length];

            var colors = {
                1: "#00ff99",
                3: "#00ffcc",
                10: "#0088ff",
                45: "#9900ff"
            };

            pixel.color = colors[pixel.range];
        },

        tick: function(pixel) {
            var range = Number(pixel.range) || 3;
            var detected = false;

            var minX = direction === -1 ? -range :
                       direction === 1 ? 1 : -range;

            var maxX = direction === -1 ? -1 : range;

            for (var x = minX; x <= maxX; x++) {
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
                        name === "human" ||
                        name === "head" ||
                        name === "body" ||
                        name === "bird" ||
                        name === "rat" ||
                        name === "frog" ||
                        name === "spider" ||
                        name === "flea"
                    ) {
                        detected = true;
                        break;
                    }
                }

                if (detected) break;
            }

            if (detected) {
                pixel.color = "#ff3333";

                var neighbors = [
                    [pixel.x, pixel.y - 1],
                    [pixel.x, pixel.y + 1],
                    [pixel.x - 1, pixel.y],
                    [pixel.x + 1, pixel.y]
                ];

                for (var i = 0; i < neighbors.length; i++) {
                    var wire = getPixel(
                        neighbors[i][0],
                        neighbors[i][1]
                    );

                    if (wire && wire.element === "wire") {
                        if (typeof chargePixel === "function") {
                            chargePixel(wire, 1);
                        } else {
                            wire.charge = 1;
                        }
                    }
                }
            } else {
                var colors = {
                    1: "#00ff99",
                    3: "#00ffcc",
                    10: "#0088ff",
                    45: "#9900ff"
                };

                pixel.color = colors[range] || "#00ffcc";
            }
        },

        desc: "Detects living entities. Click to change range: 1, 3, 10, 45."
    };
}

// Original omnidirectional sensor
elements.life_sensor = makeLifeSensor(0);

// New directional sensors
elements.life_sensor_left = makeLifeSensor(-1);
elements.life_sensor_right = makeLifeSensor(1);
