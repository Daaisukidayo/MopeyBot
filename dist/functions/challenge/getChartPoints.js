"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "getChartPoints",
    description: "Returns points of the given rare animal of the current chart.",
    params: [
        {
            name: "_rareAnimalId",
            description: "The ID of the animal.",
            required: true,
        }
    ],
    output: "Number",
    code: `
    $return[$dump[$getRareFromCDB[$env[_rareAnimalId]];points]]
  `
};
//# sourceMappingURL=getChartPoints.js.map