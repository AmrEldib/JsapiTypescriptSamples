
/**
 * Quick Filter for Jquery
 * @author Benjamin Delespierre <benjamin.delespierre@gmail.com>
 * @version 0.0.3
 * @package jQuery
 * @license GNU Lesser General Public License
 */

(function ($) {
    
    jQuery.expr[':'].containsi = function(a,i,m){
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
    };
    
    $.fn.quickFilter = function () {
        
        var o = arguments[0] || {},
            p = {
                handle: 'input[rel="filter"]',
                callback: function () {},
                caseSensitive: true
            };
            
        $.extend(p,o);
        
        var filter = function (event, value) {
            $('>*',this).show();
            if (value) $('>:not('+((p.caseSensitive&&':contains')||':containsi')+'('+value+'))',this).hide();
            p.callback.call(this, value);
        };
        
        var clear = function (event) {
            $(this).trigger('filter');
        }
        
        return this.each(function (i,n) {
            $(n).bind('filter', filter).bind('clear', clear);
            $(p.handle).bind('keyup.filter', function (event) {
                $(n).trigger('filter', [$(this).val()]);
            });
        });
    };
    
})(jQuery);