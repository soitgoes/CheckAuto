$.fn.checkauto = function () {
  var log = function (message) {
    if (console) { console.log(message) };
  };
  var data = arguments[0];
  var selected = arguments[1];
  var elements = this;
  var keyvalue = [];
  //todo: check to see if data is array or key value pair

  //setup both as key value pair
  //if array
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

  log("selected: " + JSON.stringify(selected));

  $.each(elements, function () {
    var currentValue = selected === undefined ? [] : selected;
    var holder = $("<div class='checkauto_div'>");
    var hiddenValueElement = this;
    var searchForm = $("<form class='checkauto_search_form'></form>");
    var searchField = $("<input type='text' class='checkauto_search' />");
    searchForm.append(searchField);
    var ul = $("<ul class='checkauto'></ul>");
    $.each(keyvalue, function () {
      var li = $("<li><span></span>" + this.key + "</li>");
      if ($.inArray(this.value, currentValue) > -1) {
        li.addClass("checked");
      }
      var value = this.value
      li.click(function () {
        if (li.attr("class") == "checked") {
          li.removeClass("checked");
          var index = currentValue.indexOf(value);
          currentValue = jQuery.grep(currentValue, function (item) { return item != value; });
        } else {
          li.addClass("checked");
          currentValue.push(value);
        }
        log("Autocheck value altered: " + JSON.stringify(currentValue));
        hiddenValueElement.value = currentValue.join(",");
      });
      ul.append(li);
    })
    searchField.keyup(function () {
      var searchValue = this.value;
      $("li", ul).each(function () {
        if (this.innerText.indexOf(searchValue) < 0) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    });
    holder.append(searchForm);
    holder.append(ul);
    $(this).after(holder);
  });
  //create ul with elements

  //create search box 

  //if selected is defined then populate the checked status

}