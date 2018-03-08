(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$formElement = $(selector);
    if (this.$formElement.length == 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("mybtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function() {
    modal.style.display = "none";
  }

  function popup(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'box',
      'class': 'modal-content'
    });

    var $box = $('<input></input>', {
      type: 'modal-content',
    });

    var $p = $('<p></p>');

    var description = coffeeOrder.prefix + " ";
    description += coffeeOrder.username + " ";

    $p.append($box);
    $p.append(description);
    $div.append($p);


  }




  FormHandler.prototype.addSubmitHandler = function(fn) {
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });
      popup(data);

      btn.onclick = function() {
        modal.style.display = "block";
      }

      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };
  App.FormHandler = FormHandler;
  window.App = App;
})(window);
