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
    // Temporarily disabled for testing
},
    desc: "Detects living entities. Click to change range: 1, 3, 5, 8."
};
