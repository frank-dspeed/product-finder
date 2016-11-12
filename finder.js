/*
    Logic:
    if no problems deactivate all problems
    if one checked scroll next
    if female show pregnant.

    if 12-45 nothing selected "CH155f, CF175f, CF155f, MJ701f, MW701f ,AC701k, AD761f,  X1, X3, X5"   
    if pregnant AU941f exit
    if problems "CH155f, CF175f, CF155f, MJ701f, MW701f ,AC701k, AD761f,  X1, X3, X5, X9, BQ705, S150"
    if 45-55 "CH155f, CF175f, CF155f, MJ701f, MW701f ,AC701k, AD761f,  X1, X3, X5, X9, BQ705, S150"
    if 55 above "X5, X9, AC701k"

    age sets first
    problems secunds
    pregnant last

  */
    /**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | https://github.com/flesler/jquery.scrollTo
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});





jQuery(document).ready(function(){

  var result;
  var currentState = {
      filled: {
        age: false,
        gender: false,
        problems: false,
        pregnant: false
      },
      Pregnant: false,
      Age: false,
      Problems: false
  }

  // Let Start Start
  jQuery('#startQuestions').on('click', function(event) {
     console.log('Lets Start')
     event.preventDefault();
     jQuery('#questions').css('display', 'block');
     //jQuery('#questions').toggle()
     jQuery('#pregnant').hide();
     jQuery(window).scrollTo(document.getElementById('questions'), { duration: 800, offset: -120});
     return false;
  });


  /*
    Checking and Processing Age Selections
    

  */
  function ageChecked(){
    console.log('Checked Age')
    if(jQuery('#question1').attr('checked')) {
      currentState.Age=12
      currentState.filled.age = true
      jQuery('.hage').css('color', 'white')
      jQuery(window).scrollTo(document.getElementById('gender'), { duration: 800, offset: -120});
    }  else if (jQuery('#question2').attr('checked')){
      currentState.Age=45
      currentState.filled.age = true
      jQuery('.hage').css('color', 'white')
      jQuery(window).scrollTo(document.getElementById('gender'), { duration: 800, offset: -120});
    } else if (jQuery('#question3').attr('checked')){
      currentState.Age=55
      currentState.filled.age = true
      jQuery('.hage').css('color', 'white')
      jQuery(window).scrollTo(document.getElementById('gender'), { duration: 800, offset: -120});
    } else {
      // i am not Checked
      jQuery('.hage').css('color', 'red')
      jQuery(window).scrollTo(document.getElementById('finder-age'), { duration: 800, offset: -120});
    }
  }

  /*
    Checking and Processing Gender Selections
    Age Selection is required befor !

  */
  function genderChecked(e) {
     console.log('Checked Gender')
     if (!currentState.filled.age) {
        jQuery('#female').prop( "checked", false )
        jQuery('#male').prop( "checked", false )
      ageChecked()
     } else {
      if (!jQuery("input[name='gender']:checked").val()) {

        jQuery('.hgen').css('color', 'red')
        jQuery(window).scrollTo(document.getElementById('gender'), { duration: 800, offset: -120});
        
      } else {
        jQuery('.hgen').css('color', 'white')
        currentState.filled.gender = true
        if (jQuery('#female').attr('checked')) {         
          jQuery('#pregnant').show()
          jQuery(window).scrollTo(document.getElementById('pregnant'), { duration: 800, offset: -120});
        } else {
          // Reset Female Related Stuff
          jQuery('#pregnant').hide()
          currentState.filled.pregnant = false
          currentState.Pregnant = false
          jQuery('#ispregnant').prop( "checked", false )
          jQuery(window).scrollTo(document.getElementById('problems'), { duration: 800, offset: -120});
        }
             
      }
     }
  }

  function pregnantChecked() {
    console.log('Checked Pregnant')
    if (!jQuery("input[name='.pregnant']:checked").val()) {
      if(jQuery('#ispregnant').attr('checked')) {
        currentState.Pregnant=true
        result = "I am "+currentState.Age+" Pregnant"
      } else {
        currentState.Pregnant=false
      }
      jQuery('.hpreg').css('color', 'white')
      currentState.filled.pregnant = true
    } else {
      currentState.filled.pregnant = false
      jQuery('.hpreg').css('color', 'red')
      jQuery(window).scrollTo(document.getElementById('pregnant'), { duration: 800, offset: -120});
    }

  }
  
  /*

  */
  function probsChecked() {
    console.log('Checked Problems')
    // if female check if pregnant is filled
    if (jQuery('#female').attr('checked')) {
      if(!currentState.filled.pregnant) {
        return pregnantChecked()
      }   
    }
    // Check if our values are set
    if (!jQuery("input[name='problems']:checked").val()) {
      console.log('NOTHING CHECKED')
      jQuery('#problems .uk-h2').css('color', 'red')
      currentState.filled.problems = false
      currentState.Problems = false
      jQuery('.evaluate').attr('disabled', true)
      jQuery(window).scrollTo(document.getElementById('problems'), { duration: 800, offset: -120});
    } else {
      jQuery('#problems .uk-h2').css('color', 'white')
       if(jQuery('#noprobs').is(':checked')) { 
         jQuery('#cardiac').prop( "checked", false )
         jQuery('#diabetes').prop( "checked", false )
         jQuery('#bloodpresure').attr( "checked", false )
         result = "I am "+currentState.Age+" Healthy  no probs"  
       } else {
         currentState.Problems = true;
         result = "I am "+currentState.Age+" Not Healthy Have probs"
       }
      currentState.filled.problems = true;
      jQuery('.evaluate').attr('disabled', false)
      jQuery(window).scrollTo(document.getElementById('evaluate'), { duration: 800, offset: -120});
    }
  }
  
  jQuery('.age').click(ageChecked);
  jQuery('.gender').click(genderChecked)
  jQuery('.pregnant').click(pregnantChecked)
  jQuery('.problems').click(probsChecked)

  jQuery('.evaluate').click(function(event) {
    event.preventDefault();
  
    if (currentState.Pregnant) {
      // I am Pregnant
      window.location = "/en/bpm-finder-results-4.html";
    } else if (currentState.Problems){
      // I am Not Pregnant Have Problems
            
      // what problems do i have
       if (!jQuery('#cardiac').attr('checked')) {
        if (!jQuery('#bloodpresure').attr('checked')) {
          if (jQuery('#diabetes').attr('checked')) {
            return window.location = "/en/bpm-finder-results-2.html";
          } else {
            console.log('ROSA CALL')
            window.location = "/en/bpm-finder-results-1.html";
          }
        } else {
         window.location = "/en/bpm-finder-results-3.html";
        }

       } else {
         window.location = "/en/bpm-finder-results-3.html";
       }
             
    } else {
      // I am Not Pregnant Have No Problems
      if (currentState.Age === 45) {
        // I am 45
        window.location = "/en/bpm-finder-results-2.html";
      } else if (currentState.Age === 12) {
        // I am 12
        window.location = "/en/bpm-finder-results-2.html";
      } else {
        // i am 55
        window.location = "/en/bpm-finder-results-3.html";
      }
    }

    // jQuery('#status').append('<pre>'+JSON.stringify(currentState,null,2)+'</pre> <br/><h1>'+result+'</h1>')


  });
});
