(function() {
    var GearCategories = React.createClass({displayName: "GearCategories",

        render: function () {
            return (React.createElement("div", null,
                this.props.categories.map(function (category, index) {
                    var catId = "cat" + index;
                    return React.createElement(GearCategory, {key: catId, catId: catId, category: category})
                })
            ))
        }
    });

    var GearCategory = React.createClass({displayName: "GearCategory",

        getInitialState: function() {
            return {items: this.props.category.items}
        },

        render: function () {
            var items = TLP_GEAR_LIST.sortItemsByPackWeight(this.props.category.items);
            return (React.createElement("div", null,
                React.createElement("h3", null, this.props.category.name),
                React.createElement("table", {className: "table table-condensed"},
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", {className: "col-md-3"}, "Item"),
                            React.createElement("th", {className: "col-md-6"}, "Description"),
                            React.createElement("th", {className: "col-md-1 text-right"}, "Item Weight"),
                            React.createElement("th", {className: "col-md-1 text-right"}, "Quantity"),
                            React.createElement("th", {className: "col-md-1 text-right"}, "Pack Weight")
                        )
                    ),
                    React.createElement("tbody", null,
                        items.map(function (item, index) {
                            var itemId = this.props.catId + "-item" + index;
                            return React.createElement(GearItem, {key: itemId, itemId: itemId, item: item})
                        }.bind(this)),
                        React.createElement(GearCategoryTotalWeights, {category: this.props.category})
                    )
                )
            ))
        }
    });

    var GearItem = React.createClass({displayName: "GearItem",

        render: function () {
            return (
                React.createElement("tr", null,
                    React.createElement("td", null, this.props.item.name),
                    React.createElement(GearItemDescription, {item: this.props.item, itemId: this.props.itemId}),
                    React.createElement("td", {className: "text-right"}, this.props.item.weight),
                    React.createElement("td", {className: "text-right"}, this.props.item.quantity),
                    React.createElement(GearItemPackWeight, {item: this.props.item})
                )
            )
        }
    });

    var GearItemDescription = React.createClass({displayName: "GearItemDescription",

        render: function () {
            if (this.props.item.comment) {
                var collapseId = this.props.itemId + "-collapse";
                return (React.createElement("td", null,
                    React.createElement("a", {href: "#" + collapseId, "data-toggle": "collapse", "aria-expanded": "false",
                        "aria-controls": collapseId}, this.props.item.desc),
                    React.createElement("div", {id: collapseId, className: "collapse"},
                        React.createElement("div", {className: "well"},
                            React.createElement("div", null, "Comments: ", this.props.item.comment),
                            React.createElement("div", null, "Rating:")
                        )
                    )
                ))
            }
            return (React.createElement("td", null,
                this.props.item.desc
            ))
        }
    });

    var GearItemPackWeight = React.createClass({displayName: "GearItemPackWeight",

        render: function () {
            var packWeight = TLP_GEAR_LIST.getItemWeights(this.props.item).packWeight;
            return (React.createElement("td", {className: "text-right"}, (packWeight) === 0 ? "" : packWeight))
        }
    });

    var GearCategoryTotalWeights = React.createClass({displayName: "GearCategoryTotalWeights",

        render: function () {
            var categoryWeights = TLP_GEAR_LIST.getCategoryWeights(this.props.category);
            return (React.createElement("tr", null,
                React.createElement("td", {colSpan: "2", className: "text-right"}, "Total"),
                React.createElement("td", {className: "text-right"}, categoryWeights.totalWeight),
                React.createElement("td", null),
                React.createElement("td", {className: "text-right"}, categoryWeights.packWeight)
            ))
        }
    });

    React.render(
        React.createElement(GearCategories, {categories: TLP_GEAR_LIST.data.categories}),
        document.getElementById('gear-categories')
    );
}());