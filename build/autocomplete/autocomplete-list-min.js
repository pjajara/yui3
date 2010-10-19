YUI.add("autocomplete-list",function(B){var I=B.Lang,Z=B.Node,N=B.Array,H=40,K=13,O=27,S=9,R=38,V="_CLASS_ITEM",W="_CLASS_ITEM_ACTIVE",D="_CLASS_ITEM_HOVER",X="_SELECTOR_ITEM",F="activeItem",L="alwaysShowList",Q="circular",U="hoveredItem",M="id",E="item",C="list",a="result",J="results",T="visible",G="width",P="select",A=B.Base.create("autocompleteList",B.Widget,[B.AutoCompleteBase,B.WidgetPosition,B.WidgetPositionAlign,B.WidgetStack],{ARIA_TEMPLATE:"<div/>",ITEM_TEMPLATE:"<li/>",LIST_TEMPLATE:"<ul/>",initializer:function(){var b={},c={},Y=this.get("inputNode");if(!Y){B.error("No inputNode specified.");}this._inputNode=Y;this._listEvents=[];this.DEF_PARENT_NODE=Y.get("parentNode");b[H]=this._keyDown;c[K]=this._keyEnter;c[O]=this._keyEsc;c[S]=this._keyTab;c[R]=this._keyUp;this._keys=b;this._keysVisible=c;this[V]=this.getClassName(E);this[W]=this.getClassName(E,"active");this[D]=this.getClassName(E,"hover");this[X]="."+this[V];if(!this.get("align.node")){this.set("align.node",Y);}if(!this.get(G)){this.set(G,Y.get("offsetWidth"));}this.publish(P,{defaultFn:this._defSelectFn});},destructor:function(){while(this._listEvents.length){this._listEvents.pop().detach();}},bindUI:function(){this._bindInput();this._bindList();},renderUI:function(){var e=this._createAriaNode(),b=this.get("contentBox"),d=this._inputNode,c=this.get("listNode"),Y=d.get("parentNode");if(!c){c=this._createListNode();b.append(c);}d.addClass(this.getClassName("input")).set("aria-autocomplete",C);Y.set("role","combobox").append(e);this._ariaNode=e;this._contentBox=b;this._listNode=c;this._parentNode=Y;},syncUI:function(){this._syncResults();this._syncVisibility();},hide:function(){return this.get(L)?this:this.set(T,false);},selectItem:function(Y){if(Y){if(!Y.hasClass(this[V])){return this;}}else{Y=this.get(F);if(!Y){return this;}}this.fire(P,{itemNode:Y,result:Y.getData(a)});return this;},_activateNextItem:function(){var b=this.get(F),Y;if(b){Y=b.next(this[X])||(this.get(Q)?null:b);}else{Y=this._getFirstItemNode();}this.set(F,Y);return this;},_activatePrevItem:function(){var b=this.get(F),Y=b?b.previous(this[X]):this.get(Q)&&this._getLastItemNode();this.set(F,Y||null);return this;},_add:function(Y){var b=[];N.each(I.isArray(Y)?Y:[Y],function(c){b.push(this._createItemNode(c).setData(a,c));},this);b=B.all(b);this._listNode.append(b.toFrag());return b;},_ariaSay:function(c,Y){var b=this.get("strings."+c);this._ariaNode.setContent(Y?I.sub(b,Y):b);},_bindInput:function(){var Y=this._inputNode;this._listEvents.concat([Y.on("blur",this._onInputBlur,this),Y.on(B.UA.gecko?"keypress":"keydown",this._onInputKey,this)]);},_bindList:function(){this._listEvents.concat([this.after("mouseover",this._afterMouseOver),this.after("mouseout",this._afterMouseOut),this.after("activeItemChange",this._afterActiveItemChange),this.after("alwaysShowListChange",this._afterAlwaysShowListChange),this.after("hoveredItemChange",this._afterHoveredItemChange),this.after("resultsChange",this._afterResultsChange),this.after("visibleChange",this._afterVisibleChange),this._listNode.delegate("click",this._onItemClick,this[X],this)]);},_clear:function(){this.set(F,null);this._set(U,null);this._listNode.get("children").remove(true);},_createAriaNode:function(){var Y=Z.create(this.ARIA_TEMPLATE);return Y.addClass(this.getClassName("aria")).setAttrs({role:"status","aria-live":"polite"});},_createItemNode:function(Y){var b=Z.create(this.ITEM_TEMPLATE);return b.addClass(this[V]).setAttrs({id:B.stamp(b),role:"option"}).setAttribute("data-text",Y.text).append(Y.display);},_createListNode:function(){var Y=Z.create(this.LIST_TEMPLATE);return Y.addClass(this.getClassName(C)).setAttrs({id:B.stamp(Y),role:"listbox"});},_keyDown:function(){if(this.get(T)){this._activateNextItem();}else{this.show();}},_keyEnter:function(){this.selectItem();},_keyEsc:function(){this.hide();},_keyTab:function(){if(this.get("tabSelect")){this.selectItem();}},_keyUp:function(){this._activatePrevItem();},_getLastItemNode:function(){return this._listNode.one(this[X]+":last-child");},_getFirstItemNode:function(){return this._listNode.one(this[X]);},_syncResults:function(b){var Y;if(!b){b=this.get(J);}this._clear();if(b.length){Y=this._add(b);this._ariaSay("ITEMS_AVAILABLE");}if(this.get("activateFirstItem")&&!this.get(F)){this.set(F,this._getFirstItemNode());}},_syncVisibility:function(Y){if(this.get(L)){this.set(T,true);return;}if(typeof Y==="undefined"){Y=this.get(T);}this._contentBox.set("aria-hidden",!Y);if(!Y){this.set(F,null);this._set(U,null);}},_afterActiveItemChange:function(b){var Y=b.newVal,c=b.prevVal;if(c){c.removeClass(this[W]);}if(Y){Y.addClass(this[W]);this._inputNode.set("aria-activedescendant",Y.get(M));}},_afterAlwaysShowListChange:function(Y){this.set(T,Y.newVal||this.get(J).length>0);},_afterHoveredItemChange:function(b){var Y=b.newVal,c=b.prevVal;if(c){c.removeClass(this[D]);}if(Y){Y.addClass(this[D]);}},_afterMouseOver:function(Y){var b=Y.domEvent.target.ancestor(this[X],true);this._mouseOverList=true;if(b){this._set(U,b);}},_afterMouseOut:function(){this._mouseOverList=false;this._set(U,null);},_afterResultsChange:function(Y){this._syncResults(Y.newVal);if(!this.get(L)){this.set(T,!!Y.newVal.length);}},_afterVisibleChange:function(Y){this._syncVisibility(!!Y.newVal);},_onInputBlur:function(Y){if(this._mouseOverList&&this._lastInputKey!==S){this._inputNode.focus();}else{this.hide();}},_onInputKey:function(c){var Y,b=c.keyCode;this._lastInputKey=b;if(this.get(J).length){Y=this._keys[b];if(!Y&&this.get(T)){Y=this._keysVisible[b];}if(Y){if(Y.call(this,c)!==false){c.preventDefault();}}}},_onItemClick:function(Y){var b=Y.currentTarget;Y.preventDefault();this.set(F,b);this.selectItem(b);},_defSelectFn:function(Y){var b=Y.result.text;this._inputNode.focus();this._updateValue(b);this._ariaSay("ITEM_SELECTED",{item:b});this.hide();}},{ATTRS:{activateFirstItem:{value:false},activeItem:{setter:B.one,value:null},align:{value:{points:["tl","bl"]}},alwaysShowList:{value:false},circular:{value:true},hoveredItem:{readOnly:true,value:null},strings:{value:{ITEM_SELECTED:"{item} selected.",ITEMS_AVAILABLE:"Suggestions are available. Use the up and down arrow keys to select suggestions."}},tabSelect:{value:true},visible:{value:false}},CSS_PREFIX:B.ClassNameManager.getClassName("aclist"),HTML_PARSER:{listNode:function(){return this.getClassName(C);
}}});B.AutoCompleteList=A;B.AutoComplete=A;},"@VERSION@",{requires:["autocomplete-base","widget","widget-position","widget-position-align","widget-stack"],skinnable:true});