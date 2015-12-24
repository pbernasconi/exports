var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var ExportsApp = (function () {
    function ExportsApp() {
        this.defaultMeaning = 42;
    }
    ExportsApp.prototype.meaningOfLife = function (meaning) {
        return "The meaning of life is " + (meaning || this.defaultMeaning);
    };
    ExportsApp = __decorate([
        core_1.Component({
            selector: 'exports-app',
            providers: [],
            templateUrl: 'app/exports.html',
            directives: [],
            pipes: []
        })
    ], ExportsApp);
    return ExportsApp;
})();
exports.ExportsApp = ExportsApp;
//# sourceMappingURL=exports.js.map