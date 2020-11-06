const stock = {
    randomAroundZero: function () {
        return Math.random() > 0.5 ? 0.6 : -0.6;
    },

    getStockPrice: function (input) {
        let start = input.startingPoint;
        let rate = input.rate;
        let variance = input.variance;

        return start * rate + variance * stock.randomAroundZero();
    }
};

module.exports = stock;

