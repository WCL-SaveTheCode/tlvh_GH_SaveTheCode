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


Standard

<script type="text/javascript">
    $J(function() {
        var matches = '$RESULT_ID'.match(/^(detail|hitlist)(\d{1,2})$/);
        if(matches) {
            var jqId = ('detail' === matches[1] ? '#detail_biblio' : '#results_bio') + matches[2] + ' .formatTypeIcon';
            $J(jqId).each(function() { this.innerHTML = this.parentNode.getAttribute('title'); });
        }
    });
</script>


https://wcm.ent.sirsi.net/client/assets/4.5.1/stack/en_US/SearchDisplayPanelStack.js

function clickList() {
  flipImages(ClickedOn.LIST);
  document.getElementById("searchResultsColumn").className = "list";
  $J(".zoomtrackerthumb").hide();
  $J(".zoomtrackerresults_img").show()
}
