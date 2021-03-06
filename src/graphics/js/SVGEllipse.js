/**
 * Draws an ellipse
 */
SVGEllipse = function(cfg)
{
	SVGEllipse.superclass.constructor.apply(this, arguments);
};

SVGEllipse.NAME = "svgEllipse";

Y.extend(SVGEllipse, SVGShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @readOnly
	 * @type String
	 */
	_type: "ellipse",

	/**
	 * Updates the shape.
	 *
	 * @method _draw
	 * @private
	 */
	_draw: function()
	{
		var node = this.node,
			w = this.get("width"),
			h = this.get("height"),
			x = this.get("x"),
			y = this.get("y"),
			xRadius = w * 0.5,
			yRadius = h * 0.5,
			cx = x + xRadius,
			cy = y + yRadius;
		node.setAttribute("rx", xRadius);
		node.setAttribute("ry", yRadius);
		node.setAttribute("cx", cx);
		node.setAttribute("cy", cy);
		this._fillChangeHandler();
		this._strokeChangeHandler();
		this._updateTransform();
	}
});

SVGEllipse.ATTRS = Y.merge(SVGShape.ATTRS, {
	/**
	 * Horizontal radius for the ellipse.
	 *
	 * @attribute xRadius
	 * @type Number
	 * @readOnly
	 */
	xRadius: {
		setter: function(val)
		{
			this.set("width", val/2);
		},

		getter: function()
		{
			var val = this.get("width");
			if(val) 
			{
				val *= 0.5;
			}
			return val;
		}
	},

	/**
	 * Vertical radius for the ellipse.
	 *
	 * @attribute yRadius
	 * @type Number
	 * @readOnly
	 */
	yRadius: {
		setter: function(val)
		{
			this.set("height", val/2);
		},

		getter: function()
		{
			var val = this.get("height");
			if(val) 
			{
				val *= 0.5;
			}
			return val;
		}
	}
});
Y.SVGEllipse = SVGEllipse;
