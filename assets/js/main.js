    jQuery('.img-svg').each(function(){

      var $img = jQuery(this);

      var imgID = $img.attr('id');

      var imgClass = $img.attr('class');

      var imgURL = $img.attr('src');

      jQuery.get(imgURL, function(data) {

      // Get the SVG tag, ignore the rest

        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG

        if(typeof imgID !== 'undefined') {

          $svg = $svg.attr('id', imgID);

        }

        // Add replaced image's classes to the new SVG

        if(typeof imgClass !== 'undefined') {

          $svg = $svg.attr('class', imgClass+' replaced-svg');

        }

        // Remove any invalid XML tags as per http://validator.w3.org

        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG

        $img.replaceWith($svg);

      }, 'xml');

    });





$('.selector-link').on('change', function() {

  document.location.href=this.value;

});





var submenus = [];

var parents = [];



function existsParent(id) {

    position = -1;

    for (var i = 0; i < parents.length; i++) {

      if (id == parents[i].Id) {

        position = i;

      }

    }

    return (position > -1);

}



function searchParent(id, arr) {

    for (var i = 0; i < arr.length; i++) {

      if (id == arr[i].Id) {

        position = i;

      }

    }

    return arr[position];

}





$.get( 'https://api.playlister.club/data/pc/playlists/getmenuitems', function( data ) {



  $.each(data, function(key,value) {



    if (value.ParentId == 0) {

      $("#navbars ul#main-navbar").append('<li class="nav-item mx-md-2" id="nav-item-' + value.Id + '"><a href="' + value.URL + ' " class="nav-link">' + value.Name + '</a></li>');

    } else {

      

      submenus.push(value);

      if (!existsParent(value.ParentId)) {

        parents.push(searchParent(value.ParentId, data));

      }

    } 

  });



  for (var i = 0; i < parents.length; i++) {

    $('#nav-item-' + parents[i].Id).addClass('dropdown');

    //$('#nav-item-' + parents[i].Id).append('<div class="position-relative"><a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink-' + parents[i].Id + '" role="button" data-bs-toggle="dropdown" aria-expanded="false">' + parents[i].Name + '</a> <ul class="dropdown-menu dropdown-menu-dark" id="sub-menu-features-' + parents[i].Id + '" aria-labelledby="navbarDarkDropdownMenuLink-' + parents[i].Id + '"></ul></div>');

    $('#nav-item-' + parents[i].Id).html("<div class='position-relative'><a class='nav-link dropdown-toggle' href='#'' id='navbarDarkDropdownMenuLink-" + parents[i].Id + "' role='button' data-bs-toggle='dropdown' aria-expanded='false'>" + parents[i].Name + "</a> <ul class='dropdown-menu dropdown-menu-dark' id='sub-menu-features-" + parents[i].Id + "' aria-labelledby='navbarDarkDropdownMenuLink-" + parents[i].Id + "'></ul>  </div>");

  }



  for (var i = 0; i < submenus.length; i++) {

    $("#sub-menu-features-" + submenus[i].ParentId).append("<li role='presentation' class='' id='nav-item-" + submenus[i].Id + "'><a href='" + submenus[i].URL + "' class='dropdown-item'>" + submenus[i].Name + "</a></li>");

  } 



  $.each(data, function(key,value) {



  if (value.ParentId == 6) {

      var o = new Option(value.Name, value.URL);

    $("#selector1").append(o);

    //alert(value.Name);



    //$("#sub-menu-features").append('<li role="presentation" class="" id="nav-item-' + value.Id + '"><a href="' + value.URL + ' " class="dropdown-item">' + value.Name + '</a></li>');

    } else if (value.ParentId == 12) {

      var o = new Option(value.Name, value.URL);

      $("#selector2").append(o);

    }

  }); 



});


//  Num counter
function numCounter(selector, number, time, step) {
  const counter = document.querySelector(selector)
  let res = 0
  const allTime = Math.round(time / (number / step))
  let interval = setInterval(() => {
      res = res + step

      if (res === number) {
          clearInterval(interval)
      }
      counter.innerHTML = `+${res},000`
  }, allTime)
}


// numCounter('.mission__item-num', 400, 2000, 1)
const numObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      numCounter('.mission__item-num', 400, 1900, 10)
    }
  }
  )
}, {})

const itemIbs = document.querySelectorAll('.mission__item')
itemIbs.forEach(item => numObserver.observe(item))