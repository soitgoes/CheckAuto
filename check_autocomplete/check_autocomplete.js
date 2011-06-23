$.fn.checkauto = function () {
  var log = function (message) {
    if (console) { console.log(message) };
  };
  var args = arguments[0];
  var data = args.data;
  var selected = args.selected;
  var title = args.title === undefined ? "Select One" : args.title;
  var elements = this;
  var keyvalue = [];
  if (data.length < 0) {
    return;
  }
  if (typeof (data[0]) === "string") {
    $.each(data, function () {
      keyvalue.push({ key: this.toString(), value: this.toString() });
    });
  } else {
    keyvalue = data;
  }
  if (typeof JSON !== "undefined") { //ie7 compatibility
    log("selected: " + JSON.stringify(selected));
  }


  $.each(elements, function () {
    var hiddenValueElement = this;
    var btn = $("<input type='button' value='" + title + "' />");
    var currentValue = selected === undefined ? [] : selected;
    var holder = $("<div class='checkauto_div' style='display:none'>");
    btn.click(function () {
      if (!holder.is(":visible")){
        if (args.open && typeof args.open == "function"){
          args.open();
        }
        holder.show();  
      }else{
        if (args.close  && typeof args.close == "function"){
          args.close();
        }
        holder.hide();        
      }
    });
      var searchForm = $("<form class='checkauto_search_form'></form>");
      var searchField = $("<input type='text' class='checkauto_search' />");
      searchField.click(function () { this.select(); });
      searchForm.append(searchField);
      var ul = $("<ul class='checkauto'></ul>");
      $.each(keyvalue, function () {
        var li = $("<li><span class='check_item'></span><span>" + this.key + "</span></li>");
        if ($.inArray(this.value, currentValue) > -1) {
          li.addClass("checked");
        }
        var value = this.value
        li.click(function () {
          if (args.beforeCheck && typeof args.beforeCheck == "function"){
            args.beforeCheck(currentValue);
          }
          if (li.attr("class") == "checked") {
            li.removeClass("checked");
            currentValue = jQuery.grep(currentValue, function (item) { return item != value; });
          } else {
            li.addClass("checked");
            currentValue.push(value);
          }
          if (typeof JSON !== "undefined") {
            log("Autocheck value altered: " + JSON.stringify(currentValue));
          }
          hiddenValueElement.value = currentValue.join(",");
          if (args.afterCheck && typeof args.afterCheck == "function"){
            args.afterCheck(currentValue);
          }
        });
        ul.append(li);
      })
      searchField.keyup(function () {
        var searchValue = this.value;
        $("li", ul).each(function () {
          if (this.innerText.toLowerCase().indexOf(searchValue.toLowerCase()) < 0) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
      });

      holder.append(searchForm);
      holder.append(ul);
      
      $(this).after(holder);
    
    $(this).after(btn);
  });

  //create ul with elements

  //create search box 

  //if selected is defined then populate the checked status

}