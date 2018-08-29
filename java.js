

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const apiKey = 'AIzaSyBBwFMfdoVoLdjzFGG093DjQAWjAiA3dTE';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: apiKey,
      q: `${searchTerm} in:name`
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
$.ajax(settings);
}

function getResultHtml(result) {
  console.log('displayResult', result);
  return `
  <div>
	  <h2>
		  <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> 
		</h2>
	  <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
	</div> 
      `;
}

function displayYoutubeSearchResults(data) {
  .prop('hidden', false)
 const searchResults = data.items.map((item, index) => getResultHtml(item));
 console.log('displayYoutubeSearchResults', searchResults);
 $('.js-search-results').html(searchResults);
}

function main() {
  $('.js-search-form').submit(function( event ) {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.js-query');
    let query = queryTarget.val();
    console.log('query', query);
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchResults);
 
  });
}
$(main);