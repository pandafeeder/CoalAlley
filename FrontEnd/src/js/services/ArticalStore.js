function ArticalStore() {
    this.incorporate = function(data) {
        var that = this;
        data.forEach(function (item, index) {
            var slug = item['slug'];
            that[slug] = item;
        })
    };
    this.addIndex = function(data) {
        data.forEach(function (item, index) {
            item['index'] = index;
        });
    }
}

exports.ArticalStore = ArticalStore
