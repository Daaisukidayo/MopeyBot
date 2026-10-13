"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampsToNumbers = timestampsToNumbers;
const quotedEndDate = /("endDate"\s*:\s*)"(\d+)"/g;
function timestampsToNumbers(value) {
    return value.replace(quotedEndDate, "$1$2");
}
//# sourceMappingURL=timestampsMigration.js.map