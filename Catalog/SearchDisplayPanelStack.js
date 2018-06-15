var PubDateStarter = Class.create();
var search_any;
PubDateStarter.prototype = {
  initialize: function(b, c, f, a, e, g) {
    $J(function() {
      $J("#graph").graph({
        data: b,
        width: 200,
        height: 100,
        ranges: a,
        approx: g
      })
    });
    var h = {
      1: c[0],
      2: c[1],
      3: c[2],
      4: c[3],
      5: c[4],
      6: c[5],
      7: c[6],
      8: c[7],
      9: c[8],
      10: c[9],
      11: c[10]
    };
    var d = {
      1: f[0],
      2: f[1],
      3: f[2],
      4: f[3],
      5: f[4],
      6: f[5],
      7: f[6],
      8: f[7],
      9: f[8],
      10: f[9],
      11: f[10]
    };
    $J(function() {
      $J("#slider").slider({
        range: true,
        min: 1,
        max: 11,
        step: 1,
        minRange: 1,
        values: [1, 11],
        slide: function(j, k) {
          if (k.values[0] == 1 && k.values[1] == 11) {
            $J("#pub_date_from").val(e);
            $J("#pub_date_to").val(e)
          } else {
            $J("#pub_date_from").val(h[k.values[0]]);
            $J("#pub_date_to").val(d[k.values[1]])
          }
        }
      });
      $J("#pub_date_from").val(e);
      $J("#pub_date_to").val(e)
    });
    search_any = e
  }
};
var AvailableCheckbox = Class.create();
AvailableCheckbox.prototype = {
  initialize: function(b) {
    var a = $J("#onlyAvailableCheckBox");
    if (b) {
      a.attr("checked", "checked")
    } else {
      a.removeAttr("checked")
    }
    a.click(function(c) {
      window.location = $J("#toggleAvailable").attr("href")
    })
  }
};

function pubDateTextBlur(a) {
  matches = a.value.match("[0-9]+");
  if (matches == null || $J.inArray(a.value, matches) == -1) {
    a.value = search_any
  }
}

function pubDateTextFocus(a) {
  if (a.value == search_any) {
    a.value = ""
  }
}

function changePubFacet(b, a) {
  if (document.getElementById("pub_date_btn").value == b) {
    document.getElementById("limitcolumn_pub_graph").style.visibility = "hidden";
    document.getElementById("limitcolumn_pub_graph").style.display = "none";
    document.getElementById("limitcolumn_pub_chkbox").style.visibility = "visible";
    document.getElementById("limitcolumn_pub_chkbox").style.display = "block";
    document.getElementById("pub_date_btn").value = a
  } else {
    document.getElementById("limitcolumn_pub_graph").style.visibility = "visible";
    document.getElementById("limitcolumn_pub_graph").style.display = "block";
    document.getElementById("limitcolumn_pub_chkbox").style.visibility = "hidden";
    document.getElementById("limitcolumn_pub_chkbox").style.display = "none";
    document.getElementById("pub_date_btn").value = b
  }
}
$J.fn.graph = function(o) {
  var e = {
    height: 300,
    width: 500,
    data: "",
    ranges: "",
    approx: "Approx."
  };
  var o = $J.extend(e, o);
  var j = $J(this).addClass("ui-widget-content");
  j.wrap("<div class=' ui-widget ' />");
  var l = j.parent();
  l.css({
    height: o.height,
    width: o.width
  });
  j.css("position", "relative");
  var g = 0,
    n = 0,
    d, c = 0,
    m, k;
  for (g = 0; g < o.data.length; g++) {
    if (o.data[g] >= n) {
      n = o.data[g]
    }
  }
  d = o.height / o.data.length;
  g = o.height;
  var f = $J("<div />", {
    css: {
      height: d
    }
  }).addClass("ui-helper-reset ui-widget-bg");
  var b = Math.floor((o.width - (o.data.length * 5)) / o.data.length);
  var h = $J("<div />", {
    css: {
      width: b
    }
  }).addClass("ui-helper-reset ui-state-active ui-widget-bar");
  var a = 0;
  while (g >= 0) {
    m = f.clone().html("");
    j.append(m);
    g = g - d;
    c++
  }
  k = 0;
  for (g = 0; g < o.data.length; g++) {
    m = Math.floor(o.data[g] / n * c * d) - d;
    j.append(h.clone().css({
      height: m,
      left: k,
      bottom: 1
    }).attr("title", o.approx + " " + o.data[g] + " " + o.ranges[g]));
    k = k + b + 5
  }
  $J(".ui-widget-bg:last").css("height", 0)
};

function doFacets(k, m, o, n, f) {
  var a = k + "\t" + m;
  var l = false;
  var h = a;
  if (k == "PUBDATE" && document.getElementById("isPubDateRangeFacetEnabled").value == "false" && document.getElementById("pub_date_btn").value != n) {
    var p = document.getElementById("pub_date_from").value;
    var e = document.getElementById("pub_date_to").value;
    a = a + "\n" + p + "\t" + e;
    if (p != search_any || e != search_any) {
      l = true
    }
  } else {
    var b = document.getElementById("facet" + k).childNodes;
    for (var d = 0; d < b.length; d++) {
      var g = b[d].getElementsByTagName("input");
      for (var c = 0; c < g.length; c++) {
        if (f == "false") {
          h = h + "\n" + g[c].value
        }
        if (g[c].checked) {
          l = true;
          a = a + "\n" + g[c].value
        }
      }
    }
  }
  if (l) {
    document.getElementById("facetNavigatorString").value = a;
    document.getElementById("facetInclusionExclusion").value = o;
    document.getElementById("isFacetParent").value = f;
    document.getElementById("allChildFacets").value = h;
    document.getElementById("navigatorSubmitButton").click()
  } else {
    alert(MessageCatalog.get("search.SearchPage.NothingSelected"))
  }
}

function applyFacets(g, k, f, d, h) {
  if (h.length > 0) {
    var b = g + "\t" + k;
    var e = b;
    var l = f ? "Inclusion" : "Exclusion";
    var a = false;
    for (var c = 0; c < h.length; c++) {
      if (!d) {
        e = e + "\n" + h[c].value
      }
      if (h[c].checked) {
        b = b + "\n" + h[c].value;
        a = true
      }
    }
    if (a) {
      document.getElementById("facetNavigatorString").value = b;
      document.getElementById("facetInclusionExclusion").value = l;
      document.getElementById("isFacetParent").value = d;
      document.getElementById("allChildFacets").value = e;
      document.getElementById("navigatorSubmitButton").click()
    } else {
      alert(MessageCatalog.get("search.SearchPage.NothingSelected"))
    }
  } else {
    alert(MessageCatalog.get("search.SearchPage.NothingSelected"))
  }
}

function moreNavigators(f) {
  var d = document.getElementById("facet" + f);
  var e = d.childNodes;
  var a = 10;
  for (var b = 0; b < e.length; b++) {
    if (e[b].className.indexOf("hidden") != -1) {
      a--;
      e[b].className = e[b].className.replace("hidden", "shown");
      if (b == e.length - 1) {
        document.getElementById("more" + f).className = "hidden";
        var c = document.getElementById("expand" + f);
        if (c != null) {
          c.className = "hidden"
        }
        document.getElementById("fewer" + f).className = "shown";
        document.getElementById("fewerLink" + f).focus()
      }
    }
    if (a == 0) {
      break
    }
  }
  document.getElementById("fewer" + f).className = "shown";
  collapseDiv = document.getElementById("collapse" + f);
  if (collapseDiv != null) {
    collapseDiv.className = "shown"
  }
  document.getElementById("moreLink" + f).focus()
}

function fewerNavigators(g) {
  var e = document.getElementById("facet" + g);
  var f = e.childNodes;
  var a = 10;
  for (var b = f.length - 1; b >= 5; b--) {
    if (f[b].className.indexOf("shown") != -1) {
      a--;
      f[b].className = f[b].className.replace("shown", "hidden");
      if (b % 10 == 5) {
        a = 0
      }
      if (b == 5) {
        document.getElementById("fewer" + g).className = "hidden";
        var c = document.getElementById("collapse" + g);
        if (c != null) {
          c.className = "hidden"
        }
        document.getElementById("more" + g).className = "shown";
        document.getElementById("moreLink" + g).focus()
      }
    }
    if (a == 0) {
      break
    }
  }
  document.getElementById("more" + g).className = "shown";
  var d = document.getElementById("expand" + g);
  if (d != null) {
    d.className = "shown"
  }
  document.getElementById("fewerLink" + g).focus()
}

function allNavigators(d, a, b, c) {
  window.__ViewAllFacets.openDialogForFacet(d, a, b, c, applyFacets, collapseNavigators)
}

function expandNavigators(d) {
  var c = document.getElementById("facet" + d).childNodes;
  for (var a = 0; a < c.length; a++) {
    c[a].className = c[a].className.replace("hidden", "shown")
  }
  document.getElementById("more" + d).className = "hidden";
  document.getElementById("fewer" + d).className = "shown";
  var b = document.getElementById("expand" + d);
  if (b != null) {
    b.className = "hidden"
  }
  document.getElementById("collapse" + d).className = "shown";
  document.getElementById("fewerLink" + d).focus()
}

function collapseNavigators(d) {
  var c = document.getElementById("facet" + d).childNodes;
  for (var a = 5; a < c.length; a++) {
    c[a].className = c[a].className.replace("shown", "hidden")
  }
  document.getElementById("more" + d).className = "shown";
  document.getElementById("fewer" + d).className = "hidden";
  document.getElementById("collapse" + d).className = "hidden";
  document.getElementById("moreLink" + d).focus();
  var b = document.getElementById("expand" + d);
  if (b) {
    b.className = "shown"
  }
}
var emailDialog = null;
var holdMessage = "Place Holds";
var zoomImages = new Array();
var listCreated = true;
var thumbCreated = false;
var ClickedOn = {
  LIST: 0,
  THUMB: 1,
  COOLIRIS: 2
};

function clickList() {
  flipImages(ClickedOn.LIST);
  document.getElementById("searchResultsColumn").className = "list";
  $J(".zoomtrackerthumb").hide();
  $J(".zoomtrackerresults_img").show()
}

function clickThumb() {
  flipImages(ClickedOn.THUMB);
  document.getElementById("searchResultsColumn").className = "thumb";
  if (!thumbCreated) {
    for (x = 0; x < zoomImages.size(); x = x + 1) {
      setTimeout("$J('#syndeticsImg" + zoomImages[x] + "').addimagezoom({zoomrange: [7, 100],magnifiersize: [500,500],curshade:true,topOffset:150,largeimage:document.getElementById('magnifyresults_imgsyndeticsImg" + zoomImages[x] + "').src,classExtension:'thumb',id:'" + zoomImages[x] + "'});", 200)
    }
    thumbCreated = true
  }
  $J(".zoomtrackerthumb").show();
  $J(".zoomtrackerresults_img").hide()
}

function flipImages(b) {
  var f = $J(".list_img");
  var d = $J(".thumb_img");
  var e = $J(".cooliris_img");
  var a = "/client/" + com_sirsi_ent_page.localeCode + "/" + com_sirsi_ent_page.friendlyUrl + "/search/Results.";
  switch (Number(b)) {
    case ClickedOn.LIST:
      for (i = 0; i < f.length; i++) {
        f[i].src = "/client/images/search-icons/listactive.png"
      }
      for (i = 0; i < d.length; i++) {
        d[i].src = "/client/images/search-icons/thumbnails.png"
      }
      for (i = 0; i < e.length; i++) {
        e[i].src = "/client/images/search-icons/cooliris.png"
      }
      var c = a + "displaypanel.resultstoolbar.pagination:setResultDisplayType/list/";
      new AjaxHandler(null, c, null, doNothing, null, true).invokeAjax();
      c = a + "displaypanel.resultstoolbar:setResultDisplayType/list/";
      new AjaxHandler(null, c, null, doNothing, null, true).invokeAjax();
      c = a + "limitcolumn:setResultDisplayType/list/";
      new AjaxHandler(null, c, null, doNothing, null, true).invokeAjax();
      c = a + "template.header.searchbox:setResultDisplayType/list/";
      new AjaxHandler(null, c, null, doNothing, null, true).invokeAjax();
      break;
    case ClickedOn.THUMB:
      for (i = 0; i < f.length; i++) {
        f[i].src = "/client/images/search-icons/list.png"
      }
      for (i = 0; i < d.length; i++) {
        d[i].src = "/client/images/search-icons/thumbnailactive.png"
      }
      for (i = 0; i < e.length; i++) {
        e[i].src = "/client/images/search-icons/cooliris.png"
      }
      var c = a + "displaypanel.resultstoolbar.pagination:setResultDisplayType/thumb/";
      new AjaxHandler(null, c, null, doNothing, null, true).invokeAjax();
      c = a + "displaypanel.resultstoolbar:setResultDisplayType/thumb/";
      new AjaxHandler(null, c, null, doNothing, null, true).invokeAjax();
      c = a + "limitcolumn:setResultDisplayType/thumb/";
      new AjaxHandler(null, c, null, doNothing, null, true).invokeAjax();
      c = a + "template.header.searchbox:setResultDisplayType/thumb/";
      new AjaxHandler(null, c, null, doNothing, null, true).invokeAjax();
      break
  }
}

function addItemsToList(a) {
  var b = "",
    c = "$002c";
  if ($J(".results_chkbox:checked").length <= 0) {
    alert(MessageCatalog.get("search.SearchPage.NothingSelected"));
    return
  }
  $J.each($J(".results_chkbox:checked"), function() {
    if (b.length > 0) {
      b += c
    }
    b += encodeAsTapestry($J(this).val())
  });
  if (defaultList > -1) {
    doAddItemsAjax(defaultList, false, b)
  } else {
    $J("#chooseListForm").dialog({
      autoOpen: true,
      modal: true,
      title: MessageCatalog.get("search.ResultsToolbar.SelectAList")
    });
    $J("#myListsAddButton").unbind("click");
    $J("#myListsAddButton").one("click", function() {
      doAddItemsAjax($J("#myListSelect").val(), $J("#myListDefaultCheckbox").is(":checked"), b);
      $J("#chooseListForm").dialog("close")
    })
  }
}

function doAddItemsAjax(b, a, e) {
  var d = getSpinnerOptionsClone();
  d.top = 20;
  d.left = 225 - (d.radius + d.length * 2);
  createSpinnersForSelector($J("#addToListWaiting"), d);
  $J("#addToListSuccess").hide();
  $J("#addToListErrors").hide();
  $J("#addToListSuccessList").empty();
  $J("#addToListErrorsList").empty();
  $J("#addToListResultDiv").dialog({
    autoOpen: true,
    modal: true,
    width: 450,
    title: MessageCatalog.get("search.ResultsToolbar.Adding")
  });
  var f = "false";
  if (a) {
    defaultList = b;
    f = "true"
  }
  var c = addToListUrlBase.replace("_listID_", b).replace("_default_", a).replace("_itemIDs_", e);
  $J.ajax({
    url: c,
    cache: false,
    success: function(l, h, m) {
      stopSpinnersForSelector($J("#addToListWaiting"));
      $J("#ui-dialog-title-addToListResultDiv").text(l.title);
      if (l.added.length > 0) {
        var k = $J("#addToListSuccessList");
        for (var j = 0; j < l.added.length; j++) {
          var g = document.createElement("li");
          k.append(g);
          $J(g).append(l.added[j])
        }
        $J("#addToListSuccess").show()
      }
      if (l.failed.length > 0) {
        var k = $J("#addToListErrorsList");
        for (var j = 0; j < l.failed.length; j++) {
          var g = document.createElement("li");
          k.append(g);
          $J(g).append(l.failed[j])
        }
        $J("#addToListErrors").show()
      }
    },
    error: function(j, g, h) {
      alert(MessageCatalog.get("search.ResultsToolbar.AddToListError"));
      $J("#addToListResultDiv").dialog("close")
    }
  })
};
